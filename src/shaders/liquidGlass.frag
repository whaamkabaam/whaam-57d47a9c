// src/shaders/liquidGlass.frag

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec2 vUv;

// Simplex Noise function for organic patterns
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
  vec3 x3 = x0 - i1 + C.xxx;
  vec3 x4 = x0 - i2 + C.yyy;
  vec3 x5 = x0 - D.yyy;
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
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x3,x3), dot(x4,x4), dot(x5,x5)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x3), dot(p2,x4), dot(p3,x5)));
}

// Fractal Brownian Motion for layered noise
float fbm(vec3 p) {
    float f = 0.0;
    mat3 m = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);
    f += 0.5000 * snoise(p); p = m * p * 2.02;
    f += 0.2500 * snoise(p); p = m * p * 2.03;
    f += 0.1250 * snoise(p);
    return f;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse_uv = u_mouse / u_resolution.xy;

    // --- Background Color Gradient ---
    vec3 color1 = vec3(0.019, 0.039, 0.098); // hsl(220, 100%, 3%)
    vec3 color2 = vec3(0.015, 0.011, 0.101); // hsl(240, 80%, 4%)
    vec3 color3 = vec3(0.031, 0.019, 0.101); // hsl(260, 60%, 5%)
    float mix1 = smoothstep(0.1, 0.5, st.y);
    vec3 color = mix(color1, color2, mix1);
    float mix2 = smoothstep(0.5, 0.9, st.y);
    color = mix(color, color3, mix2);

    // --- Liquid Distortion ---
    // 1. Base organic movement
    float base_noise = fbm(vec3(st * 1.5, u_time * 0.05));
    // 2. Faster, smaller ripples
    float detail_noise = snoise(vec3(st * 8.0, u_time * 0.3));
    // 3. Mouse interaction
    float mouse_dist = distance(st, mouse_uv);
    float push_strength = smoothstep(0.25, 0.0, mouse_dist);
    vec2 push_vector = normalize(st - mouse_uv) * push_strength * 0.1;
    
    // Combine distortions
    vec2 distortion = vec2(base_noise * 0.03 + detail_noise * 0.01) + push_vector;
    
    // Apply distortion as a subtle refraction
    vec3 refracted_color = vec3(
        mix(color1.r, color2.r, smoothstep(0.1, 0.5, st.y + distortion.x * 1.1)),
        mix(color1.g, color2.g, smoothstep(0.1, 0.5, st.y + distortion.y)),
        mix(color1.b, color2.b, smoothstep(0.1, 0.5, st.y + distortion.x * 0.9))
    );
    
    // Apply final color mix
    refracted_color = mix(refracted_color, color3, smoothstep(0.5, 0.9, st.y + distortion.y));

    // --- Final Color ---
    // Add a subtle grain for texture
    float grain = (fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.05;
    vec3 final_color = refracted_color + grain;

    gl_FragColor = vec4(final_color, 1.0);
}