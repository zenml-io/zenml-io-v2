# Features Hub Page (`/features`) — Parity Plan

> **Context Builder chat_id**: `features-hub-parity-8E8697`
> **Date**: 2026-02-13
> **Status**: Plan — ready for implementation

## Summary

The `/features` hub page has **8 categories of parity gaps** versus the Webflow original. The page structure is correct (hero → card grid → CTA), but every section has significant styling, layout, and content differences. The most impactful gaps are: wrong card content (12 cards with long marketing titles vs 7 cards with short Webflow titles), missing card icons/hover effects, wrong CTA component (simple dark band vs rounded purple panel with background image), and hero styling differences.

---

## Gap Inventory

### A. Hero Section — Background & Spacing

| Aspect | Webflow | Astro (current) |
|--------|---------|-----------------|
| Background | `linear-gradient(to bottom, #fff, var(--zenml-light-gradient))` + `border-bottom: 1px solid var(--untitled-ui-primary100)` | `bg-white` — no gradient, no border |
| Top padding | `80px` fixed | `pt-16` (64px) / `sm:pt-24` (96px) responsive |
| Side padding | `2rem` (32px) | `px-4 sm:px-6 lg:px-8` (16/24/32px responsive) |
| H1 size | `3rem` (48px), `font-weight: 700`, `letter-spacing: -0.05rem`, `line-height: 1.2` | `text-3xl sm:text-4xl lg:text-5xl` — responsive, doesn't match fixed 48px |
| Deck text | `1.125rem` (18px), `line-height: 1.5`, `color: gray600` | `text-lg leading-relaxed` — close but not exact |
| H1→deck gap | `24px` (`.uui-space-small`) | `mt-4` (16px) |
| Deck→CTAs gap | `48px` (`.uui-space-large`) | `mt-8` (32px) |

**Fix**: Update hero section wrapper + spacing to match Webflow values.

### B. Hero CTA Row — Order & Behavior

| Aspect | Webflow | Astro (current) |
|--------|---------|-----------------|
| DOM order | Secondary ("Use Open Source") first, Primary ("Book a demo") second | Primary first, Secondary second |
| Responsive | `is-reverse-mobile-landscape` reverses on ≤767px | `flex-col` stacks vertically, no reversal |
| Gap | `1.5rem` (24px) | `gap-3` (12px) |
| "Book a demo" target | `target="_blank"` | No target attribute |
| Animation | `opacity:0` on load, Webflow interaction fades in | No animation |

**Fix**: Swap button order, increase gap, add `target="_blank"`, optionally add fade-in.

### C. Feature Grid — Section Styling

| Aspect | Webflow | Astro (current) |
|--------|---------|-----------------|
| Section background | White (no explicit bg) | `bg-gray-50` (gray) |
| Container | `max-width: 80rem`, `padding: 2rem` sides | `max-w-7xl` (80rem — correct), `px-4 sm:px-6 lg:px-8` |
| Grid gap | `1rem` (16px) column + row | `gap-6` (24px) |
| Grid columns | `1fr 1fr 1fr` at desktop; 2-col at ≤991px; 1-col at ≤767px | `sm:grid-cols-2 lg:grid-cols-3` (breakpoints at 640/1024 instead of 768/992) |

**Fix**: Remove gray background, reduce gap, adjust breakpoints.

### D. Feature Cards — Count & Content (MAJOR)

| Aspect | Webflow | Astro (current) |
|--------|---------|-----------------|
| Card count | **7** cards (one per category) | **12** cards (all feature pages) |
| Card titles | Short: "Iterate at warp speed", "Limitless scaling", etc. | Long marketing titles: "From Idea to Production at Warp Speed", etc. |
| Card summaries | Short 1-line descriptions | Longer marketing descriptions |

**Webflow hub card data** (exact from export):

