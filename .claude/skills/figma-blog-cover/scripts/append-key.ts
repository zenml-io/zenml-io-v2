/**
 * append-key.ts — record one `ServiceLogo/<slug>` component key in references/service-logo-keys.md.
 *
 * Usage:
 *   pnpm exec tsx .claude/skills/figma-blog-cover/scripts/append-key.ts <slug> <key>
 *
 * Idempotent: a slug already in the table with the SAME key is a no-op; the SAME slug with a
 * DIFFERENT key updates it in place (printed as a warning — a key changing for an existing slug is
 * unusual and worth noticing, not silently swallowed); a new slug is inserted keeping the table
 * sorted by slug, same as the existing 28 rows. Only the markdown table rows are touched — the
 * header/separator and every line of prose above and below the table are left byte-for-byte.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [, , slug, key] = process.argv;
if (!slug || !key) {
  console.error("usage: append-key.ts <slug> <key>");
  process.exit(2);
}
// keep in sync with find-slot.ts's readLogoKeys/readAliases slug and key patterns
if (!/^[a-z0-9][a-z0-9.-]*$/.test(slug)) {
  console.error(`slug "${slug}" must match ^[a-z0-9][a-z0-9.-]*$`);
  process.exit(2);
}
if (!/^[0-9a-f]{40}$/.test(key)) {
  console.error(`key "${key}" doesn't look like a Figma component key (expected 40 lowercase hex chars)`);
  process.exit(2);
}

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const TABLE_PATH = join(SCRIPT_DIR, "..", "references", "service-logo-keys.md");
const src = readFileSync(TABLE_PATH, "utf8");
const lines = src.split("\n");

// keep in sync with find-slot.ts's readLogoKeys slug/key patterns
const ROW_RE = /^\|\s*([a-z0-9][a-z0-9.-]*)\s*\|\s*([0-9a-f]{40})\s*\|\s*$/;
const headerIdx = lines.findIndex((l) => /^\|\s*slug\s*\|\s*key\s*\|\s*$/i.test(l));
if (headerIdx === -1) {
  console.error(`${TABLE_PATH}: no "| slug | key |" header found — table format changed, fix by hand`);
  process.exit(1);
}
const sepIdx = headerIdx + 1;
if (!/^\|[-\s|]+\|$/.test(lines[sepIdx] ?? "")) {
  console.error(`${TABLE_PATH}: no "|---|---|" separator row right after the header (line ${headerIdx + 1})`);
  process.exit(1);
}

let rowEnd = sepIdx + 1;
const rows: Array<{ slug: string; key: string }> = [];
while (rowEnd < lines.length && ROW_RE.test(lines[rowEnd])) {
  const m = lines[rowEnd].match(ROW_RE)!;
  rows.push({ slug: m[1], key: m[2] });
  rowEnd++;
}

const existing = rows.find((r) => r.slug === slug);
if (existing && existing.key === key) {
  console.log(`${slug} already recorded with key ${key} — no change`);
  process.exit(0);
}
if (existing) {
  console.warn(`WARN: ${slug} was recorded with key ${existing.key}, updating to ${key}`);
  existing.key = key;
} else {
  rows.push({ slug, key });
}
rows.sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));

const newRowLines = rows.map((r) => `| ${r.slug} | ${r.key} |`);
const out = [...lines.slice(0, sepIdx + 1), ...newRowLines, ...lines.slice(rowEnd)].join("\n");
writeFileSync(TABLE_PATH, out);
console.log(`${TABLE_PATH}: ${existing ? "updated" : "added"} ${slug} -> ${key} (${rows.length} rows)`);
