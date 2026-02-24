# Investigation: CrewAI Integration Production Parity (Second Pass)

## Summary
The page diverged because we overfit to historical Webflow-export structure instead of current live production behavior. The current Astro template renders sections that production keeps hidden and prioritizes `overviewTitle` for the main body heading, while production uses `shortDescription`.

## Symptoms
- Our page shows an extra top hero lockup before the header row.
- Our main body H2 is `Conversational Agent Framework` instead of `CrewAI multi-agent crew framework integrated with ZenML`.
- Our page renders extra lower sections (“Learn how to run on …” and “Unify Your ML and LLM Workflows”) that are not visible on production.

## Investigation Log

### 2026-02-24 / Phase 1 - Initial assessment
**Hypothesis:** We implemented parity against stale template assumptions.
**Findings:** Confirmed likely over-correction from recent commit.
**Evidence:**
- `src/pages/integrations/[slug].astro` currently includes top hero, `overviewTitle`-first heading logic, layout01 and CTA02 sections.
- Recent commit history shows major additions in `106d03e`.
**Conclusion:** Needs systematic evidence + rollback plan.

### 2026-02-24 / Phase 2 - Context-builder architecture review
**Hypothesis:** Differences are template composition + heading mapping, not migration data.
**Findings:** Confirmed. The selected context maps all mismatches to `src/pages/integrations/[slug].astro`.
**Evidence:**
- `src/pages/integrations/[slug].astro:109-115` renders `<IntegrationDetailHero ... />` above header row.
- `src/pages/integrations/[slug].astro:70-72` derives `introH2` from `overviewTitle` when “meaningful”.
- `src/pages/integrations/[slug].astro:272-357` renders layout01 + CTA02.
**Conclusion:** Primary root-cause file is `[slug].astro`.

### 2026-02-24 / Phase 3 - Live production evidence
**Hypothesis:** Production still contains older Webflow blocks in HTML but hides them with condition classes.
**Findings:** Confirmed.
**Evidence:**
- Live production fetch (`https://www.zenml.io/integrations/crew-ai`) contains:
  - `uui-page-padding-top w-condition-invisible` (top lockup wrapper hidden)
  - `uui-section_layout01 w-condition-invisible` (layout01 hidden)
  - nested `uui-section_cta02` inside hidden layout01 block
- Regex extraction from production HTML:
  - `integration-content h2` = `CrewAI multi-agent crew framework integrated with ZenML`
  - `layout01 h1` = `Conversational Agent Framework`
  - `layout01 classes` = `uui-section_layout01 w-condition-invisible`
**Conclusion:** Our Astro page made hidden production content visible and used the wrong heading source.

### 2026-02-24 / Phase 4 - Git forensics
**Hypothesis:** The current mismatch was introduced by the recent parity commit.
**Findings:** Confirmed for heading logic and lower sections; top hero inclusion predates this but is still a parity mismatch.
**Evidence:**
- `git diff 106d03e^..106d03e -- src/pages/integrations/[slug].astro` adds:
  - `introH2` derived from `overviewTitle`
  - layout01 section
  - CTA02 section
- `git blame src/pages/integrations/[slug].astro -L 64,92` attributes heading logic + `learnHow*` vars to `106d03e`.
- `git blame src/pages/integrations/[slug].astro -L 272,335` attributes layout01 + CTA02 rendering to `106d03e`.
- `git blame src/pages/integrations/[slug].astro -L 108,115` shows top hero inclusion from older commit `2294889`.
**Conclusion:** Fix is a focused rollback in `[slug].astro` to match current production output.

## Root Cause
Two things combined:
1. **Source-of-truth mismatch:** We treated static/historical Webflow-export structure as the parity target.
2. **Template behavior mismatch:** In Astro, we rendered formerly-hidden sections unconditionally and prioritized `overviewTitle` for the visible body heading.

Production behavior uses the header row + main content + bottom tools rail flow, with `shortDescription` as the main visible body H2.

## Recommendations
1. In `src/pages/integrations/[slug].astro`, remove the top hero inclusion:
   - delete `import IntegrationDetailHero ...`
   - delete `<IntegrationDetailHero ... />` block (`lines 109-115` currently)
2. Revert heading logic to shortDescription-first:
   - remove `overviewTitle`-prioritization and `renderMixed`
   - set lead H2 from `d.shortDescription?.trim()`
3. Remove extra lower sections:
   - delete layout01 block (`lines 272-305` currently)
   - delete CTA02 block (`lines 307-357` currently)
   - delete now-unused `learnHow*` variables (`lines 85-92` currently)
4. Keep existing bottom "Connect Your ML Pipelines to a World of Tools" section unchanged.

## Preventive Measures
- Treat **live production behavior** as canonical for parity work; use Webflow exports only as historical references.
- Add a parity checklist for this route with explicit expected section order:
  1) header row
  2) sidebar + content
  3) bottom tools rail
- Add an integration-page snapshot test/assertion that checks key visible markers (no top hero, no layout01/CTA02, shortDescription body heading).

## Implementation Update (2026-02-24)
Applied parity rollback in `src/pages/integrations/[slug].astro`:
- Removed top `IntegrationDetailHero` block and its import.
- Restored body lead heading to `shortDescription`.
- Removed the extra lower `layout01` / `cta02` sections so page flows directly to the tools-rail CTA.

Validation run results:
- `pnpm exec biome check 'src/pages/integrations/[slug].astro'`: ✅ passed
- `pnpm build`: ✅ passed
