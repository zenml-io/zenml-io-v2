# Phase 4: SEO & Redirects — Detailed Plan

**Created:** 2026-02-12
**Last Updated:** 2026-02-12
**Status:** NOT STARTED
**Prerequisites:**
- Phase 3 COMPLETE (all templates, pages, layouts — ~2,230+ pages building in ~27s)
- SEO baseline exists: `design/migration/phase1/runs/2026-02-11T0626Z/seo/baseline.json` (2,151 URLs)
- Webflow redirects exported: `design/migration/phase1/runs/2026-02-11T0626Z/redirects/_redirects.webflow` (44 rules)
- `@astrojs/sitemap` already in `astro.config.ts` (auto-generates `sitemap-index.xml`)
- `public/robots.txt` already exists (points to `sitemap-index.xml`)
- `src/lib/seo.ts` provides `SEOProps` / `resolveSeo()` interface used by all templates
- `src/lib/constants.ts` has `DEFAULT_OG_IMAGE = undefined` (placeholder — needs real asset)
- `src/lib/redirectOnly.ts` has 7 external redirect routes (Phase 3H-7 JS redirects → convert to 301s)

---

## Goals

1. **Preserve SEO equity** — every existing URL returns 200 or 301 to the correct destination
2. **Match head tags** — title, description, canonical, OG, Twitter Card parity with current site
3. **Generate feeds** — RSS for blog + LLMOps database at exact existing URLs
4. **Generate sitemap** — all indexable pages with correct canonicals and lastmod
5. **Add structured data** — JSON-LD for blog posts, organization, breadcrumbs
6. **Add GEO support** — `llms.txt` for LLM crawlers
7. **Generate OG images** — default + per-page Open Graph images
8. **Consolidate redirects** — single `_redirects` file for Cloudflare Pages
9. **Automated parity testing** — compare old vs new head tags across all 2,151 URLs

---

## Success Criteria

- [ ] All 44 Webflow redirect rules present in `public/_redirects`
- [ ] 8 redirect-only pages (7 from `redirectOnly.ts` + `/cla`) converted to 301s in `_redirects`
- [ ] `/book-a-demo` and `/signup-for-demo` confirmed as 200 pages (NOT redirects — they are real form pages per Phase 1 baseline)
- [ ] `/blog/rss.xml` returns valid RSS 2.0 with all published posts (sorted by date desc)
- [ ] `/llmops-database/rss.xml` returns valid RSS 2.0 with all published entries
- [ ] `sitemap-index.xml` includes all ~2,230+ indexable pages (no drafts, no noindex pages)
- [ ] `DEFAULT_OG_IMAGE` set to a real OG image asset
- [ ] Blog posts have `Article` JSON-LD structured data
- [ ] `/llms.txt` serves a well-structured text file for LLM crawlers
- [ ] Automated parity script reports <5% deviation on title/description/canonical across 2,151 URLs
- [ ] Build still completes in <35s
- [ ] `robots.txt` correctly references sitemap URL

---

## Sub-Tasks

### 4A: Cloudflare Pages `_redirects` File

**Goal:** Consolidate ALL redirect rules into a single `public/_redirects` file that Cloudflare Pages processes at the edge (faster than JS redirects, proper 301 status codes).

**Background:** Cloudflare Pages supports a `_redirects` file in the output directory. Format: `<from> <to> <status>`. Max 2,000 static rules + 100 dynamic rules. We have ~55 total — well under the limit.

**Tasks:**
- [ ] Create `public/_redirects` from four sources:
  1. **Webflow redirects** (44 rules from `_redirects.webflow`) — strip inline comments (CF Pages only supports `#` on its own line)
  2. **Redirect-only routes** (7 routes from `src/lib/redirectOnly.ts`)
  3. **Additional redirect-like pages** not in the registry: `/cla` → `https://gist.github.com/htahir1/5fb2645b62662f2c723c529f7d9fca09`
  4. **Baseline-discovered redirects** — check `baseline.json` for URLs where `redirectedFrom` is populated (e.g., `/team` → `/company#team` if applicable)
