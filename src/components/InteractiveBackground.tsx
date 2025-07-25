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
  const springyCursor = useSpringCursor();
  const { size } = useThree();

  // Create material manually to avoid prop application issues
  const material = React.useMemo(() => {
    const mat = new LiquidGlassMaterial();
    
    // Initialize uniforms manually
    if (mat.uniforms) {
      mat.uniforms.u_time.value = 0;
      mat.uniforms.u_mouse.value = new THREE.Vector2(0, 0);
      mat.uniforms.u_resolution.value = new THREE.Vector2(size.width, size.height);
    }
    
    return mat;
  }, [size.width, size.height]);

  useFrame((state) => {
    if (material?.uniforms) {
      material.uniforms.u_time.value = state.clock.getElapsedTime();
      const mouseCoords = springyCursor.get();
      material.uniforms.u_mouse.value.set(mouseCoords[0], window.innerHeight - mouseCoords[1]);
      material.uniforms.u_resolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh material={material}>
      <planeGeometry args={[2, 2]} />
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