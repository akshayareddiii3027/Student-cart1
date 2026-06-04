import React from 'react';
import { FiHome } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
    const scrollToSection = (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero">
            <div className="hero-content">
                <div className="badge-light-blue mb-4">
                    ✨ Exclusive Student Discounts Available
                </div>
                <h1 className="hero-title">
                    Affordable Essentials & Trends<br />
                    for Students
                </h1>
                <p className="hero-subtitle">
                    Shop trendy outfits, daily essentials, electronics, and more<br />
                    tailored for college life
                </p>
                <div className="hero-actions">
                    <button className="btn-primary" onClick={() => scrollToSection('.category-shop')}>
                        <FiHome className="btn-icon" /> Shop Now
                    </button>
                    <button className="btn-secondary" onClick={() => scrollToSection('.combo-packs')}>
                        Explore Offers
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
