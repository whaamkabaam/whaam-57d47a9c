// src/components/LiquidEdgeFX.tsx
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface LiquidEdgeFXProps {
  edgeWidth?: number; // 0..0.5 (fraction of half-size)
  feather?: number;   // softness from edge into center
  intensity?: number; // overall alpha/intensity
  tint?: string;      // CSS color string
}

function EdgeShader({ edgeWidth = 0.1, feather = 0.12, intensity = 0.6, tint = '#ffffff' }: LiquidEdgeFXProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport, size } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uEdge: { value: edgeWidth },
    uFeather: { value: feather },
    uIntensity: { value: intensity },
    uTint: { value: new THREE.Color(tint) },
  }), [edgeWidth, feather, intensity, tint, size.width, size.height]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  const vertexShader = /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = /* glsl */`
    precision highp float;
    varying vec2 vUv;

    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uEdge;
    uniform float uFeather;
    uniform float uIntensity;
    uniform vec3 uTint;

    // Simple pseudo-noise via layered sines (fast and good enough for highlights)
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;

      // Edge mask: 1 near edges, 0 in the center
      float d = min(min(uv.x, uv.y), min(1.0 - uv.x, 1.0 - uv.y));
      float edge = 1.0 - smoothstep(uEdge, uEdge + uFeather, d);

      // Liquid caustic highlights (no geometry distortion)
      vec2 p = uv * vec2(2.0, 2.0);
      float t = uTime * 0.3;
      float waves = 0.0;
      waves += fbm(p * 3.0 + vec2(t * 0.6, -t * 0.4));
      waves += 0.5 * fbm(p * 6.0 + vec2(-t * 0.2, t * 0.7));
      waves = pow(smoothstep(0.6, 1.0, waves), 2.0);

      // Subtle directional sheen
      float sheen = smoothstep(0.2, 0.0, uv.y) * 0.25 + smoothstep(0.2, 0.0, uv.x) * 0.25;

      float highlight = clamp(waves + sheen, 0.0, 1.0);
      vec3 color = mix(vec3(1.0), uTint, 0.15) * highlight;

      float alpha = highlight * edge * uIntensity; // zero at center, strongest at edges

      // Premultiplied alpha output (we rely on additive blending in material)
      gl_FragColor = vec4(color * alpha, alpha);
    }
  `;

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms as any}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function LiquidEdgeFX(props: LiquidEdgeFXProps) {
  return (
    <Canvas
      className="pointer-events-none"
      orthographic
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 1], zoom: 1 }}
      style={{ width: '100%', height: '100%', mixBlendMode: 'screen' }}
    >
      
      {/* Lights are not used; shader is self-lit */}
      <EdgeShader {...props} />
    </Canvas>
  );
}
