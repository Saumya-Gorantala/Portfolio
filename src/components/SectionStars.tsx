import React from 'react';
import { useTheme } from 'next-themes';
import { StarsBackground } from './animate-ui/components/backgrounds/stars';

/**
 * Lightweight star overlay for individual sections.
 * Usage: place as the *first* child inside a section that has
 * `className="relative overflow-hidden ..."`, and wrap the actual
 * content in `<div className="relative z-10 ...">` so it renders
 * above the stars.
 */
const SectionStars: React.FC = () => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      {/* Theme-coloured stars — burgundy in light, white in dark */}
      <StarsBackground
        starColor={resolvedTheme === 'dark' ? '#ffffff' : '#ac212a'}
        speed={65}
        factor={0.03}
        className="absolute inset-0 bg-transparent"
        style={{ zIndex: 0, pointerEvents: 'none' }}
      />
      {/* Bold red/crimson stars — always present */}
      <StarsBackground
        starColor="rgba(210,35,35,0.9)"
        speed={85}
        factor={0.035}
        className="absolute inset-0 bg-transparent"
        style={{ zIndex: 0, pointerEvents: 'none' }}
      />
      {/* Soft white accent stars */}
      <StarsBackground
        starColor="rgba(255,255,255,0.7)"
        speed={110}
        factor={0.02}
        className="absolute inset-0 bg-transparent"
        style={{ zIndex: 0, pointerEvents: 'none' }}
      />
    </>
  );
};

export default SectionStars;
