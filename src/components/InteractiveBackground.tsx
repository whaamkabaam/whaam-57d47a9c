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

// Classic Perlin noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// Fractal Brownian Motion
float fbm(vec3 p) {
  float f = 0.0;
  mat3 m = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);
  f += 0.5000 * snoise(p); p = m * p * 2.02;
  f += 0.2500 * snoise(p); p = m * p * 2.03;
  f += 0.1250 * snoise(p); p = m * p * 2.01;
  f += 0.0625 * snoise(p);
  return f;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 mouse_uv = u_mouse / u_resolution.xy;
  
  // Recreate the CSS gradient background
  float mix1 = smoothstep(0.1, 0.4, st.y);
  vec3 color1 = vec3(0.059, 0.090, 0.164); // Dark slate
  vec3 color2 = vec3(0.118, 0.161, 0.224); // Slate
  vec3 color3 = vec3(0.200, 0.255, 0.333); // Light slate
  vec3 bg_color = mix(color1, color2, mix1);
  float mix2 = smoothstep(0.6, 0.9, st.y);
  bg_color = mix(bg_color, color3, mix2);

  // Mouse interaction
  float mouse_dist = distance(st, mouse_uv);
  float strength = smoothstep(0.25, 0.0, mouse_dist);

  // Liquid distortion using noise
  float noise_amount = fbm(vec3(st * 3.0, u_time * 0.1));
  vec2 distortion = vec2(noise_amount) * 0.03;
  
  // Add mouse-based push effect
  vec2 push = normalize(st - mouse_uv) * strength * 0.1;
  
  // Apply chromatic aberration with distortion
  vec3 final_color = bg_color;
  
  // Sample the background with slight offsets for chromatic effect
  vec2 red_offset = distortion + push * 0.5;
  vec2 green_offset = distortion;
  vec2 blue_offset = distortion - push * 0.5;
  
  // Apply the distorted sampling
  final_color.r = mix(color1.r, color2.r, smoothstep(0.1, 0.4, (st.y + red_offset.y)));
  final_color.g = mix(color1.g, color2.g, smoothstep(0.1, 0.4, (st.y + green_offset.y)));
  final_color.b = mix(color1.b, color2.b, smoothstep(0.1, 0.4, (st.y + blue_offset.y)));
  
  // Apply final mix
  final_color = mix(final_color, color3, smoothstep(0.6, 0.9, st.y + distortion.y));

  gl_FragColor = vec4(final_color, 1.0);
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
  const springyCursor = useSpringCursor();

  // Create material manually to avoid prop application issues
  const material = React.useMemo(() => {
    const mat = new LiquidGlassMaterial();
    
    // Initialize uniforms manually
    if (mat.uniforms) {
      mat.uniforms.u_time.value = 0;
      mat.uniforms.u_mouse.value = new THREE.Vector2(0, 0);
      mat.uniforms.u_resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
    }
    
    return mat;
  }, []);

  useFrame((state) => {
    if (material?.uniforms) {
      material.uniforms.u_time.value = state.clock.getElapsedTime();
      const mouseCoords = springyCursor.get();
      material.uniforms.u_mouse.value.set(mouseCoords[0], window.innerHeight - mouseCoords[1]);
      material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
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