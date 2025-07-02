// backend/models/Order.cjs
const mongoose = require('mongoose');

// Define schema for individual items within an order
const orderItemSchema = new mongoose.Schema({
    // productId should reference your Product model's _id
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String } // Optional: to store image URL at time of order
}, { _id: false }); // Do not create a default _id for subdocuments in the array

// Define schema for shipping address
const shippingAddressSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
}, { _id: false }); // No _id for this subdocument either

// Main Order Schema
const OrderSchema = new mongoose.Schema(
    {
        // Reference to the User who placed the order
        // Required: false allows for guest checkouts
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
        
        // Array of order items using the defined orderItemSchema
        items: [orderItemSchema],
        
        // Total price of the order
        total: { type: Number, required: true },
        
        // Shipping address using the defined shippingAddressSchema
        shippingAddress: shippingAddressSchema,
        
        // Current status of the order
        status: { type: String, default: 'Pending' }, // e.g., 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'
        
        // Placeholder for payment method (e.g., 'COD', 'Razorpay')
        paymentMethod: { type: String, default: 'COD' },
        
        // Payment result details (for integration with payment gateways)
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        
        // Boolean to track if the order has been paid
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date }, // Timestamp when paid
        
        // Boolean to track if the order has been delivered
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date }, // Timestamp when delivered
    },
    {
        timestamps: true // This automatically adds 'createdAt' and 'updatedAt' fields
    }
);

module.exports = mongoose.model('Order', OrderSchema);