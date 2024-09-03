import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/outline';

function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white bg-opacity-10 backdrop-blur-md shadow-md fixed top-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">URBANStore</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</Link>
            <Link to="/products" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Products</Link>
            <Link to="/products?category=Men" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Men</Link>
            <Link to="/products?category=Women" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Women</Link>
            <Link to="/cart" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative">
            <ShoppingCartIcon className="h-6 w-6 text-text hover:text-primary transition-colors duration-200" />
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.items.length}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Profile</Link>
                <button onClick={handleLogout} className="bg-gradient-to-r from-primary-gradient-start to-primary-gradient-end text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-200">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-gradient-to-r from-primary-gradient-start to-primary-gradient-end text-white px-4 py-2  hover:opacity-90 transition-opacity duration-200">Login</Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-text hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/products" className="text-text hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Products</Link>
            <Link to="/products?category=Men" className="text-text hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Men</Link>
            <Link to="/products?category=Women" className="text-text hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Women</Link>
            <Link to="/cart" className="text-text hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Cart</Link>
            {user ? (
              <>
                <Link to="/profile" className="text-text hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                <button onClick={handleLogout} className="w-full text-left text-text hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Logout</button>
              </>
            ) : (
              <Link to="/login" className="text-text hover:text-primary block px-3 py-2  text-base font-medium">Login</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;