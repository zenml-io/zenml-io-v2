/**
 * vs-card.ts — draws a VS comparison card in Chromium so it matches `Template — VS Comparison`
 * (113:300) without Figma. Every position below was read from its 40 variants; ZenML and Kitaru
 * share the geometry and differ only in colour and logo width.
 */

import { join } from "node:path";
import type { Brand } from "./cover-renderer";
import { escapeHtml, fontFace, SKILL_DIR, svgUri } from "./html";

export interface VsSpec {
  brand: Brand;
  includeBrandTile: boolean;
  /** Service-logo file names, in tile order. */
  logos: string[];
  title: string;
  /** Text after "for "; empty for a one-line header. */
  qualifier: string;
  /** Last resort for a long headline: two lines at the smallest size, with no for-line. */
  wrapTitle?: boolean;
}

export interface VsFit {
  step: readonly [title: number, subtitle: number];
  titleWidth: number;
  subtitleWidth: number;
}

type TileSize = "sm" | "md" | "lg" | "xl";

const TILE: Record<TileSize, { w: number; h: number; logo: number; logoX: number; logoY: number; badge: number; badgeFont: number; badgeLine: number; vectorTop: number; vectorH: number; path: string }> = {
  sm: {
    w: 180, h: 193, logo: 100, logoX: 40, logoY: 47, badge: 56, badgeFont: 20, badgeLine: 26, vectorTop: -0.379, vectorH: 194,
    path: "M86.2705 1.84863C88.6294 0.716723 91.3706 0.716718 93.7295 1.84863L175.086 40.8916C177.475 42.0382 179 44.4653 179 47.1328V146.625C179 149.293 177.475 151.72 175.086 152.866L93.7295 191.909C91.3705 193.041 88.6295 193.041 86.2705 191.909L4.91406 152.866C2.52481 151.72 1 149.293 1 146.625V47.1328L1.00488 46.8828C1.09672 44.3143 2.59959 42.0023 4.91406 40.8916L86.2705 1.84863Z",
  },
  md: {
    w: 240, h: 257, logo: 140, logoX: 50, logoY: 59, badge: 56, badgeFont: 20, badgeLine: 26, vectorTop: -0.672, vectorH: 259,
    path: "M114.883 2.16504C118.119 0.611807 121.881 0.611807 125.117 2.16504L233.593 54.2217C236.894 55.8063 239 59.1597 239 62.8438V195.501C239 199.185 236.894 202.537 233.593 204.122L125.117 256.179C121.881 257.732 118.119 257.732 114.883 256.179L6.40723 204.122C3.10574 202.537 1.00017 199.185 1 195.501V62.8438C1 59.1597 3.10556 55.8063 6.40723 54.2217L114.883 2.16504Z",
  },
  lg: {
    w: 300, h: 322, logo: 180, logoX: 60, logoY: 71, badge: 90, badgeFont: 30, badgeLine: 42, vectorTop: -0.965, vectorH: 323,
    path: "M143.495 2.48047C147.609 0.506115 152.391 0.506115 156.505 2.48047L292.099 67.5518C296.313 69.5743 299 73.8538 299 78.5547V244.376C299 249.077 296.313 253.355 292.099 255.378L156.505 320.449C152.391 322.424 147.609 322.424 143.495 320.449L7.90137 255.378C3.68704 253.355 1.00012 249.077 1 244.376V78.5547C1 73.8538 3.68689 69.5743 7.90137 67.5518L143.495 2.48047Z",
  },
  xl: {
    w: 420, h: 450, logo: 260, logoX: 80, logoY: 95, badge: 90, badgeFont: 30, badgeLine: 42, vectorTop: -1.551, vectorH: 453,
    path: "M200.721 3.1123C206.59 0.295806 213.41 0.295795 219.279 3.1123L409.111 94.2119C415.151 97.1104 419 103.242 419 109.976V342.126C419 348.86 415.151 354.992 409.111 357.891L219.279 448.989C213.41 451.806 206.59 451.806 200.721 448.989L10.8887 357.891C4.8489 354.992 1.00001 348.86 1 342.126V109.976C1.00014 103.242 4.84914 97.1104 10.8887 94.2119L200.721 3.1123Z",
  },
};

interface Arrangement {
  size: TileSize;
  /** Tile left edges, row by row. */
  rows: number[][];
  ys: number[];
  /** Space on each side of a VS badge. */
  gap: number;
  brandAt?: [x: number, y: number];
}

const ROW5 = [648, 900, 1152, 1404, 1656];
const ROW4 = [734, 1018, 1302, 1586];
const SM_YS = [473.5, 690.5];
const MD_YS = [422, 703];

