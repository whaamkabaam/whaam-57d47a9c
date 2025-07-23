import { useRef, useEffect, useCallback } from 'react';

interface SpringCursorState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface UseSpringCursorOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
  enabled?: boolean;
}

export const useSpringCursor = (
  elementRef: React.RefObject<HTMLElement>,
  options: UseSpringCursorOptions = {}
) => {
  const {
    stiffness = 0.15,
    damping = 0.8,
    mass = 1,
    enabled = true
  } = options;

  const springState = useRef<SpringCursorState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0
  });

  const targetRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const animate = useCallback(() => {
    if (!enabled) return;

    const state = springState.current;
    const target = targetRef.current;

    // Spring physics calculations
    const fx = (target.x - state.x) * stiffness;
    const fy = (target.y - state.y) * stiffness;

    // Apply damping
    state.vx = (state.vx + fx / mass) * damping;
    state.vy = (state.vy + fy / mass) * damping;

    // Update position
    state.x += state.vx;
    state.y += state.vy;

    // Continue animation if there's still movement
    const velocity = Math.sqrt(state.vx * state.vx + state.vy * state.vy);
    const distance = Math.sqrt(
      (target.x - state.x) * (target.x - state.x) + 
      (target.y - state.y) * (target.y - state.y)
    );

    if (velocity > 0.001 || distance > 0.001) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [stiffness, damping, mass, enabled]);

  const updateTarget = useCallback((clientX: number, clientY: number) => {
    if (!enabled || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    
    // Normalize to -1 to 1 range
    targetRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    targetRef.current.y = -(((clientY - rect.top) / rect.height) * 2 - 1); // Flip Y axis

    // Start animation if not already running
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [animate, enabled, elementRef]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateTarget(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      // Spring back to center when mouse leaves
      targetRef.current.x = 0;
      targetRef.current.y = 0;
      
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };
  }, [elementRef, enabled, animate, updateTarget]);

  // Return current spring position
  return {
    x: springState.current.x,
    y: springState.current.y
  };
};