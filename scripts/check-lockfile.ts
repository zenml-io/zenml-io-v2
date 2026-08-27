/**
 * check-lockfile.ts
 *
 * Checks two things about pnpm's dependency `overrides`:
 *
 *   1. package.json has no "pnpm" field. This is the guard that matters in
 *      CI: pnpm 10 (CI, local) still honours that field, so overrides put
 *      back there install fine and ship green — and then the next Dependabot
 *      PR (whose updater runs pnpm 11, which ignores the field) drops them
 *      from the lockfile and fails at `pnpm install --frozen-lockfile` with an
 *      opaque ERR_PNPM_LOCKFILE_CONFIG_MISMATCH (see PR #271).
 *   2. The overrides in the pnpm-lock.yaml header are exactly the ones
 *      declared in pnpm-workspace.yaml. pnpm's own install already refuses a
 *      mismatch here; this check names the missing override and says what to
 *      do, which is the message you want when a bot branch turns red.
 *
 * Run via: pnpm check:lockfile
 * Also run on every `pnpm test` through tests/config/lockfileOverrides.test.ts.
 */

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { parse } from "yaml";

const WORKSPACE_FILE = "pnpm-workspace.yaml";
const LOCKFILE = "pnpm-lock.yaml";
const PACKAGE_JSON = "package.json";

export interface LockfileInputs {
  workspaceYaml: string;
  lockfileYaml: string;
  packageJson: string;
}

function readOverrides(yamlText: string): Record<string, string> {
  const doc = parse(yamlText) as { overrides?: Record<string, unknown> } | null;
  return Object.fromEntries(
    Object.entries(doc?.overrides ?? {}).map(([k, v]) => [k, String(v)]),
  );
}

/** The lockfile's settings header; everything from `importers:` on is ~250 KB we don't need to parse. */
function lockfileHeader(lockfileYaml: string): string {
  const end = lockfileYaml.indexOf("\nimporters:");
  return end === -1 ? lockfileYaml : lockfileYaml.slice(0, end);
}

/**
 * Returns one human-readable problem per line of drift; empty means the three
 * files agree. Pure so the test suite can feed it fabricated inputs.
 */
export function findLockfileProblems(inputs: LockfileInputs): string[] {
  const problems: string[] = [];

  const pkg = JSON.parse(inputs.packageJson) as { pnpm?: unknown };
  if (pkg.pnpm !== undefined) {
    problems.push(
      `${PACKAGE_JSON} has a "pnpm" field — move its contents to ${WORKSPACE_FILE}; pnpm 11 (which Dependabot runs) ignores this field, so anything kept here vanishes from bot-regenerated lockfiles`,
    );
  }

  const declared = readOverrides(inputs.workspaceYaml);
  const applied = readOverrides(lockfileHeader(inputs.lockfileYaml));

  for (const [name, version] of Object.entries(declared)) {
    if (!(name in applied)) {
      problems.push(
        `override "${name}: ${version}" is declared in ${WORKSPACE_FILE} but missing from ${LOCKFILE}`,
      );
    } else if (applied[name] !== version) {
      problems.push(
        `override "${name}" is ${version} in ${WORKSPACE_FILE} but ${applied[name]} in ${LOCKFILE}`,
      );
    }
  }
  for (const [name, version] of Object.entries(applied)) {
    if (!(name in declared)) {
      problems.push(
        `override "${name}: ${version}" is in ${LOCKFILE} but not declared in ${WORKSPACE_FILE}`,
      );
    }
  }

  return problems;
}

export function readLockfileInputs(): LockfileInputs {
  return {
    workspaceYaml: readFileSync(WORKSPACE_FILE, "utf8"),
    lockfileYaml: readFileSync(LOCKFILE, "utf8"),
    packageJson: readFileSync(PACKAGE_JSON, "utf8"),
  };
}

function main() {
  const problems = findLockfileProblems(readLockfileInputs());
  if (problems.length === 0) {
    console.log(
      `✅ ${LOCKFILE} overrides match ${WORKSPACE_FILE}; ${PACKAGE_JSON} has no "pnpm" field.`,
    );
    return;
  }
  console.error(`❌ ${problems.length} lockfile problem(s):`);
  for (const problem of problems) {
    console.error(`   - ${problem}`);
  }
  console.error(
    `\nFix: run \`pnpm install\` (pnpm 10) and commit the regenerated ${LOCKFILE}.\n` +
      `If this lockfile came from a Dependabot rebase, the bot's pnpm 11 dropped the overrides — ` +
      `regenerate it locally rather than editing the bot branch by hand, or comment \`@dependabot rebase\` once ${WORKSPACE_FILE} is on main.`,
  );
  process.exit(1);
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
