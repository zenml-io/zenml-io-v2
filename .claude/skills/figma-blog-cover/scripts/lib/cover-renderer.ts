/**
 * cover-renderer.ts — draws a Blog Cover in Chromium so it matches the Figma template without Figma.
 *
 * The overlay (panel, type, logo, pill) renders on a transparent page at 1920 x 1080, 2x, and is
 * composited over the background file with sharp. Every value below was read from the
 * `Blog Cover / 16:9` variants (162:1845); references/code-renderer.md has the traps and the test.
 */

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Browser, type Page } from "playwright";
import sharp from "sharp";

const SKILL_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const REPO = resolve(SKILL_DIR, "../../..");

export type Brand = "ZenML" | "Kitaru";
export type Logo = Brand | "ZenML Labs";
export type Layout = "Text" | "Panel Bottom" | "Image Right" | "Image Left" | "Full Bleed";

export interface CoverSpec {
  brand: Brand;
  layout: Layout;
  bg: string;
  logo: Logo;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface Measured {
  titleLines: string[];
  subtitleLines: string[];
  /** Space between the copy and the nearest thing above and below it. */
  gapAbove: number;
  gapBelow: number;
  orphan: boolean;
  /** A word wider than its text box. */
  overflow: boolean;
  wrap: "wrap" | "balance";
}

interface Geometry {
  box: [left: number, top: number, width: number, height: number];
  padX: number;
  padY: number;
  copyGap: number;
  titleSize: 80 | 100;
  subtitleSize: 44 | 56;
  /** The pill sits in the flow, or on the photo at this inset. */
  pillInset?: number;
  panel: boolean;
}

const COLUMN = { padX: 80, padY: 80, copyGap: 24, titleSize: 80, subtitleSize: 44, panel: true } as const;
const GEOMETRY: Record<Layout, Geometry> = {
  Text: { box: [0, 0, 1920, 1080], padX: 120, padY: 110, copyGap: 24, titleSize: 100, subtitleSize: 56, panel: false },
  "Full Bleed": { box: [0, 0, 1920, 1080], padX: 120, padY: 120, copyGap: 16, titleSize: 100, subtitleSize: 56, panel: false },
  "Panel Bottom": { ...COLUMN, box: [0, 540, 1920, 540], pillInset: 80 },
  "Image Right": { ...COLUMN, box: [0, 0, 960, 1080] },
  "Image Left": { ...COLUMN, box: [960, 0, 960, 1080] },
};

// Figma sets the copy block 1 px lower than CSS on every layout.
const COPY_NUDGE = 1;
const LINE_HEIGHT: Record<number, number> = { 100: 112, 80: 90, 56: 63, 44: 49 };
// Distance from a text box's top to its first baseline. Pinned because Chromium rounds it differently
// across platforms even with the font metrics overridden.
const BASELINE: Record<number, number> = { 100: 90, 80: 72, 56: 50, 44: 39, 32: 30 };

interface Palette {
  title: string;
  subtitle: string;
  site: string;
  panel: string;
  pillFill: string;
  pillStroke: string;
  pillText: string;
}

function palette(brand: Brand, layout: Layout): Palette {
  if (layout === "Full Bleed") {
    return brand === "ZenML"
      ? { title: "#F6F9F2", subtitle: "#DBE0C2", site: "#DBE0C2", panel: "none", pillFill: "#E3E7CC", pillStroke: "#BECAA6", pillText: "#63775E" }
      : { title: "#FCF7F3", subtitle: "#FBD3B9", site: "#FBD3B9", panel: "none", pillFill: "#F7B382", pillStroke: "#F7B382", pillText: "#FCF7F3" };
  }
  if (brand === "ZenML") {
    return {
      title: "#151E19",
      subtitle: layout === "Image Left" ? "#799268" : "#63775E",
      site: "#63775E",
      panel: "#E3E7CC",
      pillFill: "#E3E7CC",
      pillStroke: "#799268",
      pillText: "#63775E",
    };
  }
  const onPhoto = layout === "Panel Bottom";
  return {
    title: "#1C1E19",
    subtitle: "#834314",
    site: "#645D53",
    panel: "#FAF6EF",
    pillFill: onPhoto ? "#EA7118" : "#EEE8DC",
    pillStroke: "#B65915",
    pillText: onPhoto ? "#FCF7F3" : "#834314",
  };
}

const LOGO_FILE: Record<Logo, string> = { ZenML: "zenml", Kitaru: "kitaru", "ZenML Labs": "labs" };
const LOGO_WIDTH: Record<Logo, number> = { ZenML: 315, Kitaru: 304, "ZenML Labs": 425 };

export function backgroundFile(brand: Brand, bg: string): string {
  const photo = /^Photo (0[1-9])$/.exec(bg);
  const name = photo ? `photo-${photo[1]}` : `${brand.toLowerCase()}-${bg.toLowerCase()}`;
  return join(SKILL_DIR, "assets/backgrounds", `${name}.webp`);
}

const base64 = (path: string): string => readFileSync(path).toString("base64");
const escapeHtml = (s: string): string => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function fontFace(family: string, file: string, weight: number, ascent: number, descent: number): string {
  const src = `data:font/woff;base64,${base64(join(REPO, "public/fonts", file))}`;
  return `@font-face{font-family:'${family}';font-weight:${weight};ascent-override:${ascent}%;descent-override:${descent}%;line-gap-override:0%;src:url(${src}) format('woff')}`;
}

const FONTS = () =>
  fontFace("Borna", "borna-medium.woff", 500, 95.5, 26.3) +
  fontFace("Nudica Mono", "nudica-mono-regular.woff", 400, 96.3, 25.7) +
  fontFace("Nudica Mono", "nudica-mono-medium.woff", 500, 96.6, 26);

function pageHtml(spec: CoverSpec, fonts: string, wrap: Measured["wrap"]): string {
  const g = GEOMETRY[spec.layout];
  const c = palette(spec.brand, spec.layout);
  const [left, top, width, height] = g.box;
  const tone = spec.layout === "Full Bleed" ? "negative" : "positive";
  const logo = `data:image/svg+xml;base64,${base64(join(SKILL_DIR, "assets/logos", `${LOGO_FILE[spec.logo]}-${tone}.svg`))}`;
  const css = `*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1920px;height:1080px;background:transparent;overflow:hidden}
body{position:relative;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;font-kerning:normal}
.box{position:absolute;left:${left}px;top:${top}px;width:${width}px;height:${height}px;padding:${g.padY}px ${g.padX}px;display:flex;flex-direction:column;justify-content:space-between;background:${g.panel ? c.panel : "transparent"}}
.copy{display:flex;flex-direction:column;gap:${g.copyGap}px;position:relative;top:${COPY_NUDGE}px}
.title{font:500 ${g.titleSize}px/${LINE_HEIGHT[g.titleSize]}px Borna;letter-spacing:-.02em;color:${c.title};text-wrap:${wrap}}
.subtitle{font:500 ${g.subtitleSize}px/${LINE_HEIGHT[g.subtitleSize]}px Borna;letter-spacing:-.02em;color:${c.subtitle};text-wrap:${wrap}}
.footer{display:flex;justify-content:space-between;align-items:center;height:68px}
.logo{height:68px;width:${LOGO_WIDTH[spec.logo]}px;display:block}
.site{width:173px;font:400 32px/38px 'Nudica Mono';letter-spacing:.06em;color:${c.site}}
.pill{align-self:flex-start;height:78px;padding:19px 39px;border:1px solid ${c.pillStroke};border-radius:100px;background:${c.pillFill};font:500 32px/38px 'Nudica Mono';letter-spacing:.06em;color:${c.pillText};white-space:nowrap}
.pill.float{position:absolute;left:${g.pillInset}px;top:${g.pillInset}px}
.pill span{display:inline-block}`;
  const pill = `<div class="pill${g.pillInset ? " float" : ""}"><span id="eyebrow">${escapeHtml(spec.eyebrow)}</span></div>`;
  const copy = `<div class="copy"><div class="title">${escapeHtml(spec.title)}</div>${spec.subtitle ? `<div class="subtitle">${escapeHtml(spec.subtitle)}</div>` : ""}</div>`;
  const footer = `<div class="footer"><img class="logo" src="${logo}" alt=""><div class="site">ZENML.IO</div></div>`;
  return `<!doctype html><meta charset="utf-8"><style>${fonts}${css}</style>${g.pillInset ? pill : ""}<div class="box">${g.pillInset ? "" : pill}${copy}${footer}</div>`;
}

/** Runs in the page: fixes the pill width, pins baselines, reads the real lines. */
function settle(baseline: Record<number, number>): Omit<Measured, "wrap"> {
  // Figma keeps frames on whole pixels; CSS centring leaves a half pixel when the copy height is odd.
  const block = document.querySelector(".copy") as HTMLElement;
  block.style.top = `${Number.parseFloat(getComputedStyle(block).top) - (block.getBoundingClientRect().top % 1)}px`;
  const eyebrow = document.getElementById("eyebrow") as HTMLElement;
  // Figma drops the last letter's tracking, then rounds the text width up.
  eyebrow.style.width = `${Math.ceil(eyebrow.getBoundingClientRect().width - 1.92)}px`;
  for (const sel of [".title", ".subtitle", ".site", "#eyebrow"]) {
    const el = document.querySelector<HTMLElement>(sel);
    if (!el) continue;
    const probe = document.createElement("span");
    probe.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline";
    el.prepend(probe);
    const actual = probe.getBoundingClientRect().bottom - el.getBoundingClientRect().top;
    probe.remove();
    const want = baseline[Number.parseFloat(getComputedStyle(el).fontSize)];
    if (actual !== want) el.style.transform = `translateY(${want - actual}px)`;
  }
  const lines = (el: Element | null): string[] => {
    const node = el?.firstChild;
    if (!node || node.nodeType !== Node.TEXT_NODE) return [];
    const text = node.textContent ?? "";
    const out: { y: number; text: string }[] = [];
    for (const m of text.matchAll(/\S+/g)) {
      const range = document.createRange();
      range.setStart(node, m.index);
      range.setEnd(node, m.index + m[0].length);
      const y = range.getBoundingClientRect().top;
      const last = out[out.length - 1];
      if (last && Math.abs(last.y - y) < 5) last.text += ` ${m[0]}`;
      else out.push({ y, text: m[0] });
    }
    return out.map((l) => l.text);
  };
  const titleLines = lines(document.querySelector(".title"));
  const overflow = [".title", ".subtitle"].some((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    const range = document.createRange();
    range.selectNodeContents(el);
    return range.getBoundingClientRect().right > el.getBoundingClientRect().right + 0.5;
  });
  const copy = (document.querySelector(".copy") as HTMLElement).getBoundingClientRect();
  const footer = (document.querySelector(".footer") as HTMLElement).getBoundingClientRect();
  const pill = (document.querySelector(".pill") as HTMLElement).getBoundingClientRect();
  const box = (document.querySelector(".box") as HTMLElement).getBoundingClientRect();
  const above = pill.bottom > box.top ? pill.bottom : box.top;
  return {
    titleLines,
    subtitleLines: lines(document.querySelector(".subtitle")),
    gapAbove: Math.round(copy.top - above),
    gapBelow: Math.round(footer.top - copy.bottom),
    orphan: titleLines.length > 1 && !/\s/.test(titleLines[titleLines.length - 1]),
    overflow,
  };
}

export const LINE_LIMITS: Record<Layout, { title: number; subtitle: number }> = {
  "Panel Bottom": { title: 2, subtitle: 1 },
  Text: { title: 3, subtitle: 2 },
  "Full Bleed": { title: 3, subtitle: 2 },
  "Image Left": { title: 3, subtitle: 3 },
  "Image Right": { title: 3, subtitle: 3 },
};
const MIN_GAP = 40;

/** Why a cover breaks the copy rules in design-rules.md; empty when it holds. */
export function copyProblems(layout: Layout, m: Measured): string[] {
  const limit = LINE_LIMITS[layout];
  const problems: string[] = [];
  if (m.titleLines.length > limit.title) problems.push(`title runs ${m.titleLines.length} lines, the limit is ${limit.title}`);
  if (m.subtitleLines.length > limit.subtitle) problems.push(`subtitle runs ${m.subtitleLines.length} lines, the limit is ${limit.subtitle}`);
  if (m.orphan) problems.push(`"${m.titleLines[m.titleLines.length - 1]}" sits alone on the last line`);
  if (m.overflow) problems.push("a word runs past the edge of its text box");
  if (Math.min(m.gapAbove, m.gapBelow) < MIN_GAP) problems.push("the copy crowds the logo or the eyebrow");
  return problems;
}

export class CoverRenderer {
  private constructor(
    private browser: Browser,
    private page: Page,
    private fonts: string,
  ) {}

