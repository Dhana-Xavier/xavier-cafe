import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddtoCartPopup from './AddtoCartPopup';
import EshopNavBar from './EshopNavBar';
import Footer from './Footer';
import './OrderPlace.css';
import { PiPintGlass } from "react-icons/pi";
import { GiFairyWand } from "react-icons/gi";

export default function Orderplace({setCart, favorites, toggleFavorite }) {
    const location = useLocation();
    const item = location.state?.item;
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [showCustomise, setShowCustomise] = useState(false);
    const [selectedFlavors, setSelectedFlavors] = useState([]);
    const [selectedAddOn, setSelectedAddOn] = useState(null);
    const [selectedPreparation, setSelectedPreparation] = useState(null);
    const [selectedWhippedCream, setSelectedWhippedCream] = useState(null);

    const handleAddToCart = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleAddToCartSubmit = (cartItem) => {
        setCart(prevCart => [...prevCart, cartItem]); // Add the item to the cart
        setShowPopup(false); // Close the popup
    };

    const handleFlavorChange = (flavor) => {
        setSelectedFlavors(prev =>
            prev.includes(flavor) ? prev.filter(f => f !== flavor) : [...prev, flavor]
        );
    };

    const handleAddOnChange = (addOn) => {
        setSelectedAddOn(addOn);
    };

    const handlePreparationChange = (prep) => {
        setSelectedPreparation(prep);
    };

    const handleWhippedCreamChange = (wc) => {
        setSelectedWhippedCream(wc);
    };

    const sizeOptions = [
        { name: 'Quater', volume: '250 ml', image: <PiPintGlass style={{ fontSize: 22 }} /> },
        { name: 'Small', volume: '350 ml', image: <PiPintGlass style={{ fontSize: 24 }} /> },
        { name: 'Large', volume: '460 ml', image: <PiPintGlass style={{ fontSize: 28 }} /> },
        { name: 'Extra Large', volume: '590 ml', image: <PiPintGlass style={{ fontSize: 30 }} /> }
    ];

    const flavorOptions = [
        { name: 'Vanilla', cost: 50 },
        { name: 'Caramel', cost: 50 },
        { name: 'Hazelnut', cost: 50 },
        { name: 'Chocolate', cost: 50 },
        { name: 'Peppermint', cost: 50 },
        { name: 'Cinnamon', cost: 50 }
    ];

    const AddOns = [
        { name: 'no ice', cost: 0 },
        { name: 'Light ice', cost: 10 },
        { name: 'Medium ice', cost: 20 },
        { name: 'Extra ice', cost: 30 }
    ];

    const prepMethods = [
        { name: 'None', cost: 0 },
        { name: 'Blended', cost: 40 }
    ];

    const wCreams = [
        { name: 'No Whipped Cream', cost: 0 },
        { name: 'Whipped Cream', cost: 20 },
        { name: 'Light Whipped Cream', cost: 15 },
        { name: 'Extra Whipped Cream', cost: 30 }
    ];
    const handleAddToFavorites = (item) => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isAlreadyFavorite = storedFavorites.some(fav => fav.name === item.name);
        
        let updatedFavorites;
        if (isAlreadyFavorite) {
            updatedFavorites = storedFavorites.filter(fav => fav.name !== item.name);
        } else {
            updatedFavorites = [...storedFavorites, item];
        }
        
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
    

    return (
        <div>
            <EshopNavBar />
            <h2>Order Details for {item?.name}</h2>
            <div className='order-content'>
                <div className='img-back'>
                    <img src={item?.image} alt={item?.name} />
                    <h1>{item?.name}</h1>
                </div>
            </div>

            <h2 id='h2-size'>Size Option:</h2>
            <hr />

            <div className="size-options-container">
                {sizeOptions.map((size) => (
                    <div
                        key={size.name}
                        className={`size-option ${selectedSize === size.name ? 'selected' : ''}`}
                        onClick={() => setSelectedSize(size.name)}
                    >
                        {size.image}
                        <p>{size.name}</p>
                        <span>{size.volume}</span>
                    </div>
                ))}
            </div>

            <button onClick={() => setShowCustomise(true)} className='cus-button'>Customise <GiFairyWand /></button>

            {showCustomise && (
                <div className='cus-popup'>
                    <h2>Customise Your {item?.name} ...</h2>
                    <p style={{ fontSize: 18, fontWeight: 'bold' }}>Flavours:</p>
                    <div className="flavor-grid">
                        {flavorOptions.map((flavor, index) => (
                            <div key={index} className="flavor-option">
                                <label>
                                    <input type="checkbox" checked={selectedFlavors.includes(flavor.name)} onChange={() => handleFlavorChange(flavor.name)} />
                                    {flavor.name} + {flavor.cost} Rs.
                                </label>
                            </div>
                        ))}
                    </div>
                    <br /><br />
                    <p style={{ fontSize: 18, fontWeight: 'bold' }}>Add-ons (for Cold Beverages):</p>
                    <div className="flavor-grid">
                        {AddOns.map((addOn, index) => (
                            <div key={index} className="flavor-option">
                                <label>
                                    <input type="radio" name='addOn' checked={selectedAddOn === addOn.name} onChange={() => handleAddOnChange(addOn.name)} />
                                    {addOn.name} +{addOn.cost} Rs.
                                </label>
                            </div>
                        ))}
                    </div>
                    <br /><br />

                    <p style={{ fontSize: 18, fontWeight: 'bold' }}>Preparation Methods:</p>
                    <div className="flavor-grid">
                        {prepMethods.map((prepM, index) => (
                            <div key={index} className="flavor-option">
                                <label>
                                    <input type="radio" name='prep' checked={selectedPreparation === prepM.name} onChange={() => handlePreparationChange(prepM.name)} />
                                    {prepM.name} + {prepM.cost} Rs.
                                </label>
                            </div>
                        ))}
                    </div>
                    <br /><br />

                    <p style={{ fontSize: 18, fontWeight: 'bold' }}>Add Whipped Cream:</p>
                    <div className="flavor-grid">
                        {wCreams.map((Wcr, index) => (
                            <div key={index} className="flavor-option">
                                <label>
                                    <input type="radio" name='wc' checked={selectedWhippedCream === Wcr.name} onChange={() => handleWhippedCreamChange(Wcr.name)} />
                                    {Wcr.name} + {Wcr.cost} Rs.
                                </label>
                            </div>
                        ))}
                    </div>
                    <br /><br />
                    <p style={{ fontSize: 18, fontWeight: 'bold' }}>Special Instructions:</p>
                    <br />
                    <textarea rows={10} cols={80} placeholder='We strive to accommodate special requests, but not all substitutions may be possible. Additional charges may apply.'></textarea>
                    <center><button onClick={() => setShowCustomise(false)} className='close-button'>Finish <GiFairyWand /></button></center>
                </div>
            )}

            <button onClick={handleAddToCart} className='order-button'>Proceed to Add to Cart</button>

            {showPopup && (
                <AddtoCartPopup
                    item={item}
                    onClose={closePopup}
                    flavorOptions={flavorOptions}
                    addOns={AddOns}
                    prepMethods={prepMethods}
                    wCreams={wCreams}
                    selectedFlavors={selectedFlavors}
                    selectedAddOn={selectedAddOn}
                    selectedPreparation={selectedPreparation}
                    selectedWhippedCream={selectedWhippedCream}
                    onAddToCart={handleAddToCartSubmit}
                    onAddToFavorites={handleAddToFavorites}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
            
                />
            )}
            <br /><br />
            <Footer />
        </div>
    );
}