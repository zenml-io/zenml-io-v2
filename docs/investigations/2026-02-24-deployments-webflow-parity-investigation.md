# Investigation: `/deployments` parity vs Webflow

## Summary
The Astro `/deployments` page is content-close but not behavior/style-parity with the Webflow source. The largest gaps are interaction/runtime parity (scroll reveals + tab behavior), section styling differences in dark areas/comparison table, and intentional structural rewrites (global nav/footer + Tailwind layout model).

I could **not** reproduce a source-level data bug for the first comparison row (“Self-hosted” / “SaaS / Self-hosted”): values exist in source data and render in local `dist/deployments.html`.

## Symptoms
- Deployed `/deployments` feels visually different from Webflow.
- “Choose the deployment that fits your needs” section appears different, and first-row values were reported as empty.
- Missing animations/interactions compared to Webflow.

## Investigation Log

### Phase 1 — Initial assessment
**Hypothesis:** Differences are likely from migration simplification (structure/styles/interactions), not one isolated data bug.

**Findings:** `/deployments` is a manual Astro rewrite backed by `src/lib/deployments.ts`.

**Evidence:**
- `src/pages/deployments.astro`
- `src/lib/deployments.ts`
- `design/docs/phase-3-plan.md:700-789` (notes manual conversion pattern for core marketing pages)

**Conclusion:** Scope confirmed: parity audit required across content, structure, styling, and behavior.

---

### Phase 2 — Systematic exploration via `context_builder`
**Hypothesis:** Webflow parity drift is concentrated in table/tabs/animation runtime.

**Findings:** Confirmed high-probability gap areas and evidence plan from selected source + Webflow export context.

**Evidence:**
- Oracle chat: `deployments-parity-audit-236FF2`
- Selected context included:
  - `src/pages/deployments.astro`
  - `src/lib/deployments.ts`
  - `design/webflow-export-latest-2026-02-23/extracted/deployments.html`
  - `design/webflow-export-latest-2026-02-23/extracted/css/zenml.webflow.css`

**Conclusion:** Proceeded with targeted deep dives and direct file evidence.

---

### Phase 3 — Deep dives (table/tabs/animation/runtime)

#### 3A) Comparison table parity
**Hypothesis:** R1 values may be missing due to bad data wiring.

**Findings:** Data and rendering branches are present locally.

**Evidence:**
- Data includes row values:
  - `src/lib/deployments.ts:73-75`
  - Row 1: `"Self-hosted"`, `"SaaS / Self-hosted"`
- Renderer supports string/boolean branches:
  - `src/pages/deployments.astro:116-133`
  - `val === true` / `val === false` / string `<span class="text-gray-300">{val}</span>`
- Built output contains both values:
  - `dist/deployments.html` includes `Self-hosted` and `SaaS / Self-hosted`

**Conclusion:** Source-level data mapping bug **eliminated** for current HEAD.

#### 3B) Comparison table visual drift vs Webflow
**Hypothesis:** Same content, different styling primitives.

**Findings:** Confirmed.

**Evidence:**
- Webflow grid-row model + row backgrounds:
  - `deployments.html:645-775` (`deployments-comparison-row_two-options` blocks)
  - `zenml.webflow.css:13249-13275` (header/row grid and `lighter` backgrounds)
- Astro `<table>` model + gray striping:
  - `src/pages/deployments.astro` comparison section (table markup at lines around 105-142)
- Icon color parity differs (Webflow white/orange check strokes vs Astro single-color check):
  - Webflow SVG strokes visible in `deployments.html:655-775`
  - Astro check icon color class: `text-zenml-400` (`src/pages/deployments.astro:124-127`)

**Conclusion:** Confirmed visual parity gap caused by structural/styling rewrite.

#### 3C) Tabs behavior drift
**Hypothesis:** Webflow tabs include richer behavior than Astro implementation.

**Findings:** Confirmed.

**Evidence:**
- Webflow tabs markup/attributes:
  - `deployments.html:934-956` (vertical menu + nested `deployment-description`)
  - `deployments.html:934` includes `fb-tabs*` attributes
- Webflow tab CSS behavior:
  - `zenml.webflow.css:8700-8714` (`.deployments-tab` opacity and active state)
  - `zenml.webflow.css:8760-8771` (`.deployment-description` collapsed/transitioned)
  - Inline head rule expands description for active tab:
    - `deployments.html:117-120` (`.w--current .deployment-description`)
- Astro tabs are simplified pills + panel toggling:
  - `src/pages/deployments.astro:231-266` (tab list + panels)
  - `src/pages/deployments.astro:330-362` (inline hash-based tab toggling script)

**Conclusion:** Confirmed behavior mismatch (orientation, active-state model, description transition, potential auto-progress).

