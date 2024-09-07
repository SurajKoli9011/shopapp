import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile({ userEmail }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedDetails({ ...userDetails });
  };

  const handleSave = async () => {
    try {
      const updateUserUrl = `http://localhost:8095/auth/updateUser/${userEmail}`;
      await axios.put(updateUserUrl, editedDetails);
      setUserDetails({ ...editedDetails });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8095/auth/getByEmail?email=${userEmail}`);
        setUserDetails(response.data);
        setUserId(response.data.userId);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userEmail]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!userDetails) {
    return <div className="text-center mt-10">No user details found</div>;
  }

  return (
    <div className="container mx-auto max-w-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">User Details</h2>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">First Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={editedDetails.firstName}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          ) : (
            <p className="text-gray-700">{userDetails.firstName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Last Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={editedDetails.lastName}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          ) : (
            <p className="text-gray-700">{userDetails.lastName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Email:</label>
          <p className="text-gray-700">{userDetails.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Mobile Number:</label>
          {isEditing ? (
            <input
              type="text"
              name="mobileNo"
              value={editedDetails.mobileNo}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          ) : (
            <p className="text-gray-700">{userDetails.mobileNo}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Address:</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={editedDetails.address}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          ) : (
            <p className="text-gray-700">{userDetails.address}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
