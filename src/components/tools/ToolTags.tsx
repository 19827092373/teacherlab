import { motion } from 'framer-motion'

interface ToolTagsProps {
  tags: string[]
  borderColor?: string
}

export const ToolTags = ({ tags, borderColor = 'border-emerald-200' }: ToolTagsProps) => {
  const getHoverColor = () => {
    if (borderColor === 'border-emerald-200')
      return { bg: 'rgba(0, 255, 65, 0.1)', border: 'rgba(0, 255, 65, 0.3)', text: '#00ff41' }
    if (borderColor === 'border-teal-200')
      return { bg: 'rgba(0, 255, 255, 0.1)', border: 'rgba(0, 255, 255, 0.3)', text: '#00ffff' }
    return { bg: 'rgba(123, 97, 255, 0.1)', border: 'rgba(123, 97, 255, 0.3)', text: '#7b61ff' }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag, index) => (
        <motion.span
          key={index}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border-glass-border text-text-secondary glass-button backdrop-blur-sm shadow-sm`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{
            scale: 1.05,
            y: -2,
            backgroundColor: getHoverColor().bg,
            borderColor: getHoverColor().border,
            color: getHoverColor().text,
          }}
        >
          {tag}
        </motion.span>
      ))}
    </div>
  )
}
