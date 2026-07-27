import { useRef } from 'react'
import { Box, Plane, Cylinder } from '@react-three/drei'

const Room = () => {
  return (
    <group>
      {/* ==================== WALLS - Cream color for brightness ==================== */}
      
      {/* Back Wall */}
      <Plane 
        args={[12, 7]} 
        position={[0, 3.5, -6]}
        receiveShadow
      >
        <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
      </Plane>
      
      {/* Left Wall */}
      <Plane 
        args={[12, 7]} 
        rotation={[0, Math.PI / 2, 0]}
        position={[-6, 3.5, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#faf0e6" roughness={0.8} />
      </Plane>
      
      {/* Right Wall */}
      <Plane 
        args={[12, 7]} 
        rotation={[0, -Math.PI / 2, 0]}
        position={[6, 3.5, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#faf0e6" roughness={0.8} />
      </Plane>
      
      {/* Front Wall (with door opening) */}
      {/* Left side of door */}
      <Plane 
        args={[3.5, 7]} 
        rotation={[0, 0, 0]}
        position={[-4.25, 3.5, 6]}
        receiveShadow
      >
        <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
      </Plane>
      {/* Right side of door */}
      <Plane 
        args={[3.5, 7]} 
        rotation={[0, 0, 0]}
        position={[4.25, 3.5, 6]}
        receiveShadow
      >
        <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
      </Plane>
      {/* Above door */}
      <Plane 
        args={[3, 2]} 
        rotation={[0, 0, 0]}
        position={[0, 6, 6]}
        receiveShadow
      >
        <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
      </Plane>
      
      {/* Ceiling - White */}
      <Plane 
        args={[12, 12]} 
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 7, 0]}
      >
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </Plane>
      
      {/* ==================== FLOOR - Beautiful wood pattern ==================== */}
      <Plane 
        args={[12, 12]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          color="#d4a373" 
          roughness={0.6}
        />
      </Plane>
      
      {/* Floor planks details */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Box 
          key={i}
          args={[12, 0.01, 0.02]}
          position={[0, 0.01, -5.5 + i]}
        >
          <meshStandardMaterial color="#c49363" />
        </Box>
      ))}
      
      {/* ==================== LARGE WINDOW with View ==================== */}
      <group position={[-5.9, 3.5, -2]}>
        {/* Window glass - bright sky view */}
        <Plane args={[2.5, 3.5]} rotation={[0, Math.PI / 2, 0]} position={[0.05, 0, 0]}>
          <meshStandardMaterial 
            color="#87ceeb" 
            emissive="#87ceeb"
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
          />
        </Plane>
        
        {/* Window Frame */}
        <Box args={[0.1, 3.7, 0.15]} position={[0, 0, -1.3]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.1, 3.7, 0.15]} position={[0, 0, 1.3]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.1, 0.15, 2.75]} position={[0, 1.85, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.1, 0.15, 2.75]} position={[0, -1.85, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        {/* Cross bars */}
        <Box args={[0.05, 3.5, 0.05]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.05, 0.05, 2.5]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        
        {/* Curtains */}
        <Box args={[0.2, 4, 0.8]} position={[0, 0, -1.6]}>
          <meshStandardMaterial color="#800000" roughness={0.9} />
        </Box>
        <Box args={[0.2, 4, 0.8]} position={[0, 0, 1.6]}>
          <meshStandardMaterial color="#800000" roughness={0.9} />
        </Box>
        
        {/* View outside - simple landscape */}
        <Plane args={[15, 10]} rotation={[0, Math.PI / 2, 0]} position={[2, 0, 0]}>
          <meshStandardMaterial color="#90EE90" />
        </Plane>
      </group>
      
      {/* ==================== SOFA - Main furniture ==================== */}
      <group position={[3, 0, -3]}>
        {/* Sofa Base */}
        <Box args={[3.5, 0.6, 1.5]} position={[0, 0.3, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#800000" roughness={0.9} />
        </Box>
        {/* Sofa Back */}
        <Box args={[3.5, 1.2, 0.4]} position={[0, 0.9, -0.55]} castShadow>
          <meshStandardMaterial color="#600000" roughness={0.9} />
        </Box>
        {/* Sofa Arms */}
        <Box args={[0.4, 0.8, 1.5]} position={[-1.55, 0.7, 0]} castShadow>
          <meshStandardMaterial color="#600000" roughness={0.9} />
        </Box>
        <Box args={[0.4, 0.8, 1.5]} position={[1.55, 0.7, 0]} castShadow>
          <meshStandardMaterial color="#600000" roughness={0.9} />
        </Box>
        {/* Cushions */}
        <Box args={[1, 0.15, 1.3]} position={[-0.8, 0.68, 0]}>
          <meshStandardMaterial color="#a52a2a" roughness={1} />
        </Box>
        <Box args={[1, 0.15, 1.3]} position={[0.8, 0.68, 0]}>
          <meshStandardMaterial color="#a52a2a" roughness={1} />
        </Box>
      </group>
      
      {/* ==================== COFFEE TABLE - Center ==================== */}
      <group position={[0, 0, 0]}>
        {/* Table Top */}
        <Box args={[2.2, 0.08, 1.3]} position={[0, 0.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#8b4513" roughness={0.4} metalness={0.1} />
        </Box>
        {/* Table Legs */}
        <Cylinder args={[0.06, 0.04, 0.5]} position={[-0.9, 0.25, -0.5]} castShadow>
          <meshStandardMaterial color="#654321" />
        </Cylinder>
        <Cylinder args={[0.06, 0.04, 0.5]} position={[0.9, 0.25, -0.5]} castShadow>
          <meshStandardMaterial color="#654321" />
        </Cylinder>
        <Cylinder args={[0.06, 0.04, 0.5]} position={[-0.9, 0.25, 0.5]} castShadow>
          <meshStandardMaterial color="#654321" />
        </Cylinder>
        <Cylinder args={[0.06, 0.04, 0.5]} position={[0.9, 0.25, 0.5]} castShadow>
          <meshStandardMaterial color="#654321" />
        </Cylinder>
      </group>
      
      {/* ==================== ARMCHAIR - Reading corner ==================== */}
      <group position={[-4, 0, -4]}>
        {/* Chair Base */}
        <Box args={[1.3, 0.5, 1.3]} position={[0, 0.25, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#654321" roughness={0.9} />
        </Box>
        {/* Chair Back */}
        <Box args={[1.3, 1.3, 0.3]} position={[0, 0.9, -0.5]} castShadow>
          <meshStandardMaterial color="#5d4037" roughness={0.9} />
        </Box>
        {/* Chair Arms */}
        <Box args={[0.2, 0.6, 1.1]} position={[-0.55, 0.7, 0]} castShadow>
          <meshStandardMaterial color="#5d4037" roughness={0.9} />
        </Box>
        <Box args={[0.2, 0.6, 1.1]} position={[0.55, 0.7, 0]} castShadow>
          <meshStandardMaterial color="#5d4037" roughness={0.9} />
        </Box>
        {/* Leather cushion */}
        <Box args={[0.9, 0.1, 0.9]} position={[0, 0.55, 0]}>
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </Box>
      </group>
      
      {/* ==================== SIDE TABLE with Lamp ==================== */}
      <group position={[-4, 0, -1.5]}>
        {/* Table */}
        <Box args={[0.8, 0.6, 0.8]} position={[0, 0.3, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#5d4037" />
        </Box>
        {/* Lamp Base */}
        <Cylinder args={[0.15, 0.2, 0.1]} position={[0, 0.65, 0]}>
          <meshStandardMaterial color="#2c3e50" metalness={0.5} />
        </Cylinder>
        {/* Lamp Stem */}
        <Cylinder args={[0.03, 0.03, 0.5]} position={[0, 0.9, 0]}>
          <meshStandardMaterial color="#2c3e50" metalness={0.5} />
        </Cylinder>
        {/* Lamp Shade */}
        <Cylinder args={[0.25, 0.35, 0.4]} position={[0, 1.25, 0]}>
          <meshStandardMaterial color="#fff8dc" transparent opacity={0.9} />
        </Cylinder>
        {/* Light bulb glow */}
        <pointLight position={[0, 1.2, 0]} intensity={0.5} color="#ffd700" distance={3} />
      </group>
      
      {/* ==================== TV SETUP ==================== */}
      <group position={[0, 0, -5.5]}>
        {/* TV Stand */}
        <Box args={[3, 0.8, 0.6]} position={[0, 0.4, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#3e2723" />
        </Box>
        {/* TV Screen */}
        <Box args={[2.2, 1.3, 0.1]} position={[0, 1.5, 0.2]} castShadow>
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} />
        </Box>
        {/* TV Frame */}
        <Box args={[2.3, 1.4, 0.05]} position={[0, 1.5, 0.15]}>
          <meshStandardMaterial color="#2c3e50" />
        </Box>
      </group>
      
      {/* ==================== BOOKSHELVES - Wall mounted ==================== */}
      <group position={[-5.5, 2.5, 2]}>
        {/* Frame */}
        <Box args={[0.2, 3, 2]} castShadow>
          <meshStandardMaterial color="#5d4037" />
        </Box>
        {/* Shelves */}
        {[-1.2, -0.4, 0.4, 1.2].map((y, i) => (
          <Box key={i} args={[0.25, 0.05, 1.9]} position={[0, y, 0]}>
            <meshStandardMaterial color="#4a3728" />
          </Box>
        ))}
        {/* Books */}
        {Array.from({ length: 24 }).map((_, i) => (
          <Box 
            key={i}
            args={[0.15, 0.35, 0.08]}
            position={[
              0,
              -1.4 + Math.floor(i / 6) * 0.8,
              -0.8 + (i % 6) * 0.32
            ]}
            rotation={[0, (Math.random() - 0.5) * 0.2, 0]}
          >
            <meshStandardMaterial 
              color={['#800000', '#2f4f4f', '#654321', '#2e8b57', '#4a0080', '#8b4513'][i % 6]} 
            />
          </Box>
        ))}
      </group>
      
      {/* ==================== DECORATIONS ==================== */}
      
      {/* Rug - Large area rug */}
      <Plane 
        args={[6, 4]} 
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#d2691e" roughness={1} />
      </Plane>
      
      {/* Plant in corner */}
      <group position={[5, 0, -5]}>
        {/* Pot */}
        <Cylinder args={[0.4, 0.3, 0.6]} position={[0, 0.3, 0]} castShadow>
          <meshStandardMaterial color="#8b4513" />
        </Cylinder>
        {/* Plant stems and leaves */}
        <Cylinder args={[0.05, 0.05, 1.5]} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#228b22" />
        </Cylinder>
        <Cylinder args={[0.04, 0.04, 1.2]} position={[0.2, 1.0, 0]} rotation={[0, 0, 0.3]}>
          <meshStandardMaterial color="#228b22" />
        </Cylinder>
        <Cylinder args={[0.04, 0.04, 1.2]} position={[-0.2, 1.0, 0]} rotation={[0, 0, -0.3]}>
          <meshStandardMaterial color="#228b22" />
        </Cylinder>
        {/* Leaves */}
        <Box args={[0.6, 0.1, 0.3]} position={[0.4, 1.8, 0]} rotation={[0, 0, 0.5]}>
          <meshStandardMaterial color="#32cd32" />
        </Box>
        <Box args={[0.6, 0.1, 0.3]} position={[-0.4, 1.6, 0]} rotation={[0, 0, -0.5]}>
          <meshStandardMaterial color="#32cd32" />
        </Box>
      </group>
      
      {/* Wall Art / Picture Frame */}
      <group position={[0, 4, -5.9]}>
        <Box args={[2, 1.5, 0.1]} castShadow>
          <meshStandardMaterial color="#f5f5dc" />
        </Box>
        <Box args={[1.8, 1.3, 0.02]} position={[0, 0, 0.06]}>
          <meshStandardMaterial color="#e6e6fa" />
        </Box>
        {/* Simple art */}
        <Box args={[1.4, 0.9, 0.03]} position={[0, 0, 0.07]}>
          <meshStandardMaterial color="#dda0dd" />
        </Box>
      </group>
      
      {/* Picture on right wall */}
      <group position={[5.9, 4, 2]}>
        <Box args={[0.1, 1.2, 1.8]} castShadow>
          <meshStandardMaterial color="#5d4037" />
        </Box>
        <Box args={[0.05, 1, 1.6]} position={[0.03, 0, 0]}>
          <meshStandardMaterial color="#f5f5dc" />
        </Box>
      </group>
      
      {/* Floor lamp */}
      <group position={[5, 0, 4]}>
        {/* Base */}
        <Cylinder args={[0.25, 0.25, 0.05]} position={[0, 0.025, 0]}>
          <meshStandardMaterial color="#2c3e50" metalness={0.6} />
        </Cylinder>
        {/* Pole */}
        <Cylinder args={[0.03, 0.03, 3]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#2c3e50" metalness={0.6} />
        </Cylinder>
        {/* Shade */}
        <Cylinder args={[0.35, 0.45, 0.6]} position={[0, 3, 0]}>
          <meshStandardMaterial color="#fff8dc" transparent opacity={0.95} />
        </Cylinder>
        {/* Light */}
        <pointLight position={[0, 2.8, 0]} intensity={0.8} color="#ffd700" distance={5} />
      </group>
      
      {/* Decorative pillows on sofa */}
      <group position={[3, 0.7, -3]}>
        <Box args={[0.5, 0.5, 0.2]} position={[-0.8, 0, -0.4]} rotation={[0.2, 0, -0.1]}>
          <meshStandardMaterial color="#ffd700" />
        </Box>
        <Box args={[0.5, 0.5, 0.2]} position={[0.8, 0, -0.4]} rotation={[0.2, 0, 0.1]}>
          <meshStandardMaterial color="#dda0dd" />
        </Box>
      </group>
      
      {/* Open book on side table */}
      <group position={[-4, 0.65, -1.5]}>
        <Box args={[0.3, 0.05, 0.4]} position={[-0.1, 0, 0]} rotation={[0, 0.2, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.3, 0.05, 0.4]} position={[0.1, 0, 0]} rotation={[0, -0.2, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
      </group>
    </group>
  )
}

export default Room