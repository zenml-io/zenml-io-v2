# ZenML Website v2 — Migration Plan

> Last updated: 2026-02-10
> Status: Plan reviewed, addressing critical findings before Phase 0 execution

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
| Image optimization | **TBD** — Astro built-in or Cloudflare | Decide once we see the asset volume |
| Content sync | **Re-export before launch** | Export now to build against; final export right before cutover |

### Decisions Needed (Phase 0)

| Decision | Choice | Notes |
|----------|--------|-------|
| **DNS** | **Stay on Route 53 for POC**, move to Cloudflare after team buy-in | No DNS changes needed for the proof of concept |
| **Asset domain** | **Use `r2.dev` URLs for POC**, switch to `assets.zenml.io` later | Find-and-replace in content when DNS moves to Cloudflare |
| **Trailing slash policy** | **Must match Webflow's current behavior** — lock before any URLs are generated | Check current site and configure `trailingSlash` in Astro |

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
- [ ] **Trailing slash policy**: Check Webflow's current URL format and lock `trailingSlash` config in Astro
- [ ] **Forms architecture audit**: Identify all form destinations (Cal.com, newsletter, Attio, gated content). Decide on implementation approach before building pages.
- [ ] Note: DNS stays on Route 53 for POC. Assets use `r2.dev` URLs. Migrate DNS to Cloudflare + custom asset domain after team buy-in.

**Project scaffold:**
- [ ] Initialize Astro project with TypeScript
- [ ] Add Tailwind CSS, Cloudflare adapter, Preact, Sitemap, MDX integrations
- [ ] Configure `astro.config.ts` for static output + Cloudflare
- [ ] Set up basic project structure (`src/content/`, `src/layouts/`, `src/components/`, `src/pages/`)
- [ ] Add basic linting/formatting (Biome)
- [ ] Verify local build (`dev`, `build`, `preview`, `check`)

**Infrastructure:**
- [ ] Set up Cloudflare R2 bucket for assets (with chosen domain strategy)
- [ ] Connect repo to Cloudflare Pages (auto-deploy on push)
- [ ] Verify branch preview deployments work (push a test branch)
- [ ] Ensure preview deployments are `noindex` (`X-Robots-Tag` header or `robots.txt` via `CF_PAGES_BRANCH` env var)

**Design extraction:**
- [ ] Extract design tokens from Webflow (variables, styles) → populate `tailwind.config.ts`
- [ ] Download Webflow code export as reference (save to `design/webflow-export/`)
- [ ] Capture baseline screenshots of key pages (save to `design/screenshots/baseline/`)
- [ ] Audit Webflow site-level custom code (head/body scripts, third-party tags)

**Documentation:**
- [ ] Move plan `.md` files from `design/` to `docs/`
- [ ] Update `.gitignore` accordingly

**Detailed plan**: `docs/phase-0-plan.md`

---

### Phase 1: Content Export & Transform

**Goal**: Get ALL content out of Webflow — CMS data, static page content, SEO
metadata, assets, and redirects. Transform into Astro-ready format.

Tasks:

**SEO baseline snapshot (do first — this is the acceptance test suite):**
- [ ] Crawl all public URLs on current site and snapshot per URL:
  status code, canonical, `<title>`, meta description, OG tags, H1, word count
- [ ] Save as `design/seo-baseline.json` — used for automated parity testing in Phase 6

**CMS content export:**
- [ ] Write CMS export script (Python, via Webflow API v2) — see skeleton in `docs/investigation_2.md`
- [ ] Export all 20 CMS collections — **both live AND staged items**
  (live → published, staged-only → `draft: true` in frontmatter)
- [ ] Explicitly capture SEO fields per CMS item (SEO title, meta description, OG image, publish/update dates)
- [ ] Resolve CMS references (e.g., blog post → author, blog post → tags)

**Static page content export:**
- [ ] Inventory and capture ~44 static pages + feature pages + case study content
  (CMS export doesn't cover these — need crawl/snapshot or manual extraction)
- [ ] Extract page structure from Webflow MCP `element_tool` (per page DOM trees)

**Asset migration:**
- [ ] Export site-wide assets list via Webflow MCP `asset_tool`
- [ ] Download ALL image/file assets from Webflow-hosted URLs:
  - CMS image/file fields
  - Rich text HTML (`<img>`, `<source>`, `<a href>` to PDFs)
  - CSS background images
  - Favicons, social images, site settings assets
- [ ] Upload assets to Cloudflare R2 (via Wrangler CLI)
- [ ] Generate URL mapping file (`old_webflow_url → new_r2_url`)

**Content transformation:**
- [ ] Convert rich text HTML → MDX (Turndown or remark pipeline)
- [ ] Rewrite asset URLs in content to point to R2
- [ ] Transform into Astro Content Collection format (`.md` files with frontmatter)
- [ ] Validate all content against Astro schemas
- [ ] Handle edge cases: embedded videos, iframes, code blocks in rich text

**Redirects & animations:**
- [ ] Export existing Webflow 301 redirect rules
- [ ] Catalog all Webflow interactions/animations (by page, with priority: must-replicate vs acceptable-downgrade)

Scripts to write (`scripts/` directory):
- `export-cms.py` — export CMS collections via Webflow API v2
- `export-assets.py` — download all images/files from Webflow URLs
- `upload-assets.sh` — bulk upload to R2 via Wrangler
- `transform-content.py` — HTML → MDX conversion, URL rewriting, frontmatter generation
- `export-redirects.py` — export existing redirect rules from Webflow
- `crawl-seo-baseline.py` — crawl all URLs and snapshot SEO metadata

Key considerations:
- Export **both** live AND staged items — live items become published content,
  staged-only items become drafts (`draft: true` in frontmatter)
- Handle 429 rate limits with Retry-After
- Parse rich text `<img>` and `<a>` tags for asset URL rewriting
- Keep Webflow item IDs in frontmatter for traceability
- Scripts must be **idempotent/re-runnable** (will run twice: now + before cutover)
- Handle item deletions between exports (old slug → 301 redirect)

**Detailed plan**: `docs/phase-1-plan.md` (create when starting this phase)

---

### Phase 2: Content Collections & Schemas

**Goal**: Define typed schemas for all content types in Astro. Validate that
imported content is clean and well-structured.

Note: **Collection directory names should align with route segments** to
minimize glue code (e.g., `tags/` not `blog-tags/` if the route is `/tags/`).

Tasks:
- [ ] Define Astro Content Collection schemas for each content type:
  - Blog Posts (title, date, author ref, tags refs, category ref, excerpt, cover image, SEO fields, body)
  - Blog Authors (name, avatar, bio)
  - Tags — maps to `/tags/[slug]` route
  - Categories — maps to `/category/[slug]` route
  - LLMOps Database entries (structured fields + rich body)
  - LLMOps Tags, Industry Tags
  - Integrations (logo, description, code example, features, type ref)
  - Integration Types
  - VS/Compare Pages (comparison tables, code examples, advantages refs)
  - Team Members (name, photo, position, bullet points, email, LinkedIn)
  - Projects (new + old)
  - Quotes
  - Advantages
  - Product Categories
- [ ] Organize content into `src/content/<collection>/` directories
- [ ] Run Astro build to validate all content passes schema checks
- [ ] Fix any content that fails validation

**Detailed plan**: `docs/phase-2-plan.md` (create when starting this phase)

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
