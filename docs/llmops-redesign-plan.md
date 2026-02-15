# LLMOps Database UX Redesign Plan

> **Status**: Phases 1–6 COMPLETE
> **Scope**: Full redesign pass — dual-mode (exploration/browsing + precise lookup)
> **Freedom**: Not tied to pixel-perfect Webflow replication — we can improve!
> **Pagefind**: Integrated — 1,453 pages indexed, hybrid search (Pagefind for full-text relevance + JSON index for faceted filtering)

## Current State

The LLMOps database uses a hybrid architecture:
- **Hub shell** (`src/pages/llmops-database/index.astro`): Astro page + Preact island
- **Filter island** (`src/components/islands/LLMOpsFilter.tsx`): client-side fetch of `/llmops-index.json`, substring search, AND-only tag filtering, single industry filter, pagination, URL state sync
- **Detail pages** (`src/pages/llmops-database/[slug].astro`): server-rendered, basic layout
- **Taxonomy pages** (`/llmops-tags/[slug]`, `/industry-tags/[slug]`): separate card markup

~1,453 entries, ~107 tags, ~17 industries. JSON index has: slug, title, company, summary, year, llmopsTags, industryTags, link.

## Key Gaps Identified

1. **AND-only filtering** — multi-tag selection uses AND logic, leading to zero results with no explanation
2. **Non-clickable chips** — tags and industry on listing cards are `<span>` pills, not links
3. **100+ tags with no hierarchy** — tag picker is overwhelming, no popular tags or counts
4. **No sorting** — results in whatever order the index provides
5. **Detail pages are dead ends** — no "more like this", no related entries
6. **Raw slugs on taxonomy pages** — badges show slugs instead of human-readable names
7. **No taxonomy index pages** — can't browse all tags or all industries

## Architectural Decisions (Lock Before Implementation)

1. **Search strategy**: Pagefind for full-text + relevance ranking (shared with blog). Enhanced substring as fallback during dev.
2. **LLMOpsCard as Preact component** (not Astro) — usable inside the Preact island (interactive) AND in server-rendered taxonomy pages (SSR without hydration).
3. **URL state contract** (backward compatible):
   - Keep: `q`, `tags`, `industry`, `page`
   - Add: `tagMode=and|or` (default: `and`), `sort=newest|az|relevance`
4. **Default sort**: `relevance` when query present, `newest` otherwise.
5. **Tag name normalization**: Title Case with acronym override map (RAG, LLM, SQL, etc.)

---

## Implementation Plan (Sequenced)

### Phase 1: Data/Index Evolution (Non-Breaking)

**Purpose**: Add timestamp fields for sorting + future search without breaking existing consumers.

**Create**: `src/lib/llmops/dates.ts`
- `derivePublishedTs(webflow)` — derive from `lastPublished → lastUpdated → createdOn`
- `safeParseDateTs(raw)` — safe date parsing

**Modify**: `src/pages/llmops-index.json.ts`
- Add `publishedTs` and `updatedTs` fields (numeric timestamps)
- Keep all existing fields unchanged (backward compatible)

### Phase 2: Component Unification

**Create**: `src/components/llmops/LLMOpsCard.tsx` (Preact)
- Props include: item data, `tagLabel(slug)` / `industryLabel(slug)` formatters
- Dual mode: `onTagClick`/`onIndustryClick` callbacks (interactive in island) OR `tagHref`/`industryHref` functions (links on taxonomy pages)
- Consistent chip rendering with proper display names

**Create**: `src/lib/llmops/taxonomy.ts`
- `formatTaxonomyName(raw)` — normalize display names
- `defaultTagLabel(tag)` — with acronym override map (RAG → RAG, rag → RAG, etc.)

**Modify**: `src/pages/llmops-tags/[slug].astro` — use LLMOpsCard, fix raw slug badges
**Modify**: `src/pages/industry-tags/[slug].astro` — use LLMOpsCard, fix raw slug badges

### Phase 3: Listing/Filter UX Redesign

This is the biggest phase — all changes to `LLMOpsFilter.tsx`.

#### 3.1: AND/OR Toggle + URL State
- Extend `FilterState` with `tagMode: "and" | "or"` and `sort: "newest" | "az" | "relevance"`
- Update `parseStateFromUrl()` and `writeStateToUrl()` (backward compatible)
- Update `matchesTags()` to accept mode parameter
- Add radio/toggle UI for AND/OR

#### 3.2: Sorting
- Add sort dropdown in controls row
- Implement: `az` (title.localeCompare), `newest` (publishedTs desc), `relevance` (query-dependent)
- Sort runs after filtering, before pagination

