// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

// It's good practice to define the Product interface explicitly here too
interface Product {
    _id: string;
    name: string;
    image: string;
    description: string;
    tagline?: string;
    price: number;
    gender?: string;
    category?: string;
    // Add other fields from your product model if they exist
}

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null); // Use the Product interface here
    const [loading, setLoading] = useState(true);

    const { addToCart, addToWishlist } = useAppContext();

    useEffect(() => {
        if (!id) return;

        axios.get<Product>(`http://localhost:5000/api/products/${id}`) // Type the response
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching product:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found.</div>;

    // Handler for adding to cart
    const handleAddToCart = () => {
        // Create the CartItem object, explicitly mapping _id to id
        addToCart({
            id: product._id, // <--- This was the crucial fix for the checkout error
            name: product.name,
            price: product.price,
            image: product.image, // Assuming your CartItem also has an image field
            quantity: 1, // Default quantity when adding from detail page, adjust if you have a quantity selector
        });
    };

    // Handler for adding to wishlist (similar mapping might be needed here too)
    const handleAddToWishlist = () => {
        addToWishlist({
            id: product._id, // Map _id to id here too
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
    };

    // --- ADDED THIS LINE ---
    const imageSrc = product.image && product.image.trim() !== '' ? product.image : '/placeholder.jpg';

    return (
        <div className="max-w-screen-xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <img
                src={imageSrc} // --- USE THE CONDITIONAL IMAGE SOURCE HERE ---
                alt={product.name}
                className="w-64 h-80 object-cover mb-4"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.jpg'; // Add a fallback image path
                    (e.target as HTMLImageElement).alt = 'Image not available';
                    (e.target as HTMLImageElement).onerror = null;
                }}
            />
            <p className="text-lg">{product.description}</p>
            <p className="mt-2 font-semibold">Price: ₹{product.price}</p>
            {/* Removed product.quantity here as it's typically a cart item property, not a product property */}
            <p className="mt-2 text-sm">Gender: {product.gender}</p>
            <p className="mt-2 text-sm">Category: {product.category}</p>

            <div className="mt-6 flex gap-4">
                <button
                    onClick={handleAddToCart} // Use the new handler
                    className="bg-arova-green-dark text-white px-6 py-2 rounded"
                >
                    Add to Cart
                </button>
                <button
                    onClick={handleAddToWishlist} // Use the new handler
                    className="border border-arova-green-dark text-arova-green-dark px-6 py-2 rounded"
                >
                    Add to Wishlist
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;