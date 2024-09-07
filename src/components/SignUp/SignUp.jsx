import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobileNo: '',
        address: '',
        role: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }

        if (!formData.mobileNo.trim()) {
            errors.mobileNo = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNo)) {
            errors.mobileNo = 'Mobile number is invalid';
        }

        if (!formData.address.trim()) {
            errors.address = 'Address is required';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8095/auth/register', formData);
            console.log('Registration successful:', response.data);
            // Navigate to login page or show success message
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle error appropriately
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-lime-90  w-0500">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md bg-gradient-to-r from-cyan-300 to-indigo-600">
                <h2 className="text-2xl font-bold mb-4 text-center">Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex items-center ">
                        <label htmlFor="firstName" className="w-1/3 text-gray-700 font-bold">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-2/3 px-4 py-2 border rounded-md"
                            required
                        />
                        {errors.firstName && <span className="text-red-500 text-sm ">{errors.firstName}</span>}
                    </div>
                    <div className="mb-4 flex items-center">
                        <label htmlFor="lastName" className="w-1/3 text-gray-700 font-bold">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-2/3 px-4 py-2 border rounded-md"
                            required
                        />
                        {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
                    </div>
                    <div className="mb-4 flex items-center">
                        <label htmlFor="email" className="w-1/3 text-gray-700 font-bold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-2/3 px-4 py-2 border rounded-md"
                            required
                        />
                        {errors.email && <span className="text-red-500 text-sm font-bold">{errors.email}</span>}
                    </div>
                    <div className="mb-4 flex items-center">
                        <label htmlFor="password" className="w-1/3 text-gray-700 font-bold">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-2/3 px-4 py-2 border rounded-md"
                            required
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>
                    <div className="mb-4 flex items-center">
                        <label htmlFor="mobileNo" className="w-1/3 text-gray-700 font-bold">Mobile No</label>
                        <input
                            type="text"
                            id="mobileNo"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleInputChange}
                            className="w-2/3 px-4 py-2 border rounded-md"
                            required
                        />
                        {errors.mobileNo && <span className="text-red-500 text-sm">{errors.mobileNo}</span>}
                    </div>
                    <div className="mb-4 flex items-center">
                        <label htmlFor="address" className="w-1/3 text-gray-700 font-bold">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-2/3 px-4 py-2 border rounded-md"
                            required
                        />
                        {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                    </div>
                    <div className="mb-4 flex items-center">
                        <label htmlFor="role" className="w-1/3 text-gray-700 font-bold">Role</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-2/3 px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-blue-700">Submit</button>
                </form>
            </div>

        </div>
    );
};

export default SignUp;
