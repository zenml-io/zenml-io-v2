# `/pro` Page — Visual Parity Fix Plan

> **Context Builder chat_id**: `pro-parity-audit-56B9B0`
> (Use `chat_send(chat_id: "pro-parity-audit-56B9B0")` for follow-up questions with full file context)

## Overview

The `/pro` page has several visual and interaction parity gaps versus the
original Webflow version. This plan documents every identified gap, grouped by
section, and provides a prioritized implementation plan.

**Key files:**
- Page: `src/pages/pro.astro`
- Data: `src/lib/pro.ts`
- Reusable section: `src/components/sections/FeatureValueSection.astro`
- Webflow reference: `design/webflow-export/extracted/pro.html`
- Webflow CSS: `design/webflow-export/extracted/css/zenml.webflow.css`

---

## Identified Parity Gaps

### A. Trust Logo Marquee (below hero)

**Problem:** Only headline text renders — no logos, no scrolling animation.

**Webflow truth:**
- `.logo_component-slider.margin` contains ~32 `<img class="logo-slider-img">`
- Container: `.logo_component-slider { width: 2200px; display: flex; }`
- Spacing: `grid-column-gap: 6rem`
- Logo sizing: default `120px`, `.small` ~`90px`, `.xsmall` ~`70px`
- Overflow-hidden parent with continuous horizontal scroll motion

**Fix:**
- [ ] Create shared logo data source (`src/lib/logos.ts`) or add `PRO_TRUST_LOGOS` to `src/lib/pro.ts`
- [ ] Either refactor `LogoCloud.astro` to accept props, or create `ProLogoCloud.astro`
- [ ] Use existing CSS marquee pattern (`@keyframes marquee-slide`) with duplicated DOM list
- [ ] Match sizing: ~120px default, 6rem gap, overflow-hidden container

---

### B. Featured Testimonial — Florian / Hema.to (testimonial09)

**Problem:** Currently a plain white section with a large avatar. Should be a
light-purple card with 2-column grid layout and company logo with vertical
divider.

**Webflow truth (`.uui-testimonial09_component`):**
- Background: `var(--untitled-ui-primary100)` (light purple)
- Grid: `.25fr 1fr`
- Padding: `2rem`, gap `2rem`, border-radius: `var(--radius-md)`
- Left: rectangular image with `border-radius: 0.5rem`
- Right: quote text + client row with **vertical divider** + company logo (`max-height: 3rem`)

**Fix:**
- [ ] Create `ProFeaturedTestimonial09.astro` component
- [ ] Light purple card background (`bg-primary-100` / `#f6f2ff`)
- [ ] 2-column grid (narrow image | wide content)
- [ ] Vertical divider between name/title and company logo
- [ ] Replace current Florian section in `pro.astro`

---

### C. Feature Sections — Missing Eyebrow + Learn More + Animations

**Problem:** `FeatureValueSection.astro` doesn't render the eyebrow label
(e.g. "Flexibility", "Optimization") or the "Learn More →" link. Also missing
scroll-triggered fade/slide reveal animations.

**Webflow truth (`.uui-layout08_component`):**
- Each section has `<div class="uui-heading-subheading">Flexibility</div>` above the title
- Each section has `<a class="uui-button-link left">Learn More + arrow</a>`
- Both image and content columns have `style="opacity:0"` with scroll-triggered reveal

**Fix:**
- [ ] Extend `FeatureValueSection` props: add `eyebrow?`, `learnMoreHref?`, `learnMoreLabel?`, `reveal?`
- [ ] Render eyebrow above title when provided (small purple uppercase text)
- [ ] Render "Learn More →" link when `learnMoreHref` provided
- [ ] Update `pro.astro` to pass `feature.eyebrow` and `feature.learnMoreHref` (already in `PRO_FEATURES` data, just unused)
- [ ] Add scroll reveal (IntersectionObserver + CSS transition) for image + content columns

---

### D. Compliance / Security Section — Badge Overlap

**Problem:** "We take security seriously" section has security badges (SOC2,
ISO) overlapping with text. Sizing and layout don't match Webflow.

**Webflow truth (`.compliance_banner`):**
- `border: 1px solid var(--untitled-ui-gray300)`
- `background-color: white` (not gray-50)
- `border-radius: 0.75rem`
- `max-width: 90%` (centered)
- `padding: 1.5rem`
- `display: flex; align-items: center;`
- Logo sizing: `.soc2_logo { max-width: 130px; width: 90%; }`

