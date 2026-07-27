import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGameState } from './hooks/useGameState'

// Scenes
import LoadingScene from './scenes/LoadingScene'
import CompoundScene from './scenes/CompoundScene'
import WalkwayScene from './scenes/WalkwayScene'
import DoorScene from './scenes/DoorScene'
import MainRoom from './scenes/MainRoom'
import PhotoShootScene from './scenes/PhotoShootScene'
import PartyScene from './scenes/PartyScene'

// Dialogs
import {
  WishDialog,
  AgeDialog,
  PhotoShootDialog,
  PoseSelector,
  BirthdayMessageModal
} from './components/Dialog/DialogModal'

// Poster
import PosterGenerator from './components/Poster/PosterGenerator'

// UI
import MobileControls from './components/UI/MobileControls'
import SceneInstructions from './components/UI/SceneInstructions'

import './styles/global.css'

function App() {
  const {
    currentScene,
    userData,
    activeDialog,
    isLoading,
    loadingText,
    goToScene,
    updateUserData,
    showDialog,
    closeDialog,
    submitWish,
    submitAge,
    startPhotoShoot,
    skipPhotoShoot,
    completePhotoShoot
  } = useGameState()
  
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [showInteraction, setShowInteraction] = useState(false)
  const [cakeCut, setCakeCut] = useState(false)
  const [selectedPose, setSelectedPose] = useState(null)
  const [showPoster, setShowPoster] = useState(false)
  const [showParty, setShowParty] = useState(false)
  
  // Dialog triggers - walk first, then dialog
  const [showWishDialog, setShowWishDialog] = useState(false)
  const [showAgeDialog, setShowAgeDialog] = useState(false)
  const [compoundDialogShown, setCompoundDialogShown] = useState(false)
  const [walkwayDialogShown, setWalkwayDialogShown] = useState(false)
  
  const sceneRef = useRef(null)
  const roomRef = useRef(null)
  
  // Check for photo
  useEffect(() => {
    const checkPhoto = async () => {
      try {
        const response = await fetch('/ariyike-photo.jpg')
        if (response.ok) {
          setAvatarUrl('https://models.readyplayer.me/649df122d87dd946d01647e6.glb')
        }
      } catch (e) {
        console.log('Photo not found yet')
      }
    }
    checkPhoto()
    const interval = setInterval(checkPhoto, 2000)
    return () => clearInterval(interval)
  }, [])
  
  // Scene event handlers - NEW FLOW: Walk first, then dialogs
  const handleLoadingComplete = () => {
    goToScene('compound')
    // Don't show dialog immediately - let them walk first
  }
  
  // Called when character reaches the gate area in compound
  const handleReachCompoundGate = () => {
    if (!compoundDialogShown) {
      setCompoundDialogShown(true)
      setShowWishDialog(true)
      showDialog('wish')
    }
  }
  
  const handleReachWalkway = () => {
    goToScene('walkway')
    // Age dialog will show after walking a bit in walkway
  }
  
  // Called when character walks enough in walkway
  const handleWalkwayProgress = () => {
    if (!walkwayDialogShown) {
      setWalkwayDialogShown(true)
      setShowAgeDialog(true)
      showDialog('age')
    }
  }
  
  const handleReachDoor = () => {
    goToScene('door')
  }
  
  const handleEnterHouse = () => {
    goToScene('livingroom')
  }
  
  const handleCakeCut = () => {
    setCakeCut(true)
    showDialog('message')
  }
  
  const handleMessageContinue = () => {
    closeDialog()
    showDialog('photoshoot')
  }
  
  const handlePhotoShootYes = () => {
    closeDialog()
    showDialog('pose')
  }
  
  const handlePoseSelect = (pose) => {
    setSelectedPose(pose)
    closeDialog()
    goToScene('photoshoot')
  }
  
  const handlePhotoShootComplete = () => {
    completePhotoShoot(selectedPose)
    setShowPoster(true)
  }
  
  const handleClosePoster = () => {
    setShowPoster(false)
    setShowParty(true)
    goToScene('party')
  }
  
  // Movement handlers
  const handleMove = (direction) => {
    if (sceneRef.current) {
      sceneRef.current.handleMove(direction)
    }
    if (roomRef.current) {
      roomRef.current.handleMove(direction)
    }
  }
  
  const handleStop = () => {
    if (sceneRef.current) {
      sceneRef.current.handleStop()
    }
    if (roomRef.current) {
      roomRef.current.handleStop()
    }
  }
  
  const handleInteract = () => {
    if (roomRef.current && showInteraction && !cakeCut) {
      roomRef.current.handleCakeInteraction()
    }
  }
  
  // Camera positions for each scene
  const getCameraPosition = () => {
    switch(currentScene) {
      case 'compound':
        return [0, 8, 15]
      case 'walkway':
        return [0, 6, 10]
      case 'door':
        return [0, 3, 8]
      case 'livingroom':
        return [0, 5, 10]
      case 'photoshoot':
        return [0, 4, 6]
      case 'party':
        return [0, 6, 12]
      default:
        return [0, 5, 10]
    }
  }
  
  // Render appropriate scene
  const renderScene = () => {
    switch(currentScene) {
      case 'compound':
        return (
          <CompoundScene 
            ref={sceneRef}
            avatarUrl={avatarUrl}
            onReachWalkway={handleReachWalkway}
            onReachGate={handleReachCompoundGate}
            dialogShown={compoundDialogShown}
          />
        )
      case 'walkway':
        return (
          <WalkwayScene 
            ref={sceneRef}
            avatarUrl={avatarUrl}
            onReachDoor={handleReachDoor}
            onShowAgeDialog={handleWalkwayProgress}
            dialogShown={walkwayDialogShown}
          />
        )
      case 'door':
        return (
          <DoorScene 
            onEnterHouse={handleEnterHouse}
          />
        )
      case 'livingroom':
        return (
          <MainRoom 
            ref={roomRef}
            gameState="playing"
            avatarUrl={avatarUrl}
            onCakeCut={handleCakeCut}
            onShowInteractionChange={setShowInteraction}
            cakeCut={cakeCut}
          />
        )
      case 'photoshoot':
        return (
          <PhotoShootScene 
            avatarUrl={avatarUrl}
            selectedPose={selectedPose}
            onComplete={handlePhotoShootComplete}
            onPoseChange={setSelectedPose}
          />
        )
      case 'party':
        return (
          <PartyScene 
            avatarUrl={avatarUrl}
            userData={userData}
          />
        )
      default:
        return null
    }
  }
  
  // Get background color based on scene
  const getBackgroundColor = () => {
    switch(currentScene) {
      case 'compound':
      case 'walkway':
      case 'door':
        return '#87ceeb' // Sky blue for outdoors
      case 'livingroom':
      case 'photoshoot':
        return '#f5f5dc' // Cream for indoors
      case 'party':
        return '#1a0a2e' // Dark purple for party atmosphere
      default:
        return '#87ceeb'
    }
  }
  
  return (
    <div className="app">
      {/* Loading Screen */}
      {currentScene === 'loading' && (
        <LoadingScene onComplete={handleLoadingComplete} />
      )}
      
      {/* Loading Overlay between scenes */}
      {isLoading && (
        <div className="scene-loading-overlay">
          <div className="scene-loading-content">
            <div className="scene-loading-spinner"></div>
            <p className="scene-loading-text">{loadingText}</p>
          </div>
        </div>
      )}
      
      {/* Main 3D Canvas */}
      {!isLoading && currentScene !== 'loading' && (
        <>
          <Canvas
            shadows
            camera={{ 
              position: getCameraPosition(), 
              fov: 50 
            }}
            gl={{ antialias: true, alpha: false }}
            style={{ width: '100vw', height: '100vh' }}
          >
            <color attach="background" args={[getBackgroundColor()]} />
            <fog attach="fog" args={[getBackgroundColor(), 15, 60]} />
            
            {/* Lighting */}
            {currentScene === 'livingroom' || currentScene === 'photoshoot' ? (
              // Indoor lighting
              <>
                <ambientLight intensity={0.7} color="#fff8dc" />
                <directionalLight
                  position={[-10, 8, 5]}
                  intensity={1.2}
                  color="#fff5e6"
                  castShadow
                  shadow-mapSize={2048}
                />
                <pointLight position={[0, 6, 0]} intensity={0.4} color="#fff8dc" distance={10} />
              </>
            ) : (
              // Outdoor lighting
              <>
                <ambientLight intensity={0.8} color="#fff" />
                <directionalLight
                  position={[10, 20, 10]}
                  intensity={1.5}
                  color="#fff"
                  castShadow
                  shadow-mapSize={2048}
                />
              </>
            )}
            
            {renderScene()}
          </Canvas>
          
          {/* Mobile Controls */}
          {currentScene !== 'door' && currentScene !== 'photoshoot' && currentScene !== 'party' && (
            <MobileControls 
              onMove={handleMove}
              onStop={handleStop}
              showInteraction={showInteraction}
              onInteract={handleInteract}
            />
          )}
          
          {/* Scene Instructions */}
          <SceneInstructions 
            currentScene={currentScene}
            showWishDialog={showWishDialog}
            showAgeDialog={showAgeDialog}
          />
        </>
      )}
      
      {/* Dialogs */}
      <WishDialog 
        isOpen={activeDialog === 'wish'} 
        onSubmit={submitWish}
      />
      
      <AgeDialog 
        isOpen={activeDialog === 'age'} 
        onSubmit={submitAge}
      />
      
      <BirthdayMessageModal 
        isOpen={activeDialog === 'message'}
        userData={userData}
        onContinue={handleMessageContinue}
      />
      
      <PhotoShootDialog 
        isOpen={activeDialog === 'photoshoot'}
        onYes={handlePhotoShootYes}
        onNo={skipPhotoShoot}
      />
      
      <PoseSelector 
        isOpen={activeDialog === 'pose'}
        onSelect={handlePoseSelect}
      />
      
      {/* Poster Generator */}
      {showPoster && (
        <PosterGenerator 
          userData={userData}
          onClose={handleClosePoster}
        />
      )}
    </div>
  )
}

export default App