# Integrations Page Parity Plan

> **RepoPrompt chat_id**: `integrations-parity-508C17` — resume with `chat_send` for full context

## Status
- **Created**: 2026-02-13
- **Phase**: Planning (not started)
- **Scope**: `/integrations` hub + `/integrations/[slug]` detail + `/integration-type/[slug]`

## Problem Summary

The migrated `/integrations` section has significant structural and visual
differences from the original Webflow implementation. These fall into three
categories:

1. **Hub page layout/UX** — wrong layout, missing hero, no real filtering
2. **Detail page structure** — missing hero, sidebar, structured sections
3. **Content model gaps** — Webflow CMS fields flattened into single markdown body

---

## 1. Comprehensive Discrepancy List

### A. `/integrations` Hub Page

| Area | Webflow (Original) | Astro (Current) | Gap |
|------|-------------------|-----------------|-----|
| **Hero** | "Integrations" bg label, H1 "Explore the MLOps Landscape with ZenML", description paragraph, "Learn more…" docs link, large illustration (`06_Abstractions_Full.svg`) | Just "Integrations" as H1, no description, no illustration | Major |
| **Layout** | 2-column: left filter list, right integrations list | Single-column with filter chips + grouped sections | Major |
| **Filtering** | Radio-style filter list with "All Integrations" + each type (Finsweet CMS Filter, `fs-cmsfilter-*`) | Chips linking to `#typeSlug` anchors (no real filtering) | Major |
| **Active filter state** | `fs-cmsfilter-active="is-active"` class toggle | No active state beyond hover | Medium |
| **Card design** | Row card: logo (60px) + name + integration type label (subtitle) | Grid card: logo + name + shortDescription (no type label) | Medium |
| **Card layout** | Vertical list of row cards | Responsive grid | Medium |
| **Pagination** | Infinite loading (`fs-cmsload-mode="infinite"`) | All items rendered at once | Low-Medium |
| **Bottom CTA** | CTA02 "Unify Your ML and LLM Workflows" section | Not present | Medium |

### B. `/integrations/[slug]` Detail Page

| Area | Webflow (Original) | Astro (Current) | Gap |
|------|-------------------|-----------------|-----|
| **Hero** | Centered: "Integrations" bg label + logo lockup (integration logo + "and" + ZenML mono logo) + GitHub button | No hero; starts with breadcrumb + left-aligned header | Major |
| **Header row** | "All integrations" back link, squared logo, H1 + summary, "Add to ZenML" CTA button | Breadcrumb + logo + title + shortDescription + badge + inline docs/github links | Major |
| **Main layout** | 2-column: sticky sidebar + main content | Single-column prose dump | Major |
| **Sidebar: Category** | Badge linking to integration type | Not present (badge exists but inline, not sidebar) | Major |
| **Sidebar: Learn More** | "Documentation" + "Get Started" links with icons and CMS link-text fields | Inline text links in header area | Medium |
| **Sidebar: Compare** | "ZenML vs X" block | Not present | Medium |
| **Sidebar: Related Resources** | Blog posts with image + truncated title | Not present | Medium |
| **Body: Sections** | Separate titled sections: "Tool overview", "Features with ZenML", screenshot, "Main Features", "How to use…", "Additional Resources" — each from distinct CMS fields | Single `<Content />` markdown dump — no guaranteed structure | Major |
| **Body: Code example** | Dedicated `code-example` field rendered in "How to use" section | Embedded in markdown body (if present) | Medium |
| **Body: Additional Resources** | Multiple link-text + link-url fields rendered as link list | Not present | Medium |
| **Bottom CTAs** | "Learn how to run on X" section, CTA02, integrations carousel + "See All Integrations" | Not present | Medium |

### C. Content Schema Gaps

Webflow CMS fields **not currently modeled** in `integrationSchema`:

| Webflow Field | Purpose | Current Status |
|--------------|---------|----------------|
| `title` (marketing title) | Overview heading, distinct from `name` | Not in schema |
| `description` (long) | Tool overview body text | Not in schema |
| `features-with-zenml` | Rich text HTML section | Flattened into body |
| `tool-features` | Rich text HTML section | Flattened into body |
| `code-example` | Code embed/block | Flattened into body |
| `documentation-link-text` | Custom label for docs link | Not in schema |
| `github-link-text` | Custom label for GitHub link | Not in schema |
| `additional-resource-link-text` (×4) | Resource link labels | Not in schema |
| `additional-resource-link` (×4) | Resource link URLs | Not in schema |
| `is-updated-to-the-new-format` | Whether entry uses new layout | Not in schema |
| Compare linkage | Which `/compare/` page matches | Not in schema |

---

## 2. Remediation Plan

### Phase 0: Architectural Decisions (lock in before coding)

