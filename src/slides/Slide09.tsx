import { motion, AnimatePresence } from 'framer-motion'
import { SlideWrapper } from '../components/SlideWrapper'
import { useState, useEffect } from 'react'

interface SlideProps {
  direction: number
}

// The Old Way - Manual Process
const OldWayDemo = ({ active }: { active: boolean }) => {
  const [step, setStep] = useState(0)
  
  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % 6)
    }, 2000)
    return () => clearInterval(interval)
  }, [active])

  const steps = [
    { icon: '👤', text: 'Manager writes request', color: '#64748b' },
    { icon: '📧', text: 'Emails developer', color: '#64748b' },
    { icon: '⏳', text: 'Waits 2-3 days...', color: '#ef4444' },
    { icon: '💻', text: 'Dev opens CMS', color: '#64748b' },
    { icon: '📝', text: 'Copy, paste, format', color: '#f59e0b' },
    { icon: '🚀', text: 'Finally publishes', color: '#22c55e' },
  ]

  return (
    <motion.div
      style={{
        background: 'rgba(239, 68, 68, 0.05)',
        borderRadius: 24,
        padding: 28,
        border: '2px solid rgba(239, 68, 68, 0.2)',
        width: 380,
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #ef4444, #f97316)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
        }}>
          ❌
        </div>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', margin: 0 }}>
            Without MCP
          </h3>
          <p style={{ fontSize: 13, color: '#ef4444', margin: 0, fontWeight: 600 }}>
            The Old Way
          </p>
        </div>
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {steps.map((s, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: step >= i ? 1 : 0.3,
              x: step >= i ? 0 : -10,
              scale: step === i ? 1.02 : 1,
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              background: step === i ? 'white' : 'rgba(255,255,255,0.5)',
              borderRadius: 12,
              border: step === i ? `2px solid ${s.color}` : '2px solid transparent',
              boxShadow: step === i ? '0 8px 20px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <span style={{ 
              fontSize: 14, 
              fontWeight: step === i ? 600 : 400,
              color: step === i ? '#1e293b' : '#64748b',
            }}>
              {s.text}
            </span>
            {step === i && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{
                  marginLeft: 'auto',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: s.color,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Time indicator */}
      <motion.div
        animate={{ backgroundColor: ['rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.1)'] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          marginTop: 20,
          padding: '16px 20px',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 14, color: '#64748b' }}>Total Time:</span>
        <span style={{ fontSize: 28, fontWeight: 800, color: '#ef4444' }}>2-3 Days</span>
      </motion.div>
    </motion.div>
  )
}

// The New Way - With MCP
const NewWayDemo = ({ active }: { active: boolean }) => {
  const [phase, setPhase] = useState(0)
  const [websiteText, setWebsiteText] = useState('Welcome')
  
  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      setPhase(prev => {
        const next = (prev + 1) % 4
        if (next === 2) setWebsiteText('AI-Powered Innovation')
        if (next === 0) setWebsiteText('Welcome')
        return next
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [active])

  return (
    <motion.div
      style={{
        background: 'rgba(16, 185, 129, 0.05)',
        borderRadius: 24,
        padding: 28,
        border: '2px solid rgba(16, 185, 129, 0.2)',
        width: 380,
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
      }}>
        <motion.div
          animate={{ rotate: phase > 0 ? 360 : 0 }}
          transition={{ duration: 2 }}
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #10b981, #0ea5e9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}
        >
          ✅
        </motion.div>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', margin: 0 }}>
            With MCP
          </h3>
          <p style={{ fontSize: 13, color: '#10b981', margin: 0, fontWeight: 600 }}>
            The New Way
          </p>
        </div>
      </div>

      {/* Visual Flow */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 16,
        padding: 20,
        background: 'white',
        borderRadius: 16,
        marginBottom: 16,
      }}>
        {/* User speaks */}
        <motion.div
          animate={{ 
            scale: phase === 0 ? [1, 1.05, 1] : 1,
            opacity: 1,
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 20px',
            background: phase === 0 ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#f1f5f9',
            borderRadius: 20,
            color: phase === 0 ? 'white' : '#64748b',
          }}
        >
          <span style={{ fontSize: 18 }}>💬</span>
          <span style={{ fontSize: 13, fontWeight: 500 }}>
            "Change title to AI-Powered"
          </span>
        </motion.div>

        {/* Arrow */}
        <motion.div
          animate={{ 
            scaleY: phase >= 1 ? 1 : 0,
            opacity: phase >= 1 ? 1 : 0.3,
          }}
          style={{
            width: 3,
            height: 30,
            background: 'linear-gradient(180deg, #6366f1, #0ea5e9)',
            borderRadius: 2,
          }}
        />

        {/* MCP processes */}
        <motion.div
          animate={{ 
            scale: phase === 1 ? [1, 1.1, 1] : 1,
            boxShadow: phase === 1 ? '0 0 30px rgba(99, 102, 241, 0.4)' : 'none',
          }}
          transition={{ duration: 0.5, repeat: phase === 1 ? Infinity : 0 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            borderRadius: 16,
            border: '2px solid rgba(99, 102, 241, 0.3)',
          }}
        >
          <motion.span
            animate={{ rotate: phase === 1 ? 360 : 0 }}
            transition={{ duration: 1, repeat: phase === 1 ? Infinity : 0, ease: 'linear' }}
            style={{ fontSize: 20 }}
          >
            ⚡
          </motion.span>
          <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>
            MCP → CMS
          </span>
        </motion.div>

        {/* Arrow */}
        <motion.div
          animate={{ 
            scaleY: phase >= 2 ? 1 : 0,
            opacity: phase >= 2 ? 1 : 0.3,
          }}
          style={{
            width: 3,
            height: 30,
            background: 'linear-gradient(180deg, #0ea5e9, #10b981)',
            borderRadius: 2,
          }}
        />

        {/* Website updates */}
        <motion.div
          animate={{ 
            scale: phase >= 2 ? 1 : 0.95,
            borderColor: phase >= 2 ? '#10b981' : '#e2e8f0',
          }}
          style={{
            width: '100%',
            padding: 16,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: 12,
            textAlign: 'center',
            border: '3px solid #e2e8f0',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={websiteText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ 
                color: 'white', 
                fontSize: 15, 
                fontWeight: 700,
              }}
            >
              {websiteText}
            </motion.span>
          </AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 12,
              }}
            >
              ✓
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Time indicator */}
      <motion.div
        animate={{ 
          backgroundColor: phase >= 2 
            ? ['rgba(16, 185, 129, 0.1)', 'rgba(16, 185, 129, 0.2)', 'rgba(16, 185, 129, 0.1)'] 
            : 'rgba(16, 185, 129, 0.1)',
        }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{
          padding: '16px 20px',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 14, color: '#64748b' }}>Total Time:</span>
        <span style={{ fontSize: 28, fontWeight: 800, color: '#10b981' }}>3 Seconds</span>
      </motion.div>
    </motion.div>
  )
}

