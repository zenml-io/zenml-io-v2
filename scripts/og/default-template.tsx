/**
 * The default Open Graph card: the brand's "panel bottom" cover. A piece of
 * brand artwork fills the top half, a flat panel carries the copy across the
 * bottom half, and an eyebrow chip names the section. Every route that is
 * not a VS comparison uses it — both research databases, the hubs and index
 * pages, the standalone pages.
 *
 * Three brands share the layout and differ in palette and logo:
 *   labs    the ZenML Labs lockup on the sage palette (site-wide default)
 *   zenml   the ZenML logo on the sage palette (product, MLOps content)
 *   kitaru  the Kitaru logo on the orange/sand palette
 *
 * The artwork is one of nine shared photos or a per-brand mesh, pre-cropped
 * to the visible top half (`public/images/og/bg-*.jpg`) and picked by a
 * stable hash of the card's key, so a slug always gets the same art and the
 * set as a whole varies.
 *
 * Composition (authored at 1920×1080):
 *   artwork     (0, 0) 1920×540
 *   eyebrow     chip at (80, 80): Nudica Mono 500, 32 px, tracking 0.06em
 *   panel       (0, 540) 1920×540, padding 80
 *   copy        (80, 620), 1760 wide, 276 tall at most
 *   title       Borna 500, 80 → 68 → 56 px, line-height 1.12, tracking -0.02em
 *   subtitle    Borna 500, 44 px, two lines at most
 *   footer      (80, 920), 80 tall: logo left, "ZENML.IO" right
 */

import { readFileSync } from "node:fs";
import type { ReactElement } from "react";
import satori from "satori";
import type { OgBrand, OgLayout } from "../../src/lib/ogCards.js";
import { type Font, OG_HEIGHT, OG_WIDTH } from "./pipeline.js";

// ---------------------------------------------------------------------------
// Geometry and type scale
// ---------------------------------------------------------------------------

const PANEL = { top: 540, padding: 80 } as const;
const FOOTER_HEIGHT = 80;
const COPY_FOOTER_GAP = 24;

/** Copy frame: where the title and subtitle sit and how much room they get. */
export const TEXT_FRAME = {
  x: PANEL.padding,
  y: PANEL.top + PANEL.padding,
  width: OG_WIDTH - 2 * PANEL.padding,
  /** A card whose laid-out copy exceeds this is a failed card. */
  maxHeight:
    OG_HEIGHT -
    PANEL.top -
    2 * PANEL.padding -
    FOOTER_HEIGHT -
    COPY_FOOTER_GAP,
} as const;

const FOOTER = {
  x: PANEL.padding,
  y: OG_HEIGHT - PANEL.padding - FOOTER_HEIGHT,
  width: TEXT_FRAME.width,
  height: FOOTER_HEIGHT,
} as const;

const EYEBROW = { x: 80, y: 80 } as const;

/** Hero layout: full-bleed artwork, larger authored title lines, copy
 *  starting on the card's midline and an airier subtitle. */
const HERO_TITLE_SIZE = 96;
const HERO = { logoY: 120, copyY: OG_HEIGHT / 2, subtitleLineHeight: 1.4 } as const;

/** Title steps, largest first. The fitter takes the first one that fits. */
export const TITLE_SIZES = [80, 68, 56] as const;
const LINE_HEIGHT = 1.12;
const TRACKING = "-0.02em";
const SUBTITLE_SIZE = 44;
const MAX_SUBTITLE_LINES = 2;
const TITLE_SUBTITLE_GAP = 24;

const MONO_SIZE = 32;
const MONO_TRACKING = "0.06em";
const SITE_LABEL = "ZENML.IO";

const titleStyle = (fontSize: number) =>
  ({
    fontFamily: "Borna",
    fontWeight: 500,
    fontSize,
    lineHeight: LINE_HEIGHT,
    letterSpacing: TRACKING,
  }) as const;

const subtitleStyle = titleStyle(SUBTITLE_SIZE);

