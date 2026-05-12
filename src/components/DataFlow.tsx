import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface DataFlowProps {
  autoPlay?: boolean
}

export function DataFlowAnimation({ autoPlay = true }: DataFlowProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [showPacket, setShowPacket] = useState(false)

  const steps = [
    { label: 'You', icon: '👤', color: '#3b82f6' },
    { label: 'AI Agent', icon: '🤖', color: '#8b5cf6' },
    { label: 'MCP Server', icon: '⚡', color: '#f59e0b' },
    { label: 'CMS API', icon: '🌐', color: '#10b981' },
  ]

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= steps.length - 1) {
          setShowPacket(false)
          return 0
        }
        setShowPacket(true)
        return prev + 1
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [autoPlay, steps.length])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      padding: 40,
    }}>
      {steps.map((step, i) => (
        <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
          {/* Node */}
          <motion.div
            animate={{
              scale: activeStep === i ? 1.1 : 1,
              boxShadow: activeStep === i 
                ? `0 0 40px ${step.color}60` 
                : '0 10px 30px rgba(0,0,0,0.1)',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 24,
              background: 'white',
              border: `3px solid ${step.color}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 32 }}>{step.icon}</span>
            <span style={{ 
              fontSize: 12, 
              fontWeight: 600, 
              color: step.color,
            }}>
              {step.label}
            </span>
          </motion.div>

          {/* Arrow with data packet */}
          {i < steps.length - 1 && (
            <div style={{ 
              width: 80, 
              height: 4, 
              background: '#e2e8f0',
              borderRadius: 2,
              position: 'relative',
              marginLeft: 20,
              marginRight: 20,
            }}>
              {showPacket && activeStep === i + 1 && (
                <motion.div
                  initial={{ left: 0 }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: -8,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${steps[i].color} 0%, ${steps[i+1].color} 100%)`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                />
              )}
              {/* Arrow head */}
              <div style={{
                position: 'absolute',
                right: -8,
                top: -4,
                width: 0,
                height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: '10px solid #e2e8f0',
              }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Circular progress animation
interface CircularProgressProps {
  value: number
  label: string
  color: string
}

export function CircularProgress({ value, label, color }: CircularProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 500)
    return () => clearTimeout(timer)
  }, [value])

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dy="0.3em"
          style={{ fontSize: 24, fontWeight: 700, fill: color }}
        >
          {animatedValue}%
        </text>
      </svg>
      <div style={{ marginTop: 8, fontWeight: 500, color: '#1e293b' }}>{label}</div>
    </div>
  )
}

// Stats counter animation
interface StatsCounterProps {
  value: number
  label: string
  suffix?: string
  duration?: number
}

export function StatsCounter({ value, label, suffix = '', duration = 2000 }: StatsCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [value, duration])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'white',
        borderRadius: 20,
        padding: 24,
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        minWidth: 150,
      }}
    >
      <div style={{ 
        fontSize: 42, 
        fontWeight: 700, 
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {count}{suffix}
      </div>
      <div style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>{label}</div>
    </motion.div>
  )
}
