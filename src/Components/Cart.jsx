import React from 'react';
import './Cart.css';
import Checkout from './Checkout';
import { useState } from 'react';
import AddtoCartPopup from './AddtoCartPopup';

export default function Cart({ cartItems = [], setCart }) {
    const [checkout, setCheckout] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const removeItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    const removeAll = () => {
        setCart([]);
    };

    const mergeCart = cartItems.reduce((acc, item) => {
        const oldItem = acc.find((cartItem) => cartItem.name === item.name);
        if (oldItem) {
            oldItem.quantity += item.quantity;
            oldItem.totalPrice += item.totalPrice;
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, []);

    const grandTotal = mergeCart.reduce((acc, item) => acc + item.totalPrice, 0);

    const handleUpdateCart = (updatedItem) => {
        const updatedCart = cartItems.map((item) =>
            item.name === updatedItem.name ? updatedItem : item
        );
        setCart(updatedCart);
        setEditItem(null);
    };

    return (
        <div className='cart-box'>
            {mergeCart.length === 0 ? (
                <h3>Your Cart is Empty</h3>
            ) : (
                <ul>
                    {mergeCart.map((item, index) => (
                        <li key={index} className='cart-item'>
                            <img src={item.image} alt={item.name} />
                            <div className="cart-details">
                                <h4>{item.name}</h4>
                                <p>Price: RS. {item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Total: RS. {item.totalPrice}</p>
                                <div className="cart-buttons">
                                    <button className="edit-btn" onClick={() => setEditItem(item)}>Edit</button>
                                    <button className="remove-btn" onClick={() => removeItem(index)}>Remove</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="cart-button">
                <button onClick={() => setCheckout(true)} className='buyNow-btn'>Buy Now</button>
                <button onClick={removeAll} className='rAll-btn'> Remove all</button>
            </div>
            {mergeCart.length > 0 && <h3>Grand Total: RS. {grandTotal}</h3>}
            {checkout && <Checkout total={grandTotal} setCart={setCart} />}
            {editItem && <AddtoCartPopup item={editItem} onAddToCart={handleUpdateCart} onClose={() => setEditItem(null)} />}
        </div>
    );
}