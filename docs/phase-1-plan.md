# Phase 1: Content Export & Transform — Detailed Plan

> **Goal**: Get ALL content out of Webflow — CMS data, static page content, SEO
> metadata, assets, and redirects. Transform into Astro-ready format.
>
> **Definition of done**: Re-runnable pipelines that produce a complete, validated
> snapshot of all Webflow content, with assets re-hosted to R2 and content
> transformed to MDX with rewritten URLs.

---

## 0) Outcomes

Phase 1 is complete when we have **re-runnable pipelines** that produce:

1. **SEO baseline snapshot** of the current production site (all public URLs)
   with head-tag + canonical parity fields.
2. **Full Webflow CMS snapshots** — live items, staged items, and a computed
   draft/published classification (staged-only → `draft: true`).
3. **Static page HTML snapshots** (published + draft where available), plus
   extracted SEO metadata per page.
4. **Complete asset migration dataset** — deduplicated inventory, downloaded
   locally, uploaded to R2, with a deterministic URL rewrite map.
5. **HTML → MDX transforms** for CMS rich text fields, with rewritten asset URLs
   and Webflow IDs for traceability.
6. **Redirect rules export** (Webflow-managed) + auto-generated redirects from
   detected slug changes/deletions between runs.
7. **Animation / interaction catalog** (data-w-id, custom inline scripts,
   Finsweet behaviors) to drive Phase 3 parity work.

All artifacts must support **two runs**:
- **Run A (now):** build against stable snapshot
- **Run B (pre-cutover):** re-export + diff to capture newly published content,
  slug changes, deletions, and new assets

---

## 1) Non-negotiable Constraints

### URL + SEO Parity
- Preserve existing public URL paths exactly (see `docs/webflow-inventory.md`)
- Preserve per-page SEO metadata:
  - `<title>`, `<meta name="description">`
  - `<link rel="canonical">` (host: `https://www.zenml.io`, trailing slash: `never`)
  - OG tags: `og:title`, `og:description`, `og:image`
  - Twitter card: `twitter:card`, `twitter:title`, `twitter:description`
- **SEO metadata source**: Blog posts have NO SEO-specific fields in their CMS
  schema. SEO metadata comes from the **baseline crawl** (Phase 1B) and is
  merged with CMS data during the MDX transform step (Phase 1H). The crawl
  captures actual `<title>`, `<meta>`, and OG tags from rendered pages.

### RSS Feed Preservation
- Must preserve exact feed URLs:
  - `https://www.zenml.io/blog/rss.xml`
  - `https://www.zenml.io/llmops-database/rss.xml`
- Feed format and item structure should match current Webflow-generated feeds
- Implementation is in Phase 4, but Phase 1 SEO crawl captures feed URLs for validation

### Live + staged export
- Export **both**:
  - **Live** items (`/items/live`) = published, source of truth for parity
  - **Staged** items (`/items`) = includes drafts and unpublished edits
- Items in staged but **not** in live → `draft: true` in frontmatter
- Staged edits to already-live items → captured in snapshot, but MDX generated
  from **live** version (SEO parity)

### Idempotent / re-runnable scripts
- Safe to re-run without manual cleanup
- Deterministic outputs (stable paths and keys)
- Support resuming after interruption via manifests
- Manifests track download/upload state to avoid redundant work

### Two CDN URL patterns (confirmed)
- **Newer content**: `cdn.prod.website-files.com/65264f6bf54e751c3a776db1/...`
- **Older content**: `uploads-ssl.webflow.com/65264f6bf54e751c3a776db1/...`
- Both use the same site ID prefix but different hostnames
- All asset discovery scripts MUST match both patterns

### Asset re-hosting (mandatory)
- Every Webflow-hosted asset referenced in content must migrate to R2:
  - `cdn.prod.website-files.com/...` (newer content)
  - `uploads-ssl.webflow.com/...` (older content, pre ~mid-2024)
  - `d3e54v103j8qbb.cloudfront.net/...` (legacy CloudFront CDN, if any)
  - Any Webflow-hosted custom scripts (e.g., Clarity)
