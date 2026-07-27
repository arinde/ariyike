import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Effects = () => {
  const particlesRef = useRef()
  
  const count = 200
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const colorPalette = [
      new THREE.Color('#800000'),  // Maroon
      new THREE.Color('#3e2723'),  // Chocolate
      new THREE.Color('#ffd700'),  // Gold
      new THREE.Color('#f5e6d3'),  // Cream
      new THREE.Color('#ff6b35'),  // Orange
    ]
    
    for (let i = 0; i < count; i++) {
      // Initial explosion from center
      positions[i * 3] = (Math.random() - 0.5) * 0.5
      positions[i * 3 + 1] = 1.5 + Math.random() * 0.5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return [positions, colors]
  }, [])
  
  const velocities = useMemo(() => {
    const vels = []
    for (let i = 0; i < count; i++) {
      vels.push({
        x: (Math.random() - 0.5) * 0.15,
        y: Math.random() * 0.2 + 0.05,
        z: (Math.random() - 0.5) * 0.15,
        rotation: Math.random() * 0.2
      })
    }
    return vels
  }, [])

  useFrame(() => {
    if (!particlesRef.current) return
    
    const positions = particlesRef.current.geometry.attributes.position.array
    
    for (let i = 0; i < count; i++) {
      // Update positions
      positions[i * 3] += velocities[i].x
      positions[i * 3 + 1] += velocities[i].y
      positions[i * 3 + 2] += velocities[i].z
      
      // Gravity
      velocities[i].y -= 0.005
      
      // Floor collision
      if (positions[i * 3 + 1] < 0) {
        positions[i * 3 + 1] = 0
        velocities[i].y *= -0.3
        velocities[i].x *= 0.8
        velocities[i].z *= 0.8
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  )
}

export default Effects