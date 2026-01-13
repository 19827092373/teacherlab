import { LucideIcon, icons } from 'lucide-react'
import { motion } from 'framer-motion'

interface ToolIconProps {
  icon: string // 图标名称，如 'FileText'
  gradient: string // 渐变类
}

export const ToolIcon = ({ icon, gradient }: ToolIconProps) => {
  // 动态获取 Lucide 图标
  const IconComponent = icons[icon as keyof typeof icons] as LucideIcon

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in lucide-react`)
    return null
  }

  return (
    <motion.div
      className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient} text-white shadow-2xl relative overflow-hidden border border-white/20`}
      whileHover={{
        rotate: 360,
        scale: 1.1,
        boxShadow: '0 0 40px rgba(0, 255, 65, 0.6), 0 20px 60px -10px rgba(0, 0, 0, 0.4)',
      }}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      {/* 内部发光层 */}
      <motion.div
        className="absolute inset-0 bg-white/20 blur-xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <IconComponent className="w-10 h-10 relative z-10" />
    </motion.div>
  )
}
