# Key files

Per-file map of the site's core architecture, homepage, islands, API routes,
Kitaru components, layouts, and the compare-page OG card generator. Shared
policy lives in `CLAUDE.md` / `AGENTS.md`; the system primitives and template
families are in [site-architecture.md](site-architecture.md); the 2026 rebrand
cutovers are in [labs-shell.md](labs-shell.md).

### Core Architecture

Read [the detailed architecture map](site-architecture.md)
for system primitives and template families. Contracts: use SpaceStep tokens
(including mlg), absence instead of show* booleans, and paired Astro/TSX twins
for island consumers. New code must not use ad-hoc classOverrides; use named
family presets. Template alternatives require discriminated unions or ?: never,
never optional-prop bags hidden by as casts. Register new templates.

- `astro.config.ts` — Astro config (static output, Cloudflare, Preact, sitemap, Shiki)
- `src/content.config.ts` — Content collection schemas (Zod). Reads `categories/`, `tags/`, etc. at config eval time to build slug-reference validation sets — adding a new category/tag file requires a dev-server restart.
- `src/styles/global.css` — Tailwind v4 `@theme` block + design tokens; `:root` defaults are Kitaru, `[data-app="labs"]` holds the site's type roles + palette + type-scale ladder (the root default; #246). Also home of the `[data-tone]` section-tone layer (#248): tone blocks route only `var()`s the brand scopes own — never a hex — and there is deliberately no `section[data-tone]` base rule (the background shorthand would reset bg-image utilities); tone consumers set explicit `bg-[var(--section-surface)]`-style utilities
- `src/pages/styleguide.astro` — generated design-system reference (public-but-unlisted, noindex, no nav/sitemap links); renders tokens/type/scale/registry/rules derived at build time — never hand-write design values into it
- `src/lib/styleguide.ts` — styleguide derivation layer: parses `global.css` tokens, computes WCAG contrast for declared pairs (`DECLARED_PAIRS`/`CHROME_PAIRS`)
- `src/lib/designRules.ts` — parses DESIGN.md rule sections for the styleguide's Rules section
- `src/components/styleguide/TemplateStage.astro` — live render stage for built registry entries on /styleguide that don't opt out via `stage: false` (the eight `comparison.*` entries opt out — they render through the shared comparison dispatcher, not as standalone templates, and are catalogued without a live stage); renders each staged entry with its registry `demoProps` (spread) and `demoSlots` (static demo HTML for slot-composed primitives); the glob covers `src/components/templates/**` and `src/components/system/**`
- `src/styles/kitaru-compat.css` — Kitaru OKLch tokens scoped to `[data-app="kitaru"]`; its §6 bridge re-points every one of them at the rebrand tokens when the wrapper sits inside `[data-app="labs"]` (surfaces from the labs semantic set, ember → orange-600, night → cream-900, Borna/Rethink/Nudica type roles), which is how `/product/kitaru` renders in the Labs shell without a class rename
- `src/lib/constants.ts` — `SITE_URL` and shared constants
- `src/lib/seo.ts` — SEO contract (`SEOProps`, `resolveSeo()`, `buildCanonical()`)
- `src/lib/analytics.ts` — Surface taxonomy type (`Surface`); the Segment loader lives in `src/lib/consentConfig.ts`
- `src/lib/projectBody.ts` — the `/projects/<slug>` details-column converter. Deliberately minimal (headings and paragraphs; blocks already starting with `<` pass through untouched) because it reproduces what those pages have always rendered. It has no list handling, so one project publishes a paragraph of literal `-` lines — a real defect, kept because fixing it is a content change rather than a parity one. Two project detail pages are pinned as rendered-content goldens, so a "fix" here fails `pnpm smoke:dist`. The structured parts of a project (`pipelines`, `stackHtml`) live in frontmatter, not the body; `scripts/migrations/` holds the one-off script that put them there
- `src/components/compare/_layouts/ComparisonPage.astro` — one blocks-driven template for all 28 ZenML comparison routes (25 `/compare/zenml-vs-*` + 3 `/vs/*`). Each entry carries an ordered `blocks[]` and a `hero`; the template renders what the content says through the Labs comparison primitives. Both families open on `LabsComparisonBand`, share the complete 38-option ZenML switcher, reveal every content section and close on `LabsCloseCta`. The 10 ZenML MDX and 11 Kitaru MDX pages use the same Labs primitives through thin collection-specific wrappers. Rendered goldens plus the 49-route text, href and analytics audit are the regression net
- `src/lib/compareDefaults.ts` — no page reads its copy any more; the conversion resolved every per-category fallback into the entries themselves. It survives for `ZENML_ICON_URL` and for the migration scripts' `getCategoryDefaults`. To change what a compare page says, edit that page's `blocks[]`
- `scripts/migrations/compare-blocks/` — historical one-off tools that moved those pages onto blocks: `audit.ts` + `AUDIT.md`, `convert.ts`, `finalize.ts`, and `parity.ts` (the retired #250 byte-compare instrument, not a current check)
- `src/lib/llmops.ts` — LLMOps domain layer (`getAllPublishedEntries()`, tag/industry counts). Related-entry scoring is shared: `src/lib/relatedIndex.ts` holds `TaxonomyCount` and the generic `buildRelatedIndex`/`getRelatedFromIndex` scorer that `llmops.ts`/`mlops.ts` wrap; blog keeps its own `getRelatedPosts` (`src/lib/blog.ts`); `relatedIndex.ts` also holds the `filterUsedTerms` zero-entry hub filter, and `src/lib/chipStyles.ts` the shared chip color variants Badge/RelatedRail consume
- `src/lib/footer.ts` — Footer data (typed, not hardcoded)

### Homepage
- `src/pages/index.astro` — Homepage composition (imports its sections from `src/components/sections/`)
- `src/lib/homepage.ts` — All homepage marketing copy, stats, URLs, FAQ
- `src/components/sections/` — homepage and shared section components

### Preact Islands (interactive client-side components)
- `src/components/islands/filter-index/` — one filterable-index family: `LlmopsIndex.tsx` (LLMOps database), `MlopsIndex.tsx` (MLOps database), `IntegrationsIndex.tsx`, `BlogIndex.tsx`, built on `DataFilterIndex`/`ControlFilterIndex` with `FacetRail`, `Pagination`, `ResultsCount`
- `src/components/islands/ContactForm.tsx` — Form submission → Astro API routes
- `src/components/islands/DemoRequestForm.tsx` — Demo request form used by `/book-your-demo`
- `src/components/islands/CookieConsent.tsx` — Cookie consent banner (4 categories), on Labs tokens (`[data-app="labs"]` scoped override, sage/cream only); shares its pill button classes with `LabsButton` via `src/components/labs/labsButtonStyles.ts`
- `src/components/islands/FeatureTabsSlider.tsx` — Auto-cycling feature tabs on `/product/zenml` (formerly on the homepage). Two pane modes: with no children it renders `<img>` panes from `tabs[].image`; when the host passes server-rendered panes as children (one `[data-figure-index]` per tab) it only toggles the current one (`w--tab-active` + `data-highlight-active`), which is how `LabsFeatureTabs` shows the inline SVG highlight figures
- `src/components/islands/RoiCalculator.tsx` — ROI calculator interactive form

### Server-side API Routes (`prerender: false`)
- `src/pages/api/forms/[formType].ts` — Unified form submission handler → Segment HTTP API (identify + track), using the site's Segment workspace
- `src/pages/api/csp-report.ts` — CSP violation report sink (logs redacted summary, returns 204)
- `src/pages/api/github-stars.ts` — GitHub star count fetcher with edge cache (`context.locals.cfContext.waitUntil`)

### Kitaru content & components
- `src/pages/product/kitaru.astro` — Kitaru landing (Aug 2026 redesign; copy lives in `src/lib/kitaru-landing.ts`, CTA links in `src/lib/productKitaru.ts`), rendered in the Labs shell (`app="labs" product="kitaru"`, orange-600 signup pill, `KitaruLockup` brand link). `<main>` carries `overflow-x-clip` as the DESIGN.md guard for the reveal-left/right slides
- `src/components/kitaru/*` — landing section shells (Hero, FirstRun, Features, Faq, Cta, `_HighlightPanel`). Hero is a static full-viewport band (`min-h-svh`, content centered below the nav overlay) that renders the copy, `LabsInstallChip` and the ghost `LabsButton`; Cta uses the same two Labs primitives (orange pill). Hero and Cta mount `KitaruGrain` directly as a standalone island for their shader backdrops; Features gets the same via the `_HighlightPanel` shells it renders. Grain palettes come from `src/lib/kitaru-grain-palettes.ts` (rebrand orange ramp)
- `src/components/kitaru/islands/*` — Preact landing islands (HeroVideo — the hero's poster card and video dialog, `client:idle` from Hero.astro — ScenarioStrip, TwoDoors, KitaruGrain WebGL shader) plus shared helper modules (the authoritative list is `KITARU_ISLAND_HELPERS` in `scripts/check-dist-smoke.ts`). TwoDoors merges the former OneImport (record) and Importers (import) sections into one two-column island. ScenarioStrip and TwoDoors mount `client:visible` from `product/kitaru.astro`; hydration is covered by `pnpm check:islands` (TwoDoors importer-tab check) and the `check-dist-smoke.ts` island manifest
- `src/scripts/kitaru/*` — Kitaru-page client scripts (clipboard, reveal-static, scroll-reveal); `src/hooks/use-reveal.ts` is the Preact-island counterpart of reveal-static
- `src/components/compare/_layouts/KitaruCompare.astro` — Kitaru-vs-X comparison page template
- `src/components/compare/kitaru/*` — Kitaru compare components (ComparisonHero, ComparisonTable, CodePane, CodeCompare, FeatureWithGraphic, WhenToUseEach, ComparisonCta)
- `src/content/compare-kitaru/*.mdx` — Kitaru-vs-X comparison pages
- `src/content/compare-zenml/*.mdx` — ZenML-vs-X pages in the same MDX template (`ZenmlMdxCompare.astro`, components under `src/components/compare/zenml/`), covering durable execution engines (Temporal, DBOS, Hatchet, Inngest, Restate) and agent frameworks. Positioning: ZenML orchestrates and runs agents durably (dynamic pipelines, `wait()` approvals, sandboxes, deployments); the Kitaru-vs-X set is limited to frameworks Kitaru has adapters for. The old `kitaru-vs-{temporal,dbos,hatchet,inngest,restate}` pages 301 to their ZenML twins (`public/_redirects`)

### Layouts
- `src/layouts/BaseLayout.astro` — Main layout (nav, footer, head slots, analytics); sets `<html data-app>` and renders the Labs shell (`LabsNavigation` + `LabsFooter`) unconditionally — tokens and chrome always travel together. Optional `product?: "zenml" | "kitaru"` tells the nav which product the page is in: the brand link shows the product's mark at rest (ZenML: the lockup with its "labs" script hidden; Kitaru: `KitaruLockup`, the Z mark + Kitaru letterforms) and becomes the ZenML Labs lockup on hover/focus, always linking to `/`; the nav has three hover menus (`button[aria-expanded]` + `ul[role=menu]`, opening one closes any other): "Products" (`LABS_DOORS` rows, 1px all-around sage border on the current row, Esc/arrows/focus return) marks the current product, "Docs" and "Case studies" render label+description rows from `labsNavMenus()`, and the Case-studies menu reads the LLMOps non-draft count at build time; the mobile panel leads with a chip switcher, and the signup pill points at that product's app (`LABS_NAV_SIGNUP_BY_PRODUCT`). Omit on `/` and cross-product pages
- `src/layouts/BlogLayout.astro` — Blog post layout, rebuilt onto the Labs shell in the blog cutover (`surface` optional, defaults `"ml"`): masthead on the short band, the shared `StickyBreadcrumb` (sticky under the nav from `lg` up and bounded to the article region, static below `lg`), the optional featured image, `LabsArticleBody` (prose body + sticky TOC), tag chips, author card, prev/next, and `LabsRelatedBand`'s hex-corner "Continue reading" rail — the three shared components are also what `DatabaseEntryLayout.astro` mounts; see "Blog (Labs shell, cutover 2026-09)" and "Research databases" below for the component-level breakdown
- `src/layouts/ContentLayout.astro` — The Labs prose layout for the legal pages, `/imprint` and `/contact`: a short `LabsBand` carries the h1 (+ optional `deck`), and a `max-w-3xl` `.prose` column (the blog reading measure) renders the slotted body. No close CTA
- `src/layouts/MinimalLayout.astro` — Lightweight shell (no nav/footer) for embeds

### OG card generators

Every route gets a programmatic OG card from one of two generators, both
built on shared machinery in `scripts/og/pipeline.ts` (`loadFonts`, the
satori → `@resvg/resvg-js` → sharp render pass at 2400px, JPEG q85 mozjpeg
4:2:0, and `uploadToR2`). Neither generator mutates content frontmatter —
the OG URL is always derived at render time from a brand/family + slug, so
a re-render overwrites the same R2 key in place.

**VS cards** (`scripts/og/generate-compare-og.ts`, `scripts/og/template.tsx`)
cover the comparison pages, from three sources: the `compare-kitaru` and
`compare-zenml` MDX collections (frontmatter `competitor`, `competitorLogo`,
`cardSubtitle`, ZenML- or Kitaru-brand template), and the legacy
Webflow-migrated `compare` collection (`.md`, always ZenML brand) — its
`toolName`, `toolIcon.url` and `cardSubtitle` frontmatter map onto the same
shape before rendering; draft entries are skipped. `compareOgUrl(brand, slug)`
in `src/lib/seo.ts` derives the URL (`${ASSET_BASE_URL}/${COMPARE_OG_PREFIX[brand]}/<slug>.jpg`);
each compare layout passes its own brand and reads
`seo?.ogImage || compareOgUrl(brand, slug)` as its `og:image` fallback.
Known deviation from the design file: the "VS" badge renders Rethink Sans
400 — the design specifies 500, but there is no static Medium woff for that
face and the difference is invisible at the badge's 30px size.

- `pnpm og:compare` — dry-run, writes JPEGs to `.cache/og/` (gitignored).
- `pnpm og:compare:write` — uploads to R2.
- `pnpm og:compare --slug=kitaru-vs-foo` — limit to specific pages (repeatable).

**When adding a new kitaru-vs-X or zenml-vs-X MDX page:** set `competitor`
and `cardSubtitle` in frontmatter, then run
`pnpm og:compare:write --slug=<new-slug>`. No frontmatter change needed —
the layout derives the OG URL automatically.

**Default cards** (`scripts/og/generate-default-og.ts`,
`scripts/og/default-template.tsx`) cover everything else: the LLMOps and
MLOps research databases and the hub/index/standalone pages listed in
`src/lib/ogCards.ts` (`OG_CARDS`, `ogCard(key)`). The template composes a
baked ground image (`public/images/og/labs-ground.jpg` — the tinted field,
light diffusion and blurred product mark, since satori can neither blend
nor blur) with a live lockup (`public/images/og/labs-lockup.svg`) and two
lines of type (title, subtitle) that auto-fit the text frame.

Cards are keyed by `DefaultOgFamily` (`llmops` | `mlops` | `pages`) via
`DEFAULT_OG_PREFIX` in `src/lib/constants.ts` and `defaultOgUrl(family, slug)`
in `src/lib/seo.ts`. Not every database entry or hub has a card yet, so
layouts must check first: `hasDefaultOgCard(family, slug)` reads the
manifest `src/data/og-cards.json` (`{ llmops: string[], mlops: string[],
pages: string[] }`, each array sorted) and only then does the layout call
`defaultOgUrl(...)` — a slug missing from the manifest falls through to
`DEFAULT_OG_IMAGE` in `resolveSeo`.

- `pnpm og:default` / `pnpm og:default --family=mlops` — dry-run, writes to
  `.cache/og/<family>/`.
- `pnpm og:default:write` — uploads to R2 and rewrites `og-cards.json`.
- `pnpm og:default --missing` — only slugs not yet in the manifest.

**Goldens:** `pnpm check:og` (`scripts/check-og-golden.ts`, also step 9 of
`pnpm smoke:dist`) renders one VS card per `.mdx` brand variant
(`kitaru-vs-pydantic-ai`, `zenml-vs-pydantic-ai`) through the real pipeline
and pixel-diffs it against a committed JPEG in `tests/snapshots/rendered/`
(delta 24, 0.5% max changed). A golden covering the `.md`-sourced VS path
and one covering a default card are planned but not yet pinned. Regenerate
with `pnpm og:golden:update` and look at the new image before committing —
the diff IS the review.
