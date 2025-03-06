import React from "react";
import { GiCoffeeCup } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { MdPhoneInTalk } from "react-icons/md";
import { BiLogoGmail } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import "./Footer.css"; 
export default function Footer() {
  return (
   <footer id="footer">
   <div className="footer-content">
    <h3> <GiCoffeeCup/> Xavier's Cafe</h3>
    <p> <FaLocationDot/> 123, Coffee Street ,Leodas City  </p>
    <p> <MdPhoneInTalk/> +91 9876543210</p>
    <p> <BiLogoGmail/> contact@dxcafe.com</p>
     <p>🕒 Open: Mon-Sun | 7 AM - 11 PM</p>
   </div>
   <div className="footer-social">
         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook/></a> 
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram/></a> 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><BsTwitterX/></a>
   </div>
   <div className="footer-content">
  
   </div>
    <div className="footer-bottom"> 
      &copy; 2025 Xavier's Cafe. All rights reserved.</div>
   </footer>
  );
}
