import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function UrgencyCTA() {
    useScrollReveal();

    return (
        <section className="urgency-section">
            <div className="container">
                <div className="urgency-banner text-center reveal">
                    <h2 className="urgency-title">Limited Launch Offer</h2>
                    <p className="urgency-desc">
                        Thousands of creators are already upgrading their editing workflow using Lumefx.<br />
                        Get the bundle today before the price increases.
                    </p>
                    <button className="btn-primary btn-urgency" onClick={() => document.getElementById('pricing')?.scrollIntoView()}>
                        Download Now
                    </button>
                </div>
            </div>
        </section>
    );
}