const titleBlock = (lines: number, size: number) => lines * size * LINE_HEIGHT;
const subtitleBlock = (lines: number) =>
  lines === 0 ? 0 : TITLE_SUBTITLE_GAP + lines * SUBTITLE_SIZE * LINE_HEIGHT;

// The budget is 276px: two 80px title lines (179.2) + gap (24) + one 44px
// line (49.3) = 252.5; two 68px lines (152.3) + two subtitle lines (122.6)
// = 274.9; three 56px lines (188.2) + one subtitle line = 261.5. All fit.

// ---------------------------------------------------------------------------
// Brands: palette and logo
// ---------------------------------------------------------------------------

// Satori needs resolved colours rather than CSS custom properties. The first
// definition of each token is the site scope's ramp, which is the one the
// brand covers use; the Kitaru product's own orange ramp later in the file
// belongs to its in-page components, not to the cards.
const tokens = readFileSync(
  new URL("../../src/styles/global.css", import.meta.url),
  "utf8",
);
function token(name: string): string {
  const value = tokens.match(
    new RegExp(`--color-${name}:\\s*(#[\\da-fA-F]+);`),
  )?.[1];
  if (!value) throw new Error(`Missing OG colour token: ${name}`);
  return value;
}

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  svg: "image/svg+xml",
};
function artwork(filename: string): string {
  const extension = filename.split(".").pop() ?? "";
  const mime = MIME[extension];
  if (!mime) throw new Error(`Unsupported OG artwork type: ${filename}`);
  const bytes = readFileSync(
    new URL(`../../public/images/og/${filename}`, import.meta.url),
  );
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

interface Palette {
  panel: string;
  title: string;
  subtitle: string;
  /** The site label and, on the sage brands, the eyebrow text. */
  muted: string;
  chipFill: string;
  chipBorder: string;
  chipText: string;
}

const sage: Palette = {
  panel: token("sage-200"),
  title: token("sage-900"),
  subtitle: token("sage-700"),
  muted: token("sage-700"),
  chipFill: token("sage-200"),
  chipBorder: token("sage-600"),
  chipText: token("sage-700"),
};

// The Kitaru cover sits on the design's sand ramp, which global.css only
// carries in part (sand-100/200); the three missing stops are inlined.
const kitaru: Palette = {
  panel: "#FAF6EF",
  title: "#1C1E19",
  subtitle: token("orange-700"),
  muted: "#645D53",
  chipFill: token("orange-500"),
  chipBorder: token("orange-600"),
  chipText: token("orange-50"),
};

interface Logo {
  file: string;
  /** Native SVG size, used to keep the aspect at the rendered height. */
  width: number;
  height: number;
  /** Rendered height inside the 80px footer. */
  rendered: number;
}

/** Logos per brand; the Labs lockup renders taller than the product marks. */
export const LOGOS: Record<OgBrand, Logo> = {
  labs: { file: "labs-lockup.svg", width: 766, height: 123, rendered: 80 },
  zenml: { file: "zenml-lockup.svg", width: 315, height: 68, rendered: 68 },
  kitaru: { file: "kitaru-lockup.svg", width: 304, height: 68, rendered: 68 },
};

const BRANDS: Record<OgBrand, { palette: Palette; mesh: string; hero: string }> = {
  labs: { palette: sage, mesh: "bg-mesh-zenml.jpg", hero: "bg-hero-zenml.jpg" },
  zenml: { palette: sage, mesh: "bg-mesh-zenml.jpg", hero: "bg-hero-zenml.jpg" },
  kitaru: { palette: kitaru, mesh: "bg-mesh-kitaru.jpg", hero: "bg-hero-zenml.jpg" },
};

/** Card background colour: the panel, which is what shows through. */
export function defaultOgBackground(brand: OgBrand): string {
  return BRANDS[brand].palette.panel;
}

// ---------------------------------------------------------------------------
// Artwork selection
// ---------------------------------------------------------------------------

/** The shared photo set plus the brand mesh, one slot each. */
const PHOTO_COUNT = 9;
export type DefaultOgBackground =
  | `photo-0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | "mesh";

/** FNV-1a over the seed, so a slug always lands on the same artwork. */
function hash(seed: string): number {
  let value = 0x811c9dc5;
  for (const char of seed) {
    value ^= char.codePointAt(0) ?? 0;
    value = Math.imul(value, 0x01000193) >>> 0;
  }
  return value;
}

/** Pick a card's artwork from its key: one of nine photos or, one time in
 *  ten, the brand mesh. */
export function pickDefaultOgBackground(seed: string): DefaultOgBackground {
  const slot = hash(seed) % (PHOTO_COUNT + 1);
  return slot === PHOTO_COUNT
    ? "mesh"
    : (`photo-0${slot + 1}` as DefaultOgBackground);
}

function backgroundArtwork(
  brand: OgBrand,
  background: DefaultOgBackground,
): string {
  return artwork(
    background === "mesh" ? BRANDS[brand].mesh : `bg-${background}.jpg`,
  );
}

// ---------------------------------------------------------------------------
// Fitting
// ---------------------------------------------------------------------------

export interface DefaultOgFit {
  /** Title as rendered — ellipsized when it could not be made to fit. */
  title: string;
  titleSize: number;
  /** Subtitle as rendered, one entry per line. */
  subtitle: string[];
  /** Laid-out height of the copy frame, in authored px. */
  height: number;
}

interface Measured {
  lines: number;
  /** A word wider than the frame — wrapping cannot save it. */
  overflow: boolean;
}

type Role = "title" | "subtitle";
type Measure = (
  text: string,
  fontSize: number,
  role: Role,
) => Promise<Measured>;

const trimTail = (text: string) => text.replace(/[\s,;:.–—-]+$/u, "");

/** Shorten `text` until it lays out in `maxLines` lines, then mark the cut. */
async function clampToLines(
  text: string,
  fontSize: number,
  role: Role,
  maxLines: number,
  measure: Measure,
): Promise<string> {
  let measured = await measure(text, fontSize, role);
  if (measured.lines <= maxLines && !measured.overflow) return text;

  let keep = text.length;
  for (let attempt = 0; attempt < 12 && keep > 8; attempt++) {
    const ratio = measured.overflow
      ? 0.75
      : Math.min(0.92, maxLines / measured.lines);
    keep = Math.max(8, Math.floor(keep * ratio));
    const candidate = `${trimTail(text.slice(0, keep))}…`;
    measured = await measure(candidate, fontSize, role);
    if (measured.lines <= maxLines && !measured.overflow) return candidate;
  }
  return `${trimTail(text.slice(0, 8))}…`;
}

/** Layout decision; every measurement comes from `measure`. */
async function resolveFit(
  title: string,
  subtitle: string[],
  measure: Measure,
): Promise<DefaultOgFit> {
  // The subtitle has a fixed size, so it is fitted first: what it leaves over
  // is the title's height budget.
  const lines: string[] = [];
  let subtitleLines = 0;
  for (const raw of subtitle) {
    const text = raw.trim();
    if (!text || subtitleLines >= MAX_SUBTITLE_LINES) continue;
    const clamped = await clampToLines(
      text,
      SUBTITLE_SIZE,
      "subtitle",
      MAX_SUBTITLE_LINES - subtitleLines,
      measure,
    );
    lines.push(clamped);
    subtitleLines += (await measure(clamped, SUBTITLE_SIZE, "subtitle")).lines;
  }

  const budget = TEXT_FRAME.maxHeight - subtitleBlock(subtitleLines);
  for (const size of TITLE_SIZES) {
    const measured = await measure(title, size, "title");
    if (measured.overflow) continue;
    const height = titleBlock(measured.lines, size);
    if (height <= budget)
      return {
        title,
        titleSize: size,
        subtitle: lines,
        height: height + subtitleBlock(subtitleLines),
      };
  }

  // Nothing fit: take the smallest step and cut the title to the budget.
  const size = TITLE_SIZES[TITLE_SIZES.length - 1];
  const maxLines = Math.max(1, Math.floor(budget / (size * LINE_HEIGHT)));
  const clamped = await clampToLines(title, size, "title", maxLines, measure);
  const titleLines = Math.min(
    maxLines,
    (await measure(clamped, size, "title")).lines || 1,
  );
  return {
    title: clamped,
    titleSize: size,
    subtitle: lines,
    height: titleBlock(titleLines, size) + subtitleBlock(subtitleLines),
  };
}

/**
 * Measure a line with satori itself: render it into an off-card probe with
 * `embedFont: false`, which emits one `<text>` per word — distinct `y` values
 * are the laid-out lines, and the run widths catch a word too wide to wrap.
 * A probe costs well under a millisecond, so fitting is a rounding error
 * next to the card render.
 */
async function probe(
  text: string,
  fontSize: number,
  role: Role,
  fonts: Font[],
): Promise<Measured> {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: { width: TEXT_FRAME.width, display: "flex" },
        children: {
          type: "div",
          props: {
            style: {
              display: "block",
              width: TEXT_FRAME.width,
              ...(role === "title" ? titleStyle(fontSize) : subtitleStyle),
            },
            children: text,
          },
        },
      },
    },
    { width: TEXT_FRAME.width, height: 4000, fonts, embedFont: false },
  );
  // A line's trailing space is laid out past the frame edge, so only runs
  // with visible glyphs count towards overflow.
  const runs = [
    ...svg.matchAll(
      /<text[^>]*\sx="([\d.-]+)"[^>]*\sy="([\d.-]+)"[^>]*\swidth="([\d.-]+)"[^>]*>([^<]*)<\/text>/g,
    ),
  ].filter((run) => run[4].trim() !== "");
  if (runs.length === 0 && text.trim() !== "")
    throw new Error(
      `OG probe found no text runs for "${text}" — has satori's SVG output changed?`,
    );
  return {
    lines: new Set(runs.map((run) => run[2])).size,
    overflow: runs.some(
      (run) => Number(run[1]) + Number(run[3]) > TEXT_FRAME.width + 1,
    ),
  };
}

