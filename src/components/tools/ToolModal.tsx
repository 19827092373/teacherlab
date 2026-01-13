import { motion, AnimatePresence } from 'framer-motion'
import { Tool } from '@/types'
import { X, LucideIcon, icons } from 'lucide-react'
import { ToolFeatures } from './ToolFeatures'
import { ToolScenario } from './ToolScenario'
import { ToolSteps } from './ToolSteps'
import { Button } from '@/components/ui/Button'
import { useState, useEffect } from 'react'

interface ToolModalProps {
  tool: Tool | null
  isOpen: boolean
  onClose: () => void
}

type DetailTab = 'features' | 'scenario' | 'steps'

export const ToolModal = ({ tool, isOpen, onClose }: ToolModalProps) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('features')

  // ESC 键关闭模态框
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // 阻止页面滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!tool) return null

  // 动态获取 Lucide 图标
  const IconComponent = icons[tool.icon as keyof typeof icons] as LucideIcon

  const tabs = [
    { id: 'features' as DetailTab, label: '功能介绍', icon: '✨' },
    { id: 'scenario' as DetailTab, label: '使用场景', icon: '💡' },
    { id: 'steps' as DetailTab, label: '使用步骤', icon: '📋' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-bg-primary/90 backdrop-blur-xl z-[9998]"
            onClick={onClose}
          />

          {/* 模态框内容 */}
          <motion.div
            className="fixed inset-0 z-[9999] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="min-h-full flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ scale: 0.95, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 50 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full max-w-4xl mx-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* 卡片 */}
                <motion.div
                  className="glass-card-glow p-8 md:p-12 rounded-3xl relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* 背景发光 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-neon-blue/5 to-neon-purple/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  />

                  {/* 关闭按钮 */}
                  <motion.button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full glass-button border-glass-border flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-glass-highlight transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  {/* 内容 */}
                  <div className="relative z-10">
                    {/* 头部：图标 + 标题 */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                      {/* 大图标 */}
                      <motion.div
                        className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br from-neon-green to-neon-blue relative overflow-hidden border border-white/20"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, type: 'spring' }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20 blur-xl"
                          animate={{ opacity: [0.3, 0.5, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        {/* 动态图标 */}
                        {IconComponent && <IconComponent className="w-12 h-12 md:w-14 md:h-14 text-white relative z-10" />}
                      </motion.div>

                      {/* 标题和统计 */}
                      <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 bg-gradient-to-r from-text-primary via-neon-blue to-neon-green bg-clip-text text-transparent neon-text-glow-subtle">
                          {tool.title}
                        </h2>
                        <motion.div
                          className="inline-flex items-center gap-2 px-4 py-2 glass-button rounded-xl text-sm text-text-secondary"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <span>👥</span>
                          <span>已有 {tool.userCount} 教师使用</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* 描述 */}
                    <motion.p
                      className="text-lg text-text-secondary mb-8 leading-relaxed max-w-3xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {tool.description}
                    </motion.p>

                    {/* 子标签页 */}
                    <div className="flex gap-3 mb-8 border-b border-glass-border pb-4 overflow-x-auto">
                      {tabs.map(tab => (
                        <motion.button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`tab-item relative px-5 py-3 rounded-xl font-medium text-base flex items-center gap-2 transition-all duration-300 whitespace-nowrap
                            ${
                              activeTab === tab.id
                                ? 'active text-text-primary'
                                : 'text-text-muted hover:text-text-primary'
                            }`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{tab.icon}</span>
                          <span>{tab.label}</span>

                          {/* 激活态发光 */}
                          {activeTab === tab.id && (
                            <motion.div
                              className="absolute inset-0 bg-glass-highlight rounded-xl opacity-50"
                              layoutId="detailTab"
                              initial={false}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* 标签内容 */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {activeTab === 'features' && <ToolFeatures features={tool.features} />}

                        {activeTab === 'scenario' && (
                          <ToolScenario
                            scenario={tool.scenario}
                            borderColor={tool.borderColor}
                            titleColor={
                              tool.borderColor === 'border-emerald-200'
                                ? 'text-neon-green'
                                : tool.borderColor === 'border-teal-200'
                                  ? 'text-neon-blue'
                                  : 'text-neon-purple'
                            }
                          />
                        )}

                        {activeTab === 'steps' && <ToolSteps steps={tool.steps} />}
                      </motion.div>
                    </AnimatePresence>

                    {/* 底部按钮 */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-glass-border"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button
                        variant="primary"
                        href={tool.link}
                        className="flex-1 text-lg"
                        size="lg"
                      >
                        立即使用 →
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={onClose}
                        className="flex-1 text-lg"
                        size="lg"
                      >
                        关闭详情
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
