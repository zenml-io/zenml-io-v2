# Investigation: LLMOpsDB Webflow → Website migration plan

## Summary
The current LLMOpsDB pipeline is only tightly coupled to Webflow at the very end of `run.py`: after extraction, summarization, tagging, Notion property updates, and Notion block generation, it creates a Webflow CMS item and only then marks the Notion entry as `Done`.

That means the migration is very feasible, but there is one important wrinkle: the new ZenML website already renders LLMOpsDB entries from markdown files, yet its content schema and RSS feed still assume Webflow provenance. So the real migration work is not “can we generate markdown?” — it is “how do we replace the Webflow delivery truck without baking old Webflow assumptions into the new pipeline?”

My recommendation is:

1. Keep Notion as the workflow/state source of truth for now.
2. Stop treating Webflow as the publishing target.
3. Add a new Notion → website-content publishing path.
4. Do **not** write directly into canonical site content as the first step.
5. Instead, generate staged Astro-ready markdown artifacts and let the website repo validate/promote them.

## Symptoms
- `llmops-db-notion/run.py` still treats Notion as source of truth and publishes to Webflow.
- `zenml-io-v2` already stores LLMOpsDB entries as markdown files in `src/content/llmops-database/`.
- The website frontend mostly depends on business fields (`title`, `summary`, `company`, `year`, `llmopsTags`, `industryTags`) rather than Webflow metadata.
- However, the website schema still requires a `webflow` block, and the RSS feed still derives dates only from `webflow` metadata.
- Downstream scripts in `llmops-db-notion` still use the Notion fields `webflow_slug` / `webflow_url` as compatibility data.

## Investigation Log

### Phase 1 - Current `run.py` publishing edge
**Hypothesis:** Webflow is only the final publishing step, so a cutover should be localized.

**Findings:** That hypothesis is correct. The bulk of `run.py` is independent of Webflow. The pipeline extracts content, processes it into `LLMOpsDBEntry`, validates the result, expands tags, updates Notion properties, and appends Notion blocks before it ever touches Webflow. Only after that does it call `create_webflow_entry()`, write `webflow_slug` / `webflow_url` back into Notion, and set `Status = Done`.

**Evidence:**
- `run.py:504-575` defines `create_webflow_entry()` and maps the processed data into Webflow fields:
  - `industry`
  - `tags`
  - `company`
  - `link`
  - `year`
  - `summary`
  - `body`
  - `notion-page-id`
- `run.py:653-687` does tag expansion, Notion property updates, and Notion block appends before the publish step.
- `run.py:689-731` performs the Webflow publish, writes `webflow_slug` / `webflow_url`, and only sets `Status = Done` when that Webflow step succeeded.

Short story-style explanation:

> The pipeline does all the “thinking” first. It reads the article, writes the summary, tags it, updates Notion, and even appends the detailed notes back into Notion. Only then does it hand the finished package to Webflow. Webflow is the last-mile delivery truck, not the factory.

**Conclusion:** Confirmed. The main cutover point is narrow and therefore tractable.

### Phase 2 - What the website actually expects
**Hypothesis:** The new site already has a stable target content contract for LLMOpsDB entries.

**Findings:** Correct. The website uses an Astro content collection for `llmops-database`, with specific frontmatter fields for tags, industry, company, summary, link, year, SEO, and currently required `webflow` metadata.

**Evidence:**
- `zenml-io-v2/src/content.config.ts:382-398` defines the current `llmopsSchema` with:
  - `title`
  - `slug`
  - `draft`
  - `llmopsTags`
  - `industryTags`
  - `company`
  - `summary`
  - `link`
  - `year`
  - `seo`
  - `webflow`
- `zenml-io-v2/src/content/llmops-database/building-alfred-production-ready-agentic-orchestration-layer-for-e-commerce.md:1-59` shows a representative real content file with exactly that structure.

**Conclusion:** Confirmed. We should target the Astro content shape, not invent a new one.

### Phase 3 - Does the frontend actually depend on Webflow metadata?
**Hypothesis:** Most of the website frontend may already be decoupled from Webflow, except for a few legacy edges.

