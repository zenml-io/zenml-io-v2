# Plan Checker — Audit Notes

## Phase 1 — Audited 2026-02-12

### Status Summary
- **Completed**: 8 / 13 checklist items (from `docs/phase-1-plan.md` section “Execution Checklist”)
- **Missing / Incomplete**: 5 / 13 checklist items are partial or have gaps
- **Deferred to later phase**: Auto-redirect generation from Run A→Run B; some redirect handling and static-page asset migration
- **Done in a different phase**: Several Phase 1 transform fixes were completed in Phase 2A; non-CMS image migration is explicitly carried into Phase 3 notes

### Detailed Findings

#### ✅ Completed
- **Run scaffolding + artifacts exist**: `design/migration/phase1/runs/2026-02-11T0626Z/run.json` with run metadata and expected subdirectories.
- **SEO baseline crawl produced large dataset**: `design/migration/phase1/runs/2026-02-11T0626Z/seo/baseline.json` + `.csv` + `crawl.log` with `stats.total = 2151` and `failed = 0`.
- **CMS export (live + staged) + schema snapshot + reference map**: `webflow/collections.json`, `webflow/schemas/collections.schema.json`, `webflow/items/*/{live,staged}.json`, `webflow/reference-map.json`.
- **Static page snapshots created**: `pages/published/*.html` and `pages/drafts/*.html` with index at `pages/page-index.json`.
- **Asset pipeline artifacts present**: `assets/inventory.json`, `assets/download-manifest.json`, `r2/upload-manifest.json`, `r2/url-map.json`.
- **CMS transform output exists at scale**: `transform/collections/**` contains 1,904 MDX files; `transform/transform-manifest.json` reports 1,904 success / 0 failed.
- **Redirect normalization generated outputs**: `redirects/webflow-redirects.json` and `redirects/_redirects.webflow` with flattened chains.
- **Animation catalog delivered**: `animations/catalog.json` + `animations/notes.md` with 11 cataloged interaction/script patterns.

#### ❌ Missing or Incomplete
- **CMS collection scope/count tracking differs from plan**: plan says export 17 non-empty collections; actual run exported 20 collection folders (`webflow/items/*` includes empty/test collections). Also `webflow/collections.json` has `stats.totalDrafts: null` and does not include per-collection `draftCount` fields in output.
- **Static page metadata is thinner than planned**: `pages/page-index.json` tracks status/content length but does not include canonical/SEO metadata or `wfPageId` as specified in Phase 1D plan; one draft page (`/case-study/rohlik`) is recorded as missing.
- **Asset discovery pattern misses major URL family**: `scripts/phase1/build-asset-inventory.ts` regex matches `.../65264f6bf54e751c3a776db1/...` but not `.../64a817a2e7e2208272d1ce30/...`; this leaves non-CMS/static assets outside the discovered inventory.
- **URL rewrite is not fully complete**:
  - `design/migration/phase1/runs/2026-02-11T0626Z/transform/collections/**` still contains Webflow CDN URLs (12 files / 16 matches).
  - Example: `transform/collections/blog/introducing-zenml-hub-streamlining-mlops-collaboration-with-reusable-components.mdx` still has `uploads-ssl.webflow.com` image URLs.
  - `webflow.collectionId` traceability field is not present in generated MDX frontmatter (only `siteId` + `itemId`).
- **Redirect coverage is partial vs plan narrative**:
  - `_redirects.webflow` has flattened CSV rules, but known redirect pages noted in plan (`/discussion`, `/slack`, `/roadmap`, `/meet`, `/zenml-meet`) are not present in generated rules.
  - `redirects/webflow-redirects.json` still warns about Webflow-hosted txt redirect target (`/p4t78tnt73bkujthrd1zausuvs9advz3.txt`) not migrated to R2.
- **RSS URL validation from crawl not evidenced**: `/blog/rss.xml` and `/llmops-database/rss.xml` are not present in baseline crawl outputs.

#### ➡️ Deferred / Moved
- **Auto-redirect generation is deferred until Run B**: `redirects/redirects.auto.json` is a placeholder (`runA: null`, note says to generate during pre-cutover comparison).
- **Non-CMS/static image migration was carried forward**: `docs/phase-3-plan.md` explicitly notes Phase 1 only migrated CMS-referenced images and calls out static-page CDN images as remaining work.
- **Phase 1 transform gaps were fixed in Phase 2A**: `design/migration/phase1/runs/2026-02-11T0626Z/transform/phase-2a-fixes.md` documents post-Phase-1 corrections (frontmatter completeness, filename slug fixes, etc.).

#### ⚠️ Concerns / Notes
- **Manifest counters are internally inconsistent**: `assets/download-manifest.json` and `r2/upload-manifest.json` show stats where success/skipped/failed totals exceed `stats.total`, suggesting cumulative/stale counters across reruns.
- **Baseline file location drift**: master plan references `design/seo-baseline.json`, but actual canonical artifact is under run-specific path `design/migration/phase1/runs/2026-02-11T0626Z/seo/baseline.json`.
- **Plan-doing mismatch on “zero Webflow CDN URLs”**: current repository still contains many Webflow CDN URLs in migrated content areas (especially static/marketing content introduced in later phases), so Phase 1 asset migration should be treated as partial for now.

