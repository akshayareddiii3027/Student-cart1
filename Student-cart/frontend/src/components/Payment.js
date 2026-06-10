import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FiX, FiCreditCard, FiSmartphone, FiDollarSign, FiTruck, FiMapPin, FiLoader } from 'react-icons/fi';
import { SiGooglepay, SiPaypal } from 'react-icons/si';
import './Payment.css';

const Payment = ({ onClose, totalAmount, itemCount, items, onClearCart }) => {
    const { user } = useAuth();
    
    // Step management: 'shipping', 'payment', 'processing', 'success'
    const [step, setStep] = useState('shipping');
    
    // Shipping Details State
    const [shippingDetails, setShippingDetails] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phone: ''
    });

    // Payment Details State
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
    const [upiId, setUpiId] = useState('');
    
    // Global Status
    const [errorMsg, setErrorMsg] = useState('');
    const [placedOrder, setPlacedOrder] = useState(null);

    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card', icon: <FiCreditCard size={28} />, description: 'Visa, Mastercard, Amex' },
        { id: 'upi', name: 'UPI', icon: <FiSmartphone size={28} />, description: 'Google Pay, PhonePe, Paytm' },
        { id: 'netbanking', name: 'Net Banking', icon: <FiDollarSign size={28} />, description: 'All major banks' },
        { id: 'googlepay', name: 'Google Pay', icon: <SiGooglepay size={28} />, description: 'Fast & secure' },
        { id: 'paypal', name: 'PayPal', icon: <SiPaypal size={28} />, description: 'International payments' },
        { id: 'cod', name: 'Cash on Delivery', icon: <FiTruck size={28} />, description: 'Pay when you receive' }
    ];

    const validateShipping = () => {
        if (!shippingDetails.fullName || !shippingDetails.address || !shippingDetails.city || !shippingDetails.postalCode || !shippingDetails.country || !shippingDetails.phone) {
            setErrorMsg('Please fill in all shipping fields');
            return false;
        }
        setErrorMsg('');
        return true;
    };

    const handleNextToPayment = () => {
        if (validateShipping()) {
            setStep('payment');
        }
    };

    const handlePlaceOrder = () => {
        setErrorMsg('');

        if (!user) {
            setErrorMsg('Please log in to place an order.');
            return;
        }

        if (!selectedPayment) {
            setErrorMsg('Please select a payment method');
            return;
        }

        if (selectedPayment === 'card') {
            if (cardDetails.number.length < 16) {
                setErrorMsg('Please enter a valid 16-digit card number');
                return;
            }
            if (!cardDetails.expiry || !cardDetails.cvv) {
                setErrorMsg('Please enter complete card details');
                return;
            }
        }

        if (selectedPayment === 'upi' && !upiId) {
            setErrorMsg('Please enter a valid UPI ID');
            return;
        }

        // Proceed to processing phase
        setStep('processing');
        processPayment();
    };

    // Dynamically load razorpay script
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const processPayment = async () => {
        if (selectedPayment === 'cod') {
            // Cash on delivery bypasses Razorpay
            await finalizeOrder('Cash on Delivery', 'cod_pending');
            return;
        }

        const res = await loadRazorpay();
        if (!res) {
            setErrorMsg('Razorpay SDK failed to load. Are you online?');
            setStep('payment');
            return;
        }

        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            // 1. Create order on backend
            const { data } = await axios.post('/api/payment/create-order', { amount: totalAmount }, config);
            
            if (!data.success) {
                setErrorMsg('Failed to initialize payment.');
                setStep('payment');
                return;
            }

            // 2. Open Razorpay Checkout
            const options = {
                key: data.key,
                amount: data.data.amount,
                currency: data.data.currency,
                name: "StudentCart",
                description: "Purchase Premium Student Essentials",
                image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=200", // Logo
                order_id: data.data.id,
                handler: async function (response) {
                    try {
                        // 3. Verify Payment
                        const verifyRes = await axios.post('/api/payment/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        }, config);

                        if (verifyRes.data.success) {
                            await finalizeOrder('Razorpay', response.razorpay_payment_id);
                        } else {
                            setErrorMsg('Payment verification failed.');
                            setStep('payment');
                        }
                    } catch (err) {
                        setErrorMsg('Payment verification error.');
                        setStep('payment');
                    }
                },
                prefill: {
                    name: shippingDetails.fullName,
                    email: user.email,
                    contact: shippingDetails.phone
                },
                theme: {
                    color: "#06b6d4" // Primary color var(--primary)
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response) {
                setErrorMsg(response.error.description);
                setStep('payment');
            });
            paymentObject.open();

        } catch (error) {
            setErrorMsg('Payment initialization error. Please try again.');
            setStep('payment');
        }
    };

    const finalizeOrder = async (methodName, paymentId) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const orderData = {
                userId: user.id || user._id,
                customerName: shippingDetails.fullName,
                phoneNumber: shippingDetails.phone,
                shippingAddress: {
                    address: shippingDetails.address,
                    city: shippingDetails.city,
                    postalCode: shippingDetails.postalCode,
                    country: shippingDetails.country
                },
                orderedItems: items.map(item => ({
                    productId: item.id || item._id,
                    productName: item.name,
                    quantity: item.quantity || 1,
                    price: item.price,
                    image: item.image
                })),
                totalAmount: totalAmount,
                paymentMethod: methodName,
                orderStatus: 'Order Placed',
                orderDate: new Date(),
                razorpayPaymentId: paymentId
            };

            const { data } = await axios.post('/api/orders/create', orderData, config);
            
            if (data.success) {
                setPlacedOrder(data.data);
                setStep('success');
                if (onClearCart) onClearCart();
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Error saving order. Please contact support.');
            setStep('payment');
        }
    };

    // ------------- RENDERERS -------------

    const renderShippingStep = () => (
        <div className="checkout-step animate-fade-in">
            <h3 className="step-title"><FiMapPin /> Shipping Details</h3>
            <div className="shipping-form">
                <input 
                    type="text" placeholder="Full Name" 
                    value={shippingDetails.fullName} 
                    onChange={e => setShippingDetails({...shippingDetails, fullName: e.target.value})} 
                />
                <input 
                    type="text" placeholder="Phone Number" 
                    value={shippingDetails.phone} 
                    onChange={e => setShippingDetails({...shippingDetails, phone: e.target.value})} 
                />
                <textarea 
                    placeholder="Street Address" 
                    value={shippingDetails.address} 
                    onChange={e => setShippingDetails({...shippingDetails, address: e.target.value})} 
                    rows="3"
                ></textarea>
                <div className="form-row">
                    <input 
                        type="text" placeholder="City" 
                        value={shippingDetails.city} 
                        onChange={e => setShippingDetails({...shippingDetails, city: e.target.value})} 
                    />
                    <input 
                        type="text" placeholder="Postal Code" 
                        value={shippingDetails.postalCode} 
                        onChange={e => setShippingDetails({...shippingDetails, postalCode: e.target.value})} 
                    />
                </div>
                <input 
                    type="text" placeholder="Country" 
                    value={shippingDetails.country} 
                    onChange={e => setShippingDetails({...shippingDetails, country: e.target.value})} 
                />
            </div>
            <button className="primary-btn mt-4" onClick={handleNextToPayment}>Continue to Payment</button>
        </div>
    );

    const renderPaymentStep = () => (
        <div className="checkout-step animate-fade-in">
            <div className="flex-between mb-3">
                <h3 className="step-title m-0">Select Payment</h3>
                <button className="back-link" onClick={() => setStep('shipping')}>Edit Shipping</button>
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

            {selectedPayment === 'card' && (
                <div className="payment-form mt-3 animate-fade-in">
                    <h4>Card Details</h4>
                    <input
                        type="text" placeholder="Card Number (16 digits)"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value.replace(/\D/g,'') })}
                        maxLength="16"
                    />
                    <div className="form-row">
                        <input
                            type="text" placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            maxLength="5"
                        />
                        <input
                            type="password" placeholder="CVV"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g,'') })}
                            maxLength="3"
                        />
                    </div>
                </div>
            )}

            {selectedPayment === 'upi' && (
                <div className="payment-form mt-3 animate-fade-in">
                    <h4>Enter UPI ID</h4>
                    <input
                        type="text" placeholder="example@bank"
                        value={upiId} onChange={(e) => setUpiId(e.target.value)}
                    />
                    <p className="form-hint">You will receive a payment request on your UPI app</p>
                </div>
            )}

            <button className="primary-btn mt-4 pulse-btn" onClick={handlePlaceOrder}>
                Pay ₹{totalAmount} & Place Order
            </button>
        </div>
    );

    const renderProcessingStep = () => (
        <div className="processing-container animate-fade-in">
            <FiLoader size={48} className="spinner-icon text-primary" />
            <h2 className="mt-3">Processing Payment...</h2>
            <p className="text-muted">Please do not close this window or hit back.</p>
            <div className="secure-badge">
                <FiDollarSign /> Secure 256-bit Encryption
            </div>
        </div>
    );

    const renderSuccessStep = () => (
        <div className="success-container animate-fade-in">
            <div className="success-icon-large" style={{ color: '#10b981', fontSize: '4rem', textAlign: 'center' }}>✓</div>
            <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>Order Placed Successfully!</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Thank you for your purchase. Your order has been confirmed.</p>
            
            <div className="order-details-card mt-4" style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Order Details</h4>
                <div className="detail-row">
                    <span>Order ID:</span>
                    <span className="detail-value" style={{ fontFamily: 'monospace' }}>#{placedOrder._id}</span>
                </div>
                <div className="detail-row">
                    <span>Payment Method:</span>
                    <span className="detail-value">{placedOrder.paymentMethod}</span>
                </div>
                <div className="detail-row">
                    <span>Shipping To:</span>
                    <span className="detail-value truncate" title={shippingDetails.address}>
                        {shippingDetails.city}, {shippingDetails.postalCode}
                    </span>
                </div>
                <div className="detail-row">
                    <span>Estimated Delivery:</span>
                    <span className="detail-value text-success" style={{ color: '#10b981' }}>{placedOrder.deliveryDays} Business Days</span>
                </div>

                <div className="ordered-items-list mt-3" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                    <h5 style={{ marginBottom: '0.8rem' }}>Items</h5>
                    <div style={{ maxHeight: '150px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                        {placedOrder.orderedItems && placedOrder.orderedItems.map((item, idx) => (
                            <div key={idx} className="flex-between mb-2" style={{ alignItems: 'center', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
                                        <img src={item.image && item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} alt={item.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800"; }} />
                                    </div>
                                    <div style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <span>{item.productName}</span>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                                    </div>
                                </div>
                                <span style={{ fontWeight: '500' }}>₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="detail-row mt-3" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', fontSize: '1.1rem' }}>
                    <span style={{ fontWeight: 'bold' }}>Total Paid:</span>
                    <span className="detail-value text-primary font-bold">₹{totalAmount}</span>
                </div>
            </div>

            <button className="primary-btn mt-4 pulse-btn" style={{ width: '100%', padding: '0.8rem' }} onClick={onClose}>
                Continue Shopping
            </button>
        </div>
    );

    return (
        <div className="payment-overlay" onClick={step === 'processing' ? null : onClose}>
            <div className="payment-container glass" onClick={(e) => e.stopPropagation()}>
                
                {step !== 'processing' && step !== 'success' && (
                    <div className="payment-header">
                        <h2>Secure Checkout</h2>
                        <button className="close-btn" onClick={onClose}>
                            <FiX size={24} />
                        </button>
                    </div>
                )}

                {step !== 'processing' && step !== 'success' && (
                    <div className="progress-bar-container">
                        <div className={`progress-step ${step === 'shipping' || step === 'payment' ? 'active' : ''}`}>1. Shipping</div>
                        <div className="progress-line"></div>
                        <div className={`progress-step ${step === 'payment' ? 'active' : ''}`}>2. Payment</div>
                    </div>
                )}

                {errorMsg && <div className="error-banner">{errorMsg}</div>}

                {step !== 'processing' && step !== 'success' && (
                    <div className="payment-summary mb-3">
                        <div className="summary-item">
                            <span>Items ({itemCount}):</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <div className="summary-item">
                            <span>Shipping:</span>
                            <span className="text-success font-bold">FREE</span>
                        </div>
                        <div className="summary-item total-amount">
                            <span>Total:</span>
                            <span className="text-primary">₹{totalAmount}</span>
                        </div>
                    </div>
                )}

                <div className="checkout-content">
                    {step === 'shipping' && renderShippingStep()}
                    {step === 'payment' && renderPaymentStep()}
                    {step === 'processing' && renderProcessingStep()}
                    {step === 'success' && renderSuccessStep()}
                </div>
            </div>
        </div>
    );
};

export default Payment;