**Findings:** Correct. The detail page, listing page, JSON index, shared LLMOps helpers, and filter UI all primarily use business data fields, not Webflow metadata. The one major exception I found is RSS, which still derives publication dates solely from `webflow` timestamps.

**Evidence:**
- Detail page:
  - `zenml-io-v2/src/pages/llmops-database/[slug].astro:30-64` resolves `llmopsTags`, `industryTags`, and SEO.
  - `.../[slug].astro:99-164` renders `title`, `company`, `year`, `link`, `summary`, tags, industry, and body content.
- Listing page:
  - `zenml-io-v2/src/pages/llmops-database/index.astro:17-28` loads tags/industries and counts published entries.
  - `.../index.astro:43-49` hydrates the `LLMOpsFilter` island.
- Thin JSON index:
  - `zenml-io-v2/src/pages/llmops-index.json.ts:15-27` exports only `slug`, `title`, `company`, `summary`, `llmopsTags`, `industryTags`, `year`, and `link`.
- Shared LLMOps logic:
  - `zenml-io-v2/src/lib/llmops.ts:17-29` sorts by year/title.
  - `.../llmops.ts:47-75` builds indexes by tag, industry, and company.
  - `.../llmops.ts:165-195` computes taxonomy counts from `llmopsTags` and `industryTags`.
- Filter UI:
  - `zenml-io-v2/src/components/islands/LLMOpsFilter.tsx:21-30` defines the client-side item shape.
  - `.../LLMOpsFilter.tsx:151-199` filters/sorts by `llmopsTags`, `industryTags`, `company`, `summary`, and `year`.
- RSS exception:
  - `zenml-io-v2/src/pages/llmops-database/rss.xml.ts:21-29` derives dates only from `webflow.lastPublished -> lastUpdated -> createdOn`.
  - `.../rss.xml.ts:38-64` uses `entry.data.webflow` for sorting and feed item dates.

Short story-style explanation:

> The pages themselves mostly don’t care where the entry came from. They just want the finished card: title, company, year, tags, industry, summary, and body. But the schema checker still says “show me your Webflow passport,” and RSS still asks Webflow for the date.

**Conclusion:** Mostly confirmed. Frontend rendering is already close to source-agnostic, but schema and RSS are not.

### Phase 4 - Existing migration tooling in the website repo
**Hypothesis:** The website repo already contains the field mapping we need, because it migrated LLMOpsDB from Webflow into markdown.

**Findings:** Correct. The migration script `transform-cms-to-mdx.ts` already shows the exact mapping from Webflow CMS fields into Astro content.

**Evidence:**
- `zenml-io-v2/scripts/internal/phase1/transform-cms-to-mdx.ts:30-32` marks `llmops-database` rich text as Markdown fields (`body`, `body-fallback-for-manual-entries`).
- `.../transform-cms-to-mdx.ts:304-315` treats LLMOpsDB body content as Markdown and performs light cleanup rather than HTML conversion.
- `.../transform-cms-to-mdx.ts:397-415` always emits a `webflow:` metadata block into frontmatter.
- `.../transform-cms-to-mdx.ts:532-573` maps:
  - Webflow `tags` -> `llmopsTags`
  - Webflow `industry` -> `industryTags`
  - `company` -> `company`
  - `summary` -> `summary`
  - `link` -> `link`
  - `year` -> `year`

**Conclusion:** Confirmed. This script is the blueprint for the final content shape, even if we no longer want Webflow as the input source.

### Phase 5 - Existing markdown export utility in `llmops-db-notion`
**Hypothesis:** The current markdown export helper might already be reusable as the direct website publisher.

**Findings:** Partly true, but not enough as-is. There is a useful markdown export utility, but it is aimed at viewer/search export rather than Astro website content.

**Evidence:**
- `llmops/markdown_export.py:39-91` builds frontmatter with:
  - `title`
  - `company`
  - `industry`
  - `year`
  - `source_url`
  - optional `webflow_url`
  - `tags`
  - `created_at`
- `llmops/markdown_export.py:94-112` builds a body with fixed sections `## Short Summary` and `## Full Summary`.
- `llmops/markdown_export.py:128-205` writes files into `summaries/` and `raw/` directories, not into the website’s content collection structure.

