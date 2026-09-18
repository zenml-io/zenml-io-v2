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
**Layout** — `ComparisonPage` renders `BaseLayout app="labs" product="zenml"`
and discriminates the blocks and category collections without configurable
layout props.
**Surface** — `ml` for all 28 routes.
**Sequence** — eyebrow-first `LabsComparisonBand` (eyebrow, headline, deck,
38-option grouped switcher), then the ordered `blocks[]`: `value` →
`FeatureSplit`; `quote` / `testimonial` → full-width
`LabsComparisonQuote`; `featureTable` → `LabsComparisonTable`;
`codeComparison` → `LabsCodeCompare`; `strategyCta` →
`LabsComparisonStrategyCta`; sibling comparisons → `LabsComparisonCard`
grids; `blogRail` → `LabsComparisonBlogRail` with framed Labs blog cards;
`cta02` → the full-width comparison arrangement of `LabsCloseCta`. The
`strategyCta` advantages render as a full-width `FeatureGridPanels` row, indexed
and toned by position, each with the mark named by its `icon` field; the CTA
card below the row sits on the page ground under a `LABS_GRAIN.hero` backdrop.
**Required data** — `compare` collection; `vs-pages` collection; `advantages`
collection (strategy-CTA block); `quotes` collection (the `/compare` quote
block resolves a slug reference; `/vs` inlines its testimonial copy instead);
`lib/blog` for the related-posts rail; `compare-zenml` for the complete
switcher.
**Buildable today** — yes. A new entry is a content file; the shared Labs
components are registered under `labs.*`, and the retained `comparison.*`
ids document how each historical block maps onto them.

### Comparison hub
**Routes** — `/compare` (one page).
**Layout** — `BaseLayout` (`app="labs"`).
**Surface** — `unified`.
**Sequence** — `LabsBand` (short: eyebrow / h1 / deck), two compact
`labs.comparison-card` grids (Kitaru vs. agent frameworks and SDKs, wrapped in `data-product="kitaru"`;
ZenML vs. orchestrators, durable execution engines & agent frameworks), then
`LabsCloseCta`.
**Required data** — `compare`, `compare-zenml` and `compare-kitaru`
collections, normalised into one card shape by `src/lib/compareHub.ts`.
**Buildable today** — yes. `LabsBand`, `LabsComparisonCard` and
`LabsCloseCta` are registry templates; the two section headings and grids are
page-local arrangement markup.

### ZenML MDX comparison pages
**Routes** — `/compare/zenml-vs-<slug>` (10 `.mdx` entries in
`compare-zenml`), served by `src/pages/compare/[slug].astro`, the same
dispatcher that routes the other two compare collections.
**Layout** — `ZenmlMdxCompare` renders `BaseLayout app="labs"
product="zenml"`; there is no comparison-specific token scope.
**Surface** — `ml`.
**Sequence** — eyebrow-first `LabsComparisonBand` with the complete 38-option
switcher and no visible breadcrumb, then the MDX body. Its existing inline imports are thin
wrappers over `LabsComparisonTable`, `LabsCodeCompare`,
`LabsComparisonValue`, `LabsComparisonShowdown`, `LabsComparisonQuote`, and
the full-width comparison arrangement of `LabsCloseCta`.
**Required data** — `compare-zenml` collection (`.mdx`, not `.md`, for the
inline component imports); the per-competitor graphics under
`src/components/compare/zenml/graphics/`.
**Buildable today** — yes. Shared behavior is registered under `labs.*`; the
MDX wrappers preserve the authored component API without duplicating the
visual implementation.

### Kitaru comparison pages
**Routes** — `/compare/kitaru-vs-<slug>` (11 `.mdx` entries in
`compare-kitaru`).
**Layout** — `KitaruCompare` (`src/components/compare/_layouts/KitaruCompare.astro`),
on `BaseLayout app="labs" product="kitaru"`; the MDX content retains an inner
`data-app="kitaru"` for the established token bridge used by its graphics.
**Surface** — `agent`.
**Sequence** — Kitaru-grain, orange-eyebrow `LabsComparisonBand` with the complete
11-option switcher and no visible breadcrumb, then the MDX body. The inline components are
thin wrappers over the same Labs table, code-pane, value, showdown, quote and
closing-band components as the ZenML MDX family.
**Required data** — `compare-kitaru` collection (`.mdx`, not `.md` — the ported
pages rely on inline component imports).
**Buildable today** — yes. New competitors are content entries and appear
alphabetically in the shared Kitaru switcher.

---

## Blog

