import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiShoppingCart, FiStar, FiHeart, FiFilter, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Recommendations from './Recommendations';
import './ProductListing.css';

const ProductListing = ({ selectedCategory, searchTerm, onAddToCart, onClearSearch, cartItems = [] }) => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [wishlistIds, setWishlistIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    
    // Filters
    const [priceRange, setPriceRange] = useState(150000);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedRating, setSelectedRating] = useState(0);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                if (data.success) {
                    setProducts(data.data);
                }
            } catch (err) {
                console.error('Failed to fetch products', err);
            } finally {
                // Add a tiny delay to show off the premium skeleton loader
                setTimeout(() => setLoading(false), 800);
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
            } catch (err) {}
        };

        fetchProducts();
        fetchWishlist();
    }, [user]);



    useEffect(() => {
        if (selectedCategory) {
            setSelectedFilters([selectedCategory]);
        } else {
            setSelectedFilters([]);
        }
    }, [selectedCategory]);

    const handleFilterChange = (category) => {
        setSelectedFilters(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const handleToggleWishlist = async (product) => {
        if (!user) {
            alert('Please login to add to wishlist');
            return;
        }
        const productId = product.id || product._id;
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        try {
            if (wishlistIds.has(productId)) {
                await axios.delete(`/api/wishlist/${productId}`, config);
                setWishlistIds(prev => { const next = new Set(prev); next.delete(productId); return next; });
            } else {
                await axios.post('/api/wishlist', { productId }, config);
                setWishlistIds(prev => { const next = new Set(prev); next.add(productId); return next; });
            }
        } catch (error) {}
    };

    const [sortOrder, setSortOrder] = useState('latest');

    // Filter and Sort logic
    let displayProducts = products.filter(product => {
        const matchesPrice = Number(product.price || 0) <= Number(priceRange);
        
        const matchesCategory = selectedFilters.length === 0 || selectedFilters.some(
            cat => product.category && product.category.toLowerCase() === cat.toLowerCase()
        );
        
        const matchesRating = Number(product.rating || 0) >= Number(selectedRating);
        
        const searchLower = searchTerm ? searchTerm.toLowerCase() : '';
        const matchesSearch = !searchTerm || (
            (product.name && product.name.toLowerCase().includes(searchLower)) ||
            (product.category && product.category.toLowerCase().includes(searchLower)) ||
            (product.description && product.description.toLowerCase().includes(searchLower)) ||
            (product.keywords && Array.isArray(product.keywords) && product.keywords.some(k => k.toLowerCase().includes(searchLower)))
        );

        return matchesPrice && matchesCategory && matchesRating && matchesSearch;
    });

    // Apply Sorting
    displayProducts.sort((a, b) => {
        if (sortOrder === 'price_asc') return Number(a.price) - Number(b.price);
        if (sortOrder === 'price_desc') return Number(b.price) - Number(a.price);
        if (sortOrder === 'rating_desc') return Number(b.rating || 0) - Number(a.rating || 0);
        // default 'latest': keep array as is, assuming backend sends newest first, or fallback to random
        return 0; 
    });

    // Skeletons for Loading State
    const renderSkeletons = () => {
        return Array(8).fill(0).map((_, i) => (
            <div key={i} className="product-card skeleton-card glass">
                <div className="skeleton-img"></div>
                <div className="skeleton-text title"></div>
                <div className="skeleton-text subtitle"></div>
                <div className="skeleton-text price"></div>
            </div>
        ));
    };

    return (
        <section className="product-listing">
            <div className="container">
                <div className="grid-header-main" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                            {searchTerm ? `Results for "${searchTerm}"` : (selectedFilters.length === 1 ? selectedFilters[0] : 'Discover Collection')}
                        </h2>
                        <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
                            {loading ? 'Finding the best deals...' : `Showing ${displayProducts.length} premium products`}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <select 
                            className="premium-select" 
                            value={sortOrder} 
                            onChange={(e) => setSortOrder(e.target.value)}
                            style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--surface)', color: 'var(--text-main)', outline: 'none' }}
                        >
                            <option value="latest">Sort By: Latest</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="rating_desc">Top Rated</option>
                        </select>
                        <button className="mobile-filter-btn" onClick={() => setIsMobileFilterOpen(true)}>
                            <FiFilter /> Filters
                        </button>
                    </div>
                </div>

                <div className="pl-layout">
                    {/* Advanced Filter Panel */}
                    <aside className={`filters-sidebar glass ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
                        <div className="filter-header">
                            <h3><FiFilter className="filter-icon" /> Filters</h3>
                            <button className="close-filter-btn" onClick={() => setIsMobileFilterOpen(false)}>
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="filter-group">
                            <h4>Max Price: <span className="text-accent">₹{priceRange}</span></h4>
                            <input
                                type="range" min="0" max="150000" step="500"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="premium-range"
                            />
                            <div className="range-labels">
                                <span>₹0</span>
                                <span>₹1.5L+</span>
                            </div>
                        </div>

                        <div className="filter-group">
                            <h4>Categories</h4>
                            {['Trendy Outfits', 'Essentials', 'Electronics', 'Mobile Subscriptions'].map(cat => (
                                <label key={cat} className="premium-checkbox">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedFilters.includes(cat)} 
                                        onChange={() => handleFilterChange(cat)} 
                                    />
                                    <span className="checkmark-box"></span>
                                    {cat}
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h4>Rating</h4>
                            {[4, 3, 2].map(rating => (
                                <label key={rating} className="premium-radio">
                                    <input
                                        type="radio" name="rating"
                                        checked={selectedRating === rating}
                                        onChange={() => {}}
                                        onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                                    />
                                    <span className="radio-circle"></span>
                                    {rating}+ Stars <FiStar className="star-inline" />
                                </label>
                            ))}
                        </div>

                        <button 
                            className="btn-clear-filters"
                            onClick={() => { 
                                setPriceRange(150000); 
                                setSelectedFilters([]); 
                                setSelectedRating(0); 
                                if (onClearSearch) onClearSearch();
                                setIsMobileFilterOpen(false); 
                            }}
                        >
                            Clear All Filters
                        </button>
                    </aside>

                    {isMobileFilterOpen && <div className="filter-overlay" onClick={() => setIsMobileFilterOpen(false)}></div>}

                    {/* Responsive Product Grid */}
                    <main className="product-grid-container">
                        <motion.div layout className="product-grid">
                            {loading ? renderSkeletons() : (
                                <>
                                    {displayProducts.length === 0 && (
                                        <div className="no-products-found" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>No products found matching your filters</h3>
                                            <p>Try adjusting your search or categories to find what you're looking for.</p>
                                        </div>
                                    )}

                                    {displayProducts.map(product => (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                            key={product.id || product._id} className="product-card glass"
                                        >
                                            <div className="product-image-container">
                                                <span className="badge-category">{product.category}</span>
                                                {product.discount && <span className="badge-discount">{product.discount}</span>}
                                                <button 
                                                    className={`wishlist-btn ${wishlistIds.has(product.id || product._id) ? 'active' : ''}`}
                                                    onClick={(e) => { e.stopPropagation(); handleToggleWishlist(product); }}
                                                >
                                                    <FiHeart fill={wishlistIds.has(product.id || product._id) ? '#ef4444' : 'none'} color={wishlistIds.has(product.id || product._id) ? '#ef4444' : '#fff'} size={22} />
                                                </button>
                                                <img 
                                                    src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} 
                                                    alt={product.name}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&fit=crop";
                                                    }}
                                                />
                                            </div>
                                            <div className="product-details">
                                                <h3 className="product-name">{product.name}</h3>
                                                <div className="product-rating">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FiStar key={i} fill={i < Math.floor(product.rating) ? "var(--warning)" : "none"} color="var(--warning)" />
                                                    ))}
                                                    <span className="rating-text">({product.rating})</span>
                                                </div>
                                                <div className="product-pricing">
                                                    <span className="price-current">₹{product.price.toLocaleString()}</span>
                                                    {product.originalPrice && <span className="price-old">₹{product.originalPrice.toLocaleString()}</span>}
                                                </div>
                                                <div className="product-actions">
                                                    <button className="btn-add-cart" onClick={() => onAddToCart && onAddToCart(product)}>
                                                        <FiShoppingCart /> Add
                                                    </button>
                                                    <button className="btn-buy-now" onClick={() => onAddToCart && onAddToCart(product, true)}>
                                                        Buy Now
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </>
                            )}
                        </motion.div>
                    </main>
                </div>
                
                {/* AI-Style Recommendations Component */}
                <Recommendations currentCart={cartItems} onAddToCart={onAddToCart} />

            </div>
        </section>
    );
};

export default ProductListing;
