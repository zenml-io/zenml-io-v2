# ZenML Website v2 — Migration Plan

> Last updated: 2026-02-11
> Status: **Phase 1 COMPLETE, Phase 2 COMPLETE (A-J)** — All content exported, transformed to MDX, schemas defined and validated, 2,392 files loaded across 17 collections, full build passing. Content layer is production-ready. Ready for Phase 3 (Templates & Pages).

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | **Astro** (TypeScript) | Static-first, content collections, islands for interactivity, best SEO/GEO |
| Content storage | **Markdown/MDX in git** | Astro Content Collections with typed schemas. Claude Code + git = editorial workflow |
| Hosting | **Cloudflare Pages** | Edge CDN, branch previews (= free staging), auto CI/CD from GitHub |
| Asset storage | **Cloudflare R2** | Object storage for images/files, referenced by URL in content |
| Styling | **Tailwind CSS** | Utility-first, designer works directly in components |
| Interactive UI | **Preact islands** | LLMOps filter + search, and other client-side widgets. Only hydrate what needs JS |
| Search | **Pagefind** (Phase 3) | Build-time search index for LLMOps DB text search. Parity-critical. |
| Forms | **TBD** — Cal.com embeds + Cloudflare Workers | Architecture decision in Phase 0; implementation in Phase 5 |
| Analytics | **Plausible** (keep existing) | Already in use, privacy-friendly |
| CRM | **Attio** (keep existing) | Forms may need to push data here |
| Design approach | **Pixel-perfect first, iterate later** | Replicate current design, then improve post-launch |
| Migration strategy | **Full cutover** (not Strangler) | Build complete site, test thoroughly, switch DNS in one go |
| Canonical domain | **www.zenml.io** | `zenml.io` redirects → `www.zenml.io`. All URLs/sitemaps use www. |
| Image optimization | **Upload 1:1 for Phase 1**, optimize post-launch | Convert to WebP/AVIF after launch using Astro built-in or Cloudflare Image Resizing |
| Content sync | **Re-export before launch** | Export now to build against; final export right before cutover |

### Decisions Needed (Phase 0)

| Decision | Choice | Notes |
|----------|--------|-------|
| **DNS** | **Stay on Route 53 for POC**, move to Cloudflare after team buy-in | No DNS changes needed for the proof of concept |
| **Asset domain** | **Use `r2.dev` URLs for POC**, switch to `assets.zenml.io` later | Find-and-replace in content when DNS moves to Cloudflare |
| **Trailing slash policy** | **`never`** — Webflow 301-redirects trailing slashes to non-trailing | Confirmed via HTTP headers: `/blog/` → 301 → `/blog`. Locked as `trailingSlash: "never"` + `build.format: "file"` in Astro config. |

---

## Documentation Structure

- **`docs/`** — committed to git. Plan docs, investigation notes, inventory.
- **`design/`** — gitignored. Heavy artifacts only (Webflow exports, screenshots,
  raw JSON dumps, zips).

When starting Phase 0, move existing `.md` files from `design/` to `docs/`.

---

## Migration Phases

### Phase 0: Project Setup + Critical Decisions

**Goal**: Scaffold the Astro project, **resolve DNS/URL/forms blockers**,
configure deployment, verify the full pipeline works.

Tasks:

**Critical decisions (do first):**
- [x] **Trailing slash policy**: `never` — Webflow 301-redirects trailing slashes. Locked in `astro.config.ts`.
- [x] **Forms architecture audit**: 8 form types identified across 4 categories (Webflow native, Brevo newsletter, Cal.com embeds, client-side widgets). Full audit in `docs/forms-audit.md`. Architecture decision deferred to Phase 5 (9 open questions documented).
- [x] Note: DNS stays on Route 53 for POC. Assets use `r2.dev` URLs. Migrate DNS to Cloudflare + custom asset domain after team buy-in.

**Project scaffold:**
- [x] Initialize Astro project with TypeScript
- [x] Add Tailwind CSS v4, Cloudflare adapter, Preact, Sitemap, MDX integrations
- [x] Configure `astro.config.ts` for static output + Cloudflare
- [x] Set up basic project structure (`src/content/`, `src/layouts/`, `src/components/`, `src/pages/`)
- [x] Add basic linting/formatting (Biome 2.3)
- [x] Verify local build (`build`, `check`, `lint` all pass)

