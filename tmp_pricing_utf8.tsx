import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface PricingSectionProps {
    onCheckout: () => void;
}

export default function PricingSection({ onCheckout }: PricingSectionProps) {
    useScrollReveal();

    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60 - 60); // Starts near 23h 59m

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m`;
    };

    return (
        <section id="pricing" className="pricing-section">
            <div className="container">
                <div className="pricing-card text-center reveal">
                    <div className="pricing-header reveal reveal-delay-100">
                        <span className="launch-badge">LIMITED CREATOR OFFER</span>
                        <h2 className="pricing-title">Complete Creator Bundle</h2>
                    </div>

                    <div className="pricing-value-breakdown reveal reveal-delay-200">
                        <div className="value-row">
                            <span>Presets Pack Value</span>
                            <span>Γé╣1500</span>
                        </div>
                        <div className="value-row">
                            <span>LUT Pack Value</span>
                            <span>Γé╣1200</span>
                        </div>
                        <div className="value-row">
                            <span>Overlays Pack Value</span>
                            <span>Γé╣900</span>
                        </div>
                        <div className="value-row">
                            <span>Fonts Pack Value</span>
                            <span>Γé╣600</span>
                        </div>
                        <div className="value-row">
                            <span>Sound Effects Library</span>
                            <span>Γé╣800</span>
                        </div>
                        <div className="value-row">
                            <span>Creator AI Tools</span>
                            <span>Γé╣1000</span>
                        </div>
                        <div className="value-row value-total mt-4 border-t pt-4">
                            <span>Total Value:</span>
                            <span className="strikethrough-red">Γé╣6000+</span>
                        </div>
                    </div>

                    <div className="pricing-offer-box reveal reveal-delay-300">
                        <span className="offer-label">TODAY ONLY</span>
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <span className="original-price" style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '1.5rem', fontWeight: 600 }}>Γé╣4999</span>
                            <span className="current-price" style={{ margin: 0 }}>Γé╣489</span>
                        </div>
                        <span className="offer-save">You Save Γé╣4,510</span>
                    </div>

                    <div className="pricing-urgency reveal reveal-delay-400">
                        <div className="countdown-timer">
                            <span className="timer-text">Offer Ends In: {formatTime(timeLeft)}</span>
                        </div>
                        <span className="amount-urgency">Price increases to Γé╣4,999 tonight</span>
                    </div>

                    <div className="pricing-social-proof reveal reveal-delay-400">
                        Rated 4.8/5 by 10,000+ creators
                    </div>

                    <div className="pricing-cta reveal reveal-delay-500">
                        <button className="btn-primary btn-checkout" onClick={onCheckout}>
                            Get Lumefx Bundle Now
                        </button>

                        <div className="trust-elements">
                            <div className="trust-item secure-payment"><svg className="inline-block mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Secure payment via Razorpay</div>
                            <div className="trust-features">
                                <span className="trust-check">Γ£ö Instant Download</span>
                                <span className="trust-check">Γ£ö Lifetime Access</span>
                                <span className="trust-check">Γ£ö 64GB Bundle</span>
                                <span className="trust-check">Γ£ö Free Updates</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
