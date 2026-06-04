import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi';
import Tilt from 'react-parallax-tilt';
import { useAuth } from '../context/AuthContext';
import './ProductListing.css';

const ProductListing = ({ selectedCategory, searchTerm, onAddToCart }) => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [externalProducts, setExternalProducts] = useState([]);
    const [externalLoading, setExternalLoading] = useState(false);
    const [wishlistIds, setWishlistIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [priceRange, setPriceRange] = useState(5000);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedRating, setSelectedRating] = useState(0);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                if (data.success) {
                    setProducts(data.data);
                }
            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        const fetchWishlist = async () => {
            if (!user) return;
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('/api/wishlist', config);
                if (data.success) {
                    const ids = data.data.map(item => item.product.id || item.product._id);
                    setWishlistIds(new Set(ids));
                }
            } catch (err) {
                console.error('Failed to fetch wishlist', err);
            }
        };

        fetchProducts();
        fetchWishlist();
    }, [user]);

    // Fetch external products when searchTerm changes
    useEffect(() => {
        if (!searchTerm) {
            setExternalProducts([]);
            return;
        }

        const fetchExternal = async () => {
            setExternalLoading(true);
            try {
                const { data } = await axios.get(`/api/aggregate?q=${encodeURIComponent(searchTerm)}`);
                if (data.success) {
                    setExternalProducts(data.data);
                }
            } catch (err) {
                console.error('Failed to fetch external products', err);
            } finally {
                setExternalLoading(false);
            }
        };

        const timerId = setTimeout(() => {
            fetchExternal();
        }, 800); // debounce

        return () => clearTimeout(timerId);
    }, [searchTerm]);

    const handleToggleWishlist = async (product) => {
        if (!user) {
            alert('Please login to add to wishlist');
            return;
        }
        
        const productId = product.id || product._id;
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        
        try {
            if (wishlistIds.has(productId)) {
                // Remove from wishlist
                await axios.delete(`/api/wishlist/${productId}`, config);
                setWishlistIds(prev => {
                    const next = new Set(prev);
                    next.delete(productId);
                    return next;
                });
            } else {
                // Add to wishlist
                await axios.post('/api/wishlist', { productId }, config);
                setWishlistIds(prev => {
                    const next = new Set(prev);
                    next.add(productId);
                    return next;
                });
            }
        } catch (error) {
            console.error('Error toggling wishlist', error);
        }
    };

    // Update selected filters when the prop changes
    useEffect(() => {
        if (selectedCategory) {
            setSelectedFilters([selectedCategory]);
        } else {
            setSelectedFilters([]); // Reset if null
        }
    }, [selectedCategory]);

    const handleFilterChange = (category) => {
        setSelectedFilters(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    }

    // Apply filtering logic
    const filteredProducts = products.filter(product => {
        const matchesPrice = product.price <= priceRange;
        const matchesCategory = selectedFilters.length === 0 || selectedFilters.includes(product.category);
        const matchesRating = product.rating >= selectedRating;
        const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesPrice && matchesCategory && matchesRating && matchesSearch;
    });

    if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Loading products...</div>;
    if (error) return <div style={{textAlign: 'center', padding: '50px', color: 'red'}}>{error}</div>;

    return (
        <section className="product-listing">
            <div className="container pl-layout">

                {/* Sidebar */}
                <aside className="filters-sidebar">
                    <div className="filter-header">
                        <h3>Filters</h3>
                        <button className="reset-btn" onClick={() => { setPriceRange(5000); setSelectedFilters([]); setSelectedRating(0); }}>Reset</button>
                    </div>

                    <div className="filter-group">
                        <h4>Price Range</h4>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="range-slider"
                        />
                        <div className="range-values">
                            <span>₹0</span>
                            <span>₹{priceRange}</span>
                        </div>
                    </div>

                    <div className="filter-group">
                        <h4>Category</h4>
                        <label className="checkbox-label">
                            <input type="checkbox" checked={selectedFilters.includes('Trendy Outfits')} onChange={() => handleFilterChange('Trendy Outfits')} /> Trendy Outfits
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" checked={selectedFilters.includes('Essentials')} onChange={() => handleFilterChange('Essentials')} /> Essentials
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" checked={selectedFilters.includes('Electronics')} onChange={() => handleFilterChange('Electronics')} /> Electronics
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" checked={selectedFilters.includes('Mobile Subscriptions')} onChange={() => handleFilterChange('Mobile Subscriptions')} /> Mobile Subscriptions
                        </label>
                    </div>

                    <div className="filter-group">
                        <h4>Rating</h4>
                        <label className="checkbox-label">
                            <input
                                type="radio"
                                name="rating"
                                checked={selectedRating === 4}
                                onChange={() => setSelectedRating(4)}
                            /> 4+ Stars
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="radio"
                                name="rating"
                                checked={selectedRating === 3}
                                onChange={() => setSelectedRating(3)}
                            /> 3+ Stars
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="radio"
                                name="rating"
                                checked={selectedRating === 2}
                                onChange={() => setSelectedRating(2)}
                            /> 2+ Stars
                        </label>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="product-grid-container">
                    <div className="grid-header">
                        <h2>{searchTerm ? `Search Results for "${searchTerm}"` : (selectedFilters.length === 1 ? selectedFilters[0] : 'All Products')}</h2>
                        <p>Showing {filteredProducts.length + externalProducts.length} products</p>
                    </div>

                    {externalLoading && <div style={{ marginBottom: '1rem', color: '#3b82f6', fontWeight: '500' }}>Fetching live deals from Amazon & Flipkart...</div>}

                    <div className="product-grid">
                        {/* Render External Products First if Searching */}
                        {externalProducts.map(product => (
                            <Tilt key={product.id} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2000} className="product-card external-card" style={{ border: '2px solid rgba(255,255,255,0.1)', background: 'var(--surface)' }}>
                                <div className="product-image-container">
                                    <span className="category-tag" style={{ backgroundColor: product.source === 'Amazon' ? '#f59e0b' : '#3b82f6' }}>
                                        {product.source}
                                    </span>
                                    {product.discount && <span className="discount-tag">{product.discount}</span>}
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="product-details">
                                    <h3 className="product-name" style={{ color: 'var(--text-dark)' }}>{product.name}</h3>
                                    <div className="product-rating">
                                        <FiStar className="star-icon" /> {product.rating}
                                    </div>
                                    <div className="product-price-row">
                                        <div className="product-pricing">
                                            <span className="price-current" style={{ color: 'var(--success)' }}>₹{product.price}</span>
                                            {product.originalPrice && <span className="price-old">₹{product.originalPrice}</span>}
                                        </div>
                                    </div>
                                    <div className="product-actions" style={{ display: 'block' }}>
                                        <a 
                                            href={product.externalUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn-buy-now"
                                            style={{ display: 'block', textAlign: 'center', width: '100%', textDecoration: 'none', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}
                                        >
                                            View on {product.source}
                                        </a>
                                    </div>
                                </div>
                            </Tilt>
                        ))}

                        {/* Render Local Products */}
                        {filteredProducts.map(product => (
                            <Tilt key={product.id || product._id} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2000} className="product-card glass" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'var(--surface)' }}>
                                <div className="product-image-container">
                                    <span className="category-tag">{product.category}</span>
                                    {product.discount && <span className="discount-tag">{product.discount}</span>}
                                    <button 
                                        className={`wishlist-btn ${wishlistIds.has(product.id || product._id) ? 'active' : ''}`}
                                        onClick={() => handleToggleWishlist(product)}
                                        style={{
                                            position: 'absolute', top: '10px', right: '10px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', padding: '8px', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(4px)'
                                        }}
                                    >
                                        <FiHeart fill={wishlistIds.has(product.id || product._id) ? '#ef4444' : 'none'} color={wishlistIds.has(product.id || product._id) ? '#ef4444' : '#f8fafc'} size={20} />
                                    </button>
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="product-details">
                                    <h3 className="product-name" style={{ color: 'var(--text-dark)' }}>{product.name}</h3>
                                    <div className="product-rating">
                                        <FiStar className="star-icon" /> {product.rating}
                                    </div>
                                    <div className="product-price-row">
                                        <div className="product-pricing">
                                            <span className="price-current" style={{ color: 'var(--success)' }}>₹{product.price}</span>
                                            {product.originalPrice && <span className="price-old">₹{product.originalPrice}</span>}
                                        </div>
                                    </div>
                                    <div className="product-actions">
                                        <button 
                                            className="btn-add-cart" 
                                            onClick={() => {
                                                if (onAddToCart) onAddToCart(product);
                                            }}
                                            style={{ background: 'var(--bg-color)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                                        >
                                            <FiShoppingCart /> Add to Cart
                                        </button>
                                        <button 
                                            className="btn-buy-now" 
                                            onClick={() => {
                                                if (onAddToCart) onAddToCart(product, true);
                                            }}
                                            style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </Tilt>
                        ))}
                    </div>
                </main>

            </div>
        </section>
    );
};

export default ProductListing;
