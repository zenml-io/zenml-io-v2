# ZenML Website — Production Astro Site

## Project Overview

This repository powers the live [zenml.io](https://www.zenml.io) marketing
website. The accepted Astro 7 Cloudflare Worker serves production through the
guarded current-main release path. The site is generated from the Astro content
collections defined in `src/content.config.ts`.

The site markets **two sub-products under one paid umbrella (ZenML Pro)**:
- **ZenML** — ML workflow orchestration (the original product)
- **Kitaru** — replay-based evals for AI agents (folded in from `kitaru.ai`; pivoted from the earlier durable-runtime positioning in Aug 2026)

- **Production URL**: https://www.zenml.io
- **Hosting**: The accepted Astro 7 Cloudflare Worker serves production.
  Cloudflare Pages remains available as the deeper fallback.
- **Scale**: 25 content collections defined in `src/content.config.ts`, ~3,337 content items, ~2,560 assets on R2
- **History**: Migrated from Webflow in Feb 2026 (`docs/MIGRATION.md`). Unified with `kitaru.ai` in May 2026 (`MERGE_PLAN.md`).
- **Private details**: See `CLAUDE.private.md` (gitignored) for infrastructure IDs, traffic numbers, and internal docs index

## Operational Constraints

- **No broken links** — all published URLs must be preserved or 301-redirected
- **SEO stability** — keep slugs, meta tags, Open Graph data intact when editing content
- **Alt text on images** — SEO matters: every image (`<img>`, `mainImage`, `logo`) should have descriptive, non-empty alt text unless there's a clear reason not to (e.g. a decorative image already labelled by an adjacent `aria-label`)
- **Content schema integrity** — content collections validated by Zod schemas in `src/content.config.ts`
- **Static-first output** — the site is statically generated; only API routes in `src/pages/api/` run server-side
- **Use Astro API routes, not `functions/`** — the Cloudflare adapter's `_worker.js` silently ignores hand-written `functions/` (see below)

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | **Astro** (TypeScript) — static-first, content collections, islands |
| Content | **Markdown (.md) in git** — Astro Content Collections with Zod schemas. **Use `.md` NOT `.mdx`** (MDX v2 treats HTML as strict JSX, breaking raw HTML in content). **Exception:** the `compare-kitaru` collection uses `.mdx` because the ported Kitaru-vs-X pages rely on inline component imports — documented in MERGE_PLAN.md Phase 3 known gaps. |
| Hosting | **Cloudflare Workers** in production; **Cloudflare Pages** retained as the deeper fallback |
| Assets | **Cloudflare R2** — object storage for images/files |
| Styling | **Tailwind CSS** — utility-first |
| Interactive | **Preact islands** — client-side components: LLMOpsFilter, MLOpsFilter, ContactForm, DemoRequestForm, BlogSearch, CookieConsent, FeatureTabsSlider, ProTestimonialCarousel, and RoiCalculator (9 in `src/components/islands/`; Kitaru's are separate, see below) |
| Search | **Pagefind** — build-time full-text search index for ops-database pages, paired with JSON faceted filtering |
| Forms | `ContactForm` / `DemoRequestForm` Preact islands → `src/pages/api/forms/[formType].ts` (`prerender: false`) → Segment HTTP API. Cal.com for demo booking (`/book-your-demo` is the canonical URL). Brevo for newsletter. The Kitaru landing surfaces all share these flows; the standalone kitaru.ai endpoints were never wired into the merged site. |
| Analytics | **Plausible** (`script.pageview-props.js` with `event-surface`) + GA4 + **single Segment workspace** (D4 was superseded — audit showed the Kitaru-side write key had no callers in the merged site). The Segment `analytics.page()` call still receives `{surface}` as a property so downstream segmentation/CRM routing can filter by it. Hostname-gated to production. See "Unified Brand & Surface" below. |
| Code highlighting | **Shiki** (custom `zenml-light`/`zenml-dark` themes) at build time + **JetBrains Mono** monospace font (self-hosted variable woff2) |

## Key Technical Decisions

| Decision | Value |
|----------|-------|
| Trailing slash | `never` — configured site-wide in `astro.config.ts`, canonicals strip trailing `/` |
| Canonical domain | `www.zenml.io` (bare `zenml.io` redirects to www) |
| Build format | `file` — generates `.html` files (`buildCanonical()` in `seo.ts` strips the `.html` suffix) |

## Unified Brand & Analytics Surface

Two attributes on `<html>` carry the unified-product state to every page:

| Attribute | Values | Drives | Set by |
|-----------|--------|--------|--------|
| `data-app` | `zenml` (default) \| `kitaru` \| `zenml-next` | CSS brand-token switching in `src/styles/global.css` (sage green vs warm orange; `zenml-next` = the in-progress 2026 rebrand scope: type roles + palette) | `<html data-app="zenml">` in BaseLayout/MinimalLayout; Kitaru pages wrap content in `<div data-app="kitaru">` for scoped override; `/styleguide` wraps content in `<div data-app="zenml-next">` (sole consumer so far) |
| `data-surface` | `ml` \| `agent` \| `unified` | Plausible `surface` custom prop on every pageview + custom event (D3); included as a property on Segment page events for downstream segmentation | BaseLayout/MinimalLayout require a `surface` prop; passed by page templates |

**Surface taxonomy** (`src/lib/analytics.ts`):
- **`ml`** — ZenML-side pages (homepage, `/features/*`, integrations, MLOps content)
- **`agent`** — Kitaru-side pages (`/product/kitaru`, `/compare/kitaru-vs-*`, and future Kitaru-only blog templates if they explicitly pass `surface="agent"`)
- **`unified`** — cross-product pages (`/compare`, `/get-started`, `/pricing`, `/pro`)

The Segment loader in `consentConfig.ts` runs a single ZenML write key (D4 was superseded after audit — the standalone kitaru.ai routes that needed the Kitaru key turned out to be dead code and were removed). The page-init call passes `{surface}` as a property so the same dimension is queryable in Segment, Plausible, and downstream CRM tools. `PlausibleBridge.astro` merges `surface` into every custom event so click-tracking matches pageview tagging.

**`surface` is a required prop** (as of #64). `BaseLayout` and `MinimalLayout` no longer have a default — every page template must pass an explicit value. `BlogLayout` and `ContentLayout` accept an optional `surface?` prop that they forward to `BaseLayout` (both default to `"ml"`, which is correct for their content types).

**Enforcement:** `pnpm check:surface` (`scripts/check-surface-coverage.ts`) scans all `.astro` files in `src/pages/` and `src/components/` and fails if any `<BaseLayout>` or `<MinimalLayout>` usage omits `surface=`. Run this before committing page changes. Note: `astro check` alone does NOT catch missing required props on `.astro` components — the grep check is the enforcing mechanism.

**When adding a new page:** always pass an explicit `surface=` to the layout. Use the taxonomy below. Don't omit it — there is no default fallback any more.

**When adding a page that pitches both products** (cross-workspace marketing): pass `surface="unified"`. When adding a Kitaru-only page (e.g., a future `/product/kitaru/...` subpath): pass `surface="agent"`. For ZenML-specific pages (features, integrations, blog, etc.): pass `surface="ml"`.

## Development Conventions

- **This is a public repository.** All commits, documentation, and code are visible to the public. Never commit secrets, API keys, infrastructure IDs, internal URLs, traffic numbers, or other sensitive information. Use `CLAUDE.private.md` (gitignored) for private details. The `design/` folder and `scripts/internal/` are also gitignored for internal-only artifacts
- `design/` folder is for heavy artifacts (exports, screenshots, JSON dumps, internal docs) — **never commit to git**
- Make targeted git commits (only relevant files)
- **Keep `AGENTS.md` in sync with this file**: any change to conventions, commands, or quality gates in `CLAUDE.md` must be checked against — and reflected in — `AGENTS.md` in the same commit, and vice versa
- **Do not commit intermediate planning/review artifacts by default.** Files under `docs/plans/`, `docs/reviews/`, `prompt-exports/`, or similar orchestration scratch locations are working notes for agents unless the user explicitly asks to keep them. Before staging, check `git status --short` and leave unrelated or intermediate plans/reviews unstaged. If a plan becomes a durable product/architecture document, confirm that intent before committing it
- After running tests, re-run them if you make subsequent changes
- **Before pushing code changes**, run the same local quality gates that PR CI runs: `pnpm check`, `pnpm check:tests`, `pnpm check:surface`, `pnpm check:alt`, `pnpm check:registry`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm smoke:dist`, `pnpm check:worker`, then `pnpm check:islands` (or the combined command `pnpm check && pnpm check:tests && pnpm check:surface && pnpm check:alt && pnpm check:registry && pnpm lint && pnpm test && pnpm build && pnpm smoke:dist && pnpm check:worker && pnpm check:islands`). If you change code after any of those commands, rerun the affected check before pushing. Documentation-only edits can skip the build unless they change generated content or site behavior
- PR CI enforces the package quality gates in the required `Repo checks` job:
  `pnpm check`, `pnpm check:tests`, `pnpm check:surface`, `pnpm check:alt`,
  `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm smoke:dist`,
  `pnpm check:worker`, then `pnpm check:islands`. **`pnpm check:registry` is
  NOT yet in this job** — adding a step to `deploy.yml` also requires updating
  its byte-identical trusted mirror `.github/trusted/worker-artifact-workflow.yml`
  and the git-blob-SHA pin in `tests/config/workerPreviewControlPlane.test.ts`,
  which is a reviewed release-boundary change and not a side effect. Run it
  locally until then; see `docs/worker-release-runbook.md`. It packages that exact
  validated `dist/` output. A trusted manual workflow on `main` may upload the
  exact artifact from an eligible same-repository PR to the isolated preview
  Worker after explicit review; fork and Dependabot runs receive no Cloudflare
  credentials. Preview upload is not the required merge gate
- **`pnpm check:islands` needs a browser.** First run: `pnpm exec playwright install chromium`. It serves `dist/` and drives a real Chromium to prove the Preact islands actually hydrate — `pnpm build` and `pnpm smoke:dist` only prove the HTML exists, and an island can ship perfect markup and still be inert. This matters most for framework upgrades (see the Astro 5→7 tracking issue): a broken upgrade otherwise passes a fully green CI. Dependabot and fork PRs get **no preview upload**, so this check is their only automated hydration signal. Beyond the islands, it also checks the Storylane embed on `/live-demo` (a plain `.astro` component, no `client:*` directive): under both rejected and accepted consent, the iframe and enhancement script must load and exactly one `#storylane-embed` script may be inserted
- **`pnpm smoke:dist` also diffs rendered content against goldens** in `tests/snapshots/rendered/` (`scripts/check-dist-snapshots.ts`): the `.prose` body of one Markdown blog post and the `.compare-body-inner` of one Kitaru-vs-X MDX page, one tag per line, asset hashes normalised. Nothing else in CI looks at what remark/rehype/Shiki/MDX actually emit — #268 flipped smart quotes on 11 pages and shipped green. If you changed the post, the compare page, or a rendering plugin on purpose: `pnpm build && pnpm snapshots:update`, read the golden diff, commit it. A golden diff you didn't expect is the finding, not noise
- **Worker release boundary:** `.github/workflows/deploy.yml` never receives
  Cloudflare credentials. Preview and candidate workflows consume its exact
  artifact without running branch package scripts. After the accepted Worker
  cutover, the trusted default-branch release workflow may upload an exact
  validated `main` artifact and activate it in separate GitHub-environment jobs
  after provenance, binding, topology, and baseline checks. Production route
  attachment remains a separate decision. See `docs/worker-release-runbook.md`
- **Build output**: `pnpm build` generates ~2000+ lines of output listing every generated page. Always run it in background mode and use `tail` to check only the final lines for success/failure
- **Credential management**: When you receive API credentials, tokens, or keys, **always add them to `.env`** for persistence across sessions. The `.env` file is gitignored and safe for secrets
- **pnpm settings live in `pnpm-workspace.yaml`, never in a `pnpm` field in `package.json`.** That covers `overrides` (the security pins from #226) and `onlyBuiltDependencies`. pnpm 11 silently ignores the `package.json` field (Dependabot's updater runs pnpm 11), so overrides kept there vanish from every bot-regenerated lockfile and CI fails at `pnpm install --frozen-lockfile` with `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`. pnpm 10 (CI, local) reads the workspace file too, so the lockfile is identical either way. `pnpm check:lockfile` (also run on every `pnpm test` via `tests/config/lockfileOverrides.test.ts`) rejects a `pnpm` field in `package.json` — that is the regression CI can catch, because pnpm 10 would install it fine. It also diffs the workspace `overrides` against the lockfile header and names any missing override; in CI `pnpm install --frozen-lockfile` runs first and fails on that drift before the test does, so the named message is for local use on a red bot branch
- VERY IMPORTANT: **Before opening a PR or making a large commit**, always run `/simplify` to review changed code for reuse opportunities, quality issues, and efficiency improvements. Fix any issues it finds before committing.

### PR Description Style

PR descriptions should be reviewer-friendly, not just a raw change log. Use this shape unless the user asks for something different:

1. **Summary** — a short, friendly explanation of what changed and why.
2. **What changed** — bullets grouped by feature/area, naming important routes, components, or files.
3. **What reviewers should focus on** — call out the gnarly or higher-risk parts. For example: copied-vs-derived content, SEO/canonical changes, redirects, schema/JSON-LD, analytics, Cloudflare headers, or anything where you made a judgement call.
4. **Validation** — list commands run (`pnpm check`, `pnpm check:tests`, `pnpm check:surface`, `pnpm check:alt`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm smoke:dist`, content validators), review loops used, and any known warnings that are pre-existing.
5. **Preview URLs / paths to check** — include concrete paths when useful, e.g. `Preview URL + /pricing`, `/product/kitaru`, `/compare`, or any route whose behavior changed.

Keep the tone plain and helpful: the goal is that a reviewer can quickly see the story, know where to spend attention, and know what was already checked.

Do not hard-wrap PR descriptions at a fixed column width. Keep each paragraph and each bullet on one source line, use blank lines between logical blocks, and let GitHub wrap the rendered text for the viewer.

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

**Default to AVIF for R2 uploads** — typically 50-250× smaller than the source. Use the `avif-image-compressor` skill for conversion.

**Exception — Open Graph card images need JPEG.** Social platforms (LinkedIn, Twitter/X, Slack, Facebook, Discord) don't support AVIF in OG cards. For any image referenced by `seo.ogImage` in content frontmatter, upload a JPEG sibling at the same R2 prefix and reference the `.jpg` from `ogImage` while keeping the `.avif` for `mainImage.url`. See PR #73 for the site-wide fix where 103 posts all had AVIF og images and were rendering with no preview card on LinkedIn.

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

### Compare-page OG card generator

The Kitaru-vs-X comparison pages use programmatic OG cards rendered from
each `.mdx`'s frontmatter (`competitor`, `cardSubtitle`). Pipeline:
satori (JSX → SVG) → `@resvg/resvg-js` (SVG → PNG at 2× native) → sharp
(PNG → JPEG, q85 mozjpeg 4:2:0) → R2 upload at a deterministic key.

The OG URL is **derived at render time** from the entry slug via
`compareOgUrl(slug)` in `src/lib/seo.ts` — pointing at
`${ASSET_BASE_URL}/${KITARU_COMPARE_OG_PREFIX}/<slug>.jpg`. The script
uploads there with `r2-upload.py --literal-key` so re-renders overwrite
in place. No frontmatter mutation. A page can still override by setting
its own `ogImage:` frontmatter line.

- `scripts/og/template.tsx` — design template; matches the Paper artboard
  "D - Custom" on the **Kitaru Landing Page** file (page: **Open Graph**).
  Paper is the source of truth — if the brand evolves, edit the artboard
  and re-pull computed styles via `mcp__paper__get_jsx`.
- `scripts/og/generate-compare-og.ts` — orchestrator.
- `pnpm og:compare` — dry-run, writes JPEGs to `.cache/og/` (gitignored).
- `pnpm og:compare:write` — uploads to R2. Truly idempotent: same slug →
  same R2 key → overwrite in place. No `.mdx` files are ever modified.
- `pnpm og:compare --slug=kitaru-vs-foo` — limit to specific pages.

**When adding a new kitaru-vs-X page:** create the `.mdx` with the
`competitor` and `cardSubtitle` frontmatter fields, then run
`pnpm og:compare:write --slug=<new-slug>`. No frontmatter change needed
— the layout derives the OG URL automatically.

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
Worker. Import environment bindings from `cloudflare:workers`, schedule
background work with `context.locals.cfContext.waitUntil()`, and use
`globalThis.caches` for the Cache API.

## Legacy Terminology

This site was migrated from Webflow in Feb 2026 and unified with kitaru.ai in May 2026. Some naming and metadata from those phases persists in the codebase:

### Webflow migration (Feb 2026)
- **`scripts/phase2/validate-content.ts`** — still the active content validator (`pnpm validate:content`); the path is historical, the tool is current
- **`webflow` frontmatter** in content `.md` files — retained for traceability on migrated content; not needed for new posts
- **`R2_WEBFLOW_BASE`** in `src/lib/constants.ts` — references legacy asset namespaces still served from R2
- **`.prose` CSS class** — styles raw HTML that originated from Webflow's CMS export
- **`docs/MIGRATION.md`** — historical narrative of the Webflow migration; not current architecture authority
- **`docs/embed-contract.md`** — per-family contract for every third-party embed/script (Cal.com, Turnstile, Storylane, Brevo, GitHub buttons, YouTube-nocookie): host pages, sizing, loading, no-JS, and consent relationship, plus the `consentConfig.ts` registry rules (`cc-` id prefix is reserved for `TRACKING_SCRIPTS` entries)

### Kitaru merge (May 2026)
- **Kitaru R2/source-domain references** — audit current source before assuming any `assets.kitaru.ai` hotlinks remain. The merge removed known live-source references; historical design/migration artifacts may still mention old domains.
- **Standalone Kitaru form/API code was removed** — the merged site uses unified form helpers and analytics (`formTypes.ts`, `formValidation.ts`, `consentConfig.ts`). Do not recreate `kitaru-form-types.ts`, `kitaru-segment.ts`, or standalone `/api/get-started`, `/api/waitlist`, `/api/newsletter` routes unless the product decision changes.
- **`compare-kitaru` collection** uses `.mdx` (vs project default `.md`) — the ported Kitaru-vs-X pages use inline component imports.
- **`MERGE_PLAN.md`** — the merge's running plan + progress log; not current architecture authority (CLAUDE.md is).

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
- `src/content.config.ts` — Content collection schemas (Zod). Reads `categories/`, `tags/`, etc. at config eval time to build slug-reference validation sets — adding a new category/tag file requires a dev-server restart.
- `src/styles/global.css` — Tailwind v4 `@theme` block + design tokens; `:root` defaults are Kitaru, `[data-app="zenml"]` overrides flip to ZenML, `[data-app="zenml-next"]` holds the 2026 rebrand type roles + palette + type-scale ladder (in progress, #246). Also home of the `[data-tone]` section-tone layer (#248): tone blocks route only `var()`s the brand scopes own — never a hex — and there is deliberately no `section[data-tone]` base rule (the background shorthand would reset bg-image utilities); tone consumers set explicit `bg-[var(--section-surface)]`-style utilities
- `src/components/system/` — the substrate primitives (#248): `SectionIntro`, `Breadcrumb` (visual + BreadcrumbList JSON-LD from one prop list), `EmptyState`, and `layout/` (`Stack`/`Inline`/`Split`/`Bleed`/`Grid`). Contract: absence collapses (no `show*` booleans), spacing via `SpaceStep` tokens only (8 steps, `xxs`–`xxl` incl. `mlg` = 40px), `Split` emits prose-first DOM with `minmax(0, nfr)` ratio tracks and accepts `ResponsiveSpace`. Components consumed by islands ship an `.astro` + `.tsx` twin kept in lockstep via a shared module. `classOverrides` on SectionIntro/EmptyState is a migration-parity escape hatch — new code must not pass ad-hoc override objects; a page family that legitimately shares one look uses a named preset (`SECTION_INTRO_PRESETS`, `pageHeaderPresets.ts`) instead, which new pages may pass. Contract types live in `src/lib/section.ts`
- `src/components/templates/` — the Wave 2 section families (#249), built on the substrate and registered in `src/lib/templates/registry.ts`: `PageHeader` (six collapsing arrangements incl. tinted band + split-masthead), `ProcessSteps` (`vertical-code` + `compact-list`, semantic `<ol>`), `MetadataBlock`/`SpecTable`/`DescriptionList`/`StackedList` (data-display), `RelatedRail` (related-content items arrangement — static, not an island), `TermHubEditorial`/`TermHubEntryIndex`/`TermHubCatalog` (term-hub shapes), plus `pageHeaderPresets.ts` (named family presets; plain `.ts` helpers are exempt from `check:registry`), and the Wave 3 page-type templates (#250): `ConversionShell` (Cal-hero + lead-capture form shells behind the conversion-utility routes) and `LegalArticle` (h1 + optional last-updated line for the `legal` collection pages). Live routes render current-brand parity arrangements; the drawn new-brand states (zero-padded numerals, leading meta separators, stacked entry lists, sticky spec-table first column, hex-corner cards) exist as demo/cutover paths and are exercised on `/styleguide` via registry `demoProps` — each deviation is documented in the entry's `notes`. **Prop contracts are type-enforced, not documented:** when a prop selects between structurally different arrangements (e.g. `layout`) or two fields are mutually exclusive (e.g. `cards`/`items`), type `Props` as a discriminated union keyed on the selector (or an `?: never`-excluded union for keyless either/or pairs) so the invalid combination is a compile error — never a widened bag of optionals narrowed by `as` casts in the body. `astro check` is the only enforcement layer template props have, and a cast hides the mismatch until render (see `ProcessSteps.astro` / `TermHubEntryIndex.astro` for the two shapes)
- `src/pages/styleguide.astro` — generated design-system reference (public-but-unlisted, noindex, no nav/sitemap links); renders tokens/type/scale/registry/rules derived at build time — never hand-write design values into it
- `src/lib/styleguide.ts` — styleguide derivation layer: parses `global.css` tokens, computes WCAG contrast for declared pairs (`DECLARED_PAIRS`/`CHROME_PAIRS`)
- `src/lib/designRules.ts` — parses DESIGN.md rule sections for the styleguide's Rules section
- `src/components/styleguide/TemplateStage.astro` — live render stage for built registry entries on /styleguide; renders each entry with its registry `demoProps` (spread) and `demoSlots` (static demo HTML for slot-composed primitives); the glob covers `src/components/templates/**` and `src/components/system/**`
- `src/styles/kitaru-compat.css` — Kitaru OKLch tokens scoped to `[data-app="kitaru"]`
- `src/lib/constants.ts` — `SITE_URL` and shared constants
- `src/lib/seo.ts` — SEO contract (`SEOProps`, `resolveSeo()`, `buildCanonical()`)
- `src/lib/analytics.ts` — Surface taxonomy type (`Surface`); the Segment loader lives in `src/lib/consentConfig.ts`
- `src/lib/llmops.ts` — LLMOps domain layer (`getAllPublishedEntries()`, tag/industry counts). Related-entry scoring is shared: `src/lib/relatedIndex.ts` holds `TaxonomyCount` and the generic `buildRelatedIndex`/`getRelatedFromIndex` scorer that `llmops.ts`/`mlops.ts` wrap; blog keeps its own `getRelatedPosts` (`src/lib/blog.ts`); `relatedIndex.ts` also holds the `filterUsedTerms` zero-entry hub filter, and `src/lib/chipStyles.ts` the shared chip color variants Badge/RelatedRail consume
- `src/lib/navigation.ts` — Nav data (typed, not hardcoded)
- `src/lib/footer.ts` — Footer data (typed, not hardcoded)

### Homepage
- `src/pages/index.astro` — Homepage composition (15 section components)
- `src/lib/homepage.ts` — All homepage marketing copy, stats, URLs, FAQ
- `src/components/sections/` — 43 section components

### Preact Islands (interactive client-side components)
- `src/components/islands/LLMOpsFilter.tsx` — LLMOps database "Research Hub" (faceted sidebar with industry/tag facets, Pagefind full-text search, AND/OR tag mode, sort, clickable chips, mobile drawer, WCAG-compliant accessibility)
- `src/components/islands/MLOpsFilter.tsx` — MLOps database filter/search island
- `src/components/islands/BlogSearch.tsx` — Blog search with Cmd+K shortcut, lazy-fetches `/blog/search-index.json` on focus (`client:media` — desktop only)
- `src/components/islands/ContactForm.tsx` — Form submission → Astro API routes
- `src/components/islands/DemoRequestForm.tsx` — Demo request form used by `/book-your-demo`
- `src/components/islands/CookieConsent.tsx` — Cookie consent banner (4 categories)
- `src/components/islands/FeatureTabsSlider.tsx` — Homepage auto-cycling feature tabs
- `src/components/islands/ProTestimonialCarousel.tsx` — /pro page testimonial carousel
- `src/components/islands/RoiCalculator.tsx` — ROI calculator interactive form

### Server-side API Routes (`prerender: false`)
- `src/pages/api/forms/[formType].ts` — Unified form submission handler → Segment HTTP API (identify + track), using the site's Segment workspace
- `src/pages/api/csp-report.ts` — CSP violation report sink (logs redacted summary, returns 204)
- `src/pages/api/github-stars.ts` — GitHub star count fetcher with edge cache (`context.locals.cfContext.waitUntil`)

The old standalone `kitaru.ai` API routes (`get-started`, `waitlist`, `newsletter`) were removed during the merge. The Kitaru landing now shares the merged site's form and analytics infrastructure.

### Kitaru content & components
- `src/pages/product/kitaru.astro` — Kitaru landing (Aug 2026 redesign; copy lives in `src/lib/kitaru-landing.ts`, CTA links in `src/lib/productKitaru.ts`)
- `src/components/kitaru/*` — landing section shells (Features, Faq, Cta, `_HighlightPanel`) plus `Architecture.astro` (used by `/get-started`, not the landing). Cta mounts `KitaruGrain` directly as a standalone island for its shader backdrop; Features gets the same via the `_HighlightPanel` shells it renders
- `src/components/kitaru/islands/*` — Preact landing islands (Hero, ScenarioStrip, TwoDoors, KitaruGrain WebGL shader) plus shared helper modules (the authoritative list is `KITARU_ISLAND_HELPERS` in `scripts/check-dist-smoke.ts`). TwoDoors merges the former OneImport (record) and Importers (import) sections into one two-column island. The three sections mount `client:visible` from `product/kitaru.astro`; hydration is covered by `pnpm check:islands` (TwoDoors importer-tab check) and the `check-dist-smoke.ts` island manifest
- `src/scripts/kitaru/*` — Kitaru-page client scripts (clipboard, reveal-static, scroll-reveal); `src/hooks/use-reveal.ts` is the Preact-island counterpart of reveal-static
- `src/components/compare/_layouts/KitaruCompare.astro` — Kitaru-vs-X comparison page template
- `src/components/compare/kitaru/*` — Kitaru compare components (ComparisonHero, ComparisonTable, CodePane, CodeCompare, FeatureWithGraphic, WhenToUseEach, ComparisonCta)
- `src/content/compare-kitaru/*.mdx` — Kitaru-vs-X comparison pages

### Get Started routing
- `src/pages/get-started.astro` — ZenML open-source onboarding (hero, 3-step walkthrough, architecture, projects, resources). `/get-started/zenml` 301-redirects here (`public/_redirects`). Kitaru's entry point is its own `/product/kitaru` landing.
  - **KNOWN BUG — the Phase-4 ML/Agent chooser was only half-removed.** The routing revert landed (`public/_redirects:152`) but the UI did not: `GET_STARTED_TABS` in `src/lib/getStarted.ts:51` still renders a live `role="tablist"` chooser in this page. Its Kitaru tab reads *"Agent runtime"* — the durable-runtime positioning retired in the Aug 2026 pivot. This file previously claimed the chooser "was removed"; it ships. Finish the revert or re-decide the page, but do not trust the old claim.

### Layouts
- `src/layouts/BaseLayout.astro` — Main layout (nav, footer, head slots, analytics)
- `src/layouts/BlogLayout.astro` — Blog post layout (conditional TOC sidebar)
- `src/layouts/MinimalLayout.astro` — Lightweight shell (no nav/footer) for embeds