**Decision 1 — Filtering UX**
- Recreate Webflow's radio filter + single list layout (not grouped anchor sections)
- Client-side filtering with progressive enhancement (no-JS fallback shows all)

**Decision 2 — Detail content strategy**
- Move from freeform markdown body → structured frontmatter fields (all optional initially)
- Render Webflow template sections from dedicated fields, with fallback to `<Content />` body

**Decision 3 — Compare block source**
- Add `compareSlug?: string` to integrations schema referencing `compare` collection
- Omit compare block when no explicit mapping exists

### Phase 1: Extend Content Model (schema + data migration)

#### 1.1 Update `src/content.config.ts`

Add to `integrationSchema`:

```ts
const integrationAdditionalResourceSchema = z.object({
  label: z.string(),
  href: z.string().url(),
});

// Add these fields to integrationSchema:
overviewTitle: z.string().optional(),
overviewDescription: z.string().optional(),
featuresWithZenmlHtml: z.string().optional(),
toolFeaturesHtml: z.string().optional(),
codeExampleHtml: z.string().optional(),
howToUseHtml: z.string().optional(),
documentationLinkText: z.string().optional(),
githubLinkText: z.string().optional(),
additionalResources: z.array(integrationAdditionalResourceSchema).default([]),
compareSlug: z.string().optional(),  // reference to compare collection
isUpdatedToNewFormat: z.boolean().optional(),
```

All fields optional so existing `.md` files still validate.

#### 1.2 Re-export content from Webflow JSON

Write a migration script that reads the raw Webflow JSON
(`design/migration/phase1/runs/2026-02-11T0626Z/webflow/items/integrations/live.json`)
and updates each `src/content/integrations/*.md` frontmatter with the new
structured fields.

**Field mapping (Webflow → Astro):**
- `fieldData.title` → `overviewTitle`
- `fieldData.description` → `overviewDescription`
- `fieldData["features-with-zenml"]` → `featuresWithZenmlHtml`
- `fieldData["tool-features"]` → `toolFeaturesHtml`
- `fieldData["code-example"]` → `codeExampleHtml`
- `fieldData["documentation-link-text"]` → `documentationLinkText`
- `fieldData["github-link-text"]` → `githubLinkText`
- `fieldData["additional-resource-link-text(-2/-3/-4)"]` + URLs → `additionalResources[]`
- `fieldData["is-updated-to-the-new-format"]` → `isUpdatedToNewFormat`

### Phase 2: Rebuild `/integrations` Hub Page

#### 2.1 Rewrite `src/pages/integrations/index.astro`

Replace current grouped-sections layout with Webflow-matching structure:

**Hero section:**
- "Integrations" background label (`.zen-heading-with-bg`)
- H1: "Explore the MLOps Landscape with ZenML"
- Description paragraph (match Webflow copy)
- "Learn more…" link to docs
- Hero illustration image

**Main content — 2-column layout:**
- Left column: filter list
  - "All Integrations" option (default active)
  - One radio-style option per integration type
  - Active state styling on selected filter
- Right column: single integrations list
  - Each card: logo (60px) + name + type label (subtitle)
  - Vertical list layout (not grid)
  - `data-type` attributes for filtering

**Bottom:** CTA02 section ("Unify Your ML and LLM Workflows")

#### 2.2 Add client-side filtering

Inline `<script>` or separate module:
- Read filter from click event (or URL param `?type=slug` for deep links)
- Toggle active class on filter items
- Show/hide cards by `data-type` attribute
- Optional: chunked reveal via IntersectionObserver (infinite-load feel)
- No-JS fallback: all items visible, filter list still renders (just non-functional)

#### 2.3 Reuse/create CTA section

If `FeaturesHubCTA.astro` or similar matches, reuse it. Otherwise create a
`Cta02.astro` component.

### Phase 3: Rebuild `/integrations/[slug]` Detail Page

#### 3.1 Create integration detail components

New files under `src/components/integrations/`:

| Component | Purpose |
|-----------|---------|
| `IntegrationDetailHero.astro` | Centered hero: bg label + logo lockup + GitHub button |
| `IntegrationDetailHeaderRow.astro` | Back link + logo + H1 + summary + "Add to ZenML" CTA |
| `IntegrationDetailSidebar.astro` | Sticky sidebar: category, learn more, compare, related |
| `IntegrationDetailBody.astro` | Sectioned content from structured fields with fallback |
| `IntegrationAdditionalResources.astro` | Additional resource links list |
| `IntegrationRelatedResources.astro` | Related blog posts with image + title |

#### 3.2 Rewrite `src/pages/integrations/[slug].astro`

**Data resolution additions:**
- Resolve related blog posts from `relatedBlogPosts` slugs
- Resolve compare page from `compareSlug` (if present)

