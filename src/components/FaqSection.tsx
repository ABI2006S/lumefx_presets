"use client";

import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const faqData = [
    {
        id: "q1",
        q: "Is Lumefx beginner friendly?",
        a: "Yes, our presets and LUTs are designed to drop directly onto your footage. Perfect for creators of all skill levels."
    },
    {
        id: "q2",
        q: "Which editing software is supported?",
        a: "Lumefx bundles work natively with Premiere Pro, After Effects, DaVinci Resolve, Final Cut Pro, CapCut, and any software supporting .cube and standard preset files."
    },
    {
        id: "q3",
        q: "How do I download the bundle?",
        a: "After checkout, you'll immediately receive a secure download link via email for instant access to the entire 64GB library."
    },
    {
        id: "q4",
        q: "Will I receive updates?",
        a: "Yes! As a bundle owner, you get lifetime free updates whenever we add new tools, assets, or presets to the Lumefx library."
    }
];

export default function FaqSection() {
    useScrollReveal();
    const [openId, setOpenId] = useState<string | null>("q1");

    const toggleFaq = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="faq-section">
            <div className="container">
                <div className="section-header text-center reveal">
                    <h2 className="section-title">Got Questions? We&apos;ve Got Answers</h2>
                    <p className="section-subtitle">Everything you need to know about the Lumefx editing bundle.</p>
                </div>

                <div className="faq-list">
                    {faqData.map((faq, idx) => (
                        <div key={faq.id} className={`faq-item reveal reveal-delay-${(idx % 5) * 100 + 100}`}>
                            <button
                                className={`faq-question ${openId === faq.id ? 'active' : ''}`}
                                onClick={() => toggleFaq(faq.id)}
                            >
                                {faq.q}
                                <span className="faq-icon">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                                        {openId === faq.id ? <path d="M5 12h14" /> : <path d="M12 5v14M5 12h14" />}
                                    </svg>
                                </span>
                            </button>
                            <div className={`faq-answer ${openId === faq.id ? 'open' : ''}`}>
                                <div className="faq-answer-content">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
