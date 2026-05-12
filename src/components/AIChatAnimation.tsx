import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Message {
  role: 'user' | 'ai' | 'system'
  content: string
  typing?: boolean
}

interface AIChatAnimationProps {
  messages: Message[]
  autoPlay?: boolean
}

export function AIChatAnimation({ messages, autoPlay = true }: AIChatAnimationProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [typedContent, setTypedContent] = useState('')

  useEffect(() => {
    if (!autoPlay || currentIndex >= messages.length) return

    const timer = setTimeout(() => {
      const msg = messages[currentIndex]
      
      if (msg.role === 'ai' && msg.typing !== false) {
        // AI types character by character
        setIsTyping(true)
        let charIndex = 0
        const typeInterval = setInterval(() => {
          if (charIndex <= msg.content.length) {
            setTypedContent(msg.content.slice(0, charIndex))
            charIndex++
          } else {
            clearInterval(typeInterval)
            setIsTyping(false)
            setVisibleMessages(prev => [...prev, msg])
            setTypedContent('')
            setCurrentIndex(prev => prev + 1)
          }
        }, 20)
        return () => clearInterval(typeInterval)
      } else {
        // User/system messages appear instantly
        setVisibleMessages(prev => [...prev, msg])
        setCurrentIndex(prev => prev + 1)
      }
    }, currentIndex === 0 ? 500 : 1000)

    return () => clearTimeout(timer)
  }, [currentIndex, messages, autoPlay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 600,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        maxHeight: 400,
        overflow: 'hidden',
      }}
    >
      {/* Chat header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 12, 
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600,
          fontSize: 18,
        }}>
          AI
        </div>
        <div>
          <div style={{ fontWeight: 600, color: '#1e293b' }}>Claude AI</div>
          <div style={{ fontSize: 13, color: '#64748b' }}>MCP Assistant</div>
        </div>
        <div style={{ 
          marginLeft: 'auto', 
          width: 10, 
          height: 10, 
          borderRadius: '50%', 
          background: '#22c55e' 
        }} />
      </div>

      {/* Messages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AnimatePresence>
          {visibleMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div style={{
                background: msg.role === 'user' 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                  : msg.role === 'system'
                  ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  : '#f1f5f9',
                color: msg.role === 'user' || msg.role === 'system' ? 'white' : '#1e293b',
                padding: '12px 18px',
                borderRadius: 16,
                maxWidth: '80%',
                fontSize: 15,
                lineHeight: 1.5,
              }}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <div style={{
              background: '#f1f5f9',
              color: '#1e293b',
              padding: '12px 18px',
              borderRadius: 16,
              maxWidth: '80%',
              fontSize: 15,
            }}>
              {typedContent}<span className="cursor">|</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
