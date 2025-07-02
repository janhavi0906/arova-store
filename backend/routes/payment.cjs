// backend/routes/payment.cjs
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/orders', (req, res) => {
  const orderId = uuidv4();

  const newOrder = {
    id: orderId,
    date: new Date(),
    ...req.body,
  };

  console.log('✅ Received payment order:', newOrder);

  // Optional: Save to DB later
  res.status(201).json({ _id: orderId, message: 'Order placed successfully' });
});

module.exports = router;
