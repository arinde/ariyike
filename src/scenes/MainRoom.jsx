import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane } from '@react-three/drei'
import Room from '../components/Room/Room'
import Character from '../components/Character/Character'
import Cake from '../components/Cake/Cake'
import Effects from '../components/Effects/Effects'

const MainRoom = forwardRef(({ gameState, avatarUrl, onCakeCut, onShowInteractionChange, cakeCut: parentCakeCut }, ref) => {
  const [characterPosition, setCharacterPosition] = useState([-4, 0, 4])
  const [characterRotation, setCharacterRotation] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  const [showInteraction, setShowInteraction] = useState(false)
  const [localCakeCut, setLocalCakeCut] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  
  const cakePosition = [0, 0.5, 0]
  const interactionDistance = 2

  // Check if character is near cake
  useFrame(() => {
    const distance = Math.sqrt(
      Math.pow(characterPosition[0] - cakePosition[0], 2) +
      Math.pow(characterPosition[2] - cakePosition[2], 2)
    )
    
    const newShowInteraction = distance < interactionDistance && !localCakeCut && !parentCakeCut
    if (newShowInteraction !== showInteraction) {
      setShowInteraction(newShowInteraction)
      onShowInteractionChange(newShowInteraction)
    }
  })

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    handleMove: (direction) => {
      const speed = 0.1
      const newPosition = [...characterPosition]
      let newRotation = characterRotation
      
      switch(direction) {
        case 'up':
          newPosition[2] -= speed
          newRotation = Math.PI
          break
        case 'down':
          newPosition[2] += speed
          newRotation = 0
          break
        case 'left':
          newPosition[0] -= speed
          newRotation = -Math.PI / 2
          break
        case 'right':
          newPosition[0] += speed
          newRotation = Math.PI / 2
          break
      }
      
      // Boundary checks
      newPosition[0] = Math.max(-4.5, Math.min(4.5, newPosition[0]))
      newPosition[2] = Math.max(-4.5, Math.min(4.5, newPosition[2]))
      
      setCharacterPosition(newPosition)
      setCharacterRotation(newRotation)
      setIsMoving(true)
    },
    
    handleStop: () => {
      setIsMoving(false)
    },
    
    handleCakeInteraction: () => {
      if (showInteraction && !localCakeCut && !parentCakeCut) {
        setLocalCakeCut(true)
        setShowConfetti(true)
        onCakeCut()
      }
    }
  }))

  return (
    <>
      {/* Room Environment */}
      <Room />
      
      {/* Character */}
      <Character 
        position={characterPosition}
        rotation={[0, characterRotation, 0]}
        isMoving={isMoving}
        avatarUrl={avatarUrl}
      />
      
      {/* Cake */}
      <Cake 
        position={cakePosition}
        cut={localCakeCut || parentCakeCut}
        onClick={() => {
          if (showInteraction && !localCakeCut && !parentCakeCut) {
            setLocalCakeCut(true)
            setShowConfetti(true)
            onCakeCut()
          }
        }}
      />
      
      {/* Confetti Effect */}
      {showConfetti && <Effects />}
      
      {/* Floor */}
      <Plane 
        args={[10, 10]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          color="#3e2723" 
          roughness={0.8}
        />
      </Plane>
    </>
  )
})

MainRoom.displayName = 'MainRoom'

export default MainRoom