- [ ] **Important:** Do NOT add `/book-a-demo` or `/signup-for-demo` as redirects — these are real form pages (200 OK with self-canonicals in Phase 1 baseline)
- [ ] Remove thin `.astro` redirect pages from `src/pages/` (they're replaced by `_redirects` 301s):
  - `src/pages/slack.astro`
  - `src/pages/slack-invite.astro`
  - `src/pages/roadmap.astro`
  - `src/pages/discussion.astro`
  - `src/pages/meet.astro`
  - `src/pages/zenml-meet.astro`
  - `src/pages/components.astro`
  - `src/pages/cla.astro`
- [ ] Optionally remove `src/lib/redirectOnly.ts` if nothing else references it
- [ ] **Keep** `src/layouts/MinimalLayout.astro` — it's used by Storylane embed pages (`/interactive-demo-mcp`, `/live-demo`), not just redirect pages
- [ ] Verify redirect behavior: `curl -sI https://zenml-io-v2.pages.dev/slack` should return `301` (not 200 with JS redirect)
- [ ] Investigate `/p4t78tnt73b...txt` redirect (from Webflow export) — may be a Google Search Console verification file that needs to be a **200 static file** rather than a 301 redirect

**Cloudflare `_redirects` format:**
```
# Webflow legacy redirects
/open-source-vs-managed /open-source-vs-pro 301
/pricing-test /pricing 301
...

# External redirects (from redirectOnly.ts + cla)
/slack https://join.slack.com/t/zenml/shared_invite/... 301
/roadmap https://github.com/orgs/zenml-io/projects/1 301
/cla https://gist.github.com/htahir1/5fb2645b62662f2c723c529f7d9fca09 301
...

# Docs/content redirects
/llms-full.txt https://docs.zenml.io/llms.txt 301
/llmops-guide https://docs.zenml.io/user-guide/llmops-guide 301
```

**Gotcha:** Cloudflare Pages processes `_redirects` BEFORE serving static files. If a static `.html` exists AND a redirect rule matches the same path, the redirect wins. This is what we want — ensures the old `.astro` pages get replaced cleanly.

**Gotcha 2:** The Webflow `_redirects.webflow` file contains inline comments (`... 301 # Flattened from...`). Cloudflare Pages only supports `#` comment lines at the start of a line. Strip inline comments when generating `public/_redirects`.

---

### 4B: RSS Feeds

**Goal:** Generate RSS 2.0 feeds at the exact URLs the current site serves: `/blog/rss.xml` and `/llmops-database/rss.xml`.

**Background:** Webflow auto-generates RSS feeds for CMS collections. We need to replicate these as Astro endpoint files. The current feeds use standard RSS 2.0 with `<atom:link>` self-reference and `<media:content>` namespace.

**Current feed structure (from Webflow):**
- Blog: `<title>ZenML Blog</title>`, `<description>Blog post written by the ZenML Team</description>`
- LLMOps: `<title>LLMOps Database RSS Feed</title>`, `<description>New entries in the ZenML LLMOps Database</description>`
- Both use `<pubDate>` per item and channel-level `<pubDate>`
- `<atom:link href="..." rel="self" type="application/rss+xml"/>`

**Tasks:**
- [ ] Create `src/pages/blog/rss.xml.ts` — Astro API route endpoint
  - Fetch all published blog entries (exclude drafts), sort by date desc
  - Generate valid RSS 2.0 XML
  - Include: title, link, guid (= link), description (= excerpt or meta description), pubDate
  - Set `Content-Type: application/rss+xml; charset=utf-8`
  - Include `<atom:link>` self-reference
  - **pubDate source:** Use `date` field from blog frontmatter
- [ ] Create `src/pages/llmops-database/rss.xml.ts` — Astro API route endpoint
  - Fetch all published LLMOps entries
  - **pubDate source (CONFIRMED):** LLMOps schema has NO top-level `date` field. Timestamps live under `entry.data.webflow.*` (all optional strings):
    - Fallback order: `webflow.lastPublished` → `webflow.lastUpdated` → `webflow.createdOn` → omit `<pubDate>`
    - Sort by the same derived timestamp (with stable tie-breaker on slug)
  - Include: title, link, guid, description (= `summary` field), pubDate
  - Include same RSS structure as blog feed
- [ ] Validate both feeds with an RSS validator (e.g., `https://validator.w3.org/feed/`)
- [ ] Verify URLs match exactly: `/blog/rss.xml` and `/llmops-database/rss.xml`

**Implementation pattern (Astro API route):**
```typescript
// src/pages/blog/rss.xml.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ZenML Blog</title>
    ...
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
  });
};
```

**Note:** Astro also has `@astrojs/rss` package — evaluate whether to use it or hand-roll for more control over matching Webflow's output format.

---

### 4C: Sitemap Configuration

**Goal:** Ensure the auto-generated sitemap is correct and comprehensive.

**Background:** `@astrojs/sitemap` is already installed and configured in `astro.config.ts`. It auto-generates `sitemap-index.xml` which is already referenced in `public/robots.txt`. However, we need to verify it:
1. Excludes noindex pages (drafts, redirect-only pages)
2. Uses correct canonical host (`www.zenml.io`)
3. Includes `lastmod` where available
4. Doesn't include RSS/API endpoints

**Important:** `@astrojs/sitemap` cannot infer `noindex` from rendered head tags — exclusions must be path-based.

**Tasks:**
- [ ] Configure sitemap `filter` in `astro.config.ts` to exclude these paths:
  - **JSON/RSS endpoints:** `/llmops-index.json`, `/blog/rss.xml`, `/llmops-database/rss.xml`
  - **Success/thank-you pages (noindex):** `/book-success`, `/booked`, `/book-a-demo-success`, `/newsletter-success`, `/success-calendar`
  - **404:** `/404`
  - **Redirect-only routes** (after 4A, these pages are deleted — but exclude as safety net if any remain)
  - Old-projects pages (all drafts — shouldn't generate routes)
- [ ] `lastmod` strategy — **omit for launch** (simpler):
  - `@astrojs/sitemap` doesn't automatically read frontmatter dates; would require custom `serialize` hook or a custom sitemap generator
  - Blog `date` field and LLMOps `webflow.lastPublished` are available if we add `lastmod` post-launch
  - Static pages have no reliable `lastmod` source
- [ ] Verify sitemap output after build:
  - Check page count matches expected (~2,230+)
  - Spot-check 10 URLs for correct format
  - Ensure no Cloudflare Pages preview URLs leak in
- [ ] Verify `robots.txt` reference: `Sitemap: https://www.zenml.io/sitemap-index.xml`

---

### 4D: Open Graph Images

**Goal:** Ensure every page has an OG image for social sharing.

**Background:**
- The current Webflow site uses a default OG image: `685aadfc75c3d8495ee841e1_og-img-0625.jpg` (visible in SEO baseline)
- Blog posts may have their own `mainImage` that should be used as OG image
- `src/lib/constants.ts` currently has `DEFAULT_OG_IMAGE = undefined`

**Tasks:**
- [ ] Upload the default OG image to R2 (or `public/images/`)
  - Source: `https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/685aadfc75c3d8495ee841e1_og-img-0625.jpg`
  - This is already in R2 if it was part of the Phase 1 asset migration — check first
- [ ] Set `DEFAULT_OG_IMAGE` in `constants.ts` to the correct URL
- [ ] Verify blog posts use `mainImage` as OG image (check BlogLayout / blog template)
- [ ] **Optional (defer if complex):** Generate per-page OG images at build time using `satori` + `sharp`
  - This would create unique social cards for each blog post with the title overlaid on a branded template
  - Evaluate: is this worth the build-time cost for ~2,230 pages?
  - If deferred: the default OG image + blog mainImage covers 95% of cases

**Evaluation of OG image generation approaches:**

| Approach | Pros | Cons |
|----------|------|------|
| Default OG image only | Simple, fast build | All non-blog pages share same image |
| Default + blog mainImage | Good coverage, zero build cost | Non-blog pages still generic |
| satori + sharp generation | Unique per page, professional | Build complexity, ~10-20s extra build time |
| Cloudflare Workers OG | On-demand, no build cost | Extra infra, latency on first request |

**Recommendation:** Start with default + blog mainImage. Defer satori generation to post-launch optimization.

---

### 4E: Structured Data (JSON-LD)

**Goal:** Add machine-readable structured data to key page types for rich search results.

**Background:** The current Webflow site does NOT appear to have extensive JSON-LD (Webflow has limited native support). This is an improvement opportunity — adding structured data can unlock rich snippets in Google Search (article cards, breadcrumbs, FAQ, organization knowledge panel).

**Tasks:**
- [ ] Create `src/components/seo/JsonLd.astro` — reusable component that renders a `<script type="application/ld+json">` tag
- [ ] Add `Article` schema to blog posts:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "...",
    "datePublished": "...",
    "dateModified": "...",
    "author": { "@type": "Person", "name": "..." },
    "publisher": { "@type": "Organization", "name": "ZenML" },
    "image": "...",
    "description": "..."
  }
  ```
- [ ] Add `Organization` schema to homepage:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ZenML",
    "url": "https://www.zenml.io",
    "logo": "...",
    "sameAs": ["https://github.com/zenml-io/zenml", "https://twitter.com/zenaborhood"]
  }
  ```
- [ ] Add `BreadcrumbList` schema to deep pages (blog posts, LLMOps entries, compare pages):
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Blog", "item": "https://www.zenml.io/blog" },
      { "@type": "ListItem", "position": 2, "name": "Post Title" }
    ]
  }
  ```
- [ ] Add `FAQPage` schema to pages with FAQ sections (homepage, pricing):
  - Homepage already has `FAQAccordion.astro` with 5 Q&A items
  - Pricing page may also have FAQ content
- [ ] Add `SoftwareApplication` schema to the main product page (optional, lower priority)
- [ ] Validate structured data with Google's Rich Results Test tool

---

### 4F: `llms.txt` — GEO (Generative Engine Optimization)

**Goal:** Serve a well-structured `llms.txt` file that helps LLM crawlers understand the site.

**Background:** The current site already serves `/llms.txt` (confirmed 200 OK). The content is a curated, human-readable overview of the site organized by section (Product & Features, Integrations, Solutions, Company, Blog, Legal, etc.) with URLs and brief descriptions.

**Tasks:**
- [ ] Create `public/llms.txt` with content matching or improving on the current version
  - Fetch and analyze current `/llms.txt` content (already captured above)
  - Structure: title, description, site organization, key page URLs with descriptions
  - Omit individual blog articles and LLMOps entries (too many — thousands)
  - Include top-level section pages with descriptions
- [ ] Verify the file serves with `Content-Type: text/plain; charset=utf-8`
- [ ] Consider also creating `public/llms-full.txt` with more detail (the current site redirects `/llms-full.txt` → `https://docs.zenml.io/llms.txt`)
  - Decision: keep the redirect in `_redirects` rather than creating a local file (the docs site owns this)

