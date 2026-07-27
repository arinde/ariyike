import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane, Box, Cylinder, Sphere } from '@react-three/drei'
import Character from '../components/Character/Character'

const WalkwayScene = forwardRef(({ avatarUrl, onReachDoor, onShowAgeDialog }, ref) => {
  const [characterPosition, setCharacterPosition] = useState([0, 0, 5])
  const [characterRotation, setCharacterRotation] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  const [stepsTaken, setStepsTaken] = useState(0)
  const [dialogShown, setDialogShown] = useState(false)
  
  const doorTriggerZ = -2
  const dialogTriggerSteps = 5
  
  useFrame(() => {
    // Check if should show age dialog after walking
    if (stepsTaken >= dialogTriggerSteps && !dialogShown) {
      setDialogShown(true)
      onShowAgeDialog()
    }
    
    // Check if reached door
    if (characterPosition[2] <= doorTriggerZ && dialogShown) {
      onReachDoor()
    }
  })
  
  useImperativeHandle(ref, () => ({
    handleMove: (direction) => {
      const speed = 0.15
      const newPosition = [...characterPosition]
      let newRotation = characterRotation
      
      switch(direction) {
        case 'up':
          newPosition[2] -= speed
          newRotation = Math.PI
          if (!dialogShown) {
            setStepsTaken(prev => prev + 1)
          }
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
      newPosition[0] = Math.max(-3, Math.min(3, newPosition[0]))
      newPosition[2] = Math.max(-3, Math.min(6, newPosition[2]))
      
      setCharacterPosition(newPosition)
      setCharacterRotation(newRotation)
      setIsMoving(true)
    },
    
    handleStop: () => {
      setIsMoving(false)
    },
    
    getPosition: () => characterPosition
  }))
  
  return (
    <>
      {/* Ground - More manicured lawn */}
      <Plane 
        args={[15, 15]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#5a8f6a" roughness={0.9} />
      </Plane>
      
      {/* Main walkway */}
      <Plane 
        args={[3, 10]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0.01, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#e8dcc0" roughness={0.8} />
      </Plane>
      
      {/* Decorative path stones */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Cylinder 
          key={i}
          args={[0.6, 0.6, 0.05]} 
          position={[0, 0.03, 3.5 - i * 1]}
          rotation={[0, (i * 0.3), 0]}
        >
          <meshStandardMaterial color="#d4c4a8" roughness={0.9} />
        </Cylinder>
      ))}
      
      {/* Front porch/steps */}
      <Box args={[5, 0.3, 1.5]} position={[0, 0.15, -2.5]} receiveShadow>
        <meshStandardMaterial color="#c9b896" />
      </Box>
      
      {/* Garden beds on sides */}
      <group position={[-4, 0, 0]}>
        <Box args={[2, 0.4, 8]} position={[0, 0.2, 0]} receiveShadow>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Flowers */}
        {Array.from({ length: 15 }).map((_, i) => (
          <group key={i} position={[(Math.random() - 0.5) * 1.5, 0.4, -3 + i * 0.6]}>
            <Cylinder args={[0.03, 0.03, 0.3]}>
              <meshStandardMaterial color="#228b22" />
            </Cylinder>
            <Sphere args={[0.12]} position={[0, 0.2, 0]}>
              <meshStandardMaterial color={['#ff69b4', '#ffd700', '#ff6347', '#ff1493', '#ffa500'][i % 5]} />
            </Sphere>
          </group>
        ))}
      </group>
      
      <group position={[4, 0, 0]}>
        <Box args={[2, 0.4, 8]} position={[0, 0.2, 0]} receiveShadow>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Flowers */}
        {Array.from({ length: 15 }).map((_, i) => (
          <group key={i} position={[(Math.random() - 0.5) * 1.5, 0.4, -3 + i * 0.6]}>
            <Cylinder args={[0.03, 0.03, 0.3]}>
              <meshStandardMaterial color="#228b22" />
            </Cylinder>
            <Sphere args={[0.12]} position={[0, 0.2, 0]}>
              <meshStandardMaterial color={['#da70d6', '#ff69b4', '#ffd700', '#ff4500', '#9370db'][i % 5]} />
            </Sphere>
          </group>
        ))}
      </group>
      
      {/* Small trees/bushes near house */}
      <group position={[-3, 0, -3]}>
        <Cylinder args={[0.2, 0.3, 1.5]} position={[0, 0.75, 0]}>
          <meshStandardMaterial color="#5d4037" />
        </Cylinder>
        <Sphere args={[1.2]} position={[0, 2.2, 0]}>
          <meshStandardMaterial color="#228b22" />
        </Sphere>
      </group>
      
      <group position={[3, 0, -3]}>
        <Cylinder args={[0.2, 0.3, 1.5]} position={[0, 0.75, 0]}>
          <meshStandardMaterial color="#5d4037" />
        </Cylinder>
        <Sphere args={[1.2]} position={[0, 2.2, 0]}>
          <meshStandardMaterial color="#32cd32" />
        </Sphere>
      </group>
      
      {/* House facade (closer view) */}
      <group position={[0, 0, -6]}>
        {/* Main wall */}
        <Box args={[10, 5, 0.5]} position={[0, 2.5, 0]}>
          <meshStandardMaterial color="#f5f5dc" />
        </Box>
        
        {/* Door frame */}
        <Box args={[2.5, 4, 0.3]} position={[-3.5, 2, 0.2]}>
          <meshStandardMaterial color="#f5f5dc" />
        </Box>
        <Box args={[2.5, 4, 0.3]} position={[3.5, 2, 0.2]}>
          <meshStandardMaterial color="#f5f5dc" />
        </Box>
        <Box args={[5, 1, 0.3]} position={[0, 4.5, 0.2]}>
          <meshStandardMaterial color="#f5f5dc" />
        </Box>
        
        {/* The Door */}
        <Box args={[2, 3.5, 0.2]} position={[0, 1.75, 0.3]}>
          <meshStandardMaterial color="#800000" />
        </Box>
        {/* Door handle */}
        <Sphere args={[0.08]} position={[0.7, 1.8, 0.4]}>
          <meshStandardMaterial color="#ffd700" metalness={0.8} />
        </Sphere>
        
        {/* Windows */}
        <Box args={[1.8, 2, 0.3]} position={[-3.5, 2.5, 0.2]}>
          <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.2} />
        </Box>
        <Box args={[1.8, 2, 0.3]} position={[3.5, 2.5, 0.2]}>
          <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.2} />
        </Box>
        
        {/* Window frames */}
        <Box args={[2, 0.15, 0.35]} position={[-3.5, 3.5, 0.2]}>
          <meshStandardMaterial color="#fff" />
        </Box>
        <Box args={[2, 0.15, 0.35]} position={[-3.5, 1.5, 0.2]}>
          <meshStandardMaterial color="#fff" />
        </Box>
        <Box args={[0.15, 2, 0.35]} position={[-3.5, 2.5, 0.2]}>
          <meshStandardMaterial color="#fff" />
        </Box>
      </group>
      
      {/* Character */}
      <Character 
        position={characterPosition}
        rotation={[0, characterRotation, 0]}
        isMoving={isMoving}
        avatarUrl={avatarUrl}
      />
    </>
  )
})

WalkwayScene.displayName = 'WalkwayScene'

export default WalkwayScene