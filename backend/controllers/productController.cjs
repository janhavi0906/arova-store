// backend/routes/productRoutes.cjs
const express = require('express');
const router = express.Router();
const Product = require('../models/Product.cjs'); // Assuming Product model path is correct

// Controller functions (as you've defined them, or import from a controller file)
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("❌ Error fetching products:", error.message);
        res.status(500).json({ error: 'Server error while fetching products' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        console.error('❌ Error fetching product by ID:', error.message);
        return res.status(400).json({ error: 'Invalid product ID format' });
    }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("❌ Error creating product:", error.message);
        res.status(400).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error("❌ Error updating product:", error.message);
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid product ID format' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Server error while updating product' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error("❌ Error deleting product:", error.message);
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid product ID format' });
        }
        res.status(500).json({ error: 'Error deleting product' });
    }
};

// Associate controller functions with router methods
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.patch('/:id', updateProduct); // Your update route
router.delete('/:id', deleteProduct);

// Export the router instance
module.exports = router;