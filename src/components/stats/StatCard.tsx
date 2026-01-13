import { Stat } from '@/types/stats'
import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'

interface StatCardProps {
  stat: Stat
  index: number
}

export const StatCard = ({ stat, index }: StatCardProps) => {
  const count = useCountUp(stat.number, 2000)

  const gradients = [
    'from-neon-green to-neon-blue',
    'from-neon-blue to-neon-purple',
    'from-neon-purple to-neon-pink',
  ]

  return (
    <motion.div
      className="text-center py-6 md:py-8 px-4 md:px-5 glass-card-glow rounded-3xl border-glass-border shadow-xl cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{
        y: -6,
        scale: 1.01,
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 255, 65, 0.15)',
      }}
    >
      <motion.div
        className="inline-block mb-2 md:mb-3"
        whileHover={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <span
          className={`inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xl md:text-2xl bg-gradient-to-r ${gradients[index]} bg-clip-text text-transparent font-bold`}
        >
          {stat.icon}
        </span>
      </motion.div>
      <motion.span className="block text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple bg-clip-text text-transparent mb-1.5 md:mb-2 neon-text-glow-subtle">
        {count.toLocaleString()}
        {stat.suffix}
      </motion.span>
      <span className="text-sm md:text-base text-text-secondary font-medium tracking-wide">{stat.label}</span>
    </motion.div>
  )
}
