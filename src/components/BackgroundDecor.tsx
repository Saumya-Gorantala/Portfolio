import React from 'react';
import './BackgroundDecor.css';

type OrbitPath = {
  d?: string;
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  rotate?: number;
  stroke: string;
  width: number;
  breathe?: boolean;
  desktopOnly?: boolean;
};

type OrbitNode = {
  x: number;
  y: number;
  delay: string;
  desktopOnly?: boolean;
};

type Speck = {
  x: number;
  y: number;
  r: number;
  opacity: number;
  burgundy?: boolean;
  delay: string;
  duration: string;
  desktopOnly?: boolean;
};

const orbitPaths: OrbitPath[] = [
  {
    cx: 160,
    cy: 120,
    rx: 560,
    ry: 250,
    rotate: -24,
    stroke: 'rgba(197, 31, 70, 0.22)',
    width: 1.25,
    breathe: true,
  },
  {
    cx: 1180,
    cy: 180,
    rx: 620,
    ry: 270,
    rotate: 16,
    stroke: 'rgba(160, 20, 50, 0.18)',
    width: 1.15,
  },
  {
    cx: 720,
    cy: 470,
    rx: 820,
    ry: 310,
    rotate: -9,
    stroke: 'rgba(197, 31, 70, 0.16)',
    width: 1.2,
    breathe: true,
  },
  {
    cx: 220,
    cy: 820,
    rx: 540,
    ry: 250,
    rotate: 20,
    stroke: 'rgba(255, 80, 110, 0.12)',
    width: 1.1,
  },
  {
    cx: 1380,
    cy: 680,
    rx: 500,
    ry: 360,
    rotate: -26,
    stroke: 'rgba(197, 31, 70, 0.14)',
    width: 1.05,
    desktopOnly: true,
  },
  {
    cx: 40,
    cy: 500,
    rx: 280,
    ry: 460,
    rotate: -8,
    stroke: 'rgba(160, 20, 50, 0.12)',
    width: 1,
    desktopOnly: true,
    breathe: true,
  },
  {
    d: 'M-80 360 C 280 210, 640 430, 980 300 S 1520 140, 1680 260',
    stroke: 'rgba(255, 80, 110, 0.12)',
    width: 1.15,
    desktopOnly: true,
  },
];

const orbitNodes: OrbitNode[] = [
  { x: 268, y: 168, delay: '0s' },
  { x: 642, y: 312, delay: '2.4s' },
  { x: 1048, y: 214, delay: '4.1s' },
  { x: 188, y: 742, delay: '1.3s' },
  { x: 886, y: 486, delay: '5.6s', desktopOnly: true },
  { x: 1264, y: 608, delay: '3.2s', desktopOnly: true },
  { x: 1340, y: 132, delay: '6.8s', desktopOnly: true },
];

const specks: Speck[] = [
  { x: 90, y: 80, r: 1.1, opacity: 0.28, delay: '0.4s', duration: '7s' },
  { x: 210, y: 260, r: 1.4, opacity: 0.22, delay: '1.8s', duration: '8.5s' },
  { x: 380, y: 40, r: 1, opacity: 0.32, delay: '2.2s', duration: '6.4s' },
  { x: 510, y: 190, r: 1.2, opacity: 0.2, burgundy: true, delay: '0.9s', duration: '9s' },
  { x: 740, y: 70, r: 1.1, opacity: 0.26, delay: '3.1s', duration: '7.8s' },
  { x: 920, y: 250, r: 1.3, opacity: 0.18, delay: '4s', duration: '8.2s' },
  { x: 1120, y: 90, r: 1, opacity: 0.3, delay: '1.1s', duration: '6.8s' },
  { x: 1310, y: 280, r: 1.2, opacity: 0.22, burgundy: true, delay: '2.7s', duration: '9.4s' },
  { x: 140, y: 430, r: 1.1, opacity: 0.2, delay: '5s', duration: '7.2s' },
  { x: 430, y: 510, r: 1.4, opacity: 0.16, delay: '3.6s', duration: '8s' },
  { x: 690, y: 390, r: 1, opacity: 0.24, burgundy: true, delay: '0.6s', duration: '10s' },
  { x: 980, y: 560, r: 1.2, opacity: 0.2, delay: '4.8s', duration: '6.6s' },
  { x: 1200, y: 430, r: 1.1, opacity: 0.28, delay: '2s', duration: '8.8s' },
  { x: 80, y: 640, r: 1.3, opacity: 0.18, delay: '1.5s', duration: '7.5s' },
  { x: 360, y: 780, r: 1, opacity: 0.26, delay: '3.9s', duration: '9.1s' },
  { x: 620, y: 680, r: 1.2, opacity: 0.2, burgundy: true, delay: '5.4s', duration: '8.4s' },
  { x: 860, y: 820, r: 1.1, opacity: 0.22, delay: '2.8s', duration: '6.9s' },
  { x: 1140, y: 760, r: 1.4, opacity: 0.16, delay: '0.3s', duration: '9.6s' },
  { x: 1360, y: 840, r: 1, opacity: 0.24, delay: '4.3s', duration: '7.7s' },
  { x: 1480, y: 520, r: 1.2, opacity: 0.18, delay: '1.9s', duration: '8.1s', desktopOnly: true },
  { x: 1540, y: 160, r: 1.1, opacity: 0.26, delay: '3.4s', duration: '7.3s', desktopOnly: true },
  { x: 40, y: 300, r: 1, opacity: 0.22, delay: '5.8s', duration: '9.2s', desktopOnly: true },
];

const BackgroundDecor: React.FC = () => {
  return (
    <div className="background-decor" aria-hidden="true">
      <svg
        className="background-decor__svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <filter id="node-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {orbitPaths.map((path, index) => {
          const className = [
            path.breathe ? 'background-decor__line--breathe' : '',
            path.desktopOnly ? 'background-decor__lg' : '',
          ]
            .filter(Boolean)
            .join(' ');

          if (path.d) {
            return (
              <path
                key={`orbit-${index}`}
                className={className}
                d={path.d}
                stroke={path.stroke}
                strokeWidth={path.width}
                vectorEffect="non-scaling-stroke"
              />
            );
          }

          return (
            <ellipse
              key={`orbit-${index}`}
              className={className}
              cx={path.cx}
              cy={path.cy}
              rx={path.rx}
              ry={path.ry}
              transform={`rotate(${path.rotate ?? 0} ${path.cx} ${path.cy})`}
              stroke={path.stroke}
              strokeWidth={path.width}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {specks.map((speck, index) => (
          <circle
            key={`speck-${index}`}
            className={`background-decor__speck ${speck.desktopOnly ? 'background-decor__lg' : ''}`}
            cx={speck.x}
            cy={speck.y}
            r={speck.r}
            fill={speck.burgundy ? '#C51F46' : '#F7F3F0'}
            style={{
              opacity: speck.opacity,
              animationDelay: speck.delay,
              animationDuration: speck.duration,
            }}
          />
        ))}

        {orbitNodes.map((node, index) => (
          <g
            key={`node-${index}`}
            className={`background-decor__node ${node.desktopOnly ? 'background-decor__lg' : ''}`}
            transform={`translate(${node.x} ${node.y})`}
            style={{ animationDelay: node.delay }}
            filter="url(#node-glow)"
          >
            <circle r="8.5" fill="rgba(255, 91, 115, 0.16)" />
            <circle r="5.2" fill="none" stroke="rgba(197, 31, 70, 0.32)" strokeWidth="0.85" />
            <circle r="2.15" fill="#ff5b73" />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default BackgroundDecor;
