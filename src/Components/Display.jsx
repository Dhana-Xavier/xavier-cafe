import React from 'react';
import './Display.css';

export default function Display({ image, name, price,onClick  }) {
    return (
        <div className='display-box' onClick={onClick} >
            <img src={image} alt={name} className='display-image'  />
        <div className='display-desciption' >
            <h3 className="display-name">{name}</h3>
            <p className="display-price">Price: ₹ {price}.00 </p>
             
 
            </div>
        </div>
    );
}