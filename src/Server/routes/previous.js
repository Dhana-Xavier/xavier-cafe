const express = require("express");
const router = express.Router();
const PreviousOrder = require("../models/PreviousOrder");

// Add a new order
router.post("/addOrder", async (req, res) => {
  try {
    const newOrder = new PreviousOrder(req.body);
    await newOrder.save();
    res.status(200).json({ success: true, message: "Order added successfully!" });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ success: false, message: "Error saving order." });
  }
});

// Get orders by user email
router.get("/getOrders", async (req, res) => {
  const { email } = req.query;

  try {
    const orders = await PreviousOrder.find({ user: email }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Error fetching orders." });
  }
});

module.exports = router;
