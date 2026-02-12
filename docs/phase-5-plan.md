# Phase 5: Forms & Interactive Features

> Status: **NOT STARTED**
> Depends on: Phase 4 (complete)
> Estimated scope: ~8 sub-tasks (5A–5H)

---

## Goal

Replace all Webflow-native forms with working alternatives, add third-party
tracking/analytics scripts behind cookie consent, and implement remaining
interactive features (blog TOC, code block highlighting). After this phase,
every interactive feature on the current Webflow site has a working equivalent.

---

## Current State (What Phase 3 Built)

Phase 3 created **placeholder** versions of all form pages. These render the
correct UI structure but forms are **disabled** — they don't submit anywhere.

| Page | Current State | Component |
|------|--------------|-----------|
| `/book-a-demo` | `FormPlaceholder` (disabled fields, CTA to `/book-your-demo`) | `FormPlaceholder.astro` |
| `/signup-for-demo` | Same as above (identical form) | `FormPlaceholder.astro` |
| `/whitepaper-...` | `FormPlaceholder` (disabled fields, CTA to `/book-your-demo`) | `FormPlaceholder.astro` |
| `/startups-and-academics` | `FormPlaceholder` (disabled fields, CTA to `/book-your-demo`) | `FormPlaceholder.astro` |
| `/book-your-demo` | **Working** — Cal.com inline embed | `CalEmbed.astro` |
| `/schedule-a-demo` | **Working** — Cal.com inline embed (reschedule variant) | `CalEmbed.astro` |
| `/success-calendar` | **Working** — Cal.com inline embed | `CalEmbed.astro` |
| `/newsletter-signup` | **Working** — Brevo fetch POST | `BrevoNewsletterForm.astro` |
| Homepage newsletter | **Working** — Brevo fetch POST | `BrevoNewsletterForm.astro` |
| Blog listing newsletter | **Working** — Brevo fetch POST | `BrevoNewsletterForm.astro` |
| `/roi-calculator` | **Working** — Preact island | `RoiCalculator.tsx` |
| `/live-demo` | **Working** — Storylane embed | `StorylaneEmbed.astro` |
| `/interactive-demo-mcp` | **Working** — Storylane embed | `StorylaneEmbed.astro` |

### Already Working (No Phase 5 Work Needed)

- **Cal.com embeds** — 3 pages, fully functional
- **Brevo newsletter forms** — homepage, `/newsletter-signup`, blog listing, LLMOps database page
- **ROI calculator** — Preact island, client-side only
- **Storylane demos** — iframe embeds on MinimalLayout
- **LLMOps filter island** — Preact island with tag/industry filtering

### Needs Phase 5 Work

- **3 Webflow-native forms** → need live form UI that looks real (backend wiring deferred to post-launch)
- **Cookie consent** → currently missing; needed before adding tracking scripts (custom Preact island — decided)
- **Analytics/tracking scripts** → only Plausible is loaded; need GA4, Segment, HubSpot, Hotjar, etc.
- **Blog TOC** → not implemented; Webflow had IntersectionObserver-based scroll-spy (sticky sidebar — decided)
- **Blog code highlighting** → Astro's Shiki is available but not configured
- **Inconsolata font** → `@fontsource/inconsolata` (decided) for code blocks

---

## Sub-Tasks

### 5A: Form Backend (Stub for POC, Wire Up Later)

**Goal**: Create a minimal form endpoint that the live form UI can POST to.
For the initial POC, forms only need to **look and behave like real forms**
(validate, show loading/success/error states). Backend wiring to Attio CRM
is deferred to post-launch.

**Decision**: Cal.com handles demo booking (already working). Newsletter goes
to Brevo (already working). The 3 Webflow-native forms (demo request,
whitepaper gate, startups application) need a backend — but for the POC, a
stub that accepts the POST and returns success is sufficient.

**Architecture: Pages Functions (not separate Worker)**

We use **Cloudflare Pages Functions** (`functions/` directory) because:

1. **Same-origin**: No CORS needed — `fetch('/api/forms/demo-request')` just works
2. **Preview parity**: Functions deploy alongside every branch preview automatically
3. **Simpler infra**: One deploy pipeline, one project

