import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewManagement() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/all`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleApproveReview = async (reviewId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}/approve`);
      fetchReviews();
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Review Management</h1>
      {reviews.map(review => (
        <div key={review._id} className="border p-4 mb-4 rounded">
          <p>Product: {review.product.name}</p>
          <p>User: {review.user.name}</p>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
          <p>Status: {review.isApproved ? 'Approved' : 'Pending'}</p>
          {!review.isApproved && (
            <button
              onClick={() => handleApproveReview(review._id)}
              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
            >
              Approve
            </button>
          )}
          <button
            onClick={() => handleDeleteReview(review._id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ReviewManagement;