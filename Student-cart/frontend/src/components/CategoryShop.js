import React from 'react';
import './CategoryShop.css';

const categories = [
    { id: 1, name: 'Trendy Outfits', icon: '👕', link: '#' },
    { id: 2, name: 'Essentials', icon: '📚', link: '#' },
    { id: 3, name: 'Electronics', icon: '💻', link: '#' },
    { id: 4, name: 'Mobile Subscriptions', icon: '📱', link: '#' },
    { id: 5, name: 'Combo Packs', icon: '🎁', link: '#' },
];

const CategoryShop = ({ onSelectCategory }) => {
    return (
        <section className="category-shop section-padding">
            <div className="container">
                <h2 className="section-title">Shop by Category</h2>
                <p className="section-subtitle">Find everything you need for college life</p>

                <div className="category-grid">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="category-card"
                            onClick={(e) => {
                                e.preventDefault();
                                if (onSelectCategory) {
                                    onSelectCategory(cat.name);
                                }
                            }}
                        >
                            <div className="category-icon">{cat.icon}</div>
                            <h3 className="category-name">{cat.name}</h3>
                            <a href={cat.link} className="category-link" onClick={(e) => e.preventDefault()}>Explore →</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShop;
