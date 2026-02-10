# Custom Code & Third-Party Scripts Audit

**Date:** 2026-02-10
**Source:** www.zenml.io (Webflow site ID: `64a817a2e7e2208272d1ce30`)
**Purpose:** Identify all custom code, third-party scripts, and integrations that need to be replicated in the Astro migration.

---

## Summary

The ZenML Webflow site uses **14 distinct third-party services** plus several custom inline scripts. Most scripts are loaded site-wide via Webflow's Project Settings custom code (head/body). A few pages have page-specific scripts (Cal.com embeds, ROI calculator logic, blog TOC generator, LLMOps database filtering).

The Finsweet Cookie Consent library (`fs-cc`) gates the Segment analytics script behind cookie consent, meaning some scripts use the `type="fs-cc"` attribute with `fs-cc-categories="analytics"` instead of `type="text/javascript"`.

---

## Site-Wide Scripts (All Pages)

These are injected on every page via Webflow's site-level custom code settings.

### Head Scripts

| # | Script / Tag | Source | Type | Purpose | Replicate? | Astro Implementation |
|---|---|---|---|---|---|---|
| 1 | **Google Fonts (WebFont Loader)** | `ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js` | External JS (head) | Loads Inconsolata 400,700 via WebFont.load() | Yes | Use `@fontsource/inconsolata` npm package or `<link>` preload in BaseLayout. Also load Plus Jakarta Sans (primary font loaded via Webflow CSS). |
| 2 | **Webflow Touch Detection** | Inline | Inline JS (head) | Adds `w-mod-js` and `w-mod-touch` classes to `<html>` | No | Skip -- Webflow-specific. Replace with Astro equivalent if needed for responsive behavior. |
| 3 | **Google Analytics 4** | `www.googletagmanager.com/gtag/js?id=G-T3T6F795FY` | External JS (head, async) | GA4 pageview and event tracking | Yes | Add to BaseLayout `<head>` with `is:inline`. Gate behind cookie consent. Config: `G-T3T6F795FY`, developer_id: `dZGVlNj`. |
| 4 | **Segment Analytics** | `cdn.segment.com/analytics.js/v1/Q9Gsmet5Uo67D8HIEk4pj5vUOalWu4iT/analytics.min.js` | External JS (head) | Customer data platform -- event tracking, user identification | Yes | Add to BaseLayout `<head>`. **Gated behind cookie consent** (`type="fs-cc"`, `fs-cc-categories="analytics"`). Write key: `Q9Gsmet5Uo67D8HIEk4pj5vUOalWu4iT`. |
| 5 | **Plausible Analytics** | `plausible.io/js/plausible.js` | External JS (head, defer) | Privacy-friendly analytics (primary analytics tool) | Yes | Add to BaseLayout `<head>`. `data-domain="zenml.io"`. Consider `@astrojs/partytown` for off-main-thread loading. |
| 6 | **GitHub Buttons** | `buttons.github.io/buttons.js` | External JS (head, async defer) | Renders GitHub star count buttons | Yes | Add to BaseLayout `<head>` or load only on pages that use it. Consider replacing with a static star count fetched at build time. |
| 7 | **Finsweet Cookie Consent** | `cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js` | External JS (head, async) | Cookie consent banner with opt-in mode, manages consent categories (essential, marketing, personalization, analytics) | Yes | Add to BaseLayout. Mode: `fs-cc-mode="opt-in"`. The consent UI is built with custom HTML (banner + preferences modal). Could replace with a lighter alternative (e.g., cookie-consent-banner, or custom Preact island). |
| 8 | **HubSpot** | `js-eu1.hs-scripts.com/144099597.js` | External JS (head, async defer) | HubSpot tracking code and chat widget. Portal ID: `144099597` (EU region). | Yes | Add to BaseLayout `<head>`. Gate behind cookie consent if desired. |
| 9 | **RB2B** | `s3-us-west-2.amazonaws.com/b2bjsstore/b/Z6PVLHP07Q6R/Z6PVLHP07Q6R.js.gz` | External JS (head) | B2B visitor identification / account-based marketing. Key: `Z6PVLHP07Q6R`. | Yes | Add to BaseLayout `<head>`. Consider gating behind marketing cookie consent. |
| 10 | **Reo.dev** | `static.reo.dev/d696528d7eed7f5/reo.js` | External JS (head, defer) | Developer-focused visitor tracking. Client ID: `d696528d7eed7f5`. | Yes | Add to BaseLayout `<head>`. |
| 11 | **Ortto (AP3C / CloudOrtto)** | `cloudortto.zenml.io/app.js` | External JS (head) | CRM / marketing automation tracking. Client ID: `ZLL3D-tdcsJ2LnXAemVubWw`. Custom subdomain: `cloudortto.zenml.io`. | Yes | Add to BaseLayout `<head>`. |
| 12 | **Apollo.io** | `assets.apollo.io/micro/website-tracker/tracker.iife.js` | External JS (head) | Sales intelligence / visitor tracking. App ID: `691f4e111003f200159c6363`. | Yes | Add to BaseLayout `<head>`. |
| 13 | **Microsoft Clarity** | `cdn.prod.website-files.com/.../clarity_script-7.5.2.js` | External JS (head) | Session recording and heatmaps. Currently hosted on Webflow CDN -- will need to be loaded from Clarity's official CDN (`clarity.ms/tag/PROJECT_ID`) or self-hosted. | Yes | Add to BaseLayout `<head>`. Switch to official Clarity embed: `https://www.clarity.ms/tag/PROJECT_ID`. Need to find the Clarity project ID (check Clarity dashboard). |
| 14 | **highlight.js Theme CSS** | Inline `<style>` | Inline CSS (head) | Syntax highlighting color theme (Moonlight II variant). | Yes | Extract to a standalone CSS file (e.g., `hljs-theme.css`) and import in BaseLayout or only on pages with code blocks. |
| 15 | **Custom Table & Layout CSS** | Inline `<style>` | Inline CSS (head) | Table styling (borders, padding, radius), `.uui-section_layout08:before` anchor offset, `#feature-comparison:before` anchor offset, code block styles. | Yes | Extract to global CSS or Tailwind `@apply` rules. The anchor offset pattern (`content:""; display:block; height:80px; margin:-80px 0 0`) handles fixed-header scroll anchoring -- replicate with `scroll-margin-top` in Tailwind. |

