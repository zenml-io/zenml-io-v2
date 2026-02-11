# Phase 3: Templates & Pages — Detailed Plan

**Created:** 2026-02-11
**Last Updated:** 2026-02-11 (3H-1a + 3H-1b complete)
**Status:** 3A–3G COMPLETE, 3H-1a + 3H-1b COMPLETE — 3H-3 through 3H-7 remaining
**Prerequisites:**
- Phase 2 complete (2,392 content files, 17 collections, all validation passing)
- **Content format:** Switched from .mdx to .md (MDX v2 too strict for Webflow HTML)
- **industryTags extraction fixed** (commit 900cda5) — all 1,453 LLMOps entries now have industry filtering data

### 3A Implementation Progress (2026-02-11)

| # | Task | Status | Files |
|---|------|--------|-------|
| 1 | SEO utility | ✅ | `src/lib/seo.ts` (SEOProps interface, resolveSeo, buildCanonical) |
| 2 | Constants + CSS | ✅ | `src/lib/constants.ts` (DEFAULT_OG_IMAGE), `src/styles/global.css` (.prose scope + raw HTML compat) |
| 3 | UI primitives | ✅ | `src/components/{Button,Card,Badge,Image}.astro` |
| 4 | Navigation data | ✅ | `src/lib/navigation.ts` (full dropdown/link/CTA data from Webflow export) |
| 5 | Navigation component | ✅ | `src/components/Navigation.astro` (desktop dropdowns + mobile hamburger) |
| 6 | Footer | ✅ | `src/lib/footer.ts` + `src/components/Footer.astro` (social SVG icons inlined) |
| 7 | BaseLayout upgrade | ✅ | SEO meta, nav/footer chrome, Plausible analytics, updated index.astro |
| 8 | Content layouts | ✅ | `src/layouts/ContentLayout.astro` (prose wrapper) + `BlogLayout.astro` (author/date/tags) |
| 9 | Build validation | ✅ | `pnpm build` passes cleanly (commit 79491b0) |

### 3C–3G Implementation Progress (2026-02-11)

| # | Task | Status | Files / Notes |
|---|------|--------|---------------|
| 3C | Reference collection taxonomy pages | ✅ | 6 pages: author, category, tags, llmops-tags, industry-tags, integration-type |
| 3D | Integrations detail + listing | ✅ | `integrations/[slug].astro` + `integrations/index.astro` (grouped by type) |
| 3E-1 | LLMOps detail pages | ✅ | `llmops-database/[slug].astro` (1,453 entries) |
| 3E-2 | LLMOps JSON index | ✅ | `llmops-index.json.ts` (~505KB gzip, 1.8MB raw) |
| 3E-3 | LLMOps filter island | ✅ | `components/islands/LLMOpsFilter.tsx` (text search, multi-tag AND, single industry, pagination, URL sync) |
| 3E-listing | LLMOps listing page | ✅ | `llmops-database/index.astro` (with no-JS fallback) |
| 3F | VS comparison pages | ✅ | `compare/[slug].astro` + `compare/index.astro` (advantages + quotes resolved) |
| 3G | Team + Projects | ✅ | `team/[slug].astro`, `team/index.astro`, `projects/[slug].astro`, `projects/index.astro` |
| fix | Tailwind token fixes | ✅ | Added `primary-*` aliases, fixed `rounded-radius-*` → `rounded-*` (commit 8af2243) |

**Build stats:** 721 pages (pre-3E) → ~2,176 pages (with 1,453 LLMOps + listing + JSON). Build time ~26s.

**Commits:**
- `2cba90d` — Phase 3C: Reference collection taxonomy pages
- `9960fa8` — Phase 3D/3F/3G: Integrations, compare, team, projects
- `8af2243` — Tailwind token fixes (primary-* aliases, rounded-radius-* → rounded-*)
- `06c873e` — Phase 3E: LLMOps Database listing + Preact filter island

### 3H-1a + 3H-1b Implementation Progress (2026-02-11)

| # | Task | Status | Files / Notes |
|---|------|--------|---------------|
| 3H-1a | Legal pages + 404 | ✅ | `404.astro`, `cla.astro`, `imprint.astro`, `privacy-policy.astro`, `terms-of-service.astro`, `public/images/404.svg` |
| 3H-1b | Homepage + section components | ✅ | `src/pages/index.astro` (full 13-section composition), `src/lib/homepage.ts` (data), 11 section components in `src/components/sections/` |
| — | BaseLayout slot | ✅ | Added `before-nav` named slot for AnnouncementBanner injection |

**Homepage section components created (11):**

| Component | Section | Notes |
|-----------|---------|-------|
| `AnnouncementBanner.astro` | Gradient ribbon above nav | Uses `before-nav` named slot |
| `Hero.astro` | Headline + CTAs + visual placeholder | Lottie animation deferred (gradient placeholder for now) |
| `LogoCloud.astro` | 8 customer logos trust bar | Grayscale → color on hover |
| `FeatureTabs.astro` | 5-tab showcase + 4-stat grid | JS tab switching, ARIA roles |
| `ValueProps.astro` | 4-card grid + CTA | Value propositions below features |
| `IntegrationsMarquee.astro` | CSS-animated logo strip | Fetches from integrations collection, 60s infinite loop, hover pause |
| `WhitepaperCTA.astro` | Dark promotional banner | Gradient bg, links to whitepaper page |
| `CustomerStories.astro` | Case study cards + testimonials | Merges CMS quotes (6) + hardcoded extras (7) |
| `NewsSection.astro` | 3 latest blog posts | Build-time fetch from blog collection |
| `ComplianceSection.astro` | SOC2/ISO badges + arch diagram | Split layout with `<picture>` for mobile |
| `NewsletterSignup.astro` | Email form placeholder | Brevo integration deferred to Phase 5 |
| `FAQAccordion.astro` | 5 Q&A items | Native `<details>` elements, zero JS |
| `FinalCTA.astro` | Dark section with bullets + screenshot | Product screenshot + dual CTAs |

**Key decisions made:**
- All marketing copy centralized in `src/lib/homepage.ts` (~320 lines of typed data)
- 7 testimonials hardcoded in homepage.ts (not in CMS quotes collection) — can add to collection later
- Hero Lottie animation deferred (gradient placeholder) — needs Preact island
- Newsletter Brevo form is placeholder UI only — functional form in Phase 5
- GitHub stars link only (no live count widget yet)
- Feature tab images use R2 AVIF URLs (need hash verification)

**Build stats:** ~2,180 pages, homepage output 147KB. Build time ~22s.

**Commits:**
- `504a006` — Phase 3H-1a: Legal pages + 404
- `3bbca80` — Phase 3H-1b: Homepage with 13 section components

---

## Overview

Phase 3 is where the site becomes **visible**. We'll build every page template and static page needed to render all ~2,300 URLs from the current site. The goal is **1:1 visual parity** with Webflow — pixel-perfect recreation first, improvements later.

**Key principle:** Build incrementally, validate early. Start with one collection (blog), get the full render pipeline working, then systematically replicate for all other collections.

---

## Goals

1. **Build base layouts** — shared structure (head, nav, footer) for all pages
2. **Build CMS template pages** — individual item pages for all 17 collections
3. **Build listing/index pages** — blog index, integrations grid, LLMOps filter, etc.
4. **Build static pages** — home, pricing, features, case studies (**64 published pages**, per `page-index.json`)
5. **Implement LLMOps filter + search** — Preact island with tag/industry filtering (critical) + optional Pagefind text search
6. **Recreate Webflow animations** — CSS/JS for cataloged interactions
7. **Build navigation & footer** — consistent across all pages
8. **Validate render output** — spot-check 20 key URLs for visual parity

---

## Success Criteria

- ✅ All 2,392 content items render successfully (no build errors)
- ✅ All CMS collections have working template pages
- ✅ All listing pages render with correct filtering/sorting
- ✅ All static pages render with correct content (64 published pages from `page-index.json`)
- ✅ LLMOps filter works with tag/industry filtering (CRITICAL) + substring text search (full-text search via Pagefind is nice-to-have, can defer to Phase 4)
- ✅ Navigation and footer match current site
- ✅ Build completes in <30 seconds (reasonable for 2,300+ pages)
- ✅ Spot-check visual parity on 20 key pages

---

## Content Collections to Template

### Main Collections (with individual pages)

