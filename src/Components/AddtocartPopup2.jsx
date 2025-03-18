import React, { useState, useEffect } from "react";
import "./AddtoCartPopup.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddtoCartPopup2({ item, onClose, onAddToCart, onAddToFavorites }) {
  const [count, setCount] = useState(item.quantity || 1);
  const [total, setTotal] = useState(item.totalPrice || item.price);
  const [isFav, setIsFav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Load favorites and check login status
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFav(storedFavorites.some((fav) => fav.name === item.name));

    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
  }, [item]);

  // ✅ Update total price when count changes
  useEffect(() => {
    setTotal(item.price * count);
  }, [count, item.price]);

  // ✅ Increase quantity
  const increment = () => setCount(count + 1);

  // ✅ Decrease quantity
  const decrement = () => count > 1 && setCount(count - 1);

  // ✅ Add item to cart
  const addtoCart = () => {
    if (!isLoggedIn) {
      setErrorMessage("⚠ Please log in to add items to your cart.");
      return;
    }

    const cartItem = {
      ...item,
      quantity: count,
      totalPrice: total,
    };

    onAddToCart(cartItem);

    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${item.name} has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500,
    });

    onClose();
  };

  // ✅ Add/Remove from favorites
  const toggleFavorite = () => {
    if (!isLoggedIn) {
      setErrorMessage("⚠ Please log in to add items to favorites.");
      return;
    }

    setIsFav(!isFav);
    onAddToFavorites(item);
  };

  return (
    <div className="pop-overlay">
      <div className="pop-content">
        {/* ❌ Close Button */}
        <a className="cls-btn" onClick={onClose}>
          <IoCloseCircleOutline />
        </a>

        {/* 🍽️ Item Details */}
        <h3>{item.name}</h3>
        <img src={item.image} alt={item.name} />
        <p>Final Price: RS. {total.toFixed(2)}</p>

        {/* 🧾 Footer Actions */}
        <div className="popup-footer">
          {/* 🔢 Quantity Control */}
          <div className="count-btn">
            <button onClick={decrement}>
              <CiCircleMinus />
            </button>
            <span>{count}</span>
            <button onClick={increment}>
              <CiCirclePlus />
            </button>
          </div>

          {/* 🛒 Add to Cart Button */}
          <button onClick={addtoCart}>Add To Cart</button>
          <br />

          {/* ⚠️ Error Message */}
          <div className="error-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>

          {/* ❤️ Favorite Button */}
          <button className="fav-btn" onClick={toggleFavorite}>
            {isFav ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
}
