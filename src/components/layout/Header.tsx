import { motion } from 'framer-motion'
import { contact } from '@/data/contact'

export const Header = () => {
  return (
    <motion.header
      className="text-center mb-8 md:mb-16 py-8 md:py-12"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="inline-block relative"
      >
        <motion.div
          className="absolute -inset-3 md:-inset-4 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple rounded-3xl blur-2xl opacity-15"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <h1 className="relative text-4xl md:text-8xl font-display font-bold bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple bg-clip-text text-transparent mb-3 md:mb-4 tracking-tight neon-text-glow-subtle">
          教师实验室
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-2xl text-text-secondary font-medium mb-6 md:mb-8"
      >
        让教学更高效
      </motion.p>

      <motion.div
        className="inline-flex items-center gap-2 md:gap-3 glass-button px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg cursor-pointer"
        whileHover={{
          scale: 1.03,
          y: -2,
          boxShadow: '0 0 8px rgba(0, 255, 65, 0.3)',
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-neon-green to-neon-blue flex items-center justify-center text-white text-base md:text-lg neon-glow-subtle">
          👥
        </div>
        <span className="text-sm md:text-base text-text-primary font-semibold">开发者：{contact.developer}</span>
      </motion.div>
    </motion.header>
  )
}
