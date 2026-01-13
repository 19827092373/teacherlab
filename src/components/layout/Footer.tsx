import { contact } from '@/data/contact'
import { motion } from 'framer-motion'

export const Footer = () => {
  return (
    <motion.footer
      className="text-center text-text-muted py-12 mt-20 text-base leading-relaxed relative z-50 border-t border-glass-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {/* 霓虹渐变分隔线 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-30" />

      <p className="font-medium text-text-primary">{contact.copyright}</p>

      <p className="mt-4">
        <a
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neon-green hover:text-neon-blue transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(0,255,65,0.5)] font-medium cursor-pointer"
        >
          {contact.icp}
        </a>
      </p>

      <p className="mt-3 text-sm text-text-dim">
        不良信息举报邮箱：
        <a
          href={`mailto:${contact.email}`}
          className="text-neon-green hover:text-neon-blue transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(0,255,65,0.5)] cursor-pointer"
        >
          {contact.email}
        </a>
      </p>
    </motion.footer>
  )
}
