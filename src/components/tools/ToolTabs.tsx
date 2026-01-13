import { motion } from 'framer-motion'
import { Tool } from '@/types/tool'
import { LucideIcon, icons } from 'lucide-react'

interface ToolTabsProps {
  tools: Tool[]
  activeTool: Tool
  onToolChange: (tool: Tool) => void
}

export const ToolTabs = ({ tools, activeTool, onToolChange }: ToolTabsProps) => {
  return (
    <div className="flex justify-center gap-4 md:gap-8 mb-8 border-b border-glass-border pb-1">
      {tools.map((tool, index) => {
        const IconComponent = icons[tool.icon as keyof typeof icons] as LucideIcon
        const isActive = activeTool.id === tool.id

        return (
          <motion.button
            key={tool.id}
            onClick={() => onToolChange(tool)}
            className={`tab-item relative px-6 py-3 md:px-8 md:py-4 rounded-t-lg font-medium transition-all duration-300 flex items-center gap-3 cursor-pointer
              ${isActive ? 'active' : 'text-text-muted hover:text-text-primary'}`}
            whileHover={{ y: isActive ? 0 : -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* 激活态发光 */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-glass-highlight rounded-t-lg opacity-50"
                layoutId="activeTab"
                initial={false}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* 图标 */}
            <motion.div
              className={`w-5 h-5 flex items-center justify-center rounded-lg transition-all duration-300
                ${isActive ? 'bg-gradient-to-br from-neon-green to-neon-blue' : 'bg-glass-bg'}`}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {IconComponent && (
                <IconComponent
                  className={`w-3 h-3 transition-colors duration-300 ${isActive ? 'text-white' : 'text-text-muted'}`}
                />
              )}
            </motion.div>

            {/* 标题 */}
            <span className="relative z-10 font-heading text-sm md:text-base">
              {tool.title.replace('工具', '')}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
