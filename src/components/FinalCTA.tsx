import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FinalCTA() {
    useScrollReveal();

    return (
        <section className="final-cta-section">
            <div className="container">
                <div className="cta-card text-center reveal">
                    <h2 className="cta-title reveal reveal-delay-100">Start Creating Cinematic Videos Today</h2>
                    <p className="cta-subtitle reveal reveal-delay-200">Upgrade your editing workflow with Lumefx Creator Bundle.</p>
                    <button className="btn-primary btn-large reveal reveal-delay-300" onClick={() => document.getElementById('pricing')?.scrollIntoView()}>
                        Get Lumefx Creator Bundle
                    </button>
                    <p className="cta-trust-text mt-4 text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                        Instant Download • Lifetime Access
                    </p>
                </div>
            </div>
        </section>
    );
}
