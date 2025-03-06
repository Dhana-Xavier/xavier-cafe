import React, { useEffect, useState } from 'react';
import EshopNavBar from './EshopNavBar';
import { newSundae } from './ContentSundae';
import { newIce } from './ContentIce';
import { newCakes } from './ContentCake';
import { newChoco } from './ContentChoco';
import Display2 from './Display2';
import Footer from './Footer';
import AddtoCartPopup2 from './AddtocartPopup2';
import { useLocation } from 'react-router-dom';

export default function Sweet({ addToCart, toggleFavorite }) {
  const [showPopup, setShowPopup] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const ItemClick = (item) => {
    setCurrentItem(item);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleAddToCart = (cartItem) => {
    addToCart(cartItem);
  };

  const handleAddToFav = (favItem) => {
    toggleFavorite(favItem);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      <EshopNavBar />
      <br />

      <h2 id='sundae'>Sundae</h2>
      <div className='food-content'>
        {newSundae.map((item, index) => (
          <Display2 key={index} image={item.image} name={item.name} price={item.price} 
            description={item.description} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => handleAddToFav(item)} 
          />
        ))}
      </div>

      <h2 id='ice'>Ice Creams</h2>
      <div className="food-content">
        {newIce.map((item, index) => (
          <Display2 key={index} image={item.image} name={item.name} price={item.price} 
            description={item.description} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => handleAddToFav(item)} 
          />
        ))}
      </div>

      <h2 id='cake'>Cakes</h2>
      <div className="food-content">
        {newCakes.map((item, index) => (
          <Display2 key={index} image={item.image} name={item.name} price={item.price} 
            description={item.description} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => handleAddToFav(item)} 
          />
        ))}
      </div>
      <h2 id='choco'>Chocolates</h2>
      <div className="food-content">
        {newChoco.map((item, index) => (
          <Display2 key={index} image={item.image} name={item.name} price={item.price} 
            description={item.description} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => handleAddToFav(item)} 
          />
        ))}
      </div>

      {showPopup && <AddtoCartPopup2 item={currentItem} onClose={closePopup} onAddToCart={handleAddToCart} onAddToFavorites={handleAddToFav} />}

      <br />
      <br />
      <Footer />
    </div>
  );
}
