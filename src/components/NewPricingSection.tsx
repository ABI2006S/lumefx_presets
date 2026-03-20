"use client";

import React from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function NewPricingSection({ onCheckout }: { onCheckout?: () => void }) {
  useScrollReveal();

  const [timeLeft, setTimeLeft] = React.useState(24 * 60 * 60 - 60); // Starts near 23h 59m
  const [showBreakdown, setShowBreakdown] = React.useState(false);

  React.useEffect(() => {
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
    <>
      <style>{`
        .nps-section {
          padding: 5rem 0;
          position: relative;
          z-index: 10;
        }

        .nps-outer {
          background: rgba(14, 14, 14, 0.55);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          padding: 3.5rem 3rem;
          box-shadow: 0 0 60px rgba(255, 26, 26, 0.06), 0 20px 60px rgba(0, 0, 0, 0.6);
          overflow: hidden;
          position: relative;
        }
        .nps-outer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 26, 26, 0.5), transparent);
        }

        /* Section header — centered above everything */
        .nps-top-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .nps-badge {
          display: inline-block;
          padding: 0.35rem 1.1rem;
          border-radius: 100px;
          background: var(--accent);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          box-shadow: 0 0 18px rgba(255, 26, 26, 0.35);
        }
        .nps-main-title {
          font-family: var(--font-orbitron);
          font-size: clamp(1.6rem, 3.5vw, 2.6rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--foreground);
          line-height: 1.1;
        }

        /* Two-column body */
        .nps-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }

        /* LEFT — pricing card */
        .nps-card {
          background: rgba(20, 20, 20, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 18px;
          padding: 2rem 2rem 1.75rem;
          position: relative;
          overflow: hidden;
        }
        .nps-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 26, 26, 0.4), transparent);
        }

        /* Value rows */
        .nps-value-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 1.5rem;
        }
        .nps-value-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 0.9rem;
        }
        .nps-value-row:last-child {
          border-bottom: none;
          padding-top: 0.85rem;
        }
        .nps-row-label {
          color: var(--muted-foreground);
        }
        .nps-row-val {
          font-weight: 600;
          color: #fff;
        }
        .nps-row-total-label {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
        }
        .nps-row-total-val {
          font-size: 1rem;
          font-weight: 800;
          color: var(--accent);
          text-decoration: line-through;
        }

        /* Price highlight box */
        .nps-price-box {
          background: rgba(10, 10, 10, 0.7);
          border: 1px solid rgba(255, 26, 26, 0.18);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          text-align: center;
          margin-bottom: 1.25rem;
          position: relative;
          overflow: hidden;
        }
        .nps-price-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
        }
        .nps-price-today-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted-foreground);
          margin-bottom: 0.5rem;
        }
        .nps-price-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 0.4rem;
        }
        .nps-old-price {
          font-size: 1.4rem;
          font-weight: 500;
          color: var(--muted-foreground);
          text-decoration: line-through;
          text-decoration-color: var(--accent);
        }
        .nps-new-price {
          font-family: var(--font-orbitron);
          font-size: 3rem;
          font-weight: 900;
          color: #fff;
          line-height: 1;
        }
        .nps-savings {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 0.6rem;
        }
        .nps-timer-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.9rem;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .nps-timer-accent {
          color: var(--accent);
          font-weight: 800;
        }
        .nps-price-note {
          font-size: 0.72rem;
          color: var(--muted-foreground);
        }

        .mobile-toggle-btn {
          display: none;
          width: 100%;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px dashed rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          color: var(--foreground);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        /* CTA */
        .nps-cta-area {
          text-align: center;
          margin-bottom: 1.25rem;
        }
        .nps-rating {
          font-size: 0.8rem;
          font-weight: 600;
          color: #facc15;
          margin-bottom: 0.75rem;
        }
        .nps-cta-btn {
          display: block;
          width: 100%;
          padding: 1rem 2rem;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
          color: #fff;
          font-family: var(--font-orbitron);
          font-size: 0.82rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 28px rgba(255, 26, 26, 0.4), 0 6px 20px rgba(0, 0, 0, 0.4);
          transition: transform 0.18s, box-shadow 0.18s;
          margin-bottom: 0.65rem;
        }
        .nps-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 55%);
          pointer-events: none;
        }
        .nps-cta-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 40px rgba(255, 26, 26, 0.6), 0 10px 28px rgba(0, 0, 0, 0.5);
        }
        .nps-cta-btn:active {
          transform: scale(0.97);
        }
        .nps-secure {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--muted-foreground);
        }

        /* Trust icons */
        .nps-trust-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.55rem 1.25rem;
        }
        .nps-trust-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          color: var(--muted-foreground);
        }
        .nps-trust-icon {
          color: var(--accent);
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        /* RIGHT — image panel */
        .nps-image-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .nps-image-frame {
          width: 100%;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 26, 26, 0.15);
          box-shadow: 0 0 40px rgba(255, 26, 26, 0.08), 0 12px 40px rgba(0, 0, 0, 0.6);
          aspect-ratio: 1 / 1;
          background: #080808;
        }
        .nps-image-caption {
          text-align: center;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        .nps-image-caption strong {
          color: var(--accent);
        }

        /* Responsive */
        @media (max-width: 860px) {
          .nps-body {
            grid-template-columns: 1fr;
          }
          .nps-image-panel {
            order: -1;
          }
          .nps-image-frame {
            aspect-ratio: 16 / 9;
          }
          .nps-outer {
            padding: 2rem 1.25rem;
          }
          .mobile-toggle-btn {
            display: flex;
          }
          .nps-value-list.mobile-collapsed {
            display: none;
          }
        }
      `}</style>

      <section className="nps-section" id="pricing">
        <div className="container">
          <div className="nps-outer reveal">

            {/* Centered top header */}
            <div className="nps-top-header">
              <div className="nps-badge">Limited Creator Offer</div>
              <h2 className="nps-main-title">Complete Creator Toolkit</h2>
            </div>

            {/* Two-column body */}
            <div className="nps-body">

              {/* LEFT — pricing card */}
              <div className="nps-card reveal reveal-delay-100">

                {/* Value breakdown */}
                <button 
                  className="mobile-toggle-btn"
                  onClick={() => setShowBreakdown(!showBreakdown)}
                >
                  {showBreakdown ? 'Hide Value Breakdown' : 'Show Value Breakdown (₹3750+ value)'}
                  <svg 
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                    style={{ transform: showBreakdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div className={`nps-value-list ${!showBreakdown ? 'mobile-collapsed' : ''}`}>
                  {[
                    ['Lumex Presets Value', '₹800'],
                    ['Lumex LUTs Value', '₹700'],
                    ['Lumex Overlays Value', '₹600'],
                    ['Lumex Fonts Value', '₹750'],
                    ['Sound Effects Library', '₹900'],
                  ].map(([label, val]) => (
                    <div key={label} className="nps-value-row">
                      <span className="nps-row-label">{label}</span>
                      <span className="nps-row-val">{val}</span>
                    </div>
                  ))}
                  <div className="nps-value-row">
                    <span className="nps-row-total-label">Total Value:</span>
                    <span className="nps-row-total-val">₹3750+</span>
                  </div>
                </div>

                {/* Price highlight */}
                <div className="nps-price-box">
                  <p className="nps-price-today-label">Launching Offer</p>
                  <div className="nps-price-row">
                    <span className="nps-old-price">₹3750</span>
                    <span className="nps-new-price">₹199</span>
                  </div>
                  <p className="nps-savings">You Save ₹3,551</p>
                  <div className="nps-timer-chip">
                    Offer Ends In:&nbsp;<span className="nps-timer-accent">{formatTime(timeLeft)}</span>
                  </div>
                  <p className="nps-price-note">Price increases to ₹4,999 tonight</p>
                </div>

                {/* CTA */}
                <div className="nps-cta-area">
                  <p className="nps-rating">⭐ Rated 4.8/5 by 10,000+ creators</p>
                  <button onClick={onCheckout} className="nps-cta-btn">
                    Get Lumefx Toolkit Now
                  </button>
                  <p className="nps-secure">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Secure payment via Razorpay
                  </p>
                </div>

                {/* Trust icons */}
                <div className="nps-trust-grid">
                  {[
                    'Instant Download',
                    'Lifetime Access',
                    '64GB Toolkit',
                    'Free Updates',
                  ].map(item => (
                    <div key={item} className="nps-trust-item">
                      <span className="nps-trust-icon">✔</span>
                      {item}
                    </div>
                  ))}
                </div>

              </div>

              {/* RIGHT — image panel */}
              <div className="nps-image-panel reveal reveal-delay-200">
                <div className="nps-image-frame">
                  <Image
                    src="/toolkit/1.png"
                    alt="Complete Creator Toolkit Preview"
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 860px) 100vw, 50vw"
                    priority
                  />
                </div>
                <p className="nps-image-caption">

                  <strong>64 GB</strong> &nbsp;·&nbsp; Complete Creator Toolkit
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
