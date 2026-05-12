import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Slide01Title } from './slides/Slide01'
import { Slide02WhatIsMCP } from './slides/Slide02'
import { Slide03Problem } from './slides/Slide03'
import { Slide04Solution } from './slides/Slide04'
import { Slide05CreatePost } from './slides/Slide05'
import { Slide06UpdatePost } from './slides/Slide06'
import { Slide07DeletePost } from './slides/Slide07'
import { Slide08BulkOps } from './slides/Slide08'
import { Slide09Benefits } from './slides/Slide09'
import { Slide10CTA } from './slides/Slide10'
import { Controls } from './components/Controls'
import { ProgressBar } from './components/ProgressBar'


const slides = [
  Slide01Title,
  Slide02WhatIsMCP,
  Slide03Problem,
  Slide04Solution,
  Slide05CreatePost,
  Slide06UpdatePost,
  Slide07DeletePost,
  Slide08BulkOps,
  Slide09Benefits,
  Slide10CTA,
]

export default function App() {
  const [page] = useState(() => window.location.pathname)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setDirection(index > currentSlide ? 1 : -1)
      setCurrentSlide(index)
    }
  }, [currentSlide])

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1)
      setCurrentSlide(prev => prev + 1)
    }
  }, [currentSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide(prev => prev - 1)
    }
  }, [currentSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'Enter':
          e.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'Backspace':
          e.preventDefault()
          prevSlide()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(0)
          break
        case 'End':
          e.preventDefault()
          goToSlide(slides.length - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide])

  // Touch/swipe support
  useEffect(() => {
    let touchStartX = 0
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const diffX = touchStartX - touchEndX
      const diffY = touchStartY - touchEndY

      // Horizontal swipe
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) nextSlide()
        else prevSlide()
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [nextSlide, prevSlide])

  const CurrentSlideComponent = slides[currentSlide]



  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <ProgressBar current={currentSlide} total={slides.length} />
      
      <AnimatePresence mode="wait" custom={direction}>
        <CurrentSlideComponent key={currentSlide} direction={direction} />
      </AnimatePresence>

      <Controls
        current={currentSlide}
        total={slides.length}
        onPrev={prevSlide}
        onNext={nextSlide}
        onGoTo={goToSlide}
      />
    </div>
  )
}
