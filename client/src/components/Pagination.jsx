import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;