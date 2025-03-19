const express = require("express");
const router = express.Router();
const RatingModel = require("../models/Rating");

// POST /api/rateus - Save user rating
router.post("/", async (req, res) => {
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: "Invalid rating." });
  }

  try {
    const newRating = new RatingModel({ rating });
    await newRating.save();
    res.status(200).json({ success: true, message: "Rating submitted successfully." });
  } catch (err) {
    console.error("Error saving rating:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
