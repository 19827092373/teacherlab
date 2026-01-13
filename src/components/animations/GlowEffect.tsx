import { motion } from 'framer-motion'

interface GlowEffectProps {
  className?: string
  children: React.ReactNode
  color?: 'blue' | 'purple' | 'pink' | 'green'
}

export const GlowEffect = ({ className = '', children, color = 'blue' }: GlowEffectProps) => {
  const colorShadows = {
    blue: [
      '0 0 0px rgba(0, 255, 255, 0)',
      '0 0 20px rgba(0, 255, 255, 0.5)',
      '0 0 40px rgba(0, 255, 255, 0.3)',
    ],
    purple: [
      '0 0 0px rgba(123, 97, 255, 0)',
      '0 0 20px rgba(123, 97, 255, 0.5)',
      '0 0 40px rgba(123, 97, 255, 0.3)',
    ],
    pink: [
      '0 0 0px rgba(255, 0, 255, 0)',
      '0 0 20px rgba(255, 0, 255, 0.5)',
      '0 0 40px rgba(255, 0, 255, 0.3)',
    ],
    green: [
      '0 0 0px rgba(0, 255, 65, 0)',
      '0 0 20px rgba(0, 255, 65, 0.5)',
      '0 0 40px rgba(0, 255, 65, 0.3)',
    ],
  }

  return (
    <motion.div className={`relative ${className}`} whileHover="hover">
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
        whileHover={{
          boxShadow: colorShadows[color],
        }}
      />
      {children}
    </motion.div>
  )
}
