import { motion, Variants } from 'framer-motion';
import { ReactNode, Children } from 'react';

interface StaggeredGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggeredGrid = ({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: StaggeredGridProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {Children.map(children, (child) => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
