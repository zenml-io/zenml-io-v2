# Repository Guidelines

## Project Structure & Module Organization
This is the unified ZenML × Kitaru marketing site. ZenML pages are the
default; Kitaru content lives under `/product/kitaru`, `/compare/kitaru-vs-*`,
and Kitaru-origin blog posts. See `CLAUDE.md` for the brand/surface model
and `MERGE_PLAN.md` for the merge plan + progress log.

- `src/` contains the Astro app:
  - `pages/` route files (`.astro`) and dynamic templates.
  - `pages/api/` server-side API routes (`prerender: false`). The merged site uses the unified form/API surface here (for example `forms/[formType].ts`, `csp-report.ts`, and `github-stars.ts`). The old standalone `kitaru.ai` API routes (`get-started`, `waitlist`, `newsletter`) were not carried forward. **Do NOT use `functions/`** — the Cloudflare adapter silently ignores it.
  - `components/` shared UI and `components/islands/` for hydrated Preact interactivity. Kitaru landing sections live in `components/kitaru/`; Kitaru-vs-X compare components in `components/compare/kitaru/`.
  - `content/` markdown CMS content, validated by the collection definitions in `src/content.config.ts`. Two compare collections: `compare/` (ZenML-vs-X, MLOps) and `compare-kitaru/` (Kitaru-vs-X, agents).
  - `lib/` typed utilities/data contracts. `analytics.ts` defines the surface taxonomy; `consentConfig.ts` contains the unified analytics script registry; shared form helpers live in `formTypes.ts`, `formValidation.ts`, and related form data modules.
  - `scripts/kitaru/` client-side scripts the Kitaru landing relies on.
  - `styles/global.css` Tailwind v4 theme tokens. `kitaru-compat.css` scopes Kitaru's OKLch tokens to `[data-app="kitaru"]`.
- `public/` stores static assets and edge config (`_redirects`, `_headers`).
- `scripts/` contains maintenance and validation tooling. Some directories retain legacy names (`phase2/`, `phase4/`, `phase6/`) from the original Webflow migration — these tools are still active (e.g., `pnpm validate:content` runs `scripts/phase2/validate-content.ts`).
- `docs/MIGRATION.md` (Webflow → Astro, Feb 2026) and `docs/kitaru-seo-inventory.md` (Phase 10a redirect audit template) are historical / operational docs, not architecture authority.
- `design/` and `scripts/internal/` are internal artifacts and are gitignored; do not commit from them.

## Build, Test, and Development Commands
- `pnpm install` installs dependencies.
- `pnpm dev` starts local dev server at `http://localhost:4321`.
- `pnpm build` runs Astro build and Pagefind indexing (`dist/` output).
- `pnpm preview` serves `dist/` through the checked-in Cloudflare Workers configuration.
- `pnpm check` runs Astro/TypeScript checks for site source.
- `pnpm check:tests` type-checks tests, Vitest config, and the dist smoke script.
- `pnpm check:surface` verifies pages/components declare their analytics surface.
- `pnpm check:alt` verifies image alt-text coverage.
- `pnpm check:registry` validates the rebrand template registry (`src/lib/templates/registry.ts`) against the files on disk — every registered `componentPath` resolves, no orphan template components, no duplicate ids.
- `pnpm lint` runs Biome checks on configured source, test, config, and smoke-script files.
- `pnpm test` runs the Vitest suite once.
- `pnpm smoke:dist` smoke-tests `dist/` after `pnpm build`, including that every Preact island is still mounted on its pages with its bundle on disk.
- `pnpm check:worker` starts Wrangler locally from `wrangler.jsonc` and checks the generated Astro Worker, static assets, redirects, headers, 404, and API routes. Run it after `pnpm build` for Worker runtime or deployment changes.
- `pnpm check:worker-bindings -- <metadata.json>` refuses promotion metadata that does not contain both required form-secret bindings.
- `pnpm check:islands` serves `dist/` and drives a real Chromium to prove the Preact islands actually **hydrate** (become interactive) — an island can ship perfect markup and still be inert. Needs `pnpm exec playwright install chromium` on first run.
- `pnpm lint:fix` auto-fixes lint issues.
- `pnpm format` formats configured files with Biome.
- `pnpm validate:content` runs content schema and consistency checks.

## Coding Style & Naming Conventions
- Use TypeScript + Astro with 2-space indentation (see `biome.json`).
- Keep components in PascalCase (for example `BlogCard.astro`, `LLMOpsFilter.tsx`).
- Use kebab-case for content slugs/filenames in `src/content/`.
- Prefer typed data modules in `src/lib/` over hardcoded copy in components.
- Use `.md` for content files (not `.mdx`). The `compare-kitaru/` collection is the documented exception (inline component imports inherited from the Kitaru port).

