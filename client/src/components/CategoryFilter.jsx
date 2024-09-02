import React from 'react';

const CategoryFilter = ({ categories = [], selectedCategory, onCategoryChange }) => {
  return (
    <div className="w-full sm:w-auto mx-auto flex flex-col items-center mt-8 mb-8">
      <label htmlFor="category" className="block mb-2 text-gray-700 font-medium text-center">
        Filter by Category:
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full sm:w-64 p-2 border border-red-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200 text-gray-600 bg-white shadow-lg"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