The whole blog surface (index, post, and the three taxonomy hubs below)
renders in the ZenML Labs shell — `app="labs"`, `surface="ml"` — as of the
2026-09 blog cutover. UI text on every blog route (breadcrumb, meta rows,
chips, TOC, facet-rail headers/counts, results count, sort, pagination,
code-pane bar, hub headers) is Rethink Sans in sentence case, not the
Nudica-label convention the rest of the site uses.

### Blog index
**Routes** — `/blog` (one page).
**Layout** — `BaseLayout` (`app="labs"`, `surface="ml"`).
**Sequence** — a page header (`h1` + exact main-feed post count + the page's
own SEO description as its dek), then the `BlogIndex` filterable-index
island (facet rail for category + tags, `⌘K` search, client-side
pagination) with the first page of post cards — `labs.blog-card`
(`BlogCard.astro`/`BlogCard.tsx`) — server-rendered as real HTML for
crawlers.
**Required data** — `blog` collection (`getMainFeedPosts` — excludes drafts and
the "discovery" tag corpus); `categories` collection (`getCategoryCounts`);
`tags` collection (`getTagCounts`); `lib/blog` (`buildBlogSearchIndex`,
`PAGE_SIZE`).
**Buildable today** — yes. `PageHeader` for the hero and the
`filterable-index.shell` template (`DataFilterIndex`, skinned `"labs"` —
class strings only, see `src/components/islands/filter-index/labsSkin.ts`)
for the whole filter/search/pagination body are both registered; the card
grid renders `labs.blog-card`.

