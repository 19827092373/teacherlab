import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

export const LoadingBar = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start({
        width: '100%',
        transition: { duration: 1, ease: 'easeInOut' },
      })
      setTimeout(() => {
        controls.start({
          opacity: 0,
          transition: { duration: 0.3 },
        })
      }, 1500)
    }
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple z-[9999]"
      style={{ boxShadow: '0 0 8px rgba(0, 255, 65, 0.4)' }}
      initial={{ width: 0, opacity: 1 }}
      animate={controls}
    />
  )
}