#### 3D) Animation/runtime parity
**Hypothesis:** Webflow interactions were not ported for this page.

**Findings:** Confirmed for `/deployments`.

**Evidence:**
- Webflow interaction markers and initial hidden states are widespread:
  - Many `data-w-id` + `style="opacity:0"` entries in `deployments.html` (hero/architecture/scenarios/tabs/CTA)
  - Shell check counts:
    - `data-w-id` count: Webflow 40 vs Astro source 0 vs dist 0
    - `opacity:0` count: Webflow 26 vs dist 0
- Webflow runtime dependency:
  - `deployments.html:1402-1403` loads `jquery` + `js/webflow.js`
- Astro deployments page has no reveal/intersection logic:
  - `src/pages/deployments.astro` (only tab-switch script)
- Note: repo has IntersectionObserver patterns elsewhere, but not here:
  - e.g. `src/components/sections/FeatureTabs.astro:229-241`

**Conclusion:** Confirmed missing interaction parity specifically on this route.

---

### Phase 4 — Git history + migration intent
**Hypothesis:** Current behavior is the result of migration choices rather than recent accidental breakage.

**Findings:** Confirmed.

**Evidence:**
- Deployment page introduced in migration batch:
  - `git log -- src/pages/deployments.astro src/lib/deployments.ts`
  - includes `b535ada Add Phase 3H-5: Core marketing pages (7) + shared components`
- Recent commit touches tabs script but not comparison data model:
  - `1ae8908 Fix deployments tab switcher to use links` (`src/pages/deployments.astro`)
- Migration docs explicitly call out must-replicate interactions and known animation-system gaps:
  - `design/docs/phase-3-plan.md:936-995`
  - `design/docs/plan-checker.md:106-111` (missing planned animation system at that audit point)

**Conclusion:** Root cause is primarily parity drift from manual rewrite + incomplete interaction parity, not a newly introduced table-data regression.

## Root Cause
1. **Structural rewrite divergence (intentional):** `/deployments` was manually rebuilt in Astro/Tailwind and integrated into shared site chrome, not class-for-class Webflow replication.
2. **Interaction runtime mismatch:** Webflow depends on `data-w-id` + `webflow.js` behaviors (fade-ins and tab micro-interactions) that are not replicated on this page.
3. **Styling token/component differences:** Dark sections/comparison/table/tabs use different primitives and tokens, yielding visible “close but not same” design drift.
4. **R1 empty-values report is likely environment/visual-state specific:** source + local dist clearly include values; issue likely from deployed artifact/caching/runtime CSS conditions rather than current repository data logic.

## Eliminated Hypotheses
- **“Comparison row values are not in source data.”** Eliminated (`src/lib/deployments.ts:73-75`).
- **“Renderer only supports booleans.”** Eliminated (`src/pages/deployments.astro:124-133` includes text branch).
- **“No tabs implementation exists in Astro.”** Eliminated (tabs and script exist, but behavior differs).

## Recommendations (prioritized)
1. **P0 — Build parity matrix and fix high-salience gaps first**
   - Comparison section visual parity (row background tokens + icon color logic + spacing).
   - Tabs parity (vertical menu, active-state opacity, inline description expand/collapse, optional auto-progress).
2. **P0 — Reintroduce route-level reveal interactions for `/deployments`**
   - Reuse existing local reveal patterns (IntersectionObserver) used in other sections/pages.
3. **P1 — Align dark architecture + CTA styling tokens to Webflow equivalents**
   - Match section/card background treatments and spacing cadence.
4. **P1 — Validate deployed environment for reported “R1 empty” symptom**
   - Check `view-source`/`curl` for row text on deployed URL.
   - If present in HTML, inspect computed styles (`color`, `opacity`, `font-size`, `visibility`, clipping).
   - If absent, investigate stale artifact/cache/routing variant.
5. **P2 — Optional SEO parity pass**
   - Decide whether to align title/description/OG metadata with Webflow copy or keep current Astro copy.

## Preventive Measures
- Add a route-level parity checklist for high-priority migrated pages (`/deployments`, `/pricing`, `/pro`) covering:
  - content parity
  - layout/spacing parity
  - interaction parity
  - asset parity
- Capture visual regression snapshots against Webflow exports for critical sections (table/tabs/hero/CTA).
- When simplifying interaction systems, explicitly log accepted deltas vs required parity in an investigation note before release.

## Notes on the “R1 values empty” report
Current repository evidence suggests this is **not** a code/data omission at HEAD. The fastest confirmation on the affected deployment is:
1. `view-source:https://<deployed>/deployments` (search `Self-hosted`)
2. If found, inspect computed styles for the first-row `<span>` cells.
3. If not found, verify deployment artifact/caching and route variant (`/deployments` vs `/deployments/`).