### Blog post detail
**Routes** — `/blog/<slug>` — one per published post.
**Layout** — `BlogLayout` (delegates to `BaseLayout`, `app="labs"`, forwards
an optional `surface` that defaults to `"ml"`; this page doesn't pass one
explicitly).
**Sequence** — `BlogLayout` renders the masthead (breadcrumb + h1 + dek +
meta row), an optional 16:9 hero, the article body (768px prose column +
a sticky 224px table of contents, `BlogTOC`), a tag-chip row, an author
card, prev/next navigation, and a "Continue reading" rail using the
hex-corner card (`card.hex-corner`/`mark.hex-corner`, `RelatedRail`'s
`hex-card` item kind) — the pre-cutover category bar, sidebar CTA, and
final CTA band are gone.
**Required data** — `blog` collection; `authors`, `categories`, `tags`
collections (via `getEntry`); `lib/blog` (`getAllPublishedPosts`,
`getPrevNext`, `getRelatedPosts`, `resolveAuthor`).
**Buildable today** — yes. `BlogLayout` uses the registry's `RelatedRail`
for the related-posts section (`hex-card` kind) and the registered
`Breadcrumb` primitive for the masthead crumb (its JSON-LD ships alongside
the page's `Article` JSON-LD); the table of contents and tag/author blocks
are blog-specific components with no registry equivalent.

### Taxonomy hubs (tags, categories, authors)
**Routes** — `/tags`, `/tags/<slug>`, `/category`, `/category/<slug>`,
`/author`, `/author/<slug>`.
**Layout** — `BaseLayout` (`app="labs"`, `surface="ml"`).
**Sequence** — every route opens with `PageHeader`'s `with-breadcrumb`
arrangement (`Blog › <family> [› term]`, `TERM_HUB_HEADER_INTRO` preset);
the author *detail* page uses `split-masthead` instead (avatar/bio/links,
with the same breadcrumb rendered above it). The three index hubs (`/tags`,
`/category`, `/author`) then list every term as `data-display.stacked-list`
rows (`skin="labs"`, name + post count). The detail pages split by family
per Zuri's ruling: `/tags/<slug>` renders `term-hub.entry-index`'s `items`
arrangement (`skin="labs"` stacked rows — title, excerpt, up to 3 sibling-
tag chips, a fixed author/year lane) plus an "Other tags" strip;
`/category/<slug>` and `/author/<slug>` render `term-hub.editorial`'s card
grid (`labs.blog-card`) plus an "Other categories"/"Other authors" strip.
Every detail page server-renders the full list of matching posts (SEO) and
paginates 12/page client-side via the `HubPagination` island, which only
toggles pre-rendered `hidden`/`data-page` markers — no fetch, no
re-render.
**Required data** — `blog`, `tags`, `categories`, `authors` collections;
`lib/blog` (`PAGE_SIZE`, `getTagCounts`, `getCategoryCounts`,
`resolveAuthor`); `lib/relatedIndex` (`filterUsedTerms` — a zero-count term
never builds a detail page, so the index hubs never link to one).
**Buildable today** — yes. `page-header.with-breadcrumb`/`split-masthead`,
`term-hub.editorial`, `term-hub.entry-index`, and `data-display.stacked-list`
are all registered; `HubPagination` is a small unregistered island (islands
aren't template-registry entries).

---

## Databases

All research-database routes render in the ZenML Labs shell (`app="labs"`,
`surface="ml"`) and import `initScrollReveal` (`src/scripts/labs-scroll-
reveal.ts`) to arm their own `.scroll-reveal-section` blocks (#256) — unlike
the blog taxonomy hubs below, which carry the class without arming it.

### Database index pages
**Routes** — `/llmops-database` and `/mlops-database` (one page each).
**Layout** — `BaseLayout`.
**Sequence** — `LabsHero band="short"` (name + deck from `lib/databases.ts`),
the matching filterable-index island (`LlmopsIndex` / `MlopsIndex`, `skin=
"labs"`) fetching a JSON index client-side, a `<noscript>` tag/industry
chip fallback, and `BlogNewsletterCta` (`DATABASE_CTA` + `BREVO_LLMOPS_
CONFIG`).
**Required data** — `llmops-tags` / `mlops-tags` collections; `industry-tags`
collection; entry counts from `lib/llmops` / `lib/mlops`; `lib/databases.ts`
(shared copy, page size, CTA content); `lib/formConstants`
(`BREVO_LLMOPS_CONFIG`).
**Buildable today** — yes. `LabsHero`, the filter islands, and
`BlogNewsletterCta` are all registry components; only the `<noscript>`
fallback is hand-rolled per page.

### Database detail pages
**Routes** — `/llmops-database/<slug>` and `/mlops-database/<slug>` (plus
redirect stubs from `STALE_RAY_SUMMIT_REDIRECTS` for retired MLOps slugs).
**Layout** — `DatabaseEntryLayout` (one layout for both databases,
discriminated by a `database` prop), inside `BaseLayout`.
**Sequence** — `LabsBand` (eyebrow, h1, meta row + "View source"),
`StickyBreadcrumb`, a tinted summary box, `LabsMetadataBlock` (Industry +
Technologies/MLOps topics chips, clamped with a `<details>` overflow),
`LabsArticleBody` (prose + TOC), `LabsRelatedBand` ("More like this"), and
`BlogNewsletterCta`.
**Required data** — `llmops-database` / `mlops-database` collections;
`llmops-tags` / `mlops-tags` collections; `industry-tags` collection;
`lib/relatedIndex`'s `buildRelatedIndex`/`getRelatedFromIndex` scorer, wrapped
per-domain by `lib/llmops.ts` / `lib/mlops.ts`.
**Buildable today** — yes. Every section is a registry component shared with
the blog post layout (`StickyBreadcrumb`, `LabsArticleBody`, `LabsRelatedBand`)
or built for this layout (`LabsMetadataBlock`); the two collections render
from one template, differing only by the props the route resolves.

### Database term hubs
**Routes** — `/llmops-tags/<slug>`, `/mlops-tags/<slug>`,
`/industry-tags/<slug>`.
**Layout** — `BaseLayout`.
**Sequence** — `LabsBand` (breadcrumb, eyebrow, h1, entry-count deck),
`TermHubEntryIndex` (`skin="labs"`, `entries` arrangement — `labs.entry-row`
rows, cross-links rendered as a sibling-chip strip below the list), and
`BlogNewsletterCta`. A tag hub server-renders only its first
`DATABASE_PAGE_SIZE` rows and mounts `HubEntryPagination` for later pages
(fetched from `/llmops-index.json` / `/mlops-index.json` — #53); an industry
hub renders two such sections (LLMOps entries, MLOps entries), each with an
optional "See all N in the … Database →" link instead of pagination.
**Required data** — the same collections as the detail pages, plus
`lib/relatedIndex`'s `filterUsedTerms` and the taxonomy-count helpers in
`lib/llmops.ts` / `lib/mlops.ts`.
**Buildable today** — yes.

### Database term hub indexes
**Routes** — `/llmops-tags`, `/mlops-tags`, `/industry-tags`.
**Layout** — `BaseLayout`.
**Sequence** — `LabsBand` (breadcrumb, h1, term-count deck), `TermChipIndex`
(every term as a hexagon chip carrying its entry count, sorted by the page),
and `BlogNewsletterCta`.
**Required data** — the `llmops-tags` / `mlops-tags` / `industry-tags`
collections plus the same taxonomy-count helpers, filtered through
`filterUsedTerms` so a zero-entry term never links to a page that doesn't
build.
**Buildable today** — yes.

---

## Projects

### Projects index
**Routes** — `/projects` (one page).
**Layout** — `BaseLayout` with `app="labs"`, `surface="ml"`, and
`product="zenml"`; `LabsPageHeader` and `BlogNewsletterCta`.
**Surface** — `ml`.
**Sequence** — short Labs header (`LabsPageHeader`, eyebrow + heading + deck),
then a centered `max-w-content` grid with explicit 1 → 2 → 3 columns of
`labs.blog-card` entries (project image, title, description, license category,
setup-time label), then the shared `BlogNewsletterCta` close band.
**Required data** — `projects` collection (16 non-draft entries, sorted by
title).
**Buildable today** — yes for the Labs composition: `labs.page-header`,
`labs.blog-card`, and `labs.blog-newsletter-cta` provide the shared pieces;
the route supplies only collection sorting and card prop mapping.

### Project detail
**Routes** — `/projects/<slug>` — one per published project (16 pages).
**Layout** — `labs.detail-layout` (`BaseLayout` with `app="labs"`,
`surface="ml"`, `product="zenml"`).
**Surface** — `ml`.
**Sequence** — short Labs masthead with project title/description and a
sticky breadcrumb, then the 768px prose lane plus 224px metadata rail. The
named sidebar slot contains the project image and
`DescriptionList(frame="divided")`; the default slot contains exactly one
`.prose` details region from `lib/projectBody` followed by the optional
gallery image. The layout closes with `BlogNewsletterCta`.
**Required data** — `projects` collection; `lib/projectBody`
(`markdownToHtml`).
**Buildable today** — yes for the shared Labs shell; the route owns only
project data mapping and the gallery slot. The `DescriptionList` divided
frame remains the fact-grid sidebar contract, distinct from the spaced frame
used by case studies. `lib/projectBody`'s converter is deliberately minimal
(headings and paragraphs only, no list handling) because it reproduces what
these pages have always rendered — one project's body is a paragraph of
literal `-` lines as a result. The FloraCast details `.prose`, FloraCast
sidebar `<dl>`, and sign-language details `.prose` remain pinned rendered
goldens in `pnpm smoke:dist`.

---

## Case studies

### Case studies hub
**Routes** — `/case-studies` (one page).
**Layout** — `BaseLayout` with `app="labs"`, `surface="ml"`, and
`product="zenml"`; `LabsPageHeader` and `BlogNewsletterCta`.
**Surface** — `ml`.
**Sequence** — short centered Labs header with the existing hero CTAs, then
an explicit 1 → 2 → 4 `LabsStoryCard` grid split around the existing LLMOps
banner link, then the shared newsletter close band.
**Required data** — `case-studies` collection (5 non-draft entries; `lib/case-studies`'s
`orderCaseStudies`/`splitAtBanner`).
**Buildable today** — yes for the Labs composition: `labs.page-header`,
`labs.story-card`, and `labs.blog-newsletter-cta` provide the shared pieces;
the route owns ordering, banner copy, and CTA analytics mapping.

### Case study detail
**Routes** — `/case-study/<slug>` — one per published case study (5 pages).
**Layout** — `labs.detail-layout` (`BaseLayout` with `app="labs"`,
`surface="ml"`, `product="zenml"`).
**Surface** — `ml`.
**Sequence** — short Labs masthead with company eyebrow, title, and description;
a sticky shared breadcrumb; the 768px prose lane plus 224px metadata rail
with customer logos above the facts; and a named
related slot with an explicit 1 → 2 → 4 `LabsStoryCard` sibling grid. The
layout closes with `BlogNewsletterCta`.
**Required data** — `case-studies` collection; `lib/case-studies`
(`orderCaseStudies`, `siblingCaseStudies`).
**Buildable today** — yes for the shared Labs shell: `labs.detail-layout`,
`labs.sticky-breadcrumb`, `labs.case-study-sidebar`, and `labs.story-card`
cover the page family. `LabsCaseStudySidebar` maps the collection sidebar
through the shared `DescriptionList` spaced frame and optionally renders the
PDF CTA; the route owns only content rendering, logo mapping, and sibling
ordering.

---

## Integrations

All integration routes render in the ZenML Labs shell (`app="labs"
product="zenml"`, `surface="ml"`) and share `labs.integration-card` (the
full-width-logo-band card) through `TermHubCatalog` — the same tile
renders the `/integrations` grid, a type hub's list and a detail page's
"More integrations" row.

### Integrations index
**Routes** — `/integrations` (one page).
**Layout** — `BaseLayout`.
**Sequence** — `LabsBand size="short"` (eyebrow, headline, deck from
`INTEGRATIONS_HERO`), the `IntegrationsIndex` filterable-index island
(`skin="labs"` — the island owns the facet rail and search box, toggling
visibility of server-rendered `labs.integration-card` tiles passed as
children; a zero-result query renders the labs `FilterEmptyState`), then
`LabsCloseCta` (`integrationsClose`).
**Required data** — `integrations` collection (68 total, 66 non-draft);
`integration-types` collection; `lib/integrations.ts` (hero + close copy).
**Buildable today** — yes. `LabsBand`, `labs.integration-card`, the labs
skin of `ControlFilterIndex`/`IntegrationsIndex`, and `LabsCloseCta` are all
registry templates; the page supplies the collection query and the card
props.

### Integration types index
**Routes** — `/integration-type` (one page).
**Layout** — `BaseLayout`.
**Sequence** — a breadcrumb + `LabsBand size="short"` (eyebrow, headline,
`integrationTypesDeck` count line), `TermChipIndex` (every integration type
as a hexagon chip carrying its integration count, sorted by popularity —
zero-count types dropped by `filterUsedTerms`), then `LabsCloseCta`.
**Required data** — `integrations` and `integration-types` collections;
`lib/integrations.ts`; `lib/relatedIndex.ts` (`filterUsedTerms`).
**Buildable today** — yes.

### Integration type hub
**Routes** — `/integration-type/<slug>` — one per used integration type.
**Layout** — `BaseLayout`.
**Sequence** — a breadcrumb + `LabsBand size="short"` (eyebrow, the type
name as h1, `integrationTypeDeck` count line), `TermHubCatalog` (every
integration of this type as a `labs.integration-card`, centred when there
are fewer than three), then `LabsCloseCta`.
**Required data** — `integrations` and `integration-types` collections;
`lib/integrations.ts`.
**Buildable today** — yes.

### Integration detail
**Routes** — `/integrations/<slug>` — one per published integration (66
pages).
**Layout** — page-local composition of the research-database entry
anatomy (not a shared layout — this is the only route it applies to): a
short `LabsBand` (eyebrow "Integration", the mark in a white tile beside
the h1, deck with an optional "View docs" ghost pill at the row's right
end), `StickyBreadcrumb`, `LabsArticleBody` with the `LabsMetadataBlock`
record in its `rail` slot (Type / GitHub / Compare rows, each present only
when the entry has the field; mono labels, the GitHub row a ghost pill with
the GitHub mark — right rail above the TOC from `xl`, above the prose
below), `LabsRelatedBand` ("Related reading"),
a "More integrations" `TermHubCatalog` row, and `LabsCloseCta`
(`integrationDetailClose`, carrying the build-time published count).
**Sequence detail** — the structured content branch renders the entry's
`<ul>` feature lists straight into `.prose`, and highlights
`codeExampleHtml`'s `<pre><code>` blocks at build time with Shiki
(`labs-light.json`) through `src/lib/integrationCode.ts`, wrapped in the
same code-pane markup every other prose surface uses; an entry with no
structured field falls back to its Markdown body.
**Required data** — `integrations` collection; `integration-types`
collection; `blog` collection (resolving `relatedBlogPosts`); `categories`
collection (a related post's chip label); `compare` collection (resolving a
`compareSlug` to a display name); `src/lib/integrations.ts`;
`src/lib/integrationCode.ts`.
**Buildable today** — yes. Every block is a registry component
(`LabsBand`, `StickyBreadcrumb`, `LabsArticleBody`, `LabsMetadataBlock`,
`LabsRelatedBand`, `TermHubCatalog`, `LabsCloseCta`); only the frontmatter
resolution and the code-block highlighting are page-specific.

---

## Conversion

### Cal-hero confirmation pages
**Routes** — `/success-calendar`, `/schedule-a-demo` (2 pages, noindex except
`/schedule-a-demo`). `/book-a-demo-success` permanently redirects to
`/success-calendar`.
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — `ConversionShell` (`frame="calendar"`) wrapping `CalEmbed`.
**Required data** — one dedicated `lib/*.ts` module per route
(`successCalendar.ts`, `scheduleADemo.ts`) — headline, deck, SEO, and Cal.com
config.
**Buildable today** — yes. The two pages are byte-identical modulo their
per-route data module; a third would be a new data module plus this same
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
**Layout** — `BaseLayout` (`app="labs"`).
**Surface** — `unified`.
**Sequence** — `LabsBand` (short: eyebrow / h1 / deck) directly above the
`ContactForm` island in a single narrow column, then `LabsCloseCta`.
**Required data** — `lib/startupsAndAcademics.ts`; `lib/formConstants`.
**Buildable today** — mostly. `LabsBand` and `LabsCloseCta` are registry
templates; the narrow single-column shell around the `ContactForm` island
stays page-specific.

### Success pages
**Routes** — `/booked`, `/book-success`, `/newsletter-success` (3 pages, noindex).
**Layout** — `BaseLayout`.
**Surface** — `ml`.
**Sequence** — `ConversionShell` (`frame="success"`) with page-specific copy: a
short band (headline + HTML deck, since these bodies carry `<br>`) and up to
two `LabsCta` pills (`Success-Primary` on all three, `Success-Secondary` on
`/newsletter-success` only).
**Required data** — `lib/booked.ts`, `lib/bookSuccess.ts`, `lib/newsletterSuccess.ts`.
**Buildable today** — yes. Same three-import shape as the calendar/form pages,
selected by `ConversionShell`'s `frame` prop.

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
**Layout** — `ContentLayout` (`heading={entry.data.title}`, `deck` set to
`Last updated {lastUpdated}` when the frontmatter carries it — absent on
privacy-policy, so the deck collapses rather than leaving a gap).
**Surface** — `ml`.
**Sequence** — `ContentLayout`'s band carries the h1 and deck; the `.prose`
column below renders the entry's body directly, no separate title component.
**Required data** — `legal` content collection (raw HTML in Markdown, not
re-authored markdown syntax).
**Buildable today** — yes. A third legal page is a new `legal` collection
entry plus a three-line adapter page.

### Imprint
**Routes** — `/imprint` (one page).
**Layout** — `ContentLayout` (`heading="Imprint"`).
**Surface** — `ml`.
**Sequence** — the band's h1, then a hand-rolled three-column fact grid
(address, commercial register, representatives) in the `.prose` column.
**Required data** — `lib/constants` (`COMPANY_ADDRESS`).
**Buildable today** — no, deliberately. This page is a fact grid, not the
long-form legal-body shape the other `ContentLayout` consumers render, so it
was kept out of that shape on purpose rather than forced to fit.

---

## Product

### Homepage
**Routes** — `/` (one page).
**Layout** — `BaseLayout`.
**Surface** — `unified`.
**Sequence** — six Labs sections in order: `LabsHero`, `LogoMarquee`,
`ProductDoors`, `FeatureGridPanels`, `CustomerStoryCards`, `LabsCloseCta`.
**Required data** — `lib/labs-home.ts`; `lib/homepageJsonLd.ts`.
**Buildable today** — yes. Every section is a registered `labs.*` component
(see `docs/agent-reference/labs-shell.md`).

### Pricing
**Routes** — `/pricing` (one page).
**Layout** — `BaseLayout` (`app="labs"`).
**Surface** — `unified`.
**Sequence** — `LabsBand` (short: eyebrow / h1 / deck), `PricingPlanCards`
(the two-workspace toggle driving every `[data-workspace-panel]` on the
page; plan cards with a usage slider on the Scale card), a per-workspace
`PricingTable`, a per-workspace `LabsFaq`, `ProductDoors` (Pro inclusions),
a page-local startup banner, a page-local compliance section (ZenML
workspace only), a page-local stats/trust section (a `LabsStoryCard` quote
plus a static logo grid), then `LabsCloseCta`.
**Required data** — `lib/pricing.ts`; `lib/pricingJsonLd.ts`.
**Buildable today** — mostly. `LabsBand`, `PricingPlanCards`, `PricingTable`,
`LabsFaq`, `ProductDoors` and `LabsCloseCta` are all registry templates; the
startup banner, compliance section and stats/trust section stay page-specific.

### Features hub
**Routes** — `/features` (one page).
**Layout** — `BaseLayout` (`app="labs" product="zenml"`).
**Surface** — `ml`.
**Sequence** — `LabsBand size="short"` (eyebrow "Features", headline and
deck from `FEATURES_HUB_HERO`), a grid of the 7 `labs.feature-card` tiles
(from the hardcoded `HUB_CARDS` list, not a collection — the whole card is
the link, no icon), then `LabsCloseCta` (`FEATURES_HUB_CLOSE`).
**Required data** — `lib/features.ts` (`HUB_CARDS`, hero/close copy).
**Buildable today** — yes. `LabsBand`, `labs.feature-card` and
`LabsCloseCta` are all registry templates; the page supplies the card list.

### Feature detail
**Routes** — `/features/<slug>` — one per published feature page (12 pages).
**Layout** — `BaseLayout` (`app="labs" product="zenml"`).
**Surface** — `ml`.
**Sequence** — a breadcrumb + `LabsBand size="short"` (category eyebrow,
title, deck), an optional framed figure (a drawn `labs.highlights` figure on
the five slugs `FEATURE_HIGHLIGHT_FIGURES` maps, else the entry's own
`hero.image`), a content-driven sequence of blocks (`labs.feature-split` for
a `kind: "value"` block, `labs.compliance-card` for a `kind:
"complianceBanner"` block — a block that omits a field falls back to
`FEATURE_COMPLIANCE_DEFAULTS`), an optional `LabsStoryCard kind="quote"`
testimonial, and an optional `LabsCloseCta` (`FEATURE_DETAIL_CLOSE`, gated
on the entry's `showFinalCta`).
**Required data** — `feature-pages` collection; `src/lib/features.ts`
(highlight-figure map, compliance defaults, close copy);
`src/components/labs/highlights` (the five drawn figures).
**Buildable today** — yes. Every block is a registry component (`LabsBand`,
`labs.feature-split`, `labs.compliance-card`, `LabsStoryCard`,
`LabsCloseCta`, the `labs.highlights` figures); the page supplies the
frontmatter and picks which template a block renders through.

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
**Layout** — `BaseLayout` (`app="labs"`, `product="zenml"`).
**Surface** — `ml`.
**Sequence** — `LabsBand` (short: eyebrow / h1 / deck, plus a pointer line
to Kitaru's own start page), `ProcessSteps` (`skin="labs"`, the ZenML
walkthrough on the `labs-light` Shiki theme, wrapped in the code-pane markup
`initCodeCopy()` wires), a page-local architecture section, a page-local
projects grid, a page-local resources grid, then `LabsCloseCta`. There is no
ZenML/Kitaru chooser on this page any more — Kitaru's own onboarding lives
on `/product/kitaru`.
**Required data** — `lib/getStarted.ts`; `projects` collection (fallback
data); Shiki highlighter config (`labs-light` theme).
**Buildable today** — mostly. `LabsBand`, `ProcessSteps` and `LabsCloseCta`
are registry templates; the architecture section, projects grid and
resources grid stay page-specific.

### ZenML Pro
**Routes** — `/pro` (one page).
**Layout** — `BaseLayout` (`app="labs"`).
**Surface** — `unified`.
**Sequence** — `LabsHero` (landing band), `LogoMarquee`, a page-local
unified-pitch grid, `CustomerStoryCards` (quote-card arrangement),
`LabsValueProps` (onboarding), `LabsFeatureTabs` (cloud features), a
page-local compliance section (shared markup with `/pricing`),
`LabsValueProps` (OSS-vs-Pro), `LabsFaq`, then `LabsCloseCta`.
**Required data** — `lib/pro.ts`.
**Buildable today** — mostly. `LabsHero`, `LogoMarquee`, `CustomerStoryCards`,
`LabsValueProps`, `LabsFeatureTabs`, `LabsFaq` and `LabsCloseCta` are all
registry templates; the unified-pitch grid and compliance section stay
page-specific.

### Open Source vs Pro
**Routes** — `/open-source-vs-pro` (one page).
**Layout** — `BaseLayout` (`app="labs"`).
**Surface** — `unified`.
**Sequence** — `LabsBand` (short: eyebrow / h1 / deck — the hero's CTAs
moved into the grid section and the close band), `LabsValueProps` (the
feature grid), a page-local "subway map" readiness section, `SpecTable`
(`skin="labs"`), then `LabsCloseCta`.
**Required data** — `lib/openSourceVsPro.ts`.
**Buildable today** — mostly. `LabsBand`, `LabsValueProps`, `SpecTable` and
`LabsCloseCta` are registry templates; the subway-map section stays
page-specific.

### Deployments
**Routes** — `/deployments` (one page).
**Layout** — `BaseLayout` (`app="labs"`, `product="zenml"`).
**Surface** — `ml`.
**Sequence** — `LabsBand` (short: h1 / deck — the hero's CTAs move into the
close band), a page-local architecture `Split`, `SpecTable` (`skin="labs"`),
three page-local scenario `Split`s (alternating media side), a page-local
methods grid, `LabsFeatureTabs` (the deployment-architecture tabs) with a
page-local feature grid beneath it, then `LabsCloseCta`.
**Required data** — `lib/deployments.ts`.
**Buildable today** — mostly. `LabsBand`, `Split`, `SpecTable`,
`LabsFeatureTabs` and `LabsCloseCta` are all registry templates; the
architecture/scenario copy blocks, the methods grid and the feature grid
stay page-specific.

### Cloud features
**Routes** — `/cloud-features/ml-models-control-plane` (one page; a
dedicated page, not a redirect into the `/features/<slug>` family).
**Layout** — `BaseLayout` (`app="labs"`, `product="zenml"`).
**Surface** — `ml`.
**Sequence** — `LabsBand` (short, with the page's `Breadcrumb` as its first
child, then eyebrow / h1 / deck), a page-local hero image, three page-local
`Split` sections (alternating media side), then `LabsCloseCta`.
**Required data** — inline constants in the page itself (no content
collection).
**Buildable today** — mostly. `LabsBand`, `Breadcrumb`, `Split` and
`LabsCloseCta` are registry templates; the hero image block and the three
feature sections stay page-specific.

---

## Chrome & utility

### Company
**Routes** — `/company` (one page).
**Layout** — `BaseLayout` with `app="labs"`, `surface="unified"`,
`LabsPageHeader`, and `BlogNewsletterCta`.
**Surface** — `unified`.
**Sequence** — short centered Labs header, `labs.editorial-section` about
block, `labs.values-grid`, `labs.people-roster`, `labs.open-roles`, and the
shared newsletter close band.
**Required data** — `lib/company.ts`; `team` collection.
**Buildable today** — yes. The route composes the registered Labs family
components and maps company/team data without page-specific section markup.

### Team index
**Routes** — `/team` (one page).
**Layout** — `BaseLayout` with `app="labs"`, `surface="unified"`,
`LabsPageHeader`, and `BlogNewsletterCta`.
**Sequence** — short centered Labs header followed by `labs.people-roster`
using the shared published-team reader, then the newsletter close band.
**Required data** — `team` collection; `lib/team` (`getPublishedTeamMembers`).
**Buildable today** — yes. A new people index is composition around the
shared roster and Labs shell.

Per the approved visual review, individual team-member pages are outside the
company-family scope (an intentional exception to #321's original route list). Roster
cards do not link to profiles; legacy `/team/<slug>` URLs redirect permanently
to `/team` and are excluded from the sitemap. Team collection records remain
the source for both the Company and Team rosters.

### Careers
**Routes** — `/careers` (one page).
**Layout** — `BaseLayout` with `app="labs"`, `surface="unified"`,
`LabsPageHeader`, and `BlogNewsletterCta`.
**Sequence** — short centered Labs header with scoped CTA analytics,
`labs.editorial-section` mission block, `labs.values-grid` benefits,
`ProcessSteps(layout="compact-list", numeralStyle="zero-padded", skin="labs")`,
`labs.open-roles`, then the newsletter close band.
**Required data** — `lib/careers.ts`; `lib/company.ts` (`OPEN_POSITIONS`).
**Buildable today** — yes. The page is composed from shared Labs components
plus the registered `ProcessSteps` arrangement.

### Contact
**Routes** — `/contact` (one page).
**Layout** — `ContentLayout` (`heading="Contact ZenML"`).
**Surface** — `unified`.
**Sequence** — the band's h1, then long-form prose (email, community Slack,
sales/demos, office address) in the `.prose` column — no sections beyond the
layout's prose wrapper.
**Required data** — `lib/constants` (`COMPANY_ADDRESS`, `CONTACT_EMAIL`).
**Buildable today** — no. Nothing here comes from the registry; it's plain
prose in `ContentLayout`, same shape as `/imprint` but without even the fact
grid.

### Docs hub
**Routes** — `/docs` (one page).
**Layout** — `BaseLayout` (`app="labs"`).
**Surface** — `unified`.
**Sequence** — `LabsBand` (short: eyebrow / h1 / deck), `ProductDoors` (the
ZenML docs / Kitaru docs cards, each with its own quick-link rows), a
page-local resources grid, then `LabsCloseCta`.
**Required data** — inline constants in the page itself (`PRODUCTS`,
`RESOURCES` — no content collection).
**Buildable today** — mostly. `LabsBand`, `ProductDoors` and `LabsCloseCta`
are registry templates; the resources grid stays page-specific.

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
**Surface** — `unified` (passed explicitly). The page renders under the
root `data-app="labs"` scope like every other route — the brand scope is a
separate axis from the analytics surface.
**Sequence** — generated sections: design tokens, type scale, spacing scale,
a live-rendered stage for every built registry entry that doesn't opt out
via `stage: false` (via `TemplateStage`, using each entry's
`demoProps`/`demoSlots`) — the eight `comparison.*` entries do opt out,
since they render through the shared comparison dispatcher rather than as
standalone templates — and a rules section parsed from `DESIGN.md`.
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
| Open Source vs Pro (`/open-source-vs-pro`) | no | the comparison table is reused by import only; grid and subway-map sections are one-off |
| Kitaru comparison pages (`/compare/kitaru-vs-*`) | partial | Labs shell and every visual section are registered; competitor-specific inline graphics remain authored in MDX |
| ZenML MDX comparison pages (`/compare/zenml-vs-*` in `compare-zenml`) | partial | Labs shell and every visual section are registered; competitor-specific inline graphics remain authored in MDX |
| Book Your Demo (`/book-your-demo`, `/book-your-demo/kitaru`) | no | `BookingExperience` covers the whole page and takes a brand, so another variant of this shape is cheap — but it sits outside the registry, and a differently-shaped conversion page gets nothing from it |
| Newsletter signup (`/newsletter-signup`) | yes | `ConversionShell` (`frame="form"`) wrapping `BrevoNewsletterForm`, single centred column |
| Success pages (`/booked`, `/book-success`, `/newsletter-success`) | yes | `ConversionShell` (`frame="success"`), band-only thank-you shape |
| Imprint (`/imprint`) | no | deliberately a fact grid inside `ContentLayout`, not the legal pages' long-form shape |
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
