/**
 * The default Open Graph card: the Labs ground, the lockup and two lines of
 * type. Every route that is not a VS comparison uses it — both research
 * databases, the hubs and index pages, the standalone pages.
 *
 * The ground (the tinted field, the light diffusion and the blurred product
 * mark) is baked into `public/images/og/labs-ground.jpg`: satori can neither
 * blend nor blur, and baking keeps the render to one flat image plus text.
 * Copy stays live, so changing a title never touches the artwork.
 *
 * Composition (authored at 1920×1080):
 *   lockup      (120, 160) at native size
 *   text frame  (120, 620), 1680 wide, 300 tall at most
 *   title       Borna 500, 114 → 84 → 64 px, tracking -0.02em, sage-900
 *   subtitle    Rethink Sans 400, 58 px, sage-800, two lines at most
 */

import { readFileSync } from "node:fs";
import type { ReactElement } from "react";
import satori from "satori";
import { type Font, OG_HEIGHT, OG_WIDTH } from "./pipeline.js";

// ---------------------------------------------------------------------------
// Geometry and type scale
// ---------------------------------------------------------------------------

/** Text frame: where the copy sits and how much room it may take. */
export const TEXT_FRAME = {
  x: 120,
  y: 620,
  width: 1680,
  /** A card whose laid-out text exceeds this is a failed card. */
  maxHeight: 300,
} as const;

export const LOCKUP = { x: 120, y: 160, width: 766, height: 123 } as const;

/** Title steps, largest first. The fitter takes the first one that fits. */
export const TITLE_SIZES = [114, 84, 64] as const;
const TITLE_LINE_HEIGHT = 1.1;
const TITLE_TRACKING = "-0.02em";
const SUBTITLE_SIZE = 58;
const SUBTITLE_LINE_HEIGHT = 1.2;
const MAX_SUBTITLE_LINES = 2;
const TITLE_SUBTITLE_GAP = 16;

const titleStyle = (fontSize: number) =>
  ({
    fontFamily: "Borna",
    fontWeight: 500,
    fontSize,
    lineHeight: TITLE_LINE_HEIGHT,
    letterSpacing: TITLE_TRACKING,
  }) as const;

const subtitleStyle = {
  fontFamily: "Rethink Sans",
  fontWeight: 400,
  fontSize: SUBTITLE_SIZE,
  lineHeight: SUBTITLE_LINE_HEIGHT,
} as const;

const titleBlock = (lines: number, size: number) =>
  lines * size * TITLE_LINE_HEIGHT;
const subtitleBlock = (lines: number) =>
  lines === 0
    ? 0
    : TITLE_SUBTITLE_GAP + lines * SUBTITLE_SIZE * SUBTITLE_LINE_HEIGHT;

// The budget works out at: one 114px line (125.4) + gap (16) + two 58px
// lines (139.2) = 280.6, and at the bottom of the ladder two 64px lines
// (140.8) + 16 + 139.2 = 296. Both sit inside the 300px frame.

// ---------------------------------------------------------------------------
// Colours and artwork
// ---------------------------------------------------------------------------

// Satori needs resolved colours rather than CSS custom properties.
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

const assets = {
  ground: artwork("labs-ground.jpg"),
  lockup: artwork("labs-lockup.svg"),
};

/** Fallback colour behind the SVG; the baked ground covers every pixel. */
export function defaultOgBackground(): string {
  return token("sage-400");
}

// ---------------------------------------------------------------------------
// Fitting
// ---------------------------------------------------------------------------

export interface DefaultOgFit {
  /** Title as rendered — ellipsized when it could not be made to fit. */
  title: string;
  titleSize: number;
  titleLines: number;
  /** Subtitle as rendered, one entry per line. */
  subtitle: string[];
  subtitleLines: number;
  /** Laid-out height of the text frame, in authored px. */
  height: number;
}

interface Measured {
  lines: number;
  /** A word wider than the frame — wrapping cannot save it. */
  overflow: boolean;
}

type Role = "title" | "subtitle";
type Measure = (text: string, fontSize: number, role: Role) => Measured;

const measureKey = (text: string, fontSize: number, role: Role) =>
  `${role}|${fontSize}|${text}`;

const trimTail = (text: string) => text.replace(/[\s,;:.–—-]+$/u, "");

/** Shorten `text` until it lays out in `maxLines` lines, then mark the cut. */
function clampToLines(
  text: string,
  fontSize: number,
  role: Role,
  maxLines: number,
  measure: Measure,
): string {
  let measured = measure(text, fontSize, role);
  if (measured.lines <= maxLines && !measured.overflow) return text;

  let keep = text.length;
  for (let attempt = 0; attempt < 12 && keep > 8; attempt++) {
    const ratio = measured.overflow
      ? 0.75
      : Math.min(0.92, maxLines / measured.lines);
    keep = Math.max(8, Math.floor(keep * ratio));
    const candidate = `${trimTail(text.slice(0, keep))}…`;
    measured = measure(candidate, fontSize, role);
    if (measured.lines <= maxLines && !measured.overflow) return candidate;
  }
  return `${trimTail(text.slice(0, 8))}…`;
}

