import React, { useEffect, useState } from 'react';
import EshopNavBar from './EshopNavBar';
import { newCoffee } from './ContentCofee';
import { newIced } from './ContentIced';
import { newCool } from './ContentCoolDrinks';
import { newShake } from './ContentShakes';
import { newChiller } from './ContentChillers';
import { newFrappe } from './ContentFrappe';
import Display from './Display';
import './Display.css';
import Footer from './Footer';
import AddtoCartPopup from './AddtoCartPopup';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Eshop({ addToCart, toggleFavorite, favorites }) {
  const [showPopup, setShowPopup] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const navigate = useNavigate();

  const ItemClick = (item) => {
  navigate('/orderplace', { state: { item } });
  };

  const closePopup = () => {
    setShowPopup(false);
    setCurrentItem(null);
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

      <h2 id='coffee'>Hot Classicals</h2>
      <div className='coffee-content'>
        {newCoffee.map((item, index) => (
          <Display key={index} image={item.image} name={item.name} price={item.price} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => toggleFavorite(item)} 
          />
        ))}
      </div>

      <h2 id='beverage'>Beverage</h2>
      <div className='coffee-content'>
        {newIced.map((item, index) => (
          <Display key={index} image={item.image} name={item.name} price={item.price} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => toggleFavorite(item)} 
          />
        ))}
      </div>

      <h2 id='cooldrinks'>Cool Drinks</h2>
      <div className='coffee-content'>
        {newCool.map((item, index) => (
          <Display key={index} image={item.image} name={item.name} price={item.price} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => toggleFavorite(item)} 
          />
        ))}
      </div>

      <h2 id='frappe'>Frappé</h2>
      <div className='coffee-content'>
        {newFrappe.map((item, index) => (
          <Display key={index} image={item.image} name={item.name} price={item.price} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => toggleFavorite(item)} 
          />
        ))}
      </div>

      <h2 id='shakes'>Shakes</h2>
      <div className='coffee-content'>
        {newShake.map((item, index) => (
          <Display key={index} image={item.image} name={item.name} price={item.price} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => toggleFavorite(item)} 
          />
        ))}
      </div>

      <h2 id='chillers'>All Time Chillers</h2>
      <div className='coffee-content'>
        {newChiller.map((item, index) => (
          <Display key={index} image={item.image} name={item.name} price={item.price} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => toggleFavorite(item)} 
          />
        ))}
      </div>

      {showPopup && (
        <AddtoCartPopup 
          item={currentItem} 
          onClose={closePopup} 
          onAddToCart={addToCart} 
          toggleFavorite={toggleFavorite} 
          favorites={favorites}
        />
      )}

      <Footer />
    </div>
  );
}
