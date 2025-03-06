import React, { useState } from 'react'
import { newCoffee } from './ContentCofee';
import { newIced } from './ContentIced';
import { newCool } from './ContentCoolDrinks';
import { newShake } from './ContentShakes';
import { newChiller } from './ContentChillers';
import { newFrappe } from './ContentFrappe';
import { newSundae } from './ContentSundae';
import { newIce } from './ContentIce';
import { newCakes } from './ContentCake';
import { newShared } from './ContentShared';
import { newEgg } from './ContentEgg';
import { newToast } from './ContentToast';
import { newDelights } from './ContentAllday';
import { newSandwiches } from './ContentSand';
import { useLocation } from 'react-router-dom';
import Display from './Display';
import NavBar from './NavBar';
import { FaMugHot,FaCookieBite } from 'react-icons/fa';
import { GiDonut } from "react-icons/gi"; 
import Footer from './Footer';
import AddtoCartPopup from './AddtoCartPopup';

export default function Search({addToCart ,toggleFavorite}) {

const [selectedItem,setSelectedItem]=useState(null);
   
    const menu=[
        ...newCakes,...newChiller,...newCoffee,...newDelights,...newCool,...newEgg,...newIce,
        ...newFrappe,...newIced,...newSandwiches,...newSundae,...newShake,...newShared,...newToast
    ]
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("searchterm")?.toLowerCase() || "";
  
    const availmenu = menu.filter(
      (menu) => menu.name?.toLowerCase().includes(searchQuery)
    );


  return (
    <div>
      <NavBar/>
       <div className='coffee-content'>
       {availmenu.length > 0 ? (
        <div className="coffee-content">
          {availmenu.map((item, index) => (
            <Display
              key={index}
              image={item.image}
              name={item.name}
              price={item.price}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      ) : (
        <div className="no-items-container">
        <FaMugHot size={50} color="#8B5A2B" />
        <FaCookieBite size={50} color="#D2691E" />
        <GiDonut size={50} color="#D2691E" />
        <p>No items found for "{searchQuery}"</p>
      </div>
      )}
    </div>
    {selectedItem && (
                <AddtoCartPopup item={selectedItem} onClose={() => setSelectedItem(null)}
                    onAddToCart={addToCart}  onAddToFavorites={toggleFavorite} 
                />
            )}
    <br />
    <br /><br />

    <Footer></Footer>
        </div>
  )
}
