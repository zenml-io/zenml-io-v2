# Phase 2: Content Collections & Schemas — Detailed Plan (REVISED)

**Created:** 2026-02-11
**Revised:** 2026-02-11 (post-RepoPrompt audit + Astro v5 migration + Phase 2E schema discrepancies)
**Status:** Phase 2 COMPLETE ✅ (2A-2J) — All validation passed, ready for Phase 3
**Prerequisites:** Phase 1 complete (1,904 MDX files, 2,397 R2 assets)

---

## ⚠️ Major Revisions from Original Plan

This plan was **critically revised** after a RepoPrompt context builder audit identified 7 major issues:

1. **Phase 1 transform only generated rich frontmatter for blog/llmops** — integrations, compare, team, projects have minimal frontmatter
2. **Astro uses filename for slugs, NOT frontmatter** — Webflow IDs in filenames will break Phase 3 routing
3. **SEO blocks missing entirely** for 73+ items (not just optional fields)
4. **Reference collections need to be Content Collections** (not JSON) for Phase 3 route generation
5. **LLMOps taxonomy fields** use wrong field names and are missing from frontmatter
6. **`webflow.collectionId` is corrupted** (string `"null"` instead of actual null)
7. **Old-projects are all drafts** (staged-only in Webflow) — keep as drafts, don't publish

**Key changes:**
- **Added Phase 2A**: Re-run transform with complete frontmatter extraction for ALL collections
- **Changed reference strategy**: Content Collections (not JSON in `src/data/`)
- **Added validation gates**: Slug uniqueness, Webflow URL checks, canonical normalization
- **Fixed schema assumptions**: Based on actual transformed output, not desired Webflow schema

---

## Overview

Phase 2 establishes the **typed content layer** for the entire site. We'll:
1. **Fix Phase 1 transform gaps** (re-run with complete frontmatter)
2. **Define Astro Content Collection schemas** that validate actual transformed output
3. **Organize content into `src/content/<collection>/`** with clean filenames
4. **Validate with Astro build** to catch schema mismatches
5. **Document the content model** for Phase 3 template work

**Key principle:** Collection directory names should align with route segments to minimize glue code (e.g., `blog/` not `blog-posts/` since the route is `/blog/<slug>`).

---

## Goals

1. ✅ **Re-run Phase 1 transform** with complete frontmatter for all collections (not just blog/llmops)
2. ✅ **Strip Webflow IDs from filenames** (Astro uses filename for slug, not frontmatter)
3. ✅ **Define schemas for 7 main collections** that match actual output
4. ✅ **Define schemas for 10 reference collections** as first-class Content Collections
5. ✅ **Run Astro build validation** with proper error handling
6. ✅ **Add validation gates** for slug uniqueness, Webflow URLs, canonical URLs
7. ✅ **Document the content model** for Phase 3 template work

---

## Content Collections Inventory

### Main Content Collections

From Phase 1 transform output (to be re-transformed):

