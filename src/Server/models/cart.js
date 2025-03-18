const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true }, // Store email instead of ObjectId
    items: [
      {
        name: String,
        image: String,
        price: Number,
        quantity: Number,
        totalPrice: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
