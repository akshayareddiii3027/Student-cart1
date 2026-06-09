import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import './Recommendations.css';

const Recommendations = ({ currentCart = [], onAddToCart }) => {
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const { data } = await axios.get('/api/products');
                if (data.success) {
                    const allProducts = data.data;
                    
                    // Logic: Find categories present in cart
                    const cartCategories = [...new Set(currentCart.map(item => item.category))];
                    const cartItemIds = new Set(currentCart.map(item => item.id || item._id));
                    
                    let recs = [];
                    if (cartCategories.length > 0) {
                        // Recommend products from same categories that aren't in cart yet
                        recs = allProducts.filter(p => 
                            cartCategories.includes(p.category) && 
                            !cartItemIds.has(p.id) && !cartItemIds.has(p._id)
                        );
                    }

                    // If not enough recommendations based on cart, fill with top rated
                    if (recs.length < 4) {
                        const topRated = [...allProducts]
                            .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
                            .filter(p => !cartItemIds.has(p.id) && !cartItemIds.has(p._id) && !recs.includes(p));
                        
                        recs = [...recs, ...topRated];
                    }

                    // Get top 4
                    setRecommended(recs.slice(0, 4));
                }
            } catch (err) {
                console.error("Failed to load recommendations", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [currentCart]);

    if (loading || recommended.length === 0) return null;

    return (
        <div className="recommendations-container glass">
            <div className="recommendations-header">
                <h3><span className="sparkle">✨</span> Recommended For You</h3>
                <p>Based on your current cart and preferences</p>
            </div>
            <div className="recommendations-grid">
                {recommended.map(product => (
                    <div key={product.id || product._id} className="rec-card">
                        <div className="rec-img">
                            <img 
                                src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} 
                                alt={product.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&fit=crop";
                                }}
                            />
                        </div>
                        <div className="rec-info">
                            <h4 className="rec-name">{product.name}</h4>
                            <div className="rec-rating">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} fill={i < Math.floor(product.rating) ? "var(--warning)" : "none"} color="var(--warning)" size={12} />
                                ))}
                            </div>
                            <div className="rec-bottom">
                                <span className="rec-price">₹{product.price.toLocaleString()}</span>
                                <button className="rec-add-btn" onClick={() => onAddToCart(product)}>
                                    <FiShoppingCart size={14} /> Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
