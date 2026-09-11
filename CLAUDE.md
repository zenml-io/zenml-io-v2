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

The MDX comparison pages get programmatic OG cards derived at render time from the entry slug (`compareOgUrl(brand, slug)` in `src/lib/seo.ts`). When adding a `kitaru-vs-X` or `zenml-vs-X` MDX page, set `competitor` and `cardSubtitle` in its frontmatter and run `pnpm og:compare:write --slug=<new-slug>`. Pipeline, template source of truth and script details: [key-files.md](docs/agent-reference/key-files.md).

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

The site was migrated from Webflow in Feb 2026 and unified with kitaru.ai in May 2026, and some naming from those phases persists (`scripts/phase2/validate-content.ts` is the current validator; `webflow`/`notion` provenance blocks; the `.prose` class; retired standalone Kitaru forms, v1 surfaces and `/get-started` chooser that must not be recreated). Read [legacy-terminology.md](docs/agent-reference/legacy-terminology.md) before touching any of it.

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

Read [the architecture map](docs/agent-reference/site-architecture.md) for system primitives and template families, [key-files.md](docs/agent-reference/key-files.md) for the per-file map (core architecture, homepage, islands, API routes, Kitaru components, layouts, compare pages), and [labs-shell.md](docs/agent-reference/labs-shell.md) for every 2026 rebrand cutover (Labs shell + homepage, blog, research databases, product one-offs, integrations + features, get-started). Contracts: use SpaceStep tokens (including mlg), absence instead of show* booleans, and paired Astro/TSX twins for island consumers. New code must not use ad-hoc classOverrides; use named family presets. Template alternatives require discriminated unions or `?: never`, never optional-prop bags hidden by `as` casts. Register new templates.

Essentials:
- `astro.config.ts` (Astro config), `src/content.config.ts` (Zod schemas; it reads `categories/`, `tags/` at config eval time, so adding a taxonomy file needs a dev-server restart), `src/styles/global.css` (Tailwind v4 `@theme` + tokens: `:root` = Kitaru, `[data-app="zenml"]` overrides, `[data-app="labs"]` = the rebrand scope, `[data-tone]` section-tone layer)
- `src/lib/seo.ts` (SEO contract), `src/lib/constants.ts` (`SITE_URL`, `ASSET_BASE_URL`), `src/lib/analytics.ts` (`Surface` type; Segment loader in `consentConfig.ts`), `src/lib/navigation.ts` / `src/lib/footer.ts` (typed nav and footer data), `src/lib/homepage.ts` (homepage copy)
- Layouts: `src/layouts/BaseLayout.astro` (`app?: "zenml" | "labs"` sets `data-app` and swaps the chrome to the Labs shell in one move; `product?` tells the Labs nav which product the page is in; `surface` required), `BlogLayout.astro`, `DatabaseEntryLayout.astro`, `MinimalLayout.astro` (embeds, no chrome)
- Islands: `src/components/islands/` and `src/components/kitaru/islands/`; the authoritative mount list is `ISLAND_MOUNTS` in `scripts/check-dist-smoke.ts`. API routes: `src/pages/api/` (`prerender: false`)
- Compare pages: `src/components/compare/_layouts/ComparisonPage.astro` renders all 28 blocks-driven ZenML routes from each entry's `blocks[]`; the 15 MDX pages (`compare-kitaru`, `compare-zenml`) share its CSS bundle, so read the key-files entry and run `scripts/migrations/compare-blocks/parity.ts` before changing it
- `/projects/<slug>`: `src/lib/projectBody.ts` is deliberately minimal and golden-pinned; see key-files.md before "fixing" it