---

### 4G: Favicon & Web Manifest

**Goal:** Complete the favicon setup with all standard variants.

**Background:**
- `public/favicon.png` exists (882 bytes) and is referenced in BaseLayout as `<link rel="icon" type="image/png" href="/favicon.png" />`
- No `favicon.ico` exists in `public/`
- Current Webflow site has: `shortcut icon` (PNG) + `apple-touch-icon` (webclip PNG)
- No `site.webmanifest` currently exists

**Tasks:**
- [ ] Optionally add `public/favicon.ico` (some browsers still request `/favicon.ico` by convention — convert from `favicon.png` or download from Webflow)
- [ ] Download apple-touch-icon from Webflow and add to `public/`:
  - Source: `https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/652692ff675b70e1b72144f8_zenml_webclip.png`
  - Save as `public/apple-touch-icon.png`
- [ ] Add `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />` to BaseLayout
- [ ] Create `public/site.webmanifest`:
  ```json
  {
    "name": "ZenML",
    "short_name": "ZenML",
    "icons": [
      { "src": "/favicon.png", "sizes": "32x32", "type": "image/png" },
      { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
    ],
    "start_url": "/",
    "display": "browser",
    "background_color": "#ffffff",
    "theme_color": "#7A3EF8"
  }
  ```
