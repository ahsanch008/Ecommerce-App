import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import axios from '../components/axiosConfig';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePayment from '../components/StripePayment';
import { ShoppingCartIcon } from '@heroicons/react/outline';

const stripePromise = loadStripe('your_stripe_publishable_key');

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState('');
  const [error, setError] = useState('');
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders/create-payment-intent`, {
        shippingAddress,
        items: cart.items
      });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      setError('An error occurred while processing your payment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="relative h-[40vh] w-full bg-center bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')` }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 text-center animate-slide-in">
            Checkout
          </h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="bg-white shadow-lg h-96 overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Address
                </label>
                <textarea
                  id="shippingAddress"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                  className="w-full px-3 h-32 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows="4"
                  placeholder="Enter your full shipping address"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center bg-gradient-to-r from-red-400 to-red-600 text-white font-bold py-3 px-4 rounded-md shadow-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
              >
                <ShoppingCartIcon className="h-6 w-6 text-white mr-2" />
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
        {clientSecret && (
          <div className="mt-8">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripePayment />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;