import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function Cart() {
  const { cart, updateCartItem, removeFromCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItem(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="container mx-auto mt-8 px-4 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 animate-slide-in">Your Cart</h1>
      {cart.items.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center animate-slide-in">
          <p className="text-xl text-gray-600">Your cart is empty.</p>
          <Link to="/products" className="mt-4 inline-block btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden animate-slide-in">
          {cart.items.map(item => (
            <div key={item.product._id} className="flex items-center border-b border-gray-200 py-4 px-6 hover:bg-gray-50 transition-colors duration-200">
              <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover rounded-md mr-6" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                  className="w-16 text-center border rounded-md mr-4 p-1 focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => handleRemoveItem(item.product._id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="p-6 bg-gray-50">
            <p className="text-xl font-bold text-gray-800">Total: ${total.toFixed(2)}</p>
            <Link to="/checkout" className="mt-4 inline-block btn-secondary">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;