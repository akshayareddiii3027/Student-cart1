import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    let result;
    if (isLoginMode) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.name, formData.email, formData.password);
    }

    if (result.success) {
      onClose();
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
        <p>Enter your details to continue</p>
        
        {errorMsg && <p className="error-message" style={{ color: 'red' }}>{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="name">Name <span className="required">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required={!isLoginMode}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., student@college.edu"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password <span className="required">*</span></label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="submit-btn">{isLoginMode ? 'Log In' : 'Sign Up'}</button>
        </form>
        
        <p style={{ marginTop: '1rem', textAlign: 'center', cursor: 'pointer', color: '#3b82f6' }} onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
