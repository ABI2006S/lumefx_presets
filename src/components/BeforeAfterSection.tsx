import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function BeforeAfterSection() {
    useScrollReveal();

    return (
        <section id="before-after" className="before-after-section">
            <div className="container">
                <div className="section-header text-center reveal">
                    <h2 className="section-title">Turn Ordinary Clips into <span className="text-accent">Cinematic Edits</span> Instantly.</h2>
                    <p className="section-subtitle">See the dramatic difference Lumefx presets and LUTs make.</p>
                </div>

                <div className="before-after-grid reveal reveal-delay-200">
                    <div className="media-card">
                        <div className="media-header">
                            <span className="media-badge">Original</span>
                        </div>
                        <div className="media-placeholder original-media">
                            <span className="media-text">Original Footage (Flat & Dull)</span>
                        </div>
                    </div>

                    <div className="media-divider">
                        <div className="arrow-icon">➔</div>
                    </div>

                    <div className="media-card">
                        <div className="media-header">
                            <span className="media-badge accent">Lumefx Edited</span>
                        </div>
                        <div className="media-placeholder edited-media">
                            <span className="media-text">Cinematic Color & Effects</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
