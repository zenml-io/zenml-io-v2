---
name: blog-post-contributor
description: >-
  Add a new blog post to the ZenML website. Supports two workflows: (1) from a
  local markdown file, or (2) directly from a Notion page via the Notion MCP
  server. Handles frontmatter validation, image processing (AVIF conversion + R2
  upload), cover image prompting, SEO tagging (discovery tag for SEO posts),
  feature branch setup, build verification, PR creation with reviewer tagging,
  and tag/author creation. Triggers: "new blog post", "add blog", "publish
  blog", "blog from Notion", "blog from markdown", "contribute blog".
---

# Blog Post Contributor

Add a new blog post to the ZenML website (`src/content/blog/`). This skill supports two source workflows and handles all the plumbing: frontmatter, images, taxonomy entries, git branching, build verification, and PR creation.

## Quick Reference

| Item | Value |
|------|-------|
| Blog content dir | `src/content/blog/` |
| Authors dir | `src/content/authors/` |
| Categories dir | `src/content/categories/` |
| Tags dir | `src/content/tags/` |
| Schema source of truth | `src/content.config.ts` (`blogSchema`) |
| Image upload script | `scripts/r2-upload.py` |
| AVIF compression script | `~/.Codex/skills/avif-image-compressor/scripts/convert_to_avif.sh` |
| R2 image prefix | `content/blog/<slug>/` |

## Step 0: Gather Key Information

Before any work, ask the user for (if not already provided):

1. **Source**: Local markdown file path, or Notion page URL?
2. **Author**: Who should be listed? (check `src/content/authors/` for existing slugs)
3. **Publish date**: Today, or a specific date?
4. **Is this an SEO/comparison post?** (e.g., from Tanish's GTM content — these need the `discovery` tag)
5. **Which workspace does this post belong to?** ZenML/ML content uses `category: "mlops"` or `"zenml"`; Kitaru/agent content uses `category: "kitaru"` and includes `"kitaru"` as the first tag. See `MERGE_PLAN.md` for the unified ZenML × Kitaru taxonomy.

## Step 1: Create a Feature Branch

Always pull the latest main first, then branch:

```bash
git checkout main
git pull origin main
git checkout -b blog/<slug>
```

Use the blog post's slug as the branch name suffix (e.g., `blog/runai-vs-clearml`).

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
- Confirm the slug with the user

### A3. Skip to [Common Steps](#common-steps-both-paths)

---

## Path B: From Notion Page

Use the **Notion MCP server** (`mcp__claude_ai_Notion__notion-fetch`) to fetch the page content directly. This preserves formatting better than manual export and gives us image URLs we can download.

### B1. Fetch the Notion page

```
mcp__claude_ai_Notion__notion-fetch
  id: "<notion-page-url>"
```

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
  ~/.Codex/skills/avif-image-compressor/scripts/convert_to_avif.sh "$f" --quality 28 --resize 800
done
```

For the **cover/hero image**, use larger dimensions:
```bash
~/.Codex/skills/avif-image-compressor/scripts/convert_to_avif.sh cover.png --quality 25 --resize 1200
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

Upload both the AVIF (for in-page rendering) and the JPEG (for OG):

```bash
for f in *.avif *.jpg; do
  uv run scripts/r2-upload.py "$f" --prefix content/blog/<slug>
done
```

Record each R2 URL. The cover image will have two URLs at the same prefix
— `.avif` for `mainImage.url`, `.jpg` for `seo.ogImage`.

#### Verify R2 uploads

Spot-check at least 2 URLs with `curl -sI <url>` — must return HTTP 200.

### C2. Handle the cover image

Check if the content has a dedicated cover/hero image:

- **Cover image provided** (in Notion or by user): Convert to AVIF (quality 25, resize 1200) and upload to R2
- **No cover image**: **Ask the user** to create one and provide a path (e.g., `~/Downloads/cover.png`). Suggest they can use Canva, Figma, or the `image-generator` skill. This is a **blocking step** — blog posts should have a cover image for social sharing and the blog listing page.

The cover image URL goes into both `mainImage.url` and `seo.ogImage`.

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

Assemble the complete frontmatter block:

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
- `draft: false` always — new blog posts are never drafts, even if a cover image is missing
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

# Full build (run in background, check tail for success — output is 2000+ lines)
pnpm build 2>&1 | tail -30
```

Fix any issues. Common problems:
- Slug mismatch between frontmatter and filename
- Tag/author slug not found (forgot to create the `.md` file)
- Image URL not absolute (must start with `https://`)
- Invalid date format

Pre-existing errors (e.g., old slug format warnings, `mdast` type error) are NOT caused by the new post — ignore them.

### C9. Commit and create PR

```bash
# Stage only relevant files
git add src/content/blog/<slug>.md
git add src/content/authors/<new-author>.md  # if new
git add src/content/tags/<new-tag>.md        # if new

git commit -m "Add blog post: <short-title>"
git push -u origin blog/<slug>
```

Then create a PR with `gh pr create`:

```bash
gh pr create --title "Add <title> blog post" --body "$(cat <<'EOF'
## Summary
- Adds new blog post: "<title>"
- Author: <author>, publish date: <date>
- <N> images converted to AVIF and uploaded to R2
- Source: <Notion URL or "local markdown">

## Test plan
- [ ] Verify blog post renders on Cloudflare Pages preview
- [ ] Check all external links work
- [ ] Confirm images load correctly
EOF
)"
```

#### PR Reviewer Tagging

After creating the PR, tag the appropriate reviewer:

| Post creator / Author context | Tag for review |
|-------------------------------|----------------|
| Tanish (SEO/GTM content) | `@strickvl` |
| Other team members | Ask the user who should review |

```bash
gh pr edit <pr-number> --add-reviewer <github-username>
```

### C10. Summarize for the user

Print a summary:
- Blog post file path and branch name
- Slug and live URL: `https://www.zenml.io/blog/<slug>`
- Cover image URL
- Any new tags/authors created
- Whether `discovery` tag was added (and why)
- PR URL and tagged reviewer
- Reminder: check the Cloudflare Pages preview deploy

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
| `seo.ogImage` | No | absolute URL | Same as mainImage.url |

*`mainImage` is technically optional but this skill treats it as required — always prompt for a cover image.

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
3. **Always `git pull origin main` before branching** — avoids conflicts with recently merged content.
4. **AVIF compression is dramatic** — typical 80-96% reduction. Use quality 28 + resize 800 for inline images, quality 25 + resize 1200 for cover/hero images.
5. **Verify R2 uploads via public URL** — the boto3 API can succeed but the public domain may not serve the file. Always `curl -sI` to confirm HTTP 200.
6. **Discovery tag for SEO posts** — posts under Tanish's GTM content or with "vs"/"alternative" patterns should get the `discovery` tag to keep them off the main blog listing.
7. **Build output is 2000+ lines** — always check only the tail for success/failure status.
8. **Pre-existing validation errors are normal** — old slug format warnings and the `mdast` type error are known issues, not regressions.
