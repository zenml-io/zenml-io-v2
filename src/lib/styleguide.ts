/**
 * styleguide.ts — build-time derivation layer for /styleguide (issue #266).
 *
 * Everything this module exports is *parsed*, not written down: colors, fonts,
 * spacing, radii, and the type-scale rungs (`--text-*`/`--leading-*`/
 * `--tracking-*`) come from `src/styles/global.css`; contrast ratios are
 * computed with `culori`; template status comes from
 * `src/lib/templates/registry.ts`. The page that renders `/styleguide` must
 * never hardcode a hex, a px value, a radius, or a family name where this
 * module can supply it instead — see DERIVATION RULE in the issue.
 *
 * WHY A HAND-ROLLED PARSER: global.css is a plain, hand-authored stylesheet
 * with a small, stable shape (an `@theme` block, `:root` blocks, `[data-app]`
 * scope blocks, a couple of class-scoped overrides). A full CSS parser
 * dependency would be overkill for that shape; a line/brace scanner over
 * custom-property declarations is enough and keeps this module dependency-free
 * beyond `culori`. See the "PARSER" section below for exactly what it does and
 * does not attempt to understand.
 *
 * WHY culori FOR CONTRAST: global.css mixes hex and oklch() color values.
 * Hand-rolling oklch → sRGB → relative-luminance conversion is exactly the
 * kind of math that silently produces a plausible-looking wrong number.
 * `wcagContrast` takes any culori-parseable color string (hex or oklch
 * included) and returns the WCAG 2.1 contrast ratio directly.
 */

import { parse as parseColor, wcagContrast } from "culori";
// Read at *build* time via Vite's `?raw` import (compiled to a static string
// in every output target, including the Cloudflare adapter's prerender
// bundle) rather than `readFileSync` keyed off `import.meta.url` — the latter
// throws `TypeError: Invalid URL string` once this module is bundled for the
// workerd/Cloudflare prerender target, because `import.meta.url` does not
// resolve to a usable `file://` URL there. See CLAUDE.md's DERIVATION RULE
// and issue #266.
import globalCss from "../styles/global.css?raw";
import {
  statusOf,
  TEMPLATE_REGISTRY,
  type TemplateEntry,
} from "./templates/registry.ts";

export interface TokenRow {
  name: string;
  value: string;
  scope: string;
  group: string;
}

export interface ContrastRow {
  fg: TokenRow;
  bg: TokenRow;
  ratio: number;
  passes: boolean;
}

export interface StyleguideData {
  colors: TokenRow[];
  fonts: TokenRow[];
  spacing: TokenRow[];
  radii: TokenRow[];
  /**
   * `--text-*` / `--leading-*` / `--tracking-*` tokens (global.css section
   * 2b, issue #248) — the rebrand's fluid type-scale rungs and their
   * tracking bindings. Kept as one flat list, same shape as the other token
   * groups, so consumers can filter by name prefix (`text-`, `leading-`,
   * `tracking-`) themselves rather than this module pre-deciding a rung
   * taxonomy that belongs to the page, not the parser.
   */
  typeScale: TokenRow[];
  contrast: ContrastRow[];
  chrome: ContrastRow[];
  registry: ReadonlyArray<{ entry: TemplateEntry; status: string }>;
}

/**
 * Foreground/background pairs the page's own chrome actually renders
 * (body text, eyebrows and labels, note panels, the dark status chips).
 * The page paints itself with the semantic tokens of the scope it documents,
 * so these are scope-qualified combinations the page composes via utilities —
 * cross-pairings DECLARED_PAIRS deliberately excludes because CSS does not
 * declare them together. Checked with the same WCAG math so the page's own
 * UI text is held to the same >=4.5:1 floor documented for the tokens it
 * renders, not merely assumed safe.
 */
export const CHROME_PAIRS: ReadonlyArray<{
  scope: string;
  fg: string;
  bg: string;
}> = [
  { scope: '[data-app="zenml-next"]', fg: "--foreground", bg: "--background" },
  {
    scope: '[data-app="zenml-next"]',
    fg: "--muted-foreground",
    bg: "--background",
  },
  {
    scope: '[data-app="zenml-next"]',
    fg: "--secondary-foreground",
    bg: "--background",
  },
  {
    scope: '[data-app="zenml-next"]',
    fg: "--muted-foreground",
    bg: "--muted",
  },
  {
    scope: '[data-app="zenml-next"]',
    fg: "--secondary-foreground",
    bg: "--muted",
  },
  { scope: '[data-app="zenml-next"]', fg: "--background", bg: "--foreground" },
];

