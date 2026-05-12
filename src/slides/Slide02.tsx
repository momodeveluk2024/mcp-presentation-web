import { motion, AnimatePresence } from 'framer-motion'
import { SlideWrapper } from '../components/SlideWrapper'
import { useState, useEffect } from 'react'

interface SlideProps {
  direction: number
}

// Connection line with pulse effect
const ConnectionLine = ({ 
  active, 
  color1, 
  color2,
  width = 100,
}: { 
  active: boolean, 
  color1: string, 
  color2: string,
  width?: number,
}) => (
  <div style={{ position: 'relative', width, display: 'flex', alignItems: 'center' }}>
    {/* Base line */}
    <div style={{
      width: '100%',
      height: 4,
      background: `linear-gradient(90deg, ${color1}40, ${color2}40)`,
      borderRadius: 2,
    }} />
    
    {/* Active pulse */}
    {active && (
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          width: '100%',
          height: 4,
          background: `linear-gradient(90deg, ${color1}, ${color2})`,
          borderRadius: 2,
          transformOrigin: 'left',
          boxShadow: `0 0 20px ${color1}80`,
        }}
      />
    )}
    
    {/* Dots on the line */}
    {active && [0, 1, 2].map(i => (
      <motion.div
        key={i}
        animate={{
          x: [0, width],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1,
          delay: i * 0.3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          left: 0,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: color2,
          boxShadow: `0 0 15px ${color2}`,
        }}
      />
    ))}
    
    {/* Arrow */}
    <div style={{
      position: 'absolute',
      right: -8,
      width: 0,
      height: 0,
      borderTop: '7px solid transparent',
      borderBottom: '7px solid transparent',
      borderLeft: `12px solid ${active ? color2 : color2 + '40'}`,
      filter: active ? `drop-shadow(0 0 6px ${color2})` : 'none',
    }} />
  </div>
)

const features = [
  { 
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: 'Standardized', 
    desc: 'One protocol for all tools',
    color: '#6366f1',
  },
  { 
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Secure', 
    desc: 'Controlled access to systems',
    color: '#10b981',
  },
  { 
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Real-time', 
    desc: 'Instant AI-powered actions',
    color: '#f59e0b',
  },
]

