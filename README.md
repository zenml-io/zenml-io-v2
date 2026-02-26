# ZenML Website (zenml.io)

The [zenml.io](https://www.zenml.io) marketing website — an Astro static site hosted on Cloudflare Pages. ~2,224 pages across 20 content collections, built in ~33 seconds.

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 22+ (matches CI)
- [pnpm](https://pnpm.io/) 10+

### Run locally

```bash
pnpm install
pnpm dev       # Dev server at http://localhost:4321
pnpm build     # Production build (~2,224 pages)
pnpm preview   # Serve production build locally
```

### Other commands

```bash
pnpm check              # Astro + TypeScript type checking
pnpm validate:content   # Content schema validation (Zod)
pnpm lint               # Biome linter
pnpm lint:fix           # Auto-fix lint issues
pnpm format             # Biome formatter
```

> **Tip:** `pnpm build` generates ~2,000 lines of output (one per page). Pipe through `tail -20` to see just the result.

## Environment Variables

The site builds and runs locally **without any env vars**. All content and asset URLs are committed to git. Variables are only needed for upload tooling and server-side API routes.

Copy `.env.example` to `.env` and fill in what you need:

| Variable | When needed | Purpose |
|----------|-------------|---------|
| `CLOUDFLARE_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` | Uploading images to R2 | `scripts/r2-upload.py` |
| `SEGMENT_FORMS_WRITE_KEY` | Form submissions (production) | Server-side Segment tracking |
| `CLOUDFLARE_DNS_TOKEN` | DNS audit scripts (rare) | Internal tooling only |

The `.env` file is gitignored and safe for secrets.

## Common Workflows

### Adding a Blog Post

**With Claude Code:** Say "new blog post" or "add blog" — the `blog-post-contributor` skill handles everything: branch creation, frontmatter, image processing (AVIF conversion + R2 upload), tag/author validation, and PR setup. See `.claude/skills/blog-post-contributor/SKILL.md` for the full workflow.

**Manually:**

1. Create a branch: `git checkout -b blog/<slug>`
2. Create `src/content/blog/<slug>.md` with valid frontmatter (see template below)
3. Upload hero image to R2 (see [Uploading Images](#uploading-images))
4. Create any new author/tag `.md` files if needed
5. Validate: `pnpm validate:content && pnpm check`
6. Build to confirm: `pnpm build`
7. Commit, push, open PR

**Minimal frontmatter:**

```yaml
---
title: "Your Blog Post Title"
slug: "your-blog-post-slug"
draft: true
author: "author-slug"
date: "2026-02-26T00:00:00.000Z"
mainImage:
  url: "https://assets.zenml.io/content/blog/xxxxxxxx/hero.avif"
  alt: "Description of the hero image"
seo:
  title: "Your Blog Post Title - ZenML Blog"
  description: "A concise 150-160 character description."
  canonical: "https://www.zenml.io/blog/your-blog-post-slug"
---
```

Key rules:
- Use `.md` files (NOT `.mdx`) — MDX breaks on Webflow-exported HTML
- `slug` must match the filename
- `mainImage.url` must be an absolute R2 URL
- 14 fixed categories (don't create new ones), 118+ tags (create if needed)
- Set `draft: false` when ready to publish

### Uploading Images

Images live in one of two places:

| Where | What goes there | How to reference |
|-------|----------------|------------------|
| `public/images/` | Site-wide UI (logos, icons, backgrounds) | `"/images/filename.svg"` |
| Cloudflare R2 | Content images (blog heroes, screenshots, team photos) | `"https://assets.zenml.io/..."` |

**Rule of thumb:** If it's in `src/content/*.md` frontmatter → R2 (schemas require absolute URLs). If it's site furniture → `public/images/`.

**Upload to R2:**

```bash
# Requires R2 credentials in .env
uv run scripts/r2-upload.py path/to/image.avif
uv run scripts/r2-upload.py path/to/hero.webp --prefix content/blog
uv run scripts/r2-upload.py path/to/hero.webp --frontmatter   # paste-ready YAML
```

**With Claude Code:** Say "upload image" — the `r2-image-upload` skill handles it.

**Warning:** Astro does NOT error when a `public/images/` file is missing — it silently 404s at runtime. Always verify files exist after adding references.

### Editing Marketing Copy

Marketing page text is centralized in typed data files, not hardcoded in templates:

| Page | Data file |
|------|-----------|
| Homepage | `src/lib/homepage.ts` |
| Company | `src/lib/company.ts` |
| Navigation | `src/lib/navigation.ts` |
| Footer | `src/lib/footer.ts` |

Edit the data file, not the `.astro` template. Components import from these files.

### Making Code Changes

1. Run `pnpm dev` for hot-reload development
2. Before committing: `pnpm lint:fix && pnpm check`
3. Run `pnpm build` to verify the full site builds
4. Open a PR — Cloudflare Pages auto-deploys a preview at `<branch>.zenml-io-v2.pages.dev`

## Project Structure

```
src/
├── components/
│   ├── islands/         # Preact interactive components (client:load)
│   │   ├── ContactForm.tsx
│   │   ├── CookieConsent.tsx
│   │   ├── FeatureTabsSlider.tsx
│   │   ├── LLMOpsFilter.tsx
│   │   ├── LottieHero.tsx
│   │   ├── ProTestimonialCarousel.tsx
│   │   └── RoiCalculator.tsx
│   ├── sections/        # Homepage + shared section components
│   ├── seo/             # JsonLd, meta tag components
│   └── *.astro          # Shared components (Button, Nav, Footer, etc.)
├── content/             # 20 content collections (~2,400 .md files)
│   ├── blog/            # 280 blog posts
│   ├── llmops-database/ # 1,453 LLMOps entries
│   ├── integrations/    # 68 integrations
│   ├── compare/         # 17 VS comparison pages
│   └── ...              # 16 more collections (tags, categories, authors, etc.)
├── layouts/
│   ├── BaseLayout.astro     # Main layout (nav, footer, analytics, head slots)
│   ├── BlogLayout.astro     # Blog posts (conditional TOC sidebar)
│   └── MinimalLayout.astro  # No nav/footer (for embeds, iframes)
├── lib/                 # Shared data + utilities
│   ├── homepage.ts      # Homepage copy, stats, URLs, FAQ
│   ├── navigation.ts    # Nav structure (typed)
│   ├── footer.ts        # Footer structure (typed)
│   ├── seo.ts           # SEO utilities (resolveSeo, buildCanonical)
│   ├── llmops.ts        # LLMOps domain layer
│   └── constants.ts     # SITE_URL, ASSET_BASE_URL
├── pages/               # File-based routing (~45 static + CMS templates)
│   ├── api/             # Server-side API routes (prerender: false)
│   └── ...              # 30+ routes
├── styles/
│   └── global.css       # Tailwind v4 @theme block + design tokens
└── content.config.ts    # All 20 collection schemas (Zod validation)

public/
├── images/              # Static images (logos, backgrounds)
├── lottie/              # Lottie animation JSON
├── _headers             # Cloudflare security headers
├── _redirects           # 52 redirect rules (Webflow URL preservation)
└── llms.txt             # LLM-readable site description

scripts/
└── r2-upload.py         # Upload images to R2 (see "Uploading Images")

design/                  # Heavy artifacts + internal docs (gitignored)
```

## Content Architecture

All content lives in `src/content/` as `.md` files with YAML frontmatter. Astro's Content Layer API loads them via glob loaders defined in `src/content.config.ts`.

### Major Collections

| Collection | Items | Route | Notes |
|-----------|-------|-------|-------|
| Blog | 280 | `/blog/[slug]` | Paginated hub (12/page), categories, tags, authors |
| LLMOps Database | 1,453 | `/llmops-database/[slug]` | Faceted sidebar, Pagefind search, AND/OR filtering |
| Integrations | 68 | `/integrations/[slug]` | Hub grid + structured detail pages |
| Compare (VS) | 17 | `/compare/[slug]` | ZenML vs X comparison pages |
| Feature Pages | 12 | `/features/[slug]` | Discriminated union blocks for flexible sections |
| Case Studies | 5 | `/case-study/[slug]` | Body-driven layout with sidebar |
| Team | 22 | `/team/[slug]` | Team member profiles |

Plus 13 supporting collections (tags, categories, authors, integration types, etc.).

### Content Patterns

- **Reference resolution**: `getEntry('authors', slug)` — slugs match `.md` filenames
- **Blog pagination**: 12 posts/page, `/blog` → `/blog/page/2` → `/blog/page/24`
- **Feature page blocks**: `z.discriminatedUnion('kind', [...])` for flexible section ordering
- **Marketing copy**: Centralized in `src/lib/{page}.ts`, not hardcoded in templates

## Key Patterns

### Preact Islands

Interactive components use Astro's [islands architecture](https://docs.astro.build/en/concepts/islands/). Only components that need client-side JS are hydrated:

```astro
<LLMOpsFilter client:load tags={tags} industries={industries} />
```

7 islands in `src/components/islands/` — LLMOpsFilter, ContactForm, CookieConsent, FeatureTabsSlider, LottieHero, ProTestimonialCarousel, RoiCalculator.

### Styling

- **Tailwind v4** with `@theme` block in `src/styles/global.css` (not `tailwind.config.js`)
- **`.prose` class** for styling raw HTML from Webflow-migrated content
- **`<style is:global>`** scoped under a parent class for styling inside Preact islands

### SEO

- All templates pass `seo` prop to `BaseLayout` via `SEOProps` in `src/lib/seo.ts`
- Canonical URLs strip trailing slashes and `.html` suffixes
- JSON-LD injected via `<JsonLd data={...} slot="head" />`
- RSS feeds at `/blog/rss.xml` and `/llmops-database/rss.xml`

### Layouts

| Layout | Use for |
|--------|---------|
| `BaseLayout` | Full page shell (nav, footer, analytics, cookie consent) |
| `BlogLayout` | Blog posts (extends BaseLayout, conditional TOC sidebar) |
| `MinimalLayout` | Bare HTML shell for Storylane embeds and iframes |

### Forms

ContactForm Preact island → Astro API route at `src/pages/api/forms/[formType].ts` → Segment HTTP API (identify + track). Server-side, fire-and-forget via `ctx.waitUntil()`.

## Deployment & Branch Workflow

- **Push to `main`** → auto-deploys to production via Cloudflare Pages
- **Pull requests** → preview at `<branch>.zenml-io-v2.pages.dev`
- Preview deploys get `X-Robots-Tag: noindex`
- Analytics are hostname-gated to `www.zenml.io` (preview traffic excluded)
- **Squash merge only** — each PR becomes a single commit on main
- Branches are auto-deleted after merge

### Push permissions

| Who | Direct push to main? |
|-----|---------------------|
| `strickvl`, `htahir1` | Yes (bypass branch protection) |
| Everyone else | Must use PRs (1 approval required) |

PRs require the `deploy` status check to pass (full build + Cloudflare Pages deploy).

See `docs/branch-protection-spec.md` for the full governance spec.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro v5 (TypeScript, static-first, content collections) |
| Content | Markdown (`.md`) files in git with Zod-validated schemas |
| Styling | Tailwind CSS v4 (utility-first, `@theme` design tokens) |
| Interactive | Preact islands (only hydrate what needs JS) |
| Hosting | Cloudflare Pages (edge CDN, branch previews) |
| Assets | Cloudflare R2 (object storage for images/files) |
| Forms | Preact ContactForm island → Astro API routes → Segment |
| Analytics | Plausible + GA4 + Segment (hostname-gated) |
| Search | Pagefind (build-time full-text index) |
| Code highlighting | Shiki (`github-dark` theme, build-time) |
| Linting | Biome v2 |

## Useful to Know

- **`.md` not `.mdx`** — Content files must use `.md`. MDX v2 treats all HTML as strict JSX, which breaks Webflow-exported HTML (multi-line tables, curly braces, mixed HTML/markdown).
- **Trailing slash: `never`** — Configured in `astro.config.ts` to match Webflow behavior. Canonicals strip trailing `/`.
- **`pnpm build` is verbose** — ~2,000 lines of output. Use `tail` or run in background to check the final result.
- **`public/` files don't validate at build time** — Astro won't error if `public/images/foo.svg` is referenced but missing. It silently 404s at runtime.
- **Content image URLs must be absolute** — Content collection schemas use `z.string().url()`, so images in frontmatter need full `https://assets.zenml.io/...` URLs.
- **Migration artifacts** — This site was [migrated from Webflow](docs/MIGRATION.md) in February 2026. Some content files have a `webflow` metadata block and the `.prose` CSS class exists for styling Webflow-exported HTML. Both are harmless legacy artifacts.

## Further Reading

| Resource | What's in it |
|----------|-------------|
| `CLAUDE.md` | Project conventions, architecture decisions, gotchas (read this if using Claude Code) |
| `docs/MIGRATION.md` | How the site was migrated from Webflow |
| `docs/branch-protection-spec.md` | Branch protection rules and reviewer configuration |
| `.claude/skills/` | Claude Code automation skills (blog posts, image uploads) |
| `.env.example` | All available environment variables with documentation |
| `src/content.config.ts` | All 20 content collection schemas (Zod) |
