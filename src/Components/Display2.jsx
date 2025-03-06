import React from 'react';
import './Display2.css';

export default function Display2({ image, name, price, description, onClick }) {
  return (
    <div className='display2-box' onClick={onClick}>
      <img src={image} alt={name} className='display2-image' />
      <div className='display2-description'>
        <h3 className="display2-name">{name}</h3>
       <strong> <p className="display2-price">Price: ₹ {price} .00</p></strong>
        <p className="display2-desc">  {description}</p> 
      </div>
    </div>
  );
}