/** Keyed by competitor count, with and without the brand tile. */
const WITH_BRAND: Record<number, Arrangement> = {
  10: { size: "sm", rows: [ROW5, ROW5], ys: SM_YS, gap: 8, brandAt: [84, 422] },
  9: { size: "sm", rows: [ROW5, [774, 1026, 1278, 1530]], ys: SM_YS, gap: 8, brandAt: [84, 422] },
  8: { size: "sm", rows: [ROW4, ROW4], ys: SM_YS, gap: 24, brandAt: [154, 422] },
  7: { size: "sm", rows: [ROW4, [876, 1160, 1444]], ys: SM_YS, gap: 24, brandAt: [154, 422] },
  6: { size: "md", rows: [[786, 1130, 1474], [786, 1130, 1474]], ys: MD_YS, gap: 24, brandAt: [206, 434.5] },
  5: { size: "md", rows: [[806, 1150, 1494], [978, 1322]], ys: MD_YS, gap: 24, brandAt: [186, 434.5] },
  4: { size: "md", rows: [[978, 1322], [978, 1322]], ys: MD_YS, gap: 24, brandAt: [358, 434.5] },
  3: { size: "lg", rows: [[679, 1117, 1555]], ys: [517.5], gap: 24, brandAt: [65, 422] },
  2: { size: "lg", rows: [[898, 1336]], ys: [517.5], gap: 24, brandAt: [284, 422] },
  1: { size: "xl", rows: [[1057]], ys: [453.5], gap: 24, brandAt: [443, 422] },
};

const MD_ROW5 = [152, 496, 840, 1184, 1528];
const MD_ROW4 = [324, 668, 1012, 1356];
const WIDE_YS = [422, 723];

const WITHOUT_BRAND: Record<number, Arrangement> = {
  10: { size: "md", rows: [MD_ROW5, MD_ROW5], ys: WIDE_YS, gap: 24 },
  9: { size: "md", rows: [MD_ROW5, MD_ROW4], ys: WIDE_YS, gap: 24 },
  8: { size: "md", rows: [MD_ROW4, MD_ROW4], ys: WIDE_YS, gap: 24 },
  7: { size: "md", rows: [MD_ROW4, [496, 840, 1184]], ys: WIDE_YS, gap: 24 },
  6: { size: "lg", rows: [[265, 703, 1141], [479, 917, 1355]], ys: [382, 704], gap: 24 },
  5: { size: "lg", rows: [[372, 810, 1248], [591, 1029]], ys: [370, 692], gap: 24 },
  4: { size: "lg", rows: [[153, 591, 1029, 1467]], ys: [479], gap: 24 },
  3: { size: "lg", rows: [[372, 810, 1248]], ys: [510], gap: 24 },
  2: { size: "xl", rows: [[471, 1029]], ys: [430], gap: 24 },
  1: { size: "xl", rows: [[750]], ys: [450], gap: 24 },
};

const PALETTE: Record<Brand, { bg: string; polygon: string; head: string; line: string; title: string; subtitle: string; tile: string; tileLine: string; badge: string; badgeLine: string; badgeText: string; blur: number }> = {
  ZenML: { bg: "#EBF0D8", polygon: "#DBE0C2", head: "#F6F9F2", line: "#DBE0C2", title: "#151E19", subtitle: "#7A9268", tile: "#FAF8F4", tileLine: "#9AAC82", badge: "#F6F9F1", badgeLine: "#7A9268", badgeText: "#7A9268", blur: 0 },
  Kitaru: { bg: "#FBE8DA", polygon: "#F7B382", head: "#FAF6EF", line: "#F7B382", title: "#1C1E19", subtitle: "#B65915", tile: "#FCF7F3", tileLine: "#F7B382", badge: "#FCF7F3", badgeLine: "#B65915", badgeText: "#B65915", blur: 40 },
};

const LOGO_WIDTH: Record<Brand, number> = { ZenML: 315, Kitaru: 304 };
const HEAD_RIGHT = 1780;
const COPY_LEFT = 140;
/** Clear space between the longest line and the logo. */
const COPY_GAP = 40;

/** Title and for-line sizes, Figma's first. Both lines step down together so the hierarchy holds. */
export const VS_TYPE_STEPS = [[72, 60], [66, 55], [60, 50], [56, 46]] as const;

export const vsCopyLimit = (brand: Brand): number => HEAD_RIGHT - LOGO_WIDTH[brand] - COPY_LEFT - COPY_GAP;
export const vsLogoFile = (slug: string): string => join(SKILL_DIR, "assets/service-logos", `${slug}.svg`);

export const VS_FONTS = (): string =>
  fontFace("Borna", "borna-semibold.woff2", 600, 95.5, 26.3) + fontFace("Rethink Sans", "rethink-sans-variable.woff2", "300 800", 100, 26);

