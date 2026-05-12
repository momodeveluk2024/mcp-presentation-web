import { motion } from 'framer-motion'
import { SlideWrapper } from '../components/SlideWrapper'
import { useState, useEffect } from 'react'

interface SlideProps {
  direction: number
}

const problems = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Manual Updates',
    description: 'Content teams spend hours updating each platform separately',
    stat: '4+ hours',
    statLabel: 'per update cycle',
    color: '#ef4444',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: 'Fragmented Tools',
    description: 'Different interfaces for CMS, analytics, and deployment',
    stat: '5-10',
    statLabel: 'tools to manage',
    color: '#f59e0b',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Slow Iteration',
    description: 'Changes take days instead of minutes to go live',
    stat: '72hrs',
    statLabel: 'average deploy time',
    color: '#8b5cf6',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: 'Error Prone',
    description: 'Human errors in copy-paste workflows cause issues',
    stat: '23%',
    statLabel: 'error rate',
    color: '#0ea5e9',
  },
]

// Animated frustration visualization
const FrustrationVisual = ({ active }: { active: boolean }) => (
  <motion.div
    animate={{ scale: active ? [1, 1.05, 1] : 1 }}
    transition={{ duration: 2, repeat: Infinity }}
    style={{
      position: 'relative',
      width: 280,
      height: 280,
    }}
  >
    {/* Outer ring with stress */}
    <motion.div
      animate={{ 
        rotate: 360,
        borderColor: active ? ['#ef444440', '#f59e0b40', '#ef444440'] : '#e2e8f0',
      }}
      transition={{ 
        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        borderColor: { duration: 3, repeat: Infinity },
      }}
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        border: '3px dashed #ef444440',
      }}
    />
    
    {/* Inner stressed circle */}
    <motion.div
      animate={{
        boxShadow: active 
          ? ['0 0 30px rgba(239, 68, 68, 0.2)', '0 0 50px rgba(239, 68, 68, 0.4)', '0 0 30px rgba(239, 68, 68, 0.2)']
          : '0 0 20px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{
        position: 'absolute',
        inset: 40,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.1))',
        border: '2px solid rgba(239, 68, 68, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* Developer illustration */}
      <motion.div
        animate={active ? { y: [0, -3, 0] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{ fontSize: 48 }}
      >
        😫
      </motion.div>
      <span style={{ 
        fontSize: 14, 
        color: '#64748b',
        fontWeight: 500,
      }}>
        Developer
      </span>
    </motion.div>
    
    {/* Orbiting problem icons */}
    {[0, 90, 180, 270].map((angle, i) => (
      <motion.div
        key={angle}
        animate={{ rotate: [angle, angle + 360] }}
        transition={{ duration: 15 + i * 2, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        <motion.div
          animate={{ rotate: [-angle, -(angle + 360)] }}
          transition={{ duration: 15 + i * 2, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}
        >
          {['📝', '⚙️', '🐛', '⏰'][i]}
        </motion.div>
      </motion.div>
    ))}
  </motion.div>
)

// Problem card component
const ProblemCard = ({
  problem,
  index,
  isActive,
  onClick,
}: {
  problem: typeof problems[0]
  index: number
  isActive: boolean
  onClick: () => void
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 + index * 0.15 }}
    whileHover={{ y: -6, scale: 1.02 }}
    onClick={onClick}
    style={{
      background: isActive 
        ? `linear-gradient(135deg, ${problem.color}15, ${problem.color}05)`
        : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: 20,
      padding: 24,
      border: `2px solid ${isActive ? problem.color : '#e2e8f020'}`,
      boxShadow: isActive 
        ? `0 20px 40px ${problem.color}20`
        : '0 8px 30px rgba(0, 0, 0, 0.08)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      flex: '1 1 280px',
      maxWidth: 320,
    }}
  >
    {/* Icon */}
    <motion.div
      animate={{ 
        scale: isActive ? [1, 1.1, 1] : 1,
        rotate: isActive ? [0, 5, -5, 0] : 0,
      }}
      transition={{ duration: 0.5 }}
      style={{
        width: 64,
        height: 64,
        borderRadius: 16,
        background: `linear-gradient(135deg, ${problem.color}20, ${problem.color}10)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: problem.color,
      }}
    >
      {problem.icon}
    </motion.div>
    
    {/* Title */}
    <h3 style={{
      fontSize: 22,
      fontWeight: 700,
      color: '#1e293b',
      margin: 0,
    }}>
      {problem.title}
    </h3>
    
    {/* Description */}
    <p style={{
      fontSize: 15,
      color: '#64748b',
      margin: 0,
      lineHeight: 1.5,
    }}>
      {problem.description}
    </p>
    
    {/* Stat */}
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginTop: 'auto',
    }}>
      <motion.span
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: problem.color,
        }}
      >
        {problem.stat}
      </motion.span>
      <span style={{
        fontSize: 13,
        color: '#94a3b8',
        fontWeight: 500,
      }}>
        {problem.statLabel}
      </span>
    </div>
    
    {/* Active indicator */}
    {isActive && (
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{
          height: 4,
          background: `linear-gradient(90deg, ${problem.color}, ${problem.color}80)`,
          borderRadius: 2,
          transformOrigin: 'left',
        }}
      />
    )}
  </motion.div>
)

// Terminal showing manual process
const ManualProcessTerminal = ({ phase }: { phase: number }) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5 }}
    style={{
      width: 340,
      background: 'rgba(15, 23, 42, 0.95)',
      borderRadius: 16,
      border: '1px solid rgba(239, 68, 68, 0.3)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden',
    }}
  >
    {/* Header */}
    <div style={{
      background: 'rgba(30, 41, 59, 0.9)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
    }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
      <span style={{ marginLeft: 10, color: '#ef4444', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
        manual-update.log
      </span>
    </div>
    
    {/* Content */}
    <div style={{ 
      padding: '16px 20px', 
      fontFamily: "'JetBrains Mono', monospace", 
      fontSize: 12,
      color: '#94a3b8',
    }}>
      {phase >= 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 8 }}>
          <span style={{ color: '#ef4444' }}>❯</span> Login to CMS...
        </motion.div>
      )}
      {phase >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 8 }}>
          <span style={{ color: '#f59e0b' }}>❯</span> Find content to update...
        </motion.div>
      )}
      {phase >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 8 }}>
          <span style={{ color: '#f59e0b' }}>❯</span> Copy from document...
        </motion.div>
      )}
      {phase >= 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 8 }}>
          <span style={{ color: '#ef4444' }}>❯</span> Paste into CMS...
        </motion.div>
      )}
      {phase >= 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 8 }}>
          <span style={{ color: '#f59e0b' }}>❯</span> Preview changes...
        </motion.div>
      )}
      {phase >= 5 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 8 }}>
          <span style={{ color: '#22c55e' }}>❯</span> Publish...
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ marginLeft: 8, color: '#f59e0b' }}
          >
            ⏳ waiting...
          </motion.span>
        </motion.div>
      )}
      {phase >= 6 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ef4444' }}>
          <span style={{ color: '#ef4444' }}>✗</span> Error: Manual process is slow!
        </motion.div>
      )}
    </div>
    
    {/* Time counter */}
    <motion.div
      animate={{ opacity: phase > 0 ? 1 : 0 }}
      style={{
        background: 'rgba(239, 68, 68, 0.1)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(239, 68, 68, 0.2)',
      }}
    >
      <span style={{ fontSize: 11, color: '#94a3b8' }}>Time elapsed:</span>
      <motion.span
        animate={{ 
          color: phase > 4 ? '#ef4444' : '#f59e0b',
        }}
        style={{ fontSize: 14, fontWeight: 700 }}
      >
        {['0:00', '2:15', '5:30', '12:45', '18:20', '25:00', '45:00+'][Math.min(phase, 6)]}
      </motion.span>
    </motion.div>
  </motion.div>
)

export function Slide03Problem({ direction }: SlideProps) {
  const [activeCard, setActiveCard] = useState(0)
  const [terminalPhase, setTerminalPhase] = useState(-1)

  useEffect(() => {
    // Auto cycle through cards
    const cardInterval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % problems.length)
    }, 4000)

    // Terminal animation
    const terminalInterval = setInterval(() => {
      setTerminalPhase(prev => (prev + 1) % 8)
    }, 1500)

    return () => {
      clearInterval(cardInterval)
      clearInterval(terminalInterval)
    }
  }, [])

  return (
    <SlideWrapper direction={direction}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        padding: '50px 40px',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              width: 80,
              height: 5,
              background: 'linear-gradient(90deg, #ef4444, #f59e0b)',
              borderRadius: 3,
              marginBottom: 24,
            }}
          />
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700,
            color: '#0f172a',
            textAlign: 'center',
            marginBottom: 12,
          }}>
            The Problem <span style={{ color: '#ef4444' }}>Today</span>
          </h1>
          <p style={{
            fontSize: 20,
            color: '#64748b',
            textAlign: 'center',
          }}>
            Why content management needs a revolution
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div style={{
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 40,
          maxWidth: 1400,
        }}>
          {problems.map((problem, i) => (
            <ProblemCard
              key={problem.title}
              problem={problem}
              index={i}
              isActive={activeCard === i}
              onClick={() => setActiveCard(i)}
            />
          ))}
        </div>

        {/* Bottom section with visual and terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            display: 'flex',
            gap: 60,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 1000,
          }}
        >
          <FrustrationVisual active={true} />
          <ManualProcessTerminal phase={terminalPhase} />
        </motion.div>
      </div>
    </SlideWrapper>
  )
}
