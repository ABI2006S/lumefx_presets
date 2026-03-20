"use client";
import React, { useEffect, useState } from 'react';

export default function MobileStickyCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className={`mobile-sticky-wrapper ${isVisible ? 'visible' : ''}`}>
            <button className="btn-primary" onClick={() => document.getElementById('pricing')?.scrollIntoView()}>
                Get Lumefx Toolkit
            </button>
        </div>
    );
}
