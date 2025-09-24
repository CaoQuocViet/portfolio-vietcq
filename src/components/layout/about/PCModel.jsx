'use client'
import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Float, Environment } from '@react-three/drei'
import { LoadingSpinner } from "../../ui/loading";

function Model() {
  const { scene } = useGLTF('/models/bm86_portable_pc.glb')
  
  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive 
        object={scene} 
        scale={[8, 8, 8]} 
        position={[0, -0.7, 0]}
        rotation={[0, -Math.PI / 4, 0]}
      />
    </Float>
  )
}

export default function PCModel() {
  const [shouldLoadModel, setShouldLoadModel] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Delay model loading by 500ms after coming into view
          setTimeout(() => {
            setShouldLoadModel(true);
          }, 500);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px', // Start loading 50px before element comes into view
        threshold: 0.1 
      }
    );

    const element = document.getElementById('pc-model-container');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Preload model only when needed
  useEffect(() => {
    if (shouldLoadModel) {
      useGLTF.preload('/models/bm86_portable_pc.glb');
    }
  }, [shouldLoadModel]);

  return (
    <div id="pc-model-container" className="w-full h-full">
      {!isInView && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg mx-auto mb-2 animate-pulse"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">3D Model Loading...</p>
          </div>
        </div>
      )}
      
      {shouldLoadModel && (
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }>
          {typeof window !== 'undefined' ? (
            <Canvas
              camera={{ position: [0, 0, 4], fov: 60 }}
              style={{ background: 'transparent' }}
              gl={{ 
                antialias: false,
                powerPreference: "high-performance"
              }}
              onCreated={({ gl }) => {
                // Simple WebGL availability check
                try {
                  gl.getContext('webgl') || gl.getContext('experimental-webgl');
                } catch (error) {
                  console.warn('WebGL not supported:', error);
                }
              }}
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
                autoRotateSpeed={0.2}
                maxDistance={8}
                minDistance={2}
                enableDamping={true}
                dampingFactor={0.05}
              />
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">3D Model (Client Only)</p>
              </div>
            </div>
          )}
        </Suspense>
      )}
    </div>
  )
}

// DO NOT preload the model here - let it lazy load