**Fix:**
- [ ] Change banner bg from `bg-gray-50` to `bg-white`
- [ ] Add `max-w-[90%] mx-auto` to constrain width
- [ ] Fix logo sizing: use `max-w-[130px]` instead of fixed `h-16`
- [ ] Ensure flex row with proper `align-items-center` and gap
- [ ] Optionally extract to `ComplianceBanner.astro` for reuse

---

### E. Harold / HashiCorp Testimonial (testimonial02) — Wrong Colorway

**Problem:** Currently a full-width dark section (`bg-gray-900`). Should be a
**purple card** with centered content.

**Webflow truth (`.uui-testimonial02_component`):**
- `background-color: var(--zenml-primary-500)` (purple)
- `border-radius: 1rem`
- `padding: 4rem`
- Centered content layout
- Large avatar: `4rem` circle
- Company logo: `max-height: 3rem`
- White text throughout

**Fix:**
- [ ] Create `ProTestimonial02.astro` component (or add `variant` prop to `VsTestimonial.astro`)
- [ ] Purple background (`bg-primary-500`), white text
- [ ] `rounded-2xl` (1rem), `p-16` (4rem) with responsive reduction
- [ ] Centered quote, avatar `w-16 h-16 rounded-full`, logo `max-h-12`
- [ ] Replace current Harold section in `pro.astro`

---

### F. Testimonial Carousel (testimonial15) — Static Grid → Animated Slider

**Problem:** Currently dumps 5 testimonials in a static 2-row grid. Should be
an auto-playing 3-up carousel with arrows and dots.

**Webflow truth (`.uui-testimonial15_component.w-slider`):**
- `data-delay="4000"` + `data-autoplay="true"`
- 3 visible cards on desktop: `.uui-testimonial15_mask { width: 33.33%; overflow: visible; }`
- Fixed height: `540px`, `padding-bottom: 5rem`, `margin-top: 4rem`
- Arrows: circular `3rem`, `border: 1px solid gray200`, hover `gray50`, positioned bottom-right
- Dots: `0.625rem`, inactive `#D1D5DB`, active `#6941C6`
- Card: white, `border-color: var(--untitled-ui-primary50)`, `border-radius: 1rem`, `padding: 2rem`
- Author row pinned to bottom via `margin-top: auto`

**Fix:**
- [ ] Create Preact island: `src/components/islands/ProTestimonialCarousel.tsx`
- [ ] Create Astro wrapper: `src/components/sections/ProTestimonial15Section.astro`
- [ ] Implement slider mechanics:
  - Autoplay every 4s, transition 500ms
  - Responsive slides: 1 (mobile), 2 (tablet), 3 (desktop)
  - Infinite looping (clone or circular index)
  - Arrow buttons + dot indicators with correct styling
- [ ] Match card styling: white bg, primary-50 border, 1rem radius, 2rem padding
- [ ] Author row with `mt-auto` for bottom alignment
- [ ] Use `client:visible` to defer JS loading
- [ ] Replace static grid in `pro.astro`

---

### G. Page-Wide Scroll Reveal Animations

**Problem:** Webflow has fade-in-on-scroll interactions on nearly every section
(hero, onboarding, features, OSS grid, testimonials, compliance). Our version
is completely static.

**Webflow truth:** Many elements have `data-w-id` + `style="opacity:0"`,
triggered by Webflow Interactions on scroll.

**Fix:**
- [ ] Add a page-scoped scroll reveal system to `pro.astro`:
  - Mark elements with `data-reveal` attribute
  - IntersectionObserver adds `in-view` class once
  - CSS transitions: `opacity 0→1`, optional subtle `translateY(12px→0)`
- [ ] Respect `prefers-reduced-motion: reduce`
- [ ] Apply to: hero, onboarding section, each feature section (image + content separately), OSS grid items, compliance section, testimonial cards
- [ ] Pattern reference: `FeatureTabs.astro` and `ValueProps.astro` already use this pattern

---

### H. OSS vs Pro Grid Section — Styling Mismatch

**Problem:** Background color is `bg-gray-50` but Webflow uses `#f5f8fd`
(slightly blue tint). Items render as bordered cards but Webflow uses flatter
list items.