## Phase 2 — Audited 2026-02-12

### Status Summary
- **Completed**: 7 / 11 phase deliverables (2A–2K)
- **Missing / Incomplete**: 3 deliverables (2G partial validation coverage, 2I validation gate regression, 2J check/build gate mismatch)
- **Deferred to later phase**: 2A.4 old-projects SEO routing fix was explicitly skipped because all old-projects are drafts
- **Done in a different phase**: 1 deliverable (2K content-model documentation appears absorbed into other docs instead of `docs/content-model.md`)

### Detailed Findings

#### ✅ Completed
- **2A Re-transform with complete frontmatter + clean filenames**: `scripts/phase1/transform-cms-to-mdx.ts` writes slug-only filenames (uses `slug` + `.mdx`, not Webflow ID prefixes) and emits richer fields across collections (`llmopsTags`, `industryTags`, `integrationType`, `shortDescription`, `order`, `mainImageLink`, `projectId`). Phase 1 transform manifest reports `totalItems: 1904`, `success: 1904`, `failed: 0` in `design/migration/phase1/runs/2026-02-11T0626Z/transform/transform-manifest.json`.
- **2B Reusable schema helpers**: `src/content.config.ts` defines shared `imageSchema`, `seoSchema`, `webflowMetaSchema`, `baseContentSchema`, plus reusable `slugReference()` and `slugReferenceArray()` helpers.
- **2C Reference collections exported and present**: all 10 reference collection directories exist under `src/content/` with substantial content (`authors/`, `categories/`, `tags/`, `llmops-tags/`, `industry-tags/`, `integration-types/`, `advantages/`, `quotes/`, `product-categories/`, `project-tags/`).
- **2D Reference schemas defined**: `src/content.config.ts` has dedicated schemas for all 10 reference collections and Astro loaders for each directory.
- **2E Main schemas defined for all 7 main collections**: `src/content.config.ts` defines `blog`, `integrations`, `llmops-database`, `compare`, `team`, `projects`, `old-projects` schemas and aligns field names to transformed output (also documented in `docs/phase-2e-schema-discrepancies.md`).
- **2F Content copied into Astro content layer**: current core 17 collections total 2,392 files in `src/content/*` (all `.md`, no `.mdx`), matching the project’s updated Phase 3 precondition in `docs/phase-3-plan.md`.
- **2H Collection wiring complete**: `src/content.config.ts` exports all Phase 2 collections (plus later Phase 3 collections) with explicit Astro v5 `glob({ pattern: '**/*.md', ... })` loaders.

#### ❌ Missing or Incomplete
- **2G reference validation is only partially enforced**: most reference fields use `slugReference*`, but `integrations.relatedBlogPosts` is plain `z.array(z.string()).default([])` in `src/content.config.ts` (comment says “slug references to blog” but no validation).
- **2I validation gates regressed after `.mdx` → `.md` switch**: `scripts/phase2/validate-content.ts` still filters `*.mdx` only (`files.filter((f) => f.endsWith(".mdx"))`). Running `npm run validate:content` currently loads **0 entries** and reports pass, so the gate is not validating real content.
- **2J validation gate mismatch**: `npm run build` passes, but `npm run check` currently fails with many TypeScript/Astro errors (Phase 3-era files/scripts). The Phase 2 expectation of fully passing validation gates is no longer true in current HEAD.

#### ➡️ Deferred / Moved
- **2A.4 old-projects SEO routing fix**: explicitly skipped in `docs/phase-2-plan.md`; this still aligns with old-projects being draft-only (`src/content/old-projects/*.md` all have `draft: true`).
- **2K content model doc path moved/absorbed**: `docs/content-model.md` does not exist, but `docs/plan.md` contains a `## Content Model Overview` section covering collection structure/relationships.
- **Phase crossing**: Phase 2 outputs were originally MDX, but Phase 3 switched repository content to Markdown (`docs/phase-3-plan.md` and commit `3c14121`). This explains some Phase 2 script drift.

#### ⚠️ Concerns / Notes
- **Plan docs are stale in places**: multiple Phase 2 docs still reference `src/content/config.ts` and `.mdx` flows, while code now uses `src/content.config.ts` + `.md` loaders.
- **“No Webflow CDN URLs remain” is only conditionally true**:
  - In **Phase 2 core 17 collections**, 12 files still contain Webflow CDN URLs, but all 12 are draft-only (`1 blog draft + 11 old-projects drafts`; no published hits found).
  - Outside Phase 2 scope (later Phase 3 collections), published files still contain Webflow CDN URLs (e.g., case studies), so this requirement is not globally true at repo level.
- **Reference collection counts drifted from plan snapshots**: `project-tags` now has 132 files (not the earlier 70/80 snapshot), already acknowledged in `docs/plan.md` as a later correction.

## Phase 3 — Audited 2026-02-12

