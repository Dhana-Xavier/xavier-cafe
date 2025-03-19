import React, { useState } from "react";
import Footer from "./Footer";
import NavBar from "./Navbar";
import "./rateus.css";
import Swal from "sweetalert2";
import axios from "axios";

export default function Rateus() {
  const [rate, setRate] = useState(0);

  const handleRating = async (rate) => {
    setRate(rate);

    try {
      const res = await axios.post("http://localhost:3001/api/rateus", {
        rating: rate,
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: `Thank you for rating us ${rate} stars!`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to submit your rating. Please try again later.",
        });
      }
    } catch (err) {
      console.error("Error sending rating:", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="rateus-container">
      <NavBar />
      <img src="./assets/rate.png" alt="rateus" height="550px" width="auto" />
      <h2>Rate Us...</h2>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rate ? "gold" : ""}`}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