/**
 * Foreground/background token-name pairs that are actually declared together,
 * inside the SAME scope block, in global.css today. This is the honest,
 * declared alternative to guessing a pair from class-name co-occurrence —
 * see scripts/check-registry.ts's "NOT YET IMPLEMENTED — contrast" note for
 * why a guessed pair is worse than none (DECISIONS #93, tracked as #247).
 *
 * Every pair below was verified by reading the `:root`, `[data-app="zenml"]`,
 * and `[data-app="zenml-next"]` blocks directly: both token names are declared
 * inside that one block, so the pairing is real usage, not an inference. Do not
 * add a pair here unless both tokens are declared together in the same scope
 * block — that is what keeps this list honest.
 */
export const DECLARED_PAIRS: ReadonlyArray<{
  scope: string;
  fg: string;
  bg: string;
}> = [
  // :root (Kitaru theme, default) — every semantic pair it declares
  { scope: ":root", fg: "--foreground", bg: "--background" },
  { scope: ":root", fg: "--card-foreground", bg: "--card" },
  { scope: ":root", fg: "--popover-foreground", bg: "--popover" },
  { scope: ":root", fg: "--primary-foreground", bg: "--primary" },
  { scope: ":root", fg: "--secondary-foreground", bg: "--secondary" },
  { scope: ":root", fg: "--muted-foreground", bg: "--muted" },
  { scope: ":root", fg: "--accent-foreground", bg: "--accent" },
  { scope: ":root", fg: "--destructive-foreground", bg: "--destructive" },
  { scope: ":root", fg: "--success-foreground", bg: "--success" },
  { scope: ":root", fg: "--warning-foreground", bg: "--warning" },
  { scope: ":root", fg: "--info-foreground", bg: "--info" },

  // [data-app="zenml"] — only the pairs this scope itself redeclares.
  // (destructive/success/warning/info are not redeclared here, so pairing them
  // would mean assuming :root's values carry over — true at runtime via CSS
  // cascade, but not something this scope's own block "declares"; left out.)
  { scope: '[data-app="zenml"]', fg: "--foreground", bg: "--background" },
  { scope: '[data-app="zenml"]', fg: "--card-foreground", bg: "--card" },
  { scope: '[data-app="zenml"]', fg: "--popover-foreground", bg: "--popover" },
  { scope: '[data-app="zenml"]', fg: "--primary-foreground", bg: "--primary" },
  {
    scope: '[data-app="zenml"]',
    fg: "--secondary-foreground",
    bg: "--secondary",
  },
  { scope: '[data-app="zenml"]', fg: "--muted-foreground", bg: "--muted" },
  { scope: '[data-app="zenml"]', fg: "--accent-foreground", bg: "--accent" },

  // [data-app="zenml-next"] — the 2026 rebrand palette declares a full
  // semantic light set in one block, so every pair below is declared together.
  { scope: '[data-app="zenml-next"]', fg: "--foreground", bg: "--background" },
  { scope: '[data-app="zenml-next"]', fg: "--card-foreground", bg: "--card" },
  {
    scope: '[data-app="zenml-next"]',
    fg: "--popover-foreground",
    bg: "--popover",
  },
  {
    scope: '[data-app="zenml-next"]',
    fg: "--primary-foreground",
    bg: "--primary",
  },
  {
    scope: '[data-app="zenml-next"]',
    fg: "--secondary-foreground",
    bg: "--secondary",
  },
  {
    scope: '[data-app="zenml-next"]',
    fg: "--muted-foreground",
    bg: "--muted",
  },
  {
    scope: '[data-app="zenml-next"]',
    fg: "--accent-foreground",
    bg: "--accent",
  },
  {
    scope: '[data-app="zenml-next"]',
    fg: "--destructive-foreground",
    bg: "--destructive",
  },
  {
    scope: '[data-app="zenml-next"]',
    fg: "--brand-mark-fg",
    bg: "--brand-mark-bg",
  },
  // Ratified AA accent pair (declared together as aliases in the same block).
  {
    scope: '[data-app="zenml-next"]',
    fg: "--color-accent-blue-text",
    bg: "--color-accent-blue-tint",
  },
];

