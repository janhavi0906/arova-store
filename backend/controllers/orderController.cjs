const Order = require('../models/Order.cjs');

const createOrder = async (req, res) => {
  try {
    const { items, total, shippingAddress, userId, status } = req.body;

    const newOrder = new Order({
      userId,
      items,
      total,
      shippingAddress,
      status: status || 'Pending'
    });

    await newOrder.save();
    console.log('✅ Order saved to MongoDB:', newOrder);

    // ✅ Send proper response so frontend can redirect to thank you page
    res.status(201).json({
      success: true,
      _id: newOrder._id,           // Needed by frontend
      order: newOrder
    });
  } catch (err) {
    console.error('❌ Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

module.exports = { createOrder };
