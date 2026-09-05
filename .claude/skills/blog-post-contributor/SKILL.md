---
name: blog-post-contributor
description: >-
  Add or import a blog post from Markdown or Notion; prepare content, metadata,
  and assets. External actions require task authorization. Skip ordinary edits
  to existing posts.
---

# Blog Post Contributor

Prepare a new blog post in `src/content/blog/` from Markdown or Notion: frontmatter, images, taxonomy entries, and validation. Follow the authorized task scope for branching, uploads, and PR creation.

## Quick Reference

| Item | Value |
|------|-------|
| Blog content dir | `src/content/blog/` |
| Authors dir | `src/content/authors/` |
| Categories dir | `src/content/categories/` |
| Tags dir | `src/content/tags/` |
| Schema source of truth | `src/content.config.ts` (`blogSchema`) |
| Image upload script | `scripts/r2-upload.py` |
| AVIF compression script | `~/.claude/skills/avif-image-compressor/scripts/convert_to_avif.sh` |
| R2 image prefix | `content/blog/<slug>/` |

## Step 0: Read the source and resolve missing information

Read the supplied article and metadata first. Infer routine choices from that source and repository conventions; state material assumptions. Ask only for unresolved facts that change the result, such as authorship or a scheduled date. Continue independent preparation while waiting. Skills do not authorize uploading, committing, pushing, publishing, or requesting reviews; use the user's existing authorization for each action without asking again.

Resolve these fields from the source before asking:

