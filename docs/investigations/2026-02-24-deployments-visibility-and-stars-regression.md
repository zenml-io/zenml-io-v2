# Investigation: `/deployments` visibility regression + header stars badge UX

## Summary
The `/deployments` blank-page regression is caused by a reveal-init logic bug that keeps all `data-reveal` blocks hidden. The page currently fails closed: `reveal-enabled` is applied, but reveal initialization never starts because the reveal scope selector incorrectly searches *inside* the page root instead of matching the root itself.

The stars badge UX issue is confirmed: desktop nav currently renders plain text (`Star · 5,227`) without iconography.

## Symptoms
- On `https://zenml-io-v2.pages.dev/deployments`, most page content appears invisible; only non-reveal text like `Various methods available:` is visible.
- Header stars badge appears text-only and visually weak (`Star · 5,227`).

## Investigation Log

### Phase 1 — Initial assessment
**Hypothesis:** A recent parity/reveal change in `src/pages/deployments.astro` is hiding content in production.

**Findings:** Recent commits introduced route-level reveal gating and observer-driven unhide behavior.

**Evidence:**
- `git log` shows parity changes in:
  - `42c3929 deployments: parity P0 (comparison/tabs/reveal) + investigation notes`
  - `b928883 deployments: P1 dark-section parity + R1 validation workflow`

**Conclusion:** Start with reveal gating chain.

---

### Phase 2 — Systematic context exploration (`context_builder` + Oracle)
**Hypothesis:** The failure pattern is “hide by CSS, unhide by JS did not happen.”

**Findings:** Context plan identified a fail-closed reveal architecture and focused checks for deployed artifact/runtime behavior.

**Evidence:**
- Oracle chat: `deployments-visibility-t-346729`.

**Conclusion:** Proceed with deployed artifact/runtime verification.

---

### Phase 3 — Deployed/runtime deep dives

#### 3A) Reveal hide chain is active on deployed page
**Hypothesis:** Production HTML/CSS is actively hiding reveal blocks.

**Findings:** Confirmed.

**Evidence:**
- Deployed HTML contains reveal class toggler and reveal attributes:
  - `root.classList.add("reveal-enabled")` present in deployed HTML.
  - `data-reveal` count in deployed HTML: `17`.
- Deployed CSS path: `/_astro/deployments.CBkNy3d9.css`.
- CSS contains hide rule for reveal-enabled state (`opacity: 0`).

**Conclusion:** Hide condition is active in production.

#### 3B) Reproduction with Playwright on deployed URL
**Hypothesis:** Reveal elements remain hidden at runtime because they never receive `.in-view`.

**Findings:** Confirmed.

**Evidence (Playwright):**
- `htmlClass`: `"deployments-tabs-enabled reveal-enabled"`
- `revealCount`: `14`
- `inViewCount`: `0`
- `hiddenByOpacity`: `14`
- visible non-reveal text block includes `Various methods available:`

**Conclusion:** Runtime state exactly matches user-reported symptom.

#### 3C) Why `.in-view` is never applied
**Hypothesis:** Reveal init path exits early due selector bug.

**Findings:** Confirmed root-cause bug.

**Evidence:**
- `src/pages/deployments.astro:43`
  - `<main data-page="deployments" data-reveal-scope="deployments">`
- `src/pages/deployments.astro:621-622`
  - `const page = document.querySelector('[data-page="deployments"]');`
- `src/pages/deployments.astro:698`
  - `const revealScope = page.querySelector('[data-reveal-scope="deployments"]');`
- Because `page` **is** the `main` element, `page.querySelector(...)` only searches descendants and does not match `page` itself. Result: `revealScope === null`, reveal init returns immediately.
- Playwright runtime corroboration:
  - tabs init runs (`tabsRoot.dataset.initialized === "true"`),
  - reveal init flag never set (`revealInitialized` absent).

**Conclusion:** Deterministic selector bug in reveal init prevents any reveal observer from running.

#### 3D) Header stars badge UX
**Hypothesis:** Stars badge renders only text and can be improved with iconography without API changes.

**Findings:** Confirmed.

**Evidence:**
- `src/components/Navigation.astro:196-202`
  - badge renders text `Star`, separator dot, and count span.
- `src/layouts/BaseLayout.astro:71-79`
  - client script updates `[data-github-stars-count]` only; icon-only UI change can be done entirely in nav markup.
- Deployed runtime HTML via Playwright:
  - link text currently `Star · 5,227`.

**Conclusion:** UX tweak should be in `Navigation.astro` only (inline SVG + existing count span).

## Root Cause
1. **Primary root cause (deployments blank page):**
   Reveal system is fail-closed and currently broken by a scope-selection bug:
   - page root gets `reveal-enabled`,
   - CSS hides all `[data-reveal]`,
   - reveal init tries `page.querySelector('[data-reveal-scope="deployments"]')` and gets `null`,
   - observer never runs, `.in-view` is never added.
2. **Secondary UX issue (stars badge):**
   Desktop stars badge uses text-only label; no iconography was added in current implementation.

## Eliminated Hypotheses
- **“Comparison data is missing again.”** Eliminated; this issue is global reveal visibility, not data omission.
- **“Tabs script not running at all.”** Eliminated; tabs init does run (`dataset.initialized = true`).
- **“Reduced-motion path causing hides.”** Eliminated for tested runtime (`matchMedia(reduce) === false`).

## Recommendations
1. **Fix reveal scope selection (P0 hotfix):**
   - In `src/pages/deployments.astro`, replace reveal scope lookup with a self-safe pattern:
     - `const revealScope = page.matches('[data-reveal-scope="deployments"]') ? page : page.querySelector('[data-reveal-scope="deployments"]');`
   - This alone restores reveal observer initialization.
2. **Hardening (prevent future fail-closed incidents):**
   - Move to “armed reveal” pattern (hide only when JS explicitly arms each element), so JS failures keep content visible.
3. **Stars badge UX update:**
   - In `src/components/Navigation.astro`, add star/GitHub inline SVG and keep existing `[data-github-stars-count]` span unchanged.
4. **Post-fix validation:**
   - Re-run Playwright check on deployed URL expecting:
     - `inViewCount > 0`
     - `hiddenByOpacity < revealCount` shortly after load
     - visual content visible at top of page.

## Preventive Measures
- Add a route smoke test for `/deployments` asserting at least one `data-reveal` element has non-zero opacity after load.
- Prefer fail-open progressive enhancement for reveal animations.
- Add a lightweight post-deploy verification step for critical marketing routes (hero/headline visible).

## Implementation Update (2026-02-24)
Implemented in source:
1. `src/pages/deployments.astro`
   - Fixed reveal scope selection bug with self-or-descendant lookup:
     - `page.matches('[data-reveal-scope="deployments"]') ? page : page.querySelector(...)`
   - Added fail-open guards for missing scope / missing `IntersectionObserver` / observer init failure by removing `reveal-enabled` and forcing reveal elements visible.
   - Tabs logic left unchanged.
2. `src/components/Navigation.astro`
   - Added inline star SVG icon to desktop stars badge.
   - Preserved `[data-github-stars-count]` span contract for `BaseLayout` runtime updater.

Local validation after implementation:
- `pnpm exec biome check src/pages/deployments.astro src/components/Navigation.astro` ✅
- `pnpm build` ✅

Post-deploy validation still required:
- Re-check `https://zenml-io-v2.pages.dev/deployments` and verify reveal content is visible at first viewport.
- Verify header badge appears as icon + `Star · <count>` and count still refreshes from `/api/github-stars`.
