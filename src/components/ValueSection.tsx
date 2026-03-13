import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const valueProps = [
    {
        id: 1,
        title: 'Faster Editing Workflow',
        desc: 'Finish client projects and YouTube videos in half the time.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
    },
    {
        id: 2,
        title: 'Professional Color Grading',
        desc: 'Instantly apply cinematic looks used by top colorists and filmmakers.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 22 22 22"></polygon></svg>
    },
    {
        id: 3,
        title: 'Social Media Ready Looks',
        desc: 'Optimized for massive engagement on Instagram Reels and TikTok.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>
    },
    {
        id: 4,
        title: 'Works With Major Software',
        desc: 'Compatible with Premiere Pro, Resolve, Final Cut Pro, and CapCut.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
    }
];

export default function ValueSection() {
    useScrollReveal();

    return (
        <section id="features" className="value-section">
            <div className="container">
                <div className="section-header text-center reveal">
                    <h2 className="section-title">Why Creators Choose Lumefx</h2>
                    <p className="section-subtitle">Powerful editing assets designed to save time and elevate your content.</p>
                </div>

                <div className="value-grid">
                    {valueProps.map((item, idx) => (
                        <div key={item.id} className={`value-card-wrapper reveal reveal-delay-${(idx + 1) * 100}`}>
                            <div className="value-card-glow"></div>
                            <div className="value-card">
                                <div className="value-icon">{item.icon}</div>
                                <h3 className="value-title">{item.title}</h3>
                                <p className="value-desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
