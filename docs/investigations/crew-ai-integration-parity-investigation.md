# Investigation: CrewAI Integration Page Webflow Parity Gap

## Summary
The CrewAI detail page is not incomplete because of missing migrated data; it is incomplete because the Astro template omits key Webflow sections and no longer renders `overviewTitle` in the main content area. The page currently jumps straight to the final CTA rail and skips the intermediate CTA stack present in Webflow/production.

## Symptoms
- `/integrations/crew-ai` on `zenml-io-v2.pages.dev` appears shorter and less complete than `https://www.zenml.io/integrations/crew-ai`.
- Visual mismatch in upper styling (hero label) and lower-page CTA flow.
- Missing “Learn how to run on …” and “Unify Your ML and LLM Workflows” sections in the Astro version.

## Investigation Log

### Phase 1 - Initial assessment
**Hypothesis:** Data migration dropped CrewAI fields during Webflow → content transform.
**Findings:** CrewAI structured fields exist in final content and schema.
**Evidence:**
- `design/migration/phase1/runs/2026-02-11T0626Z/webflow/items/integrations/live.json:333-387` contains `title`, `description`, features/tool/code fields, link labels, additional resource.
- `src/content/integrations/crew-ai.md:31-43` contains `overviewTitle`, `overviewDescription`, `featuresWithZenmlHtml`, `toolFeaturesHtml`, `codeExampleHtml`.
- `src/content.config.ts:354-355` includes `overviewTitle`/`overviewDescription` schema fields.
- `scripts/phase6/migrate-integration-fields.ts:104-107` explicitly maps Webflow `title` → `overviewTitle`.
**Conclusion:** Eliminated. Data is present.

### Phase 2 - Template parity analysis
**Hypothesis:** Astro render logic does not map all Webflow sections.
**Findings:** Confirmed. `overviewTitle` is never rendered in current detail template, and lower CTA sections are absent.
**Evidence:**
- `src/pages/integrations/[slug].astro:64-69` structured-content gate excludes `d.overviewTitle`.
- `src/pages/integrations/[slug].astro:159-166` renders `d.shortDescription` as lead H2 + `d.overviewDescription` paragraph; no `d.overviewTitle` usage anywhere in file.
- `src/pages/integrations/[slug].astro:240-267` only renders one bottom CTA section (logo rail + Use Open Source + See All).
- `design/webflow-export-latest-2026-02-23/extracted/detail_integrations.html:814` has `uui-section_layout01` (“Learn how to run on …”).
- `design/webflow-export-latest-2026-02-23/extracted/detail_integrations.html:837` has `uui-section_cta02` (“Unify Your ML and LLM Workflows”).
- `design/webflow-export-latest-2026-02-23/extracted/detail_integrations.html:901` has the CTA08-style “Connect Your ML Pipelines …” section (which Astro does render).
**Conclusion:** Confirmed root cause area: template omissions + heading mapping mismatch.

### Phase 3 - Style/visibility sanity check
**Hypothesis:** Content exists but is hidden by CSS.
**Findings:** No evidence that missing sections are hidden; sections are not rendered in markup.
**Evidence:**
- `src/pages/integrations/[slug].astro` contains no `hidden`/`invisible` section-level classes for missing CTA blocks.
- `src/styles/global.css:215` has `visibility:hidden` only for tooltip text (`.prose .tooltip .tooltiptext`).
- Webflow hero label style exists as `.zen-heading-with-bg` in `design/webflow-export-latest-2026-02-23/extracted/css/zenml.webflow.css:1120`, but no matching class usage in Astro hero (`src/components/integrations/IntegrationDetailHero.astro`).
**Conclusion:** Eliminated for core issue. CSS differences are secondary visual parity issues.

