import React from 'react'
import { Button } from "reactstrap";

function getPriceString(product: { variants: any[]; }){
    var minPrice = Infinity;
    var maxPrice = -1;

    product.variants.forEach(element => {
      if(element.price > maxPrice) maxPrice = element.price;
      if(element.price < minPrice) minPrice = element.price;
    });

    if(minPrice === Infinity || maxPrice === -1){
        return 'Unavailable';
    }

    if(minPrice === maxPrice){
      return minPrice.toString() + '€';
    }else{
      return minPrice.toString() + " - " + maxPrice.toString() + '€';
    }
  }

function ProductCard({product, click, enableAdminMode, onEditClick}) {
    return (
        <div className='product-card'>
            {enableAdminMode ? <Button onClick={() => onEditClick(product)} id='product-card-edit-button'></Button> : ''}
            <img src={product.item.images[0].imagePath} alt={product.item.name}/>
            <p className='name'>{product.item.name}</p>
            <p className='price'>Price: {getPriceString(product)}</p>
            <Button type="button" onClick={() => click(product)} name="add">Add to Cart</Button>
        </div>
    )
}

export default ProductCard