- [ ] Add `<link rel="manifest" href="/site.webmanifest" />` to BaseLayout

---

### 4H: Head Tag Parity Testing

**Goal:** Automated comparison of SEO-critical head tags between the current Webflow site and the new Astro build.

**Background:** Phase 1 captured an SEO baseline of 2,151 URLs with: title, description, canonical, OG tags, Twitter Card, robots meta, H1, word count. This is our acceptance test suite.

**Tasks:**
- [ ] Create `scripts/phase4/seo-parity-check.ts`:
  1. Load baseline from `design/migration/phase1/runs/2026-02-11T0626Z/seo/baseline.json`
  2. For each URL, fetch the corresponding page from the Astro build output (`dist/`)
  3. Parse the HTML and extract: title, meta description, canonical, OG title, OG description, OG image, robots meta
  4. Compare against baseline values
  5. Report: exact matches, acceptable differences (e.g., trailing slash normalization), mismatches
- [ ] Define acceptable differences:
  - Canonical URL: `https://www.zenml.io/foo` vs `https://www.zenml.io/foo/` (trailing slash — we use `never`)
  - OG image: new R2 URL vs old Webflow CDN URL (content same, URL different) — compare by existence, not exact match
  - **Twitter tags:** Baseline often has `twitterTitle`/`twitterDescription`/`twitterImage` as `null`, while our layouts always render `twitter:title` and `twitter:description`. Treat "baseline null → new present" as acceptable (improvement, not regression)
  - **Robots meta:** Baseline may use `noindex, follow` while our code uses `noindex, nofollow`. Consider switching BaseLayout to `noindex, follow` for parity (the `follow` variant is more common and allows crawlers to follow links even on noindex pages)
  - Missing vs present: flag if baseline had a value but new site doesn't (e.g., missing description)
