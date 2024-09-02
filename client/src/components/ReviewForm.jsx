import React, { useState } from 'react';
import axios from '../components/axiosConfig';

const ReviewForm = ({ productId, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, { productId, rating, comment });
      setRating(5);
      setComment('');
      if (onClose) onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white shadow-lg  p-6 w-full max-w-lg relative">
        <h3 className="text-2xl font-bold text-primary mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-black text-sm font-medium mb-2">Rating:</label>
            <div className="relative">
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="block appearance-none w-full bg-gray-100 border border-gray-300 py-2 px-4 pr-8 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="comment" className="block text-gray-700 text-sm font-medium mb-2">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 h-32 resize-none"
              placeholder="Write your review here..."
            />
          </div>
          <button
            type="submit"
            className="w-1/2  bg-gradient-to-r from-red-400 to-red-600 text-white font-bold py-3 px-4  shadow-md hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Submit Review
          </button>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
