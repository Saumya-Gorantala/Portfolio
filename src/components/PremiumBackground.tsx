import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

// ── Butterfly SVG sprite ──────────────────────────────────────────────────
interface ButterflyProps { size: number; color: string; flapDur: number; wingOpacity?: number; }
const ButterflySprite: React.FC<ButterflyProps> = ({ size, color, flapDur, wingOpacity = 0.72 }) => {
  const body = color.startsWith('#') ? color : color.replace(/[\d.]+\)$/, '0.95)');
  return (
    <svg
      width={size}
      height={size * 0.82}
      viewBox="0 0 40 33"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: `butterflyFlap ${flapDur}s ease-in-out infinite`, display: 'block' }}
    >
      {/* Left upper wing */}
      <path d="M20 16 C14 3 1 1 3 12 C5 21 16 21 20 16Z" fill={color} />
      {/* Left lower wing */}
      <path d="M20 16 C10 21 4 31 10 32 C16 33 20 23 20 16Z" fill={color} opacity={wingOpacity} />
      {/* Right upper wing */}
      <path d="M20 16 C26 3 39 1 37 12 C35 21 24 21 20 16Z" fill={color} />
      {/* Right lower wing */}
      <path d="M20 16 C30 21 36 31 30 32 C24 33 20 23 20 16Z" fill={color} opacity={wingOpacity} />
      {/* Body */}
      <ellipse cx="20" cy="16" rx="1.6" ry="8" fill={body} />
      {/* Antennae */}
      <path d="M19.2 9 Q15 4 13 2.5" stroke={body} strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M20.8 9 Q25 4 27 2.5" stroke={body} strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <circle cx="13" cy="2.5" r="1.1" fill={body} />
      <circle cx="27" cy="2.5" r="1.1" fill={body} />
    </svg>
  );
};

const BUTTERFLIES = [
  { top: '5%', size: 26, dur: 28, delay: 0, flapDur: 0.38 },
  { top: '12%', size: 18, dur: 42, delay: -31, flapDur: 0.30 },
  { top: '19%', size: 22, dur: 35, delay: -11, flapDur: 0.44 },
  { top: '27%', size: 15, dur: 26, delay: -19, flapDur: 0.33 },
  { top: '34%', size: 24, dur: 38, delay: -7, flapDur: 0.41 },
  { top: '41%', size: 19, dur: 30, delay: -24, flapDur: 0.28 },
  { top: '49%', size: 21, dur: 44, delay: -15, flapDur: 0.36 },
  { top: '56%', size: 17, dur: 27, delay: -38, flapDur: 0.45 },
  { top: '63%', size: 23, dur: 33, delay: -3, flapDur: 0.32 },
  { top: '70%', size: 16, dur: 40, delay: -22, flapDur: 0.39 },
  { top: '77%', size: 20, dur: 29, delay: -13, flapDur: 0.27 },
  { top: '84%', size: 25, dur: 36, delay: -29, flapDur: 0.43 },
  { top: '8%', size: 20, dur: 24, delay: -17, flapDur: 0.35 },
  { top: '31%', size: 14, dur: 47, delay: -41, flapDur: 0.29 },
  { top: '53%', size: 22, dur: 31, delay: -26, flapDur: 0.42 },
  { top: '74%', size: 18, dur: 39, delay: -9, flapDur: 0.37 },
  { top: '88%', size: 16, dur: 25, delay: -34, flapDur: 0.31 },
  { top: '23%', size: 21, dur: 45, delay: -20, flapDur: 0.40 },
  { top: '47%', size: 17, dur: 28, delay: -44, flapDur: 0.26 },
  { top: '67%', size: 24, dur: 37, delay: -6, flapDur: 0.46 },
];

/**
 * PremiumBackground — layered effects on top of the site's original colour scheme.
 * The base background colour is still driven by the Layout gradient + Tailwind dark mode,
 * exactly as it was originally. This component only adds:
 *   1. Subtle moving orbs  (match the existing pastel palette)
 *   2. Canvas particles
 *   3. SVG noise grain
 *   4. Soft vignette
 */
const PremiumBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isDarkRef = useRef(isDark);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  // ── Canvas: floating particles + soft connection lines ───────────────────
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Dot {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      op: number; opDir: number;
    }

    const COUNT = 45;
    const dots: Dot[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.4,
      op: Math.random() * 0.3 + 0.07,
      opDir: (Math.random() > 0.5 ? 1 : -1) * 0.002,
    }));

    let raf: number;
    const LINK = 125;
    const LINK_SQ = LINK * LINK;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // light → pastel-pink #FFCAD4 | dark → soft warm gray
      const rgb = isDarkRef.current ? '172,160,162' : '255,202,212';

      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        else if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        else if (d.y > canvas.height) d.y = 0;
        d.op += d.opDir;
        if (d.op > 0.38 || d.op < 0.05) d.opDir *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${d.op})`;
        ctx.fill();
      }

      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distSq = dx * dx + dy * dy;
          // Cheap squared-distance gate — avoids sqrt for the ~95% that miss
          if (distSq < LINK_SQ) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(${rgb},${0.07 * (1 - dist / LINK)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  // ── Stars ────────────────────────────────────────────────────────────────
  const stars = useMemo(() => Array.from({ length: 220 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    dur: `${(Math.random() * 3 + 2).toFixed(2)}s`,
    delay: `${(Math.random() * 6).toFixed(2)}s`,
  })), []);

  // ── Subtle drifting orbs — stay within the site's existing colour palette ─
  // Light: pastel-pink #FFCAD4 / pastel-red #FFD6D6 / pastel-light-pink #FFF0F3
  // Dark:  pastel-charcoal #403E43 / pastel-dark-gray #333333 — kept very low opacity
  //        so they don't override the existing dark-mode background colour.
  const orbs = useMemo(() => {
    const light = [
      { color: 'rgba(255,202,212,0.40)', s: 700, l: '-5%', t: '-8%', dx: 160, dy: 120, dur: 25 },
      { color: 'rgba(255,214,214,0.35)', s: 600, l: '60%', t: '-5%', dx: -120, dy: 180, dur: 32 },
      { color: 'rgba(255,240,243,0.45)', s: 800, l: '10%', t: '55%', dx: 200, dy: -100, dur: 38 },
      { color: 'rgba(255,202,212,0.30)', s: 520, l: '70%', t: '60%', dx: -140, dy: -80, dur: 22 },
      { color: 'rgba(255,214,214,0.28)', s: 680, l: '35%', t: '25%', dx: 100, dy: 160, dur: 30 },
    ];
    const dark = [
      { color: 'rgba(64,62,67,0.55)', s: 700, l: '-5%', t: '-8%', dx: 160, dy: 120, dur: 25 },
      { color: 'rgba(51,51,51,0.50)', s: 600, l: '60%', t: '-5%', dx: -120, dy: 180, dur: 32 },
      { color: 'rgba(64,62,67,0.45)', s: 800, l: '10%', t: '55%', dx: 200, dy: -100, dur: 38 },
      { color: 'rgba(51,51,51,0.40)', s: 520, l: '70%', t: '60%', dx: -140, dy: -80, dur: 22 },
      { color: 'rgba(172,33,42,0.12)', s: 680, l: '35%', t: '25%', dx: 100, dy: 160, dur: 30 }, // faint burgundy accent
    ];
    return isDark ? dark : light;
  }, [isDark]);

  return (
    <>
      {/* ── 1. Moving mesh-gradient orbs ─────────────────────────────────── */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none rounded-full"
          style={{
            zIndex: -22,
            width: orb.s,
            height: orb.s,
            left: orb.l,
            top: orb.t,
            background: orb.color,
            filter: 'blur(90px)',
            willChange: 'transform',
          }}
          animate={{ x: [0, orb.dx, orb.dx * 0.4, 0], y: [0, orb.dy * 0.5, orb.dy, 0] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 1.6 }}
        />
      ))}

      {/* ── 2. Stars ─────────────────────────────────────────────────────── */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="fixed pointer-events-none rounded-full"
          style={{
            zIndex: 1,
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: isDark ? 'rgba(255,255,255,0.95)' : 'rgba(172,33,42,0.45)',
            animation: `starTwinkle ${s.dur} ease-in-out ${s.delay} infinite`,
            boxShadow: isDark
              ? `0 0 ${s.size * 4}px rgba(255,255,255,1),
                 0 0 ${s.size * 10}px rgba(255,255,255,0.8),
                 0 0 ${s.size * 20}px rgba(255,255,255,0.5),
                 0 0 ${s.size * 35}px rgba(255,255,255,0.2)`
              : `0 0 ${s.size * 2}px rgba(172,33,42,0.5),
                 0 0 ${s.size * 5}px rgba(172,33,42,0.2),
                 0 0 ${s.size * 9}px rgba(172,33,42,0.08)`,
          }}
        />
      ))}

      {/* ── 3. Canvas micro-particles ────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -18 }}
      />

      {/* ── 3. SVG fractal-noise grain ───────────────────────────────────── */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: -14 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="pg-noise" x="0%" y="0%" width="100%" height="100%"
            colorInterpolationFilters="linearRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.68 0.72"
              numOctaves="4" seed="8" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
            <feBlend in="SourceGraphic" in2="gray" mode="overlay" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#pg-noise)"
          opacity={isDark ? 0.045 : 0.035} />
      </svg>

      {/* ── 4. Butterflies ───────────────────────────────────────────────── */}
      {BUTTERFLIES.map((b, i) => (
        <div
          key={i}
          className="fixed pointer-events-none"
          style={{
            zIndex: -4,
            top: b.top,
            left: 0,
            animation: `butterflyFlight ${b.dur}s linear ${b.delay}s infinite`,
            filter: isDark
              ? 'drop-shadow(0 0 15px rgba(255,85,102,0.9)) drop-shadow(0 0 30px rgba(255,85,102,0.5))'
              : 'none',
          }}
        >
          <ButterflySprite
            size={b.size}
            color={isDark ? '#ff5566' : 'rgba(200,20,20,1)'}
            flapDur={b.flapDur}
            wingOpacity={isDark ? 1 : 1}
          />
        </div>
      ))}

      {/* ── 5. Vignette ──────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -10,
          background: isDark
            ? 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(34,34,34,0.45) 100%)'
            : 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(255,202,212,0.18) 100%)',
          transition: 'background 0.4s ease',
        }}
      />
    </>
  );
};

export default PremiumBackground;
