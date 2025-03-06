import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EshopNavBar from './EshopNavBar';
import { newShared } from './ContentShared';
import { newEgg } from './ContentEgg';
import { newToast } from './ContentToast';
import { newDelights } from './ContentAllday';
import { newSandwiches } from './ContentSand';
import { newBurger } from './ContentBurgers';
import Display2 from './Display2';
import Footer from './Footer';
import AddtoCartPopup2 from './AddtocartPopup2';

export default function AllDayDelights({ addToCart }) {
  const [showPopup, setShowPopup] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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
    setFavorites((prevFavorites) => {
      const isFav = prevFavorites.some((item) => item.name === favItem.name);
      return isFav ? prevFavorites.filter((item) => item.name !== favItem.name) : [...prevFavorites, favItem];
    });
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

      <h2 id='splate'>Shared Plates</h2>
      <div className='food-content'>
        {newShared.map((item, index) => (
          <Display2 key={index} image={item.image} name={item.name} price={item.price} description={item.description}
            onClick={() => ItemClick(item)} onFavorite={() => handleAddToFav(item)} />
        ))}
      </div>

      <h2 id='egg'>Egg Benedict</h2>
      <div className="food-content">
        {newEgg.map((item, index) => (
          <Display2 key={index} image={item.image} name={item.name} price={item.price} description={item.description}
            onClick={() => ItemClick(item)} onFavorite={() => handleAddToFav(item)} />
        ))}
      </div>

      <h2 id='toast'>Toasts</h2>
      <div className="food-content">
        {newToast.map((item, index) => (
          <Display2 key={index} image={item.image} name={item.name} price={item.price} description={item.description}
            onClick={() => ItemClick(item)} onFavorite={() => handleAddToFav(item)} />
        ))}
      </div>

      <h2 id='sand'>Sandwich</h2>
      <div className="food-content">
        {newSandwiches.map((item, index) => (
          <Display2 key={index} image={item.image} name={item.name} price={item.price} description={item.description}
            onClick={() => ItemClick(item)} onFavorite={() => handleAddToFav(item)} />
        ))}
      </div>

      <h2 id='all'>All Day Delights</h2>
      <div className="food-content">
        {newDelights.map((item, index) => (
          <Display2 key={index} image={item.image} name={item.name} price={item.price} description={item.description}
            onClick={() => ItemClick(item)} onFavorite={() => handleAddToFav(item)} />
        ))}
      </div>
      <h2 id='burger'>All Day Delights</h2>
      <div className="food-content">
        {newBurger.map((item, index) => (
          <Display2 key={index} image={item.image} name={item.name} price={item.price} description={item.description}
            onClick={() => ItemClick(item)} onFavorite={() => handleAddToFav(item)} />
        ))}
      </div>
  <br /><br />
      {showPopup && <AddtoCartPopup2 item={currentItem} onClose={closePopup} onAddToCart={handleAddToCart} onAddToFavorites={handleAddToFav} />}
      
      <Footer />
    </div>
  );
}
