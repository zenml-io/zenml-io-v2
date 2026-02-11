# Phase 3: Templates & Pages — Detailed Plan

**Created:** 2026-02-11
**Status:** Ready to start — Phase 2 complete, content layer validated
**Prerequisites:** Phase 2 complete (2,392 MDX files, 17 collections, all validation passing)

---

## Overview

Phase 3 is where the site becomes **visible**. We'll build every page template and static page needed to render all ~2,300 URLs from the current site. The goal is **1:1 visual parity** with Webflow — pixel-perfect recreation first, improvements later.

**Key principle:** Build incrementally, validate early. Start with one collection (blog), get the full render pipeline working, then systematically replicate for all other collections.

---

## Goals

1. **Build base layouts** — shared structure (head, nav, footer) for all pages
2. **Build CMS template pages** — individual item pages for all 17 collections
3. **Build listing/index pages** — blog index, integrations grid, LLMOps filter, etc.
4. **Build static pages** — home, pricing, features, case studies (~44 pages)
5. **Implement LLMOps filter + search** — Preact island with Pagefind integration
6. **Recreate Webflow animations** — CSS/JS for cataloged interactions
7. **Build navigation & footer** — consistent across all pages
8. **Validate render output** — spot-check 20 key URLs for visual parity

---

## Success Criteria

- ✅ All 2,392 content items render successfully (no build errors)
- ✅ All CMS collections have working template pages
- ✅ All listing pages render with correct filtering/sorting
- ✅ All static pages render with correct content
- ✅ LLMOps filter works with tag/industry/text filtering
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
  - Render industry-tags badges (if present — VERIFY: current schema has NO industryTags field!)
  - Render full MDX body (features, pricing, use cases, etc.)
  - Link to website URL (external)
  - Link to related entries (same tags — optional, can defer)

**Validation:**
- Build succeeds for all 1,453 entries
- Spot-check 5 entries for visual parity
- Verify tags render correctly

#### 3E-2: Thin JSON Index for Client-Side Filtering

**Goal:** Build a lightweight JSON file with structured fields only (NOT MDX bodies) for the client-side filter island.

- [ ] Create build script: `scripts/phase3/generate-llmops-index.ts`
  - Load all LLMOps entries from Astro Content Collections
  - Extract structured fields only:
    - `slug`, `name`, `company`, `logo`, `summary`
    - `llmopsTags` (array of slugs)
    - `industryTags` (array of slugs — VERIFY if this exists!)
    - Any other filterable fields
  - Write to `public/llmops-index.json`
  - Target size: <500 KB (1,453 entries × ~300 bytes each)
- [ ] Add to build pipeline: run before `astro build`

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
    - Tag filters are AND (entry must have ALL selected tags)
    - Industry filters are OR (entry has ANY selected industry)
    - Text search is fuzzy match (case-insensitive substring)
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

#### 3E-4: Pagefind Integration (Optional — can defer to Phase 4)

Pagefind is a build-time search index generator. It's **parity-critical** because the current site has full-text search on LLMOps database.

- [ ] Install `pagefind` and `astro-pagefind` integration
- [ ] Configure Pagefind to index LLMOps pages
- [ ] Add Pagefind search UI to LLMOps filter island
- [ ] Verify search works across all 1,453 entries

**Rationale:** If substring search is "good enough" for Phase 3, defer Pagefind to Phase 4. If full-text search is critical for parity, implement in Phase 3.

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

### 3H: Static Pages (~44 pages)

**Goal:** Build all non-CMS pages (home, pricing, features, case studies, legal, etc.).

**Strategy:** Start with highest-traffic pages (home, pricing, features), then systematically build the rest.

#### High-Priority Static Pages (build first)

- [ ] **Home** (`src/pages/index.astro`)
  - Hero section with headline, CTA buttons
  - Features section (3-6 key features with icons)
  - Testimonials carousel (fetch from quotes collection)
  - Blog highlights (fetch 3 latest blog posts)
  - CTA section (demo booking, newsletter signup)
- [ ] **Pricing** (`src/pages/pricing.astro`)
  - Pricing tiers (Open Source, Pro, Cloud)
  - Feature comparison table
  - FAQ section
  - CTA buttons (demo booking, contact sales)
- [ ] **ZenML Pro** (`src/pages/pro.astro`)
  - Pro features overview
  - Use cases section
  - CTA (demo booking, contact sales)
- [ ] **Features Hub** (`src/pages/features/index.astro`)
  - Overview of all features with links to detail pages
- [ ] **Feature Detail Pages** (12 pages, e.g., `src/pages/features/pipelines.astro`)
  - Feature-specific content (hero, description, code examples, screenshots)
  - CTA (demo booking, docs link)

#### Medium-Priority Static Pages

- [ ] **Company** (`src/pages/company.astro`)
  - Company story, mission, values
  - Team section (fetch from team collection)
- [ ] **Careers** (`src/pages/careers.astro`)
  - Job listings (can be hardcoded or fetch from external API)
  - Company culture section
- [ ] **Case Studies Hub** (`src/pages/case-studies/index.astro`)
  - Grid of case study cards
- [ ] **Case Study Pages** (5 pages, e.g., `src/pages/case-studies/company-name.astro`)
  - Case study content (challenge, solution, results)
  - Testimonial quote
  - CTA (contact sales)

#### Low-Priority Static Pages (can defer if time-constrained)

- [ ] **Legal Pages**
  - Privacy Policy (`src/pages/privacy.astro`)
  - Terms of Service (`src/pages/terms.astro`)
  - Imprint (`src/pages/imprint.astro`)
  - CLA (`src/pages/cla.astro`)
- [ ] **Redirect Pages** (e.g., `/slack`, `/roadmap`, `/meet`)
  - These may just be 301 redirects (handled in Phase 4), not actual pages
- [ ] **Newsletter Pages** (if present)
  - Newsletter signup confirmation, thank you pages
- [ ] **Demo/Booking Pages** (if not handled by Cal.com embed)

**Validation:**
- Build succeeds for all static pages
- Spot-check 5 high-priority pages for visual parity (home, pricing, features/pipelines, case-studies, company)
- Verify all links work (internal + external)

**Note:** Content for static pages comes from `design/migration/phase1/runs/2026-02-11T0626Z/static-pages/` (HTML snapshots). We'll need to manually convert HTML → Astro components.

---

### 3I: Webflow Animations & Interactions

**Goal:** Recreate the most important Webflow interactions cataloged in Phase 1.

**Reference:** `design/migration/phase1/runs/2026-02-11T0626Z/animations-catalog.json` (325 unique interaction IDs, 11 patterns cataloged)

**Strategy:** Prioritize **must-replicate** interactions (visible, user-facing) over **nice-to-have** (subtle micro-interactions).

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

Static page HTML snapshots are in `design/migration/phase1/runs/2026-02-11T0626Z/static-pages/`.

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
- ✅ **~44 static pages** — home, pricing, features, case studies, legal, etc.
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

**Ready to start Phase 3!** 🚀
