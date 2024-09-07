import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import axios from 'axios';

const ProductDetailsComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/reviews/byProductId/${product.pid}`);
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [product.pid]);

  const handleCross = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-md shadow-md p-8 relative w-full max-w-4xl">
        <button onClick={handleCross} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none">
          <MdCancel className="h-8 w-8" />
        </button>
        <div className="flex flex-col md:flex-row">
          <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-64 object-contain mb-4 md:mb-0" />
          <div className="ml-0 md:ml-4 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-700 text-2xl">${product.price}</p>
            <h3 className="text-xl font-semibold mt-4">Reviews:</h3>
            {loading ? (
              <div>Loading reviews...</div>
            ) : (
              <ul>
                {reviews.map(review => (
                  <li key={review.id} className="text-gray-700">{review.content}</li>
                ))}
              </ul>
            )}
            {/* Add any other product details you want to display */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
