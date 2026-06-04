import React from 'react';
import { FiSmartphone } from 'react-icons/fi';
import './MobilePlans.css';

const MobilePlans = () => {
    return (
        <section className="mobile-plans section-padding">
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <div className="badge-light-blue-darktext">
                        <FiSmartphone /> Student Special Plans
                    </div>
                </div>
                <h2 className="section-title">Mobile Subscriptions & Recharge Plans</h2>
                <p className="section-subtitle">Affordable mobile plans and OTT bundles designed for students</p>

                <div className="tabs">
                    <button className="tab active">Recharge Plans</button>
                    <button className="tab">OTT Bundles</button>
                </div>

                <div className="plans-grid">
                    {/* Plan 1 */}
                    <div className="plan-card">
                        <div className="plan-header">
                            <h3>Student Starter</h3>
                            <div className="plan-price">
                                <span className="currency">₹</span>
                                <span className="amount">199</span>
                                <span className="duration">/28 Days</span>
                            </div>
                        </div>
                        <div className="plan-features">
                            <div className="feature">
                                <span className="feature-label">Data</span>
                                <span className="feature-value">1.5 GB/Day</span>
                            </div>
                            <div className="feature">
                                <span className="feature-label">Validity</span>
                                <span className="feature-value">28 Days</span>
                            </div>
                            <div className="feature">
                                <span className="feature-label">Calls</span>
                                <span className="feature-value">Unlimited</span>
                            </div>
                        </div>
                        <button className="btn-plan">Select Plan</button>
                    </div>

                    {/* Plan 2 */}
                    <div className="plan-card popular">
                        <div className="popular-badge">Most Popular</div>
                        <div className="plan-header">
                            <h3>Student Plus</h3>
                            <div className="plan-price">
                                <span className="currency">₹</span>
                                <span className="amount">299</span>
                                <span className="duration">/56 Days</span>
                            </div>
                        </div>
                        <div className="plan-features">
                            <div className="feature">
                                <span className="feature-label">Data</span>
                                <span className="feature-value">2 GB/Day</span>
                            </div>
                            <div className="feature">
                                <span className="feature-label">Validity</span>
                                <span className="feature-value">56 Days</span>
                            </div>
                            <div className="feature">
                                <span className="feature-label">Calls</span>
                                <span className="feature-value">Unlimited</span>
                            </div>
                        </div>
                        <button className="btn-plan active-btn">Select Plan</button>
                    </div>

                    {/* Plan 3 */}
                    <div className="plan-card">
                        <div className="plan-header">
                            <h3>Student Premium</h3>
                            <div className="plan-price">
                                <span className="currency">₹</span>
                                <span className="amount">499</span>
                                <span className="duration">/84 Days</span>
                            </div>
                        </div>
                        <div className="plan-features">
                            <div className="feature">
                                <span className="feature-label">Data</span>
                                <span className="feature-value">3 GB/Day</span>
                            </div>
                            <div className="feature">
                                <span className="feature-label">Validity</span>
                                <span className="feature-value">84 Days</span>
                            </div>
                            <div className="feature">
                                <span className="feature-label">Calls</span>
                                <span className="feature-value">Unlimited</span>
                            </div>
                        </div>
                        <button className="btn-plan">Select Plan</button>
                    </div>

                    {/* Plan 4 */}
                    <div className="plan-card">
                        <div className="plan-header">
                            <h3>Annual Campus Pack</h3>
                            <div className="plan-price">
                                <span className="currency">₹</span>
                                <span className="amount">1999</span>
                                <span className="duration">/365 Days</span>
                            </div>
                        </div>
                        <div className="plan-features">
                            <div className="feature">
                                <span className="feature-label">Data</span>
                                <span className="feature-value">2.5 GB/Day</span>
                            </div>
                            <div className="feature">
                                <span className="feature-label">Validity</span>
                                <span className="feature-value">365 Days</span>
                            </div>
                            <div className="feature">
                                <span className="feature-label">Calls</span>
                                <span className="feature-value">Unlimited</span>
                            </div>
                        </div>
                        <button className="btn-plan">Select Plan</button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MobilePlans;