| # | Category | Title | Summary | Slug |
|---|----------|-------|---------|------|
| 1 | Speed | Iterate at warp speed | Accelerate your ML workflow with seamless local-to-cloud transitions and smart caching. | iterate-at-warp-speed |
| 2 | Scale | Limitless scaling | Effortlessly deploy across clouds and infrastructures with unified resource management. | limitless-scaling |
| 3 | Observability | Auto-track everything | Automatic logging and versioning for truly reproducible ML workflows | auto-track-everything |
| 4 | Flexibility | Backend flexibility, zero lock-in | One framework for all your MLOps and LLMOps needs, with the flexibility to change as you grow. | backend-flexibility-zero-lock-in |
| 5 | Reusability | Shared ML building blocks | Boost team productivity with reusable components and standardized configurations. | shared-ml-building-blocks |
| 6 | Optimization | Streamline cloud expenses | Gain clarity on resource usage and costs across your entire ML infrastructure. | streamline-cloud-expenses |
| 7 | Governance | Security guardrails, always | Robust ML security with effortless implementation and management. | security-guardrails-always |

**Root cause**: The extraction script `loadHubCards()` in `scripts/phase3/extract-feature-pages.ts` scraped `a[href*='features/']` links, but in Webflow the card `<h2>` is *outside* the `<a>` tag — so the scraper couldn't find the correct title and fell back to page H1 marketing titles.

**Fix**: Either (a) update the 7 hub frontmatter files with correct short titles + correct ordering, plus add a `hub.showOnHub` flag, or (b) hardcode the 7 hub cards in `src/lib/features.ts`.

### E. Feature Cards — Structure & Styling