  static async open(): Promise<CoverRenderer> {
    const browser = await chromium.launch({ args: ["--font-render-hinting=none"] });
    const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
    return new CoverRenderer(browser, await context.newPage(), FONTS());
  }

  private async lay(spec: CoverSpec, wrap: Measured["wrap"]): Promise<Measured> {
    await this.page.setContent(pageHtml(spec, this.fonts, wrap));
    await this.page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((i) => i.decode()));
    });
    // tsx wraps named functions in a __name() helper that does not exist in the page.
    await this.page.evaluate("globalThis.__name = (f) => f");
    return { ...(await this.page.evaluate(settle, BASELINE)), wrap };
  }

  /** Figma wraps greedily, so that comes first; balance only rescues a one-word last line. */
  async measure(spec: CoverSpec): Promise<Measured> {
    const plain = await this.lay(spec, "wrap");
    if (!plain.orphan) return plain;
    const balanced = await this.lay(spec, "balance");
    return balanced.orphan ? plain : balanced;
  }

  /** Panel, type and logo on transparency. `wrap` skips the orphan rescue, for matching a Figma original. */
  async overlay(spec: CoverSpec, wrap?: Measured["wrap"]): Promise<Buffer> {
    await this.lay(spec, wrap ?? (await this.measure(spec)).wrap);
    return this.page.screenshot({ omitBackground: true, type: "png" });
  }

  /** The finished 3840 x 2160 PNG. */
  async render(spec: CoverSpec): Promise<Buffer> {
    const overlay = await this.overlay(spec);
    return sharp(backgroundFile(spec.brand, spec.bg)).removeAlpha().composite([{ input: overlay }]).png().toBuffer();
  }

  close(): Promise<void> {
    return this.browser.close();
  }
}