### Body Scripts (Before `</body>`)

| # | Script / Tag | Source | Type | Purpose | Replicate? | Astro Implementation |
|---|---|---|---|---|---|---|
| 16 | **jQuery 3.5.1** | `d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js` | External JS (body) | Required by Webflow runtime and some custom scripts. | Maybe | Try to eliminate. If Webflow interactions are replicated natively, jQuery is not needed. Some page-specific scripts (Select2 on demo page) depend on it. |
| 17 | **Webflow JS Runtime** | `cdn.prod.website-files.com/.../webflow.*.js` (2 files) | External JS (body) | Webflow interactions, animations, form handling. | No | Skip -- Webflow-specific. Replace interactions with CSS animations or lightweight JS. |
| 18 | **highlight.js 11.5.1** | `cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js` | External JS (body) | Code syntax highlighting. | Yes | Install via npm (`highlight.js`) or use a lighter alternative like Shiki (built into Astro for MDX). Load only on pages with code blocks. |
| 19 | **HubSpot on Webflow** | `hubspotonwebflow.com/assets/js/form-124.js` | External JS (body) | HubSpot form integration for Webflow. | No | Skip -- use HubSpot's official form embed SDK directly (`//js-eu1.hsforms.net/forms/embed/v2.js`) or replace with native forms posting to HubSpot API. |
| 20 | **Interactive Code Blocks** | Inline JS (body) | Inline JS | Homepage hero: mouse-hover linking between feature blocks and code snippets. Uses `data-block` attributes, opacity transitions, `highlight` class toggling. Responsive (disabled below 768px). | Yes | Rewrite as a Preact island component. Self-contained interactive widget for the homepage hero. |

---

## Page-Specific Scripts

### Homepage (`/`)

| Script | Purpose | Replicate? | Notes |
|---|---|---|---|
| Interactive code block highlighting | Mouseover linking between feature blocks and code snippets | Yes | Preact island. |
| Marquee/slider animation CSS | `@keyframes marquee-slide` for integrations logo slider (60s linear infinite) | Yes | Pure CSS animation -- add to component styles. |
| Brevo newsletter form | Footer newsletter signup with custom form handler (fetch POST, no-cors, show/hide thank-you) | Yes | Rewrite as Preact island or Astro form component posting to Brevo API. Form ID: `65fd9132331e6d39b81aef11`. |

### Blog Post Template (`/blog/[slug]`)

| Script | Purpose | Replicate? | Notes |
|---|---|---|---|
| Table of Contents generator | Dynamically creates TOC from h2 headings. Uses `IntersectionObserver` for scroll-spy highlighting of current section. | Yes | Implement as Astro component or Preact island. Can generate TOC at build time from MDX headings (better for SSG). |
| highlight.js initialization | `hljs.highlightBlock(block)` on all `pre code` elements | Yes | Use Astro's built-in Shiki integration for MDX code blocks (build-time highlighting, zero JS). |

