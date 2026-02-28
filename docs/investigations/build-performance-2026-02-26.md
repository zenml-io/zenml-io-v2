# Build Performance Investigation — 2026-02-26

## Context

Build time had crept up to ~2 minutes. We investigated where time was going
and what optimizations were possible.

## Build Phase Breakdown (before changes)

| Phase | Time |
|-------|------|
| Astro static page generation | ~44s |
| Server build (Cloudflare adapter) | ~72s |
| Pagefind indexing | ~44s |
| **Total** | **~2:00** |

## Changes Made (committed to main)

### 1. O(N²) → O(N) related entries lookup

**Problem**: `getRelatedEntries()` in `src/lib/llmops.ts` scanned all 1,453
entries for each of the 1,453 LLMOps detail pages — ~2.1 million comparisons.

**Fix**: Added `buildRelatedIndex()` which builds inverted indexes
(tag→entries, industry→entries, company→entries) once, then
`getRelatedFromIndex()` looks up candidates from those indexes with a top-k
selection instead of sorting everything.

**Savings**: ~13s off page generation.

### 2. Scoped Pagefind indexing

**Problem**: `pagefind --site dist` walked all 2,255 HTML files, but only
1,476 LLMOps pages have `data-pagefind-body` and are actually searched.

**Fix**: Added `--glob 'llmops-database/*.html'` to the Pagefind command in
`package.json`.

**Savings**: ~20s off indexing.

## Things We Tried and Rejected

### Removing `@astrojs/mdx` integration

Despite having zero `.mdx` files, removing MDX made the server build phase
*slower* (72s → 117s). The MDX integration changes how Vite resolves the module
graph, and the Cloudflare adapter benefits from that resolution path. Removing
MDX forces a different, slower path through esbuild.

**Verdict**: Keep MDX installed even though we don't use `.mdx` files.

### `build.concurrency: 2` / `build.concurrency: 4`

Parallel page generation increased CPU contention with the subsequent server
build phase, making overall build time worse. May be worth revisiting if/when
the server build phase is eliminated.

**Verdict**: Don't use concurrency — the default sequential mode is faster
overall.

### Dropping the Cloudflare adapter entirely (Pages Functions migration)

**Hypothesis**: The adapter's server build phase (50–100s) is wasted work for
just 3 API routes. Moving them to Cloudflare Pages Functions (`functions/`
directory) would eliminate it.

**What we built**: Full migration of all 3 API routes to Pages Functions
format, with CSRF enforcement, `_routes.json`, and TypeScript support.

**What happened**:

1. **ESM compatibility breakage**: Without the adapter, Astro's static build
   falls back to Node's native ESM loader, which fails on ~26 remark/rehype
   ecosystem packages that use `"type": "module"` without an `"exports"` field
   (ccount, zwitch, etc.). These packages work fine with the adapter because
   Vite's SSR bundler handles them.

2. **Workaround**: Listing all 26 packages in `vite.ssr.noExternal` fixed the
   ESM errors. Using `noExternal: true` broke CJS packages like `cssesc`.

3. **Net performance was worse**: Removing the adapter eliminated the server
   build phase but made page generation and Pagefind both ~40% slower. The
   adapter's Vite/Rollup pre-optimization of the module graph benefits the
   static page generation step too.

| Phase | With adapter | Without adapter |
|-------|-------------|-----------------|
| Page generation | ~30s | ~44s |
| Server build | ~50s | **0s** |
| Pagefind | ~19s | ~27s |
| **Total** | **~1:13** | **~1:37** |

**Verdict**: The adapter is earning its keep. The server build phase isn't
wasted — it pre-optimizes module resolution that speeds up page generation.
Don't attempt this migration again unless Astro changes how static-only builds
handle ESM module resolution.

## Final Timings (after committed changes)

| Phase | Time |
|-------|------|
| Astro static page generation | ~30s |
| Server build (Cloudflare adapter) | ~50s (variable: 50–100s) |
| Pagefind indexing | ~20s |
| **Total** | **~1:13–1:40** (variable) |

The server build phase fluctuates significantly based on system load (CPU
thermal throttling, background processes, memory pressure). The page generation
and Pagefind improvements are reliable.
