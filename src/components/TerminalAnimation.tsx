import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TerminalAnimationProps {
  commands: { command: string; output: string; delay?: number }[]
  autoPlay?: boolean
  startDelay?: number
}

export function TerminalAnimation({ commands, autoPlay = true, startDelay = 500 }: TerminalAnimationProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!autoPlay) return
    
    const timer = setTimeout(() => {
      if (currentLine < commands.length) {
        const cmd = commands[currentLine]
        setIsTyping(true)
        setShowOutput(false)
        
        // Type command character by character
        let charIndex = 0
        const typeInterval = setInterval(() => {
          if (charIndex <= cmd.command.length) {
            setDisplayedText(cmd.command.slice(0, charIndex))
            charIndex++
          } else {
            clearInterval(typeInterval)
            setIsTyping(false)
            
            // Show output after typing
            setTimeout(() => {
              setShowOutput(true)
              
              // Move to next command
              setTimeout(() => {
                setCurrentLine(prev => prev + 1)
                setDisplayedText('')
                setShowOutput(false)
              }, cmd.delay || 1500)
            }, 300)
          }
        }, 50)
        
        return () => clearInterval(typeInterval)
      }
    }, startDelay)
    
    return () => clearTimeout(timer)
  }, [currentLine, commands, autoPlay, startDelay])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 700,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
        fontFamily: "'Fira Code', 'Consolas', monospace",
        fontSize: 15,
      }}
    >
      {/* Terminal header */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
        <span style={{ marginLeft: 12, color: '#64748b', fontSize: 13 }}>Terminal</span>
      </div>

      {/* Previous commands */}
      {commands.slice(0, currentLine).map((cmd, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ color: '#22c55e' }}>
            <span style={{ color: '#64748b' }}>$ </span>
            {cmd.command}
          </div>
          <div style={{ color: '#94a3b8', marginTop: 4, whiteSpace: 'pre-wrap' }}>
            {cmd.output}
          </div>
        </div>
      ))}

      {/* Current typing command */}
      {currentLine < commands.length && (
        <div>
          <div style={{ color: '#22c55e' }}>
            <span style={{ color: '#64748b' }}>$ </span>
            {displayedText}
            {isTyping && <span className="cursor" style={{ background: '#22c55e', padding: '0 2px' }}>|</span>}
          </div>
          {showOutput && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: '#94a3b8', marginTop: 4, whiteSpace: 'pre-wrap' }}
            >
              {commands[currentLine].output}
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}
