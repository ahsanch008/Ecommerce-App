import React, { useState } from 'react';
import axios from '../components/axiosConfig';

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, { productId, rating, comment });
      setRating(5);
      setComment('');
      // You might want to add a callback to refresh the review list
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          placeholder="Write your review here..."
        />
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;