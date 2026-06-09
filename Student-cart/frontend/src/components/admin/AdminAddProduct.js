import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './AdminForms.css';

const AdminAddProduct = ({ onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'Trendy Outfits',
    description: '',
    originalPrice: '',
    price: '', // Discount Price technically, but mapping to schema
    discount: '', // e.g. "20% OFF"
    quantity: '1',
    brand: '',
    sizes: '', // comma separated
    colors: '' // comma separated
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setIsLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (imageFile) {
        data.append('image', imageFile);
      }

      await axios.post('/api/products/add', data, config);
      setMessage({ type: 'success', text: 'Product added successfully!' });
      
      // Reset form or trigger success callback
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);

    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error adding product' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-panel-section">
      <div className="admin-panel-header">
        <h2>Add New Product</h2>
        <p>Fill out the details below to add a new product to the catalog.</p>
      </div>

      {message.text && (
        <div className={`admin-alert admin-alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-card">
        <form onSubmit={handleSubmit} className="admin-form-grid">
          
          <div className="form-group">
            <label>Product ID (Unique Number)</label>
            <input type="number" name="id" value={formData.id} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="Trendy Outfits">Trendy Outfits</option>
              <option value="Essentials">Essentials</option>
              <option value="Electronics">Electronics</option>
              <option value="Mobile Subscriptions">Mobile Subscriptions</option>
              <option value="Combo Packs">Combo Packs</option>
            </select>
          </div>

          <div className="form-group">
            <label>Brand</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Nike, Apple" />
          </div>

          <div className="form-group">
            <label>Original Price ($)</label>
            <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} required step="0.01" />
          </div>

          <div className="form-group">
            <label>Discount Price ($)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required step="0.01" />
          </div>

          <div className="form-group">
            <label>Discount Text</label>
            <input type="text" name="discount" value={formData.discount} onChange={handleChange} placeholder="e.g. 20% OFF" required />
          </div>

          <div className="form-group">
            <label>Available Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required min="0" />
          </div>

          <div className="form-group">
            <label>Size Options (comma separated)</label>
            <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} placeholder="S, M, L, XL" />
          </div>

          <div className="form-group">
            <label>Color Options (comma separated)</label>
            <input type="text" name="colors" value={formData.colors} onChange={handleChange} placeholder="Red, Blue, Black" />
          </div>

          <div className="form-group full-width">
            <label>Product Image Upload</label>
            <input type="file" accept="image/*" onChange={handleFileChange} required className="file-input" />
          </div>

          <div className="form-group full-width">
            <label>Product Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="4"></textarea>
          </div>

          <div className="form-actions full-width">
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
