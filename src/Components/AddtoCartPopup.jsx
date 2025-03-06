import React, { useState, useEffect } from 'react';
import './AddtoCartPopup.css';
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function AddtoCartPopup({ 
    item,
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
    onAddToFavorites 
}) {
    const [count, setCount] = useState(item.quantity || 1);
    const [total, setTotal] = useState(item.totalPrice || item.price);
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedFlavors, selectedAddOn, selectedPreparation, selectedWhippedCream, count]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFav(storedFavorites.some(fav => fav.name === item.name));
        calculateTotalPrice(); // Ensure initial price is calculated correctly
    }, [item]);

    const calculateTotalPrice = () => {
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

    const addtoCart = () => {
        const cartItem = {
            ...item,
            quantity: count,
            totalPrice: total,
            selectedFlavors,
            selectedAddOn,
            selectedPreparation,
            selectedWhippedCream
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