**Implementation**:

1. Create `functions/api/forms/[formType].ts`:
   - Accepts POST with `FormData` body
   - Validates required fields per form type (client-side validation is also
     in the Preact island, but server validates too)
   - **POC**: Logs submission to console, returns `{ success: true }`
   - **Post-launch**: Forward to Attio CRM API + optional Brevo transactional email

2. Create `src/lib/formValidation.ts`:
   - Shared validation rules importable by both function and client
   - Field requirements per form type (name, email, job title, etc.)

3. Add Cloudflare Turnstile verification:
   - `TURNSTILE_SECRET_KEY` environment variable
   - Verify `cf-turnstile-response` token in the function
   - Reject requests with invalid/missing tokens

**Whitepaper delivery**: The PDF is already publicly hosted on R2 (see
`src/lib/whitepaper.ts` line 28). On form success, we reveal the download
link + a CTA to `/book-your-demo` (Cal.com). No email delivery needed.

**zcal.co consolidation**: Webflow linked to `zcal.co/i/wf5_QqYV` on
whitepaper success. We consolidate all scheduling to Cal.com (`/book-your-demo`).

**Success criteria**:
- [ ] Pages Function accepts POST and returns JSON response
- [ ] Server-side validation catches bad input
- [ ] Turnstile verification working (if configured; optional for POC)
- [ ] Form submissions logged (console or structured log)
- [ ] Ready to wire up to Attio CRM post-launch (clear integration point)

---

### 5B: Live Form Components (Replace FormPlaceholder)

**Goal**: Replace the disabled `FormPlaceholder` components with real, submitting
forms that POST to the Cloudflare Worker from 5A.

**Implementation**:

1. Create `src/components/islands/ContactForm.tsx` — Preact island:
   - Accepts field configuration as props (reuse `PlaceholderField` type)
   - Client-side validation (required fields, email format)
   - Shows loading / success / error states
   - POSTs to the Cloudflare Worker endpoint
   - Includes Turnstile widget

2. Update form pages to use `ContactForm` instead of `FormPlaceholder`:
   - `src/pages/book-a-demo.astro` — Demo request form
   - `src/pages/signup-for-demo.astro` — Same form, different page
   - `src/pages/whitepaper-...astro` — Whitepaper gate form
   - `src/pages/startups-and-academics.astro` — Application form

3. Form-specific behavior:
   - **Demo request**: On success → show message + link to `/success-calendar`
   - **Whitepaper**: On success → show download link or trigger PDF download
   - **Startups**: On success → show "we'll review your application" message

4. Add Cloudflare Turnstile:
   - Include `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer>`
   - Render invisible Turnstile widget in form
   - Pass token to Worker for verification

**Types to add/update** in `src/lib/formTypes.ts`:
```ts
export interface ContactFormConfig {
  formType: "demo-request" | "whitepaper" | "startup-application";
  endpoint: string; // Worker URL
  fields: PlaceholderField[];
  submitLabel: string;
  loadingLabel: string;
  successMessage: string;
  successCta?: CtaLink;
  turnstileSiteKey: string;
}
```

**No-JS fallback strategy**: Since Turnstile requires JS to generate a token,
true form submission without JS is not possible. Instead:
- The `<form>` has a real `action` and `method="POST"` so it structurally works
- A `<noscript>` block shows a fallback CTA: "Enable JavaScript to submit this
  form, or <a href="/book-your-demo">book a demo directly</a>"
- With JS: Preact island intercepts submit, shows loading/success/error inline
- Without JS: user sees the fallback CTA immediately

**Success criteria**:
- [ ] All 3 forms submit successfully (with JS)
- [ ] Client-side validation shows inline errors
- [ ] Loading state displayed during submission
- [ ] Success state shows appropriate message per form type
- [ ] Error state with retry option on failure
- [ ] Turnstile widget renders and validates
- [ ] `<noscript>` fallback displays a usable CTA link

---

### 5C: Cookie Consent Banner

**Goal**: Implement GDPR-compliant cookie consent with the same 4 categories
as the current Webflow site (Essential, Analytics, Marketing, Personalization).

