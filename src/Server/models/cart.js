const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            name: String,
            image: String,
            price: Number,
            quantity: Number,
            totalPrice: Number,
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
