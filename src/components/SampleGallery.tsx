import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';
import AdminEditableAsset from '@/components/AdminEditableAsset';

const samples = [
    { id: "s1", label: "Preset Example", image: "/assets/previews/presets/preset-preview.jpg" },
    { id: "s2", label: "LUT Example", image: "/assets/previews/luts/lut-preview.jpg" },
    { id: "s3", label: "Overlay Example", image: "/assets/previews/overlays/overlay-preview.jpg" },
    { id: "s4", label: "Font Example", image: "/assets/previews/fonts/font-preview.jpg" },
    { id: "s5", label: "Sound Effects Preview", image: "/assets/previews/sound-effects/sound-preview.jpg" }
];

export default function SampleGallery() {
    useScrollReveal();

    return (
        <section id="reviews" className="gallery-section">
            <div className="container">
                <div className="section-header text-center reveal">
                    <h2 className="section-title">Preview the Bundle</h2>
                </div>

                <div className="gallery-scroll-container reveal reveal-delay-200">
                    <div className="gallery-track">
                        {samples.map((sample) => (
                            <div key={sample.id} className="gallery-item">
                                <Image
                                    src={sample.image}
                                    alt={sample.label}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="gallery-image"
                                />
                                <div className="gallery-overlay">
                                    <span className="gallery-label">{sample.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12 reveal reveal-delay-300">
                    <button className="btn-secondary" onClick={() => document.getElementById('pricing')?.scrollIntoView()}>
                        View More Samples
                    </button>
                </div>
            </div>
        </section>
    );
}
