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
- **Scale**: two dozen content collections defined in `src/content.config.ts`, a few thousand content items under `src/content/`, a couple of thousand assets on R2
- **History**: Migrated from Webflow in Feb 2026 (`docs/MIGRATION.md`). Unified with `kitaru.ai` in May 2026 (`MERGE_PLAN.md`).
- **Private details**: See `CLAUDE.private.md` (gitignored) for infrastructure IDs, traffic numbers, and internal docs index

## Working Agreements
- Complete the requested work through relevant verification. Infer routine choices from the repository and source material, state material assumptions, and ask only when missing information changes the result or an action needs authorization. Continue independent authorized work while waiting.
- Skills describe procedures; they do not grant permission to commit, push, publish, upload, request reviews, or change account settings. Use authorization already given or clearly implied by the task; do not ask for it again. An audit request authorizes an audit, not its proposed edits.
- Explicit user instructions take precedence over skill guidance within applicable system and tool constraints. If an instruction prevents completion, name and link its file, quote the requirement, and explain what remains blocked.
- Keep shared engineering policy equivalent in AGENTS.md, CLAUDE.md, and their repo skill copies in the same commit. Tool-specific invocation paths may differ. Codex uses .agents/skills; Claude uses .claude/skills. Do not assume nested instruction files load for a task started at the repo root.

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
| Content | **Markdown (.md) in git** — Astro Content Collections with Zod schemas. **Use `.md` NOT `.mdx`** (MDX v2 treats HTML as strict JSX, breaking raw HTML in content). **Exception:** the `compare-kitaru` and `compare-zenml` collections use `.mdx` because the ported Kitaru-vs-X pages (and their ZenML twins) rely on inline component imports — documented in MERGE_PLAN.md Phase 3 known gaps. |
| Hosting | **Cloudflare Workers** in production; **Cloudflare Pages** retained as the deeper fallback |
| Assets | **Cloudflare R2** — object storage for images/files |
| Styling | **Tailwind CSS** — utility-first |
| Interactive | **Preact islands** — client-side components in `src/components/islands/`: the `filter-index/` family (`LlmopsIndex`, `MlopsIndex`, `BlogIndex`, `IntegrationsIndex` on the shared `DataFilterIndex`/`ControlFilterIndex`), ContactForm, DemoRequestForm, CookieConsent, FeatureTabsSlider, and RoiCalculator (Kitaru's are separate, see below). The authoritative mount list is `ISLAND_MOUNTS` in `scripts/check-dist-smoke.ts`; `pnpm smoke:dist` fails if a top-level `.tsx` in either islands directory is missing from it, except Kitaru helper modules listed in `KITARU_ISLAND_HELPERS`; it does not scan nested folders such as `filter-index/`, so add those entries by hand |
| Search | **Pagefind** — build-time full-text search index for ops-database pages, paired with JSON faceted filtering |
| Forms | `ContactForm` / `DemoRequestForm` Preact islands → `src/pages/api/forms/[formType].ts` (`prerender: false`) → Segment HTTP API. Cal.com for demo booking (`/book-your-demo` is the canonical URL). Brevo for newsletter. The Kitaru landing surfaces all share these flows; the standalone kitaru.ai endpoints were never wired into the merged site. |
| Analytics | **Plausible** (`script.pageview-props.js` with `event-surface`) + GA4 + **single Segment workspace** (one ZenML write key for both products). The Segment `analytics.page()` call receives `{surface}` as a property so downstream segmentation/CRM routing can filter by it. Hostname-gated to production. See "Unified Brand & Surface" below. |
| Code highlighting | **Shiki** (one custom theme, `src/styles/labs-light.json` — the dark sage code pane of the blog cutover, applied to every Markdown collection; `zenml-light`/`zenml-dark`/`kitaru-dark` remain for the compare pages' own highlighter) at build time + **JetBrains Mono** monospace font (self-hosted variable woff2) |

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
| `data-app` | `zenml` (default) \| `kitaru` \| `labs` | CSS brand-token switching in `src/styles/global.css` (sage green vs warm orange; `labs` = the in-progress 2026 rebrand scope: type roles + palette) | `<html data-app="zenml">` in BaseLayout/MinimalLayout; Kitaru pages wrap content in `<div data-app="kitaru">` for scoped override; `/styleguide` wraps content in `<div data-app="labs">` (sole consumer so far) |
| `data-surface` | `ml` \| `agent` \| `unified` | Plausible `surface` custom prop on every pageview + custom event (D3); included as a property on Segment page events for downstream segmentation | BaseLayout/MinimalLayout require a `surface` prop; passed by page templates |

**Surface taxonomy** (`src/lib/analytics.ts`):
- **`ml`** — ZenML-side pages (homepage, `/features/*`, integrations, MLOps content)
- **`agent`** — Kitaru-side pages (`/product/kitaru`, `/compare/kitaru-vs-*`, and future Kitaru-only blog templates if they explicitly pass `surface="agent"`)
- **`unified`** — cross-product pages (`/compare`, `/get-started`, `/pricing`, `/pro`)

The Segment loader in `consentConfig.ts` runs a single ZenML write key; there is no Kitaru-side key. The page-init call passes `{surface}` as a property so the same dimension is queryable in Segment, Plausible, and downstream CRM tools. `PlausibleBridge.astro` merges `surface` into every custom event so click-tracking matches pageview tagging.

**`surface` is a required prop.** `BaseLayout` and `MinimalLayout` have no default — every page template passes an explicit value. `BlogLayout` and `ContentLayout` accept an optional `surface?` prop that they forward to `BaseLayout` (both default to `"ml"`, which is correct for their content types).

**Enforcement:** `pnpm check:surface` (`scripts/check-surface-coverage.ts`) scans all `.astro` files in `src/pages/` and `src/components/` and fails if any `<BaseLayout>` or `<MinimalLayout>` usage omits `surface=`. Run this before committing page changes. Note: `astro check` alone does NOT catch missing required props on `.astro` components — the grep check is the enforcing mechanism.

**When adding a new page:** pass an explicit `surface=` to the layout, using the taxonomy above; there is no default.

**When adding a page that pitches both products** (cross-workspace marketing): pass `surface="unified"`. When adding a Kitaru-only page (e.g., a future `/product/kitaru/...` subpath): pass `surface="agent"`. For ZenML-specific pages (features, integrations, blog, etc.): pass `surface="ml"`.

## Development Conventions

- **This is a public repository.** All commits, documentation, and code are visible to the public. Never commit secrets, API keys, infrastructure IDs, internal URLs, traffic numbers, or other sensitive information. Use `CLAUDE.private.md` (gitignored) for private details. The `design/` folder and `scripts/internal/` are also gitignored for internal-only artifacts
- The 2026 rebrand's visual work lands on the long-lived `rebrand/labs-site` branch (merged to `main` only at launch; see #246 for the order and one ticket per page family). DESIGN.md holds the binding design rules; build from the ZenML Labs components in `src/components/labs/` and the template registry rather than restyling pages in place. Every new Labs component is registered as `labs.*`.
- `design/` folder is for heavy artifacts (exports, screenshots, JSON dumps, internal docs) — **never commit to git**
- Make targeted git commits (only relevant files)
- **Do not commit intermediate planning/review artifacts by default.** Files under `docs/plans/`, `docs/reviews/`, `prompt-exports/`, or similar orchestration scratch locations are working notes for agents unless the user explicitly asks to keep them. Before staging, check `git status --short` and leave unrelated or intermediate plans/reviews unstaged. If a plan becomes a durable product/architecture document, confirm that intent before committing it
### Testing Guidelines
- During implementation, run checks that exercise the changed behavior. Before pushing code or opening a code PR, run the full gate below once on the final relevant state. Mixed code/content changes use the full gate, plus content validation when applicable.
- Pure instruction or documentation changes that do not alter generated content, executable scripts, or site behavior need diff, reference, and instruction-consistency checks; no application build or test suite is required. Rendered content-only changes require `pnpm validate:content`, `pnpm check`, `pnpm build`, and `pnpm smoke:dist`, plus browser inspection of changed pages and redirect/canonical checks when relevant. CI remains unchanged and may run broader checks.
- After later edits, rerun affected checks. Once required checks pass, broaden testing only for a new change, failure, or unresolved concern. Test observable behavior; do not add tests that merely repeat the implementation. Report passed, failed, and blocked checks separately; establish current baseline evidence before calling a failure pre-existing.
- Full code gate: `pnpm check && pnpm check:tests && pnpm check:surface && pnpm check:alt && pnpm check:registry && pnpm lint && pnpm test && pnpm build && pnpm smoke:dist && pnpm check:worker && pnpm check:islands`.
- `pnpm check:registry` is required locally but not yet in the required CI `Repo checks` job. Adding it there changes the trusted workflow mirror and blob-SHA pin and needs a reviewed release change. Preview upload is not the merge gate.
- Review intended rendered-content and OG golden changes before committing them; investigate unexpected differences rather than accepting new snapshots. Hydration requires `pnpm check:islands`; build and smoke markup checks alone do not prove interactivity.
- Worker changes follow [the release runbook](docs/worker-release-runbook.md). CI, preview upload, candidate upload, activation, and route attachment are separate actions. Never add Cloudflare credentials to the branch-controlled build job. Production release consumes the exact validated main artifact through separate upload/activation jobs with provenance, binding, topology, and baseline checks.
- Read [validation details](docs/agent-reference/validation.md) for command coverage, browser setup, snapshots, and release checks. Capture long build output in a log and check the actual process exit status; foreground or background execution is fine.

- **Credential management:** Use credentials only for the authorized task. Do not automatically persist supplied credentials. When persistence is requested or required for an authorized local setup, use gitignored .env and only the necessary keys; never print their values.
- **pnpm settings live in `pnpm-workspace.yaml`, never in a `pnpm` field in `package.json`.** That covers `overrides` (the security pins) and `onlyBuiltDependencies`. pnpm 11 silently ignores the `package.json` field (Dependabot's updater runs pnpm 11), so overrides kept there vanish from every bot-regenerated lockfile and CI fails at `pnpm install --frozen-lockfile` with `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`. pnpm 10 (CI, local) reads the workspace file too, so the lockfile is identical either way. `pnpm check:lockfile` (also run on every `pnpm test` via `tests/config/lockfileOverrides.test.ts`) rejects a `pnpm` field in `package.json` — that is the regression CI can catch, because pnpm 10 would install it fine. It also diffs the workspace `overrides` against the lockfile header and names any missing override; in CI `pnpm install --frozen-lockfile` runs first and fails on that drift before the test does, so the named message is for local use on a red bot branch
- Before a code PR or substantial code commit, review changed code for reuse, clarity, and unnecessary work; use an available simplify skill or perform that review directly. Fix worthwhile findings and rerun affected checks.

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

- **Third-party service logos:** locate the `zenml-frontend-monorepo` checkout, then read `.claude/skills/add-service-logo/SKILL.md` there before sourcing or integrating a logo. Try the sibling checkout first; if absent, use available project discovery. If unavailable, report the missing skill and continue unrelated work. Preserve full-color marks, normalize to 24x24, and obtain user approval of the rendered result before integration; do not bypass that review.

Use `.claude/skills/r2-image-upload/SKILL.md` for authorized uploads and
`.claude/skills/blog-post-contributor/SKILL.md` for blog imports.

**Tier A (static):** Just place the file in `public/images/` and reference it as `"/images/..."`.

**Tier B (R2):** After upload authorization, prefer AVIF for in-page images and a separate JPEG for Open Graph:

```bash
# Step 1: Convert to AVIF (repo-local script, no external dependency)
# For photos (team, blog heroes, screenshots): --preset inline (max 800px, AVIF only)
pnpm images:convert input.png --preset inline
# For larger hero/banner images: --preset cover (max 1200px, AVIF + a JPEG sibling for seo.ogImage)
pnpm images:convert input.png --preset cover

# Step 2: Upload the AVIF to R2
uv run scripts/r2-upload.py output.avif --prefix content/blog       # custom prefix
uv run scripts/r2-upload.py output.avif --frontmatter                # print YAML snippet
```

**Default to AVIF for R2 uploads** — typically 50-250× smaller than the source.

**Exception — Open Graph card images need JPEG.** Social platforms (LinkedIn, Twitter/X, Slack, Facebook, Discord) don't support AVIF in OG cards; an AVIF `ogImage` renders with no preview card at all. For any image referenced by `seo.ogImage` in content frontmatter, upload a JPEG sibling at the same R2 prefix and reference the `.jpg` from `ogImage` while keeping the `.avif` for `mainImage.url`.

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
- `figma-blog-cover` (`.claude/skills/figma-blog-cover/SKILL.md`) — create a post's cover from the Figma Blog Cover component on the Blog Covers page, export, convert to AVIF + JPEG, upload to R2, print frontmatter. Also adds missing competitor marks to the Hashi Design System library: source the icon from public sources, normalize it to contract, create the component in Figma, then a human republishes the library. Triggers: "blog cover", "figma cover", "cover image for post", "add logo", "missing mark", "new service logo".

### Compare-page OG card generator

The MDX comparison pages (`compare-kitaru` and `compare-zenml`) use
programmatic OG cards rendered from each `.mdx`'s frontmatter
(`competitor`, `cardSubtitle`). The template has two brand variants,
picked by collection: Kitaru (orange, Paper artboard) and ZenML (purple,
`public/images/zenml-logo.svg` wordmark). Pipeline:
satori (JSX → SVG) → `@resvg/resvg-js` (SVG → PNG at 2× native) → sharp
(PNG → JPEG, q85 mozjpeg 4:2:0) → R2 upload at a deterministic key.

The OG URL is **derived at render time** from the entry slug via
`compareOgUrl(brand, slug)` in `src/lib/seo.ts` — pointing at
`${ASSET_BASE_URL}/${COMPARE_OG_PREFIX[brand]}/<slug>.jpg`; each compare
layout passes its own brand. The script
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

**When adding a new kitaru-vs-X or zenml-vs-X MDX page:** create the `.mdx` with the
`competitor` and `cardSubtitle` frontmatter fields, then run
`pnpm og:compare:write --slug=<new-slug>`. No frontmatter change needed
— the layout derives the OG URL automatically.

### Lessons Learned

### Always verify uploads via the public URL

URL rewriting source code is not enough. After uploading images to R2, **test
the public URL** to confirm the file is actually accessible. The boto3 API can
succeed but the public domain may point to a different account/bucket.

### `public/` assets must be explicitly placed

Astro doesn't error when a component references `/images/logo.svg` but
`public/images/logo.svg` doesn't exist — it just silently 404s at runtime.
After adding `/images/*` references, verify the files exist in `public/images/`.

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
- **v1 Kitaru surfaces are gone** — the `Architecture.astro` flows/checkpoints diagram, the `/get-started` ML/Agent chooser (`GET_STARTED_TABS`, `GET_STARTED_KITARU`) and the `@flow`/`@checkpoint` walkthrough. Do not recreate them; `/product/kitaru` is the entry point.
- **`compare-kitaru` and `compare-zenml` collections** use `.mdx` (vs project default `.md`) — the ported Kitaru-vs-X pages and their ZenML twins use inline component imports.
- **`MERGE_PLAN.md`** — the merge's running plan + progress log; not current architecture authority (CLAUDE.md is).

## LLMOpsDB Native Publish Workflow

LLMOps database entries have two sources: entries migrated from Webflow, and entries published natively from the sibling `llmops-db-notion` repo into:

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

Read [the detailed architecture map](docs/agent-reference/site-architecture.md)
for system primitives and template families. Contracts: use SpaceStep tokens
(including mlg), absence instead of show* booleans, and paired Astro/TSX twins
for island consumers. New code must not use ad-hoc classOverrides; use named
family presets. Template alternatives require discriminated unions or ?: never,
never optional-prop bags hidden by as casts. Register new templates.

- `astro.config.ts` — Astro config (static output, Cloudflare, Preact, sitemap, Shiki)
- `src/content.config.ts` — Content collection schemas (Zod). Reads `categories/`, `tags/`, etc. at config eval time to build slug-reference validation sets — adding a new category/tag file requires a dev-server restart.
- `src/styles/global.css` — Tailwind v4 `@theme` block + design tokens; `:root` defaults are Kitaru, `[data-app="zenml"]` overrides flip to ZenML, `[data-app="labs"]` holds the 2026 rebrand type roles + palette + type-scale ladder (in progress, #246). Also home of the `[data-tone]` section-tone layer (#248): tone blocks route only `var()`s the brand scopes own — never a hex — and there is deliberately no `section[data-tone]` base rule (the background shorthand would reset bg-image utilities); tone consumers set explicit `bg-[var(--section-surface)]`-style utilities
- `src/pages/styleguide.astro` — generated design-system reference (public-but-unlisted, noindex, no nav/sitemap links); renders tokens/type/scale/registry/rules derived at build time — never hand-write design values into it
- `src/lib/styleguide.ts` — styleguide derivation layer: parses `global.css` tokens, computes WCAG contrast for declared pairs (`DECLARED_PAIRS`/`CHROME_PAIRS`)
- `src/lib/designRules.ts` — parses DESIGN.md rule sections for the styleguide's Rules section
- `src/components/styleguide/TemplateStage.astro` — live render stage for built registry entries on /styleguide that don't opt out via `stage: false` (the eight `comparison.*` entries opt out — they render through the shared comparison dispatcher, not as standalone templates, and are catalogued without a live stage); renders each staged entry with its registry `demoProps` (spread) and `demoSlots` (static demo HTML for slot-composed primitives); the glob covers `src/components/templates/**` and `src/components/system/**`
- `src/styles/kitaru-compat.css` — Kitaru OKLch tokens scoped to `[data-app="kitaru"]`; its §6 bridge re-points every one of them at the rebrand tokens when the wrapper sits inside `[data-app="labs"]` (surfaces from the labs semantic set, ember → orange-600, night → cream-900, Borna/Rethink/Nudica type roles), which is how `/product/kitaru` renders in the Labs shell without a class rename
- `src/lib/constants.ts` — `SITE_URL` and shared constants
- `src/lib/seo.ts` — SEO contract (`SEOProps`, `resolveSeo()`, `buildCanonical()`)
- `src/lib/analytics.ts` — Surface taxonomy type (`Surface`); the Segment loader lives in `src/lib/consentConfig.ts`
- `src/lib/projectBody.ts` — the `/projects/<slug>` details-column converter. Deliberately minimal (headings and paragraphs; blocks already starting with `<` pass through untouched) because it reproduces what those pages have always rendered. It has no list handling, so one project publishes a paragraph of literal `-` lines — a real defect, kept because fixing it is a content change rather than a parity one. Two project detail pages are pinned as rendered-content goldens, so a "fix" here fails `pnpm smoke:dist`. The structured parts of a project (`pipelines`, `stackHtml`) live in frontmatter, not the body; `scripts/migrations/` holds the one-off script that put them there
- `src/components/compare/_layouts/ComparisonPage.astro` — one blocks-driven template for all 28 ZenML comparison routes (25 `/compare/zenml-vs-*` + 3 `/vs/*`). Each entry carries an ordered `blocks[]` and a `hero`; the template renders what the content says through the Labs comparison primitives. Both families open on `LabsComparisonBand`, share the complete 38-option ZenML switcher, reveal every content section, and close on `LabsCloseCta`; the old gradient/padded versus plain close distinction is retired. The 10 ZenML MDX and 11 Kitaru MDX pages use the same Labs primitives through thin collection-specific wrappers. Rendered goldens plus the 49-route text, href and analytics audit are the regression net. `scripts/migrations/compare-blocks/parity.ts` is a historical byte-compare tool for the #250 conversion, not a current check
- `src/lib/compareDefaults.ts` — no page reads its copy any more; the conversion resolved every per-category fallback into the entries themselves. It survives for `ZENML_ICON_URL` and for the migration scripts' `getCategoryDefaults`. To change what a compare page says, edit that page's `blocks[]`
- `scripts/migrations/compare-blocks/` — one-off historical tools that moved those pages onto blocks: `audit.ts` + `AUDIT.md`, `convert.ts`, `finalize.ts`, and `parity.ts` (the retired #250 byte-compare instrument; rendered goldens are the live guard)
- `src/lib/llmops.ts` — LLMOps domain layer (`getAllPublishedEntries()`, tag/industry counts). Related-entry scoring is shared: `src/lib/relatedIndex.ts` holds `TaxonomyCount` and the generic `buildRelatedIndex`/`getRelatedFromIndex` scorer that `llmops.ts`/`mlops.ts` wrap; blog keeps its own `getRelatedPosts` (`src/lib/blog.ts`); `relatedIndex.ts` also holds the `filterUsedTerms` zero-entry hub filter, and `src/lib/chipStyles.ts` the shared chip color variants Badge/RelatedRail consume
- `src/lib/navigation.ts` — Nav data (typed, not hardcoded)
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

### ZenML Labs shell + homepage (rebrand branch, 2026-09)

`LabsNavigation`'s GitHub icon/count is a first-party edge-cached stars link, so it needs no consent gate; retain its exact-count, no-JS behavior when changing the Labs shell.
- `src/pages/index.astro` — the ZenML Labs parent homepage (`app="labs"`, `surface="unified"`); copy, links and analytics event names live in `src/lib/labs-home.ts` (facts are imported from their canonical constants, never retyped)
- `src/components/labs/*` — the Labs shell (`LabsNavigation` floating pill nav, hung off the centered page container so the logo's left edge and the signup pill's right edge sit on the content column while the pill chrome bleeds past it by its own padding (flush inside the gutter below `lg`), server-rendered transparent with a scroll-state script that turns it solid past the top; the nav has three hover menus — Products, Docs, Case studies — from `LABS_NAV_LINKS`/`labsNavMenus()`, all sharing one behaviour (opens on hover for fine pointers as well as on click/keyboard, rows revealing as a short stagger, opening one closes any other that's open); the Case-studies menu's "LLMOps Database" row reads the non-draft entry count at build time; `LabsFooter` dark band: company lockup + tagline, link columns, legal row — the giant-wordmark band is retired) and the six homepage sections (`LabsHero`, `ProductDoors`, `FeatureGridPanels` + `icons.ts`, `LogoMarquee`, `CustomerStoryCards`, `LabsCloseCta`), the three product-page sections (`LabsFeatureTabs` around the `FeatureTabsSlider` island, which now also takes the server-rendered figure panes as children, `LabsValueProps` with numbered labels until the icon set lands, `LabsIntegrationsGrid`, a static grid read from the `integrations` collection — the page's motion budget is spent by the hero shader, `LogoMarquee` and the close shader), `LabsButton` (the one pill CTA, `dark`/`sage`/`ghost` tones, hover transition built in; call sites never hand-write the pill classes) and `LabsInstallChip` (copyable install command, `light`/`dark` tones; the command scrolls inside the chip, the copy button sits outside the scroll region), all registered as `labs.*` in the template registry with `stage: false` (the styleguide stage glob does not cover this folder). Sections use the DESIGN.md centered container (`max-w-content` + `px-gutter`), never a fixed pixel cap; the `labs` scope sets body weight 400 (Rethink Sans), so bold is always an explicit call-site choice. Brand marks: `src/components/brand/ZenmlLabsLogo.astro` (inline company lockup, aria-hidden; the wrapping anchor names it; static copy at `public/images/zenml-labs-lockup.svg`) and `ZenmlWordmark.astro` / `KitaruWordmark.astro` (the two rebrand product wordmarks, currentColor, aria-hidden; the product cards name them via the wrapping element) and `KitaruLockup.astro` (Z mark + Kitaru letterforms, drawn to the same mark height as the company lockup so the nav can crossfade the two). `KitaruLogo.astro` is the pre-rebrand Kitaru mark still used by the Kitaru pages. `src/pages/index.md.ts` mirrors the same copy for agents; `scripts/check-island-hydration.ts` and `scripts/check-dist-smoke.ts` expect `FeatureTabsSlider` on `/product/zenml` (no longer on `/`) and `GrainBackdrop` on `/`
- `src/pages/product/zenml.astro` — the ZenML product landing in the Labs shell (`app="labs" product="zenml" surface="ml"`; SEO title/description/canonical unchanged from `productZenml.ts`): hero → logo strip → feature tabs → value props → integrations grid → customer stories → close, every string from `src/lib/labs-product-zenml.ts` (facts imported: install command, links, logos, case studies, tab screenshots; ZenML-tier copy; "Start free" leads to the ZenML cloud app on this page, the hero's secondary is a ghost pill to the docs, no "Book a demo"). `LabsHero`/`LabsCloseCta` take `LabsProductBandContent` (the homepage shape plus optional `secondaryCta` and `install`; absence collapses the slot; the hero centers its block vertically in the band). `src/pages/product/zenml.md.ts` mirrors the module. The old `sections/*` components and `productZenml.ts` stay until the other consumers move
- `src/components/labs/highlights/` — the feature-tabs highlight figures: `HighlightFigure.astro` (the shared `<svg viewBox="0 0 720 460">` shell: type-role classes, the play-once reveal contract `.hl-in`/`--hl-i`, `.hl-edge` draw-in with `pathLength="1"`, `.hl-row` stagger, nothing under reduced motion; strokes are non-scaling and the reveal animates `translate`, never `transform`, because a CSS transform would replace the groups' SVG positions) and one `zenml/<slug>.astro` per tab (`orchestration`, `versioning`, `infrastructure`, `caching`, `governance`), registered in `highlights/index.ts` and referenced by `figure` id from `ZENML_TABS` in `labs-product-zenml.ts` (the id union itself lives in `highlights/ids.ts`, a plain module with no `.astro` import, so content modules and `pnpm check:tests` can type against it) (a tab is either `{ figure }` or `{ image }`). Colours are tokens only; figures are drawn at 1× of the approved 1440×920 designs. Each figure also passes a `narrow` slot: a second portrait `<svg viewBox="0 0 360 460">` with fewer nodes and shorter labels that the shell shows below 768px instead of shrinking the wide drawing (DESIGN.md's diagram rule); both drawings share one HTML document, so narrow ids carry their own `-n-` suffix
- `src/components/islands/GrainBackdrop.tsx` — the generic GrainGradient shader backdrop (reveal gating, WebGL error boundary, SSR guard, reduced motion); `KitaruGrain` is a thin wrapper over it. Palettes: `src/lib/grainConfig.ts` (type), `src/lib/kitaru-grain-palettes.ts`, `src/lib/labs-grain-palettes.ts`. `pnpm check:motion` counts both as ambient islands

### Blog (Labs shell, cutover 2026-09)
- `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro` (via `BlogLayout`), and the taxonomy hubs — `src/pages/{tags,category,author}/{index,[slug]}.astro` — all render in the Labs shell (`app="labs"`, no `product`, `surface="ml"`). `src/lib/blogLayout.ts` holds the article's lane-width constants (`ARTICLE_LANE`, `PROSE_COLUMN`, `TOC_RAIL`, etc.) as one module — never a scattered literal
- `src/components/labs/BlogCard.astro` + `BlogCard.tsx` — `labs.blog-card`, the one blog/term-hub card (16:9 media, chrome-less, hover border+zoom+title-colour), Astro and Preact twins sharing every class string via `src/components/labs/blogCardStyles.ts`. Live consumers: the `/blog` index grid, and `term-hub.editorial`'s grid on `/category/[slug]` and `/author/[slug]`. The pre-cutover `src/components/blog/BlogCard.astro` survives only as `RelatedRail`'s `blog-card` item kind on non-blog pages
- `src/components/templates/HexCornerCard.astro` + `src/components/system/HexCornerMark.astro` — `card.hex-corner`/`mark.hex-corner`, the "tuck and reveal" related-content card. One consumer: the post page's "Continue reading" rail (`RelatedRail`'s `hex-card` item kind)
- `src/styles/labs-light.json` — the site's Shiki theme (dark sage code pane, every Markdown collection), wired in `astro.config.ts`; the three prose rehype plugins (path-scoped via `isProseCollectionFile` to the blog and the two research-database collections — see "Research databases" below): `src/lib/rehypeBlogRawHtml.ts` normalises the Webflow-era raw HTML inside posts (strips inline `style` attributes, wraps raw `<table>`s — Astro runs user rehype plugins before `rehype-raw`, so that markup is a string at this point), `src/lib/rehypeCodePane.ts` wraps every fence in the code-pane markup (`src/scripts/code-copy.ts` wires the copy button), `src/lib/rehypeTableScroll.ts` wraps Markdown tables in the scroll frame + hint
- `src/components/templates/TermHubEditorial.astro` — the card-grid term listing (`labs.blog-card`, plus an optional sibling-term chip strip and pagination markers). Live consumers: `/category/[slug]`, `/author/[slug]`
- `src/components/templates/TermHubEntryIndex.astro` (`items` arrangement for the blog, `entries` arrangement for the database hubs, `skin="labs"`) + `src/components/templates/StackedList.astro` (`skin="labs"`) — the stacked-row term listing (title, excerpt, up to 3 sibling-tag chips, a fixed author/year lane). Live consumer: `/tags/[slug]`; `skin="default"` keeps the pre-cutover row for the database term hubs' `/styleguide` demo
- `src/components/islands/HubPagination.tsx` — 12/page client-side pagination for the tag/category/author detail pages (`client:idle`): the page server-renders every post of the term with `hidden` + `data-page`, this island only toggles `hidden` and syncs `?page=N`, reusing `Pagination.tsx` (`skin="labs"`); the database hubs use `HubEntryPagination.tsx` instead, which fetches later pages (see "Research databases" below)
- `src/components/blog/termChipStyles.ts` — the shared hexagon-chip pill class strings (post tag chips, term-hub sibling-term strips, tag-row chips)
- Retired in the taxonomy step: `src/components/blog/CategoryBar.astro`, `TagCloud.astro`, `src/components/islands/BlogSearch.tsx` — nothing mounts them any more; the term hubs render through `PageHeader` + `TermHubEditorial`/`TermHubEntryIndex` instead
- Post images: `mainImage` is the cover (cards, hubs, OG fallback, Article JSON-LD) and is never rendered inside a post; the in-page figure under the masthead renders only from the opt-in `featuredImage` frontmatter block (same image schema), which no post carries yet — authors add it when they want an image in the post itself
- `src/components/labs/LabsBand.astro` — `labs.band`, the shader band shell every Labs page opens on: `size: "landing" | "short"` and `grain?: "labs" | "kitaru"` (discriminants, never booleans; Kitaru posts and the Kitaru category/tag hubs pass `kitaru` so their band runs the slower, quieter `blog` cut of the Kitaru product page's palette), the `GrainBackdrop client:visible` grain + bottom fade + the centered container with the floating-nav clearance built in, and a default slot. `LabsHero` renders both its variants through it (zero visual change on `/` and `/product/zenml`); the blog index, the three term hubs (breadcrumb + eyebrow + name + deck; the author hub keeps its avatar/name/bio split inside the band) and the post masthead in `BlogLayout` use the `short` size directly. The short band ends in a 1px hairline; the gap before the first content element is the one `BAND_CONTENT_GAP` string in `src/lib/blogLayout.ts` that every consumer section applies — see DESIGN.md "Interior-page header band"
- `src/components/labs/BlogNewsletterCta.astro` — `labs.blog-newsletter-cta`, the closing band of every blog route (index, posts, hubs): dark sage band with the homepage close's `client:idle` grain backdrop, one headline + one `LabsButton` on the left, the newsletter card on the right (copy in `src/lib/blog-cta.ts`). The card posts to Brevo through the same contract as `BrevoNewsletterForm.astro`; the submit handler now lives in `src/scripts/brevoNewsletterForm.ts` and both forms import it (the label swap targets an optional `[data-brevo-label]` child so an icon-only button keeps its icon)
- Filter rail on `/blog`: the `labs` skin of `FacetRail.tsx` is an accordion — "Filter and sort" heading, hairline-separated disclosure rows Sort by / Category / Tags whose collapsed state shows the current value; the sort `<select>` leaves the toolbar on this skin (URL contract unchanged). The default skin (`/integrations` only, since the databases cutover moved `/llmops-database` and `/mlops-database` onto the labs skin; since the integrations cutover no live route, only the `/styleguide` demo) keeps the always-expanded rail, split out as `DefaultFacetRail`
- Kitaru posts: `isKitaruPost()` in `src/lib/blog.ts` (category or tag `kitaru`) drives `data-product="kitaru"` on the post and a `product` value on cards; the accent travels through the `--blog-accent*` custom properties in `global.css` (sage by default, orange under `[data-product="kitaru"]`) plus a "Kitaru" pill that replaces the category link when the category is Kitaru; the "Continue reading" rail stays sage on every post — see DESIGN.md
- Typography: on every blog and research-database route, UI text (breadcrumb, meta rows, chips, TOC, facet-rail headers/counts, results count, sort, pagination, code-pane bar, hub headers, "Tags" label) is Rethink Sans in sentence case — never `font-label`/uppercase. This supersedes the Nudica-label convention elsewhere on the site for this surface only

### Research databases (Labs shell, cutover 2026-09)
- `/llmops-database`, `/mlops-database`, their entry pages, the three term-hub families (`/llmops-tags/[slug]`, `/mlops-tags/[slug]`, `/industry-tags/[slug]`) and the three hub indexes (`/llmops-tags`, `/mlops-tags`, `/industry-tags`) render in the Labs shell (`app="labs"`, no `product`, `surface="ml"`) from the blog's components — one index template, one entry layout, one hub template. Copy, route constants and page sizes live in `src/lib/databases.ts` (`DATABASES`, `DATABASE_PAGE_SIZE` 24, `DATABASE_TAG_CHIPS_VISIBLE` 9, `DATABASE_ROW_CHIPS_VISIBLE` 3, `DATABASE_CTA`, `formatCount`/`capitalise`, the hub deck builders); the index pages pass `seoDescription()` to the layout and `description()` to the band, so their `<title>`/`<meta name="description">` did not change in the cutover. Plausible: the close band's pill fires `Database-Close-Signup-ZenML` (the blog's `Blog-Close-Signup-ZenML` twin) and an entry's "View source" pill fires `Database-Entry-Source`
- `src/layouts/DatabaseEntryLayout.astro` — the one entry template for both collections, discriminated by `database: "llmops" | "mlops"`: short `LabsBand` masthead (eyebrow, title at 28/34 → 36/42, company · platform · content type · year line, ghost `LabsButton` "View source" with `target="_blank"`), then the shared `StickyBreadcrumb`, the sage summary box, `LabsMetadataBlock` (Industry link; tag chips, first 9 then a native `<details>` "+N more" / "Show fewer"), `LabsArticleBody` (prose + TOC), `LabsRelatedBand` "More like this" (hex cards, `Company · Year` label) and `BlogNewsletterCta` with `DATABASE_CTA` + `BREVO_LLMOPS_CONFIG` (there is no MLOps Brevo list; the card copy says so). The route files resolve the data and pass plain props. Pagefind hooks (`data-pagefind-body/meta/filter`) are unchanged; the breadcrumb JSON-LD is the page's only structured data, as before
- Shared extractions from `BlogLayout.astro` (the post and the entry layout mount the same components): `src/components/labs/StickyBreadcrumb.astro` (`labs.sticky-breadcrumb`, the DESIGN.md sticky row, offsets 108/44/8 → 160), `LabsArticleBody.astro` (`labs.article-body`, prose column + H2 TOC from three headings up, `proseClass` for the blog's `prose-zoomable`, owns the mobile-TOC close handler), `LabsRelatedBand.astro` (`labs.related-band`, the sage hex-card band, collapses at 0), `src/scripts/labs-scroll-reveal.ts` (the one reveal observer, imported by every blog and database route), `labsButtonStyles.ts` (the pill class strings a Preact island can wear; `LabsButton` also gained `target` and a default icon slot), and `BlogNewsletterCta`'s `content`/`brevo` props (defaults = the blog's)
- Entry rows: `src/components/labs/EntryRow.astro` + `EntryRow.tsx` (`labs.entry-row`, class strings and the `EntryRowItem` shape in `entryRowStyles.ts`) — Borna title (the chevron appears on hover, centered on the row's right edge), company · platform · content type · year · industry meta line (`entryRowMetaTokens` builds it once for both twins), two-line summary, three small hexagon chips + "+N"; rows separated by a hairline, hover = light sage wash + centered chevron + line-by-line title underline (DESIGN.md "Entry rows"). The Preact twin renders inside `LlmopsIndex` / `MlopsIndex` (`skin="labs"`; chips and the industry token are `aria-pressed` filter buttons above the stretched title link); the Astro twin renders the hub rows through `TermHubEntryIndex`'s `entries` arrangement
- Filter engine additions (`src/components/islands/filter-index/`): `extraSingleFacets` (any number of extra single-select facets with their own URL param — MLOps "Content type" is `?type=`; the labs skin renders one accordion group each, `LabsExtraSingleGroup`) and, at zero results, `activeConstraints` + `dropOneSuggestions` (each active constraint offered back with the real count the query returns without it, plus "Match any" when two or more tags are ANDed). `FilterEmptyState`'s labs skin renders them (heading counts the constraints, description names them, ghost "Clear all filters" pill, chip strip, 320px reserved height); `/blog` inherits it. The labs mobile drawer is tokenised (card panel, hairline header, "See N results" pill from `LABS_BUTTON_BASE`); every default-skin branch is byte-identical to before
- Hubs and #53: tag hubs render page 1 (24 rows) server-side; `src/components/islands/HubEntryPagination.tsx` (`client:idle`) fetches later pages from the existing `/llmops-index.json` / `/mlops-index.json`, same `?page=N` contract, one canonical URL, sorted `title.localeCompare` exactly as the page sorts page 1 — and it seeds state at page 1 and jumps to the URL's page in a mount effect, because seeding from `window` would hydrate a different pagination tree than the server rendered. `scripts/check-dist-smoke.ts` caps `/llmops-tags/prompt-engineering` and `/llmops-tags/monitoring` at 2 MB (they were 3.89 MB and 3.25 MB) and lists the island under `ISLAND_MOUNTS`; `pnpm check:islands` clicks to page 2. The industry hub renders two headed sections (LLMOps / MLOps), 24 rows each, with "See all N in the … Database" links into the filtered index (`?industry=<slug>`) and no pagination. The three hub indexes render `src/components/labs/TermChipIndex.astro` (`labs.term-chip-index`, hexagon chips with counts, count-desc). On `skin="labs"` `TermHubEntryIndex` renders `crossLinks` after the sections as the blog's sibling-chip strip ("Common industries" / "Common technologies" / "Common MLOps topics")
- Rehype plugins: `isBlogMarkdownFile` became `isProseCollectionFile` (`src/lib/rehypeCodePane.ts`) and covers `blog`, `llmops-database` and `mlops-database`, so entries get the code pane, table frame and raw-HTML normaliser; the compare collections stay excluded
- Regression net: rendered goldens `llmops-building-a-systematic-snap-benefits-llm-evaluation-framework.html` (`.prose`, with a fenced code block), `mlops-airbnb-chronon-sandcastle-record.html` (the entry's `dl` record) and `mlops-airbnb-chronon-sandcastle.html` (`.prose`) in `scripts/check-dist-snapshots.ts` — the goldens deliberately stop at regions without islands or inlined scripts; unit tests `tests/lib/{relatedIndex,llmops,mlops}.test.ts`. Every new `labs.*` registry entry here is `stage: false` (the styleguide stage glob does not cover `src/components/labs/`)
- Sage and cream only on these routes: no Kitaru accent, no blue tag chips (the `blue`/`success` chip variants remain registered for `RelatedRail`'s `meta-card` kind and the old `Badge`); UI text follows the blog's Rethink sentence-case rule

### Product one-off pages (Labs shell, cutover 2026-09)
- `/pricing` (+ `/pricing.md`), `/pro`, `/get-started`, `/open-source-vs-pro`, `/compare` (the hub, + `/compare.md`), `/docs`, `/deployments`, `/startups-and-academics` and `/cloud-features/ml-models-control-plane` render in the Labs shell (`app="labs"`). Surfaces: `unified` with no `product` on `/pricing`, `/pro`, `/compare`, `/open-source-vs-pro`, `/docs`, `/startups-and-academics` (ZenML Pro is the paid umbrella for both products); `product="zenml" surface="ml"` on `/get-started`, `/deployments`, `/cloud-features/*`. Every route opens on the short `LabsBand` header (eyebrow / heading / deck in the slot; `/pro` uses the `landing` band through `LabsHero`) and closes on `LabsCloseCta` — pages with no final CTA of their own (`/docs`, `/compare`, `/startups-and-academics`) close on the shared `LABS_CLOSE` copy with a page-specific analytics name. The integrations + features cutover retired `FeaturesHubCTA`, `FeatureHero`, `FeaturesCTA05`, `FeatureTabs`, `FeatureCard`, `FeatureTestimonial` and `FeatureComplianceBanner`; the comparison cutover retired `FeatureValueSection`, `VsHero`, `VsTestimonial` and `VsCta02`
- Pricing facts, plan copy and JSON-LD did not change: `tests/lib/pricingSlider.test.ts` pins the slider tiers, `tests/lib/pricingJsonLd.test.ts` pins the structured data to `tests/snapshots/pricing-jsonld.json`, `tests/lib/pricingMarkdownMirror.test.ts` and `pnpm smoke:dist` step 11 pin `/pricing.md` and `/compare.md` byte-for-byte to `tests/snapshots/mirrors/` (regenerate a fixture only for a deliberate copy change). Five rendered goldens cover the restyled regions (`pricing-zenml-plan-cards`, `pricing-compare-table`, `open-source-vs-pro-table`, `get-started-steps`, `docs-diptych`)
- New `labs.*` components (all `stage: false`): `labs.faq` (`src/components/labs/LabsFaq.astro` — native `<details>` hairline rows from a `FaqData` content prop; consumers `/pricing` (one per workspace panel) and `/pro`; `FaqSection`/`FAQAccordion` retired), `labs.pricing-plan-cards` (`PricingPlanCards.astro` + `PricingPlanCard.astro` — the two-workspace toggle, both panels server-rendered, the Recommended card = 1px `--color-sage-400` border + sentence-case pill, orange-300/orange-600 on the Kitaru workspace as that panel's one bounded orange moment; the slider stays a vanilla `<script>`, view-model in `src/components/sections/pricingSlider.ts`), `labs.pricing-table` (`PricingTable.astro` — thin adapter from `PricingCompareTableData` onto `SpecTable skin="labs"`; `/open-source-vs-pro` and `/deployments` map their own row shapes onto the same skin in their page files). Extended: `SpecTable` `skin="labs"` (sticky first column, hairline rows, `LabsButton` action row, optional row `description`), `ProductDoors` (`headline?`, `caption?`, per-door `links?` quick-link rows, `details?` title/detail rows, `cta.external`; consumers `/`, `/pricing` Pro inclusions, `/docs` diptych), `ProcessSteps` `layout="vertical-code" skin="labs"` (hairline step rail + the site code-pane markup, highlighted with `labs-light.json` and wired by `code-copy.ts`; `/get-started`), `labs.entry-row` optional `mark` (24px logo for database and taxonomy rows), `LabsStoryCard` `kind="quote"` + `CustomerStoryCards` accepting quote cards (`/pro` testimonials; the `ProTestimonialCarousel` island and the three `ProTestimonial*` sections are retired, `ISLAND_MOUNTS` updated), `LabsValueProps` optional `deck`, `LabsFeatureTabs` optional headline (`/pro` features and `/deployments` architectures render `FeatureTabsSlider` with image panes)
- Plausible: every event that existed on these routes survives unchanged; `Pricing-CTA-Read-Docs` no longer fires (its secondary pill left the close band; one CTA per band); `Pricing-Startup-Apply` now fires (the old banner never passed it). New names, registered as goals after merge: `Pro-Hero-Book-Demo`, `Pro-Hero-Compare-OSS`, `Pro-Onboarding-Book-Demo`, `Pro-OSS-Grid-Book-Demo`, `Pro-Close-Book-Demo`, `GetStarted-Architecture-Deploy`, `GetStarted-Projects-All`, `GetStarted-Close-Compare-OSS`, `OSSvsPro-Grid-Book-Demo`, `OSSvsPro-Subway-Read`, `OSSvsPro-Close-Book-Demo`, `Deployments-Close-Book-Demo`, `CloudFeatures-Close-Book-Demo`, `Docs-Close-Signup`, `Compare-Close-Signup`, `Startups-Close-Signup`

### Comparison pages (Labs shell, cutover 2026-09)
- All 49 public comparison routes render through the Labs shell: 25 blocks comparisons, 3 category comparisons, 10 ZenML MDX comparisons, and 11 Kitaru MDX comparisons. ZenML routes use `app="labs" product="zenml" surface="ml"`; Kitaru routes use `app="labs" product="kitaru" surface="agent"` and retain an inner `data-app="kitaru"` scope for Kitaru-origin graphics
- Every route opens on `LabsComparisonBand` and closes on the comparison arrangement of `LabsCloseCta`. The band is eyebrow-first (no visible breadcrumb), then the product/competitor switcher, one headline and deck; its breadcrumb survives only as JSON-LD. Kitaru eyebrows use orange-600 and ZenML eyebrows use sage. MDX display headings omit a redundant leading product-versus-competitor phrase while metadata keeps the authored title. Hero CTAs and images do not render there. ZenML menus contain the three category routes followed by all 35 competitor routes alphabetically (38 options total); Kitaru menus contain all 11 competitor routes alphabetically
- Blocks-driven value sections reuse `labs.feature-split`; the MDX families use `labs.comparison-value` where authored graphic and bullet slots require the broader wrapper. All families share `labs.comparison-table`, `labs.code-compare` / `labs.code-pane`, `labs.comparison-showdown`, `labs.comparison-strategy-cta`, `labs.comparison-quote`, `labs.comparison-card`, `labs.comparison-blog-rail`, and `LabsCloseCta`. Quotes are full-width editorial bands; related comparison navigation uses the same compact 40px-mark cards as `/compare`; related articles use the framed white Labs blog-card variant in an explicit one/two/three-column grid. The ZenML MDX wrappers contain no token scope of their own. Kitaru wrappers keep only the Kitaru bridge needed by their inline graphics
- Every comparison content section uses `scroll-reveal-section` with `reveal-child` descendants and the shared `initScrollReveal()`. The server-rendered state remains visible without JavaScript and under reduced motion. Comparison pages do not mount `StickyBreadcrumb`
- Comparison code uses the canonical blog code-pane chrome and the `labs-light` Shiki theme. Comparison tables use the 20px Labs frame, hairline rows, sticky first column, sentence-case headers, sage checks and cream crosses, with no alternating tint; legacy scorecard explanations render visibly in their cells and never hide behind disclosure controls
- Regression coverage is the four rendered goldens in `scripts/check-dist-snapshots.ts` plus a generated audit of text, hrefs and analytics across all 49 routes. `scripts/migrations/compare-blocks/parity.ts` is retained only as historical context and is not a gate

### Integrations and features (Labs shell, cutover 2026-09)
- `/integrations`, `/integration-type`, `/integration-type/[slug]`, `/integrations/[slug]`, `/features` and `/features/[slug]` render in the Labs shell (`app="labs" product="zenml" surface="ml"`; `<title>`/description/canonical unchanged). Every route opens on the short `LabsBand` (eyebrow in Nudica Mono uppercase — the `font-label` role — over the heading and deck) and closes on `LabsCloseCta` with one pill; copy and count builders live in `src/lib/integrations.ts` (`INTEGRATIONS_HERO`, `integrationsClose()`, `integrationDetailClose(count)`, `integrationTypeDeck()`, `integrationTypesDeck()`, `MORE_INTEGRATIONS_COUNT`) and the Labs additions at the bottom of `src/lib/features.ts` (`FEATURES_HUB_CLOSE`, `FEATURE_DETAIL_CLOSE`, `FEATURE_HIGHLIGHT_FIGURES`, `FEATURE_COMPLIANCE_DEFAULTS`). Every content section is a `scroll-reveal-section` with `reveal-child` blocks wired by `initScrollReveal()` (DESIGN.md "Every section reveals on scroll")
- `src/components/labs/IntegrationCard.astro` — `labs.integration-card`, the one catalogue tile (the `/integrations` grid, `TermHubCatalog` on a type hub and the detail's "More integrations" row): a full-width 88px cream logo band flush with the card's top (clipped by the card's corners, hairline under it, the mark centred), Borna title, the integration type as a Nudica Mono uppercase label; the whole card is the link and hovers (sage border, title colour, the mark scales up, the entry-row title-underline sweep). `data-type`/`data-slug` are the hooks the filter island toggles by. The pre-cutover `src/components/integrations/*` (card, detail hero, sidebar, logo rail) is deleted
- `/integrations` keeps the control flavour of the filter family: `IntegrationsIndex client:load skin="labs"` renders the labs rail (search stays inside the desktop aside, above a "Filter" heading — `FacetRail`'s labs renderer takes a `heading` prop — because the hydration probe's `#integrations-search-desktop` contract survives), the mobile drawer, and at zero results the shared `FilterEmptyState` fed by `useFilterState`'s `activeConstraints`/`dropOneSuggestions`; `ControlFilterIndex` gained the same additive `skin` branch `DataFilterIndex` has, class strings from `labsSkin.ts`, `skin="default"` byte-identical (only the `/styleguide` demo renders it now). `GrainBackdrop` is listed under `integrations.html` and `features.html` in `ISLAND_MOUNTS`
- `/integration-type` renders `TermChipIndex` (types as hexagon chips with counts, zero-count types dropped by `filterUsedTerms`); `/integration-type/[slug]` renders `TermHubCatalog` (restyled in place onto `labs.integration-card`, one skin, optional `id`; thin rows still centre)
- `/integrations/[slug]` is a page-local composition of the research-database entry anatomy (not a layout — it is the only route that renders it): short band (eyebrow, the mark in an 80px white tile beside the h1, deck, "View docs" ghost pill at the row's right end), `StickyBreadcrumb`, `LabsArticleBody` with the Type / GitHub / Compare record in its new `rail` named slot (right rail above the TOC from `xl`, above the prose below; `LabsMetadataBlock labels="mono"`; the GitHub row is a `link` value with `as: "pill"` + `icon: "github"` — a ghost pill from `labsButtonStyles.ts` with the mark before the label, because `LabsButton` renders its icon after), `LabsRelatedBand` "Related reading" (category as `kindLabel`, date as `meta`, the blog's shape), a six-card "More integrations" row (same type first, then alphabetical, self excluded) and the close band carrying the build-time published count. The CMS-exported fields: the two `<ul>` fields go straight into `.prose` after `stripEmptyParagraphs`; `codeExampleHtml`'s `<pre><code>` blocks are extracted (`extractCodeBlocks`), highlighted at build time with Shiki on `labs-light.json` (the highlighter is created once per build), wrapped in the `figure.code-pane` chrome (`codePaneHtml`) and put back in place (`replaceCodeBlocks`, so the four entries that introduce a block with a sentence keep it) — all in `src/lib/integrationCode.ts`, pinned by `tests/lib/integrationCode.test.ts`. An entry with no structured field falls back to its Markdown body. Plausible: `Integration-Docs`, `Integration-GitHub`, `Integration-Compare`
- `/features` renders the seven `HUB_CARDS` as `labs.feature-card` (`src/components/labs/FeatureCard.astro`: category label in the mono role, Borna title, summary; no icon — `iconSvg` left `HubCard`; `tests/lib/features.test.ts` pins the cards to `CATEGORY_ORDER` and to published feature pages). `/features/[slug]` renders the band, an optional framed figure (a drawn `labs.highlights` figure for the five slugs in `FEATURE_HIGHLIGHT_FIGURES`, else the entry's `hero.image`), the block sequence (`labs.feature-split` for `value` blocks, `labs.compliance-card` for `complianceBanner` blocks with `FEATURE_COMPLIANCE_DEFAULTS` fallbacks), an optional `LabsStoryCard kind="quote"` (its `title` is now optional) and the close band gated on `showFinalCta`
- Extractions that must stay byte-identical for their first consumers: `labs.feature-split` (`FeatureSplit.astro`, from the `/cloud-features/*` and `/deployments` scenario markup — those pages now render through it) and `labs.compliance-card` (`ComplianceCard.astro`, from the `/pricing` and `/pro` card; `mt-8` is part of the component; its eyebrow keeps the sentence style those goldens pin). Rendered goldens guard both directions: `cloud-features-splits`, `deployments-scenarios`, `pricing-compliance-card`, `pro-compliance-card` (must not move) and `integration-kubernetes-body`, `integration-type-orchestrator-grid`, `features-grid`, `feature-auto-track-everything` (the restyled regions); `normaliseSnapshot` now masks the per-render `astro-island uid`
- Plausible names added by this cutover, registered as goals after merge: `Integrations-Close-Book-Demo`, `IntegrationTypes-Close-Book-Demo`, `IntegrationType-Close-Book-Demo`, `Integration-Close-Book-Demo`, `Integration-Docs`, `Integration-GitHub`, `Integration-Compare`, `Features-Close-Book-Demo`, `Feature-Close-Book-Demo`. Retired from `src/components/sections/`: `FeaturesHubCTA`, `FeatureHero`, `FeaturesCTA05`, `FeatureTabs`, `FeatureCard`, `FeatureTestimonial`, `FeatureComplianceBanner`; `FinalCTA` and `ProjectsCTA` stay until `/projects` moves

### Get Started routing
- `src/pages/get-started.astro` — ZenML open-source onboarding in the Labs shell (short band, `ProcessSteps skin="labs"` 3-step walkthrough on the `labs-light` code pane, architecture, projects, resources, `LabsCloseCta`) with one pointer line to `/product/kitaru`. `/get-started/zenml` 301-redirects here (`public/_redirects`). There is no ML/Agent chooser here; Kitaru's entry point is its own landing

### Layouts
- `src/layouts/BaseLayout.astro` — Main layout (nav, footer, head slots, analytics); optional `app?: "zenml" | "labs"` (default `zenml`) sets `<html data-app>` AND swaps the chrome to the Labs shell (`LabsNavigation` + `LabsFooter`) in one move — tokens and chrome always travel together. Optional `product?: "zenml" | "kitaru"` (Labs shell only) tells the nav which product the page is in: the brand link shows the product's mark at rest (ZenML: the lockup with its "labs" script hidden; Kitaru: `KitaruLockup`, the Z mark + Kitaru letterforms) and becomes the ZenML Labs lockup on hover/focus, always linking to `/`; the nav has three hover menus (`button[aria-expanded]` + `ul[role=menu]`, opening one closes any other): "Products" (`LABS_DOORS` rows, 1px all-around sage border on the current row, Esc/arrows/focus return) marks the current product, "Docs" and "Case studies" render label+description rows from `labsNavMenus()`, and the Case-studies menu reads the LLMOps non-draft count at build time; the mobile panel leads with a chip switcher, and the signup pill points at that product's app (`LABS_NAV_SIGNUP_BY_PRODUCT`). Omit on `/` and cross-product pages
- `src/layouts/BlogLayout.astro` — Blog post layout, rebuilt onto the Labs shell in the blog cutover (`app="labs"`, `surface` optional, defaults `"ml"`): masthead on the short band, the shared `StickyBreadcrumb` (sticky under the nav from `lg` up and bounded to the article region, static below `lg`), the optional featured image, `LabsArticleBody` (prose body + sticky TOC), tag chips, author card, prev/next, and `LabsRelatedBand`'s hex-corner "Continue reading" rail — the three shared components are also what `DatabaseEntryLayout.astro` mounts; see "Blog (Labs shell, cutover 2026-09)" and "Research databases" below for the component-level breakdown
- `src/layouts/MinimalLayout.astro` — Lightweight shell (no nav/footer) for embeds