- Content rewritten to reference `ASSET_BASE_URL` (currently `r2.dev`, later
  `assets.zenml.io`)
- **Image optimization**: Upload 1:1 for Phase 1. Conversion to WebP/AVIF
  deferred to post-launch optimization phase.

### Traceability (Webflow IDs)
- Preserve in frontmatter: item ID, collection ID, export timestamp
- Enable: deletion detection, slug change → redirect generation between runs

---

## 2) Artifact Directory Layout

Heavy artifacts go under `design/` (gitignored). Planning docs stay in `docs/`.

```
design/migration/phase1/
  runs/
    <runId>/                         # e.g. 2026-02-11T1000Z
      run.json                       # metadata: time, git sha, config
      seo/
        baseline.json                # machine-readable SEO snapshot
        baseline.csv                 # human-readable for diffing
        crawl.log
      webflow/
        site.json
        collections.json
        schemas/
          collections.schema.json    # field definitions per collection
        items/
          <collectionSlug>/
            live.json
            staged.json
            diff.json                # staged-vs-live differences
      pages/
        published/
          <path>.html
        drafts/
          <path>.html
        page-index.json              # per page: url, status, canonical, wfPageId
      assets/
        inventory.json               # deduplicated asset list
        download/
          ...files...
        download-manifest.json       # status + checksum per asset
      r2/
        upload-manifest.json         # R2 object key, checksum, content-type
        url-map.json                 # old_url → new_url
      transform/
        collections/
          <collectionSlug>/
            <itemId>.<slug>.mdx
        transform-manifest.json      # warnings, unconverted nodes
      redirects/
        webflow-redirects.raw.*      # source export (CSV or JSON)
        webflow-redirects.json       # normalized
        redirects.auto.json          # from slug changes/deletions
        _redirects.webflow           # Cloudflare Pages format (Phase 4 input)
      animations/
        catalog.json
        notes.md                     # must-replicate vs acceptable-downgrade
```

---

## 3) Execution Sequence (with checkpoints)

### Phase 1A — Initialize run + inventory
1. Generate `runId` (UTC timestamp)
2. Write `run.json` with git SHA, site URL, Webflow site ID, config

**Checkpoint A1:** Run folder created with `run.json`.

---

### Phase 1B — SEO baseline crawl

**Goal:** Create the acceptance dataset for Phase 6 SEO parity testing.

**URL sources:**
- Primary: Production sitemap(s) at `www.zenml.io/sitemap.xml`
- Secondary: `docs/webflow-inventory.md` static page list
- Optional: crawl from `/` to catch stragglers

**Captured per URL:**
- Final URL after redirect chain
- Status code
- Canonical URL
- `<title>`, meta description
- OG tags + Twitter tags
- `robots` meta (if present)
- H1 text (first `<h1>`)
- Word count (approx visible text)
- Trailing slash normalization check

**Outputs:** `seo/baseline.json`, `seo/baseline.csv`, `seo/crawl.log`

**Checkpoint B1:** URL count ≈ 2,300+ (matching expected public URL volume).

---

### Phase 1C — Webflow CMS export (live + staged)

**Goal:** Deterministic CMS snapshot for transforms and pre-cutover diffing.

**API endpoints (Webflow v2):**
- `GET /v2/sites/:siteId/collections` — list collections
- `GET /v2/collections/:id/items/live` — published items
- `GET /v2/collections/:id/items` — staged items (includes drafts)

**All 17 non-empty collections to export:**

