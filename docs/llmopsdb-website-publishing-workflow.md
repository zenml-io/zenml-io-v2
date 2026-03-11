# LLMOpsDB Website Publishing Workflow

This document describes the first production workflow for publishing LLMOpsDB entries from Notion directly into the ZenML website repository.

## What changed

`run.py` can now publish to either:

- `webflow` — legacy / rollback path
- `website` — writes Astro-compatible markdown files for `zenml-io-v2`

Notion remains the workflow/state source of truth.

## High-level flow

```text
Notion page (Status = Not started)
  -> content extraction
  -> Claude summary + metadata
  -> tag expansion
  -> Notion property update
  -> Notion block append
  -> publish target
       - webflow: create CMS item
       - website: write src/content/llmops-database/<slug>.md
  -> write legacy webflow_slug / webflow_url back to Notion
  -> set Status = Done
```

Even in `website` mode, the Notion fields `webflow_slug` and `webflow_url` are still populated. They now act as compatibility fields for the canonical ZenML website URL.

## Website mode requirements

When using `--publish-target website`, you must provide an output directory that points at the website collection directory, for example:

```bash
/absolute/path/to/zenml-io-v2/src/content/llmops-database
```

The publisher expects the sibling taxonomy directories to exist next to it:

- `../llmops-tags/`
- `../industry-tags/`

## Commands

### Preview the processing queue

```bash
uv run run.py --dry-run --publish-target website --website-output-dir /absolute/path/to/zenml-io-v2/src/content/llmops-database
```

### Publish to website content

```bash
uv run run.py \
  --publish-target website \
  --website-output-dir /absolute/path/to/zenml-io-v2/src/content/llmops-database
```

### Roll back to Webflow mode

```bash
uv run run.py --publish-target webflow
```

You can also set defaults via environment variables:

```bash
LLMOPS_PUBLISH_TARGET=website
LLMOPS_WEBSITE_OUTPUT_DIR=/absolute/path/to/zenml-io-v2/src/content/llmops-database
LLMOPS_WEBSITE_BASE_URL=https://www.zenml.io
```

## What gets written in website mode

Each successful publish writes a `.md` file into `src/content/llmops-database/` with:

- deterministic `slug`
- `llmopsTags` mapped from enum-style tags to website slugs
- `industryTags` mapped from `Industry.to_website_slug()`
- `seo` frontmatter
- a `notion` provenance block
- markdown body from `processed_entry.llmops_notes`

## Slug behavior

Slug resolution is designed to be stable across reruns:

1. Reuse existing Notion `webflow_slug` if present
2. Otherwise slugify the processed title
3. If the target file already belongs to the same Notion page, overwrite it
4. If the slug belongs to a different page, add a deterministic suffix from the Notion page ID

This keeps URLs stable and avoids parallel-write collisions.

## Validation after publishing

After website-mode publishing, switch to the website repo and run:

```bash
pnpm validate:llmops
pnpm check
pnpm build
```

## Important compatibility note

`hf_full_reupload.py` still reads `webflow_url` / `webflow_slug`, so those fields must continue to be written even after moving off Webflow.

## Current limitations / follow-up work

- `resummarize_entries.py` still has Webflow-oriented behavior and should be migrated separately
- legacy sync utilities such as `scripts/backfill_bidirectional_ids.py` are now historical / rollback helpers
- no dual-publish shadow mode in this MVP; use `webflow` mode for rollback and `website` mode for the new path
