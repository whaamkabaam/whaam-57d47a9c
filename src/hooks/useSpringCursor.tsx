// src/hooks/useSpringCursor.tsx

import { useState, useEffect } from 'react';
import { useSpring } from 'react-spring';

export function useSpringCursor() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [{ xy }, api] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 12, tension: 400, friction: 150 },
  }));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCoords({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    api.start({ xy: [coords.x, coords.y] });
  }, [coords.x, coords.y, api]);

  return xy;
}