import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import ProductDetailsComponent from '../ProductDetailsComponent/ProductDetailsComponent';

const HomePage = ({ userEmail, updateCartCount, updateUserId }) => {
  const [watches, setWatches] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userEmail) {
          const userResponse = await axios.get(`http://localhost:8095/auth/getByEmail?email=${userEmail}`);
          const fetchedUserId = userResponse.data.id;
          setUserId(fetchedUserId);
          updateUserId(fetchedUserId);
        }

        const [watchesResponse, clothingResponse, shoesResponse] = await Promise.all([
          axios.get('http://localhost:8098/products/getAllWatches'),
          axios.get('http://localhost:8098/products/getAllClothing'),
          axios.get('http://localhost:8098/products/getAllShoes')
        ]);

        setWatches(watchesResponse.data);
        setClothing(clothingResponse.data);
        setShoes(shoesResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail, updateUserId]);

  const handleBuyNow = async (product) => {
    try {
      if (!userEmail) {
        navigate('/login');
      } else {
        const response = await axios.post(`http://localhost:8082/orders/create/${userId}/${product.pid}`);
        console.log("Order created successfully");
        alert("Order placed Successfully");
        navigate('/orders');
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      if (!userEmail) {
        navigate('/login');
        return;
      }
      if (!userId) {
        console.error('User ID is not available yet.');
        return;
      }

      await axios.put(`http://localhost:8010/cart/add/${userId}/${product.pid}`);
      updateCartCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Failed to add to cart:', error.message);
    }
  };

  const handleProductClick = (product) => {
    navigate('/productDetails', { state: { product } });
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderProducts = (products) => (
    <Carousel responsive={responsive} className="mb-8">
      {products.map(product => (
        <div key={product.pid} className="p-2 relative" onClick={() => handleProductClick(product)}>
          <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white mx-auto transform transition-transform duration-300 hover:scale-105">
            <div className="w-full h-48">
              <img className="w-full h-full object-contain" src={product.image} alt={product.name} />
            </div>
            <div className="px-4 py-2">
              <div className="font-bold text-lg mb-2">{product.name}</div>
              <p className="text-gray-700 text-sm">{product.description}</p>
              <p className="text-gray-700 text-base">${product.price}</p>
              <button
                onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                className="bg-blue-500 text-white text-sm py-1 px-2 rounded-md hover:bg-blue-700 mt-2"
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleBuyNow(product); }}
                className="bg-green-500 text-white text-sm py-1 px-2 rounded-md hover:bg-green-700 mt-2 ml-2"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Watches</h2>
      {renderProducts(watches)}
      <h2 className="text-2xl font-bold mb-4">Clothing</h2>
      {renderProducts(clothing)}
      <h2 className="text-2xl font-bold mb-4">Shoes</h2>
      {renderProducts(shoes)}
    </div>
  );
};

export default HomePage;
