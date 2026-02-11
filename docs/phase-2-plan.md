# Phase 2: Content Collections & Schemas — Detailed Plan

**Created:** 2026-02-11
**Status:** Ready for review
**Prerequisites:** Phase 1 complete (1,904 MDX files, 2,397 R2 assets)

---

## Overview

Phase 2 establishes the **typed content layer** for the entire site. We'll define Astro Content Collection schemas that validate all 1,904 MDX files exported from Webflow, organize them into `src/content/<collection>/` directories, and run Astro's build-time validation to catch any content issues early.

**Key principle:** Collection directory names should align with route segments to minimize glue code (e.g., `blog/` not `blog-posts/` since the route is `/blog/<slug>`).

---

## Goals

1. **Define schemas for all 7 content collections** (blog, integrations, llmops-database, compare, team, projects, old-projects)
2. **Define schemas for all reference collections** (authors, categories, tags, integration-types, etc.)
3. **Move transformed MDX from Phase 1 artifacts into `src/content/`**
4. **Run Astro build validation** to ensure all content passes schema checks
5. **Fix any validation errors** (missing fields, incorrect types, malformed frontmatter)
6. **Document the content model** for Phase 3 template work

---

## Content Collections Inventory

From Phase 1 transform output (`design/migration/phase1/runs/2026-02-11T0626Z/transform/collections/`):

| Collection | Items | Route Pattern | Notes |
|------------|-------|---------------|-------|
| **blog** | 317 | `/blog/<slug>` | Blog posts with author/category/tags refs |
| **integrations** | 68 | `/integrations/<slug>` | Integration pages with type refs |
| **llmops-database** | 1,453 | `/llmops-database/<slug>` | LLMOps entries with tags/industry refs |
| **compare** | 17 | `/compare/<slug>` | VS comparison pages |
| **team** | 22 | `/team/<slug>` | Team member bios |
| **projects** | 16 | `/projects/<slug>` | Project showcase (new) |
| **old-projects** | 11 | `/old-projects/<slug>` | Legacy projects |
| **TOTAL** | **1,904** | | |

### Reference Collections (Not Yet Transformed)

These collections are **referenced by** the main collections above but were not transformed to MDX in Phase 1 (they have no body content). We'll need to export them as JSON or create minimal MDX stubs for Astro Content Collections.

| Collection | Items | Referenced By | Route? |
|------------|-------|---------------|--------|
| **authors** | 27 | blog | `/author/<slug>` (listing page) |
| **categories** | 14 | blog | `/category/<slug>` (listing page) |
| **tags** | 118 | blog | `/tags/<slug>` (listing page) |
| **llmops-tags** | 107 | llmops-database | `/llmops-tags/<slug>` (listing page) |
| **industry-tags** | 17 | llmops-database | `/industry-tags/<slug>` (listing page) |
| **integration-types** | 17 | integrations | `/integration-type/<slug>` (listing page) |
| **advantages** | 45 | compare (VS pages) | No public route (embedded only) |
| **quotes** | 6 | ? | No public route (embedded only) |
| **product-categories** | 5 | ? | No public route (embedded only) |
| **project-tags** | 80 | projects | No public route (embedded only) |
| **project-categories** | ? | old-projects | No public route (embedded only) |

**Decision needed:** Should reference collections be:
- **Option A:** JSON files in `src/data/` (simpler, no Content Collections overhead)
- **Option B:** Minimal MDX stubs in `src/content/<collection>/` (allows future body content, consistent API)

**Recommendation:** Option A (JSON in `src/data/`) for now. We can migrate to Content Collections later if we need body content for listing pages.

---

## Phase 2 Sub-Tasks

### 2A: Define Reusable Schema Helpers

**Goal:** Create shared Zod schemas for common patterns (SEO, Webflow metadata, images, references).

