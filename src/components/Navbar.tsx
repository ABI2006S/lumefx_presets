import React from 'react';

export default function Navbar() {
    return (
        <nav className="navbar-wrapper animate-fade-in">
            <div className="container navbar-pill-container">
                <div className="navbar-floating-pill">
                    <div className="navbar-logo">
                        <span className="logo-text">Lume<span className="logo-highlight">fx</span></span>
                    </div>
                    <div className="navbar-links">
                        <a href="#">Home</a>
                        <a href="#bundle">What&apos;s Inside</a>
                        <a href="#preview">Samples</a>
                        <a href="#reviews">Reviews</a>
                        <a href="#pricing">Pricing</a>
                    </div>
                    <div className="navbar-cta">
                        <button className="btn-primary btn-nav" onClick={() => document.getElementById('pricing')?.scrollIntoView()}>
                            Get Bundle
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
