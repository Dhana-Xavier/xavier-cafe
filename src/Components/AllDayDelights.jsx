import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EshopNavBar from "./EshopNavBar";
import { newShared } from "./ContentShared";
import { newEgg } from "./ContentEgg";
import { newToast } from "./ContentToast";
import { newDelights } from "./ContentAllday";
import { newSandwiches } from "./ContentSand";
import { newBurger } from "./ContentBurgers";
import Display2 from "./Display2";
import Footer from "./Footer";
import AddtoCartPopup2 from "./AddtocartPopup2";

export default function AllDayDelights({ addToCart, toggleFavorite }) {
  const [showPopup, setShowPopup] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // ✅ Load favorites from local storage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // ✅ Update favorites in local storage when changed
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Open item pop-up
  const ItemClick = (item) => {
    setCurrentItem(item);
    setShowPopup(true);
  };

  // ✅ Close pop-up
  const closePopup = () => {
    setShowPopup(false);
  };

  // ✅ Add to cart
  const handleAddToCart = (cartItem) => {
    addToCart(cartItem);
  };

  // ✅ Add/Remove from favorites
  const handleAddToFav = (favItem) => {
    toggleFavorite(favItem);
  };

  // ✅ Scroll to section if URL hash is present
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      <EshopNavBar />

      {/* 🥗 Shared Plates */}
      <h2 id="splate">Shared Plates</h2>
      <div className="food-content">
        {newShared.map((item, index) => (
          <Display2
            key={index}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
            onClick={() => ItemClick(item)}
            onFavorite={() => handleAddToFav(item)}
          />
        ))}
      </div>

      {/* 🍳 Egg Benedict */}
      <h2 id="egg">Egg Benedict</h2>
      <div className="food-content">
        {newEgg.map((item, index) => (
          <Display2
            key={index}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
            onClick={() => ItemClick(item)}
            onFavorite={() => handleAddToFav(item)}
          />
        ))}
      </div>

      {/* 🍞 Toasts */}
      <h2 id="toast">Toasts</h2>
      <div className="food-content">
        {newToast.map((item, index) => (
          <Display2
            key={index}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
            onClick={() => ItemClick(item)}
            onFavorite={() => handleAddToFav(item)}
          />
        ))}
      </div>

      {/* 🥪 Sandwiches */}
      <h2 id="sand">Sandwich</h2>
      <div className="food-content">
        {newSandwiches.map((item, index) => (
          <Display2
            key={index}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
            onClick={() => ItemClick(item)}
            onFavorite={() => handleAddToFav(item)}
          />
        ))}
      </div>

      {/* 🍽️ All Day Delights */}
      <h2 id="all">All Day Delights</h2>
      <div className="food-content">
        {newDelights.map((item, index) => (
          <Display2
            key={index}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
            onClick={() => ItemClick(item)}
            onFavorite={() => handleAddToFav(item)}
          />
        ))}
      </div>

      {/* 🍔 Burgers */}
      <h2 id="burger">Burgers</h2>
      <div className="food-content">
        {newBurger.map((item, index) => (
          <Display2
            key={index}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
            onClick={() => ItemClick(item)}
            onFavorite={() => handleAddToFav(item)}
          />
        ))}
      </div>

      <br />
      <br />
      
      {/* 🛒 Add to Cart Pop-up */}
      {showPopup && (
        <AddtoCartPopup2
          item={currentItem}
          onClose={closePopup}
          onAddToCart={handleAddToCart}
          onAddToFavorites={handleAddToFav}
        />
      )}

      <Footer />
    </div>
  );
}
