import React from 'react';
import './Checkout.css';
import Swal from 'sweetalert2';

export default function Checkout({ total, setCart }) {
    const gst = 0.1111;
    const conFee = 0.05;
    const discount = 0.2;
    const gstAmt = total * gst;
    const conFeeAmt = total * conFee;
    const discAmt = total >= 450 ? total * discount : 0;
    const grandTotal = total + gstAmt + conFeeAmt - discAmt;

    const confirm = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to confirm your order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Order Placed!",
                    text: "Thank you for your order 😊",
                    icon: "success",
                    confirmButtonText: "OK"
                });
                setCart([]);
            }
        });
    };

    return (
        <div className='checkout-box'>
            <h2>CHECKOUT SUMMARY</h2>
            <div className="checkout-details">
                <p>Subtotal: ₹{total.toFixed(2)}</p>
                <p>GST (11.11%): ₹{gstAmt.toFixed(2)}</p>
                <p>Convenience Fee: ₹{conFeeAmt.toFixed(2)}</p>
                {discAmt > 0 && <p>Discount: -₹{discAmt.toFixed(2)}</p>}
                <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
                <button className='checkout-btn' onClick={confirm}>
                    Confirm & Pay
                </button>
            </div>
        </div>
    );
}
