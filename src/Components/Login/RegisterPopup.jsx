import React, { useState } from "react";
import "./LoginPopup.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function RegisterPopup({ isOpen, onClose, onLogin }) {
  const navigate = useNavigate();
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/Authentification", { uname, email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Mail already Exist") {
          alert("Mail already Exist");
        } else {
          onLogin();
        }
      })
      .catch((err) => console.log(err)); 
  };


  if (!isOpen) {
    return null;
  }


  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="login-container">
          <h2>Register</h2>
          <p>Create your Account</p>
          <button className="close-btn" onClick={onClose}>
            x
          </button>
          <form onSubmit={handleRegister}>
            <div className="form-input">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={uname}
                onChange={(e) => setUname(e.target.value)}
              />
            </div>
            <div className="form-input">
              <input
                type="email"
                placeholder="E-Mail ID/ Phone No"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-input">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-submit">
              <button type="submit">Register</button>
            </div>
            <div className="signup">
              <p>Already have an account?</p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onLogin();
                }}
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
