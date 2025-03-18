import React, { useState, useEffect } from "react";
import "./Cart.css";
import Checkout from "./Checkout";
import AddtoCartPopup from "./AddtoCartPopup";
import axios from "axios";

export default function Cart({ cartItems = [], setCart }) {
  const [checkout, setCheckout] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // ✅ Get current logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Remove single item
  const removeItem = async (index) => {
    if (!user) {
      console.error("User not logged in.");
      return;
    }

    try {
      await axios.delete("http://localhost:3001/removeFromCart", {
        data: { user: user.email, item: cartItems[index] },
      });

      setCart(cartItems.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // ✅ Remove all items
  const removeAll = async () => {
    if (!user) {
      console.error("User not logged in.");
      return;
    }

    try {
      await axios.delete("http://localhost:3001/clearCart", {
        data: { user: user.email },
      });
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // ✅ Merge duplicate items in cart
  const mergeCart = cartItems.reduce((acc, item) => {
    const oldItem = acc.find((cartItem) => cartItem.name === item.name);
    if (oldItem) {
      oldItem.quantity += item.quantity;
      oldItem.totalPrice += item.totalPrice;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  // ✅ Calculate Grand Total
  const grandTotal = mergeCart.reduce((acc, item) => acc + item.totalPrice, 0);

  // ✅ Handle item update after edit
  const handleUpdateCart = async (updatedItem) => {
    if (!user) {
      console.error("User not logged in.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/updateCart", {
        user: user.email,
        item: updatedItem,
      });

      setCart(res.data.items); // Update with the latest cart from backend
      setEditItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="cart-box">
      {/* 🛒 Empty Cart Message */}
      {mergeCart.length === 0 ? (
        <h3>Your Cart is Empty</h3>
      ) : (
        <ul>
          {mergeCart.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>Price: RS. {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: RS. {item.totalPrice}</p>
                <div className="cart-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => setEditItem(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 🛒 Cart Actions */}
      <div className="cart-button">
        {mergeCart.length > 0 && (
          <>
            <button
              onClick={() => setCheckout(true)}
              className="buyNow-btn"
            >
              Buy Now
            </button>
            <button onClick={removeAll} className="rAll-btn">
              Remove All
            </button>
          </>
        )}
      </div>

      {/* 💰 Grand Total */}
      {mergeCart.length > 0 && <h3>Grand Total: RS. {grandTotal.toFixed(2)}</h3>}

      {/* ✅ Checkout Component */}
      {checkout && <Checkout total={grandTotal} setCart={setCart} />}

      {/* ✏️ Edit Cart Popup */}
      {editItem && (
        <AddtoCartPopup
          item={editItem}
          onAddToCart={handleUpdateCart}
          onClose={() => setEditItem(null)}
        />
      )}
    </div>
  );
}
