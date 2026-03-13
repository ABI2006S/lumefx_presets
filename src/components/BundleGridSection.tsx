import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const bundleItems = [
    { id: 1, title: '150+ Cinematic LUTs', desc: 'Industry-standard color profiles (.cube)', icon: '🎞️' },
    { id: 2, title: '200 Editing Presets', desc: 'Drag & drop Premiere & After Effects styling', icon: '⚡' },
    { id: 3, title: 'Premium Fonts', desc: 'High-converting typography for thumbnails', icon: 'Aa' },
    { id: 4, title: 'Shapes & Overlays', desc: 'Vector graphics and motion film grain', icon: '📐' },
    { id: 5, title: 'Sound Effects', desc: 'Whooshes, risers, and cinematic hits', icon: '🎵' },
    { id: 6, title: 'Creator AI Tools', desc: '10x your workflow with our curated AI list', icon: '🤖' },
];

export default function BundleGridSection() {
    useScrollReveal();

    return (
        <section id="what-you-get" className="bundle-grid-section">
            <div className="container">
                <div className="section-header text-center reveal">
                    <h2 className="section-title">What&apos;s Inside the Bundle</h2>
                    <p className="section-subtitle">Everything you need to create viral, engaging content today.</p>
                </div>

                <div className="bundle-visual-grid">
                    {bundleItems.map((item, idx) => (
                        <div key={item.id} className={`bundle-grid-card reveal reveal-delay-${(idx + 1) * 100}`}>
                            <div className="bundle-card-icon">{item.icon}</div>
                            <h3 className="bundle-card-title">{item.title}</h3>
                            <p className="bundle-card-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bundle-total-size reveal reveal-delay-800">
                    <div className="glow-orb"></div>
                    <span className="size-label">Total Bundle Size:</span>
                    <span className="size-value">64GB+</span>
                </div>
            </div>
        </section>
    );
}
