import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../components/axiosConfig';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error.response ? error.response.data : error.message);
    }
  };

  const handleAddToCart = () => {
    addToCart(product._id, 1);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  if (!product) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Image */}
          <div className="lg:max-w-lg lg:self-end relative">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-lg">
              <img src={product.images[currentImageIndex]} alt={product.name} className="w-full h-full object-center object-cover" />
            </div>
            <button onClick={handlePrevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300">
              &lt;
            </button>
            <button onClick={handleNextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300">
              &gt;
            </button>
          </div>

          {/* Product details */}
          <div className="mt-10 lg:mt-0 lg:row-span-2 lg:self-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-900">{product.description}</p>
            </div>
            <div className="mt-10">
              <button
                onClick={handleAddToCart}
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Reviews</h2>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <ReviewList productId={id} />
            {user && <ReviewForm productId={id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;