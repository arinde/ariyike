import { useState, useRef, useEffect } from 'react'

const MobileControls = ({ onMove, onStop, showInteraction, onInteract }) => {
  const [joystickActive, setJoystickActive] = useState(false)
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 })
  const joystickRef = useRef(null)
  const containerRef = useRef(null)

  const handleTouchStart = (e) => {
    e.preventDefault()
    setJoystickActive(true)
    updateJoystickPosition(e.touches[0])
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    if (joystickActive) {
      updateJoystickPosition(e.touches[0])
    }
  }

  const handleTouchEnd = (e) => {
    e.preventDefault()
    setJoystickActive(false)
    setJoystickPos({ x: 0, y: 0 })
    onStop()
  }

  const updateJoystickPosition = (touch) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    let x = touch.clientX - centerX
    let y = touch.clientY - centerY
    
    // Limit joystick movement
    const maxDistance = 35
    const distance = Math.sqrt(x * x + y * y)
    
    if (distance > maxDistance) {
      x = (x / distance) * maxDistance
      y = (y / distance) * maxDistance
    }
    
    setJoystickPos({ x, y })
    
    // Determine direction
    const threshold = 10
    if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
      if (Math.abs(x) > Math.abs(y)) {
        onMove(x > 0 ? 'right' : 'left')
      } else {
        onMove(y > 0 ? 'down' : 'up')
      }
    }
  }

  // Keyboard controls for desktop testing
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp':
        case 'w':
          onMove('up')
          break
        case 'ArrowDown':
        case 's':
          onMove('down')
          break
        case 'ArrowLeft':
        case 'a':
          onMove('left')
          break
        case 'ArrowRight':
        case 'd':
          onMove('right')
          break
        case ' ':
        case 'Enter':
          if (showInteraction) onInteract()
          break
      }
    }

    const handleKeyUp = () => {
      onStop()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [onMove, onStop, showInteraction, onInteract])

  return (
    <>
      {/* Joystick */}
      <div 
        ref={containerRef}
        className="mobile-controls"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={(e) => {
          setJoystickActive(true)
          updateJoystickPosition(e)
        }}
        onMouseMove={(e) => {
          if (joystickActive) updateJoystickPosition(e)
        }}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        <div 
          className="joystick-knob"
          style={{
            transform: `translate(calc(-50% + ${joystickPos.x}px), calc(-50% + ${joystickPos.y}px))`
          }}
        />
      </div>

      {/* Interaction Hint */}
      {showInteraction && (
        <div className="interaction-hint" onClick={onInteract}>
          🎂 Tap to cut cake!
        </div>
      )}

      {/* Instructions */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        color: '#f5e6d3',
        fontSize: '0.8rem',
        zIndex: 50,
        background: 'rgba(0,0,0,0.5)',
        padding: '10px',
        borderRadius: '8px'
      }}>
        <p>🎮 Walk to the cake</p>
        <p>🎂 Tap to cut it!</p>
      </div>
    </>
  )
}

export default MobileControls