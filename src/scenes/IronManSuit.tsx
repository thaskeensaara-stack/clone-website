import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useSuitStore } from '@/stores/suitStore';

/**
 * Iron Man Suit Component
 * Renders a futuristic armored suit with customizable colors and materials
 */
export const IronManSuit: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { customization } = useSuitStore();
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const timeRef = useRef(0);

  // Create suit geometry procedurally
  useEffect(() => {
    if (!groupRef.current) return;

    // Clear existing meshes
    groupRef.current.children.forEach((child) => groupRef.current?.remove(child));
    meshesRef.current = [];

    // Torso
    const torsoGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
    const torsoMaterial = new THREE.MeshStandardMaterial({
      color: customization.armorColor,
      metalness: customization.materialFinish === 'metallic' ? 1 : 0.5,
      roughness: customization.materialFinish === 'glossy' ? 0.1 : 0.4,
      emissive: customization.glowColor,
      emissiveIntensity: 0.5,
    });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.position.z = 0;
    groupRef.current.add(torso);
    meshesRef.current.push(torso);

    // Helmet
    const helmetGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const helmetMaterial = new THREE.MeshStandardMaterial({
      color: customization.armorColor,
      metalness: 1,
      roughness: 0.3,
      emissive: customization.glowColor,
      emissiveIntensity: 0.3,
    });
    const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
    helmet.position.y = 1.1;
    groupRef.current.add(helmet);
    meshesRef.current.push(helmet);

    // Eyes (glowing orbs)
    const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: customization.eyeColor,
      emissive: customization.eyeColor,
      emissiveIntensity: 2,
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 1.2, 0.35);
    groupRef.current.add(leftEye);
    meshesRef.current.push(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 1.2, 0.35);
    groupRef.current.add(rightEye);
    meshesRef.current.push(rightEye);

    // Chest reactor
    const reactorGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
    const reactorMaterial = new THREE.MeshBasicMaterial({
      color: customization.energyColor,
      emissive: customization.energyColor,
      emissiveIntensity: 2,
    });
    const reactor = new THREE.Mesh(reactorGeometry, reactorMaterial);
    reactor.position.z = 0.3;
    groupRef.current.add(reactor);
    meshesRef.current.push(reactor);

    // Arms
    ['left', 'right'].forEach((side) => {
      const armGeometry = new THREE.BoxGeometry(0.3, 1.2, 0.3);
      const armMaterial = new THREE.MeshStandardMaterial({
        color: customization.armorColor,
        metalness: 0.8,
        roughness: 0.5,
        emissive: customization.glowColor,
        emissiveIntensity: 0.2,
      });
      const arm = new THREE.Mesh(armGeometry, armMaterial);
      arm.position.x = side === 'left' ? -0.7 : 0.7;
      arm.position.y = 0.2;
      groupRef.current?.add(arm);
      meshesRef.current.push(arm);
    });

    // Legs
    ['left', 'right'].forEach((side) => {
      const legGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
      const legMaterial = new THREE.MeshStandardMaterial({
        color: customization.armorColor,
        metalness: 0.8,
        roughness: 0.5,
      });
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.x = side === 'left' ? -0.3 : 0.3;
      leg.position.y = -1.2;
      groupRef.current?.add(leg);
      meshesRef.current.push(leg);
    });
  }, [customization]);

  // Animation loop
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    timeRef.current += delta;

    // Gentle rotation
    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.rotation.x = Math.sin(timeRef.current * 0.5) * 0.1;

    // Pulsing glow
    meshesRef.current.forEach((mesh) => {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.emissiveIntensity = 0.3 + Math.sin(timeRef.current * 2) * 0.2;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1}>
      {/* Suit created procedurally in useEffect */}
    </group>
  );
};

export default IronManSuit;
