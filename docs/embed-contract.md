# Third-party embed contract

This document lists every third-party embed and script family on the site: which
pages host it, how it's sized, when it loads, what happens without JavaScript,
and how it relates to cookie consent. Update this file whenever an embed's
loading behavior or consent category changes.

## Cal.com (booking calendar)

Two integration paths exist, both loading the same `https://app.cal.com/embed/embed.js`
via the same command-queue bootstrap:

- **`src/components/sections/CalEmbed.astro`** — renders a `<div id={config.elementId}>`
  target and an inline `<script>` that loads the Cal.com embed script and calls
  `Cal("init", …)` / `Cal.ns[namespace]("inline", …)` immediately on page load. Used by
  `src/pages/success-calendar.astro`, `src/pages/book-a-demo-success.astro`, and
  `src/pages/schedule-a-demo.astro` — three "thank you, now book a time" pages reached
  after a form or purchase flow.
- **Deferred path** — `src/components/islands/DemoRequestForm.tsx` (a Preact island
  mounted via `src/components/BookingExperience.astro`, used by `/book-your-demo` and
  its Kitaru co-brand variant) renders a lead-capture form first. The same Cal.com
  bootstrap IIFE only runs after the form submission succeeds, replacing the form with
  the inline calendar in place.

**Sizing:** the calendar target div is `min-h-[700px] w-full overflow-auto` (CalEmbed)
or `min-h-[600px] w-full overflow-auto` (DemoRequestForm's post-submit state); Cal.com's
embed script sizes its iframe to fill that container.

**Loading behavior:** the embed script itself is not consent-gated — it is a booking
tool the visitor navigated to a page specifically to use, not a tracking script. It
loads unconditionally when the calendar section renders (CalEmbed) or after a
successful form submission (DemoRequestForm).

**No-JS behavior:** both paths render a fallback link ("Can't see the calendar? Open
directly →") pointing at `${CAL_ORIGIN}/${calLink}` so the calendar is still reachable
without JavaScript. DemoRequestForm's underlying `<form>` also degrades to a plain
POST to its endpoint; a `<noscript>` block on the form points visitors to
`/book-your-demo` for a JS-free fallback since the calendar transition itself requires
JavaScript to run.

**Consent relationship:** not gated by the cookie consent registry (see below). Cal.com
report events (`Cal: Booking Confirmed`, `Cal: Embed Loaded`, `Cal: Embed Failed`) fire
through `window.plausible`, which is itself loaded unconditionally and cookieless (see
Plausible note under Consent registry below).

## Cloudflare Turnstile (bot protection)

Used by `src/components/islands/ContactForm.tsx` and
`src/components/islands/DemoRequestForm.tsx`, both gated behind an optional
`turnstileSiteKey` prop sourced from `TURNSTILE_SITE_KEY` in `src/lib/formConstants.ts`.
Pages currently passing a site key: `src/pages/signup-for-demo.astro`,
`src/pages/whitepaper-architecting-an-enterprise-grade-mlops-platform.astro`,
`src/pages/book-a-demo.astro`, `src/pages/startups-and-academics.astro`,
`src/pages/brick-manual.astro`, and (via `BookingExperience.astro`) `/book-your-demo`.

**Sizing:** a `<div ref={turnstileRef} class="flex justify-center" />` placeholder;
Turnstile renders its own widget into it (`size: "flexible"`, `theme: "light"`).

**Loading behavior:** each island loads `https://challenges.cloudflare.com/turnstile/v0/api.js`
once per page (deduped by a fixed `cf-turnstile-script` element id) on mount, then
renders the widget once the script's `onload` callback fires (or immediately if the
script is already present from a prior island instance on the same page).

**No-JS behavior:** the widget never renders; the surrounding `<form>` still degrades to
a plain POST, so submission is not blocked by a missing Turnstile token client-side —
server-side validation in `src/pages/api/forms/[formType].ts` is the enforcement point.

**Consent relationship:** not gated by the cookie consent registry — it's a security
control for the form the visitor is actively filling out, not a tracking/marketing
script.

## Storylane (interactive product demos)

`src/components/sections/StorylaneEmbed.astro`, used by `src/pages/live-demo.astro` and
`src/pages/interactive-demo-mcp.astro`.

**Sizing:** a padding-bottom aspect-ratio wrapper (`padding-bottom:calc(65.94% + 27px)`)
with an absolutely-positioned iframe filling it.

**Loading behavior:** the iframe (`src/embed`) and the Storylane enhancement script
(`https://js.storylane.io/js/v1/storylane.js`, deduped by element id `storylane-embed`)
both load unconditionally as soon as the component renders — there is no runtime gate on
either one.

**No-JS behavior:** the iframe itself renders and loads independently of JavaScript; only
the enhancement script (which adds Storylane's in-demo interaction layer) requires JS.

**Consent relationship:** none. An earlier consent audit gated the enhancement
script (not the iframe) behind marketing consent, but the gate was asymmetric and
broken in practice: the iframe — the surface that actually sets third-party cookies —
was never gated, and the script's consent check ran once at HTML parse time, so a
first-time visitor who accepted marketing consent still didn't get the script until a
full reload. The gate therefore delivered no privacy benefit while degrading the demo
for consenting visitors, and it was removed in favor of loading script and iframe
consistently. This leaves real privacy debt — the visitor has not explicitly opted
into a third-party embed — and the remediation is a click-to-load pattern (render a
static preview first; mount the iframe and script only after an explicit visitor
click). That remediation is not implemented yet.

## Brevo (newsletter signup)

`src/components/sections/BrevoNewsletterForm.astro`, used directly and via
`src/components/sections/NewsletterSignup.astro` on the homepage, pricing, and the
LLMOps/MLOps database index pages (`src/pages/llmops-database/index.astro`,
`src/pages/mlops-database/index.astro`), plus its own page at
`src/pages/newsletter-signup.astro`.

**Sizing:** a plain HTML `<form>` with an email input and submit button — no iframe, no
external script load.

**Loading behavior:** no third-party script is loaded. An inline `<script>` progressively
enhances the form to submit via `fetch(… { mode: "no-cors" })` against the Brevo
(Sendinblue) form action URL and show an inline success/error message instead of
navigating away.

**No-JS behavior:** the `<form method="POST" action={config.action}>` posts directly to
Brevo's hosted endpoint and the visitor is redirected to Brevo's own confirmation page —
full functionality without JavaScript.

**Consent relationship:** not gated by the cookie consent registry — it's a first-party
form submission triggered by explicit visitor action (clicking Subscribe), not a
passively-loaded tracking script.

## GitHub buttons

Registered in the consent registry (`src/lib/consentConfig.ts`) as `github-buttons`
under the `personalization` category, loading `https://buttons.github.io/buttons.js`.
Star counts on the site are currently rendered via `src/pages/api/github-stars.ts` (a
server-side fetch with edge caching), read from `src/lib/githubStars.ts`, and displayed
as plain text/numbers in `src/components/Navigation.astro` and
`src/components/sections/NewsSection.astro` — not via a `github-button` widget element.
The `github-buttons` consent entry stays registered for the `personalization` category
description ("GitHub star count") even though no page currently renders the widget
markup the script targets.

**Consent relationship:** gated behind the `personalization` consent category — see
consent registry section below.

## YouTube (nocookie embed)

Used by the Kitaru landing hero (`src/components/kitaru/islands/Hero.tsx`), which opens
a modal dialog on click and mounts an `<iframe src={KITARU_VIDEO.embedUrl}>` pointing at
`https://www.youtube-nocookie.com/embed/…` (the privacy-enhanced YouTube embed domain,
which does not set tracking cookies until the visitor plays the video). The embed URL and
title are data in `src/lib/productKitaru.ts` (`KITARU_VIDEO`).

**Sizing:** `aspect-video` container inside a `max-w-[960px]` modal.

**Loading behavior:** the iframe does not exist in the DOM until the visitor clicks the
hero's video card — this is already a click-to-load pattern. No script tag is added to
`<head>`; the iframe is the entire embed.

**No-JS behavior:** the modal and iframe never mount without JavaScript (the click
handler is what creates them), so the video is unreachable without JS. There is no
separate non-JS fallback link for this embed.

**Consent relationship:** none. `youtube-nocookie.com` does not set tracking cookies
until playback starts, and the embed only mounts on explicit visitor interaction, so it
was not added to the consent registry.

Some older blog posts (`src/content/*.md`) also embed `youtube-nocookie.com` iframes
directly as raw HTML in their markdown body. Those are per-post content, not a shared
component, and follow the same no-cookies-until-playback property of the nocookie
domain.

## Consent registry contract

`src/lib/consentConfig.ts` is the single source of truth for every script that should be
gated behind cookie consent. It defines:

- **Four consent categories** (`ConsentCategory`): `essential` (always on, not
  user-togglable), `analytics` (GA4, Segment, Hotjar), `marketing` (HubSpot, Reo, Ortto,
  Apollo), and `personalization` (GitHub buttons).
- **`TRACKING_SCRIPTS`** — an array of `ScriptDefinition` entries (`id`, `category`, and
  either a `src` URL or `inline` script body, plus optional `attrs`). This array is the
  only place a consent-gated script is declared.
- **Injection** — `src/components/islands/CookieConsent.tsx` reads the visitor's saved
  consent state from `localStorage`, and for every `TRACKING_SCRIPTS` entry whose
  category is consented, creates a `<script>` element with id `cc-{entry.id}` and appends
  it to `<head>` (deduplicated by that id so a script is never injected twice). Injection
  only runs on the production hostname (`isProdHostname()`), and only after the visitor
  has accepted or saved preferences — rejecting all, or leaving the banner unanswered,
  injects nothing beyond `essential`.

**The `cc-` script-id prefix is reserved for this registry.** Nothing may set a
`<script id="cc-…">` unless it was injected by `CookieConsent.tsx` from a
`TRACKING_SCRIPTS` entry — that prefix is how the registry deduplicates its own
injections, and reusing it on an unrelated script would let `CookieConsent.tsx` mistake
that script for one it already injected (or vice versa). Any new third-party script that
needs consent gating gets a `TRACKING_SCRIPTS` entry with its own `id`; any script that
intentionally loads unconditionally (Cal.com, Storylane, Brevo, Turnstile, the
YouTube-nocookie embed) uses its own distinct id, not the `cc-` prefix.

Plausible analytics is a deliberate exception to the registry: it's cookieless and does
not require consent under GDPR, so it's loaded directly by
`src/components/analytics/SiteHeaderScripts.astro` (included in both `BaseLayout` and
`MinimalLayout`) as an inline `<script>` that appends the Plausible script tag, gated
only by production hostname — not routed through `TRACKING_SCRIPTS`.