| Collection | ID | ~Items | Rich text? |
|---|---|---|---|
| Blog Posts | `6529473422d5a2b098037a66` | 317 | `post-body` (HTML) |
| LLMOps Databases | `673cae9956065f699a6b78de` | 1,453 | `body` (Markdown), `body-fallback` |
| Integrations | `65264f6b9c3008cceed0dbc6` | 68 | `features-with-zenml`, `tool-features`, `code-example`, `code-explanation`, `video-embed` |
| VS Pages | `66702e1c72d8c277bc96eee2` | 17 | `highlight-*-bullet-points`, `comparison-table`, `zenml-code`, `competitor-code`, `cta-bullet-points` |
| Advantages | `6670305ee43f4d2cd345c86b` | 45 | — |
| Quotes | `66702ecedfdd237229fd1f21` | 6 | — |
| Blog Authors | `652947bd67db73833cebbc9d` | 27 | — |
| Blog Tags | `652ce83aac2fb6a71aed4925` | 118 | — |
| Blog Categories | `652ce825e2cdc35ce4c5d309` | 14 | — |
| LLMOps Tags | `673f03d94646f8da7c7c474f` | 107 | — |
| Industry Tags | `673f03a6014d200884a4d175` | 17 | — |
| Integration Types | `65264fe049b66aba7406d2ce` | 17 | — |
| Team Members | `652f879e0bb4d9041f51102c` | 22 | `bullet-points` |
| Projects (new) | `67c6f4f00d9c5998d8fb82dd` | 16 | `pipelines`, `stack`, `details` |
| Old Projects | `6526b6460d0133018459aa7c` | 11 | `content` |
| Project Tags | `6526b6b67e26e91043715e06` | 80 | — |
| Product Categories | `66c4b189d225bb92c730f82f` | 5 | — |

**3 empty/test collections to skip:** LLMOps Categories, Project Categories, Blog Posts Sync TESTs.

**Draft computation:**
- `liveIds = set(live.items[].id)`
- `stagedIds = set(staged.items[].id)`
- `stagedOnly = stagedIds - liveIds` → these become `draft: true`

**Reference resolution:**
References in Webflow are stored as bare string IDs. We need to build a
lookup map: `{ itemId → { slug, name, collectionSlug } }` across all
collections. This enables replacing IDs with slugs in frontmatter (e.g.,
`author: "652cfca52c26659c8b204a07"` → `author: "hamza-tahir"`).

**Outputs:**
- `webflow/collections.json`
- `webflow/schemas/collections.schema.json`
- `webflow/items/<collectionSlug>/live.json`
- `webflow/items/<collectionSlug>/staged.json`

**Checkpoint C1:** Item counts match `docs/webflow-inventory.md` (±growth).

---

### Phase 1D — Static page extraction

**Goal:** Snapshot HTML and SEO for non-CMS pages (~44 published + 13 drafts).

**Published pages:** Fetch from production `www.zenml.io/<path>`, store raw HTML.

