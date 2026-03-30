import React from 'react';
import AnimatedBackground from './AnimatedBackground';
import ParticlesBackground from './ParticlesBackground';
import { useTheme } from 'next-themes';

interface InteractiveBackgroundProps {
  showParticles?: boolean;
  showBlobs?: boolean;
  particleIntensity?: 'light' | 'dark';
  blobIntensity?: 'low' | 'medium' | 'high';
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  showParticles = true,
  showBlobs = true,
  particleIntensity = 'light',
  blobIntensity = 'high',
}) => {
  const { theme } = useTheme();
  const effectiveParticleIntensity = theme === 'dark' ? 'dark' : 'light';

  return (
    <>
      {/* Animated Blob Background */}
      {showBlobs && <AnimatedBackground intensity={blobIntensity} />}
      
      {/* Particle Effects Layer */}
      {showParticles && <ParticlesBackground variant={effectiveParticleIntensity} />}
      
      {/* Gradient Mesh Overlay */}
      <div
        className="fixed inset-0 -z-9 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(255, 182, 193, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(195, 130, 180, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 0%, rgba(255, 228, 225, 0.1) 0%, transparent 50%)
          `,
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
};

export default InteractiveBackground;
