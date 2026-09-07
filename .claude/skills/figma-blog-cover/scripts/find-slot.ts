/**
 * find-slot.ts — deterministic placement + defaults for one blog cover.
 *
 * Usage (from any cwd):
 *   pnpm exec tsx .claude/skills/figma-blog-cover/scripts/find-slot.ts <slug> \
 *     [--siblings '<json array of {slug,layout,bgStyle,date?}>'] \
 *     [--brand ZenML|Kitaru] [--layout <Layout>] [--bg <Style>] \
 *     [--title <headline>] [--subtitle <text>] [--comparison a,b,c] [--include-zenml True|False] \
 *     [--tile-batch <n>] [--fallback "<reason>"] [--allow-new-column] [--dry-run]
 *
 *   pnpm exec tsx .claude/skills/figma-blog-cover/scripts/find-slot.ts --month YYYY-MM [--siblings ...]
 *     Month mode: no target slug. Emits the section geometry and positions of every post of that
 *     month (slug null, no layout/bg/text). Used to reflow the OLD section after a post's date moved
 *     it to another month (SKILL.md, Idempotency): run S2 + S4 + S5 with this P; never S3.
 *
 * Reads src/content/blog/<slug>.md (gray-matter) plus every other post's date,
 * and prints ONE JSON object P to stdout. P.gate carries the account gate the
 * agent checks against the Figma MCP `whoami` result before S1: the editor
 * email comes from FIGMA_EDITOR_EMAIL in <repo>/.env (A9: it never appears in
 * a repo file), org "ZenML", seat "Full"; a missing variable is a question. The agent pastes P as `__PARAMS__`
 * into scripts/figma/s*.js. Nothing here touches Figma or the network.
 *
 * Boolean flags (no value): --dry-run echoes `dryRun: true` and changes nothing
 * else (the agent stops after S1); --allow-new-column sets `allowNewColumn: true`
 * so S2 may create the first section of a year column (S1 reports `columnMissing`;
 * ask before passing this). Every other flag takes exactly one value.
 *
 * --fallback "<reason>": the documented fallback for a --comparison run that
 * cannot be honoured. Forces Layout "Panel Bottom" (the adjacency rule is passed
 * through as a suggestion, not a question), clears `comparison`/`vs`, sets
 * `expectedSetId` to the cover set and records `fallback: <reason>` in P.
 *
 * --tile-batch <n>: for --comparison, selects which entry of `vs.tileBatches`
 * becomes `vs.tileRange` (default 0). s3-vs-comparison.js swaps only that range
 * (≤7 swaps per call); with Count ≥ 8 run S3-vs once per batch (n = 0, then 1).
 *
 * Copy rule (A8 — cover copy stays minimal):
 *   `titleSource` = the post title, `subtitleSource` = seo.description. Both are
 *   INPUT ONLY; neither is written to the cover as-is.
 *   `headline` = --title, else the title with trailing clauses/questions dropped
 *   at a punctuation boundary until it fits `titleBudget` (55 chars on Text /
 *   Full Bleed, 60 on Panel Bottom / Image Left / Image Right ≈ three lines).
 *   A derived headline that still exceeds the budget is a question (pass --title);
 *   a supplied one that exceeds it gets a warning (stderr + `suggestions`).
 *   `subtitle` = "" and `showSubtitle` = false by default. --subtitle "<text>"
 *   sets both (one line, ≤55 chars, written by the agent). A subtitle equal to
 *   seo.description or restating the headline is rejected with a question.
 *   VS card: `vs.title` = --title, else `<N> <Competitor> Alternatives` derived from the title
 *   (N = competitor tiles + the brand tile when Include ZenML=True; "Best", "We Tested …" and
 *   the rest are dropped — the pattern the live cards use, E2E 2026-09-07); `vs.title` ≤34 chars
 *   and the whole "for …" line ≤34 chars, else a warning. The cover-template headline budget and
 *   line estimate (`titleLines`) are skipped on a --comparison run: the VS card has its own budget.
 *   `titleMeasure` (px) is the Title layer's width on the chosen layout and `titleLines`
 *   the estimated line breaks (greedy wrap at ~18 chars per 800 px, the E2E anchor); a last
 *   line of one word, or more than three lines, is a suggestion naming a wider legal layout —
 *   the S6 screenshot decides, the estimate only saves a Figma round trip.
 *
 * Grid (section-relative, see references/grid.md):
 *   COLS=5  X0=160  DX=2120  Y0=240  DY=1280  section width 10720
 *   section height = 1480 + (rows-1)*1280;  year column x = 11620*(2026-year); gap 400
 *
 * `--siblings` is the S1 preflight output (live covers in the month section).
 * It drives the design rules (no adjacent same Layout, unique Photo 0N) and is
 * cross-checked against the content collection: any live cover whose name is
 * not a post of that month, or a post with no live cover other than <slug>,
 * lands in `questions` — stop and ask, do not reflow over it.
 */

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

