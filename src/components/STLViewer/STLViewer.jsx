import { useLoader } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import styles from './STLViewer.module.css'

function Model({ url }) {
  const geometry = useLoader(STLLoader, url)
  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial color="#e8e0d0" metalness={0.3} roughness={0.6} />
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
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            <Model url={stlUrl} />
          </Stage>
          <OrbitControls
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            autoRotate={!isInteracting}
            autoRotateSpeed={1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
