# Page recipes

This is a reference for every page type on the site: what it's built from, and
whether someone could build another one today using the shared template
library, or would have to hand-roll it from scratch.

It supersedes the route table in `docs/two-workspaces-audit/SURFACE-AUDIT.md`
(that file is a May 2026 analytics-surface audit and is out of date on
several routes — treat this document as current for route/template
inventory).

**Verified against commit `1816840`.** This is a snapshot, not a live query —
routes, components, and collections change. Before relying on an entry,
re-check it against the tree rather than trusting this file from memory,
especially the entry counts (they come from counting non-draft files in
`src/content/*`, not from a build).

**What counts as a "shared template" here:** the Wave 1–3 template system —
`src/components/templates/`, `src/components/system/`, and the filterable-index
island stack under `src/components/islands/filter-index/` — everything
catalogued in `src/lib/templates/registry.ts` and enforced by
`pnpm check:registry`. A lot of pages also reuse older, page-family-specific
components (`FinalCTA`, `ProjectsCTA`, `CaseStudySidebar`, `BookingExperience`,
and similar) that live in `src/components/sections/` or a page's own folder.
Those are real reuse and are named below, but they don't count toward
**Buildable today** unless they wrap something from the registry — they're
one-off components shared by convention, not templates a new page family
can be assembled from.

**Buildable today** is always exactly one of:
- **yes** — the page is assembled entirely from registry templates (plus
  ordinary data-fetching glue). A new page of this type is composition, not
  new markup.
- **partial** — at least one meaningful section comes from the registry, but
  the page still hand-rolls real markup for other sections. The gap names
  what's still hand-rolled.
- **no** — nothing on the page comes from the registry. The gap says what a
  future shared template would need to cover.

---

## Comparison

### ZenML comparison pages
**Routes** — `/compare/zenml-vs-<slug>` (25 pages) and `/vs/<slug>` (3 category
pages), all published entries in the `compare` and `vs-pages` collections.
**Layout** — no page-level layout wrapper; `ComparisonPage` renders its own
document (`wrapInMain` toggles a `<main>` for the `/vs` family).
**Surface** — `ml` for all 28 routes; `ComparisonPage` sets it once and neither
family overrides it (verified against the rendered `data-surface` attribute).
**Sequence** — one ordered `blocks[]` array per entry, rendered through a
discriminated union keyed by collection: hero (tool hero for `/compare`,
category hero for `/vs`), up to nine block kinds (feature table, code
compare, strategy CTA, testimonial, final CTA), assembled by
`src/components/compare/_layouts/ComparisonPage.astro`.
**Required data** — `compare` collection; `vs-pages` collection; `advantages`
collection (strategy-CTA block); `quotes` collection (the `/compare` quote
block resolves a slug reference; `/vs` inlines its testimonial copy instead);
`lib/blog` for the related-posts rail; block components under
`src/components/sections/compare/` and `src/components/sections/VsHero.astro`
/ `VsTestimonial.astro` / `VsCta02.astro`.
**Buildable today** — yes. Both families are one template driven entirely by
frontmatter blocks; a new entry is a new content file, not new markup. These
components live outside `src/components/templates/` (they were extracted from
live pages in parity mode, not designed from scratch), so `pnpm check:registry`
doesn't require entries for them, but they're catalogued in
`src/lib/templates/registry.ts` under the `comparison.*` ids since leaving out
the site's largest page family would make this ledger misleading.

### Comparison hub
**Routes** — `/compare` (one page).
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — `SectionIntro` header, then two tinted sections (Kitaru agent
comparisons in orange, ZenML MLOps comparisons in sage) each with its own
`SectionIntro` and a hand-rolled card grid linking into the family above.
**Required data** — `compare` collection; `compare-kitaru` collection.
**Buildable today** — partial. `SectionIntro` covers both headers; the two
card grids (icon/logo tile, title, subtitle) are page-specific markup with no
registry equivalent.

