import React, { useState } from 'react';
import './EshopNavBar.css';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";

export default function EshopNavBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const fav=()=>{
    navigate("/fav");
  }
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?searchterm=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="navbar">
      <a href="/home" className="logo">
        <img src="./assets/starbucks.png" alt="Logo" />
      </a>
      <div className="nav-links">
        <div className="dropdown">
          <button className="dropbtn" onClick={() => navigate('/eshop')}>Beverage</button>
          <div className="dropdown-content">
            <a onClick={() => navigate('/eshop#coffee')}>Coffee</a>
            <a onClick={() => navigate('/eshop#beverage')}>Beverage</a>
            <a onClick={() => navigate('/eshop#cooldrinks')}>Cool Drinks</a>
            <a onClick={() => navigate('/eshop#frappe')}>Frappe</a>
            <a onClick={() => navigate('/eshop#shakes')}>Milkshakes</a>
            <a onClick={() => navigate('/eshop#chillers')}>Chillers</a>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn" onClick={() => navigate('/food')}>Food</button>
          <div className="dropdown-content">
            <a onClick={() => navigate('/food#splate')}>Share Plates</a>
            <a onClick={() => navigate('/food#egg')}>Egg Benedict</a>
            <a onClick={() => navigate('/food#toast')}>Toasts</a>
            <a onClick={() => navigate('/food#sand')}>Sandwiches</a>
            <a onClick={() => navigate('/food#all')}>Delights</a>
            <a onClick={() => navigate('/food#burger')}>Burger</a>
            <a onClick={() => navigate('/food#own')}>Make Your Plate</a>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn" onClick={() => navigate('/sweet')}>Desserts</button>
          <div className="dropdown-content">
            <a onClick={() => navigate('/sweet#sundae')}>Sundae</a>
            <a onClick={() => navigate('/sweet#ice')}>Ice Cream</a>
            <a onClick={() => navigate('/sweet#cake')}>Cakes</a>
            <a onClick={() => navigate('/sweet#choco')}>Chocolates</a>
            <a onClick={() => navigate('/sweet#own')}>Make Your Plate</a>
          </div>
        </div>
       
        <div className="nav-links-right">
          <form onSubmit={handleSearch} className="search-bar">
            <input 
              type="search" 
              placeholder="Search menu..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button type="submit"><FiSearch /></button>
            
          </form>
          <a onClick={() => navigate('/fav')}><GrFavorite /></a>
          <a onClick={() => navigate('/cart')}><FaCartShopping /></a>
        </div>
      </div>
    </div>
  );
}
  