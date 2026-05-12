import { motion, AnimatePresence } from 'framer-motion'
import { SlideWrapper } from '../components/SlideWrapper'
import { useState, useEffect } from 'react'

interface SlideProps {
  direction: number
}

// Chat Sidebar Component
const ChatSidebar = ({ 
  messages, 
  isCompact,
  currentMessageIndex,
}: { 
  messages: { role: 'user' | 'ai' | 'system', content: string }[]
  isCompact: boolean
  currentMessageIndex: number
}) => (
  <motion.div
    layout
    animate={{ width: isCompact ? 340 : 480 }}
    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    style={{
      background: 'white',
      borderRadius: 16,
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
      overflow: 'hidden',
      border: '1px solid #e2e8f0',
      flexShrink: 0,
      height: isCompact ? '100%' : 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{
      background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
      }}>
        🤖
      </div>
      <div>
        <div style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>Claude AI</div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Bulk Operations</div>
      </div>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          marginLeft: 'auto',
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 10px #22c55e',
        }}
      />
    </div>
    
    <div style={{ 
      padding: 16, 
      flex: isCompact ? 1 : 'none',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      {messages.slice(0, currentMessageIndex + 1).map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' 
              ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)' 
              : msg.role === 'system'
              ? 'linear-gradient(135deg, #10b981, #059669)'
              : '#f1f5f9',
            color: msg.role === 'user' || msg.role === 'system' ? 'white' : '#1e293b',
            padding: '12px 16px',
            borderRadius: 14,
            borderBottomRightRadius: msg.role === 'user' ? 4 : 14,
            borderBottomLeftRadius: msg.role !== 'user' ? 4 : 14,
            maxWidth: '95%',
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          {msg.content}
        </motion.div>
      ))}
    </div>
  </motion.div>
)



