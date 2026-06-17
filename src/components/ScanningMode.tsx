import React, { useEffect, useRef } from 'react';
import { useScanStore } from '@/stores/scanStore';
import { useAnimationFrame } from '@/hooks';
import gsap from 'gsap';

/**
 * Scanning Mode Component
 * Full-screen scanning overlay with grid and target detection
 */
export const ScanningMode: React.FC = () => {
  const { targets, isScanningActive, setScanActive } = useScanStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  const { stop: stopAnimation } = useAnimationFrame({
    enabled: isScanningActive,
    onFrame: (deltaTime) => {
      timeRef.current += deltaTime;
      drawScanOverlay();
    },
  });

  const drawScanOverlay = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    const gridSize = 40;
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw scanning lines
    const scanY = (Math.sin(timeRef.current * 0.002) * canvas.height) / 2 + canvas.height / 2;
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(canvas.width, scanY);
    ctx.stroke();

    // Draw targets
    targets.forEach((target, idx) => {
      const x = (canvas.width / 2) + Math.cos(idx) * 100;
      const y = (canvas.height / 2) + Math.sin(idx) * 100;
      const pulse = Math.sin(timeRef.current * 0.003 + idx) * 10 + 20;

      // Target circle
      ctx.strokeStyle =
        target.type === 'threat'
          ? 'rgba(255, 0, 0, 0.8)'
          : target.type === 'ally'
            ? 'rgba(0, 255, 65, 0.8)'
            : 'rgba(255, 212, 0, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, pulse, 0, Math.PI * 2);
      ctx.stroke();

      // Center dot
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fillRect(x - 3, y - 3, 6, 6);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isScanningActive) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto"
      />

      {/* Corner overlays */}
      <div className="absolute top-4 left-4 border-2 border-iron-blue w-16 h-16" />
      <div className="absolute top-4 right-4 border-2 border-iron-blue w-16 h-16" />
      <div className="absolute bottom-4 left-4 border-2 border-iron-blue w-16 h-16" />
      <div className="absolute bottom-4 right-4 border-2 border-iron-blue w-16 h-16" />

      {/* Center reticle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-12 h-12 border-2 border-iron-blue rounded-full" />
        <div className="w-6 h-6 border-2 border-iron-blue rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Close button */}
      <button
        onClick={() => setScanActive(false)}
        className="absolute top-8 right-8 bg-iron-red/20 hover:bg-iron-red/40 border border-iron-red/70 rounded px-4 py-2 text-iron-red text-xs font-mono z-50 pointer-events-auto"
      >
        EXIT SCAN
      </button>
    </div>
  );
};

export default ScanningMode;