/* ============================================================================
 * PARSER
 *
 * A generic top-level block walker: whenever it meets `{` at "top level" (i.e.
 * not nested inside a block it is currently consuming), it treats the text
 * since the previous block's end as the block's header/selector, then consumes
 * everything up to the matching `}` as the block's body — regardless of
 * whether that body itself contains further nested rules (e.g. `@utility`'s
 * `&[data-shown="true"] { ... }`, `@media` queries). Only blocks whose header
 * matches one of the scope selectors this file actually uses
 * (`:root`, `[data-app="..."]`, `.kitaru-brand-vars`, `@theme`, `@theme inline`)
 * are kept; everything else (`@font-face`, `@utility`, `@media`, `@layer`,
 * plain element selectors) is walked over and discarded.
 *
 * Comments are blanked out (characters replaced with spaces, newlines kept)
 * rather than removed, so that byte offsets — and therefore line numbers —
 * stay identical between the original text and the text declarations are
 * parsed from. That lets group labels (below) be derived from real standalone
 * comments in the file without a second, offset-shifted pass.
 * ========================================================================= */

interface RawBlock {
  header: string;
  /** Original source text of the block body, comments intact. */
  original: string;
  /** Same text with comment characters blanked to spaces (newlines kept). */
  blanked: string;
}

