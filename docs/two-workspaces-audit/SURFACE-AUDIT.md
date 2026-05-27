# Analytics Surface Audit — `merge/zenml-kitaru-unification`

**Audit date:** 2026-05-21  
**Branch:** `merge/zenml-kitaru-unification`  
**Related issue:** #63  
**Prerequisites for:** #2 (fix surface misattributions), #3 (product-separated navigation epic)

---

## How surface works (verified implementation state)

`surface` is a fully implemented prop in both root layouts:

| Layout | File | Default |
|--------|------|---------|
| `BaseLayout` | `src/layouts/BaseLayout.astro` | `"ml"` (via `DEFAULT_SURFACE`) |
| `MinimalLayout` | `src/layouts/MinimalLayout.astro` | `"ml"` (via `DEFAULT_SURFACE`) |

Both layouts stamp `<html data-surface={surface}>`. The value is also injected
into the Plausible script tag as `event-surface` so every pageview carries it
as a custom prop. `PlausibleBridge.astro` reads `document.documentElement.dataset.surface`
to attach the same prop to every custom click event.

**Intermediate layouts:** `BlogLayout` and `ContentLayout` both delegate to
`BaseLayout` without accepting or forwarding a `surface` prop — they are
permanently pinned to `"ml"` (default) unless the calling page template passes
surface through the spread `{...seoProps}`. Neither layout exposes surface,
so content pages (`/blog/[slug]`, `/imprint`, `/privacy-policy`, etc.) are
always `"ml"`.

**`compare/[slug]` dispatcher:** Routes Kitaru pages through `KitaruCompare`
(which sets `surface="agent"`) and ZenML-vs-* pages through `MlopsCompare`
(which omits surface → `"ml"` default). Both correct.

---

## Full page inventory

> **Column key**
> - **Type:** `template` = the `.astro` file directly controls surface; `content` = surface inherited from layout (cannot override without layout change)
> - **Current surface:** explicit value shown in code, or `ml (default)` when no `surface=` prop is passed
> - **Recommended:** correct surface per the taxonomy in `src/lib/analytics.ts`
> - **Misattributed?** `YES` when Current ≠ Recommended

### Top-level pages (`src/pages/*.astro`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/` | BaseLayout | template | `unified` (via `HOMEPAGE_UNIFIED_SEO.surface`) | `unified` | NO | Unified homepage — correct |
| `/pricing` | BaseLayout | template | `unified` | `unified` | NO | Explicitly set |
| `/pro` | BaseLayout | template | `unified` | `unified` | NO | Cross-product Pro page — explicitly set |
| `/get-started` | BaseLayout | template | `unified` | `unified` | NO | ML/Agent chooser — explicitly set |
| `/open-source-vs-pro` | BaseLayout | template | `ml (default)` | `unified` | **YES** | Compares OSS vs Pro for all users; cross-product |
| `/book-your-demo` | MinimalLayout | template | `ml (default)` | `unified` | **YES** | Demo booking shared across both products |
| `/book-a-demo` | BaseLayout | template | `ml (default)` | `unified` | **YES** | Redirect/alternate demo booking entry point |
| `/book-a-demo-success` | BaseLayout | template | `ml (default)` | `unified` | **YES** | Post-booking success — product-agnostic |
| `/book-success` | BaseLayout | template | `ml (default)` | `unified` | **YES** | Alternate success page — product-agnostic |
| `/booked` | BaseLayout | template | `ml (default)` | `unified` | **YES** | Cal.com redirect landing — product-agnostic |
| `/schedule-a-demo` | BaseLayout | template | `ml (default)` | `unified` | **YES** | Demo scheduling — product-agnostic |
| `/signup-for-demo` | BaseLayout | template | `ml (default)` | `unified` | **YES** | Demo sign-up — product-agnostic |
| `/success-calendar` | BaseLayout | template | `ml (default)` | `unified` | **YES** | Post-calendar success — product-agnostic |
| `/roi-calculator` | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML ROI calculator — ZenML-specific |
| `/newsletter-signup` | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML newsletter |
| `/newsletter-success` | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML newsletter success |
| `/deployments` | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML deployment options |
| `/careers` | BaseLayout | template | `ml (default)` | `unified` | **YES** | Company hiring — not product-specific |
| `/company` | BaseLayout | template | `ml (default)` | `unified` | **YES** | About/company page — not product-specific |
| `/imprint` | ContentLayout | content | `ml (default)` | `ml` | NO | Legal — no product association; `ml` acceptable |
| `/privacy-policy` | ContentLayout | content | `ml (default)` | `ml` | NO | Legal — no product association; `ml` acceptable |
| `/terms-of-service` | ContentLayout | content | `ml (default)` | `ml` | NO | Legal — no product association; `ml` acceptable |
| `/startups-and-academics` | BaseLayout | template | `ml (default)` | `unified` | **YES** | Program for all ZenML Pro users |
| `/brick-manual` | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML Brick installation reference |
| `/interactive-demo-mcp` | MinimalLayout | template | `ml (default)` | `ml` | NO | ZenML Cloud live demo embed |
| `/live-demo` | MinimalLayout | template | `ml (default)` | `ml` | NO | ZenML live demo embed |
| `/whitepaper-architecting-an-enterprise-grade-mlops-platform` | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML MLOps whitepaper |
| `/404` | BaseLayout | template | `ml (default)` | `ml` | NO | Error page — `ml` acceptable as site default |

