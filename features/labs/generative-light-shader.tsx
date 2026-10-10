"use client";

import { useEffect, useRef } from "react";

/**
 * GenerativeLightShader
 *
 * Style:
 * Generative light on a committed ground.
 * Every colour is computed per pixel from a clock and coordinate; nothing is sampled from an image.
 *
 * Spec:
 * - Ground: #08090D (rgb 8, 9, 13)
 * - Accents: ["#DBE0EB", "#080A0D"] (rgb 219, 224, 235 and rgb 8, 10, 13)
 * - The palette is kept to two or three calibrated values so the effect reads as one coherent material.
 */
export const GenerativeLightShader = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use WebGL context for 60fps per-pixel shader evaluation
    const gl =
      canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        powerPreference: "high-performance",
      }) ||
      (canvas.getContext(
        "experimental-webgl"
      ) as WebGLRenderingContext | null);

    if (!gl) {
      // Fallback to 2D canvas procedural renderer if WebGL unavailable
      return fallbackCanvas2D(canvas);
    }

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Per-pixel procedural shader:
    // Computes ray-like / undulating generative light beams on #08090D ground with #DBE0EB accent.
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;

      // Palette definition per spec:
      // Ground: #08090D -> (8.0/255.0, 9.0/255.0, 13.0/255.0)
      // Accent: #DBE0EB -> (219.0/255.0, 224.0/255.0, 235.0/255.0)
      // Dark Accent: #080A0D -> (8.0/255.0, 10.0/255.0, 13.0/255.0)

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        float t = u_time * 0.28;

        // Wave harmonics for generative light ribbons
        float v1 = sin(p.x * 2.2 + t * 1.1) + cos(p.y * 1.8 - t * 0.9);
        float v2 = sin(p.y * 3.1 + sin(p.x * 1.5 + t) * 1.6 + t * 0.6);
        float v3 = cos(length(p * 1.4) * 3.2 - t * 1.4);

        // Compute caustic / generative interference pattern
        float field = sin(v1 + v2 + v3 + p.x * 1.8);
        field = smoothstep(-0.35, 1.15, field);

        // Diagonal dynamic light sweep
        float ray = abs(sin(p.x * 1.2 + p.y * 0.8 + t * 0.5));
        ray = pow(ray, 7.0);

        // Combined per-pixel intensity
        float intensity = clamp(field * 0.45 + ray * 0.55, 0.0, 1.0);

        // Subtle vignette toward the edges to anchor into committed ground
        float dist = length(uv - vec2(0.5, 0.5));
        float vignette = smoothstep(0.95, 0.2, dist);
        intensity *= vignette;

        // Base ground #08090D
        vec3 ground = vec3(8.0 / 255.0, 9.0 / 255.0, 13.0 / 255.0);
        // Secondary tone #080A0D
        vec3 darkAccent = vec3(8.0 / 255.0, 10.0 / 255.0, 13.0 / 255.0);
        // Light accent #DBE0EB
        vec3 lightAccent = vec3(219.0 / 255.0, 224.0 / 255.0, 235.0 / 255.0);

        // Two-to-three tone blended material
        vec3 col = mix(ground, darkAccent, clamp(field, 0.0, 1.0));
        col = mix(col, lightAccent, intensity * 0.88);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");

    let animationFrameId: number;
    let startTime = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const render = (now: number) => {
      resize();
      const elapsed = (now - startTime) * 0.001;

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block z-0"
      style={{
        backgroundColor: "#08090D",
      }}
      aria-hidden="true"
    />
  );
};

// 2D canvas fallback in case WebGL is disabled or unsupported
function fallbackCanvas2D(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let animId: number;
  let t = 0;

  const render = () => {
    t += 0.02;
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = "#08090D";
    ctx.fillRect(0, 0, w, h);

    const grad = ctx.createLinearGradient(
      0,
      0,
      w * Math.cos(t * 0.3),
      h * Math.sin(t * 0.3)
    );
    grad.addColorStop(0, "#08090D");
    grad.addColorStop(0.5, "rgba(219, 224, 235, 0.12)");
    grad.addColorStop(1, "#080A0D");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    animId = requestAnimationFrame(render);
  };

  animId = requestAnimationFrame(render);
  return () => cancelAnimationFrame(animId);
}
