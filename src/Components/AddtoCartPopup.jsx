import React, { useState, useEffect } from 'react';
import './AddtoCartPopup.css';
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';

export default function AddtoCartPopup({ 
    item = {}, // Ensure item is always an object
    onClose,
    flavorOptions = [],
    addOns = [],
    prepMethods = [],
    wCreams = [],
    selectedFlavors = [],
    selectedAddOn = '',
    selectedPreparation = '',
    selectedWhippedCream = '',
    onAddToCart,
    toggleFavorite = () => {},
    favorites = []
}) {
    const [count, setCount] = useState(item?.quantity || 1);
    const [total, setTotal] = useState(item?.totalPrice || item?.price || 0);
    const [isFav, setIsFav] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setIsLoggedIn(true);
            setUser(storedUser);
        }
        if (item?.name) {
            setIsFav(favorites.some(fav => fav.name === item.name));
        }
    }, [favorites, item]);

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedFlavors, selectedAddOn, selectedPreparation, selectedWhippedCream, count]);

    const calculateTotalPrice = () => {
        if (!item?.price) return; 

        const basePrice = item.price;
        const flavorCost = selectedFlavors.reduce((sum, flavor) => {
            const option = flavorOptions.find(f => f.name === flavor);
            return sum + (option ? option.cost : 0);
        }, 0);

        const addOnCost = addOns.find(addOn => addOn.name === selectedAddOn)?.cost || 0;
        const prepCost = prepMethods.find(prep => prep.name === selectedPreparation)?.cost || 0;
        const whippedCreamCost = wCreams.find(wc => wc.name === selectedWhippedCream)?.cost || 0;

        const finalPrice = (basePrice + flavorCost + addOnCost + prepCost + whippedCreamCost) * count;
        setTotal(finalPrice);
    };

    const increment = () => setCount(prev => prev + 1);
    const decrement = () => setCount(prev => (prev > 1 ? prev - 1 : prev));

    // ✅ Add to Cart with Backend API
    const addToCart = async () => {
        if (!isLoggedIn) {
            setErrorMessage('⚠ Please log in to add items to your cart.');
            return;
        }

        const cartItem = {
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: count,
            totalPrice: total,
            selectedFlavors,
            selectedAddOn,
            selectedPreparation,
            selectedWhippedCream
        };

        try {
            const response = await axios.post('http://localhost:3001/addToCart', {
                user: user.email,
                item: cartItem,
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Added to Cart!',
                    text: `${item.name} has been added to your cart.`,
                    showConfirmButton: false,
                    timer: 1500
                });
                onClose();
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add item to the cart. Please try again.',
            });
        }
    };

    // ✅ Toggle Favorite with SweetAlert
    const handleToggleFavorite = async () => {
        if (!isLoggedIn) {
            setErrorMessage('⚠ Please log in to add items to favorites.');
            return;
        }

        if (isFav) {
            Swal.fire({
                icon: 'success',
                title: 'Removed from Favorites!',
                text: `${item.name} removed from favorites.`,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Added to Favorites!',
                text: `${item.name} added to your favorites.`,
            });
        }

        if (typeof toggleFavorite === 'function') {
            toggleFavorite(item);
        } else {
            console.error('toggleFavorite is not a function');
        }

        setIsFav(!isFav);
    };

    if (!item?.name) return null;

    return (
        <div className='pop-overlay'>
            <div className="pop-content">
                <a className='cls-btn' onClick={onClose}><IoCloseCircleOutline /></a>
                <h3>{item.name}</h3>
                <img src={item.image} alt={item.name} />
                <p>Final Price: ₹{total.toFixed(2)}</p>

                <div className="popup-footer">
                    <div className="count-btn">
                        <button onClick={decrement}><CiCircleMinus /></button>
                        <span>{count}</span>
                        <button onClick={increment}><CiCirclePlus /></button>
                    </div>
                    <button onClick={addToCart}> Add To Cart </button><br />
                    <div className="error-container">
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                    <button className="fav-btn" onClick={handleToggleFavorite}>
                        {isFav ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                </div>
            </div>
        </div>
    );
}
