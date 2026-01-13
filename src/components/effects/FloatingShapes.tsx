import { motion } from 'framer-motion'

export const FloatingShapes = () => {
  const shapes = [
    { size: 120, color: 'bg-neon-green', top: '5%', left: '10%' },
    { size: 80, color: 'bg-neon-blue', top: '60%', left: '5%' },
    { size: 150, color: 'bg-neon-purple', top: '40%', right: '5%' },
    { size: 60, color: 'bg-neon-pink', top: '15%', right: '15%' },
    { size: 100, color: 'bg-neon-green', top: '70%', right: '20%' },
  ]

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${shape.color} blur-xl opacity-8`}
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left || 'auto',
            right: shape.right || 'auto',
          }}
          animate={{
            y: [0, -40, 40, 0],
            x: [0, 20, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 20 + index * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.8,
          }}
        />
      ))}
    </div>
  )
}
