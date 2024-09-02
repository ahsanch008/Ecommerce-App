import React from 'react';

const CategoryFilter = ({ categories = [], selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="category" className="block mb-2">Filter by Category:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full p-2 border rounded"
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