**Infrastructure:**
- [x] Set up Cloudflare R2 bucket (`zenml-assets`) on `zenml_migration@fastmail.org` account
- [x] Cloudflare Pages project created (`zenml-io-v2`), deployed to `zenml-io-v2.pages.dev`
- [x] Branch preview deployments verified (`test-preview.zenml-io-v2.pages.dev`)
- [x] Preview deployments confirmed `noindex` (Cloudflare adds `X-Robots-Tag: noindex` automatically)
- [x] Auto-deploy via GitHub Actions (`wrangler pages deploy`): push to `main` → production, PRs → preview branches

**Design extraction:**
- [x] Extract design tokens from Webflow (variables, styles) → populated `src/styles/global.css` with `@theme` block (Tailwind v4 approach). Full reference in `docs/design-tokens.md`.
- [x] Download Webflow code export as reference (saved to `design/webflow-export/`)
- [x] Capture baseline screenshots of key pages — 34/36 captured (12 pages × 3 viewports; LLMOps DB timed out at desktop/tablet). Saved to `design/screenshots/baseline/`.
- [x] Audit Webflow site-level custom code — 14 third-party services, 20 scripts cataloged with replicate/skip recommendations. Full audit in `docs/custom-code-audit.md`.

**Documentation:**
- [x] Move plan `.md` files from `design/` to `docs/`
- [x] Update `.gitignore` accordingly

**Detailed plan**: `docs/phase-0-plan.md`

---

### Phase 1: Content Export & Transform ✅ COMPLETE

**Goal**: Get ALL content out of Webflow — CMS data, static page content, SEO
metadata, assets, and redirects. Transform into Astro-ready format.

**Status:** ✅ Complete (2026-02-11)

Tasks:

**SEO baseline snapshot (do first — this is the acceptance test suite):**
- [x] Crawl all public URLs on current site and snapshot per URL:
  status code, canonical, `<title>`, meta description, OG tags, H1, word count
- [x] Save as `design/seo-baseline.json` — used for automated parity testing in Phase 6
  - **Result:** 2,151 URLs crawled and cataloged

**CMS content export:**
- [x] Write CMS export script (TypeScript, via Webflow API v2)
- [x] Export all 17 non-empty CMS collections — **both live AND staged items**
  (live → published, staged-only → `draft: true` in frontmatter)
- [x] Build reference resolution map (item ID → slug/name lookup)
- [x] Resolve CMS references (e.g., blog post → author, blog post → tags)
  - **Result:** 2,340 items exported, reference map built with 2,340 entries

**Static page content export:**
- [x] Inventory and capture ~44 static pages + feature pages + case study content
- [x] Save raw HTML snapshots for all published pages
  - **Result:** 44 published pages + 13 drafts captured

**Asset migration:**
- [x] Build asset inventory from all sources (CMS, HTML, SEO, code export)
- [x] Download ALL image/file assets from Webflow-hosted URLs
- [x] Upload assets to Cloudflare R2 using boto3 (Python AWS SDK)
- [x] Generate URL mapping file (`old_webflow_url → new_r2_url`)
  - **Result:** 2,397 unique assets, 384 MB total, 100% success rate, 0 failures

**Content transformation:**
- [x] Convert rich text HTML → MDX with cheerio-based parser
- [x] Rewrite asset URLs in content to point to R2 (2,397 mappings)
- [x] Transform into MDX files with comprehensive frontmatter
- [x] Merge SEO metadata from baseline crawl (no SEO fields in CMS)
- [x] Handle edge cases: embedded videos, iframes, code blocks, tables
  - **Result:** 1,904 MDX files generated, 0 failures, 152 informational warnings

**Redirects & animations:**
- [x] Export existing Webflow 301 redirect rules (CSV already exported)
- [x] Normalize redirects and flatten chains (11 chains flattened)
- [x] Generate Cloudflare Pages `_redirects` format
- [x] Create auto-redirect generator for Run B comparison (placeholder)
- [x] Catalog all Webflow interactions/animations with implementation guidance
  - **Result:** 44 redirect rules, 325 unique Webflow interaction IDs, 11 animation/interaction patterns cataloged

Scripts to write (`scripts/phase1/` directory, TypeScript):
- `crawl-seo-baseline.ts` — crawl all public URLs, snapshot SEO fields
- `export-webflow-cms.ts` — export all 17 collections (live + staged) via Webflow API v2
- `snapshot-static-pages.ts` — save raw HTML for non-CMS pages
- `build-asset-inventory.ts` — aggregate + dedupe assets from all sources
- `download-assets.ts` — download assets with retry + manifest
- `upload-assets-to-r2.ts` — upload to R2, generate URL map
- `transform-cms-to-mdx.ts` — HTML → MDX conversion, URL rewriting, frontmatter
- `export-redirects.ts` — normalize Webflow redirect CSV + flatten chains
- `generate-auto-redirects.ts` — diff runs, detect slug changes/deletions
- `catalog-animations.ts` — parse HTML for interactions + scripts

