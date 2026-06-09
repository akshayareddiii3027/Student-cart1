import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import './CategoryShop.css';

const categories = [
    { id: 1, name: 'Trendy Outfits', icon: '👕', link: '#', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop' },
    { id: 2, name: 'Essentials', icon: '📚', link: '#', image: 'https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=800&auto=format&fit=crop' },
    { id: 3, name: 'Electronics', icon: '💻', link: '#', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop' },
    { id: 4, name: 'Mobile Subscriptions', icon: '📱', link: '#', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop' },
    { id: 5, name: 'Combo Packs', icon: '🎁', link: '#', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
};

const CategoryShop = ({ onSelectCategory }) => {
    return (
        <section className="category-shop">
            <div className="container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        Shop by <span className="text-gradient">Category</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle">
                        Find everything you need for college life curated just for you
                    </motion.p>

                    <motion.div variants={containerVariants} className="category-grid">
                        {categories.map((cat) => (
                            <motion.div variants={itemVariants} key={cat.id}>
                                <Tilt 
                                    tiltMaxAngleX={10} 
                                    tiltMaxAngleY={10} 
                                    scale={1.05} 
                                    transitionSpeed={2000}
                                    glareEnable={true}
                                    glareMaxOpacity={0.2}
                                    glareColor="#8b5cf6"
                                    glarePosition="all"
                                    className="tilt-wrapper"
                                >
                                    <div
                                        className="category-card"
                                        style={{ backgroundImage: `url(${cat.image})` }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (onSelectCategory) {
                                                onSelectCategory(cat.name);
                                            }
                                        }}
                                    >
                                        <div className="category-card-overlay glass">
                                            <div className="category-icon-wrapper">
                                                <div className="category-icon-3d">{cat.icon}</div>
                                            </div>
                                            <h3 className="category-name">{cat.name}</h3>
                                            <div className="category-link-container">
                                                <span className="category-link">Explore Collection →</span>
                                            </div>
                                        </div>
                                    </div>
                                </Tilt>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CategoryShop;
