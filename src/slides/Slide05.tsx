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
      background: 'linear-gradient(135deg, #10b981, #059669)',
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
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Content Creator</div>
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
              ? 'linear-gradient(135deg, #10b981, #059669)' 
              : msg.role === 'system'
              ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
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

// Live CMS Editor Window
const CMSEditorWindow = ({ 
  show, 
  title, 
  content,
  status,
  isCreating,
  progress,
}: { 
  show: boolean
  title: string
  content: string
  status: 'draft' | 'creating' | 'published'
  isCreating: boolean
  progress: number
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
            cms.mywebsite.com/editor/new-post
          </div>
        </div>

        {/* Editor Toolbar */}
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
              backgroundColor: status === 'published' ? '#dcfce7' : status === 'creating' ? '#fef3c7' : '#f1f5f9',
            }}
            style={{
              padding: '4px 12px',
              borderRadius: 12,
              fontSize: 11,
              fontWeight: 600,
              color: status === 'published' ? '#16a34a' : status === 'creating' ? '#d97706' : '#64748b',
            }}
          >
            {status === 'published' ? '● PUBLISHED' : status === 'creating' ? '◐ CREATING...' : '○ NEW DRAFT'}
          </motion.div>
          
          {isCreating && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ 
                flex: 1, 
                height: 4, 
                background: '#e2e8f0', 
                borderRadius: 2,
                overflow: 'hidden',
              }}>
                <motion.div
                  animate={{ width: `${progress}%` }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #10b981, #059669)',
                    borderRadius: 2,
                  }}
                />
              </div>
              <span style={{ fontSize: 11, color: '#64748b' }}>{progress}%</span>
            </div>
          )}
        </div>
        
        {/* Editor Content */}
        <div style={{ padding: 24, flex: 1, overflow: 'auto' }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, color: '#64748b', marginBottom: 6, display: 'block' }}>
              Title
            </label>
            <motion.div
              animate={{ borderColor: title ? '#10b981' : '#e2e8f0' }}
              style={{
                padding: '14px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: 10,
                fontSize: 20,
                fontWeight: 600,
                color: '#0f172a',
                minHeight: 50,
              }}
            >
              {title}
              {!title && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ color: '#10b981' }}
                >|</motion.span>
              )}
            </motion.div>
          </div>
          
          <div>
            <label style={{ fontSize: 12, color: '#64748b', marginBottom: 6, display: 'block' }}>
              Content
            </label>
            <motion.div
              animate={{ borderColor: content ? '#10b981' : '#e2e8f0' }}
              style={{
                padding: '14px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: 10,
                fontSize: 15,
                lineHeight: 1.8,
                color: '#374151',
                minHeight: 200,
              }}
            >
              {content.split('\n').map((line, i) => (
                <p key={i} style={{ margin: '0 0 8px 0' }}>{line}</p>
              ))}
              {content && !status.includes('published') && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ color: '#10b981' }}
                >|</motion.span>
              )}
            </motion.div>
          </div>
        </div>
        
        {status === 'published' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(90deg, #10b981, #059669)',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 16 }}>✨</span>
            <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>
              New post created and published successfully!
            </span>
          </motion.div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
)

// New post content
const newPostContent = {
  title: 'Getting Started with AI in 2024',
  content: `Welcome to the future of content creation!

In this guide, we'll explore how AI is revolutionizing the way we create, manage, and publish content.

Key Topics:
• Setting up your AI-powered workflow
• Best practices for AI-assisted writing
• Integrating MCP with your CMS
• Automating repetitive tasks

Let's dive in and discover the possibilities!`
}

export function Slide05CreatePost({ direction }: SlideProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1)
  const [showEditor, setShowEditor] = useState(false)
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [status, setStatus] = useState<'draft' | 'creating' | 'published'>('draft')
  const [progress, setProgress] = useState(0)

  const messages = [
    { role: 'user' as const, content: 'Create a new blog post about getting started with AI' },
    { role: 'ai' as const, content: 'I\'ll create that post for you. Opening the CMS editor...' },
    { role: 'ai' as const, content: 'Writing title and content...' },
    { role: 'system' as const, content: '✓ Post created and published!' },
  ]

  useEffect(() => {
    const runAnimation = async () => {
      await delay(600)
      setCurrentMessageIndex(0)
      
      await delay(1200)
      setCurrentMessageIndex(1)
      setShowEditor(true)
      setStatus('creating')
      
      await delay(800)
      setCurrentMessageIndex(2)
      
      // Type title
      for (let i = 0; i <= newPostContent.title.length; i++) {
        setPostTitle(newPostContent.title.slice(0, i))
        setProgress(Math.round((i / newPostContent.title.length) * 30))
        await delay(40)
      }
      
      // Type content
      const lines = newPostContent.content.split('\n')
      let fullContent = ''
      for (const line of lines) {
        for (let i = 0; i <= line.length; i++) {
          setPostContent(fullContent + line.slice(0, i))
          await delay(15)
        }
        fullContent += line + '\n'
        setProgress(30 + Math.round((fullContent.length / newPostContent.content.length) * 60))
        await delay(100)
      }
      
      setProgress(100)
      await delay(500)
      setStatus('published')
      setCurrentMessageIndex(3)
      
      await delay(6000)
      // Reset
      setCurrentMessageIndex(-1)
      setShowEditor(false)
      setPostTitle('')
      setPostContent('')
      setStatus('draft')
      setProgress(0)
    }
    
    runAnimation()
    const interval = setInterval(runAnimation, 20000)
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
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
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
            background: 'linear-gradient(135deg, #10b981, #059669)',
            padding: '8px 20px',
            borderRadius: 10,
            color: 'white',
            fontWeight: 700,
            fontSize: 16,
          }}>
            CREATE
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, color: '#0f172a' }}>
            New Content
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
          <CMSEditorWindow 
            show={showEditor}
            title={postTitle}
            content={postContent}
            status={status}
            isCreating={status === 'creating'}
            progress={progress}
          />
        </div>
      </div>
    </SlideWrapper>
  )
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
