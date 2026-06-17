import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useHUDStore } from '@/stores/hudStore';
import * as THREE from 'three';
import { useSuitStore } from '@/stores/suitStore';

/**
 * Radar Component
 * 3D radar visualization showing detected targets and objects
 */
interface RadarObject {
  id: string;
  position: THREE.Vector3;
  type: 'threat' | 'ally' | 'neutral';
  distance: number;
}

interface RadarProps {
  objects?: RadarObject[];
  range?: number;
}

export const Radar: React.FC<RadarProps> = ({ objects = [], range = 100 }) => {
  const groupRef = React.useRef<THREE.Group>(null);
  const lineRef = React.useRef<THREE.Line>(null);

  // Create radar lines
  React.useEffect(() => {
    if (!groupRef.current) return;

    // Clear existing
    groupRef.current.children.forEach((child) => groupRef.current?.remove(child));

    // Draw concentric circles
    const circles = 4;
    for (let i = 1; i <= circles; i++) {
      const geometry = new THREE.BufferGeometry();
      const points = [];

      for (let j = 0; j <= 64; j++) {
        const angle = (j / 64) * Math.PI * 2;
        const radius = (range / circles) * i;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
          )
        );
      }

      geometry.setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: '#00d4ff',
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(geometry, material);
      groupRef.current.add(line);
    }

    // Draw radial lines
    const radials = 8;
    for (let i = 0; i < radials; i++) {
      const angle = (i / radials) * Math.PI * 2;
      const geometry = new THREE.BufferGeometry();
      geometry.setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(
          Math.cos(angle) * range,
          0,
          Math.sin(angle) * range
        ),
      ]);
      const material = new THREE.LineBasicMaterial({
        color: '#00d4ff',
        transparent: true,
        opacity: 0.2,
      });
      const line = new THREE.Line(geometry, material);
      groupRef.current.add(line);
    }

    // Draw objects
    objects.forEach((obj) => {
      const geometry = new THREE.SphereGeometry(0.5, 8, 8);
      const color =
        obj.type === 'threat' ? '#ff0000' : obj.type === 'ally' ? '#00ff41' : '#ffff00';
      const material = new THREE.MeshBasicMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(obj.position);
      groupRef.current?.add(sphere);
    });
  }, [objects, range]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.3;
  });

  return <group ref={groupRef} position={[0, 2, 0]} scale={0.5} />;
};

export default Radar;
