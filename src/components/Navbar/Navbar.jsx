import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineManageAccounts, MdShoppingCart } from "react-icons/md";
import { FaHome } from "react-icons/fa";

const Navbar = ({ userEmail, onLogout, cartCount }) => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleUpdateProfileClick = () => {
    navigate("/userDetails");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <nav className="bg-black p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold flex items-center">
          <span>ShopKaro.com</span>
          <div className="ml-2">
            <button onClick={handleHomeClick} className="flex items-center bg-yellow-400 text-white py-1 px-4 rounded-md hover:bg-gray-500">
              <FaHome className="w-5 h-7 mr-1" />
            </button>
          </div>
          <div className="ml-4 flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white border border-gray-300 rounded-md py-1 px-2 mr-2"
            />
            <button className="bg-yellow-400 text-black py-1 px-4 rounded-md hover:bg-yellow-500 hover:text-white">Search</button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={handleUpdateProfileClick} className="flex items-center bg-yellow-400 text-white py-1 px-4 rounded-md hover:bg-gray-500">
            <MdOutlineManageAccounts className="w-5 h-7 mr-1" />
            <span className='text-white'>{userEmail}</span>
          </button>
          <button onClick={handleCartClick} className="flex items-center bg-yellow-400 text-white py-1 px-4 rounded-md hover:bg-gray-500 relative">
            <MdShoppingCart className="w-5 h-7 mr-1" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{cartCount}</span>
            )}
          </button>
          {userEmail ? (
            <button onClick={handleLogoutClick} className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700">Logout</button>
          ) : (
            <>
              <button onClick={handleLoginClick} className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700">Login</button>
              <button onClick={handleSignUpClick} className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700">SignUp</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
