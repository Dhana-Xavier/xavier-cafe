import React, { useState } from 'react';
import MenuNavbar2 from './MenuNavbar2';
import AddtoCartPopup from './AddtoCartPopup';
import './Cart.css';
import NavBar from './NavBar'
import Footer from './Footer';
import Swal from 'sweetalert2';


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
  const handleAddToCart = (item) => {
    addToCart(item);

    // SweetAlert Notification
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${item.name} has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500
    });

    closePopup();
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
          onAddToCart={handleAddToCart}
          onAddToFavorites={toggleFavorite}
        />
      )}
      <Footer/>
    </div>
  );
}
