import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';
import AdminEditableAsset from '@/components/AdminEditableAsset';

const testimonials = [
    {
        id: 1,
        text: '"Lumefx instantly upgraded my editing workflow."',
        author: 'Rahul K.',
        role: 'Commercial Filmmaker'
    },
    {
        id: 2,
        text: '"My reels finally look cinematic."',
        author: 'Aisha M.',
        role: 'Social Media Creator'
    },
    {
        id: 3,
        text: '"The presets alone are worth the price."',
        author: 'Daniel R.',
        role: 'Tech YouTuber'
    }
];

export default function TestimonialSection() {
    useScrollReveal();

    return (
        <section id="reviews" className="testimonial-section">
            <div className="container">
                <div className="section-header text-center reveal">
                    <h2 className="section-title">Trusted by Creators</h2>
                    <div className="testimonial-trust-header">
                        <div className="stars">
                            {'★★★★★'.split('').map((star, i) => <span key={i} className="star-icon">{star}</span>)}
                        </div>
                    </div>
                </div>

                <div className="testimonial-grid">
                    {testimonials.map((item, idx) => (
                        <div key={item.id} className={`testimonial-card reveal reveal-delay-${(idx + 1) * 100}`}>
                            <div className="quote-icon">&quot;</div>
                            <p className="testimonial-text">{item.text}</p>
                            <div className="testimonial-author">
                                <AdminEditableAsset exactPath={`/images/testimonials/user${(item.id % 3) + 1}.jpg`}>
                                    <div className="avatar" style={{ position: 'relative', overflow: 'hidden', height: '100%', width: '100%' }}>
                                        <Image src={`/images/testimonials/user${(item.id % 3) + 1}.jpg`} alt={item.author} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                </AdminEditableAsset>
                                <div>
                                    <h4 className="author-name">{item.author}</h4>
                                    <p className="author-role">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
