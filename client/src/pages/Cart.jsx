import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/Wishlist';

function Cart() {
  const { cart, updateCartItem, removeFromCart, addToCart } = useCart();
  const { wishlist } = useWishlist();

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
        <h1 className="text-3xl font-bold mb-8 text-gray-950">CART</h1>
        {cart.items.map(item => (
          <div key={item.product._id} className="flex items-center border-b border-gray-200 py-4">
            <div className="w-2/3 flex items-center">
              <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-32 object-cover mr-6" />
              <div>
                <h2 className="text-ld font-semibold">{item.product.name}</h2>
                <p className="text-md font-bold mt-2">Rs {item.product.price.toFixed(2)}</p>
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
        
        {/* Wishlist Section */}
        <div className="mt-16 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Wishlist</h2>
          {wishlist.length === 0 ? (
            <p className="text-gray-600 text-center">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map(product => (
                <Link
                  to={`/products/${product._id}`}
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                  <img src={product.images[0]} alt={product.name} className="w-full h-96 object-cover" />
                  <div className="p-2">
                    <h3 className="font-semibold text-md mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-black font-semibold mb-3 text-sm">Rs {product.price.toFixed(2)}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product._id, 1);
                      }}
                      className="w-full bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2  hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
