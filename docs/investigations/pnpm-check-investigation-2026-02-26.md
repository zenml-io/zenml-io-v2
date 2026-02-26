# Investigation: `pnpm check` errors (Astro + TypeScript strict mode)

## Summary
`pnpm check` fails with **26 errors** (exit code 1), but the failures are concentrated in a small set of local typing issues, not a broad system regression. The dominant root cause is one untyped inline script block in `src/pages/deployments.astro` that alone contributes 20/26 errors.

## Symptoms
- `pnpm check` (`astro check`) fails.
- Final check summary: `Result (194 files): 26 errors, 0 warnings, 42 hints`.
- User requested investigation/report only (no fixes yet).

## Investigation Log

### Phase 1 - Initial assessment
**Hypothesis:** Multiple errors likely come from a few high-impact typing contracts rather than many independent bugs.
**Findings:**
- `check` script is `astro check`.
- TS is strict and includes essentially entire repo (`"include": [".astro/types.d.ts", "**/*"]`).
**Evidence:**
- `package.json:10` (`"check": "astro check"`)
- `tsconfig.json:2-8`
**Conclusion:** Strict checking + Astro file diagnostics are expected; proceed with full error capture.

### Phase 2 - Systematic exploration (`context_builder` + Oracle)
**Hypothesis:** Errors might cluster around globals/content/runtime typing.
**Findings:** Context builder selected high-coupling files and Oracle produced a concrete evidence checklist.
**Evidence:** Oracle chat `check-error-triage-858372`.
**Conclusion:** Proceed to command-level validation with logs and file-level tracing.

### Phase 3 - Command-level evidence capture
**Hypothesis:** We need exact diagnostics before trusting any theory.
**Findings:**
- Environment: Node `v22.16.0`, pnpm `10.29.2`, Astro `5.17.1`, TS `5.9.3`.
- `pnpm check` exits non-zero.
- Error distribution is highly concentrated.
**Evidence:**
- Preflight command output (git + versions)
- `pnpm -s check` captured at `/tmp/astro-check-exitcode.log` with `exit_code=1`
- Cleaned log at `/tmp/astro-check-clean.log`
- Error code frequency (errors only):
  - `TS2339 x17`
  - `TS7006 x3`
  - `TS2322 x2`
  - `TS2578 x1`
  - `TS18047 x1`
  - `TS4104 x1`
  - `TS2532 x1`
- Errors by file:
  - `src/pages/deployments.astro`: 20
  - `src/components/sections/compare/CompareCodeComparison.astro`: 2
  - `src/components/islands/LLMOpsFilter.tsx`: 1
  - `src/layouts/BlogLayout.astro`: 1
  - `src/pages/pro.astro`: 1
  - `src/pages/integrations/[slug].astro`: 1
**Conclusion:** This is not widespread; it is six local issue classes.

### Phase 4 - Root-cause deep dives (file-level)

#### 4.1 Deployments tabs/reveal script cluster
**Hypothesis:** Generic `Element` inference + untyped callback params are causing TS2339/TS7006 cascades.
**Findings:**
- Script uses `querySelectorAll` without typed generics.
- Code then accesses `dataset`, `focus`, and `event.key` on inferred `Element/Event`.
- Helper params are untyped (`candidateId`, `panelId`, `index`) under strict mode.
**Evidence:**
- `src/pages/deployments.astro:629-713`
- Markup confirms tabs are anchors: `src/pages/deployments.astro:254-281` (`<a ... class="deployments-tab">`)
- Git blame ties block to one implementation: commit `42c3929` (`2026-02-24`), with reveal additions from `6ad03c5`.
**Conclusion:** **Primary root cause** (20/26 errors) is one untyped inline script region.

#### 4.2 Compare code language typing mismatch
**Hypothesis:** Component props are too broad (`string`) for Astro `Code` component’s `lang` prop.
**Findings:**
- `CompareCodeComparison` defines `zenmlLanguage?: string` and `toolLanguage?: string`.
- `<Code ... lang={...}>` expects `CodeLanguage | undefined`.
- Upstream compare data/schema currently emits plain `string` for language.
**Evidence:**
- `src/components/sections/compare/CompareCodeComparison.astro:18-20,52,69`
- `src/pages/compare/[slug].astro:131-145,250-251`
- `src/content.config.ts:425-429`
**Conclusion:** Direct type contract mismatch (2 errors), isolated.

#### 4.3 Stale `@ts-expect-error` in LLMOpsFilter
**Hypothesis:** Previous DOM typing workaround is now obsolete.
**Findings:**
- `@ts-expect-error` sits above `el.inert = ...`, but there is no current underlying type error.
- TS flags this as unused directive.
**Evidence:**
- `src/components/islands/LLMOpsFilter.tsx:397`
- `pnpm exec tsc --noEmit` also fails only on this issue (`/tmp/tsc-exitcode.log`)
**Conclusion:** Single stale directive issue; trivial cleanup.

