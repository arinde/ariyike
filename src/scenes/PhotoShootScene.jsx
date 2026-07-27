import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, Sphere } from '@react-three/drei'
import Character from '../components/Character/Character'

const PhotoShootScene = ({ avatarUrl, selectedPose, onComplete }) => {
  const [countdown, setCountdown] = useState(3)
  const [showFlash, setShowFlash] = useState(false)
  const [photoTaken, setPhotoTaken] = useState(false)
  const characterRef = useRef()
  const cameraManRef = useRef()
  
  // Countdown effect
  useEffect(() => {
    if (countdown > 0 && !photoTaken) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !photoTaken) {
      // Take photo
      setShowFlash(true)
      setPhotoTaken(true)
      setTimeout(() => {
        setShowFlash(false)
        onComplete()
      }, 500)
    }
  }, [countdown, photoTaken, onComplete])
  
  // Get pose rotation based on selected pose
  const getPoseRotation = () => {
    switch(selectedPose) {
      case 'peace':
        return [0, -Math.PI / 4, 0]
      case 'celebration':
        return [0, 0, 0]
      case 'elegant':
        return [0, Math.PI / 6, 0]
      case 'smile':
        return [0, -Math.PI / 6, 0]
      default:
        return [0, 0, 0]
    }
  }
  
  return (
    <>
      {/* Living room floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>
      
      {/* Photo backdrop curtain */}
      <mesh position={[0, 3.5, -4.9]}>
        <planeGeometry args={[8, 7]} />
        <meshStandardMaterial color="#800000" />
      </mesh>
      
      {/* Spotlight effect on floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[2.5, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
      
      {/* Character posing */}
      <group position={[0, 0, 0]} rotation={getPoseRotation()}>
        <Character 
          position={[0, 0, 0]}
          rotation={getPoseRotation()}
          isMoving={false}
          avatarUrl={avatarUrl}
          pose={selectedPose}
        />
        
        {/* Pose indicators */}
        {selectedPose === 'peace' && (
          <Sphere args={[0.1]} position={[-0.4, 1.8, 0.3]}>
            <meshStandardMaterial color="#fdbcb4" />
          </Sphere>
        )}
      </group>
      
      {/* Camera Man / Photographer */}
      <group position={[0, 0, 4]} ref={cameraManRef}>
        {/* Body */}
        <Box args={[0.6, 1.8, 0.4]} position={[0, 0.9, 0]} castShadow>
          <meshStandardMaterial color="#2c3e50" />
        </Box>
        {/* Head */}
        <Sphere args={[0.35]} position={[0, 2, 0]} castShadow>
          <meshStandardMaterial color="#fdbcb4" />
        </Sphere>
        {/* Camera */}
        <group position={[0, 1.4, -0.3]}>
          <Box args={[0.4, 0.3, 0.5]}>
            <meshStandardMaterial color="#1a1a1a" />
          </Box>
          {/* Lens */}
          <Cylinder args={[0.12, 0.12, 0.3]} position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#333" />
          </Cylinder>
          {/* Flash */}
          <Box args={[0.15, 0.1, 0.05]} position={[0, 0.2, -0.25]}>
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={showFlash ? 2 : 0.2} />
          </Box>
        </group>
        {/* Arms holding camera */}
        <Box args={[0.15, 0.6, 0.15]} position={[-0.35, 1.3, -0.2]} rotation={[0.5, 0, -0.3]}>
          <meshStandardMaterial color="#2c3e50" />
        </Box>
        <Box args={[0.15, 0.6, 0.15]} position={[0.35, 1.3, -0.2]} rotation={[0.5, 0, 0.3]}>
          <meshStandardMaterial color="#2c3e50" />
        </Box>
      </group>
      
      {/* Professional lighting equipment */}
      <group position={[-3, 0, 2]}>
        <Cylinder args={[0.1, 0.1, 3]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#2c3e50" />
        </Cylinder>
        <Cylinder args={[0.8, 0.1, 0.5]} position={[0, 3.2, 0]} rotation={[0.3, 0, 0]}>
          <meshStandardMaterial color="#silver" metalness={0.8} />
        </Cylinder>
        <pointLight position={[0, 3, 1]} intensity={0.8} color="#fff" distance={5} />
      </group>
      
      <group position={[3, 0, 2]}>
        <Cylinder args={[0.1, 0.1, 3]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#2c3e50" />
        </Cylinder>
        <Cylinder args={[0.8, 0.1, 0.5]} position={[0, 3.2, 0]} rotation={[0.3, 0, 0]}>
          <meshStandardMaterial color="#silver" metalness={0.8} />
        </Cylinder>
        <pointLight position={[0, 3, 1]} intensity={0.8} color="#fff" distance={5} />
      </group>
      
      {/* 3D Countdown blocks */}
      {!photoTaken && (
        <group position={[0, 4, 0]}>
          {/* Background */}
          <Box args={[1.2, 1.2, 0.1]}>
            <meshBasicMaterial color="#000000" transparent opacity={0.8} />
          </Box>
          {/* Countdown number as 3D blocks */}
          <group position={[0, 0, 0.1]}>
            {countdown === 3 && (
              <>
                <Box args={[0.6, 0.8, 0.2]} position={[0, 0, 0]}>
                  <meshStandardMaterial color="#ffffff" />
                </Box>
                <Box args={[0.15, 0.15, 0.25]} position={[0, 0.3, 0]}>
                  <meshStandardMaterial color="#000000" />
                </Box>
              </>
            )}
            {countdown === 2 && (
              <>
                <Box args={[0.6, 0.8, 0.2]} position={[0, 0, 0]}>
                  <meshStandardMaterial color="#ffffff" />
                </Box>
                <Box args={[0.4, 0.15, 0.25]} position={[0, 0.3, 0]}>
                  <meshStandardMaterial color="#000000" />
                </Box>
                <Box args={[0.4, 0.15, 0.25]} position={[0, 0, 0]}>
                  <meshStandardMaterial color="#000000" />
                </Box>
                <Box args={[0.4, 0.15, 0.25]} position={[0, -0.3, 0]}>
                  <meshStandardMaterial color="#000000" />
                </Box>
              </>
            )}
            {countdown === 1 && (
              <>
                <Box args={[0.2, 0.8, 0.2]} position={[0.15, 0, 0]}>
                  <meshStandardMaterial color="#ffffff" />
                </Box>
                <Box args={[0.15, 0.15, 0.25]} position={[0, 0.3, 0]}>
                  <meshStandardMaterial color="#000000" />
                </Box>
              </>
            )}
          </group>
        </group>
      )}
      
      {/* Camera flash effect */}
      {showFlash && (
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      )}
    </>
  )
}

export default PhotoShootScene