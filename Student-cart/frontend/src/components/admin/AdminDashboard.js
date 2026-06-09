import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminAddProduct from './AdminAddProduct';
import AdminProductList from './AdminProductList';
import AdminOrders from './AdminOrders';
import { FiBox, FiPlusCircle, FiShoppingBag, FiLogOut, FiHome } from 'react-icons/fi';
import './AdminDashboardLayout.css';

const AdminDashboard = ({ onExit }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-access-denied">
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
        <button onClick={onExit} className="btn-return">Return to Home</button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    onExit();
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>StudentCart <span className="admin-badge">ADMIN</span></h2>
        </div>
        
        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <FiBox /> Manage Products
          </button>
          
          <button 
            className={`admin-nav-item ${activeTab === 'add-product' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-product')}
          >
            <FiPlusCircle /> Add Product
          </button>
          
          <button 
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FiShoppingBag /> Manage Orders
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <p>Logged in as: <strong>{user.name}</strong></p>
          </div>
          <button className="admin-nav-item btn-danger" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
          <button className="admin-nav-item" onClick={onExit} style={{ marginTop: '0.5rem' }}>
            <FiHome /> Exit Dashboard
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content">
        {activeTab === 'products' && <AdminProductList />}
        {activeTab === 'add-product' && <AdminAddProduct onSuccess={() => setActiveTab('products')} />}
        {activeTab === 'orders' && <AdminOrders />}
      </main>
    </div>
  );
};

export default AdminDashboard;