### Book Your Demo / Schedule a Demo (`/book-your-demo`, `/schedule-a-demo`)

| Script | Purpose | Replicate? | Notes |
|---|---|---|---|
| **Cal.com Embed** | `https://app.cal.com/embed/embed.js` -- inline calendar for booking discovery calls. Namespace: `discovery-call`. Calendar: `zenml/discovery-call`. Month view layout. | Yes | Use Cal.com's official embed. Add `<script>` on demo pages only. Target element: `#my-cal-inline-discovery-call`. |
| **Select2** (jQuery plugin) | Enhanced dropdown for ML stack selection on demo signup form (`#ml-stack`). | Maybe | Replace with a lightweight alternative (e.g., Choices.js which is jQuery-free) or a Preact select component. |

### LLMOps Database (`/llmops-database`)

| Script | Purpose | Replicate? | Notes |
|---|---|---|---|
| Random style class assignment | Applies `style-1` through `style-8` randomly to collection items. Uses `MutationObserver` to re-apply when Finsweet dynamically loads new items. | Yes | Implement as Preact island or build-time assignment. |
| Finsweet CMS Filter attributes | Uses `fs_cmsfilter_list` class and Finsweet CMS filter data attributes for tag-based filtering and search. | Yes | Build as Preact island with client-side filtering. With 1,453 items, consider paginated JSON + client-side filter or Pagefind. |
| 8 color style CSS classes | `style-1` to `style-8` with distinct colors for tag pills. | Yes | Extract to Tailwind utility classes or CSS module. |

### ROI Calculator (`/roi-calculator`)

| Script | Purpose | Replicate? | Notes |
|---|---|---|---|
| Calculator logic | Three sliders (models: 1-500, team: 1-100, cloud spend: $200-$100K). Computes ZenML cost, infra savings (15% + scale bonus), productivity (12-20h saved per engineer), ROI percentage. Dynamic tooltips and gradient progress bars. | Yes | Implement as Preact island. Self-contained component, no external dependencies. |

### Newsletter Signup (`/newsletter-signup`)

| Script | Purpose | Replicate? | Notes |
|---|---|---|---|
| Brevo form handler | Custom fetch POST handler with loading state and thank-you toggle. Same pattern as footer form but standalone page version. | Yes | Same approach as footer form. |

---

## Cookie Consent Architecture

The site uses **Finsweet Cookie Consent** (`fs-cc`) in **opt-in mode**, meaning scripts are blocked until the user consents.

### Consent Categories
| Category | Description | Scripts Gated |
|---|---|---|
| **Essential** | Always active | Core site functionality |
| **Analytics** | Opt-in required | Segment Analytics (explicitly gated via `type="fs-cc"` attribute) |
| **Marketing** | Opt-in required | Likely: RB2B, Apollo, Ortto, Reo |
| **Personalization** | Opt-in required | Likely: HubSpot chat |

### Implementation Notes
- Segment is the only script with **explicit** `fs-cc` gating (`type="fs-cc" fs-cc-categories="analytics"`)
- Other tracking scripts (RB2B, Reo, Apollo, Ortto) load **unconditionally** in the current implementation
- For Astro: decide whether to gate more scripts behind consent (recommended for GDPR compliance)

---

## Fonts

| Font | Source | Weight(s) | Usage |
|---|---|---|---|
| **Plus Jakarta Sans** | Webflow CSS bundle | 400, 500, 600, 700 | Primary UI font (body, headings) |
| **Inconsolata** | Google Fonts (via WebFont loader) | 400, 700 | Code/monospace display |

### Astro Implementation
- Install `@fontsource/plus-jakarta-sans` and `@fontsource/inconsolata` via npm
- Import in BaseLayout for optimal loading (no FOUT, no external requests)
- Alternatively: self-host font files in `public/fonts/` with `@font-face` declarations

---

## SEO & Meta Tags

