import React, { useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';

export default function Hero() {
    useScrollReveal();
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleTogglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-background-glow"></div>
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title reveal reveal-delay-100">
                        Turn Ordinary <br className="hidden md:block" />
                        Footage Into <br className="hidden md:block" />
                        Cinematic Edits In <br className="hidden md:block" />
                        Seconds
                    </h1>
                    <p className="hero-subtitle reveal reveal-delay-200">
                        The ultimate creator toolkit including 200+ presets, 150+ LUTs, premium fonts, overlays, sound effects, and creator AI tools designed for modern video creators.
                    </p>
                    <div className="hero-cta-wrapper reveal reveal-delay-300">
                        <button className="btn-primary btn-hero-cta" onClick={() => document.getElementById('pricing')?.scrollIntoView()}>
                            Get Lumefx Creator Toolkit
                        </button>
                        <span className="hero-guarantee mt-4 block text-sm font-medium tracking-widest uppercase opacity-80" style={{ color: "var(--muted-foreground)" }}>
                            Instant Download • Lifetime Access • 64GB Creator Toolkit
                        </span>

                        <div className="hero-trust reveal reveal-delay-400">
                            <div className="stars">
                                {'★★★★★'.split('').map((star, i) => <span key={i} className="star-icon">{star}</span>)}
                            </div>
                            <span className="hero-rating-text">4.8/5 Creator Rating</span>
                            <span className="hero-download-text">10,000+ Downloads</span>
                            <span className="hero-software-badge">
                                Works with Premiere Pro, After Effects, CapCut
                            </span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual reveal reveal-delay-400">
                    <div className="hero-video-placeholder" onClick={handleTogglePlay}>
                        <video
                            ref={videoRef}
                            src="/videos/cinematic.mp4"
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                            style={{ position: 'absolute', top: 0, left: 0 }}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />
                        {!isPlaying && (
                            <div className="hero-video-overlay-items">
                                <div className="play-button-overlay">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                                <span className="video-placeholder-text">Click to Play Preview</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
