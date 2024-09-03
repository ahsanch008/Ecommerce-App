import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import axios from '../components/axiosConfig';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import FeaturedCategories from '../components/FeaturedCategories';

function Home() {
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchNewArrivals();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/products?limit=8');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewArrivals = async () => {
    try {
      const response = await axios.get('/products?limit=3&sort=createdAt');
      setNewArrivals(response.data.products);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
    }
  };

  return (
    <div className=" animate-fade-in">
      <HeroSection />
      <FeaturedCategories />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl text-primary font-extrabold text-gray-900 mb-8 text-center animate-slide-in">Featured Products</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-slide-in">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        <div className="mt-12 text-center animate-slide-in">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium  shadow-sm text-white bg-red-400 hover:bg-red-500 transition-colors duration-200"
          >
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className=" py-16 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-primary font-extrabold text-gray-900 mb-8 text-center animate-slide-in">New Arrivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-in">
            {newArrivals.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`} className="block group">
                <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 opacity-70">
                    20% OFF
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                    <p className="mt-1 text-sm text-white">Rs {product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;