**Tasks:**
- [ ] Create `src/content/config.ts` with Astro's `defineCollection()` setup
- [ ] Define reusable schemas:
  - `seoSchema` (title, description, canonical, ogImage, ogTitle, ogDescription)
  - `webflowMetaSchema` (siteId, collectionId, itemId, source, exportedAt, lastPublished, createdOn)
  - `imageSchema` (url, alt?, width?, height?)
  - `referenceSchema` (slug-based references with validation)
- [ ] Export helper functions for reference validation (e.g., `z.string().refine()` to check slug exists)

**Expected output:** `src/content/config.ts` with base schemas ready for collection definitions.

---

### 2B: Define Main Collection Schemas

**Goal:** Define typed schemas for the 7 main content collections (blog, integrations, llmops-database, compare, team, projects, old-projects).

#### Blog Posts Schema

**Route:** `/blog/<slug>`
**Frontmatter fields** (from Phase 1 sample):

```typescript
const blogSchema = z.object({
  // Core content fields
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // Blog-specific fields
  author: z.string(), // slug reference to authors collection
  category: z.string(), // slug reference to categories collection
  tags: z.array(z.string()).default([]), // slug references to tags collection
  date: z.coerce.date(),
  readingTime: z.string().optional(), // e.g., "4 mins"

  // Media
  mainImage: imageSchema.optional(),

  // SEO (merged from baseline crawl)
  seo: seoSchema,

  // Webflow metadata (for traceability)
  webflow: webflowMetaSchema,
});
```

**Tasks:**
- [ ] Define `blogSchema` in `src/content/config.ts`
- [ ] Add reference validation for `author`, `category`, `tags`
- [ ] Test against Phase 1 blog sample (317 posts)

#### Integrations Schema

**Route:** `/integrations/<slug>`
**Frontmatter fields:**

```typescript
const integrationSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // Integration-specific fields (inferred from sample)
  type: z.string().optional(), // slug reference to integration-types
  logo: imageSchema.optional(),

  // SEO
  seo: seoSchema,

  // Webflow metadata
  webflow: webflowMetaSchema,
});
```

**Tasks:**
- [ ] Inspect 2-3 integration samples to confirm field types
- [ ] Define `integrationSchema`
- [ ] Add reference validation for `type`

#### LLMOps Database Schema

**Route:** `/llmops-database/<slug>`
**Frontmatter fields:**

```typescript
const llmopsSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // LLMOps-specific fields (inferred from Phase 1 sample)
  // Note: body content is Markdown (not HTML like blog posts)
  tags: z.array(z.string()).default([]), // llmops-tags references
  industry: z.array(z.string()).default([]), // industry-tags references

  // SEO
  seo: seoSchema,

  // Webflow metadata
  webflow: webflowMetaSchema,
});
```

**Tasks:**
- [ ] Inspect LLMOps samples to confirm structured fields
- [ ] Define `llmopsSchema`
- [ ] Add reference validation for `tags`, `industry`

#### VS/Compare Pages Schema

**Route:** `/compare/<slug>`
**Frontmatter fields:**

```typescript
const compareSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // VS page-specific fields (inferred from structure)
  competitor: z.string().optional(), // e.g., "Kubeflow", "MLflow"
  advantages: z.array(z.string()).default([]), // references to advantages collection

  // SEO
  seo: seoSchema,

  // Webflow metadata
  webflow: webflowMetaSchema,
});
```

**Tasks:**
- [ ] Inspect 2-3 VS page samples to confirm structure
- [ ] Define `compareSchema`
- [ ] Add reference validation for `advantages`

#### Team Members Schema

**Route:** `/team/<slug>`
**Frontmatter fields:**

```typescript
const teamSchema = z.object({
  title: z.string(), // Full name (e.g., "Yagmur Ay")
  slug: z.string(),
  draft: z.boolean().default(false),

  // Team-specific fields (inferred from sample)
  position: z.string().optional(),
  photo: imageSchema.optional(),
  bio: z.string().optional(), // or in body content?
  email: z.string().email().optional(),
  linkedin: z.string().url().optional(),

  // Webflow metadata
  webflow: webflowMetaSchema,
});
```

