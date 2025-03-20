import React, { useState, useEffect } from "react";
import "./Cart.css";
import Checkout from "./Checkout";
import AddtoCartPopup from "./AddtoCartPopup";
import axios from "axios";

export default function Cart({ cartItems = [], setCart }) {
  const [checkout, setCheckout] = useState(false);
  const [editItem, setEditItem] = useState(null);

  
  const user = JSON.parse(localStorage.getItem("user"));

 
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

 
  const grandTotal = mergeCart.reduce((acc, item) => acc + item.totalPrice, 0);

 
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

      setCart(res.data.items); 
      setEditItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="cart-box">
      
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

     
      {mergeCart.length > 0 && <h3>Grand Total: RS. {grandTotal.toFixed(2)}</h3>}

      
      {checkout && <Checkout total={grandTotal} setCart={setCart} />}

     
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
