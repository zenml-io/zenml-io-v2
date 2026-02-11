# Phase 2E: Schema Discrepancies Found

**Date:** 2026-02-11
**Task:** Define schemas for 7 main collections based on actual Phase 2A transformed output

## Summary

During Phase 2E, I analyzed sample MDX files from the Phase 2A transform output and found **significant discrepancies** between the planned schemas (in `phase-2-plan.md`) and the actual transformed data. The schemas in `src/content.config.ts` were adjusted to match the **actual output**, not the plan's assumptions.

## Critical Findings

### 1. **LLMOps Database** — CRITICAL DISCREPANCY ⚠️

**Plan assumed:**
- Field: `tags` (array of llmops-tag slug references)
- Field: `industry` (array of industry-tag slug references)

**Actual output:**
- Field: `llmopsTags` (array) ✓
- Field: `industryTags` — **DOES NOT EXIST** ❌
- Additional fields: `company`, `summary`, `link`, `year`

**Impact:** Phase 2A claimed to fix field name mapping ("use `tags` and `industry`, not `llmopsTags`/`industry-tags`"), but **the fix was never applied**. The actual transformed data still uses the original field names.

**Files verified:**
- `a-practical-blueprint-for-evaluating-conversational-ai-at-scale.mdx` — has `llmopsTags`, no `industryTags`
- `abstractive-conversation-summarization-for-google-chat-spaces.mdx` — has `llmopsTags`, no `industryTags`

**Schema adjustment:**
```typescript
const llmopsSchema = z.object({
  // ...
  llmopsTags: slugReferenceArray('llmops-tags'), // ACTUAL field name
  // Note: industryTags field does NOT exist
  company: z.string().optional(),
  summary: z.string().optional(),
  link: z.string().url().optional(),
  year: z.number().optional(),
});
```

### 2. **Integrations** — Field Name Mismatches

**Plan assumed:**
- Field: `type` (integration-type slug reference)
- Field: `description`

**Actual output:**
- Field: `integrationType` (not `type`) ✓
- Field: `shortDescription` (not `description`) ✓
- Additional fields: `docsUrl`, `githubUrl`, `mainImage`, `relatedBlogPosts`

**Files verified:**
- `airflow.mdx`
- `amazon-s3.mdx`

**Schema adjustment:**
```typescript
const integrationSchema = z.object({
  integrationType: slugReference('integration-types'), // Not "type"
  shortDescription: z.string().optional(), // Not "description"
  docsUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  mainImage: imageSchema.optional(),
  relatedBlogPosts: z.array(z.string()).default([]),
});
```

### 3. **Compare/VS Pages** — Major Schema Expansion

**Plan assumed:**
- Field: `competitor`
- Field: `advantages` (slug array)

**Actual output:**
- Field: `toolName` (not `competitor`) ✓
- Field: `advantages` ✓
- **Many additional fields:**
  - `toolIcon`, `category`, `integrationType`, `quote`
  - `headline`, `heroText`, `ctaHeadline`
  - `learnMoreUrl`, `seoDescription`, `openGraphImage`

**Files verified:**
- `zenml-vs-alteryx.mdx`
- `zenml-vs-apache-airflow.mdx`

**Schema adjustment:** Added all additional fields to schema.

### 4. **Projects** — Field Name Mismatch

**Plan assumed:**
- Field: `coverImage`

**Actual output:**
- Field: `mainImageLink` (not `coverImage`) ✓
- Additional fields: `tools` (array), `createdAt`, `updatedAt`, `projectId`

**Files verified:**
- `banksubscription-predictor.mdx`

**Schema adjustment:**
```typescript
const projectSchema = z.object({
  mainImageLink: z.string().url().optional(), // Not "coverImage"
  tools: z.array(z.string()).default([]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  projectId: z.string().optional(),
});
```

### 5. **Team** — Minor Addition

**Plan:** Schema was mostly correct.

**Actual output:** Additional field `order` (number) for display ordering.

**Files verified:**
- `adam-probst.mdx`

**Schema adjustment:** Added `order: z.number().optional()`.

### 6. **Blog** — Schema Correct ✓

**Actual output matched plan perfectly:**
- `author`, `category`, `tags`, `date`, `readingTime`, `mainImage` ✓

**Files verified:**
- `10-reasons-zenml-evidently-ais-monitoring-tool.mdx`

### 7. **Old Projects** — Different Schema (Expected)

**Actual output:** Completely different field set (as expected for legacy content):
- `date`, `originalDate`, `category`, `tags`, `image`
- `description`, `seoTitle`, `seoDescription`, `readingTime`, `isFeatured`

**Files verified:**
- `customer-churn.mdx` (draft: true ✓)

## Root Cause Analysis

**Why did Phase 2A's field name fixes not apply?**

Looking at `docs/phase-2-plan.md` lines 110-117:

```markdown
#### 2A.1: Update transform script field extraction — ✅ COMPLETE

- [x] **LLMOps**: Fix taxonomy field mapping — use `tags` and `industry` (not `llmops-tags`/`industry-tags`)
```

This task was marked complete, but **the actual transform script was never updated** to rename the fields. The Phase 2A transform re-run used the **original field extraction logic**, which outputs `llmopsTags` (and no `industryTags` at all).

## Impact on Phase 2F & Beyond

**Phase 2F** (Copy MDX to `src/content/`):
- The main collection loaders commented in `src/content.config.ts` are ready to be activated
- Schemas match actual data, so validation will pass

**Phase 3** (Template Development):
- Templates must reference the **actual** field names:
  - Use `llmopsTags` (not `tags`) for LLMOps items
  - Use `integrationType` (not `type`) for integrations
  - Use `shortDescription` (not `description`) for integrations
  - Use `mainImageLink` (not `coverImage`) for projects

**Phase 2G** (Reference Validation):
- `industryTags` validation can be skipped (field doesn't exist)
- All other reference validations should work correctly

## Recommendations

1. **Accept the current field names** — schemas now match reality
2. **Update Phase 3 templates** to use actual field names
3. **Document this in CLAUDE.md** so future contributors know the correct field names
4. **Consider a future refactor** (Phase 4?) to normalize field names if desired, but not critical for launch
