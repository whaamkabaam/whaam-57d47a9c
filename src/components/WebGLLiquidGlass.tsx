import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSpringCursor } from '@/hooks/useSpringCursor';

// Import shaders as strings
const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform sampler2D uBackground;
uniform float uDistortionStrength;
uniform float uChromaticAberration;
uniform float uSpecularIntensity;

varying vec2 vUv;
varying vec3 vPosition;

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    
    for(int i = 0; i < 4; i++) {
        value += amplitude * smoothNoise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    
    return value;
}

void main() {
    vec2 uv = vUv;
    
    vec2 mousePos = (uMouse + 1.0) * 0.5;
    float distanceFromMouse = distance(uv, mousePos);
    
    float influence = exp(-distanceFromMouse * 3.0);
    
    vec2 noiseCoord = uv * 2.0 + uTime * 0.1;
    float noiseValue = fbm(noiseCoord);
    
    vec2 distortion = vec2(
        sin(noiseValue * 3.14159 + uTime * 0.5) * influence,
        cos(noiseValue * 3.14159 + uTime * 0.3) * influence
    ) * uDistortionStrength;
    
    vec2 toMouse = mousePos - uv;
    float mouseInfluence = smoothstep(0.3, 0.0, distanceFromMouse);
    distortion += toMouse * mouseInfluence * 0.02;
    
    vec2 distortedUV = uv + distortion;
    vec3 color = texture2D(uBackground, distortedUV).rgb;
    
    if(uChromaticAberration > 0.0) {
        float aberrationAmount = uChromaticAberration * influence;
        
        vec3 aberration = vec3(
            texture2D(uBackground, distortedUV + vec2(aberrationAmount, 0.0)).r,
            color.g,
            texture2D(uBackground, distortedUV - vec2(aberrationAmount, 0.0)).b
        );
        
        color = mix(color, aberration, 0.3);
    }
    
    if(uSpecularIntensity > 0.0) {
        vec2 lightDir = normalize(mousePos - uv);
        vec2 normal = normalize(distortion + vec2(0.0, 0.0));
        
        float specular = pow(max(0.0, dot(normal, lightDir)), 32.0);
        specular *= mouseInfluence * uSpecularIntensity;
        
        color += vec3(specular * 0.3, specular * 0.5, specular * 0.8);
    }
    
    color = mix(color, vec3(0.9, 0.95, 1.0), 0.1);
    
    gl_FragColor = vec4(color, 0.9);
}
`;

// Create shader material
const LiquidGlassMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
    uBackground: null as THREE.Texture | null,
    uDistortionStrength: 0.01,
    uChromaticAberration: 0.002,
    uSpecularIntensity: 0.5,
  },
  vertexShader,
  fragmentShader
);

// Extend react-three-fiber with our custom material
extend({ LiquidGlassMaterial });

interface LiquidGlassMeshProps {
  mousePosition: { x: number; y: number };
  backgroundTexture?: THREE.Texture;
  distortionStrength?: number;
  chromaticAberration?: number;
  specularIntensity?: number;
}

function LiquidGlassMesh({
  mousePosition,
  backgroundTexture,
  distortionStrength = 0.01,
  chromaticAberration = 0.002,
  specularIntensity = 0.5,
}: LiquidGlassMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  // Create material instance with proper typing
  const material = useMemo(() => {
    const mat = new LiquidGlassMaterial();
    mat.transparent = true;
    
    // Initialize uniforms
    if (mat.uniforms) {
      mat.uniforms.uTime.value = 0;
      mat.uniforms.uMouse.value = new THREE.Vector2(0, 0);
      mat.uniforms.uResolution.value = new THREE.Vector2(size.width, size.height);
      mat.uniforms.uBackground.value = backgroundTexture || null;
      mat.uniforms.uDistortionStrength.value = distortionStrength;
      mat.uniforms.uChromaticAberration.value = chromaticAberration;
      mat.uniforms.uSpecularIntensity.value = specularIntensity;
    }
    
    return mat;
  }, [size.width, size.height, backgroundTexture, distortionStrength, chromaticAberration, specularIntensity]);

  useFrame((state) => {
    if (material?.uniforms) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uMouse.value.set(mousePosition.x, mousePosition.y);
      material.uniforms.uResolution.value.set(size.width, size.height);
      material.uniforms.uDistortionStrength.value = distortionStrength;
      material.uniforms.uChromaticAberration.value = chromaticAberration;
      material.uniforms.uSpecularIntensity.value = specularIntensity;
      
      if (backgroundTexture) {
        material.uniforms.uBackground.value = backgroundTexture;
      }
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

interface WebGLLiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  distortionStrength?: number;
  chromaticAberration?: number;
  specularIntensity?: number;
  fallback?: React.ReactNode;
}

export const WebGLLiquidGlass: React.FC<WebGLLiquidGlassProps> = ({
  children,
  className = '',
  distortionStrength = 0.01,
  chromaticAberration = 0.002,
  specularIntensity = 0.5,
  fallback,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const springMouse = useSpringCursor(containerRef, {
    stiffness: 0.15,
    damping: 0.8,
    mass: 1,
  });

  // Create a simple background texture (can be enhanced to capture actual background)
  const backgroundTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, 256, 256);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(1, '#334155');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const handleWebGLError = useCallback(() => {
    console.warn('WebGL not supported, falling back to CSS implementation');
    return fallback || null;
  }, [fallback]);

  // Check for WebGL support
  const hasWebGLSupport = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch {
      return false;
    }
  }, []);

  if (!hasWebGLSupport) {
    return <>{fallback}</>;
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* WebGL Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas>
          <LiquidGlassMesh
            mousePosition={springMouse}
            backgroundTexture={backgroundTexture}
            distortionStrength={distortionStrength}
            chromaticAberration={chromaticAberration}
            specularIntensity={specularIntensity}
          />
        </Canvas>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

// Extend the JSX namespace to include our custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidGlassMaterial: any;
    }
  }
}

// TypeScript declaration for the extended material
declare module '@react-three/fiber' {
  interface ThreeElements {
    liquidGlassMaterial: any;
  }
}