import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.65,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      syncTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Keep ScrollTrigger in sync with Lenis's virtual scroll position
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis through GSAP's ticker so both share the same rAF —
    // this eliminates the one-frame offset that causes stuttered scroll triggers
    const rafFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0); // prevent GSAP from skipping frames under load

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafFn);
    };
  }, []);
};
