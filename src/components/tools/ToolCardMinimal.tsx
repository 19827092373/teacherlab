import { motion } from 'framer-motion'
import { Tool } from '@/types/tool'
import { Button } from '@/components/ui/Button'
import { LucideIcon, icons } from 'lucide-react'
import { useState } from 'react'

interface ToolCardMinimalProps {
  tool: Tool
  isExpanded: boolean
  onExpand: () => void
}

export const ToolCardMinimal = ({ tool, isExpanded, onExpand }: ToolCardMinimalProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const IconComponent = icons[tool.icon as keyof typeof icons] as LucideIcon

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 主卡片 */}
      <motion.div
        className="glass-card-glow p-8 md:p-12 rounded-3xl relative overflow-hidden cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        onClick={() => !isExpanded && onExpand()}
      >
        {/* 背景发光 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-neon-blue/5 rounded-3xl"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        />

        {/* 内容容器 */}
        <div className="relative z-10">
          {/* 顶部：图标 + 标题 + 统计 */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            {/* 大图标 */}
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br from-neon-green to-neon-blue relative overflow-hidden border border-white/20"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              {/* 内部发光层 */}
              <motion.div
                className="absolute inset-0 bg-white/20 blur-xl"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {IconComponent && (
                <IconComponent className="w-10 h-10 md:w-12 md:h-12 relative z-10 text-white" />
              )}
            </motion.div>

            {/* 标题和统计 */}
            <div className="flex-1">
              <motion.h2
                className="text-3xl md:text-4xl font-heading font-bold mb-3 bg-gradient-to-r from-text-primary via-neon-blue to-neon-green bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {tool.title}
              </motion.h2>

              {/* 用户统计 */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 glass-button rounded-xl text-sm text-text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span>👥</span>
                <span>已有 {tool.userCount} 教师使用</span>
              </motion.div>
            </div>
          </div>

          {/* 简短描述 */}
          <motion.p
            className="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {tool.description}
          </motion.p>

          {/* CTA 按钮组 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" href={tool.link} className="flex-1 text-lg" size="lg">
              立即使用 →
            </Button>

            {!isExpanded && (
              <motion.button
                onClick={onExpand}
                className="glass-button px-6 py-4 rounded-full text-text-primary font-medium transition-all duration-300 hover:bg-glass-highlight hover:text-neon-green flex items-center gap-2"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>查看详情</span>
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↓
                </motion.span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
