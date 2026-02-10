# Phase 0: Project Setup — Detailed Plan

> **Goal**: Scaffold the Astro project, configure deployment, verify the full
> pipeline works (push → build → deploy → preview URL).
>
> **Definition of done**: A branch push triggers a Cloudflare Pages build, and
> the deployed preview shows a working Astro page with Tailwind styling.

---

## Prerequisites

Before starting, confirm:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] A Cloudflare account with access to Pages and R2
- [ ] The GitHub repo (`zenml-io-v2`) is accessible from Cloudflare Pages
- [ ] A package manager decision (see Step 1)

---

## Step 1: Initialize Astro Project

We'll use `npm create astro@latest` to scaffold into the existing repo. Since
the repo already has files (`CLAUDE.md`, `.gitignore`, `README.md`, `design/`),
we need to be careful not to overwrite them.

**Approach**: Initialize Astro in a temp directory, then move files into the
repo root. This avoids the interactive installer fighting with existing files.

```bash
# Option A: Initialize in place (if create-astro supports --force/--overwrite)
cd /path/to/zenml-io-v2
npm create astro@latest . -- --template minimal --typescript strict --install

# Option B: Initialize in temp, copy over
cd /tmp
npm create astro@latest zenml-v2-scaffold -- --template minimal --typescript strict
# Then copy relevant files into the real repo
```

### Package manager

Use **pnpm** — it's fast, disk-efficient, and well-supported by both Astro and
Cloudflare Pages. If the team prefers npm or bun, that's fine too — just be
consistent.

```bash
# Install pnpm if not present
npm install -g pnpm
```

### Expected files after scaffold

```
zenml-io-v2/
├── astro.config.mjs        → rename to astro.config.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── src/
│   ├── pages/
│   │   └── index.astro     (placeholder home page)
│   └── env.d.ts
├── public/
│   └── favicon.svg
├── CLAUDE.md               (keep — already exists)
├── README.md               (keep or replace with Astro's)
├── .gitignore              (merge with existing)
└── design/                 (keep — already exists, gitignored)
```

---

## Step 2: Add Integrations

Install Astro's official integrations for our stack:

```bash
# Tailwind CSS (v4 — Astro 5+ supports Tailwind v4 natively via Vite)
pnpm astro add tailwindcss

# Cloudflare Pages adapter
pnpm astro add cloudflare

# Preact (for interactive islands)
pnpm astro add preact

# Sitemap (generates sitemap.xml at build time)
pnpm astro add sitemap

# MDX support (for rich content that needs components)
pnpm astro add mdx
```

Each `astro add` command modifies `astro.config.ts` and installs dependencies
automatically.

---

## Step 3: Configure `astro.config.ts`

The config should set up:

- **Output mode**: `static` (pre-render everything at build time)
- **Site URL**: `https://zenml.io` (needed for sitemap, canonical URLs)
- **Integrations**: Tailwind, Cloudflare, Preact, Sitemap, MDX
- **Markdown config**: syntax highlighting, etc.
- **Content collections directory**: default `src/content/`

```typescript
// astro.config.ts
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://www.zenml.io",
  output: "static",
  adapter: cloudflare(),
  integrations: [
    tailwindcss(),
    preact(),
    sitemap(),
    mdx(),
  ],
});
```

**Note on output mode**: We start with `static` (full SSG). If we later need
server-side rendering for specific routes (e.g., a dynamic API endpoint), we
can switch to `hybrid` mode — that allows per-page opt-in to SSR while keeping
everything else static.

---

## Step 4: Set Up Project Structure

Create the directory skeleton that the rest of the migration will fill in:

```
src/
├── components/              # Reusable UI components
│   ├── layout/              # Header, Footer, Navigation
│   └── islands/             # Interactive Preact components
├── content/                 # Astro Content Collections
│   └── config.ts            # Collection schemas (Phase 2)
├── layouts/                 # Page layouts (base, blog, content)
│   └── BaseLayout.astro     # HTML shell: <head>, nav, footer
├── pages/                   # File-based routing
│   └── index.astro          # Home page
├── styles/                  # Global styles
│   └── global.css           # Tailwind directives + any global CSS
└── lib/                     # Utility functions, helpers
    └── constants.ts         # Site-wide constants (URLs, etc.)
public/
├── favicon.svg              # Favicon
└── robots.txt               # Robots file (basic for now)
```

### Base Layout

Create a minimal `BaseLayout.astro` that wraps every page:

