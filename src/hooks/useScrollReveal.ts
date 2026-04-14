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

    const tween = gsap.from(children, {
      duration: options?.duration ?? 0.5,
      opacity: 0,
      y: 18,
      ease: options?.ease ?? 'power3.out',
      stagger: options?.stagger ?? 0.07,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      (tween.scrollTrigger as ScrollTrigger | undefined)?.kill();
      tween.kill();
    };
  }, [options?.duration, options?.ease, options?.stagger]);

  return ref;
};