// Bulk Operations Window
const BulkOpsWindow = ({ 
  show, 
  currentCount,
  totalCount,
  isComplete,
  elapsed,
}: { 
  show: boolean
  currentCount: number
  totalCount: number
  isComplete: boolean
  elapsed: number
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          flex: 1,
          background: 'white',
          borderRadius: 16,
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          border: '2px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Browser Chrome */}
        <div style={{
          background: '#f8fafc',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid #e2e8f0',
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
          </div>
          <div style={{
            flex: 1,
            background: 'white',
            borderRadius: 6,
            padding: '6px 12px',
            fontSize: 12,
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            border: '1px solid #e2e8f0',
          }}>
            <span style={{ color: '#22c55e' }}>🔒</span>
            cms.mywebsite.com/bulk-operations
          </div>
        </div>

        {/* Header Stats */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}>
          {/* Progress */}
          <div style={{ flex: 1 }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: 8,
              fontSize: 13,
            }}>
              <span style={{ color: '#64748b' }}>
                {isComplete ? 'Bulk update complete!' : 'Updating posts...'}
              </span>
              <span style={{ fontWeight: 600, color: isComplete ? '#22c55e' : '#8b5cf6' }}>
                {currentCount}/{totalCount}
              </span>
            </div>
            <div style={{
              height: 8,
              background: '#e2e8f0',
              borderRadius: 4,
              overflow: 'hidden',
            }}>
              <motion.div
                animate={{ width: `${(currentCount / totalCount) * 100}%` }}
                style={{
                  height: '100%',
                  background: isComplete 
                    ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                    : 'linear-gradient(90deg, #8b5cf6, #6366f1)',
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
          
          {/* Timer */}
          <div style={{
            background: 'white',
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: isComplete ? '#22c55e' : '#8b5cf6' }}>
              {(elapsed / 1000).toFixed(1)}s
            </div>
            <div style={{ fontSize: 10, color: '#64748b' }}>ELAPSED</div>
          </div>
          
          {/* Speed */}
          <div style={{
            background: 'white',
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f59e0b' }}>
              {currentCount > 0 ? Math.round(currentCount / (elapsed / 1000)) : 0}/s
            </div>
            <div style={{ fontSize: 10, color: '#64748b' }}>POSTS/SEC</div>
          </div>
        </div>
        
        {/* Posts Grid - 100 posts in a grid */}
        <div style={{ 
          flex: 1, 
          padding: 16, 
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 8,
          alignContent: 'start',
        }}>
          {Array.from({ length: totalCount }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3, scale: 0.9 }}
              animate={{
                opacity: i < currentCount ? 1 : 0.4,
                scale: i < currentCount ? 1 : 0.9,
                backgroundColor: i < currentCount ? '#dcfce7' : i === currentCount ? '#fef3c7' : '#f1f5f9',
              }}
              transition={{ duration: 0.1 }}
              style={{
                padding: '10px 8px',
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${i < currentCount ? '#bbf7d0' : i === currentCount ? '#fde68a' : '#e2e8f0'}`,
                minHeight: 50,
              }}
            >
              <span style={{ 
                fontSize: i < currentCount ? 16 : 12, 
                color: i < currentCount ? '#22c55e' : i === currentCount ? '#f59e0b' : '#94a3b8',
              }}>
                {i < currentCount ? '✓' : i === currentCount ? '⟳' : '○'}
              </span>
              <span style={{ 
                fontSize: 9, 
                color: '#64748b', 
                marginTop: 2,
                textAlign: 'center',
              }}>
                Post {i + 1}
              </span>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Stats */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(90deg, #8b5cf6, #6d28d9)',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>100</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10 }}>POSTS UPDATED</div>
            </div>
            <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.3)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>{(elapsed / 1000).toFixed(1)}s</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10 }}>TOTAL TIME</div>
            </div>
            <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.3)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#fbbf24', fontSize: 20, fontWeight: 700, textDecoration: 'line-through' }}>2+ hrs</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10 }}>MANUAL TIME</div>
            </div>
            <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.3)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#22c55e', fontSize: 20, fontWeight: 700 }}>99.9%</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10 }}>TIME SAVED</div>
            </div>
          </motion.div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
)

export function Slide08BulkOps({ direction }: SlideProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1)
  const [showWindow, setShowWindow] = useState(false)
  const [currentCount, setCurrentCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const totalCount = 100

  const messages = [
    { role: 'user' as const, content: 'Update all 100 blog posts to add SEO tags' },
    { role: 'ai' as const, content: 'I\'ll update all 100 posts. Starting bulk operation...' },
    { role: 'ai' as const, content: 'Processing posts at high speed with MCP...' },
    { role: 'system' as const, content: '✓ All 100 posts updated successfully!' },
  ]

  useEffect(() => {
    const runAnimation = async () => {
      await delay(600)
      setCurrentMessageIndex(0)
      
      await delay(1200)
      setCurrentMessageIndex(1)
      setShowWindow(true)
      
      await delay(800)
      setCurrentMessageIndex(2)
      
      // Animate through all 100 posts
      for (let i = 1; i <= totalCount; i++) {
        setCurrentCount(i)
        setElapsed((i / totalCount) * 2300) // Simulated 2.3 second total
        await delay(20) // Fast animation
      }
      
      await delay(300)
      setIsComplete(true)
      setCurrentMessageIndex(3)
      
      await delay(8000)
      // Reset
      setCurrentMessageIndex(-1)
      setShowWindow(false)
      setCurrentCount(0)
      setIsComplete(false)
      setElapsed(0)
    }
    
    runAnimation()
    const interval = setInterval(runAnimation, 16000)
    return () => clearInterval(interval)
  }, [])

  return (
    <SlideWrapper direction={direction}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '-10%',
            right: '20%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        padding: '10px',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            padding: '8px 20px',
            borderRadius: 10,
            color: 'white',
            fontWeight: 700,
            fontSize: 16,
          }}>
            BULK
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, color: '#0f172a' }}>
            Operations at Scale
          </h1>
        </motion.div>

        {/* Main Demo Area */}
        <div style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 16,
          flex: 1,
          width: '95%',
          minHeight: 0,
        }}>
          <ChatSidebar 
            messages={messages}
            isCompact={showWindow}
            currentMessageIndex={currentMessageIndex}
          />
          <BulkOpsWindow 
            show={showWindow}
            currentCount={currentCount}
            totalCount={totalCount}
            isComplete={isComplete}
            elapsed={elapsed}
          />
        </div>
      </div>
    </SlideWrapper>
  )
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
