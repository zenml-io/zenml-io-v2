# ZenML Website v2 — Migration from Webflow

## Project Overview

We are migrating zenml.io from Webflow to a self-hosted solution. The goal is
a **1:1 copy** of the current site in a version we fully control and can
customize freely.

- **Current site**: www.zenml.io (Webflow, site ID: `64a817a2e7e2208272d1ce30`)
- **Traffic**: ~7k unique visitors / ~10k page views per week (and growing)
- **Hosting target**: Cloudflare Pages (confirmed, deployed at `zenml-io-v2.pages.dev`)
- **Context**: This is being built as part of a Claude hackathon using Opus 4.6
- **Status**: **Phases 0–5 COMPLETE**. ~2,224 pages building in ~33s. All content migrated, all pages built, SEO infrastructure done, forms live, analytics tracking active. Currently in **Phase 6 (QA & Cutover)** — fixing visual parity gaps page-by-page against the Webflow original.

## Key Constraints

- **No broken links** — all existing URLs must be preserved or 301-redirected
- **SEO preservation** — keep slugs, meta tags, Open Graph data intact
- **CMS data must migrate** — 20 collections, ~2,340 items total
- **Largest collection**: LLMOps Database (1,453 items) — filter-heavy UI
- **Blog**: 317 posts with categories, tags, and authors
- **Asset migration**: all images/files must be re-hosted (Webflow URLs will
  break if the site is deleted)

## Content Architecture (Webflow)

Full inventory is in `docs/webflow-inventory.md`.

### Major CMS Collections

| Collection         | Items  | Slug              |
|--------------------|--------|--------------------|
| LLMOps Databases   | 1,453  | llmops-database    |
| Blog Posts         | 317    | blog               |
| Blog Tags          | 118    | tags               |
| LLMOps Tags        | 107    | llmops-tags        |
| Project Tags       | 80     | project-tags       |
| Integrations       | 68     | integrations       |
| Advantages         | 45     | advantages         |
| Blog Authors       | 27     | author             |
| Team Members       | 22     | team               |
| VS Pages           | 17     | compare            |
| Integration Types  | 17     | integration-type   |
| Industry Tags      | 17     | industry-tags      |
| Projects (new)     | 16     | projects           |
| Blog Categories    | 14     | category           |
| Old Projects       | 11     | old-projects       |
| Quotes             | 6      | quotes             |
| Product Categories | 5      | product-categories |

### Page Types

- **Static pages**: ~44 published (home, pricing, features, company, etc.)
- **CMS template pages**: ~20 (one per collection)
- **Draft pages**: ~13 (old versions, test pages, upcoming pricing)
- **Case study pages**: 5 (under /case-study/)
- **Feature detail pages**: ~12 (under /features/)
- **VS comparison pages**: 3 static + 17 CMS-driven (under /vs/ and /compare/)

## Tech Stack (Decided)

| Layer | Choice |
|-------|--------|
| Framework | **Astro** (TypeScript) — static-first, content collections, islands |
| Content | **Markdown (.md) in git** — Astro Content Collections with Zod schemas. **Use `.md` NOT `.mdx`** (MDX v2 breaks on Webflow-exported HTML) |
| Hosting | **Cloudflare Pages** — edge CDN, branch previews, auto CI/CD |
| Assets | **Cloudflare R2** — object storage for images/files |
| Styling | **Tailwind CSS** — utility-first |
| Interactive | **Preact islands** — 7 islands: LLMOpsFilter, ContactForm, CookieConsent, FeatureTabsSlider, LottieHero, ProTestimonialCarousel, RoiCalculator |
| Search | **Pagefind** (later) — build-time search index, no server |
| Forms | **ContactForm** Preact island → Cloudflare Pages Functions (`/api/forms/:formType`). Cal.com embeds for demo booking. Brevo for newsletter |
| Analytics | **Plausible** + GA4 + Segment (hostname-gated to `www.zenml.io` to prevent preview pollution) |
| Code highlighting | **Shiki** (`github-dark` theme) at build time + **Inconsolata** monospace font |
| CRM | **Attio** (keep existing) |
| Design approach | Pixel-perfect recreation first, then iterate |

## Webflow MCP Access

We have a Webflow MCP server connected. Use the `mcp__webflow__*` tools to
query the live site. The site ID is `64a817a2e7e2208272d1ce30`.

## Key Technical Decisions

| Decision | Value |
|----------|-------|
| Trailing slash | `never` — matches Webflow behavior, locked in `astro.config.ts` |
| Canonical domain | `www.zenml.io` (bare `zenml.io` redirects to www) |
| Migration strategy | Full cutover (not strangler) — build complete site, switch DNS |
| Asset URLs (POC) | `r2.dev` URLs for now; switch to `assets.zenml.io` when DNS moves to Cloudflare |
| Image optimization | Upload 1:1 for now; convert to WebP/AVIF post-launch |

