import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`reviews/product/${productId}`);
        setReviews(Array.isArray(response.data) ? response.data : []); // Ensure reviews is an array
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]); // Set reviews to an empty array on error
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex items-center mb-2">
              <p className="font-semibold text-lg mr-2">{review.user.name}</p>
              <p className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;