import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ProductCard from './ProductCard';
import './Product.scss';
import { Collapse } from 'reactstrap';
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';

type Product = {
  id: number;
  type: string;
  name: string;
  description: string;
  discount: Discount;
  images: Image[];
}

type ProductVariant = {
  item: Product;
  variants: Array<any>
}

type Discount = {
  id: number;
  amount: number;
  description: string;
}

type Image = {
  color: string;
  imagePath: string;
}

type Filter = {
  collection: string;
  price: PriceRange;
  color: string;
  size: string[];
}

type PriceRange = {
  min: number; 
  max: number;
}

const InitialFilter: Filter = {
  collection: 'All',
  price: {min: 0, max: Infinity},
  color: 'All',
  size: []
}

const emptyImage: Image = {
  color: 'Red',
  imagePath: 'None'
}

const emptyProduct: Product = {
  id: -1,
  type: 'None',
  name: 'None',
  description: 'None',
  discount: null,
  images: [emptyImage]
};

const emptyVariant: ProductVariant = {
  item: emptyProduct,
  variants: []
}

const colors = ['White', 'Black', 'Red', 'Green', 'Blue', 'Pink', 'Purple'];
const sizes = ['Small', 'Medium', 'Large'];

export const AllProducts = () => {

  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState<ProductVariant[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductVariant[]>([]);
  const [productFilter, setProductFilter] = useState<Filter>(InitialFilter);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductVariant>(emptyVariant);

  const [showFilters, setShowFilters] = useState(true);
  const [showCollection, setShowCollection] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showColor, setShowColor] = useState(true);
  const [showSize, setShowSize] = useState(true);

  const [selectedProductSize, setSelectedProductSize] = useState('');
  const [selectedProductColor, setSelectedProductColor] = useState('');
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);
  const [selectedProductSizeColors, setSelectedProductSizeColors] = useState<string[]>([])

  useEffect(() => {
    var filtered = products;
    if(productFilter.collection !== 'All'){
      filtered = products.filter(
        p => p.item.type === productFilter.collection);
    }

    if(productFilter.color !== 'All'){
      filtered = filtered.filter(
        p => p.variants.find(
          v => v.color === productFilter.color) 
        !== undefined);
    }

    if(productFilter.size.length !== 0){
      filtered = filtered.filter(
        p => p.variants.find(
          v => productFilter.size.includes(v.size)));
    }

    filtered = filtered.filter(
      p => p.variants.find(
        v => v.price >= productFilter.price.min && 
        v.price <= productFilter.price.max) 
      !== undefined);

    setFilteredProducts(filtered);
  },[productFilter, products]);

  useEffect(() => {
    setSelectedProductQuantity(1);
    if(selectedProduct.variants.length < 1){
      return;
    }

    if(selectedProduct.item.type === 'Pot'){
      setSelectedProductSize(selectedProduct.variants[0].size);
    }else{
      var productColors = [...new Set(selectedProduct.variants.map(v => v.color))];
      setSelectedProductSizeColors(productColors);
    }
    setSelectedProductColor(selectedProduct.variants[0].color);
  }, [selectedProduct])

  useEffect(() => {
    var sizeColors = selectedProduct.variants.filter(
      v => v.size === selectedProductSize).map(
        v => v.color);
    
    setSelectedProductSizeColors(sizeColors);
  }, [selectedProductSize, selectedProduct])

  useEffect(() => {
    const fetchData = async () => {
      const plant_response = await fetch(process.env.REACT_APP_API_URL + 'Plant/variant');
      const plant_data = await plant_response.json()
      const pot_response = await fetch(process.env.REACT_APP_API_URL + 'Pot/variant');
      const pot_data = await pot_response.json()
      const bouquet_response = await fetch(process.env.REACT_APP_API_URL + 'Bouquet/variant');
      const bouquet_data = await bouquet_response.json()

      var plants = plant_data.result as ProductVariant[]
      var pots = pot_data.result as ProductVariant[]
      var bouquets = bouquet_data.result as ProductVariant[]

      var productVariants = plants.concat(pots, bouquets);

      var maxPrice = Math.max(
        ...productVariants.map(
          o => Math.max(
            ...o.variants.map(
              v => v.price))));

      changePriceRange('Max', maxPrice);

      setProducts(productVariants);
      setFilteredProducts(productVariants)
      setIsLoading(false);
    }

    setIsLoading(true);
    fetchData();
  },[])

  const openProductModal = (product: ProductVariant) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  }

  const changeFilter = (filter: string, type: string) => {
    var newFilter = { ...productFilter };
    switch(type){
      case 'Collection':
        newFilter.collection = filter;
        break;
      case 'Color':
        newFilter.color = filter;
        break;
      case 'Size':
        var index = newFilter.size.indexOf(filter, 0);
        if(index > -1){
          newFilter.size.splice(index, 1);
        }else{
          newFilter.size.push(filter);
        }

        if(newFilter.size.length !== 0){
          newFilter.collection = 'Pot';
        }
        
        break;
    }
    setProductFilter(newFilter);
  }

  const clearFilters = () => {
    var newFilter = { ...InitialFilter };
    newFilter.price.min = 0;
    newFilter.price.max = Math.max(
      ...products.map(
        o => Math.max(
          ...o.variants.map(
            v => v.price))));

    newFilter.size = [];
    setProductFilter(newFilter);
  }

  const changePriceRange = (end: string, value: number) => {
    var newFilter = { ...productFilter };
    if(end === 'Max'){
      newFilter.price.max = value;
    }else{
      newFilter.price.min = value;
    }
    setProductFilter(newFilter);
  }

  const getSelectedPrice = () => {
    var selectedVariant = selectedProduct.variants.find(
      v => v.size === selectedProductSize && v.color === selectedProductColor)

    if(selectedVariant === undefined){
      return "Unavailable";
    }

    return String(selectedVariant.price * selectedProductQuantity) + '€';
  }

  if(isLoading){
      return(
        <div className='spinner-container d-flex justify-content-center'>
          <div className="spinner-border text-success mx-auto" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
  }

  return(
  <>
    <MDBModal show={showProductModal} setShow={setShowProductModal} tabIndex={-1}>
      <MDBModalDialog centered size='lg'>
          <MDBModalContent className='modal-rect'>
            <MDBModalHeader>
              <MDBModalTitle>{selectedProduct.item.name}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={(() => setShowProductModal(false))}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='modal-body'>
              <div>
                <img src={selectedProduct.item.images[0].imagePath} sizes='200x200'/>
              </div>
              <div className='modal-product-info-column'>
                <div className='modal-product-info'>
                  <label>Description: </label>
                  <p>{selectedProduct.item.description}</p>
                  <div style={selectedProduct.item.type === 'Pot' ? {} : {display: 'none'}}>
                    <label>Size:</label>
                    <div className='product-details-select-container'>
                      {[...new Set(selectedProduct.variants.map(v => v.size))].map(s => 
                        <button key={s} className='size-select-button' onClick={() => setSelectedProductSize(s)} style={selectedProductSize === s ? {border: '1px solid white'} : {}}>{s}</button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label>Color:</label>
                      <div className='product-details-select-container'>
                        {selectedProductSizeColors.map(c => 
                          <div key={c} className='color-select-rect' 
                               style={selectedProductColor === c ? {backgroundColor: c, border: '2px solid lightgreen'} : {backgroundColor: c, border: '1px solid white'}}
                               onClick={() => setSelectedProductColor(c)}/>
                        )}
                      
                      </div>
                  </div>
                  <div className='quantity-price-field'>
                    <label>Quantity: </label>
                    <input type='number' value={selectedProductQuantity} onChange={(e) => setSelectedProductQuantity(Number(e.target.value))}/>
                    <label>Price: {getSelectedPrice()}</label>
                  </div>
                </div>
                <button type="button">Add to Cart</button>
              </div>
            </MDBModalBody>
            <MDBModalFooter/>
          </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>
    <div className='product-container'>
      <div className='filters'>
        <div className='filter-options'>
          <div className='filter-header'>
            <label>Filter By</label>
            <input id='filter-collapse-check' type='checkbox' checked={showFilters} onChange={() => setShowFilters(!showFilters)}/>
          </div>
          <hr/>
          <Collapse isOpen={showFilters}>
            <div className='filter-category'>
              <div className='filter-category-header'>
                <label>Collection</label>
                <input type='checkbox' checked={showCollection} onChange={() => setShowCollection(!showCollection)}/>
              </div>
              <Collapse isOpen={showCollection}>
                <div className='filter-list'>
                  <label onClick={() => changeFilter('All', 'Collection')} style={productFilter.collection === 'All' ? {fontWeight: 'bold', color: 'white'} : {fontWeight: 'normal'}}>All</label>
                  <label onClick={() => changeFilter('Plant', 'Collection')} style={productFilter.collection === 'Plant' ? {fontWeight: 'bold', color: 'white'} : {fontWeight: 'normal'}}>Plants</label>
                  <label onClick={() => changeFilter('Pot', 'Collection')} style={productFilter.collection === 'Pot' ? {fontWeight: 'bold', color: 'white'} : {fontWeight: 'normal'}}>Pots</label>
                  <label onClick={() => changeFilter('Bouquet', 'Collection')} style={productFilter.collection === 'Bouquet' ? {fontWeight: 'bold', color: 'white'} : {fontWeight: 'normal'}}>Bouquets</label>
                </div>
              </Collapse>
            </div>           
            <hr/>
            <div className='filter-category'>
              <div className='filter-category-header'>
                <label>Price</label>
                <input type='checkbox' checked={showPrice} onChange={() => setShowPrice(!showPrice)}/>
              </div>
              <Collapse isOpen={showPrice}>
                <div className='filter-container'>
                  <div className='filter-select-container'>
                    <label className='filter-select-label'>Min: </label>
                    <input className='filter-select-number' type='number' value={productFilter.price.min} onChange={(e) => changePriceRange('Min', Number(e.target.value))}/>
                  </div>
                  <div className='filter-select-container'>
                    <label className='filter-select-label'>Max: </label>
                    <input className='filter-select-number' type='number' value={productFilter.price.max} onChange={(e) => changePriceRange('Max', Number(e.target.value))}/>
                  </div>
                </div>
              </Collapse>
            </div>
            <hr/>
            <div className='filter-category'>
              <div className='filter-category-header'>
                <label>Color</label>
                <input type='checkbox' checked={showColor} onChange={() => setShowColor(!showColor)}/>
              </div>
              <Collapse isOpen={showColor}>
                <div className='color-container'>
                  <div className='color-clear-rect' onClick={() => changeFilter('All', 'Color')} style={productFilter.color === 'All' ? {border: '2px solid lightgreen'} : {}}>
                    <div className='color-clear-rect-cell'>
                      <label className='color-clear-label'>X</label>
                    </div>
                  </div>
                  {colors.map(color => 
                    <div key={color} 
                        className='color-select-rect' 
                        onClick={() => changeFilter(color, 'Color')} 
                        style={productFilter.color === color ? {border: '2px solid lightgreen', backgroundColor: color} : {border: '1px solid white', backgroundColor: color}}/>)}
                </div>
              </Collapse>
            </div>
            <hr/>
            <div className='filter-category'>
              <div className='filter-category-header'>
                <label>Size</label>
                <input type='checkbox' checked={showSize} onChange={() => setShowSize(!showSize)}/>
              </div>
              <Collapse isOpen={showSize}>
                <div className='filter-container'>
                  {sizes.map(size =>
                    <div className='filter-select-container' key={size}>
                      <label className='filter-select-label'>{size}</label>
                      <input className='filter-select-checkbox' type='checkbox' checked={productFilter.size.includes(size)} onChange={() => changeFilter(size, 'Size')}/>
                    </div>)}
                </div>
              </Collapse>
            </div>
            <hr/>
            <div className='filter-clear'>
              <label onClick={() => clearFilters()}>Clear filters X</label><br/>
            </div>
          </Collapse>
        </div>
      </div>
      <section className='cards'>
        {filteredProducts.map(product => <ProductCard key={product.item.id} product={product} click={openProductModal}/> )}
        {filteredProducts.map(product => <ProductCard key={product.item.id+10} product={product} click={openProductModal}/> )}
        {filteredProducts.map(product => <ProductCard key={product.item.id+20} product={product} click={openProductModal}/> )}
        {filteredProducts.map(product => <ProductCard key={product.item.id+30} product={product} click={openProductModal}/> )}
        {filteredProducts.map(product => <ProductCard key={product.item.id+40} product={product} click={openProductModal}/> )}
        {filteredProducts.map(product => <ProductCard key={product.item.id+50} product={product} click={openProductModal}/> )}
      </section>
    </div>
  </>
  )
}
