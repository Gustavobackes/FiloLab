import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import styles from './STLViewer.module.css'

function PlaceholderModel() {
  return (
    <mesh castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#FF6B2B" metalness={0.3} roughness={0.6} />
    </mesh>
  )
}

export function STLViewer({ stlUrl, interactive = false }) {
  const [isInteracting, setIsInteracting] = useState(false)

  return (
    <div
      className={`${styles.wrapper} ${isInteracting ? styles.interacting : ''}`}
      onMouseDown={() => interactive && setIsInteracting(true)}
      onMouseUp={() => interactive && setIsInteracting(false)}
      onMouseLeave={() => interactive && setIsInteracting(false)}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Stage environment="city" intensity={0.5}>
          <PlaceholderModel />
        </Stage>
        <OrbitControls
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={!isInteracting}
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  )
}
