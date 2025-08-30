'use client'
import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Float, Environment } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('/models/bm86_portable_pc.glb')
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive 
        object={scene} 
        scale={[6, 6, 6]} 
        position={[0, -1, 0]}
        rotation={[0, Math.PI / 4, 0]}
      />
    </Float>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default function PCModel() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <Environment preset="studio" />
          
          <Model />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 6}
            autoRotate={true}
            autoRotateSpeed={0.3}
            maxDistance={8}
            minDistance={2}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}

// Preload the model
useGLTF.preload('/models/bm86_portable_pc.glb')
