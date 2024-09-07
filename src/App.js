import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import SignUp from './components/SignUp/SignUp';
import HomePage from './components/HomePage/HomePage';
import Cart from './components/Cart/Cart';
import Admin from './components/Admin/Admin';
import UserProfile from './components/UserProfile/UserProfile';
import Footer from './components/Footer/Footer';
import Orders from './components/Order/Orders';
import ProductDetailsComponent from './components/ProductDetailsComponent/ProductDetailsComponent';

const App = () => {
  const [userEmail, setUserEmail] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [userId, setUserId] = useState(0);

  const updateUserEmail = (email) => {
    setUserEmail(email);
    localStorage.setItem('userEmail', email); // Store email in localStorage
  };

  const updateUserId = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id); // Store userId in localStorage
  };

  const handleLogout = () => {
    setUserEmail('');
    setCartCount(0); // Reset cart count on logout
    localStorage.removeItem('userEmail'); // Clear email from localStorage
    localStorage.removeItem('userId'); // Clear userId from localStorage
    // Additional logout logic like clearing tokens can be added here
  };

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  return (
    <Router>
      <div>
        <Navbar userEmail={userEmail} onLogout={handleLogout} cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<HomePage userEmail={userEmail} updateCartCount={updateCartCount} updateUserId={updateUserId} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login updateUserEmail={updateUserEmail} updateUserId={updateUserId} />} />
          <Route path="/cart" element={<Cart userEmail={userEmail} updateCartCount={updateCartCount} userId={userId} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/userDetails" element={<UserProfile userEmail={userEmail} />} />
          <Route path="/orders" element={<Orders userId={userId} />} />
          {/* <Route path="/home" element={<HomePage userEmail={userEmail} updateCartCount={updateCartCount} updateUserId={updateUserId} />} /> */}
          <Route path="/productDetails" element={<ProductDetailsComponent />} />

        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
};

export default App;