### Kitaru comparison pages
**Routes** — `/compare/kitaru-vs-<slug>` (10 `.mdx` entries in
`compare-kitaru`).
**Layout** — `KitaruCompare` (`src/components/compare/_layouts/KitaruCompare.astro`),
MDX-driven, orange chrome via `data-app="kitaru"`.
**Surface** — `agent`.
**Sequence** — hero with a competitor dropdown, then MDX body content via
inline component imports (`ComparisonHero`, `ComparisonTable`, `CodePane`,
`CodeCompare`, `FeatureWithGraphic`, `WhenToUseEach`, `ComparisonCta`,
`PullQuote` — `src/components/compare/kitaru/`).
**Required data** — `compare-kitaru` collection (`.mdx`, not `.md` — the ported
pages rely on inline component imports).
**Buildable today** — no. Frozen pending the evals-positioning pivot —
catalogued here so the family isn't invisible to future audits, not scheduled
for consolidation into the registry.

---

## Blog

### Blog index
**Routes** — `/blog` (one page).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — `PageHeader`, then the `BlogIndex` filterable-index island
(facet rail for category + tags, search box, client-side pagination) with the
first page of post cards server-rendered as real HTML for crawlers.
**Required data** — `blog` collection (`getMainFeedPosts` — excludes drafts and
the "discovery" tag corpus); `categories` collection (`getCategoryCounts`);
`tags` collection (`getTagCounts`); `lib/blog` (`buildBlogSearchIndex`,
`PAGE_SIZE`).
**Buildable today** — partial. `PageHeader` for the hero and the
`filterable-index.shell` template (`DataFilterIndex`) for the whole
filter/search/pagination body are both registered — this page is mostly
composition. The only unregistered piece is the page's own copy and layout
wrapper.

