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
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
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
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Content Editor</div>
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
              ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
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

// Live CMS Update Window
const CMSUpdateWindow = ({ 
  show, 
  originalTitle,
  newTitle,
  originalContent,
  newContent,
  isUpdating,
  isComplete,
}: { 
  show: boolean
  originalTitle: string
  newTitle: string
  originalContent: string
  newContent: string
  isUpdating: boolean
  isComplete: boolean
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
            cms.mywebsite.com/editor/post/123
          </div>
        </div>

        {/* Toolbar */}
        <div style={{
          background: '#f8fafc',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: '1px solid #e2e8f0',
        }}>
          <motion.div
            animate={{
              backgroundColor: isComplete ? '#dcfce7' : isUpdating ? '#dbeafe' : '#f1f5f9',
            }}
            style={{
              padding: '4px 12px',
              borderRadius: 12,
              fontSize: 11,
              fontWeight: 600,
              color: isComplete ? '#16a34a' : isUpdating ? '#2563eb' : '#64748b',
            }}
          >
            {isComplete ? '● UPDATED' : isUpdating ? '◐ UPDATING...' : '○ EDITING'}
          </motion.div>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>Post ID: 123</span>
        </div>
        
        {/* Content - Side by Side Comparison */}
        <div style={{ 
          padding: 20, 
          flex: 1, 
          overflow: 'auto',
          display: 'flex',
          gap: 20,
        }}>
          {/* Before */}
          <div style={{ flex: 1, opacity: isComplete ? 0.4 : 0.6 }}>
            <div style={{ 
              fontSize: 11, 
              color: '#ef4444', 
              fontWeight: 600, 
              marginBottom: 10,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              Before
            </div>
            <div style={{
              padding: 16,
              background: '#fef2f2',
              borderRadius: 12,
              border: '1px solid #fecaca',
            }}>
              <h3 style={{ 
                fontSize: 16, 
                fontWeight: 600, 
                color: '#991b1b',
                marginBottom: 10,
                textDecoration: isComplete ? 'line-through' : 'none',
              }}>
                {originalTitle}
              </h3>
              <p style={{ 
                fontSize: 13, 
                color: '#991b1b', 
                lineHeight: 1.6,
                textDecoration: isComplete ? 'line-through' : 'none',
              }}>
                {originalContent}
              </p>
            </div>
          </div>
          
          {/* Arrow */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <motion.div
              animate={{ x: isUpdating ? [0, 10, 0] : 0 }}
              transition={{ duration: 1, repeat: isUpdating ? Infinity : 0 }}
              style={{ fontSize: 24, color: '#3b82f6' }}
            >
              →
            </motion.div>
          </div>
          
          {/* After */}
          <div style={{ flex: 1 }}>
            <div style={{ 
              fontSize: 11, 
              color: '#16a34a', 
              fontWeight: 600, 
              marginBottom: 10,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              After
            </div>
            <motion.div
              animate={{
                borderColor: isComplete ? '#22c55e' : '#e2e8f0',
                boxShadow: isComplete ? '0 0 20px rgba(34, 197, 94, 0.2)' : 'none',
              }}
              style={{
                padding: 16,
                background: isComplete ? '#f0fdf4' : 'white',
                borderRadius: 12,
                border: '2px solid #e2e8f0',
              }}
            >
              <h3 style={{ 
                fontSize: 16, 
                fontWeight: 600, 
                color: '#166534',
                marginBottom: 10,
              }}>
                {newTitle}
                {!isComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{ color: '#3b82f6' }}
                  >|</motion.span>
                )}
              </h3>
              <p style={{ fontSize: 13, color: '#166534', lineHeight: 1.6 }}>
                {newContent}
              </p>
            </motion.div>
          </div>
        </div>
        
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 16 }}>✏️</span>
            <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>
              Post updated and changes saved!
            </span>
          </motion.div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
)

export function Slide06UpdatePost({ direction }: SlideProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1)
  const [showEditor, setShowEditor] = useState(false)
  const [originalTitle] = useState('Old Blog Title')
  const [originalContent] = useState('This is the old content that needs to be updated with better information.')
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const targetTitle = 'AI-Powered Marketing Strategies'
  const targetContent = 'Discover how artificial intelligence is transforming digital marketing. From personalized campaigns to predictive analytics, learn the strategies that will keep you ahead of the competition.'

  const messages = [
    { role: 'user' as const, content: 'Update post 123 with a new title about AI marketing' },
    { role: 'ai' as const, content: 'I\'ll update that post. Loading the current content...' },
    { role: 'ai' as const, content: 'Making the requested changes...' },
    { role: 'system' as const, content: '✓ Post updated successfully!' },
  ]

  useEffect(() => {
    const runAnimation = async () => {
      await delay(600)
      setCurrentMessageIndex(0)
      
      await delay(1200)
      setCurrentMessageIndex(1)
      setShowEditor(true)
      
      await delay(1000)
      setCurrentMessageIndex(2)
      setIsUpdating(true)
      
      // Type new title
      for (let i = 0; i <= targetTitle.length; i++) {
        setNewTitle(targetTitle.slice(0, i))
        await delay(40)
      }
      
      // Type new content
      for (let i = 0; i <= targetContent.length; i++) {
        setNewContent(targetContent.slice(0, i))
        await delay(10)
      }
      
      await delay(500)
      setIsUpdating(false)
      setIsComplete(true)
      setCurrentMessageIndex(3)
      
      await delay(6000)
      // Reset
      setCurrentMessageIndex(-1)
      setShowEditor(false)
      setNewTitle('')
      setNewContent('')
      setIsUpdating(false)
      setIsComplete(false)
    }
    
    runAnimation()
    const interval = setInterval(runAnimation, 18000)
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
            right: '10%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
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
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            padding: '8px 20px',
            borderRadius: 10,
            color: 'white',
            fontWeight: 700,
            fontSize: 16,
          }}>
            UPDATE
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, color: '#0f172a' }}>
            Existing Content
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
            isCompact={showEditor}
            currentMessageIndex={currentMessageIndex}
          />
          <CMSUpdateWindow 
            show={showEditor}
            originalTitle={originalTitle}
            newTitle={newTitle}
            originalContent={originalContent}
            newContent={newContent}
            isUpdating={isUpdating}
            isComplete={isComplete}
          />
        </div>
      </div>
    </SlideWrapper>
  )
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
