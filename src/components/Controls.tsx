import { motion } from 'framer-motion'

interface ControlsProps {
  current: number
  total: number
  onPrev: () => void
  onNext: () => void
  onGoTo: (index: number) => void
}

export function Controls({ current, total, onPrev, onNext, onGoTo }: ControlsProps) {
  return (
    <>
      {/* Bottom LEFT navigation - smaller */}
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 10px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          borderRadius: 10,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          zIndex: 100,
        }}
      >
        {/* Prev button */}
        <NavButton onClick={onPrev} disabled={current === 0}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </NavButton>

        {/* Slide dots - smaller */}
        <div style={{ display: 'flex', gap: 4, padding: '0 4px' }}>
          {Array.from({ length: total }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => onGoTo(i)}
              style={{
                width: i === current ? 16 : 6,
                height: 6,
                borderRadius: 3,
                border: 'none',
                background: i === current 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' 
                  : '#d1d5db',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              title={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <NavButton onClick={onNext} disabled={current === total - 1}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </NavButton>

        {/* Slide counter inline */}
        <span style={{
          fontSize: 10,
          fontWeight: 500,
          color: '#9ca3af',
          marginLeft: 4,
        }}>
          {current + 1}/{total}
        </span>
      </div>
    </>
  )
}

function NavButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        border: 'none',
        background: disabled ? '#f1f5f9' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: disabled ? '#cbd5e1' : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: disabled ? 'none' : '0 2px 8px rgba(59, 130, 246, 0.25)',
      }}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.9 }}
    >
      {children}
    </motion.button>
  )
}
