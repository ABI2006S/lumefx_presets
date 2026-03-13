"use client";
import React, { useState, useEffect, useRef } from 'react';

interface AudioPlayerProps {
    title: string;
    description?: string;
}

export default function AudioPlayer({ title }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => setIsPlaying(false);
        const handlePause = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('play', handlePlay);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('play', handlePlay);
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // Stop other playing audio elements to ensure only one plays at a time
            const allAudios = document.querySelectorAll('audio');
            allAudios.forEach((a) => {
                if (a !== audioRef.current) {
                    a.pause();
                    a.currentTime = 0;
                }
            });

            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(console.error);
        }
    };

    return (
        <div className="preview-item audio-preview" onClick={togglePlay} style={{ cursor: 'pointer' }}>
            <audio ref={audioRef} preload="auto">
                <source src="/audio/sample.mp3" type="audio/mpeg" />
            </audio>
            <button className={`play-btn ${isPlaying ? 'playing' : ''}`}>
                {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                ) : (
                    "▶"
                )}
            </button>
            <span className="audio-name">{title}</span>
        </div>
    );
}
