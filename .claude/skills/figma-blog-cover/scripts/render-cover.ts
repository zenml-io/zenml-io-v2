/**
 * render-cover.ts — make a blog cover without Figma.
 *
 * Usage (from any cwd):
 *   pnpm exec tsx .claude/skills/figma-blog-cover/scripts/render-cover.ts <slug> \
 *     [--layout <Layout>] [--bg <Style>] [--brand ZenML|Kitaru] [--logo "ZenML Labs"] \
 *     [--eyebrow "DEEP DIVE"] [--title <headline>] [--subtitle <text>] [--no-subtitle] [--fallback "<reason>"]
 *
 *   ... render-cover.ts <slug> --comparison a,b,c [--brand ZenML|Kitaru] [--include-zenml True|False]
 *     Makes a VS card. Long copy adapts: smaller type, then no derived for-line, then a two-line headline.
 *
 *   ... render-cover.ts <slug> --record --layout <Layout> --bg <Style> --brand <Brand>
 *   ... render-cover.ts <slug> --record --comparison a,b,c
 *     Writes the manifest row only, for a cover or VS card made on the Figma route.
 *
 * --dry-run does everything except write the PNG and the manifest.
 *
 * Every flag goes to find-slot.ts, which applies the design rules. This script then measures the
 * real lines in Chromium, moves to the next legal layout when the copy does not hold, writes
 * .cache/covers/<slug>.png at 3840 x 2160 and records the cover in assets/cover-manifest.json, so
 * the next cover sees it. Exit 3 = find-slot has questions; exit 1 = no legal layout holds the copy.
 *
 * Needs Chromium once: pnpm exec playwright install chromium
 */

import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CoverRenderer, copyProblems, type Brand, type CoverSpec, type Layout, type Logo, type Measured } from "./lib/cover-renderer";
import type { VsFit, VsSpec } from "./lib/vs-card";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(SCRIPT_DIR, "../../../..");
const MANIFEST = resolve(process.env.COVER_MANIFEST ?? join(SCRIPT_DIR, "../assets/cover-manifest.json"));
const OUT_DIR = resolve(process.env.COVER_OUT_DIR ?? join(REPO, ".cache/covers"));

interface Plan {
  slug: string;
  month: string;
  brand: Brand;
  logo: Logo;
  eyebrow: string;
  subtitle: string;
  showSubtitle: boolean;
  chosenLayout: Layout;
  chosenBg: string;
  layoutOptions: { layout: Layout; bg: string; headline: string; repeatsNeighbour?: boolean }[];
  vs: { brand: Brand; includeZenml: string; title: string; subtitleRest: string; tiles: { logo: string }[] } | null;
  suggestions: string[];
  questions: string[];
}

function record(plan: Plan, row: Record<string, string>): void {
  const rows = JSON.parse(readFileSync(MANIFEST, "utf8")) as Record<string, string>[];
  const next = [...rows.filter((r) => r.slug !== plan.slug), { slug: plan.slug, month: plan.month, ...row }].sort((a, b) => a.month.localeCompare(b.month) || a.slug.localeCompare(b.slug));
  writeFileSync(MANIFEST, `[\n${next.map((r) => JSON.stringify(r)).join(",\n")}\n]\n`);
}

function planCover(slug: string, flags: string[]): Plan {
  const run = spawnSync(process.execPath, ["--import", "tsx", join(SCRIPT_DIR, "find-slot.ts"), slug, "--renderer", "code", ...flags], {
    cwd: REPO,
    encoding: "utf8",
    env: { ...process.env, COVER_MANIFEST: MANIFEST },
  });
  if (run.stderr) process.stderr.write(run.stderr);
  if (run.status !== 0 && run.status !== 3) process.exit(run.status ?? 1);
  const plan = JSON.parse(run.stdout) as Plan;
  if (plan.questions.length > 0) {
    for (const q of plan.questions) console.error(`question: ${q}`);
    process.exit(3);
  }
  return plan;
}

const [slug, ...rest] = process.argv.slice(2);
if (!slug || slug.startsWith("--")) {
  console.error("usage: render-cover.ts <slug> [find-slot flags] [--record]");
  process.exit(2);
}
const recordOnly = rest.includes("--record");
const dryRun = rest.includes("--dry-run");
const plan = planCover(slug, rest.filter((a) => a !== "--record"));

