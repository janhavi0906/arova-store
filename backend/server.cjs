// backend/server.cjs
require('dotenv').config(); // Load environment variables first
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload'); // For ImageKit.io uploads
const connectDB = require('./config/db.cjs'); // Your DB connection module

// ✅ Route Files
const productRoutes = require('./routes/productRoutes.cjs');
const uploadRoutes = require('./routes/uploadRoutes.cjs');
const userRoutes = require('./routes/userRoutes.cjs');
const orderRoutes = require('./routes/orderRoutes.cjs');
const paymentRoutes = require('./routes/payment.cjs'); // ✅ Newly added

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// ✅ Routes Setup
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', require('./routes/orderRoutes.cjs'));
app.use('/api/payment', paymentRoutes); // ✅ New payment route

// ✅ Start Server After DB Connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });
