import React, { useEffect, useState } from 'react'

import '../App.css'
import { useNavigate } from 'react-router-dom'
export default function MenuNavBar() {
	const navigate=useNavigate();
	const nur=()=>{
		navigate('/nutrition');
	}
	const [img, setImg] = useState("hots2");
	
		var images = ['hots2','chiller2','delights','sweet']
	
    useEffect(() => {
      const interval = setInterval(() => {
        setImg((prevImg) => {
          const currentIndex = images.indexOf(prevImg);
          const nextIndex = (currentIndex + 1) % images.length;
          return images[nextIndex];
        });
      }, 10000);
    
      return () => clearInterval(interval);
    }, [images]);
    


	return (
		<div className='menubar' id='menu' >
      <ul className='menubar-list' >
        <li onClick={()=>setImg('hots2')}> HOT CLASSICS</li>
        <li onClick={()=> setImg('chiller2')}> CHILLERS</li>
        <li onClick={()=>setImg('delights')}> ALL DAY DELIGHTS</li>
        <li onClick={()=>setImg('sweet')}> SWEET TOOTH X 32</li>
        <li onClick={nur}> NUTRITIONAL INFO</li>
        

      </ul>
      <img src={`./assets/${img}.png`} height="700px" width="1519px" />
    </div>
  )
  
}