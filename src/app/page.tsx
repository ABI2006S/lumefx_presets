"use client";

import React, { useState } from 'react';


import './navbar.css';
import './hero.css';
import './creator-problem.css';
import './creator-benefits.css';
import './bundle.css';
import './lut-showcase.css';
import './sample-gallery.css';
import './testimonial.css';
import './pricing.css';
import './urgency.css';
import './faq.css';
import './final-cta.css';
import './footer.css';
import './modal.css';
import './mobile-sticky-cta.css';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CreatorProblem from '@/components/CreatorProblem';
import LutShowcase from '@/components/LutShowcase';
import BundleSection from '@/components/BundleSection';
import CreatorBenefits from '@/components/CreatorBenefits';
import SampleGallery from '@/components/SampleGallery';
import TestimonialSection from '@/components/TestimonialSection';
import PricingSection from '@/components/PricingSection';
import UrgencyCTA from '@/components/UrgencyCTA';
import FaqSection from '@/components/FaqSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CheckoutModal from '@/components/CheckoutModal';
import MobileStickyCTA from '@/components/MobileStickyCTA';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCheckout = () => {
    setIsModalOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsModalOpen(false);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleContinueCheckout = async (formData: { name: string; email: string; dream: string; state: string; }) => {
    handleCloseCheckout();
    const res = await loadRazorpay();
    if (!res) {
      alert('Razorpay load failed. Are you online?');
      return;
    }

    try {
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 489 })
      });
      const orderData = await orderRes.json();

      if (!orderData.id) {
        alert('Server error. Please try again.');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '', // Environment variable
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Lumefx',
        description: 'Lumefx Creator Bundle',
        order_id: orderData.id,
        handler: async function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string; }) {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              customerInfo: formData
            })
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            window.location.href = '/success';
          } else {
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: '#000000'
        }
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
      <Navbar />
      <Hero />
      <CreatorProblem />
      <LutShowcase />
      <BundleSection />
      <CreatorBenefits />
      <SampleGallery />
      <TestimonialSection />
      <PricingSection onCheckout={handleOpenCheckout} />
      <UrgencyCTA />
      <FaqSection />
      <FinalCTA />
      <Footer />
      <MobileStickyCTA />
      <CheckoutModal isOpen={isModalOpen} onClose={handleCloseCheckout} onContinue={handleContinueCheckout} />
    </main>
  );
}
