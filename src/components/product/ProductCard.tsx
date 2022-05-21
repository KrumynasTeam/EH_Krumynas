import React from 'react'

//"https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_planter-and-stand_variant_pallas_white.jpg", 
//"https://vilniusflowers.lt/wp-content/uploads/2019/09/100-red-roses-bouquet.jpg",
//"https://cdn.sanity.io/images/y346iw48/production/246670f4c0ec5477155de24925237900d35fae59-1200x1553.jpg?w=640&auto=format"

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

function ProductCard({product, click}) {
    return (
        <div className='card'>
            <img src={product.item.images[0].imagePath}/>
            <p className='name'>{product.item.name}</p>
            <p className='price'>Price: {getPriceString(product)}</p>
            <button type="button" onClick={() => click(product)} name="add">Add to Cart</button>
        </div>
    )
}

export default ProductCard