import React, { useState, useEffect } from 'react';
import './AddtoCartPopup.css';
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function AddtoCartPopup2({ item, onClose, onAddToCart,onAddToFavorites}) {
    const [count, setCount] = useState(item.quantity || 1);
    const [total, setTotal] = useState(item.totalPrice || item.price);
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFav(storedFavorites.some(fav => fav.name === item.name));
    }, [item]);
    
 

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const addtoCart = () => {
        const cartItem = {
            ...item,
            quantity: count,
            totalPrice: total,
         
        };
        onAddToCart(cartItem); 
        onClose(); 
    };

    const toggleFavorite = () => {
        setIsFav(!isFav);
        onAddToFavorites(item);
    };
    

    return (
        <div className='pop-overlay'>
            <div className="pop-content">
                <a className='cls-btn' onClick={onClose}><IoCloseCircleOutline /></a>
                <h3>{item.name}</h3>
                <img src={item.image} alt={item.name} />

                <p>Final Price: RS. {total}</p>

                <div className="popup-footer">
                    <div className="count-btn">
                        <button onClick={decrement}><CiCircleMinus /></button>
                        <span>{count}</span>
                        <button onClick={increment}><CiCirclePlus /></button>
                    </div>
                    <button onClick={addtoCart}> Add To Cart </button><br />
                    <button className="fav-btn" onClick={toggleFavorite}>
                        {isFav ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                </div>
            </div>
        </div>
    );
}