import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane, Box, Cylinder, Sphere } from '@react-three/drei'
import Character from '../components/Character/Character'

const CompoundScene = forwardRef(({ avatarUrl, onReachWalkway }, ref) => {
  const [characterPosition, setCharacterPosition] = useState([0, 0, 8])
  const [characterRotation, setCharacterRotation] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  const [showHint, setShowHint] = useState(true)
  
  const walkwayTriggerZ = 3
  
  // Check if reached walkway
  useFrame(() => {
    if (characterPosition[2] <= walkwayTriggerZ) {
      onReachWalkway()
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
      newPosition[0] = Math.max(-8, Math.min(8, newPosition[0]))
      newPosition[2] = Math.max(-2, Math.min(10, newPosition[2]))
      
      setCharacterPosition(newPosition)
      setCharacterRotation(newRotation)
      setIsMoving(true)
      setShowHint(false)
    },
    
    handleStop: () => {
      setIsMoving(false)
    },
    
    getPosition: () => characterPosition
  }))
  
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 1000)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <>
      {/* Ground - Green lawn */}
      <Plane 
        args={[30, 30]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#4a7c59" roughness={0.9} />
      </Plane>
      
      {/* Path to house */}
      <Plane 
        args={[4, 15]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0.01, 2]}
        receiveShadow
      >
        <meshStandardMaterial color="#d4a373" roughness={0.8} />
      </Plane>
      
      {/* Path stones */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Box 
          key={i}
          args={[1.5, 0.02, 0.8]}
          position={[0, 0.02, 8 - i * 1.2]}
          rotation={[0, (i % 2) * 0.1, 0]}
        >
          <meshStandardMaterial color="#c9b896" roughness={0.9} />
        </Box>
      ))}
      
      {/* Fence - Left side */}
      <group position={[-10, 0, 0]}>
        {Array.from({ length: 15 }).map((_, i) => (
          <group key={i} position={[0, 0, -7 + i * 1.2]}>
            <Box args={[0.15, 2.5, 0.15]} position={[0, 1.25, 0]}>
              <meshStandardMaterial color="#8b4513" />
            </Box>
            <Box args={[0.3, 0.3, 0.3]} position={[0, 2.6, 0]}>
              <meshStandardMaterial color="#654321" />
            </Box>
          </group>
        ))}
        {/* Horizontal rails */}
        <Box args={[0.1, 0.2, 18]} position={[0, 1.8, 1]}>
          <meshStandardMaterial color="#654321" />
        </Box>
        <Box args={[0.1, 0.2, 18]} position={[0, 1.2, 1]}>
          <meshStandardMaterial color="#654321" />
        </Box>
      </group>
      
      {/* Fence - Right side */}
      <group position={[10, 0, 0]}>
        {Array.from({ length: 15 }).map((_, i) => (
          <group key={i} position={[0, 0, -7 + i * 1.2]}>
            <Box args={[0.15, 2.5, 0.15]} position={[0, 1.25, 0]}>
              <meshStandardMaterial color="#8b4513" />
            </Box>
            <Box args={[0.3, 0.3, 0.3]} position={[0, 2.6, 0]}>
              <meshStandardMaterial color="#654321" />
            </Box>
          </group>
        ))}
        {/* Horizontal rails */}
        <Box args={[0.1, 0.2, 18]} position={[0, 1.8, 1]}>
          <meshStandardMaterial color="#654321" />
        </Box>
        <Box args={[0.1, 0.2, 18]} position={[0, 1.2, 1]}>
          <meshStandardMaterial color="#654321" />
        </Box>
      </group>
      
      {/* Entry Gate */}
      <group position={[0, 0, 9]}>
        {/* Gate posts */}
        <Box args={[0.5, 4, 0.5]} position={[-2.5, 2, 0]}>
          <meshStandardMaterial color="#2c3e50" />
        </Box>
        <Box args={[0.5, 4, 0.5]} position={[2.5, 2, 0]}>
          <meshStandardMaterial color="#2c3e50" />
        </Box>
        {/* Gate arch */}
        <Cylinder args={[0.3, 0.3, 5.5]} position={[-2.5, 4.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#2c3e50" />
        </Cylinder>
        {/* Gate doors (open) */}
        <Box args={[0.1, 3.5, 2]} position={[-1.5, 1.75, -0.5]} rotation={[0, -0.5, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        <Box args={[0.1, 3.5, 2]} position={[1.5, 1.75, -0.5]} rotation={[0, 0.5, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
      </group>
      
      {/* Trees - Left side */}
      <group position={[-6, 0, 2]}>
        <Cylinder args={[0.4, 0.6, 2]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#5d4037" />
        </Cylinder>
        <Sphere args={[2.5]} position={[0, 3.5, 0]}>
          <meshStandardMaterial color="#228b22" />
        </Sphere>
      </group>
      
      <group position={[-7, 0, -2]}>
        <Cylinder args={[0.35, 0.5, 1.8]} position={[0, 0.9, 0]}>
          <meshStandardMaterial color="#5d4037" />
        </Cylinder>
        <Sphere args={[2.2]} position={[0, 3.2, 0]}>
          <meshStandardMaterial color="#32cd32" />
        </Sphere>
      </group>
      
      {/* Trees - Right side */}
      <group position={[6, 0, 0]}>
        <Cylinder args={[0.45, 0.65, 2.2]} position={[0, 1.1, 0]}>
          <meshStandardMaterial color="#5d4037" />
        </Cylinder>
        <Sphere args={[2.8]} position={[0, 4, 0]}>
          <meshStandardMaterial color="#228b22" />
        </Sphere>
      </group>
      
      <group position={[7, 0, 4]}>
        <Cylinder args={[0.3, 0.45, 1.5]} position={[0, 0.75, 0]}>
          <meshStandardMaterial color="#5d4037" />
        </Cylinder>
        <Sphere args={[1.8]} position={[0, 2.8, 0]}>
          <meshStandardMaterial color="#32cd32" />
        </Sphere>
      </group>
      
      {/* Bushes */}
      {[-5, -3, 3, 5].map((x, i) => (
        <Sphere key={i} args={[0.8]} position={[x, 0.4, 6]}>
          <meshStandardMaterial color="#2e8b57" />
        </Sphere>
      ))}
      
      {/* Flowers along path */}
      {Array.from({ length: 12 }).map((_, i) => (
        <group key={i} position={[(i % 2 === 0 ? -2.5 : 2.5), 0, 7 - i * 0.8]}>
          <Cylinder args={[0.05, 0.05, 0.4]} position={[0, 0.2, 0]}>
            <meshStandardMaterial color="#228b22" />
          </Cylinder>
          <Sphere args={[0.15]} position={[0, 0.45, 0]}>
            <meshStandardMaterial color={['#ff69b4', '#ffd700', '#ff6347', '#da70d6'][i % 4]} />
          </Sphere>
        </group>
      ))}
      
      {/* House visible in distance */}
      <group position={[0, 0, -10]}>
        {/* Main house body */}
        <Box args={[12, 6, 8]} position={[0, 3, 0]}>
          <meshStandardMaterial color="#f5f5dc" />
        </Box>
        {/* Roof */}
        <Cylinder args={[0, 7, 3]} position={[0, 7.5, 0]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Cylinder>
        {/* Front door */}
        <Box args={[2, 3.5, 0.2]} position={[0, 1.75, 4]}>
          <meshStandardMaterial color="#800000" />
        </Box>
        {/* Windows */}
        <Box args={[2, 2, 0.2]} position={[-3, 3, 4]}>
          <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.2} />
        </Box>
        <Box args={[2, 2, 0.2]} position={[3, 3, 4]}>
          <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.2} />
        </Box>
      </group>
      
      {/* Character */}
      <Character 
        position={characterPosition}
        rotation={[0, characterRotation, 0]}
        isMoving={isMoving}
        avatarUrl={avatarUrl}
      />
      
      {/* Instructions */}
      {showHint && (
        <group position={[0, 3, 6]}>
          <Box args={[4, 0.8, 0.1]}>
            <meshBasicMaterial color="#000000" transparent opacity={0.7} />
          </Box>
        </group>
      )}
    </>
  )
})

CompoundScene.displayName = 'CompoundScene'

export default CompoundScene