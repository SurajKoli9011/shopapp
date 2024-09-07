import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ updateUserEmail, updateUserId }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        // Hardcoded admin credentials
        if (email === 'surajkoli9011@gmail.com' && password === 'Suraj@123') {
            console.log('Admin login successful');
            updateUserEmail(email);
            updateUserId(1); // You can set a hardcoded ID for admin or fetch it dynamically if needed
            navigate('/admin'); // Navigate to the admin dashboard
            return;
        }

        try {
            const response = await axios.post('http://localhost:8095/auth/authenticate', formData);
            console.log('Login successful:', response.data);
            updateUserEmail(email); // Update user email
            updateUserId(response.data.id); // Update userId
            navigate('/'); // Navigate to home or dashboard after login
        } catch (error) {
            console.error('Login failed:', error);
            // Handle error appropriately
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md bg-gradient-to-r from-cyan-300 to-indigo-600">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>
                    <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-blue-700">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