| Collection | Count | Route Pattern | Template File | Listing Page |
|------------|-------|---------------|---------------|--------------|
| blog | 317 | `/blog/<slug>` | `src/pages/blog/[slug].astro` | `/blog` (paginated) |
| integrations | 68 | `/integrations/<slug>` | `src/pages/integrations/[slug].astro` | `/integrations` (grid) |
| llmops-database | 1,453 | `/llmops-database/<slug>` | `src/pages/llmops-database/[slug].astro` | `/llmops-database` (filter) |
| compare | 17 | `/compare/<slug>` | `src/pages/compare/[slug].astro` | `/compare` (hub) |
| team | 22 | `/team/<slug>` | `src/pages/team/[slug].astro` | `/team` (grid) |
| projects | 16 | `/projects/<slug>` | `src/pages/projects/[slug].astro` | `/projects` (grid) |
| old-projects | 11 | N/A (drafts only) | N/A | N/A |

### Reference Collections (with taxonomy pages)

| Collection | Count | Route Pattern | Template File | Listing Behavior |
|------------|-------|---------------|---------------|------------------|
| authors | 27 | `/author/<slug>` | `src/pages/author/[slug].astro` | Shows blog posts by author |
| categories | 14 | `/category/<slug>` | `src/pages/category/[slug].astro` | Shows blog posts in category |
| tags | 118 | `/tags/<slug>` | `src/pages/tags/[slug].astro` | Shows blog posts with tag |
| llmops-tags | 107 | `/llmops-tags/<slug>` | `src/pages/llmops-tags/[slug].astro` | Shows LLMOps entries with tag |
| industry-tags | 17 | `/industry-tags/<slug>` | `src/pages/industry-tags/[slug].astro` | Shows LLMOps entries with industry tag |
| integration-types | 17 | `/integration-type/<slug>` | `src/pages/integration-type/[slug].astro` | Shows integrations of type |
| project-tags | 132 | N/A (embedded only) | N/A | N/A |
| advantages | 45 | N/A (embedded in compare) | N/A | N/A |
| quotes | 6 | N/A (embedded) | N/A | N/A |
| product-categories | 5 | N/A (embedded) | N/A | N/A |

**Note:** `old-projects` are all drafts and won't generate public routes.

---

## Phase 3 Sub-Tasks

### 3A: Base Layouts & Shared Components

**Goal:** Build the foundational layout structure that all pages will use.

Tasks:
- [ ] Create `src/layouts/BaseLayout.astro`
  - HTML boilerplate with proper `<head>` structure
  - SEO meta tags (title, description, canonical, Open Graph, Twitter Card)
  - Design tokens from `docs/design-tokens.md` loaded in `<head>`
  - Plausible analytics script (defer Phase 5 if needed)
  - Navigation component (slot)
  - Main content area (slot)
  - Footer component (slot)
- [ ] Create `src/components/Navigation.astro`
  - Desktop nav with dropdowns (match current site structure)
  - Mobile nav with hamburger menu
  - Active state highlighting for current page
- [ ] Create `src/components/Footer.astro`
  - Multi-column footer with links, social icons
  - Newsletter signup form (if present — defer actual submission to Phase 5)
  - Legal links (privacy, terms, imprint)
- [ ] Create `src/layouts/ContentLayout.astro`
  - Extends BaseLayout
  - Standard content wrapper with prose styling
  - Breadcrumbs component (optional)
  - Social share buttons (optional, can defer)
- [ ] Create `src/layouts/BlogLayout.astro`
  - Extends BaseLayout
  - Author byline with avatar
  - Published date and reading time
  - Category and tags chips
  - Table of contents (if long post)
  - Related posts section (optional, can defer)
- [ ] Create reusable components:
  - `src/components/Button.astro` (CTA buttons, styled variants)
  - `src/components/Card.astro` (blog card, integration card, project card)
  - `src/components/Badge.astro` (tags, categories)
  - `src/components/Image.astro` (wrapper for responsive images)

**Validation:**
- Render a simple test page with BaseLayout
- Verify navigation and footer render correctly
- Check responsive behavior (mobile, tablet, desktop)

**Reference:** Design tokens in `docs/design-tokens.md`, Webflow HTML export in `design/webflow-export/`

---

### 3B: Blog Template & Listing

**Goal:** Get the full blog render pipeline working end-to-end. Blog is the most complex collection (authors, categories, tags, rich content), so if blog works, other collections will be easier.