```astro
---
// src/layouts/BaseLayout.astro
interface Props {
  title: string;
  description?: string;
}

const { title, description = "ZenML — Build portable, production-ready MLOps pipelines." } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Placeholder Home Page

A simple page to verify the full pipeline works:

```astro
---
// src/pages/index.astro
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="ZenML — MLOps Framework">
  <main class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900">ZenML v2</h1>
      <p class="mt-4 text-lg text-gray-600">Site migration in progress.</p>
    </div>
  </main>
</BaseLayout>
```

---

## Step 5: Update `.gitignore`

Replace the Next.js-oriented `.gitignore` with one appropriate for Astro:

```gitignore
# Dependencies
node_modules/

# Astro build output
dist/
.astro/

# Environment variables
.env
.env.*
!.env.example

# OS files
.DS_Store
Thumbs.db

# Editor
*.swp
*.swo

# TypeScript
*.tsbuildinfo

# Debug logs
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*

# Cloudflare
.wrangler/
.dev.vars

# ZenML project (not committed)
.claude/
design/
.mcp.json
```

---

## Step 6: Add Basic Linting & Formatting

Use **Biome** — it's a single tool that replaces ESLint + Prettier, is very
fast, and has good TypeScript/Astro support.

```bash
pnpm add -D @biomejs/biome
pnpm biome init
```

Configure `biome.json` with sensible defaults:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0/schema.json",
  "files": {
    "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.astro"]
  },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

Add npm scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "lint": "biome check src/",
    "lint:fix": "biome check --fix src/",
    "format": "biome format --write src/"
  }
}
```

---

## Step 7: Verify Local Build

```bash
# Start dev server
pnpm dev
# → Should open at http://localhost:4321 with the placeholder page

# Run production build
pnpm build
# → Should output to dist/ with static HTML files

# Preview production build locally
pnpm preview
# → Should serve the built site

# Type checking
pnpm check
# → Should pass with no errors
```

---

## Step 8: Cloudflare R2 Setup

Create an R2 bucket for hosting migrated assets (images, files).

### Via Cloudflare Dashboard or Wrangler CLI:

```bash
# Install wrangler if not present
pnpm add -D wrangler

# Login to Cloudflare
pnpm wrangler login

# Create R2 bucket
pnpm wrangler r2 bucket create zenml-assets

# Optional: set up a custom domain for the bucket (e.g., assets.zenml.io)
# This is done in Cloudflare dashboard under R2 → bucket → Settings → Custom Domains
```

### Access pattern

Assets will be referenced in content as:
```
https://assets.zenml.io/images/blog/my-image.png
```

Or, if using the default R2 public URL:
```
https://pub-<hash>.r2.dev/images/blog/my-image.png
```

A custom domain (`assets.zenml.io`) is cleaner and recommended. Set it up in
the Cloudflare dashboard.

---

## Step 9: Connect to Cloudflare Pages

### Via Cloudflare Dashboard:

1. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select the `zenml-io-v2` repository
3. Configure build settings:
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (repo root)
   - **Node.js version**: `20` (set via environment variable `NODE_VERSION=20`)
4. Add environment variable: `NODE_VERSION` = `20`
5. Deploy

### Branch preview verification:

1. Create a test branch: `git checkout -b test/cloudflare-preview`
2. Make a small change (e.g., update the placeholder text)
3. Push to remote: `git push -u origin test/cloudflare-preview`
4. Cloudflare Pages should auto-build and deploy a preview at
   `test-cloudflare-preview.zenml-io-v2.pages.dev` (or similar)
5. Verify the preview URL works
6. Delete the test branch after verification

---

## Step 10: Extract Design Tokens from Webflow

Before we start building any real pages, we extract the design "DNA" from the
Webflow site so our Tailwind config uses the exact same colors, fonts, and
spacing.

### 10a. Extract design variables

Use the Webflow MCP `variable_tool` to pull all design variables:

```
variable_tool → get_variable_collections (query: "all")
```

Then for each collection, get all variables. This gives us:
- **Colors**: brand purple, text colors, background colors, etc.
- **Font families**: primary/secondary/monospace fonts
- **Sizes**: spacing scale, section padding, container widths
- **Numbers/percentages**: border radii, opacity values, etc.

### 10b. Extract all named styles

Use the `style_tool` to pull all CSS classes:

```
style_tool → get_styles (query: "all", include_all_breakpoints: true)
```

