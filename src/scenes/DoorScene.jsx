import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane, Box, Cylinder, Sphere } from '@react-three/drei'

const DoorScene = ({ onEnterHouse }) => {
  const [doorOpen, setDoorOpen] = useState(false)
  const [doorRotation, setDoorRotation] = useState(0)
  const [showClickHint, setShowClickHint] = useState(true)
  const [entering, setEntering] = useState(false)
  const cameraRef = useRef()
  
  // Door opening animation
  useFrame(() => {
    if (doorOpen && doorRotation < Math.PI / 2.5) {
      setDoorRotation(prev => Math.min(prev + 0.03, Math.PI / 2.5))
    }
  })
  
  const handleDoorClick = () => {
    if (!doorOpen) {
      setDoorOpen(true)
      setShowClickHint(false)
      
      // Wait for door to open, then enter
      setTimeout(() => {
        setEntering(true)
        setTimeout(() => {
          onEnterHouse()
        }, 1500)
      }, 1000)
    }
  }
  
  return (
    <>
      {/* Porch floor */}
      <Plane 
        args={[8, 5]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 2]}
        receiveShadow
      >
        <meshStandardMaterial color="#c9b896" />
      </Plane>
      
      {/* House exterior wall */}
      <Box args={[12, 6, 0.5]} position={[0, 3, -0.25]}>
        <meshStandardMaterial color="#f5f5dc" />
      </Box>
      
      {/* Door frame */}
      <Box args={[2.8, 4.2, 0.4]} position={[-2.5, 2.1, 0]}>
        <meshStandardMaterial color="#fff" />
      </Box>
      <Box args={[2.8, 4.2, 0.4]} position={[2.5, 2.1, 0]}>
        <meshStandardMaterial color="#fff" />
      </Box>
      <Box args={[6, 0.8, 0.4]} position={[0, 4.5, 0]}>
        <meshStandardMaterial color="#fff" />
      </Box>
      
      {/* Door */}
      <group 
        position={[-1.3, 0, 0]}
        rotation={[0, doorRotation, 0]}
        onClick={handleDoorClick}
      >
        <Box args={[2.4, 3.8, 0.15]} position={[1.2, 1.9, 0]}>
          <meshStandardMaterial color="#800000" />
        </Box>
        {/* Door panels */}
        <Box args={[1, 1.5, 0.05]} position={[0.8, 2.8, 0.1]}>
          <meshStandardMaterial color="#600000" />
        </Box>
        <Box args={[1, 1.5, 0.05]} position={[1.6, 2.8, 0.1]}>
          <meshStandardMaterial color="#600000" />
        </Box>
        <Box args={[1, 1.2, 0.05]} position={[0.8, 1, 0.1]}>
          <meshStandardMaterial color="#600000" />
        </Box>
        <Box args={[1, 1.2, 0.05]} position={[1.6, 1, 0.1]}>
          <meshStandardMaterial color="#600000" />
        </Box>
        {/* Door handle */}
        <Sphere args={[0.08]} position={[2, 1.9, 0.15]}>
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </Sphere>
      </group>
      
      {/* Dark interior visible when door opens */}
      {doorOpen && (
        <Plane 
          args={[2.4, 3.8]} 
          position={[0, 1.9, 0.2]}
        >
          <meshStandardMaterial color="#1a1a1a" />
        </Plane>
      )}
      
      {/* Porch roof overhang */}
      <Box args={[10, 0.3, 4]} position={[0, 4.8, 2]}>
        <meshStandardMaterial color="#fff" />
      </Box>
      
      {/* Porch columns */}
      <Cylinder args={[0.25, 0.25, 4.8]} position={[-4, 2.4, 3.5]}>
        <meshStandardMaterial color="#fff" />
      </Cylinder>
      <Cylinder args={[0.25, 0.25, 4.8]} position={[4, 2.4, 3.5]}>
        <meshStandardMaterial color="#fff" />
      </Cylinder>
      
      {/* Welcome mat */}
      <Plane 
        args={[2, 1]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0.02, 1.5]}
        receiveShadow
      >
        <meshStandardMaterial color="#800000" />
      </Plane>
      
      {/* Potted plants on porch */}
      <group position={[-3, 0, 3]}>
        <Cylinder args={[0.4, 0.3, 0.6]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Cylinder>
        <Sphere args={[0.6]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#228b22" />
        </Sphere>
      </group>
      
      <group position={[3, 0, 3]}>
        <Cylinder args={[0.4, 0.3, 0.6]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Cylinder>
        <Sphere args={[0.6]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#32cd32" />
        </Sphere>
      </group>
      
      {/* Wall lanterns */}
      <group position={[-2.5, 3, 0.3]}>
        <Box args={[0.4, 0.6, 0.4]}>
          <meshStandardMaterial color="#2c3e50" />
        </Box>
        <Sphere args={[0.15]} position={[0, 0, 0.3]}>
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} />
        </Sphere>
        <pointLight position={[0, 0, 0.5]} intensity={0.5} color="#ffd700" distance={3} />
      </group>
      
      <group position={[2.5, 3, 0.3]}>
        <Box args={[0.4, 0.6, 0.4]}>
          <meshStandardMaterial color="#2c3e50" />
        </Box>
        <Sphere args={[0.15]} position={[0, 0, 0.3]}>
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} />
        </Sphere>
        <pointLight position={[0, 0, 0.5]} intensity={0.5} color="#ffd700" distance={3} />
      </group>
      
      {/* Click hint */}
      {showClickHint && (
        <group position={[0, 3.5, 2]}>
          <Box args={[3, 0.6, 0.1]}>
            <meshBasicMaterial color="#000000" transparent opacity={0.7} />
          </Box>
        </group>
      )}
    </>
  )
}

export default DoorScene