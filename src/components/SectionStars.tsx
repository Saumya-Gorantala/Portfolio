import React from 'react';

/** Local burgundy wash for a section — stars live globally in Layout. */
const SectionStars: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-1/2 top-8 h-56 w-[30rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(128,0,32,0.14) 0%, transparent 70%)' }}
      />
    </div>
  );
};

export default SectionStars;
