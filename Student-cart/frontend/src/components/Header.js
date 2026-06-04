import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiMenu, FiShoppingCart } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ cartCount = 0, onLoginClick, onCartClick, onProfileClick, onHomeClick, searchTerm, setSearchTerm }) => {
  const { user } = useAuth();

  return (
    <header className="header glass" style={{ borderBottom: 'none' }}>
      <div className="header-container">
        <motion.div whileHover={{ scale: 1.05 }} className="logo" onClick={onHomeClick} style={{cursor: 'pointer'}}>
          <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>SC</div>
          <span className="logo-text" style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>StudentCart</span>
        </motion.div>

        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <nav className="nav-actions">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="nav-btn category-btn" style={{ color: '#f8fafc' }}>
            <FiMenu /> Categories
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="nav-btn icon-btn cart-btn-container" onClick={onCartClick} title="Open shopping cart" style={{ color: '#f8fafc' }}>
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </motion.button>
          
          {user ? (
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)' }} whileTap={{ scale: 0.95 }} className="login-btn" onClick={onProfileClick} style={{backgroundColor: '#10b981', color: 'white'}}>
              <BiUser style={{ fontSize: '18px' }} /> {user.name}
            </motion.button>
          ) : (
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)' }} whileTap={{ scale: 0.95 }} className="login-btn" onClick={onLoginClick} style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
              <BiUser style={{ fontSize: '18px' }} /> Login
            </motion.button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
