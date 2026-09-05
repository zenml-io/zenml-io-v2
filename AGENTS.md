# Repository Guidelines

This is the unified ZenML × Kitaru marketing site, built with Astro and Preact.
ZenML pages are the default; Kitaru lives under /product/kitaru,
/compare/kitaru-vs-*, and Kitaru-origin blog posts. See CLAUDE.md for brand
positioning; MERGE_PLAN.md records the merge history.

## Working Agreements
- Complete the requested work through relevant verification. Infer routine choices from the repository and source material, state material assumptions, and ask only when missing information changes the result or an action needs authorization. Continue independent authorized work while waiting.
- Skills describe procedures; they do not grant permission to commit, push, publish, upload, request reviews, or change account settings. Use authorization already given or clearly implied by the task; do not ask for it again. An audit request authorizes an audit, not its proposed edits.
- Explicit user instructions take precedence over skill guidance within applicable system and tool constraints. If an instruction prevents completion, name and link its file, quote the requirement, and explain what remains blocked.
- Keep shared engineering policy equivalent in AGENTS.md, CLAUDE.md, and their repo skill copies in the same commit. Tool-specific invocation paths may differ. Codex uses .agents/skills; Claude uses .claude/skills. Do not assume nested instruction files load for a task started at the repo root.

## Project Structure & Contracts
- Routes and server APIs live in `src/pages/` and `src/pages/api/` (`prerender: false`). Do not use `functions/`; the Cloudflare adapter ignores it. Shared UI lives in `src/components/`, hydrated Preact components in `islands/`, typed data in `src/lib/`, and CMS Markdown in `src/content/` with schemas in `src/content.config.ts`.
- Read [the architecture reference](docs/agent-reference/site-architecture.md) before changing routes, templates, design primitives, or rendering. The website-development skill routes to this and validation details. `docs/MIGRATION.md` and `docs/kitaru-seo-inventory.md` are historical/operational context, not architecture authority.
- System primitives use `--spacing-space-*` tokens (`SpaceStep`, including `mlg`); absence collapses layout without `show*` booleans. Keep island-consumed `.astro` and `.tsx` twins in lockstep through shared modules. New code must not pass ad-hoc `classOverrides`; use named family presets.
- Template arrangement selectors and mutually exclusive fields require discriminated unions or `?: never` exclusions. Never hide invalid combinations in bags of optional props narrowed by `as` casts. Register templates in `src/lib/templates/registry.ts`.
- The `[data-tone]` layer routes brand-owned `var()` values, never hex colors. Do not add a base `section[data-tone]` background rule; consumers set explicit background utilities. The styleguide derives values from global.css, the registry, and DESIGN.md; never hand-write design values into it.
- Preserve published URLs or add 301 redirects; verify canonicals and redirects for URL/SEO changes. Pass explicit analytics `surface=` to BaseLayout/MinimalLayout and use the taxonomy in `src/lib/analytics.ts`.

## Development Commands
- Use `pnpm install`, `pnpm dev` (localhost:4321), `pnpm check`, `pnpm lint`, `pnpm test`, and `pnpm build`. Package scripts are defined in package.json; [validation details](docs/agent-reference/validation.md) explains specialized checks.
- pnpm settings (`overrides`, `onlyBuiltDependencies`) belong in pnpm-workspace.yaml, never a `pnpm` field in package.json. `pnpm check:lockfile`, also run by tests, checks overrides against the lockfile.

## Coding Style & Naming Conventions
- Use TypeScript + Astro with 2-space indentation (see `biome.json`).
- Keep components in PascalCase (for example `BlogCard.astro`, `LLMOpsFilter.tsx`).
- Use kebab-case for content slugs/filenames in `src/content/`.
- Prefer typed data modules in `src/lib/` over hardcoded copy in components.
- Use `.md` for content files (not `.mdx`). The `compare-kitaru/` collection is the documented exception (inline component imports inherited from the Kitaru port).
- Before a code PR or substantial code commit, review changed code for reuse, clarity, and unnecessary work; use an available simplify skill or perform that review directly. Fix worthwhile findings and rerun affected checks.

