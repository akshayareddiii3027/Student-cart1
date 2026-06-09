import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [productData, setProductData] = useState({
    id: '',
    name: '',
    category: 'Trendy Outfits',
    price: '',
    originalPrice: '',
    discount: '',
    image: '',
    description: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!user || user.role !== 'admin') {
      setMessage({ type: 'error', text: 'You are not authorized as an admin' });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      };
      
      const payload = {
        ...productData,
        id: Number(productData.id),
        price: Number(productData.price),
        originalPrice: Number(productData.originalPrice)
      };

      await axios.post('/api/products', payload, config);
      setMessage({ type: 'success', text: 'Product added successfully!' });
      setProductData({
        id: '',
        name: '',
        category: 'Trendy Outfits',
        price: '',
        originalPrice: '',
        discount: '',
        image: '',
        description: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error adding product' });
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-dashboard">
        <h2>Access Denied</h2>
        <p>You must be an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-form-container">
        <h2>Add New Product</h2>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Product ID (Numeric)</label>
            <input type="number" name="id" value={productData.id} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={productData.category} onChange={handleChange} required>
              <option value="Trendy Outfits">Trendy Outfits</option>
              <option value="Essentials">Essentials</option>
              <option value="Electronics">Electronics</option>
              <option value="Mobile Subscriptions">Mobile Subscriptions</option>
              <option value="Combo Packs">Combo Packs</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Price ($)</label>
            <input type="number" name="price" value={productData.price} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Original Price ($)</label>
            <input type="number" name="originalPrice" value={productData.originalPrice} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Discount Text (e.g., "20% OFF")</label>
            <input type="text" name="discount" value={productData.discount} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" name="image" value={productData.image} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={productData.description} onChange={handleChange} required rows="3"></textarea>
          </div>
          
          <button type="submit" className="btn-submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
