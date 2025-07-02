// src/pages/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import type { CartItem } from '../types';

const CheckoutPage: React.FC = () => {
  const { cart, removeFromCart } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'India',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required.';
    if (!formData.lastName) newErrors.lastName = 'Last name is required.';
    if (!formData.address) newErrors.address = 'Address is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (!formData.state) newErrors.state = 'State/Province is required.';
    if (!formData.zip) newErrors.zip = 'Zip/Postal Code is required.';
    if (!formData.country) newErrors.country = 'Country is required.';
    if (!formData.phone) newErrors.phone = 'Phone number is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || cart.length === 0) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      if (!userInfo._id) {
        alert("Please log in to place your order.");
        return;
      }
      const userId = userInfo._id;

      const orderPayload = {
        userId,
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          qty: item.quantity,
          price: item.price
        })),
        total,
        shippingAddress: formData,
        status: 'Pending'
      };

      console.log("Order Payload being sent:", orderPayload);

      const response = await axios.post('http://localhost:5000/api/orders/place', orderPayload);

      if ((response.status === 200 || response.status === 201) && response.data._id) {
        const orderId = response.data._id;

        const newOrder = {
          id: orderId,
          date: new Date().toISOString(),
          customerInfo: formData,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          subtotal,
          shipping: shippingCost,
          total,
          status: 'Pending'
        };

        const existingOrders = JSON.parse(localStorage.getItem('arova_orders') || '[]');
        localStorage.setItem('arova_orders', JSON.stringify([...existingOrders, newOrder]));

        cart.forEach(item => removeFromCart(item.id));

        // ***** CRITICAL CHANGE: Navigating to /thank-you/ and added console.log *****
        console.log("Attempting to navigate to:", `/thank-you/${orderId}`);
        navigate(`/thank-you/${orderId}`);
      } else {
        console.warn('Order not successfully placed based on response:', response.data);
        alert("Failed to place order. Please check details.");
      }
    } catch (error: any) {
      console.error('Error placing order:', error);
      console.log('Server Response:', error.response?.data);
      alert("Something went wrong while placing your order.");
    }
  };

  return (
    <div className="min-h-screen bg-arova-beige-light text-arova-green-dark py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-lg mx-auto bg-white rounded-xl shadow-lg p-6 lg:p-10 my-8">
        <h1 className="text-4xl md:text-5xl font-libre-baskerville font-bold text-center mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-arova-green-dark">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField key="firstName" id="firstName" label="First Name" value={formData.firstName} handleChange={handleChange} error={errors.firstName} />
                <InputField key="lastName" id="lastName" label="Last Name" value={formData.lastName} handleChange={handleChange} error={errors.lastName} />
              </div>

              <InputField key="address" id="address" label="Address" value={formData.address} handleChange={handleChange} error={errors.address} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField key="city" id="city" label="City" value={formData.city} handleChange={handleChange} error={errors.city} />
                <InputField key="state" id="state" label="State/Province" value={formData.state} handleChange={handleChange} error={errors.state} />
                <InputField key="zip" id="zip" label="Zip/Postal Code" value={formData.zip} handleChange={handleChange} error={errors.zip} />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField key="phone" id="phone" label="Phone Number" value={formData.phone} handleChange={handleChange} error={errors.phone} />
                <InputField key="email" id="email" label="Email Address" value={formData.email} handleChange={handleChange} error={errors.email} />
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-arova-green-dark">Payment Method</h2>
                <div className="bg-arova-beige-medium p-4 rounded-lg text-gray-800">
                  <p className="font-semibold mb-2">Payment Gateway (Simulated)</p>
                  <p className="text-sm">In a real app, this would use Razorpay/Stripe.</p>
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full bg-arova-green-dark text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-arova-green-light transition-colors duration-300 shadow-md"
                disabled={cart.length === 0}
              >
                Place Order
              </button>
            </form>
          </div>

          <div className="lg:col-span-1 bg-arova-beige-medium p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-arova-green-dark">Order Summary</h2>
            <div className="flex-grow">
              {cart.map((item: CartItem) => (
                <div key={item.id} className="flex justify-between items-center mb-2 pb-2 border-b border-gray-300">
                  <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                  <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-400">
              <div className="flex justify-between text-lg mb-2">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-arova-green-dark mt-4">
                <span>Order Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InputProps {
  id: string;
  label: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
}

const InputField: React.FC<InputProps> = ({ id, label, value, handleChange, error }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default CheckoutPage;