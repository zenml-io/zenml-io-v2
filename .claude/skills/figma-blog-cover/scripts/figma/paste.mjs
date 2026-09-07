// paste.mjs — write one runnable use_figma script: the s*.js body with find-slot's P pasted in.
//   node .claude/skills/figma-blog-cover/scripts/figma/paste.mjs <s*.js> <P.json> <out.js>
// Every E2E run so far hand-wrote this helper; ship it so a run needs no improvisation.
// Replaces the single `const P = __PARAMS__;` line with the JSON object verbatim (keys untouched)
// and refuses anything else: a missing/duplicated marker, a P.json that is not one JSON object, or a
// P that still carries questions (find-slot exit 3 — surface them and stop, never paste them through).
import { readFileSync, writeFileSync } from "node:fs";

const [, , script, pjson, out] = process.argv;
if (!script || !pjson || !out) {
  console.error("usage: paste.mjs <s*.js> <P.json> <out.js>");
  process.exit(2);
}
const MARKER = "const P = __PARAMS__;";
const src = readFileSync(script, "utf8");
const hits = src.split(MARKER).length - 1;
if (hits !== 1) {
  console.error(`${script}: expected exactly one \`${MARKER}\`, found ${hits}`);
  process.exit(1);
}
const raw = readFileSync(pjson, "utf8").trim();
let P;
try {
  P = JSON.parse(raw);
} catch (e) {
  console.error(`${pjson} is not valid JSON: ${e.message}`);
  process.exit(1);
}
if (P === null || typeof P !== "object" || Array.isArray(P)) {
  console.error(`${pjson} must hold one JSON object (find-slot.ts output)`);
  process.exit(1);
}
if (Array.isArray(P.questions) && P.questions.length > 0) {
  console.error(`${pjson} carries ${P.questions.length} question(s) — answer them and re-run find-slot before pasting:\n- ${P.questions.join("\n- ")}`);
  process.exit(3);
}
writeFileSync(out, src.replace(MARKER, `const P = ${JSON.stringify(P, null, 2)};`));
console.log(`${out}: ${script} + ${pjson} (${P.mode ?? "?"} P${P.slug ? ` for ${P.slug}` : ""}, section "${P.sectionName ?? "?"}")`);
