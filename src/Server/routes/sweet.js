const express = require("express");
const Sweet = require("../models/sweet");

const router = express.Router();


router.get("/getSweets", async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sweets" });
  }
});


router.get("/getSweetsByCategory", async (req, res) => {
  const { category } = req.query;
  try {
    const sweets = await Sweet.find({ category });
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching category sweets" });
  }
});

router.post("/addSweet", async (req, res) => {
  try {
    const newSweet = new Sweet(req.body);
    await newSweet.save();
    res.json({ message: "Sweet added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding sweet" });
  }
});


router.delete("/deleteSweet/:id", async (req, res) => {
  try {
    await Sweet.findByIdAndDelete(req.params.id);
    res.json({ message: "Sweet deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting sweet" });
  }
});

module.exports = router;
