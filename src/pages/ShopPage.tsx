import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';

// Define Product type
interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  tagline?: string;
  price: number;
  gender?: string;
  category?: string;
}

const ShopPage: React.FC = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  const genderMap: Record<string, string> = {
    male: 'Men',
    men: 'Men',
    female: 'Women',
    women: 'Women',
    unisex: 'Unisex',
  };

  const categoryMap: Record<string, string> = {
    'signature-blends': 'Signature Blends',
    'mystic-concentrates': 'Mystic Concentrates',
    'dreamscape': 'Dreamscape',
    'mystic': 'Mystic Concentrates', // redundant alias
  };

  // Sanitize category input
  const lowerCategory = category?.toLowerCase().trim() || '';
  const mappedGender = genderMap[lowerCategory] || '';
  const mappedCategory = categoryMap[lowerCategory] || '';

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => {
        console.log('✅ All Products:', res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error('❌ Error fetching products', err));
  }, []);

  const filteredProducts = useMemo(() => {
    if (!category) return products;

    if (mappedGender) {
      return products.filter(
        (product) =>
          product.gender?.toLowerCase().trim() ===
          mappedGender.toLowerCase().trim()
      );
    }

    if (mappedCategory) {
      return products.filter(
        (product) =>
          product.category?.toLowerCase().trim() ===
          mappedCategory.toLowerCase().trim()
      );
    }

    return [];
  }, [products, category, mappedGender, mappedCategory]);

  const pageTitle = category
    ? `Shop ${mappedGender || mappedCategory} Collection`
    : 'All Products';

  return (
    <div className="min-h-screen bg-arova-beige-light text-arova-green-dark py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-libre-baskerville font-bold text-center mb-12 animate-fadeIn">
          {pageTitle}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-xl mt-10">
            No products found for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
