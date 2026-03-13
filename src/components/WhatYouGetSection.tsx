import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const journeyItems = [
    {
        id: 1,
        title: 'Background Pack',
        desc: 'High-quality animated and static backgrounds for edits and thumbnails.',
        align: 'left'
    },
    {
        id: 2,
        title: 'Cinematic LUTs',
        desc: 'Professional cinematic color grading presets used by top colorists.',
        align: 'right'
    },
    {
        id: 3,
        title: 'Editing Presets',
        desc: 'One-click drag and drop presets for quick editing workflows.',
        align: 'left'
    },
    {
        id: 4,
        title: 'Creator Fonts',
        desc: 'Modern typography pack used for viral reels and bold thumbnails.',
        align: 'right'
    },
    {
        id: 5,
        title: 'Shapes and Overlays',
        desc: 'Modern vector shapes and graphic overlays for motion design.',
        align: 'left'
    },
    {
        id: 6,
        title: 'Sound Effects',
        desc: 'Professional sound effects including whooshes, risers, and cinematic hits.',
        align: 'right'
    },
    {
        id: 7,
        title: 'AI Creator Tools',
        desc: 'Curated list of artificial intelligence tools to 10x your editing speed.',
        align: 'left'
    }
];

export default function WhatYouGetSection() {
    useScrollReveal();

    return (
        <section id="what-you-get" className="journey-section">
            <div className="container">
                <div className="section-header text-center reveal">
                    <h2 className="section-title">What You Get Inside <span className="text-accent">Lumefx</span></h2>
                    <p className="section-subtitle">Follow the journey of everything included in the ultimate creator bundle.</p>
                </div>

                <div className="journey-timeline">
                    {/* The center vertical line */}
                    <div className="timeline-line hidden-mobile"></div>

                    {journeyItems.map((item) => (
                        <div key={item.id} className={`journey-row ${item.align}`}>
                            {/* Empty spacer for the opposite side on desktop */}
                            <div className="journey-spacer hidden-mobile"></div>

                            {/* The dot on the timeline */}
                            <div className={`timeline-dot hidden-mobile reveal reveal-delay-200`}></div>

                            {/* The actual Card */}
                            <div className={`journey-card reveal slide-in-${item.align}`}>
                                <div className="journey-card-content">
                                    <h3 className="journey-title">{item.title}</h3>
                                    <p className="journey-desc">{item.desc}</p>
                                    <div className="journey-preview-placeholder">
                                        <span>Preview Media</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
