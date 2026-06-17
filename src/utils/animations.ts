/**
 * Animation utilities using GSAP
 */

import gsap from 'gsap';

export const animateValue = (
  target: { value: number },
  from: number,
  to: number,
  duration: number = 0.5,
  onUpdate?: () => void
) => {
  return gsap.to(target, {
    value: to,
    duration,
    ease: 'power2.inOut',
    onUpdate,
  });
};

export const animatePosition = (
  target: HTMLElement,
  to: { x?: number; y?: number; z?: number },
  duration: number = 0.6
) => {
  return gsap.to(target, {
    ...to,
    duration,
    ease: 'power3.inOut',
  });
};

export const animateOpacity = (
  target: HTMLElement,
  to: number,
  duration: number = 0.4
) => {
  return gsap.to(target, {
    opacity: to,
    duration,
    ease: 'power2.inOut',
  });
};

export const animateScale = (
  target: HTMLElement,
  to: number,
  duration: number = 0.4
) => {
  return gsap.to(target, {
    scale: to,
    duration,
    ease: 'back.out',
  });
};

export const pulseAnimation = (
  target: HTMLElement,
  intensity: number = 1.1,
  duration: number = 0.6
) => {
  return gsap.to(target, {
    scale: intensity,
    duration: duration / 2,
    yoyo: true,
    repeat: 1,
    ease: 'sine.inOut',
  });
};

export const glitchAnimation = (target: HTMLElement, duration: number = 0.3) => {
  const timeline = gsap.timeline();
  timeline.to(target, {
    x: -5,
    duration: duration / 4,
    ease: 'none',
  });
  timeline.to(target, {
    x: 5,
    duration: duration / 4,
    ease: 'none',
  });
  timeline.to(target, {
    x: -3,
    duration: duration / 4,
    ease: 'none',
  });
  timeline.to(target, {
    x: 0,
    duration: duration / 4,
    ease: 'none',
  });
  return timeline;
};

export const staggerAnimation = (
  targets: HTMLElement[],
  animation: { [key: string]: any },
  duration: number = 0.4,
  stagger: number = 0.1
) => {
  return gsap.to(targets, {
    ...animation,
    duration,
    stagger,
    ease: 'power2.out',
  });
};
