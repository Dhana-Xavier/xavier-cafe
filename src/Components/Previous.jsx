import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Previous.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Previous() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch user and previous orders on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchPreviousOrders(storedUser.email);
    }
  }, []);

  // Fetch orders for the current user
  const fetchPreviousOrders = async (email) => {
    try {
      const res = await axios.get("http://localhost:3001/api/previous/getOrders", {
        params: { email },
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        console.error("No orders found.");
      }
    } catch (err) {
      console.error("Error fetching previous orders:", err);
    }
  };

  return (
    <div className="previous-container">
      <NavBar />
      <h2>Your Previous Orders</h2>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <p>
                <strong>User:</strong> {order.user}
              </p>
              <p>
                <strong>Items:</strong>
                {order.items && order.items.length > 0 ? (
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} - ₹{item.price} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span> Beverage</span>
                )}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.grandTotal}
              </p>
              <p>
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No previous orders found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
