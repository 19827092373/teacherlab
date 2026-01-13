import { motion } from 'framer-motion'

interface ToolScenarioProps {
  scenario: {
    title: string
    content: string
  }
  borderColor?: string
  titleColor?: string
}

export const ToolScenario = ({
  scenario,
  borderColor = 'border-emerald-200',
  titleColor = 'text-neon-green',
}: ToolScenarioProps) => {
  const getNeonColor = () => {
    if (borderColor === 'border-emerald-200') return '#00ff41'
    if (borderColor === 'border-teal-200') return '#00ffff'
    return '#7b61ff'
  }

  return (
    <motion.div
      className={`p-5 rounded-2xl mb-5 border-l-4 glass-button backdrop-blur-sm shadow-sm`}
      style={{ borderColor: getNeonColor() }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
      }}
    >
      <h3
        className={`text-sm font-bold uppercase tracking-wider mb-2 ${titleColor} neon-text-glow`}
      >
        {scenario.title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed">{scenario.content}</p>
    </motion.div>
  )
}
