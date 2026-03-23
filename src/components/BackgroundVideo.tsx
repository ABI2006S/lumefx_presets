'use client';

import React, { useEffect, useState } from 'react';

export default function BackgroundVideo() {
  const [videoSrc, setVideoSrc] = useState('/hypercompressed.mp4');

  useEffect(() => {
    // On mount, check if we're on a larger screen to use the higher quality webm
    if (window.innerWidth > 768) {
      setVideoSrc('/hyper.webm');
    }
  }, []);

  return (
    <>
      <div className="global-bg-fallback" />
      <video
        key={videoSrc} // Force re-mount when src changes
        className="global-bg-video"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="global-bg-overlay" />
    </>
  );
}
