import { useRef } from 'react'
import { Box, Plane } from '@react-three/drei'

const Room = () => {
  return (
    <group>
      {/* Back Wall */}
      <Plane 
        args={[10, 6]} 
        position={[0, 3, -5]}
        receiveShadow
      >
        <meshStandardMaterial color="#800000" roughness={0.9} />
      </Plane>
      
      {/* Left Wall */}
      <Plane 
        args={[10, 6]} 
        rotation={[0, Math.PI / 2, 0]}
        position={[-5, 3, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#600000" roughness={0.9} />
      </Plane>
      
      {/* Right Wall */}
      <Plane 
        args={[10, 6]} 
        rotation={[0, -Math.PI / 2, 0]}
        position={[5, 3, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#600000" roughness={0.9} />
      </Plane>
      
      {/* Ceiling */}
      <Plane 
        args={[10, 10]} 
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 6, 0]}
      >
        <meshStandardMaterial color="#f5e6d3" roughness={1} />
      </Plane>
      
      {/* Window on Back Wall */}
      <group position={[2, 3.5, -4.9]}>
        <Box args={[2.5, 2.5, 0.2]}>
          <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.2} />
        </Box>
        {/* Window Frame */}
        <Box args={[2.7, 0.1, 0.3]} position={[0, 1.35, 0]}>
          <meshStandardMaterial color="#3e2723" />
        </Box>
        <Box args={[2.7, 0.1, 0.3]} position={[0, -1.35, 0]}>
          <meshStandardMaterial color="#3e2723" />
        </Box>
        <Box args={[0.1, 2.7, 0.3]} position={[1.35, 0, 0]}>
          <meshStandardMaterial color="#3e2723" />
        </Box>
        <Box args={[0.1, 2.7, 0.3]} position={[-1.35, 0, 0]}>
          <meshStandardMaterial color="#3e2723" />
        </Box>
      </group>
      
      {/* Bookshelf - Left Wall */}
      <group position={[-4.8, 2, -2]}>
        <Box args={[0.4, 4, 3]} castShadow receiveShadow>
          <meshStandardMaterial color="#3e2723" />
        </Box>
        {/* Shelves */}
        {[-1.5, -0.5, 0.5, 1.5].map((y, i) => (
          <Box key={i} args={[0.35, 0.05, 2.9]} position={[0, y, 0]}>
            <meshStandardMaterial color="#2d1b18" />
          </Box>
        ))}
        {/* Books */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Box 
            key={i}
            args={[0.3, 0.4, 0.1]}
            position={[
              0,
              -1.7 + Math.floor(i / 5) * 1,
              -1.2 + (i % 5) * 0.6
            ]}
          >
            <meshStandardMaterial 
              color={['#8b0000', '#2f4f4f', '#4a0080', '#006400'][i % 4]} 
            />
          </Box>
        ))}
      </group>
      
      {/* Bookshelf - Right Wall */}
      <group position={[4.8, 2, 2]}>
        <Box args={[0.4, 4, 3]} castShadow receiveShadow>
          <meshStandardMaterial color="#3e2723" />
        </Box>
        {/* Shelves */}
        {[-1.5, -0.5, 0.5, 1.5].map((y, i) => (
          <Box key={i} args={[0.35, 0.05, 2.9]} position={[0, y, 0]}>
            <meshStandardMaterial color="#2d1b18" />
          </Box>
        ))}
        {/* Books */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Box 
            key={i}
            args={[0.3, 0.4, 0.1]}
            position={[
              0,
              -1.7 + Math.floor(i / 5) * 1,
              -1.2 + (i % 5) * 0.6
            ]}
          >
            <meshStandardMaterial 
              color={['#654321', '#800080', '#8b4513', '#2e8b57'][i % 4]} 
            />
          </Box>
        ))}
      </group>
      
      {/* Cozy Armchair */}
      <group position={[-3, 0, -3]}>
        {/* Seat */}
        <Box args={[1.2, 0.3, 1.2]} position={[0, 0.5, 0]} castShadow>
          <meshStandardMaterial color="#800000" />
        </Box>
        {/* Back */}
        <Box args={[1.2, 1.2, 0.3]} position={[0, 1.1, -0.45]} castShadow>
          <meshStandardMaterial color="#600000" />
        </Box>
        {/* Armrests */}
        <Box args={[0.2, 0.6, 1]} position={[-0.5, 0.8, 0]} castShadow>
          <meshStandardMaterial color="#600000" />
        </Box>
        <Box args={[0.2, 0.6, 1]} position={[0.5, 0.8, 0]} castShadow>
          <meshStandardMaterial color="#600000" />
        </Box>
      </group>
      
      {/* Coffee Table */}
      <group position={[0, 0, 0]}>
        {/* Table Top */}
        <Box args={[2.5, 0.1, 1.5]} position={[0, 0.8, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#4a3728" roughness={0.6} />
        </Box>
        {/* Legs */}
        <Box args={[0.1, 0.8, 0.1]} position={[-1.1, 0.4, -0.6]} castShadow>
          <meshStandardMaterial color="#3e2723" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[1.1, 0.4, -0.6]} castShadow>
          <meshStandardMaterial color="#3e2723" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[-1.1, 0.4, 0.6]} castShadow>
          <meshStandardMaterial color="#3e2723" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[1.1, 0.4, 0.6]} castShadow>
          <meshStandardMaterial color="#3e2723" />
        </Box>
      </group>
      
      {/* Rug */}
      <Plane 
        args={[4, 3]} 
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#8b4513" roughness={1} />
      </Plane>
      
      {/* Door Frame - Entrance */}
      <group position={[0, 0, 4.9]}>
        <Box args={[2, 4, 0.2]} position={[-1.5, 2, 0]} castShadow>
          <meshStandardMaterial color="#3e2723" />
        </Box>
        <Box args={[2, 4, 0.2]} position={[1.5, 2, 0]} castShadow>
          <meshStandardMaterial color="#3e2723" />
        </Box>
        <Box args={[3, 0.5, 0.2]} position={[0, 4.25, 0]} castShadow>
          <meshStandardMaterial color="#3e2723" />
        </Box>
      </group>
      
      {/* String Lights */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Box 
          key={i}
          args={[0.1, 0.15, 0.1]}
          position={[
            -3.5 + i * 1,
            5.5 + Math.sin(i * 0.5) * 0.3,
            -4
          ]}
        >
          <meshStandardMaterial 
            color="#ffd700" 
            emissive="#ffd700"
            emissiveIntensity={0.5}
          />
        </Box>
      ))}
    </group>
  )
}

export default Room