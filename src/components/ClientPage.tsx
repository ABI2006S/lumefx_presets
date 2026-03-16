"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Above-the-fold: load eagerly
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LandingAudio from '@/components/LandingAudio';

// Below-the-fold: lazy-loaded with next/dynamic
const CreatorProblem = dynamic(() => import('@/components/CreatorProblem'), { ssr: false });
const PresetsShowcase = dynamic(() => import('@/components/PresetsShowcase'), { ssr: false });
const LutsShowcase = dynamic(() => import('@/components/LutsShowcase'), { ssr: false });
const SfxShowcase = dynamic(() => import('@/components/SfxShowcase'), { ssr: false });
const FontsShowcase = dynamic(() => import('@/components/FontsShowcase'), { ssr: false });
const UltimateBundleSection = dynamic(() => import('@/components/UltimateBundleSection'), { ssr: false });
const CreatorBenefits = dynamic(() => import('@/components/CreatorBenefits'), { ssr: false });
const TestimonialSection = dynamic(() => import('@/components/TestimonialSection'), { ssr: false });
const NewPricingSection = dynamic(() => import('@/components/NewPricingSection'), { ssr: false });
const FaqSection = dynamic(() => import('@/components/FaqSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const CheckoutModal = dynamic(() => import('@/components/CheckoutModal'), { ssr: false });

export default function ClientPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [belowFoldVisible, setBelowFoldVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Trigger loading of below-fold content on scroll / viewport enter
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBelowFoldVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' } // start loading 400px before the sentinel enters viewport
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  const handleOpenCheckout = () => {
    setIsModalOpen(true);
    // Track InitiateCheckout event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
  };

  const handleCloseCheckout = () => setIsModalOpen(false);

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleContinueCheckout = async (formData: {
    name: string;
    email: string;
    dream: string;
    state: string;
  }) => {
    handleCloseCheckout();
    const res = await loadRazorpay();
    if (!res) {
      alert('Razorpay load failed. Are you online?');
      return;
    }

    try {
      // 1. Create order in Next.js API
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          product_id: '5ba7f5f0-b8b0-48eb-876d-8d6ee0aadc99' // Complete Creator Bundle
        }),
      });
      const orderData = await orderRes.json();

      if (!orderData.order_id) {
        alert(orderData.error || 'Server error. Please try again.');
        return;
      }

      // 2. Handle Free Product Bypass
      if (orderData.is_free) {
        // Track Purchase event for free products
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Purchase', {
            value: 0,
            currency: 'INR',
            content_name: 'Lumefx Creator Bundle'
          });
        }
        window.location.href = '/success';
        return;
      }

      // 3. Handle Paid Product via Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Lumefx',
        description: 'Lumefx Creator Bundle',
        order_id: orderData.order_id,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            // Track Purchase event for successful payments
            if (typeof window !== 'undefined' && (window as any).fbq) {
              (window as any).fbq('track', 'Purchase', {
                value: orderData.amount / 100, // Razorpay amount is in paise
                currency: orderData.currency,
                content_name: 'Lumefx Creator Bundle'
              });
            }
            window.location.href = '/success';
          } else {
            alert(verifyData.error || 'Payment verification failed.');
          }
        },
        prefill: { name: formData.name, email: formData.email },
        theme: { color: '#000000' },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
  };

  return (
    <main>
      <LandingAudio />
      <Navbar />
      <Hero />

      {/* Sentinel triggers loading of everything below the fold */}
      <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />

      {belowFoldVisible && (
        <>
          <CreatorProblem />
          <PresetsShowcase />
          <LutsShowcase />
          <SfxShowcase />
          <FontsShowcase />
          <UltimateBundleSection />
          <CreatorBenefits />
          <TestimonialSection />
          <NewPricingSection onCheckout={handleOpenCheckout} />
          <FaqSection />
          <div style={{
            padding: '5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <h2
              style={{
                fontFamily: 'var(--font-orbitron)',
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#fff',
                marginBottom: '1.25rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Start Creating Cinematic Videos Today
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--muted-foreground)',
              marginBottom: '2rem',
              maxWidth: '520px',
              lineHeight: 1.6,
            }}>
              Upgrade your editing workflow with Lumefx Creator Bundle.
            </p>
            <button
              onClick={handleOpenCheckout}
              className="btn-primary"
              style={{ padding: '1rem 3rem', fontSize: '1.05rem' }}
            >
              Get Lumefx Creator Bundle
            </button>
            <p style={{
              color: 'var(--muted-foreground)',
              marginTop: '1rem',
              fontSize: '0.9rem',
            }}>
              Instant Download • Lifetime Access
            </p>
          </div>
          <Footer />
          <CheckoutModal
            isOpen={isModalOpen}
            onClose={handleCloseCheckout}
            onContinue={handleContinueCheckout}
          />
        </>
      )}
    </main>
  );
}
