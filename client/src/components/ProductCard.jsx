import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/Wishlist';
import { HeartIcon } from '@heroicons/react/outline';

const ProductCard = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item._id === product._id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <Link to={`/products/${product._id}`} className="group h-full flex flex-col">
      <div className="w-full aspect-w-1 aspect-h-2 bg-gray-400 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 transition-transform duration-300 transform hover:scale-110 shadow-xl relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-center object-cover group-hover:opacity-85 transition-opacity duration-300"
        />
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
        >
          <HeartIcon className={`h-6 w-6 ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
      <div className="mt-4 flex-grow flex flex-col">
        <h3 className="text-sm text-gray-700 group-hover:text-red-600 transition-colors duration-200 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="mt-1 text-lg font-small text-gray-900 mb-3">Rs:{product.price.toFixed(2)}</p>
        <button className="mt-auto w-1/2 bg-red-400 border border-transparent py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
          View Details
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;