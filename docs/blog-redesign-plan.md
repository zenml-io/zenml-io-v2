# Blog UX Redesign Plan

> **Status**: Planning → Ready to implement
> **Scope**: Full redesign pass — hybrid model (chronological feed + topic-led discovery)
> **Freedom**: Not tied to pixel-perfect Webflow replication — we can improve!
> **Sequencing**: Blog first, then LLMOps
> **Execution**: One big session (not split into multiple PRs)
> **Pagefind**: Deferred to later — everything else first
> **Design direction**: User to pick from playground (`design/blog-design-explorer.html`)
> **Design explorer**: 3 directions (A: Clean & Structured, B: Content-Rich Editorial, C: Modern Developer)

## Current State

The blog is entirely server-rendered with separate templates that have diverged:
- **Hub page 1** (`src/pages/blog/index.astro`): featured hero + 11 cards + custom pagination
- **Hub page 2+** (`src/pages/blog/page/[page].astro`): different card style + different pagination
- **Post detail** (`src/pages/blog/[slug].astro` → `BlogLayout.astro` → `BlogTOC.astro`)
- **Taxonomy pages** (`/author/[slug]`, `/category/[slug]`, `/tags/[slug]`): each has its own card markup

~280 posts, 12/page pagination, categories, tags, and authors. All content in `.md` with Zod schemas.

## Key Gaps Identified

1. **No discovery/browse affordances** — hub has zero search, no category/tag browsing
2. **No continuation on post pages** — posts end with tags, no prev/next or related posts
3. **Inconsistent cards** — page 1, page 2+, and taxonomy pages all render differently
4. **TOC is desktop-only** — hidden below `xl` breakpoint
5. **Taxonomy pages are orphaned** — no `/tags`, `/category`, `/author` index pages
6. **"Discovery" exclusion inconsistency** — hub excludes discovery-tagged posts, taxonomy doesn't

## Architectural Decisions (Lock Before Implementation)

1. **"Discovery" visibility**: Keep current behavior (excluded from `/blog` + homepage, visible on taxonomy + detail pages). Add a small note on taxonomy pages if needed.
2. **BlogCard linking strategy**: Use `<article>` container with separate title/image/taxonomy links (avoid nested `<a>` tags for a11y).
3. **Slug consistency**: Use `post.data.slug` everywhere (RSS currently uses `post.id`).

---

## Implementation Plan (Sequenced)

### Step 1: Blog Domain Layer (`src/lib/blog.ts`)

**Purpose**: Single source of truth for filtering, sorting, URL building, and relationship resolution.

**Create**: `src/lib/blog.ts`
- `isVisibleInMainFeed(post)` — excludes drafts + discovery
- `sortPostsByDateDesc(posts)`
- `getPrevNext(sortedPosts, currentSlug)` — prev/next navigation
- `getRelatedPosts(sortedPosts, current, { limit, includeSharedTags, includeSameCategory })`

**Create**: `src/lib/blogCardModel.ts`
- `BlogCardModel` interface (href, title, dek, date, readingTime, image, author, category, tags)
- `toBlogCardModel(post)` — converts content entry to card model
- `toBlogCardModelFromPagefind(data)` — converts Pagefind result to card model

**Create**: `src/lib/blogTaxonomy.ts`
- `getCategoryCounts(posts)` / `getTagCounts(posts)` — for browse affordances

### Step 2: Unified BlogCard Component

**Create**: `src/components/blog/BlogCard.astro`
- Props: `model: BlogCardModel`, `variant: "grid" | "compact"`, `showExcerpt`, `showMeta`
- Uses `Card.astro`, `Badge.astro`, `Image.astro`
- A11y: `<article>` wrapper, descriptive link text, image alt fallback

**Replaces duplicated card markup in**:
- `src/pages/blog/index.astro`
- `src/pages/blog/page/[page].astro`
- `src/pages/category/[slug].astro`
- `src/pages/tags/[slug].astro`
- `src/pages/author/[slug].astro`
- New "continue reading" section on post detail
- Future Pagefind search results

### Step 3: Unified Pagination

**Create**: `src/lib/pagination.ts`
- `getPaginationItems({ currentPage, totalPages, maxVisible })` — returns page numbers + ellipsis markers