- [ ] Run parity check and fix any mismatches found
- [ ] Target: <5% deviation (most deviations should be intentional improvements, not regressions)

**Alternative approach:** Instead of fetching from live build, parse the `dist/` HTML files directly. This is faster and doesn't require a running server.

---

### 4I: Redirect Verification

**Goal:** Verify every redirect works correctly end-to-end.

**Tasks:**
- [ ] Create `scripts/phase4/verify-redirects.ts`:
  1. Load all redirect rules from `public/_redirects`
  2. For each rule, make an HTTP request to the preview deployment
  3. Verify the response is 301 with the correct `Location` header
  4. Report any failures
- [ ] Also verify the 2,151 baseline URLs:
  - All 200-status URLs from baseline should still return 200
  - All redirect URLs should return 301 to the correct destination
- [ ] Check for redirect loops (A → B → A)
- [ ] Check for redirect chains (A → B → C — should be A → C)

---

### 4J: Final SEO Checklist

**Goal:** Manual verification of SEO best practices across key pages.

**Tasks:**
- [ ] Verify `<link rel="canonical">` on every page type (spot-check 10):
  - Homepage: `https://www.zenml.io`
  - Blog post: `https://www.zenml.io/blog/<slug>`
  - Blog listing: `https://www.zenml.io/blog`
  - Blog pagination: `https://www.zenml.io/blog/page/2`
  - LLMOps entry: `https://www.zenml.io/llmops-database/<slug>`
  - Feature page: `https://www.zenml.io/features/<slug>`
  - Compare page: `https://www.zenml.io/compare/<slug>`
  - Static page: `https://www.zenml.io/pricing`
  - Author page: `https://www.zenml.io/author/<slug>`
  - Tag page: `https://www.zenml.io/tags/<slug>`
- [ ] Verify single H1 per page (spot-check 10 pages)
- [ ] Verify no `noindex` on pages that should be indexed
- [ ] Verify `noindex` IS present on pages that should NOT be indexed (drafts, redirect pages before removal)
- [ ] Verify heading hierarchy (H1 → H2 → H3, no skips) on blog posts
- [ ] Verify alt text on images (at least on homepage, blog posts)
- [ ] Verify `<html lang="en">` is present
- [ ] Verify `<meta charset="UTF-8">` is present
- [ ] Verify `<meta name="viewport">` is present
- [ ] Check page load performance with Lighthouse on 5 key pages

---

## Implementation Order

The sub-tasks have natural dependencies:

```
4A (redirects)     — independent, do first
4B (RSS feeds)     — independent, do in parallel with 4A
4C (sitemap)       — independent, do in parallel
4D (OG images)     — independent, do in parallel
4F (llms.txt)      — independent, do in parallel
4G (favicon)       — independent, do in parallel

4E (JSON-LD)       — depends on blog/layout understanding (trivial dependency)

4H (parity test)   — do AFTER 4A-4G are complete (tests the whole thing)
4I (redirect test) — do AFTER 4A is complete
4J (checklist)     — do LAST (manual verification)
```