**Conclusion:** This utility is a useful serialization starting point, but it does **not** already emit website-compatible Astro entries.

### Phase 6 - Review / promotion workflow on the website side
**Hypothesis:** The website repo may already have a pattern for staging generated content before promoting it into canonical content.

**Findings:** Correct. There is already a script that promotes newly transformed content into `src/content/*`, which is a strong precedent for a staged import/promotion workflow.

**Evidence:**
- `zenml-io-v2/scripts/internal/promote-new-content.ts:3-7` describes promoting new transformed content into `src/content/`.
- `.../promote-new-content.ts:98-139` copies new transformed collection items into canonical content directories.
- `.../promote-new-content.ts:141-220` does the same for reference collections by creating simple frontmatter-only files.

**Conclusion:** Confirmed. This makes a staged artifact/importer model feel natural in the website repo.

### Phase 7 - Downstream compatibility constraints in `llmops-db-notion`
**Hypothesis:** Even after removing Webflow, some downstream scripts may still expect `webflow_slug` / `webflow_url` fields in Notion.

**Findings:** Correct. The HuggingFace reupload script still reads those fields and reconstructs the canonical URL from them.

**Evidence:**
- `hf_full_reupload.py:163-177` reads `webflow_url` directly and falls back to constructing `https://www.zenml.io/llmops-database/<slug>` from `webflow_slug`.
- `hf_full_reupload.py:179-193` includes that result in the exported dataset field `webflow_url`.
- `scripts/backfill_bidirectional_ids.py:205-245` still updates Notion `webflow_slug` / `webflow_url` from Webflow data.
- `scripts/map_markdown_to_slugs.py:62-133` is explicitly built around matching Webflow items and slugs.

**Conclusion:** Confirmed. These fields should be kept as compatibility bridges during the first migration, even if the name is now legacy and misleading.

### Phase 8 - Taxonomy normalization risk
**Hypothesis:** Tag and industry normalization will be one of the main practical migration risks.

**Findings:** Confirmed. The website taxonomy is mostly compatible with current enum/tag values after normalization, but not perfectly.

**Evidence:**
- Notion-side enums use values such as:
  - `google_gcp`, `amazon_aws`, `prompt_engineering`, `customer_support`, `multi_agent_systems`, `api_gateway`, `open_source` in `llmops/pydantic_classes.py:59-178`.
- Website content uses slug-based taxonomy files under:
  - `zenml-io-v2/src/content/llmops-tags/*.md`
  - `zenml-io-v2/src/content/industry-tags/*.md`
- I ran a direct mapping check:
  - underscore -> hyphen for tags
  - lowercase / punctuation cleanup for industries
- Results:
  - 104 of 109 enum-derived tags map cleanly to existing website taxonomy files.
  - Missing tag slugs: `bentoml`, `haystack`, `mysql`, `onnx`, `zenml`.
  - Industry mappings mostly work, but these need explicit exceptions:
    - `Media & Entertainment` -> `media-entertainment`
    - `Research & Academia` -> `research-academia`
- Website industry filenames confirm the existing slugs are:
  - `media-entertainment`
  - `research-academia`
  rather than `media-and-entertainment` / `research-and-academia`.

**Conclusion:** Confirmed. Taxonomy normalization needs a small explicit mapping layer plus a policy for unknown tags.

## Root Cause
This is not a single bug so much as an architectural leftover from the old world.

The current system still works like this:

1. Notion is the source of truth.
2. `run.py` does all article processing and enrichment.
3. Webflow is treated as the canonical publish target.
4. Notion `Done` status is tied to successful Webflow creation.
5. The new website has already replaced Webflow as the real public surface, but its schema and RSS still carry Webflow-era assumptions.

So the concrete chain of events is:

> The pipeline finishes the hard work, then tries to send the finished package to Webflow. But the public site is no longer conceptually “a Webflow site”; it is a content-driven Astro site. The old delivery truck is still wired into the end of the pipeline, and a few website components still expect that truck to have delivered the metadata.

