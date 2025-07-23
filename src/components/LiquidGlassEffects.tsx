// src/components/LiquidGlassEffects.tsx

import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import { cn } from '@/lib/utils';

// Vertex Shader: Positions the plane
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader: Creates the liquid glass effect
const fragmentShader = `
  uniform sampler2D uBackground;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    // Create a circular mask
    float dist = distance(vUv, vec2(0.5));
    if (dist > 0.5) {
      discard;
    }

    // Wobble effect using time
    vec2 wobble = vec2(
      sin(vUv.y * 10.0 + uTime * 0.5) * 0.01,
      cos(vUv.x * 10.0 + uTime * 0.5) * 0.01
    );

    // Refraction based on mouse distance from center
    vec2 center = vec2(0.5);
    vec2 toMouse = uMouse - center;
    float mouseDist = length(toMouse);
    vec2 fromCenter = vUv - center;
    float angle = atan(fromCenter.y, fromCenter.x);
    
    float refraction = (1.0 - distance(vUv, uMouse)) * uIntensity * 0.1;
    vec2 refractedUv = vUv + normalize(fromCenter) * refraction * smoothstep(0.0, 0.5, mouseDist);

    // Chromatic Aberration
    vec4 bgR = texture2D(uBackground, refractedUv + vec2(0.005, 0.0) + wobble);
    vec4 bgG = texture2D(uBackground, refractedUv + wobble);
    vec4 bgB = texture2D(uBackground, refractedUv - vec2(0.005, 0.0) + wobble);

    gl_FragColor = vec4(bgR.r, bgG.g, bgB.b, 1.0);
  }
`;

// Create a reusable shader material
const LiquidMaterial = shaderMaterial(
  { uIntensity: 0, uTime: 0, uMouse: new THREE.Vector2(0.5, 0.5), uBackground: null },
  vertexShader,
  fragmentShader
);

extend({ LiquidMaterial });

// TypeScript declarations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidMaterial: any;
    }
  }
}

// The main WebGL scene component
function LiquidScene({ distortion }: { distortion: 'subtle' | 'medium' }) {
  const [{ intensity }, api] = useSpring(() => ({ intensity: 0 }));
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  // Create a simple texture instead of loading from file
  const backgroundTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(1, '#334155');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Create material instance manually
  const material = useMemo(() => {
    const mat = new LiquidMaterial();
    mat.transparent = false;
    
    // Initialize uniforms
    if (mat.uniforms) {
      mat.uniforms.uTime.value = 0;
      mat.uniforms.uMouse.value = new THREE.Vector2(0.5, 0.5);
      mat.uniforms.uIntensity.value = 0;
      mat.uniforms.uBackground.value = backgroundTexture;
    }
    
    return mat;
  }, [backgroundTexture]);

  const distortionIntensity = distortion === 'subtle' ? 0.3 : 0.6;

  useFrame((state) => {
    // Smoothly interpolate mouse position for fluid movement
    mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, state.pointer.x / 2 + 0.5, 0.05);
    mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, 1.0 - (state.pointer.y / 2 + 0.5), 0.05);
    
    // Update material uniforms
    if (material?.uniforms) {
      material.uniforms.uMouse.value.set(mousePos.current.x, mousePos.current.y);
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      material.uniforms.uIntensity.value = intensity.get();
    }
  });

  return (
    <mesh 
      material={material}
      onPointerOver={() => api.start({ intensity: distortionIntensity })}
      onPointerOut={() => api.start({ intensity: 0 })}
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

// Simplified Card Component
interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  interactive?: boolean;
  distortion?: 'none' | 'subtle' | 'medium';
  className?: string;
}

export const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  ({ children, variant = 'primary', interactive = false, distortion = 'none', className = '', ...props }, ref) => {
    // Use WebGL for interactive cards, otherwise use simpler distortion
    const effectDistortion = interactive ? (distortion === 'none' ? 'subtle' : distortion) : 'none';
    
    return (
      <div ref={ref} className={cn("glass-card relative overflow-hidden", `glass-${variant}`, className)} {...props}>
        {effectDistortion !== 'none' && (
          <div className="webgl-canvas-container">
            <Suspense fallback={null}>
              <Canvas orthographic camera={{ zoom: 100, position: [0, 0, 100] }}>
                <LiquidScene distortion={effectDistortion} />
              </Canvas>
            </Suspense>
          </div>
        )}
        <div className="relative z-10 glass-text">{children}</div>
      </div>
    );
  }
);
LiquidGlassCard.displayName = 'LiquidGlassCard';

// Add back the button and filters for compatibility, though they don't use the WebGL effect.
export const LiquidDistortionFilters = () => <></>; // No longer needed

export const LiquidGlassButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'accent';
  interactive?: boolean;
}>(
  ({ className, variant = 'primary', interactive = false, ...props }, ref) => {
    const variantClasses = {
      primary: 'liquid-glow',
      secondary: 'liquid-glow-secondary', 
      accent: 'liquid-glow-accent'
    };
    
    return (
      <button 
        ref={ref} 
        className={cn("glass-btn glass-button glass-text-contrast fluid-animation", variantClasses[variant], className)} 
        {...props}
      />
    );
  }
);
LiquidGlassButton.displayName = 'LiquidGlassButton';