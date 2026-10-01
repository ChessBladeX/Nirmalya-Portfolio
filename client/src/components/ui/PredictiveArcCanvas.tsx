import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface PredictiveArcCanvasProps {
  mode?: "dark" | "light";
  speed?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
}

export const PredictiveArcCanvas: React.FC<PredictiveArcCanvasProps> = ({
  mode = "dark",
  speed = 1.0,
  hue = 0,
  saturation = 1.0,
  brightness = 1.0,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Three.js Scene, Camera, WebGLRenderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false, // Solid cosmic canvas background
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL not supported or context lost", e);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    // Uniforms for Aurora UI Shader
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width * dpr, height * dpr) },
      uSpeed: { value: speed },
      uBrightness: { value: brightness },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `;

    // Aurora UI Fragment Shader with organic top-left violet and bottom-right magenta nebulae + shimmering starfield
    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uSpeed;
      uniform float uBrightness;

      // Pseudo-random 2D hash
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      // Smooth 2D value noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      // Fractal Brownian Motion for undulating organic gas clouds
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      // Multi-layer Starfield with subtle organic twinkling
      float renderStars(vec2 uv, float scale, float t, float threshold) {
        vec2 gridId = floor(uv * scale);
        vec2 gridUv = fract(uv * scale) - 0.5;
        float n = hash(gridId);

        if (n > threshold) {
          // Normalized sub-cell offset
          vec2 offset = vec2(hash(gridId + 1.1) - 0.5, hash(gridId + 2.7) - 0.5) * 0.72;
          float d = length(gridUv - offset);

          // Star twinkle phase
          float twinkle = sin(t * 2.2 + n * 6.2831) * 0.35 + 0.65;
          
          // Crisp core and soft halo
          float starCore = smoothstep(0.022, 0.0, d);
          float starGlow = exp(-d * 22.0) * 0.35;
          return (starCore + starGlow) * twinkle;
        }
        return 0.0;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
        float aspect = uResolution.x / uResolution.y;
        float t = uTime * 0.22 * uSpeed;

        // Base Deep Cosmic Void (Obsidian violet-black background - much darker)
        vec3 baseColor = vec3(0.012, 0.007, 0.022); // Near-pitch cosmic void

        // 1. TOP-LEFT AURORA BLOOM (Deep muted royal violet)
        vec2 tlCenter = vec2(-0.45 * aspect, 0.38);
        vec2 tlCoord = uv - tlCenter;
        float tlDist = length(tlCoord);
        // Organic undulating wave
        float tlNoise = fbm(tlCoord * 2.2 + vec2(t * 0.4, -t * 0.3));
        float tlMask = exp(-tlDist * (2.1 + 0.35 * tlNoise));
        vec3 tlColor = vec3(0.38, 0.10, 0.68) * tlMask * 0.75; // Subdued deep purple

        // 2. BOTTOM-RIGHT AURORA BLOOM (Muted fuchsia / magenta)
        vec2 brCenter = vec2(0.48 * aspect, -0.42);
        vec2 brCoord = uv - brCenter;
        float brDist = length(brCoord);
        float brNoise = fbm(brCoord * 2.0 - vec2(t * 0.35, t * 0.45));
        float brMask = exp(-brDist * (2.0 + 0.4 * brNoise));
        vec3 brColor = vec3(0.48, 0.06, 0.52) * brMask * 0.75; // Subdued magenta

        // 3. CENTER AMBIENT VIOLET HALO (Very subtle, keeping the center dark for high readability)
        float centerDist = length(uv - vec2(0.0, 0.02));
        float centerMask = exp(-centerDist * 2.5);
        vec3 centerColor = vec3(0.14, 0.07, 0.28) * centerMask * 0.35; // Faint ambient bridge

        // Combine Aurora Fog
        vec3 finalColor = baseColor + tlColor + brColor + centerColor;

        // 4. SHIMMERING STARFIELD (Delicate, crisp stars)
        vec2 starUv = gl_FragCoord.xy / uResolution.y;
        
        // Layer 1: Distant micro stars
        float stars1 = renderStars(starUv, 48.0, t, 0.94);
        // Layer 2: Mid-distance brighter stars
        float stars2 = renderStars(starUv + vec2(0.33, 0.77), 28.0, t * 1.3, 0.965);
        // Layer 3: Occasional anchor stars
        float stars3 = renderStars(starUv + vec2(0.68, 0.12), 16.0, t * 0.8, 0.985);

        float allStars = stars1 * 0.45 + stars2 * 0.75 + stars3 * 1.1;
        vec3 starColor = vec3(0.92, 0.90, 0.98) * allStars;

        finalColor += starColor;

        // Global Brightness scaling (darker atmosphere)
        finalColor *= (uBrightness * 0.75);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: false,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      uniforms.uTime.value += delta;
      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      const currentDpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(currentDpr);
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width * currentDpr, height * currentDpr);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        renderer.dispose();
      }
      geometry.dispose();
      material.dispose();
    };
  }, [mode, speed, hue, saturation, brightness]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};

export default PredictiveArcCanvas;