## Testing Guidelines
- During implementation, run checks that exercise the changed behavior. Before pushing code or opening a code PR, run the full gate below once on the final relevant state. Mixed code/content changes use the full gate, plus content validation when applicable.
- Pure instruction or documentation changes that do not alter generated content, executable scripts, or site behavior need diff, reference, and instruction-consistency checks; no application build or test suite is required. Rendered content-only changes require `pnpm validate:content`, `pnpm check`, `pnpm build`, and `pnpm smoke:dist`, plus browser inspection of changed pages and redirect/canonical checks when relevant. CI remains unchanged and may run broader checks.
- After later edits, rerun affected checks. Once required checks pass, broaden testing only for a new change, failure, or unresolved concern. Test observable behavior; do not add tests that merely repeat the implementation. Report passed, failed, and blocked checks separately; establish current baseline evidence before calling a failure pre-existing.
- Full code gate: `pnpm check && pnpm check:tests && pnpm check:surface && pnpm check:alt && pnpm check:registry && pnpm lint && pnpm test && pnpm build && pnpm smoke:dist && pnpm check:worker && pnpm check:islands`.
- `pnpm check:registry` is required locally but not yet in the required CI `Repo checks` job. Adding it there changes the trusted workflow mirror and blob-SHA pin and needs a reviewed release change. Preview upload is not the merge gate.
- Review intended rendered-content and OG golden changes before committing them; investigate unexpected differences rather than accepting new snapshots. Hydration requires `pnpm check:islands`; build and smoke markup checks alone do not prove interactivity.
- Worker changes follow [the release runbook](docs/worker-release-runbook.md). CI, preview upload, candidate upload, activation, and route attachment are separate actions. Never add Cloudflare credentials to the branch-controlled build job. Production release consumes the exact validated main artifact through separate upload/activation jobs with provenance, binding, topology, and baseline checks.
- Read [validation details](docs/agent-reference/validation.md) for command coverage, browser setup, snapshots, and release checks. Capture long build output in a log and check the actual process exit status; foreground or background execution is fine.

## Commit & Pull Request Guidelines
- Use focused commits with imperative subjects (`Fix ...`, `Add ...`, `Update ...`). Verify the checkout and working state; stage only task-relevant files.
- Do not commit intermediate plans/reviews by default (docs/plans/, docs/reviews/, prompt-exports/); include them only when the user requests it. Keep unrelated changes unstaged. Never commit from design/ or scripts/internal/; these are gitignored internal artifacts.
- PR descriptions lead with the problem and resulting behavior, then grouped changes and validation. Add reviewer-focus guidance for judgment-heavy changes and preview paths/screenshots for UI changes. Scale detail to the change.
- Do not hard-wrap PR descriptions: one logical line per paragraph or bullet, with blank lines between blocks. Match existing wrapping when editing Markdown files.

## Images & Assets
- Static UI assets (logos, icons, favicons, backgrounds) go in public/images/ with root-relative URLs. CMS images go to R2 and must use absolute URLs. In src/lib/*.ts, build R2 URLs from ASSET_BASE_URL; never hardcode the domain.
- **Third-party service logos:** locate the `zenml-frontend-monorepo` checkout, then read `.claude/skills/add-service-logo/SKILL.md` there before sourcing or integrating a logo. Try the sibling checkout first; if absent, use available project discovery. If unavailable, report the missing skill and continue unrelated work. Preserve full-color marks, normalize to 24x24, and obtain user approval of the rendered result before integration; do not bypass that review.
- Give images descriptive, non-empty alt text unless decorative and already labeled. Prefer AVIF for in-page content images and a separate JPEG URL for seo.ogImage.
- New uploads default to `content/uploads/{sha8}/{filename}`; task-specific `--prefix` values such as `content/blog/<slug>` are supported. Legacy webflow/ assets remain served; do not move them. Verify every uploaded URL returns HTTP 200 before committing references.
- Use [r2-image-upload](.agents/skills/r2-image-upload/SKILL.md) for upload steps after authorization.

## Contributing Blog Posts
- Use [blog-post-contributor](.agents/skills/blog-post-contributor/SKILL.md) to import Markdown or Notion content into src/content/blog/<slug>.md on a blog/<slug> branch. Reuse an explicitly authorized feature branch rather than switching a user's active checkout.
- Match blogSchema in src/content.config.ts; webflow metadata is unnecessary for native posts. Resolve author/category/tag slugs against their collections; create missing authors/tags from supplied facts. Restart pnpm dev after adding categories/tags because referenceSlugSets loads at config evaluation.
- For Kitaru posts, use category: "kitaru" and make "kitaru" the first tag. Preserve source authorship and intended publication state. Missing cover art blocks readiness to publish, not independent content preparation; do not invent image URLs.

## Security & Configuration
- Treat this repo as public. Never commit secrets, API keys, infrastructure IDs, internal URLs, traffic numbers, or private notes.
- Use credentials only for the authorized task. Do not automatically persist supplied credentials. When persistence is requested or required for an authorized local setup, use gitignored .env and only the necessary keys; never print their values. See .env.example for variable names.