// <repo>/.claude/skills/figma-blog-cover/scripts/find-slot.ts → four levels up
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = resolve(SCRIPT_DIR, "..");
const REPO = resolve(SCRIPT_DIR, "../../../..");
const BLOG_DIR = join(REPO, "src/content/blog");
const KEY_TABLE = join(SKILL_DIR, "references/service-logo-keys.md");
const ENV_FILE = join(REPO, ".env");

// ── Grid + Figma constants ─────────────────────────────────────────────
const GRID = {
  cols: 5,
  x0: 160,
  dx: 2120,
  y0: 240,
  dy: 1280,
  sectionWidth: 10720,
  gap: 400,
  columnDx: 11620,
  baseYear: 2026,
  coverWidth: 1920,
  coverHeight: 1080,
} as const;

const IDS = {
  fileKey: "tDusxGZ3wyvc08u3GiUpy4",
  pageId: "174:1785",
  containerId: "174:1785",
  coverSetId: "162:1845",
  bgSetId: "150:1697",
  vsSetId: "113:300",
} as const;

// Verbatim component-property keys from the Spike (162:1845 definitions).
const COVER_PROPS = {
  eyebrow: "Eyebrow#162:30",
  title: "Title#162:31",
  subtitle: "Subtitle#162:32",
  showSubtitle: "Show subtitle#162:33",
  site: "Site#162:34",
} as const;

const LAYOUTS = ["Text", "Panel Bottom", "Image Right", "Image Left", "Full Bleed"] as const;
type Layout = (typeof LAYOUTS)[number];
// Deterministic preference: launch look first (only legal for launch titles),
// then the photo layouts, then the neutral ones.
const LAYOUT_PREFERENCE: Layout[] = ["Full Bleed", "Image Right", "Panel Bottom", "Image Left", "Text"];
const FALLBACK_LAYOUT: Layout = "Panel Bottom";

const PHOTO_STYLES = ["Photo 01", "Photo 02", "Photo 03", "Photo 04", "Photo 05", "Photo 06", "Photo 07", "Photo 08", "Photo 09"] as const;
const OTHER_STYLES = ["Mesh", "Deep", "Chevron", "Field", "Tint"] as const;
// The legacy un-numbered "Photo" is deliberately absent: new covers never use it (A3).
const BG_STYLES = [...PHOTO_STYLES, ...OTHER_STYLES] as const;
type BgStyle = (typeof BG_STYLES)[number];
const IMAGE_LAYOUT_BGS: ReadonlySet<string> = new Set([...PHOTO_STYLES, "Mesh", "Deep"]);
const IMAGE_LAYOUTS: ReadonlySet<string> = new Set(["Image Left", "Image Right"]);

// s3-vs-comparison.js: 1 create/reuse + 2 texts + N swaps ≤ 10 ops → at most 7 swaps per call.
const MAX_SWAPS_PER_CALL = 7;

// Copy budgets (A8). Headline ≈ three lines of Borna Medium 80px on the layout's measure.
const TITLE_BUDGET: Record<Layout, number> = {
  Text: 55,
  "Full Bleed": 55,
  "Panel Bottom": 60,
  "Image Left": 60,
  "Image Right": 60,
};
const SUBTITLE_MAX = 55; // one line, agent-written, never seo.description
// Title layer width (px) per Layout, read off the Kitaru variants of 162:1845 in the 2026-09-07
// E2E (ZenML variants not measured; assumed equal until read). The image layouts are less than
// half the width of the others, so the same headline breaks very differently.
const TITLE_MEASURE: Record<Layout, number> = {
  Text: 1680,
  "Full Bleed": 1680,
  "Panel Bottom": 1760,
  "Image Left": 800,
  "Image Right": 800,
};
// Line-fit anchor from the same run (Borna Medium 80 px, 800 px measure): "Braintrust Pricing"
// (18 chars) held one line, "Braintrust Pricing Guide" (24) wrapped. Wider measures are scaled
// from this anchor — an estimate, never a substitute for the S6 screenshot.
const CHARS_PER_LINE_ANCHOR = { measure: 800, chars: 18 };
const VS_TITLE_MAX = 34;
const VS_FOR_LINE_MAX = 34; // "for " + qualifier, whole line

/**
 * Drop trailing clauses/questions at punctuation boundaries; never rewrite.
 * A trailing question clause ("…: How Much Does It Actually Cost?") is dropped whenever a
 * boundary precedes it, budget or not; then clauses are dropped from the right until the
 * title fits. A title with no boundary is returned as-is (the caller asks for --title).
 */
function shortenTitle(title: string, budget: number): string {
  const BOUNDARY = /:| — | – | \| /g;
  const boundaries = (s: string): number[] => [...s.matchAll(BOUNDARY)].map((m) => m.index as number);
  let t = title.trim();
  if (/\?$/.test(t)) {
    const b = boundaries(t);
    if (b.length > 0) t = t.slice(0, b[b.length - 1]).trim();
  }
  if (t.length <= budget) return t;
  // Rightmost boundary that fits keeps the most of the title.
  for (const idx of boundaries(t).reverse()) {
    const cut = t.slice(0, idx).trim();
    if (cut.length > 0 && cut.length <= budget) return cut;
  }
  return t;
}

