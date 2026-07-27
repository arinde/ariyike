import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import LoadingScene from './scenes/LoadingScene'
import MainRoom from './scenes/MainRoom'
import MobileControls from './components/UI/MobileControls'
import './styles/global.css'

function App() {
  const [gameState, setGameState] = useState('loading') // loading, playing, celebration
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [showInteraction, setShowInteraction] = useState(false)
  const [cakeCut, setCakeCut] = useState(false)
  const mainRoomRef = useRef(null)

  useEffect(() => {
    // Check if photo exists
    const checkPhoto = async () => {
      try {
        const response = await fetch('/ariyike-photo.jpg')
        if (response.ok) {
          // Photo exists - in real implementation, we'd send this to Ready Player Me
          // For now, we'll use a placeholder avatar URL
          setAvatarUrl('https://models.readyplayer.me/649df122d87dd946d01647e6.glb')
        }
      } catch (e) {
        console.log('Photo not found yet')
      }
    }
    checkPhoto()
    
    // Poll for photo every 2 seconds
    const interval = setInterval(checkPhoto, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleLoadingComplete = () => {
    setGameState('playing')
  }

  const handleCakeCut = () => {
    setCakeCut(true)
    setGameState('celebration')
  }

  const handleMove = (direction) => {
    if (mainRoomRef.current) {
      mainRoomRef.current.handleMove(direction)
    }
  }

  const handleStop = () => {
    if (mainRoomRef.current) {
      mainRoomRef.current.handleStop()
    }
  }

  const handleInteract = () => {
    if (mainRoomRef.current && showInteraction && !cakeCut) {
      mainRoomRef.current.handleCakeInteraction()
    }
  }

  return (
    <div className="app">
      {gameState === 'loading' && (
        <LoadingScene onComplete={handleLoadingComplete} />
      )}
      
      {(gameState === 'playing' || gameState === 'celebration') && (
        <>
          <Canvas
            shadows
            camera={{ position: [0, 5, 10], fov: 50 }}
            gl={{ antialias: true, alpha: false }}
            style={{ width: '100vw', height: '100vh' }}
          >
            <color attach="background" args={['#1a0f0f']} />
            <fog attach="fog" args={['#1a0f0f', 10, 50]} />
            
            <ambientLight intensity={0.4} color="#ffd4a3" />
            <directionalLight
              position={[5, 10, 5]}
              intensity={1}
              color="#ffecd2"
              castShadow
              shadow-mapSize={1024}
            />
            <pointLight position={[0, 3, 0]} intensity={0.8} color="#ff6b35" />
            
            <MainRoom 
              ref={mainRoomRef}
              gameState={gameState}
              avatarUrl={avatarUrl}
              onCakeCut={handleCakeCut}
              onShowInteractionChange={setShowInteraction}
              cakeCut={cakeCut}
            />
          </Canvas>
          
          {/* Mobile Controls - Outside of Canvas */}
          <MobileControls 
            onMove={handleMove}
            onStop={handleStop}
            showInteraction={showInteraction}
            onInteract={handleInteract}
          />
        </>
      )}

      {gameState === 'celebration' && (
        <div className="birthday-message">
          <div className="message-content">
            <h1>Happy Birthday, Ariyike!</h1>
            <p>May your year be filled with wonderful stories,</p>
            <p>cozy moments, and all the joy you bring to others.</p>
            <p className="heart">📚✨🎂</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App