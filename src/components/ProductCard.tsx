// src/components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

interface Product {
  _id: string;
  name: string;
  image: string; // This will now be "" if no image is available
  tagline?: string;
  description: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Choose the image source: product.image if it's a non-empty string, otherwise use placeholder.jpg
  const imageSrc = product.image && product.image.trim() !== '' ? product.image : '/placeholder.jpg';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:scale-105 transition-transform duration-300">
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={imageSrc} // Use the conditionally chosen image source
          alt={product.name}
          className="w-full h-full object-cover"
          // The onError handler is still useful if the actual image URL returns a 404/500,
          // but it won't be triggered by an empty src now.
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.jpg';
            (e.target as HTMLImageElement).alt = 'Image not available';
            (e.target as HTMLImageElement).onerror = null; // Prevent infinite loop
          }}
        />
      </div>

      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-libre-baskerville font-bold text-arova-green-dark mb-2">
            {product.name}
          </h3>
          {product.tagline && (
            <p className="text-arova-green-light text-sm italic mb-3">
              {product.tagline}
            </p>
          )}
          <p className="text-arova-green-dark text-base mb-4 line-clamp-3">
            {product.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-arova-green-dark">
            ₹{product.price.toFixed(2)}
          </span>
          <Button as={Link} to={`/product/${product._id}`} variant="primary" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;