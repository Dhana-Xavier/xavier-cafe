import React, { useState } from "react";
import "./LoginPopup.css";
import RegisterPopup from "./RegisterPopup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { BsEye } from "react-icons/bs";

export default function LoginPopup({ isOpen, onClose }) {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const frompage = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/login", { email, password });

      if (result.data.status === "Success") {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome, ${result.data.uname}!`,
          showConfirmButton: false,
          timer: 2000,
        });

        localStorage.setItem("user", JSON.stringify({ email, uname: result.data.uname }));
        navigate(frompage);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: result.data,
          confirmButtonColor: "#ff4d4d",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#ff4d4d",
      });
      console.error(err);
    }
  };

  if (!isOpen && !isRegisterOpen) return null;

  return (
    <>
      {isOpen && !isRegisterOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="login-container">
              <h2>LOGIN</h2>
              <p>Login to create your profile</p>
              <button className="close-btn" onClick={onClose}>x</button>
              <form onSubmit={handleLogin}>
                <div className="form-input">
                  <input
                    type="email"
                    placeholder="E-Mail ID/ Phone No"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-input password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "🙈" : <BsEye />}
                  </span>
                </div>
                <div className="forget">
                  <a href="#">Forgot password?</a>
                </div>
                <div className="login-submit">
                  <button type="submit">Submit</button>
                </div>
                <div className="signup">
                  <p>Don't have an account?</p>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setRegisterOpen(true);
                    }}
                  >
                    Sign Up
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isRegisterOpen && (
        <RegisterPopup
          isOpen={isRegisterOpen}
          onClose={() => setRegisterOpen(false)}
          onLogin={() => setRegisterOpen(false)}
        />
      )}
    </>
  );
}
