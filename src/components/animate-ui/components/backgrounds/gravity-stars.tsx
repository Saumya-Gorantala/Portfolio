'use client';
import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  r: number;
  opacity: number;
  color: string;
}

interface GravityStarsBackgroundProps {
  className?: string;
  starCount?: number;
  gravityStrength?: number;
  returnSpeed?: number;
}

export function GravityStarsBackground({
  className = '',
  starCount = 120,
  gravityStrength = 60,
  returnSpeed = 0.04,
}: GravityStarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let stars: Star[] = [];

    // Palette: light = reds/pinks, dark = brighter reds + whites
    const lightColors = [
      'rgba(172,33,42,VAL)',
      'rgba(220,60,80,VAL)',
      'rgba(255,100,120,VAL)',
      'rgba(255,150,170,VAL)',
      'rgba(200,80,100,VAL)',
    ];
    const darkColors = [
      'rgba(255,85,102,VAL)',
      'rgba(220,50,70,VAL)',
      'rgba(255,130,150,VAL)',
      'rgba(255,200,210,VAL)',
      'rgba(172,33,42,VAL)',
    ];

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
      init();
    };

    const init = () => {
      const palette = isDark ? darkColors : lightColors;
      stars = Array.from({ length: starCount }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 2 + 0.5;
        const op = (Math.random() * 0.5 + 0.3).toFixed(2);
        const color = palette[Math.floor(Math.random() * palette.length)].replace('VAL', op);
        return { x, y, vx: 0, vy: 0, baseX: x, baseY: y, r, opacity: parseFloat(op), color };
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const s of stars) {
        // Gravity pull toward mouse
        const dx = mx - s.x;
        const dy = my - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = Math.min(gravityStrength / (dist * dist) * 800, 2);
        s.vx += (dx / dist) * force * 0.016;
        s.vy += (dy / dist) * force * 0.016;

        // Spring return to base position
        s.vx += (s.baseX - s.x) * returnSpeed;
        s.vy += (s.baseY - s.y) * returnSpeed;

        // Damping
        s.vx *= 0.88;
        s.vy *= 0.88;

        s.x += s.vx;
        s.y += s.vy;

        // Draw star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();

        // Glow
        if (dist < 150) {
          const glowOpacity = (1 - dist / 150) * 0.4;
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
          glow.addColorStop(0, isDark
            ? `rgba(255,85,102,${glowOpacity})`
            : `rgba(172,33,42,${glowOpacity})`);
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const parent = canvas.parentElement ?? window;
    (parent as HTMLElement).addEventListener?.('mousemove', handleMouseMove);
    (parent as HTMLElement).addEventListener?.('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);

    resize();
    tick();

    return () => {
      cancelAnimationFrame(raf);
      (parent as HTMLElement).removeEventListener?.('mousemove', handleMouseMove);
      (parent as HTMLElement).removeEventListener?.('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark, starCount, gravityStrength, returnSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
