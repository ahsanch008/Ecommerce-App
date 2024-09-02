import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../components/axiosConfig';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      console.log(import.meta.env.VITE_API_URL)
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error.response ? error.response.data : error.message); // Add more error details
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/cart/add`, { productId, quantity });
      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data : error.message); // Add more error details
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/cart/update`, { productId, quantity });
      setCart(response.data);
    } catch (error) {
      console.error('Error updating cart item:', error.response ? error.response.data : error.message); // Add more error details
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/cart/remove/${productId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error.response ? error.response.data : error.message); // Add more error details
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/clear`);
      setCart({ items: [], total: 0 });
    } catch (error) {
      console.error('Error clearing cart:', error.response ? error.response.data : error.message); // Add more error details
    }
  };

  const value = {
    cart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}