export function Slide02WhatIsMCP({ direction }: SlideProps) {
  const [phase, setPhase] = useState(0)
  const [chatMessages, setChatMessages] = useState<string[]>([])
  const [websiteContent, setWebsiteContent] = useState({
    title: 'My Website',
    subtitle: 'Welcome to our site',
    buttonText: 'Learn More',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [mcpTools, setMcpTools] = useState<string[]>([])

  useEffect(() => {
    const runAnimation = async () => {
      await delay(500)
      
      // Phase 1: Show components
      setPhase(1)
      await delay(600)
      
      // Phase 2: User sends prompt
      setPhase(2)
      setChatMessages(['Change the hero title to "AI-Powered Innovation"'])
      await delay(1000)
      
      // Phase 3: AI receives and processes
      setPhase(3)
      setChatMessages(prev => [...prev, 'Understanding your request...'])
      await delay(800)
      
      // Phase 4: MCP connects and uses tools
      setPhase(4)
      setIsProcessing(true)
      setMcpTools(['cms.connect()'])
      await delay(600)
      setMcpTools(prev => [...prev, 'cms.updateContent()'])
      await delay(600)
      setMcpTools(prev => [...prev, 'cms.publish()'])
      await delay(800)
      
      // Phase 5: Website updates
      setPhase(5)
      setWebsiteContent(prev => ({
        ...prev,
        title: 'AI-Powered Innovation',
      }))
      await delay(600)
      
      // Phase 6: Confirmation flow back
      setPhase(6)
      setIsProcessing(false)
      setChatMessages(prev => [...prev, '✓ Hero title updated successfully!'])
      await delay(1500)
      
      // Second demo
      setPhase(7)
      setChatMessages(prev => [...prev.slice(0, 1), 'Add a new "Get Started" button'])
      await delay(1000)
      
      setPhase(8)
      setIsProcessing(true)
      setMcpTools(['cms.connect()', 'cms.addElement()', 'cms.style()'])
      await delay(1200)
      
      setPhase(9)
      setWebsiteContent(prev => ({
        ...prev,
        buttonText: 'Get Started',
      }))
      setIsProcessing(false)
      setChatMessages(prev => [...prev, '✓ Button added and styled!'])
      await delay(2000)
      
      // Reset and restart
      setPhase(0)
      setChatMessages([])
      setWebsiteContent({
        title: 'My Website',
        subtitle: 'Welcome to our site',
        buttonText: 'Learn More',
      })
      setMcpTools([])
      
      runAnimation()
    }
    
    runAnimation()
    return () => {}
  }, [])

  return (
    <SlideWrapper direction={direction}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '5%',
            left: '5%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '10%',
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
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
        padding: '20px 30px',
        position: 'relative',
        zIndex: 10,
      }}>
        
        {/* Title - BIGGER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 20 }}
        >
          <h2 style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: 8,
            letterSpacing: '-0.02em',
          }}>
            What is <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>MCP</span>?
          </h2>
          <p style={{ fontSize: 22, color: '#64748b' }}>
            The bridge between AI and your tools
          </p>
        </motion.div>

        {/* Main Interactive Diagram - BIGGER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 30,
            width: '100%',
            maxWidth: 1400,
            flex: 1,
            position: 'relative',
          }}
        >
          {/* AI Chat Panel - 2X BIGGER */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            style={{
              width: 420,
              height: 480,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 32,
              boxShadow: '0 30px 60px rgba(139, 92, 246, 0.15)',
              border: '2px solid rgba(139, 92, 246, 0.2)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                  <path d="M6 10v1a6 6 0 0 0 12 0v-1" />
                  <path d="M12 17v4" />
                  <path d="M8 21h8" />
                </svg>
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 20 }}>AI Assistant</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Claude + MCP</div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  marginLeft: 'auto',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 15px #22c55e',
                }}
              />
            </div>
            
            {/* Chat Messages */}
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <AnimatePresence mode="popLayout">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={`${msg}-${i}`}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                      background: msg.startsWith('✓') 
                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                        : i % 2 === 0 
                          ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                          : '#f1f5f9',
                      color: i % 2 === 0 || msg.startsWith('✓') ? 'white' : '#334155',
                      padding: '14px 20px',
                      borderRadius: 18,
                      fontSize: 16,
                      lineHeight: 1.5,
                      alignSelf: i % 2 === 0 ? 'flex-end' : 'flex-start',
                      maxWidth: '90%',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    {msg}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing indicator */}
              {phase >= 2 && phase <= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex',
                    gap: 6,
                    padding: '12px 16px',
                    alignSelf: 'flex-start',
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: '#94a3b8',
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
            
            {/* Input field */}
            <div style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              background: '#f1f5f9',
              borderRadius: 16,
              padding: '14px 20px',
              fontSize: 16,
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Type your prompt...
            </div>
          </motion.div>

          {/* Connection Line 1 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0.3 }}
            style={{ position: 'relative' }}
          >
            <ConnectionLine 
              active={phase >= 3 && phase <= 5} 
              color1="#8b5cf6" 
              color2="#0ea5e9"
              width={80}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 10 }}
              style={{
                position: 'absolute',
                top: -36,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%)',
                color: 'white',
                padding: '6px 14px',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              Request
            </motion.div>
          </motion.div>

          {/* MCP Central Hub - 2X BIGGER */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            style={{
              width: 320,
              minHeight: 400,
              background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: 32,
              border: '3px solid rgba(14, 165, 233, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Animated border glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: -3,
                borderRadius: 32,
                background: 'conic-gradient(from 0deg, transparent 0%, #0ea5e9 20%, transparent 40%, #06b6d4 60%, transparent 80%)',
                opacity: isProcessing ? 0.6 : 0.2,
              }}
            />
            
            <div style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.95)',
              margin: 4,
              borderRadius: 28,
              height: 'calc(100% - 8px)',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* MCP Header */}
              <div style={{
                background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                borderRadius: 18,
                padding: '16px 20px',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}>
                <motion.div
                  animate={isProcessing ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                </motion.div>
                <div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: 24 }}>MCP</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Protocol</div>
                </div>
              </div>
              
              {/* Tools Section */}
              <div style={{ fontSize: 15, color: '#64748b', marginBottom: 12, fontWeight: 600 }}>
                Active Tools:
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <AnimatePresence mode="popLayout">
                  {mcpTools.map((tool, i) => (
                    <motion.div
                      key={tool}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0, x: 20 }}
                      style={{
                        background: '#f0fdfa',
                        border: '2px solid #99f6e4',
                        borderRadius: 14,
                        padding: '12px 16px',
                        marginBottom: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.5, repeat: isProcessing ? Infinity : 0 }}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: i === mcpTools.length - 1 && isProcessing ? '#0ea5e9' : '#10b981',
                        }}
                      />
                      <code style={{ fontSize: 15, color: '#0f766e', fontFamily: 'monospace' }}>
                        {tool}
                      </code>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {mcpTools.length === 0 && (
                  <div style={{ 
                    textAlign: 'center', 
                    color: '#94a3b8', 
                    fontSize: 14,
                    padding: 30,
                  }}>
                    Waiting for request...
                  </div>
                )}
              </div>
              
              {/* Status */}
              <motion.div
                animate={{ opacity: isProcessing ? 1 : 0.5 }}
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                  color: isProcessing ? '#0ea5e9' : '#64748b',
                }}
              >
                <motion.div
                  animate={isProcessing ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                </motion.div>
                {isProcessing ? 'Processing...' : 'Ready'}
              </motion.div>
            </div>
          </motion.div>

          {/* Connection Line 2 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 4 ? 1 : 0.3 }}
            style={{ position: 'relative' }}
          >
            <ConnectionLine 
              active={phase >= 4 && phase <= 5} 
              color1="#0ea5e9" 
              color2="#10b981"
              width={80}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 10 }}
              style={{
                position: 'absolute',
                top: -36,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
                color: 'white',
                padding: '6px 14px',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              Update
            </motion.div>
          </motion.div>

          {/* Website Preview Panel - 2X BIGGER */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            style={{
              width: 420,
              height: 480,
              background: 'white',
              borderRadius: 28,
              boxShadow: '0 30px 60px rgba(16, 185, 129, 0.12)',
              border: '2px solid rgba(16, 185, 129, 0.2)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Browser Chrome */}
            <div style={{
              background: '#f8fafc',
              padding: '14px 18px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#22c55e' }} />
              </div>
              <div style={{
                flex: 1,
                background: 'white',
                borderRadius: 8,
                padding: '8px 16px',
                fontSize: 14,
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                mywebsite.com
              </div>
            </div>
            
            {/* Website Content */}
            <div style={{ padding: 24 }}>
              {/* Hero Section */}
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: 18,
                padding: 28,
                marginBottom: 18,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Update flash effect */}
                <AnimatePresence>
                  {phase === 5 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: [0, 0.5, 0], scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'white',
                        borderRadius: 18,
                      }}
                    />
                  )}
                </AnimatePresence>
                
                <motion.h3 
                  key={websiteContent.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ 
                    color: 'white', 
                    fontSize: 22, 
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {websiteContent.title}
                </motion.h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, marginBottom: 18 }}>
                  {websiteContent.subtitle}
                </p>
                <motion.button
                  key={websiteContent.buttonText}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: 'white',
                    color: '#059669',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {websiteContent.buttonText}
                </motion.button>
              </div>
              
              {/* Cards */}
              <div style={{ display: 'flex', gap: 14 }}>
                <div style={{
                  flex: 1,
                  background: '#f8fafc',
                  borderRadius: 14,
                  padding: 18,
                }}>
                  <div style={{
                    width: '100%',
                    height: 70,
                    background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                    borderRadius: 10,
                    marginBottom: 12,
                  }} />
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#334155' }}>
                    Featured Post
                  </div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
                    Updated via MCP
                  </div>
                </div>
                <div style={{
                  flex: 1,
                  background: '#f8fafc',
                  borderRadius: 14,
                  padding: 18,
                }}>
                  <div style={{
                    width: '100%',
                    height: 70,
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    borderRadius: 10,
                    marginBottom: 12,
                  }} />
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#334155' }}>
                    Recent Post
                  </div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
                    AI generated
                  </div>
                </div>
              </div>
              
              {/* MCP Connected Badge */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  marginTop: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  fontSize: 14,
                  color: '#10b981',
                }}
              >
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#10b981',
                }} />
                MCP Connected
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Cards - BIGGER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ 
            display: 'flex', 
            gap: 24, 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
              style={{
                background: 'white',
                borderRadius: 18,
                padding: '22px 32px',
                textAlign: 'center',
                boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.04)',
                minWidth: 180,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ 
                color: feature.color, 
                marginBottom: 12,
                display: 'flex',
                justifyContent: 'center',
              }}>
                {feature.icon}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>
                {feature.title}
              </div>
              <div style={{ fontSize: 14, color: '#64748b' }}>{feature.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideWrapper>
  )
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