This gives us every Webflow class with its CSS properties at every breakpoint
(desktop, tablet, mobile landscape, mobile portrait). Save this as a reference
file at `design/webflow-styles.json`.

### 10c. Map to Tailwind config

Create a `tailwind.config.ts` that extends Tailwind's defaults with ZenML's
exact design tokens:

```typescript
// Example — actual values come from the extraction
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#7B61FF",   // from Webflow variable
          dark: "#1A1A2E",     // from Webflow variable
          // ... etc
        },
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],  // from Webflow variable
        mono: ["JetBrains Mono", "monospace"],
      },
      // spacing, borderRadius, etc.
    },
  },
};
```

### 10d. Download the Webflow code export (manual step)

As a complementary reference:
1. Go to Webflow Dashboard → Site Settings → Code Export
2. Download the .zip
3. Save to `design/webflow-export/` (already gitignored)
4. This gives us the actual HTML/CSS as a visual reference

### 10e. Capture baseline screenshots

Take screenshots of key pages on the live site for later comparison:
- Home page
- Blog listing
- A blog post
- LLMOps database listing
- An LLMOps entry
- Pricing page
- A VS comparison page

Save to `design/screenshots/baseline/` (gitignored).

---

## Step 11: Initial Git Commit

Once everything is working, commit the scaffolded project:

```bash
git add package.json pnpm-lock.yaml tsconfig.json astro.config.ts \
       biome.json .gitignore \
       src/ public/
git commit -m "Phase 0: scaffold Astro project with Tailwind, Preact, Cloudflare Pages"
```

**Do not commit**: `design/`, `.claude/`, `.mcp.json`, `node_modules/`, `dist/`

---

## Checklist (copy to task list)

- [ ] Node.js 18+ and pnpm available
- [ ] Astro project initialized with TypeScript (strict)
- [ ] Tailwind CSS integration added and working
- [ ] Cloudflare Pages adapter added
- [ ] Preact integration added
- [ ] MDX integration added
- [ ] Sitemap integration added
- [ ] `astro.config.ts` configured (static output, site URL, integrations)
- [ ] Project directory structure created (components, layouts, content, pages, styles, lib)
- [ ] `BaseLayout.astro` created with basic HTML shell
- [ ] Placeholder `index.astro` home page with Tailwind styling
- [ ] `.gitignore` updated for Astro (removed Next.js references)
- [ ] Biome linting/formatting configured
- [ ] `pnpm dev` serves the site locally
- [ ] `pnpm build` produces static output in `dist/`
- [ ] `pnpm check` passes type checking
- [ ] Cloudflare R2 bucket created for assets
- [ ] Repo connected to Cloudflare Pages (auto-deploy on push)
- [ ] Branch preview deployment verified
- [ ] Design variables extracted from Webflow (`variable_tool`)
- [ ] All Webflow styles extracted and saved (`design/webflow-styles.json`)
- [ ] `tailwind.config.ts` populated with ZenML design tokens (colors, fonts, spacing)
- [ ] Webflow code export downloaded as reference (`design/webflow-export/`)
- [ ] Baseline screenshots captured for key pages (`design/screenshots/baseline/`)
- [ ] Initial commit pushed to `main`

---

## Notes

### Why Astro `static` mode (not `hybrid` or `server`)?

For Phase 0 we start with `static` because:
- Every page is pre-rendered at build time → fastest possible response
- No server needed → Cloudflare Pages serves it from the edge CDN
- Best for SEO — search engines get full HTML immediately
- Simplest mental model — the output is just HTML files

If we later need server-side rendering (e.g., an API endpoint, dynamic OG
images, form handling), we can switch to `hybrid` mode. In hybrid mode, pages
are static by default but individual routes can opt into SSR with
`export const prerender = false`.

### Why Preact instead of React?

Preact is a 3KB alternative to React with the same API. Since we're only using
it for small interactive islands (not a full SPA), the smaller bundle size
matters. Astro's Preact integration supports JSX/TSX components and all
standard hooks. If we need a React-only library later, we can swap to
`@astrojs/react` — the component code is nearly identical.

### Why Biome instead of ESLint + Prettier?

Biome combines linting and formatting in a single, very fast Rust-based tool.
For a project where the team uses Claude Code as the primary editor, Biome's
speed and simplicity are a good fit. If the team already had ESLint configs
they wanted to preserve, ESLint + Prettier would be the safer choice — but
since this is a fresh project, Biome is the cleaner option.
