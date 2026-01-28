import { motion } from 'framer-motion'
import { Tool } from '@/types'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { StatsOverview } from './components/stats/StatsOverview'
import { ToolCardSmall } from './components/tools/ToolCardSmall'
import { ToolModal } from './components/tools/ToolModal'
import { tools } from './data/tools'
import { LoadingBar } from './components/effects/LoadingBar'
import { FloatingShapes } from './components/effects/FloatingShapes'
import { Container } from './components/layout/Container'
import { useState } from 'react'
import './styles/index.css'

function App() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (tool: Tool) => {
    setSelectedTool(tool)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedTool(null), 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary grid-bg-animated py-6 px-3 md:px-8 overflow-x-hidden relative">
      <LoadingBar />
      <FloatingShapes />

      <Container>
        <Header />

        <StatsOverview />

        <div className="mt-8 md:mt-12">
          <motion.h2
            className="text-2xl md:text-4xl font-display font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-text-primary via-neon-blue to-neon-green bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            工具总览
          </motion.h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 md:gap-6">
            {tools.map((tool, index) => (
              <ToolCardSmall
                key={tool.id}
                tool={tool}
                index={index}
                onShowDetail={() => handleCardClick(tool)}
              />

            ))}
          </div>
        </div>

        <Footer />
      </Container>

      <ToolModal tool={selectedTool} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default App