Tasks:
- [ ] Create `src/pages/blog/[slug].astro`
  - Use `getStaticPaths()` to generate routes from blog collection
  - Filter out drafts (`draft: true` items don't generate routes)
  - Render MDX content with `<Content />` component
  - Use BlogLayout
  - Render author byline (fetch from authors collection)
  - Render category badge (fetch from categories collection)
  - Render tags (fetch from tags collection)
  - Render main image (from R2)
  - Add prev/next post navigation (optional, can defer)
- [ ] Create `src/pages/blog/index.astro`
  - List all published blog posts (exclude drafts)
  - Sort by date (newest first)
  - Pagination (10-20 posts per page)
  - Filter sidebar or dropdown (by category, by tag — can defer if complex)
  - Search box (defer actual search to Phase 3E)
- [ ] Create `src/pages/blog/page/[page].astro` (if using Astro's built-in pagination)
  - Paginated blog listing (alternative to infinite scroll)

**Validation:**
- Build succeeds for all 317 blog posts
- Spot-check 5 blog posts for visual parity:
  - Check rich text rendering (headings, lists, code blocks, images)
  - Check author byline matches Webflow
  - Check tags/categories render correctly
- Verify pagination works on blog index

**Edge cases to handle:**
- Posts with no author (fallback to "ZenML Team"?)
- Posts with no category (fallback to "Uncategorized"?)
- Posts with missing images (placeholder image)
- Posts with embedded videos or iframes (preserve HTML)

---

### 3C: Reference Collection Templates

**Goal:** Build taxonomy pages that show related content (e.g., `/tags/mlops` shows all posts tagged "mlops").

Tasks:
- [ ] Create `src/pages/author/[slug].astro`
  - Render author bio, avatar, social links
  - List all blog posts by this author
  - Sort by date (newest first)
- [ ] Create `src/pages/category/[slug].astro`
  - Render category name
  - List all blog posts in this category
  - Sort by date
- [ ] Create `src/pages/tags/[slug].astro`
  - Render tag name
  - List all blog posts with this tag
  - Sort by date
- [ ] Create `src/pages/llmops-tags/[slug].astro`
  - Render tag name
  - List all LLMOps database entries with this tag
  - Sort by name or relevance
- [ ] Create `src/pages/industry-tags/[slug].astro`
  - Render industry tag name
  - List all LLMOps database entries with this industry tag
- [ ] Create `src/pages/integration-type/[slug].astro`
  - Render integration type name and icon
  - List all integrations of this type
  - Grid layout (match integrations listing)

**Validation:**
- Build succeeds for all reference collections (27 authors + 14 categories + 118 tags + 107 llmops-tags + 17 industry-tags + 17 integration-types = 300 pages)
- Spot-check 3 taxonomy pages (1 author, 1 tag, 1 integration-type)
- Verify filtering works (only related items shown)

**Note:** These pages are essentially "filtered listing" views. Reuse the same listing components from 3B/3D/3E.

---

### 3D: Integrations Template & Listing

**Goal:** Build integrations pages (individual integration detail + grid listing).

Tasks:
- [ ] Create `src/pages/integrations/[slug].astro`
  - Render integration name, logo, short description
  - Render integration type badge (fetch from integration-types)
  - Render full MDX body (features, installation, code examples)
  - Link to docs URL (external)
  - Link to GitHub repo (if present)
- [ ] Create `src/pages/integrations/index.astro`
  - Grid layout of all integration cards
  - Filter by integration type (dropdown or sidebar)
  - Search box (defer actual search if needed)
  - Alphabetical sorting

**Validation:**
- Build succeeds for all 68 integrations
- Spot-check 3 integrations for visual parity
- Verify grid layout matches current site

**Design reference:** Current site has a clean card-based grid. See `design/screenshots/baseline/integrations-*.png`.

---

### 3E: LLMOps Database Template, Listing, Filter Island ⚠️ CRITICAL

**Goal:** Build the LLMOps database pages (1,453 entries) with working client-side filter + search. This is the **most complex feature** in Phase 3.

**Why critical:** The current site has a heavily-used filter UI (tags, industry, text search). Users expect this to work. Losing this feature would be a regression.

#### 3E-1: LLMOps Template Page

- [ ] Create `src/pages/llmops-database/[slug].astro`
  - Render entry name, company, logo
  - Render summary (short description)
  - Render llmops-tags badges (fetch from llmops-tags collection)
  - Render industry-tags badge (single value: `industryTags?: string` — tech, healthcare, finance, etc.)
  - Render full MDX body (features, pricing, use cases, etc.)
  - Link to website URL (external)
  - Link to related entries (same tags — optional, can defer)

**Validation:**
- Build succeeds for all 1,453 entries
- Spot-check 5 entries for visual parity
- Verify tags render correctly

#### 3E-2: Thin JSON Index for Client-Side Filtering

**Goal:** Build a lightweight JSON file with structured fields only (NOT MDX bodies) for the client-side filter island.

**Build Strategy:** Use an **Astro endpoint** (recommended) instead of external script. This avoids `astro:content` import issues in plain Node/tsx scripts.

- [ ] Create `src/pages/llmops-index.json.ts` (Astro endpoint)
  - Import LLMOps collection via `getCollection('llmops-database')`
  - Filter out drafts
  - Extract structured fields with correct mapping:
    - `slug` → `entry.id`
    - `name` → `entry.data.title` (schema uses `title` not `name`)
    - `company` → `entry.data.company`
    - `summary` → `entry.data.summary`
    - `llmopsTags` → `entry.data.llmopsTags` (array of slugs)
    - `industryTags` → `entry.data.industryTags` (single slug string, optional)
    - `year`, `link` → optional additional fields
  - Add `export const prerender = true;` for static generation
  - Return JSON via `Response` object
  - Target size: <500 KB (1,453 entries × ~300 bytes each)
- [ ] Verify JSON is generated at build time in `dist/llmops-index.json`

**Rationale:** Shipping 1,453 MDX bodies to the browser would be massive (10+ MB). We only need structured metadata for filtering.

**Validation:**
- Verify JSON file size is reasonable (<500 KB)
- Verify JSON contains all entries (count === 1,453)
- Verify required fields are present

#### 3E-3: LLMOps Filter Island (Preact)

**Goal:** Build an interactive filter UI that runs entirely client-side. Users can filter by tags, industry, and search text.

- [ ] Create `src/components/LLMOpsFilter.tsx` (Preact component)
  - Fetch `/llmops-index.json` on mount
  - Render filter UI:
    - Multi-select dropdown for llmops-tags
    - Multi-select dropdown for industry-tags
    - Text search input (searches name, company, summary fields)
    - Clear filters button
  - Filter logic:
    - Tag filters are AND (entry must have ALL selected tags from llmopsTags array)
    - Industry filters are OR (entry's single industryTags value matches ANY selected industry)
    - Text search is substring match (case-insensitive search on name, company, summary)
  - Render filtered results as a grid of cards
  - Pagination or infinite scroll (10-20 entries per page)
- [ ] Create `src/pages/llmops-database/index.astro`
  - Render `<LLMOpsFilter client:load />` island
  - Provide static fallback (server-rendered list) for no-JS users

**Validation:**
- Verify filter UI renders correctly
- Test tag filtering (select 1 tag, 2 tags, 3 tags)
- Test industry filtering
- Test text search (search "vector", "mlflow", "databricks")
- Test clear filters button
- Verify performance (1,453 entries should filter in <100ms)

**Design reference:** Current site has a sidebar filter with tag chips + search box. See `design/screenshots/baseline/llmops-database-*.png`.

**Note:** Pagefind integration (text search) is listed in plan.md as Phase 3. If Pagefind setup is complex, we can defer to Phase 4 and use simple substring search for Phase 3.

#### 3E-4: Pagefind Integration (Optional — defer to Phase 4 unless trivial)

Pagefind is a build-time search index generator for full-text search. The current site has text search on LLMOps database, BUT:
- **Tag/industry filtering is CRITICAL** (must work in Phase 3)
- **Full-text search is nice-to-have** (substring search may be sufficient for launch)

If Pagefind integration is straightforward:
- [ ] Install `pagefind` and `astro-pagefind` integration
- [ ] Configure Pagefind to index LLMOps pages
- [ ] Add Pagefind search UI to LLMOps filter island
- [ ] Verify search works across all 1,453 entries

If Pagefind integration is complex (build pipeline issues, Cloudflare Pages compatibility), defer to Phase 4. Implement simple substring search (case-insensitive search on name/company/summary fields) in Phase 3.

#### 3E-5: MDX Raw HTML Rendering Strategy ⚠️ CRITICAL

**Issue:** Content from Webflow contains raw HTML structures that won't automatically render correctly:
- Code blocks: `<div><pre><code class="language-python">` with Webflow-specific classes
- Compare tables: `<table>` with `.tooltip`, `.icon`, `.tooltiptext` classes
- These won't be touched by Shiki (which only processes Markdown fenced code blocks)

**Hybrid Strategy:**

1. **CSS Styling for Raw HTML** (Phase 3A — add to global.css):
   - Add styles for Webflow HTML structures:
     - `pre code[class*="language-"]` — code block styling
     - `.tooltip`, `.tooltiptext`, `.icon` — comparison table styles
   - Ensure prose styling doesn't break these structures

2. **Optional: Transform at Build Time** (if CSS isn't sufficient):
   - Create custom MDX components:
     - `CodeBlock.astro` — wraps raw HTML code blocks with proper syntax highlighting
     - `CompareTable.astro` — renders comparison tables with tooltip support
   - Pass to `<Content components={{ ... }} />`

3. **Long-term: Fix at Transform Time** (Phase 1 script improvement — post-launch):
   - Update `transform-cms-to-mdx.ts` to normalize HTML → clean Markdown
   - Convert `<div><pre><code>` → proper fenced code blocks
   - Convert complex HTML tables → Markdown tables (where feasible)

**Tasks:**
- [ ] Audit content for raw HTML patterns (code blocks, tables, embeds)
- [ ] Add CSS for Webflow HTML structures to `src/styles/global.css`
- [ ] Test rendering on 5 "gnarly" posts (blog, integrations, compare)
- [ ] Create custom MDX components only if CSS approach fails

**Validation:**
- Spot-check blog posts with code examples (blog/zenml-llm-llmops)
- Spot-check compare pages with tables (compare/zenml-vs-mlflow)
- Verify tooltips work on hover

---

### 3F: VS Comparison Pages (Compare Collection)

**Goal:** Build comparison pages (e.g., `/compare/zenml-vs-mlflow`) with structured comparison data.

Tasks:
- [ ] Create `src/pages/compare/[slug].astro`
  - Render comparison hero (ZenML vs. <Competitor>)
  - Render advantages list (fetch from advantages collection via IDs in frontmatter)
  - Render comparison table (feature matrix, if present in frontmatter)
  - Render testimonial quote (fetch from quotes collection, if present)
  - Render full MDX body (detailed comparison content)
- [ ] Create `src/pages/compare/index.astro` (hub page)
  - Grid of all VS pages with competitor logos
  - Optional: category filters (if compare items have categories)

**Validation:**
- Build succeeds for all 17 compare pages
- Spot-check 2 compare pages for visual parity (e.g., zenml-vs-mlflow, zenml-vs-kubeflow)
- Verify advantages and quotes render correctly

**Note:** Compare pages use embedded advantages and quotes. Verify schema allows fetching these by ID.

---

### 3G: Team, Projects, and Other Collections

**Goal:** Build remaining collection templates (team, projects).

Tasks:
- [ ] Create `src/pages/team/[slug].astro`
  - Render team member photo, name, position
  - Render bio (MDX body)
  - Render social links (email, LinkedIn, GitHub)
- [ ] Create `src/pages/team/index.astro`
  - Grid of all team members with photos
  - Sort by order field (if present) or alphabetically
- [ ] Create `src/pages/projects/[slug].astro`
  - Render project name, main image, tags, tools
  - Render description (MDX body)
  - Link to GitHub repo, demo, or external site
- [ ] Create `src/pages/projects/index.astro`
  - Grid of all project cards
  - Filter by project-tags (optional)

**Validation:**
- Build succeeds for team (22 items) and projects (16 items)
- Spot-check 2 team members, 2 projects for visual parity

---

### 3H: Static Pages (58 pages to build — 64 published minus 6 CMS listings already done)

**Goal:** Build all non-CMS pages (home, pricing, features, case studies, legal, forms, redirects, etc.).

**Source material:**
- HTML snapshots: `design/migration/phase1/runs/2026-02-11T0626Z/pages/published/`
- Page inventory: `design/migration/phase1/runs/2026-02-11T0626Z/pages/page-index.json`
- Forms reference: `docs/forms-audit.md`
- Baseline screenshots: `design/screenshots/baseline/`

**Strategy:** Build in 8 sub-phases, ordered by dependency + business impact. Components are built just-in-time alongside the pages that need them (not speculatively upfront).

**Already built (Phase 3A–3G) — NOT in scope for 3H:**
`/blog`, `/integrations`, `/projects`, `/llmops-database`, `/compare`, `/team` (6 CMS listing pages)

---

#### 3H Inventory: All 58 Pages by Group

| Group | Pages | Count | Complexity | Priority |
|-------|-------|-------|------------|----------|
| **B) Core marketing hubs** | `/`, `/pricing`, `/pro`, `/features`, `/case-studies`, `/company`, `/careers` | 7 | H | P0/P1 |
| **C) Feature detail family** | `/features/*` (12 pages) | 12 | M (repeatable) | P0 |
| **D) Case study family** | `/case-study/*` (5 pages) | 5 | M (repeatable) | P0 |
| **E) VS category pages** | `/vs/zenml-vs-*` (3 pages) | 3 | M (repeatable) | P1 |
| **F) Conversion support** | `/open-source-vs-pro`, `/get-started`, `/deployments`, `/startups-and-academics`, `/whitepaper-*` | 5 | M/H | P0/P1 |
| **G) Form/scheduling/success** | `/book-your-demo`, `/schedule-a-demo`, `/success-calendar`, `/book-a-demo`, `/signup-for-demo`, `/booked`, `/book-success`, `/book-a-demo-success`, `/newsletter-signup`, `/newsletter-success` | 10 | L–H | P0–P2 |
| **H) Interactive/utility** | `/roi-calculator`, `/live-demo`, `/interactive-demo-mcp`, `/components` | 4 | H/M/L | P2 |
| **I) Legal/compliance** | `/privacy-policy`, `/terms-of-service`, `/imprint`, `/cla` | 4 | M | P0/P1 |
| **J) Redirect-only URLs** | `/slack`, `/slack-invite`, `/roadmap`, `/discussion`, `/meet`, `/zenml-meet` | 6 | L | P0/P1 |
| **Other** | `/404`, `/cloud-features/ml-models-control-plane` | 2 | L/M | P0/P2 |
| | | **58** | | |

