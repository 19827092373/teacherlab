import { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'pink' | 'blue' | 'green' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
  disabled?: boolean
  magnetic?: boolean // 磁性效果
  strength?: number // 磁性强度
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  disabled = false,
  magnetic = false,
  strength = 30,
  ...props
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const ref = href ? anchorRef : (buttonRef as any)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove =
    magnetic && !disabled
      ? (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
          if (!ref.current) return

          const rect = ref.current.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2

          const mouseX = e.clientX
          const mouseY = e.clientY

          const distX = mouseX - centerX
          const distY = mouseY - centerY

          const angle = Math.atan2(distY, distX)
          const distance = Math.min(Math.sqrt(distX ** 2 + distY ** 2), strength)

          const moveX = Math.cos(angle) * distance
          const moveY = Math.sin(angle) * distance

          x.set(moveX)
          y.set(moveY)
        }
      : undefined

  const handleMouseLeave = magnetic
    ? () => {
        x.set(0)
        y.set(0)
      }
    : undefined

  const baseStyles =
    'rounded-full font-semibold shadow-xl cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2'

  const variants = {
    primary:
      'bg-gradient-to-r from-neon-green to-neon-blue text-white border border-neon-green/30 shadow-[0_0_8px_rgba(0,255,65,0.3)]',
    secondary:
      'glass-button border-glass-border text-text-primary hover:border-neon-green/50 hover:bg-glass-highlight hover:shadow-[0_0_8px_rgba(0,255,65,0.2)]',
    pink: 'bg-gradient-to-r from-neon-pink to-neon-pink-dim text-white shadow-[0_0_8px_rgba(255,0,255,0.3)]',
    blue: 'bg-gradient-to-r from-neon-blue to-neon-blue-dim text-white shadow-[0_0_8px_rgba(0,255,255,0.3)]',
    green:
      'bg-gradient-to-r from-neon-green to-neon-green-dim text-white shadow-[0_0_8px_rgba(0,255,65,0.3)]',
    purple:
      'bg-gradient-to-r from-neon-purple to-neon-purple-dim text-white shadow-[0_0_8px_rgba(123,97,255,0.3)]',
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''

  const Component = href ? motion.a : motion.button

  return (
    <Component
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabledStyles}`}
      style={magnetic ? { x: springX, y: springY } : undefined}
      whileHover={
        disabled
          ? undefined
          : magnetic
            ? { scale: 1.03 }
            : {
                y: -2,
                boxShadow:
                  variant === 'secondary'
                    ? '0 8px 20px -5px rgba(0, 255, 65, 0.15)'
                    : '0 0 8px rgba(0, 255, 65, 0.5), 0 0 12px rgba(0, 255, 255, 0.3)',
              }
      }
      whileTap={disabled ? undefined : { scale: 0.97 }}
      onClick={onClick}
      href={href}
      target={href ? '_blank' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  )
}
