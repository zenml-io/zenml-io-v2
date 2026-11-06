/**
 * render-cover.ts — make a blog cover without Figma.
 *
 * Usage (from any cwd):
 *   pnpm exec tsx .claude/skills/figma-blog-cover/scripts/render-cover.ts <slug> \
 *     [--layout <Layout>] [--bg <Style>] [--brand ZenML|Kitaru] [--logo "ZenML Labs"] \
 *     [--eyebrow "DEEP DIVE"] [--title <headline>] [--subtitle <text>] [--no-subtitle] [--fallback "<reason>"]
 *
 *   ... render-cover.ts <slug> --record --layout <Layout> --bg <Style> --brand <Brand>
 *     Writes the manifest row only, for a cover made on the Figma route.
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

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(SCRIPT_DIR, "../../../..");
const MANIFEST = resolve(SCRIPT_DIR, "../assets/cover-manifest.json");
const OUT_DIR = join(REPO, ".cache/covers");

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
  vs: unknown;
  suggestions: string[];
  questions: string[];
}

function record(plan: Plan, layout: string, bg: string): void {
  const rows = JSON.parse(readFileSync(MANIFEST, "utf8")) as Record<string, string>[];
  const row = { slug: plan.slug, month: plan.month, brand: plan.brand, layout, bgStyle: bg };
  const next = [...rows.filter((r) => r.slug !== plan.slug), row].sort((a, b) => a.month.localeCompare(b.month) || a.slug.localeCompare(b.slug));
  writeFileSync(MANIFEST, `[\n${next.map((r) => JSON.stringify(r)).join(",\n")}\n]\n`);
}

function planCover(slug: string, flags: string[]): Plan {
  const run = spawnSync(process.execPath, ["--import", "tsx", join(SCRIPT_DIR, "find-slot.ts"), slug, "--renderer", "code", ...flags], {
    cwd: REPO,
    encoding: "utf8",
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
const plan = planCover(slug, rest.filter((a) => a !== "--record"));

if (recordOnly) {
  record(plan, plan.chosenLayout, plan.chosenBg);
  console.log(`recorded ${slug}: ${plan.chosenLayout}, ${plan.chosenBg}`);
  process.exit(0);
}
if (plan.vs) {
  console.error('VS cards need the Figma template. Without Figma, re-run with --fallback "<reason>" instead of --comparison for a Panel Bottom cover.');
  process.exit(1);
}

const renderer = await CoverRenderer.open();
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
    mkdirSync(OUT_DIR, { recursive: true });
    const png = join(OUT_DIR, `${slug}.png`);
    writeFileSync(png, await renderer.render(chosen.spec));
    record(plan, chosen.spec.layout, chosen.spec.bg);
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
