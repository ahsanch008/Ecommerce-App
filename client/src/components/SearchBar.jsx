import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full sm:w-auto mx-auto flex justify-center mt-8 mb-8"
    >
      <div className="flex items-center bg-white  shadow-2x border border-gray-200">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="bg-transparent text-gray-600 pl-4 pr-2 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200 w-72"
        />
        <button 
          type="submit" 
          className="bg-gradient-to-r from-red-300 to-red-500 hover:bg-red-500 text-white px-6 py-2  transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