**Current state**: Webflow uses Finsweet Cookie Consent (`fs-cc`) in opt-in mode.

**Decision: Custom Preact island** (chosen over Finsweet for full control,
no dependency on Webflow ecosystem library).

**Implementation**:

1. Create `src/components/islands/CookieConsent.tsx` (Preact island):
   - Renders banner with "Accept all" / "Reject all" / "Manage preferences"
   - Preferences modal with 4 category toggles:
     - Essential: always on (disabled toggle)
     - Analytics: opt-in (GA4, Segment, Clarity, Hotjar)
     - Marketing: opt-in (HubSpot, RB2B, Reo, Apollo, Ortto)
     - Personalization: opt-in (HubSpot chat)
   - Stores consent in `localStorage` (key: `cookie_consent`)
   - On consent change, dynamically inject allowed `<script>` elements
   - Exposes `window.__cookieConsent` object for other scripts to check

2. Create `src/lib/consentConfig.ts`:
   - Maps consent categories → script definitions (URL, attributes, inline code)
   - Used by both the CookieConsent island and TrackingScripts component
   - Single source of truth for all tracking script metadata

3. Integration with BaseLayout:
   - `<CookieConsent client:load />` in BaseLayout body (bottom)
   - On first visit: banner appears, no tracking scripts loaded
   - On consent: island dynamically injects `<script>` tags into `<head>`
   - On revisit: reads localStorage, injects consented scripts immediately

4. Style: Tailwind-styled banner + modal, matching current site appearance
   - Fixed to bottom of viewport
   - Semi-transparent backdrop for modal
   - Responsive (full-width on mobile, centered card on desktop)

**Success criteria**:
- [ ] Consent banner appears on first visit
- [ ] 4 categories displayed with toggles
- [ ] "Accept all" grants all categories
- [ ] "Reject all" grants only essential
- [ ] Preferences remembered across sessions
- [ ] Tracking scripts only load when corresponding category is consented
- [ ] Banner does not reappear after consent is given (until cleared)

---

### 5D: Analytics & Tracking Scripts

**Goal**: Add all third-party analytics and tracking scripts from the current
site, gated behind cookie consent categories from 5C.

**Scripts to add** (from `docs/custom-code-audit.md`):

| Script | Category | Status |
|--------|----------|--------|
| **Plausible** | Essential (privacy-first) | ✅ Already in BaseLayout (prod only) |
| **Google Analytics 4** | Analytics | Needs adding. ID: `G-T3T6F795FY` |
| **Segment** | Analytics | Needs adding. Key: `Q9Gsmet5Uo67D8HIEk4pj5vUOalWu4iT` |
| **HubSpot** | Marketing | Needs adding. Portal: `144099597` (EU) |
| **RB2B** | Marketing | Needs adding. Key: `Z6PVLHP07Q6R` |
| **Reo.dev** | Marketing | Needs adding. Client: `d696528d7eed7f5` |
| **Ortto (AP3C)** | Marketing | Needs adding. Client: `ZLL3D-tdcsJ2LnXAemVubWw` |
| **Apollo.io** | Marketing | Needs adding. App: `691f4e111003f200159c6363` |
| **Hotjar** | Analytics | Needs adding. Site ID: `2973500` (hjsv: 6) |
| **Microsoft Clarity** | Analytics | Needs adding. Project ID: TBD (check dashboard) |
| **GitHub Buttons** | Essential | Homepage only (decided) |

**Important: `import.meta.env.PROD` is true on preview deploys too.**
Astro builds preview branches as production builds, so `PROD` cannot
distinguish `www.zenml.io` from `feature-xyz.zenml-io-v2.pages.dev`.

**Runtime hostname gate**: Add a tiny inline bootstrap script that checks
`window.location.hostname` before injecting any trackers:

```js
// Only load trackers on the real production domain
if (window.location.hostname !== 'www.zenml.io') return;
```

This prevents GA4, Segment, HubSpot, etc. from polluting analytics data
with preview-deploy traffic.

**Implementation**:

1. Create `src/components/TrackingScripts.astro`:
   - Renders all third-party script tags
   - Each script tagged with its consent category
   - Wrapped in a hostname check (inline `<script>` bootstrap)

2. Add to BaseLayout after cookie consent:
   ```astro
   <TrackingScripts />
   ```

3. Script loading approach depends on 5C decision:
   - **If Finsweet**: Use `type="fs-cc"` / `fs-cc-categories` attributes;
     add hostname check as an additional guard
   - **If custom**: hostname check + consent check before dynamic injection

4. Also add tracking to `MinimalLayout.astro` (Storylane embed pages still
   need analytics)

**Open questions**:
- [ ] Microsoft Clarity project ID — need to check Clarity dashboard
- [ ] Should Plausible move behind analytics consent? (Currently loads unconditionally — it's privacy-first so arguably OK as Essential)

**Success criteria**:
- [ ] All tracking scripts present in production HTML
- [ ] Scripts correctly gated behind their consent categories
- [ ] No tracking scripts load before consent is granted
- [ ] Plausible continues to work (essential / ungated)
- [ ] Scripts do NOT execute on preview domains (hostname gate)
- [ ] Both BaseLayout and MinimalLayout include tracking

---

### 5E: Blog Table of Contents

**Goal**: Add a dynamic table of contents to blog posts, with scroll-spy
highlighting of the current section.

**Current Webflow behavior**: JavaScript scans for `h2` headings, builds a TOC
sidebar, and uses `IntersectionObserver` to highlight the current heading as
the user scrolls.

**Decision: Build-time TOC + client-side scroll-spy, sticky sidebar on desktop.**

**Implementation**:

1. Add rehype plugin or use Astro's heading extraction:
   - Astro's `render()` returns `headings` array from markdown
   - Each heading has `depth`, `slug`, `text`

2. Create `src/components/BlogTOC.astro`:
   - Accepts `headings: { depth: number; slug: string; text: string }[]`
   - Renders sticky sidebar with links to `#slug` anchors
   - Only renders if there are ≥3 headings (skip for short posts)

3. Add scroll-spy script:
   - `IntersectionObserver` watches all heading elements
   - On intersection change, highlight corresponding TOC link
   - Small `<script>` tag in BlogTOC component

4. Update `src/pages/blog/[slug].astro`:
   - Extract headings from `render()` result
   - Pass to `BlogTOC` in sidebar layout

5. Update `BlogLayout.astro`:
   - Add optional sidebar slot or grid layout for TOC + content

**Success criteria**:
- [ ] TOC renders in blog post sidebar for posts with ≥3 headings
- [ ] Clicking TOC link scrolls to correct heading
- [ ] Current heading highlighted in TOC during scroll
- [ ] TOC is sticky (follows user while scrolling)
- [ ] Hidden on mobile (or collapses to top)
- [ ] Smooth scroll behavior
- [ ] Doesn't break for posts with <3 headings

---

### 5F: Code Block Syntax Highlighting

**Goal**: Ensure code blocks in blog posts and LLMOps entries render with
proper syntax highlighting and correct scroll behavior.

**Current state**: Astro uses **Shiki** by default for markdown code blocks.
This means fenced code blocks (``` ```language ```) should be highlighted at
build time with zero client-side JS. However, there are known issues:

1. Need to verify Shiki is active and producing correct output
2. May need to configure the theme to match the current Webflow theme
   (Moonlight II variant — see `docs/custom-code-audit.md` item #14)
3. Webflow used highlight.js (runtime) — Shiki (build-time) is strictly better

**Known CSS conflict**: `src/styles/global.css` has `.prose pre code` rules
that will interfere with Shiki output:
- `white-space: pre-wrap; word-break: break-word;` — this **wraps** long lines
  instead of allowing horizontal scroll (contradicts our goal)
- `.prose pre code.hljs` — targets old highlight.js classes that Shiki doesn't use
- Shiki outputs `<pre class="astro-code">` — our existing `.prose pre` styles
  will still apply (background, border-radius) but may visually flatten
  Shiki's own theme colors

**Content shape audit needed**: Blog posts and LLMOps entries may contain:
- **Fenced markdown code blocks** (` ``` `) — Shiki processes these
- **Raw HTML `<pre><code>` blocks** — inherited from Webflow export; Shiki
  does NOT process these (they pass through as raw HTML)

We need to check how many code blocks are fenced vs raw HTML to know if
Shiki alone is sufficient or if we need a rehype plugin to also handle
raw `<pre><code>` blocks.

**Implementation**:

1. **Audit code block formats**:
   - Count fenced code blocks vs raw `<pre><code>` in content files
   - `grep -r '^\`\`\`' src/content/blog/ | wc -l` (fenced)
   - `grep -r '<pre><code' src/content/blog/ | wc -l` (raw HTML)

2. Configure Shiki theme in `astro.config.ts`:
   ```ts
   markdown: {
     shikiConfig: {
       theme: 'github-dark', // or closest to Moonlight II
     },
   },
   ```

3. **Fix CSS conflicts** in `src/styles/global.css`:
   - Change `.prose pre code` to use `white-space: pre; word-break: normal;`
     to allow horizontal scrolling
   - Add `overflow-x: auto;` to `.prose pre`
   - Remove or scope `.prose pre code.hljs` (only needed if raw HTML blocks
     with `hljs` classes exist)
   - Ensure Shiki's inline styles aren't overridden by `.prose pre` background

4. If many raw HTML code blocks exist, consider:
   - A rehype plugin to apply Shiki to `<pre><code>` blocks
   - Or a content migration script to convert `<pre><code>` to fenced blocks

5. Optional: Add copy-to-clipboard button (nice-to-have, not parity-critical)

**Success criteria**:
- [ ] Code blocks in blog posts render with syntax highlighting
- [ ] Theme reasonably matches current site appearance
- [ ] No runtime JS needed for highlighting (Shiki is build-time)
- [ ] Long code blocks have horizontal scroll, not line wrapping
- [ ] Both fenced markdown and raw HTML code blocks render correctly
- [ ] CSS conflicts resolved (Shiki theme not overridden by global styles)

---

### 5G: Security Headers

**Goal**: Enhance existing security headers in `public/_headers`.

**Current state**: `public/_headers` already exists with:
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
```

**Implementation**:

1. **Modify** (not create) `public/_headers` — add `Permissions-Policy`:
   ```
   /*
     X-Content-Type-Options: nosniff
     X-Frame-Options: DENY
     Referrer-Policy: strict-origin-when-cross-origin
     Permissions-Policy: camera=(), microphone=(), geolocation=()
   ```

   **Keep `X-Frame-Options: DENY`** — nothing requires other sites to iframe
   us. Embedding *other* sites (Cal.com, Storylane) in our pages is controlled
   by CSP `frame-src`, not XFO.

2. **Content Security Policy** — needs careful phased rollout:

   **Phase 1 (this task)**: `Content-Security-Policy-Report-Only` with
   permissive `'unsafe-inline'` to inventory violations without breaking
   anything. This is necessary because we have many inline scripts:
   - `CalEmbed.astro` — `<script is:inline>`
   - `BrevoNewsletterForm.astro` — `<script is:inline>`
   - `RoiCalculator.tsx` — Preact island hydration script
   - Blog TOC scroll-spy (planned) — inline `<script>`
   - Cookie consent bootstrap — inline `<script>`

   Allowlist domains: `plausible.io`, `*.googletagmanager.com`,
   `cdn.segment.com`, `js-eu1.hs-scripts.com`, `app.cal.com`,
   `challenges.cloudflare.com` (Turnstile), `*.storylane.io`,
   `pub-41d587b95acb4b579d9280542922084b.r2.dev` (R2 images),
   `cdn.jsdelivr.net` (Finsweet), and all other tracking domains.

   **Phase 2 (post-launch)**: Refactor inline scripts into external `.js`
   files so we can tighten `script-src` to use nonces or hashes instead of
   `'unsafe-inline'`.

3. **No `/api/*` CORS headers needed**: Since we're using Pages Functions
   (same-origin), the `/api/forms/*` endpoints don't need CORS headers in
   `_headers`. The Functions handle their own response headers.

**Success criteria**:
- [ ] `_headers` file updated with Permissions-Policy
- [ ] CSP in report-only mode (no breakage)
- [ ] No existing functionality broken by header changes
- [ ] CSP violation reports reviewed (Phase 2 tightening deferred to post-launch)

---

### 5H: End-to-End Form Testing & Verification

**Goal**: Verify all forms, interactive features, and scripts work correctly
on a deployed preview.

**Test checklist**:

**Forms**:
- [ ] Demo request form (`/book-a-demo`): submit → success state shown (CRM wiring deferred)
- [ ] Whitepaper form: submit → PDF download link revealed + Cal.com CTA
- [ ] Startups application: submit → success message shown (CRM wiring deferred)
- [ ] Newsletter signup (homepage): submit → confirmation shown, email in Brevo
- [ ] Newsletter signup (`/newsletter-signup`): same
- [ ] Newsletter signup (LLMOps page): same (different Brevo list?)
- [ ] Cal.com embed (`/book-your-demo`): calendar loads, time slots selectable
- [ ] Cal.com embed (`/schedule-a-demo`): reschedule variant works
- [ ] Cal.com embed (`/success-calendar`): post-form booking works
- [ ] Turnstile: invisible challenge completes, form submits

**Interactive features**:
- [ ] ROI calculator: sliders work, calculations update
- [ ] LLMOps filter: tag filtering works, search works
- [ ] Blog TOC: renders, scroll-spy highlights correctly
- [ ] Code blocks: syntax highlighting renders
- [ ] Storylane demos: load in iframe

**Cookie consent & tracking**:
- [ ] Consent banner appears on first visit
- [ ] Rejecting all → no tracking scripts load (verify in DevTools Network tab)
- [ ] Accepting analytics → GA4 + Segment + Hotjar + Clarity load
- [ ] Accepting marketing → HubSpot + RB2B + Reo + Apollo + Ortto load
- [ ] Consent remembered on revisit

**Success criteria**:
- [ ] All forms submit to correct backends
- [ ] All interactive features work on deployed preview
- [ ] Cookie consent correctly gates all tracking scripts
- [ ] No console errors on any form/interactive page

---

## Dependency Graph

```
5A (CF Worker) ──┐
                 ├──▶ 5B (Live Forms) ──┐
5C (Cookie Consent) ──▶ 5D (Tracking)   ├──▶ 5H (E2E Testing)
5E (Blog TOC)  ─────────────────────────┤
5F (Code Blocks) ───────────────────────┤
5G (Security Headers) ──────────────────┘
```

- **5A → 5B**: Forms need the stub backend before the UI can POST somewhere
- **5C → 5D**: Tracking scripts need consent gating before they can be added
- **5E, 5F, 5G**: Independent of each other and of 5A–5D
- **5H**: Final verification after everything else is done

---

## Intentionally Deferred / Out of Scope

These items from the custom code audit are **not** included in Phase 5:

- **Homepage interactive code block widget** (`docs/custom-code-audit.md` body
  script #20 — mouse-hover linking between feature blocks and code snippets).
  This is a polish/animation feature, not a functional form or tracking script.
  It can be added post-launch as a Preact island if desired. The homepage
  currently renders without it and is fully functional.

- **Webflow interaction animations** (parallax, scroll-triggered reveals, etc.)
  — these are cosmetic and deferred to post-launch pixel-perfect polish.

- **Pagefind search** — deferred to Phase 6 or post-launch. LLMOps filter
  island already provides tag/industry filtering.

---

## Decisions Made (from Q&A)

| Question | Decision |
|----------|----------|
| Form backend wiring | **Deferred** — POC forms look real but stub backend; wire to Attio post-launch |
| Hotjar vs Clarity | **Both** — Hotjar confirmed active (site ID: `2973500`). Clarity status TBD |
| Cookie consent approach | **Custom Preact island** (no Finsweet dependency) |
| zcal.co vs Cal.com | **Consolidate to Cal.com** — all scheduling via `/book-your-demo` |
| Brevo form IDs | **Different lists** — keep both IDs (homepage vs LLMOps) |
| GitHub star button | **Homepage only** |
| Blog TOC design | **Sticky sidebar** on desktop, hidden/collapsed on mobile |
| Inconsolata font | **`@fontsource/inconsolata`** via npm (self-hosted, no external requests) |

## Remaining Open Questions

1. **Attio CRM integration** (post-launch): What API endpoint, list, or pipeline
   should form data be sent to? Deferred — forms will log submissions for now.

2. **Microsoft Clarity project ID**: Need to check Clarity dashboard. The Webflow
   version was a custom upload to Webflow CDN.

3. **HubSpot forms vs native forms**: Demo signup pages in Webflow use HubSpot
   via a bridge (`hubspotonwebflow.com`). For the POC, our own form UI submits
   to the stub. Post-launch decision: HubSpot native embed SDK or Pages Function
   that POSTs to HubSpot API?

4. **Plausible consent category**: Currently loads unconditionally (Essential).
   Should it move behind Analytics consent for strict GDPR compliance? (It's
   privacy-first / cookieless, so arguably OK as Essential.)

---

## Files to Create / Modify

### New Files

| File | Purpose |
|------|---------|
| `functions/api/forms/[formType].ts` | Pages Function: form handler |
| `src/lib/formValidation.ts` | Shared form validation (client + server) |
| `src/components/islands/ContactForm.tsx` | Preact form island |
| `src/components/islands/CookieConsent.tsx` | Cookie consent Preact island |
| `src/lib/consentConfig.ts` | Consent category → script mapping |
| `src/components/TrackingScripts.astro` | Third-party script tags |
| `src/components/BlogTOC.astro` | Blog table of contents |

### Modified Files

| File | Change |
|------|--------|
| `src/layouts/BaseLayout.astro` | Add cookie consent + tracking scripts |
| `src/layouts/MinimalLayout.astro` | Add tracking scripts (for Storylane pages) |
| `src/layouts/BlogLayout.astro` | Add TOC sidebar slot/grid |
| `src/pages/blog/[slug].astro` | Extract headings, pass to TOC |
| `src/pages/book-a-demo.astro` | Replace FormPlaceholder → ContactForm |
| `src/pages/signup-for-demo.astro` | Replace FormPlaceholder → ContactForm |
| `src/pages/whitepaper-...astro` | Replace FormPlaceholder → ContactForm |
| `src/pages/startups-and-academics.astro` | Replace FormPlaceholder → ContactForm |
| `src/lib/formTypes.ts` | Add ContactFormConfig type |
| `src/styles/global.css` | Fix code block CSS (pre-wrap → pre, overflow-x) |
| `public/_headers` | Add Permissions-Policy + CSP report-only |
| `astro.config.ts` | Add Shiki theme config |

---

## Estimated Effort

| Sub-task | Complexity | Notes |
|----------|-----------|-------|
| 5A: Form Stub | Low | Stub backend; Attio wiring deferred to post-launch |
| 5B: Live Forms | Medium | Preact island, 3 form variants, Turnstile widget |
| 5C: Cookie Consent | Medium | UI + state management + script gating |
| 5D: Tracking Scripts | Low | Copy script tags, tag with consent categories |
| 5E: Blog TOC | Low-Medium | Build-time headings + IntersectionObserver |
| 5F: Code Blocks | Low | Verify Shiki works, maybe configure theme |
| 5G: Security Headers | Low | Static `_headers` file |
| 5H: E2E Testing | Medium | Manual testing on deployed preview |

**Recommended order**:

```
Parallel track 1: 5F → 5E → 5G  (independent, low-effort quick wins)
Parallel track 2: 5A (stub) → 5B (live forms)  (form UI chain)
Parallel track 3: 5C → 5D  (consent + tracking)
Final:            5H  (E2E testing after everything else)
```

Since 5A is now a stub (no Attio wiring), the form chain is lower risk.
Start with the quick wins (5F/5E/5G) while building the consent island (5C)
and form UI (5A→5B) in parallel. The consent→tracking chain (5C→5D) and
form chain (5A→5B) are independent of each other.

**Install `@fontsource/inconsolata`** early (before 5F) since it affects
code block rendering.
