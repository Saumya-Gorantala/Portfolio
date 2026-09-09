import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  action?: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  alignment = 'left',
  action,
}) => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(titleRef.current.querySelector('span'), {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: 'power3.out',
    }).from(
      titleRef.current.querySelector('h2'),
      {
        opacity: 0,
        y: 16,
        duration: 0.45,
        ease: 'power3.out',
      },
      '-=0.2',
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div ref={titleRef} className={`mb-6 md:mb-7 ${alignmentClasses[alignment]}`}>
      <div className={`flex flex-col gap-3 ${action ? 'md:flex-row md:items-end md:justify-between md:gap-6' : ''}`}>
        <div>
          {subtitle && (
            <span className="label-caps mb-3 inline-block">{subtitle}</span>
          )}
          <h2 className="heading-display text-[clamp(38px,4vw,52px)] font-medium leading-[1.05]">
            {title}
          </h2>
          <span className={`section-header-line ${alignment === 'center' ? 'mx-auto' : ''}`} />
        </div>
        {action ? <div className="md:pb-1">{action}</div> : null}
      </div>
    </div>
  );
};

export default SectionTitle;
