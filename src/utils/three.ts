/**
 * Three.js utilities
 */

import * as THREE from 'three';

export const createGlowMaterial = (
  color: string,
  intensity: number = 2
): THREE.Material => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Create radial gradient for glow
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 180);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, '#000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });
};

export const createHologramMaterial = (
  color: string
): THREE.ShaderMaterial => {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform vec3 uColor;
      uniform float uTime;

      void main() {
        float alpha = 0.7 + 0.3 * sin(uTime * 2.0);
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    wireframe: true,
  });
};

export const hexToRgb = (hex: string): THREE.Color => {
  const color = new THREE.Color(hex);
  return color;
};

export const lerpColor = (
  color1: THREE.Color,
  color2: THREE.Color,
  factor: number
): THREE.Color => {
  const result = color1.clone();
  return result.lerp(color2, factor);
};
