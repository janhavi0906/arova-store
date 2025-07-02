// backend/routes/orderRoutes.cjs
const express = require('express');
const router = express.Router();
const Order = require('../models/Order.cjs'); // Make sure the path is correct
const User = require('../models/User.cjs'); // Assuming you have a User model for userId validation

// @desc    Place a new order
// @route   POST /api/orders/place
// @access  Private (or Public if guest checkout is allowed without login)
router.post('/place', async (req, res) => {
    try {
        const { userId, items, total, shippingAddress, status } = req.body;

        // Basic server-side validation
        if (!items || items.length === 0 || !total || !shippingAddress) {
            return res.status(400).json({ message: 'Missing required order details: items, total, or shipping address.' });
        }

        // Optional: Validate userId if it's required for logged-in users
        // If userId is optional for guests, you can skip this block or make it conditional
        if (userId) {
             const userExists = await User.findById(userId);
             if (!userExists) {
                 return res.status(404).json({ message: 'User not found for this order.' });
             }
        }
       
        // Create a new order
        const newOrder = new Order({
            userId: userId || null, // Set to null if userId is optional and not provided
            items,
            total,
            shippingAddress,
            status: status || 'Pending',
        });

        const createdOrder = await newOrder.save();

        res.status(201).json({
            message: 'Order placed successfully!',
            _id: createdOrder._id, // Return the MongoDB _id
            order: createdOrder // Optionally return the full order object
        });

    } catch (error) {
        console.error('Error placing order:', error);
        // Mongoose validation error handling
        if (error.name === 'ValidationError') {
            let messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: 'Validation error', details: messages });
        }
        res.status(500).json({ message: 'Internal Server Error while placing order.', error: error.message });
    }
});

module.exports = router;