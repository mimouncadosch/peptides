import React from 'react';

/**
 * GridBackground Component
 * Renders a Tron-style retro grid background with perspective effect
 * and animated horizon line for 80s cyberpunk aesthetic
 */
const GridBackground = () => {
  return (
    <div className="grid-background">
      <div className="grid-perspective" />
      <div className="horizon-line" />
    </div>
  );
};

export default GridBackground;
