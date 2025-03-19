import React from "react";
import "./Checkout.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout({ total, setCart }) {
    const gst = 0.1111;
    const conFee = 0.05;
    const discount = 0.2;
    const gstAmt = total * gst;
    const conFeeAmt = total * conFee;
    const discAmt = total >= 450 ? total * discount : 0;
    const grandTotal = total + gstAmt + conFeeAmt - discAmt;
    const navigate = useNavigate();

    const confirm = async () => {
        if (total === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your cart is empty! Add items to proceed.",
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to confirm your order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const orderData = {
                        total: total.toFixed(2),
                        gst: gstAmt.toFixed(2),
                        conFee: conFeeAmt.toFixed(2),
                        discount: discAmt.toFixed(2),
                        grandTotal: grandTotal.toFixed(2),
                        items: JSON.parse(localStorage.getItem("cart")) || [],
                        user: JSON.parse(localStorage.getItem("user"))?.email || "guest",
                    };

                    const res = await axios.post("http://localhost:3001/placeorder", orderData);

                    if (res.data.success) {
                        Swal.fire({
                            title: "Order Placed!",
                            text: "Thank you for your order 😊",
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(() => {
                            setCart([]);
                            localStorage.removeItem("cart");
                            navigate("/home");
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Failed!",
                            text: "Something went wrong. Please try again.",
                        });
                    }
                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Unable to place order. Check your network!",
                    });
                    console.error(err);
                }
            }
        });
    };

    return (
        <div className="checkout-box">
            <h2>CHECKOUT SUMMARY</h2>
            <div className="checkout-details">
                <p>Subtotal: ₹{total.toFixed(2)}</p>
                <p>GST (11.11%): ₹{gstAmt.toFixed(2)}</p>
                <p>Convenience Fee: ₹{conFeeAmt.toFixed(2)}</p>
                {discAmt > 0 ? (
                    <p>Discount: -₹{discAmt.toFixed(2)}</p>
                ) : (
                    <p>No Discount Applied</p>
                )}
                <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
                <button className="checkout-btn" onClick={confirm}>
                    Confirm & Pay
                </button>
            </div>
        </div>
    );
}
