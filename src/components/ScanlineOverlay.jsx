import React from 'react';

/**
 * ScanlineOverlay Component
 * Renders CRT monitor scanline effect and subtle flicker
 * to create authentic retro computer terminal aesthetic
 */
const ScanlineOverlay = () => {
  return (
    <>
      <div className="scanlines" />
      <div className="crt-overlay" />
    </>
  );
};

export default ScanlineOverlay;