Key considerations:
- Export **both** live AND staged items — live items become published content,
  staged-only items become drafts (`draft: true` in frontmatter)
- Handle 429 rate limits with Retry-After
- Parse rich text `<img>` and `<a>` tags for asset URL rewriting
- Keep Webflow item IDs in frontmatter for traceability
- Scripts must be **idempotent/re-runnable** (will run twice: now + before cutover)
- Handle item deletions between exports (old slug → 301 redirect)
- **Two CDN URL patterns**: `cdn.prod.website-files.com` (newer) + `uploads-ssl.webflow.com` (older)
- **SEO metadata not in CMS**: merge from baseline crawl during transform
- **Redirect CSV already exported**: `design/zenml-website-2026-02-10.csv` (45 rules)
- **RSS feeds to preserve**: `/blog/rss.xml` and `/llmops-database/rss.xml` (Phase 4, but crawl validates URLs exist)
- **R2 public access not yet enabled**: enable before upload step (Phase 1G)

**Key Learnings:**
- **Webflow has two CDN patterns**: Newer content uses `cdn.prod.website-files.com`, older content uses `uploads-ssl.webflow.com`. Both must be handled in asset discovery.
- **SEO metadata not in CMS**: Blog posts have no SEO-specific fields. SEO data merged from baseline crawl during MDX transformation.
- **Reference map is critical**: Built global lookup map (item ID → slug/name) to resolve all cross-collection references in frontmatter.
- **Redirect chains are common**: 11 redirect chains found (up to 3 hops). Flattening is essential for SEO and page load performance.
- **Boto3 is much faster than Wrangler**: Using Python's boto3 with ThreadPoolExecutor (10 workers) completed 2,397 uploads in ~30 seconds. Original Wrangler CLI approach was hitting network errors at 32% complete.
- **LLMOps database uses Markdown, not HTML**: Unlike blog posts, LLMOps entries are already Markdown, requiring light cleanup only (URL rewriting).
- **Webflow interactions are mostly fade-ins**: 325 unique data-w-id values found, but most are simple opacity 0→1 transitions on scroll. Can be replicated with IntersectionObserver + CSS.
- **Custom scripts are well-contained**: Homepage code highlighting, blog TOC, LLMOps filter, and ROI calculator are all self-contained widgets — perfect candidates for Preact islands.

**Run artifacts location:** `design/migration/phase1/runs/2026-02-11T0626Z/`

**Detailed plan**: `docs/phase-1-plan.md`

---

### Phase 2: Content Collections & Schemas (IN PROGRESS)

**Goal**: Define typed schemas for all content types in Astro. Validate that
imported content is clean and well-structured.

**Status:** Phase 2A-2E COMPLETE ✅ — All 17 collection schemas defined and validated. Critical schema discrepancies documented. Ready for Phase 2F (Copy MDX to src/content/).

Note: **Collection directory names should align with route segments** to
minimize glue code (e.g., `tags/` not `blog-tags/` if the route is `/tags/`).

Progress:
- [x] **Phase 2A**: Re-transform ALL collections with complete frontmatter ✅
- [x] **Phase 2B**: Set up reusable schema helpers in `src/content.config.ts` (Astro v5) ✅
- [x] **Phase 2C**: Export 10 reference collections (425 items total) ✅
- [x] **Phase 2D**: Define schemas for 10 reference collections ✅
  - Authors (27) — name, avatar, bio, email, linkedin
  - Categories (14) — simple tags
  - Tags (118) — simple tags
  - LLMOps Tags (107) — simple tags
  - Industry Tags (17) — simple tags
  - Integration Types (16) — name, slug, optional icon
  - Advantages (45) — title, content, image
  - Quotes (6) — testimonials with author + company
  - Product Categories (5) — simple tags
  - Project Tags (70) — simple tags
