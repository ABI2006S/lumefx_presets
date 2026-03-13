"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AudioPlayer from '@/components/AudioPlayer';
import AdminEditableAsset from '@/components/AdminEditableAsset';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const aiToolsDB = [
    { name: 'Runway ML', desc: 'AI video editing and background removal for creators.' },
    { name: 'ElevenLabs', desc: 'Realistic AI voice generation for narration and voiceovers.' },
    { name: 'Midjourney', desc: 'Generate high-quality images and creative assets using AI.' },
    { name: 'Pika Labs', desc: 'Text-to-video AI platform for quick cinematic generation.' },
    { name: 'Leonardo AI', desc: 'Advanced AI image generation tailored for artists.' },
    { name: 'Topaz AI', desc: 'AI-powered video upscaling and frame interpolation.' },
    { name: 'Adobe Firefly', desc: 'Generative AI integrated right into your Adobe workflow.' },
    { name: 'Kaiber AI', desc: 'Audio-reactive video generation for music and creators.' },
    { name: 'Descript', desc: 'Text-based video editing with AI voice cloning.' },
    { name: 'CapCut AI', desc: 'Built-in AI auto-captions and smart background removal.' },
    { name: 'Clipdrop', desc: 'Suite of AI imaging tools for relighting and cleanup.' },
    { name: 'D-ID', desc: 'AI-generated video avatars for digital presenters.' },
    { name: 'HeyGen', desc: 'Create AI spokesperson videos with one click.' },
    { name: 'PlayHT', desc: 'Ultra-realistic text-to-speech with massive voice libraries.' },
    { name: 'Remove.bg', desc: 'Instant AI background removal inside your browser.' },
    { name: 'Magnific AI', desc: 'AI image upscaler and enhancer for ultra-detailing.' },
    { name: 'Opus Clip', desc: 'AI tool turning long podcasts into viral shorts instantly.' },
    { name: 'Synthesia', desc: 'AI video generation platform for corporate and creators.' },
    { name: 'Luma AI', desc: 'Create realistic 3D captures using advanced NeRF AI.' },
    { name: 'Stable Diffusion', desc: 'Open-source image generation running directly on your PC.' }
];

const bundleCategories = [
    {
        id: '01',
        title: 'Backgrounds',
        desc: 'High-quality animated and static backgrounds for edits and thumbnails.',
        type: 'grid',
        items: ['/assets/backgrounds/bg-1.jpg', '/assets/backgrounds/bg-2.jpg', '/assets/backgrounds/bg-3.jpg'],
        countText: '+ 100 included',
    },
    {
        id: '02',
        title: 'Iman Gadzhi Style Fonts',
        desc: 'Modern typography pack used for viral reels, bold thumbnails, and creator branding.',
        type: 'font',
        items: [
            { name: 'Montserrat', desc: 'Clean, bold, and modern font widely used by creators, agencies, and premium websites. Perfect for headlines and viral captions.' },
            { name: 'Inter', desc: 'Highly readable modern UI font used by top SaaS companies and creator brands. Ideal for website body text and subtitles.' },
            { name: 'Bebas Neue', desc: 'Strong uppercase display font used in viral thumbnails, cinematic titles, and high-impact creator content.' }
        ],
        countText: '+ 1000 included',
    },
    {
        id: '03',
        title: 'LUTs',
        desc: 'Professional cinematic color grading presets used by top colorists.',
        type: 'before-after',
        items: [
            { before: '/assets/luts/lut-1-before.jpg', after: '/assets/luts/lut-1-after.jpg' },
            { before: '/assets/luts/lut-2-before.jpg', after: '/assets/luts/lut-2-after.jpg' },
            { before: '/assets/luts/lut-3-before.jpg', after: '/assets/luts/lut-3-after.jpg' }
        ],
        countText: '+ 151 Filtered premium luts',
    },
    {
        id: '04',
        title: 'Premium Presets',
        desc: 'Advanced editing presets for professional transition and effect results.',
        type: 'grid',
        items: ['/assets/premium-presets/premium-1.jpg', '/assets/premium-presets/premium-2.jpg', '/assets/premium-presets/premium-3.jpg'],
        countText: '+ 400 Filtered premium Presets',
    },
    {
        id: '05',
        title: 'Presets',
        desc: 'One-click drag and drop presets for quick editing workflows.',
        type: 'grid',
        items: ['/assets/presets/preset-1.jpg', '/assets/presets/preset-2.jpg', '/assets/presets/preset-3.jpg'],
        countText: '+ 750 Filtered premium Presets',
    },
    {
        id: '06',
        title: 'Shapes',
        desc: 'Modern vector shapes and graphic overlays for motion design.',
        type: 'grid',
        items: ['/assets/shapes/shape-1.jpg', '/assets/shapes/shape-2.jpg', '/assets/shapes/shape-3.jpg'],
        countText: '+ 2500 Filtered Shapes',
    },
    {
        id: '07',
        title: 'Sound Effects',
        desc: 'Professional sound effects including whooshes, risers, and cinematic hits.',
        type: 'audio',
        items: ['Whoosh Transition', 'Cinematic Riser', 'Deep Impact Hit'],
        countText: '+ 200 more included',
    },
    {
        id: '08',
        title: 'Trending AI Tools',
        desc: 'Curated list of artificial intelligence tools to 10× your editing speed.',
        type: 'ai-tools',
        items: [],
        countText: 'Updated with latest creator AI tools',
    },
    {
        id: '09',
        title: 'Ultimate Editing Bundle',
        desc: 'The complete toolkit combining absolutely everything listed above.',
        type: 'showcase',
        items: ['64GB Data'],
        countText: 'Total 64 GB Data',
    },
];