**Render order (matching Webflow):**

1. **Hero** — centered logo lockup + GitHub button
2. **Header row** — "All integrations" back link, squared logo, H1, summary, "Add to ZenML" CTA
3. **Two-column main layout:**
   - **Sticky sidebar:**
     - Category badge (links to `/integration-type/{slug}`)
     - "Documentation" link (with `documentationLinkText`)
     - "Get Started" link (docsUrl)
     - Compare block (if `compareSlug` exists → links to `/compare/{slug}`)
     - Related resources (blog posts with image + title)
   - **Main content column:**
     - "Tool overview": `overviewTitle` + `overviewDescription`
     - "Features with ZenML": `featuresWithZenmlHtml` (via `set:html`)
     - Screenshot: `mainImage`
     - "Main Features": `toolFeaturesHtml`
     - "How to use ZenML with X": `howToUseHtml` + `codeExampleHtml`
     - Additional Resources: `additionalResources[]`
     - **Fallback**: if structured fields missing, render `<Content />` body
4. **Bottom CTAs** — "Learn how to run" + CTA02 + integrations carousel

### Phase 4: Styling & Static Assets

#### 4.1 CSS additions (`src/styles/global.css`)

- `.zen-heading-with-bg` — background label effect
- Integration card row layout (logo container + text)
- Sticky sidebar spacing + offset for nav
- Button-link pattern matching Webflow (`uui-button-link`)

#### 4.2 Static assets to add to `public/images/`

- `integrations-hero.svg` — hub hero illustration (from Webflow export)
- `zenml-logo-monocolor.svg` — for logo lockup on detail pages
- Any icons needed (GitHub, arrow-left, docs)

### Phase 5: Align `/integration-type/[slug]` (Optional)

Two options:
- **Option A (recommended):** Reuse hub template "pre-filtered" — same 2-column layout, initialized with filter active for this type
- **Option B:** Redirect to `/integrations?type=<slug>`

---

## 3. Validation Checklist

### Hub Page (`/integrations`)
- [ ] Hero: background label, exact H1, paragraph, docs link, illustration
- [ ] 2-column layout: left radio filters + right single list
- [ ] Cards show: logo, name, type label (not description)
- [ ] Filtering is interactive, active state visible
- [ ] Progressive loading or infinite-like behavior
- [ ] CTA section at bottom

### Detail Page (`/integrations/[slug]`)
- [ ] Centered hero with logo lockup + GitHub button
- [ ] Header row: "All integrations" back link + "Add to ZenML" button
- [ ] 2-column: sticky sidebar + main content
- [ ] Sidebar: category badge, docs/get-started links, compare block, related resources
- [ ] Main: titled sections in Webflow order using structured fields
- [ ] Additional Resources links render correctly
- [ ] Bottom CTAs present
- [ ] Fallback to `<Content />` body when structured fields missing

### Content Model
- [ ] All new schema fields validate
- [ ] Migration script populates frontmatter from Webflow JSON
- [ ] Existing `.md` files pass validation (all new fields optional)

---

## 4. File Impact Summary

| File | Action |
|------|--------|
| `src/content.config.ts` | Add fields to `integrationSchema` |
| `src/pages/integrations/index.astro` | Rewrite (hub layout + hero) |
| `src/pages/integrations/[slug].astro` | Rewrite (detail template) |
| `src/pages/integration-type/[slug].astro` | Update or redirect |
| `src/components/integrations/*.astro` | New (6 components) |
| `src/content/integrations/*.md` | Update frontmatter (68 files) |
| `src/styles/global.css` | Add integration-specific styles |
| `public/images/` | Add hero illustration + logo assets |
| `scripts/` | New migration script for frontmatter |

---

## 5. Open Questions

1. **"Add to ZenML" button target** — Does Webflow link to `docsUrl` or a
   separate URL? Need to check the live site.
2. **Compare mapping completeness** — How many of the 68 integrations have a
   matching `/compare/` page? May need manual mapping.
3. **Infinite load priority** — Is pixel-perfect infinite-load behavior
   required, or is "show all with client-side filter" acceptable?
4. **Integration type icons** — Webflow type entries may have icons; check if
   `integration-types` schema needs an `icon` field for the filter list.

---

## References

- Webflow hub HTML: `design/webflow-export/extracted/integrations.html` (lines ~520-799)
- Webflow detail HTML: `design/webflow-export/extracted/detail_integrations.html` (lines ~640-959)
- Webflow CMS data: `design/migration/phase1/runs/2026-02-11T0626Z/webflow/items/integrations/live.json`
- Webflow type data: `design/migration/phase1/runs/2026-02-11T0626Z/webflow/items/integration-type/live.json`
- RepoPrompt chat_id: `integrations-parity-508C17`