- [x] **Phase 2E**: Define schemas for 7 main collections ✅
  - Blog (317) — author, category, tags, date, mainImage
  - Integrations (68) — `integrationType`, logo, shortDescription, docsUrl
  - LLMOps Database (1,453) — `llmopsTags` (NO industryTags!), company, summary
  - Compare (17) — toolName, advantages, quote, many additional fields
  - Team (22) — position, photo, email, linkedin, order
  - Projects (16) — `mainImageLink`, tags, tools, githubUrl
  - Old Projects (11) — all drafts, different schema
  - ⚠️ **CRITICAL**: Schemas match actual output, not plan assumptions (see `docs/phase-2e-schema-discrepancies.md`)
- [ ] **Phase 2F**: Copy transformed MDX to `src/content/<collection>/` (1,904 files)
- [ ] **Phase 2I**: Add validation gates (slug uniqueness, URL checks)
- [ ] **Phase 2J**: Run full Astro build validation
- [ ] **Phase 2K**: Document final content model

**Key discoveries:**
- **Astro v5 Content Layer API**: Config moved to `src/content.config.ts`, requires explicit `glob` loaders
- **425 reference items + 1,479 main collection items** — all schemas defined
- **Schema patterns**: Simple tags (name+slug), rich authors, testimonials, advantages
- **CRITICAL**: Phase 2A field name fixes were never applied — actual output differs from plan
  - LLMOps uses `llmopsTags` (not `tags`), NO `industryTags` field exists
  - Integrations uses `integrationType` (not `type`), `shortDescription` (not `description`)
  - Projects uses `mainImageLink` (not `coverImage`)
  - Compare uses `toolName` (not `competitor`) + many additional fields
  - Full analysis: `docs/phase-2e-schema-discrepancies.md`

**Detailed plan**: `docs/phase-2-plan.md`

---

### Phase 3: Templates & Pages

**Goal**: Build all page templates and static pages. The site should render
every URL that currently exists.

Tasks:
- [ ] **Layouts**: Base layout (head, nav, footer), blog layout, content page layout
- [ ] **CMS template pages** (one per collection — renders individual items):
  - `/blog/[slug]` — Blog post
  - `/author/[slug]` — Blog author
  - `/category/[slug]` — Blog category
  - `/tags/[slug]` — Blog tag
  - `/integrations/[slug]` — Integration detail
  - `/integration-type/[slug]` — Integration type
  - `/compare/[slug]` — VS comparison page
  - `/team/[slug]` — Team member
  - `/llmops-database/[slug]` — LLMOps entry
  - `/llmops-tags/[slug]` — LLMOps tag
  - `/industry-tags/[slug]` — Industry tag
  - `/projects/[slug]` — Project detail
  - `/old-projects/[slug]` — Old project detail
  - `/advantages/[slug]`, `/quotes/[slug]`, etc. (if needed publicly)
- [ ] **Listing pages** (with pagination where needed):
  - `/blog` — Blog listing
  - `/integrations` — Integration listing
  - `/llmops-database` — LLMOps listing with filter + search UI (Preact island)
  - `/projects` — Projects listing
  - `/team` — Team listing
  - `/compare` — VS hub page
- [ ] **Static pages** (~44):
  - Home (`/`)
  - Pricing (`/pricing`)
  - ZenML Pro (`/pro`)
  - Features hub (`/features`) + 12 feature detail pages
  - Company (`/company`)
  - Careers (`/careers`)
  - Case studies hub (`/case-studies`) + 5 case study pages
  - Legal pages (privacy, terms, imprint, CLA)
  - Demo/booking pages
  - Newsletter pages
  - VS static pages (`/vs/zenml-vs-*`)
  - Redirects (Slack, discussion, roadmap, meet)
  - And more (see `docs/webflow-inventory.md` for full list)
- [ ] **LLMOps filter + search island**:
  - Build a **thin JSON index** (`public/llmops-index.json`) with structured fields only (NOT MDX bodies)
  - Client-side tag/category/industry filtering via Preact island
  - Integrate **Pagefind** for text search (parity-critical — current site has search)
- [ ] **Webflow animations/interactions**: recreate cataloged interactions in CSS/JS
  - Prioritize: must-replicate vs acceptable-downgrade (from Phase 1 catalog)
  - Ensure `prefers-reduced-motion` accessibility support
- [ ] **Navigation**: header nav + mobile menu
- [ ] **Footer**: consistent across all pages

**Detailed plan**: `docs/phase-3-plan.md` (create when starting this phase)

---

### Phase 4: SEO & Redirects

**Goal**: Ensure every existing URL works, all SEO metadata is preserved,
and the site is fully indexable by search engines and LLMs.