## Infrastructure (Phase 0)

- **Cloudflare Pages**: `zenml-io-v2.pages.dev` (production), branch previews auto-deploy
- **Cloudflare R2**: bucket `zenml-assets` (public access not yet enabled)
- **CI/CD**: GitHub Actions — push to `main` → production, PRs → preview branches
- **Preview SEO**: Cloudflare auto-adds `X-Robots-Tag: noindex` on preview URLs

## Phase 1 Complete (2026-02-11)

**All content exported and transformed:**
- ✅ 2,151 URLs crawled for SEO baseline
- ✅ 2,340 CMS items exported (17 collections, live + staged)
- ✅ 44 static pages + 13 drafts captured
- ✅ 2,397 assets downloaded and uploaded to R2 (384 MB, 0 failures)
- ✅ 1,904 MDX files generated with frontmatter + SEO metadata
- ✅ 44 redirects normalized, 11 chains flattened
- ✅ 325 Webflow interactions + 11 custom scripts cataloged

**Run artifacts:** `design/migration/phase1/runs/2026-02-11T0626Z/`

**Key scripts created (10):**
- `crawl-seo-baseline.ts` — SEO snapshot for parity testing
- `export-webflow-cms.ts` — CMS export via Webflow API v2
- `snapshot-static-pages.ts` — HTML snapshots of non-CMS pages
- `build-asset-inventory.ts` — Deduplicated asset discovery
- `download-assets.ts` — Asset download with retry + manifest
- `upload-to-r2-boto3.py` — Parallel R2 upload via boto3 (fast!)
- `transform-cms-to-mdx.ts` — HTML→MDX with URL rewriting
- `export-redirects.ts` — Redirect normalization + chain flattening
- `generate-auto-redirects.ts` — Slug change/deletion detection
- `catalog-animations.ts` — Animation/interaction catalog

## Phase 2 Complete (2026-02-11)

All 20 content collections defined with Zod schemas in `src/content.config.ts`. 2,392 content files validated. Astro Content Layer API with glob loaders.

## Phase 3 Complete (2026-02-12)

All pages built — layouts, blog (280 posts, 12/page pagination), all CMS templates, LLMOps filter island, 44+ static pages, homepage (13 section components), feature detail pages, case studies, VS comparison pages, form/conversion pages, ROI calculator, Storylane embeds.

## Phase 4 Complete (2026-02-12)

SEO & Redirects — 52 redirect rules in `public/_redirects`, RSS feeds (blog + LLMOps), auto-generated sitemap, OG images, JSON-LD structured data, `llms.txt`, favicon, parity testing at 3.27% gap.

## Phase 5 Complete (2026-02-12)

Forms & Interactive Features — ContactForm Preact island, cookie consent (4 categories), analytics tracking with hostname gate, blog TOC with scroll-spy, Shiki code highlighting, security headers.

## Phase 6 In Progress — QA & Cutover

Fixing visual parity gaps page-by-page against the Webflow original. Recent fixes: homepage sections, features hub, company page, footer gradient, open-source-vs-pro, integrations, projects.

## Development Conventions

- `docs/` folder is for plan docs and investigations — **committed to git**
- `design/` folder is for heavy artifacts only (exports, screenshots, JSON dumps) — **never commit to git**
- Phase 1 scripts go in `scripts/phase1/` as TypeScript, run via `pnpm exec tsx`
- Make targeted git commits (only relevant files)
- After running tests, re-run them if you make subsequent changes
- **Scripts with verbose output**: Run scripts that generate a lot of text output (e.g., data exports, bulk processing) in **background mode** (`run_in_background: true`) to avoid cluttering the conversation
- **Build output**: `pnpm build` generates ~2000+ lines of output listing every generated page. Always run it in background mode and use `tail` to check only the final lines for success/failure — reading the full output will consume context very quickly
- **API uncertainty**: If uncertain about Webflow, Cloudflare, or other third-party APIs, **use websearch or the exa MCP** to look up the current API documentation before writing code — better to verify than to write code that doesn't work
- **Credential management**: When you receive API credentials, tokens, or keys, **always add them to `.env`** for persistence across sessions. The `.env` file is gitignored and safe for secrets. This prevents having to re-enter credentials every time you run a script

## Plan Management

- The master migration plan lives at `docs/plan.md` — **keep it updated** as
  phases progress (check off completed tasks, update status line at top)
- When starting a new phase, create a detailed plan at
  `docs/phase-N-plan.md` before writing code
- Use the **task/todo list** to track in-progress work within a phase so
  nothing gets forgotten across sessions