**Tasks:**
- [ ] Inspect team member samples to confirm field structure
- [ ] Decide if bio is in frontmatter or body content (Phase 1 sample shows bullet list in body)
- [ ] Define `teamSchema`

#### Projects Schema

**Route:** `/projects/<slug>`
**Frontmatter fields:**

```typescript
const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // Project-specific fields (need to inspect samples)
  tags: z.array(z.string()).default([]), // project-tags references
  coverImage: imageSchema.optional(),

  // SEO (if public-facing)
  seo: seoSchema.optional(),

  // Webflow metadata
  webflow: webflowMetaSchema,
});
```

**Tasks:**
- [ ] Inspect project samples to confirm field structure
- [ ] Define `projectSchema`

#### Old Projects Schema

**Route:** `/old-projects/<slug>`
Similar to projects schema, but legacy format.

**Tasks:**
- [ ] Inspect old-projects samples
- [ ] Define `oldProjectSchema` (may be identical to `projectSchema`)

---

### 2C: Export Reference Collections as JSON

**Goal:** Export reference collections (authors, categories, tags, etc.) from Webflow as JSON files for `src/data/`.

**Approach:** Write a new script `scripts/phase2/export-references.ts` that:
1. Reads from Phase 1 Webflow export (`design/migration/phase1/runs/2026-02-11T0626Z/webflow/items/`)
2. Extracts relevant fields (slug, name, avatar/image, bio, etc.)
3. Writes to `src/data/<collection>.json`

**Collections to export:**
- [ ] `src/data/authors.json` (27 items) — name, slug, avatar, bio, email, linkedin
- [ ] `src/data/categories.json` (14 items) — name, slug
- [ ] `src/data/tags.json` (118 items) — name, slug
- [ ] `src/data/llmops-tags.json` (107 items) — name, slug
- [ ] `src/data/industry-tags.json` (17 items) — name, slug
- [ ] `src/data/integration-types.json` (17 items) — name, slug
- [ ] `src/data/advantages.json` (45 items) — title, slug, content (short text)
- [ ] `src/data/quotes.json` (6 items) — text, author
- [ ] `src/data/product-categories.json` (5 items) — name, slug
- [ ] `src/data/project-tags.json` (80 items) — name, slug

**Script structure:**

```typescript
// scripts/phase2/export-references.ts
const WEBFLOW_ITEMS = "design/migration/phase1/runs/2026-02-11T0626Z/webflow/items";
const OUTPUT_DIR = "src/data";

interface ReferenceItem {
  slug: string;
  name: string;
  [key: string]: any; // other fields vary by collection
}

function exportCollection(collectionSlug: string, fields: string[]) {
  // 1. Read Webflow items JSON
  // 2. Map to ReferenceItem[]
  // 3. Write to src/data/<collection>.json
}

// Export all reference collections
exportCollection("blog-authors", ["slug", "name", "avatar", "bio", "email", "linkedin"]);
exportCollection("blog-categories", ["slug", "name"]);
// ... etc
```

**Validation:** After export, verify JSON files load correctly and slugs match references in MDX frontmatter.

---

### 2D: Copy Transformed MDX into `src/content/`

**Goal:** Move all 1,904 MDX files from Phase 1 artifacts into Astro's `src/content/<collection>/` directories.

**File naming strategy:**
- **Keep Webflow ID prefix** for traceability (e.g., `68be954c.newsletter-17.mdx`)
- **Or remove ID prefix** for cleaner URLs? (e.g., `newsletter-17.mdx`)

**Decision:** Keep ID prefix during Phase 2 for traceability. We can remove it in Phase 3 if desired (Astro uses `slug` from frontmatter, not filename).

**Tasks:**
- [ ] Create `src/content/blog/` directory
- [ ] Copy `design/migration/phase1/runs/2026-02-11T0626Z/transform/collections/blog/*.mdx` → `src/content/blog/`
- [ ] Repeat for all 7 collections (integrations, llmops-database, compare, team, projects, old-projects)
- [ ] Verify file count matches Phase 1 stats (1,904 total)