---

#### 3H-1a: Legal Pages + 404

**Goal:** Build the simplest P0 pages first. These need no new section components — just ContentLayout + prose styling for legal text, and a simple 404 page.

**Pages (5):**
- [x] `/404` — custom not-found page (P0)
- [x] `/privacy-policy` — legal text (P0, linked from footer)
- [x] `/terms-of-service` — legal text (P0, linked from footer)
- [x] `/imprint` — legal text (P0, linked from footer)
- [x] `/cla` — contributor license agreement (P1, JS redirect to GitHub Gist)

**Approach:**
- Extract text content from HTML snapshots in `design/migration/phase1/runs/2026-02-11T0626Z/pages/published/`
- Wrap in ContentLayout (existing) for legal pages
- 404 page: simple BaseLayout with friendly message + search/home link

**Validation:**
- All 4 legal pages render with correct content
- Footer legal links (`src/lib/footer.ts` → FOOTER_LEGAL) resolve to real pages
- 404 page works when navigating to non-existent URLs
- `pnpm build` passes

---

#### 3H-1b: Homepage + Section Components

**Goal:** Build the homepage — the most complex single page (769 lines in Webflow snapshot), highest traffic. Build section components **just-in-time** as the homepage needs them (~7 components). These components then get reused by later sub-phases.

**Page:** `/` (`src/pages/index.astro`) — **P0, Complexity: H**

**New section components created (11, vs original estimate of ~7):**
- [x] `Hero.astro` — headline, CTAs, GitHub link, visual placeholder (Lottie deferred)
- [x] `LogoCloud.astro` — 8 customer logos, grayscale → color on hover
- [x] `FeatureTabs.astro` — 5-tab feature showcase + 4-stat grid (replaces FeatureGrid + StatsStrip)
- [x] `ValueProps.astro` — 4-card value propositions grid + CTA
- [x] `IntegrationsMarquee.astro` — CSS-animated integration logo strip (from collection)
- [x] `WhitepaperCTA.astro` — dark/purple promotional banner
- [x] `CustomerStories.astro` — 4 case study cards + testimonial grid (replaces TestimonialQuote)
- [x] `ComplianceSection.astro` — SOC2/ISO badges + architecture diagram (replaces SplitSection)
- [x] `NewsSection.astro` — 3 latest blog posts (build-time fetch)
- [x] `NewsletterSignup.astro` — email form placeholder (Brevo deferred)
- [x] `FAQAccordion.astro` — 5 Q&A items using native `<details>` (moved from 3H-5 since homepage needed it)
- [x] `FinalCTA.astro` — dark section with bullets + product screenshot (replaces CTASection)
- [x] `AnnouncementBanner.astro` — gradient ribbon above navigation

**Homepage sections (from Webflow snapshot analysis — all 13 built):**
- [x] Announcement banner (above nav, gradient ribbon)
- [x] Hero with headline, sub-headline, CTA buttons
- [x] Logo cloud (customer logos)
- [x] Feature tabs (5 tabs with screenshots + 4 stats)
- [x] Value propositions (4-card grid)
- [x] Integrations marquee (CSS-animated logo slider)
- [x] Whitepaper CTA (dark banner)
- [x] Customer stories (case study cards + testimonial grid)
- [x] Blog highlights (3 latest posts)
- [x] Compliance section (SOC2/ISO + architecture diagram)
- [x] Newsletter signup CTA (placeholder form)
- [x] FAQ accordion (5 questions)
- [x] Final CTA section

**Components deferred to later sub-phases (built when needed):**
- `PricingPlans.astro`, `PricingComparisonTable.astro` → 3H-5 (pricing)
- `CalEmbed.astro`, `BrevoNewsletterForm.astro`, `SuccessPanel.astro` → 3H-6 (form pages)
- `RedirectPage.astro` → 3H-7 (redirects)

**Validation:**
- Visual parity with `design/screenshots/baseline/` homepage screenshots
- All section components render correctly
- Links in hero and CTAs work
- `pnpm build` passes

---

#### 3H-3: Feature Detail Pages (12 + hub)

**Goal:** Build all 12 feature detail pages using a shared template. These are P0 because they're directly linked from the navigation dropdown.

**Architectural decision:** Create a **content collection** `src/content/feature-pages/` with frontmatter (title, description, hero image, sections) and a dynamic route `src/pages/features/[slug].astro`. This avoids 12 hand-coded pages and ensures consistent SEO/CTAs.

**Pages:**
- [ ] `/features` — features hub page (grid of all 12 features)
- [ ] `/features/iterate-at-warp-speed`
- [ ] `/features/auto-track-everything`
- [ ] `/features/shared-ml-building-blocks`
- [ ] `/features/backend-flexibility-zero-lock-in`
- [ ] `/features/limitless-scaling`
- [ ] `/features/streamline-cloud-expenses`
- [ ] `/features/security-guardrails-always`
- [ ] `/features/centralized-model-control-plane`
- [ ] `/features/organize-assets-into-projects`
- [ ] `/features/streamlined-pipeline-management`
- [ ] `/features/role-based-access-control-and-permissions`
- [ ] `/features/enterprise-grade-support-and-onboarding`

**Tasks:**
- [ ] Define `featurePages` schema in `src/content.config.ts`
- [ ] Create 12 content files in `src/content/feature-pages/`
- [ ] Create `src/pages/features/[slug].astro` (dynamic route template)
- [ ] Create `src/pages/features/index.astro` (hub page with grid)

**Validation:**
- All 12 feature pages render with correct content
- Features hub links to all 12 pages
- Navigation dropdown feature links resolve correctly

