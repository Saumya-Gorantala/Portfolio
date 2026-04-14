
import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedProps {
  children: React.ReactNode;
  delay?: number;
}

export const FadeIn: React.FC<AnimatedProps> = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
};

export const SlideIn: React.FC<AnimatedProps & { direction?: 'left' | 'right' | 'up' | 'down' }> = ({
  children,
  delay = 0,
  direction = 'up',
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const directionOffset = {
    left:  { x: -20, y: 0 },
    right: { x:  20, y: 0 },
    up:    { x: 0,  y: 16 },
    down:  { x: 0,  y: -16 },
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: directionOffset[direction].x,
      y: directionOffset[direction].y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
};

export const ScaleIn: React.FC<AnimatedProps> = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
};

export const Stagger: React.FC<AnimatedProps & { staggerChildren?: number }> = ({
  children,
  delay = 0,
  staggerChildren = 0.07,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren,
      },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<AnimatedProps> = ({ children }) => {
  const variants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return <motion.div variants={variants}>{children}</motion.div>;
};
