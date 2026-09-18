import type { GrainConfig } from "./grainConfig";

/**
 * Labs homepage shader palettes — the sage register of the rebrand scope
 * (`[data-app="labs"]`). Colours are the static stand-ins the design used
 * (cream panel with sage blobs; sage-900 panel for the closing band).
 */
const hero: GrainConfig = {
  shaderColors: ["#DBE0C2", "#C9D3B4", "#BECAA6", "#E3E8CD"],
  panel: "#F4F3EC",
  blobA: "#C9D3B4E6",
  blobB: "#9AAD82B3",
  speed: 1.4,
  scale: 1.35,
  rotation: 24,
  noise: 0.5,
  blend: false,
};

const dark: GrainConfig = {
  shaderColors: ["#151E19", "#3C4C38", "#63775E", "#151E19"],
  panel: "#151E19",
  blobA: "#3C4C38E6",
  blobB: "#63775ECC",
  speed: 1.8,
  scale: 1.6,
  rotation: -20,
  noise: 0.9,
  blend: true,
};

export const LABS_GRAIN = { hero, dark } satisfies Record<string, GrainConfig>;
export type LabsGrainVariant = keyof typeof LABS_GRAIN;
