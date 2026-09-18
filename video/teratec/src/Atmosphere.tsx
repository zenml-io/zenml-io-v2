import React, { useLayoutEffect, useRef } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";


const VERTEX_SHADER = `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uStrength;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
    // Broad analytic light shapes: no layered noise or small-scale cloud detail.
    // One orbit takes 48 seconds; travel is intentionally small.
    float phase = uTime * 6.28318530718 / 48.0;
    vec2 orbit = vec2(cos(phase), sin(phase));
    vec2 center = vec2(-0.48, 0.12) + orbit * vec2(0.16, 0.10);
    vec2 distance = (p - center) * vec2(0.85, 1.15);
    float light = exp(-2.1 * dot(distance, distance));
    vec2 secondary = p - vec2(0.65, -0.3) - orbit.yx * 0.08;
    float bounce = exp(-2.4 * dot(secondary, secondary));
    vec3 ink = vec3(0.08235, 0.11765, 0.09804);
    vec3 deepSage = vec3(0.23529, 0.29804, 0.21961);
    vec3 color = mix(ink, deepSage, (light * 0.27 + bounce * 0.05) * uStrength);

    // One-code-value dither at native pixel size prevents contour bands before
    // quantization. PNG frame capture preserves it without JPEG macroblocks.
    color += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
    gl_FragColor = vec4(color, 1.0);
  }
`;

type AtmosphereProps = {
  frame?: number;
  strength?: number;
};

export const Atmosphere = ({ frame, strength = 1 }: AtmosphereProps) => {
  const remotionFrame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const bufferRef = useRef<WebGLBuffer | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<{
    resolution: WebGLUniformLocation | null;
    time: WebGLUniformLocation | null;
    strength: WebGLUniformLocation | null;
  } | null>(null);

  // An explicit zero is the loop endpoint so frame-0 stills stitch to the last frame.
  const resolvedFrame = frame ?? remotionFrame;
  const resolvedStrength = Math.max(0, Math.min(1.5, strength));

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: true,
    });
    if (!gl) {
      throw new Error("WebGL unavailable: render with the configured ANGLE backend");
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Unable to create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader) ?? "Shader compilation failed";
        gl.deleteShader(shader);
        throw new Error(log);
      }
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!program) throw new Error("Unable to create WebGL program");
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(
        gl.getProgramInfoLog(program) ?? "Program linking failed",
      );
    }

    const buffer = gl.createBuffer();
    if (!buffer) throw new Error("Unable to create WebGL buffer");
    bufferRef.current = buffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    glRef.current = gl;
    programRef.current = program;
    uniformsRef.current = {
      resolution: gl.getUniformLocation(program, "uResolution"),
      time: gl.getUniformLocation(program, "uTime"),
      strength: gl.getUniformLocation(program, "uStrength"),
    };

    return () => {
      if (bufferRef.current) gl.deleteBuffer(bufferRef.current);
      bufferRef.current = null;
      if (programRef.current) gl.deleteProgram(programRef.current);
      glRef.current = null;
      programRef.current = null;
      uniformsRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const gl = glRef.current;
    const program = programRef.current;
    const uniforms = uniformsRef.current;
    if (!gl || !program || !uniforms) return;
    gl.useProgram(program);
    gl.viewport(0, 0, width, height);
    gl.uniform2f(uniforms.resolution, width, height);
    gl.uniform1f(uniforms.time, (resolvedFrame / fps) % 48);
    gl.uniform1f(uniforms.strength, resolvedStrength);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }, [resolvedFrame, resolvedStrength, width, height, fps]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#151E19" }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 1,
        }}
      />
    </AbsoluteFill>
  );
};