### Phase 4 - Git forensics
**Hypothesis:** Divergence introduced by recent detail-page edits.
**Findings:** `overviewTitle` demotion/removal happened in February 2026 detail-page iteration; missing lower CTA stack appears to be omitted from initial Astro rebuild.
**Evidence:**
- `git log -- src/pages/integrations/[slug].astro` shows key commits: `2294889`, `82a7996`, `c0583f4`.
- `git diff 82a7996^..82a7996 -- src/pages/integrations/[slug].astro` shows `overviewTitle` demoted from prominent heading to small eyebrow.
- `git diff c0583f4^..c0583f4 -- src/pages/integrations/[slug].astro` shows switch to `shortDescription` lead H2 and continued absence of `overviewTitle` render.
- `git blame src/pages/integrations/[slug].astro -L 159,167` attributes lead heading block to `c0583f4`.
- `git blame src/pages/integrations/[slug].astro -L 240,267` shows bottom CTA stack rooted in `2294889`; no evidence that CTA02/layout01 were later removed from this file.
**Conclusion:** Part regression (heading mapping changes), part initial parity gap (missing lower CTA stack never ported into detail template).

## Root Cause
Two separate template-level causes combine into the observed “incomplete page” effect:
1. **Field-render mismatch:** `overviewTitle` is migrated and stored but not rendered in `src/pages/integrations/[slug].astro`; `shortDescription` is used repeatedly as prominent text.
2. **Section parity gap:** The Astro detail template includes only the final CTA08-like section and omits two Webflow sections (`uui-section_layout01` and `uui-section_cta02`) that exist in exported template and production behavior.

## Eliminated Hypotheses
- **Migration/data-loss issue:** eliminated (fields are present in content).
- **Schema validation dropping fields:** eliminated (schema includes fields).
- **CSS hiding existing sections:** eliminated for missing blocks (markup not present).

## Recommendations
1. **Render `overviewTitle` in detail content and include it in structured gate**
   - File: `src/pages/integrations/[slug].astro`
   - Use `overviewTitle` as lead H2 (fallback to `shortDescription` only when needed).
   - Update `hasStructuredContent` to include `d.overviewTitle`.
2. **Add missing detail-page CTA sections for parity**
   - File: `src/pages/integrations/[slug].astro`
   - Insert “Learn how to run on {integration}” block (Webflow `uui-section_layout01`) after main content and before final CTA rail.
   - Insert CTA02 block (“Unify Your ML and LLM Workflows”), likely by reusing markup from `src/pages/integrations/index.astro:121-158`.
3. **Optional visual parity enhancement**
   - File: `src/components/integrations/IntegrationDetailHero.astro`
   - Add/use `.zen-heading-with-bg` style (values in Webflow CSS at `.../zenml.webflow.css:1120`) for the “Integrations” eyebrow label.

## Preventive Measures
- Add a parity checklist for migrated templates that verifies required section sequence (hero/header/sidebar/content/layout01/cta02/cta08).
- Add snapshot-based visual regression checks for one canonical integration page (e.g., CrewAI) against expected section markers.
- Add a content/template contract test asserting that key migrated fields (`overviewTitle`, `overviewDescription`, CTA-related fields) are either rendered or intentionally deprecated with documented rationale.

## Implementation Update (2026-02-24)
Applied parity fixes in:
- `src/pages/integrations/[slug].astro`
- `src/components/integrations/IntegrationDetailHero.astro`

Implemented changes:
- Replaced `hasStructuredContent` with structured/mixed rendering strategy and intro heading logic.
- Added `overviewTitle`-aware intro heading fallback behavior.
- Added missing detail-page sections before bottom rail CTA:
  - layout01-style “Learn how to run on …” block
  - CTA02 “Unify Your ML and LLM Workflows” block
- Updated hero eyebrow to `.zen-heading-with-bg` style (component-scoped CSS).

Validation run results:
- `pnpm build`: ✅ passed
- `pnpm exec biome check 'src/pages/integrations/[slug].astro' src/components/integrations/IntegrationDetailHero.astro`: ✅ passed
- `pnpm check`: ❌ fails due broad pre-existing repository TypeScript issues outside this change (e.g. `demo-video/*`, `src/pages/pro.astro`, `src/layouts/BlogLayout.astro`).
- `pnpm lint`: ❌ fails due broad pre-existing Biome formatting/import-order issues in many unrelated files under `src/`.
