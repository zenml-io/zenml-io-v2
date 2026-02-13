# Projects Page Parity Plan

> **RepoPrompt chat_id**: `projects-parity-AFA7FD` (use with `chat_send` for follow-up context)

## Problem Summary

The `/projects` listing page and `/projects/[slug]` detail pages differ significantly from the Webflow originals. This plan covers fixing both to achieve 1:1 visual parity.

## Root Causes

### 1. Different DOM structure
Webflow uses a specific class hierarchy (`.integrations-list` → `.integration-list-card` → `.link-block-6` → `.sidebar-image-container` + `.project-card-details`). Astro currently renders completely different Tailwind-utility markup — none of the Webflow hover effects, spacing, or card structures apply.

### 2. Missing CSS variables
Webflow CSS references `--untitled-ui-gray100`, `--untitled-ui-primary700`, etc. These don't exist in `src/styles/global.css` (Astro uses `--color-gray-100`, `--color-zenml-500`, etc.).

### 3. Wrong metadata shown on cards
| Element | Webflow Shows | Astro Shows |
|---------|--------------|-------------|
| Card image | Yes (preview image) | Yes (mainImageLink) |
| Title | Yes | Yes |
| Description | Yes | Yes |
| License badge | "Apache - 2.0 License" (hardcoded) | No |
| Setup time | "Setup time: 5-10 mins" (hardcoded) | No |
| Tools chips | No | Yes (Badge.astro) |

### 4. Detail page is single-column vs 2-column
Webflow detail has a sticky left sidebar (image, project ID, GitHub link, pipelines, recommended stack, tools, tags) and a right content column. Astro renders everything in a single `.prose` column.

---

## Key Decisions (to confirm before implementing)

1. **License / setup time**: Hardcode like Webflow, or add to content schema?
   - Recommendation: Hardcode initially (matches Webflow exactly), can make dynamic later
2. **Pipelines / stack in body vs frontmatter**: Parse from body HTML, or extract to explicit frontmatter fields?
   - Recommendation: Keep in body for now (less content migration work), render body in the right column of the 2-col layout
3. **CSS approach**: Port Webflow CSS classes vs rewrite in Tailwind?
   - Recommendation: **Rewrite in Tailwind** (consistent with all other pages in the project — we haven't used Webflow CSS anywhere else)

---

## Implementation Plan

### Step 1: Study the Webflow originals in detail

Files to reference:
- `design/webflow-export/extracted/projects.html` — listing page
- `design/webflow-export/extracted/detail_projects.html` — detail template
- `design/webflow-export/extracted/css/zenml.webflow.css` — key classes

Key Webflow CSS values to extract:
- **Listing grid**: `.integrations-list` — 3-column grid, specific gaps
- **Card hover**: `.integration-list-card:hover` — border color change, `translateY(-10px)`, shadow
- **Card structure**: `.link-block-6` — internal 2-column grid (image left, details right)
- **Detail 2-column**: `.two-column-layout` — `grid-template-columns: 1fr 2fr`, sticky sidebar
- **Detail sidebar**: `.info-vertical` — sticky, specific row styling with borders

### Step 2: Rewrite `/projects` listing page (Tailwind approach)

**File**: `src/pages/projects/index.astro`

Changes:
1. **Hero section**: Match Webflow's centered hero with:
   - Purple "ZenML Projects" badge (`.uui-badge.is-primary` style)
   - Large heading: "A home for machine learning projects built using ZenML and various integrations"
   - Subtext paragraph
2. **Grid**: 3-column grid matching `.integrations-list` gaps/sizing
3. **Cards**: Each card should have:
   - Rounded corners, subtle border, gradient-ish background
   - Hover: lift up (`-translate-y-2.5`), shadow, border color change
   - Internal layout: image container (left/top) + details area
   - Show: title, description, license badge icon+text, setup time icon+text
   - Remove: tools chips (Badge.astro not used here)
4. **CTA section** at bottom (if present in Webflow)

### Step 3: Rewrite `/projects/[slug]` detail page

**File**: `src/pages/projects/[slug].astro`

Changes:
1. **Header section**:
   - "All Projects" back link with left arrow
   - Project image (small, squared) on the left
   - Title + description on the right
2. **Body**: 2-column layout
   - **Left column (sticky sidebar)**:
     - Project image (larger)
     - Details rows with labels: Project title, Project ID, GitHub repository link, Tools (as badges), Tags (as badges)
   - **Right column**:
     - "Details" section: render markdown body here (use `.prose` or matching rich-text styles)
     - "Gallery" section: render gallery image if available
3. **CTA section** at bottom

### Step 4: Schema updates (if needed)

**File**: `src/content.config.ts`

Potential additions to `projectSchema`:
- `previewImage` (optional) — currently in some content files but stripped by Zod
- `license` (optional string) — if we want it dynamic
- `setupTime` (optional string) — if we want it dynamic
- `galleryImages` (optional array) — for detail page gallery

For now, only add `previewImage` if content files already have it. Keep license/setupTime hardcoded.

### Step 5: Verify parity

Checklist for `/projects`:
- [ ] Hero: badge, heading, subtext match Webflow typography/spacing
- [ ] Grid: 3 columns desktop, responsive collapse
- [ ] Cards: border-radius, background, hover lift + shadow
- [ ] Cards: image container aspect ratio and cropping
- [ ] Cards: license badge + setup time displayed
- [ ] Cards: no tools chips shown
- [ ] CTA section at bottom (if applicable)

Checklist for `/projects/[slug]`:
- [ ] Header: back link, image + title layout
- [ ] Body: 2-column layout with sticky left sidebar
- [ ] Sidebar: project details rows with labels, borders, typography
- [ ] Sidebar: project ID styled (monospace, colored)
- [ ] Sidebar: tools/tags as badges
- [ ] Right column: rendered markdown body
- [ ] Gallery row (or hidden if no gallery)
- [ ] CTA section at bottom

---

## Files to Modify

| File | Action |
|------|--------|
| `src/pages/projects/index.astro` | Rewrite listing layout, cards, hero |
| `src/pages/projects/[slug].astro` | Rewrite to 2-column layout with sidebar |
| `src/content.config.ts` | Add `previewImage` field (optional) |

## Files to Reference

| File | Purpose |
|------|---------|
| `design/webflow-export/extracted/projects.html` | Webflow listing HTML |
| `design/webflow-export/extracted/detail_projects.html` | Webflow detail HTML |
| `design/webflow-export/extracted/css/zenml.webflow.css` | Webflow CSS values |
| `src/content/projects/*.md` | Content files (16 projects) |

## Estimated Scope

- Listing page rewrite: ~100-150 lines
- Detail page rewrite: ~150-200 lines
- Schema update: ~5 lines
- No new components needed (inline Tailwind, consistent with other pages)
