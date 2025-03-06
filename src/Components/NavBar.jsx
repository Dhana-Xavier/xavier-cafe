import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import LoginPopup from "./Login/LoginPopup";
import { FiSearch } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";

export default function NavBar() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storeduser = JSON.parse(localStorage.getItem("user"));
    if (storeduser) {
      setUser(storeduser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?searchterm=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <div className="navbar">
        <a href="#log" className="logo" onClick={() => navigate("/")}>
          <img src="./assets/starbucks.png" alt="Logo" />
        </a>

        <div className="nav-links">
          <a onClick={(e) => { e.preventDefault(); navigate("/menu"); }}>Menu</a>
          <a href="#logo" onClick={() => navigate("/eshop")}>
            E-Shop <MdOutlineShoppingCart />
          </a>
          <a href="#about" onClick={() => navigate("/aboutus")}>About us</a>
          <a href="#offers" onClick={() => navigate("/offers")}>Offers</a>
          <a href="#favo" onClick={() => navigate("/fav")}>Favorites</a>
          <a href="#rate" onClick={()=>navigate("/rate")}>Rate Us</a>
          <a href="#footer">Contact Us</a>

         
        

          <div className="nav-links-right">
          <form onSubmit={handleSearch} className="search-bar">
            <input type="search" placeholder="Search menu..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit"><FiSearch/></button>
          </form>
           <a onClick={() => navigate('/cart')}><FaCartShopping /></a>
            <div className="dropdown">
              <a onClick={() => setShowDropdown(!showDropdown)}>
                <FaRegBell />
              </a>
              {showDropdown && (
                <div className="dropdown-content notifi">
                  <div className="notification-item">🔖 Discount Applied if U Shop Above 450!!!</div>
                  <div className="notification-item">🎉 New offer: 20% off on all drinks!</div>
                  <div className="notification-item">🕒 Store closing early today at 6 PM.</div>
                  <div className="notification-item">🔥 Flash Sale: Buy 1 Get 1 Free on Cappuccino!</div>
                  <div className="notification-item">🍩 Limited-time dessert menu is now available.</div>
                </div>
              )}
            </div>

            <div className="navsign">
              {user ? (
                <div className="user-profile">
                  <CgProfile size={25} className="user-icon" />
                  <div className="user-drop">
                    <p>
                      Welcome, <br />
                      <b>{user.uname}</b>
                    </p>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              ) : (
                <a href="#login" onClick={() => setShowLogin(!showLogin)}>
                  <CgProfile />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <LoginPopup isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
