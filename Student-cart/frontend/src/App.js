import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ComboPacks from './components/ComboPacks';
import MobilePlans from './components/MobilePlans';
import CategoryShop from './components/CategoryShop';
import ProductListing from './components/ProductListing';
import LoginModal from './components/LoginModal';
import Cart from './components/Cart';
import Profile from './components/Profile';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'profile'
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentView('home');
  };

  const handleAddToCart = (product, openCart = false) => {
    setCart(prevCart => {
      // Check if item already in cart
      const existingItem = prevCart.find(item => (item.id || item._id) === (product.id || product._id));
      if (existingItem) {
        return prevCart.map(item => 
          (item.id || item._id) === (product.id || product._id) 
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    if (openCart) {
      setIsCartOpen(true);
    } else {
      setIsCartOpen(true); // Always open cart as requested in original code, wait, let's keep it openCart aware.
    }
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(index);
    } else {
      setCart(prevCart => {
        const newCart = [...prevCart];
        newCart[index] = { ...newCart[index], quantity: newQuantity };
        return newCart;
      });
    }
  };

  const handleRemoveItem = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const handleCartClear = () => {
    setCart([]);
  }

  return (
    <div className="App">
      <Header 
        cartCount={cart.reduce((total, item) => total + (item.quantity || 1), 0)} 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        onCartClick={() => setIsCartOpen(!isCartOpen)} 
        onProfileClick={() => setCurrentView('profile')}
        onHomeClick={() => setCurrentView('home')}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      
      {isCartOpen && (
        <Cart
          items={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleCartClear}
        />
      )}
      
      <main style={{ minHeight: '80vh', position: 'relative' }}>
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero />
              <CategoryShop onSelectCategory={handleCategorySelect} />
              <ProductListing selectedCategory={selectedCategory} searchTerm={searchTerm} onAddToCart={handleAddToCart} />
              <ComboPacks onAddToCart={handleAddToCart} />
              <MobilePlans />
            </motion.div>
          ) : currentView === 'profile' ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Profile />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '3rem',
        backgroundColor: 'var(--surface)',
        color: 'var(--text-muted)',
        marginTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <p>&copy; 2026 StudentCart. All rights reserved.</p>
        <p style={{ opacity: 0.7, fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--primary)' }}>Tailored essentials for your college life.</p>
      </footer>
    </div>
  );
}

export default App;
