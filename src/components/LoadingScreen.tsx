import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);

  const messages = [
    "Preparing Saumya's portfolio...",
    "Loading projects...",
    "Almost ready...",
  ];

  useEffect(() => {
    // Rotate messages with fade
    const msgInterval = setInterval(() => {
      setMsgVisible(false);
      setTimeout(() => {
        setMsgIndex(prev => (prev + 1) % messages.length);
        setMsgVisible(true);
      }, 300);
    }, 800);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 30;
      });
    }, 300);

    // Animate logo with GSAP
    if (logoRef.current) {
      const timeline = gsap.timeline({ repeat: -1 });
      
      timeline
        .fromTo(
          logoRef.current,
          { scale: 0.5, opacity: 0, rotationZ: -180 },
          { scale: 1, opacity: 1, rotationZ: 0, duration: 1, ease: 'elastic.out(1.2, 0.5)' }
        )
        .to(
          logoRef.current,
          { y: -20, duration: 0.7, ease: 'sine.inOut' },
          0.5
        )
        .to(
          logoRef.current,
          { y: 0, duration: 0.7, ease: 'sine.inOut' },
          1.2
        )
        .to(
          logoRef.current,
          { rotationZ: 360, duration: 2, ease: 'power1.inOut' },
          0.5
        );
    }

    // Simulate loading completion
    const loadingTimeout = setTimeout(() => {
      setProgress(100);
      
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          delay: 0.3,
          onComplete: () => {
            onLoadingComplete();
          },
        });
      }
    }, 2500);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      clearTimeout(loadingTimeout);
    };
  }, [onLoadingComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #0e0e12 0%, #14101a 50%, #0e0e12 100%)' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(172,33,42,0.12)' }} />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse animation-delay-2000" style={{ background: 'rgba(172,33,42,0.07)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Logo Glow Effect */}
        <div className="relative">
          <div className="absolute inset-0 w-32 h-32 rounded-2xl blur-2xl opacity-50 animate-pulse" style={{ background: 'rgba(172,33,42,0.25)' }} />

          {/* Logo Animation */}
          <div
            ref={logoRef}
            className="relative w-32 h-32 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden p-2"
            style={{ background: '#222222', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <img
              src="https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/sg_logo.png"
              alt="Saumya Gorantala Logo"
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p
            className="text-lg md:text-xl font-semibold transition-opacity duration-300"
            style={{ color: '#F1F1F1', opacity: msgVisible ? 1 : 0 }}
          >
            {messages[msgIndex]}
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 md:w-80 h-1.5 rounded-full overflow-hidden backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <div
            ref={progressBarRef}
            className="h-full rounded-full transition-all duration-300 ease-out shadow-lg"
            style={{ width: `${progress}%`, background: 'linear-gradient(to right, #ac212a, #d4344a, #ac212a)' }}
          />
        </div>

        {/* Progress Text */}
        <div className="text-center">
          <p className="text-sm font-semibold" style={{ color: 'rgba(241,241,241,0.7)' }}>
            {Math.round(progress)}%
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: '#ac212a',
                animation: `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 182, 193, 0.5), 0 0 40px rgba(255, 107, 157, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 182, 193, 0.8), 0 0 60px rgba(255, 107, 157, 0.5);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animation-delay-2000 {
          animation-delay: 2000ms;
        }

        .dark .glow-dark {
          animation: glow 2s ease-in-out infinite;
        }

        .glow-light {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