**Recommended execution order:**
1. **Batch 1** (parallel): 4A + 4B + 4C + 4D + 4F + 4G — all independent
2. **Batch 2**: 4E (structured data) — light dependency on templates
3. **Batch 3**: 4H + 4I (automated testing) — validates everything
4. **Batch 4**: 4J (manual checklist) — final human review

---

## Deferred Decisions (Resolved Here)

| Decision | Resolution |
|----------|-----------|
| `/book-a-demo` + `/signup-for-demo` → 301 to `/book-your-demo` | **NO** — these are real form pages (200 OK with self-canonicals in baseline). Keep as separate pages |
| `/cla` → external redirect | **YES** — convert from JS redirect page to 301 in `_redirects` |
| Sitemap URL strategy | Use `@astrojs/sitemap` auto-generation with path-based filter exclusions |
| Sitemap `lastmod` | **Omit for launch** — add post-launch via custom `serialize` hook if needed |
| RSS pubDate source for LLMOps | Use `webflow.lastPublished` → `lastUpdated` → `createdOn` fallback chain (all optional strings) |
| OG image generation | Default + blog mainImage for launch; defer satori to post-launch |
| `noindex` robots directive | Consider switching from `noindex, nofollow` to `noindex, follow` (matches baseline behavior) |
| MinimalLayout removal | **Keep** — used by Storylane embed pages, not just redirect pages |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| RSS feed URL mismatch | Subscribers lose updates | Match exact paths: `/blog/rss.xml`, `/llmops-database/rss.xml` |
| Redirect rule count exceeds CF limit | Some redirects silently ignored | We have ~55 rules vs 2,000 limit — no risk |
| Sitemap includes noindex pages | Conflicting signals to crawlers | Configure sitemap filter to exclude noindex routes |
| OG image missing on pages | Poor social sharing appearance | Set DEFAULT_OG_IMAGE as fallback |
| Parity test reveals many mismatches | Risk of SEO ranking drops | Fix all critical mismatches before launch |
| `_redirects` conflicts with static files | Unexpected behavior | CF Pages processes redirects first — test each rule |
| LLMOps entries lack pubDate for RSS | Invalid RSS feed | Use `createdOn` as fallback, or omit `<pubDate>` per-item |

---

## Files to Create/Modify

### New files:
- `public/_redirects` — consolidated redirect rules
- `src/pages/blog/rss.xml.ts` — blog RSS feed endpoint
- `src/pages/llmops-database/rss.xml.ts` — LLMOps RSS feed endpoint
- `src/components/seo/JsonLd.astro` — JSON-LD structured data component
- `public/llms.txt` — GEO support file
- `public/apple-touch-icon.png` — apple touch icon
- `public/site.webmanifest` — web manifest
- `scripts/phase4/seo-parity-check.ts` — automated SEO parity test
- `scripts/phase4/verify-redirects.ts` — redirect verification script

### Modified files:
- `astro.config.ts` — sitemap filter configuration
- `src/lib/constants.ts` — set `DEFAULT_OG_IMAGE` to real value
- `src/layouts/BaseLayout.astro` — add apple-touch-icon, manifest link, JSON-LD slot
- `src/pages/blog/[slug].astro` — add Article JSON-LD
- `src/pages/index.astro` — add Organization JSON-LD + FAQPage JSON-LD

### Removed files (after 4A):
- `src/pages/slack.astro`
- `src/pages/slack-invite.astro`
- `src/pages/roadmap.astro`
- `src/pages/discussion.astro`
- `src/pages/meet.astro`
- `src/pages/zenml-meet.astro`
- `src/pages/components.astro`
- `src/pages/cla.astro`
- Possibly: `src/lib/redirectOnly.ts` (if nothing else imports it after redirect page removal)

### NOT removed (still needed):
- `src/layouts/MinimalLayout.astro` — used by `/interactive-demo-mcp` and `/live-demo` (Storylane embeds)
- `src/pages/book-a-demo.astro` — real form page, NOT a redirect
- `src/pages/signup-for-demo.astro` — real form page, NOT a redirect

### Unchanged:
- `public/robots.txt` — already correct
- `public/favicon.png` — already in place (882 bytes)
