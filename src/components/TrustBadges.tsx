import React from 'react';

export default function TrustBadges() {
    return (
        <section className="trust-section">
            <div className="container">
                <p className="trust-title text-center">Trusted by creators and editors worldwide.</p>
                <div className="trust-grid">
                    <div className="trust-badge">
                        <span className="trust-icon">⚡</span>
                        <span>Instant download</span>
                    </div>
                    <div className="trust-badge">
                        <span className="trust-icon">📦</span>
                        <span>64GB bundle</span>
                    </div>
                    <div className="trust-badge">
                        <span className="trust-icon">♾️</span>
                        <span>Lifetime access</span>
                    </div>
                    <div className="trust-badge">
                        <span className="trust-icon">🎨</span>
                        <span>Creator toolkit</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