const LINE: Record<number, number> = { 72: 86, 66: 79, 60: 72, 56: 67, 55: 66, 50: 60, 46: 55 };

export function vsHtml(spec: VsSpec, [titleSize, subtitleSize]: readonly [number, number], fonts: string): string {
  const count = spec.logos.length;
  const a = (spec.includeBrandTile ? WITH_BRAND : WITHOUT_BRAND)[count];
  if (!a) throw new Error(`no VS arrangement for ${count} tiles`);
  const t = TILE[a.size];
  const c = PALETTE[spec.brand];
  const polygonTop = count === 1 ? -110 : -150;
  const polygonLeft = (count === 1 ? 310 : 320) + 87.08;

  const tiles: string[] = [];
  let next = 0;
  a.rows.forEach((row, r) => {
    row.forEach((x, i) => {
      const y = a.ys[r];
      const badgeY = y + (t.h - t.badge) / 2;
      const badgeX = spec.includeBrandTile ? x - t.badge - a.gap : i > 0 ? x - t.badge - a.gap : null;
      if (badgeX !== null) {
        tiles.push(`<div class="badge" style="left:${badgeX}px;top:${badgeY}px"><span>VS</span></div>`);
      }
      tiles.push(
        `<svg class="abs" style="left:${x}px;top:${y + t.vectorTop}px" width="${t.w}" height="${t.vectorH}" viewBox="0 0 ${t.w} ${t.vectorH}" fill="none"><path d="${t.path}" fill="${c.tile}" stroke="${c.tileLine}" stroke-width="2" stroke-linejoin="round"/></svg>`,
        `<img class="abs" alt="" src="${svgUri(vsLogoFile(spec.logos[next]))}" style="left:${x + t.logoX}px;top:${y + t.logoY}px;width:${t.logo}px;height:${t.logo}px">`,
      );
      next += 1;
    });
  });
  const brandTile = a.brandAt
    ? `<img class="abs" alt="" src="${svgUri(join(SKILL_DIR, "assets/vs", `${spec.brand.toLowerCase()}-tile.svg`))}" style="left:${a.brandAt[0]}px;top:${a.brandAt[1]}px;width:480px;height:513px">`
    : "";

  const logo = svgUri(join(SKILL_DIR, "assets/logos", `${spec.brand.toLowerCase()}-positive.svg`));
  const subtitle = spec.qualifier ? `<div class="subtitle"><span id="vs-subtitle">for <b>${escapeHtml(spec.qualifier)}</b></span></div>` : "";
  const css = `*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1920px;height:1080px;overflow:hidden;background:${c.bg}}
body{position:relative;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;font-kerning:normal}
.abs{position:absolute;display:block}
.head{position:absolute;left:80px;top:80px;width:1760px;height:250px;background:${c.head};border:3px solid ${c.line};border-radius:28px}
.copy{position:absolute;left:${COPY_LEFT}px;top:80px;height:250px;display:flex;flex-direction:column;justify-content:center;gap:4px;white-space:nowrap}
.title{font:500 ${titleSize}px/${LINE[titleSize]}px Borna;color:${c.title}${spec.wrapTitle ? `;width:${vsCopyLimit(spec.brand)}px;white-space:normal;text-wrap:balance` : ""}}
.subtitle{font:500 ${subtitleSize}px/${LINE[subtitleSize]}px Borna;color:${c.subtitle};position:relative;top:1px}
.subtitle b{font-weight:600}
.badge{position:absolute;width:${t.badge}px;height:${t.badge}px;border:1.5px solid ${c.badgeLine};border-radius:50%;background:${c.badge};display:flex;align-items:center;justify-content:center;font:500 ${t.badgeFont}px/${t.badgeLine}px 'Rethink Sans';color:${c.badgeText}}`;
  return `<!doctype html><meta charset="utf-8"><style>${fonts}${css}</style>
<svg class="abs" style="left:${polygonLeft}px;top:${polygonTop}px;overflow:visible${c.blur ? `;filter:blur(${c.blur}px)` : ""}" width="1125.83" height="1300" fill="none"><path opacity=".35" d="M562.916 0L1125.83 325V975L562.916 1300L0 975V325Z" fill="${c.polygon}"/></svg>
<div class="head"></div>
<div class="copy"><div class="title"><span id="vs-title">${escapeHtml(spec.title)}</span></div>${subtitle}</div>
<img class="abs" alt="" src="${logo}" style="left:${HEAD_RIGHT - LOGO_WIDTH[spec.brand]}px;top:171px;width:${LOGO_WIDTH[spec.brand]}px;height:68px">
${brandTile}${tiles.join("")}`;
}
