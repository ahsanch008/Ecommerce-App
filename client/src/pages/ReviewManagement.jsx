import React, { useState, useEffect } from 'react';
import axios from '../components/axiosConfig';

function ReviewManagement() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/all`);
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to fetch reviews. Please try again later.');
      setLoading(false);
    }
  };

  const handleApproveReview = async (reviewId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}/approve`);
      fetchReviews();
    } catch (error) {
      console.error('Error approving review:', error);
      setError('Failed to approve review. Please try again.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('Failed to delete review. Please try again.');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading reviews...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto mt-8 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Review Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(review => (
          <div key={review._id} className="border p-4 rounded-lg shadow-md">
            <p className="font-semibold">Product: {review.product?.name || 'Unknown Product'}</p>
            <p>User: {review.user?.name || 'Anonymous'}</p>
            <p>Rating: {review.rating}</p>
            <p className="mt-2">Comment: {review.comment}</p>
            <p className="mt-2">Status: {review.isApproved ? 'Approved' : 'Pending'}</p>
            <div className="mt-4 flex justify-between">
              {!review.isApproved && (
                <button
                  onClick={() => handleApproveReview(review._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors duration-300"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewManagement;