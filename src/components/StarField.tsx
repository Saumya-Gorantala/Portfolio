import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  minOpacity: number;
  maxOpacity: number;
  twinkleDuration: number;
  phase: number;
  vx: number;
  vy: number;
  color: string;
  sparkle: boolean;
  sparkleSize: number;
}

const WHITE = ['#F7F3F0', '#FFFFFF', '#E8E2DC'];
const GRAY = ['#CFCACA', '#B8B3B3', '#AAA5A6'];
const BURGUNDY = ['#800020', '#C51F46', '#E14A64'];

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    let running = true;

    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const createStars = () => {
      const area = width * height;
      const count = Math.min(340, Math.max(150, Math.floor(area * 0.00011)));
      const sparkleCount = Math.min(12, Math.max(5, Math.round(count * 0.03)));
      stars = [];

      for (let i = 0; i < count; i++) {
        const burgundy = Math.random() < 0.14;
        const gray = !burgundy && Math.random() < 0.28;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() < 0.4 ? 1 : Math.random() < 0.7 ? 1.5 : 2,
          minOpacity: burgundy ? 0.2 : gray ? 0.24 : 0.28,
          maxOpacity: burgundy ? 0.45 : gray ? 0.6 : 0.75,
          twinkleDuration: 4 + Math.random() * 5,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.028,
          vy: (Math.random() - 0.5) * 0.02,
          color: burgundy ? pick(BURGUNDY) : gray ? pick(GRAY) : pick(WHITE),
          sparkle: false,
          sparkleSize: 0,
        });
      }

      for (let i = 0; i < sparkleCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.6,
          minOpacity: 0.22,
          maxOpacity: 0.65,
          twinkleDuration: 6 + Math.random() * 4,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.016,
          vy: (Math.random() - 0.5) * 0.016,
          color: Math.random() < 0.35 ? pick(BURGUNDY) : '#F7F3F0',
          sparkle: true,
          sparkleSize: Math.random() * 3 + 4,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
    };

    const drawSparkle = (star: Star, alpha: number) => {
      const s = star.sparkleSize;
      ctx.save();
      ctx.translate(star.x, star.y);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.16, 0);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.16, 0);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-s, 0);
      ctx.lineTo(0, s * 0.16);
      ctx.lineTo(s, 0);
      ctx.lineTo(0, -s * 0.16);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const draw = (time: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.001;

      for (const star of stars) {
        if (!reduceMotion) {
          star.x += star.vx;
          star.y += star.vy;
          if (star.x < -8) star.x = width + 8;
          if (star.x > width + 8) star.x = -8;
          if (star.y < -8) star.y = height + 8;
          if (star.y > height + 8) star.y = -8;
        }

        const twinkle = reduceMotion
          ? (star.minOpacity + star.maxOpacity) / 2
          : star.minOpacity +
            (star.maxOpacity - star.minOpacity) *
              (0.5 + 0.5 * Math.sin((t * (Math.PI * 2)) / star.twinkleDuration + star.phase));

        if (star.sparkle) {
          drawSparkle(star, twinkle * 0.85);
        } else {
          ctx.globalAlpha = twinkle;
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default StarField;
