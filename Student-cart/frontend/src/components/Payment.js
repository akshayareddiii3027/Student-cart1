import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FiX, FiCreditCard, FiSmartphone, FiDollarSign, FiTruck } from 'react-icons/fi';
import { SiGooglepay, SiPaypal } from 'react-icons/si';
import './Payment.css';

const Payment = ({ onClose, totalAmount, itemCount, items, onClearCart }) => {
    const { user } = useAuth();
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
    const [upiId, setUpiId] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [placedOrder, setPlacedOrder] = useState(null);

    const paymentMethods = [
        {
            id: 'card',
            name: 'Credit/Debit Card',
            icon: <FiCreditCard size={28} />,
            description: 'Visa, Mastercard, Amex'
        },
        {
            id: 'upi',
            name: 'UPI',
            icon: <FiSmartphone size={28} />,
            description: 'Google Pay, PhonePe, Paytm'
        },
        {
            id: 'netbanking',
            name: 'Net Banking',
            icon: <FiDollarSign size={28} />,
            description: 'All major banks'
        },
        {
            id: 'googlepay',
            name: 'Google Pay',
            icon: <SiGooglepay size={28} />,
            description: 'Fast & secure'
        },
        {
            id: 'paypal',
            name: 'PayPal',
            icon: <SiPaypal size={28} />,
            description: 'International payments'
        },
        {
            id: 'cod',
            name: 'Cash on Delivery',
            icon: <FiTruck size={28} />,
            description: 'Pay when you receive'
        }
    ];

    const handlePlaceOrder = async () => {
        setErrorMsg('');

        if (!user) {
            setErrorMsg('Please log in to place an order.');
            return;
        }

        if (!selectedPayment) {
            setErrorMsg('Please select a payment method');
            return;
        }

        if (selectedPayment === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
            setErrorMsg('Please enter card details');
            return;
        }

        if (selectedPayment === 'upi' && !upiId) {
            setErrorMsg('Please enter UPI ID');
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const orderData = {
                items: items.map(item => ({
                    productId: item.id || item._id,
                    name: item.name,
                    quantity: item.quantity || 1,
                    price: item.price,
                    image: item.image
                })),
                paymentMethod: paymentMethods.find(m => m.id === selectedPayment)?.name,
                shippingAddress: {
                    address: "123 Campus Road",
                    city: "College City",
                    postalCode: "123456",
                    country: "India"
                },
                totalAmount
            };

            const { data } = await axios.post('/api/orders', orderData, config);
            
            if (data.success) {
                setPlacedOrder(data.data);
                setOrderPlaced(true);
                if (onClearCart) onClearCart();
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Error placing order');
        }
    };

    if (orderPlaced && placedOrder) {
        return (
            <div className="payment-overlay" onClick={onClose}>
                <div className="payment-container" onClick={(e) => e.stopPropagation()}>
                    <button className="close-btn" onClick={onClose}>
                        <FiX size={24} />
                    </button>
                    
                    <div className="order-success">
                        <div className="success-icon">✓</div>
                        <h2>Order Placed Successfully!</h2>
                        <p>Thank you for your purchase</p>
                        
                        <div className="order-details">
                            <div className="detail-row">
                                <span>Order ID:</span>
                                <span className="detail-value">#{placedOrder._id}</span>
                            </div>
                            <div className="detail-row">
                                <span>Total Amount:</span>
                                <span className="detail-value">₹{totalAmount}</span>
                            </div>
                            <div className="detail-row">
                                <span>Items:</span>
                                <span className="detail-value">{itemCount}</span>
                            </div>
                            <div className="detail-row">
                                <span>Payment Method:</span>
                                <span className="detail-value">{placedOrder.paymentMethod}</span>
                            </div>
                            <div className="detail-row">
                                <span>Estimated Delivery:</span>
                                <span className="detail-value">{placedOrder.deliveryDays} Business Days</span>
                            </div>
                        </div>

                        <button className="continue-btn" onClick={onClose}>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-overlay" onClick={onClose}>
            <div className="payment-container" onClick={(e) => e.stopPropagation()}>
                <div className="payment-header">
                    <h2>Choose Payment Method</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FiX size={24} />
                    </button>
                </div>

                {errorMsg && <p style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</p>}

                <div className="payment-summary">
                    <div className="summary-item">
                        <span>Items:</span>
                        <span>{itemCount}</span>
                    </div>
                    <div className="summary-item">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-item total-amount">
                        <span>Total:</span>
                        <span>₹{totalAmount}</span>
                    </div>
                </div>

                <div className="payment-methods">
                    {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className={`payment-method ${selectedPayment === method.id ? 'selected' : ''}`}
                            onClick={() => setSelectedPayment(method.id)}
                        >
                            <div className="method-icon">{method.icon}</div>
                            <div className="method-info">
                                <h4>{method.name}</h4>
                                <p>{method.description}</p>
                            </div>
                            <div className={`radio ${selectedPayment === method.id ? 'checked' : ''}`}></div>
                        </div>
                    ))}
                </div>

                {/* Card Details Form */}
                {selectedPayment === 'card' && (
                    <div className="payment-form">
                        <h4>Card Details</h4>
                        <input
                            type="text"
                            placeholder="Card Number (16 digits)"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            maxLength="16"
                        />
                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                maxLength="5"
                            />
                            <input
                                type="text"
                                placeholder="CVV"
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                maxLength="3"
                            />
                        </div>
                    </div>
                )}

                {/* UPI Form */}
                {selectedPayment === 'upi' && (
                    <div className="payment-form">
                        <h4>Enter UPI ID</h4>
                        <input
                            type="text"
                            placeholder="example@bank"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                        <p className="form-hint">You will be redirected to your UPI app to complete the payment</p>
                    </div>
                )}

                <button className="place-order-btn" onClick={handlePlaceOrder}>
                    Place Order - ₹{totalAmount}
                </button>
            </div>
        </div>
    );
};

export default Payment;
