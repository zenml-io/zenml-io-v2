# Compare-page extraction audit

**Generated from commit:** 893cc240a5c7f160aebaa824e78aab8c3665104c

**Regenerate with:** `pnpm exec tsx scripts/migrations/compare-blocks/audit.ts --write`

## Totals

| Metric | Count |
|--------|-------|
| Entries audited | 25 |
| Table extracted from body | 25/25 |
| Code pair extracted from body | 25/25 |
| CTA bullets extracted from body | 18/25 |
| CTA-bullet misses, no trailing `<ul>` at all | 5 (zenml-vs-apache-airflow, zenml-vs-aws-sagemaker, zenml-vs-kedro, zenml-vs-kubeflow, zenml-vs-mlflow) |
| CTA-bullet misses, trailing `<ul id="">` quirk | 2 (zenml-vs-dvc, zenml-vs-kserve) |
| Entries needing seo materialisation | 3 (zenml-vs-alteryx, zenml-vs-dataiku, zenml-vs-domino-data-lab) |
| Entries with no quote (no testimonial renders) | 7 |
| Entries falling through to GENERIC defaults | 7 |

## Per-entry breakdown

| Slug | Table | Code (langs) | CTA bullets | Headline | SEO | Quote | Hero 1°/2° | Value sections | Strategy HL | Final CTA | Blog rail | Category → defaults | Leftover bytes |
|------|-------|--------------|-------------|----------|-----|-------|------------|----------------|-------------|-----------|-----------|---------------------|----------------|
| zenml-vs-alteryx | ✓ body | ✓ body (python, python) | ✓ body (3) | ctaHeadline | ✗ | ✓ | F/F | F | F | F | F | e2e-platforms → e2e-platforms | 0 |
| zenml-vs-apache-airflow | ✓ body | ✓ body (python, python) | ✗ default | category-default | ✓ | ✓ | F/F | F | F | F | F | orchestrators → orchestrators | 0 |
| zenml-vs-argo-workflows | ✓ body | ✓ body (python, python) | ✓ body (3) | ctaHeadline | ✓ | ✓ | F/F | F | F | F | F | orchestrators → orchestrators | 0 |
| zenml-vs-aws-sagemaker | ✓ body | ✓ body (python, python) | ✗ default | category-default | ✓ | ✓ | F/F | F | F | F | F | e2e-platforms → e2e-platforms | 0 |
| zenml-vs-azure-ml | ✓ body | ✓ body (python, python) | ✓ body (3) | ctaHeadline | ✓ | ✓ | F/F | F | F | F | F | e2e-platforms → e2e-platforms | 0 |
| zenml-vs-clearml | ✓ body | ✓ body (python, python) | ✓ body (4) | ctaHeadline | ✓ | ✓ | F/F | F | F | F | F | e2e-platforms → e2e-platforms | 0 |
| zenml-vs-dagster | ✓ body | ✓ body (python, python) | ✓ body (3) | ctaHeadline | ✓ | ✗ | F/F | F | F | F | F | orchestrators → orchestrators | 0 |
| zenml-vs-databricks | ✓ body | ✓ body (python, python) | ✓ body (3) | ctaHeadline | ✓ | ✗ | F/F | F | F | F | F | orchestrators → orchestrators | 0 |
| zenml-vs-dataiku | ✓ body | ✓ body (python, python) | ✓ body (3) | ctaHeadline | ✗ | ✓ | F/F | F | F | F | F | e2e-platforms → e2e-platforms | 0 |
| zenml-vs-domino-data-lab | ✓ body | ✓ body (python, python) | ✓ body (3) | ctaHeadline | ✗ | ✓ | F/F | F | F | F | F | e2e-platforms → e2e-platforms | 0 |
| zenml-vs-dvc | ✓ body | ✓ body (python, python) | ✗ default (`<ul id="">` quirk) | ctaHeadline | ✓ | ✓ | F/F | F | F | F | F | data-model-versioning → GENERIC | 448 |
| zenml-vs-flyte | ✓ body | ✓ body (python, python) | ✓ body (4) | ctaHeadline | ✓ | ✗ | F/F | F | F | F | F | orchestrators → orchestrators | 0 |
| zenml-vs-hugging-face | ✓ body | ✓ body (python, python) | ✓ body (4) | ctaHeadline | ✓ | ✗ | F/F | F | F | F | F | modeling → GENERIC | 0 |
| zenml-vs-kedro | ✓ body | ✓ body (python, python) | ✗ default | category-default | ✓ | ✓ | F/F | F | F | F | F | orchestrators → orchestrators | 0 |
| zenml-vs-kserve | ✓ body | ✓ body (python, python) | ✗ default (`<ul id="">` quirk) | ctaHeadline | ✓ | ✓ | F/F | F | F | F | F | model-serving → GENERIC | 449 |
| zenml-vs-kubeflow | ✓ body | ✓ body (python, python) | ✗ default | category-default | ✓ | ✓ | F/F | F | F | F | F | orchestrators → orchestrators | 0 |
| zenml-vs-label-studio | ✓ body | ✓ body (python, python) | ✓ body (4) | ctaHeadline | ✓ | ✗ | F/F | F | F | F | F | data-annotators → GENERIC | 0 |
| zenml-vs-langfuse | ✓ body | ✓ body (python, python) | ✓ body (3) | ctaHeadline | ✓ | ✓ | F/F | F | F | F | F | llm-observability → GENERIC | 3 "‍" |
| zenml-vs-langgraph | ✓ body | ✓ body (python, python) | ✓ body (3) | ctaHeadline | ✓ | ✓ | F/F | F | F | F | F | genai-frameworks → GENERIC | 0 |
| zenml-vs-metaflow | ✓ body | ✓ body (python, python) | ✓ body (3) | ctaHeadline | ✓ | ✗ | F/F | F | F | F | F | e2e-platforms → e2e-platforms | 0 |
| zenml-vs-mlflow | ✓ body | ✓ body (python, python) | ✗ default | category-default | ✓ | ✓ | F/F | F | F | F | F | experiment-trackers → experiment-trackers | 0 |
| zenml-vs-prefect | ✓ body | ✓ body (python, python) | ✓ body (4) | ctaHeadline | ✓ | ✗ | F/F | F | F | F | F | orchestrators → orchestrators | 0 |
| zenml-vs-seldon-core | ✓ body | ✓ body (python, python) | ✓ body (3) | ctaHeadline | ✓ | ✓ | F/F | F | F | F | F | model-serving → GENERIC | 0 |
| zenml-vs-valohai | ✓ body | ✓ body (python, python) | ✓ body (4) | ctaHeadline | ✓ | ✓ | F/F | F | F | F | F | e2e-platforms → e2e-platforms | 0 |
| zenml-vs-vertex-ai | ✓ body | ✓ body (python, python) | ✓ body (3) | ctaHeadline | ✓ | ✓ | F/F | F | F | F | F | e2e-platforms → e2e-platforms | 0 |