**Webflow truth (`.uui-section_layout15`):**
- `background-color: #f5f8fd`
- Items are `.uui-layout15_item` with internal spacing, not heavy card borders

**Fix:**
- [ ] Update background to `bg-[#f5f8fd]` (or add as design token)
- [ ] Reduce card styling: remove border/shadow, keep padding for spacing
- [ ] Add reveal sequencing (heading, items, CTA, image)

---

### I. Hero Section — Minor Polish

**Problem:** Background, typography scale, and image styling differ slightly.

**Webflow truth:**
- Light gradient background with bottom border
- Larger heading/deck font sizes (`uui-heading-xlarge`, `uui-text-size-xlarge`)
- Image: large max-width, no heavy shadow (`no-border` class)

**Fix:**
- [ ] Add subtle gradient background (or light gray) + bottom border
- [ ] Adjust heading size closer to Webflow xlarge (~48-56px)
- [ ] Reduce or remove `shadow-2xl` on hero image; use `rounded-xl` only
- [ ] Add fade-in animation on load (not scroll-triggered)

---

### J. FAQ Accordion — Interaction Difference (P2)

**Problem:** We use native `<details>/<summary>` (instant toggle, browser
chevron). Webflow uses custom animated accordion with plus/minus icon and
height transition.

**Webflow truth:**
- Plus/minus icon (two lines, vertical line rotates on open)
- Animated height transition from 0
- Custom spacing/borders

**Fix (lower priority):**
- [ ] Option A: Create `ProFaqSection.astro` with JS-driven height animation
- [ ] Option B: Add `variant="animated"` prop to `FaqSection.astro`
- [ ] Match plus/minus icon and height transition
- [ ] Keep native `<details>` as fallback for other pages

---

## Priority Order

### P0 — Must Fix (obvious visual breaks)

| # | Fix | Effort | New Components |
|---|-----|--------|----------------|
| 1 | Trust logo marquee | Medium | `ProLogoCloud.astro` (or refactor `LogoCloud.astro`) |
| 2 | Feature eyebrow + Learn More | Small | None (extend `FeatureValueSection`) |
| 3 | Florian testimonial09 card | Medium | `ProFeaturedTestimonial09.astro` |
| 4 | Harold testimonial02 purple card | Medium | `ProTestimonial02.astro` |
| 5 | Testimonial carousel | Large | `ProTestimonialCarousel.tsx` + `ProTestimonial15Section.astro` |
| 6 | Compliance banner overlap fix | Small | None (inline fix) or `ComplianceBanner.astro` |

### P1 — High-Value Visual Parity

| # | Fix | Effort |
|---|-----|--------|
| 7 | Page-wide scroll reveal | Medium |
| 8 | OSS grid styling | Small |
| 9 | Hero polish | Small |
| 10 | Section anchor IDs | Trivial |

### P2 — Nice to Have

| # | Fix | Effort |
|---|-----|--------|
| 11 | FAQ animated accordion | Medium |

---

## Implementation Order (Recommended)

1. **Compliance banner fix** (smallest, unblocks visual QA)
2. **Feature sections** (eyebrow + learn more — extends existing component)
3. **Trust logo marquee** (reuse existing CSS pattern)
4. **Florian testimonial09** (new component, self-contained)
5. **Harold testimonial02** (new component, self-contained)
6. **Scroll reveal system** (page-wide, benefits all sections)
7. **Testimonial carousel** (largest piece — Preact island)
8. **OSS grid + Hero polish** (small styling tweaks)
9. **FAQ accordion** (if time permits)

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/sections/ProFeaturedTestimonial09.astro` | Florian light-purple testimonial card |
| `src/components/sections/ProTestimonial02.astro` | Harold purple testimonial card |
| `src/components/sections/ProTestimonial15Section.astro` | Carousel section wrapper |
| `src/components/islands/ProTestimonialCarousel.tsx` | Preact carousel island |
| `src/lib/logos.ts` (optional) | Shared trust logo data |

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/pro.astro` | All section replacements, scroll reveal script, anchor IDs |
| `src/components/sections/FeatureValueSection.astro` | Add eyebrow, learn-more, reveal props |
| `src/lib/pro.ts` | Add trust logo data (if not using shared module) |
| `src/styles/global.css` | Scroll reveal CSS classes (if not scoped to page) |