### Blog post detail
**Routes** — `/blog/<slug>` — one per published post (318 non-draft entries in
the `blog` collection).
**Layout** — `BlogLayout` (delegates to `BaseLayout`, forwards an optional
`surface` that defaults to `"ml"`; this page doesn't pass one explicitly).
**Surface** — `ml` (via `BlogLayout` default).
**Sequence** — `BlogLayout` renders the post body, a table of contents
(`BlogTOC`), a category bar, prev/next navigation, a related-posts rail, a
sidebar CTA, and a final CTA band (`FeaturesHubCTA`), then this page
appends a tags section using `Badge`.
**Required data** — `blog` collection; `authors`, `categories`, `tags`
collections (via `getEntry`); `lib/blog` (`getAllPublishedPosts`,
`getPrevNext`, `getRelatedPosts`, `resolveAuthor`).
**Buildable today** — partial. `BlogLayout` uses the registry's `RelatedRail`
for the related-posts section; the table of contents, category bar, and
sidebar CTA are blog-specific components with no registry equivalent.

---

## Databases

### Database index pages
**Routes** — `/llmops-database` and `/mlops-database` (one page each).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — a hero (`PageHeader` on the LLMOps page, `SectionIntro` directly
on the MLOps page — same visual shape, different component), then the
matching filterable-index island (`LlmopsIndex` / `MlopsIndex`) fetching a
JSON index client-side, a `<noscript>` category-browsing fallback, and a
Brevo newsletter section.
**Required data** — `llmops-tags` / `mlops-tags` collections; `industry-tags`
collection; entry counts from `lib/llmops` / the `mlops-database` collection
directly; `lib/formConstants` (`BREVO_LLMOPS_CONFIG`).
**Buildable today** — partial. Hero and the entire filter/search body are
registry templates (`PageHeader`/`SectionIntro` + `filterable-index.shell`);
the `<noscript>` fallback and the newsletter CTA band are hand-rolled and
duplicated between the two pages rather than shared.

### Database detail pages
**Routes** — `/llmops-database/<slug>` (2,080 non-draft entries) and
`/mlops-database/<slug>` (186 non-draft entries, plus redirect stubs from
`STALE_RAY_SUMMIT_REDIRECTS` for retired slugs).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — Pagefind metadata spans, `Breadcrumb`, a hand-rolled header
(title + company/platform/year line, MLOps also adds a content-type label),
a tinted summary box, `MetadataBlock` (Industry + Technologies/MLOps Topics
chips), the rendered body, and a `RelatedRail` "More Like This" section.
**Required data** — `llmops-database` / `mlops-database` collections;
`llmops-tags` / `mlops-tags` collections; `industry-tags` collection;
`lib/relatedIndex`'s `buildRelatedIndex`/`getRelatedFromIndex` scorer, wrapped
per-domain by `lib/llmops.ts` / `lib/mlops.ts`.
**Buildable today** — partial. `Breadcrumb`, `MetadataBlock`, and
`RelatedRail` cover most of the page and the two collections render from a
byte-mirrored structure (same components, different label text and chip
color). The header and summary box are hand-rolled and not shared with any
registry component.

---

## Projects

### Projects index
**Routes** — `/projects` (one page).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — `PageHeader` (centered hero with an eyebrow badge), a
hand-rolled 3-column card grid with a hover-lift animation, then
`ProjectsCTA`.
**Required data** — `projects` collection (16 non-draft entries, sorted by
title).
**Buildable today** — partial. `PageHeader` covers the hero; the card grid
and `ProjectsCTA` have no registry equivalent.

### Project detail
**Routes** — `/projects/<slug>` — one per published project (16 pages).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — a hand-rolled header (back link, project image, title), then a
two-column body: a sticky left sidebar built on `DescriptionList`
(`frame="divided"`), and a right column with a details section (rendered
through `lib/projectBody`'s minimal markdown-to-HTML converter) and an
optional gallery image, then `ProjectsCTA`.
**Required data** — `projects` collection; `lib/projectBody`
(`markdownToHtml`).
**Buildable today** — partial. The sidebar is a registry template
(`DescriptionList`, divided frame — the frame used for fact-grid sidebars,
distinct from the `spaced` frame case studies use). The header, details
column, and gallery are hand-rolled. Note: `lib/projectBody`'s converter is
deliberately minimal (headings and paragraphs only, no list handling) because
it reproduces what these pages have always rendered — one project's body is a
paragraph of literal `-` lines as a result. Two project pages are pinned as
rendered-content goldens in `pnpm smoke:dist`, so this isn't a bug to fix in
passing.

---

## Case studies

### Case studies hub
**Routes** — `/case-studies` (one page).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — `PageHeader` (tinted hero, centered), a card grid split into
two rows by a banner link to the LLMOps database, then `FeaturesHubCTA`.
**Required data** — `case-studies` collection (5 non-draft entries; `lib/case-studies`'s
`orderCaseStudies`/`splitAtBanner`); `SECTION_INTRO_PRESETS`.
**Buildable today** — partial. `PageHeader` covers the hero; the card grid,
banner link, and `FeaturesHubCTA` are page-specific components (`FeaturesHubCTA`
is reused elsewhere on the site — `/get-started`, `/pricing` — but isn't a
registry template).

### Case study detail
**Routes** — `/case-study/<slug>` — one per published case study (5 pages).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — `Breadcrumb`, a hand-rolled hero (customer logos + title), a
two-column main section (sticky `CaseStudySidebar` + prose body), a sibling
case studies rail using `RelatedRail`, then `FinalCTA`.
**Required data** — `case-studies` collection; `lib/case-studies`
(`orderCaseStudies`, `siblingCaseStudies`).
**Buildable today** — partial. `CaseStudySidebar` is itself a thin wrapper
around `DescriptionList` (the `spaced` frame), and the sibling rail is
`RelatedRail` — both registry templates. The hero and the two-column shell
around them are hand-rolled. The sibling rail is a deliberate recent addition
to this page (case studies didn't always cross-link to each other).

---

## Integrations

### Integrations index
**Routes** — `/integrations` (one page).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — `PageHeader` plus a hand-rolled architecture diagram image,
then the `IntegrationsIndex` filterable-index island (control flavor — the
island owns the facet rail and search box, and toggles visibility of
server-rendered `IntegrationCard`s passed as children) with an `EmptyState`
fallback, then a dark CTA band.
**Required data** — `integrations` collection (68 total, 66 non-draft);
`integration-types` collection; `lib/constants` (`R2_WEBFLOW_BASE`).
**Buildable today** — partial. Hero and the filter body both come from the
registry (`PageHeader` + `filterable-index.shell`, the same control-flavor
pattern also used nowhere else on the site today). The diagram image and the
bottom CTA band are hand-rolled.

### Integration detail
**Routes** — `/integrations/<slug>` — one per published integration (66
pages).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — a hand-rolled header row (logo, back link, title, "Add to
ZenML" button), a two-column body with `IntegrationDetailSidebar` and either
a structured content path (overview, features checklists, screenshot, code
example, resources — driven by which optional fields the entry has) or a
markdown fallback, then a bottom CTA with `IntegrationsLogoRail`.
**Required data** — `integrations` collection; `integration-types` collection;
`blog` collection (resolving `relatedBlogPosts`); `compare` collection
(resolving a `compareSlug` to a display name).
**Buildable today** — no. `IntegrationDetailSidebar` and `IntegrationsLogoRail`
are integration-specific components under `src/components/integrations/`, not
registry templates. Nothing on this page — sidebar, structured/fallback
split, or the bottom CTA — comes from `src/components/templates/` or
`src/components/system/`. The gap: no shared template for a "structured
content with a markdown fallback" detail page.

---

## Conversion

### Cal-hero confirmation pages
**Routes** — `/success-calendar`, `/book-a-demo-success`, `/schedule-a-demo`
(3 pages, noindex except `/schedule-a-demo`).
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — `ConversionShell` (`frame="calendar"`) wrapping `CalEmbed`.
**Required data** — one dedicated `lib/*.ts` module per route
(`successCalendar.ts`, `bookADemoSuccess.ts`, `scheduleADemo.ts`) — headline,
deck, SEO, and Cal.com config.
**Buildable today** — yes. The three pages are byte-identical modulo their
per-route data module; a fourth would be a new data module plus this same
three-import page.

### Lead-capture form pages
**Routes** — `/book-a-demo`, `/signup-for-demo` (2 pages).
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — `ConversionShell` (`frame="form"`) wrapping the `ContactForm`
island.
**Required data** — `lib/bookADemo.ts` / `lib/signupForDemo.ts`; `lib/formConstants`
(`TURNSTILE_SITE_KEY`).
**Buildable today** — yes. Identical shape to the calendar trio above,
selected by `ConversionShell`'s `frame` prop.

### Newsletter signup
**Routes** — `/newsletter-signup` (one page).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — a hand-rolled two-column section: headline + body +
`BrevoNewsletterForm` on the left, an illustration image on the right.
**Required data** — `lib/newsletterSignup.ts`; `lib/formConstants`
(`BREVO_MAIN_CONFIG`).
**Buildable today** — no. Deliberately not folded into `ConversionShell` —
its two-column, image-paired shape doesn't match either of `ConversionShell`'s
two frames, and there's no separate registry template for it.

### Startups & academics application
**Routes** — `/startups-and-academics` (one page).
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — `SectionIntro` (centered) directly above the `ContactForm`
island in a single narrow column — no `ConversionShell`.
**Required data** — `lib/startupsAndAcademics.ts`; `lib/formConstants`.
**Buildable today** — partial. `SectionIntro` is a registry component; the
narrow single-column shell around it is page-specific, and — like newsletter
signup — this page's shape doesn't match either `ConversionShell` frame, so
it wasn't folded in either.

### Newsletter success
**Routes** — `/newsletter-success` (one page, noindex).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — `SuccessPanel` with page-specific copy.
**Required data** — `lib/newsletterSuccess.ts`.
**Buildable today** — no. `SuccessPanel` is a standalone section component,
not a registry template, and this is its only consumer.

### Book Your Demo pages
**Routes** — `/book-your-demo` (ZenML) and `/book-your-demo/kitaru` (Kitaru
co-brand variant) — 2 pages.
**Layout** — `MinimalLayout` (no nav/footer, to reduce distraction).
**Surface** — `unified` for the ZenML page, `agent` for the Kitaru variant.
**Sequence** — `BookingExperience` (brand-parametrized: hero, stats, logos,
form, Cal.com embed, testimonial), shared by both routes.
**Required data** — `lib/bookYourDemo.ts` (shared config plus Kitaru-specific
hero/proof copy).
**Buildable today** — no. Nothing here comes from the registry, which is what
this verdict measures. Worth reading with the nuance though: another brand
variant of this exact shape is cheap, because `BookingExperience`
(`src/components/BookingExperience.astro`) already parametrizes brand, home
link and copy — the reuse is real, it just lives outside the registry. A
structurally different conversion page would still start from scratch.

---

## Legal

### Legal text pages
**Routes** — `/privacy-policy`, `/terms-of-service` (2 pages).
**Layout** — `ContentLayout`.
**Surface** — `ml`.
**Sequence** — `LegalArticle` (title + optional "Last updated" line, sourced
from `lastUpdated` frontmatter — absent on privacy-policy, so that line
collapses rather than leaving a gap) wrapping the entry's rendered body.
**Required data** — `legal` content collection (raw HTML in Markdown, not
re-authored markdown syntax).
**Buildable today** — yes. A third legal page is a new `legal` collection
entry plus a three-line adapter page.

### Imprint
**Routes** — `/imprint` (one page).
**Layout** — `ContentLayout`.
**Surface** — `ml`.
**Sequence** — an `h1` plus a hand-rolled three-column fact grid (address,
commercial register, representatives).
**Required data** — `lib/constants` (`COMPANY_ADDRESS`).
**Buildable today** — no, deliberately. This page is a fact grid, not the
long-form h1-plus-body shape `LegalArticle` owns, so it was kept out of that
template on purpose rather than forced to fit.

---

## Product

### Homepage
**Routes** — `/` (one page).
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — 15 bespoke section components in order: announcement banner,
hero, two-workspaces intro, logo cloud, two-products, feature tabs, value
props, integrations marquee, whitepaper CTA, customer stories, news, compliance,
newsletter signup, FAQ accordion, final CTA.
**Required data** — `lib/homepage-unified.ts`; `lib/homepageJsonLd.ts`.
**Buildable today** — no. None of the 15 sections come from the registry;
this is the site's largest concentration of one-off marketing components.

### Pricing
**Routes** — `/pricing` (one page).
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — `SectionIntro` (hero), then bespoke sections: plan cards (with
a usage slider on the Scale card), a workspace-toggled comparison table, a
workspace-toggled FAQ, Pro inclusions, a startup banner, a compliance section,
a stats/trust section, then `FeaturesHubCTA`.
**Required data** — `lib/pricing.ts`; `lib/pricingJsonLd.ts`.
**Buildable today** — partial. `SectionIntro` covers the hero; every other
section is pricing-specific with no registry equivalent.

### Features hub
**Routes** — `/features` (one page).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — `PageHeader` (gradient hero), a hand-rolled grid of 7 feature
cards (`FeatureCard`, from a hardcoded `HUB_CARDS` list, not a collection),
then `FeaturesCTA05`.
**Required data** — `lib/features.ts` (`HUB_CARDS`, hero/CTA copy).
**Buildable today** — partial. `PageHeader` covers the hero; the card grid
and CTA band are page-specific.

### Feature detail
**Routes** — `/features/<slug>` — one per published feature page (12 pages).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — `Breadcrumb`, `FeatureHero`, then a content-driven sequence of
blocks (`FeatureValueSection` or `FeatureComplianceBanner`, picked per block
by a `kind` discriminant in frontmatter), an optional `FeatureTestimonial`,
and an optional `FinalCTA`.
**Required data** — `feature-pages` collection.
**Buildable today** — partial. `Breadcrumb` is the only registry piece; the
hero and all block types are feature-specific section components with no
registry equivalent.

### Kitaru product landing
**Routes** — `/product/kitaru` (one page).
**Layout** — `BaseLayout`.
**Surface** — `agent`.
**Sequence** — three Preact islands (`Hero`, `ScenarioStrip`, `TwoDoors`, all
`client:visible`) followed by three static sections (`Features`, `Faq`,
`Cta`) — all Kitaru-specific components under `src/components/kitaru/`.
**Required data** — `lib/kitaru-landing.ts`; `lib/productKitaru.ts`.
**Buildable today** — no. Nothing on this page comes from the registry; it's
a dedicated landing built entirely from Kitaru-only components.

### ZenML product landing
**Routes** — `/product/zenml` (one page).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — a hand-rolled hero, then homepage section components reused
as-is: `PRODUCT_ZENML_BENEFITS`, `FeatureTabs`, `ValueProps`,
`IntegrationsMarquee`, `CustomerStories`, `FinalCTA`.
**Required data** — `lib/productZenml.ts`.
**Buildable today** — no, from the registry's point of view — none of the
reused sections are registry templates, they're homepage components reused
by import. That reuse is real (the page needed no new section code below the
hero) but it's a different, older kind of sharing than this ledger tracks.

### Get Started
**Routes** — `/get-started` (one page; `/get-started/zenml` 301-redirects
here).
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — `SectionIntro` (hero, with a pill tab switcher between ZenML
and Kitaru panels), then per tab: `ProcessSteps` (the 3-step walkthrough,
syntax-highlighted per brand), a `SectionIntro` architecture section, an
image, buttons, a projects grid, and a resources grid — Kitaru's panel wraps
in `data-app="kitaru"` for brand tokens — then a shared `FeaturesHubCTA`.
**Required data** — `lib/getStarted.ts`; `projects` collection (fallback
data); Shiki highlighter config (`zenml-dark`/`kitaru-dark` themes).
**Buildable today** — partial. `SectionIntro` and `ProcessSteps` are both
registry templates; the tab switcher, architecture section, and resource
grids are page-specific.

### ZenML Pro
**Routes** — `/pro` (one page).
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — a hand-rolled hero, then a long sequence of bespoke sections:
unified-pitch, `LogoCloud`, `ProFeaturedTestimonial09`, onboarding,
`ProTestimonial02`, `FeatureValueSection`, compliance, `ProTestimonial15Section`,
an OSS-vs-Pro grid, `FaqSection`, `VsCta02`.
**Required data** — `lib/pro.ts`.
**Buildable today** — no. This is the second-largest concentration of
one-off marketing sections on the site after the homepage; none of them are
registry templates.

### Open Source vs Pro
**Routes** — `/open-source-vs-pro` (one page).
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — `VsHero`, a feature grid section, a "subway map" readiness
section (hand-drawn SVG icons), `ComparisonTable`, `FeaturesCTA05`.
**Required data** — `lib/openSourceVsPro.ts`.
**Buildable today** — no. All sections are page-specific; `VsHero` and
`ComparisonTable` are reused elsewhere (the comparison family, respectively)
but by import, not through the registry.

---

## Chrome & utility

### Company
**Routes** — `/company` (one page).
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — `PageHeader` (tinted hero), an about section (photo + text),
a 5-card values grid, a team grid (from the `team` collection, with each
member's Markdown body rendered inline as "fun facts"), and an open-positions
list.
**Required data** — `lib/company.ts`; `team` collection.
**Buildable today** — partial. `PageHeader` covers the hero; the about
section, values grid, team grid, and positions list are all page-specific.

### Contact
**Routes** — `/contact` (one page).
**Layout** — `ContentLayout`.
**Surface** — `unified`.
**Sequence** — an `h1` plus long-form prose (email, community Slack, sales/
demos, office address) — no sections beyond the layout's prose wrapper.
**Required data** — `lib/constants` (`COMPANY_ADDRESS`, `CONTACT_EMAIL`).
**Buildable today** — no. Nothing here comes from the registry; it's plain
prose in `ContentLayout`, same shape as `/imprint` but without even the fact
grid.

### Docs hub
**Routes** — `/docs` (one page).
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — `PageHeader` (hero with a decorative dot-grid), a two-card
product diptych (ZenML docs / Kitaru docs, each with its own quick-link list),
using `SectionIntro` for each card's title block, then a resources strip.
**Required data** — inline constants in the page itself (`PRODUCTS`,
`RESOURCES` — no content collection).
**Buildable today** — partial. `PageHeader` and `SectionIntro` cover the
hero and each card's title; the diptych card layout and resources strip are
page-specific.

### 404
**Routes** — `/404.html`, served automatically by the host for unmatched
routes.
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — a hand-rolled error message, illustration, CTA button, and
help links — no registry components.
**Required data** — none (all copy is inline).
**Buildable today** — no. This is a small, fully bespoke utility page; there
isn't a second 404-shaped page on the site to justify extracting anything
from it yet.

### Styleguide
**Routes** — `/styleguide` (one page, noindex, unlisted).
**Layout** — `MinimalLayout`.
**Surface** — `unified` (passed explicitly). Note the page's content renders
under `data-app="zenml-next"` for the in-progress rebrand scope — that's the
brand scope, which is a separate axis from the analytics surface.
**Sequence** — generated sections: design tokens, type scale, spacing scale,
a live-rendered stage for every built registry entry (via `TemplateStage`,
using each entry's `demoProps`/`demoSlots`), and a rules section parsed from
`DESIGN.md`.
**Required data** — `src/lib/styleguide.ts`; `src/lib/designRules.ts`;
`src/lib/templates/registry.ts` itself.
**Buildable today** — no, and not meaningfully applicable — this page *is*
the tool that renders every other entry's registry template, generated at
build time from the registry rather than composed from it as a page family.
There's only one of these by design.

### RSS feed routes
**Routes** — `/blog/rss.xml`, `/llmops-database/rss.xml`,
`/mlops-database/rss.xml` (3 routes).
**Layout** — none — these are `.xml.ts` endpoints, not `.astro` pages.
**Surface** — n/a.
**Sequence** — n/a.
**Required data** — the matching content collection per feed; `lib/constants`
(`SITE_URL`); each domain's provenance type for date derivation (`llmops`/
`mlops` entries fall back through `webflow` then `notion` provenance since
LLMOps entries can now publish natively without a Webflow origin).
**Buildable today** — yes. All three follow the same RSS 2.0-over-a-collection
pattern; a fourth feed is the same shape again.

### JSON index routes
**Routes** — `/blog/search-index.json`, `/llmops-index.json`,
`/mlops-index.json` (3 routes).
**Layout** — none.
**Surface** — n/a.
**Sequence** — n/a.
**Required data** — the matching content collection; each domain's
"build a lightweight client-side index" helper (`buildBlogSearchIndex`,
`deriveAddedDate` per domain).
**Buildable today** — yes. All `prerender: true`, feeding a filterable-index
island on the matching listing page — the same pattern each time.

### Markdown mirror routes
**Routes** — `/index.md`, `/pricing.md`, `/compare.md`, `/product/kitaru.md`,
`/product/zenml.md` (5 routes).
**Layout** — none.
**Surface** — n/a.
**Sequence** — n/a.
**Required data** — the same `lib/*.ts` data module the HTML page uses, plus
`lib/agentMarkdown.ts` (shared markdown-builder helpers) and `lib/text.ts`
(`htmlToPlainText`) where the source data has HTML fragments.
**Buildable today** — yes. Every mirror reuses the target page's own data
module rather than re-scraping the rendered page, so adding a sixth mirror
for a new marketing page is a small, well-worn pattern.

### Server API routes
**Routes** — `POST/GET /api/csp-report`, `POST/GET /api/forms/<formType>`,
`GET /api/github-stars` (3 routes, all `prerender: false`).
**Layout** — none.
**Surface** — n/a.
**Sequence** — n/a.
**Required data** — Cloudflare bindings via `cloudflare:workers`
(`TURNSTILE_SECRET_KEY`, `SEGMENT_FORMS_WRITE_KEY`, `GITHUB_TOKEN`); `lib/formValidation.ts`
(`FORM_RULES`); `lib/githubStars.ts` for the edge-cache/stale-while-revalidate
logic.
**Buildable today** — yes. The pattern (Astro API route in `src/pages/api/`,
`prerender: false`, Cloudflare bindings, `context.locals.cfContext.waitUntil`
for background work) is established and documented in the root `CLAUDE.md` —
a new endpoint follows it directly.

---

## Gap ledger

Every entry marked **partial** or **no**, with the specific missing piece.
Read top to bottom for priority — the biggest, most duplicated gaps are
listed first within each verdict group.

| Page type | Verdict | Gap |
|---|---|---|
| Homepage (`/`) | no | 15 one-off marketing sections; no shared template covers any of them |
| ZenML Pro (`/pro`) | no | second-largest one-off marketing sequence on the site |
| Integration detail (`/integrations/[slug]`) | no | no shared template for a "structured content with markdown fallback" detail page |
| Kitaru product landing (`/product/kitaru`) | no | fully bespoke Kitaru-only islands and sections |
| ZenML product landing (`/product/zenml`) | no | reuses homepage sections by import, not through the registry |
| Open Source vs Pro (`/open-source-vs-pro`) | no | `VsHero`/`ComparisonTable` reused by import only; grid and subway-map sections are one-off |
| Kitaru comparison pages (`/compare/kitaru-vs-*`) | no | frozen pending the evals-positioning pivot; catalogued, not scheduled |
| Book Your Demo (`/book-your-demo`, `/book-your-demo/kitaru`) | no | `BookingExperience` covers the whole page and takes a brand, so another variant of this shape is cheap — but it sits outside the registry, and a differently-shaped conversion page gets nothing from it |
| Newsletter signup (`/newsletter-signup`) | no | two-column, image-paired shape doesn't match either `ConversionShell` frame |
| Newsletter success (`/newsletter-success`) | no | `SuccessPanel` is a standalone component with one consumer |
| Imprint (`/imprint`) | no | deliberately a fact grid, not `LegalArticle`'s long-form shape |
| Contact (`/contact`) | no | plain prose in `ContentLayout`, nothing else |
| 404 (`/404`) | no | small, fully bespoke; no second 404-shaped page to justify extracting from |
| Styleguide (`/styleguide`) | no | is the registry-rendering tool itself, not a page family |
| Case studies hub (`/case-studies`) | partial | card grid and banner link are hand-rolled |
| Case study detail (`/case-study/[slug]`) | partial | hero and two-column shell are hand-rolled; sidebar and sibling rail are shared |
| Database detail pages (LLMOps/MLOps `[slug]`) | partial | header and summary box are hand-rolled and duplicated between the two domains |
| Database index pages (LLMOps/MLOps) | partial | `<noscript>` fallback and newsletter CTA band are hand-rolled and duplicated |
| Projects index (`/projects`) | partial | card grid has no registry equivalent |
| Project detail (`/projects/[slug]`) | partial | header, details column, and gallery are hand-rolled; only the sidebar is shared |
| Integrations index (`/integrations`) | partial | diagram image and bottom CTA band are hand-rolled |
| Features hub (`/features`) | partial | card grid and CTA band are page-specific |
| Feature detail (`/features/[slug]`) | partial | hero and all content-block types are feature-specific components |
| Pricing (`/pricing`) | partial | every section past the hero is pricing-specific |
| Get Started (`/get-started`) | partial | tab switcher, architecture section, and resource grids are page-specific |
| Company (`/company`) | partial | about section, values grid, team grid, and positions list are page-specific |
| Docs hub (`/docs`) | partial | diptych card layout and resources strip are page-specific |
| Comparison hub (`/compare`) | partial | both card grids are hand-rolled |
| Blog post detail (`/blog/[slug]`) | partial | table of contents, category bar, and sidebar CTA have no registry equivalent |
| Blog index (`/blog`) | partial | only the page's own copy and wrapper are unregistered — closest to "yes" of any partial entry |
| Startups & academics (`/startups-and-academics`) | partial | narrow single-column shell around `SectionIntro` + form is page-specific |