Tasks:
- [ ] Generate `sitemap.xml` (Astro built-in integration)
  - Only indexable pages (no drafts, no previews)
  - Correct canonical host (`www.zenml.io`)
  - `lastmod` where available
- [ ] Generate RSS feeds — **blog** and **LLMOps database** (match existing feed URLs exactly)
- [ ] Generate Open Graph images at build time (satori + sharp, or similar)
- [ ] Add `robots.txt`
- [ ] Preserve all meta tags per page (title, description, canonical URL)
- [ ] Preserve Open Graph and Twitter Card meta tags
- [ ] Add structured data (JSON-LD):
  - `Article` schema for blog posts
  - `Organization` / `Product` schema on key marketing pages
  - `BreadcrumbList` schema on deep taxonomies (tags, categories)
- [ ] Add `llms.txt` for GEO (Generative Engine Optimization)
- [ ] Migrate existing Webflow 301 redirects → Cloudflare Pages `_redirects` file
- [ ] Set up additional 301 redirects for any changed URLs
- [ ] **Automated head tag parity testing**: compare old vs new for all URLs using
  SEO baseline snapshot (title, description, canonical, OG, robots meta)
- [ ] Ensure all ~2,300+ URLs return 200 (or 301 to correct destination)
- [ ] Verify `<link rel="canonical">` on every page
- [ ] Ensure proper heading hierarchy (single H1 per page)
- [ ] Alt text on all images
- [ ] GEO optimization: well-structured content for LLM indexing

**Detailed plan**: `docs/phase-4-plan.md` (create when starting this phase)

---

### Phase 5: Forms & Interactive Features

**Goal**: Replace all Webflow forms with working alternatives.

Note: Forms *architecture* was decided in Phase 0. This phase is implementation.

Tasks:
- [ ] Implement form handlers per the Phase 0 architecture decision:
  - Demo booking → Cal.com embed
  - Newsletter signup → identified provider
  - Startups & Academics → identified destination
  - Whitepaper download → gated content flow (signed URLs? email gate?)
- [ ] Handle gated content (whitepapers/resources behind email forms)
- [ ] Add spam protection (Cloudflare Turnstile)
- [ ] Migrate cookie consent banner (or implement a new one)
- [ ] Test form submissions end-to-end
- [ ] Add Plausible analytics script to base layout
- [ ] Add Hotjar tracking script to base layout (behind cookie consent)
- [ ] Set up any needed Attio CRM integrations

**Detailed plan**: `docs/phase-5-plan.md` (create when starting this phase)

---

### Phase 6: QA & Cutover

**Goal**: Ship it.

Tasks:

**QA:**
- [ ] Automated visual regression testing (Playwright screenshots of old vs new)
- [ ] Automated SEO parity check against `design/seo-baseline.json`
- [ ] Lighthouse / PageSpeed audit (target: 90+ on all scores)
- [ ] Broken link checker across all URLs
- [ ] Cross-browser testing (Chrome, Firefox, Safari, mobile)
- [ ] Accessibility audit (WCAG basics)
- [ ] RSS feed validation (test with a feed validator)
- [ ] Performance: verify build time is reasonable (~2,300 pages)

**Pre-cutover setup:**
- [ ] Custom 404 page
- [ ] Favicon, apple-touch-icon, web manifest (`site.webmanifest`)
- [ ] Security headers via Cloudflare Pages `_headers` file (CSP, X-Frame-Options)
- [ ] Verify non-www → www redirect works (`zenml.io` → `www.zenml.io`)
- [ ] Final CMS re-export to catch any content published since initial export

**Cutover day (runbook):**
- [ ] Content freeze on Webflow (coordinate with team)
- [ ] Lower DNS TTL in Route 53 1-2 days before cutover (for fast rollback)
- [ ] DNS switch: point www.zenml.io from Webflow → Cloudflare Pages
- [ ] Verify: spot-check 20 key URLs (home, blog, pricing, LLMOps, forms)
- [ ] Verify: forms submit successfully
- [ ] Verify: analytics tracking fires

**Post-launch:**
- [ ] Monitor 404s (Cloudflare analytics or logpush)
- [ ] Monitor form submission failures
- [ ] Monitor Google Search Console for crawl errors, indexing issues
- [ ] Uptime checks on key money pages (pricing, demo booking)
- [ ] Keep Webflow as read-only backup on subdomain (e.g., old.zenml.io) for ~1-2 months
  - Enforce `noindex` headers + `robots.txt` disallow on old site
  - Add basic auth if feasible
- [ ] Delete Webflow site after confirmation period