**Command:**
```bash
# Copy all collections
cp -r design/migration/phase1/runs/2026-02-11T0626Z/transform/collections/* src/content/

# Verify counts
find src/content -name "*.mdx" | wc -l  # Should be 1,904
```

---

### 2E: Implement Content Collection Definitions

**Goal:** Wire up all schemas in `src/content/config.ts` using Astro's `defineCollection()`.

**Full config structure:**

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Reusable schemas
const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  canonical: z.string().url().optional(),
  ogImage: z.string().url().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
});

const webflowMetaSchema = z.object({
  siteId: z.string(),
  collectionId: z.string().nullable(),
  itemId: z.string(),
  exportedAt: z.string(),
  source: z.enum(["live", "staged-only"]),
  lastPublished: z.string().optional(),
  lastUpdated: z.string().optional(),
  createdOn: z.string().optional(),
});

const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

// Collection schemas
const blogSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),
  author: z.string(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  date: z.coerce.date(),
  readingTime: z.string().optional(),
  mainImage: imageSchema.optional(),
  seo: seoSchema,
  webflow: webflowMetaSchema,
});

// ... (define other schemas: integrationSchema, llmopsSchema, compareSchema, teamSchema, projectSchema, oldProjectSchema)

// Define collections
export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: blogSchema
  }),
  integrations: defineCollection({
    type: 'content',
    schema: integrationSchema
  }),
  'llmops-database': defineCollection({
    type: 'content',
    schema: llmopsSchema
  }),
  compare: defineCollection({
    type: 'content',
    schema: compareSchema
  }),
  team: defineCollection({
    type: 'content',
    schema: teamSchema
  }),
  projects: defineCollection({
    type: 'content',
    schema: projectSchema
  }),
  'old-projects': defineCollection({
    type: 'content',
    schema: oldProjectSchema
  }),
};
```

**Tasks:**
- [ ] Implement all schemas in `src/content/config.ts`
- [ ] Add JSDoc comments for documentation
- [ ] Export `collections` object

---

### 2F: Run Astro Build Validation

**Goal:** Run `astro build` to validate all 1,904 MDX files against the schemas. Fix any validation errors.

**Expected errors:**
1. **Missing required fields** (e.g., `title`, `slug`, `seo`)
2. **Incorrect field types** (e.g., `date` as string instead of Date)
3. **Invalid references** (e.g., author slug doesn't exist in `authors.json`)
4. **Malformed URLs** (e.g., SEO canonical not a valid URL)

**Validation workflow:**
```bash
# Run build (will fail on first error)
pnpm run build

# Fix error in MDX or schema
# Re-run build
# Repeat until all errors resolved
```

**Tasks:**
- [ ] Run `pnpm run build`
- [ ] Document all validation errors in a `phase-2-validation-log.md`
- [ ] Fix errors (either in MDX files or schemas)
- [ ] Achieve 100% validation pass (1,904 / 1,904 files)

**Common fixes:**
- **Missing SEO metadata:** Merge from baseline crawl (Phase 1 did this, but some entries had no SEO data)
- **Invalid dates:** Convert to ISO 8601 format
- **Broken references:** Check against `reference-map.json` from Phase 1

---

### 2G: Document Content Model

**Goal:** Create `docs/content-model.md` documenting all collections, schemas, and relationships for Phase 3 template work.

**Content:**
- Collection overview table (name, route, schema, items)
- Field reference for each collection
- Reference relationships diagram (e.g., blog → author, blog → tags)
- Query examples for Phase 3 (using `getCollection()`, `getEntry()`)

**Tasks:**
- [ ] Create `docs/content-model.md`
- [ ] Add schema field tables
- [ ] Add relationship diagram (Mermaid or ASCII)
- [ ] Add Astro query examples

**Example query:**
```typescript
// Get all published blog posts, sorted by date
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => {
  return data.draft !== true;
});

