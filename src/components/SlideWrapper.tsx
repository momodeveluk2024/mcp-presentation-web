import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface SlideWrapperProps {
  children: ReactNode
  direction: number
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
}

export function SlideWrapper({ children, direction }: SlideWrapperProps) {
  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className="gradient-bg"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 60px',
        overflow: 'hidden',
      }}
    >
      {/* Floating orbs for depth */}
      <div
        className="floating-orb"
        style={{
          width: 400,
          height: 400,
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          left: '10%',
          top: '20%',
          animationDelay: '0s',
        }}
      />
      <div
        className="floating-orb"
        style={{
          width: 300,
          height: 300,
          background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
          right: '15%',
          bottom: '20%',
          animationDelay: '-4s',
        }}
      />
      <div
        className="floating-orb"
        style={{
          width: 200,
          height: 200,
          background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
          right: '30%',
          top: '10%',
          animationDelay: '-2s',
        }}
      />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </div>
    </motion.div>
  )
}

// Glass card component
interface GlassCardProps {
  children: ReactNode
  style?: React.CSSProperties
  className?: string
}

export function GlassCard({ children, style, className }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        padding: 32,
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}