---

#### 3H-4: Case Studies (5 + hub) + VS Category Pages (3)

**Goal:** Build case study and VS page families using shared templates. Both are repeatable structures.

**Architectural decisions:**
- **Case studies:** Create content collection `src/content/case-studies/` with dynamic route `src/pages/case-study/[slug].astro`
- **VS pages:** Use a single template + typed config object (only 3 pages)

**Case study pages (P0):**
- [ ] `/case-studies` — hub page (grid of all case studies)
- [ ] `/case-study/jetbrains`
- [ ] `/case-study/adeo-leroy-merlin`
- [ ] `/case-study/cross-screen-media`
- [ ] `/case-study/brevo`
- [ ] `/case-study/zuiver`

**VS category pages (P1):**
- [ ] `/vs/zenml-vs-orchestrators`
- [ ] `/vs/zenml-vs-experiment-trackers`
- [ ] `/vs/zenml-vs-e2e-platforms`

**Tasks:**
- [ ] Define `caseStudies` schema in `src/content.config.ts`
- [ ] Create 5 content files in `src/content/case-studies/`
- [ ] Create `src/pages/case-study/[slug].astro` (template with challenge/solution/results structure)
- [ ] Create `src/pages/case-studies.astro` (hub)
- [ ] Create VS page template + data config
- [ ] Create 3 VS pages (or dynamic route if using config)

**Validation:**
- All 5 case studies + hub render correctly
- Case study nav links resolve (JetBrains, Adeo, Cross Screen featured in nav)
- VS pages linked from footer render correctly

---

#### 3H-5: Core Marketing Pages

**Goal:** Build the bespoke marketing pages that reuse section components from 3H-1. These are the hardest pages because each has unique content and layout.

**Pages:**
- [ ] `/pricing` — P0, H (pricing tiers, comparison table, FAQ)
- [ ] `/pro` — P0, H (ZenML Pro product marketing)
- [ ] `/open-source-vs-pro` — P0, H (comparison/positioning)
- [ ] `/get-started` — P0, M/H (onboarding funnel)
- [ ] `/deployments` — P1, M/H (technical explainer)
- [ ] `/company` — P1, H (company story, values, team grid)
- [ ] `/careers` — P1, M/H (job listings via Notion links)

**Validation:**
- Visual parity on pricing page (most scrutinized page after home)
- All nav/footer links to these pages resolve
- Pricing tiers render correctly with correct feature lists

---

#### 3H-6: Form/Conversion + Success + Newsletter Pages

**Goal:** Build form and scheduling pages. Cal.com embeds and Brevo newsletter should be **functional in 3H**. Webflow-native forms get UI parity with graceful fallback (full backend in Phase 5).

**Form strategy (per `docs/forms-audit.md`):**

| Type | Phase 3H behavior | Pages |
|------|-------------------|-------|
| **Cal.com embed** | **Fully functional** — render Cal.com inline embed | `/book-your-demo` (P0), `/schedule-a-demo` (P1), `/success-calendar` (P1) |
| **Brevo newsletter** | **Fully functional** — replicate fetch() POST | `/newsletter-signup` (P1) |
| **Webflow native form** | **UI parity + conversion-safe fallback** — render form styling but link primary CTA to `/book-your-demo` instead of dead submit | `/book-a-demo` (P1), `/signup-for-demo` (P1) |
| **Application form** | UI parity + disabled submit | `/startups-and-academics` (P1) |
| **Gated content form** | UI parity + disabled submit | `/whitepaper-*` (P1) |
| **Success pages** | Simple confirmation text | `/booked`, `/book-success`, `/book-a-demo-success`, `/newsletter-success` (P2) |

**Pages (14 total):**
- [ ] `/book-your-demo` — Cal.com embed, **must be functional** (P0)
- [ ] `/schedule-a-demo` — Cal.com embed (reschedule variant) (P1)
- [ ] `/success-calendar` — Cal.com embed (post-form-submission) (P1)
- [ ] `/newsletter-signup` — Brevo embed, functional (P1)
- [ ] `/newsletter-success` — simple confirmation (P2)
- [ ] `/book-a-demo` — form UI + redirect CTA to `/book-your-demo` (P1)
- [ ] `/signup-for-demo` — form UI + redirect CTA to `/book-your-demo` (P1)
- [ ] `/startups-and-academics` — application form placeholder (P1)
- [ ] `/whitepaper-architecting-an-enterprise-grade-mlops-platform` — gated content placeholder (P1)
- [ ] `/booked` — success page (P2)
- [ ] `/book-success` — success page (P2)
- [ ] `/book-a-demo-success` — success page (P2)

**Validation:**
- Cal.com embed loads and shows calendar on `/book-your-demo`
- Newsletter signup on `/newsletter-signup` submits to Brevo
- Form placeholder pages have clear path to actual booking

---

#### 3H-7: Redirects + Interactive/Utility + Remaining

**Goal:** Handle redirect-only URLs, interactive utility pages, and any remaining miscellaneous pages.

**Redirect-only URLs (6 pages):**
Short-term: ship minimal Astro pages with `noindex` + JS redirect (matches Webflow behavior).
Long-term (Phase 4): migrate to `_redirects` file for 301 redirects via Cloudflare Pages.

- [ ] `/slack` → Slack community invite URL (P0, referenced in nav/footer)
- [ ] `/slack-invite` → Slack invite link (P1)
- [ ] `/roadmap` → `zenml.featureos.app/roadmap` (P0, referenced in nav/footer)
- [ ] `/discussion` → GitHub discussions (P1)
- [ ] `/meet` → redirect (P2)
- [ ] `/zenml-meet` → redirect (P2)

**Interactive/utility pages:**
- [ ] `/roi-calculator` — client-side widget, Preact island (P2, 692 lines in snapshot)
- [ ] `/live-demo` — interactive demo page (P2)
- [ ] `/interactive-demo-mcp` — interactive demo page (P2)
- [ ] `/components` — internal styleguide (P2, may skip entirely)
- [ ] `/cloud-features/ml-models-control-plane` — similar to feature detail page (P2)

**Validation:**
- Redirect URLs don't 404 (either page or redirect)
- ROI calculator sliders work (if built)

---

#### 3H Architectural Decisions

**Decision 1 — Feature + case study pages as data-driven content collections**
Create `src/content/feature-pages/` and `src/content/case-studies/` collections (NOT hand-coded `.astro` pages). This gives consistent SEO, CTAs, and auto-generated hub pages. Adds schemas to `src/content.config.ts`.

**Decision 2 — VS category pages: static data module + one template**
A single template + typed config object (title, description, recommended `/compare/*` children). Only 3 pages, strong reuse.

**Decision 3 — Redirect-only URLs: temporary JS redirect pages → `_redirects` 301s in Phase 4**
Don't keep JS redirects long-term (worse SEO, slower). Phase 3H ships temporary redirect pages; Phase 4 migrates to Cloudflare Pages `_redirects` file.

**Decision 4 — Forms: functional where embed-only; graceful fallback where backend-needed**
Cal.com and Brevo embeds work in Phase 3H. Webflow-native forms get UI parity but redirect primary CTA to `/book-your-demo` so leads can still convert. Full form backend (Workers → Attio) in Phase 5.

**Decision 5 — `/cloud-features/ml-models-control-plane` handling**
Implement using FeatureDetail template (same as `/features/*` family) with distinct content. If truly redundant with `/features/centralized-model-control-plane`, can 301 redirect instead.

---

#### 3H Wave Implementation Order

**Wave 1 (P0 — "no broken nav + money pages"):**
1. 3H-1a: Legal pages + 404
2. 3H-1b: Homepage + core section components (~7)
3. 3H-3: First 6 nav-linked feature pages + features hub
4. 3H-4: First 3 nav-featured case studies + hub
5. `/book-your-demo` (Cal.com embed, functional)
6. `/open-source-vs-pro`, `/get-started`
7. Redirect-only: `/slack`, `/roadmap`, `/slack-invite`

**Wave 1 exit condition:** Every link in `src/lib/navigation.ts` and `src/lib/footer.ts` resolves to a real page or redirect.

**Wave 2 (P1 — "complete the static surface area"):**
1. 3H-3 remaining: 6 more feature detail pages
2. 3H-4 remaining: 2 more case studies + 3 VS pages
3. 3H-5: `/pricing`, `/pro`, `/company`, `/careers`, `/deployments`
4. 3H-6: newsletter pages, scheduling pages, form placeholder pages
5. Redirect-only: `/discussion`, `/meet`, `/zenml-meet`