### Product pages (`src/pages/product/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/product/zenml` | BaseLayout | template | `ml` | `ml` | NO | Explicitly set |
| `/product/kitaru` | BaseLayout | template | `agent` | `agent` | NO | Explicitly set |

### Get-started pages (`src/pages/get-started/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/get-started` | BaseLayout | template | `unified` | `unified` | NO | Chooser — explicitly set |
| `/get-started/zenml` | BaseLayout | template | `ml` | `ml` | NO | Explicitly set |

### Compare pages (`src/pages/compare/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/compare` (index) | BaseLayout | template | `unified` | `unified` | NO | Explicitly set |
| `/compare/zenml-vs-*` (MLOps entries) | MlopsCompare → BaseLayout | template | `ml (default)` | `ml` | NO | ZenML comparison pages |
| `/compare/kitaru-vs-*` (Agent entries) | KitaruCompare → BaseLayout | template | `agent` | `agent` | NO | KitaruCompare sets `surface="agent"` explicitly |

### VS category pages (`src/pages/vs/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/vs/[slug]` (3 pages) | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML category comparisons (orchestrators, etc.) |

### Blog pages (`src/pages/blog/`, `src/pages/category/`, `src/pages/tags/`, `src/pages/author/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/blog` (index) | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML blog hub |
| `/blog/page/[page]` | BaseLayout | template | `ml (default)` | `ml` | NO | Paginated blog listing |
| `/blog/[slug]` | BlogLayout → BaseLayout | content | `ml (default)` | `ml` | NO | BlogLayout hardwires `ml`; acceptable for ZenML-origin posts. Future Kitaru blog posts ported here will also be `ml` — that is a known gap tracked in `docs/kitaru-seo-inventory.md` |
| `/category/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | Blog category filter |
| `/tags/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | Blog tag filter |
| `/author/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | Author archive |

### Case-study pages (`src/pages/case-studies/`, `src/pages/case-study/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/case-studies` (index) | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML customer stories hub |
| `/case-study/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | Individual case studies — all ZenML customers |

### Features pages (`src/pages/features/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/features` (index) | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML features hub |
| `/features/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML feature detail pages |

### Cloud features (`src/pages/cloud-features/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/cloud-features/ml-models-control-plane` | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML Pro ML feature deep-dive |

### Integrations pages (`src/pages/integrations/`, `src/pages/integration-type/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/integrations` (index) | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML integrations hub |
| `/integrations/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML integration detail pages |
| `/integration-type/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML integration type filter |

### LLMOps database pages (`src/pages/llmops-database/`, `src/pages/llmops-tags/`, `src/pages/industry-tags/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/llmops-database` (index) | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML LLMOps research hub |
| `/llmops-database/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | Individual LLMOps entries |
| `/llmops-tags/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | LLMOps tag filter |
| `/llmops-tags` (index) | BaseLayout | template | `ml (default)` | `ml` | NO | LLMOps tag index |
| `/industry-tags/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | Industry tag filter |
| `/industry-tags` (index) | BaseLayout | template | `ml (default)` | `ml` | NO | Industry tag index |

### MLOps database pages (`src/pages/mlops-database/`, `src/pages/mlops-tags/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/mlops-database` (index) | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML MLOps research hub |
| `/mlops-database/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | Individual MLOps entries |
| `/mlops-tags/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | MLOps tag filter |
| `/mlops-tags` (index) | BaseLayout | template | `ml (default)` | `ml` | NO | MLOps tag index |

