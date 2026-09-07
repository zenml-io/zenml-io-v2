# Site Architecture Reference

Read for route, template, design-system, or rendering changes. Root AGENTS.md
and CLAUDE.md define shared policy; this file provides the detailed map. Paths
below are relative to the repository root (src/ child entries to src/).

Additional layout contracts: Split emits prose-first DOM, uses minmax(0, nfr)
ratio tracks, and accepts ResponsiveSpace. PageHeader supports six collapsing
arrangements; ProcessSteps uses semantic ordered lists. RelatedRail is static,
not an island. Styleguide-only demo variations include hex-corner cards; consult
each registry entry's notes before changing live-page arrangements.

This is the unified ZenML × Kitaru marketing site. ZenML pages are the
default; Kitaru content lives under `/product/kitaru`, `/compare/kitaru-vs-*`,
and Kitaru-origin blog posts. See `CLAUDE.md` for the brand/surface model
and `MERGE_PLAN.md` for the merge plan + progress log.

- `src/` contains the Astro app:
  - `pages/` route files (`.astro`) and dynamic templates.
  - `pages/api/` server-side API routes (`prerender: false`). The merged site uses the unified form/API surface here (for example `forms/[formType].ts`, `csp-report.ts`, and `github-stars.ts`). The old standalone `kitaru.ai` API routes (`get-started`, `waitlist`, `newsletter`) were not carried forward. **Do NOT use `functions/`** — the Cloudflare adapter silently ignores it.
  - `components/` shared UI and `components/islands/` for hydrated Preact interactivity (`islands/shared/` holds pieces both filter islands consume). Kitaru landing sections live in `components/kitaru/`; Kitaru-vs-X compare components in `components/compare/kitaru/`.
  - `components/system/` — the #248 substrate primitives (`SectionIntro`, `Breadcrumb` with built-in BreadcrumbList JSON-LD, `EmptyState`, and the `layout/` set `Stack`/`Inline`/`Split`/`Bleed`/`Grid`). Absence collapses (no `show*` booleans); spacing via the `--spacing-space-*` tokens only (8 steps, `xxs`–`xxl` incl. `mlg` = 40px); island-consumed primitives ship `.astro` + `.tsx` twins in lockstep via a shared module; `classOverrides` is a migration-parity escape hatch — new code must not pass ad-hoc override objects, but may pass a named family preset (`SECTION_INTRO_PRESETS`, `templates/pageHeaderPresets.ts`). Contract types in `lib/section.ts`. The `[data-tone]` layer in `global.css` routes only brand-owned `var()`s — never a hex — and has no `section[data-tone]` base rule on purpose; tone consumers set explicit `bg-[var(--section-surface)]`-style utilities.
  - `components/templates/` — the #249 Wave 2 section families on that substrate, registered in `src/lib/templates/registry.ts`: `PageHeader`, `ProcessSteps`, `MetadataBlock`/`SpecTable`/`DescriptionList`/`StackedList` (`DescriptionList` has a `spaced` and a `divided` frame with per-frame value-kind unions), `RelatedRail`, `TermHubEditorial`/`TermHubEntryIndex`/`TermHubCatalog`, plus `pageHeaderPresets.ts` (named family presets; plain `.ts` helpers are exempt from `check:registry`), and the #250 Wave 3 page-type templates: `ConversionShell` (conversion-utility shells) and `LegalArticle` (legal-page article header for the `legal` collection). Live routes render current-brand parity arrangements; the drawn new-brand states (zero-padded numerals, leading meta separators, stacked entry lists, sticky spec-table first column) are demo/cutover paths exercised on `/styleguide` via registry `demoProps`, with each deviation documented in the entry's `notes`. Prop contracts are type-enforced, not documented: an arrangement-selecting prop (e.g. `layout`) or a mutually-exclusive field pair (e.g. `cards`/`items`) gets a discriminated union `Props` (or an `?: never`-excluded union for keyless either/or pairs) — never a widened bag of optionals narrowed by `as` casts in the body; `astro check` is the only enforcement layer template props have (see `ProcessSteps.astro` / `TermHubEntryIndex.astro` for the two shapes). Related-entry scoring is consolidated in `lib/relatedIndex.ts` (wrapped by `llmops.ts`/`mlops.ts`); `lib/relatedIndex.ts` also holds the `filterUsedTerms` zero-entry hub filter; `lib/blog.ts` keeps `getRelatedPosts`; `lib/chipStyles.ts` holds the shared chip color variants. `lib/projectBody.ts` holds the `/projects/<slug>` details converter — deliberately minimal, pinned by two rendered-content goldens; project `pipelines`/`stackHtml` live in frontmatter, migrated by a one-off script under `scripts/migrations/`.
  - `content/` markdown CMS content, validated by the collection definitions in `src/content.config.ts`. Two compare collections: `compare/` (ZenML-vs-X, MLOps) and `compare-kitaru/` (Kitaru-vs-X, agents).
  - `lib/` typed utilities/data contracts. `analytics.ts` defines the surface taxonomy; `consentConfig.ts` contains the unified analytics script registry; shared form helpers live in `formTypes.ts`, `formValidation.ts`, and related form data modules.
  - `scripts/kitaru/` client-side scripts the Kitaru landing relies on.
  - `styles/global.css` Tailwind v4 theme tokens; `[data-app="zenml-next"]` holds the in-progress 2026 rebrand scope (type roles + palette), consumed only by `/styleguide` so far. `kitaru-compat.css` scopes Kitaru's OKLch tokens to `[data-app="kitaru"]`.
  - `pages/styleguide.astro` + `lib/styleguide.ts` + `lib/designRules.ts` + `components/styleguide/` — the generated design-system reference (unlisted, noindex). Derived at build time from `global.css`, the template registry, and DESIGN.md; never hand-write design values into it.
- `public/` stores static assets and edge config (`_redirects`, `_headers`).
- `scripts/` contains maintenance and validation tooling. Some directories retain legacy names (`phase2/`, `phase4/`, `phase6/`) from the original Webflow migration — these tools are still active (e.g., `pnpm validate:content` runs `scripts/phase2/validate-content.ts`).
- `docs/MIGRATION.md` (Webflow → Astro, Feb 2026) and `docs/kitaru-seo-inventory.md` (Phase 10a redirect audit template) are historical / operational docs, not architecture authority.
- `design/` and `scripts/internal/` are internal artifacts and are gitignored; do not commit from them.
