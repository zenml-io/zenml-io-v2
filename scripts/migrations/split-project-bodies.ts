/**
 * split-project-bodies.ts — one-off content migration.
 *
 * The project detail page used to split each Markdown body at build time into
 * three parts: the `####` headings before a `#### Stack Components` marker
 * (sidebar "Pipelines"), the `<ul>` that follows the marker (sidebar
 * "Recommended Stack"), and everything after it (the "Details" column). This
 * runs that split once and writes the two sidebar parts into frontmatter, so
 * the body left in the file is the details section alone.
 *
 * `splitBody` below is the page's parser as it stood, unchanged apart from
 * also returning the details Markdown the page used to convert immediately.
 * It has already run: every entry now trips the already-migrated guard, so
 * the function is a record of how the 16 bodies were split, not a live path.
 *
 * Frontmatter is edited as text rather than re-serialised: re-dumping the YAML
 * would restyle every quoted scalar in all 16 files and bury the two added
 * keys in the noise.
 *
 * Usage: pnpm exec tsx scripts/migrations/split-project-bodies.ts [--dry-run]
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = "src/content/projects";

interface Pipeline {
  name: string;
  description?: string;
}

function splitBody(body: string): {
  pipelines: Pipeline[];
  stackHtml: string;
  detailsRaw: string;
} {
  const pipelines: Pipeline[] = [];
  let stackHtml = "";
  let detailsRaw = "";

  // Find the Stack Components marker
  const stackIdx = body.indexOf("#### Stack Components");

  if (stackIdx === -1) {
    // No pipelines/stack section — entire body is details
    return {
      pipelines: [],
      stackHtml: "",
      detailsRaw: body.trim(),
    };
  }

  // Everything before Stack Components is pipeline entries
  const pipelinesRaw = body.substring(0, stackIdx);
  const pipelineRegex = /####\s+(.+)\n\n([\s\S]*?)(?=####|\s*$)/g;
  let match: RegExpExecArray | null = pipelineRegex.exec(pipelinesRaw);
  while (match !== null) {
    const description = match[2].trim();
    // Written form omits an empty description, so the comparison side must too.
    pipelines.push(description ? { name: match[1].trim(), description } : { name: match[1].trim() });
    match = pipelineRegex.exec(pipelinesRaw);
  }

  // Extract stack HTML (<ul>...</ul>) and everything after it
  const afterStack = body.substring(stackIdx);
  const ulStart = afterStack.indexOf("<ul>");
  const ulEnd = afterStack.indexOf("</ul>");

  if (ulStart !== -1 && ulEnd !== -1) {
    stackHtml = afterStack.substring(ulStart, ulEnd + 5);
    detailsRaw = afterStack.substring(ulEnd + 5).trim();
  } else {
    // No <ul> found — rest is details
    detailsRaw = afterStack.replace(/####\s+Stack Components\s*/, "").trim();
  }

  return { pipelines, stackHtml, detailsRaw };
}

/**
 * A YAML double-quoted scalar. JSON's escape rules are a subset of YAML's for
 * these values, and double quotes are the style the collection already uses.
 */
function yamlString(value: string): string {
  return JSON.stringify(value);
}

function renderAddedKeys(pipelines: Pipeline[], stackHtml: string): string {
  const lines: string[] = [];
  if (pipelines.length > 0) {
    lines.push("pipelines:");
    for (const pipeline of pipelines) {
      lines.push(`  - name: ${yamlString(pipeline.name)}`);
      if (pipeline.description) {
        lines.push(`    description: ${yamlString(pipeline.description)}`);
      }
    }
  }
  if (stackHtml) {
    lines.push(`stackHtml: ${yamlString(stackHtml)}`);
  }
  return lines.length > 0 ? `${lines.join("\n")}\n` : "";
}

/**
 * Splits a file into its frontmatter text and its body, so the frontmatter can
 * be edited in place. Mirrors gray-matter's own delimiter handling.
 */
function splitFile(raw: string): { frontmatter: string; body: string } {
  if (!raw.startsWith("---\n")) {
    throw new Error("file does not open with a frontmatter delimiter");
  }
  const end = raw.indexOf("\n---\n", 3);
  if (end === -1) {
    throw new Error("file has no closing frontmatter delimiter");
  }
  return {
    frontmatter: raw.slice(4, end + 1),
    body: raw.slice(end + 5),
  };
}

/** Inserts the new keys before the top-level `seo:` block, or at the end. */
function insertKeys(frontmatter: string, added: string): string {
  if (!added) return frontmatter;
  const seoIdx = frontmatter.search(/^seo:$/m);
  if (seoIdx === -1) return frontmatter + added;
  return frontmatter.slice(0, seoIdx) + added + frontmatter.slice(seoIdx);
}

const dryRun = process.argv.includes("--dry-run");
const files = readdirSync(CONTENT_DIR)
  .filter((name) => name.endsWith(".md"))
  .sort();

let failures = 0;

for (const name of files) {
  const path = join(CONTENT_DIR, name);
  let raw: string;
  let frontmatter: string;
  let body: string;
  try {
    raw = readFileSync(path, "utf8");
    ({ frontmatter, body } = splitFile(raw));
  } catch (error) {
    console.error(`❌ ${name}: ${(error as Error).message}`);
    failures += 1;
    continue;
  }

  // Already migrated: the body has no marker left to split, so a second pass
  // would compare an empty split against the frontmatter it wrote last time
  // and report a mismatch that means nothing. An entry that never had a marker
  // writes neither key, so it is re-processed instead — harmless, since its
  // whole body is the details section either way.
  const existing = matter(raw).data;
  if (existing.pipelines !== undefined || existing.stackHtml !== undefined) {
    console.log(`↷ ${name}: already migrated`);
    continue;
  }

  const expected = splitBody(matter(raw).content);

  if (body.trim() !== matter(raw).content.trim()) {
    console.error(`❌ ${name}: body extraction disagrees with gray-matter`);
    failures += 1;
    continue;
  }

  const added = renderAddedKeys(expected.pipelines, expected.stackHtml);
  const next = `---\n${insertKeys(frontmatter, added)}---\n\n${expected.detailsRaw}\n`;

  // Round-trip: re-read the written form and assert it reproduces the split.
  const parsed = matter(next);
  const pipelinesOk =
    JSON.stringify(parsed.data.pipelines ?? []) ===
    JSON.stringify(expected.pipelines);
  const stackOk = (parsed.data.stackHtml ?? "") === expected.stackHtml;
  const detailsOk = parsed.content.trim() === expected.detailsRaw;

  if (!pipelinesOk || !stackOk || !detailsOk) {
    console.error(
      `❌ ${name}: round-trip mismatch (pipelines=${pipelinesOk} stack=${stackOk} details=${detailsOk})`,
    );
    failures += 1;
    continue;
  }

  console.log(
    `✅ ${name}: ${expected.pipelines.length} pipeline(s), stack ${
      expected.stackHtml.length
    } chars, details ${expected.detailsRaw.length} chars`,
  );
  if (!dryRun) writeFileSync(path, next, "utf8");
}

if (failures > 0) {
  console.error(`\n${failures} file(s) failed — nothing was written for them.`);
  process.exit(1);
}
console.log(`\n${files.length} file(s) ${dryRun ? "checked" : "migrated"}.`);
