import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Cylinder, useGLTF } from '@react-three/drei'

const Character = ({ position, rotation, isMoving, avatarUrl }) => {
  const groupRef = useRef()
  const walkCycle = useRef(0)
  
  // For MVP, we'll use a simple stylized character
  // In production, you'd load the Ready Player Me avatar here
  // const { scene } = useGLTF(avatarUrl || '/default-avatar.glb')
  
  useFrame((state) => {
    if (isMoving && groupRef.current) {
      walkCycle.current += 0.15
      // Bobbing motion for walking
      groupRef.current.position.y = position[1] + Math.sin(walkCycle.current) * 0.05
      // Arm swing
      groupRef.current.children[2].rotation.x = Math.sin(walkCycle.current) * 0.5
      groupRef.current.children[3].rotation.x = -Math.sin(walkCycle.current) * 0.5
    } else if (groupRef.current) {
      // Idle breathing
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02
      groupRef.current.children[2].rotation.x = 0
      groupRef.current.children[3].rotation.x = 0
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
      
      {/* Arms */}
      <Box 
        ref={(el) => { if (groupRef.current) groupRef.current.children[2] = el }}
        args={[0.12, 0.6, 0.12]} 
        position={[-0.35, 1.1, 0]} 
        castShadow
      >
        <meshStandardMaterial color="#800000" />
      </Box>
      <Box 
        ref={(el) => { if (groupRef.current) groupRef.current.children[3] = el }}
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
    </group>
  )
}

export default Character