/** Measure a card's copy against the real fonts and decide its layout. */
export function fitDefaultOg(
  title: string,
  subtitle: string[],
  fonts: Font[],
  layout: OgLayout = "panel",
): Promise<DefaultOgFit> {
  const cache = new Map<string, Promise<Measured>>();
  const measure: Measure = (text, fontSize, role) => {
    const key = `${role}|${fontSize}|${text}`;
    let pending = cache.get(key);
    if (!pending) {
      pending = probe(text, fontSize, role, fonts);
      cache.set(key, pending);
    }
    return pending;
  };
  return layout === "hero"
    ? resolveHeroFit(title, subtitle, measure)
    : resolveFit(title, subtitle, measure);
}

/**
 * Hero titles are authored line by line, so nothing is re-wrapped: a line
 * that does not fit at the hero size is an authoring error, not a fit job.
 */
async function resolveHeroFit(
  title: string,
  subtitle: string[],
  measure: Measure,
): Promise<DefaultOgFit> {
  const titleLines = title.split("\n").map((line) => line.trim());
  for (const line of titleLines) {
    const measured = await measure(line, HERO_TITLE_SIZE, "title");
    if (measured.overflow || measured.lines !== 1)
      throw new Error(
        `Hero title line does not fit on one ${HERO_TITLE_SIZE}px line: "${line}"`,
      );
  }
  const lines = subtitle.map((line) => line.trim()).filter(Boolean);
  let subtitleLines = 0;
  for (const line of lines) {
    const measured = await measure(line, SUBTITLE_SIZE, "subtitle");
    if (measured.overflow || measured.lines !== 1)
      throw new Error(`Hero subtitle line does not fit on one line: "${line}"`);
    subtitleLines += measured.lines;
  }
  return {
    title: titleLines.join("\n"),
    titleSize: HERO_TITLE_SIZE,
    subtitle: lines,
    height:
      titleBlock(titleLines.length, HERO_TITLE_SIZE) +
      subtitleBlock(subtitleLines),
  };
}

