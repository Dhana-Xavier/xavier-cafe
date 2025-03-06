import React from 'react';
import './Offers.css';
import {offersData} from './ContentOffers';
import { useNavigate } from 'react-router-dom';


export default function Offers() {
  const navigate = useNavigate();

  const home = () => {
    navigate('/');
  };
  const eshop=()=>{
   navigate('/eshop')
  }
  return ( 
    <div className="offers-container" onClick={eshop}>
      <a href='#log' className='logo' onClick={home}><img src="./assets/starbucks.png" alt="" /></a>
      <h2>Current Offers</h2>
      <br/>
      <br/>
      <div className="offers-list" >
        {offersData.map((offer) => (
          <div key={offer.id} className="offer-card">
            <img src={offer.image} alt={offer.title} className="offer-image" />
            <div className="offer-details">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <span className="offer-discount">{offer.discount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
