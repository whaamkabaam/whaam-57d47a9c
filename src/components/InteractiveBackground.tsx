// src/components/InteractiveBackground.tsx

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSpringCursor } from '@/hooks/useSpringCursor';

// Shader source code (inline since Vite might have issues with .glsl imports)
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 vUv;

// Gradient and color definitions to match index.css
const vec3 color1 = vec3(0.059, 0.090, 0.164); // Dark slate
const vec3 color2 = vec3(0.118, 0.161, 0.224); // Slate
const vec3 color3 = vec3(0.200, 0.255, 0.333); // Light slate

// Noise function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  // Recreate the CSS gradient background
  float mix1 = smoothstep(0.1, 0.4, st.y);
  vec3 bg_color = mix(color1, color2, mix1);
  float mix2 = smoothstep(0.6, 0.9, st.y);
  bg_color = mix(bg_color, color3, mix2);
  
  // Mouse interaction
  float dist = distance(st, u_mouse / u_resolution.xy);
  float strength = smoothstep(0.2, 0.0, dist);

  // Liquid distortion effect
  vec2 distorted_uv = st + vec2(
    sin(st.y * 10.0 + u_time * 0.5 + strength * 2.0) * 0.01,
    cos(st.x * 10.0 + u_time * 0.5 + strength * 2.0) * 0.01
  );

  // Add subtle noise
  float noise = (random(distorted_uv * 2.0) - 0.5) * 0.03;

  gl_FragColor = vec4(bg_color + noise, 1.0);
}
`;

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
  const materialRef = useRef<any>();
  const springyCursor = useSpringCursor();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.u_time = state.clock.getElapsedTime();
      const mouseCoords = springyCursor.get();
      materialRef.current.u_mouse.x = mouseCoords[0];
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