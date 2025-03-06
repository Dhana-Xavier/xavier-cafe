import React, { useState } from 'react';
import MenuNavbar2 from './MenuNavbar2';
import AddtoCartPopup from './AddtoCartPopup';
import './Cart.css';
import NavBar from './NavBar'
import Footer from './Footer';

export default function Favorites({ favorites, toggleFavorite, addToCart }) {
  const [showPopup, setShowPopup] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleItem = (item) => {
    setCurrentItem(item);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <NavBar/>
      <MenuNavbar2 />

      <h2>Favorites ...</h2>
      <div>
        {favorites.length === 0 ? (
          <p>No favorites Yet...</p>
        ) : (
          favorites.map((item, index) => (
            <div key={index} className="fav-item" onClick={() => handleItem(item)}>
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item);
                }}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {showPopup && (
        <AddtoCartPopup
          item={currentItem}
          onClose={closePopup}
          onAddToCart={addToCart}
          onAddToFavorites={toggleFavorite}
        />
      )}
      <Footer/>
    </div>
  );
}
