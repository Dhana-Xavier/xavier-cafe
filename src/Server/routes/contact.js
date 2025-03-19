const express = require("express");
const router = express.Router();
const ContactModel = require("../models/contact");

// POST route to handle contact form submissions
router.post("/sendMessage", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newContact = new ContactModel({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Error saving message to database" });
  }
});

module.exports = router;