### Projects pages (`src/pages/projects/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/projects` (index) | BaseLayout | template | `ml (default)` | `ml` | NO | ZenML open-source project templates |
| `/projects/[slug]` | BaseLayout | template | `ml (default)` | `ml` | NO | Individual project detail |

### Team pages (`src/pages/team/`)

| Path | Layout | Type | Current surface | Recommended | Misattributed? | Notes |
|------|--------|------|-----------------|-------------|----------------|-------|
| `/team` (index) | BaseLayout | template | `ml (default)` | `unified` | **YES** | Company team page — not ZenML-product-specific |
| `/team/[slug]` | BaseLayout | template | `ml (default)` | `unified` | **YES** | Individual team member bio |

---

## Summary

### Page count by surface (current state)

| Surface | Count | Routes |
|---------|-------|--------|
| `ml` (explicit) | 2 | `/get-started/zenml`, `/product/zenml` |
| `ml` (default — no prop) | ~55 | All other pages without explicit `surface=` |
| `agent` (explicit) | 2+ | `/product/kitaru`, all `/compare/kitaru-vs-*` |
| `unified` (explicit) | 5 | `/`, `/pricing`, `/pro`, `/get-started`, `/compare` |

**Total template files enumerated:** 63 `.astro` files across `src/pages/**`

### Misattributed pages (current ≠ recommended)

**Total misattributions: 14 pages**

| Count | Recommended surface | Affected routes |
|-------|---------------------|-----------------|
| 9 | `unified` | `/open-source-vs-pro`, `/book-your-demo`, `/book-a-demo`, `/book-a-demo-success`, `/book-success`, `/booked`, `/schedule-a-demo`, `/signup-for-demo`, `/success-calendar` |
| 3 | `unified` | `/careers`, `/company`, `/startups-and-academics` |
| 2 | `unified` | `/team`, `/team/[slug]` |

All 14 misattributed pages are currently `ml (default)` but should be `unified`.
There are **zero** pages that should be `agent` but are currently `ml`.

### Patterns observed

1. **All demo/booking flows are `ml` but should be `unified`** — `/book-your-demo`, `/book-a-demo`, `/schedule-a-demo`, `/signup-for-demo`, `/booked`, `/book-success`, `/book-a-demo-success`, `/success-calendar` all serve visitors arriving from both products. These are the highest-traffic conversion pages and the most critical to fix.

2. **Company/brand pages are `ml` but should be `unified`** — `/company`, `/careers`, `/team`, `/team/[slug]`, `/startups-and-academics` represent the company or its programs, not a specific product. Misattributing these inflates ZenML-side traffic metrics.

3. **`/open-source-vs-pro` is `ml` but should be `unified`** — This page explicitly compares features across OSS and Pro tiers, relevant to users evaluating both products.

4. **Blog posts cannot be individually surfaced** — `BlogLayout` does not accept or forward a `surface` prop (it delegates to `BaseLayout` without it). All blog posts are permanently `ml`. Future Kitaru blog posts ported into `/blog/[slug]` will also silently tag as `ml`. Fix requires `BlogLayout` to accept and forward `surface`.

5. **`/compare/kitaru-vs-*` pages are correctly `agent`** — `KitaruCompare.astro` explicitly sets `surface="agent"`, so the dispatched agent comparison pages are properly tagged.

6. **All content database pages are correctly `ml`** — LLMOps, MLOps, integrations, features, case studies, and projects are all ZenML-side content and default correctly.

### Layout-level defaults (documented for issue #2)

| Layout | Accepts `surface` prop? | Forwards to BaseLayout? | Effective default |
|--------|------------------------|------------------------|-------------------|
| `BaseLayout` | YES | N/A (root) | `"ml"` |
| `MinimalLayout` | YES | N/A (root) | `"ml"` |
| `BlogLayout` | **NO** | **NO** | `"ml"` (hard-wired) |
| `ContentLayout` | **NO** | **NO** | `"ml"` (hard-wired) |

To fix blog post surfacing, `BlogLayout` needs a `surface?` prop and must pass
it through `<BaseLayout {...seoProps} surface={surface}>`.

---

*Generated by Claude Code — audit of `merge/zenml-kitaru-unification` branch.*
