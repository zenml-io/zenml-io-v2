// GrainGradient palette config for Kitaru landing surfaces.
//
// Ported from `SIGNUP_SHOWCASE` in the design-prototype monorepo:
// apps/design-prototype/src/ui/backdrop-palettes.ts — that file is the
// source of truth for these values; keep this in sync if it changes.
//
// Hex only — `@paper-design/shaders-react` rejects oklch / named colors
// at the GL layer.

export type GrainTheme = "light" | "dark";

export type KitaruGrainConfig = {
  shaderColors: [string, string, string, string];
  panel: string;
  blobA: string;
  blobB: string;
  speed: number;
  scale: number;
  rotation: number;
  noise: number;
  blend: boolean;
};

const light: KitaruGrainConfig = {
  shaderColors: ["#F0CDB4", "#F3D8BA", "#F3D7B9", "#F4DABD"],
  panel: "#FAF8F4",
  blobA: "#FCE9D6E6",
  blobB: "#F1C9A0CC",
  speed: 1.65,
  scale: 1.25,
  rotation: 30,
  noise: 0.55,
  blend: false,
};

// Diverges from SIGNUP_SHOWCASE by request: the CTA band wants a darker,
// near-monochrome grain — deep warm umbers instead of the signup screens'
// bright ember pops.
const dark: KitaruGrainConfig = {
  shaderColors: ["#0A0703", "#332415", "#1E140C", "#0A0703"],
  panel: "#211D18",
  blobA: "#26221CE6",
  blobB: "#3A2C1FCC",
  speed: 2,
  scale: 1.75,
  rotation: -24,
  noise: 1,
  blend: true,
};

export const KITARU_GRAIN = {
  hero: light,
  dark,
  card: light,
} satisfies Record<string, KitaruGrainConfig>;

export type KitaruGrainVariant = keyof typeof KITARU_GRAIN;