**Wave 3 (P2 — "nice-to-have + legacy"):**
1. 3H-6 remaining: success/thank-you pages
2. 3H-7: ROI calculator, live-demo, interactive-demo-mcp
3. `/components`, `/cloud-features/ml-models-control-plane`
4. Decide: keep `/book-a-demo` + `/signup-for-demo` or redirect to `/book-your-demo`

---

#### 3H Estimated New Component Count: ~18–24

| Category | Count | Examples |
|----------|-------|---------|
| Page templates | 3–4 | FeatureDetailPage, CaseStudyDetailPage, VSCategoryPage, (MarketingPage conventions) |
| Section components | 10–14 | Hero, FeatureGrid, SplitSection, CTASection, FAQAccordion, PricingPlans, StatsStrip, TestimonialQuote, LogoCloud, PricingComparisonTable |
| Embed/form components | 4–6 | CalEmbed, BrevoNewsletterForm, SuccessPanel, RedirectPage, WebflowFormPlaceholder |

---

#### 3H Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Conversion loss on form pages | Ensure `/book-your-demo` is fully functional in Wave 1; link all form placeholders to it |
| Nav/footer link rot during phased rollout | Wave 1 exit condition = every URL in navigation.ts + footer.ts resolves |
| Scope explosion from bespoke marketing pages | Enforce section library approach; build Home first, reuse to assemble Pricing/Pro |
| SEO regression on case studies | CaseStudy template owns JSON-LD; use frontmatter, avoid per-page hand edits |
| Redirect pages implemented as JS redirects (SEO) | Migrate to 301 via `_redirects` in Phase 4; keep JS redirects only as temporary scaffolding |

---

### 3I: Webflow Animations & Interactions

**Goal:** Recreate the most important Webflow interactions cataloged in Phase 1.

**Reference:** `design/migration/phase1/runs/2026-02-11T0626Z/animations/catalog.json` (325 unique interaction IDs) and `design/migration/phase1/runs/2026-02-11T0626Z/animations/notes.md` (11 patterns cataloged with must-replicate classifications)

**Strategy:** Prioritize **must-replicate** interactions (visible, user-facing) over **nice-to-have** (subtle micro-interactions).

**⚠️ CRITICAL: Cookie Consent is Cross-Cutting** (not just an animation)

The animation catalog lists `cookie-consent` as **must-replicate**, BUT this is NOT just a UI animation—it's a **cross-cutting runtime policy** that gates analytics/tracking scripts in Phase 5.

**Implications for Phase 3:**
- Cookie consent banner must render (UI component)
- Cookie preference storage (localStorage)
- BUT: Actual script gating logic deferred to Phase 5 (when analytics/Hotjar are added)

**Phase 3 Scope:**
- Build cookie consent UI component (banner, accept/reject/customize buttons)
- Store user preferences in localStorage
- Add CSS for banner styling

**Phase 5 Scope:**
- Implement script gating logic (only load analytics if consent given)
- Integrate with Plausible, Hotjar, etc.
- Respect consent categories (necessary, analytics, marketing)

#### Must-Replicate Interactions (high visual impact)

From Phase 1 animation audit:
1. **Fade-in on scroll** (most common — 200+ instances)
   - Implement with IntersectionObserver + CSS transitions
   - Example: Feature cards, blog cards, testimonials
2. **Navbar scroll behavior** (sticky header with shadow on scroll)
   - CSS: `position: sticky` + scroll listener for shadow class
3. **Mobile menu slide-in** (hamburger menu animation)
   - CSS: transform + transition
4. **CTA button hover effects** (scale, shadow, color shift)
   - CSS: `transform: scale(1.05)` + `box-shadow` transition
5. **Hero section animations** (headline + CTA fade-in on page load)
   - CSS animations with `animation-delay`

#### Nice-to-Have Interactions (can defer or simplify)

6. **Parallax effects** (background images move slower than foreground)
   - Can be simplified or removed (minimal impact)
7. **Number counters** (animated count-up for stats)
   - Can be deferred or use CSS-only animation
8. **Image zoom on hover** (slight scale increase)
   - CSS: `transform: scale(1.1)` on hover
9. **Tab switchers** (feature comparison tabs)
   - JavaScript: simple show/hide logic
10. **Video play on scroll into view** (autoplay when visible)
    - IntersectionObserver + `video.play()`

#### Implementation Tasks

- [ ] Create `src/utils/animations.ts` (reusable animation utilities)
  - `fadeInOnScroll()` function using IntersectionObserver
  - `stickyNavShadow()` function for navbar scroll behavior
- [ ] Create `src/styles/animations.css` (reusable animation classes)
  - `.fade-in-up`, `.fade-in-left`, `.fade-in-right` classes
  - `.scale-hover` class for buttons
  - Respect `prefers-reduced-motion` media query (disable animations if set)
- [ ] Apply animations to key components:
  - Add `fadeInOnScroll()` to Card components
  - Add sticky shadow to Navigation component
  - Add hover effects to Button components
- [ ] Test animations across browsers (Chrome, Firefox, Safari)

**Validation:**
- Animations feel smooth (60 fps)
- Animations respect `prefers-reduced-motion` (accessibility)
- No janky scroll behavior

**Note:** If time-constrained, defer all animations except fade-in-on-scroll (most common and highest visual impact).

---

### 3J: Navigation & Footer (Final Polish)

**Goal:** Ensure navigation and footer are consistent across all pages and match the current site.

Tasks:
- [ ] Verify navigation dropdown menus work (if present)
  - Features dropdown (list of feature pages)
  - Resources dropdown (blog, docs, case studies)
- [ ] Verify mobile menu works (hamburger icon, slide-in menu)
- [ ] Verify active state highlighting (current page highlighted in nav)
- [ ] Verify footer links are correct (all links point to valid pages)
- [ ] Verify footer newsletter signup renders (defer actual submission to Phase 5)
- [ ] Verify footer social icons link to correct profiles

**Validation:**
- Navigation works on desktop and mobile
- Footer renders consistently across all pages
- All links in nav and footer are valid (no 404s)

---

### 3K: Build Validation & Performance

**Goal:** Ensure the build completes successfully and performs well.

Tasks:
- [ ] Run `pnpm run check` (Astro type-checking)
- [ ] Run `pnpm run validate:content` (custom validation gates from Phase 2)
- [ ] Run `pnpm run build`
  - Verify build completes in <30 seconds (reasonable for 2,300+ pages)
  - Verify no build errors or warnings (except acceptable TypeScript warnings)
  - Verify output size is reasonable (<50 MB for dist/)
