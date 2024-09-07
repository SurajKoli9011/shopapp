import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({ userEmail, updateCartCount, userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8010/cart/cartproducts/${userId}`);
        setCartItems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchCartItems(userId);
    }
  }, [userEmail, userId]);

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:8010/cart/delete/${userId}/${productId}`);
      setCartItems(cartItems.filter(item => item.pid !== productId));
      updateCartCount(cartItems.length - 1);
    } catch (err) {
      console.error('Failed to remove from cart:', err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cartItems.map(item => (
            <div key={item.pid} className="max-w-xs rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 ease-in-out">
              <div className="w-full h-48">
                <img className="w-full h-full object-contain transition-transform duration-300 hover:scale-105" src={item.image} alt={item.name} />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2">{item.name}</div>
                <p className="text-gray-700 text-base">{item.description}</p>
                <p className="text-gray-700 text-base">${item.price}</p>
                <button
                  onClick={() => handleRemoveFromCart(item.pid)}
                  className="bg-red-500 text-white text-sm py-1 px-2 rounded-md hover:bg-red-700 mt-2"
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
