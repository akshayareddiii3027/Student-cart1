import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiSearch } from 'react-icons/fi';
import './AdminTables.css';

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/orders', config);
      setOrders(data.data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(o => 
    o._id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (o.user && o.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus }, config);
      setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  return (
    <div className="admin-panel-section">
      <div className="admin-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Manage Orders</h2>
          <p>View all customer orders across the platform.</p>
        </div>
        
        <div className="admin-search">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by Order ID or User..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="admin-card">
        {isLoading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">No orders found</td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order._id}>
                      <td><small>{order._id.substring(18)}</small></td>
                      <td>{order.userId ? order.userId.name : (order.customerName || 'Guest')}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td><strong>₹{order.totalAmount}</strong></td>
                      <td>
                        <select 
                          value={order.orderStatus || 'Order Placed'}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`badge-status ${order.orderStatus || 'Order Placed'}`}
                          style={{ border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px' }}
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td>{order.orderedItems?.length || 0} items</td>
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

export default AdminOrders;
