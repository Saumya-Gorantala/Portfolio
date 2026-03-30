import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

declare global {
  interface Window {
    VANTA: {
      BLOB: (options: any) => any;
    };
  }
}

interface AnimatedBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ intensity = 'medium' }) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    
    script.onload = () => {
      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta.js/0.5.24/vanta.blob.min.js';
      
      vantaScript.onload = () => {
        if (backgroundRef.current && window.VANTA) {
          const isDark = theme === 'dark';
          const intensityMap = {
            low: { blobSize: 1200, opacity: 0.5, speed: 0.5 },
            medium: { blobSize: 1500, opacity: 0.7, speed: 1.0 },
            high: { blobSize: 1800, opacity: 0.85, speed: 1.5 },
          };
          
          const config = intensityMap[intensity];
          
          window.VANTA.BLOB({
            el: backgroundRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            opacity: config.opacity,
            scaleMobile: 1.0,
            blobSize: config.blobSize,
            speed: config.speed,
            color1: isDark ? 0x131024 : 0xfef5f5,
            color2: isDark ? 0x3d1b54 : 0xffc0cb,
            color3: isDark ? 0x1a0d2e : 0xffe4e1,
          });
        }
      };
      
      document.head.appendChild(vantaScript);
    };
    
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [theme, intensity]);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 -z-10 pointer-events-none bg-white dark:bg-pastel-darker-gray"
      style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
    />
  );
};

export default AnimatedBackground;
