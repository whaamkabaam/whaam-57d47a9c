uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform sampler2D uBackground;
uniform float uDistortionStrength;
uniform float uChromaticAberration;
uniform float uSpecularIntensity;

varying vec2 vUv;
varying vec3 vPosition;

// Smooth noise function
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Smooth interpolated noise
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

// Fractal noise
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
    
    // Distance from mouse position (normalized)
    vec2 mousePos = (uMouse + 1.0) * 0.5; // Convert from -1,1 to 0,1
    float distanceFromMouse = distance(uv, mousePos);
    
    // Create a falloff based on distance from mouse
    float influence = exp(-distanceFromMouse * 3.0);
    
    // Time-based animated noise
    vec2 noiseCoord = uv * 2.0 + uTime * 0.1;
    float noiseValue = fbm(noiseCoord);
    
    // Combine mouse influence with noise for organic distortion
    vec2 distortion = vec2(
        sin(noiseValue * 3.14159 + uTime * 0.5) * influence,
        cos(noiseValue * 3.14159 + uTime * 0.3) * influence
    ) * uDistortionStrength;
    
    // Add radial distortion from mouse position
    vec2 toMouse = mousePos - uv;
    float mouseInfluence = smoothstep(0.3, 0.0, distanceFromMouse);
    distortion += toMouse * mouseInfluence * 0.02;
    
    // Sample background with distortion for main color
    vec2 distortedUV = uv + distortion;
    vec3 color = texture2D(uBackground, distortedUV).rgb;
    
    // Chromatic aberration effect
    if(uChromaticAberration > 0.0) {
        float aberrationAmount = uChromaticAberration * influence;
        
        vec3 aberration = vec3(
            texture2D(uBackground, distortedUV + vec2(aberrationAmount, 0.0)).r,
            color.g,
            texture2D(uBackground, distortedUV - vec2(aberrationAmount, 0.0)).b
        );
        
        color = mix(color, aberration, 0.3);
    }
    
    // Specular highlight
    if(uSpecularIntensity > 0.0) {
        vec2 lightDir = normalize(mousePos - uv);
        vec2 normal = normalize(distortion + vec2(0.0, 0.0));
        
        // Simple Phong-like specular
        float specular = pow(max(0.0, dot(normal, lightDir)), 32.0);
        specular *= mouseInfluence * uSpecularIntensity;
        
        // Add specular highlight
        color += vec3(specular * 0.3, specular * 0.5, specular * 0.8);
    }
    
    // Glass tint and transparency
    color = mix(color, vec3(0.9, 0.95, 1.0), 0.1); // Slight blue tint
    
    gl_FragColor = vec4(color, 0.9);
}