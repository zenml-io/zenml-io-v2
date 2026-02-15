# ZenML Website v2 — Migration from Webflow

## Project Overview

We are migrating zenml.io from Webflow to a self-hosted solution. The goal is
a **1:1 copy** of the current site in a version we fully control and can
customize freely.

- **Current site**: www.zenml.io (Webflow)
- **Hosting target**: Cloudflare Pages
- **Context**: This is being built as part of a Claude hackathon using Opus 4.6
- **Status**: **Phases 0–5 COMPLETE**. ~2,224 pages building in ~33s. All content migrated, all pages built, SEO infrastructure done, forms live, analytics tracking active. Currently in **Phase 6 (QA & Cutover)** — fixing visual parity gaps page-by-page against the Webflow original. **LLMOps Database redesign complete** (faceted sidebar, Pagefind search, AND/OR filtering, sorting, accessibility). **Blog redesign in progress** (sidebar browse, BlogCard component, reading progress).
- **Private details**: See `CLAUDE.private.md` (gitignored) for infrastructure IDs, traffic numbers, and internal docs index.

## Key Constraints

- **No broken links** — all existing URLs must be preserved or 301-redirected
- **SEO preservation** — keep slugs, meta tags, Open Graph data intact
- **CMS data must migrate** — 20 collections, ~2,340 items total
- **Largest collection**: LLMOps Database (1,453 items) — filter-heavy UI
- **Blog**: 317 posts with categories, tags, and authors
- **Asset migration**: all images/files must be re-hosted (Webflow URLs will
  break if the site is deleted)

## Content Architecture (Webflow)

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
| Search | **Pagefind** — build-time full-text search index (1,453 LLMOps pages indexed, hybrid with JSON faceted filtering) |
| Forms | **ContactForm** Preact island → Cloudflare Pages Functions (`/api/forms/:formType`). Cal.com embeds for demo booking. Brevo for newsletter |
| Analytics | **Plausible** + GA4 + Segment (hostname-gated to production domain to prevent preview pollution) |
| Code highlighting | **Shiki** (`github-dark` theme) at build time + **Inconsolata** monospace font |
| CRM | **Attio** (keep existing) |
| Design approach | Pixel-perfect recreation first, then iterate |

## Key Technical Decisions

| Decision | Value |
|----------|-------|
| Trailing slash | `never` — matches Webflow behavior, locked in `astro.config.ts` |
| Canonical domain | `www.zenml.io` (bare `zenml.io` redirects to www) |
| Migration strategy | Full cutover (not strangler) — build complete site, switch DNS |
| Image optimization | Upload 1:1 for now; convert to WebP/AVIF post-launch |

## Migration Phases

### Phase 0 — Infrastructure
Cloudflare Pages project, R2 bucket, GitHub Actions CI/CD, branch preview deploys.

### Phase 1 — Content Export & Transform
2,151 URLs crawled for SEO baseline. 2,340 CMS items exported. 2,397 assets downloaded and uploaded to R2 (384 MB). 1,904 content files generated with frontmatter + SEO metadata. 44 redirects normalized.

### Phase 2 — Content Collections
All 20 content collections defined with Zod schemas in `src/content.config.ts`. 2,392 content files validated. Astro Content Layer API with glob loaders.

### Phase 3 — All Pages
Layouts, blog (280 posts, 12/page pagination), all CMS templates, LLMOps filter island, 44+ static pages, homepage (13 section components), feature detail pages, case studies, VS comparison pages, form/conversion pages, ROI calculator, Storylane embeds.

### Phase 4 — SEO & Redirects
52 redirect rules in `public/_redirects`, RSS feeds (blog + LLMOps), auto-generated sitemap, OG images, JSON-LD structured data, `llms.txt`, favicon, parity testing at 3.27% gap.

### Phase 5 — Forms & Interactive Features
ContactForm Preact island, cookie consent (4 categories), analytics tracking with hostname gate, blog TOC with scroll-spy, Shiki code highlighting, security headers.

### Phase 6 — QA & Cutover (In Progress)
Fixing visual parity gaps page-by-page against the Webflow original. Recent work includes LLMOps Database redesign (faceted sidebar, Pagefind search, accessibility) and blog redesign (sidebar browse, reading progress).

## Development Conventions

- `design/` folder is for heavy artifacts (exports, screenshots, JSON dumps, internal docs) — **never commit to git**
- Make targeted git commits (only relevant files)
- After running tests, re-run them if you make subsequent changes
- **Build output**: `pnpm build` generates ~2000+ lines of output listing every generated page. Always run it in background mode and use `tail` to check only the final lines for success/failure
- **Credential management**: When you receive API credentials, tokens, or keys, **always add them to `.env`** for persistence across sessions. The `.env` file is gitignored and safe for secrets

## Image & Asset Migration Lessons

These patterns caused silent runtime 404s that only showed up on the deployed
site — no build errors, no type errors, just broken images.

### Always verify uploads via the public URL

URL rewriting source code is not enough. After uploading images to R2, **test
the public URL** to confirm the file is actually accessible. The boto3 API can
succeed but the public domain may point to a different account/bucket.

### Template literal URLs are invisible to regex audits

Source code like `` `${R2}/hash/file.svg` `` expands to a full URL at runtime,
but regex scanning for the R2 domain string won't find it. When auditing for
broken R2 references, **scan for both patterns** (literal domain URLs and
template literal `${R2}/` references).

### `public/` assets must be explicitly placed

Astro doesn't error when a component references `/images/logo.svg` but
`public/images/logo.svg` doesn't exist — it just silently 404s at runtime.
After adding `/images/*` references, verify the files exist in `public/images/`.

### Webflow CDN may 403 on certain file IDs

Some Webflow file IDs return 403 even with browser User-Agent headers. The
Webflow HTML export often has equivalent files under older file IDs that
download fine. Use local export files as source when the CDN blocks.

### Filenames with spaces break regex URL matching

R2 keys with spaces get truncated by `[^\s...]` regex patterns. For
comprehensive audits, match only the 8-char hash prefix (`[a-f0-9]{8}`) and
verify it exists in the bucket, rather than trying to capture the full filename.

## Key Files

### Core Architecture
- `astro.config.ts` — Astro config (static output, Cloudflare, Preact, sitemap, Shiki)
- `src/content.config.ts` — All 20 content collection schemas (Zod)
- `src/styles/global.css` — Tailwind v4 `@theme` block + design tokens
- `src/lib/constants.ts` — `SITE_URL` and shared constants
- `src/lib/seo.ts` — SEO contract (`SEOProps`, `resolveSeo()`, `buildCanonical()`)
- `src/lib/llmops.ts` — LLMOps domain layer (`getAllPublishedEntries()`, `getRelatedEntries()`, tag/industry counts)
- `src/lib/navigation.ts` — Nav data (typed, not hardcoded)
- `src/lib/footer.ts` — Footer data (typed, not hardcoded)

### Homepage
- `src/pages/index.astro` — Homepage composition (13 section components)
- `src/lib/homepage.ts` — All homepage marketing copy, stats, URLs, FAQ
- `src/components/sections/` — 37 section components

### Preact Islands (interactive client-side components)
- `src/components/islands/LLMOpsFilter.tsx` — LLMOps database "Research Hub" (faceted sidebar with industry/tag facets, Pagefind full-text search, AND/OR tag mode, sort, clickable chips, mobile drawer, WCAG-compliant accessibility)
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
