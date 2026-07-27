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
          <color attach="background" args={['#87ceeb']} />
          <fog attach="fog" args={['#e0f6ff', 15, 60]} />
          
          {/* Bright ambient light - simulates daylight */}
          <ambientLight intensity={0.7} color="#fff8dc" />
          
          {/* Main sunlight coming through window */}
          <directionalLight
            position={[-10, 8, 5]}
            intensity={1.2}
            color="#fff5e6"
            castShadow
            shadow-mapSize={2048}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          
          {/* Fill light from ceiling */}
          <pointLight position={[0, 6, 0]} intensity={0.4} color="#fff8dc" distance={10} />
          
          {/* Warm light near the reading corner */}
          <pointLight position={[-4, 3, -3]} intensity={0.3} color="#ffd700" distance={5} />
            
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