// Comparison Stats
const ComparisonStat = ({ 
  label, 
  oldValue, 
  newValue, 
  improvement,
  delay = 0,
}: { 
  label: string
  oldValue: string
  newValue: string
  improvement: string
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    style={{
      background: 'white',
      borderRadius: 12,
      padding: '14px 16px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
    }}
  >
    <div style={{ fontSize: 10, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
      {label}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#ef4444', textDecoration: 'line-through', opacity: 0.7 }}>
          {oldValue}
        </div>
      </div>
      <motion.div
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ color: '#10b981', fontSize: 16 }}
      >
        →
      </motion.div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#10b981' }}>
          {newValue}
        </div>
      </div>
    </div>
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: delay + 0.5, duration: 0.5 }}
      style={{
        marginTop: 10,
        padding: '4px 10px',
        background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
        borderRadius: 12,
        fontSize: 10,
        color: '#10b981',
        fontWeight: 600,
        textAlign: 'center',
      }}
    >
      {improvement}
    </motion.div>
  </motion.div>
)

// VS Divider
const VSDivider = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.3, type: 'spring' }}
    style={{
      width: 80,
      height: 80,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #1e293b, #334155)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      zIndex: 10,
    }}
  >
    <span style={{
      fontSize: 24,
      fontWeight: 800,
      color: 'white',
    }}>
      VS
    </span>
  </motion.div>
)

export function Slide09Benefits({ direction }: SlideProps) {
  return (
    <SlideWrapper direction={direction}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* Red glow - left */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '-5%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Green glow - right */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          style={{
            position: 'absolute',
            top: '20%',
            right: '-5%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(100, 116, 139, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 116, 139, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        padding: '30px 20px 20px',
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
            marginBottom: 20,
          }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{
              width: 80,
              height: 4,
              background: 'linear-gradient(90deg, #ef4444, #10b981)',
              borderRadius: 3,
              marginBottom: 16,
            }}
          />
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            color: '#0f172a',
            textAlign: 'center',
            marginBottom: 4,
          }}>
            Why <span style={{ 
              background: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>MCP + CMS</span>?
          </h1>
          <p style={{ fontSize: 15, color: '#64748b' }}>
            See the difference for yourself
          </p>
        </motion.div>

        {/* Main Layout: Stats - Comparison - Stats */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          flex: 1,
          width: '100%',
          maxWidth: 1400,
        }}>
          {/* Left Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              width: 160,
            }}
          >
            <ComparisonStat 
              label="Time"
              oldValue="2-3 days"
              newValue="3 sec"
              improvement="99% faster"
              delay={0.7}
            />
            <ComparisonStat 
              label="People"
              oldValue="3-4"
              newValue="1"
              improvement="75% less"
              delay={0.8}
            />
          </motion.div>

          {/* Center Comparison */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <OldWayDemo active={true} />
            </motion.div>

            <VSDivider />

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <NewWayDemo active={true} />
            </motion.div>
          </div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              width: 160,
            }}
          >
            <ComparisonStat 
              label="Errors"
              oldValue="23%"
              newValue="< 1%"
              improvement="96% fewer"
              delay={0.9}
            />
            <ComparisonStat 
              label="Steps"
              oldValue="6+"
              newValue="0"
              improvement="Automated"
              delay={1.0}
            />
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  )
}
