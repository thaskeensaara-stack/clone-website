import { useEffect, useRef, useState, useCallback } from 'react';

interface UseResizeObserverOptions {
  onResize?: (width: number, height: number) => void;
}

export const useResizeObserver = ({
  onResize,
}: UseResizeObserverOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      const { width, height } = element.getBoundingClientRect();
      setDimensions({ width, height });
      if (onResize) {
        onResize(width, height);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [onResize]);

  return { ref, ...dimensions };
};
