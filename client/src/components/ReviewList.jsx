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
    <div className="mt-8 max-w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6 min-w-max">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-lg p-6 mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 w-80 flex-shrink-0"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                   
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Anonymous</p>
                    <p className="text-red-500">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{review.comment}</p>
                <p className="text-sm text-gray-500">Reviewed on {new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