| Aspect | Webflow | Astro (current) |
|--------|---------|-----------------|
| Root element | `<div>` (non-clickable container) + internal `<a>` link | Entire card is `<a>` |
| **Icon** | 24×24 SVG icon (purple stroke `#7A3EF4`) above category | **Missing** — no icon at all |
| Category text | `16px`, `font-weight: 600`, purple, `margin-bottom: 0.75rem` | `text-xs` (12px), uppercase, tracking-wider |
| Title text | `24px`, `font-weight: 700`, `line-height: 1.4` | `text-lg` (18px), `font-semibold` |
| Body text | `16px`, `line-height: 1.5`, `color: gray600` | `text-sm` (14px) |
| Border radius | `8px` (`.radius-md`) | `rounded-xl` (16px) |
| Padding | `2rem` (32px) | `p-6` (24px) |
| Border | `1px solid #f2f4f7` (gray100) → hover: `#7a3ef4` (zenml-500) | `border-gray-200` → hover: `border-zenml-300` (undefined token!) |
| Background | `linear-gradient(135deg, #fcfcfc, #fff)` → hover: `linear-gradient(135deg, #f9f4ff, #fff)` | `bg-white` only |
| Hover transform | `translateY(-10px)` | None |
| Hover shadow | `0 0 5px 2px rgba(0,0,0,0.2)` | `shadow-sm` → `hover:shadow-md` (wrong profile) |
| Transition | `300ms cubic-bezier(.77,0,.175,1)` | `200ms` default ease |
| "Learn more" color | `primary700` (#6941c6) | `text-zenml-500` (#7a3ef4 — lighter) |

**Fix**: Rebuild `FeatureCard.astro` with icon prop, correct typography sizes, proper hover effects, gradient backgrounds, and matching transitions.

### F. CTA Section — Component Structure (MAJOR)

| Aspect | Webflow (CTA05) | Astro (current) |
|--------|-----------------|-----------------|
| Outer section | White background | `bg-gray-900` full-width |
| Inner panel | Rounded (`border-radius: 1rem`), `bg-color: #53389e` (purple-800), `padding: 4rem`, background image `grid_bg_02.webp` | No inner panel — text directly in dark section |
| Layout | 2-column grid: `1fr max-content`, `gap: 4rem` | Centered single column |
| Text alignment | **Left-aligned** (in first grid column) | **Center-aligned** |
| Heading size | `30px` (`.uui-heading-small`), white | `text-2xl sm:text-3xl` — close but different |
| Body text | `18px` (`.uui-text-size-large`), white | `text-lg text-gray-300` — gray instead of white |
| Primary button | `.uui-button.over-dark` (dark/gray on purple bg) | Standard purple primary |
| Secondary button | `.uui-button-secondary-gray` (white/gray border) | Standard white secondary |
| Button row | `is-reverse-mobile-landscape` | No mobile reversal |

**Fix**: Rebuild `FeaturesHubCTA.astro` as a rounded purple panel with bg image, 2-col grid, left-aligned text, and correct button variants.

### G. Button Component — Primary Variant

| Aspect | Webflow | Astro (current) |
|--------|---------|-----------------|
| Border | `1px solid var(--untitled-ui-primary600)` (#7f56d9) | No border |
| Hover bg | `var(--untitled-ui-primary700)` (#6941c6) | `zenml-600` (#361776) — **much** too dark |
| Transition | `all 300ms` | `200ms` |
| Padding | `10px 18px` (default) | Different per size |

**Fix**: Add border to primary, fix hover color, adjust transition duration.

### H. Button Component — Missing "Over Dark" Variant

Webflow's CTA05 uses `.uui-button.over-dark` — a dark/charcoal button meant for use on purple backgrounds. This variant doesn't exist in our `Button.astro`.

**Fix**: Add `variant="overDark"` to `Button.astro`.

---

## Implementation Plan

### Priority Tiers

**P0 — Must fix** (most visible impact):
1. **D**: Card count + content (7 cards with correct short titles)
2. **E**: Card styling (icon, typography, hover, gradients)
3. **F**: CTA section rebuild (rounded purple panel)
4. **C**: Grid section background + gap

**P1 — High value** (noticeable on careful comparison):
5. **A**: Hero background gradient + spacing
6. **B**: CTA row order + gap + target
7. **G**: Button primary variant border + hover fix
8. **H**: "Over dark" button variant for CTA

### File Change Map

| File | Changes |
|------|---------|
| `src/pages/features/index.astro` | Hero gradient/border/spacing, CTA row order+gap, grid bg→white, grid gap→4, filter to 7 hub cards |
| `src/components/sections/FeatureCard.astro` | Add icon prop, fix typography sizes, add gradient bg + hover gradient, fix border colors, add translateY hover, fix transition, fix border-radius, fix padding |
| `src/components/sections/FeaturesHubCTA.astro` | Rebuild as CTA05: white outer, rounded purple inner with bg image, 2-col grid, left-aligned, correct button variants |
| `src/components/Button.astro` | Add border to primary, fix hover color, add `overDark` variant, adjust transition |
| `src/lib/features.ts` | Add hub card data with correct short titles, icons (SVG strings), and ordering; or add `HUB_CARDS` array |
| `src/content/feature-pages/*.md` | Update `hub.title` + `hub.order` for 7 featured pages, add `hub.showOnHub` flag |
| `src/content.config.ts` | Add `showOnHub` (boolean) + `iconSvg` (string) to `featureHubSchema` if going data-driven |
| `public/images/grid_bg_02.webp` | Copy from `design/webflow-export/extracted/images/` |

### Open Decisions

1. **Card count**: Strict Webflow parity = 7 cards. Do we keep all 12 (intentional divergence)?
2. **Card data source**: Hardcode 7 hub cards in `features.ts` (simpler) vs add frontmatter flags (more flexible)?
3. **Button border fix scope**: The primary button border fix would affect ALL pages — acceptable?
4. **Hero animation**: Replicate fade-in on CTA row, or skip?

### Assets Needed

- `grid_bg_02.webp` — copy from `design/webflow-export/extracted/images/grid_bg_02.webp` to `public/images/`
- 7 SVG icons (embedded in Webflow HTML export, can extract inline)

---

## Icon SVGs (from Webflow export)

Each card has a unique 24×24 SVG icon. All use `stroke="#7A3EF4"` or `fill="#7A3EF4"`:

1. **Speed**: Lightning bolt (stroke)
2. **Scale**: Scaling/grid boxes (stroke)
3. **Observability**: Same scaling SVG as Scale (appears reused in export)
4. **Flexibility**: Paperclip/attachment (stroke)
5. **Reusability**: Sync/transfer arrows with screens (stroke)
6. **Optimization**: Box/package with checkmark (stroke)
7. **Governance**: Lock/padlock (fill, not stroke)

These can be extracted from `design/webflow-export/extracted/features.html` lines 595-715.
