"use client";

import React, { useState, useEffect } from 'react';

export default function MobileStickyCTA({ onOpenCheckout }: { onOpenCheckout: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (~800px)
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="mobile-sticky-cta-wrapper reveal-fade-in">
      <style>{`
        .mobile-sticky-cta-wrapper {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: 90%;
          max-width: 400px;
          display: none; /* Hidden by default, shown via media query */
        }

        .sticky-cta-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
          color: #fff;
          font-family: var(--font-orbitron);
          font-weight: 900;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(255, 26, 26, 0.4), 0 4px 10px rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 768px) {
          .mobile-sticky-cta-wrapper {
            display: block;
          }
        }

        .reveal-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <button onClick={onOpenCheckout} className="sticky-cta-btn">
        <span>Get Toolkit Now</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
