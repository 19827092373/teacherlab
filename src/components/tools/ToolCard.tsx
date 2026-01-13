import { Tool } from '@/types'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ToolIcon } from './ToolIcon'
import { ToolTags } from './ToolTags'
import { ToolScenario } from './ToolScenario'
import { ToolFeatures } from './ToolFeatures'
import { ToolSteps } from './ToolSteps'

interface ToolCardProps {
  tool: Tool
  index: number
}

export const ToolCard = ({ tool, index }: ToolCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="h-full"
    >
      <Card
        className="relative h-full flex flex-col min-h-[700px] overflow-visible"
        hoverShadow={tool.hoverShadow}
      >
        {/* NEW Badge */}
        {tool.isNew && (
          <motion.div
            className="absolute top-4 right-4 z-10"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Badge variant="success" pulse>
              NEW
            </Badge>
          </motion.div>
        )}

        {/* Top Gradient Bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${tool.gradient} origin-left transition-transform duration-300`}
        />

        {/* Icon */}
        <div className="mb-6">
          <ToolIcon icon={tool.icon} gradient={tool.gradient} />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-text-primary via-neon-blue to-neon-green bg-clip-text text-transparent mb-4">
          {tool.title}
        </h2>

        {/* User Stats */}
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-4 px-4 py-3 glass-button rounded-xl w-fit">
          <span>👥</span>
          <span>已有 {tool.userCount} 教师使用</span>
        </div>

        {/* Tags */}
        <ToolTags tags={tool.tags} borderColor={tool.borderColor} />

        {/* Scenario */}
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

        {/* Features */}
        <ToolFeatures features={tool.features} />

        {/* Steps */}
        <ToolSteps steps={tool.steps} />

        {/* Button */}
        <div className="mt-auto">
          <Button
            variant={
              tool.borderColor === 'border-emerald-200'
                ? 'primary'
                : tool.borderColor === 'border-teal-200'
                  ? 'blue'
                  : 'purple'
            }
            href={tool.link}
            className="w-full"
          >
            立即使用 →
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
