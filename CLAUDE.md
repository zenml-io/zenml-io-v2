# ZenML Website — Production Astro Site

## Project Overview

This repository powers the live [zenml.io](https://www.zenml.io) marketing
website — an Astro v5 static site hosted on Cloudflare Pages. ~2,224 pages
across 20 content collections, built in ~33 seconds.

- **Production URL**: https://www.zenml.io
- **Hosting**: Cloudflare Pages (edge CDN, branch previews, auto CI/CD)
- **Scale**: 20 content collections, ~2,340 content items, ~2,551 assets on R2
- **History**: Migrated from Webflow in Feb 2026. See `docs/MIGRATION.md` for the historical narrative
- **Private details**: See `CLAUDE.private.md` (gitignored) for infrastructure IDs, traffic numbers, and internal docs index

## Operational Constraints

- **No broken links** — all published URLs must be preserved or 301-redirected
- **SEO stability** — keep slugs, meta tags, Open Graph data intact when editing content
- **Content schema integrity** — 20 collections validated by Zod schemas in `src/content.config.ts`
- **Static-first output** — the site is statically generated; only API routes in `src/pages/api/` run server-side
- **Use Astro API routes, not `functions/`** — the Cloudflare adapter's `_worker.js` silently ignores hand-written `functions/` (see below)

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | **Astro** (TypeScript) — static-first, content collections, islands |
| Content | **Markdown (.md) in git** — Astro Content Collections with Zod schemas. **Use `.md` NOT `.mdx`** (MDX v2 treats HTML as strict JSX, breaking raw HTML in content) |
| Hosting | **Cloudflare Pages** — edge CDN, branch previews, auto CI/CD |
| Assets | **Cloudflare R2** — object storage for images/files |
| Styling | **Tailwind CSS** — utility-first |
| Interactive | **Preact islands** — 9 islands: LLMOpsFilter, ContactForm, DemoRequestFormAB, BlogSearch, CookieConsent, FeatureTabsSlider, LottieHero, ProTestimonialCarousel, RoiCalculator |
| Search | **Pagefind** — build-time full-text search index (1,453 LLMOps pages indexed, hybrid with JSON faceted filtering) |
| Forms | **ContactForm** Preact island → Astro API routes (`src/pages/api/forms/[formType].ts`, `prerender: false`) → Segment HTTP API (identify + track). Cal.com embeds for demo booking. Brevo for newsletter |
| Analytics | **Plausible** + GA4 + Segment (hostname-gated to production domain to prevent preview pollution) |
| Code highlighting | **Shiki** (custom `zenml-light`/`zenml-dark` themes) at build time + **JetBrains Mono** monospace font (self-hosted variable woff2) |

## Key Technical Decisions

| Decision | Value |
|----------|-------|
| Trailing slash | `never` — configured site-wide in `astro.config.ts`, canonicals strip trailing `/` |
| Canonical domain | `www.zenml.io` (bare `zenml.io` redirects to www) |
| Build format | `file` — generates `.html` files (`buildCanonical()` in `seo.ts` strips the `.html` suffix) |

## Development Conventions

- **This is a public repository.** All commits, documentation, and code are visible to the public. Never commit secrets, API keys, infrastructure IDs, internal URLs, traffic numbers, or other sensitive information. Use `CLAUDE.private.md` (gitignored) for private details. The `design/` folder and `scripts/internal/` are also gitignored for internal-only artifacts
- `design/` folder is for heavy artifacts (exports, screenshots, JSON dumps, internal docs) — **never commit to git**
- Make targeted git commits (only relevant files)
- After running tests, re-run them if you make subsequent changes
- **Build output**: `pnpm build` generates ~2000+ lines of output listing every generated page. Always run it in background mode and use `tail` to check only the final lines for success/failure
- **Credential management**: When you receive API credentials, tokens, or keys, **always add them to `.env`** for persistence across sessions. The `.env` file is gitignored and safe for secrets
- VERY IMPORTANT: **Before opening a PR or making a large commit**, always run `/simplify` to review changed code for reuse opportunities, quality issues, and efficiency improvements. Fix any issues it finds before committing.

## Images & Assets

### Two-tier system

| Tier | Location | Use for | How to reference |
|------|----------|---------|------------------|
| **A: Static** | `public/images/` | Site-wide UI: logos, icons, favicons, backgrounds, OG default | Root-relative: `"/images/filename.svg"` |
| **B: R2** | `zenml-assets` bucket | Content images: blog heroes, screenshots, team photos, integration logos, OG images | Absolute URL: `"https://assets.zenml.io/..."` |

**Decision rule:** If the image appears in `src/content/*.md` frontmatter, it must be an absolute URL (content schemas use `z.string().url()`), so it goes to R2. If it's site furniture reused across many pages, put it in `public/images/`.

### Adding new images

**Tier A (static):** Just place the file in `public/images/` and reference it as `"/images/..."`.

**Tier B (R2):** Always **convert to AVIF first**, then upload:

```bash
# Step 1: Convert to AVIF (use the avif-image-compressor skill)
# For photos (team, blog heroes, screenshots): --quality 28, --resize 800
# For larger hero/banner images: --quality 25, --resize 1200
~/.claude/skills/avif-image-compressor/scripts/convert_to_avif.sh input.png --quality 28 --resize 800

# Step 2: Upload the AVIF to R2
uv run scripts/r2-upload.py output.avif --prefix content/blog       # custom prefix
uv run scripts/r2-upload.py output.avif --frontmatter                # print YAML snippet
```

**Never upload raw PNG/JPEG to R2** — AVIF typically achieves 50-250x compression. Use the `avif-image-compressor` Claude Code skill for conversion.

Requires R2 credentials in `.env` — see `.env.example`.

**R2 key structure:**
- New uploads: `content/uploads/{sha256_8}/{filename}` (or custom `--prefix`)
- Legacy (from original migration): `webflow/{siteId}/{hash}/{filename}` — still served, do not move

**In `src/lib/*.ts` data files:** Build URLs from the canonical constant, never hardcode the domain:
```ts
import { ASSET_BASE_URL } from "./constants";
const url = `${ASSET_BASE_URL}/content/uploads/1a2b3c4d/hero.webp`;
```

**Claude Code skills:**
- `r2-image-upload` (`.claude/skills/r2-image-upload/SKILL.md`) — upload images to R2. Triggers: "upload image", "add image to R2", "new blog image".
- `blog-post-contributor` (`.claude/skills/blog-post-contributor/SKILL.md`) — full blog post workflow from markdown or Notion. Triggers: "new blog post", "add blog", "blog from Notion".

### Lessons Learned

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

### Filenames with spaces break regex URL matching

R2 keys with spaces get truncated by `[^\s...]` regex patterns. For
comprehensive audits, match only the 8-char hash prefix (`[a-f0-9]{8}`) and
verify it exists in the bucket, rather than trying to capture the full filename.

## Cloudflare Pages Functions vs Astro API Routes

**Do NOT use the `functions/` directory** for serverless endpoints when the
`@astrojs/cloudflare` adapter is active. The adapter generates a `_worker.js`
in `dist/` that takes over the single Worker slot — any hand-written
`functions/` are silently ignored (no build error, just runtime 404s).

Instead, create server-side endpoints as **Astro API routes** in `src/pages/api/`
with `export const prerender = false`. These are compiled into the adapter's
Worker and share access to Cloudflare runtime bindings via
`(context.locals as Runtime).runtime` (env vars, `ctx.waitUntil()`, caches).

## Legacy Terminology

This site was migrated from Webflow in Feb 2026. Some naming and metadata from that era persists in the codebase:

- **`scripts/phase2/validate-content.ts`** — still the active content validator (`pnpm validate:content`); the path is historical, the tool is current
- **`webflow` frontmatter** in content `.md` files — retained for traceability on migrated content; not needed for new posts
- **`R2_WEBFLOW_BASE`** in `src/lib/constants.ts` — references legacy asset namespaces still served from R2
- **`.prose` CSS class** — styles raw HTML that originated from Webflow's CMS export
- **`docs/MIGRATION.md`** — historical narrative of the migration; not current architecture authority

## LLMOpsDB Native Publish Workflow

LLMOps database entries are no longer only historical Webflow-migration artifacts. New entries can now be published natively from the sibling `llmops-db-notion` repo into:

- `src/content/llmops-database/*.md`

Important rules:

- New native LLMOps entries may use a `notion:` provenance block instead of `webflow:`
- Existing migrated entries still use `webflow:` provenance
- RSS date derivation for LLMOps entries is source-agnostic (`webflow` first, then `notion`)
- After new LLMOps entries land, validate with:
  - `pnpm validate:llmops`
  - `pnpm check`
  - `pnpm build`

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
- `src/components/islands/BlogSearch.tsx` — Blog search with Cmd+K shortcut, lazy-fetches `/blog/search-index.json` on focus (`client:media` — desktop only)
- `src/components/islands/ContactForm.tsx` — Form submission → Astro API routes
- `src/components/islands/DemoRequestFormAB.tsx` — A/B variant demo request form (sessionStorage-based split, Plausible events)
- `src/components/islands/CookieConsent.tsx` — Cookie consent banner (4 categories)
- `src/components/islands/FeatureTabsSlider.tsx` — Homepage auto-cycling feature tabs
- `src/components/islands/LottieHero.tsx` — Hero Lottie animation player
- `src/components/islands/ProTestimonialCarousel.tsx` — /pro page testimonial carousel
- `src/components/islands/RoiCalculator.tsx` — ROI calculator interactive form

### Server-side API Routes (`prerender: false`)
- `src/pages/api/forms/[formType].ts` — Form submission handler → Segment HTTP API (identify + track)
- `src/pages/api/csp-report.ts` — CSP violation report sink (logs redacted summary, returns 204)

### Layouts
- `src/layouts/BaseLayout.astro` — Main layout (nav, footer, head slots, analytics)
- `src/layouts/BlogLayout.astro` — Blog post layout (conditional TOC sidebar)
- `src/layouts/MinimalLayout.astro` — Lightweight shell (no nav/footer) for embeds
