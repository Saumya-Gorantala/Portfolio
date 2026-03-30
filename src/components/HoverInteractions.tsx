import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HoverMicroInteractionProps {
  children: ReactNode;
  scaleOnHover?: number;
  rotateOnHover?: number;
  glowOnHover?: boolean;
  className?: string;
}

export const HoverInteractive: React.FC<HoverMicroInteractionProps> = ({
  children,
  scaleOnHover = 1.05,
  rotateOnHover = 0,
  glowOnHover = false,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: scaleOnHover, rotate: rotateOnHover }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        boxShadow: glowOnHover
          ? 'var(--hover-shadow, 0 8px 32px rgba(255, 182, 193, 0.15))'
          : 'none',
      }}
    >
      {children}
    </motion.div>
  );
};

interface HoverExpandProps {
  children: ReactNode;
  className?: string;
}

export const HoverExpand: React.FC<HoverExpandProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ x: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

interface HoverGlowProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export const HoverGlow: React.FC<HoverGlowProps> = ({ children, className = '', intensity = 0.2 }) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        boxShadow: `0 0 24px rgba(255, 182, 193, ${intensity})`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
