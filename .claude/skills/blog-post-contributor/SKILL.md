---
name: blog-post-contributor
description: >-
  Add a new blog post to the ZenML website. Supports two workflows: (1) from a
  local markdown file, or (2) from a Notion page via MCP. Handles frontmatter
  validation, image processing (AVIF conversion + R2 upload), tag/author
  creation, and feature branch setup. Triggers: "new blog post", "add blog",
  "publish blog", "blog from Notion", "blog from markdown", "contribute blog".
---

# Blog Post Contributor

Add a new blog post to the ZenML website (`src/content/blog/`). This skill supports two source workflows and handles all the plumbing: frontmatter, images, taxonomy entries, and git branching.

## Quick Reference

| Item | Value |
|------|-------|
| Blog content dir | `src/content/blog/` |
| Authors dir | `src/content/authors/` |
| Categories dir | `src/content/categories/` |
| Tags dir | `src/content/tags/` |
| Schema source of truth | `src/content.config.ts` (`blogSchema`) |
| Image upload skill | `r2-image-upload` |
| Image compression skill | `avif-image-compressor` |

## Step 0: Create a Feature Branch

Before any work, create a feature branch:

```bash
git checkout -b blog/<slug>
```

Use the blog post's slug as the branch name suffix (e.g., `blog/my-new-post-title`).

## Choose Your Path

Ask the user: **"Do you have a local markdown file, or should I fetch the post from Notion?"**

