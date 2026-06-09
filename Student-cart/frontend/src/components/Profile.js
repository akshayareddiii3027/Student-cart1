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

  const [uploading, setUploading] = useState(false);
  const [isVerified, setIsVerified] = useState(user?.isStudentVerified || false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('studentId', file);

    try {
      setUploading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.post('/api/users/verify', formData, config);
      if (data.success) {
        setIsVerified(true);
        // We could also update the user context here, but local state works for UX
        alert('Student ID verified successfully! You now get 10% off on your orders.');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error uploading ID');
    } finally {
      setUploading(false);
    }
  };

  const trackingStages = ['Order Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];
  const getTrackingIndex = (status) => {
    const index = trackingStages.indexOf(status);
    return index === -1 ? 0 : index;
  };

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

      <div className="verification-card glass">
        <div className="verification-info">
          <h3>Student Verification Status
            {isVerified ? (
              <span className="badge-verified">✓ Verified</span>
            ) : (
              <span className="badge-unverified">Pending</span>
            )}
          </h3>
          <p className="text-muted">
            {isVerified 
              ? "You are a verified student. Enjoy your exclusive 10% discount on all orders!" 
              : "Upload your College ID to unlock an automatic 10% discount."}
          </p>
        </div>
        {!isVerified && (
          <div className="upload-btn-wrapper">
            <button className="upload-btn">
              {uploading ? 'Uploading...' : 'Upload College ID'}
            </button>
            <input type="file" name="studentId" onChange={handleFileUpload} accept="image/*" disabled={uploading} />
          </div>
        )}
      </div>

      <h3>Order History</h3>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card glass">
              <div className="order-header">
                <span><strong>Order ID:</strong> {order._id}</span>
                <span><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</span>
                <span><strong>Total:</strong> ₹{order.totalAmount}</span>
                <span><strong>Payment:</strong> {order.paymentMethod}</span>
              </div>
              
              <div className="order-tracking">
                <h4 style={{marginBottom: '10px'}}>Tracking Status: <span style={{color: 'var(--primary)'}}>{order.orderStatus}</span></h4>
                <div className="tracking-steps">
                  {trackingStages.map((stage, idx) => {
                    const currentIdx = getTrackingIndex(order.orderStatus);
                    const isActive = idx === currentIdx;
                    const isCompleted = idx <= currentIdx;
                    return (
                      <div key={stage} className={`tracking-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                        <div className="step-icon">
                          {isCompleted ? '✓' : (idx + 1)}
                        </div>
                        <span>{stage}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="order-items" style={{marginTop: '20px'}}>
                {order.orderedItems && order.orderedItems.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.productName} width="50" style={{objectFit: 'cover'}} />
                    <span style={{flex: 1, marginLeft: '15px'}}>{item.productName} (x{item.quantity})</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 style={{ marginTop: '3rem' }}>My Wishlist</h3>
      {loading ? (
        <p>Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="orders-list">
          <div className="order-card glass" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', padding: '1rem' }}>
            {wishlist.map((item, index) => (
              <div key={index} className="wishlist-item glass" style={{ padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100px', objectFit: 'contain', borderRadius: '8px' }} />
                <h4 style={{ fontSize: '0.9rem', margin: '10px 0 5px' }}>{item.product.name}</h4>
                <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>₹{item.product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
