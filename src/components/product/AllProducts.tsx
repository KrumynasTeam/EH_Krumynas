import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import ProductCard from './ProductCard';
import CreateProductForm from './NewProduct'
import './Product.scss';
import { Collapse, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Popover } from "@mui/material";

export type Product = {
  id: number;
  type: string;
  name: string;
  description: string;
  discount: Discount;
  images: Image[];
}

export type ProductVariant = {
  item: Product;
  variants: Array<any>
}

export type Discount = {
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

const colors = ['White', 'Black', 'Red', 'Green', 'Blue', 'Pink', 'Purple'];
const sizes = ['Small', 'Medium', 'Large'];

export const AllProducts = () => {

  const [showPopover, setShowPopover] = useState(false);
  const [popoverCounter, setPopoverCounter] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [retrieveData, setRetrieveData] = useState(true);
  const {user, token, cartId, UpdateCartId} = useContext(UserContext);
  const [showAdminMode, setShowAdminMode] = useState(false);

  const [products, setProducts] = useState<ProductVariant[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductVariant[]>([]);
  const [productFilter, setProductFilter] = useState<Filter>(InitialFilter);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductVariant>(null);
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);

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
    if (showPopover && popoverCounter != 0) {
      setTimeout(() => {
        setPopoverCounter(popoverCounter - 1);
      }, 1000);
    } else if (!showPopover) {
      setPopoverCounter(5);
    } else {
      setShowPopover(false);
      return;
    }
  }, [popoverCounter, showPopover]);

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
    if(selectedProduct === null) return;
    setSelectedProductQuantity(1);
    
    if(selectedProduct.variants.length === 0){
      return;
    }

    if(selectedProduct.item.type === 'Pot'){
      setSelectedProductSize(selectedProduct.variants[0].size)
    }else{
      if(selectedProductSize == null) setSelectedProductSize("")
      else setSelectedProductSize(null);
    }
  }, [selectedProduct])

  useEffect(() => {
    if(selectedProduct === null || selectedProduct.variants.length < 1){
      return;
    }

    if(selectedProduct.item.type === 'Pot'){
      var sizeColors = selectedProduct.variants.filter(
        v => v.size === selectedProductSize).map(
          v => v.color);

      setSelectedProductSizeColors(sizeColors);
      setSelectedProductColor(sizeColors[0])
    }else{
      var productColors = [...new Set(selectedProduct.variants.map(v => v.color))];
      setSelectedProductSizeColors(productColors);
      setSelectedProductColor(productColors[0])
    }
  }, [selectedProductSize])

  useEffect(() => {
    const fetchData = async () => {
      const plant_response = await fetch(process.env.REACT_APP_API_URL + 'Plant');
      const plant_data = await plant_response.json()
      const pot_response = await fetch(process.env.REACT_APP_API_URL + 'Pot');
      const pot_data = await pot_response.json()
      const bouquet_response = await fetch(process.env.REACT_APP_API_URL + 'Bouquet');
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
      
      maxPrice = Math.max(0, maxPrice);
      changePriceRange('Max', maxPrice);

      setProducts(productVariants);
      setFilteredProducts(productVariants)
      setIsLoading(false);
    }

    if(retrieveData){
      setIsLoading(true);
      fetchData();
      setRetrieveData(false);
    }
  },[retrieveData])

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
    newFilter.price.max = Math.max(0, newFilter.price.max);

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
    if(selectedProduct.item.type === 'Pot'){
      var selectedVariant = selectedProduct.variants.find(
        v => v.size === selectedProductSize && v.color === selectedProductColor)
    }else{
      var selectedVariant = selectedProduct.variants.find(
        v => v.color === selectedProductColor)
    }
    
    if(selectedVariant === undefined){
      return "";
    }

    return String(Math.round(selectedVariant.price * selectedProductQuantity * 100) / 100) + '€';
  }

  const handleProductModalClose = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  }

  const handleProductFormClose = () => {
    setSelectedProduct(null);
    setShowCreateProductForm(false);
  }

  const handleProductEdit = (product: ProductVariant) => {
    setSelectedProduct(product);
    setShowCreateProductForm(true);
  }

  const onFormResponse = () => {
    setSelectedProduct(null);
    setRetrieveData(true)
    setShowCreateProductForm(false);
  }

  const handleAddToCart = async () => {
    var body = {};
    var variantId = null;
    var endpoint = process.env.REACT_APP_API_URL + 'ShoppingCart';
    var method = 'POST';

    switch(selectedProduct.item.type){
      case 'Plant':
          variantId = selectedProduct.variants
            .find(v => v.color === selectedProductColor);
          break;
      case 'Pot':
          variantId = selectedProduct.variants
            .find(v => v.color === selectedProductColor
                && v.size == selectedProductSize);
          break;
      case 'Bouquet':
          variantId = selectedProduct.variants.at(0);
          break;
      default: break;
    }

    if(variantId === null) return;
    else variantId = variantId.id;

    var itemToAdd = {variantId: variantId, quantity: selectedProductQuantity}
    if(cartId === null || cartId === 0){
      body = {
        userId: user?.id,
        pots: selectedProduct.item.type === 'Pot' ? [itemToAdd] : [],
        plants: selectedProduct.item.type === 'Plant' ? [itemToAdd] : [],
        bouquets: selectedProduct.item.type === 'Bouquet' ? [itemToAdd] : []
      }
    }else{
      body = itemToAdd;
      method = 'PUT';
      endpoint += '/' + cartId + '/' + selectedProduct.item.type;
    }

    await fetch(endpoint,
    {
        method: method,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token
        },
      body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => {
        setIsLoading(false);
        if(data.isError){
            //setErrorMessage(data.error.message);
        }else{
            //setErrorMessage("");
            //props.onResponse();
            UpdateCartId(data.result.id);
        }
    })
    .then(() => setShowProductModal(false))
    .then(() => setShowPopover(true))
    .catch(() => {
        //setIsLoading(false);
        //setErrorMessage(defaultConnectionError);
    })
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
    <CreateProductForm onResponse={onFormResponse} isOpen={showCreateProductForm} onAction={handleProductFormClose} Product={selectedProduct} Plants={products}/>
    <Modal contentClassName='product-modal-rect' toggle={handleProductModalClose} isOpen={showProductModal}>
      {selectedProduct !== null && showProductModal ?
          <div>
            <ModalHeader id="product-modal-header">
              <label>{selectedProduct.item.name}</label>
              <Button id='close-product-modal-button' className='btn-close' color='none' onClick={handleProductModalClose}></Button>
            </ModalHeader>
            <ModalBody className='product-modal-body'>
              <div className='product-modal-product-image'>
                <img src={selectedProduct.item.images[0].imagePath} sizes='200x200'/>
              </div>
              <div className='product-modal-product-info-column'>
                <div className='product-modal-product-info'>
                  <label>Description: </label>
                  <p>{selectedProduct.item.description}</p>
                  {selectedProduct.item.type === 'Pot' ?
                    <div>
                      <label>Size:</label>
                      <div className='product-details-select-container'>
                        {[...new Set(selectedProduct.variants.map(v => v.size))].map(s => 
                          <Button key={s} className='size-select-button' onClick={() => setSelectedProductSize(s)} style={selectedProductSize === s ? {border: '1px solid white'} : {}}>{s}</Button>
                        )}
                      </div>
                    </div>
                    :
                    <></>
                  }
                  {selectedProduct.item.type !== 'Bouquet' ?
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
                  :
                  ''
                  }
                  <div className='quantity-price-field'>
                    <label style={{flex: '70%'}}>Quantity: </label>
                    <input type='number' value={selectedProductQuantity} onChange={(e) => setSelectedProductQuantity(Number(e.target.value))} style={{marginTop: '-5px', flex: '30%', marginRight: '10%', textAlign: 'end'}}/>
                  </div>
                  <div className='quantity-price-field'>
                    <label>Price: {getSelectedPrice()}</label>
                  </div>
                </div>
                <Button type="button" onClick={() => handleAddToCart()}>Add to Cart</Button>
              </div>
            </ModalBody>
            <ModalFooter/>
          </div>
          :
          <></>
        }
    </Modal>
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
                    <input className='filter-select-number' type='number' min={0} value={productFilter.price.min} onChange={(e) => changePriceRange('Min', Number(e.target.value))}/>
                  </div>
                  <div className='filter-select-container'>
                    <label className='filter-select-label'>Max: </label>
                    <input className='filter-select-number' type='number' min={0} value={productFilter.price.max} onChange={(e) => changePriceRange('Max', Number(e.target.value))}/>
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
              <label id='filter-clear-label' onClick={() => clearFilters()}>Clear filters X</label><br/>
              {user?.role === 1 ? 
                <div id='toggle-admin-mode' className='filter-select-container'>
                  <label>Toggle admin mode</label>
                  <input className='filter-select-checkbox' type='checkbox' checked={showAdminMode} onChange={() => setShowAdminMode(!showAdminMode)}/>
                </div>
              : ''}
            </div>
          </Collapse>
        </div>
      </div>
      <section className='cards'>
        {showAdminMode ? 
          <div onClick={() => setShowCreateProductForm(true)} id='add-product-card' className='product-card' key={0}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png'/>
          </div> 
          : ''}
        {filteredProducts.map(product => <ProductCard key={product.item.id} product={product} click={openProductModal} enableAdminMode={showAdminMode} onEditClick={handleProductEdit}/> )}
      </section>
    </div>
    <Popover
        open={showPopover}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 100, left: window.innerWidth}}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transitionDuration="auto"
      >
        <div style={{minHeight: '100px', minWidth: '200px', padding: '20px'}}>
          <span onClick={() => setShowPopover(false)} style={{position: 'relative', float: 'right', cursor: 'pointer'}}>X</span>
          <p>Item successfully added!</p>
          <hr></hr>
          <button onClick={() => window.location.href = '/cart'} style={{width: '100%'}}>Go to cart</button>
        </div>
    </Popover>
  </>
  )
}
