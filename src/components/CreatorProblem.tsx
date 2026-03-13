import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';



export default function CreatorProblem() {
    useScrollReveal();

    return (
        <section className="problem-section">
            <div className="container">
                <div className="problem-header text-center reveal">
                    <h2 className="section-title">Editing Shouldn&apos;t Take Hours</h2>
                    <p className="section-subtitle">
                        Most creators spend hours trying to achieve cinematic video quality.<br />
                        Lumefx simplifies the process by giving creators professional editing tools that work instantly.
                    </p>
                </div>

                <div className="problem-grid">
                    <div className="problem-card reveal reveal-delay-100">
                        <div className="card-icon">✨</div>
                        <div className="card-flow">
                            <p className="flow-problem">Unpolished</p>
                            <div className="flow-arrow">↓</div>
                            <p className="flow-solution">Cinematic &amp; Pro</p>
                        </div>
                    </div>

                    <div className="problem-card reveal reveal-delay-200">
                        <div className="card-icon">⏳</div>
                        <div className="card-flow">
                            <p className="flow-problem">Hours of Editing</p>
                            <div className="flow-arrow">↓</div>
                            <p className="flow-solution">Done in Seconds</p>
                        </div>
                    </div>

                    <div className="problem-card reveal reveal-delay-300">
                        <div className="card-icon">📉</div>
                        <div className="card-flow">
                            <p className="flow-problem">Low Engagement</p>
                            <div className="flow-arrow">↓</div>
                            <p className="flow-solution">Viral Retention</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
