import { useState } from 'react'
import { Box, Plane } from '@react-three/drei'

const PhotoFrame = ({ position, rotation, imageUrl, frameStyle = 'golden', size = [1.5, 2] }) => {
  const [hovered, setHovered] = useState(false)
  
  const frameStyles = {
    golden: {
      frame: '#ffd700',
      inner: '#b8860b',
      depth: 0.15
    },
    wooden: {
      frame: '#8b4513',
      inner: '#654321',
      depth: 0.12
    },
    white: {
      frame: '#ffffff',
      inner: '#e0e0e0',
      depth: 0.1
    },
    modern: {
      frame: '#2c3e50',
      inner: '#34495e',
      depth: 0.08
    }
  }
  
  const style = frameStyles[frameStyle] || frameStyles.golden
  const [width, height] = size
  
  return (
    <group 
      position={position} 
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer frame */}
      <Box 
        args={[width + 0.2, height + 0.2, style.depth]} 
        castShadow
      >
        <meshStandardMaterial color={style.frame} roughness={0.3} metalness={0.4} />
      </Box>
      
      {/* Inner frame/matting */}
      <Box 
        args={[width + 0.05, height + 0.05, style.depth + 0.01]} 
        position={[0, 0, style.depth / 2]}
      >
        <meshStandardMaterial color={style.inner} />
      </Box>
      
      {/* Photo placeholder (will be replaced with actual image texture) */}
      <Plane 
        args={[width - 0.1, height - 0.1]} 
        position={[0, 0, style.depth + 0.02]}
      >
        <meshStandardMaterial color="#f5e6d3" />
      </Plane>
      
      {/* Decorative corner details */}
      <Box args={[0.15, 0.15, style.depth + 0.02]} position={[-width/2 + 0.15, height/2 - 0.15, 0]}>
        <meshStandardMaterial color={style.frame} metalness={0.5} />
      </Box>
      <Box args={[0.15, 0.15, style.depth + 0.02]} position={[width/2 - 0.15, height/2 - 0.15, 0]}>
        <meshStandardMaterial color={style.frame} metalness={0.5} />
      </Box>
      <Box args={[0.15, 0.15, style.depth + 0.02]} position={[-width/2 + 0.15, -height/2 + 0.15, 0]}>
        <meshStandardMaterial color={style.frame} metalness={0.5} />
      </Box>
      <Box args={[0.15, 0.15, style.depth + 0.02]} position={[width/2 - 0.15, -height/2 + 0.15, 0]}>
        <meshStandardMaterial color={style.frame} metalness={0.5} />
      </Box>
      
      {/* Hover highlight */}
      {hovered && (
        <Box 
          args={[width + 0.25, height + 0.25, style.depth - 0.02]} 
          position={[0, 0, style.depth + 0.05]}
        >
          <meshBasicMaterial color="#ffd700" transparent opacity={0.2} />
        </Box>
      )}
    </group>
  )
}

export default PhotoFrame