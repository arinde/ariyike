import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Cylinder } from '@react-three/drei'

const Character = ({ position, rotation, isMoving, avatarUrl, pose }) => {
  const groupRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const walkCycle = useRef(0)
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    // Handle pose animations
    if (pose && !isMoving) {
      const time = state.clock.elapsedTime
      
      switch(pose) {
        case 'peace':
          // Right arm up with peace sign
          if (rightArmRef.current) {
            rightArmRef.current.rotation.z = -2.5
            rightArmRef.current.rotation.x = 0
          }
          if (leftArmRef.current) {
            leftArmRef.current.rotation.z = 0
          }
          break
          
        case 'celebration':
          // Both arms up
          if (rightArmRef.current) {
            rightArmRef.current.rotation.z = -2.8
          }
          if (leftArmRef.current) {
            leftArmRef.current.rotation.z = 2.8
          }
          break
          
        case 'elegant':
          // One hand on hip, one at side
          if (rightArmRef.current) {
            rightArmRef.current.rotation.z = -0.3
            rightArmRef.current.rotation.x = 0.5
          }
          if (leftArmRef.current) {
            leftArmRef.current.rotation.z = 0.5
            leftArmRef.current.rotation.x = -0.3
          }
          break
          
        case 'smile':
          // Natural standing, slight arm movement
          if (rightArmRef.current) {
            rightArmRef.current.rotation.z = -0.1 + Math.sin(time) * 0.05
          }
          if (leftArmRef.current) {
            leftArmRef.current.rotation.z = 0.1 - Math.sin(time) * 0.05
          }
          break
          
        default:
          // Idle breathing
          groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.02
          if (rightArmRef.current) rightArmRef.current.rotation.z = 0
          if (leftArmRef.current) leftArmRef.current.rotation.z = 0
      }
    } else if (isMoving) {
      // Walking animation
      walkCycle.current += 0.15
      groupRef.current.position.y = position[1] + Math.sin(walkCycle.current) * 0.05
      
      // Arm swing
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = 0
        rightArmRef.current.rotation.x = Math.sin(walkCycle.current) * 0.5
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = 0
        leftArmRef.current.rotation.x = -Math.sin(walkCycle.current) * 0.5
      }
    } else {
      // Idle breathing
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = 0
        rightArmRef.current.rotation.x = 0
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = 0
        leftArmRef.current.rotation.x = 0
      }
    }
  })

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...position)
      groupRef.current.rotation.set(...rotation)
    }
  }, [position, rotation])

  return (
    <group ref={groupRef} position={position} rotation={rotation} castShadow>
      {/* Body */}
      <Box args={[0.5, 0.7, 0.3]} position={[0, 1.1, 0]} castShadow>
        <meshStandardMaterial color="#800000" />
      </Box>
      
      {/* Head */}
      <Sphere args={[0.25, 16, 16]} position={[0, 1.7, 0]} castShadow>
        <meshStandardMaterial color="#fdbcb4" />
      </Sphere>
      
      {/* Arms with refs for animation */}
      <Box 
        ref={leftArmRef}
        args={[0.12, 0.6, 0.12]} 
        position={[-0.35, 1.1, 0]} 
        castShadow
      >
        <meshStandardMaterial color="#800000" />
      </Box>
      <Box 
        ref={rightArmRef}
        args={[0.12, 0.6, 0.12]} 
        position={[0.35, 1.1, 0]} 
        castShadow
      >
        <meshStandardMaterial color="#800000" />
      </Box>
      
      {/* Legs */}
      <Box args={[0.15, 0.7, 0.15]} position={[-0.15, 0.35, 0]} castShadow>
        <meshStandardMaterial color="#3e2723" />
      </Box>
      <Box args={[0.15, 0.7, 0.15]} position={[0.15, 0.35, 0]} castShadow>
        <meshStandardMaterial color="#3e2723" />
      </Box>
      
      {/* Hair */}
      <Sphere args={[0.28, 16, 16]} position={[0, 1.8, 0]} castShadow>
        <meshStandardMaterial color="#2d1b18" />
      </Sphere>
      
      {/* Name Tag */}
      <Box args={[0.2, 0.08, 0.02]} position={[0, 1.3, 0.16]}>
        <meshStandardMaterial color="#ffd700" />
      </Box>
      
      {/* Pose indicator - Peace sign hand */}
      {pose === 'peace' && (
        <group position={[0.5, 2, 0.2]}>
          <Box args={[0.08, 0.2, 0.08]}>
            <meshStandardMaterial color="#fdbcb4" />
          </Box>
          <Box args={[0.03, 0.12, 0.03]} position={[-0.03, 0.15, 0]}>
            <meshStandardMaterial color="#fdbcb4" />
          </Box>
          <Box args={[0.03, 0.12, 0.03]} position={[0.03, 0.15, 0]}>
            <meshStandardMaterial color="#fdbcb4" />
          </Box>
        </group>
      )}
    </group>
  )
}

export default Character