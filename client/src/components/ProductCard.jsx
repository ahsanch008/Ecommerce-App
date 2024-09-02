import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 transition-transform duration-300 transform hover:scale-105 shadow-md">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
      <button className="mt-2 w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
        View Details
      </button>
    </Link>
  );
};

export default ProductCard;