# Investigation: Integration detail-page bottom logo rail parity

## Summary
The mismatch came from our newly added Astro rail using dark CTA styles and scrollable overflow, while the original Webflow section uses a light gray CTA background and a centered non-scroll curated icon row. The fix is to use a dedicated `ctaCentered` rail variant plus a capped item count on detail pages.

## Symptoms
- Detail bottom section rendered dark/black in Astro.
- Original Webflow detail CTA section is light gray.
- Astro rail showed a horizontal scrollbar and many/all logos.
- Original Webflow shows a centered subset row (no visible horizontal scrollbar).

## Investigation Log

### Phase 1 - Initial assessment
**Hypothesis:** Regression is isolated to detail page CTA section + new rail component.
**Findings:** Confirmed likely control points before deep dive.
**Evidence:**
- `src/pages/integrations/[slug].astro` (bottom CTA section)
- `src/components/integrations/IntegrationsLogoRail.astro` (new rail)
**Conclusion:** Confirmed starting scope.

### Phase 2 - Systematic exploration via context_builder
**Hypothesis:** Webflow uses light CTA section + centered non-scroll list + clickable tiles.
**Findings:** Confirmed from Webflow HTML/CSS.
**Evidence:**
- `design/webflow-export-latest-2026-02-23/extracted/css/zenml.webflow.css:8142`
  - `.uui-section_cta08-2 { background-color: var(--zenml-gray-50); }`
- `design/webflow-export-latest-2026-02-23/extracted/css/zenml.webflow.css:8147`
  - `.flex-block-5 { ... justify-content: center; ... overflow: hidden; }`
- `design/webflow-export-latest-2026-02-23/extracted/css/zenml.webflow.css:8161`
  - `.integrations-examples-list { ... justify-content: center; ... display: flex; }`
- `design/webflow-export-latest-2026-02-23/extracted/css/zenml.webflow.css:6953-6983`
  - `.integration-slide`/`.integration-icon` are 60x60 and 40x40 with hover scale behavior.
- `design/webflow-export-latest-2026-02-23/extracted/detail_integrations.html:907-909,947-949`
  - per-icon anchor wrappers (`a.integration-slide`) confirm clickable icons.
- `design/webflow-export-latest-2026-02-23/extracted/detail_integrations.html:956`
  - `fs-cmsstatic-order="6"` suggests constrained/capped curated presentation.
**Conclusion:** Confirmed parity target.

### Phase 3 - Follow-up deep dive
**Hypothesis:** Correct parity mapping in Astro is light background + centered capped row + no overflow scroller.
**Findings:** Confirmed via Oracle review and source evidence.
**Evidence:** Oracle chat `detail-rail-parity-E73259` + CSS/HTML evidence above.
**Conclusion:** Confirmed implementation direction.

### Phase 4 - Git/evolution check
**Hypothesis:** Regression entered with recent rail introduction.
**Findings:** Confirmed recent commit introduced current dark+scroll behavior.
**Evidence:**
- `git log` shows `5ec01c2 Add clickable integration logo rails` touching:
  - `src/pages/integrations/[slug].astro`
  - `src/components/integrations/IntegrationsLogoRail.astro`
  - `src/components/sections/IntegrationsMarquee.astro`
- Pre-fix code in detail page used `bg-gray-900` and `text-white` with unbounded rail call.
- Pre-fix rail used `overflow-x-auto` and rendered all logos by default.
**Conclusion:** Confirmed regression source.

### Phase 5 - Fix implementation and verification
**Hypothesis:** Matching Webflow requires light CTA theme + capped centered rail variant (no user-scroll overflow).
**Findings:** Implemented and validated.
**Evidence:**
- `src/pages/integrations/[slug].astro`
  - bottom CTA now `bg-gray-50`
  - heading/paragraph switched to dark-on-light text
  - detail rail call now `limit={6}` + `variant="ctaCentered"`
- `src/components/integrations/IntegrationsLogoRail.astro`
  - added `variant` prop (`scroll` | `ctaCentered`)
  - `ctaCentered` branch uses `overflow-hidden` centered row (no `overflow-x-auto`)
  - maintained clickable anchors to `/integrations/{slug}`
  - tile sizing/hover updated to Webflow-like 60x60 / 40x40 behavior
- Verification command:
  - `pnpm exec biome check src/components/integrations/IntegrationsLogoRail.astro 'src/pages/integrations/[slug].astro'` ✅
**Conclusion:** Fix complete and consistent with investigated Webflow behavior.

## Root Cause
Two implementation mismatches were introduced during the first parity pass:
1. **Section theming mismatch**: detail CTA section was kept as dark (`bg-gray-900`) instead of Webflow’s light gray (`--zenml-gray-50` = `#f9fafb`).
2. **Rail behavior mismatch**: rail used `overflow-x-auto` with no cap, producing visible scrollbars and an expanded list of icons. Webflow instead centers a constrained list and clips overflow.

## Eliminated Hypotheses
- **“Webflow itself is scrollable and we just missed CSS”** → Eliminated. Webflow uses centered flex with overflow hidden on the parent section block.
- **“Background mismatch is caused by button variant only”** → Eliminated. Root cause is section-level background class in detail page template.
- **“All-logo display is required for parity”** → Eliminated. Webflow evidence includes constrained ordering (`fs-cmsstatic-order="6"`) and no scroller behavior.

## Recommendations
1. Keep the detail page rail invocation explicit: `variant="ctaCentered"` and `limit={6}`.
2. Keep a separate `scroll` variant for contexts that intentionally need horizontal scroll.
3. Preserve tile dimensions and hover treatment close to Webflow (60x60 tile, 40x40 icon, subtle transition).

## Preventive Measures
- Add a visual parity checklist for `/integrations/[slug]` bottom CTA section (background + rail count + no scrollbar).
- Prefer explicit presentation props (`variant`, `limit`) when reusing components across different sections.
- For future Webflow parity tasks, pull both HTML + CSS evidence before implementing styling behavior.
