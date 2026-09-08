/**
 * Feature-grid icons — four isometric marks drawn as inline SVG markup on a
 * 114×114 viewBox, fill/stroke `currentColor`. Rendered with `set:html`
 * inside an `<svg viewBox="0 0 114 114" fill="currentColor">` element.
 *
 * Geometry helpers build isometric cubes/slabs from a top-left origin so the
 * four marks share one construction and read as a family.
 */
import type { FeaturePanel } from "../../lib/labs-home";

/** Isometric cube: `x,y` is the top vertex; `s` the edge length. */
function cube(x: number, y: number, s: number): string {
  const dx = s * 0.866; // cos 30°
  const dy = s * 0.5; // sin 30°
  const top = `M${x} ${y} l${dx} ${dy} l-${dx} ${dy} l-${dx} -${dy} z`;
  const left = `M${x - dx} ${y + dy} l${dx} ${dy} v${s} l-${dx} -${dy} z`;
  const right = `M${x + dx} ${y + dy} l-${dx} ${dy} v${s} l${dx} -${dy} z`;
  return (
    `<path d="${top}" opacity="1"/>` +
    `<path d="${left}" opacity="0.72"/>` +
    `<path d="${right}" opacity="0.88"/>`
  );
}

/** Thin isometric slab (a cube with a short vertical edge). */
function slab(x: number, y: number, w: number, h: number): string {
  const dx = w * 0.866;
  const dy = w * 0.5;
  const top = `M${x} ${y} l${dx} ${dy} l-${dx} ${dy} l-${dx} -${dy} z`;
  const left = `M${x - dx} ${y + dy} l${dx} ${dy} v${h} l-${dx} -${dy} z`;
  const right = `M${x + dx} ${y + dy} l-${dx} ${dy} v${h} l${dx} -${dy} z`;
  return `<path d="${top}"/><path d="${left}" opacity="0.72"/><path d="${right}" opacity="0.88"/>`;
}

const pipeline =
  // three cubes on an L-shaped path, joined by connector bars
  cube(28, 18, 16) +
  cube(86, 18, 16) +
  cube(86, 66, 16) +
  `<path d="M42 30 h30 v6 h-30 z" opacity="0.6"/>` +
  `<path d="M86 50 v10 h6 v-10 z" opacity="0.6"/>` +
  `<path d="M28 44 v36 l14 8 v-6 l-8 -4 v-34 z" opacity="0.6"/>`;

const layers = [0, 1, 2, 3, 4, 5]
  .map((i) => slab(57, 18 + i * 13, 30, 5))
  .join("");

const openBox =
  // open isometric box (three visible inner walls) with a small cube floating above
  cube(57, 4, 10) +
  `<path d="M57 52 l30 17 v22 l-30 17 l-30 -17 v-22 z" opacity="0.35"/>` +
  `<path d="M27 69 l30 17 v22 l-30 -17 z" opacity="0.72"/>` +
  `<path d="M87 69 l-30 17 v22 l30 -17 z" opacity="0.88"/>` +
  `<path d="M27 69 l-10 -10 l30 -15 l10 8 z" opacity="0.9"/>` +
  `<path d="M87 69 l10 -10 l-30 -15 l-10 8 z" opacity="0.9"/>`;

const shield =
  `<path d="M57 8 L96 22 v30 c0 26 -17 44 -39 54 C35 96 18 78 18 52 V22 Z"/>` +
  `<path d="M40 56 l12 12 l24 -26" fill="none" stroke="var(--color-sage-200)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`;

export const FEATURE_ICONS: Record<FeaturePanel["icon"], string> = {
  pipeline,
  layers,
  "open-box": openBox,
  shield,
};
