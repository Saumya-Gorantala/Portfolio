import React from 'react';

/**
 * Soft burgundy ambient light — no particle mesh, no decorative fauna.
 * Sits behind content so type stays readable.
 */
const PremiumBackground: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      <div
        className="absolute -right-24 -top-28 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(128,0,32,0.22) 0%, transparent 68%)' }}
      />
      <div
        className="absolute left-[-8%] top-[38%] h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(197,31,70,0.09) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[6%] right-[18%] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(92,0,24,0.2) 0%, transparent 70%)' }}
      />
      <div
        className="absolute left-1/2 top-[18%] h-[320px] w-[280px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(229,43,80,0.05) 0%, transparent 70%)' }}
      />
    </div>
  );
};

export default PremiumBackground;
