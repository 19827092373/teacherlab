import { motion } from 'framer-motion'
import { Tool } from '@/types'
import { LucideIcon, icons } from 'lucide-react'

interface ToolCardSmallProps {
  tool: Tool
  index: number
  onShowDetail: () => void
}

export const ToolCardSmall = ({ tool, index, onShowDetail }: ToolCardSmallProps) => {
  // 动态获取 Lucide 图标
  const IconComponent = icons[tool.icon as keyof typeof icons] as LucideIcon

  const handleCardClick = () => {
    if (tool.variants && tool.variants.length > 0) {
      onShowDetail()
    } else {
      window.open(tool.link, '_blank')
    }
  }

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onShowDetail()
  }

  return (
    <motion.div
      className="glass-card p-6 rounded-2xl cursor-pointer relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{
        y: -6,
        borderColor: 'rgba(0, 255, 65, 0.5)',
        boxShadow: '0 0 40px rgba(0, 255, 65, 0.3)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
    >

      {/* 悬停发光效果 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-neon-blue/5 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* 内容 */}
      <div className="relative z-10">
        {/* 图标 */}
        <motion.div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-blue/20 border border-neon-green/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {IconComponent && <IconComponent className="w-7 h-7 text-neon-green" />}
        </motion.div>

        {/* 标题 */}
        <h3 className="text-xl font-heading font-bold text-text-primary mb-2 leading-tight group-hover:text-neon-green transition-colors duration-300">
          {tool.title.replace('工具', '')}
        </h3>

        {/* 简短描述 */}
        <p className="text-sm text-text-muted line-clamp-2 leading-relaxed mb-4">
          {tool.description}
        </p>

        {/* 用户统计 */}
        <motion.div
          className="flex items-center gap-2 text-xs text-text-secondary px-3 py-1.5 glass-button rounded-lg w-fit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span>👥</span>
          <span>{tool.userCount} 使用</span>
        </motion.div>

        {/* 查看详情按钮 - 按钮样式 */}
        <motion.button
          className="mt-6 w-full py-2.5 rounded-xl border border-neon-green/30 bg-neon-green/5 text-neon-green text-sm font-bold flex items-center justify-center gap-2 hover:bg-neon-green/10 transition-colors z-20 relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDetailClick}
        >
          查看详情
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          >
            →
          </motion.span>
        </motion.button>
      </div>


      {/* BETA 标签 */}
      {tool.isBeta && (
        <motion.div
          className="absolute top-3 right-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.span
            className="inline-block px-2 py-0.5 rounded-md text-xs font-bold bg-gradient-to-r from-slate-600 to-slate-700 text-white"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            BETA
          </motion.span>
        </motion.div>
      )}

      {/* NEW 标签 */}
      {tool.isNew && !tool.isBeta && (
        <motion.div
          className="absolute top-3 right-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.span
            className="inline-block px-2 py-0.5 rounded-md text-xs font-bold bg-gradient-to-r from-neon-green to-neon-blue text-white"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            NEW
          </motion.span>
        </motion.div>
      )}

      {/* HOT 标签 */}
      {tool.isHot && !tool.isNew && !tool.isBeta && (
        <motion.div
          className="absolute top-3 right-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.span
            className="inline-block px-2 py-0.5 rounded-md text-xs font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔥 HOT
          </motion.span>
        </motion.div>
      )}

      {/* RECOMMENDED 标签 */}
      {tool.isRecommended && !tool.isNew && !tool.isHot && !tool.isBeta && (
        <motion.div
          className="absolute top-3 right-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.span
            className="inline-block px-2 py-0.5 rounded-md text-xs font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⭐ 推荐
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  )
}
