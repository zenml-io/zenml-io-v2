# Validation Reference

The root [testing policy](../../AGENTS.md#testing-guidelines) determines which
checks are required. This reference explains coverage and setup, not additional
unconditional gates. Paths below are relative to the repository root.

## Command Coverage

- `pnpm install` installs dependencies.
- pnpm settings (`overrides`, `onlyBuiltDependencies`) live in `pnpm-workspace.yaml`, never in a `pnpm` field in `package.json` — pnpm 11 (which Dependabot runs) ignores that field. `pnpm check:lockfile` (also run by `pnpm test`) rejects that field and diffs the `overrides` in `pnpm-workspace.yaml` against the lockfile header, naming any missing override. Why: see "Development Conventions" in `CLAUDE.md`.
- `pnpm dev` starts local dev server at `http://localhost:4321`.
- `pnpm build` runs Astro build and Pagefind indexing (`dist/` output).
- `pnpm preview` serves `dist/` through the checked-in Cloudflare Workers configuration.
- `pnpm check` runs Astro/TypeScript checks for site source.
- `pnpm check:tests` type-checks tests, Vitest config, and the dist smoke script.
- `pnpm check:surface` verifies pages/components declare their analytics surface.
- `pnpm check:alt` verifies image alt-text coverage.
- `pnpm check:registry` validates the rebrand template registry (`src/lib/templates/registry.ts`) against the files on disk — every registered `componentPath` resolves, no orphan components under `src/components/templates/` or `src/components/system/` (a `.tsx` twin beside a same-name `.astro` is exempt), no duplicate ids, and `contentShape` bounds are sane.
- `pnpm lint` runs Biome checks on configured source, test, config, and smoke-script files.
- `pnpm test` runs the Vitest suite once.
- `pnpm smoke:dist` smoke-tests `dist/` after `pnpm build`, including that every Preact island is still mounted on its pages with its bundle on disk, and that the rendered content of one blog post, one Kitaru-vs-X MDX page, and two project detail pages (details column plus one sidebar) still matches the goldens in `tests/snapshots/rendered/` (`pnpm check:snapshots` alone; `pnpm snapshots:update` to regenerate after an intended change — review the golden diff before committing it). Step 9 of the same smoke run is a pixel-tolerance golden of one Open Graph card (`scripts/check-og-golden.ts`, `tests/snapshots/rendered/og-kitaru-vs-temporal.jpg`; `pnpm og:golden:update` after an intended change) — the only thing in CI that executes satori/resvg/sharp; the script header has the rationale.
- `pnpm check:worker` starts Wrangler locally from `wrangler.jsonc` and checks the generated Astro Worker, static assets, redirects, headers, 404, and API routes. Run it after `pnpm build` for Worker runtime or deployment changes.
- `pnpm check:worker-bindings -- <metadata.json>` refuses promotion metadata that does not contain both required form-secret bindings.
- `pnpm check:islands` serves `dist/` and drives a real Chromium to prove the Preact islands actually **hydrate** (become interactive) — an island can ship perfect markup and still be inert. It also checks the Storylane embed on `/live-demo` (not an island): under both rejected and accepted consent, the iframe and enhancement script must load with exactly one `#storylane-embed` script. Needs `pnpm exec playwright install chromium` on first run.
- `pnpm lint:fix` auto-fixes lint issues.
- `pnpm format` formats configured files with Biome.
- `pnpm validate:content` runs content schema and consistency checks.

## CI and Release Details

The required CI job packages the exact validated dist output. check:registry
is currently local-only; wiring it into CI requires the byte-identical trusted
mirror at .github/trusted/worker-artifact-workflow.yml and the blob-SHA pin in
tests/config/workerPreviewControlPlane.test.ts to change together. This is a
reviewed release-boundary change.

See [the Worker release runbook](../worker-release-runbook.md) and
[the PR preview runbook](../worker-pr-preview-runbook.md) for artifact upload,
activation, provenance, and route boundaries. Preview availability is separate
from the merge gate.
