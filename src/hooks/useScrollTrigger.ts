import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface UseScrollTriggerOptions {
  trigger?: HTMLElement | string;
  start?: string;
  end?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  animation?: gsap.core.Tween | gsap.core.Timeline;
}

export const useScrollTrigger = ({
  trigger,
  start = 'top center',
  end = 'center center',
  onEnter,
  onLeave,
  animation,
}: UseScrollTriggerOptions) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      const element = trigger ? (typeof trigger === 'string' ? document.querySelector(trigger) : trigger) : ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && onEnter) {
        onEnter();
      } else if (!isVisible && onLeave) {
        onLeave();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trigger, onEnter, onLeave]);

  return ref;
};