const sortedPosts = posts.sort((a, b) =>
  b.data.date.valueOf() - a.data.date.valueOf()
);
```

---

### 2H: Reference Validation Helper

**Goal:** Create utility functions to validate slug references (e.g., ensure `author: "alex-strick-van-linschoten"` exists in `authors.json`).

**Approach:** Add Zod `.refine()` validators to check references at build time.

**Example:**
```typescript
// src/content/config.ts
import authorsData from '../data/authors.json';

const authorSlugs = new Set(authorsData.map(a => a.slug));

const blogSchema = z.object({
  // ...
  author: z.string().refine(
    (slug) => authorSlugs.has(slug),
    (slug) => ({ message: `Author "${slug}" not found in authors.json` })
  ),
});
```

**Tasks:**
- [ ] Load all reference JSON files at config time
- [ ] Create Set lookup maps for fast validation
- [ ] Add `.refine()` validators to all reference fields
- [ ] Test with invalid reference (should fail build)

---

## Success Criteria

Phase 2 is complete when:

1. ✅ All 7 content collections have typed schemas in `src/content/config.ts`
2. ✅ All 10 reference collections exported to `src/data/*.json`
3. ✅ All 1,904 MDX files copied to `src/content/<collection>/`
4. ✅ `pnpm run build` passes with zero validation errors
5. ✅ Reference validation catches invalid slugs (tested with bad reference)
6. ✅ `docs/content-model.md` documents all collections and relationships

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Schema mismatch (frontmatter doesn't match Zod schema) | Build fails, manual fixes needed | Start with lenient schemas (`.optional()`), tighten later |
| Missing reference collections | Author/tag slugs invalid | Export all references in 2C before copying MDX in 2D |
| Large file count (1,904 MDX files) | Slow Astro build | Use `astro check` first (faster, no bundle step) |
| Webflow ID prefixes in filenames | Ugly URLs? | Astro uses `slug` from frontmatter, not filename — safe to keep IDs |

---

## Open Questions

1. **Reference collections:** JSON in `src/data/` or MDX stubs in `src/content/`? → **Recommendation: JSON for now**
2. **File naming:** Keep Webflow ID prefix (`68be954c.newsletter-17.mdx`) or remove? → **Keep for Phase 2, remove later if needed**
3. **SEO schema strictness:** Should all fields be `.optional()` or require them? → **Optional for now, tighten in Phase 3**
4. **Draft content:** How to handle `draft: true` items? → **Astro's `getCollection()` filter will exclude them in production**

---

## Estimated Effort

| Sub-Task | Effort | Dependency |
|----------|--------|------------|
| 2A: Reusable schemas | 1 hour | None |
| 2B: Main collection schemas | 3 hours | 2A |
| 2C: Export references | 2 hours | Phase 1 artifacts |
| 2D: Copy MDX files | 30 mins | 2C (references needed first) |
| 2E: Implement config | 1 hour | 2A, 2B |
| 2F: Validation & fixes | 4 hours | 2D, 2E (iterative) |
| 2G: Document content model | 1 hour | 2F (after validation passes) |
| 2H: Reference validation | 1 hour | 2C, 2E |
| **Total** | **~13 hours** | |

---

## Next Phase Preview

**Phase 3: Templates & Pages** will use these schemas to:
- Query content with `getCollection()` and `getEntry()`
- Build dynamic routes (`src/pages/blog/[slug].astro`)
- Render MDX with components
- Implement listing pages with pagination
- Build interactive widgets (LLMOps filter, search)

The content model defined in Phase 2 is the foundation for all of Phase 3.

---

## Appendix: Collection Stats

From Phase 1 transform manifest:

```json
{
  "totalItems": 1904,
  "success": 1904,
  "failed": 0,
  "totalWarnings": 152,
  "collections": {
    "blog": 317,
    "integrations": 68,
    "llmops-database": 1453,
    "compare": 17,
    "team": 22,
    "projects": 16,
    "old-projects": 11
  }
}
```

All 1,904 items transformed successfully. The 152 warnings are informational (video embeds, recent posts without SEO data).