1. **Source**: Local markdown file path, or Notion page URL?
2. **Author**: Who should be listed? (check `src/content/authors/` for existing slugs)
3. **Publish date**: Today, or a specific date?
4. **Is this an SEO/comparison post?** (e.g., from Tanish's GTM content — these need the `discovery` tag)
5. **Which workspace does this post belong to?** ZenML/ML content uses `category: "mlops"` or `"zenml"`; Kitaru/agent content uses `category: "kitaru"` and includes `"kitaru"` as the first tag. See `MERGE_PLAN.md` for the unified ZenML × Kitaru taxonomy.

## Step 1: Create a Feature Branch

Inspect the repository, current branch, and working tree. Reuse an explicitly authorized feature branch. For fresh work, fetch main and create blog/<slug> from origin/main in a clean checkout or an isolated worktree under .worktrees/. Do not switch or pull into a checkout containing unrelated work. Preserve local commits and report any unresolved base conflict.

## Choose Your Path

- **Path A**: [From Markdown File](#path-a-from-markdown-file) — user has a local `.md` file
- **Path B**: [From Notion Page](#path-b-from-notion-page) — content lives in Notion (preferred for team content)

---

## Path A: From Markdown File

### A1. Read the provided markdown file

Read the user's `.md` file. Identify:
- The title (from H1 or frontmatter)
- Any existing frontmatter (may need reformatting)
- Inline images (relative paths, URLs, or base64)
- The main body content

### A2. Generate the slug

Derive the slug from the title:
- Lowercase, hyphen-separated, no special characters
- Keep it concise but descriptive (e.g., `introducing-zenml-pipelines`)
- Use the source slug or derive one without a routine confirmation. Ask if it conflicts with an existing URL or the intended canonical URL is unclear.

### A3. Skip to [Common Steps](#common-steps-both-paths)

---

## Path B: From Notion Page

Use the available Notion connector to fetch the supplied page directly. Discover its current fetch tool rather than assuming a host-specific tool name.

### B1. Fetch the Notion page

Fetch the supplied page URL or ID with the connector.

This returns the full page content in enhanced Markdown format, including:
- Image references as `![](https://prod-files-secure.s3.us-west-2.amazonaws.com/...)` with temporary pre-signed S3 URLs
- Tables in Notion's `<table>` format
- Links wrapped in `<span underline="true">[text](url)</span>`
- Metadata lines at the top (e.g., "Primary keyword:", "Meta description:", "URL slug:")

### B2. Identify the page context

Check the Notion page's ancestor path to understand context:
- **Under Tanish's GTM content** → This is an SEO/comparison post → will need `discovery` tag
- **Under other team areas** → Regular blog post

### B3. Extract content and clean Notion formatting

From the fetched content, extract:
- **Title**: Usually the first H1
- **Metadata lines**: "Primary keyword:", "Meta description:", "URL slug:" at the top — extract these for frontmatter, then remove from body
- **Slug**: From the "URL slug:" metadata line, or derive from title

Clean the Notion-specific formatting:
- `<span underline="true">[text](url)</span>` → `[text](url)` (just the link)
- `<table header-row="true" ...>` with `<tr>/<td>` → standard markdown table (`| col | col |`)
- `<br>` in table cells → spaces or line breaks as appropriate
- `\[complete URL: ...\]` → remove entirely
- Remove any remaining Notion HTML artifacts
- **Remove ALL H1 headers (`# ...`) from the body** — the title lives in frontmatter

### B4. Download images from Notion

**IMPORTANT**: Notion's image URLs are **temporary pre-signed S3 URLs** that expire within ~1 hour. Download them immediately after fetching the page.

1. Create a temp directory: `mkdir -p /tmp/<slug>-images`
2. Download each image with `curl -sL -o <descriptive-name>.png "<notion-url>"`
3. Give each file a descriptive name based on its context in the article (e.g., `runai-workloads.png`, `clearml-pricing.png`)
4. Verify each download: `file <filename>` should show valid image data

**Image count check**: If the post has **fewer than 2 images**, ask the user whether the post should have more images. Technical comparison and tutorial posts typically benefit from screenshots, diagrams, or architecture images. Flag this as a suggestion, not a blocker.

### B5. Continue to [Common Steps](#common-steps-both-paths)

---

## Common Steps (Both Paths)

### C1. Process images

#### Convert all images to AVIF

```bash
cd /tmp/<slug>-images
for f in *.png *.jpg *.jpeg; do
  ~/.claude/skills/avif-image-compressor/scripts/convert_to_avif.sh "$f" --quality 28 --resize 800
done
```

For the **cover/hero image**, use larger dimensions:
```bash
~/.claude/skills/avif-image-compressor/scripts/convert_to_avif.sh cover.png --quality 25 --resize 1200
```

**Also generate a JPEG sibling of the cover for the OG card.** Social
platforms (LinkedIn, Twitter/X, Slack, Facebook, Discord) do NOT support
AVIF in Open Graph cards — using AVIF for `seo.ogImage` makes the
preview card render with no image. Keep AVIF for `mainImage.url` (browser-
rendered, AVIF is fine), JPEG for `seo.ogImage` (social-rendered).

```bash
# JPEG variant of the cover, same dimensions, sized for OG (1200×627 ideal):
sips -s format jpeg cover.png --out cover.jpg --resampleHeightWidthMax 1200
# Or if starting from the converted AVIF:
sips -s format jpeg cover.avif --out cover.jpg
```

#### Upload to R2

Once uploading is authorized, upload both the AVIF (for in-page rendering) and the JPEG (for OG). Run the repository upload script from the repository root using absolute image paths; conversion may have changed the working directory. For example, from the repo root:

```bash
uv run scripts/r2-upload.py /tmp/<slug>-images/cover.avif /tmp/<slug>-images/cover.jpg --prefix content/blog/<slug>
```

Record each R2 URL. The cover image will have two URLs at the same prefix
— `.avif` for `mainImage.url`, `.jpg` for `seo.ogImage`.

#### Verify R2 uploads

Verify every uploaded URL with `curl -sI <url>`; each must return HTTP 200 before committing references.

### C2. Handle the cover image

Check if the content has a dedicated cover/hero image:

- **Cover image provided** (in Notion or by user): Convert to AVIF (quality 25, resize 1200) and upload to R2
- **No cover image:** Ask for a suitable asset or offer to generate one with an available image tool. Continue content preparation and checks independent of the cover. Keep the post draft while assets are incomplete; do not invent image URLs or mark it ready to publish.

Put the AVIF URL in `mainImage.url` and the separate JPEG URL in `seo.ogImage`.

### C3. Validate or create the author

Check if the author exists in `src/content/authors/`:

```bash
ls src/content/authors/
```

**If the author exists:** Use their slug (filename without `.md`).

**If the author is new:** Create `src/content/authors/<author-slug>.md`:

```yaml
---
name: "Author Full Name"
slug: "author-slug"
bio: "Short author bio"
---
```

### C4. Validate or create tags

Check if each tag exists in `src/content/tags/`:

```bash
ls src/content/tags/
```

**If a tag is new**, create `src/content/tags/<tag-slug>.md`:

```yaml
---
name: "Tag Display Name"
slug: "tag-slug"
---
```

Existing tags (118+) cover most topics. Common tags: `mlops`, `llmops`, `zenml`, `genai`, `agents`, `tutorials`, `best-practices`, `cloud`, `open-source`, `pipelines`, `infrastructure`, `kubernetes`.

#### SEO / Discovery Tag Rule

**If this is an SEO/comparison post** (identified by any of these signals):
- Notion page is under Tanish's "Bottom of the funnel Content" area
- Title contains "vs" or "alternative" patterns
- Content focuses on tool comparison (X vs Y)
- User confirms it's an SEO post

Then **add the `discovery` tag** to the tags list. This excludes the post from the main `/blog` listing page — it's discoverable via search engines and direct links only.

### C5. Validate the category

Categories are a fixed set (15 total):

| Slug | Name | When to use |
|------|------|-------------|
| `mlops` | MLOps | ML platform, pipelines, training infra |
| `zenml` | ZenML | ZenML feature releases, launches, OSS |
| `kitaru` | Kitaru | Kitaru launches, agent durable execution, agent infra |
| `llmops` | LLMOps | LLM production patterns, prompt ops |
| `llms` | LLMs | LLM models, capabilities, theory |
| `tutorials` | Tutorials | Step-by-step how-tos |
| `community` | Community | Team highlights, user stories |
| `case-studies` | Case Studies | Customer wins (often pairs with `/case-studies` content) |
| `newsletters` | Newsletters | Monthly digests |
| `podcast` | Podcast | Podcast episodes |
| `sales-blog` | Sales Blog | Sales/GTM content |
| `tech-startup` | Tech Startup | Startup-audience posts |
| `webinars` | Webinars | Webinar recaps |
| `zenml-updates` | ZenML Updates | Product changelog-style |
| `mlstacks` | MLStacks | MLStacks-specific |

Category is optional. Don't create new categories — use the closest match. **For Kitaru-themed posts**, use `category: "kitaru"` and prepend `"kitaru"` to the tags array; this surfaces them on `/category/kitaru` and routes them on the unified blog sidebar.

### C6. Build the frontmatter

Assemble the complete frontmatter block. This example is a ready-to-publish post with resolved assets; use draft: true for incomplete preparation:

```yaml
---
title: "Your Blog Post Title"
slug: "your-blog-post-slug"
draft: false
author: "author-slug"
category: "mlops"
tags:
  - "zenml"
  - "mlops"
  - "discovery"  # only for SEO/comparison posts
date: "2026-04-06T00:00:00.000Z"
readingTime: "X mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/<slug>/<hash>/cover.avif"
  alt: "Description of the cover image"
seo:
  title: "Your Blog Post Title"
  description: "A concise 150-160 char description for search engines."
  canonical: "https://www.zenml.io/blog/your-blog-post-slug"
  ogImage: "https://assets.zenml.io/content/blog/<slug>/<hash>/cover.jpg"
---
```

> **Critical:** `mainImage.url` uses **AVIF** (browsers render it fine, ~20× smaller); `seo.ogImage` uses **JPEG** (social platforms — LinkedIn, Twitter/X, Slack, Facebook, Discord — reject AVIF in Open Graph cards). Mismatching these silently breaks social previews. See PR #73 for the site-wide fix where 103 posts all had AVIF og images and were rendering without preview cards on LinkedIn.

**Key rules:**
- `slug` MUST match the filename (e.g., `your-blog-post-slug.md`)
- `date` should be an ISO 8601 string
- `readingTime` format: `"X mins"` — estimate ~200 words/minute
- `mainImage.url` must be an absolute URL (R2-hosted)
- `seo.canonical` must be `https://www.zenml.io/blog/<slug>`
- `seo.description` can come from the Notion "Meta description:" line if present
- Preserve an explicitly requested draft state. Use `draft: true` while required content or cover assets remain unresolved; use `draft: false` only when the post is complete and intended for publication. Draft is not a privacy boundary.
- `webflow` field is NOT needed for new native posts

### C7. Write the blog post file

**Token efficiency**: When the user provides a ready `.md` file, do NOT rewrite it through the Write tool (which outputs all content tokens). Instead, use bash: write the frontmatter to the target file with a heredoc, then `cat` the body (with H1 and metadata lines stripped via `tail -n +N`) and append with `>>`.

For Notion-sourced content (where extensive formatting cleanup was needed), using the Write tool is fine since the content has already been transformed.

Save to `src/content/blog/<slug>.md`.

**Important:** Use `.md` NOT `.mdx`. The markdown body must NOT contain an H1 (`# Title`). The title is rendered by `BlogLayout` from the frontmatter `title` field.

### C8. Validate

Run the validation checks:

```bash
# Content schema validation
pnpm validate:content

# TypeScript check
pnpm check

# Full build; capture output without masking the exit code
pnpm build > /tmp/blog-build.log 2>&1

# Rendered-content and asset smoke checks after a successful build
pnpm smoke:dist
```

Fix any issues. Common problems:
- Slug mismatch between frontmatter and filename
- Tag/author slug not found (forgot to create the `.md` file)
- Image URL not absolute (must start with `https://`)
- Invalid date format

Check the actual build exit status and inspect /tmp/blog-build.log. Do not proceed to smoke checks after a failed build. Inspect the changed page in a browser and verify its canonical URL. Follow the root testing policy for mixed code/content changes. Classify failures as pre-existing only with current baseline evidence; report any failed or blocked checks instead of ignoring historical error names.

### C9. Commit and create PR when authorized

Proceed only when the user requested or already authorized these actions and the applicable root validation gate is satisfied. Otherwise return the prepared files and validation results. An incomplete post can be submitted as a draft PR when requested, with unresolved publication requirements stated explicitly.

```bash
# Stage only relevant files
git add src/content/blog/<slug>.md
git add src/content/authors/<new-author>.md  # if new
git add src/content/tags/<new-tag>.md        # if new

git commit -m "Add blog post: <short-title>" -- src/content/blog/<slug>.md
# Include any newly created author/tag paths in the commit path list too.
git push -u origin HEAD
```

Write the PR body to a temporary file and use `gh pr create --body-file <path>`. Include the source, author/date, image handling, validation evidence, and any unresolved publication requirements. Do not expose private source URLs in this public repository; describe the source without its private link when needed.

Request reviewers only when authorized; use the user-specified reviewers. A missing reviewer preference does not block preparation or an authorized PR.

### C10. Summarize for the user

Print a summary:
- Blog post file path and branch name
- Slug and intended production URL (do not call it live before deployment): `https://www.zenml.io/blog/<slug>`
- Cover image URL
- Any new tags/authors created
- Whether `discovery` tag was added (and why)
- PR URL and requested reviewers, if those actions were authorized
- Preview URL when available; report publication status separately

## Frontmatter Field Reference

| Field | Required | Type | Example |
|-------|----------|------|---------|
| `title` | Yes | string | `"My Great Post"` |
| `slug` | Yes | string | `"my-great-post"` |
| `draft` | No | boolean | `false` |
| `featured` | No | boolean | `false` |
| `author` | Yes | slug ref | `"hamza-tahir"` |
| `category` | No | slug ref | `"mlops"` (ZenML/ML), `"kitaru"` (Kitaru/agent) |
| `tags` | No | slug ref[] | `["zenml", "mlops"]` or `["kitaru", "agents"]` for Kitaru posts |
| `date` | Yes | ISO date | `"2026-04-06T00:00:00.000Z"` |
| `readingTime` | No | string | `"5 mins"` |
| `mainImage.url` | No* | absolute URL | `"https://assets.zenml.io/..."` |
| `mainImage.alt` | No | string | `"Pipeline diagram"` |
| `seo.title` | No | string | `"Title - ZenML Blog"` |
| `seo.description` | No | string | `"150-char description"` |
| `seo.canonical` | No | absolute URL | `"https://www.zenml.io/blog/slug"` |
| `seo.ogImage` | No | absolute URL | Separate JPEG cover URL |

*`mainImage` is schema-optional, but a cover is required for publication readiness. Missing art does not block independent preparation.

## Notion Formatting Cleanup Reference

When processing Notion MCP content, apply these transformations:

| Notion format | Clean markdown |
|---------------|----------------|
| `<span underline="true">[text](url)</span>` | `[text](url)` |
| `<table header-row="true">` with `<tr>/<td>` | Standard markdown table |
| `<br>` in table cells | Space or `, ` |
| `\[complete URL: ...\]` | Remove entirely |
| `***Disclaimer:***` | `***Note:***` (softer tone) |
| Metadata lines (Primary keyword, Meta description, URL slug) | Extract to frontmatter, remove from body |
| First H1 (duplicate of title) | Remove entirely |

## Lessons Learned

1. **Notion MCP works well for fetching content** — returns enhanced Markdown with image URLs. The old advice to avoid it was based on block-level JSON; the current MCP returns clean markdown.
2. **Notion image URLs expire in ~1 hour** — download immediately after fetching the page. Verify each download with `file <name>`.
3. **Start from current main for fresh work** while preserving the authorized checkout and unrelated local changes.
4. **AVIF compression is dramatic** — typical 80-96% reduction. Use quality 28 + resize 800 for inline images, quality 25 + resize 1200 for cover/hero images.
5. **Verify R2 uploads via public URL** — the boto3 API can succeed but the public domain may not serve the file. Always `curl -sI` to confirm HTTP 200.
6. **Discovery tag for SEO posts** — posts under Tanish's GTM content or with "vs"/"alternative" patterns should get the `discovery` tag to keep them off the main blog listing.
7. **Build logs are long**: capture them and check the actual process exit status, then read relevant failure output.
8. **Baseline failures need current evidence**: old notes do not establish that a failure is unrelated to this change.
