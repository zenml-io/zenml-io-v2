---
name: r2-image-upload
description: >-
  Upload content images or assets to R2 when authorized; verify URLs and provide
  references. Skip UI assets stored in public/images.
---

# R2 Image Upload

Upload images to the ZenML R2 bucket (`zenml-assets`) and get back absolute URLs for use in content frontmatter or `src/lib/*.ts` data files.

Use existing task authorization before uploading; this skill does not itself
authorize an external write. Prepare assets independently if authorization is
pending. Do not automatically persist credentials received in conversation;
follow the root credential policy. Run scripts/r2-upload.py from the repository
root with absolute image paths when files are in a temporary directory.

## Two-Tier Image Decision

**Before uploading to R2, decide which tier the image belongs to:**

| Tier | Where | When to use | Reference pattern |
|------|-------|-------------|-------------------|
| **A: public/** | `public/images/` | Small site-wide UI images: logos, icons, favicons, backgrounds | `"/images/filename.svg"` (root-relative) |
| **B: R2** | `zenml-assets` bucket | Content images: blog heroes, screenshots, team photos, OG images | `"https://assets.zenml.io/content/uploads/..."` (absolute URL) |

**Rule of thumb:** If it appears in `src/content/*.md` frontmatter, it goes to R2 (schemas require `z.string().url()`). If it's site furniture used across many pages, it goes in `public/images/`.

## Format note: AVIF vs JPEG for Open Graph

Default to **AVIF** for everything — best compression, browsers render it fine.

**Exception:** images referenced from `seo.ogImage` need a **JPEG** sibling alongside the AVIF. Social platforms (LinkedIn, Twitter/X, Slack, Facebook, Discord) do NOT support AVIF in Open Graph cards. Using AVIF for `seo.ogImage` silently renders previews without an image.

Pattern: upload **both** under the same R2 prefix, reference AVIF from `mainImage.url` and JPEG from `seo.ogImage`. See PR #73 for the site-wide fix where 103 posts all had AVIF og images and were broken on LinkedIn.

```bash
# Convert + upload both formats
sips -s format jpeg cover.png --out cover.jpg --resampleHeightWidthMax 1200
~/.Codex/skills/avif-image-compressor/scripts/convert_to_avif.sh cover.png --quality 25 --resize 1200
uv run scripts/r2-upload.py cover.jpg cover.avif --prefix content/blog/<slug>
```

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

New uploads default to `content/uploads/{sha256_8}/{sanitized-filename}`.
A custom `--prefix` replaces content/uploads; for example, blog uploads can
use content/blog/<slug>. The hash and filename suffix remain content-addressed.

Example: `content/uploads/1a2b3c4d/hero-image.avif`

Webflow-migrated images (existing): `webflow/{siteId}/{sha8}/{filename}`

### After uploading

1. **Verify every uploaded URL** with `curl -sI <url>`; each must return HTTP 200 before committing references.
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
