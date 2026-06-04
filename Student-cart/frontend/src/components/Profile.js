import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersAndWishlist = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        };
        const [ordersRes, wishlistRes] = await Promise.all([
          axios.get('/api/orders/myorders', config),
          axios.get('/api/wishlist', config)
        ]);

        if (ordersRes.data.success) {
          setOrders(ordersRes.data.data);
        }
        if (wishlistRes.data.success) {
          setWishlist(wishlistRes.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrdersAndWishlist();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container" style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="container profile-page">
      <div className="profile-header">
        <h2>My Profile</h2>
        <button onClick={logout} className="logout-btn">Log Out</button>
      </div>

      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <h3>Order History</h3>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span><strong>Order ID:</strong> {order._id}</span>
                <span><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</span>
                <span><strong>Status:</strong> {order.status}</span>
                <span><strong>Total:</strong> ₹{order.totalAmount}</span>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} width="50" />
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 style={{ marginTop: '2rem' }}>My Wishlist</h3>
      {loading ? (
        <p>Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="orders-list">
          <div className="order-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', padding: '1rem' }}>
            {wishlist.map((item, index) => (
              <div key={index} className="wishlist-item" style={{ border: '1px solid #e5e7eb', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100px', objectFit: 'contain' }} />
                <h4 style={{ fontSize: '0.9rem', margin: '10px 0 5px' }}>{item.product.name}</h4>
                <p style={{ color: '#10b981', fontWeight: 'bold' }}>₹{item.product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
