import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function Checkout() {
  const navigate = useNavigate();

  const handleBackToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center w-11/12 sm:w-6/12 md:w-4/12">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order is being processed and you’ll
          receive a confirmation soon.
        </p>
        <button
          onClick={handleBackToCart}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all"
        >
          Go Back to Cart
        </button>
      </div>
    </div>
  );
}

export default Checkout;
