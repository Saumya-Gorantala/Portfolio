import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageLoadAnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export const PageLoadAnimation: React.FC<PageLoadAnimationProps> = ({
  children,
  delay = 0,
  duration = 0.6,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};

interface StackedPageLoadProps {
  children: ReactNode;
  staggerDelay?: number;
}

export const StackedPageLoad: React.FC<StackedPageLoadProps> = ({
  children: childrenProp,
  staggerDelay = 0.1,
}) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {Array.isArray(childrenProp)
        ? childrenProp.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : childrenProp}
    </motion.div>
  );
};
