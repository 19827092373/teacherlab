import { Step } from '@/types/tool'
import { motion } from 'framer-motion'

interface ToolStepsProps {
  steps: Step[]
}

export const ToolSteps = ({ steps }: ToolStepsProps) => {
  return (
    <div className="p-5 rounded-2xl glass-button backdrop-blur-sm border-glass-border mb-5">
      <h3 className="text-sm font-heading font-bold text-text-primary mb-3 flex items-center gap-2">
        <motion.span
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        >
          📋
        </motion.span>
        <span>快速上手</span>
      </h3>
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="flex items-start gap-3 mb-2.5 last:mb-0"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.span
            className="bg-gradient-to-br from-neon-green to-neon-blue text-white font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs shadow-lg shadow-neon-green/30 border border-white/20"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {step.number}
          </motion.span>
          <span className="text-sm text-text-secondary leading-relaxed pt-0.5 font-medium">
            {step.content}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
