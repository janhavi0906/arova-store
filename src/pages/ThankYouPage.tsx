// src/pages/ThankYouPage.tsx
import React, { useEffect } from 'react'; // Import useEffect
import { useParams, Link } from 'react-router-dom';

const ThankYouPage: React.FC = () => {
  const { orderId } = useParams();

  // Add a useEffect to log when the component mounts and what orderId it gets
  useEffect(() => {
    console.log("ThankYouPage mounted!");
    console.log("Order ID received in ThankYouPage:", orderId);

    // Optional: Add a check if orderId is missing, though it should come from CheckoutPage
    if (!orderId) {
      console.warn("ThankYouPage: orderId is missing from URL params.");
      // You might want to redirect to /shop or /cart here if orderId is truly essential
      // navigate('/shop'); // Requires useNavigate hook
    }

    // Return a cleanup function if needed (e.g., for subscriptions)
    return () => {
      console.log("ThankYouPage unmounted.");
    };
  }, [orderId]); // Re-run if orderId changes (though it shouldn't on this page)


  return (
    <div className="min-h-screen bg-arova-beige-light flex items-center justify-center px-4 py-20">
      <div className="bg-white shadow-xl rounded-lg p-10 text-center max-w-xl w-full">
        <h1 className="text-4xl font-bold font-libre-baskerville text-arova-green-dark mb-6">
          🎉 Thank You!
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Your order has been placed successfully.
        </p>
        <p className="text-md text-gray-600 mb-6">
          Order ID: <span className="font-semibold">{orderId || 'N/A'}</span> {/* Add N/A fallback */}
        </p>
        <Link
          to="/shop"
          className="inline-block mt-4 bg-arova-green-dark text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-arova-green-light transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;