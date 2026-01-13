import { ReactNode, HTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  noHover?: boolean
  hoverShadow?: string
}

export const Card = ({
  children,
  className = '',
  noHover = false,
  hoverShadow,
  ...props
}: CardProps) => {
  const { onAnimationStart, ...restProps } = props as any

  return (
    <motion.div
      className={`glass-card p-6 ${className}`}
      whileHover={
        noHover
          ? undefined
          : hoverShadow
            ? { boxShadow: hoverShadow, y: -6 }
            : {
                y: -6,
                borderColor: 'rgba(0, 255, 65, 0.2)',
              }
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onAnimationStart={onAnimationStart}
      {...restProps}
    >
      {children}
    </motion.div>
  )
}
