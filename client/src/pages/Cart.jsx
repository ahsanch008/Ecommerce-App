import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function Cart() {
  const { cart, updateCartItem, removeFromCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItem(productId, newQuantity);
  };

  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = total * 0.17; // Assuming 17% tax rate

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[40vh] w-full bg-center bg-cover" style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1664201890484-a5f7109c8e56?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 text-center animate-slide-in">
            Cart
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">CART</h1>
        {cart.items.map(item => (
          <div key={item.product._id} className="flex items-center border-b border-gray-200 py-4">
            <div className="w-2/3 flex items-center">
              <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-32 object-cover mr-6" />
              <div>
                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                <p className="text-lg font-bold mt-2">Rs {item.product.price.toFixed(2)}</p>
                <div className="mt-2">
                  <span className="mr-2">SIZE:</span>
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button key={size} className={`px-2 py-1 border ${item.size === size ? 'bg-black text-white' : 'text-gray-500'} mr-2`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-1/3 flex justify-end items-center">
              <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)} className="px-2 py-1 border">-</button>
              <span className="mx-4">{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)} className="px-2 py-1 border">+</button>
            </div>
          </div>
        ))}
        
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Totals <button onClick={() => cart.items.forEach(item => removeFromCart(item.product._id))} className="text-sm font-normal text-gray-500 ml-2">Clear cart</button></h3>
          <div className="border p-4">
            <p>Tax 17%: Rs {tax.toFixed(2)}</p>
            <p>Quantity: {cart.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
            <p className="font-bold">Total: Rs {total.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Link to="/products" className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold">
            Continue shopping
          </Link>
          <Link to="/checkout" className="px-6 py-2 bg-red-500 text-white font-semibold">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
