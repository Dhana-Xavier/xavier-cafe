const mongoose = require("mongoose");

const SweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., "sundae", "icecream"
});

module.exports = mongoose.model("Sweet", SweetSchema);