/**
 * Font-free fallback measurement: greedy word wrap at a deliberately wide
 * 0.62em per character (Borna averages nearer 0.54em), so it over-counts
 * lines rather than under-counting and the frame cannot overflow. Only used
 * when a caller renders without a measured fit; the generator always passes
 * one.
 */
const FALLBACK_CHAR_EM = 0.62;
function estimateMeasure(text: string, fontSize: number): Measured {
  const perLine = Math.max(
    1,
    Math.floor(TEXT_FRAME.width / (fontSize * FALLBACK_CHAR_EM)),
  );
  const words = text.split(/\s+/u).filter(Boolean);
  let lines = words.length > 0 ? 1 : 0;
  let used = 0;
  for (const word of words) {
    const cost = used === 0 ? word.length : word.length + 1;
    if (used + cost > perLine) {
      lines++;
      used = word.length;
    } else {
      used += cost;
    }
  }
  return { lines, overflow: words.some((word) => word.length > perLine) };
}

/** Synchronous layout from the estimate, for renders with no measured fit. */
function estimateFit(title: string, subtitle: string[]): DefaultOgFit {
  // resolveFit only awaits `measure`; with a measurer that resolves
  // synchronously the promise is already settled, but the value is still
  // behind a Promise, so run the same decision inline instead.
  const lines: string[] = [];
  let subtitleLines = 0;
  for (const raw of subtitle) {
    const text = raw.trim();
    if (!text || subtitleLines >= MAX_SUBTITLE_LINES) continue;
    lines.push(text);
    subtitleLines += estimateMeasure(text, SUBTITLE_SIZE).lines;
  }
  const budget = TEXT_FRAME.maxHeight - subtitleBlock(subtitleLines);
  for (const size of TITLE_SIZES) {
    const height = titleBlock(estimateMeasure(title, size).lines, size);
    if (height <= budget)
      return {
        title,
        titleSize: size,
        subtitle: lines,
        height: height + subtitleBlock(subtitleLines),
      };
  }
  const size = TITLE_SIZES[TITLE_SIZES.length - 1];
  return {
    title,
    titleSize: size,
    subtitle: lines,
    height: titleBlock(estimateMeasure(title, size).lines, size),
  };
}

