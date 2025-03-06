    import React from 'react'
    import './MenuNavBar1.css'
 import {  useNavigate } from 'react-router-dom';

    export default function MenuNavbar2() {
const navigate=useNavigate();

        const menu=()=>{
            navigate("/menu");
          }
          const fav=()=>{
             navigate("/fav")
          }
          const prev=()=>{
            navigate("/prev")
         }
         const rate=()=>{
          navigate("/rate")
         }
    return (
        <div className='Navbar1'>
              <div className='nav-links2'>
                    <a href='#menu' onClick={menu}>Menu</a>
                      <a href='#prev' onClick={prev} >Previous</a>
                       <a href='#favo' onClick={fav} >Favorites</a>
                        <a href="#rateus" onClick={rate}>Rate Us</a>
            
                        </div>
        </div>
    )
    }
