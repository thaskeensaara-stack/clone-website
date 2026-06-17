import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment, Bloom, EffectComposer } from '@react-three/drei';
import { useUIStore } from '@/stores/uiStore';
import IronManSuit from './IronManSuit';
import { ParticleSystem } from './ParticleSystem';
import * as THREE from 'three';

/**
 * Main 3D Scene Component
 * Renders the Iron Man suit with advanced lighting and effects
 */
export const Scene3D: React.FC = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { cameraTarget } = useUIStore();

  return (
    <Canvas
      camera={{ position: [3, 2, 3], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <pointLight position={[-10, 10, -10]} intensity={0.8} color="#00d4ff" />
      <pointLight position={[10, -10, 10]} intensity={0.6} color="#ff6b35" />

      {/* Environment */}
      <Environment preset="night" />

      {/* Main Content */}
      <IronManSuit />
      <ParticleSystem count={150} color="#00d4ff" speed={0.8} />

      {/* Post Processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>

      {/* Camera & Controls */}
      <PerspectiveCamera ref={cameraRef} makeDefault />
      <OrbitControls autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
};

export default Scene3D;
