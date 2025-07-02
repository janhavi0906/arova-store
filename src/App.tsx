// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import OfferMarquee from './components/OfferMarquee';
import CategoriesGrid from './components/CategoriesGrid';
import Footer from './components/Footer';
import ShopPage from './pages/ShopPage';
import ProductDetail from './pages/ProductDetail';
import CollectionPage from './pages/CollectionPage';
import BenefitsPage from './pages/BenefitsPage';
import ContactSection from './components/ContactSection';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import { AppProvider } from './context/AppContext';
import AdminProductList from './pages/AdminProductList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ThankYouPage from './pages/ThankYouPage';
import ErrorBoundary from './components/ErrorBoundary'; // Already imported, good!


function App() {
  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen flex flex-col bg-arova-beige-light font-inter text-arova-green-dark antialiased">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Home Route */}
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <OfferMarquee />
                    <CategoriesGrid />
                  </>
                }
              />

              {/* Shop Routes */}
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:category" element={<ShopPage />} />

              {/* Product Details */}
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* Other Pages */}
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/benefits" element={<BenefitsPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Keep Order Confirmation as is, if it's a separate page */}
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />

              {/* ***** THIS IS THE KEY UPDATE: WRAP ThankYouPage WITH ErrorBoundary ***** */}
              <Route
                path="/thank-you/:orderId"
                element={
                  <ErrorBoundary>
                    <ThankYouPage />
                  </ErrorBoundary>
                }
              />

              {/* Admin & Auth Routes */}
              <Route path="/admin" element={<AdminProductList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

            </Routes>
          </main>

          <ContactSection />
          <Footer />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;