const TARGET_HEADER_RE =
  /^(:root|\[data-app="[^"]+"\]|\.kitaru-brand-vars|@theme(?:\s+inline)?)$/;

function blankComments(text: string): string {
  return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
}

/**
 * Walks top-level blocks using a comment-blanked copy of the whole file to
 * find `{`/`}` boundaries — comments in this file contain literal example
 * code with braces in it (e.g. `bg-zenml-{25,50,100,...}` in the BRAND CONFIG
 * comment), and counting braces on the raw text would treat those as real
 * block boundaries and desync every block found after them. Blanking
 * preserves length and newline positions exactly, so the same [start, end)
 * offsets slice matching text out of both the blanked copy (safe to find
 * braces in) and the original (real comment text, for group labels).
 */
function extractTopLevelBlocks(css: string): RawBlock[] {
  const scan = blankComments(css);
  const blocks: RawBlock[] = [];
  let i = 0;
  let headerStart = 0;
  while (i < scan.length) {
    if (scan[i] === "{") {
      const header = scan.slice(headerStart, i).trim();
      let depth = 1;
      let j = i + 1;
      while (j < scan.length && depth > 0) {
        if (scan[j] === "{") depth++;
        else if (scan[j] === "}") depth--;
        j++;
      }
      if (TARGET_HEADER_RE.test(header)) {
        blocks.push({
          header,
          original: css.slice(i + 1, j - 1),
          blanked: scan.slice(i + 1, j - 1),
        });
      }
      i = j;
      headerStart = i;
      continue;
    }
    i++;
  }
  return blocks;
}

/**
 * Standalone comments (own line(s), nothing else on the first/last line) act
 * as group headers for the declarations that follow them, within one block.
 *
 * Two shapes both count as a header, matching the two conventions the file
 * actually uses:
 *   - `=== Title ===`, possibly followed by further explanatory sentences in
 *     the same comment (the `@theme` block's convention) — only the `=== ===`
 *     title portion is used as the label, so the trailing explanation doesn't
 *     leak into the group tag.
 *   - A short comment with no `===` marker at all (the `:root` / `[data-app]`
 *     blocks' convention, e.g. `/* Surfaces *\/`, `/* Brand *\/`).
 * A longer aside with no `===` marker (documentation about the token, not a
 * section title) is deliberately not treated as a header — the previous
 * header stays in effect — so it doesn't overwrite a real group label with a
 * paragraph of prose.
 */
function extractGroupLabels(
  original: string,
): Array<{ offset: number; label: string }> {
  const labels: Array<{ offset: number; label: string }> = [];
  const re = /^[ \t]*\/\*[\s\S]*?\*\/[ \t]*$/gm;
  let m: RegExpExecArray | null;
  // biome-ignore lint/suspicious/noAssignInExpressions: standard regex-exec loop
  while ((m = re.exec(original))) {
    const joined = m[0]
      .replace(/^[ \t]*\/\*/, "")
      .replace(/\*\/[ \t]*$/, "")
      .split("\n")
      .map((line) => line.replace(/^\s*\*?\s?/, "").trim())
      .filter(Boolean)
      .join(" ")
      .trim();
    const titled = /={2,}\s*(.+?)\s*={2,}/.exec(joined);
    let label: string | null = null;
    if (titled) {
      label = titled[1].trim();
    } else if (joined.length > 0 && joined.length <= 80) {
      label = joined;
    }
    if (label) labels.push({ offset: m.index + m[0].length, label });
  }
  return labels;
}

function groupFor(
  labels: Array<{ offset: number; label: string }>,
  declOffset: number,
): string {
  let current = "";
  for (const l of labels) {
    if (l.offset <= declOffset) current = l.label;
    else break;
  }
  return current;
}

interface RawDecl {
  name: string; // without leading --
  value: string; // whitespace-collapsed, comments already blanked
  scope: string;
  group: string;
}

const DECL_RE = /--([a-zA-Z0-9_-]+)\s*:\s*([^;]+?);/g;

function extractDeclarations(blocks: RawBlock[]): RawDecl[] {
  const decls: RawDecl[] = [];
  for (const block of blocks) {
    const labels = extractGroupLabels(block.original);
    const re = new RegExp(DECL_RE);
    let m: RegExpExecArray | null;
    // biome-ignore lint/suspicious/noAssignInExpressions: standard regex-exec loop
    while ((m = re.exec(block.blanked))) {
      const name = m[1];
      const value = m[2].replace(/\s+/g, " ").trim();
      decls.push({
        name,
        value,
        scope: block.header,
        group: groupFor(labels, m.index),
      });
    }
  }
  return decls;
}

/* ============================================================================
 * VAR() RESOLUTION
 *
 * Only a value that is EXACTLY `var(--name)` (a full single indirection, no
 * fallback, nothing else in the value) is attempted. Composite values with an
 * embedded var() (e.g. a shadow) are left as-is — they are not classified as
 * colors/fonts/spacing/radii anyway.
 *
 * The fallback chain per scope mirrors what the CSS cascade actually
 * guarantees, and no further: a `[data-app="..."]` scope that does not
 * redeclare a name really does inherit :root's value for that name (same
 * element, unambiguous), so :root is in its chain. The flat `@theme` /
 * `@theme inline` blocks are NOT in any DOM scope's chain going the other
 * direction (a `@theme inline` alias like `--color-background: var(--background)`
 * is genuinely ambiguous — its resolved value depends on which `data-app`
 * scope is active on the element where the generated utility is used, so it
 * is left unresolved on purpose).
 * ========================================================================= */

const FALLBACK_CHAINS: Record<string, string[]> = {
  ":root": ["@theme", "@theme inline"],
  '[data-app="zenml"]': [":root", "@theme", "@theme inline"],
  '[data-app="zenml-next"]': [":root", "@theme", "@theme inline"],
  ".kitaru-brand-vars": ["@theme", "@theme inline"],
  "@theme": ["@theme inline"],
  "@theme inline": ["@theme"],
};

const UNRESOLVED = "var(...)";
const SINGLE_VAR_RE = /^var\(\s*(--[a-zA-Z0-9_-]+)\s*\)$/;

function resolveValue(
  rawValue: string,
  scope: string,
  byScope: Map<string, Map<string, string>>,
  depth = 0,
): string {
  const m = SINGLE_VAR_RE.exec(rawValue);
  if (!m) return rawValue;
  if (depth > 8) return UNRESOLVED;
  const refName = m[1].slice(2); // strip leading --
  const chain = [scope, ...(FALLBACK_CHAINS[scope] ?? [])];
  for (const candidateScope of chain) {
    const bucket = byScope.get(candidateScope);
    const found = bucket?.get(refName);
    if (found !== undefined) {
      return resolveValue(found, candidateScope, byScope, depth + 1);
    }
  }
  return UNRESOLVED;
}

/* ============================================================================
 * CLASSIFICATION
 *
 * Radii/spacing/fonts are classified by name prefix (unambiguous — those
 * namespaces are exactly `--radius*`, `--spacing-*` / `--container-*`, and
 * `--font-*`). Everything else is classified as a color by asking culori
 * whether the *resolved* value parses as a color — name-agnostic, so a color
 * token doesn't have to be pre-enumerated to be found. A handful of tokens
 * resolve to `var(...)` (unresolved — see above) and so can't be tested by
 * value; those fall back to the small, documented semantic-role vocabulary
 * this file's own "VOCABULARY for component code" comment names
 * (bg-primary, bg-background/text-foreground, bg-card, bg-muted, bg-accent,
 * bg-secondary, border-border, ring-ring, bg-success/warning/info/destructive)
 * plus the `--color-*` namespace, so they still surface as (unresolved) colors
 * rather than silently vanishing.
 * ========================================================================= */

const SEMANTIC_COLOR_NAMES = new Set([
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "success",
  "success-foreground",
  "warning",
  "warning-foreground",
  "info",
  "info-foreground",
  "border",
  "input",
  "ring",
]);

function isColorValue(value: string): boolean {
  if (value === UNRESOLVED) return false;
  return parseColor(value) !== undefined;
}

function classify(
  name: string,
  resolvedValue: string,
): "colors" | "fonts" | "spacing" | "radii" | "typeScale" | null {
  if (name === "radius" || name.startsWith("radius-")) return "radii";
  if (name.startsWith("spacing-") || name.startsWith("container-"))
    return "spacing";
  // Checked before the "font-" test below: --text-*/--leading-*/--tracking-*
  // are the type-scale rungs (font-size/line-height/letter-spacing), not
  // font-family stacks — those are namespaced --font-* and stay in "fonts".
  if (
    name.startsWith("text-") ||
    name.startsWith("leading-") ||
    name.startsWith("tracking-")
  )
    return "typeScale";
  if (name.startsWith("font-")) return "fonts";
  if (isColorValue(resolvedValue)) return "colors";
  if (name.startsWith("color-") || SEMANTIC_COLOR_NAMES.has(name))
    return "colors";
  return null;
}

/* ============================================================================
 * ENTRY POINT
 * ========================================================================= */

let cached: StyleguideData | undefined;

export function getStyleguideData(): StyleguideData {
  if (cached) return cached;

  const blocks = extractTopLevelBlocks(globalCss);
  const rawDecls = extractDeclarations(blocks);

  // Flat lookup for var() resolution: scope -> bare name -> raw value.
  // Built from every declaration across every physical block sharing a scope
  // (there are two `:root` blocks and three `@theme inline` blocks in the
  // file today; they are one scope for lookup purposes, same as the cascade
  // treats them).
  const byScope = new Map<string, Map<string, string>>();
  for (const decl of rawDecls) {
    let bucket = byScope.get(decl.scope);
    if (!bucket) {
      bucket = new Map();
      byScope.set(decl.scope, bucket);
    }
    bucket.set(decl.name, decl.value);
  }

  const colors: TokenRow[] = [];
  const fonts: TokenRow[] = [];
  const spacing: TokenRow[] = [];
  const radii: TokenRow[] = [];
  const typeScale: TokenRow[] = [];

  for (const decl of rawDecls) {
    const resolved = resolveValue(decl.value, decl.scope, byScope);
    const group = classify(decl.name, resolved);
    if (!group) continue;
    const row: TokenRow = {
      name: `--${decl.name}`,
      value: resolved,
      scope: decl.scope,
      group: decl.group,
    };
    if (group === "colors") colors.push(row);
    else if (group === "fonts") fonts.push(row);
    else if (group === "spacing") spacing.push(row);
    else if (group === "typeScale") typeScale.push(row);
    else radii.push(row);
  }

  // scope|name -> row, for DECLARED_PAIRS lookup.
  const colorByKey = new Map<string, TokenRow>();
  for (const row of colors) colorByKey.set(`${row.scope}|${row.name}`, row);

  const contrast: ContrastRow[] = [];
  for (const pair of DECLARED_PAIRS) {
    const fg = colorByKey.get(`${pair.scope}|${pair.fg}`);
    const bg = colorByKey.get(`${pair.scope}|${pair.bg}`);
    if (!fg || !bg) continue;
    if (fg.value === UNRESOLVED || bg.value === UNRESOLVED) continue;
    const fgColor = parseColor(fg.value);
    const bgColor = parseColor(bg.value);
    if (!fgColor || !bgColor) continue;
    const ratio = wcagContrast(fgColor, bgColor);
    contrast.push({ fg, bg, ratio, passes: ratio >= 4.5 });
  }

  // `@theme` is the flat namespace every `--color-gray-*` token lives in
  // (a literal scale, not scoped per data-app); `--color-white` is a
  // Tailwind built-in with no token declaration in global.css, so it
  // resolves to its fixed value directly instead of a colorByKey lookup.
  const chrome: ContrastRow[] = [];
  for (const pair of CHROME_PAIRS) {
    const fg = colorByKey.get(`${pair.scope}|${pair.fg}`);
    const bg = colorByKey.get(`${pair.scope}|${pair.bg}`);
    if (!fg || !bg) continue;
    if (fg.value === UNRESOLVED || bg.value === UNRESOLVED) continue;
    const fgColor = parseColor(fg.value);
    const bgColor = parseColor(bg.value);
    if (!fgColor || !bgColor) continue;
    const ratio = wcagContrast(fgColor, bgColor);
    chrome.push({ fg, bg, ratio, passes: ratio >= 4.5 });
  }

  const registry = TEMPLATE_REGISTRY.map((entry) => ({
    entry,
    status: statusOf(entry),
  }));

  cached = {
    colors,
    fonts,
    spacing,
    radii,
    typeScale,
    contrast,
    chrome,
    registry,
  };
  return cached;
}
