import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';
import AdminEditableAsset from '@/components/AdminEditableAsset';

export default function Hero() {
    useScrollReveal();

    return (
        <section className="hero-section">
            <div className="hero-background-glow"></div>
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title reveal reveal-delay-100">
                        Turn Ordinary Footage Into Cinematic Edits in Seconds
                    </h1>
                    <p className="hero-subtitle reveal reveal-delay-200">
                        The ultimate creator toolkit including 200+ presets, 150+ LUTs, premium fonts, overlays, sound effects, and creator AI tools designed for modern video creators.
                    </p>
                    <div className="hero-cta-wrapper reveal reveal-delay-300">
                        <button className="btn-primary btn-hero-cta" onClick={() => document.getElementById('pricing')?.scrollIntoView()}>
                            Get Lumefx Creator Bundle
                        </button>
                        <span className="hero-guarantee mt-2 block text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                            Instant Download • Lifetime Access • 64GB Creator Bundle
                        </span>

                        <div className="hero-trust mt-6 flex flex-col items-center gap-2">
                            <div className="stars flex gap-1">
                                {'★★★★★'.split('').map((star, i) => <span key={i} className="star-icon text-yellow-500 text-lg">{star}</span>)}
                            </div>
                            <span className="hero-trust-text font-semibold text-sm" style={{ color: "var(--foreground)" }}>4.8/5 Creator Rating</span>
                            <span className="hero-trust-text font-medium text-sm" style={{ color: "var(--muted-foreground)" }}>10,000+ Downloads</span>
                            <span className="hero-trust-text font-medium text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Works with Premiere Pro, After Effects, CapCut</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual reveal reveal-delay-400">
                    <div className="hero-video-placeholder">
                        <AdminEditableAsset exactPath="/images/hero/preview.jpg">
                            <Image
                                src="/images/hero/preview.jpg"
                                alt="Cinematic Transformation Reel"
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </AdminEditableAsset>
                        <div className="play-button-overlay z-10">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                        <span className="video-placeholder-text z-10 relative">Cinematic Transformation Reel</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