- **Path A**: [From Markdown File](#path-a-from-markdown-file)
- **Path B**: [From Notion Page](#path-b-from-notion-page)

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

### B1. Fetch the Notion page

Ask the user for the Notion page URL or title to search for.

```
# Search by title
mcp__claude_ai_Notion__notion-search: { query: "blog post title" }

# Or fetch by URL (extract page ID from the URL)
mcp__claude_ai_Notion__notion-fetch: { url: "https://notion.so/..." }
```

### B2. Convert Notion content to markdown

Transform the Notion block content into clean markdown:
- Convert Notion headings → markdown headings (ensure single H1 for the title)
- Convert Notion bullet/numbered lists → markdown lists
- Convert Notion code blocks → fenced code blocks with language tags
- Convert Notion callouts → blockquotes or `<aside>` elements
- Convert Notion tables → markdown tables
- Strip Notion-specific formatting artifacts

### B3. Handle Notion images

Notion images are hosted on Notion's CDN (temporary URLs that expire). The user must download images to a local folder first.

**Ask the user:** "Where is the folder containing the downloaded images?"

Then for each image:
1. Convert to AVIF using the `avif-image-compressor` skill:
   ```bash
   ~/.claude/skills/avif-image-compressor/scripts/convert_to_avif.sh <image> --quality 25
   ```
2. Upload to R2 using the `r2-image-upload` skill:
   ```bash
   uv run scripts/r2-upload.py <image>.avif --prefix content/blog
   ```
3. Replace the Notion image reference in the markdown with the R2 URL

### B4. Generate the slug

Same as A2 — derive from title, confirm with user.

### B5. Continue to [Common Steps](#common-steps-both-paths)

---

## Common Steps (Both Paths)

### C1. Process images in the markdown body

Scan the markdown for any image references that are NOT already R2 URLs:
- Local file paths → convert to AVIF + upload to R2
- External URLs (non-R2) → download, convert to AVIF, upload to R2
- Already on R2 (`https://assets.zenml.io/...` or `pub-*.r2.dev`) → keep as-is

For the hero/main image:
1. Ask the user which image should be the hero image (or if they have one)
2. Convert and upload it to R2 with `--prefix content/blog`
3. Note the URL for the `mainImage` frontmatter field

### C2. Validate or create the author

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
# avatar, email, linkedin are all optional
---
```

Ask the user for the author's name and any optional fields.

### C3. Validate or create tags

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

Existing tags (118 total) cover most topics. Check before creating duplicates.
Common tags: `mlops`, `llmops`, `zenml`, `genai`, `agents`, `tutorials`, `best-practices`, `cloud`, `open-source`, `pipelines`.

### C4. Validate the category

Categories are a fixed set (14 total). List them for the user to choose:

| Slug | Name |
|------|------|
| `mlops` | MLOps |
| `zenml` | ZenML |
| `llmops` | LLMOps |
| `llms` | LLMs |
| `tutorials` | Tutorials |
| `community` | Community |
| `case-studies` | Case Studies |
| `newsletters` | Newsletters |
| `podcast` | Podcast |
| `sales-blog` | Sales Blog |
| `tech-startup` | Tech Startup |
| `webinars` | Webinars |
| `zenml-updates` | ZenML Updates |
| `mlstacks` | MLStacks |

Category is optional. Don't create new categories — use the closest match.

### C5. Build the frontmatter

Assemble the complete frontmatter block:

```yaml
---
title: "Your Blog Post Title"
slug: "your-blog-post-slug"
draft: true
author: "author-slug"
category: "mlops"
tags:
  - "zenml"
  - "mlops"
date: "2026-02-26T00:00:00.000Z"
readingTime: "X mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/xxxxxxxx/hero.avif"
  alt: "Description of the hero image"
seo:
  title: "Your Blog Post Title - ZenML Blog"
  description: "A concise 150-160 character description for search engines and social sharing."
  canonical: "https://www.zenml.io/blog/your-blog-post-slug"
  ogImage: "https://assets.zenml.io/content/blog/xxxxxxxx/hero.avif"
---
```

**Key rules:**
- `slug` MUST match the filename (e.g., `your-blog-post-slug.md`)
- `date` should be an ISO 8601 string
- `readingTime` format: `"X mins"` — estimate ~200 words/minute
- `mainImage.url` must be an absolute URL (R2-hosted)
- `seo.canonical` must be `https://www.zenml.io/blog/<slug>`
- `draft: true` initially — set to `false` when ready to publish
- `webflow` field is NOT needed for new native posts

### C6. Write the blog post file

Save to `src/content/blog/<slug>.md`:

```bash
# The file path must match the slug
src/content/blog/your-blog-post-slug.md
```

### C7. Validate

Run the validation checks:

```bash
# Content schema validation
pnpm validate:content

# TypeScript check
pnpm check

# Full build (run in background, check tail for success)
pnpm build
```

Fix any issues that arise. Common problems:
- Slug mismatch between frontmatter and filename
- Tag/author slug not found (forgot to create the `.md` file)
- Image URL not absolute (must start with `https://`)
- Invalid date format

### C8. Commit and push

```bash
git add src/content/blog/<slug>.md
# Also add any new author/tag files
git add src/content/authors/<new-author>.md
git add src/content/tags/<new-tag>.md
git commit -m "Add blog post: <title>"
git push -u origin blog/<slug>
```

### C9. Summarize for the user

Print a summary:
- Blog post file path
- Branch name
- Slug and URL it will live at: `https://www.zenml.io/blog/<slug>`
- Hero image URL
- Any new tags/authors created
- Reminder: set `draft: false` when ready to publish
- Reminder: create a PR for review

## Frontmatter Field Reference

| Field | Required | Type | Example |
|-------|----------|------|---------|
| `title` | Yes | string | `"My Great Post"` |
| `slug` | Yes | string | `"my-great-post"` |
| `draft` | No | boolean | `true` (default: `false`) |
| `featured` | No | boolean | `false` (default: `false`) |
| `author` | Yes | slug ref | `"hamza-tahir"` |
| `category` | No | slug ref | `"mlops"` |
| `tags` | No | slug ref[] | `["zenml", "mlops"]` |
| `date` | Yes | ISO date | `"2026-02-26T00:00:00.000Z"` |
| `readingTime` | No | string | `"5 mins"` |
| `mainImage.url` | No* | absolute URL | `"https://assets.zenml.io/..."` |
| `mainImage.alt` | No | string | `"Pipeline diagram"` |
| `seo.title` | No | string | `"Title - ZenML Blog"` |
| `seo.description` | No | string | `"150-char description"` |
| `seo.canonical` | No | absolute URL | `"https://www.zenml.io/blog/slug"` |
| `seo.ogImage` | No | absolute URL | Same as mainImage.url |

*`mainImage` is technically optional but strongly recommended for social sharing and the blog listing page.
