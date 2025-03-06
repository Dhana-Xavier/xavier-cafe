import React, { useState } from 'react'
import Footer from './Footer';
import NavBar from './Navbar';
import './rateus.css'
export default function Rateus() {
  const [rate,setRate]=useState(0);

  const handleRating=(rate)=>{
    setRate(rate);
    alert(`Thank you for rating us ${rate} stars!`);

  };
  return (
    <div className='rateus-container'>

      <NavBar />
      <img src="./assets/rate.png" alt="rateus"  height="550px" width=" auto" />


   <h2>Rate Us...</h2>
   <div >
       {[1,2,3,4,5].map((star)=>(
        <span key={star} className={`star ${star <= rate ? 'gold' : ''}`} onClick={()=>handleRating(star)}>★</span>
       ))}

   </div>
   <br /><br /><br /><br />
      <Footer/>
    </div>
  )
}
