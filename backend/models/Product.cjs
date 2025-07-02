const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: String, // e.g., "10ml", "50ml"
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tagline:{
   type: String,
     },
     
  vibe:{
  type: String,
  required: true,
  },
  gender: {
    type: String,
    enum: ['Men', 'Women', 'Unisex'],
    required: true,
  },
  category: {
    type: String,
    enum: ['Signature Blends', 'Mystic Concentrates'],
    required: true,
  },
  image: {
    type: String, // cloud URL like https://res.cloudinary.com/...
    required: true,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
