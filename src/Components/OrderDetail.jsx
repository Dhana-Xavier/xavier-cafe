import React, { useState, useEffect } from 'react';
import './OrderDetails.css';

export default function OrderDetail() {
  const [orderTime, setOrderTime] = useState('');

  const now = new Date();
  const hours1 = now.getHours()+1;
  const hours2 = now.getHours()+2;
  const hours3 = now.getHours()+3;
  const hours4 = now.getHours()+4;
  const hours5 = now.getHours()+5;
  const minutes2 = "00";
  const amorpm = hours1 >= 12 ? 'PM' : 'AM';
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const amorpm = hours >= 12 ? 'PM' : 'AM';
    const showHours = hours > 12 ? hours - 12 : hours;
    const showMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${showHours}:${showMinutes} ${amorpm}`;
  };

  useEffect(() => {
    setOrderTime(getCurrentTime());
  }, []);

  const handleUpdate = () => {
    alert('Pickup Time Updated');
  }

  return (
    <div className="order-details-container">
      <h2>Pickup Time</h2>
      <p>
       <strong> <label htmlFor="Date">Date:</label></strong>
       <select id="Date">
        <option value="1">Today</option>
        <option value="2">Tomorrow</option>
        <option value="3">Next Monday</option>
        <option value="4">Next Tuesday</option>
        <option value="5">Next Wednesday</option>
        <option value="6">Next Thursday</option>
        </select>
      </p>
      <p>
       
        <strong><label htmlFor="Time">Time:</label></strong>
       <select id="Time">
        <option value="1">{orderTime}</option>
        <option value="2"> {hours1} : {minutes2} :{amorpm}</option>
        <option value="3">{hours2} : {minutes2} :{amorpm}</option>
        <option value="4">{hours3} : {minutes2} :{amorpm} </option>
        <option value="5">{hours4} : {minutes2} :{amorpm}</option>
        <option value="6">{hours5} : {minutes2} :{amorpm}</option>
        </select>
      </p>
      <button onClick={handleUpdate} className='update-btn'>Update</button>
    </div>
  );
}