| Tag | Present? | Notes |
|---|---|---|
| `<title>` | Yes | Per-page, set in Webflow CMS |
| `<meta name="description">` | Yes | Per-page |
| `<meta property="og:title">` | Yes | Per-page |
| `<meta property="og:description">` | Yes | Per-page |
| `<meta property="og:image">` | Yes | Site-wide default OG image |
| `<meta property="og:type">` | Yes | `website` |
| `<meta name="twitter:card">` | Yes | `summary_large_image` |
| `<meta name="twitter:title">` | Yes | Per-page |
| `<meta name="twitter:description">` | Yes | Per-page |
| `<link rel="canonical">` | Yes | Per-page |
| `<link rel="shortcut icon">` | Yes | Custom favicon PNG |
| `<link rel="apple-touch-icon">` | Yes | Custom webclip PNG |
| JSON-LD structured data | **No** | Not present -- consider adding for blog posts (Article schema) and Organization schema |

---

## Assets to Re-host

These external assets currently load from Webflow's CDN (`cdn.prod.website-files.com`) and will break when we disconnect from Webflow:

- All images (OG image, favicon, webclip, logos, team photos, etc.)
- The Webflow CSS bundle (`zenml.webflow.shared.*.min.css`)
- The Clarity script (currently hosted on Webflow CDN)
- Webflow JS runtime (will be replaced, not re-hosted)

---

## Recommended BaseLayout.astro Structure

```
<head>
  <!-- Meta -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <slot name="seo" />  <!-- per-page title, description, OG, canonical -->

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <!-- @fontsource imports or self-hosted @font-face -->

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <!-- Global CSS -->
  <link rel="stylesheet" href="/styles/global.css" />

  <!-- Cookie Consent (loads first to gate other scripts) -->
  <script async src="https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js"
    fs-cc-mode="opt-in"></script>

  <!-- Analytics: Plausible (privacy-friendly, always load) -->
  <script defer data-domain="zenml.io"
    src="https://plausible.io/js/plausible.js"></script>

  <!-- Analytics: GA4 (gate behind consent) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-T3T6F795FY"></script>
  <script is:inline>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-T3T6F795FY');
  </script>

  <!-- Analytics: Segment (gated behind cookie consent) -->
  <script type="fs-cc" fs-cc-categories="analytics" is:inline>
    // Segment snippet (write key: Q9Gsmet5Uo67D8HIEk4pj5vUOalWu4iT)
  </script>

  <!-- B2B Tracking -->
  <script is:inline>/* RB2B (Z6PVLHP07Q6R) */</script>
  <script is:inline>/* Reo.dev (d696528d7eed7f5) */</script>
  <script is:inline>/* Ortto/AP3C (ZLL3D-tdcsJ2LnXAemVubWw) */</script>
  <script is:inline>/* Apollo.io (691f4e111003f200159c6363) */</script>

  <!-- Microsoft Clarity -->
  <script is:inline>/* Clarity project snippet */</script>

  <!-- HubSpot -->
  <script async defer src="//js-eu1.hs-scripts.com/144099597.js"></script>

  <!-- Page-specific head content -->
  <slot name="head" />
</head>
<body>
  <slot />  <!-- page content -->

  <!-- GitHub buttons (if needed site-wide) -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>

  <!-- Page-specific body scripts -->
  <slot name="body-scripts" />
</body>
```

---

## Scripts We Can Drop

| Script | Reason |
|---|---|
| Webflow Touch Detection (`w-mod-js`, `w-mod-touch`) | Webflow-specific class injection. Not needed. |
| Webflow JS Runtime (2 chunk files) | Powers Webflow interactions/forms. Replace with CSS/JS as needed. |
| jQuery 3.5.1 | Only needed by Webflow runtime and Select2. Replace Select2 with jQuery-free alternative. |
| HubSpot on Webflow form bridge | Use HubSpot's official form SDK or native forms instead. |

---

## Open Questions

1. **Microsoft Clarity project ID** -- the Clarity script is currently hosted on Webflow CDN as a custom upload. Need to find the project ID from the Clarity dashboard to use the official embed snippet.
2. **Finsweet Cookie Consent** -- keep it, or replace with a lighter custom solution? Finsweet works well but is designed for Webflow. It may work standalone, but testing is needed.
3. **Which scripts should be gated behind consent?** -- Currently only Segment is explicitly gated. GDPR best practice would gate GA4, RB2B, Reo, Apollo, Ortto, and Clarity behind analytics/marketing consent too.
4. **Brevo form endpoints** -- need to capture the exact form action URLs from the Brevo dashboard to wire up newsletter forms in Astro.
5. **HubSpot forms** -- the demo signup pages use HubSpot forms via a Webflow bridge. Need to decide: use HubSpot's native form embed, or build custom forms that POST to HubSpot/Ortto APIs?
6. **Auto-rotating tabs** -- the homepage originally had auto-rotating tabs (9-second interval with `data-auto-tabs`). Verify if this is still active or was removed. Build as Preact island if needed.
