import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      style={{
        background: 'var(--code-bg)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 24,
        fontFamily: "'Fira Code', monospace",
        fontSize: 18,
        width: '100%',
        maxWidth: 900,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}
    >
      {/* Window controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27CA3F' }} />
        <span style={{ marginLeft: 12, color: 'var(--muted)', fontSize: 14 }}>{language}</span>
      </div>

      {/* Code */}
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
        <code>{highlightCode(code)}</code>
      </pre>
    </motion.div>
  )
}

function highlightCode(code: string): ReactNode[] {
  const keywords = ['const', 'let', 'var', 'function', 'async', 'await', 'return', 'import', 'from', 'export', 'true', 'false']
  const parts = code.split(/(\s+|[{}()[\],;:=]|"[^"]*"|'[^']*'|`[^`]*`|\/\/.*$)/gm)

  return parts.map((part, i) => {
    if (!part) return null

    if (keywords.includes(part)) {
      return <span key={i} style={{ color: 'var(--accent)' }}>{part}</span>
    }
    if (/^["'`]/.test(part)) {
      return <span key={i} style={{ color: 'var(--secondary)' }}>{part}</span>
    }
    if (part.startsWith('//')) {
      return <span key={i} style={{ color: 'var(--muted)' }}>{part}</span>
    }
    if (/^\d+$/.test(part)) {
      return <span key={i} style={{ color: 'var(--warning)' }}>{part}</span>
    }
    return <span key={i}>{part}</span>
  })
}

// Badge component
interface BadgeProps {
  children: ReactNode
  color: string
}

export function Badge({ children, color }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      style={{
        background: color,
        color: 'var(--bg)',
        padding: '6px 14px',
        borderRadius: 6,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {children}
    </motion.div>
  )
}
