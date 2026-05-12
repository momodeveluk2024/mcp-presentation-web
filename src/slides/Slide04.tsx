import { motion, AnimatePresence } from 'framer-motion'
import { SlideWrapper } from '../components/SlideWrapper'
import { useState, useEffect } from 'react'

interface SlideProps {
  direction: number
}

// Blog post content that types out
const blogContent = {
  title: 'AI Trends 2024',
  content: `The landscape of artificial intelligence is evolving rapidly. Here are the key trends shaping 2024:

1. **Large Language Models** continue to revolutionize how we interact with technology, enabling natural conversations and complex reasoning.

2. **AI Agents** are becoming more autonomous, capable of executing multi-step tasks with minimal human intervention.

3. **Model Context Protocol (MCP)** is emerging as the standard for AI-to-tool communication, enabling seamless integration.

4. **Multimodal AI** combines text, images, and audio understanding for richer experiences.

The future is here, and it's powered by AI.`,
}

const CompactChat = ({ 
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
    animate={{
      width: isCompact ? 340 : 480,
    }}
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
    {/* Header */}
    <div style={{
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
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
        <div style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>
          Claude AI
        </div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
          MCP Assistant
        </div>
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
    
    {/* Messages - KEEP TEXT BIG */}
    <div style={{ 
      padding: 16, 
      flex: isCompact ? 1 : 'none',
      minHeight: isCompact ? 'auto' : 220,
      maxHeight: isCompact ? 'none' : 300,
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
              ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' 
              : msg.role === 'system'
              ? 'linear-gradient(135deg, #10b981, #22c55e)'
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
      
      {currentMessageIndex < messages.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            alignSelf: 'flex-start',
            background: '#f1f5f9',
            padding: '12px 16px',
            borderRadius: 14,
            display: 'flex',
            gap: 5,
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#64748b',
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  </motion.div>
)

// Live CMS/Website Window
const LiveWebsiteWindow = ({ 
  show, 
  title, 
  content,
  isPublished,
}: { 
  show: boolean
  title: string
  content: string
  isPublished: boolean
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: 50 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
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
            fontSize: 11,
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            border: '1px solid #e2e8f0',
          }}>
            <span style={{ color: '#22c55e' }}>🔒</span>
            myblog.com/posts/ai-trends-2024
          </div>
        </div>
        
        {/* Content Area */}
        <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Post Header */}
          <div style={{
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: 16,
            marginBottom: 16,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 8,
            }}>
              <motion.div
                animate={{
                  backgroundColor: isPublished ? '#dcfce7' : '#fef3c7',
                }}
                style={{
                  padding: '4px 10px',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                  color: isPublished ? '#16a34a' : '#d97706',
                }}
              >
                {isPublished ? '● PUBLISHED' : '○ DRAFT'}
              </motion.div>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>
                Just now
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#0f172a',
                margin: 0,
              }}
            >
              {title || '|'}
            </motion.h2>
          </div>
          
          {/* Post Content */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            fontSize: 16,
            lineHeight: 2,
            color: '#374151',
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {content.split('\n').map((line, i) => (
                <p key={i} style={{ 
                  margin: '0 0 12px 0',
                  fontWeight: line.startsWith('**') ? 600 : 400,
                }}>
                  {line.replace(/\*\*/g, '')}
                  {i === content.split('\n').length - 1 && !isPublished && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      style={{ 
                        display: 'inline-block',
                        width: 2,
                        height: 16,
                        background: '#6366f1',
                        marginLeft: 2,
                        verticalAlign: 'text-bottom',
                      }}
                    />
                  )}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Publishing indicator */}
        {isPublished && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(90deg, #10b981, #22c55e)',
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 16 }}>✨</span>
            <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>
              Post is now live and accessible to readers!
            </span>
          </motion.div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
)



export function Slide04Solution({ direction }: SlideProps) {
  const [phase, setPhase] = useState(0)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1)
  const [showWebsite, setShowWebsite] = useState(false)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogContentText, setBlogContentText] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [mcpPhase, setMcpPhase] = useState('')

  const messages = [
    { role: 'user' as const, content: 'Create a new blog post about AI trends in 2024' },
    { role: 'ai' as const, content: 'I\'ll create that post for you now. Connecting to your CMS via MCP...' },
    { role: 'ai' as const, content: 'Writing content and publishing to your website...' },
    { role: 'system' as const, content: '✓ Post created and published successfully!' },
  ]

  useEffect(() => {
    const runAnimation = async () => {
      // Phase 1: User message appears
      await delay(800)
      setCurrentMessageIndex(0)
      setPhase(1)
      
      // Phase 2: AI responds
      await delay(1500)
      setCurrentMessageIndex(1)
      
      // Phase 3: Chat shrinks, website appears
      await delay(1500)
      setShowWebsite(true)
      setMcpPhase('Connecting...')
      await delay(800)
      setMcpPhase('Writing post...')
      setPhase(2)
      
      // Phase 4: Title types out
      await delay(500)
      for (let i = 0; i <= blogContent.title.length; i++) {
        setBlogTitle(blogContent.title.slice(0, i))
        await delay(50)
      }
      
      // Phase 5: Content types out
      setCurrentMessageIndex(2)
      await delay(300)
      const lines = blogContent.content.split('\n')
      let fullContent = ''
      for (const line of lines) {
        for (let i = 0; i <= line.length; i++) {
          setBlogContentText(fullContent + line.slice(0, i))
          await delay(15)
        }
        fullContent += line + '\n'
        setBlogContentText(fullContent)
        await delay(200)
      }
      
      // Phase 6: Publishing
      setMcpPhase('Publishing...')
      await delay(1000)
      setIsPublished(true)
      setMcpPhase('')
      setCurrentMessageIndex(3)
      setPhase(3)
      
      // Reset after a while
      await delay(5000)
      setPhase(0)
      setCurrentMessageIndex(-1)
      setShowWebsite(false)
      setBlogTitle('')
      setBlogContentText('')
      setIsPublished(false)
      setMcpPhase('')
    }
    
    runAnimation()
    const interval = setInterval(runAnimation, 25000)
    return () => clearInterval(interval)
  }, [])

  return (
    <SlideWrapper direction={direction}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
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
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
          style={{
            position: 'absolute',
            bottom: '-5%',
            left: '10%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)
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
        padding: '10px 10px 10px',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Title - Compact */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: '#0f172a',
            textAlign: 'center',
            marginBottom: 4,
          }}>
            The <span style={{ color: '#10b981' }}>Solution</span>
          </h1>
          <p style={{ fontSize: 14, color: '#64748b' }}>
            Watch AI create content in real-time
          </p>
        </motion.div>

        {/* Main Demo Area - FULL WIDTH */}
        <div style={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          gap: 16,
          flex: 1,
          width: '95%',
          position: 'relative',
          minHeight: 0,
        }}>
          {/* Chat */}
          <CompactChat 
            messages={messages}
            isCompact={showWebsite}
            currentMessageIndex={currentMessageIndex}
          />

          {/* MCP Indicator */}
          {mcpPhase && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                padding: '8px 16px',
                borderRadius: 20,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: '2px solid transparent',
                  borderTopColor: '#6366f1',
                  borderRightColor: '#0ea5e9',
                }}
              />
              <span style={{ color: 'white', fontSize: 12, fontWeight: 500 }}>
                {mcpPhase}
              </span>
            </motion.div>
          )}

          {/* Website Window */}
          <LiveWebsiteWindow 
            show={showWebsite}
            title={blogTitle}
            content={blogContentText}
            isPublished={isPublished}
          />
        </div>

        {/* Bottom indicator */}
        <AnimatePresence>
          {phase === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                padding: '14px 24px',
                borderRadius: 16,
                marginTop: 20,
              }}
            >
              <span style={{ fontSize: 20 }}>✨</span>
              <span style={{ fontWeight: 600, color: '#166534', fontSize: 15 }}>
                Full blog post created and published in seconds!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideWrapper>
  )
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
