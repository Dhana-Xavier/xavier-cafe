import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; 
export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <>
     <video autoPlay muted loop id="myVideo"> <source src="assets\get.mp4" type="video/mp4" />
     </video>
    
    <div className="get-started-bg">
     
      <div className="overlay">
        <h1 className="get-started-title">Welcome to Café Xavier ☕</h1>
        <p className="get-started-text">Experience the finest coffee & delightful treats.</p>
        <button onClick={() => navigate("/home")} className="get-started-button">
          Get Started
        </button>
      </div>
    </div>
    </>
  );
}