- When a phase is complete, update `docs/plan.md` to reflect that and note
  any learnings or changes to the plan

## Image & Asset Migration Lessons

These patterns caused silent runtime 404s that only showed up on the deployed
site — no build errors, no type errors, just broken images.

### Always verify uploads via the public URL

URL rewriting source code is not enough. After uploading images to R2, **test
the public URL** (`curl -sI https://pub-...r2.dev/webflow/...`) to confirm the
file is actually accessible. The boto3 API can succeed but the public domain may
point to a different account/bucket.

### Template literal URLs are invisible to regex audits

Source code like `` `${R2}/hash/file.svg` `` expands to a full URL at runtime,
but regex scanning for the R2 domain string won't find it. When auditing for
broken R2 references, **scan for both patterns**:
- Literal: `https://pub-...r2.dev/webflow/.../hash/file`
- Template: `${R2}/hash/file` (where `R2` is a constant)

### `public/` assets must be explicitly placed

Astro doesn't error when a component references `/images/logo.svg` but
`public/images/logo.svg` doesn't exist — it just silently 404s at runtime.
After adding `/images/*` references, verify the files exist in `public/images/`.

### Webflow CDN may 403 on certain file IDs

Some Webflow file IDs (especially newer `670e2f23...` uploads) return 403
even with browser User-Agent headers. The Webflow HTML export
(`design/webflow-export/extracted/images/`) often has equivalent files under
older file IDs that download fine. Use local export files as source when the
CDN blocks.

### Filenames with spaces break regex URL matching

R2 keys like `03.01.  Models - List.webp` get truncated at the first space
by `[^\s...]` regex patterns. For comprehensive audits, match only the 8-char
hash prefix (`[a-f0-9]{8}`) and verify it exists in the bucket, rather than
trying to capture the full filename.

## Skills & Automation

- **Proactively suggest creating Claude Code skills** when a task becomes
  repetitive (e.g., publishing content, uploading assets, running checks)
- Ask the user: "Should we create a skill/slash command for this?" before
  building one
- Skills help the whole team (devs + designer + content people) work faster
  with Claude Code
- Likely skill candidates are listed at the bottom of `docs/plan.md`

## Key Files

### Documentation
- `docs/plan.md` — **Master migration plan** (phases, decisions, content model)
- `docs/phase-0-plan.md` through `docs/phase-5-plan.md` — Detailed phase plans
- `docs/webflow-inventory.md` — Full inventory of the Webflow site
- `docs/forms-audit.md` — Forms architecture audit (8 types, 4 categories)
- `docs/custom-code-audit.md` — Third-party scripts audit (14 services, 20 scripts)
- `docs/design-tokens.md` — Extracted design tokens reference

### Core Architecture
- `astro.config.ts` — Astro config (static output, Cloudflare, Preact, sitemap, Shiki)
- `src/content.config.ts` — All 20 content collection schemas (Zod)
- `src/styles/global.css` — Tailwind v4 `@theme` block + design tokens
- `src/lib/constants.ts` — `SITE_URL` and shared constants
- `src/lib/seo.ts` — SEO contract (`SEOProps`, `resolveSeo()`, `buildCanonical()`)
- `src/lib/navigation.ts` — Nav data (typed, not hardcoded)
- `src/lib/footer.ts` — Footer data (typed, not hardcoded)

### Homepage
- `src/pages/index.astro` — Homepage composition (13 section components)
- `src/lib/homepage.ts` — All homepage marketing copy, stats, URLs, FAQ
- `src/components/sections/` — 37 section components

### Preact Islands (interactive client-side components)
- `src/components/islands/LLMOpsFilter.tsx` — LLMOps database filter (tag/industry/search)
- `src/components/islands/ContactForm.tsx` — Form submission → Pages Functions
- `src/components/islands/CookieConsent.tsx` — Cookie consent banner (4 categories)
- `src/components/islands/FeatureTabsSlider.tsx` — Homepage auto-cycling feature tabs
- `src/components/islands/LottieHero.tsx` — Hero Lottie animation player
- `src/components/islands/ProTestimonialCarousel.tsx` — /pro page testimonial carousel
- `src/components/islands/RoiCalculator.tsx` — ROI calculator interactive form

### Layouts
- `src/layouts/BaseLayout.astro` — Main layout (nav, footer, head slots, analytics)
- `src/layouts/BlogLayout.astro` — Blog post layout (conditional TOC sidebar)
- `src/layouts/MinimalLayout.astro` — Lightweight shell (no nav/footer) for embeds

### Webflow Reference (gitignored, local only)
- `design/webflow-export/extracted/` — Original Webflow HTML + CSS export
- `design/migration/phase1/runs/` — Phase 1 export run artifacts