### Status Summary
- **Completed**: 8 / 11 major deliverables (3A–3H verified)
- **Missing / Incomplete**: 3 / 11 deliverables are partial (3I interactions, 3J polish, 3K validation gates)
- **Deferred to later phase**: Pagefind full-text search + Cloudflare `_redirects` 301 migration (Phase 4), full form backends (Phase 5)
- **Done in a different phase**: `sitemap-index.xml` generation (a Phase 4 task) is already active during current builds

### Detailed Findings

#### ✅ Completed
- **Core layouts + shared components (3A)**: `src/layouts/BaseLayout.astro`, `ContentLayout.astro`, `BlogLayout.astro`, `src/components/{Navigation,Footer,Button,Card,Badge,Image}.astro`.
- **CMS templates + listing pages (3B–3G)**: Route files exist for blog, author/category/tags taxonomies, integrations, LLMOps DB, compare, team, projects (`src/pages/**`).
- **LLMOps filter stack (3E)**: `src/pages/llmops-index.json.ts` + `src/components/islands/LLMOpsFilter.tsx` + `src/pages/llmops-database/index.astro` wired together.
- **Static page implementation breadth (3H)**: All explicitly listed high-priority routes exist (home, pricing/pro/features/case-studies/company/careers/legal/forms/redirect/utility routes).
- **Static page inventory parity check**: `design/migration/phase1/runs/2026-02-11T0626Z/pages/page-index.json` has 64 published pages; local check against built `dist/**/*.html` found **0 missing**.
- **Navigation/footer link coverage**: Local route check across `src/lib/navigation.ts` + `src/lib/footer.ts` found 34 unique internal routes and **0 missing in dist**.
- **Draft handling works for route generation**: No `dist/old-projects/` routes generated (draft-only collection behavior intact).
- **Build succeeds at current HEAD**: `npm run build` completed successfully and emitted ~2,232 HTML pages.

#### ❌ Missing or Incomplete
- **Phase 3I animation system not implemented as planned**:
  - No `src/utils/animations.ts`
  - No `src/styles/animations.css`
  - No site-wide IntersectionObserver fade-in utility found (search across `src/components`, `src/layouts`, `src/pages`, `src/lib`, `src/styles`)
- **Cookie consent UI + preference persistence missing (3I)**:
  - No cookie-consent component in `src/components`
  - `src/layouts/BaseLayout.astro` loads Plausible in production but has no consent banner/state handling.
- **Must-replicate interaction gaps**:
  - Blog TOC not present in `src/layouts/BlogLayout.astro` / `src/pages/blog/[slug].astro`
  - Homepage hero still has Lottie placeholder (`src/components/sections/Hero.astro`), no code-highlighting interaction island.
- **Footer polish gaps (3J)**:
  - No footer newsletter form in `src/components/Footer.astro` (only link columns)
  - No cookie-preferences affordance in footer legal row.
- **Phase 3K validation gates not passing in practice**:
  - `npm run check` fails (165 errors; includes `src/components/islands/{LLMOpsFilter.tsx,RoiCalculator.tsx}`, `src/components/sections/FormPlaceholder.astro`, `src/pages/pro.astro`, `src/pages/vs/[slug].astro`, and `scripts/phase3/extract-feature-pages.ts`).
  - `npm run validate:content` currently loads **0 entries** and passes with warnings, so it is not validating real content.
- **Route-coverage script from plan not implemented**: `scripts/phase3/verify-route-coverage.ts` is absent.
- **Performance target slightly missed**: latest local build reports server build in ~31.59s (target in plan: <30s).
- **LLMOps JSON index size over target guidance**: built `dist/llmops-index.json` is ~1.8MB raw and 505,234 bytes gzip (target in plan text was <500KB).

#### ➡️ Deferred / Moved
- **Pagefind full-text search**: not present in codebase (`pagefind` / `astro-pagefind` search returned no hits); consistent with Phase 3 deferral path to Phase 4.
- **301 redirect migration**: redirect-only pages are currently JS/noindex pages (`src/pages/{slack,roadmap,discussion,meet,zenml-meet,components}.astro` + `src/components/sections/RedirectPage.astro`); `_redirects` migration remains deferred to Phase 4.
- **`/book-a-demo` + `/signup-for-demo` true 301 behavior**: still placeholder pages in Phase 3 (`src/pages/book-a-demo.astro`, `src/pages/signup-for-demo.astro`), with planned redirect migration deferred.
- **Full form backend workflows**: placeholder strategy in place for non-embed forms; full backend integration remains Phase 5 scope.

#### ⚠️ Concerns / Notes
- **Plan/status drift**: `docs/phase-3-plan.md` states “PHASE 3 COMPLETE,” but several checklist items (especially 3I and 3K gates) are still materially incomplete.
- **CI gate mismatch**: `.github/workflows/deploy.yml` runs build/deploy but does not enforce `check` or effective content validation gates.
- **Spec inconsistency in LLMOps industry filter**: detailed 3E checklist mentions multi-select industry OR logic, but implementation is single-select (`src/components/islands/LLMOpsFilter.tsx`) and data model uses single `industryTags` slug.
- **Non-CMS static imagery risk remains visible**: e.g., `src/pages/cloud-features/ml-models-control-plane.astro` still references Webflow CDN image URLs directly.
