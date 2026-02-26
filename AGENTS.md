# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the Astro app:
  - `pages/` route files (`.astro`) and dynamic templates.
  - `components/` shared UI and `components/islands/` for hydrated Preact interactivity.
  - `content/` markdown CMS content (all collections, validated by `src/content.config.ts`).
  - `lib/` typed utilities/data contracts (SEO, navigation, domain helpers).
  - `styles/global.css` Tailwind v4 theme tokens and global styles.
- `public/` stores static assets and edge config (`_redirects`, `_headers`).
- `functions/api/` contains Cloudflare Pages Functions (for forms).
- `scripts/phase2`, `scripts/phase4`, `scripts/phase6` hold migration/validation utilities.
- `design/` and `scripts/internal/` are internal artifacts and are gitignored; do not commit from them.

## Build, Test, and Development Commands
- `pnpm install` installs dependencies.
- `pnpm dev` starts local dev server at `http://localhost:4321`.
- `pnpm build` runs Astro build and Pagefind indexing (`dist/` output).
- `pnpm preview` serves the production build locally.
- `pnpm check` runs Astro/TypeScript checks.
- `pnpm lint` runs Biome checks on `src/`.
- `pnpm lint:fix` auto-fixes lint issues.
- `pnpm format` formats `src/` with Biome.
- `pnpm validate:content` runs content schema and consistency checks.

## Coding Style & Naming Conventions
- Use TypeScript + Astro with 2-space indentation (see `biome.json`).
- Keep components in PascalCase (for example `BlogCard.astro`, `LLMOpsFilter.tsx`).
- Use kebab-case for content slugs/filenames in `src/content/`.
- Prefer typed data modules in `src/lib/` over hardcoded copy in components.
- Use `.md` for content files (not `.mdx`).

## Testing Guidelines
- There is no dedicated unit-test suite in root scripts yet.
- Minimum quality gate before PR: `pnpm check && pnpm lint && pnpm build`.
- For content-heavy changes, also run `pnpm validate:content`.
- If you edit code after running checks, rerun the affected checks.

## Commit & Pull Request Guidelines
- Follow existing commit style: imperative, concise subject lines (`Fix ...`, `Add ...`, `Update ...`).
- Keep commits focused; stage only relevant files.
- PRs should include: purpose, changed routes/components, validation commands run, and screenshots for UI changes.
- Verify redirects/canonicals when URL or SEO-related files change.

## Images & Assets (Two-Tier System)
- **UI/static assets** (`public/images/`): logos, icons, favicons, backgrounds. Reference as `"/images/filename.svg"` (root-relative). Just place the file in `public/images/`.
- **Content/CMS images** (R2 bucket): blog heroes, screenshots, team photos, OG images. Must be **absolute URLs** — content schemas enforce `z.string().url()`. Upload via `uv run scripts/r2-upload.py <file>`.
- In `src/lib/*.ts` data files, build R2 URLs from `ASSET_BASE_URL` constant — never hardcode the R2 domain.
- New R2 uploads use the key prefix `content/uploads/{sha8}/{filename}`. Existing Webflow-migrated images live under `webflow/...`.
- After uploading, always verify the URL returns HTTP 200 before committing.
- **Claude Code skill**: Use the `r2-image-upload` skill (`.claude/skills/r2-image-upload/SKILL.md`) for the full upload workflow.

## Security & Configuration Tips
- Never commit secrets, API keys, infra IDs, or private notes.
- Store local secrets in `.env` (gitignored). See `.env.example` for required variables.
- Treat this repo as public by default.
