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

// The blog's Kitaru bands (a Kitaru post's masthead, the Kitaru category and
// tag hubs) run the light wash slower and quieter than the product landing:
// text sits directly on it and the band is short, so the motion should read
// as atmosphere, not as the hero moment. Same palette family, lower speed and
// noise, softer blob alphas, and the orange-300 pop swapped for orange-100.
const blog: KitaruGrainConfig = {
  ...light,
  shaderColors: ["#FAD3B8", "#FBE8DB", "#FAD3B8", "#FCF7F2"],
  blobA: "#FBE8DBB3",
  blobB: "#FAD3B899",
  speed: 0.7,
  scale: 1.4,
  noise: 0.35,
};

export const KITARU_GRAIN = {
  hero: light,
  dark,
  card: light,
  blog,
} satisfies Record<string, KitaruGrainConfig>;

export type KitaruGrainVariant = keyof typeof KITARU_GRAIN;
