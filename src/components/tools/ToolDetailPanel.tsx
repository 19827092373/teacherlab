import { motion, AnimatePresence } from 'framer-motion'
import { Tool } from '@/types'
import { ToolFeatures } from './ToolFeatures'
import { ToolScenario } from './ToolScenario'
import { ToolSteps } from './ToolSteps'
import { useState } from 'react'

interface ToolDetailPanelProps {
  tool: Tool
  isExpanded: boolean
}

type DetailTab = 'features' | 'scenario' | 'steps'

export const ToolDetailPanel = ({ tool, isExpanded }: ToolDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('features')

  const tabs = [
    { id: 'features' as DetailTab, label: '功能介绍', icon: '✨' },
    { id: 'scenario' as DetailTab, label: '使用场景', icon: '💡' },
    { id: 'steps' as DetailTab, label: '使用步骤', icon: '📋' },
  ]

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-2xl mx-auto mt-8"
        >
          <motion.div
            className="glass-card-glow p-6 md:p-8 rounded-3xl"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex gap-2 mb-6 border-b border-glass-border pb-4">
              {tabs.map(tab => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-item relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300
                    ${
                      activeTab === tab.id
                        ? 'text-text-primary'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </span>

                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-glass-highlight rounded-lg border border-glass-border"
                      layoutId="detailTab"
                      initial={false}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
