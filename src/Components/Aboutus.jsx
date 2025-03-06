import React from 'react';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';
export default function AboutUs() {
  const navigate = useNavigate();

  const home = () => {
    navigate('/');
  };

  return (
    <div className="dxcafe-about-us-container">
      
      <div className="dxcafe-about-us-content">
      <a href='#log' className='logo' onClick={home}><img src="./assets/starbucks.png" alt="" /></a>
        
        <h1>Welcome to DX Cafe</h1>
       
        <p>
          At DX Cafe, we blend the rich history of coffee with the innovations of
          the digital age. Our mission is to bring the best of both worlds into a single
          space where coffee, technology, and community intersect.
        </p>
        <br/>
        <p>
          We offer more than just coffee; we offer an experience. Whether you're
          working on the latest tech project or enjoying time with friends, DX Cafe is your
          place to recharge, innovate, and connect.
        </p>
        <br/>
        <p>
          Our beans are sourced from the finest growers, ethically and sustainably. We
          pride ourselves in making every cup a special moment with a focus on quality,
          creativity, and the love of coffee.
        </p>
        < br/>
        <p>
          Experience our cafe today and see how we're changing the way you think about coffee
          and technology.
        </p>
      </div>
    </div>
  );
}