function charsPerLine(layout: Layout): number {
  return Math.floor((TITLE_MEASURE[layout] / CHARS_PER_LINE_ANCHOR.measure) * CHARS_PER_LINE_ANCHOR.chars);
}

/** Greedy word wrap at `perLine` characters — the Title layer auto-wraps, so this predicts its breaks. */
function estimateLines(text: string, perLine: number): string[] {
  const lines: string[] = [];
  let cur = "";
  for (const w of text.split(/\s+/).filter(Boolean)) {
    const next = cur ? `${cur} ${w}` : w;
    if (cur && next.length > perLine) {
      lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

function normalizeCopy(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

const LAUNCH_RE = /introducing|launch|release/i;
const COMPARISON_RE = /alternatives|\bvs\b/i;
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// ── CLI ────────────────────────────────────────────────────────────────
interface Args {
  slug?: string;
  month?: string;
  siblings?: string;
  brand?: string;
  layout?: string;
  bg?: string;
  title?: string;
  subtitle?: string;
  comparison?: string;
  includeZenml?: string;
  tileBatch?: string;
  fallback?: string;
  allowNewColumn: boolean;
  dryRun: boolean;
}

const USAGE =
  "usage: find-slot.ts <slug> [--siblings JSON] [--brand ZenML|Kitaru] [--layout L] [--bg S] [--title T] [--subtitle T] [--comparison a,b,c] [--include-zenml True|False] [--tile-batch N] [--fallback REASON] [--allow-new-column] [--dry-run]\n" +
  "       find-slot.ts --month YYYY-MM [--siblings JSON] [--allow-new-column] [--dry-run]";

function parseArgs(argv: string[]): Args {
  const args: Args = { allowNewColumn: false, dryRun: false };
  const valueFlags: Record<string, keyof Omit<Args, "allowNewColumn" | "dryRun">> = {
    "--month": "month",
    "--siblings": "siblings",
    "--brand": "brand",
    "--layout": "layout",
    "--bg": "bg",
    "--title": "title",
    "--subtitle": "subtitle",
    "--comparison": "comparison",
    "--include-zenml": "includeZenml",
    "--tile-batch": "tileBatch",
    "--fallback": "fallback",
  };
  const boolFlags: Record<string, "allowNewColumn" | "dryRun"> = {
    "--allow-new-column": "allowNewColumn",
    "--dry-run": "dryRun",
  };
  let i = 0;
  if (argv[0] !== undefined && !argv[0].startsWith("--")) {
    args.slug = argv[0];
    i = 1;
  }
  for (; i < argv.length; i++) {
    const flag = argv[i];
    if (boolFlags[flag]) {
      args[boolFlags[flag]] = true;
      continue;
    }
    const key = valueFlags[flag];
    if (!key) {
      console.error(`unknown argument: ${flag}\n${USAGE}`);
      process.exit(2);
    }
    const value = argv[i + 1];
    if (value === undefined) {
      console.error(`${flag} needs a value`);
      process.exit(2);
    }
    args[key] = value;
    i++;
  }
  if (!args.slug && !args.month) {
    console.error(USAGE);
    process.exit(2);
  }
  if (args.slug && args.month) {
    console.error("give either <slug> or --month YYYY-MM, not both");
    process.exit(2);
  }
  if (args.month && !/^\d{4}-\d{2}$/.test(args.month)) {
    console.error(`--month must be YYYY-MM, got ${args.month}`);
    process.exit(2);
  }
  if (args.fallback !== undefined && args.fallback.trim() === "") {
    console.error("--fallback needs a non-empty reason");
    process.exit(2);
  }
  if (args.fallback && args.layout) {
    console.error(`--fallback forces --layout "${FALLBACK_LAYOUT}"; drop --layout`);
    process.exit(2);
  }
  return args;
}

// ── Content collection ─────────────────────────────────────────────────
interface Post {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  draft: boolean;
  date: string; // ISO string as written in the file
  month: string; // YYYY-MM
}

function isoDate(raw: unknown, file: string): string {
  if (raw instanceof Date) return raw.toISOString();
  if (typeof raw === "string" && /^\d{4}-\d{2}-\d{2}/.test(raw)) return raw;
  throw new Error(`${file}: frontmatter date is missing or unparseable (${JSON.stringify(raw)})`);
}

function readPost(file: string): Post {
  const raw = readFileSync(join(BLOG_DIR, file), "utf8");
  const { data } = matter(raw);
  const fileSlug = file.replace(/\.md$/, "");
  const slug = typeof data.slug === "string" && data.slug ? data.slug : fileSlug;
  const date = isoDate(data.date, file);
  const seo = (data.seo ?? {}) as { description?: string };
  return {
    slug,
    title: String(data.title ?? ""),
    description: String(seo.description ?? ""),
    category: String(data.category ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    date,
    // Month from the literal date string (UTC) — the same thing the Figma
    // section names encode; no local-timezone drift.
    month: date.slice(0, 7),
  };
}

function readAllPosts(): Post[] {
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") && !/ \d+\.md$/.test(f)) // skip iCloud " 2.md" dupes
    .map(readPost);
}

// ── Service-logo keys (references/service-logo-keys.md, owned by the skill author) ──
// Both the key table and the Aliases section live in the same file — read it once and hand the
// lines to both parsers instead of hitting the filesystem twice.
function readKeyTableLines(questions: string[]): string[] | null {
  if (!existsSync(KEY_TABLE)) {
    questions.push(`references/service-logo-keys.md not found at ${KEY_TABLE}; --comparison cannot map slugs to ServiceLogo keys.`);
    return null;
  }
  return readFileSync(KEY_TABLE, "utf8").split("\n");
}

function readLogoKeys(lines: string[] | null): Map<string, string> {
  const keys = new Map<string, string>();
  if (!lines) return keys;
  // keep in sync with append-key.ts's slug/key validation and ROW_RE
  for (const line of lines) {
    const m = /^\|\s*([a-z0-9][a-z0-9.-]*)\s*\|\s*([0-9a-f]{40})\s*\|/.exec(line);
    if (m) keys.set(m[1], m[2]);
  }
  return keys;
}

// Aliases (references/service-logo-keys.md, "## Aliases" section): a --comparison slug that is
// really the same brand as an existing ServiceLogo/<slug> (e.g. "weave" -> "wandb") maps here to
// its canonical slug. Resolved BEFORE the key lookup above, so a competitor with no mark of its
// own never triggers an unnecessary add-mark run. Self-mapped rows (e.g. "opik" -> "opik") are
// deliberate — they record that the obvious-looking alias was considered and rejected, not a
// no-op to clean up.
function readAliases(lines: string[] | null): Map<string, string> {
  const aliases = new Map<string, string>();
  if (!lines) return aliases;
  let inSection = false;
  for (const line of lines) {
    if (/^##\s+Aliases\b/.test(line)) {
      inSection = true;
      continue;
    }
    if (inSection && /^##\s+/.test(line)) break;
    if (!inSection) continue;
    const m = /^\|\s*([a-z0-9][a-z0-9.-]*)\s*\|\s*([a-z0-9][a-z0-9.-]*)\s*\|/.exec(line);
    if (m) aliases.set(m[1], m[2]);
  }
  return aliases;
}

// ── Account gate (A9): the editor email lives in .env only ──────────────
interface Gate {
  editorEmail: string | null;
  org: "ZenML";
  seat: "Full";
}

function readGate(questions: string[]): Gate {
  let editorEmail: string | null = null;
  if (existsSync(ENV_FILE)) {
    for (const line of readFileSync(ENV_FILE, "utf8").split("\n")) {
      const m = /^\s*(?:export\s+)?FIGMA_EDITOR_EMAIL\s*=\s*(.*?)\s*$/.exec(line);
      if (m) editorEmail = m[1].replace(/^(['"])(.*)\1$/, "$2") || null;
    }
  }
  if (!editorEmail) {
    questions.push("FIGMA_EDITOR_EMAIL is not set in .env, so the account gate (whoami email must equal it, with a Full seat on the ZenML org) cannot be checked. Add it to .env — never to a repo file — and re-run.");
  }
  return { editorEmail, org: "ZenML", seat: "Full" };
}

// ── Month geometry (shared by slug mode and --month mode) ──────────────
interface MonthGeometry {
  month: string;
  year: number;
  sectionName: string;
  columnX: number;
  orderedSlugs: string[];
  rows: number;
  sectionHeight: number;
  positions: Record<string, { x: number; y: number }>;
}

function monthGeometry(posts: Post[], month: string): MonthGeometry {
  const year = Number(month.slice(0, 4));
  const monthIdx = Number(month.slice(5, 7)) - 1;
  if (!(monthIdx >= 0 && monthIdx <= 11)) throw new Error(`bad month ${month}`);
  const sectionName = `${month} · ${MONTH_NAMES[monthIdx]} ${year}`;
  const columnX = GRID.columnDx * (GRID.baseYear - year);

  // Ordered slugs for the month: date desc, slug asc on ties (drafts included —
  // the cover page holds one cover per post file, drafts too).
  const orderedSlugs = posts
    .filter((p) => p.month === month)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))
    .map((p) => p.slug);
  // A section is never shorter than one row (grid.md), even when the month has no posts left.
  const rows = Math.max(1, Math.ceil(orderedSlugs.length / GRID.cols));
  const sectionHeight = 1480 + (rows - 1) * GRID.dy;
  const positions: Record<string, { x: number; y: number }> = {};
  orderedSlugs.forEach((s, i) => {
    positions[s] = {
      x: GRID.x0 + (i % GRID.cols) * GRID.dx,
      y: GRID.y0 + Math.floor(i / GRID.cols) * GRID.dy,
    };
  });
  return { month, year, sectionName, columnX, orderedSlugs, rows, sectionHeight, positions };
}

interface Sibling {
  slug: string;
  layout?: string;
  bgStyle?: string;
  date?: string;
}

// Siblings (live covers from S1) — cross-check against the collection.
function parseSiblings(args: Args, geo: MonthGeometry, targetSlug: string | null, questions: string[], suggestions: string[]): Sibling[] {
  if (!args.siblings) {
    suggestions.push("No --siblings given: layout/bg rules were applied without live sibling data. Re-run with the S1 preflight siblings before S3.");
    return [];
  }
  let siblings: Sibling[] = [];
  try {
    const parsed: unknown = JSON.parse(args.siblings);
    if (!Array.isArray(parsed)) throw new Error("not an array");
    siblings = parsed as Sibling[];
  } catch (e) {
    console.error(`--siblings is not a JSON array: ${(e as Error).message}`);
    process.exit(2);
  }
  const expected = new Set(geo.orderedSlugs.filter((s) => s !== targetSlug));
  const live = new Set(siblings.map((s) => s.slug));
  for (const s of live) {
    if (s === targetSlug) continue;
    if (!expected.has(s)) questions.push(`Live cover "${s}" in section "${geo.sectionName}" is not a post dated ${geo.month} in src/content/blog — which post is it, and should it move?`);
  }
  for (const s of expected) {
    if (!live.has(s)) questions.push(`Post "${s}" is dated ${geo.month} but has no live cover in section "${geo.sectionName}" (S1 siblings) — create it first or confirm it is intentionally missing?`);
  }
  return siblings;
}

function emit(P: Record<string, unknown>, questions: string[]): void {
  process.stdout.write(`${JSON.stringify(P, null, 2)}\n`);
  if (questions.length > 0) process.exitCode = 3;
}

// ── Main ───────────────────────────────────────────────────────────────
function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const questions: string[] = [];
  const suggestions: string[] = [];
  const posts = readAllPosts();
  const gate = readGate(questions);

  // ── --month mode: geometry of one section, no target post ──
  if (args.month) {
    const geo = monthGeometry(posts, args.month);
    parseSiblings(args, geo, null, questions, suggestions);
    if (geo.orderedSlugs.length === 0) {
      questions.push(`No post in src/content/blog is dated ${geo.month}: section "${geo.sectionName}" would be empty. Leave it in place (S4 moves nothing, height stays 1480) or remove it by hand — never delete a section from this skill without being asked.`);
    }
    emit(
      {
        mode: "month",
        gate,
        slug: null,
        month: geo.month,
        sectionName: geo.sectionName,
        year: geo.year,
        columnX: geo.columnX,
        orderedSlugs: geo.orderedSlugs,
        rows: geo.rows,
        sectionHeight: geo.sectionHeight,
        positions: geo.positions,
        vs: null,
        expectedSetId: IDS.coverSetId,
        allowNewColumn: args.allowNewColumn,
        dryRun: args.dryRun,
        grid: GRID,
        ids: IDS,
        coverProps: COVER_PROPS,
        suggestions,
        questions,
      },
      questions,
    );
    return;
  }

  // ── slug mode ──
  const slug = args.slug as string;
  const postFile = join(BLOG_DIR, `${slug}.md`);
  if (!existsSync(postFile)) {
    console.error(`no such post: ${postFile}`);
    process.exit(1);
  }
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    console.error(`post ${slug} not found in the blog collection`);
    process.exit(1);
  }

  const geo = monthGeometry(posts, post.month);
  const { sectionName, orderedSlugs, positions } = geo;
  const slotIndex = orderedSlugs.indexOf(post.slug);
  const siblings = parseSiblings(args, geo, post.slug, questions, suggestions);

  // Brand
  const inferredBrand = post.category === "kitaru" || post.tags.includes("kitaru") ? "Kitaru" : "ZenML";
  let brand = inferredBrand;
  if (args.brand) {
    if (args.brand !== "ZenML" && args.brand !== "Kitaru") {
      console.error(`--brand must be ZenML or Kitaru, got ${args.brand}`);
      process.exit(2);
    }
    brand = args.brand;
  }

  // Legal layout set given the siblings
  const isLaunch = LAUNCH_RE.test(post.title);
  const bySlug = new Map(siblings.map((s) => [s.slug, s]));
  const neighbourSlugs = [slotIndex - 1, slotIndex + 1, slotIndex - GRID.cols, slotIndex + GRID.cols]
    .filter((i) => i >= 0 && i < orderedSlugs.length)
    .map((i) => orderedSlugs[i])
    .filter((s) => s !== post.slug);
  const adjacentLayouts = new Set(neighbourSlugs.map((s) => bySlug.get(s)?.layout).filter((l): l is string => typeof l === "string"));
  // Only numbered photos count toward per-month uniqueness (A3). The target's own live cover
  // (a re-run) is excluded, otherwise every re-run would rotate to the next free photo.
  const usedPhotos = new Set(
    siblings
      .filter((s) => s.slug !== post.slug)
      .map((s) => s.bgStyle)
      .filter((b): b is string => typeof b === "string" && /^Photo 0[1-9]$/.test(b)),
  );

  const legalBgs: BgStyle[] = BG_STYLES.filter((b) => !usedPhotos.has(b));
  const legalLayouts: Layout[] = LAYOUT_PREFERENCE.filter((l) => {
    if (l === "Full Bleed" && !isLaunch) return false;
    if (adjacentLayouts.has(l)) return false;
    if (IMAGE_LAYOUTS.has(l) && !legalBgs.some((b) => IMAGE_LAYOUT_BGS.has(b))) return false;
    return true;
  });

  function bgsFor(layout: string): BgStyle[] {
    return IMAGE_LAYOUTS.has(layout) ? legalBgs.filter((b) => IMAGE_LAYOUT_BGS.has(b)) : legalBgs;
  }

  // Chosen layout (fallback, override, or first legal)
  const fallback = args.fallback ?? null;
  // A --comparison run builds the VS template: the cover-template headline budget, its derived-cut
  // note and the title-measure line estimate do not apply (E2E 2026-09-07 emitted an orphan
  // suggestion for a VS card that has no 800 px measure).
  const isVs = Boolean(args.comparison) && !fallback;
  let chosenLayout: string;
  if (fallback) {
    // The fallback rule is always Panel Bottom; an adjacency clash is reported, not asked (SKILL.md, Fallback rule).
    chosenLayout = FALLBACK_LAYOUT;
    if (!legalLayouts.includes(FALLBACK_LAYOUT)) {
      suggestions.push(`Fallback layout "${FALLBACK_LAYOUT}" is outside the legal set [${legalLayouts.join(", ")}] (adjacent layouts: ${[...adjacentLayouts].join(", ") || "none"}); the fallback rule overrides the adjacency rule — mention it in the report.`);
    }
  } else if (args.layout) {
    if (!(LAYOUTS as readonly string[]).includes(args.layout)) {
      console.error(`--layout must be one of ${LAYOUTS.join(", ")}`);
      process.exit(2);
    }
    chosenLayout = args.layout;
    if (!legalLayouts.includes(args.layout as Layout)) {
      questions.push(`--layout "${args.layout}" is outside the legal set [${legalLayouts.join(", ")}] (adjacent layouts: ${[...adjacentLayouts].join(", ") || "none"}; launch title: ${isLaunch}). Confirm the override?`);
    }
  } else if (legalLayouts.length > 0) {
    chosenLayout = legalLayouts[0];
  } else {
    chosenLayout = FALLBACK_LAYOUT;
    questions.push(`No layout satisfies the design rules for slot ${slotIndex} (adjacent layouts: ${[...adjacentLayouts].join(", ")}). Which layout should be used?`);
  }

  // Chosen background (override or first legal for the chosen layout)
  const bgCandidates = bgsFor(chosenLayout);
  let chosenBg: string;
  if (args.bg) {
    chosenBg = args.bg;
    if (!(BG_STYLES as readonly string[]).includes(args.bg)) {
      questions.push(`--bg "${args.bg}" is not a numbered Photo 01–09 or Mesh/Deep/Chevron/Field/Tint (the legacy un-numbered "Photo" is never used on new covers). Confirm?`);
    } else if (!bgCandidates.includes(args.bg as BgStyle)) {
      questions.push(`--bg "${args.bg}" is illegal with layout "${chosenLayout}" or already used this month (used photos: ${[...usedPhotos].join(", ") || "none"}). Confirm the override?`);
    }
  } else if (bgCandidates.length > 0) {
    chosenBg = bgCandidates[0];
  } else {
    chosenBg = "Mesh";
    questions.push(`No background is legal for layout "${chosenLayout}" this month (used photos: ${[...usedPhotos].join(", ")}). Which Style should be used?`);
  }

  // Headline / subtitle (copy rule A8). titleSource / subtitleSource are inputs only.
  // Subtitle is omitted by default: showSubtitle drives `Show subtitle#162:33` and S3 writes an
  // empty Subtitle whenever it is false.
  const warn = (msg: string): void => {
    console.error(`warning: ${msg}`);
    suggestions.push(msg);
  };
  const titleBudget = TITLE_BUDGET[chosenLayout as Layout] ?? 55;
  const headline = args.title?.trim() ?? shortenTitle(post.title, titleBudget);
  if (headline.length === 0) {
    console.error("--title must not be empty");
    process.exit(2);
  }
  if (isVs) {
    // VS card: budgets are checked on vs.title / the "for" line below.
  } else if (headline.length > titleBudget) {
    const msg = `Headline is ${headline.length} chars; the budget for layout "${chosenLayout}" is ${titleBudget} (about three lines). Shorten it faithfully — drop trailing clauses and questions, keep numbers and product names.`;
    if (args.title === undefined) questions.push(`${msg} Pass --title "<short title>".`);
    else warn(msg);
  } else if (args.title === undefined && headline !== post.title) {
    suggestions.push(`Headline derived from the title by dropping a trailing clause: "${headline}". Override with --title if a better faithful cut exists.`);
  }
  // Line-break estimate on the chosen layout's measure (E2E 2026-09-07: "Braintrust Pricing Guide"
  // set as "Braintrust Pricing / Guide" on Image Right's 800 px, an orphan the run only saw at S6).
  const titleMeasure = TITLE_MEASURE[chosenLayout as Layout] ?? TITLE_MEASURE.Text;
  const titleLines = estimateLines(headline, charsPerLine((chosenLayout as Layout) in TITLE_MEASURE ? (chosenLayout as Layout) : "Text"));
  const lastLine = titleLines[titleLines.length - 1] ?? "";
  const orphan = titleLines.length > 1 && !/\s/.test(lastLine);
  if (!isVs && (orphan || titleLines.length > 3)) {
    const wider = legalLayouts.find((l) => l !== chosenLayout && TITLE_MEASURE[l] > titleMeasure);
    const remedy = wider ? `A wider legal layout at this slot: --layout "${wider}" (${TITLE_MEASURE[wider]} px).` : "No wider layout is legal at this slot; re-cut the headline with --title.";
    const problem = orphan ? `leave "${lastLine}" alone on its last line` : `run to ${titleLines.length} lines`;
    suggestions.push(`Headline "${headline}" is likely to ${problem} in the ${titleMeasure} px measure of "${chosenLayout}" (estimate: ${JSON.stringify(titleLines)}; the S6 screenshot decides). ${remedy}`);
  }
  const subtitle = args.subtitle?.trim() ?? "";
  const showSubtitle = subtitle.length > 0;
  if (showSubtitle) {
    if (/[\r\n]/.test(subtitle)) questions.push("--subtitle must be a single line (no line breaks).");
    if (subtitle.length > SUBTITLE_MAX) warn(`Subtitle is ${subtitle.length} chars; the limit is ${SUBTITLE_MAX} (one line). Shorten it or drop it — the default is no subtitle.`);
    if (post.description && normalizeCopy(subtitle) === normalizeCopy(post.description)) {
      questions.push("--subtitle equals seo.description. The subtitle is written by the agent (one line ≤55 chars that adds something the title does not say); seo.description is input only, never copied onto the cover. Drop --subtitle or write a new one.");
    } else if (normalizeCopy(subtitle) === normalizeCopy(headline) || normalizeCopy(headline).includes(normalizeCopy(subtitle))) {
      questions.push("--subtitle restates the headline. Keep a subtitle only when it adds something the title does not say; otherwise drop it.");
    }
  }
  if (isLaunch && chosenLayout !== "Full Bleed") suggestions.push("Launch-style title: consider --layout 'Full Bleed'.");

  // Comparison (VS template)
  let comparison: Array<{ slug: string; key: string | null }> | null = null;
  let vs: Record<string, unknown> | null = null;
  if (COMPARISON_RE.test(post.title) && !args.comparison && !fallback) {
    suggestions.push("Title looks like a comparison post: consider --comparison <competitor-slug,...> to use the VS template.");
  }
  if (args.comparison && fallback) {
    suggestions.push(`--fallback given: --comparison (${args.comparison}) is ignored and a Blog Cover / 16:9 with Layout "${FALLBACK_LAYOUT}" is built instead.`);
  }
  if (args.comparison && !fallback) {
    const slugs = args.comparison.split(",").map((s) => s.trim()).filter(Boolean);
    if (slugs.length < 1 || slugs.length > 10) {
      console.error("--comparison takes 1–10 competitor slugs");
      process.exit(2);
    }
    const keyTableLines = readKeyTableLines(questions);
    const keys = readLogoKeys(keyTableLines);
    const aliases = readAliases(keyTableLines);
    comparison = slugs.map((s) => {
      const canonical = aliases.get(s) ?? s;
      return { slug: s, canonical, key: keys.get(canonical) ?? keys.get(s) ?? null };
    });
    const resolvedAliases = slugs.filter((s) => aliases.has(s) && aliases.get(s) !== s);
    if (resolvedAliases.length > 0) {
      suggestions.push(`Resolved via references/service-logo-keys.md Aliases: ${resolvedAliases.map((s) => `${s} -> ${aliases.get(s)}`).join(", ")}.`);
    }
    const missing = comparison.filter((c) => c.key === null).map((c) => (c.canonical !== c.slug ? `${c.slug} (aliased to ${c.canonical}, no key for either)` : c.slug));
    if (missing.length > 0) {
      questions.push(`No ServiceLogo key for: ${missing.join(", ")}. If the mark belongs to a parent brand under a different slug, add a row to the Aliases section of references/service-logo-keys.md instead of minting a duplicate mark. Otherwise read mainComponent.key off an existing ServiceLogo/<slug> instance in the file, or exact-name-match "ServiceLogo/<slug>" via get_libraries/search_design_system (fuzzy matches rejected); append new keys to references/service-logo-keys.md. Otherwise re-run find-slot with --fallback "<reason>" (Panel Bottom cover) and report it.`);
    }
    const includeZenml = args.includeZenml ?? "True";
    if (includeZenml !== "True" && includeZenml !== "False") {
      console.error("--include-zenml must be True or False");
      process.exit(2);
    }
    // Swap batches: ≤7 swaps per use_figma call (s3-vs-comparison.js). [start, end) tile indices.
    const tileBatches: Array<[number, number]> = [];
    for (let start = 0; start < slugs.length; start += MAX_SWAPS_PER_CALL) {
      tileBatches.push([start, Math.min(start + MAX_SWAPS_PER_CALL, slugs.length)]);
    }
    const tileBatch = Number(args.tileBatch ?? "0");
    if (!Number.isInteger(tileBatch) || tileBatch < 0 || tileBatch >= tileBatches.length) {
      console.error(`--tile-batch must be 0..${tileBatches.length - 1} for ${slugs.length} competitors`);
      process.exit(2);
    }
    if (tileBatches.length > 1) suggestions.push(`Count ${slugs.length} needs ${tileBatches.length} S3-vs calls: re-run find-slot with --tile-batch 0..${tileBatches.length - 1} and run s3-vs-comparison.js once per P (this P carries batch ${tileBatch}).`);
    // Headline = `<N> <Competitor> Alternatives` (the pattern of the live cards): N counts the
    // competitor tiles plus the brand tile, the competitor comes from the title ("8 Best Braintrust
    // Alternatives for …" → "8 Braintrust Alternatives"; "We Tested and Reviewed the 7 Best
    // Trigger.dev Alternatives to …" → "7 Trigger.dev Alternatives"). Sub-line = "for " + the part
    // of the title after " for ". --title / --subtitle override the two parts (--subtitle here is
    // the qualifier after "for "). A title that does not fit the pattern falls back to the cut
    // before " for " (or a punctuation cut) and the agent is asked to pass --title.
    const n = slugs.length + (includeZenml === "True" ? 1 : 0);
    const altMatch = post.title.match(/\b(\d+)\s+(?:best\s+)?(.+?)\s+alternatives\b/i);
    if (altMatch && Number(altMatch[1]) !== n) {
      suggestions.push(`The title counts ${altMatch[1]} alternatives; --comparison lists ${slugs.length} competitor(s)${includeZenml === "True" ? " plus the brand tile" : ""} = ${n}, which the headline uses. Check the competitor list before S3.`);
    }
    const forIdx = post.title.search(/\sfor\s/i);
    const derivedVsTitle = altMatch ? `${n} ${altMatch[2]} Alternatives` : forIdx > 0 ? post.title.slice(0, forIdx).trim() : shortenTitle(post.title, VS_TITLE_MAX);
    if (!altMatch && args.title === undefined) suggestions.push(`Title does not match "<N> <Competitor> Alternatives"; derived "${derivedVsTitle}". Pass --title "<N> <Competitor> Alternatives" for the documented VS headline.`);
    const vsTitle = args.title?.trim() ?? derivedVsTitle;
    const vsRest = args.subtitle?.trim() ?? (forIdx > 0 ? post.title.slice(forIdx + 5).trim() : "");
    const forLine = `for ${vsRest}`;
    if (!vsRest) suggestions.push("Could not derive the VS sub-line from the title; pass --subtitle '<rest>' (rendered as 'for <rest>').");
    if (vsTitle.length > VS_TITLE_MAX) warn(`VS title is ${vsTitle.length} chars; the limit is ${VS_TITLE_MAX} (e.g. "8 Braintrust Alternatives"). Pass a shorter --title.`);
    if (vsRest && forLine.length > VS_FOR_LINE_MAX) warn(`VS "for" line is ${forLine.length} chars ("${forLine}"); the limit is ${VS_FOR_LINE_MAX}. Pass a shorter --subtitle.`);
    vs = {
      name: post.slug,
      sectionName,
      brand,
      count: String(slugs.length),
      includeZenml,
      title: vsTitle,
      subtitleLead: "for ",
      subtitleRest: vsRest,
      tiles: comparison.map((c, index) => ({ index, slug: c.slug, key: c.key })),
      tileBatches,
      tileBatch,
      tileRange: tileBatches[tileBatch],
    };
  }

  emit(
    {
      mode: "slug",
      gate,
      slug: post.slug,
      titleSource: post.title,
      subtitleSource: post.description,
      titleBudget,
      titleMeasure,
      titleLines,
      headline,
      subtitle,
      showSubtitle,
      eyebrow: "BLOG",
      brand,
      date: post.date,
      month: geo.month,
      sectionName,
      year: geo.year,
      columnX: geo.columnX,
      orderedSlugs,
      slotIndex,
      rows: geo.rows,
      sectionHeight: geo.sectionHeight,
      positions,
      chosenLayout,
      chosenBg,
      vs,
      expectedSetId: comparison ? IDS.vsSetId : IDS.coverSetId,
      fallback,
      allowNewColumn: args.allowNewColumn,
      dryRun: args.dryRun,
      grid: GRID,
      ids: IDS,
      coverProps: COVER_PROPS,
      suggestions,
      questions,
    },
    questions,
  );
}

main();
