"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';

const lutPacks = [
    {
        id: "pack-1",
        title: "Raw Clip → Cinematic Color Grade",
        beforeImg: "/images/before-after/before1.jpg",
        afterImg: "/images/before-after/after1.jpg"
    },
    {
        id: "pack-2",
        title: "Basic Edit → Viral Creator Style",
        beforeImg: "/images/before-after/before2.jpg",
        afterImg: "/images/before-after/after2.jpg"
    },
    {
        id: "pack-3",
        title: "Flat Footage → Film Look",
        beforeImg: "/images/before-after/before3.jpg",
        afterImg: "/images/before-after/after3.jpg"
    }
];

export default function LutShowcase() {
    useScrollReveal();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentPack = lutPacks[currentIndex];

    // Drag handling
    const startDrag = () => setIsDragging(true);
    const stopDrag = () => setIsDragging(false);

    const onDrag = useCallback((clientX: number) => {
        if (!isDragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPos(percent);
    }, [isDragging]);

    useEffect(() => {
        const handleMouseMove = (e: globalThis.MouseEvent) => onDrag(e.clientX);
        const handleTouchMove = (e: globalThis.TouchEvent) => onDrag(e.touches[0].clientX);

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('mouseup', stopDrag);
            window.addEventListener('touchend', stopDrag);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseup', stopDrag);
            window.removeEventListener('touchend', stopDrag);
        };
    }, [isDragging, onDrag]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? lutPacks.length - 1 : prev - 1));
        setSliderPos(50); // reset slider
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === lutPacks.length - 1 ? 0 : prev + 1));
        setSliderPos(50); // reset slider
    };

    return (
        <section id="preview" className="lut-showcase-section">
            <div className="container">
                <div className="lut-showcase-wrapper reveal">
                    <div className="section-header text-center reveal">
                        <h2 className="section-title">See the Transformation</h2>
                        <p className="section-subtitle">Swipe the slider to see how Lumefx transforms ordinary footage instantly.</p>
                    </div>

                    <h3 className="lut-title reveal-delay-200">{currentPack.title}</h3>

                    <div
                        className="lut-slider-container reveal-delay-300"
                        ref={containerRef}
                        onMouseDown={startDrag}
                        onTouchStart={startDrag}
                    >
                        {/* AFTER LAYER (Base) */}
                        <div className="lut-layer base-layer" style={{ position: 'relative' }}>
                            <Image src={currentPack.afterImg} alt="After" fill style={{ objectFit: 'cover' }} />
                            <span className="lut-label after-label" style={{ position: 'relative', zIndex: 10 }}>After</span>
                        </div>

                        {/* BEFORE LAYER (Clipped Overlay) */}
                        <div
                            className="lut-layer overlay-layer"
                            style={{
                                position: 'relative',
                                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                            }}
                        >
                            <Image src={currentPack.beforeImg} alt="Before" fill style={{ objectFit: 'cover' }} />
                            <span className="lut-label before-label" style={{ position: 'relative', zIndex: 10 }}>Before</span>
                        </div>

                        {/* SLIDER HANDLE */}
                        <div className="lut-slider-handle" style={{ left: `${sliderPos}%` }}>
                            <div className="lut-handle-button">
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M15 18l-6-6 6-6" /></svg>
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M9 18l6-6-6-6" /></svg>
                            </div>
                            <div className="lut-slider-line"></div>
                        </div>
                    </div>

                    <div className="lut-pagination reveal-delay-400">
                        <button className="pag-btn" onClick={handlePrev}>
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                        <span className="pag-text">{currentIndex + 1} / {lutPacks.length}</span>
                        <button className="pag-btn" onClick={handleNext}>
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
