# ZenML Website v2 — Migration from Webflow

## Project Overview

We are migrating zenml.io from Webflow to a self-hosted solution. The goal is
a **1:1 copy** of the current site in a version we fully control and can
customize freely.

- **Current site**: www.zenml.io (Webflow, site ID: `64a817a2e7e2208272d1ce30`)
- **Traffic**: ~7k unique visitors / ~10k page views per week (and growing)
- **Hosting target**: Cloudflare Pages (confirmed, deployed at `zenml-io-v2.pages.dev`)
- **Context**: This is being built as part of a Claude hackathon using Opus 4.6
- **Status**: Phase 0 complete. Phase 1 (Content Export & Transform) starting.

## Key Constraints

- **No broken links** — all existing URLs must be preserved or 301-redirected
- **SEO preservation** — keep slugs, meta tags, Open Graph data intact
- **CMS data must migrate** — 20 collections, ~2,340 items total
- **Largest collection**: LLMOps Database (1,453 items) — filter-heavy UI
- **Blog**: 317 posts with categories, tags, and authors
- **Asset migration**: all images/files must be re-hosted (Webflow URLs will
  break if the site is deleted)

## Content Architecture (Webflow)

Full inventory is in `docs/webflow-inventory.md`.

### Major CMS Collections

| Collection         | Items  | Slug              |
|--------------------|--------|--------------------|
| LLMOps Databases   | 1,453  | llmops-database    |
| Blog Posts         | 317    | blog               |
| Blog Tags          | 118    | tags               |
| LLMOps Tags        | 107    | llmops-tags        |
| Project Tags       | 80     | project-tags       |
| Integrations       | 68     | integrations       |
| Advantages         | 45     | advantages         |
| Blog Authors       | 27     | author             |
| Team Members       | 22     | team               |
| VS Pages           | 17     | compare            |
| Integration Types  | 17     | integration-type   |
| Industry Tags      | 17     | industry-tags      |
| Projects (new)     | 16     | projects           |
| Blog Categories    | 14     | category           |
| Old Projects       | 11     | old-projects       |
| Quotes             | 6      | quotes             |
| Product Categories | 5      | product-categories |

### Page Types

- **Static pages**: ~44 published (home, pricing, features, company, etc.)
- **CMS template pages**: ~20 (one per collection)
- **Draft pages**: ~13 (old versions, test pages, upcoming pricing)
- **Case study pages**: 5 (under /case-study/)
- **Feature detail pages**: ~12 (under /features/)
- **VS comparison pages**: 3 static + 17 CMS-driven (under /vs/ and /compare/)

## Tech Stack (Decided)

| Layer | Choice |
|-------|--------|
| Framework | **Astro** (TypeScript) — static-first, content collections, islands |
| Content | **Markdown/MDX in git** — Astro Content Collections with typed schemas |
| Hosting | **Cloudflare Pages** — edge CDN, branch previews, auto CI/CD |
| Assets | **Cloudflare R2** — object storage for images/files |
| Styling | **Tailwind CSS** — utility-first |
| Interactive | **Preact islands** — for LLMOps filter and other client-side widgets |
| Search | **Pagefind** (later) — build-time search index, no server |
| Forms | Cal.com embeds + Cloudflare Workers (architecture decided, see `docs/forms-audit.md`) |
| Analytics | **Plausible** (keep existing) |
| CRM | **Attio** (keep existing) |
| Design approach | Pixel-perfect recreation first, then iterate |

## Webflow MCP Access

We have a Webflow MCP server connected. Use the `mcp__webflow__*` tools to
query the live site. The site ID is `64a817a2e7e2208272d1ce30`.

## Key Technical Decisions

| Decision | Value |
|----------|-------|
| Trailing slash | `never` — matches Webflow behavior, locked in `astro.config.ts` |
| Canonical domain | `www.zenml.io` (bare `zenml.io` redirects to www) |
| Migration strategy | Full cutover (not strangler) — build complete site, switch DNS |
| Asset URLs (POC) | `r2.dev` URLs for now; switch to `assets.zenml.io` when DNS moves to Cloudflare |
| Image optimization | Upload 1:1 for now; convert to WebP/AVIF post-launch |

## Infrastructure (Phase 0)

- **Cloudflare Pages**: `zenml-io-v2.pages.dev` (production), branch previews auto-deploy
- **Cloudflare R2**: bucket `zenml-assets` (public access not yet enabled)
- **CI/CD**: GitHub Actions — push to `main` → production, PRs → preview branches
- **Preview SEO**: Cloudflare auto-adds `X-Robots-Tag: noindex` on preview URLs

## Development Conventions

- `docs/` folder is for plan docs and investigations — **committed to git**
- `design/` folder is for heavy artifacts only (exports, screenshots, JSON dumps) — **never commit to git**
- Phase 1 scripts go in `scripts/phase1/` as TypeScript, run via `pnpm exec tsx`
- Make targeted git commits (only relevant files)
- After running tests, re-run them if you make subsequent changes

## Plan Management

- The master migration plan lives at `docs/plan.md` — **keep it updated** as
  phases progress (check off completed tasks, update status line at top)
- When starting a new phase, create a detailed plan at
  `docs/phase-N-plan.md` before writing code
- Use the **task/todo list** to track in-progress work within a phase so
  nothing gets forgotten across sessions
- When a phase is complete, update `docs/plan.md` to reflect that and note
  any learnings or changes to the plan

## Skills & Automation

- **Proactively suggest creating Claude Code skills** when a task becomes
  repetitive (e.g., publishing content, uploading assets, running checks)
- Ask the user: "Should we create a skill/slash command for this?" before
  building one
- Skills help the whole team (devs + designer + content people) work faster
  with Claude Code
- Likely skill candidates are listed at the bottom of `docs/plan.md`

## Key Files

- `docs/plan.md` — **Master migration plan** (phases, decisions, content model)
- `docs/phase-0-plan.md` — Phase 0 detailed plan (complete)
- `docs/phase-1-plan.md` — Phase 1 detailed plan (Content Export & Transform)
- `docs/investigation_1.md` — Research on what others used to replace Webflow
- `docs/investigation_2.md` — Practical playbook for the migration
- `docs/webflow-inventory.md` — Full inventory of the Webflow site
- `docs/forms-audit.md` — Forms architecture audit (8 types, 4 categories)
- `docs/custom-code-audit.md` — Third-party scripts audit (14 services, 20 scripts)
- `docs/design-tokens.md` — Extracted design tokens reference
