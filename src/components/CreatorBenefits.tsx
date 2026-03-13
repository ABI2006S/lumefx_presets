import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const benefits = [
    {
        id: "b1",
        title: "Save Hours of Editing",
        desc: "Apply professional cinematic looks instantly without tweaking settings forever.",
        icon: "⏱️"
    },
    {
        id: "b2",
        title: "Professional Quality",
        desc: "Perfect color grading, text styling, and transitions for Reels and YouTube.",
        icon: "🎥"
    },
    {
        id: "b3",
        title: "All-In-One Toolkit",
        desc: "Everything you need to elevate your videos included in one massive 64GB bundle.",
        icon: "🧰"
    }
];

export default function CreatorBenefits() {
    useScrollReveal();

    return (
        <section className="benefits-section">
            <div className="container">
                <div className="section-header text-center reveal">
                    <h2 className="section-title">Why Creators Choose Lumefx</h2>
                </div>

                <div className="benefits-grid">
                    {benefits.map((b, idx) => (
                        <div key={b.id} className={`benefit-card reveal reveal-delay-${(idx % 3) * 100 + 100}`}>
                            <div className="benefit-icon">{b.icon}</div>
                            <h3 className="benefit-title">{b.title}</h3>
                            <p className="benefit-desc">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
