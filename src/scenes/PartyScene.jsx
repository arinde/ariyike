import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Plane, Cylinder } from '@react-three/drei'
import Character from '../components/Character/Character'
import Effects from '../components/Effects/Effects'

const PartyScene = ({ avatarUrl, userData }) => {
  const [showConfetti, setShowConfetti] = useState(true)
  const [balloons, setBalloons] = useState([])
  const [discoLights, setDiscoLights] = useState(0)
  
  // Generate balloons
  useEffect(() => {
    const newBalloons = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 15,
        2 + Math.random() * 5,
        (Math.random() - 0.5) * 15
      ],
      color: ['#ff6b6b', '#ffd700', '#800000', '#4ecdc4', '#ff69b4'][i % 5],
      speed: 0.5 + Math.random() * 0.5
    }))
    setBalloons(newBalloons)
    
    // Confetti for first 10 seconds
    setTimeout(() => setShowConfetti(false), 10000)
  }, [])
  
  // Animate disco lights
  useFrame((state) => {
    setDiscoLights(Math.floor(state.clock.elapsedTime * 2) % 4)
  })
  
  // Floating animation for balloons
  useFrame((state) => {
    setBalloons(prev => prev.map(balloon => ({
      ...balloon,
      position: [
        balloon.position[0],
        balloon.position[1] + Math.sin(state.clock.elapsedTime * balloon.speed) * 0.01,
        balloon.position[2]
      ]
    })))
  })
  
  return (
    <>
      {/* Floor - Dance floor style */}
      <Plane 
        args={[20, 20]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#2d1b4e" />
      </Plane>
      
      {/* Dance floor tiles */}
      {Array.from({ length: 64 }).map((_, i) => {
        const x = (i % 8) - 3.5
        const z = Math.floor(i / 8) - 3.5
        const isLit = (i + discoLights) % 4 === 0
        return (
          <Box 
            key={i}
            args={[1.8, 0.1, 1.8]} 
            position={[x * 2, 0.06, z * 2]}
          >
            <meshStandardMaterial 
              color={isLit ? '#ff00ff' : '#4a0080'} 
              emissive={isLit ? '#ff00ff' : '#000000'}
              emissiveIntensity={isLit ? 0.5 : 0}
            />
          </Box>
        )
      })}
      
      {/* Walls with party lights */}
      <Plane args={[20, 10]} position={[0, 5, -10]}>
        <meshStandardMaterial color="#1a0a2e" />
      </Plane>
      <Plane args={[20, 10]} rotation={[0, Math.PI / 2, 0]} position={[-10, 5, 0]}>
        <meshStandardMaterial color="#1a0a2e" />
      </Plane>
      <Plane args={[20, 10]} rotation={[0, -Math.PI / 2, 0]} position={[10, 5, 0]}>
        <meshStandardMaterial color="#1a0a2e" />
      </Plane>
      
      {/* Disco ball */}
      <group position={[0, 8, 0]}>
        <Sphere args={[1.5]}>
          <meshStandardMaterial 
            color="#c0c0c0" 
            metalness={1} 
            roughness={0.1}
          />
        </Sphere>
        {/* Sparkles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Sphere 
            key={i} 
            args={[0.05]} 
            position={[
              Math.sin(i * 0.5) * 1.6,
              Math.cos(i * 0.3) * 1.6,
              Math.sin(i * 0.7) * 1.6
            ]}
          >
            <meshBasicMaterial color="#ffffff" />
          </Sphere>
        ))}
      </group>
      
      {/* Disco lights */}
      <spotLight 
        position={[-5, 10, 5]} 
        angle={0.5} 
        penumbra={0.5} 
        intensity={1}
        color={discoLights === 0 ? '#ff00ff' : '#ff0000'}
        castShadow
      />
      <spotLight 
        position={[5, 10, 5]} 
        angle={0.5} 
        penumbra={0.5} 
        intensity={1}
        color={discoLights === 1 ? '#00ffff' : '#00ff00'}
        castShadow
      />
      <spotLight 
        position={[-5, 10, -5]} 
        angle={0.5} 
        penumbra={0.5} 
        intensity={1}
        color={discoLights === 2 ? '#ffff00' : '#0000ff'}
        castShadow
      />
      <spotLight 
        position={[5, 10, -5]} 
        angle={0.5} 
        penumbra={0.5} 
        intensity={1}
        color={discoLights === 3 ? '#ff69b4' : '#ffd700'}
        castShadow
      />
      
      {/* Balloons */}
      {balloons.map(balloon => (
        <group key={balloon.id} position={balloon.position}>
          <Sphere args={[0.4]}>
            <meshStandardMaterial color={balloon.color} />
          </Sphere>
          {/* String */}
          <Cylinder args={[0.01, 0.01, 2]} position={[0, -1.5, 0]}>
            <meshBasicMaterial color="#ffffff" />
          </Cylinder>
        </group>
      ))}
      
      {/* Character dancing */}
      <Character 
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        isMoving={false}
        avatarUrl={avatarUrl}
        pose="celebration"
      />
      
      {/* Birthday banner */}
      <group position={[0, 6, -9]}>
        <Box args={[10, 1.5, 0.2]}>
          <meshStandardMaterial color="#800000" />
        </Box>
        <Box args={[0.8, 1.8, 0.3]} position={[-4.5, 0, 0.1]}>
          <meshStandardMaterial color="#ffd700" />
        </Box>
        <Box args={[0.8, 1.8, 0.3]} position={[4.5, 0, 0.1]}>
          <meshStandardMaterial color="#ffd700" />
        </Box>
      </group>
      
      {/* Cake table */}
      <group position={[3, 0, 3]}>
        <Cylinder args={[1, 1, 1]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Cylinder>
        {/* Cake */}
        <Cylinder args={[0.6, 0.6, 0.5]} position={[0, 1.25, 0]}>
          <meshStandardMaterial color="#800000" />
        </Cylinder>
        <Cylinder args={[0.5, 0.5, 0.4]} position={[0, 1.7, 0]}>
          <meshStandardMaterial color="#5d4037" />
        </Cylinder>
        {/* Candles */}
        <Cylinder args={[0.02, 0.02, 0.2]} position={[0, 2, 0]}>
          <meshStandardMaterial color="#ffd700" emissive="#ff6b35" emissiveIntensity={1} />
        </Cylinder>
      </group>
      
      {/* Confetti */}
      {showConfetti && <Effects />}
      
      {/* Ambient party lights */}
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ff69b4" distance={10} />
      <pointLight position={[-5, 3, 5]} intensity={0.5} color="#00ffff" distance={10} />
      <pointLight position={[5, 3, -5]} intensity={0.5} color="#ffff00" distance={10} />
    </>
  )
}

export default PartyScene