import React from 'react'
import './Checkout.css'
export default function Checkout( {total ,setCart}) {
    const gst=0.1111;
    const conFee=0.05;
    const discount=0.2;
    const gstAmt=total*gst;
    const conFeeAmt=total*conFee;
    const discAmt= total>=450? total * discount: 0;
    const grandTotal=total+gstAmt+conFeeAmt-discAmt;
    const confirm=()=>{
      if(window.confirm("Do You Want to Confirm Your Order ")){
      alert("Order Placed Successfully!! \n Thank You ^-^");
      setCart([]);
    }
    }
  return (
    <div className='checkout-box'>
        <h2>CHECKOUT SUMMARY</h2>
        <div className="checkout-details">
            <p> Subtotal: ₹{total.toFixed(2)}</p>
            <p> GST(11.11%): ₹{gstAmt.toFixed(2)}</p>
            <p>Convenience Fee : ₹{conFeeAmt.toFixed(2)}</p>
            {discAmt>0 && <p> Discount: -₹{discAmt.toFixed(2)}</p>}
    <h3> Grand Total: ₹{grandTotal.toFixed(2)}</h3>
    <button className='checkout-btn' onClick={()=> {confirm()}}> Confirm & Pay</button>
    
        </div>


    </div>
  )
}
