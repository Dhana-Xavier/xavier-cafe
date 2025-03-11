import React, { useState } from "react";
import "./Contactus.css";
import Swal from "sweetalert2";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
    
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "We will get back to you soon.",
        confirmButtonColor: "#3085d6",
      });
      setFormData({ name: "", email: "", message: "" }); // Reset form
    }
  };

  return (
    <><NavBar/>
    <br /><br /><br /><br />
    <div className="contact-container">
        
      <div className="contact-info">
        
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Reach out with any questions or feedback.</p>
        <div className="contact-details">
          <p><FaPhone /> +91 9876543210</p>
          <p><FaEnvelope /> support@dxcafe.com</p>
          <p><FaMapMarkerAlt /> 123 Coffee Street,Leodas  City, India</p>
        </div>
      </div>

      <div className="contact-form">
        <h3>Send Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
    <br /><br /><br />
    <Footer/>
    </>
  );
}
