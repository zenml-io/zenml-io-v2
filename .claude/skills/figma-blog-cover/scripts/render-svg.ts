/**
 * render-svg.ts — render one or more candidate SVGs to PNG so they can actually be looked at.
 *
 * Usage:
 *   pnpm exec tsx .claude/skills/figma-blog-cover/scripts/render-svg.ts <in.svg> [out.png]
 *   pnpm exec tsx .claude/skills/figma-blog-cover/scripts/render-svg.ts <in1.svg> <in2.svg> [...]
 *
 * Single-file mode (exactly one input, optionally with an explicit output path) behaves exactly
 * as before: prints one JSON object, exits non-zero on any failure. Multi-file mode (two or more
 * arguments, all ending in .svg — an explicit .png output isn't meaningful when there's more than
 * one input) renders every input to a same-directory, same-basename .png and prints a JSON array,
 * one entry per input (`{in, out, injectedSize, bytes}` on success, `{in, error}` on failure) —
 * one bad candidate does not stop the others from rendering. Exit code is non-zero only when
 * every input in the batch failed.
 *
 * Used by source-mark.sh (one call for the whole candidate batch) and standalone for a quick
 * look at any SVG. Renders at a fixed 256px width via @resvg/resvg-js's `fitTo` (repo dep, also
 * used by the monorepo's normalize-service-logo.mjs) regardless of the source's own width/height
 * — several real sources (LobeHub) ship `width="1em" height="1em"`, which fitTo overrides anyway.
 * When the root <svg> has NEITHER a width NOR a height attribute at all, this also injects
 * width="256" height="256" into the tag before rendering, so the saved file itself carries a
 * usable size for any other viewer, not just this script.
 *
 * Background is a light gray (#f5f5f5, same as the monorepo preview) so a mark that is mostly
 * white or mostly black ink is still visible against it.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join, basename, extname } from "node:path";
import { Resvg } from "@resvg/resvg-js";

interface RenderResult {
  in: string;
  out: string;
  injectedSize: boolean;
  bytes: number;
}

function renderOne(inArg: string, outArg?: string): RenderResult {
  const inPath = resolve(inArg);
  const outPath = resolve(outArg || join(dirname(inPath), `${basename(inPath, extname(inPath))}.png`));

  let svg: string;
  try {
    svg = readFileSync(inPath, "utf8");
  } catch (e) {
    throw new Error(`could not read ${inPath}: ${(e as Error).message}`);
  }

  const openMatch = svg.match(/<svg\b[^>]*>/i);
  if (!openMatch) {
    throw new Error(`${inPath}: no <svg ...> root tag found`);
  }
  const openTag = openMatch[0];
  const hasWidth = /\swidth\s*=/i.test(openTag);
  const hasHeight = /\sheight\s*=/i.test(openTag);
  let injectedSize = false;
  if (!hasWidth && !hasHeight) {
    const patched = openTag.replace(/^<svg\b/i, '<svg width="256" height="256"');
    svg = svg.slice(0, openMatch.index!) + patched + svg.slice(openMatch.index! + openTag.length);
    injectedSize = true;
  }

  let png: Buffer;
  try {
    const rendered = new Resvg(svg, {
      fitTo: { mode: "width", value: 256 },
      background: "#f5f5f5",
    }).render();
    png = rendered.asPng();
  } catch (e) {
    throw new Error(`${inPath}: resvg could not render this SVG — ${(e as Error).message}`);
  }

  writeFileSync(outPath, png);
  return { in: inPath, out: outPath, injectedSize, bytes: png.length };
}

const argv = process.argv.slice(2);
if (argv.length === 0) {
  console.error("usage: render-svg.ts <in.svg> [out.png]\n   or: render-svg.ts <in1.svg> <in2.svg> [...]");
  process.exit(2);
}

const isMultiFile = argv.length > 1 && argv.every((a) => /\.svg$/i.test(a));

if (!isMultiFile) {
  // Single-file mode — unchanged behaviour: one input, an optional explicit output path.
  const [inArg, outArg] = argv;
  try {
    const result = renderOne(inArg, outArg);
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error((e as Error).message);
    process.exit(1);
  }
} else {
  // Multi-file mode — every argument is an input SVG; outputs are always auto-derived so a
  // failure in one candidate doesn't block the rest of the batch.
  const results: Array<RenderResult | { in: string; error: string }> = [];
  let okCount = 0;
  for (const inArg of argv) {
    try {
      const result = renderOne(inArg);
      results.push(result);
      okCount++;
    } catch (e) {
      const message = (e as Error).message;
      console.error(message);
      results.push({ in: resolve(inArg), error: message });
    }
  }
  console.log(JSON.stringify(results, null, 2));
  if (okCount === 0) process.exit(1);
}
