import { Feature } from '@/types/tool'
import { LucideIcon, icons } from 'lucide-react'
import { motion } from 'framer-motion'

interface ToolFeaturesProps {
  features: Feature[]
}

export const ToolFeatures = ({ features }: ToolFeaturesProps) => {
  return (
    <div className="mb-5">
      <h3 className="text-base font-heading font-bold text-text-primary mb-3 flex items-center gap-2">
        <motion.span
          className="inline-block"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          ✨
        </motion.span>
        <span>核心功能</span>
      </h3>
      <div className="grid grid-cols-2 gap-2.5">
        {features.map((feature, index) => {
          // 动态获取 Lucide 图标
          const IconComponent = (icons[feature.icon as keyof typeof icons] ||
            icons.Sparkles) as LucideIcon

          return (
            <motion.div
              key={index}
              className="flex items-start gap-2 p-2.5 glass-button rounded-xl border-glass-border transition-all cursor-pointer"
              whileHover={{
                scale: 1.02,
                x: 4,
                backgroundColor: 'rgba(0, 255, 65, 0.05)',
                borderColor: 'rgba(0, 255, 65, 0.3)',
                boxShadow: '0 4px 20px -5px rgba(0, 255, 65, 0.2)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              {IconComponent && (
                <IconComponent className="w-5 h-5 text-neon-green mt-0.5 flex-shrink-0" />
              )}
              <span className="text-sm text-text-secondary leading-relaxed font-medium">
                {feature.text}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
