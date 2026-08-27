import { describe, expect, it } from "vitest";
import {
  findLockfileProblems,
  type LockfileInputs,
  readLockfileInputs,
} from "../../scripts/check-lockfile";

const workspaceYaml = `
onlyBuiltDependencies:
  - esbuild
overrides:
  '@cloudflare/vite-plugin': 1.39.0
  'miniflare@<=4.20260721.0>undici': 7.29.0
`;

const lockfileYaml = `
lockfileVersion: '9.0'

settings:
  autoInstallPeers: true

overrides:
  '@cloudflare/vite-plugin': 1.39.0
  miniflare@<=4.20260721.0>undici: 7.29.0

importers: {}
`;

const clean: LockfileInputs = {
  workspaceYaml,
  lockfileYaml,
  packageJson: JSON.stringify({ name: "x", dependencies: {} }),
};

describe("findLockfileProblems", () => {
  it("accepts a lockfile whose overrides match pnpm-workspace.yaml", () => {
    expect(findLockfileProblems(clean)).toEqual([]);
  });

  it("names every override a pnpm 11 regeneration drops", () => {
    const problems = findLockfileProblems({
      ...clean,
      lockfileYaml: lockfileYaml.replace(/overrides:[\s\S]*?\n\n/, ""),
    });
    expect(problems).toHaveLength(2);
    expect(problems[0]).toContain('"@cloudflare/vite-plugin: 1.39.0"');
    expect(problems[0]).toContain("missing from pnpm-lock.yaml");
    expect(problems[1]).toContain("miniflare@<=4.20260721.0>undici: 7.29.0");
  });

  it("flags a version that drifted between the two files", () => {
    const problems = findLockfileProblems({
      ...clean,
      lockfileYaml: lockfileYaml.replace("7.29.0", "7.24.8"),
    });
    expect(problems).toEqual([
      'override "miniflare@<=4.20260721.0>undici" is 7.29.0 in pnpm-workspace.yaml but 7.24.8 in pnpm-lock.yaml',
    ]);
  });

  it("flags an override applied by pnpm that nobody declared", () => {
    const problems = findLockfileProblems({
      ...clean,
      workspaceYaml: workspaceYaml.replace(
        "  'miniflare@<=4.20260721.0>undici': 7.29.0\n",
        "",
      ),
    });
    expect(problems).toEqual([
      'override "miniflare@<=4.20260721.0>undici: 7.29.0" is in pnpm-lock.yaml but not declared in pnpm-workspace.yaml',
    ]);
  });

  it("rejects pnpm settings creeping back into package.json", () => {
    const problems = findLockfileProblems({
      ...clean,
      packageJson: JSON.stringify({ name: "x", pnpm: { overrides: {} } }),
    });
    expect(problems).toHaveLength(1);
    expect(problems[0]).toMatch(/package\.json has a "pnpm" field/);
  });
});

describe("repository lockfile", () => {
  // Runs on every `pnpm test`; see the header of scripts/check-lockfile.ts.
  it("keeps overrides in pnpm-workspace.yaml and applied in pnpm-lock.yaml", () => {
    expect(findLockfileProblems(readLockfileInputs())).toEqual([]);
  });
});
