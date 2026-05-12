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
      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
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
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Safe Deletion</div>
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
              ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
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

// Post Preview Card
const PostCard = ({ 
  title, 
  status, 
  isDeleted,
}: { 
  title: string
  status: 'normal' | 'selected' | 'backing-up' | 'deleting' | 'deleted'
  isDeleting: boolean
  isDeleted: boolean
}) => (
  <motion.div
    animate={{
      scale: isDeleted ? 0 : 1,
      opacity: isDeleted ? 0 : 1,
      x: isDeleted ? 100 : 0,
      rotateZ: isDeleted ? 10 : 0,
    }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    style={{
      background: status === 'selected' ? '#fef3c7' : 'white',
      border: `2px solid ${status === 'selected' ? '#f59e0b' : '#e2e8f0'}`,
      borderRadius: 12,
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}
  >
    <div style={{
      width: 40,
      height: 40,
      borderRadius: 8,
      background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
    }}>
      📄
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 11, color: '#64748b' }}>Published • 2 days ago</div>
    </div>
    {status === 'selected' && (
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#f59e0b',
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
)

// Live CMS Delete Window
const CMSDeleteWindow = ({ 
  show, 
  deletePhase,
  backupProgress,
  isComplete,
}: { 
  show: boolean
  deletePhase: 'idle' | 'selecting' | 'backing-up' | 'deleting' | 'complete'
  backupProgress: number
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
            cms.mywebsite.com/posts
          </div>
        </div>

        {/* Content */}
        <div style={{ 
          padding: 20, 
          flex: 1, 
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          {/* Status Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '12px 16px',
            background: deletePhase === 'complete' ? '#f0fdf4' : deletePhase === 'backing-up' ? '#fffbeb' : '#f8fafc',
            borderRadius: 12,
            border: `1px solid ${deletePhase === 'complete' ? '#bbf7d0' : '#e2e8f0'}`,
          }}>
            <motion.div
              animate={{ rotate: deletePhase === 'backing-up' || deletePhase === 'deleting' ? 360 : 0 }}
              transition={{ duration: 1, repeat: deletePhase === 'backing-up' || deletePhase === 'deleting' ? Infinity : 0, ease: 'linear' }}
              style={{ fontSize: 20 }}
            >
              {deletePhase === 'complete' ? '✅' : deletePhase === 'backing-up' ? '💾' : deletePhase === 'deleting' ? '🗑️' : '📋'}
            </motion.div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>
                {deletePhase === 'complete' 
                  ? 'Post Deleted Successfully' 
                  : deletePhase === 'backing-up' 
                  ? 'Creating Backup...' 
                  : deletePhase === 'deleting'
                  ? 'Deleting Post...'
                  : 'Post Manager'}
              </div>
              {deletePhase === 'backing-up' && (
                <div style={{ 
                  marginTop: 8,
                  height: 6,
                  background: '#e2e8f0',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}>
                  <motion.div
                    animate={{ width: `${backupProgress}%` }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                      borderRadius: 3,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Posts List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <PostCard 
              title="Introduction to Machine Learning" 
              status="normal"
              isDeleting={false}
              isDeleted={false}
            />
            <PostCard 
              title="Old Outdated Post" 
              status={deletePhase === 'selecting' ? 'selected' : deletePhase === 'complete' ? 'deleted' : 'normal'}
              isDeleting={deletePhase === 'deleting'}
              isDeleted={deletePhase === 'complete'}
            />
            <PostCard 
              title="Best Practices for Web Development" 
              status="normal"
              isDeleting={false}
              isDeleted={false}
            />
          </div>

          {/* Safety Features */}
          {deletePhase === 'complete' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                marginTop: 'auto',
              }}
            >
              {[
                { icon: '🛡️', text: 'Backup Created' },
                { icon: '♻️', text: 'Restorable' },
                { icon: '📁', text: 'In Trash (30 days)' },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  style={{
                    background: '#f0fdf4',
                    padding: '10px 16px',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    border: '1px solid #bbf7d0',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#166534' }}>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
        
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(90deg, #f59e0b, #d97706)',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 16 }}>🗑️</span>
            <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>
              Post deleted safely with backup created!
            </span>
          </motion.div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
)

export function Slide07DeletePost({ direction }: SlideProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1)
  const [showWindow, setShowWindow] = useState(false)
  const [deletePhase, setDeletePhase] = useState<'idle' | 'selecting' | 'backing-up' | 'deleting' | 'complete'>('idle')
  const [backupProgress, setBackupProgress] = useState(0)

  const messages = [
    { role: 'user' as const, content: 'Delete the old outdated post' },
    { role: 'ai' as const, content: 'I\'ll delete that post safely. Let me select it...' },
    { role: 'ai' as const, content: 'Creating a backup before deletion...' },
    { role: 'system' as const, content: '✓ Post deleted with backup saved!' },
  ]

  useEffect(() => {
    const runAnimation = async () => {
      await delay(600)
      setCurrentMessageIndex(0)
      
      await delay(1200)
      setCurrentMessageIndex(1)
      setShowWindow(true)
      setDeletePhase('selecting')
      
      await delay(1500)
      setCurrentMessageIndex(2)
      setDeletePhase('backing-up')
      
      // Backup progress
      for (let i = 0; i <= 100; i += 5) {
        setBackupProgress(i)
        await delay(50)
      }
      
      await delay(500)
      setDeletePhase('deleting')
      
      await delay(1000)
      setDeletePhase('complete')
      setCurrentMessageIndex(3)
      
      await delay(6000)
      // Reset
      setCurrentMessageIndex(-1)
      setShowWindow(false)
      setDeletePhase('idle')
      setBackupProgress(0)
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
            right: '15%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
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
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            padding: '8px 20px',
            borderRadius: 10,
            color: 'white',
            fontWeight: 700,
            fontSize: 16,
          }}>
            DELETE
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, color: '#0f172a' }}>
            Safe Removal
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
          <CMSDeleteWindow 
            show={showWindow}
            deletePhase={deletePhase}
            backupProgress={backupProgress}
            isComplete={deletePhase === 'complete'}
          />
        </div>
      </div>
    </SlideWrapper>
  )
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
