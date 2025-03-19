const express = require('express');
const Cart = require('../models/cart');

const router = express.Router();


router.post('/addToCart', async (req, res) => {
    const { user, item } = req.body;

    try {
        let cart = await Cart.findOne({ userEmail: user });

        if (!cart) {
            cart = new Cart({ userEmail: user, items: [] });
        }

        const existingItem = cart.items.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += item.quantity;
            existingItem.totalPrice += item.totalPrice;
        } else {
            cart.items.push(item);
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Error adding to cart" });
    }
});


router.get('/getCart', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userEmail: req.query.user });
        res.json(cart ? cart.items : []);
    } catch (error) {
        res.status(500).json({ error: "Error fetching cart" });
    }
});


router.delete('/removeFromCart', async (req, res) => {
    const { user, item } = req.body;

    try {
        const cart = await Cart.findOne({ userEmail: user });

        if (cart) {
            cart.items = cart.items.filter(cartItem => cartItem.name !== item.name);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ error: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error removing item" });
    }
});


router.delete('/clearCart', async (req, res) => {
    try {
        await Cart.findOneAndUpdate({ userEmail: req.body.user }, { items: [] });
        res.json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ error: "Error clearing cart" });
    }
});

module.exports = router;
