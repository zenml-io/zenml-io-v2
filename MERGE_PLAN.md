# ZenML × Kitaru Website Merge Plan

> **Status:** Phases 1, 2a, 2b, 3 landed on branch `merge/zenml-kitaru-unification`. Phase 8 (analytics surface prop) is the next blocker for prod cutover — see "Known gaps" below.
> **Owner of prototyping:** Claude (in this repo)
> **Owner of production shipping:** Codex (will pick up from this doc)
> **Last updated:** 2026-05-17

---

## Progress Log

**Branching strategy:** all phases land on the single long-lived branch
`merge/zenml-kitaru-unification`. The full merge ships as one PR to `main`
at the end. Each phase = one or more commits on that branch.

| Phase | Status | Branch / PR | Notes |
|-------|--------|-------------|-------|
| **1. Nav + footer restructure** | ✅ Shipped (commits `020d2fd`, `b361f99`) | `merge/zenml-kitaru-unification` | Desktop + mobile verified via Playwright. |
| **2a. Brand tokens (unified)** | ✅ Shipped | `merge/zenml-kitaru-unification` | Site-wide brand swap + proper centralization. Purple → sage green. White → warm cream. Plus Jakarta Sans → Inter. Honest token naming (purple-* reverted to actual purple; brand uses zenml-* / semantic). `[data-app="zenml" \| "kitaru"]` switching on `<html>`. Brand assets recolored: Lottie hero animation, `tab_bg.avif`, `gradient_01.webp`, `grid_bg_02.webp`, `zenml_light_bg-02.avif`, `why-zenml.avif`. Hero copy + IntegrationsMarquee polish. |
| **2b. Port Kitaru landing → `/product/kitaru`** | ✅ Shipped (commits `a7e1665`, `1dfaf4f`, `378e0ce`, `150504c`) | `merge/zenml-kitaru-unification` | Hero, Features, PlatformBuilder, CodeShowcase, Architecture, Deploy, OneImport, Cta, SocialProof ported. `data-app="kitaru"` wrapper flips theme. Real Zuri logos wired. **Gates:** Phase 5 (blog post links), Phase 8 (analytics surface), `/api/{get-started,waitlist,newsletter}` endpoints not yet ported. |
| **3. Compare landing expansion** | ✅ Shipped (commits `d704f59`, `03a5825`, `6d829d9`, `910aab6`, `a4e652f`) | `merge/zenml-kitaru-unification` | Dual-collection `/compare` index with MLOps + Agents sections. 8 Kitaru competitor pages ported (`compare-kitaru` collection). scroll-reveal observer wired, Shiki theme issue fixed (CodePane uses `github-light`, CodeCompare uses local `kitaru-dark.json`). |
| 4. `/get-started` ML/Agent chooser | ⏳ Pending | — | Needs design input |
| **5. Kitaru blog migration** | ✅ Shipped (content); 🟡 cover images pending R2 migration | `merge/zenml-kitaru-unification` | All 11 Kitaru blog posts now on zenml.io (10 Kitaru-origin + `kitaru-launch.md` native). New `src/content/categories/kitaru.md` + `src/content/tags/kitaru.md`; all Kitaru-related posts re-tagged `category: "kitaru"` and `kitaru` prepended to tags array (previously all forced to `category: "zenml"` because `kitaru` didn't exist as a slug). `building-a-news-scout-on-kitaru` preserved as `draft: true`. **Cover images still hotlink to `assets.kitaru.ai`** — migrate to zenml R2 before Phase 10 cutover (see `docs/kitaru-seo-inventory.md` §3.5). |
| 6. Unified pricing | ⏳ Pending | — | — |
| 7. `/pro` unified pitch | ⏳ Pending | — | — |
| **8. Analytics surface prop** | ✅ Shipped | `merge/zenml-kitaru-unification` | `src/lib/analytics.ts` defines `Surface` + write-key map. BaseLayout/MinimalLayout accept `surface?` prop and stamp `<html data-surface>`. Plausible switched to `script.pageview-props.js` with `event-surface`. PlausibleBridge merges surface into custom events. Segment loader picks key by surface (Kitaru key for `agent`). Pages tagged: kitaru landing, kitaru compare pages = `agent`; compare landing, pricing, get-started = `unified`; everything else defaults to `ml`. |
| 9. Unified homepage + brand tokens | 🚧 Blocked | — | Waiting on Zuri's brand finalization |
| **10a. SEO inventory + redirect audit** | 🟡 Scaffolded (template in `docs/kitaru-seo-inventory.md`); crawl pending | `merge/zenml-kitaru-unification` | Doc structure + redirect-mapping template in place with placeholders for the actual Screaming Frog / Ahrefs / Plausible exports. Owner needs to fill §3.1–3.5 before activating Phase 10. |
| 10. kitaru.ai → 301 redirects | ⏳ Pending | — | Blocked on 10a + Phase 2b parity. |
| **11. Docs + skills refresh** | ⏳ Pending | — | **Last stage.** Update CLAUDE.md, AGENTS.md, and Claude Code skills to reflect post-merge reality. |

### Phase 1 — what landed
- **`src/lib/navigation.ts`** — completely restructured. New 6-item nav: Product ▾ / Docs ▾ / Compare / Pricing / Blog / Case Studies ▾.
  - Added `compact?: boolean` to `NavDropdown` interface for narrow anchored dropdowns.
  - All 3 dropdowns set to `compact: true` (small content footprint).
  - Removed: Solutions dropdown, Developers dropdown, and the dense 3-section Product dropdown.
  - Kitaru link → external `https://kitaru.ai` (flips to internal in Phase 2).
- **`src/lib/footer.ts`** — Product column expanded to surface dropped-from-nav pages: ZenML, Kitaru (external), ZenML Pro, Pricing, OSS vs Managed, Features, Deployments, Integrations. No URLs removed.
- **`src/components/Navigation.astro`** — added a `compact` rendering branch: narrow (320px) box anchored under the button, replacing the full-page panel layout for compact dropdowns. Non-compact (legacy) branch preserved.
- **`src/lib/homepage.ts`** — `ANNOUNCEMENT_BANNER` text changed from "Introducing Kitaru" + GitHub star CTA to "Build an agent factory with Kitaru — our durable runtime for production AI agents." + Read the docs link → `https://kitaru.ai/docs`.

### Phase 1 — verification
- `pnpm install` + `pnpm dev` ran clean (only pre-existing Cloudflare/Shiki warnings).
- Playwright screenshots confirmed: desktop nav (Product / Docs / Case Studies dropdowns render as compact 320px anchored boxes), mobile menu (accordion expands all 3 dropdowns with sub-items, direct links + CTAs below).
- No content collection schemas touched. No page URLs removed.

### Phase 2a — what landed (brand tokens)
- **`src/styles/global.css`** — full restructure:
  - Inter font imported from Google Fonts (replaces Plus Jakarta Sans)
  - New "BRAND TOKENS" section at top with `:root` (Kitaru defaults) and `[data-app="zenml"]` (sage green overrides)
  - `@theme inline` block exposes semantic shadcn tokens as Tailwind utilities (`bg-primary`, `bg-card`, `text-foreground`, `border-border`, etc.)
  - Legacy `--color-zenml-*` scale repurposed to new sage-green lightness ladder — 200+ existing `bg-zenml-500` / `text-zenml-500` usages auto-pick up the new color
  - Documentation block at top explains the theme-switch mechanism
- **`src/layouts/BaseLayout.astro`** — added `data-app="zenml"` to `<html>` (default theme for all pages)
- **`src/layouts/MinimalLayout.astro`** — same `data-app="zenml"` addition for consistency
- **`src/components/sections/AnnouncementBanner.astro`** — gradient `from-purple-700 to-purple-600` replaced with `bg-primary` so the banner tracks the active theme

### Phase 2a — verification
- Playwright before/after screenshots captured for: homepage, pricing, pro, blog, llmops-database, compare, case-studies. All 7 transitioned cleanly.
- Buttons, badges, active nav states all picked up new green.
- Body background switched to warm cream sitewide.

### Phase 2a — proper brand refactor (follow-up commit)
After initial alias-based swap, the system was reorganized for honest naming + central editability:

- `src/styles/global.css` restructured with a clearly-labeled "BRAND CONFIG" section at the top — colors, surfaces, fonts, all in one place. Documented vocabulary for component code. Easy single-file edits to rebrand.
- `--color-purple-*` reverted to **actual purple** (Untitled UI legacy, NOT brand). Comment makes intent explicit.
- `--color-zenml-*` scale defined in `:root` (single source) and exposed via `@theme inline` to Tailwind utilities.
- `--font-sans` / `--font-mono` now flow `:root → @theme inline → Tailwind`. Changing them once propagates everywhere.
- **Source-migrated** all `bg-purple-*` / `text-purple-*` / `from-purple-*` brand-accent usages → `bg-zenml-*` etc. (Badge, Button, FeatureCard, ComparisonTable, FeaturesCTA05, FeatureTestimonial, MLOpsFilter, LLMOpsFilter, ProTestimonialCarousel, llmops-database/index, mlops-database/index, company, projects/[slug]).
- **Eliminated hardcoded purple hex** values from source — every component now references `var(--color-zenml-*)` tokens.
- `ValueProps.astro` CTA gradient `from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA]` → CSS gradient using `var(--color-zenml-{600,500,400})`.
- `CompareStrategyCta.astro` `bg-[#F4EBFF]` → `bg-zenml-50`.
- `public/images/zenml_light_bg-02.avif` regenerated as a soft sage/cream blur (was purple/pink). Used by NewsSection, CustomerStories, IntegrationsMarquee, pricing page hero — auto-updates without source edits.

### Phase 2a — known punchlist (post-Phase 2 polish, not blocking)
- **ZenML logo + display font deferred to Zuri.** User tried a placeholder hex+serif logo and DM Serif Display font; rejected. Subsequent attempt to use DM Serif Display on the hero h1 alone was also reverted — user wanted *just* a copy refresh, not a font change. DM Serif Display *is* loaded in `global.css` and exposed via `--font-display` + Tailwind `font-display` utility, so future opt-in is one-class away. Logo asset still legacy purple `zenml-logo.svg` until Zuri delivers a green variant.
- **Reference images preserved at repo root:** `0017109a-4dd0-11f1-8e68-a22cd0578fcd.avif` (hero composition) and `72e9edec-4f13-11f1-bf6b-0242ac120003 (1).avif` (Option #02 brand exploration with palette stripes). Use as North Star when Zuri's files land. **Note:** these prototypes show a more *editorial* direction (cream + black + serif, sage as accent role) than what we shipped (sage green primary, sans typography). A full visual match to Zuri's prototypes requires more than token swaps — needs page-by-page redesign + final assets. Honest gap acknowledged.
- **R2-hosted blog hero images** likely still carry old purple brand in some posts. Need a per-post audit + design-side replacements. CSS won't fix raster content.
- **Webflow-migrated advantage illustrations** (e.g. `streamlined-ml-workflow-initialization`'s `img01.png`, similar) still old brand on R2. Each is a small raster panel — easy to swap once design provides updated versions.

### Phase 2a — extended polish log (follow-up commits on the branch)
Several follow-up commits chased remaining purple bleed-through after the initial brand swap:

- **`FinalCTA`, `WhitepaperCTA`, `VsCta02`, `projects/index`, `projects/[slug]`** — hardcoded `/images/gradient_01.webp` purple gradient backgrounds → CSS linear-gradients using zenml-* tokens (then `gradient_01.webp` itself was regenerated as sage so the references still work in any other consumer).
- **`Footer.astro`** — `[linear-gradient(171deg,#f6f2ff,#fff)]` → `var(--color-zenml-50)` + `var(--background)`.
- **`AnnouncementBanner.astro`** — `from-purple-700 to-purple-600` gradient → `bg-primary` (themed).
- **`global.css` BRAND CONFIG refactor** — reorganized into clearly-labeled top section. `--color-purple-*` reverted to real Untitled UI purple (was being aliased to green — dishonest naming). Brand expressed only through `--color-zenml-*` + semantic `--primary`/`--background`/etc.
- **Source migrations** — every component using `bg-purple-*` / `text-purple-*` / `from-purple-*` for brand-accent intent → `bg-zenml-*` etc. Files touched: Badge, Button, FeatureCard, ComparisonTable, FeaturesCTA05, FeatureTestimonial, ValueProps, CompareStrategyCta, MLOpsFilter, LLMOpsFilter, ProTestimonialCarousel, llmops-database/index, mlops-database/index, company, projects/[slug].
- **Hex sweep** — literal purple hex values in component CSS (`#7a3ef4`, `#53389e`, `#f6f2ff`, `#7C3AED`/`#8B5CF6`/`#A78BFA`, etc.) → `var(--color-zenml-*)` tokens. Dead `var(--color-X, #hex)` fallback hexes cleaned up.
- **Background assets regenerated** as sage/cream gaussian blurs (purple originals replaced in-place at same path, so all 5+ consumers update without source edits): `zenml_light_bg-02.avif`, `tab_bg.avif`, `gradient_01.webp`, `grid_bg_02.webp`.
- **`why-zenml.avif` / `why-zenml-mobile.avif`** — pulled the R2 architecture diagram, ran a targeted HSV hue shift on purple-range pixels only (preserving cloud-logo colors), saved local AVIFs, switched `homepage.ts` reference from R2 to local. The "Your VPC, your data" section now in green.
- **Hero copy unification** — headline "The AI Control Plane" → "The single layer for ML and AI." Subheadline rewritten to Focus Lab USP language: *"Orchestrate ML and Agent workloads on your infrastructure. Modular, flexible, and open-source — always."*
- **Lottie hero animation (`/lottie/hero-0925.json`)** — walked the JSON, found 115 color stops in the purple range (incl. animated keyframes + gradient stops). Differentiated shift: saturated purples → sage green (h=0.36, s×0.70); pale lavenders (s<0.12) → cream/sage to blend with body bg (h=0.27, low sat). Cloud logos, Git/Docker icons untouched. Last pass dropped sat cutoff to 0.008 to catch a stubborn 1.6%-sat lavender rectangle bg behind the pipeline cards.
- **`IntegrationsMarquee.astro`** — dropped the sage/cream bg image; section now plain cream. Fixes green-on-green banding above the WhitepaperCTA dark sage banner.

### Phase 1 — known cosmetic punchlist (not blocking)
- Kitaru nav icon is a placeholder (sun-radial glyph). User chose to leave it for now.
- Single-section Product dropdown lost the visual hierarchy of separating "Sub-products" vs. "Unified offering" (ZenML/Kitaru/Pro now in one flat list). If we want that split back, would need to either reintroduce 2-section non-compact, or add a divider mid-list.

### Phase 2b — what landed
- **`src/pages/product/kitaru.astro`** — new page composed from 9 ported sections: Hero, Features, PlatformBuilder, CodeShowcase, Architecture, Deploy, OneImport, Cta, SocialProof. Wrapped in `<div data-app="kitaru">` so Kitaru's warm-cream/orange tokens activate without bleeding into ZenML chrome (Nav, Footer render outside the wrapper).
- **`src/components/kitaru/*`** — direct ports from `kitaru/site/src/components/`. Card-glow hover, WebGL2 dot-grid hero animation (with mesh-gradient blob fallback), clipboard copy buttons.
- **`src/scripts/kitaru/*`** — supporting client scripts (canvas-utils, card-glow, clipboard, hero-gl, scroll-reveal).
- **`src/styles/kitaru-compat.css`** — Kitaru OKLch tokens scoped to `[data-app="kitaru"]`.
- **Footer Kitaru link flipped** — `src/lib/footer.ts:36` now points to `/product/kitaru` (was external `https://kitaru.ai`).
- **Phase 2b fixes** (4 follow-ups): scroll-reveal observer load on detail pages (`03a5825`), Shiki theme readability swap (`6d829d9`, `910aab6`), compare-kitaru code-pane polish (`a4e652f`).

### Phase 2b — known gaps (must clear before prod cutover)
- ~~**Plausible `surface` prop not wired anywhere**~~ — **DONE.** `<html>` now carries `data-surface={surface}`. BaseLayout / MinimalLayout accept a `surface?: 'ml' \| 'agent' \| 'unified'` prop (default `'ml'`) defined in `src/lib/analytics.ts`. Plausible script switched from `script.js` to `script.pageview-props.js` with `event-surface` attribute (D3). PlausibleBridge merges the surface into every custom event. Tagged: `/product/kitaru` + `/compare/kitaru-vs-*` = `agent`; `/compare` + `/pricing` + `/get-started` = `unified`; everything else defaults to `ml`.
- ~~**Segment write key hardcoded to ZenML**~~ — **DONE.** `src/lib/consentConfig.ts` Segment snippet now reads `document.documentElement.dataset.surface` and selects the Kitaru key (`MMarT0XoV4LJH8wR7wpmkTbF7txc9Bsg`) for `agent` pages, ZenML key for `ml`/`unified` (D4). Page-init call now passes `{surface}` as a property.
- ~~**`/api/{get-started,waitlist,newsletter}` endpoints not ported**~~ — **DONE.** All three routes ported as-is from `kitaru/site/src/pages/api/` to `src/pages/api/{get-started,waitlist,newsletter}.ts`, with supporting libs `src/lib/kitaru-segment.ts` and `src/lib/kitaru-form-types.ts`. Routes 500 cleanly in dev with `"KV not configured"`; validation paths (`400 Invalid email`, `400 Name is required`) work. **Operational follow-up (deployment-side, not code):** create `GET_STARTED_KV`, `WAITLIST_KV`, `NEWSLETTER_KV` namespaces in the zenml.io Cloudflare Pages project; bind them; set `SEGMENT_WRITE_KEY` env var (waitlist; others use hardcoded Kitaru key) and optionally `TURNSTILE_SECRET_KEY` + `PUBLIC_TURNSTILE_SITE_KEY` for the get-started bot-check.
- **`/product/kitaru` has no Kitaru-specific OG image** — falls back to `DEFAULT_OG_IMAGE` (generic ZenML asset). Social shares for Kitaru landing get ZenML-branded card.
- **PlatformBuilder why-card images hotlink to `assets.kitaru.ai`** (`PlatformBuilder.astro:94-107`). When Phase 10 sunsets kitaru.ai the images silently vanish (`onerror="this.style.display='none'"`, no fallback). Re-host to zenml.io's R2 before Phase 10 fires.
- ~~**SocialProof "From the blog" section gated off**~~ — **DONE.** Three referenced posts ported (`src/content/blog/{from-zenml-to-kitaru,why-agents-need-durable-execution,agents-need-more-than-traces}.md`); MDX→MD per CLAUDE.md, frontmatter remapped to ZenML's `blogSchema` (slug, author `hamza-tahir`, category `zenml`, tags `agents`+`infrastructure`+`open-source`, full `seo` block). `showBlogTeasers=true` in `SocialProof.astro`. Internal `/docs/...` links rewritten to `https://kitaru.ai/docs/...` (external until Phase 10).
- **Removed `/roadmap` CTA from Deploy.astro** — was a dead link (kitaru.ai source has no `/roadmap` either). If a roadmap page is desired, add as separate scope.

### Phase 3 — what landed
- **Dual-collection `/compare`** — `src/pages/compare/index.astro` renders MLOps (existing `compare` collection, sage-green section) above Agents (new `compare-kitaru` collection, warm-orange section).
- **`compare-kitaru` collection schema** — `src/content.config.ts:941-959`, `pattern: "**/*.{md,mdx}"`. Ports 8 Kitaru-vs-X pages (claude-agent-sdk, dbos, inngest, langgraph-deep-agents, openai-agents-sdk, pydantic-ai, restate, temporal).
- **Dispatching route** — `src/pages/compare/[slug].astro` routes both collections via the `[slug]` param. Today's filenames don't collide (`zenml-vs-*` vs `kitaru-vs-*`).
- **`src/components/compare/_layouts/KitaruCompare.astro`** — wraps each Kitaru-vs-X page in `<div data-app="kitaru">` so the warm tokens activate. Renders MDX body inside `<article class="compare-body-inner">`.
- **Kitaru compare components** — ComparisonHero (dropdown nav), ComparisonTable, CodeCompare, FeatureWithGraphic, WhenToUseEach, ComparisonCta, CodePane.

### Phase 3 — known gaps
- **`.mdx` chosen over `.md` against CLAUDE.md guidance** — the kitaru source used inline `import` statements that `.md` can't carry. Either document the exception in CLAUDE.md, or strip imports + convert. (Compare-kitaru schema's `pattern: "**/*.{md,mdx}"` is the current opt-in.)
- **`compare-kitaru` schema has no explicit `slug` field** — routing works today because filenames are unique across the two collections, but a single naming collision would silently shadow. Adding `slug: z.string()` and keying the route on it is a small hardening pass.
- **3 of 8 entries missing `ogImage`** — claude-agent-sdk, pydantic-ai, openai-agents-sdk fall back to default.
- **`/compare/index` and `/compare/kitaru-vs-*` need analytics `surface=unified` and `surface=agent` respectively** — same Phase 8 dependency.

---

## 0. Context (the why)

ZenML and Kitaru are being reunified into a single product story. Kitaru
(durable agent runtime) and ZenML (ML orchestration) are now framed as two
*sub-products* under one paid umbrella, **ZenML Pro**.

This repo (zenml-io-v2, Astro) will become the central marketing site.
kitaru.ai (separate Astro site at `/home/htahir1/workspace/zenml_io/kitaru`)
will be folded in, then 301-redirected once parity is reached. A separate
design prototype repo (`kitaru-test-prototypes`) has unified brand tokens that
will land later once stabilized.

**Inspiration for IA:** [astral.sh](https://astral.sh/) — Tools / Docs / Blog /
Company. Lean, scannable, product-first.

---

## 1. Decisions Log (canonical)

These are settled. Any change requires explicit re-decision.

| ID | Decision | Rationale |
|----|----------|-----------|
| **D1** | One paid product = **ZenML Pro**. Two sub-products under it: **ZenML** (ML workspace) and **Kitaru** (Agent workspace). | Resolves the "two products vs. one workspace" tension. Marketing surfaces both names; commercial pitch is unified under Pro. |
| **D2** | kitaru.ai → 301 to `zenml.io/product/kitaru` *once parity reached*. Until then, nav points to external kitaru.ai. | Consolidates SEO link equity to a single domain over time, without rushing it. |
| **D3** | **Plausible:** single `zenml.io` domain. Add custom prop `surface: ml \| agent \| unified` on every event/pageview. | One dashboard, but filterable by sub-product surface. |
| **D4** | **Segment:** keep two write keys. ZenML-surface pages use ZenML key (`Q9Gsmet5Uo67D8HIEk4pj5vUOalWu4iT`); Kitaru-surface pages use Kitaru key (see `kitaru/site/src/lib/segment.ts`). | Downstream warehouse already keyed on these. No need to unify. |
| **D5** | Form endpoints from kitaru (`/api/get-started`, `/api/waitlist`, `/api/newsletter`) port **as-is**. Cloudflare → Segment → Discord wiring stays intact. | These are operationally wired; do not unify into zenml's `/api/forms/[formType].ts`. |
| **D6** | `/get-started` (8.6k visitors/mo) becomes an **ML/Agent chooser** fork. | Conversion path needs to branch post-merge. URL stays the same. |
| **D7** | Workspace differences (today): different UI, different SDK, different integrations. **Same pricing for now.** | Pricing may diverge in future but unified $ today. |
| **D8** | Current `Solutions` nav section → drop to footer (effectively `/legacy`). | Underdeveloped, low traffic. |
| **D9** | LLMOps Database stays surfaced in nav (9.2k visitors/mo). Lives under **Case Studies ▾** alongside Customer Stories. | 13× the traffic of `/case-studies`. Too critical to bury. |
| **D10** | `/pro` becomes the **unified Pro pitch**: managed control plane over both workspaces + enterprise features (SSO, RBAC, SLA, support). Page split into "managed plane" and "enterprise" sections. | Strongest commercial framing. Clear sub-sections prevent buyer confusion. |
| **D11** | `/open-source-vs-pro`, `/features`, `/features/*`, `/deployments` → drop from nav, keep alive at current URLs, surface in **footer**. | Real organic traffic (~2k+/mo combined). Don't break SEO. |
| **D12** | `/compare` landing page expanded to do heavy lifting. Port Kitaru's competitor pages into the same `/compare/*` collection. Group by ML vs Agent on landing. | Compare is now top-nav; it must work harder. |
| **D13** | **Top nav (6 items):** `Product ▾  Docs ▾  Compare  Pricing  Blog  Case Studies ▾` | Astral-like leanness, all critical pages surfaced. |
| **D14** | Pages NOT moved to `/legacy` — existing URLs stay live. "Legacy" = removed-from-nav, not removed-from-site. | Preserves SEO and inbound links. |
| **D15** | Unified brand applied **site-wide in Phase 2**, not deferred to Phase 9. Tokens from `kitaru-test-prototypes` (Zuri) land in `src/styles/global.css`. ZenML brand shifts purple → sage green. Body background → warm cream. Font Plus Jakarta Sans → Inter. Theme switching via `[data-app="zenml" \| "kitaru"]` on `<html>`. Legacy `--color-zenml-*` tokens **aliased** to new primary so existing utility classes (200+ uses) keep working. | Avoids double-porting Kitaru's old brand then redoing it. Single source of truth for future tweaks. |
| **D16** | **Phase 10 cannot fire until Phase 10a (SEO inventory + redirect audit) is complete and reviewed.** | Webflow-migration lesson: the per-URL inventory at the start of that cutover was what prevented dropped pages and broken backlinks. Repeat the pattern for kitaru.ai → zenml.io. `docs/MIGRATION.md` is the precedent format. |

---

## 2. Top Nav Specification

```
Product ▾    Docs ▾    Compare    Pricing    Blog    Case Studies ▾
```

### Product ▾
- **ZenML** → `/` (the current homepage, until Phase 9 when it moves to `/product/zenml`)
- **Kitaru** → external `https://kitaru.ai` (Phase 1) → `/product/kitaru` (Phase 2)
- **ZenML Pro** → `/pro`

### Docs ▾
- **ZenML docs** → external `https://docs.zenml.io`
- **Kitaru docs** → external `https://kitaru.ai/docs`

### Compare → `/compare`
Expanded landing page with both ML and Agent competitor matrices.

### Pricing → `/pricing`
Unified pricing (Phase 6). Same $ for both workspaces.

### Blog → `/blog`

### Case Studies ▾
- **Customer stories** → `/case-studies`
- **LLMOps Database** → `/llmops-database`

### CTAs (unchanged)
- Get Started → `/get-started` (becomes ML/Agent chooser in Phase 4)
- Start Free Trial / Book Demo → unchanged

---

## 3. Footer Specification

**Surface from footer (dropped from nav but preserved):**
- Features index + the 4 high-traffic feature pages
- Open Source vs Pro
- Deployments
- Solutions (GenAI/LLMs, MLOps Platform, etc.)
- Integrations
- Roadmap, Changelog, Community/Slack
- Standard legal (Imprint, Privacy, Terms)

Existing `src/lib/footer.ts` structure is broadly fine — add nothing, just
ensure these orphaned pages are linked.

---

## 4. Phased Sequencing

Each phase is **independently shippable** — no half-merged states in
production. Phases 1–8 do not require Zuri's final brand.

| Phase | Scope | Estimate | Blocks on |
|-------|-------|----------|-----------|
| **1. Nav + footer restructure** | Update `src/lib/navigation.ts` + `src/lib/footer.ts`. No page moves, no redirects. Kitaru external. | ~half day | — |
| **2. Port Kitaru landing** → `/product/kitaru` | Port Hero / Features / PlatformBuilder / CodeShowcase from `kitaru/site`. Self-contained warm/orange brand. Port form endpoints as-is. Flip Kitaru nav link from external to internal. | ~1 day | Phase 1 |
| **3. Compare landing expansion** | Expand `/compare` index; port `kitaru/site/src/pages/compare/*` into this repo's compare collection. | ~half day | Phase 1 |
| **4. /get-started ML/Agent chooser** | Redesign 8.6k-visitor page into a workspace fork. Needs design input. | ~half day + design | Phase 2 |
| **5. Kitaru blog migration** | Port 10 MDX posts → this repo's blog collection. Convert MDX→MD per CLAUDE.md. | ~2h | Phase 1 |
| **6. Unified pricing** | Merge kitaru pricing into `/pricing`. Same $; surface workspace differences subtly. URL stable. | ~half day | Phase 2 |
| **7. /pro unified pitch** | Rewrite `/pro` as managed-plane + enterprise pitch. Sub-sections. | ~half day | Phase 2 |
| **8. Analytics surface prop** | Plausible custom prop `surface: ml \| agent \| unified` wired in BaseLayout. Segment write-key selection switches on surface (D4). **Promoted to a blocker for Phase 2b prod cutover** — without it, Kitaru traffic silently merges into ZenML analytics. | ~half day | Phase 2 |
| **9. Unified homepage rewrite** | Rewrite `/` with Focus Lab messaging on the unified brand (brand tokens already landed in Phase 2). Move current homepage to `/product/zenml`. | ~1 day | Phase 8 |
| **10a. SEO inventory + redirect audit** | Crawl kitaru.ai → snapshot every URL with traffic + backlinks. Map each to a zenml.io target. Stage redirect rules in `public/_redirects` and/or Cloudflare. Snapshot Kitaru's current OG/canonical tags for social audit before flip. Output: `docs/kitaru-seo-inventory.md` checked into the branch. | ~half day | Phase 2 parity confirmed (D16) |
| **10. kitaru.ai → 301 redirects** | DNS/Cloudflare-level 301s from kitaru.ai → zenml.io/product/kitaru. | ~hours | **Phase 10a complete** (D16), Phase 2 parity |
| **11. Docs + skills refresh** | **Final stage.** Update `CLAUDE.md` (Product Overview, content collections, key files, legacy terminology), `AGENTS.md` (if it diverges from CLAUDE.md). Audit `.claude/skills/blog-post-contributor` and `.claude/skills/r2-image-upload` for Kitaru-aware behavior (e.g. blog post `surface: kitaru` tag, Kitaru R2 prefixes if any). | ~half day | All prior phases shipped |

---

## 5. URL & Redirect Map

### No redirects needed (Phases 1–8)
All existing zenml.io URLs preserved. Pages dropped-from-nav stay at current URLs.

### New URLs introduced
| URL | Phase | Source |
|-----|-------|--------|
| `/product/kitaru` | 2 | Ported from kitaru.ai homepage |
| `/product/zenml` | 9 | Current `/` content relocated |
| `/api/get-started` | 2 | Ported from kitaru as-is |
| `/api/waitlist` | 2 | Ported from kitaru as-is |
| `/api/newsletter` | 2 | Ported from kitaru as-is |

### Redirects scheduled
| From | To | Phase |
|------|----|----|
| `kitaru.ai/*` | `zenml.io/product/kitaru` (root) + `zenml.io/blog/*` (blog) + `zenml.io/compare/*` (compares) | 10 |
| `/` | (kept; becomes unified homepage in Phase 9 with current content at `/product/zenml`) | 9 |

---

## 6. Analytics Plan

### Existing zenml.io stack (preserved)
- **Plausible** — cookieless, `data-domain="zenml.io"`, hostname-gated, always-on
- **Scarf pixel** — cookieless company-level, hostname-gated
- **RB2B** — B2B visitor ID, hostname-gated
- **Consent-gated:** GA4 (`G-T3T6F795FY`), Segment (`Q9Gsmet5Uo67D8HIEk4pj5vUOalWu4iT`), Hotjar
- **Marketing (consent-gated):** HubSpot, Reo, Ortto, Apollo
- See `src/lib/consentConfig.ts` and `src/layouts/BaseLayout.astro`

### Kitaru stack (incoming)
- **Segment** — separate write key, `kitaru/site/src/lib/segment.ts`
- Form endpoints: `/api/get-started`, `/api/waitlist`, `/api/newsletter` → Segment → Discord (via Cloudflare)

### Merge rules
1. **Plausible: ONE domain (`zenml.io`).** All pages tracked here. Add custom prop `surface: ml | agent | unified` on every pageview.
   - ZenML-surface pages → `surface=ml` (homepage, /pro until Phase 9, /features/*, integrations, MLOps content)
   - Kitaru-surface pages → `surface=agent` (`/product/kitaru`, ported kitaru blog posts, kitaru compare pages)
   - Cross-product pages → `surface=unified` (`/pricing`, `/compare` index, `/get-started`, `/pro` post-Phase 7, future unified `/`)
2. **Segment: TWO write keys retained.** Page-level decision in layout/component:
   - Pages tagged as kitaru-surface initialize Segment with Kitaru key
   - All other pages initialize with ZenML key
3. **Form endpoints from kitaru port unchanged.** Don't touch the Cloudflare → Segment → Discord pipeline.
4. **Cookie consent categories unchanged** — Kitaru pages inherit zenml.io's consent banner.

---

## 7. Brand & Visual Strategy

### Today (Phases 1–8)
- ZenML pages keep current ZenML brand (greens/grays).
- Ported Kitaru pages keep Kitaru warm/orange brand, **self-contained** via scoped CSS so they don't bleed into ZenML pages.
- No global token changes.

### Future (Phase 9, blocked on Zuri)
- Port OKLch palettes from `kitaru-test-prototypes`:
  - `/src/styles/globals.css` (Kitaru tokens — warm/orange)
  - `/src/styles/zenml-palettes.css` (ZenML tokens — brown/green)
- Adopt the `data-app="zenml|kitaru"` attribute pattern on `<html>` for theme switching.
- Component library port is **not required** for Phase 9 — only tokens. Components stay Astro-native.

**Why deferred:** Zuri may iterate the tokens. Locking them in now risks rework.

---

## 8. Messaging Strategy (Focus Lab Output)

These are **foundational, not external copy**. Use as inspiration for headlines/body.

### Unique Selling Proposition (USP)
> The single layer ML/AI orchestration platform built for engineers and researchers. Ready for enterprise. Modular, flexible, and open source, always.

### Value Proposition
> Own your infrastructure, build it the way you want, and keep pace as your organization evolves.

### Elevator Pitch
> ZenML is the open source modular infrastructure layer for enterprise teams building production-grade ML/AI systems. Orchestrate workflows across your existing tools, clouds, and environments without being forced into a proprietary ecosystem. Experiment freely, iterate quickly, and evolve your stack continuously so your infrastructure keeps pace with the changing AI landscape and your organization's ambitions.

### Application notes
- "Single layer" is the load-bearing differentiator vs. competitors (Outerbounds, Prefect, ClearML).
- "Open source, always" → manifesto-like, fits an About page.
- "Own your infrastructure" → speaks to both buyers (no vendor lock-in) and developers (control).
- Focus Lab is delivering 2 more rounds; expect refinements.

---

## 9. Traffic & Stakes Reference

Top non-blog, non-llmops pages by visitors (informs what NOT to break):

| Page | Visitors/mo | Notes |
|------|-------------|-------|
| `/` | 42.1k | Crown jewel. Untouched until Phase 9. |
| `/llmops-database` | 9.2k | Surfaced in Case Studies ▾. SEO core. |
| `/get-started` | 8.6k | Becomes chooser (Phase 4). URL preserved. |
| `/pricing` | 8.1k | Unified in Phase 6. URL preserved. |
| `/careers` | 2.4k | Not in nav reorg. |
| `/pro` | 1.5k | Rewritten Phase 7. URL preserved. |
| `/book-your-demo` | 1.4k | Untouched. |
| `/integrations` | 1.2k | Footer. URL preserved. |
| `/open-source-vs-pro` | 1.2k | Footer. URL preserved. |
| `/compare` | 893 | Promoted to top nav. Expanded Phase 3. |
| `/features/iterate-at-warp-speed` | 786 | Footer. URL preserved. |
| `/compare/zenml-vs-mlflow` | 736 | Top SEO play. Preserve. |
| `/case-studies` | 686 | Surfaced in Case Studies ▾. URL preserved. |
| `/features/auto-track-everything` | 544 | Footer. URL preserved. |

**Rule:** any page with >100 visitors/mo keeps its URL alive. Nav changes are about *discoverability for new visitors*, not pruning.

---

## 10. Open Questions / TODO before Codex handoff

- [ ] Confirm Phase 4 design direction for `/get-started` chooser (needs Zuri or design pass).
- [ ] Confirm Kitaru's Segment write key value (read from `kitaru/site/src/lib/segment.ts` during Phase 2).
- [ ] Decide whether RB2B and Hotjar should also tag `surface` (likely yes if their dashboards allow).
- [ ] Phase 9 trigger: when does Zuri sign off on brand tokens?
- [ ] Phase 10 trigger: define "parity" for kitaru.ai vs. /product/kitaru — does this include docs, blog, compares, pricing?
- [ ] Compliance: does Kitaru's existing privacy policy need to merge into zenml.io's `/privacy-policy`?
- [ ] If Kitaru has community Slack / Discord / GitHub orgs separate from ZenML's, decide on footer link strategy.
- [ ] Does `/pro` Phase 7 rewrite preserve the existing testimonial carousel (ProTestimonialCarousel island)?
- [ ] Newsletter: kitaru.ai and zenml.io both have signup forms — unify into one list or keep two?
- [ ] Tag system for blog posts: do Kitaru-origin posts get a visible "Kitaru" tag, or just an internal `surface` analytics prop?

---

## 11. Repo Pointers (for Codex)

| What | Where |
|------|-------|
| This repo (target) | `/home/htahir1/workspace/zenml_io/zenml-io-v2` |
| Kitaru source site | `/home/htahir1/workspace/zenml_io/kitaru` (Astro at `/site`, Next.js docs at `/docs`) |
| Brand prototype | `/home/htahir1/workspace/zenml_io/kitaru-test-prototypes` (React/Vite, OKLch tokens in `src/styles/globals.css` + `src/styles/zenml-palettes.css`) |
| Nav definition | `src/lib/navigation.ts` |
| Footer definition | `src/lib/footer.ts` |
| Analytics config | `src/lib/consentConfig.ts` + `src/layouts/BaseLayout.astro` |
| Content schemas | `src/content.config.ts` (20 collections, Zod) |
| Constants | `src/lib/constants.ts` (`SITE_URL`, `ASSET_BASE_URL`) |
| Pricing data | `src/lib/pricing.ts` |
| Homepage data | `src/lib/homepage.ts` |
| Kitaru segment lib | `kitaru/site/src/lib/segment.ts` |
| Kitaru form APIs | `kitaru/site/src/pages/api/{get-started,waitlist,newsletter}.ts` |

---

## Appendix A: Focus Lab Brand Strategy Transcript (Round 1)

> **Note:** This is the raw verbal-identity round-1 deliverable from Focus Lab.
> Two more rounds pending. Use as **inspiration**, not as external copy.

00:00 Hey team, I hope you're doing well. I have this video to present our first round of situational messages. So, what to expect in this deliverable.
00:12 We have a unique selling proposition as well as a value proposition. You'll also see an elevator pitch in this presentation.
00:21 So, a few good things to review this week. Uh, but, I will say that, uh, just to set expectations, these will be very short, concise statements.
00:31 Um, how we approach these at Focus Lab, I don't want to give the impression that these are meant to be strictly used externally.
00:42 I always caution the brands that I work with that these statements aren't meant ones that you would necessarily want to or be able to copy and paste directly, for instance, onto your homepage.
00:56 They're meant more to be foundational and inspirational in creating messages.
01:12 We have two more rounds of this deliverable.
01:47 The unique selling proposition is a statement that really explains what you do differently than your competitors.
02:17 The value proposition explains why that difference matters to customers. It starts to speak to outcomes.
02:48 Especially relevant as we've started thinking about how to approach speaking to both your technical audiences (developers) as well as your less technical buyer audiences.
03:30 Took another quick look at competitors. Outerbounds was recently acquired by Anaconda. They're now referencing explicitly speed — "The fastest way to build and deploy production-grade AI."
04:18 They reference Metaflow, which their system is built on top of Weights & Biases. They're speaking to ease of use, compliance-ready, allowing developers to experiment and scale.
04:42 Prefect leans into social proofing — big customers, large developer audience. Also open source.
05:03 ClearML speaks mostly about being all one platform, easy to use, social proof.
05:16 These tell us things — not to avoid, but to make sure we move in a way that sounds different from these all.
09:08 **USP draft:** "We're the single layer ML/AI orchestration platform built for engineers and researchers. Ready for enterprise, modular, flexible, and open source, always."
09:21 **Value prop draft:** "Own your infrastructure, build it the way you want and keep pace as your organization evolves."
10:24 Question: ML slash AI. Do we want to focus solely on AI? ML? Is it okay to use both?
11:03 "Built for engineers, ready for enterprise" — bridge between developer and buyer audiences.
12:48 "Open source, always" — almost acts like a promise. Could become a manifesto for the About page.
13:55 "Own your infrastructure" — benefit to both developers (control) and buyers (avoid vendor lock-in).
14:23 "Build it the way you want" — bring your own tools, experiment, iterate.
14:35 "Keep pace as your organization evolves" — speaks to speed without saying speed explicitly. C-suite/buyer resonance.
17:15 **Elevator pitch draft:** "ZenML is the open source modular infrastructure layer for enterprise teams building production-grade ML/AI systems. Orchestrate workflows across your existing tools, clouds, and environments without being forced into a proprietary ecosystem. Experiment freely, iterate quickly, and evolve your stack continuously so your infrastructure keeps pace with the changing AI landscape and your organization's ambitions."
19:22 "Without being forced into a proprietary ecosystem" — resonates with both developers and non-developers.
19:53 "Experiment freely, iterate quickly, evolve your stack continuously" — 1-2-3 rhythm. Speaks to speed and ease of use without clichés.

---

## Appendix B: Astral.sh IA Inspiration

Astral's nav: **Tools / Docs / Blog / Company**. Four items, scannable.
Our adaptation (6 items because we have to surface Compare and Pricing for SEO/conversion):
**Product ▾ / Docs ▾ / Compare / Pricing / Blog / Case Studies ▾**

---

## Appendix C: Original Brainstorm Notes (preserved for context)

> Original loose notes from product brainstorm — superseded by Section 1 Decisions Log.

For unification, inspired in structure by https://astral.sh — Tools, Docs, Blog, Company. We can have similar look: "Product" with kitaru and zenml landing pages, "Docs" pointing to kitaru.ai/docs and docs.zenml.io. Get rid of product, solutions, developers on the current website. Keep Compare, Pricing, Blog, Case Studies. So overall: Product, Docs, Pricing, Compare, Blog, Case Studies.

For now what is the main zenml page can be moved perhaps to a zenml.io/product/zenml page — not quite sure yet of this point, especially as we might want to retain some of it for the real unified landing page (things like social proof).

For pricing, we'd want to sort of unify it. We are selling one product and the only difference is that you can have a zenml machine learning workspace and a kitaru agent orchestration workspace that behave differently. Somehow we need to explain subtly these product differences.

CTAs of website can remain the same.

As part of branding, designer Zuri has been playing around with a unified brand in `/home/htahir1/workspace/zenml_io/kitaru-test-prototypes` — storybook-type component library with the latest unified brand for dark and light mode of zenml and kitaru. Would be nice to reuse.