/** Pure layout decision; every measurement comes from `measure`. */
function resolveFit(
  title: string,
  subtitle: string[],
  measure: Measure,
): DefaultOgFit {
  // The subtitle has a fixed size, so it is fitted first: what it leaves over
  // is the title's height budget.
  const lines: string[] = [];
  let subtitleLines = 0;
  for (const raw of subtitle) {
    const text = raw.trim();
    if (!text || subtitleLines >= MAX_SUBTITLE_LINES) continue;
    const clamped = clampToLines(
      text,
      SUBTITLE_SIZE,
      "subtitle",
      MAX_SUBTITLE_LINES - subtitleLines,
      measure,
    );
    lines.push(clamped);
    subtitleLines += measure(clamped, SUBTITLE_SIZE, "subtitle").lines;
  }

  const budget = TEXT_FRAME.maxHeight - subtitleBlock(subtitleLines);
  for (const size of TITLE_SIZES) {
    const measured = measure(title, size, "title");
    if (measured.overflow) continue;
    const height = titleBlock(measured.lines, size);
    if (height <= budget)
      return {
        title,
        titleSize: size,
        titleLines: measured.lines,
        subtitle: lines,
        subtitleLines,
        height: height + subtitleBlock(subtitleLines),
      };
  }

  // Nothing fit: take the smallest step and cut the title to the budget.
  const size = TITLE_SIZES[TITLE_SIZES.length - 1];
  const maxLines = Math.max(1, Math.floor(budget / (size * TITLE_LINE_HEIGHT)));
  const clamped = clampToLines(title, size, "title", maxLines, measure);
  const titleLines = Math.min(
    maxLines,
    measure(clamped, size, "title").lines || 1,
  );
  return {
    title: clamped,
    titleSize: size,
    titleLines,
    subtitle: lines,
    subtitleLines,
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
  const runs = [
    ...svg.matchAll(
      /<text[^>]*\sx="([\d.-]+)"[^>]*\sy="([\d.-]+)"[^>]*\swidth="([\d.-]+)"/g,
    ),
  ];
  return {
    lines: new Set(runs.map((run) => run[2])).size,
    overflow: runs.some(
      (run) => Number(run[1]) + Number(run[3]) > TEXT_FRAME.width + 1,
    ),
  };
}

/** Thrown by the cache-backed measurer when satori has yet to answer. */
class PendingMeasurement {
  constructor(
    readonly key: string,
    readonly measured: Promise<Measured>,
  ) {}
}

/**
 * Measure a card's copy against the real fonts.
 *
 * `resolveFit` is a synchronous decision tree so that the fallback path can
 * use it too; satori is asynchronous. The measurer therefore answers from a
 * cache and, on a miss, throws the pending probe — this wrapper awaits it,
 * fills the cache and re-runs the (pure, cheap) decision. Each pass resolves
 * one more measurement, and a card needs a handful.
 */
export async function fitDefaultOg(
  title: string,
  subtitle: string[],
  fonts: Font[],
): Promise<DefaultOgFit> {
  const cache = new Map<string, Measured>();
  const cached: Measure = (text, fontSize, role) => {
    const key = measureKey(text, fontSize, role);
    const hit = cache.get(key);
    if (hit) return hit;
    throw new PendingMeasurement(key, probe(text, fontSize, role, fonts));
  };
  for (let pass = 0; pass < 64; pass++) {
    try {
      return resolveFit(title, subtitle, cached);
    } catch (error) {
      if (!(error instanceof PendingMeasurement)) throw error;
      cache.set(error.key, await error.measured);
    }
  }
  throw new Error(`OG fit did not settle for: ${title}`);
}

/**
 * Font-free fallback measurement: greedy word wrap at a deliberately wide
 * 0.62em per character (both site fonts average nearer 0.54em), so it
 * over-counts lines rather than under-counting and the frame cannot
 * overflow. Only used when a caller renders without a measured fit; both
 * generators always pass one.
 */
const FALLBACK_CHAR_EM = 0.62;
const estimateMeasure: Measure = (text, fontSize) => {
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
};

// ---------------------------------------------------------------------------
// Template
// ---------------------------------------------------------------------------

export interface DefaultOgProps {
  title: string;
  /** One string; `\n` starts a hard second line (the databases use both). */
  subtitle: string;
  /** Measured layout from `fitDefaultOg`; estimated when absent. */
  fit?: DefaultOgFit;
}

export const subtitleLinesOf = (subtitle: string): string[] =>
  subtitle.split("\n");

export function DefaultOg({
  title,
  subtitle,
  fit,
}: DefaultOgProps): ReactElement {
  const layout =
    fit ?? resolveFit(title, subtitleLinesOf(subtitle), estimateMeasure);
  return (
    <div
      style={{
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: defaultOgBackground(),
      }}
    >
      <img
        src={assets.ground}
        width={OG_WIDTH}
        height={OG_HEIGHT}
        alt=""
        style={{ position: "absolute", left: 0, top: 0 }}
      />
      <img
        src={assets.lockup}
        width={LOCKUP.width}
        height={LOCKUP.height}
        alt="ZenML Labs"
        style={{ position: "absolute", left: LOCKUP.x, top: LOCKUP.y }}
      />
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
            ...titleStyle(layout.titleSize),
            display: "block",
            width: TEXT_FRAME.width,
            color: token("sage-900"),
          }}
        >
          {layout.title}
        </div>
        {layout.subtitle.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: TITLE_SUBTITLE_GAP,
              width: TEXT_FRAME.width,
              color: token("sage-800"),
            }}
          >
            {layout.subtitle.map((line) => (
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
    </div>
  );
}
