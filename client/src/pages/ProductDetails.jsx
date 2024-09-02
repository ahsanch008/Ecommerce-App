import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../components/axiosConfig';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import ProductCard from '../components/ProductCard';
import { Scrollbars } from 'react-custom-scrollbars-2';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchSimilarProducts();
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error.response ? error.response.data : error.message);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products?subcategory=${product.subcategory}`);
      setSimilarProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching similar products:', error.response ? error.response.data : error.message);
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

  const handleOpenReviewForm = () => {
    setIsReviewFormOpen(true);
  };

  const handleCloseReviewForm = () => {
    setIsReviewFormOpen(false);
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
            <button onClick={handlePrevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-75 bg-primary text-white p-2 rounded-full hover:bg-gray-700 transition duration-300">
              &lt;
            </button>
            <button onClick={handleNextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary opacity-75 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300">
              &gt;
            </button>
          </div>

          {/* Product details */}
          <div className="mt-10 lg:mt-0 lg:row-span-2 lg:self-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
            <div className="mt-3">
              <p className="text-3xl text-gray-900">Rs {product.price.toFixed(2)}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-md text-black font-bold">Description</h3>
              <p className="text-sm text-black whitespace-pre-line justify-center">{product.description}</p>
            </div>
            <div className="mt-10">
              <button
                onClick={handleAddToCart}
                className="w-1/3 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 hover:bg-red-600 text-white px-6 py-3 text-lg font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                <ShoppingCartIcon className="h-6 w-6 text-white mr-2" />
                Add to Cart
              </button>
            </div>
            {user && (
              <div className="mt-10">
                <button
                  onClick={handleOpenReviewForm}
                  className="w-1/3 bg-gradient-to-r from-red-400 to-red-500 text-white font-bold py-3 px-4 shadow-md hover:opacity-90 transition-opacity duration-300"
                >
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>
        <ReviewList productId={id} />
      </div>
      {isReviewFormOpen && <ReviewForm productId={id} onClose={handleCloseReviewForm} />}

      {/* Similar Products section with custom scrollbar */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-black mb-8">Explore Similar Items</h2>
        <Scrollbars
          style={{ width: '100%', height: 600 }}
          renderThumbHorizontal={({ style, ...props }) =>
            <div {...props} style={{ ...style, backgroundColor: '#EF4444', borderRadius: '16px' }}/>
          }
        >
          <div className="flex space-x-4 pb-4">
            {similarProducts.map((similarProduct) => (
              <div key={similarProduct._id} className="flex-shrink-0 w-64 mb">
                <ProductCard product={similarProduct} />
              </div>
            ))}
          </div>
        </Scrollbars>
      </div>

    </div>
  );
}

export default ProductDetails;
