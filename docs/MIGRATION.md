# How We Migrated zenml.io from Webflow to Astro

> A complete website migration — 2,224 pages, 20 content collections, 2,397 assets — built in under a week using Claude as a development partner.

## Why Migrate?

[zenml.io](https://www.zenml.io) was built on Webflow — a powerful no-code platform. But as the site grew to 2,200+ pages across 20 CMS collections, we hit friction:

- **Lock-in**: Can't version-control content, can't run CI/CD, can't self-host
- **Performance limits**: The site was fast, but we couldn't control caching, edge rendering, or bundle optimization at the level we wanted
- **Customization ceiling**: Interactive features (advanced filtering, full-text search, faceted navigation) required workarounds in Webflow
- **Cost**: Webflow's pricing scales with CMS items and traffic

The goal: **a pixel-perfect recreation** of the existing site in a stack we fully control, then iterate beyond what Webflow could do.

## The Stack We Chose

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | **Astro v5** | Static-first, content collections with Zod schemas, islands architecture for selective hydration |
| Content | **Markdown (.md) in git** | Version-controlled, diffable, no CMS dependency |
| Styling | **Tailwind CSS v4** | Utility-first, `@theme` design tokens, minimal CSS output |
| Interactive | **Preact islands** | Only hydrate what needs JavaScript (~7 islands out of 2,224 pages) |
| Hosting | **Cloudflare Pages** | Edge CDN, branch previews, Pages Functions for server-side logic |
| Assets | **Cloudflare R2** | Object storage co-located with the CDN, no egress fees |
| Search | **Pagefind** | Build-time full-text search index, zero runtime cost |
| Forms | **Pages Functions** | Same-origin server-side handlers, no CORS needed |
| Code highlighting | **Shiki** | Build-time syntax highlighting, zero client-side JS |

## The 6-Phase Migration

### Phase 0: Infrastructure (~1 hour)

Set up the foundation:
- Cloudflare Pages project with GitHub integration (push-to-deploy)
- R2 bucket for asset storage
- GitHub Actions CI/CD pipeline
- Branch preview deploys for every PR

### Phase 1: Content Export & Transform (~4 hours)

The biggest data engineering challenge. We wrote 10 TypeScript/Python scripts to:

1. **Crawl** the live site (2,151 URLs) for an SEO baseline snapshot
2. **Export** all CMS data via the Webflow API v2 (2,340 items across 17 collections)
3. **Download** every asset referenced in the CMS (2,397 files, 384 MB)
4. **Upload** assets to R2 with parallel processing
5. **Transform** Webflow HTML into Markdown with frontmatter + SEO metadata (1,904 content files)
6. **Normalize** redirects (44 rules, 11 redirect chains flattened)
7. **Catalog** all Webflow interactions and custom scripts for later implementation

#### The .md vs .mdx Decision

One of the earliest and most consequential decisions: **use `.md`, not `.mdx`**.

MDX v2 treats all HTML as strict JSX. Webflow-exported HTML contains multi-line tables, curly braces in text (`{example}`), `<placeholder>` tags, and mixed markdown/HTML — all of which break MDX parsing. Standard Markdown with `rehype-raw` handles raw HTML natively.

This saved weeks of per-file debugging. We can selectively convert individual files to `.mdx` later if we need JSX components.

### Phase 2: Content Collections (~2 hours)

Defined 20 Zod schemas in `src/content.config.ts` — one per collection. Astro's Content Layer API with glob loaders validates every content file at build time.

Key schema patterns:
- **Blog posts**: `author` (single slug), `category` (optional slug), `tags` (slug array), `date`, `mainImage`
- **LLMOps entries**: `llmopsTags` (slug array), `industryTags` (optional string)
- **Feature pages**: Discriminated union blocks (`z.discriminatedUnion('kind', [...])`) for flexible section ordering
- **Reference resolution**: `getEntry('authors', slug)` — slugs match `.md` filenames

### Phase 3: All Pages (~12 hours)

The longest phase — rebuilding every page type:

- **3 layouts**: BaseLayout (full shell), BlogLayout (conditional TOC sidebar), MinimalLayout (no nav/footer for embeds)
- **Blog**: 280 posts with 12/page pagination, categories, tags, author resolution
- **Homepage**: 13 section components composing the landing page, with data centralized in `src/lib/homepage.ts`
- **LLMOps Database**: 1,453 entries with a Preact filter island (client-side search, tag/industry filtering, pagination, URL state sync)
- **Feature pages**: 12 detail pages using discriminated union blocks for flexible section ordering
- **Case studies**: 5 pages with body-driven layouts
- **VS comparison pages**: 17 CMS-driven pages with cross-collection linking
- **Form/conversion pages**: 12 pages with ContactForm Preact island
- **ROI calculator**: Interactive calculator with real-time output
- **Storylane embeds**: Product demo pages using MinimalLayout (no nav/footer interference)

#### Interesting Patterns

**Marketing page data centralization**: All copy for marketing pages lives in `src/lib/{page}.ts` (e.g., `homepage.ts`, `company.ts`). Components import data from these files rather than hardcoding text. This keeps content separate from presentation and makes updates easy.

**FAQ accordion with zero JS**: Native `<details>/<summary>` HTML elements — fully accessible, keyboard-navigable, no JavaScript required.

**CSS marquee for integration logos**: `@keyframes marquee-slide` with a 60-second loop and hover-to-pause. Pure CSS, no JS animation library.

**Named slots for banner injection**: `<slot name="before-nav" />` in BaseLayout lets any page inject content above the navigation bar without modifying the layout.

### Phase 4: SEO & Redirects (~3 hours)

Critical for a migration — every existing URL must work:

- **52 redirect rules** in `public/_redirects` (Cloudflare's native format)
- **RSS feeds**: Hand-rolled XML in `.ts` API routes (full control over feed content)
- **Auto-generated sitemap** via `@astrojs/sitemap`
- **OG images**: Dynamic absolute URL resolution (relative paths prefixed with `SITE_URL` for social crawlers)
- **JSON-LD structured data**: Injected via `<JsonLd data={...} slot="head" />` pattern
- **`llms.txt`**: Machine-readable site description for AI crawlers
- **Parity testing**: Automated comparison showed 3.27% URL gap (mostly intentional: draft pages, deprecated sections)

#### The Canonical URL Bug

`Astro.url.pathname` includes `.html` when using `build.format: "file"`. Our `buildCanonical()` function in `src/lib/seo.ts` strips this suffix — without it, Google would see `/about.html` instead of `/about` as the canonical URL.

### Phase 5: Forms & Interactive Features (~4 hours)

- **ContactForm Preact island**: Multi-form-type handler posting to Cloudflare Pages Functions at `/api/forms/:formType`
- **Cookie consent**: Custom Preact island with 4 consent categories (essential/analytics/marketing/personalization). Third-party scripts dynamically injected via `document.createElement('script')` only after consent
- **Analytics hostname gate**: `window.location.hostname === 'www.zenml.io'` check prevents preview-deploy traffic from polluting analytics
- **Blog TOC with scroll-spy**: `IntersectionObserver`-based table of contents. BlogLayout conditionally shows a sidebar (14rem, sticky) when the post has 3+ h2/h3 headings — 251 of 280 posts qualify
- **Shiki code highlighting**: Build-time syntax highlighting with `github-dark` theme. All 1,948 code blocks across the site are fenced Markdown (zero raw HTML `<pre><code>`)

### Phase 6: QA, Cutover & Beyond

With the 1:1 migration complete, we started going **beyond** what Webflow could do:

#### LLMOps Database "Research Hub" Redesign

The original LLMOps page was a basic list with AND-only tag filtering and a flat dropdown of 107 tags. We redesigned it as a faceted research hub:

- **Left sidebar** with industry facets (17) and technology facets (107) — each showing contextual counts
- **Pagefind full-text search** — build-time index of 1,453 pages, hybrid with JSON faceted filtering
- **AND/OR tag mode** — users can switch between "match all" and "match any" (the original only supported AND, which often produced zero results)
- **Sort options**: newest, A-Z, relevance (query-dependent)
- **Clickable tag chips** on cards — clicking a tag on any card toggles it in the filter
- **Mobile drawer** with full dialog semantics (focus management, `inert` background, keyboard navigation)
- **WCAG accessibility audit**: aria-live result counts, scoped IDs (avoiding duplicates between desktop/mobile), arrow-key navigation in facet lists, native radio inputs for tag mode toggle, `aria-current` on pagination
- **"More Like This" related entries** on detail pages — scored by shared tag overlap + same industry + recency
- **Taxonomy index pages** with counts and cross-links between tags and industries

#### Blog Redesign

Sidebar browse by category, BlogCard component system, reading progress indicator, and improved related posts.

## Build Performance

~2,224 pages build in ~33 seconds. The Pagefind index step adds ~5 seconds on top for 1,453 LLMOps pages.

## Lessons Learned

### Image Migration Is Harder Than You Think

Silent runtime 404s were our most frequent bug class. No build errors, no type errors — just broken images on the deployed site:

- **Template literal URLs are invisible to regex audits**: `${R2}/hash/file.svg` expands at runtime but won't match domain-string regex patterns
- **URL rewriting without upload = silent 404**: Always verify via `curl -sI` against the public URL after upload
- **`public/` assets aren't validated at build time**: Astro silently 404s missing static files
- **Filenames with spaces break regex**: Match by 8-char hash prefix, not full filename

### Content Model Decisions Cascade

The `.md` vs `.mdx` decision affected every subsequent phase. Choosing wrong would have meant debugging 1,904 files individually. Similarly, using Astro's Content Layer API with Zod schemas caught hundreds of data inconsistencies at build time rather than at runtime.

### Astro's `getStaticPaths` Scope Is Surprising

Variables declared in frontmatter _outside_ `getStaticPaths()` are not available inside it. Astro extracts `getStaticPaths` and runs it separately — any constants needed inside must be defined within the function body. This tripped us up several times.

### The Webflow CDN Is Not Always Cooperative

Some Webflow file IDs return 403 even with browser-like User-Agent headers. The Webflow HTML export (local files) often has equivalent assets under older file IDs that download fine. When the CDN blocks, use local export files as your source.

## Development with Claude

This entire migration was built using [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (Anthropic's CLI for Claude) with Claude Opus 4.6 as the development partner. Claude handled:

- **Content export scripts**: TypeScript + Python scripts for Webflow API export, HTML-to-Markdown transformation, and R2 upload
- **Schema design**: Zod schemas for 20 content collections, validated against real data
- **Page templates**: All Astro pages, layouts, and components
- **Interactive islands**: Preact components for filtering, forms, cookie consent, animations
- **SEO infrastructure**: RSS feeds, JSON-LD, canonical URLs, OG image resolution
- **Accessibility audit**: WCAG compliance for the LLMOps filter island (identified a duplicate ID bug that manual review missed)
- **Investigation and planning**: Deep codebase analysis via RepoPrompt MCP for architectural decisions

The project demonstrates how AI-assisted development can handle large-scale migrations where the work is primarily translation (Webflow → Astro), data engineering (CMS export → Markdown), and pattern application (building 2,200+ pages from templates and content).

## Repository Structure

```
src/
├── components/
│   ├── islands/         # 7 Preact interactive components
│   ├── sections/        # 37 homepage + shared section components
│   └── *.astro          # Shared components (Button, Nav, Footer, Badge, etc.)
├── content/             # 20 content collections (~2,400 .md files)
├── layouts/             # 3 layouts (Base, Blog, Minimal)
├── lib/                 # Domain logic + data files
├── pages/               # File-based routing (~45 static + CMS templates)
└── styles/              # Tailwind v4 @theme design tokens

public/                  # Static assets, redirects, security headers
functions/               # Cloudflare Pages Functions (form handling)
```

See the [README](../README.md) for full project structure and getting started instructions.