**Draft pages:** Copy from `design/webflow-export/extracted/*.html` into
`pages/drafts/` (since draft pages aren't publicly accessible).

**Outputs:**
- `pages/published/<path>.html`
- `pages/drafts/<path>.html`
- `pages/page-index.json`

**Checkpoint D1:** All published static pages from inventory have HTML snapshots.

---

### Phase 1E — Asset discovery

**Goal:** Build a single deduplicated inventory of every Webflow-hosted asset.

**Asset sources (must cover all):**
1. **CMS JSON exports** — image/file fields + rich text HTML (`<img>`, `<source>`,
   `<a href>` to PDFs, `<video>`)
2. **Static HTML snapshots** — `pages/**/*.html`
3. **Webflow code export** — `design/webflow-export/extracted/images/**`,
   `documents/**`, `fonts/**`, and CSS `url(...)` references
4. **SEO baseline** — OG images, favicons, social images

**Key observations from actual data:**
- Blog post image fields are objects: `{ fileId, url, alt }`
- Newer URLs: `cdn.prod.website-files.com/65264f6bf54e751c3a776db1/...`
- Older URLs: `uploads-ssl.webflow.com/65264f6bf54e751c3a776db1/...`
- Rich text HTML contains inline `<img>` with same CDN bases
- `srcset` attributes contain multiple URLs per image (each is a separate asset)

**URL pattern matching (must catch both):**
```regex
https?://(cdn\.prod\.website-files\.com|uploads-ssl\.webflow\.com)/65264f6bf54e751c3a776db1/.*
```

**Normalization:** Strip fragments, keep query strings, dedupe by normalized URL.

**Outputs:** `assets/inventory.json`

**Checkpoint E1:** Inventory covers homepage OG image, blog post inline images,
case study figures, feature page `srcset` variants.

---

### Phase 1F — Asset download

**Goal:** Download all inventory assets locally with retry + manifest.

**Rules:**
- Stable local path: `sha256(originalUrl)` prefix + sanitized filename
- Manifest entry per asset: `{ originalUrl, localPath, size, sha256, contentType, status }`
- Retry: 429 → backoff, 404 → mark failed, transient → bounded retries
- Re-runs skip already-downloaded assets (checksum match)

**Outputs:** `assets/download/**`, `assets/download-manifest.json`

**Checkpoint F1:** ~100% success rate for published-page assets; failures listed.

---

### Phase 1G — Upload to R2 + URL map

**Goal:** Upload assets to R2, generate old→new URL mapping.

**R2 key scheme:**
```
webflow/64a817a2e7e2208272d1ce30/<sha256-of-url>/<original-filename>
```
Stable across runs, human-debuggable (original filename preserved).

**Upload rules:**
- Skip already-uploaded objects if manifest checksum matches
- Store content-type explicitly
- Use `pnpm exec wrangler r2 object put` or wrangler SDK

**Outputs:** `r2/upload-manifest.json`, `r2/url-map.json`

**Checkpoint G1:** Sample pages (home, blog post, LLMOps listing) rewritten via
url-map contain zero `cdn.prod.website-files.com` URLs.

---

### Phase 1H — HTML → MDX transformation

**Goal:** Convert CMS content to Astro-ready MDX with asset URL rewriting.

**Important:** Use Webflow API exports as source of truth for CMS bodies, NOT the
code export (which contains `w-dyn-bind-empty` placeholders).

**Collections requiring rich text conversion:**

| Collection | Rich text fields | Body format |
|---|---|---|
| Blog Posts | `post-body` | HTML with Webflow classes |
| LLMOps Databases | `body`, `body-fallback-for-manual-entries` | Markdown (!) |
| Integrations | `features-with-zenml`, `tool-features`, `code-example`, `code-explanation`, `video-embed` | HTML |
| VS Pages | `highlight-*-bullet-points`, `comparison-table`, `zenml-code`, `competitor-code`, `cta-bullet-points` | HTML |
| Team Members | `bullet-points` | HTML |
| Projects | `pipelines`, `stack`, `details` | HTML |
| Old Projects | `content` | HTML |

**Frontmatter shape (minimum for Phase 1):**
```yaml
title: "..."
slug: "..."
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  collectionId: "..."
  itemId: "..."
  exportedAt: "2026-02-11T10:00:00Z"
  source: "live"           # or "staged-only"
  lastUpdated: "..."
# Collection-specific fields (author slug, tags slugs, etc.)
# populated after reference resolution
seo:
  title: "..."
  description: "..."
  canonical: "https://www.zenml.io/<path>"
  ogImage: "https://...r2..."   # after URL rewrite
```

**HTML conversion rules (based on observed patterns):**

| Webflow pattern | Conversion |
|---|---|
| `<h2>`, `<h3>`, etc. | Preserve as markdown headings |
| `<figure class="w-richtext-figure-type-image">` | `<figure><img .../><figcaption>...</figcaption></figure>` (raw HTML for fidelity) |
| `<pre><code fs-codehighlight-element="code">` | Fenced code blocks (triple backtick) |
| `<div data-rt-embed-type="true">` containing tables | Preserve as raw HTML table |
| `<div data-rt-embed-type="true">` containing code | Convert to fenced code block |
| Inline `<code>` | Preserve as inline code |
| `<a href="...">` | Preserve, rewrite if pointing to Webflow CDN |
| `<img src="...">` | Rewrite URL via url-map |
| `<iframe>` / embedded videos | Preserve as raw HTML |

**LLMOps special case:** Bodies appear to already be Markdown. Verify and either:
- Pass through directly (if valid MDX-compatible Markdown)
- Light cleanup only (normalize headings, rewrite asset URLs)

**Draft logic:**
- Staged-only items → `draft: true`
- Live items → MDX from **live** snapshot (SEO parity)
- Staged diffs for already-live items → captured in `diff.json` for review

**Outputs:**
- `transform/collections/<collectionSlug>/<itemId>.<slug>.mdx`
- `transform/transform-manifest.json` (warnings, unconverted nodes, rewrite counts)

**Checkpoint H1:** Random sample renders correctly — headings, images, code blocks
intact, no Webflow CDN URLs remaining.

---

### Phase 1I — Redirect export + auto-generation

**Goal:** Capture existing redirects and auto-generate new ones from slug changes.

**Webflow redirects: ✅ ALREADY EXPORTED**
- Exported CSV at `design/zenml-website-2026-02-10.csv` — **45 redirect rules**
- Format: `source,target` (standard Webflow redirect export)
- No API endpoint needed — CSV export covers everything

**Redirect analysis (from exported CSV):**

| Category | Count | Examples |
|---|---|---|
| Internal path changes | ~25 | `/cloud` → `/pro`, `/plans` → `/pricing` |
| Feature consolidation | ~10 | `/features/run-anywhere` → `/features`, etc. |
| External redirects | ~8 | `/changelog` → `docs.zenml.io/changelog`, `/demo-video` → YouTube |
| Marketing/short URLs | ~5 | `/qr` → `/book-your-demo`, `/scratch-card` → `/book-your-demo` |

**Redirect chains to flatten (important!):**
- `/open-source-vs-paid` → `/open-source-vs-managed` → `/open-source-vs-cloud` → `/open-source-vs-pro` (3 hops → flatten to 1)
- `/live-demo-mcp` → `/live-demo-cloud` → `/interactive-demo-mcp` (2 hops → flatten to 1)

**Special case:** `/p4t78tnt73bkujthrd1zausuvs9advz3.txt` redirects to a
Webflow-hosted file — this asset needs to be migrated to R2 and the redirect
target updated.

**Known redirect pages** (from `docs/webflow-inventory.md`, NOT in the CSV —
these are Webflow pages configured as redirects, not 301 rules):
- `/discussion` → GitHub Discussions
- `/slack`, `/slack-invite` → Slack community
- `/roadmap` → `zenml.featureos.app/roadmap`
- `/meet`, `/zenml-meet` → calendar links

**Auto-redirect generation (between Run A and Run B):**
- Same Webflow ID, different slug → redirect old path → new path (301)
- Item deleted between runs → redirect old path → collection listing page

**Outputs:**
- `redirects/webflow-redirects.json`
- `redirects/redirects.auto.json`
- `redirects/_redirects.webflow` (Cloudflare Pages format)

**Checkpoint I1:** Known redirect pages covered; format valid for Cloudflare Pages.

---

### Phase 1J — Animation / interaction catalog

**Goal:** Catalog what needs reimplementation in Phase 3.

**Sources:**
- Webflow code export HTML: `data-w-id` attributes + inline `opacity:0` styles
- Custom inline scripts (from `docs/custom-code-audit.md`)
- Page-specific behaviors observed in HTML snapshots

**Key behaviors to catalog:**

| Page | Behavior | Priority |
|---|---|---|
| Homepage | Interactive code-block highlighting (breakpoint-gated at 768px) | Must replicate |
| Homepage | Marquee/slider CSS animation (60s infinite) | Must replicate |
| Blog posts | TOC with IntersectionObserver scroll-spy | Must replicate |
| Blog posts | highlight.js code syntax highlighting | Replace with Shiki (built into Astro) |
| LLMOps listing | Random `style-1`..`style-8` class assignment + MutationObserver | Must replicate |
| LLMOps listing | Finsweet CMS filter (tag/search/category) | Replace with Preact island |
| Feature pages | `data-w-id` fade-in on scroll (opacity 0→1) | Must replicate (CSS/JS) |
| All pages | Cookie consent banner (Finsweet `fs-cc`) | Must replicate or replace |

**Outputs:** `animations/catalog.json`, `animations/notes.md`

**Checkpoint J1:** Catalog covers all items in the table above.

---

## 4) Script Plan

### Conventions
- **Location:** `scripts/phase1/`
- **Language:** TypeScript (consistency with project; Playwright already installed)
- **Execution:** `pnpm exec tsx scripts/phase1/<script>.ts [options]`
- **All scripts accept:** `--run-id`, `--out` (defaults to
  `design/migration/phase1/runs/<runId>`), `--force` (overwrite)
- **All scripts produce:** machine-readable manifest + human-readable log

### Environment variables
```bash
WEBFLOW_TOKEN=...              # Webflow API v2 bearer token (user confirmed available)
WEBFLOW_SITE_ID=64a817a2e7e2208272d1ce30
SITE_URL=https://www.zenml.io  # default
R2_BUCKET=zenml-assets         # default
ASSET_BASE_URL=https://pub-PLACEHOLDER.r2.dev  # R2 public access NOT yet enabled — enable via Wrangler or Cloudflare Dashboard before Phase 1G
```

> **Note:** R2 public access must be enabled before the upload step (Phase 1G).
> This can be done via `wrangler r2 bucket ...` or the Cloudflare Dashboard
> (R2 → zenml-assets → Settings → Public access). Phases 1A–1F can proceed
> without it.

### Script catalog

| Script | Purpose | Key inputs | Key outputs |
|---|---|---|---|
| `crawl-seo-baseline.ts` | Crawl public URLs, snapshot SEO fields | Sitemap URL, concurrency | `baseline.json`, `baseline.csv` |
| `export-webflow-cms.ts` | Export collections + schemas + items (live+staged) | Webflow token, site ID | `collections.json`, `items/<slug>/*.json` |
| `snapshot-static-pages.ts` | Save raw HTML for non-CMS pages | Page list, site URL | `pages/**/*.html`, `page-index.json` |
| `build-asset-inventory.ts` | Aggregate + dedupe assets from all sources | CMS dir, pages dir, code export | `inventory.json` |
| `download-assets.ts` | Download assets with retry + manifest | `inventory.json` | `download/**`, `download-manifest.json` |
| `upload-assets-to-r2.ts` | Upload to R2, generate URL map | Downloads, R2 bucket | `upload-manifest.json`, `url-map.json` |
| `transform-cms-to-mdx.ts` | Convert rich text → MDX, rewrite URLs | CMS items, `url-map.json` | `<slug>.mdx`, `transform-manifest.json` |
| `export-redirects.ts` | Normalize Webflow redirect CSV + flatten chains | `design/zenml-website-2026-02-10.csv` | `webflow-redirects.json`, `_redirects.webflow` |
| `generate-auto-redirects.ts` | Diff runs, detect slug changes/deletions | Run A items, Run B items | `redirects.auto.json` |
| `catalog-animations.ts` | Parse HTML for interactions + scripts | Code export, pages | `catalog.json`, `notes.md` |

---

## 5) Failure / Retry Strategy

### Webflow API (CMS export)
- Pagination: `limit=100`, increment `offset` until `offset >= total`
- 429: Read `Retry-After` header (default 60s), sleep, retry (max 10 per page)
- 5xx: Exponential backoff (1s, 2s, 4s... max 30s), retry up to 5 times
- Log rate-limit headers for monitoring

### Asset download
- Transient failures: bounded retries with backoff
- 404: mark failed in manifest, don't retry forever
- Manifest tracks status — re-runs only retry failed items

### Asset upload (R2)
- Skip already-uploaded objects (checksum match via manifest)
- Record per-object upload status
- Re-runs only upload missing/failed objects

### Transform
- Never silently succeed on lossy transforms
- Keep raw HTML blocks where conversion fails
- Write warnings to `transform-manifest.json`
- Include `sourceHtmlHash` per field for diffing

---

## 6) Validation Gates

1. **SEO baseline:** URL count matches sitemap (~2,300+), no widespread 4xx/5xx
2. **CMS export:** Item counts per collection reasonable vs inventory
3. **Static pages:** All published pages have snapshots
4. **Asset completeness:** Zero Webflow CDN URLs in rewritten MDX
5. **Traceability:** Every MDX has `webflow.collectionId` + `webflow.itemId`
6. **Re-run readiness:** Running twice doesn't duplicate work; manifests support resume

---

## 7) Decisions to Make During Phase 1

| Decision | Options | Status |
|---|---|---|
| **Staged edits to live items** | Capture only (diff.json) vs generate draft variant | **Decided:** Capture only; publish from live |
| **Static page transform scope** | Snapshot only vs auto-convert to MDX | **Decided:** Snapshot all; auto-convert only legal/copy pages; rebuild marketing pages in Phase 3 |
| **R2 key scheme** | Hash-based vs path-based | **Decided:** Hash of URL + original filename (stable across runs) |
| **Redirect source** | API export vs manual CSV | **Resolved:** CSV already exported (`design/zenml-website-2026-02-10.csv`, 45 rules) |
| **LLMOps body handling** | Full HTML→MDX conversion vs passthrough | **Decided:** Verify it's Markdown; if so, light cleanup only |
| **Image optimization** | Convert during upload vs upload 1:1 | **Decided:** Upload 1:1 now; WebP/AVIF conversion in post-launch phase |
| **SEO metadata source** | CMS fields vs crawl merge | **Decided:** Merge from SEO baseline crawl (CMS has no SEO fields) |

---

## 8) Execution Checklist

- [ ] Create run folder + `run.json`
- [ ] Run SEO baseline crawl → `seo/baseline.json|csv`
- [ ] Export Webflow CMS live + staged for all 17 collections + schema snapshot
- [ ] Build reference resolution map (item ID → slug lookup)
- [ ] Snapshot all published static pages as HTML
- [ ] Copy draft static pages from Webflow code export
- [ ] Build asset inventory from CMS + pages + code export
- [ ] Download assets (manifested, resumable)
- [ ] Upload assets to R2 (manifested) + generate `url-map.json`
- [ ] Transform CMS rich text HTML → MDX + rewrite URLs + include Webflow IDs
- [ ] Export/normalize Webflow redirects
- [ ] Catalog animations/interactions and custom scripts
- [ ] Produce Phase 1 summary: counts, failures, open issues

---

## 9) Hand-off to Later Phases

**Phase 2 (schemas)** consumes:
- `webflow/schemas/collections.schema.json` — drives Astro schema definitions
- Transformed MDX frontmatter shape (Webflow IDs + SEO fields)

**Phase 3 (templates/pages)** consumes:
- `pages/**/*.html` snapshots as pixel/parity reference
- `animations/catalog.json` for interaction reimplementation
- URL map for ensuring all images point to R2

**Phase 4 (SEO/redirects)** consumes:
- `seo/baseline.json` for automated parity testing
- `redirects/_redirects.webflow` (merged + finalized)