**Rollback procedure (if needed):**
- [ ] Revert DNS to point back to Webflow (TTL was lowered, so propagates fast)
- [ ] Communicate rollback to team
- [ ] Investigate and fix issues on the new site
- [ ] Re-attempt cutover

**Detailed plan**: `docs/phase-6-plan.md` (create when starting this phase)

---

## Content Model Overview

Collection directory names align with route segments to minimize glue code:

```
src/content/
├── blog/                    # 317 posts as .md files
│   └── my-post-slug.md      # frontmatter: title, date, author, tags[], category, excerpt, cover, seoTitle, seoDesc, ogImage
├── authors/                 # 27 authors
│   └── john-doe.md          # frontmatter: name, avatar (R2 URL), bio
├── tags/                    # 118 tags (route: /tags/[slug])
│   └── mlops.md             # frontmatter: name, slug
├── categories/              # 14 categories (route: /category/[slug])
│   └── tutorials.md         # frontmatter: name, slug
├── llmops-database/         # 1,453 entries
│   └── some-entry.md        # frontmatter: structured fields + body as MDX
├── llmops-tags/             # 107 tags
├── industry-tags/           # 17 tags
├── integrations/            # 68 integrations
│   └── airflow.md           # frontmatter: logo, description, type, features[], code example
├── integration-types/       # 17 types
├── compare/                 # 17 VS pages (route: /compare/[slug])
│   └── zenml-vs-mlflow.md   # frontmatter: comparison data, advantages[], quotes[]
├── team/                    # 22 team members
├── projects/                # 16 new projects
├── old-projects/            # 11 legacy projects
├── quotes/                  # 6 testimonials
├── advantages/              # 45 comparison advantages
└── product-categories/      # 5 categories
```

Each collection will have a corresponding schema definition in `src/content/config.ts`.

**Performance note**: LLMOps Database (1,453 entries as MDX) should use a
**thin JSON index** for the client-side filter/search island. Do NOT ship MDX
bodies to the browser — only structured frontmatter fields.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **R2 custom domain requires Cloudflare DNS** | Can't use `assets.zenml.io` for POC | Use `r2.dev` URLs for now; find-and-replace when DNS moves to Cloudflare |
| Asset URLs break if Webflow deleted early | All images disappear | Download + re-host to R2 BEFORE any DNS changes. Keep Webflow on subdomain as backup. |
| Rich text conversion loses formatting | Blog posts look broken | Build a test suite with ~10 "gnarly" posts. Visual comparison. |
| Build time too long (~2,300 pages) | Slow deploys | Astro is fast at static builds. Monitor. Can use incremental builds if needed. |
| SEO ranking drops post-migration | Traffic loss | SEO baseline snapshot + automated parity testing. Preserve all URLs, meta, sitemaps, RSS feeds. Monitor Search Console. |
| Forms stop working | Lost leads | Architecture decided in Phase 0. Test all flows. Fallback: direct Cal.com link, email. |
| Webflow animations lost | UI feels "flat" | Catalog all interactions in Phase 1. Prioritize must-replicate vs acceptable-downgrade. |
| DNS propagation delay | Partial outage | Lower TTL in Route 53 days before cutover. Keep Webflow live as fallback. |
| RSS feed URLs change | Subscribers lose updates | Match existing RSS feed URLs exactly. Test with a feed validator. |
| Preview deployments indexed by Google | Duplicate content, SEO dilution | `noindex` headers on all Cloudflare Pages preview URLs |
| Old site (old.zenml.io) indexed | Duplicate content | Enforce `noindex` + `robots.txt` disallow on backup Webflow site |
| LLMOps filter ships huge payload | Slow TTI, bad UX | Thin JSON index for structured fields only; never ship MDX bodies to client |
| Trailing slash mismatch | Every URL 404s for SEO | Lock trailing slash policy in Phase 0 to match Webflow behavior |
| Static page content missed in export | Pages incomplete | Dedicated static page capture step in Phase 1 (separate from CMS export) |

---

## Tools & Skills to Build

As we find repetitive tasks during the migration, we should create Claude Code
skills for them. Likely candidates:

- **Content publishing skill**: Create/update a blog post or LLMOps entry from Markdown
- **Asset upload skill**: Upload an image to R2 and return the URL
- **SEO check skill**: Verify a page has proper meta tags, OG data, canonical URL
- **Build & preview skill**: Trigger a build and return the preview URL
- **SEO parity check skill**: Compare old vs new metadata for a given URL