**Create**: `src/components/Pagination.astro`
- Props: `currentPage`, `totalPages`, `getHref(page)`, `ariaLabel`
- `aria-current="page"` on current page, accessible Prev/Next

**Used by**: blog hub, page 2+, and taxonomy pages

### Step 4: Blog Hub Redesign (Hybrid Discovery)

**Modify**: `src/pages/blog/index.astro`
- Replace inline card markup with `<BlogCard />`
- Replace inline pagination with `<Pagination />`
- Add **"Browse" section** (between hero and feed):
  - Top categories with counts → links to `/category/<slug>`
  - Popular tags as chips → links to `/tags/<slug>`
  - "Explore all topics" CTA → links to taxonomy index pages

**Modify**: `src/pages/blog/page/[page].astro`
- Same: use shared BlogCard + Pagination components

### Step 5: Taxonomy Route Refactor (Pagination + Consistency)

**Route structure change** (required for pagination):
- `src/pages/category/[slug].astro` → `src/pages/category/[slug]/index.astro` + `page/[page].astro`
- `src/pages/tags/[slug].astro` → `src/pages/tags/[slug]/index.astro` + `page/[page].astro`
- `src/pages/author/[slug].astro` → `src/pages/author/[slug]/index.astro` + `page/[page].astro`

**Optional**: Create `src/components/blog/BlogListingPage.astro` to unify header + grid + pagination.

### Step 6: Taxonomy Index Pages

**Create**:
- `src/pages/category/index.astro` — all categories with descriptions + post counts
- `src/pages/tags/index.astro` — all tags with counts (searchable)
- `src/pages/author/index.astro` — all authors with avatars + post counts

**Schema update** (optional): Add `description` to `simpleTagSchema` in `src/content.config.ts`.

### Step 7: Blog Detail Redesign

**Modify**: `src/pages/blog/[slug].astro`
- Load `allPostsSorted` once in `getStaticPaths()`
- Compute `prevNext` and `related` posts
- Build `dek` from `post.data.seo?.description`
- Pass everything to BlogLayout

**Modify**: `src/layouts/BlogLayout.astro`
- Add "Back to Blog" link (and/or breadcrumb: Blog → Category)
- Render `postTitle` as `<h1>` (not SEO title)
- Render optional `dek` (excerpt) under title
- Add "Continue reading" section at bottom (prev/next + related posts using BlogCard compact)

### Step 8: Mobile TOC

**Modify**: `src/components/BlogTOC.astro`
- Add variant support: `"sidebar" | "inline" | "drawer"`
- Mobile variant uses `<details>/<summary>` ("On this page")
- Close-on-click progressive enhancement
- Keep existing scroll-spy for desktop sidebar

**Modify**: `src/layouts/BlogLayout.astro`
- Render mobile TOC (below meta, visible `<xl`) + desktop sidebar TOC (current behavior)

### Step 9: Heading Anchor Affordances

**Add dependencies**: `rehype-autolink-headings`, `rehype-slug`

**Modify**: `astro.config.ts` — add rehype plugins

**Modify**: `src/styles/global.css` — heading hover icon styles, focus ring on anchors

### Step 10: Pagefind Integration (Blog Search)

**Add dependency**: `pagefind`

**Modify**: `package.json` — add postbuild script: `pagefind --site dist`

**Modify**: `src/layouts/BlogLayout.astro` — add `data-pagefind-body`, `data-pagefind-meta` tags

**Modify**: `src/layouts/BaseLayout.astro` — add `data-pagefind-ignore` on nav/footer

**Create**: `src/components/islands/BlogSearch.tsx` (Preact island)
- Dynamically imports Pagefind JS
- Search input + results using BlogCard

**Modify**: `src/pages/blog/index.astro` — mount `<BlogSearch client:load />`

### Step 11: Accessibility + Cleanup

- Skip-to-content link in BaseLayout
- Consistent `:focus-visible` styling
- Fix RSS to use `post.data.slug` consistently
- Swap NewsSection inline card markup for `BlogCard variant="compact"`

---

## Verification

- `pnpm build` succeeds with no errors
- All blog URLs preserved (no broken links)
- Blog hub shows browse affordances (categories, tags)
- Pagination consistent across all listing pages
- Post pages have prev/next + related posts
- TOC visible on mobile
- Heading anchors work (hover → copy link)
- Pagefind search returns results
- Keyboard navigation works through all controls