#### 3.3: Clickable Chips
- Replace inline card markup with `<LLMOpsCard />`
- Wire `onTagClick` → `toggleTag()`, `onIndustryClick` → `setSelectedIndustry()`
- Tag chip click toggles that tag; industry chip click sets industry filter

#### 3.4: Improved Tag Picker
- Compute tag counts from loaded items (`Map<tagSlug, number>`)
- "Popular tags" section (top N by count) above dropdown
- Show counts per tag ("RAG (128)")
- Replace `<details>` with controlled popover/dialog
- Mobile: full-width panel or dialog overlay
- Desktop: anchored popover
- Keyboard: Escape closes, focus returns to trigger

**Optional**: Extract to `src/components/llmops/TagPicker.tsx`

#### 3.5: Better Empty States
- Distinguish causes: query, tags, industry, combination
- Contextual CTAs: "Clear query", "Clear tags", "Switch to Match Any", "Clear all"
- Show popular tag suggestions when no results

### Phase 4: Detail Page Redesign

**Modify**: `src/pages/llmops-database/[slug].astro`

#### 4.1: Source Link as Primary CTA
- Promote `entry.data.link` to button-style CTA near title
- Add domain/year metadata block for credibility

#### 4.2: Explicit Taxonomy Labels
- "Industry": [industry badge]
- "Techniques / Tags": [tag badges...]
- "Browse all industries" / "Browse all tags" links

#### 4.3: "More Like This" Related Entries
**Create**: `src/lib/llmops/related.ts`
- `buildRelatedIndex(entries)` — inverted indices (tag→slugs, industry→slugs)
- `getRelatedSlugs(entry, index, k)` — score by shared tag overlap + same industry + recency

**Modify**: `src/pages/llmops-database/[slug].astro`
- Compute related in `getStaticPaths()` (O(N) per entry via inverted index, not O(N²))
- Render "More like this" section with LLMOpsCard

### Phase 5: Taxonomy UX

#### 5.1: Cross-Links Between Tag ↔ Industry
**Modify**: `src/pages/llmops-tags/[slug].astro`
- Compute top industries among matching entries
- Render "Common industries" section with links

**Modify**: `src/pages/industry-tags/[slug].astro`
- Compute top tags among matching entries
- Render "Common tags" section with links

#### 5.2: Taxonomy Index Pages
**Create**: `src/pages/llmops-tags/index.astro` — all tags with counts, sorted by popularity
**Create**: `src/pages/industry-tags/index.astro` — all industries with counts

**Optional**: `src/lib/llmops/counts.ts` helper

### Phase 6: Search — Pagefind Integration

**Add**: `pagefind` dependency + postbuild script

**Modify**: `src/pages/llmops-database/[slug].astro`
- Add `data-pagefind-body`, `data-pagefind-meta` (tags, industry, company, year, publishedTs)

**Modify**: `src/components/islands/LLMOpsFilter.tsx`
- Add Pagefind adapter: when `q` changes, query Pagefind for relevance ranking
- Graceful fallback to substring search when Pagefind not available (dev mode)
- Apply tag/industry filters client-side on top of Pagefind results

---

## URL State Contract

### Preserved (Backward Compatible)
| Param | Type | Current | After |
|-------|------|---------|-------|
| `q` | string | substring search | Pagefind or substring |
| `tags` | comma-separated slugs | AND filter | AND or OR (per tagMode) |
| `industry` | slug | single select | single select |
| `page` | 1-based int | pagination | pagination |

### New (Additive)
| Param | Type | Default | Notes |
|-------|------|---------|-------|
| `tagMode` | `and` or `or` | `and` | Preserves current behavior |
| `sort` | `newest`, `az`, `relevance` | context-dependent | `relevance` when `q` present |

Old links continue to work unchanged.

## Accessibility Checklist

- [x] All inputs have programmatic labels (not placeholder-only)
- [x] Tag picker fully keyboard operable (Enter/Space/Escape/arrows)
- [x] Visible `:focus-visible` states on all interactive elements
- [x] `aria-expanded`/`aria-controls` on custom popovers
- [x] Tag mode toggle uses native radio inputs or `role="radiogroup"`
- [x] Result count in `aria-live="polite"` region
- [x] Pagination has `aria-current="page"` + `aria-label`
- [x] Empty state messages announced to screen readers

## Verification

- `pnpm build` succeeds
- All existing LLMOps URLs preserved
- AND/OR toggle works and URL-syncs correctly
- Sorting works (newest, A-Z, relevance with query)
- Chips are clickable and add/toggle filters
- Tag picker shows counts and popular tags
- Empty states provide contextual recovery suggestions
- Detail pages show related entries
- Source link is prominent CTA
- Taxonomy pages show human-readable names (not slugs)
- Taxonomy index pages exist and show counts
- Keyboard navigation works through all controls
