import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'info' | 'new'
  className?: string
  pulse?: boolean
}

export const Badge = ({
  children,
  variant = 'default',
  className = '',
  pulse = false,
}: BadgeProps) => {
  const variants = {
    default: 'bg-gradient-to-r from-neon-green to-neon-blue border border-neon-green/30',
    success: 'bg-gradient-to-r from-neon-green to-neon-green-dim',
    warning: 'bg-gradient-to-r from-amber-400 to-orange-500',
    info: 'bg-gradient-to-r from-neon-blue to-neon-blue-dim',
    new: 'bg-gradient-to-r from-neon-pink to-neon-pink-dim',
  }

  return (
    <motion.span
      className={`${variants[variant]} text-white/90 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border backdrop-blur-sm shadow-lg ${className}`}
      animate={
        pulse
          ? {
              boxShadow: [
                '0 0 5px rgba(0, 255, 65, 0.3)',
                '0 0 8px rgba(0, 255, 65, 0.5)',
                '0 0 5px rgba(0, 255, 65, 0.3)',
              ],
            }
          : undefined
      }
      transition={pulse ? { duration: 2, repeat: Infinity } : undefined}
    >
      {children}
    </motion.span>
  )
}
