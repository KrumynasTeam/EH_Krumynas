import React from 'react'

export const CartItem = ((items) => {
    return (
        <div className='cart-item'>
            <img src={items.item.images[0].imagePath} alt={items.item.name}/>
            <p className='name'>{items.item.name}</p>
            <p className='price'>Price: {items.item.price}</p>
            <p className='quantity'>Quantity: {items.item.quantity}</p>
        </div>
    )
});
