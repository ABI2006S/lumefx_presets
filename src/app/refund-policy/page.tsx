import React from 'react';
import Link from 'next/link';
import './refund.css';

export default function RefundPolicy() {
  return (
    <main className="refund-container">
      <div className="refund-card animate-fade-in">
        <header className="refund-header">
          <h1 className="refund-title">Refund Policy</h1>
          <p className="reveal-delay-100">Last Updated: 16/03/2026</p>
        </header>

        <section className="refund-content">
          <p>
            Since this is a digital product with instant delivery, <strong>all sales are final and non-refundable</strong>.
          </p>
          <p>
            Refunds will only be considered in cases of <strong>duplicate payment</strong> or <strong>failed download link</strong> (which will be reissued if reported within 1 day).
          </p>
          <p>
            Thank you for purchasing from <strong>Lumefx Presets</strong>.
          </p>
        </section>

        <footer className="refund-footer">
          <Link href="/" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </Link>
        </footer>
      </div>
    </main>
  );
}
