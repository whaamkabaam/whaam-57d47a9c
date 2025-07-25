// src/components/InteractiveBackground.tsx

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSpringCursor } from '@/hooks/useSpringCursor';

import vertexShader from '../shaders/liquidGlass.vert?raw';
import fragmentShader from '../shaders/liquidGlass.frag?raw';

const LiquidGlassMaterial = shaderMaterial(
  {
    u_time: 0,
    u_mouse: new THREE.Vector2(0, 0),
    u_resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
  vertexShader,
  fragmentShader
);

extend({ LiquidGlassMaterial });

// TypeScript declarations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidGlassMaterial: any;
    }
  }
}

const ShaderPlane = () => {
  const materialRef = React.useRef<any>();
  const springyCursor = useSpringCursor();
  const { size } = useThree(); // Get viewport size

  // Update resolution uniform on resize
  React.useEffect(() => {
    if (materialRef.current) {
      materialRef.current.u_resolution.x = size.width;
      materialRef.current.u_resolution.y = size.height;
    }
  }, [size]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.u_time = state.clock.getElapsedTime();
      const mouseCoords = springyCursor.get();
      materialRef.current.u_mouse.x = mouseCoords[0];
      // Correct Y-coordinate for GLSL
      materialRef.current.u_mouse.y = window.innerHeight - mouseCoords[1];
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <liquidGlassMaterial ref={materialRef} />
    </mesh>
  );
};

const InteractiveBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Suspense fallback={null}>
        <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
          <ShaderPlane />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default InteractiveBackground;