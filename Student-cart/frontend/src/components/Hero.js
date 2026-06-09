import React from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="container hero-container">
        
        {/* Text Content */}
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="badge-exclusive animate-float">
            <span className="sparkle">✨</span> 2026 Exclusive Student Deals
          </div>
          
          <h1 className="hero-title">
            The Ultimate <br/>
            <span className="text-gradient">Student Setup</span>
          </h1>
          
          <p className="hero-subtitle">
            Elevate your campus life. From premium electronics to trendy fits, discover hand-picked collections with unbelievable student pricing.
          </p>
          
          <div className="hero-actions">
            <button className="btn-glow" onClick={() => scrollToSection('.product-listing')}>
              <FiShoppingBag className="btn-icon" /> Shop Collection
            </button>
            <button className="btn-outline" onClick={() => scrollToSection('.category-shop')}>
              Explore Categories <FiArrowRight className="btn-icon" />
            </button>
          </div>
        </motion.div>

        {/* 3D Abstract Illustration Placeholder */}
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="floating-shape shape-1 animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="floating-shape shape-2 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="floating-shape shape-3 animate-float" style={{ animationDelay: '4s' }}></div>
          
          {/* Main Visual Image - using a high-quality student setup */}
          <div className="hero-image-wrapper glass">
            <img 
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop" 
              alt="Premium Student Desk Setup" 
              className="hero-main-img"
            />
            <div className="glass-overlay-stats">
              <div className="stat">
                <span className="stat-num">400+</span>
                <span className="stat-label">Student Essentials</span>
              </div>
              <div className="stat">
                <span className="stat-num">50%</span>
                <span className="stat-label">College Discount</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
