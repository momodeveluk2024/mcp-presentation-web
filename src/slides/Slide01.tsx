import { motion, AnimatePresence } from 'framer-motion'
import { SlideWrapper } from '../components/SlideWrapper'
import { useState, useEffect } from 'react'

interface SlideProps {
  direction: number
}

const teamMembers = [
  { name: 'Ahmed Mohammad', color: '#6366f1' },
  { name: 'Ahmed Dindar', color: '#0ea5e9' },
  { name: 'Abdulmalik Kazm', color: '#10b981' },
  { name: 'Solin Youns', color: '#f59e0b' },
]

// Text that morphs from binary - FIXED
const MorphingText = ({ 
  text, 
  show, 
  delay = 0,
  color = '#0f172a',
}: { 
  text: string
  show: boolean
  delay?: number
  color?: string
}) => {
  const [phase, setPhase] = useState<'hidden' | 'binary' | 'morphing' | 'done'>('hidden')
  const [displayChars, setDisplayChars] = useState<string[]>([])
  
  const binaryChars = '01!@#$%^&*<>{}[]'
  
  useEffect(() => {
    if (!show) return
    
    const timer = setTimeout(() => {
      setPhase('binary')
      setDisplayChars(text.split('').map(char => 
        char === ' ' ? ' ' : binaryChars[Math.floor(Math.random() * binaryChars.length)]
      ))
      
      setTimeout(() => {
        setPhase('morphing')
        text.split('').forEach((char, i) => {
          if (char === ' ') return
          
          for (let j = 0; j < 5; j++) {
            setTimeout(() => {
              setDisplayChars(prev => {
                const newChars = [...prev]
                if (j < 4) {
                  newChars[i] = binaryChars[Math.floor(Math.random() * binaryChars.length)]
                } else {
                  newChars[i] = char
                }
                return newChars
              })
            }, i * 60 + j * 40)
          }
        })
        
        setTimeout(() => setPhase('done'), text.length * 60 + 250)
      }, 300)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [show, text, delay])

  if (phase === 'hidden') return null

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayChars.map((char, i) => (
        <span
          key={i}
          style={{
            color: char === ' ' ? 'transparent' : (phase === 'done' ? color : '#6366f1'),
            textShadow: phase === 'done' ? 'none' : '0 0 8px rgba(99, 102, 241, 0.5)',
            fontFamily: phase === 'done' ? 'inherit' : "'JetBrains Mono', monospace",
            transition: 'all 0.15s ease',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </motion.span>
  )
}

// BIG MCP Welcome Animation - Shows first!
const MCPWelcomeAnimation = ({ 
  show, 
  onComplete 
}: { 
  show: boolean
  onComplete: () => void 
}) => {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!show) return
    
    const sequence = async () => {
      await delay(500)
      setPhase(1) // Show outer ring
      await delay(400)
      setPhase(2) // Show inner elements
      await delay(600)
      setPhase(3) // Show text
      await delay(800)
      setPhase(4) // Show connections
      await delay(1200)
      setPhase(5) // Shrink and move
      await delay(800)
      onComplete()
    }
    sequence()
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show && phase < 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.5, y: -200 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
        >
          {/* Central MCP Logo */}
          <div style={{ position: 'relative', width: 350, height: 350 }}>
            {/* Rotating outer ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{ 
                scale: phase >= 1 ? 1 : 0, 
                opacity: phase >= 1 ? 1 : 0,
                rotate: 360,
              }}
              transition={{ 
                scale: { type: 'spring', stiffness: 100 },
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '4px solid transparent',
                borderTopColor: '#6366f1',
                borderRightColor: '#0ea5e9',
                borderBottomColor: '#10b981',
                borderLeftColor: '#f59e0b',
              }}
            />
            
            {/* Second ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{ 
                scale: phase >= 1 ? 1 : 0, 
                opacity: phase >= 1 ? 0.5 : 0,
                rotate: -360,
              }}
              transition={{ 
                scale: { type: 'spring', stiffness: 100, delay: 0.1 },
                rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
              }}
              style={{
                position: 'absolute',
                inset: 30,
                borderRadius: '50%',
                border: '2px dashed rgba(99, 102, 241, 0.4)',
              }}
            />
            
            {/* Inner circle with glow */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: phase >= 2 ? 1 : 0, 
                opacity: phase >= 2 ? 1 : 0,
              }}
              transition={{ type: 'spring', stiffness: 150 }}
              style={{
                position: 'absolute',
                inset: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(14, 165, 233, 0.2))',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                boxShadow: '0 0 80px rgba(99, 102, 241, 0.3), inset 0 0 60px rgba(99, 102, 241, 0.1)',
              }}
            />
            
            {/* MCP Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: phase >= 3 ? 1 : 0, 
                scale: phase >= 3 ? 1 : 0.5,
              }}
              transition={{ type: 'spring', stiffness: 200 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{
                fontSize: 72,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6366f1, #0ea5e9, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: 8,
              }}>
                MCP
              </span>
              <span style={{
                fontSize: 16,
                color: '#64748b',
                letterSpacing: 4,
                marginTop: 8,
              }}>
                MODEL CONTEXT PROTOCOL
              </span>
            </motion.div>
            
            {/* Orbiting nodes */}
            {phase >= 4 && [
              { angle: 0, label: 'AI', color: '#8b5cf6' },
              { angle: 72, label: 'CMS', color: '#10b981' },
              { angle: 144, label: 'DB', color: '#f59e0b' },
              { angle: 216, label: 'API', color: '#ef4444' },
              { angle: 288, label: 'WEB', color: '#0ea5e9' },
            ].map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${node.angle}deg) translateY(-190px) rotate(-${node.angle}deg)`,
                  marginLeft: -30,
                  marginTop: -30,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: `${node.color}20`,
                  border: `2px solid ${node.color}60`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  color: node.color,
                }}
              >
                {node.label}
              </motion.div>
            ))}
            
            {/* Connection lines to orbiting nodes */}
            {phase >= 4 && (
              <svg style={{ position: 'absolute', inset: -50, width: 450, height: 450 }}>
                {[0, 72, 144, 216, 288].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180
                  const x2 = 225 + Math.sin(rad) * 165
                  const y2 = 225 - Math.cos(rad) * 165
                  return (
                    <motion.line
                      key={i}
                      x1="225"
                      y1="225"
                      x2={x2}
                      y2={y2}
                      stroke={['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#0ea5e9'][i]}
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    />
                  )
                })}
              </svg>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Bigger Terminal
const Terminal = ({ lines, currentLine }: { lines: string[], currentLine: number }) => {
  const [typedText, setTypedText] = useState('')
  
  useEffect(() => {
    setTypedText('')
  }, [currentLine])

  useEffect(() => {
    if (currentLine < 0 || currentLine >= lines.length) return
    const line = lines[currentLine]
    if (typedText.length < line.length) {
      const timer = setTimeout(() => {
        setTypedText(line.slice(0, typedText.length + 1))
      }, 30)
      return () => clearTimeout(timer)
    }
  }, [typedText, currentLine, lines])

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        position: 'absolute',
        top: 30,
        right: 30,
        width: 380,
        background: 'rgba(15, 23, 42, 0.95)',
        borderRadius: 16,
        border: '2px solid rgba(99, 102, 241, 0.4)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3), 0 0 50px rgba(99, 102, 241, 0.15)',
        overflow: 'hidden',
        zIndex: 100,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Header - BIGGER */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.95)',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: '1px solid rgba(99, 102, 241, 0.3)',
      }}>
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ef4444' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#f59e0b' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#22c55e' }} />
        <span style={{ marginLeft: 12, color: '#94a3b8', fontSize: 14, fontFamily: "'JetBrains Mono', monospace" }}>
          mcp-presentation.sh
        </span>
      </div>
      
      {/* Content - BIGGER TEXT */}
      <div style={{ 
        padding: '16px 20px', 
        fontFamily: "'JetBrains Mono', monospace", 
        fontSize: 14,
        minHeight: 160,
      }}>
        {lines.slice(0, currentLine).map((line, i) => (
          <div key={i} style={{ color: '#64748b', marginBottom: 6, opacity: 0.7 }}>
            <span style={{ color: '#22c55e' }}>❯</span> {line}
          </div>
        ))}
        {currentLine >= 0 && currentLine < lines.length && (
          <div style={{ color: '#e2e8f0' }}>
            <span style={{ color: '#22c55e' }}>❯</span> {typedText}
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ duration: 0.4, repeat: Infinity }} 
              style={{ color: '#22c55e', fontSize: 16 }}
            >
              ▌
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Background MCP Network
const MCPBackground = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.3, pointerEvents: 'none' }}>
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      
      {/* Network lines */}
      {[
        { x1: '10%', y1: '20%', x2: '40%', y2: '50%' },
        { x1: '40%', y1: '50%', x2: '80%', y2: '30%' },
        { x1: '40%', y1: '50%', x2: '70%', y2: '80%' },
        { x1: '40%', y1: '50%', x2: '15%', y2: '70%' },
        { x1: '60%', y1: '10%', x2: '40%', y2: '50%' },
      ].map((line, i) => (
        <motion.line
          key={i}
          {...line}
          stroke="url(#grad1)"
          strokeWidth="2"
          strokeDasharray="8 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
        />
      ))}
      
      {/* Network nodes */}
      {[
        { cx: '10%', cy: '20%', r: 30, label: 'AI' },
        { cx: '40%', cy: '50%', r: 50, label: 'MCP' },
        { cx: '80%', cy: '30%', r: 25, label: 'CMS' },
        { cx: '70%', cy: '80%', r: 25, label: 'API' },
        { cx: '15%', cy: '70%', r: 25, label: 'DB' },
        { cx: '60%', cy: '10%', r: 20, label: 'WEB' },
      ].map((node, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="none"
            stroke="#6366f160"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          />
          <motion.text
            x={node.cx}
            y={node.cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#6366f180"
            fontSize={node.r / 2}
            fontWeight="bold"
            fontFamily="JetBrains Mono, monospace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            {node.label}
          </motion.text>
        </motion.g>
      ))}
    </svg>
  </div>
)

export function Slide01Title({ direction }: SlideProps) {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [showTitle1, setShowTitle1] = useState(false)
  const [showTitle2, setShowTitle2] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showSupervisor, setShowSupervisor] = useState(false)
  const [showTeam, setShowTeam] = useState<boolean[]>(new Array(4).fill(false))
  const [terminalLine, setTerminalLine] = useState(-1)

  const terminalLines = [
    '$ mcp init --protocol v2.0',
    '$ render "Controlling Web Applications"',
    '$ set method --ai-agents --mcp',
    '$ load project.config.json',
    '$ project.setSupervisor("Dr. Mustafa Zuhaer")',
    '$ team.add("Ahmed Mohammad")',
    '$ team.add("Ahmed Dindar")',
    '$ team.add("Abdulmalik Kazm")',
    '$ team.add("Solin Youns")',
    '$ mcp.start() ✓',
  ]

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
    setShowContent(true)
    
    // Start content sequence
    setTimeout(async () => {
      setTerminalLine(0)
      await delay(800)
      setTerminalLine(1)
      await delay(500)
      setShowTitle1(true)
      
      await delay(1500)
      setTerminalLine(2)
      await delay(500)
      setShowTitle2(true)
      
      await delay(1500)
      setShowSubtitle(true)
      
      await delay(800)
      setTerminalLine(3)
      await delay(600)
      setTerminalLine(4)
      await delay(400)
      setShowSupervisor(true)
      
      for (let i = 0; i < 4; i++) {
        await delay(600)
        setTerminalLine(5 + i)
        await delay(400)
        setShowTeam(prev => {
          const newArr = [...prev]
          newArr[i] = true
          return newArr
        })
      }
      
      await delay(400)
      setTerminalLine(9)
    }, 300)
  }

  return (
    <SlideWrapper direction={direction}>
      {/* Light Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 12, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 4 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
        
        {showContent && <MCPBackground />}
      </div>

      {/* MCP Welcome Animation - Shows FIRST */}
      <MCPWelcomeAnimation show={showWelcome} onComplete={handleWelcomeComplete} />

      {/* Terminal - BIGGER */}
      {showContent && <Terminal lines={terminalLines} currentLine={terminalLine} />}

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '40px',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: showTitle1 ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              style={{
                width: 100,
                height: 5,
                background: 'linear-gradient(90deg, #6366f1, #0ea5e9, #10b981)',
                borderRadius: 3,
                marginBottom: 40,
              }}
            />

            {/* Title Line 1 */}
            <h1 style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: 12,
              textAlign: 'center',
            }}>
              <MorphingText 
                text="Controlling Web Applications" 
                show={showTitle1}
              />
            </h1>
            
            {/* Title Line 2 */}
            <h1 style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: 24,
              textAlign: 'center',
            }}>
              <MorphingText text="Using " show={showTitle2} />
              <MorphingText 
                text="AI Agents" 
                show={showTitle2} 
                delay={300}
                color="#8b5cf6"
              />
              <MorphingText text=" and " show={showTitle2} delay={600} />
              <MorphingText 
                text="MCP" 
                show={showTitle2} 
                delay={800}
                color="#0ea5e9"
              />
            </h1>

            {/* Subtitle */}
            <AnimatePresence>
              {showSubtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontSize: 24,
                    color: '#64748b',
                    marginBottom: 50,
                    textAlign: 'center',
                  }}
                >
                  Model Context Protocol for Content Management
                </motion.p>
              )}
            </AnimatePresence>

            {/* Supervisor & Team */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
              
              {/* Supervisor */}
              <AnimatePresence>
                {showSupervisor && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
                  >
                    <span style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: 4,
                    }}>
                      Supervised By
                    </span>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        padding: '16px 28px',
                        borderRadius: 18,
                        boxShadow: '0 8px 30px rgba(139, 92, 246, 0.15)',
                        border: '2px solid rgba(139, 92, 246, 0.3)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: 15,
                        boxShadow: '0 6px 16px rgba(139, 92, 246, 0.3)',
                      }}>
                        MZ
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#1e293b', fontSize: 18 }}>
                          Dr. Mustafa Zuhaer
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Team */}
              <AnimatePresence>
                {showTeam[0] && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
                  >
                    <span style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: 4,
                    }}>
                      Presented By
                    </span>

                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                      {teamMembers.map((member, i) => (
                        <AnimatePresence key={member.name}>
                          {showTeam[i] && (
                            <motion.div
                              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                              transition={{ duration: 0.4 }}
                              whileHover={{ y: -4, scale: 1.02 }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 14,
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                padding: '16px 22px',
                                borderRadius: 18,
                                boxShadow: `0 8px 30px ${member.color}20`,
                                border: `2px solid ${member.color}30`,
                                cursor: 'pointer',
                              }}
                            >
                              <div style={{
                                width: 48,
                                height: 48,
                                borderRadius: 12,
                                background: `linear-gradient(135deg, ${member.color}, ${member.color}cc)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: 15,
                                boxShadow: `0 6px 16px ${member.color}40`,
                              }}>
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 16 }}>
                                  {member.name}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SlideWrapper>
  )
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
