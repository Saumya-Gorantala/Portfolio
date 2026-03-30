import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (options?: {
  duration?: number;
  ease?: string;
  stagger?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.querySelectorAll('[data-reveal]');
    
    gsap.from(children, {
      duration: options?.duration || 0.8,
      opacity: 0,
      y: 30,
      ease: options?.ease || 'power3.out',
      stagger: options?.stagger || 0.1,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [options?.duration, options?.ease, options?.stagger]);

  return ref;
};