export default function BundleSection() {
    useScrollReveal();
    const [randomAITools, setRandomAITools] = useState<typeof aiToolsDB>([]);

    useEffect(() => {
        const shuffled = [...aiToolsDB].sort(() => 0.5 - Math.random());
        // eslint-disable-next-line
        setRandomAITools(shuffled.slice(0, 3));
    }, []);

    return (
        <section id="bundle" className="bundle-section">
            <div className="container">
                <div className="section-header text-center reveal">
                    <h2 className="section-title">Everything Inside Lumefx</h2>
                </div>

                <div className="bundle-categories-wrap">
                    {bundleCategories.map((cat, blockIdx) => (
                        <div key={cat.id} className={`category-block reveal reveal-delay-${(blockIdx % 3) * 100 + 100}`}>
                            <div className="category-header">
                                <div className="cat-id">{cat.id}</div>
                                <div>
                                    <h3 className="cat-title">{cat.title}</h3>
                                    <p className="cat-desc">{cat.desc}</p>
                                </div>
                            </div>

                            <div className={`preview-grid type-${cat.type}`}>
                                {cat.type === 'font' && (cat.items as { name: string, desc: string }[]).map((i, idx) => (
                                    <div key={idx} className="preview-item font-preview">
                                        <span className="font-sample">Aa</span>
                                        <span className="font-name">{i.name}</span>
                                        <p className="font-desc">{i.desc}</p>
                                    </div>
                                ))}

                                {cat.type === 'before-after' && (cat.items as { before: string, after: string }[]).map((i, idx) => (
                                    <div key={idx} className="preview-item ba-preview" style={{ padding: 0, overflow: 'hidden' }}>
                                        <div className="ba-split" style={{ display: 'flex', width: '100%', height: '100%', minHeight: '140px' }}>
                                            <AdminEditableAsset exactPath={i.before}>
                                                <div className="ba-half before" style={{ position: 'relative', height: '100%', width: '100%' }}>
                                                    <Image src={i.before} alt="Before" fill style={{ objectFit: 'cover' }} />
                                                    <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', zIndex: 2 }}>Before</span>
                                                </div>
                                            </AdminEditableAsset>
                                            <AdminEditableAsset exactPath={i.after}>
                                                <div className="ba-half after" style={{ position: 'relative', height: '100%', width: '100%' }}>
                                                    <Image src={i.after} alt="After" fill style={{ objectFit: 'cover' }} />
                                                    <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', zIndex: 2 }}>After</span>
                                                </div>
                                            </AdminEditableAsset>
                                        </div>
                                    </div>
                                ))}

                                {cat.type === 'audio' && cat.items.map((i, idx) => (
                                    <AudioPlayer key={idx} title={i as string} />
                                ))}

                                {cat.type === 'ai-tools' && randomAITools.map((tool, idx) => (
                                    <div key={idx} className="preview-item ai-tool-preview">
                                        <div className="ai-tool-logo">
                                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                        </div>
                                        <span className="ai-tool-name">{tool.name}</span>
                                        <p className="ai-tool-desc">{tool.desc}</p>
                                    </div>
                                ))}

                                {cat.type === 'grid' && (cat.items as string[]).map((i, idx) => (
                                    <AdminEditableAsset key={idx} exactPath={i}>
                                        <div className="preview-item image-preview" style={{ position: 'relative', height: '100%', minHeight: '120px', width: '100%' }}>
                                            <Image src={i} alt={cat.title} fill style={{ objectFit: 'cover', borderRadius: '8px' }} />
                                        </div>
                                    </AdminEditableAsset>
                                ))}

                                {cat.type === 'showcase' && (
                                    <div className="preview-item showcase-preview">
                                        <div className="showcase-content">
                                            <h3>64GB MEGA BUNDLE</h3>
                                            <p>Everything combined</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {cat.countText && (
                                <div className="more-indicator">
                                    {cat.countText}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