if (recordOnly) {
  if (!plan.vs && !(rest.includes("--layout") && rest.includes("--bg"))) {
    console.error("--record needs the --layout and --bg the cover uses, or --comparison for a VS card.");
    process.exit(2);
  }
  const row: Record<string, string> = plan.vs ? { layout: "VS" } : { brand: plan.brand, layout: plan.chosenLayout, bgStyle: plan.chosenBg };
  if (!dryRun) record(plan, row);
  console.log(`${dryRun ? "would record" : "recorded"} ${slug}: ${row.layout}${row.bgStyle ? `, ${row.bgStyle}` : ""}`);
  process.exit(0);
}

/** Largest type that fits; a derived for-line goes before the card fails, an explicit one never does. */
async function renderVsCard(renderer: CoverRenderer, vs: NonNullable<Plan["vs"]>): Promise<void> {
  const spec: VsSpec = {
    brand: vs.brand,
    includeBrandTile: vs.includeZenml === "True",
    logos: vs.tiles.map((t) => t.logo),
    title: vs.title,
    qualifier: rest.includes("--no-subtitle") ? "" : vs.subtitleRest,
  };
  let fit: VsFit | null = await renderer.fitVs(spec);
  const notes: string[] = [];
  if (!fit && spec.qualifier && !rest.includes("--subtitle")) {
    notes.push(`Dropped "for ${spec.qualifier}": it does not fit next to the logo.`);
    spec.qualifier = "";
    fit = await renderer.fitVs(spec);
  }
  if (!fit && !spec.qualifier) {
    spec.wrapTitle = true;
    fit = await renderer.fitVs(spec);
    if (fit) notes.push("The headline wraps to two lines: it does not fit on one.");
  }
  if (!fit) {
    console.error("This copy does not fit next to the logo at the smallest size. Shorten it with --title or --subtitle.");
    process.exitCode = 1;
    return;
  }
  if (fit.step[0] !== 72) notes.push(`Type stepped down to ${fit.step[0]}/${fit.step[1]} so the copy clears the logo.`);
  const png = dryRun ? null : join(OUT_DIR, `${slug}.png`);
  if (png) {
    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(png, await renderer.renderVs(spec, fit.step));
    record(plan, { layout: "VS" });
  }
  console.log(JSON.stringify({ slug, png, brand: spec.brand, layout: "VS", title: spec.title, forLine: spec.qualifier ? `for ${spec.qualifier}` : "", typeSizes: fit.step, tiles: spec.logos, suggestions: [...plan.suggestions, ...notes] }, null, 2));
}

const renderer = await CoverRenderer.open();
if (plan.vs) {
  try {
    await renderVsCard(renderer, plan.vs);
  } finally {
    await renderer.close();
  }
  process.exit();
}
try {
  const subtitle = plan.showSubtitle ? plan.subtitle : "";
  const tried: string[] = [];
  let chosen: { spec: CoverSpec; measured: Measured; repeatsNeighbour: boolean } | null = null;
  for (const option of plan.layoutOptions) {
    const spec: CoverSpec = { brand: plan.brand, layout: option.layout, bg: option.bg, logo: plan.logo, eyebrow: plan.eyebrow, title: option.headline, subtitle };
    const measured = await renderer.measure(spec);
    const problems = copyProblems(option.layout, measured);
    if (problems.length === 0) {
      chosen = { spec, measured, repeatsNeighbour: option.repeatsNeighbour === true };
      break;
    }
    tried.push(`${option.layout}: ${problems.join("; ")}`);
  }
  if (!chosen) {
    console.error(`No legal layout holds this copy. Shorten it with --title or --subtitle.\n  ${tried.join("\n  ")}`);
    process.exitCode = 1;
  } else {
    const png = dryRun ? null : join(OUT_DIR, `${slug}.png`);
    if (png) {
      mkdirSync(OUT_DIR, { recursive: true });
      writeFileSync(png, await renderer.render(chosen.spec));
      record(plan, { brand: plan.brand, layout: chosen.spec.layout, bgStyle: chosen.spec.bg });
    }
    console.log(
      JSON.stringify(
        {
          slug,
          png,
          brand: plan.brand,
          logo: plan.logo,
          layout: chosen.spec.layout,
          bg: chosen.spec.bg,
          eyebrow: plan.eyebrow,
          titleLines: chosen.measured.titleLines,
          subtitleLines: chosen.measured.subtitleLines,
          movedFrom: tried,
          suggestions: [...plan.suggestions, ...(chosen.repeatsNeighbour ? [`${chosen.spec.layout} repeats a neighbour's layout: no other legal layout holds this copy.`] : [])],
        },
        null,
        2,
      ),
    );
  }
} finally {
  await renderer.close();
}
