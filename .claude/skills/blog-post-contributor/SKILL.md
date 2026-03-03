---
name: blog-post-contributor
description: >-
  Add a new blog post to the ZenML website. Supports two workflows: (1) from a
  local markdown file, or (2) from a Notion page exported as markdown. Handles
  frontmatter validation, image processing (AVIF conversion + R2 upload),
  tag/author creation, and feature branch setup. Triggers: "new blog post",
  "add blog", "publish blog", "blog from Notion", "blog from markdown",
  "contribute blog".
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

Ask the user: **"Do you have a local markdown file, or is the content in Notion?"**

- **Path A**: [From Markdown File](#path-a-from-markdown-file) — user already has a `.md` file
- **Path B**: [From Notion Export](#path-b-from-notion-export) — content lives in Notion, needs exporting

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

## Path B: From Notion Export

**Do NOT use the Notion MCP server** to fetch blog content. Notion's MCP returns block-level JSON that loses formatting nuance, and Notion-hosted images use temporary CDN URLs that expire. Instead, have the user prepare two things manually:

### B1. Ask the user to export from Notion

The user should:
1. **Export the page as Markdown** from Notion (⋯ menu → Export → Markdown & CSV)
2. **Save all images manually** into a separate folder, **in the order they appear in the page** (top to bottom). This order matters because the Notion markdown export uses generic filenames like `image1.png`, `image2.png` — matching them to the right placeholder depends on save order.

**Ask the user for:**
- The path to the exported `.md` file (or the Notion page link for reference context)
- The path to the folder containing the saved images

> **Tip for the user:** Open the Notion page, right-click each image from top to bottom, and "Save Image As..." into one folder. The file modification timestamps will preserve insertion order. Alternatively, the Notion markdown export includes images in a subfolder with matching filenames — if the user provides the full Notion export zip, the images will already be mapped.

### B2. Read the exported markdown

Read the `.md` file. Notion exports typically include:
- A first H1 that is the page title (sometimes duplicated)
- Metadata lines at the top (keyword, slug, meta description) if the author added them
- Image references as `![](FolderName/imageN.png)` relative paths
- Tables, bullet lists, code blocks — usually valid markdown

Clean up:
- Remove any Notion metadata lines (keyword, slug, meta description) from the top — these go into frontmatter instead
- **Remove ALL H1 headers (`# ...`) from the body.** The title lives in frontmatter and `BlogLayout` renders it — any H1 in the markdown body creates a duplicate heading on the page. The body should start directly with prose or an H2.
- Strip Notion-specific formatting artifacts if any

### B3. Map images to their placeholders

The markdown will contain image references like `![](E2B%20alternatives/image17.png)`. Match each reference to the corresponding file in the user's image folder by filename. If filenames match directly (common with Notion exports), the mapping is straightforward.

If the filenames don't match, use file modification timestamps (earliest saved = first image in the post) to establish the correct order.

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
draft: false
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
- `draft: false` by default — only set `true` if the user specifically wants a draft
- `webflow` field is NOT needed for new native posts

### C6. Write the blog post file

**Token efficiency**: When the user provides a ready `.md` file, do NOT rewrite it through the Write tool (which outputs all content tokens). Instead, use bash: write the frontmatter to the target file with a heredoc, then `cat` the body (with H1 and metadata lines stripped via `tail -n +N`) and append with `>>`. This avoids duplicating thousands of tokens.

Save to `src/content/blog/<slug>.md`:

```bash
# The file path must match the slug
src/content/blog/your-blog-post-slug.md
```

**Important:** The markdown body must NOT contain an H1 (`# Title`). The title is rendered by `BlogLayout` from the frontmatter `title` field. The body should begin with prose or an H2 (`## ...`). Including an H1 creates a duplicate heading on the page.

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
- Hero image URL (if set)
- Any new tags/authors created
- Whether the post is published (`draft: false`) or draft (`draft: true`)
- Reminder: create a PR for review

## Frontmatter Field Reference

| Field | Required | Type | Example |
|-------|----------|------|---------|
| `title` | Yes | string | `"My Great Post"` |
| `slug` | Yes | string | `"my-great-post"` |
| `draft` | No | boolean | `false` (set `true` only if user wants a draft) |
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
