import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  alignment = 'center' 
}) => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(titleRef.current.querySelector('span'), {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
    })
      .from(titleRef.current.querySelector('h2'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div ref={titleRef} className={`mb-12 ${alignmentClasses[alignment]}`}>
      <div className="inline-block">
        <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-primary-foreground uppercase bg-primary/20 rounded-full mb-2 dark:bg-pastel-burgundy/30 dark:text-pastel-light-gray">
          {subtitle}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-pastel-light-gray">{title}</h2>
    </div>
  );
};

export default SectionTitle;