### Legend

- **E / F** — the frontmatter field is set Explicitly / the template's Fallback engages (hero CTAs, value sections, strategy headline, final CTA, blog rail = `relatedBlogSlugs`).
- **Headline** — which side of `ctaHeadline || finalCta.headline` the rendered final-CTA headline comes from; `category-default` when neither frontmatter field is set.
- **SEO** — whether the entry has any `seo:` block. Every entry that has one currently carries description, canonical and ogImage, so presence equals completeness for today's data.
- **Leftover bytes** — bytes remaining (after trim) once the body regions the template consumes are removed; leftovers of ≤ 40 bytes are printed through `JSON.stringify` so invisible characters are visible.

## Notes

- **`<ul id="">` quirk**: the bullet regex demands a bare `<ul>`, so the two entries whose trailing list is `<ul id="">` (dvc, kserve) never render their authored bullets — the category default renders instead. A latent bug the consolidation must preserve byte-for-byte.
- **imageSide**: when `valueSections` falls back to category defaults, the template overrides each section's `imageSide` with an `i % 2` alternation. The stored `imageSide` values in `compareDefaults.ts` are unused — and consistent with the alternation in all four default sets — so a renderer honouring the stored values is byte-safe today but silently fragile if those defaults are ever edited.
- **Code languages** default to `python` when a fence has no language tag. The template consumes only the first two fences.
- **Body source**: bodies are read via gray-matter here, `item.body` in Astro; the extraction regexes are insensitive to the one-newline difference that can exist between the two (see docblock), and `--verify-dist` cross-checks against the rendered pages.

