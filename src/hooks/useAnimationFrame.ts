import { useEffect, useRef } from 'react';

interface UseAnimationFrameOptions {
  enabled?: boolean;
  onFrame?: (deltaTime: number) => void;
}

export const useAnimationFrame = ({
  enabled = true,
  onFrame,
}: UseAnimationFrameOptions = {}) => {
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled || !onFrame) return;

    const loop = (currentTime: number) => {
      const deltaTime = lastTimeRef.current ? currentTime - lastTimeRef.current : 0;
      lastTimeRef.current = currentTime;
      onFrame(deltaTime);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, onFrame]);

  return {
    stop: () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    },
  };
};