Precise evidence for that architectural coupling:
- `run.py:689-731` still treats Webflow creation as the success condition for setting Notion `Status = Done`.
- `src/content.config.ts:395-397` still requires `webflow` metadata for LLMOps entries.
- `rss.xml.ts:21-29` and `:38-64` still use Webflow timestamps as the only date source.

## Eliminated Hypotheses

### Eliminated: “We need to redesign the website frontend before migration.”
No. The detail page, listing page, JSON index, shared LLMOps helper layer, and filter UI already work mainly from the final content fields, not from Webflow metadata.

**Evidence:**
- `[slug].astro:99-164`
- `index.astro:17-49`
- `llmops-index.json.ts:15-27`
- `src/lib/llmops.ts:17-29`, `47-75`, `165-195`
- `LLMOpsFilter.tsx:21-30`, `151-199`

### Eliminated: “The existing markdown export helper already solves the problem.”
No. It exports search/viewer-oriented markdown, not schema-valid Astro content entries.

**Evidence:**
- `llmops/markdown_export.py:39-112`
- `llmops/markdown_export.py:128-205`

### Eliminated: “We must keep Webflow metadata as a core business requirement.”
No. The public-facing website mostly does not require it. The remaining dependency is infrastructural (schema + RSS), not conceptual.

**Evidence:**
- Business-field usage in `[slug].astro`, `index.astro`, `llmops-index.json.ts`, `src/lib/llmops.ts`, and `LLMOpsFilter.tsx`
- Webflow-specific dependence isolated mainly to `src/content.config.ts` and `rss.xml.ts`

## Recommendations

### Recommendation 1 - Keep Notion as workflow/state source of truth for now
This is the least disruptive first move. The current Notion database already holds state, status, source links, and the processed article notes.

**Why:**
- `run.py` is already built around Notion lifecycle updates.
- Downstream scripts still assume Notion fields exist.
- Changing both source-of-truth and publish target at the same time would multiply risk.

### Recommendation 2 - Introduce a website publisher, but make it staged rather than writing directly into canonical content
I investigated two main implementation boundaries:

#### Option A - Direct write into `zenml-io-v2/src/content/llmops-database/`
This is feasible and initially looked attractive because the Webflow publish step is narrow.

#### Option B - Generate staged Astro-ready markdown artifacts and let the website repo validate/promote them
This is my recommended first implementation.

**Why Option B is better:**
- The website repo already has a promotion pattern (`scripts/internal/promote-new-content.ts`).
- The website repo should own final content validation and promotion rules.
- It avoids forcing `llmops-db-notion` to fake `webflow` metadata while the site is still transitioning.
- It gives a safer reviewable workflow.

**Recommended staged shape:**

```text
Notion page
  -> extraction / summarization / tag enrichment
  -> Notion property + block updates
  -> generate Astro-ready markdown artifact + small manifest
  -> hand off to website staging area
  -> website validation + promotion
  -> write legacy webflow_slug / webflow_url back to Notion
  -> set Status = Done
```

### Recommendation 3 - Make the website accept non-Webflow provenance before cutover
Before changing `run.py`, first make the website able to ingest entries that were generated directly from Notion.

**Website-side changes:**
1. In `zenml-io-v2/src/content.config.ts`
   - make `webflow` optional for `llmopsSchema`
   - add an optional `notion` provenance block, e.g.:
     - `pageId`
     - `sourceUrl`
     - `createdTime`
     - `lastEditedTime`
     - `generatedAt`
2. In `zenml-io-v2/src/pages/llmops-database/rss.xml.ts`
   - add fallback date resolution from `notion` provenance when `webflow` is absent
3. In `zenml-io-v2/scripts/phase2/validate-content.ts`
   - extend validation to allow either legacy Webflow provenance or new Notion provenance

### Recommendation 4 - Keep `webflow_slug` / `webflow_url` in Notion as compatibility bridges during migration
Even after cutover, continue populating those fields with the final ZenML website URL.

**Why:**
- `hf_full_reupload.py:163-193` still depends on them.
- This avoids unnecessary downstream breakage during the first migration.
- We can rename or replace those fields later once the rest of the system no longer expects them.

