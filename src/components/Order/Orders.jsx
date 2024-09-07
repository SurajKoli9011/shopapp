import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewInputVisible, setReviewInputVisible] = useState(false);
  const [reviewOrderId, setReviewOrderId] = useState(null);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewProductId, setReviewProductId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/orders/getByUserId/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleAddReview = (orderId, productId) => {
    setReviewInputVisible(true);
    setReviewOrderId(orderId);
    setReviewProductId(productId);
  };

  const handleSaveReview = async () => {
    try {
      const payload = {
        content: reviewContent,
      };

      console.log("pid= ",reviewProductId)
      const response = await axios.post(`http://localhost:8083/reviews/add/${userId}/${reviewOrderId}/${reviewProductId}`, payload);

      console.log('Review saved successfully:', response.data);
      setReviewInputVisible(false);
      setReviewContent('');
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.orderId} className="flex flex-col md:flex-row border p-4 mb-4">
              <img src={order.image} alt={order.productName} className="w-24 h-24 md:mr-4" />
              <div className="flex flex-col md:flex-grow md:ml-4">
                <p className="font-semibold">Product Name: {order.productName}</p>
                <p>Order Details: {order.orderDetails}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Total Price: ₹{order.totalPrice}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.localdate).toLocaleDateString()}</p>
                {reviewInputVisible && reviewOrderId === order.orderId ? (
                  <div>
                    <textarea
                      placeholder="Add your review"
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      className="border p-2 mt-2 w-full"
                    />
                    <div className="flex space-x-2 mt-2">
                      <button onClick={handleSaveReview} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Save Review
                      </button>
                      <button onClick={() => setReviewInputVisible(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => handleAddReview(order.orderId, order.productId)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                    Add Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
