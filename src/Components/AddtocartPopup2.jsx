import React, { useState, useEffect } from 'react';
import './AddtoCartPopup.css';
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from 'sweetalert2';

export default function AddtoCartPopup2({ item, onClose, onAddToCart, onAddToFavorites }) {
    const [count, setCount] = useState(item.quantity || 1);
    const [total, setTotal] = useState(item.totalPrice || item.price);
    const [isFav, setIsFav] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFav(storedFavorites.some(fav => fav.name === item.name));

        const user = JSON.parse(localStorage.getItem('user'));
        setIsLoggedIn(!!user);
    }, [item]);

    const increment = () => setCount(count + 1);
    const decrement = () => count > 1 && setCount(count - 1);

    const addtoCart = () => {
        if (!isLoggedIn) {
            setErrorMessage('⚠ Please log in to add items to your cart.');
            return;
        }

        const cartItem = {
            ...item,
            quantity: count,
            totalPrice: total,
        };
        onAddToCart(cartItem);

        Swal.fire({
            icon: 'success',
            title: 'Added to Cart!',
            text: `${item.name} has been added to your cart.`,
            showConfirmButton: false,
            timer: 1500
        });

        onClose();
    };

    const toggleFavorite = () => {
        if (!isLoggedIn) {
            setErrorMessage('⚠ Please log in to add items to favorites.');
            return;
        }
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
                    <div className="error-container">
    {errorMessage && <p className="error-message">{errorMessage}</p>}
</div>


                    <button className="fav-btn" onClick={toggleFavorite}>
                        {isFav ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                </div>
            </div>
        </div>
    );
}