#### 4.4 Nullable progress bar reference in BlogLayout
**Hypothesis:** Nullable DOM node narrowing is not preserved into inner function.
**Findings:**
- `bar` checked once, then used inside `updateProgress` closure.
- TS still flags possible null in closure context.
**Evidence:**
- `src/layouts/BlogLayout.astro:353-360`
**Conclusion:** Isolated closure-narrowing/nullability issue.

#### 4.5 Readonly vs mutable testimonials prop contract
**Hypothesis:** `as const` data is readonly, but component expects mutable array.
**Findings:**
- `PRO_TESTIMONIALS` declared `as const`.
- Consuming section/island props are typed as `CarouselTestimonial[]` (mutable).
- Passing readonly data triggers TS4104.
**Evidence:**
- `src/lib/pro.ts:206-247` (`] as const`)
- `src/components/sections/ProTestimonial15Section.astro:12`
- `src/components/islands/ProTestimonialCarousel.tsx:21`
- `src/pages/pro.astro:238`
**Conclusion:** One contract mismatch across data + two components.

#### 4.6 `getEntry(...).catch(...)` on possibly undefined expression
**Hypothesis:** Current `astro:content` overload allows `getEntry` call form that can be `Promise | undefined`, making `.catch` unsafe.
**Findings:**
- `integrations/[slug].astro` chains `.catch` directly on `getEntry(...)`.
- Generated `DataEntryMap` + `getEntry` overload includes branch `Promise<...> | undefined`.
- TS therefore flags “object is possibly undefined” at chain site.
**Evidence:**
- `src/pages/integrations/[slug].astro:55-57`
- `.astro/content.d.ts:124-132,175-236`
**Conclusion:** One API typing/control-flow mismatch, isolated.

### Phase 5 - Hypothesis elimination
**Hypothesis:** Failures might be from globals, Cloudflare runtime typing, or stale generated content types.
**Findings:**
- No error diagnostics reference `window` globals (`plausible`, `Cal`, `turnstile`, etc.).
- No API runtime/Cloudflare typing errors in failing set.
- No broad `.astro/content.d.ts` cascade signatures; only one targeted `getEntry` usage issue.
**Evidence:**
- Pattern scan on check log (`/tmp/astro-check-clean.log`) for these signatures returned none for errors.
**Conclusion:** These broader hypotheses are **eliminated** for this incident.

## Root Cause
There is no single systemic failure. The failing check is the sum of **six local type issues**, with one dominant source:
1. **Primary:** untyped DOM/event usage in `src/pages/deployments.astro` inline script (`20/26` errors).
2. Compare code language prop mismatch (`string` vs `CodeLanguage`).
3. Stale `@ts-expect-error` in `LLMOpsFilter`.
4. Nullable closure variable in `BlogLayout` progress script.
5. Readonly testimonials data (`as const`) passed to mutable array props.
6. `getEntry(...).catch(...)` chain on potentially undefined return expression in integrations page.

## Recommendations (fix plan, no code applied yet)
1. **Fix `deployments.astro` typing first** (largest payoff): type `tabsRoot/tabs/panels/revealScope`, event callback parameters, and helper params.
2. **Fix `CompareCodeComparison.astro` language types**: align with `Code` component’s expected lang type; optionally validate/normalize content-provided language values.
3. **Fix testimonials readonly contract**: prefer `ReadonlyArray<CarouselTestimonial>` in section/island props (or spread-copy at call site as fallback).
4. **Fix `integrations/[slug].astro` control flow**: avoid direct `.catch` chaining on expression that may be undefined; split into guarded two-step await/try-catch.
5. **Fix `BlogLayout.astro` nullability in closure**: non-null alias or local guard inside `updateProgress`.
6. **Remove stale `@ts-expect-error` in `LLMOpsFilter.tsx`**.

## Preventive Measures
- Add a small CI triage script to print `pnpm check` errors grouped by file + TS code (helps immediately spot clusters like `20 errors in one file`).
- For inline `<script>` blocks in `.astro`, adopt a lightweight typing pattern guideline:
  - typed `querySelector/querySelectorAll` generics,
  - typed event objects (`KeyboardEvent`, `MouseEvent`),
  - typed helper params under strict mode.
- Prefer readonly prop contracts for display components that do not mutate input arrays.
- Avoid `@ts-expect-error` without expiry comments/revalidation.

## Artifacts
- `/tmp/astro-check-help.txt`
- `/tmp/astro-check-exitcode.log`
- `/tmp/astro-check-clean.log`
- `/tmp/tsc-exitcode.log`

## Implementation Status (same day follow-up)
Applied fixes for all 6 error classes in:
- `src/pages/deployments.astro`
- `src/components/sections/compare/CompareCodeComparison.astro`
- `src/components/islands/LLMOpsFilter.tsx`
- `src/layouts/BlogLayout.astro`
- `src/components/sections/ProTestimonial15Section.astro`
- `src/components/islands/ProTestimonialCarousel.tsx`
- `src/pages/integrations/[slug].astro`

Validation after fixes:
- `pnpm check` now reports: `0 errors, 0 warnings, 42 hints`.
