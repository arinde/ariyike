import { useState, useEffect } from 'react'
import './SceneInstructions.css'

const SceneInstructions = ({ currentScene, showWishDialog, showAgeDialog }) => {
  const [visible, setVisible] = useState(true)
  const [instruction, setInstruction] = useState('')

  useEffect(() => {
    setVisible(true)
    
    switch(currentScene) {
      case 'compound':
        setInstruction('👆 Use the joystick to walk forward along the path')
        break
      case 'walkway':
        if (!showWishDialog) {
          setInstruction('🚶 Keep walking toward the house')
        } else if (!showAgeDialog) {
          setInstruction('💬 Answer the question to continue')
        } else {
          setInstruction('🏃 Walk to the front door')
        }
        break
      case 'door':
        setInstruction('🚪 Tap the door to open it')
        break
      case 'livingroom':
        setInstruction('🎂 Walk to the cake and tap to cut it!')
        break
      case 'photoshoot':
        setInstruction('📸 Tap "Snap" when ready! Change pose anytime!')
        break
      case 'party':
        setInstruction('🎉 Enjoy the party! Tap around for fun effects!')
        break
      default:
        setInstruction('')
    }
    
    // Auto-hide after 5 seconds, but show again on scene change
    const timer = setTimeout(() => {
      setVisible(false)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [currentScene, showWishDialog, showAgeDialog])

  if (!instruction) return null

  return (
    <>
      {visible && (
        <div className="scene-instruction">
          <div className="instruction-content">
            <p>{instruction}</p>
            <button 
              className="instruction-close"
              onClick={() => setVisible(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      {/* Show hint button when instructions are hidden */}
      {!visible && (
        <button 
          className="instruction-hint-btn"
          onClick={() => setVisible(true)}
        >
          ❓
        </button>
      )}
    </>
  )
}

export default SceneInstructions