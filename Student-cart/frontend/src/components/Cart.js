import React, { useState } from 'react';
import { FiX, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import Payment from './Payment';
import './Cart.css';

const Cart = ({ items, onClose, onUpdateQuantity, onRemoveItem, onClearCart }) => {
    const [showPayment, setShowPayment] = useState(false);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

    if (showPayment) {
        return (
            <>
                <Payment
                    onClose={() => {
                        setShowPayment(false);
                        onClose();
                    }}
                    totalAmount={totalPrice}
                    itemCount={totalItems}
                    items={items}
                    onClearCart={onClearCart}
                />
            </>
        );
    }

    return (
        <div className="cart-overlay" onClick={onClose}>
            <div className="cart-container" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FiX size={24} />
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty</p>
                        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Add items to get started!</p>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {items.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p className="item-category">{item.category}</p>
                                        <p className="item-price">₹{item.price}</p>
                                    </div>
                                    <div className="item-quantity">
                                        <button onClick={() => onUpdateQuantity(index, (item.quantity || 1) - 1)}>
                                            <FiMinus />
                                        </button>
                                        <span>{item.quantity || 1}</span>
                                        <button onClick={() => onUpdateQuantity(index, (item.quantity || 1) + 1)}>
                                            <FiPlus />
                                        </button>
                                    </div>
                                    <div className="item-subtotal">
                                        ₹{item.price * (item.quantity || 1)}
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => onRemoveItem(index)}
                                        title="Remove item"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <div className="summary-row">
                                <span>Subtotal ({totalItems} items)</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <button className="checkout-btn" onClick={() => setShowPayment(true)}>Proceed to Checkout</button>
                            <button className="continue-shopping-btn" onClick={onClose}>
                                Continue Shopping
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
