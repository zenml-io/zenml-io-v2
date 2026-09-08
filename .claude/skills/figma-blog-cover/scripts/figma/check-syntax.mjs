// check-syntax.mjs — syntax-check the s*.js / m*.js sandbox scripts.
// They use top-level `await` and `return` because use_figma wraps each script in an async
// function body (loaded figma-use skill, rule 2), so `node --check` rejects them. This compiles
// every s*.js / m*.js the same way: as the body of an async function, with __PARAMS__ stubbed.
//   node .claude/skills/figma-blog-cover/scripts/figma/check-syntax.mjs
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
let failed = 0;
for (const file of readdirSync(dir).filter((f) => /^[sm]\d.*\.js$/.test(f)).sort()) {
  const src = readFileSync(join(dir, file), "utf8");
  const problems = [];
  if (!src.includes("const P = __PARAMS__;")) problems.push("missing `const P = __PARAMS__;`");
  const switches = src.match(/setCurrentPageAsync\(/g)?.length ?? 0;
  if (switches !== 1) problems.push(`setCurrentPageAsync called ${switches} times (must be exactly 1)`);
  try {
    new AsyncFunction("figma", "__PARAMS__", src);
  } catch (e) {
    problems.push(`${e.name}: ${e.message}`);
  }
  console.log(`${problems.length ? "FAIL" : "ok  "} ${file}${problems.length ? " — " + problems.join("; ") : ""}`);
  if (problems.length) failed++;
}
process.exit(failed ? 1 : 0);