## Testing Guidelines
- The root test suite runs with `pnpm test`.
- Minimum quality gate before PR: `pnpm check && pnpm check:tests && pnpm check:surface && pnpm check:alt && pnpm check:registry && pnpm lint && pnpm test && pnpm build && pnpm smoke:dist && pnpm check:worker && pnpm check:islands`. PR CI enforces these in the required `Repo checks` job and packages that exact validated artifact — except `pnpm check:registry`, which is **not yet in that job** (wiring it in touches the trusted workflow mirror and its blob-SHA pin, a reviewed release-boundary change; see `CLAUDE.md`): run it locally until then. A trusted workflow may upload an isolated, inactive preview afterward for eligible same-repository PRs, but preview upload is not the required merge gate.
- Before pushing code changes, run the same local gates that CI runs: `pnpm check`, `pnpm check:tests`, `pnpm check:surface`, `pnpm check:alt`, `pnpm check:registry`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm smoke:dist`, `pnpm check:worker`, then `pnpm check:islands` (or the combined command above). If you edit code after running any check, rerun the affected check before pushing. Documentation-only edits can skip the build unless they change generated content or site behavior.
- Worker release changes follow `docs/worker-release-runbook.md`. CI, preview upload, production-candidate upload, exact-version activation, and production route attachment remain separate actions. Never add Cloudflare credentials to the branch-controlled build job. After the accepted Worker cutover, the trusted default-branch release workflow may upload the exact validated `main` artifact and activate it in separate GitHub-environment jobs after provenance, binding, topology, and baseline checks; route attachment remains a separate action.
- For content-heavy changes, also run `pnpm validate:content`.
- If you edit code after running checks, rerun the affected checks.

## Commit & Pull Request Guidelines
- Follow existing commit style: imperative, concise subject lines (`Fix ...`, `Add ...`, `Update ...`).
- Keep commits focused; stage only relevant files.
- **`CLAUDE.md` and `AGENTS.md` are kept in sync**: any change to conventions, commands, or quality gates in one must be checked against — and reflected in — the other in the same commit.
- Do **not** commit intermediate planning/review artifacts by default. Files under `docs/plans/`, `docs/reviews/`, `prompt-exports/`, or similar orchestration scratch locations are working notes unless the user explicitly asks to keep them. Before committing, check `git status --short` and leave unrelated or intermediate plans/reviews unstaged.
- PR descriptions should be friendly and reviewer-oriented. Include: a short summary; grouped feature/change bullets; a “what reviewers should focus on” section for gnarly or judgement-heavy areas; validation commands/review loops run; and concrete preview URLs or paths to check when relevant.
- Do not hard-wrap PR descriptions at a fixed column width. Keep each paragraph and each bullet on one source line, use blank lines between logical blocks, and let GitHub wrap the rendered text for the viewer.
- PRs should include screenshots for UI changes.
- Verify redirects/canonicals when URL or SEO-related files change.

## Images & Assets (Two-Tier System)
- **UI/static assets** (`public/images/`): logos, icons, favicons, backgrounds. Reference as `"/images/filename.svg"` (root-relative). Just place the file in `public/images/`.
- **Third-party service logos**: follow the `add-service-logo` skill in the ZenML frontend monorepo (`.claude/skills/add-service-logo/SKILL.md`) for current-mark sourcing, 24x24 normalization, and mandatory rendered review before integration. Preserve full-color brand marks rather than recoloring them.
- **Content/CMS images** (R2 bucket): blog heroes, screenshots, team photos, OG images. Must be **absolute URLs** — content schemas enforce `z.string().url()`. Upload via `uv run scripts/r2-upload.py <file>`.
- **Alt text matters for SEO**: give every image descriptive, non-empty alt text (`<img>`, `mainImage`, `logo`) unless there's a clear reason not to (e.g. a decorative image already labelled by an adjacent `aria-label`).
- In `src/lib/*.ts` data files, build R2 URLs from `ASSET_BASE_URL` constant — never hardcode the R2 domain.
- New R2 uploads use the key prefix `content/uploads/{sha8}/{filename}`. Legacy assets from the original Webflow migration live under `webflow/...` and are still served.
- After uploading, always verify the URL returns HTTP 200 before committing.
- **Claude Code skill**: Use the `r2-image-upload` skill (`.claude/skills/r2-image-upload/SKILL.md`) for the full upload workflow.

## Contributing Blog Posts
- New blog posts go in `src/content/blog/<slug>.md` on a feature branch (`blog/<slug>`).
- Frontmatter must match the `blogSchema` in `src/content.config.ts`. The `webflow` field is NOT needed for new native posts.
- Author, category, and tag fields are slug references to their respective collections. If a referenced tag or author doesn't exist, create the `.md` file first. **Note:** adding a new file under `src/content/categories/` or `src/content/tags/` requires a `pnpm dev` restart — `referenceSlugSets` reads the directory at config eval time.
- For **Kitaru-themed posts** (anything about agents, durable execution, Kitaru launches/features), use `category: "kitaru"` and prepend `"kitaru"` to the tags array — that surfaces them on `/category/kitaru` and in the unified blog sidebar.
- All content images must be absolute R2 URLs. Upload via `uv run scripts/r2-upload.py`.
- **Claude Code skill**: Use the `blog-post-contributor` skill (`.claude/skills/blog-post-contributor/SKILL.md`) for the full workflow — supports both local markdown files and Notion pages as sources.

## Security & Configuration Tips
- Never commit secrets, API keys, infra IDs, or private notes.
- Store local secrets in `.env` (gitignored). See `.env.example` for required variables.
- Treat this repo as public by default.
- `docs/MIGRATION.md` documents how the site was migrated from Webflow — it is historical context, not current architecture guidance.
