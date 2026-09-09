import React from 'react';
import './OrbitDecorations.css';

type OrbitArc = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotate: number;
  stroke: string;
  width: number;
  desktopOnly?: boolean;
};

type OrbitNode = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotate: number;
  angle: number;
  delay?: string;
  desktopOnly?: boolean;
};

type OrbitDot = {
  x: number;
  y: number;
  r: number;
  opacity: number;
  delay?: string;
  desktopOnly?: boolean;
};

const ARCS: OrbitArc[] = [
  { cx: 220, cy: 180, rx: 760, ry: 330, rotate: -22, stroke: 'rgba(229,43,80,0.55)', width: 1.35 },
  { cx: 1040, cy: 140, rx: 680, ry: 360, rotate: 16, stroke: 'rgba(197,31,70,0.48)', width: 1.25 },
  { cx: 1180, cy: 560, rx: 620, ry: 270, rotate: -12, stroke: 'rgba(229,43,80,0.42)', width: 1.3 },
  { cx: 380, cy: 860, rx: 700, ry: 290, rotate: 18, stroke: 'rgba(197,31,70,0.4)', width: 1.2 },
  { cx: 720, cy: 420, rx: 520, ry: 220, rotate: -8, stroke: 'rgba(229,43,80,0.32)', width: 1.1, desktopOnly: true },
];

const NODES: OrbitNode[] = [
  { cx: 220, cy: 180, rx: 760, ry: 330, rotate: -22, angle: 60, delay: '0s' },
  { cx: 1040, cy: 140, rx: 680, ry: 360, rotate: 16, angle: 140, delay: '1.8s' },
  { cx: 1040, cy: 140, rx: 680, ry: 360, rotate: 16, angle: 80, delay: '3.2s' },
  { cx: 1180, cy: 560, rx: 620, ry: 270, rotate: -12, angle: 240, delay: '0.9s' },
  { cx: 380, cy: 860, rx: 700, ry: 290, rotate: 18, angle: 280, delay: '4.4s' },
  { cx: 1180, cy: 560, rx: 620, ry: 270, rotate: -12, angle: 280, delay: '2.6s', desktopOnly: true },
  { cx: 720, cy: 420, rx: 520, ry: 220, rotate: -8, angle: 300, delay: '5.1s', desktopOnly: true },
];

const DOTS: OrbitDot[] = [
  { x: 90, y: 120, r: 1.6, opacity: 0.62, delay: '0.4s' },
  { x: 510, y: 70, r: 1.4, opacity: 0.52, delay: '1.8s' },
  { x: 860, y: 96, r: 1.8, opacity: 0.58, delay: '3s' },
  { x: 1320, y: 210, r: 1.5, opacity: 0.48, delay: '0.9s', desktopOnly: true },
  { x: 70, y: 520, r: 1.7, opacity: 0.46, delay: '2.2s' },
  { x: 640, y: 500, r: 1.4, opacity: 0.5, delay: '4.4s' },
  { x: 1480, y: 470, r: 1.6, opacity: 0.44, delay: '1.3s', desktopOnly: true },
  { x: 240, y: 740, r: 1.5, opacity: 0.48, delay: '3.6s' },
  { x: 1080, y: 780, r: 1.4, opacity: 0.46, delay: '2.8s', desktopOnly: true },
];

function ellipsePoint(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotateDeg: number,
  angleDeg: number,
) {
  const rot = (rotateDeg * Math.PI) / 180;
  const angle = (angleDeg * Math.PI) / 180;
  const x0 = rx * Math.cos(angle);
  const y0 = ry * Math.sin(angle);
  return {
    x: cx + x0 * Math.cos(rot) - y0 * Math.sin(rot),
    y: cy + x0 * Math.sin(rot) + y0 * Math.cos(rot),
  };
}

const OrbitDecorations: React.FC = () => {
  return (
    <div className="orbit-decor" aria-hidden="true">
      <svg
        className="orbit-decor__svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <filter id="orbit-line-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="orbit-node-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#orbit-line-glow)">
          {ARCS.map((arc, index) => (
            <ellipse
              key={`arc-${index}`}
              className={arc.desktopOnly ? 'orbit-decor__lg' : undefined}
              cx={arc.cx}
              cy={arc.cy}
              rx={arc.rx}
              ry={arc.ry}
              transform={`rotate(${arc.rotate} ${arc.cx} ${arc.cy})`}
              stroke={arc.stroke}
              strokeWidth={arc.width}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {DOTS.map((dot, index) => (
          <circle
            key={`dot-${index}`}
            className={`orbit-decor__dot ${dot.desktopOnly ? 'orbit-decor__lg' : ''}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.r}
            fill="#E52B50"
            style={{ opacity: dot.opacity, animationDelay: dot.delay }}
          />
        ))}

        {NODES.map((node, index) => {
          const point = ellipsePoint(node.cx, node.cy, node.rx, node.ry, node.rotate, node.angle);
          return (
            <g
              key={`node-${index}`}
              className={`orbit-decor__node ${node.desktopOnly ? 'orbit-decor__lg' : ''}`}
              transform={`translate(${point.x} ${point.y})`}
              style={{ animationDelay: node.delay }}
              filter="url(#orbit-node-glow)"
            >
              <circle r="16" fill="rgba(229,43,80,0.16)" />
              <circle r="8.5" fill="none" stroke="rgba(229,43,80,0.55)" strokeWidth="1.15" />
              <circle r="3.6" fill="#E52B50" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default OrbitDecorations;