- [ ] **Route Coverage Check** (prevent invisible missing pages):
  - Compare built routes in `dist/` against expected routes:
    - Static pages: 64 published from `page-index.json`
    - CMS pages: 2,392 content files (minus drafts, minus old-projects)
    - Taxonomy pages: authors, categories, tags, etc.
  - Flag any missing routes (pages that should exist but don't)
  - Flag any unexpected routes (pages that shouldn't exist)
  - **Tool:** Create `scripts/phase3/verify-route-coverage.ts` (optional but recommended)
- [ ] Spot-check 20 key URLs in `dist/` directory:
  - `/index.html` (home)
  - `/blog/some-post.html` (blog post)
  - `/integrations/airflow.html` (integration)
  - `/llmops-database/some-entry.html` (LLMOps entry)
  - `/compare/zenml-vs-mlflow.html` (VS page)
  - `/team/some-member.html` (team member)
  - `/projects/some-project.html` (project)
  - `/author/some-author.html` (author taxonomy)
  - `/tags/mlops.html` (tag taxonomy)
  - `/pricing.html` (pricing page)
  - And 10 more...
- [ ] Verify HTML is well-formed (no unclosed tags, no invalid nesting)
- [ ] Verify images load (R2 URLs are correct)
- [ ] Verify internal links work (no broken anchor links)

**Validation:**
- Build succeeds with 0 errors
- All 2,392 content items generate valid HTML
- Spot-check confirms visual parity on 20 key pages

---

## Design & Content Reference

### Design Tokens

All design tokens (colors, fonts, spacing, shadows) are documented in `docs/design-tokens.md`.

**Implementation:**
- Tailwind v4 uses `@theme` block in CSS (not `tailwind.config.js`)
- Tokens are already extracted in `src/styles/global.css`
- Use Tailwind utility classes in components (e.g., `bg-primary-500`, `text-gray-900`)

### Webflow HTML Export

Webflow code export is saved in `design/webflow-export/` (exported on 2026-02-10).

**Use cases:**
- Reference HTML structure for complex components (navbar, footer, hero sections)
- Extract Webflow class names for CSS parity (if needed)
- Extract Webflow interactions code (data-w-id attributes)

**DO NOT copy-paste Webflow HTML directly** — it's bloated with Webflow-specific classes. Use it as a visual reference only.

### Static Page Snapshots

Static page HTML snapshots are in `design/migration/phase1/runs/2026-02-11T0626Z/pages/` with inventory at `pages/page-index.json` (64 published, 12 drafts).

**Use cases:**
- Extract content text for static pages (headlines, body copy, CTAs)
- Reference page structure (sections, layout, hierarchy)

**Process:**
- Read HTML snapshot
- Manually convert to Astro component structure
- Extract text content and rewrite in clean semantic HTML

### Baseline Screenshots

Baseline screenshots (34 captured, 2 timeouts) are in `design/screenshots/baseline/`.

**Use cases:**
- Visual comparison during development (does my Astro page look like the screenshot?)
- Identify missing sections or layout differences
- Validate responsive behavior (desktop, tablet, mobile)

**Viewports captured:**
- Desktop: 1920×1080
- Tablet: 768×1024
- Mobile: 375×667

---

## Key Technical Considerations

### 1. Draft Content Handling

- **Draft items** (`draft: true` in frontmatter) should NOT generate public routes
- Use `getStaticPaths()` filter: `const published = await getCollection('blog', ({ data }) => !data.draft)`
- Old-projects collection: ALL items are drafts (don't generate routes at all)

### 2. Slug Generation

- Astro uses **filename** as slug (NOT frontmatter `slug` field)
- All MDX files already use clean slugs from Phase 1 transform
- Example: `src/content/blog/my-post-slug.mdx` → `/blog/my-post-slug`

### 3. Reference Resolution

- Use Astro's `getEntry()` and `getCollection()` to fetch related items
- Example: Blog post has `author: "john-doe"` → fetch with `const author = await getEntry('authors', post.data.author)`
- Array of slugs: `const tags = await Promise.all(post.data.tags.map(slug => getEntry('tags', slug)))`

### 4. Image Optimization

- All images are already on R2 (migrated in Phase 1)
- For Phase 3: use R2 URLs directly (no optimization)
- Post-launch: consider Cloudflare Image Resizing or Astro's `<Image />` component with responsive srcset

### 5. MDX Rendering

- Use Astro's `<Content />` component to render MDX bodies
- Custom MDX components (if needed) can be passed via `components` prop
- Example: Custom `<CodeBlock>` component for syntax highlighting

### 6. Performance: Thin JSON Index for LLMOps

- **Critical:** Do NOT ship 1,453 MDX bodies to the browser
- Build a thin JSON index with structured fields only
- Target size: <500 KB (~300 bytes per entry)
- Load JSON on demand (client-side fetch, not bundled)

### 7. Pagination

- Astro has built-in pagination support: `paginate()` in `getStaticPaths()`
- Use for blog listing (10-20 posts per page)
- Optional for other listings (integrations, projects) if count is manageable

### 8. Accessibility

- All animations must respect `prefers-reduced-motion`
- Navigation must be keyboard-accessible (tab navigation)
- Images must have alt text (from frontmatter)
- Semantic HTML (proper heading hierarchy, landmarks)

### 9. SEO Interface (Phase 3→4 Handoff Contract) ⚠️ CRITICAL

**Issue:** Phase 3 builds BaseLayout with SEO tags, Phase 4 does SEO parity testing. Without a stable interface, Phase 4 will require refactoring all templates.

**Define NOW (Phase 3A):**

1. **SEO Props Interface** for BaseLayout:
   ```typescript
   interface SEOProps {
     title: string;
     description: string;
     canonical?: string;
     ogTitle?: string;
     ogDescription?: string;
     ogImage?: string;
     twitterCard?: 'summary' | 'summary_large_image';
     noindex?: boolean;
   }
   ```

2. **Field Resolution Strategy** (handle schema variations):
   - **Compare pages**: Have BOTH `seo.description` AND `seoDescription` fields
   - **Blog/LLMOps**: Have `seo: { title, description, ogImage }` object
   - **Strategy**: Prefer `data.seo.*` if exists, fall back to top-level fields

3. **Default Values**:
   - Canonical: Always `${SITE_URL}${Astro.url.pathname}` (no trailing slash)
   - OG Title: Falls back to `title` if not specified
   - OG Description: Falls back to `description` if not specified
   - OG Image: Falls back to site-wide default if not specified

4. **Phase 4 Responsibilities** (NOT Phase 3):
   - Automated parity testing against Phase 1 SEO baseline
   - Open Graph image generation (satori + sharp)
   - Structured data (JSON-LD)
   - Sitemap generation (already works via Astro integration)

**Benefit:** Phase 3 templates implement once; Phase 4 adds generation/testing without refactoring.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **LLMOps filter too slow** (1,453 entries) | Poor UX, users frustrated | Build thin JSON index (<500 KB), test on low-end devices |
| **Build time too long** (2,300+ pages) | Slow deploys, bad DX | Astro is fast. If needed, use incremental builds or parallel builds. |
| **MDX rendering breaks on complex content** | Blog posts look broken | Test with "gnarly" posts (tables, code, embeds). Add custom MDX components. |
| **Webflow animations hard to replicate** | Site feels flat or broken | Prioritize must-replicate interactions. Defer nice-to-haves. |
| **Static page content incomplete** | Pages missing sections | Use HTML snapshots + screenshots for reference. Ask user to review. |
| **Missing design context** | Pages don't look right | Refer to design tokens doc + Webflow HTML export + screenshots. |
| **Navigation dropdowns complex** | Desktop nav doesn't match | Simplify if needed. Parity > perfection in Phase 3. |
| **Pagefind integration complex** | Delays Phase 3 | Defer to Phase 4 if needed. Use simple substring search for Phase 3. |

---

## Success Metrics

At the end of Phase 3, we should have:

- ✅ **2,392 pages rendering** — all content items generate valid HTML
- ✅ **17 working templates** — one per collection (minus old-projects)
- ✅ **64 static pages** — home, pricing, features, case studies, legal, etc. (per `page-index.json`)
- ✅ **LLMOps filter working** — tag/industry/text filtering with <100ms response time
- ✅ **Navigation & footer consistent** — match current site structure
- ✅ **Build time <30s** — reasonable for 2,300+ pages
- ✅ **Visual parity on 20 key pages** — spot-check confirms design match
- ✅ **No build errors** — `pnpm run build` succeeds with 0 errors

---

## Next Steps After Phase 3

Once Phase 3 is complete, the site will be **visible and navigable** but not yet SEO-ready or production-ready. Phase 4 will add:

- Sitemap.xml generation
- RSS feeds (blog + LLMOps)
- Open Graph image generation
- 301 redirect rules
- robots.txt
- SEO parity testing (automated comparison against baseline)
- Structured data (JSON-LD)
- llms.txt for GEO

Phase 5 will add:
- Working forms (demo booking, newsletter, whitepaper download)
- Analytics integration (Plausible, Hotjar)
- CRM integration (Attio)

Phase 6 will be QA + cutover:
- Visual regression testing
- Broken link checking
- Cross-browser testing
- Accessibility audit
- DNS cutover
- Launch! 🚀

---

## Notes for Implementation

- **Work incrementally**: Build blog first (full pipeline), then replicate for other collections.
- **Validate early**: Run builds frequently to catch errors early.
- **Prioritize parity over perfection**: Get 1:1 visual parity first, optimize later.
- **Defer if blocked**: If Pagefind integration is complex, defer to Phase 4. If animations are hard, defer nice-to-haves.
- **Ask for help**: If stuck on design decisions, ask the user for screenshots or Webflow URLs.
- **Document as you go**: Add comments to complex components, update this plan if scope changes.

---

## Revision History

### 2026-02-11: Post-Critical Review Updates

**Context:** RepoPrompt's `context_builder` performed a critical architectural review and identified 10 issues. All issues addressed in this revision.

**Changes Made:**

1. ✅ **LLMOps industryTags** (BLOCKER)
   - **Issue:** Schema had no `industryTags` field; filter couldn't work
   - **Fix:** Fixed transform script (commit 900cda5), updated schema, re-ran transform
   - **Result:** All 1,453 entries now have industry filtering data

2. ✅ **Static Page Count** (Scope Underestimate)
   - **Issue:** Plan said "~44 pages", actual count is 64 published
   - **Fix:** Updated all references to 64, added `page-index.json` as source of truth

3. ✅ **Route Path Corrections** (Parity Breaking)
   - **Issue:** Examples used wrong paths (case-studies, /privacy, /terms)
   - **Fix:** Corrected to match inventory (/case-study/, /privacy-policy, /terms-of-service)

4. ✅ **Pagefind Priority** (Conflict)
   - **Issue:** Master plan said "critical", Phase 3 said "optional"
   - **Fix:** Clarified: filtering is CRITICAL, full-text search is nice-to-have (defer if complex)

5. ✅ **LLMOps JSON Index Build Strategy** (Feasibility Gap)
   - **Issue:** No clear strategy; importing `astro:content` from external scripts is hard
   - **Fix:** Recommended Astro endpoint approach (`src/pages/llmops-index.json.ts`)

6. ✅ **MDX Raw HTML Rendering** (Missing Strategy)
   - **Issue:** Content has raw HTML (code blocks, tables) that won't auto-render
   - **Fix:** Added 3E-5 with hybrid strategy (CSS + optional MDX components)

7. ✅ **SEO Interface** (Phase 3→4 Handoff Gap)
   - **Issue:** No stable interface = Phase 4 refactoring all templates
   - **Fix:** Added section 9 defining SEO props interface and resolution strategy

8. ✅ **Cookie Consent** (Cross-Cutting Not Animation)
   - **Issue:** Treated as simple animation, but it's a runtime policy for Phase 5
   - **Fix:** Added warning to 3I clarifying Phase 3 vs Phase 5 scope

9. ✅ **Form Pages** (Placeholder Strategy Missing)
   - **Issue:** 4+ pages are primarily forms; no strategy for Phase 3 rendering
   - **Fix:** Added placeholder strategy (render UI, disable submit until Phase 5)

10. ✅ **Validation Strengthening** (Coverage Gap)
    - **Issue:** "Spot-check 20 URLs" too weak for 2,300+ pages
    - **Fix:** Added route coverage check to 3K (compare built routes vs expected)

**Artifact Path Corrections:**
- `static-pages/` → `pages/` (actual location)
- `animations-catalog.json` → `animations/catalog.json` (actual filename)

### 2026-02-11: Post-Verification Review (Second Pass)

**Context:** RepoPrompt's `context_builder` performed final verification review and found 3 BLOCKERS + 5 MAJOR issues missed in manual review.

**Critical Fixes (commit 0db071d):**

1. ✅ **Removed stale industryTags note** (BLOCKER)
   - Section 3E-1 line 245 had contradictory "NO industryTags field" note
   - Fixed: Clarified single string value with correct field description

2. ✅ **Fixed case studies routing** (BLOCKER)
   - Hub was wrong: `/case-study/` → correct: `/case-studies` (plural)
   - Detail correct: `/case-study/[slug]` (singular)
   - Per `page-index.json` source of truth

3. ✅ **Corrected form page classification** (BLOCKER)
   - Was: `/book-a-demo` labeled as Cal.com embed
   - Correct: Webflow native form (Cal.com embeds are /book-your-demo, /schedule-a-demo)
   - Per `docs/forms-audit.md` source of truth

4. ✅ **Fixed static page count heading** (MAJOR)
   - Section 3H title still said "~44 pages" → now "64 published pages"

5. ✅ **Fixed animation notes path** (MAJOR)
   - Was incomplete: `animations/notes.md`
   - Now complete: `design/migration/phase1/runs/2026-02-11T0626Z/animations/notes.md`

6. ✅ **Fixed LLMOps JSON index field mapping** (MAJOR)
   - Clarified: schema uses `title` not `name`
   - Noted: industryTags is single value (not array)
   - Added: `export const prerender = true;` requirement

7. ✅ **Fixed Pagefind priority conflict** (MAJOR - updated `docs/plan.md`)
   - Master plan now consistent: filtering critical, full-text search nice-to-have

**Verification Status:** Plan is now **ready for Phase 3 implementation** with no known blockers.

### 2026-02-11: 3H-1a + 3H-1b Implementation Learnings

**Context:** Built legal pages + 404 (3H-1a) and full homepage with 13 section components (3H-1b).

**What we learned:**

1. **Homepage has 13 sections, not 9.** Original plan estimated ~9 sections and ~7 components. Actual Webflow homepage has 13 distinct sections requiring 11 new components + 2 more (AnnouncementBanner, FAQAccordion) that weren't anticipated. The FAQ accordion was originally scoped for 3H-5 (pricing) but the homepage needs it too.

2. **BaseLayout needed a `before-nav` named slot.** The AnnouncementBanner sits above the Navigation in the DOM. Since BaseLayout hardcodes `<Navigation>` before the main `<slot>`, we added a named `<slot name="before-nav" />`. Named slots in Astro render nothing if unused, so no impact on other pages.

3. **Centralized data file is essential for marketing pages.** All homepage copy, URLs, stats, and FAQ content lives in `src/lib/homepage.ts` (~320 lines). This pattern should be reused for pricing, features, and other marketing pages in later sub-phases. Marketing can update copy without touching component HTML.

4. **Testimonial gap: 7 of 11 homepage testimonials aren't in the CMS.** The Webflow homepage has 11 testimonials but only 6 exist in the `quotes` collection (Clement Depraz, Francois Serra ×3, Goku Mohandas, Richard Socher). The other 7 (Harold Gimenez/HashiCorp, Chris Manning/Stanford, Maximillian Baluff/IT4IPM, Liza Bykhanova/Competera, Francesco Pudda/WiseTech, Christian Versloot/Infoplaza, Dragos Ciupureanu/Koble) are hardcoded in Webflow page HTML. Decision: hardcoded in `homepage.ts` for now; can add to quotes collection later.

5. **CLA page: BaseLayout has no `<slot name="head">`.** Originally tried to inject `<meta http-equiv="refresh">` via a named head slot, but BaseLayout doesn't define one. Solved by using JS `window.location.replace()` + visible fallback link. Adding a head slot to BaseLayout would be a useful enhancement if other pages need custom head injection.

6. **R2 asset URL hashes need verification.** The hash portion of R2 URLs (e.g., `${R2}/6a2ae7e3/670e2f23...`) was inferred from Webflow CDN URLs during Phase 1 asset migration. Some hashes may be incorrect if the R2 upload used different naming. Need to spot-check a few images load correctly.

7. **Hero Lottie animation needs a Preact island.** The Webflow hero uses a Lottie JSON animation (hero-0925.json, 6.4s, autoplay, no loop, SVG renderer). For now we have a gradient placeholder. Adding Lottie support requires: (a) downloading the JSON to public/, (b) installing `@lottiefiles/dotlottie-web` or similar, (c) creating a Preact island component. This is a nice visual polish item.

8. **Integrations marquee works via CSS animation + collection fetch.** The `IntegrationsMarquee.astro` component fetches all integration logos from the content collection at build time and renders them in a CSS `@keyframes marquee-slide` animation (60s loop). The strip is duplicated for seamless looping and pauses on hover.

9. **Webflow HTML snapshot extraction workflow.** The snapshots are massive single-line HTML files (40k+ tokens). Effective workflow: use Grep to find content markers (`w-richtext`, section class names), then Read specific line ranges. For complex pages like the homepage, delegating extraction to a background subagent with Python regex scripts is much more efficient.

**TODOs carried forward:**
- Hero Lottie animation (Preact island) — visual polish, not blocking
- Newsletter Brevo integration — Phase 5
- GitHub stars live count widget — nice-to-have
- R2 URL hash verification — spot-check needed
- Feature tab AVIF images — need to verify they load from R2

---

**3H-1a + 3H-1b COMPLETE. Next: 3H-3 (Feature detail pages) or 3H-4 (Case studies).**
