import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrendingUp, FiInfo } from 'react-icons/fi';
import Tilt from 'react-parallax-tilt';
import './ComboPacks.css';

const ComboPacks = ({ onAddToCart }) => {
    const [comboPacks, setComboPacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComboPacks = async () => {
            try {
                const { data } = await axios.get('/api/combo-packs');
                if (data.success) {
                    setComboPacks(data.data);
                }
            } catch (err) {
                setError('Failed to fetch combo packs');
            } finally {
                setLoading(false);
            }
        };

        fetchComboPacks();
    }, []);

    if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Loading combo packs...</div>;
    if (error) return <div style={{textAlign: 'center', padding: '50px', color: 'red'}}>{error}</div>;

    return (
        <section className="combo-packs">
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <div className="badge-light">
                        <FiTrendingUp style={{ color: '#10b981' }} /> Save up to 50%
                    </div>
                </div>
                <h2 className="section-title">Student Combo Packs</h2>
                <p className="section-subtitle">Curated bundles of essentials at unbeatable prices</p>

                <div className="combo-grid">
                    {comboPacks.map(combo => (
                        <Tilt key={combo.id || combo._id} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2000} className="combo-card glass" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'var(--surface)' }}>
                            <div className="combo-image-wrapper">
                                <span className="discount-badge">{combo.discount}</span>
                                <img src={combo.image} alt={combo.name} />
                            </div>
                            <div className="combo-info">
                                <h3>{combo.name}</h3>
                                <p>{combo.description}</p>
                                <div className="package-includes">
                                    <strong><FiInfo className="item-icon" /> Package Includes:</strong>
                                    <ul>
                                        {combo.items && combo.items.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="combo-price-action">
                                    <div className="price">
                                        <span className="current">₹{combo.price}</span>
                                        <span className="original">₹{combo.originalPrice}</span>
                                    </div>
                                    <div className="combo-actions">
                                        <button
                                            className="btn-add"
                                            onClick={() => {
                                                if (onAddToCart) {
                                                    onAddToCart({
                                                        id: combo.id || combo._id,
                                                        name: combo.name,
                                                        price: combo.price,
                                                        image: combo.image,
                                                        category: 'Combo Pack'
                                                    });
                                                }
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            className="btn-buy"
                                            onClick={() => {
                                                if (onAddToCart) {
                                                    onAddToCart({
                                                        id: combo.id || combo._id,
                                                        name: combo.name,
                                                        price: combo.price,
                                                        image: combo.image,
                                                        category: 'Combo Pack'
                                                    }, true);
                                                }
                                            }}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Tilt>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ComboPacks;
