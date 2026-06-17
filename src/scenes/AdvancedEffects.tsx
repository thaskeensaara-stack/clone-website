import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSuitStore } from '@/stores/suitStore';

interface EnergyBeamProps {
  fromPosition: [number, number, number];
  toPosition: [number, number, number];
  color?: string;
  intensity?: number;
}

/**
 * Energy Beam Component
 * Creates animated beam effects between two points
 */
export const EnergyBeam: React.FC<EnergyBeamProps> = ({
  fromPosition,
  toPosition,
  color = '#00d4ff',
  intensity = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!groupRef.current) return;

    // Calculate distance and direction
    const from = new THREE.Vector3(...fromPosition);
    const to = new THREE.Vector3(...toPosition);
    const distance = from.distanceTo(to);

    // Create beam geometry
    const geometry = new THREE.CylinderGeometry(0.05, 0.05, distance, 8);
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.8,
      emissive: color,
      emissiveIntensity: intensity,
    });

    const beam = new THREE.Mesh(geometry, material);

    // Position and orient beam
    const midpoint = from.clone().add(to).multiplyScalar(0.5);
    beam.position.copy(midpoint);

    const direction = to.clone().sub(from).normalize();
    beam.lookAt(to);

    groupRef.current.add(beam);

    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [fromPosition, toPosition, color, intensity]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;

    // Animate opacity
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
        child.material.opacity = 0.6 + Math.sin(timeRef.current * 3) * 0.2;
      }
    });
  });

  return <group ref={groupRef} />;
};

/**
 * Hologram Component
 * Creates holographic display effects
 */
interface HologramProps {
  position?: [number, number, number];
  scale?: number;
  text?: string;
}

export const Hologram: React.FC<HologramProps> = ({
  position = [0, 0, 0],
  scale = 1,
  text = 'HOLOGRAM',
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!groupRef.current) return;

    // Create hologram geometry (using icosahedron as base)
    const geometry = new THREE.IcosahedronGeometry(0.5, 4);
    const material = new THREE.MeshPhongMaterial({
      color: '#00d4ff',
      emissive: '#00d4ff',
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });

    const hologram = new THREE.Mesh(geometry, material);
    hologram.scale.set(scale, scale, scale);
    groupRef.current.add(hologram);

    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [scale]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;

    // Rotation
    groupRef.current.rotation.x += delta * 0.5;
    groupRef.current.rotation.y += delta * 0.7;

    // Pulsing scale
    const pulseFactor = 1 + Math.sin(timeRef.current * 2) * 0.1;
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.scale.set(pulseFactor, pulseFactor, pulseFactor);
      }
    });
  });

  return <group ref={groupRef} position={position} />;
};

/**
 * Shield Bubble Component
 * Protective energy field visualization
 */
interface ShieldBubbleProps {
  position?: [number, number, number];
  radius?: number;
  color?: string;
}

export const ShieldBubble: React.FC<ShieldBubbleProps> = ({
  position = [0, 0, 0],
  radius = 2,
  color = '#00d4ff',
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!groupRef.current) return;

    // Create shield geometry (wireframe sphere)
    const geometry = new THREE.IcosahedronGeometry(radius, 20);
    const material = new THREE.MeshPhongMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const shield = new THREE.Mesh(geometry, material);
    groupRef.current.add(shield);

    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [radius, color]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;

    // Gentle rotation
    groupRef.current.rotation.x += delta * 0.1;
    groupRef.current.rotation.y += delta * 0.15;

    // Pulsing opacity
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhongMaterial) {
        child.material.opacity = 0.2 + Math.sin(timeRef.current * 1.5) * 0.15;
      }
    });
  });

  return <group ref={groupRef} position={position} />;
};
