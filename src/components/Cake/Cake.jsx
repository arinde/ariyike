import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, Sphere } from '@react-three/drei'

const Candle = ({ position, lit, onClick }) => {
  const flameRef = useRef()
  
  useFrame((state) => {
    if (lit && flameRef.current) {
      flameRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 10) * 0.1)
    }
  })
  
  return (
    <group position={position}>
      {/* Candle Body */}
      <Cylinder args={[0.02, 0.02, 0.25]} position={[0, 0.125, 0]}>
        <meshStandardMaterial color="#f5e6d3" />
      </Cylinder>
      
      {/* Flame */}
      {lit && (
        <Sphere 
          ref={flameRef}
          args={[0.04, 8, 8]} 
          position={[0, 0.28, 0]}
        >
          <meshStandardMaterial 
            color="#ff6b35" 
            emissive="#ff4500"
            emissiveIntensity={2}
          />
        </Sphere>
      )}
    </group>
  )
}

const Cake = ({ position, cut, onClick }) => {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true])
  
  useEffect(() => {
    if (cut) {
      // Blow out all candles
      setTimeout(() => setCandlesLit([false, false, false, false, false]), 500)
    }
  }, [cut])
  
  useFrame((state) => {
    if (groupRef.current && !cut) {
      // Gentle floating animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  const candlePositions = [
    [0, 0.6, 0],
    [-0.15, 0.55, 0],
    [0.15, 0.55, 0],
    [0, 0.55, -0.15],
    [0, 0.55, 0.15]
  ]

  return (
    <group 
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Cake Plate */}
      <Cylinder args={[0.7, 0.7, 0.05]} position={[0, 0.025, 0]} receiveShadow>
        <meshStandardMaterial color="#f5f5dc" />
      </Cylinder>
      
      {/* Cake Base Layer */}
      <Cylinder args={[0.5, 0.5, 0.25]} position={[0, 0.175, 0]} castShadow>
        <meshStandardMaterial color="#3e2723" />
      </Cylinder>
      
      {/* Cake Top Layer */}
      <Cylinder args={[0.4, 0.4, 0.2]} position={[0, 0.4, 0]} castShadow>
        <meshStandardMaterial color="#5d4037" />
      </Cylinder>
      
      {/* Frosting */}
      <Cylinder args={[0.42, 0.42, 0.05]} position={[0, 0.52, 0]}>
        <meshStandardMaterial color="#f5e6d3" />
      </Cylinder>
      
      {/* Chocolate Decoration */}
      <Cylinder args={[0.35, 0.35, 0.02]} position={[0, 0.55, 0]}>
        <meshStandardMaterial color="#3e2723" />
      </Cylinder>
      
      {/* Candles */}
      {candlePositions.map((pos, i) => (
        <Candle 
          key={i}
          position={pos}
          lit={candlesLit[i]}
        />
      ))}
      
      {/* Happy Birthday Sign */}
      <Box args={[0.6, 0.15, 0.02]} position={[0, 0.85, 0]}>
        <meshStandardMaterial color="#ffd700" />
      </Box>
      
      {/* Interaction highlight */}
      {hovered && !cut && (
        <Cylinder args={[0.8, 0.8, 1]} position={[0, 0.5, 0]}>
          <meshBasicMaterial color="#ffd700" transparent opacity={0.1} />
        </Cylinder>
      )}
      
      {/* Cut slice indicator */}
      {cut && (
        <Box args={[0.3, 0.3, 0.35]} position={[0.25, 0.35, 0]} rotation={[0, 0.3, 0]}>
          <meshStandardMaterial color="#5d4037" />
        </Box>
      )}
    </group>
  )
}

export default Cake