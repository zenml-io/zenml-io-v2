/**
 * GrainConfig — palette + motion settings for the GrainGradient shader
 * backdrop (`src/components/islands/GrainBackdrop.tsx`). Hex colours only:
 * Paper's shaders-react rejects oklch/named colours at the GL layer.
 */
export type GrainTheme = "light" | "dark";

export type GrainConfig = {
  shaderColors: [string, string, string, string];
  /** Solid panel colour behind the blobs — also the SSR/no-WebGL fallback. */
  panel: string;
  blobA: string;
  blobB: string;
  speed: number;
  scale: number;
  rotation: number;
  noise: number;
  /** mix-blend-darken the shader over the panel (off where text sits above). */
  blend: boolean;
};
