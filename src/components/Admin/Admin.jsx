import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    category: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8098/products/all');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProduct = async (pid) => {
    try {
      await axios.delete(`http://localhost:8098/products/delete/${pid}`);
      setProducts(products.filter(product => product.pid !== pid));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const errors = {};

    if (!product.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!product.image.trim()) {
      errors.image = 'Image URL is required';
    }
    if (!product.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!product.price.trim()) {
      errors.price = 'Price is required';
    } else if (isNaN(product.price)) {
      errors.price = 'Price must be a number';
    }
    if (!product.category) {
      errors.category = 'Category is required';
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
      const response = await axios.post('http://localhost:8098/products/create', product);
      console.log('Product Added successfully:', response);
      setProduct({
        name: '',
        image: '',
        description: '',
        price: '',
        category: ''
      });
      // navigate('/adminDashboard');
    } catch (error) {
      console.error('Product addition failed:', error);
    }
  };

  useEffect(() => {
    if (selectedComponent === 'getAllProducts') {
      fetchProducts();
    }
  }, [selectedComponent]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="flex flex-col mt-4">
          <button 
            onClick={() => setSelectedComponent('getAllProducts')} 
            className="py-2.5 px-4 hover:bg-blue-700 transition duration-300 text-left"
          >
            Get All Products
          </button>
          <button 
            onClick={() => setSelectedComponent('addProduct')} 
            className="py-2.5 px-4 hover:bg-blue-700 transition duration-300 text-left"
          >
            Add Products
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {selectedComponent === '' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h2>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        )}
        {selectedComponent === 'getAllProducts' && (
          <div className="get-all-products-container">
            <h2 className="text-3xl font-bold mb-6">All Products</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table-auto w-full bg-white shadow-md rounded">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Product Id</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.pid} className="border-t">
                      <td className="px-4 py-2">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover" />
                      </td>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">₹{product.price}</td>
                      <td className="px-4 py-2">{product.description}</td>
                      <td className="px-4 py-2">{product.category}</td>
                      <td className="px-4 py-2">{product.pid}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleRemoveProduct(product.pid)}
                          className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {selectedComponent === 'addProduct' && (
          <div className="parent">
            <div className="product-form-container bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Add Product</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="product-input border border-gray-300 p-2 rounded w-full"
                  />
                  {errors.name && <span className="error text-red-500">{errors.name}</span>}
                </div>
                <div>
                  <label className="block text-gray-700">Image URL:</label>
                  <input
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    className="product-input border border-gray-300 p-2 rounded w-full"
                  />
                  {errors.image && <span className="error text-red-500">{errors.image}</span>}
                </div>
                <div>
                  <label className="block text-gray-700">Description:</label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="product-input border border-gray-300 p-2 rounded w-full"
                  />
                  {errors.description && <span className="error text-red-500">{errors.description}</span>}
                </div>
                <div>
                  <label className="block text-gray-700">Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="product-input border border-gray-300 p-2 rounded w-full"
                  />
                  {errors.price && <span className="error text-red-500">{errors.price}</span>}
                </div>
                <div>
                  <label className="block text-gray-700">Category:</label>
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="product-input border border-gray-300 p-2 rounded w-full"
                  >
                    <option value="">Select Category</option>
                    <option value="SHOES">Shoes</option>
                    <option value="CLOTHING">Clothing</option>
                    <option value="WATCHES">Watches</option>
                  </select>
                  {errors.category && <span className="error text-red-500">{errors.category}</span>}
                </div>
                <button type="submit" className="submit-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Add Product
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