// ---------------------------------------------------------------------------
// Template
// ---------------------------------------------------------------------------

export interface DefaultOgProps {
  brand: OgBrand;
  /** Section label in the chip; rendered upper-case. Unused by `hero`. */
  eyebrow: string;
  /** Panel-bottom cover, or the full-bleed hero (see `OgCard.layout`). */
  layout?: OgLayout;
  /** Ignored by `hero`, which always shows the brand's full-bleed mesh. */
  background: DefaultOgBackground;
  /** One string; in the `hero` layout `\n` starts a hard second line. */
  title: string;
  /** One string; `\n` starts a hard second line. */
  subtitle: string;
  /** Measured layout from `fitDefaultOg`; estimated when absent. */
  fit?: DefaultOgFit;
}

export const subtitleLinesOf = (subtitle: string): string[] =>
  subtitle.split("\n");

const monoStyle = (weight: 400 | 500) =>
  ({
    fontFamily: "Nudica Mono",
    fontWeight: weight,
    fontSize: MONO_SIZE,
    lineHeight: 1.25,
    letterSpacing: MONO_TRACKING,
  }) as const;

export function DefaultOg({
  brand,
  eyebrow,
  background,
  title,
  subtitle,
  fit,
  layout = "panel",
}: DefaultOgProps): ReactElement {
  const { palette } = BRANDS[brand];
  const logo = LOGOS[brand];
  const logoWidth = Math.round((logo.width * logo.rendered) / logo.height);
  if (layout === "hero")
    return HeroOg({ brand, title, subtitle, fit, logoWidth });
  const layoutFit = fit ?? estimateFit(title, subtitleLinesOf(subtitle));
  return (
    <div
      style={{
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: palette.panel,
      }}
    >
      <img
        src={backgroundArtwork(brand, background)}
        width={OG_WIDTH}
        height={PANEL.top}
        alt=""
        style={{ position: "absolute", left: 0, top: 0 }}
      />
      <div
        style={{
          position: "absolute",
          left: EYEBROW.x,
          top: EYEBROW.y,
          display: "flex",
          padding: "20px 40px",
          borderRadius: 100,
          border: `1px solid ${palette.chipBorder}`,
          backgroundColor: palette.chipFill,
          color: palette.chipText,
          ...monoStyle(500),
        }}
      >
        {eyebrow.toUpperCase()}
      </div>
      <div
        style={{
          position: "absolute",
          left: TEXT_FRAME.x,
          top: TEXT_FRAME.y,
          width: TEXT_FRAME.width,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            ...titleStyle(layoutFit.titleSize),
            display: "block",
            width: TEXT_FRAME.width,
            color: palette.title,
          }}
        >
          {layoutFit.title}
        </div>
        {layoutFit.subtitle.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: TITLE_SUBTITLE_GAP,
              width: TEXT_FRAME.width,
              color: palette.subtitle,
            }}
          >
            {layoutFit.subtitle.map((line) => (
              <div
                key={line}
                style={{
                  ...subtitleStyle,
                  display: "block",
                  width: TEXT_FRAME.width,
                }}
              >
                {line}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          left: FOOTER.x,
          top: FOOTER.y,
          width: FOOTER.width,
          height: FOOTER.height,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src={artwork(logo.file)}
          width={logoWidth}
          height={logo.rendered}
          alt=""
        />
        <div style={{ ...monoStyle(400), color: palette.muted }}>
          {SITE_LABEL}
        </div>
      </div>
    </div>
  );
}

/**
 * Full-bleed variant: the brand mesh edge to edge, the logo where the chip
 * sits on the panel layout with the site label on the same row, and the
 * copy anchored to the bottom padding.
 */
function HeroOg({
  brand,
  title,
  subtitle,
  fit,
  logoWidth,
}: {
  brand: OgBrand;
  title: string;
  subtitle: string;
  fit?: DefaultOgFit;
  logoWidth: number;
}): ReactElement {
  const { palette } = BRANDS[brand];
  const logo = LOGOS[brand];
  const titleLines = (fit?.title ?? title).split("\n");
  const subtitleLines = fit?.subtitle ?? subtitleLinesOf(subtitle);
  const titleSize = fit?.titleSize ?? HERO_TITLE_SIZE;
  return (
    <div
      style={{
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: palette.panel,
      }}
    >
      <img
        src={artwork(BRANDS[brand].hero)}
        width={OG_WIDTH}
        height={OG_HEIGHT}
        alt=""
        style={{ position: "absolute", left: 0, top: 0 }}
      />
      <div
        style={{
          position: "absolute",
          left: EYEBROW.x,
          top: HERO.logoY,
          width: TEXT_FRAME.width,
          height: logo.rendered,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src={artwork(logo.file)}
          width={logoWidth}
          height={logo.rendered}
          alt=""
        />
        <div style={{ ...monoStyle(400), color: palette.muted }}>
          {SITE_LABEL}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: TEXT_FRAME.x,
          top: HERO.copyY,
          width: TEXT_FRAME.width,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {titleLines.map((line) => (
          <div
            key={line}
            style={{
              ...titleStyle(titleSize),
              display: "block",
              width: TEXT_FRAME.width,
              color: palette.title,
            }}
          >
            {line}
          </div>
        ))}
        {subtitleLines.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: TITLE_SUBTITLE_GAP,
              width: TEXT_FRAME.width,
              color: palette.subtitle,
            }}
          >
            {subtitleLines.map((line) => (
              <div
                key={line}
                style={{
                  ...subtitleStyle,
                  lineHeight: HERO.subtitleLineHeight,
                  display: "block",
                  width: TEXT_FRAME.width,
                }}
              >
                {line}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