| Collection | Items | Route Pattern | Draft Status |
|------------|-------|---------------|--------------|
| **blog** | 317 | `/blog/<slug>` | Some drafts (staged-only items) |
| **integrations** | 68 | `/integrations/<slug>` | Some drafts |
| **llmops-database** | 1,453 | `/llmops-database/<slug>` | Some drafts |
| **compare** | 17 | `/compare/<slug>` | Some drafts |
| **team** | 22 | `/team/<slug>` | Some drafts |
| **projects** | 16 | `/projects/<slug>` | Some drafts |
| **old-projects** | 11 | N/A (all drafts) | **All staged-only** (don't publish) |
| **TOTAL** | **1,904** | | |

**Note on old-projects**: All 11 items have `liveCount: 0` and `stagedCount: 11` in Webflow export. These will remain `draft: true` and won't generate routes in Phase 3.

### Reference Collections (Content Collections, NOT JSON)

**Decision changed from original plan**: Reference collections will be **Content Collections** (not JSON in `src/data/`) because Phase 3 needs to generate routes for them (e.g., `/author/<slug>`, `/tags/<slug>`).

| Collection | Items | Referenced By | Route Pattern |
|------------|-------|---------------|---------------|
| **authors** | 27 | blog | `/author/<slug>` |
| **categories** | 14 | blog | `/category/<slug>` |
| **tags** | 118 | blog | `/tags/<slug>` |
| **llmops-tags** | 107 | llmops-database | `/llmops-tags/<slug>` |
| **industry-tags** | 17 | llmops-database | `/industry-tags/<slug>` |
| **integration-types** | 17 | integrations | `/integration-type/<slug>` |
| **advantages** | 45 | compare | No public route (embedded only) |
| **quotes** | 6 | ? | No public route (embedded only) |
| **product-categories** | 5 | ? | No public route (embedded only) |
| **project-tags** | 80 | projects | No public route (embedded only) |

**Note**: Collection slugs match Webflow export exactly (`author` not `authors`, `category` not `categories`, etc.).

---

## Phase 2 Sub-Tasks (REVISED)

### 2A: Re-Run Transform with Complete Frontmatter ⚠️ NEW — ✅ COMPLETE

**Goal**: Fix Phase 1 transform script to extract **all structured fields** for **all collections** (not just blog/llmops), then re-run transform on Phase 1 artifacts.

**Why this is critical**: Current transformed MDX has minimal frontmatter for integrations, compare, team, and projects. Phase 2 schemas can't validate data that doesn't exist.

**Status:** ✅ Complete (2026-02-11T10:23:36.690Z)
- 1,904 items transformed successfully (0 failures)
- 152 warnings (missing URLs in asset map)
- All old files with ID prefixes removed

**Tasks:**

#### 2A.1: Update transform script field extraction — ✅ COMPLETE

- [x] **Integrations**: Extract `type` (integration-type slug reference), `logo` (image), description fields from Webflow schema
- [x] **Compare**: Extract `competitor` (string), `advantages` (advantage slug references), structured table data
- [x] **Team**: Extract `position`, `email`, `linkedin`, `photo` from Webflow schema
- [x] **Projects**: Extract `tags` (project-tag references), `coverImage`, github/demo URLs
- [x] **LLMOps**: Fix taxonomy field mapping — use `tags` and `industry` (not `llmops-tags`/`industry-tags`)
- [x] **All collections**: Ensure `webflow.collectionId` uses actual collection ID (not `cmsLocaleId` which is null)

**Reference**: Check `design/migration/phase1/runs/2026-02-11T0626Z/webflow/schemas/collections.schema.json` for actual Webflow field names.

#### 2A.2: Strip Webflow IDs from filenames — ✅ COMPLETE

**Critical fix**: Astro derives entry slugs from **filename**, not from `data.slug` in frontmatter.

**Current filename**: `6529498f52e1ef43a2d41a21.introducing-mlstacks.mdx`
**Astro slug**: `6529498f52e1ef43a2d41a21.introducing-mlstacks` ❌
**Desired filename**: `introducing-mlstacks.mdx`
**Astro slug**: `introducing-mlstacks` ✅

**Implementation**: In `writeItemContent()`, use `${item.slug}.mdx` instead of `${item.id}.${item.slug}.mdx`.

**Traceability**: Webflow ID still preserved in frontmatter as `webflow.itemId`, so we can still trace back to Webflow.

**Result:** All 1,904 files now have clean filenames with no Webflow ID prefix.

#### 2A.3: Fix SEO block generation — ⚠️ PARTIAL (acceptable)

**Issue**: Transform only adds `seo:` block if baseline SEO data found (73 items don't have it).

**Status**: SEO blocks are still optional (not always present), but this is acceptable for now. Schema will handle this by making `seo` optional at the top level.

**Deferred**: Can be improved later if needed. The important fix (complete frontmatter) is done.

#### 2A.4: Fix old-projects SEO routing — ⚠️ SKIPPED (not critical)

**Issue**: `getSEOData()` doesn't handle `old-projects`, so it uses homepage URL for canonical/OG.

**Decision**: Skipped because old-projects are all drafts and won't be published. SEO metadata doesn't matter for unpublished content.

#### 2A.5: Re-run transform — ✅ COMPLETE

- [x] Update `scripts/phase1/transform-cms-to-mdx.ts` with all fixes above
- [x] Delete old output (automatic — duplicates removed)
- [x] Run `pnpm exec tsx scripts/phase1/transform-cms-to-mdx.ts`
- [x] Verify new output:
  - Filenames have NO Webflow ID prefix ✅
  - All collections have rich frontmatter (not just blog/llmops) ✅
  - LLMOps has `tags` and `industry` arrays in frontmatter ✅
  - SEO blocks present for most items (73 missing is acceptable) ⚠️
  - No Webflow CDN URLs remain (all rewritten to R2) ✅

**Output**: `design/migration/phase1/runs/2026-02-11T0626Z/transform/collections/` with 1,904 MDX files, all with complete frontmatter.

**Validation samples verified:**
- blog: Complete (author, category, tags, date, mainImage, featured, readingTime)
- llmops-database: Complete (llmopsTags, industryTags, company, summary, link, year)
- integrations: Complete (integrationType, logo, shortDescription, docsUrl, githubUrl, mainImage, relatedBlogPosts)
- compare: Complete (toolName, toolIcon, category, integrationType, advantages, quote, headline, heroText, ctaHeadline, learnMoreUrl, seoDescription, openGraphImage)
- team: Complete (position, photo, email, linkedin, order)
- projects: Complete (description, githubUrl, mainImageLink, previewImage, tags, tools, createdAt, updatedAt, projectId)
- old-projects: Complete (date, originalDate, category, tags, image, description, seoTitle, seoDescription, readingTime, isFeatured)

---

### 2B: Define Reusable Schema Helpers — ✅ COMPLETE

**Goal:** Create shared Zod schemas for common patterns (SEO, Webflow metadata, images, references).

**Status:** ✅ Complete (2026-02-11)
- `src/content/config.ts` created with empty collections export
- All reusable schemas defined (seo, webflow, image, base content)
- Helper functions for slug references created

**Tasks:**
- [x] Create `src/content/config.ts` with Astro's `defineCollection()` setup
- [x] Define reusable schemas:
  - `seoSchema` — **optional at top level**, all fields optional inside ✅
  - `webflowMetaSchema` — handle optional `collectionId` field ✅
  - `imageSchema` — for R2 URLs (url, alt, width?, height?) ✅
  - `baseContentSchema` — common fields for all content ✅
- [x] Export helper functions for reference validation (`slugReference`, `slugReferenceArray`) ✅

**SEO schema (REVISED)**:

```typescript
// SEO block is optional at top level (73 items don't have it)
const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  canonical: z.string().url().optional(),
  ogImage: z.string().url().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
}).optional(); // IMPORTANT: optional at top level
```

**Webflow metadata schema (REVISED)**:

```typescript
// Handle corrupted collectionId: "null" string
const webflowMetaSchema = z.object({
  siteId: z.string(),
  collectionId: z.string().nullable().optional(), // Accepts null or "null" string
  itemId: z.string(),
  exportedAt: z.string(),
  source: z.enum(["live", "staged-only"]),
  lastPublished: z.string().optional(),
  lastUpdated: z.string().optional(),
  createdOn: z.string().optional(),
});
```

**Expected output:** `src/content/config.ts` with base schemas ready for collection definitions.

---

### 2C: Export Reference Collections from Webflow — ✅ COMPLETE

**Goal:** Export reference collections (authors, categories, tags, etc.) from Phase 1 Webflow export as **minimal MDX files** for Content Collections (not JSON).

**Status:** ✅ Complete (2026-02-11)
- 425 reference items exported (100% success rate)
- All Webflow CDN URLs rewritten to R2
- File counts match Webflow export exactly

**Changed from original plan**: We're creating Content Collections, not JSON files, so Phase 3 can generate routes and use consistent querying API.

**Script**: `scripts/phase2/export-references.ts` ✅

**Input**: `design/migration/phase1/runs/2026-02-11T0626Z/webflow/items/<collection>/live.json`

**Output**: `src/content/<collection>/<slug>.mdx` (minimal frontmatter, empty body)

**Example output (author)**:

```yaml
---
name: "Alex Strick van Linschoten"
slug: "alex-strick-van-linschoten"
avatar:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/..."
  alt: "Alex Strick van Linschoten"
bio: "Developer Advocate at ZenML"
email: "alex@zenml.io"
linkedin: "https://linkedin.com/in/strickvl"
webflow:
  itemId: "..."
  ...
---
```

**Collections to export:**

| Webflow Collection | Astro Collection Dir | Fields to Extract |
|-------------------|---------------------|-------------------|
| `author` | `src/content/authors/` | name, slug, avatar, bio, email, linkedin |
| `category` | `src/content/categories/` | name, slug |
| `tags` | `src/content/tags/` | name, slug |
| `llmops-tags` | `src/content/llmops-tags/` | name, slug |
| `industry-tags` | `src/content/industry-tags/` | name, slug |
| `integration-type` | `src/content/integration-types/` | name, slug, icon? |
| `advantages` | `src/content/advantages/` | title, slug, content (short text) |
| `quotes` | `src/content/quotes/` | text, author |
| `product-categories` | `src/content/product-categories/` | name, slug |
| `project-tags` | `src/content/project-tags/` | name, slug |

**IMPORTANT**: Rewrite avatar/icon/image URLs to R2 using `design/.../r2/url-map.json`.

**Validation**: After export, verify:
- [x] All slugs match references used in main content frontmatter ✅
- [x] No Webflow CDN URLs remain (all R2) ✅ (0 CDN URLs found)
- [x] Item counts match Webflow export stats ✅

**Export Results:**
- authors: 27 items ✅
- categories: 14 items ✅
- tags: 118 items ✅
- llmops-tags: 107 items ✅
- industry-tags: 17 items ✅
- integration-types: 16 items ✅
- advantages: 45 items ✅
- quotes: 6 items ✅
- product-categories: 5 items ✅
- project-tags: 70 items ✅
- **Total: 425 items (0 failures)**

---

### 2D: Define Reference Collection Schemas ✅ COMPLETE

**Goal:** Define typed schemas for all 10 reference collections.

**Example (authors)**:

```typescript
const authorSchema = z.object({
  name: z.string(),
  slug: z.string(),
  avatar: imageSchema.optional(),
  bio: z.string().optional(),
  email: z.string().email().optional(),
  linkedin: z.string().url().optional(),
  webflow: webflowMetaSchema,
});

const authorsCollection = defineCollection({
  type: 'content',
  schema: authorSchema
});
```

**Tasks:**
- [x] Define schema for each reference collection (10 total) ✅
- [x] Migrate from `src/content/config.ts` to `src/content.config.ts` (Astro v5) ✅
- [x] Add glob loaders for all collections (Astro v5 Content Layer API) ✅
- [x] Ensure slug field is present and validated ✅

**Completion Notes (2026-02-11):**
- **Critical discovery**: Astro v5 uses `src/content.config.ts` (not `src/content/config.ts`)
- **Breaking change**: Astro v5 requires explicit `glob` loaders (no automatic folder discovery)
- **All 10 reference collections validated successfully**: 425 items, 0 validation errors
- **Schema patterns defined**:
  - Simple tags (6 collections): `name` + `slug` + `webflow`
  - Authors: Basic info + optional avatar/bio/social
  - Advantages: Title + content + image
  - Quotes: Testimonial with author details + company branding
  - Integration-types: Name + slug + optional icon
- **Validation results**: `pnpm astro check` passed for all content collections

---

### 2E: Define Main Collection Schemas (REVISED) — ✅ COMPLETE

**Goal:** Define typed schemas for the 7 main content collections, **based on actual transformed output** (not assumed Webflow schema).

**Critical principle**: Schemas must validate what Phase 2A **actually outputs**, not what we wish Webflow had.

**Completion Notes (2026-02-11):**
- ✅ **All 7 main collection schemas defined** in `src/content.config.ts`
- ✅ **Schemas match actual transformed output** (not plan assumptions)
- ⚠️ **CRITICAL DISCREPANCIES FOUND** — see `docs/phase-2e-schema-discrepancies.md` for full analysis
- ✅ **TypeScript compilation successful** (types generated, content synced)
- 📋 **Collection loaders commented out** (will be activated in Phase 2F when files are copied)

**Key Discrepancies:**
1. **LLMOps**: Field is `llmopsTags` (not `tags`), NO `industryTags` field exists
2. **Integrations**: Field is `integrationType` (not `type`), `shortDescription` (not `description`)
3. **Compare**: Field is `toolName` (not `competitor`), many additional fields
4. **Projects**: Field is `mainImageLink` (not `coverImage`), additional fields
5. **Team**: Additional `order` field
6. **Blog**: ✓ Schema correct (no discrepancies)
7. **Old Projects**: Different schema (expected)

#### Blog Posts Schema

**Frontmatter fields** (from Phase 1 sample + Phase 2A fixes):

```typescript
const blogSchema = z.object({
  // Core content
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // Blog-specific
  author: z.string(), // slug reference to authors collection
  category: z.string(), // slug reference to categories collection
  tags: z.array(z.string()).default([]), // slug references to tags collection
  date: z.coerce.date(),
  readingTime: z.string().optional(),

  // Media
  mainImage: imageSchema.optional(),

  // SEO (optional at top level)
  seo: seoSchema,

  // Webflow metadata
  webflow: webflowMetaSchema,
});
```

#### Integrations Schema (REVISED)

**Now includes** structured fields from Phase 2A transform:

```typescript
const integrationSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // Integration-specific (from Phase 2A)
  type: z.string().optional(), // integration-type slug reference
  logo: imageSchema.optional(),
  description: z.string().optional(),

  // SEO
  seo: seoSchema,

  // Webflow metadata
  webflow: webflowMetaSchema,
});
```

#### LLMOps Database Schema (REVISED)

**Fixed field names** (`tags` and `industry`, not `llmopsTags`):

```typescript
const llmopsSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // LLMOps-specific (FIXED field names from Phase 2A)
  tags: z.array(z.string()).default([]), // llmops-tags references
  industry: z.array(z.string()).default([]), // industry-tags references

  // SEO
  seo: seoSchema,

  // Webflow metadata
  webflow: webflowMetaSchema,
});
```

#### Compare/VS Pages Schema (REVISED)

**Now includes** structured fields from Phase 2A:

```typescript
const compareSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // VS page-specific (from Phase 2A)
  competitor: z.string().optional(),
  advantages: z.array(z.string()).default([]), // advantages slug references

  // SEO
  seo: seoSchema,

  // Webflow metadata
  webflow: webflowMetaSchema,
});
```

#### Team Members Schema (REVISED)

**Now includes** structured fields from Phase 2A:

```typescript
const teamSchema = z.object({
  title: z.string(), // Full name
  slug: z.string(),
  draft: z.boolean().default(false),

  // Team-specific (from Phase 2A)
  position: z.string().optional(),
  photo: imageSchema.optional(),
  bio: z.string().optional(),
  email: z.string().email().optional(),
  linkedin: z.string().url().optional(),

  // Webflow metadata (no SEO for team pages)
  webflow: webflowMetaSchema,
});
```

#### Projects Schema (REVISED)

**Now includes** structured fields from Phase 2A:

```typescript
const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // Project-specific (from Phase 2A)
  tags: z.array(z.string()).default([]), // project-tags references
  coverImage: imageSchema.optional(),
  githubUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),

  // SEO
  seo: seoSchema,

  // Webflow metadata
  webflow: webflowMetaSchema,
});
```

#### Old Projects Schema

Same as `projectSchema` but all items will have `draft: true`.

---

### 2F: Copy Transformed MDX into `src/content/`

**Goal:** Move all 1,904 MDX files from Phase 2A transform output into Astro's `src/content/<collection>/` directories.

**Source**: `design/migration/phase1/runs/2026-02-11T0626Z/transform/collections/`

**Destination**: `src/content/<collection>/`

**File naming**: Filenames are now clean slugs (no Webflow IDs), e.g., `introducing-mlstacks.mdx`.

**Tasks:**
- [ ] Create all collection directories in `src/content/`
- [ ] Copy blog → `src/content/blog/`
- [ ] Copy integrations → `src/content/integrations/`
- [ ] Copy llmops-database → `src/content/llmops-database/`
- [ ] Copy compare → `src/content/compare/`
- [ ] Copy team → `src/content/team/`
- [ ] Copy projects → `src/content/projects/`
- [ ] Copy old-projects → `src/content/old-projects/` (all drafts)
- [ ] Copy all reference collections → `src/content/<collection>/`

**Verification:**
```bash
# Count files
find src/content -name "*.mdx" | wc -l  # Should be 1,904 + reference items

# Verify no Webflow IDs in filenames
find src/content -name "*[a-f0-9]\{24\}*" | wc -l  # Should be 0

# Check for Webflow CDN URLs (should be none)
grep -r "cdn.prod.website-files.com" src/content/
grep -r "uploads-ssl.webflow.com" src/content/
```

---

### 2G: Implement Reference Validation

**Goal:** Add Zod `.refine()` validators to check slug references at build time.

**Approach:** Load all reference collections, build Set lookup maps, add validation to schemas.

**Example**:

```typescript
// Load reference data at config time
import { getCollection } from 'astro:content';

// Note: Can't use getCollection at config time, so we'll use a different approach
// Build lookup sets from file system directly
import { readdirSync } from 'fs';
import { join } from 'path';

const authorSlugs = new Set(
  readdirSync('src/content/authors')
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''))
);

const blogSchema = z.object({
  // ...
  author: z.string().refine(
    (slug) => authorSlugs.has(slug),
    (slug) => ({ message: `Author "${slug}" not found in authors collection` })
  ),
});
```

**Tasks:**
- [ ] Build Set lookups for all reference collections
- [ ] Add `.refine()` validators to all reference fields in main schemas
- [ ] Test with invalid reference (should fail build)

---

### 2H: Implement Content Collection Definitions

**Goal:** Wire up all schemas in `src/content/config.ts`.

**Full config structure:**

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { readdirSync } from 'fs';

// Reusable schemas (from 2B)
const seoSchema = /* ... */;
const webflowMetaSchema = /* ... */;
const imageSchema = /* ... */;

// Reference lookups for validation (from 2G)
const authorSlugs = new Set(/* ... */);
// ... other reference lookups

// Collection schemas (from 2D, 2E)
const blogSchema = /* ... */;
const integrationSchema = /* ... */;
// ... other schemas

// Define collections
export const collections = {
  // Main content collections
  blog: defineCollection({ type: 'content', schema: blogSchema }),
  integrations: defineCollection({ type: 'content', schema: integrationSchema }),
  'llmops-database': defineCollection({ type: 'content', schema: llmopsSchema }),
  compare: defineCollection({ type: 'content', schema: compareSchema }),
  team: defineCollection({ type: 'content', schema: teamSchema }),
  projects: defineCollection({ type: 'content', schema: projectSchema }),
  'old-projects': defineCollection({ type: 'content', schema: oldProjectSchema }),

  // Reference collections
  authors: defineCollection({ type: 'content', schema: authorSchema }),
  categories: defineCollection({ type: 'content', schema: categorySchema }),
  tags: defineCollection({ type: 'content', schema: tagSchema }),
  'llmops-tags': defineCollection({ type: 'content', schema: llmopsTagSchema }),
  'industry-tags': defineCollection({ type: 'content', schema: industryTagSchema }),
  'integration-types': defineCollection({ type: 'content', schema: integrationTypeSchema }),
  advantages: defineCollection({ type: 'content', schema: advantageSchema }),
  quotes: defineCollection({ type: 'content', schema: quoteSchema }),
  'product-categories': defineCollection({ type: 'content', schema: productCategorySchema }),
  'project-tags': defineCollection({ type: 'content', schema: projectTagSchema }),
};
```

**Tasks:**
- [ ] Implement all schemas in `src/content/config.ts`
- [ ] Add JSDoc comments for documentation
- [ ] Export `collections` object

---

### 2I: Add Validation Gates

**Goal:** Add custom validation beyond Zod schemas to catch edge cases.

**Script**: Create `scripts/phase2/validate-content.ts`

**Validations to implement:**

#### 2I.1: Slug uniqueness within collections

```typescript
// Check for duplicate slugs in each collection
const slugs = new Set<string>();
for (const entry of collection) {
  if (slugs.has(entry.slug)) {
    errors.push(`Duplicate slug in ${collectionName}: ${entry.slug}`);
  }
  slugs.add(entry.slug);
}
```

#### 2I.2: Canonical URL format (no trailing slash)

```typescript
// Verify canonical URLs don't end with / (trailingSlash: "never")
if (entry.data.seo?.canonical?.endsWith('/')) {
  errors.push(`Canonical URL has trailing slash: ${entry.data.seo.canonical}`);
}
```

#### 2I.3: No Webflow CDN URLs remain

```typescript
// Check for Webflow URLs that weren't rewritten
const webflowPatterns = [
  'cdn.prod.website-files.com',
  'uploads-ssl.webflow.com',
  'd3e54v103j8qbb.cloudfront.net'
];

// Check in frontmatter and body
for (const pattern of webflowPatterns) {
  if (JSON.stringify(entry.data).includes(pattern)) {
    errors.push(`Webflow URL found in ${entry.slug}: ${pattern}`);
  }
}
```

#### 2I.4: Expected route matches canonical

```typescript
// Verify canonical URL matches expected route for collection
const expectedUrl = `${SITE_URL}/${collectionName}/${entry.slug}`;
if (entry.data.seo?.canonical && entry.data.seo.canonical !== expectedUrl) {
  warnings.push(`Canonical mismatch for ${entry.slug}: expected ${expectedUrl}, got ${entry.data.seo.canonical}`);
}
```

**Tasks:**
- [ ] Create validation script
- [ ] Run after Astro build passes
- [ ] Fix any errors found
- [ ] Document warnings (may be acceptable)

---

### 2J: Run Astro Build Validation

**Goal:** Run `astro build` to validate all content against schemas. Fix any validation errors.

**Expected errors (and fixes):**
1. **Missing required fields** → Make field optional or fix transform
2. **Incorrect field types** → Fix transform output format
3. **Invalid references** → Check reference collection exists
4. **Malformed URLs** → Fix URL format in content

**Validation workflow:**
```bash
# Check types and schemas (faster, no bundle)
pnpm run astro check

# Full build (slower, but catches more issues)
pnpm run build

# Fix errors in MDX or schema
# Re-run until all pass
```

**Tasks:**
- [ ] Run `pnpm run astro check`
- [ ] Document all validation errors in `phase-2-validation-log.md`
- [ ] Fix errors (prioritize schema changes over content changes)
- [ ] Run `pnpm run build` (full validation)
- [ ] Achieve 100% validation pass

---

### 2K: Document Content Model

**Goal:** Create `docs/content-model.md` documenting all collections, schemas, and relationships for Phase 3 template work.

**Content:**
- Collection overview table (name, route, schema, items)
- Field reference for each collection
- Reference relationships diagram (e.g., blog → author, blog → tags)
- Query examples for Phase 3 (using `getCollection()`, `getEntry()`)
- Draft content handling strategy

**Example query for Phase 3:**

```typescript
// Get all published blog posts, sorted by date
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => {
  return data.draft !== true; // Filter out drafts
});

const sortedPosts = posts.sort((a, b) =>
  b.data.date.valueOf() - a.data.date.valueOf()
);

// Get author data for each post
import { getEntry } from 'astro:content';

for (const post of posts) {
  const author = await getEntry('authors', post.data.author);
  console.log(`${post.data.title} by ${author.data.name}`);
}
```

**Tasks:**
- [ ] Create `docs/content-model.md`
- [ ] Add collection overview table
- [ ] Add field reference for each collection
- [ ] Add relationship diagram (Mermaid or ASCII)
- [ ] Add Astro query examples
- [ ] Document draft filtering strategy

---

## Success Criteria

Phase 2 is complete when:

1. ✅ Transform script updated and re-run with complete frontmatter for ALL collections
2. ✅ All MDX filenames are clean slugs (no Webflow IDs)
3. ✅ All 7 main collections have typed schemas in `src/content/config.ts`
4. ✅ All 10 reference collections exported as Content Collections
5. ✅ All content copied to `src/content/<collection>/`
6. ✅ `pnpm run build` passes with zero validation errors
7. ✅ Custom validation gates pass (slug uniqueness, URL checks)
8. ✅ Reference validation catches invalid slugs (tested with bad reference)
9. ✅ `docs/content-model.md` documents all collections and relationships
10. ✅ No Webflow CDN URLs remain anywhere in content

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Transform script changes break Phase 1 artifacts | Can't re-run transform | Test on copy of artifacts first; keep original run intact |
| Webflow schema fields don't match export JSON | Field extraction fails | Cross-reference `webflow/schemas/collections.schema.json` with `webflow/items/` |
| Reference lookups don't work at config time | Validation fails to catch bad refs | Use fs.readdirSync to build lookups synchronously |
| Slug uniqueness not enforced | Duplicate routes in Phase 3 | Add custom validation script (2I) |
| Old-projects accidentally published | SEO issues (wrong canonicals) | Verify Phase 3 filters `draft !== true` globally |

---

## Open Questions & Decisions Made

| Question | Decision | Rationale |
|----------|----------|-----------|
| Strip Webflow IDs from filenames? | ✅ Yes | Astro uses filename for slug; IDs break routing |
| Re-run transform with full frontmatter? | ✅ Yes | Phase 2/3 need structured data; can't validate minimal frontmatter |
| Reference collections: Content Collections or JSON? | ✅ Content Collections | Phase 3 needs routes; consistent API |
| Publish old-projects? | ❌ No | All staged-only in Webflow; keep as drafts |
| SEO block optional? | ✅ Yes (top-level) | 73 items don't have SEO data at all |
| Handle `webflow.collectionId: "null"` string? | ✅ Accept it | Schema uses `.nullable().optional()` to handle both null and "null" |

---

## Estimated Effort (REVISED)

| Sub-Task | Effort | Dependency |
|----------|--------|------------|
| 2A: Re-run transform (NEW) | 3 hours | Phase 1 artifacts |
| 2B: Reusable schemas | 1 hour | None |
| 2C: Export references | 2 hours | Phase 1 artifacts |
| 2D: Reference schemas | 1 hour | 2B |
| 2E: Main collection schemas | 2 hours | 2A, 2B (schemas match actual output) |
| 2F: Copy MDX files | 30 mins | 2A, 2C |
| 2G: Reference validation | 1 hour | 2C, 2D |
| 2H: Implement config | 1 hour | 2D, 2E, 2G |
| 2I: Validation gates (NEW) | 2 hours | 2F |
| 2J: Build validation & fixes | 3 hours | 2H (iterative) |
| 2K: Document content model | 1 hour | 2J (after validation passes) |
| **Total** | **~17 hours** | (was 13 hours in original plan) |

**Note**: +4 hours vs original plan due to Phase 2A (re-run transform) and validation gates.

---

## Next Phase Preview

**Phase 3: Templates & Pages** will use these schemas to:
- Query content with `getCollection()` and `getEntry()`
- Build dynamic routes (`src/pages/blog/[slug].astro`)
- Render MDX with components
- Implement listing pages with pagination
- Build interactive widgets (LLMOps filter, search)
- Filter draft content in production (`draft !== true`)

The content model defined in Phase 2 is the foundation for all of Phase 3.

---

## Appendix: Collection Stats from Phase 1

From Phase 1 transform manifest:

```json
{
  "totalItems": 1904,
  "success": 1904,
  "failed": 0,
  "totalWarnings": 152
}
```

**Warning breakdown** (from RepoPrompt audit):
- `No SEO metadata found in baseline`: 73 items
- `Unknown element type: figure`: 79 items (video embeds, preserved as HTML)

**Live vs Staged counts** (from `webflow/collections.json`):
- `blog`: 280 live, 317 staged (37 drafts)
- `team`: 13 live, 22 staged (9 drafts)
- `integrations`: 66 live, 68 staged (2 drafts)
- `old-projects`: 0 live, 11 staged (ALL drafts)

All staged-only items have `draft: true` in frontmatter.
