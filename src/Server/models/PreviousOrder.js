const mongoose = require("mongoose");

const previousOrderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  gst: Number,
  conFee: Number,
  discount: Number,
  grandTotal: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PreviousOrder", previousOrderSchema);
