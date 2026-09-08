// GrainGradient palette config for the Kitaru landing surfaces.
//
// Values follow the 2026 rebrand orange ramp (`[data-app="labs"]` in
// src/styles/global.css): the light wash is orange-50/100/200 with an
// orange-300 pop on the cream ground, the dark band is cream-900 with
// orange-900/800 umbers. Keep these in step with the ramp if it changes.
//
// Hex only — `@paper-design/shaders-react` rejects oklch / named colors
// at the GL layer.

import type { GrainConfig, GrainTheme } from "./grainConfig";

export type { GrainTheme };

export type KitaruGrainConfig = GrainConfig;

const light: KitaruGrainConfig = {
  shaderColors: ["#FAD3B8", "#FBE8DB", "#F7B382", "#FCF7F2"],
  panel: "#FAF8F4",
  blobA: "#FBE8DBE6",
  blobB: "#FAD3B8CC",
  speed: 1.65,
  scale: 1.25,
  rotation: 30,
  noise: 0.55,
  blend: false,
};

// The CTA band wants a darker, near-monochrome grain — warm umbers from the
// orange ramp's deep end instead of the light wash's bright pops.
const dark: KitaruGrainConfig = {
  shaderColors: ["#1C1E1A", "#361E0D", "#5A2F11", "#1C1E1A"],
  panel: "#1C1E1A",
  blobA: "#361E0DE6",
  blobB: "#5A2F11CC",
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
