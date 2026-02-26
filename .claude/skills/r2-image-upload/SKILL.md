---
name: r2-image-upload
description: >-
  Upload images and assets to ZenML's Cloudflare R2 bucket. Use when adding
  new images to blog posts, content pages, marketing data files, or any
  content that needs an R2-hosted URL. Handles uploading, key generation,
  and prints paste-ready frontmatter. Triggers: "upload image", "add image
  to R2", "new blog image", "upload asset", "R2 upload".
---

# R2 Image Upload

Upload images to the ZenML R2 bucket (`zenml-assets`) and get back absolute URLs for use in content frontmatter or `src/lib/*.ts` data files.

## Two-Tier Image Decision

**Before uploading to R2, decide which tier the image belongs to:**

| Tier | Where | When to use | Reference pattern |
|------|-------|-------------|-------------------|
| **A: public/** | `public/images/` | Small site-wide UI images: logos, icons, favicons, backgrounds | `"/images/filename.svg"` (root-relative) |
| **B: R2** | `zenml-assets` bucket | Content images: blog heroes, screenshots, team photos, OG images | `"https://assets.zenml.io/content/uploads/..."` (absolute URL) |

**Rule of thumb:** If it appears in `src/content/*.md` frontmatter, it goes to R2 (schemas require `z.string().url()`). If it's site furniture used across many pages, it goes in `public/images/`.

## Upload Workflow

### Prerequisites

R2 credentials must be in `.env` (copy from `.env.example`):
```
CLOUDFLARE_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
```

### Upload command

```bash
# Single image
uv run scripts/r2-upload.py path/to/image.avif

# With custom prefix (e.g., for blog images)
uv run scripts/r2-upload.py path/to/hero.webp --prefix content/blog

# Multiple images
uv run scripts/r2-upload.py img1.png img2.jpg img3.webp

# Print paste-ready frontmatter YAML
uv run scripts/r2-upload.py path/to/hero.webp --frontmatter
```

### R2 key structure

New uploads use: `content/uploads/{sha256_8}/{sanitized-filename}`

Example: `content/uploads/1a2b3c4d/hero-image.avif`

Webflow-migrated images (existing): `webflow/{siteId}/{sha8}/{filename}`

### After uploading

1. **Verify** the URL loads: `curl -sI <url>` should return HTTP 200
2. **Paste** the URL into frontmatter or data file
3. For `src/lib/*.ts` files: prefer building URLs from `ASSET_BASE_URL`:
   ```ts
   import { ASSET_BASE_URL } from "./constants";
   const heroUrl = `${ASSET_BASE_URL}/content/uploads/1a2b3c4d/hero.webp`;
   ```

## For Tier A (public/images)

No upload needed. Just place the file:

```bash
# Download/copy image to public/images/
cp path/to/logo.svg public/images/logos/new-logo.svg

# Reference in code as:
# "/images/logos/new-logo.svg"
```

Verify the file exists — Astro won't error on missing public/ files, it just 404s at runtime.

## Common prefixes

| Content type | Recommended `--prefix` |
|-------------|----------------------|
| Blog post images | `content/blog` |
| Team/author photos | `content/team` |
| Integration logos | `content/integrations` |
| Case study images | `content/case-studies` |
| General/misc | `content/uploads` (default) |
