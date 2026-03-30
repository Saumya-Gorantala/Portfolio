import React, { useMemo } from 'react';
import Particles from 'react-tsparticles';
import { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

interface ParticlesBackgroundProps {
  variant?: 'light' | 'dark';
}

let particlesEngine: Engine;

const initParticles = async (engine: Engine) => {
  await loadSlim(engine);
};

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ variant = 'light' }) => {
  const particlesInit = React.useCallback(async (engine: Engine) => {
    if (!particlesEngine) {
      particlesEngine = engine;
      await initParticles(engine);
    }
  }, []);

  const particlesLoaded = React.useCallback(async () => {
    // Particles loaded
  }, []);

  const particlesOptions = useMemo(() => {
    const isDark = variant === 'dark';
    return {
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      particles: {
        color: {
          value: isDark ? '#ff6b9d' : '#ffb6c1',
        },
        links: {
          color: isDark ? '#c01857' : '#ffc0cb',
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: 'none' as const,
          enable: true,
          outModes: {
            default: 'bounce' as const,
          },
          random: true,
          speed: 1.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 40,
        },
        opacity: {
          value: 0.4,
          animation: {
            enable: true,
            minimumValue: 0.1,
            speed: 1,
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            minimumValue: 0.5,
            speed: 2,
            sync: false,
          },
        },
      },
      detectRetina: true,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
            parallax: {
              enable: true,
              force: 60,
              smooth: 10,
            },
          },
          resize: {
            enable: true,
            delay: 0.5,
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
    };
  }, [variant]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions}
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -20,
      }}
    />
  );
};

export default ParticlesBackground;
