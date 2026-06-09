import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import './AdminTables.css';

const AdminProductList = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data.data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        await axios.delete(`/api/products/delete/${id}`, config);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting product');
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toString().includes(searchTerm)
  );

  return (
    <div className="admin-panel-section">
      <div className="admin-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Manage Products</h2>
          <p>View, edit, and remove products from your catalog.</p>
        </div>
        
        <div className="admin-search">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="admin-card">
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">No products found</td>
                  </tr>
                ) : (
                  filteredProducts.map(product => (
                    <tr key={product._id}>
                      <td>{product.id}</td>
                      <td>
                        <img 
                          src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} 
                          alt={product.name} 
                          className="admin-table-img" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800";
                          }}
                        />
                      </td>
                      <td><strong>{product.name}</strong><br/><span style={{fontSize: '0.8rem', color: '#6b7280'}}>{product.brand}</span></td>
                      <td><span className="badge-category">{product.category}</span></td>
                      <td>${product.price}</td>
                      <td>{product.quantity || product.stock}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon edit" title="Edit functionality to be implemented in a modal">
                            <FiEdit2 />
                          </button>
                          <button className="btn-icon delete" onClick={() => handleDelete(product.id)}>
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductList;