### Recommendation 5 - Add explicit normalization rules for tags and industries
The migration will need a small normalization layer.

**Tag strategy (first cut):**
- normalize `_` -> `-`
- lowercase
- validate against `zenml-io-v2/src/content/llmops-tags/*.md`
- if tag missing:
  - warn and drop for now
  - log in manifest/report

**Industry strategy (first cut):**
- explicit mapping:
  - `Media & Entertainment` -> `media-entertainment`
  - `Research & Academia` -> `research-academia`
- validate against `zenml-io-v2/src/content/industry-tags/*.md`
- fail publication if industry cannot be resolved

### Recommendation 6 - Roll out in stages

#### Stage 0 - Website compatibility prep
- Make `webflow` optional in `llmopsSchema`
- Add `notion` provenance support
- Add RSS date fallback
- Extend validation rules

#### Stage 1 - Add staging/promotion lane in website repo
- Create a staging directory for generated LLMOpsDB entries
- Add a validation/promote script that copies valid entries into `src/content/llmops-database/`

#### Stage 2 - Add new publisher path in `llmops-db-notion`
- Add a `website` publishing target to `run.py`
- Generate final-shape Astro markdown + manifest
- Call the website validation/promote workflow
- On success, write compatibility slug/url fields to Notion and set `Done`

#### Stage 3 - Shadow mode
For a limited time:
- keep current Webflow publish
- also generate website artifacts
- compare slug, tag normalization, validation, and output quality

#### Stage 4 - Website primary
- disable Webflow creation in `run.py`
- keep Notion updates intact
- keep compatibility fields in Notion
- define success as “artifact generated + validated + promoted”

#### Stage 5 - Cleanup later
- migrate `resummarize_entries.py`
- retire or deprecate Webflow backfill scripts for new content
- rename legacy fields only when the ecosystem no longer depends on them

## Concrete File-Level Plan

### In `llmops-db-notion`
- `run.py`
  - replace direct Webflow publish call with publisher abstraction
  - gate `Done` on successful website publish/promotion
  - keep writing compatibility slug/url fields
- `llmops/markdown_export.py`
  - either extend or supersede with Astro-specific serialization logic
- new module(s), recommended:
  - `llmops/publishers/website_content.py`
  - `llmops/publishers/common.py`
- later follow-up:
  - `resummarize_entries.py`
  - `scripts/backfill_bidirectional_ids.py`
  - `scripts/map_markdown_to_slugs.py`
  - `README.md`

### In `zenml-io-v2`
- `src/content.config.ts`
  - make `webflow` optional for `llmopsSchema`
  - add optional `notion` provenance schema
- `src/pages/llmops-database/rss.xml.ts`
  - add date fallback chain for Notion-generated entries
- `scripts/phase2/validate-content.ts`
  - validate both legacy and new provenance shapes
- add new staging/promote logic, likely alongside:
  - `scripts/internal/promote-new-content.ts`

## Preventive Measures
- Keep the website repo as the owner of the final content contract and validation rules.
- Avoid inventing a fake Webflow-shaped intermediate model for new entries.
- Keep rollout reversible with a publisher flag or shadow mode.
- Add tests/validation for taxonomy normalization so new enum/tag changes do not silently break publication.
- Once migration is stable, document the new success semantics clearly: what exactly makes a Notion entry `Done`.

## Final Recommendation
If I reduce this to one practical sentence:

> Keep Notion as the workflow brain, teach `run.py` to generate Astro-ready LLMOpsDB content instead of Webflow items, but hand that content to the website through a staged validation/promotion lane rather than writing directly into canonical site files on day one.

## MVP Implementation Decision (March 11, 2026)

The implemented MVP intentionally narrowed the design:

- `zenml-io-v2` now accepts LLMOps entries with optional `notion` provenance
- RSS date derivation is source-agnostic for LLMOps entries
- `llmops-db-notion/run.py` can publish directly into `src/content/llmops-database/*.md`
- Webflow remains available as a rollback path via `--publish-target webflow`
- There is no dual-publish shadow mode in this MVP

In other words, the code now follows a **direct website write** model for the first production cut, while keeping Webflow as an escape hatch.
