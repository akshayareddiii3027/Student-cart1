import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    const result = await login(formData.email, formData.password);

    if (result.success) {
      // We will rely on App.js to check user.role on the next render
      // But we can notify the parent
      onLoginSuccess();
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h2>Admin Portal</h2>
          <p>Sign in with your administrator credentials.</p>
        </div>
        
        {errorMsg && <div className="admin-error-message">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="admin-email">Admin Email</label>
            <input
              type="email"
              id="admin-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@studentcart.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              type="password"
              id="admin-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="admin-submit-btn">Login to Dashboard</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
