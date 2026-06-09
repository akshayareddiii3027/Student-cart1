import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiMenu, FiShoppingCart } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ 
    cartCount = 0, 
    onLoginClick, 
    onCartClick, 
    onProfileClick, 
    onHomeClick, 
    onAdminClick,
    searchTerm, 
    setSearchTerm,
    theme,
    toggleTheme 
}) => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="header-container container">
        
        {/* Logo */}
        <motion.div 
          className="logo group" 
          onClick={onHomeClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="logo-icon animate-float">SC</div>
          <span className="logo-text">
            Student<span className="text-gradient">Cart</span>
          </span>
        </motion.div>

        {/* Search Bar */}
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for essentials, electronics..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Navigation */}
        <nav className="nav-actions">
          <button className="nav-icon-btn d-none d-md-flex">
            <FiMenu size={22} />
            <span>Categories</span>
          </button>

          <button className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          <button className="nav-icon-btn cart-btn" onClick={onCartClick}>
            <div className="cart-icon-wrapper">
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <motion.span 
                  className="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                >
                  {cartCount}
                </motion.span>
              )}
            </div>
          </button>
          
          {user ? (
            <>
              {user.role === 'admin' && (
                <button className="btn-profile" onClick={onAdminClick} style={{ backgroundColor: 'var(--primary)', color: 'white', marginRight: '10px' }}>
                  <span>Admin</span>
                </button>
              )}
              <button className="btn-profile" onClick={onProfileClick}>
                <BiUser size={20} />
                <span>{user.name.split(' ')[0]}</span>
              </button>
            </>
          ) : (
            <button className="btn-login" onClick={onLoginClick}>
              <BiUser size={20} />
              <span>Login</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
