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
import OrderDetail from './OrderDetail';
import { useLocation,useNavigate } from 'react-router-dom';

export default function Eshop({ addToCart, toggleFavorite }) {
  const [showPopup, setShowPopup] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const navigate=useNavigate();

  const ItemClick = (item) => {
    setCurrentItem(item);
    navigate('/orderplace', { state: { item } });
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
      {/* <OrderDetail /> */}

      <h2 id='coffee'>Hot Classicals</h2>
      <div className='coffee-content'>
        {newCoffee.map((item, index) => (
          <Display key={index} image={item.image} name={item.name} price={item.price} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => handleAddToFav(item)} 
          />
        ))}
      </div>

      <h2 id='beverage'>Beverage</h2>
      <div className='coffee-content'>
        {newIced.map((item, index) => (
          <Display key={index} image={item.image} name={item.name} price={item.price} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => handleAddToFav(item)} 
          />
        ))}
      </div>

      <h2 id='cooldrinks'>Cool Drinks</h2>
      <div className='coffee-content'>
        {newCool.map((item, index) => (
          <Display key={index} image={item.image} name={item.name} price={item.price} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => handleAddToFav(item)} 
          />
        ))}
      </div>

      <h2 id='frappe'>Frappé</h2>
      <div className='coffee-content'>
        {newFrappe.map((item, index) => (
          <Display key={index} image={item.image} name={item.name} price={item.price} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => handleAddToFav(item)} 
          />
        ))}
      </div>

      <h2 id='shakes'>Shakes</h2>
      <div className='coffee-content'>
        {newShake.map((item, index) => (
          <Display key={index} image={item.image} name={item.name} price={item.price} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => handleAddToFav(item)} 
          />
        ))}
      </div>

      <h2 id='chillers'>All Time Chillers</h2>
      <div className='coffee-content'>
        {newChiller.map((item, index) => (
          <Display key={index} image={item.image} name={item.name} price={item.price} 
            onClick={() => ItemClick(item)} 
            onFavorite={() => handleAddToFav(item)} 
          />
        ))}
      </div>
 <br /><br /><br /><br />
      {showPopup && <AddtoCartPopup item={currentItem} onClose={closePopup} onAddToCart={handleAddToCart} onAddToFavorites={handleAddToFav} />}
      <Footer />
    </div>
  );
}
