# Design Rules

This file holds the design judgment rules that cannot be derived from code:
the decisions a contributor or agent needs while building or editing
templates, which no token value or type signature can express.

**What does NOT belong here:** token values, the component inventory, type
scale numbers, spacing values. Those live in code (`src/styles/global.css`
`@theme`, `src/lib/templates/registry.ts`) and render at `/styleguide`, which
is generated from code and never hand-written — a second copy here would only
drift. If a rule can be enforced by `pnpm check:registry`, it belongs in that
script, not in prose.

Citations like "(#N)" reference an internal design-decision log that is not
public. Every citation restates its rule inline — the number is provenance,
not a pointer anyone needs to follow.

## Logos and wordmarks

- The ZenML wordmark is custom slab/stencil-serif artwork. **Never typeset it
  in any font** — not the display face, not anything (#10). Always inline the
  checked-in SVG assets (mark, wordmark, horizontal lockup).
- The same rule applies to the Kitaru wordmark: SVG artwork only.
- Never "fix", restyle, or re-draw logo artwork to resolve a review finding.
  If a logo looks wrong, escalate to a human instead.

## Typography roles

The stack is three faces plus one carve-out, split strictly by role (#6):

- **Borna** — display and headings.
- **Rethink Sans** — body and general UI text.
- **Nudica Mono** — eyebrows, buttons, labels, tabs, and filter-chip counts.
  Uppercase where the design uses it as a label voice.
- **JetBrains Mono** — code blocks and code spans, and nothing else. Nudica
  never renders code; JetBrains never renders UI labels.

Additional rules:

- Borna is **always tracked at −2%** (`-0.02em`; the `--tracking-heading`,
  `--tracking-display` and `--tracking-prose` tokens all bind to it) at every
  size. Body and label faces keep their own ladder tracking — this rule is
  Borna-only. (Supersedes the size-scaled −2%/−4% ladder and the earlier
  "letter-spacing 0 on hero display" rule.)
- Every headline and card title renders in **Borna at weight 500** — the
  `labs` scope applies weight and tracking to the display role itself, so a
  call site sets size and colour only and never restates weight or tracking.
  A title in the body face is a defect, not a variant.
- **Rethink Sans body text is weight 400.** Bold is an explicit, local choice
  (a `<strong>` or a stated utility), never the default weight of a block.
- List/bullet marker slots are sized to optically center the marker on the
  first line of body text — whenever body size changes, the marker slot moves
  with it.

- **Blog routes set the UI-text direction** (blog cutover, 2026-09): on
  `/blog`, posts and the category/tag/author hubs, every UI label — meta
  rows, filter rail, chips, table-of-contents, code-pane bars, table heads,
  pagination — renders in Rethink Sans, sentence case, no letter-spacing.
  Nudica Mono uppercase survives there only in the shared shell chrome
  (floating nav, `LabsButton` pills, footer) and as the numbered-list marker
  inside prose, which is a design mark rather than UI text. Other surfaces
  keep the label voice above until their own cutover.

## Color usage

- **Eyebrow color splits by surface**: the dark sage eyebrow color on light
  surfaces, the cream eyebrow color on dark surfaces. The mid sage `#5D7545`
  is never used as text — it fails contrast everywhere it was tried.
- **On tint bands** (sections washed with the light sage tint), text and
  border colors step to their darkened on-tint overrides. The base palette
  text/border colors do not pass on the tint; do not use them there.
- **Kitaru orange** has exactly three sanctioned forms: text is always
  `#995000` (passes AA on both cream and the orange tint); the bright
  `#EB7119` is icon- and logo-only, never text; the tint `#FBE8DB` is the
  background wash. Orange never appears as a generic accent on ZenML or
  unified surfaces, and a Kitaru surface gets **at most one** bounded orange
  accent moment per page — restraint equal to ZenML surfaces, not a louder
  sibling.
- **Purple/magenta is tertiary only**: sparing, never on large surfaces,
  never part of brand identity, and never adjacent to Kitaru surfaces.
- **No cross-brand gradients or palette mixing** — the ZenML and Kitaru
  palettes never blend in one surface.
- **Blue accent** uses the ramp values only: tint `#E1F1F4`, text `#157A8E`.
  Off-ramp custom blues were measured and fail AA.

## Layout and structure

- **The hex corner is a treatment, not a card** (#91). It is a fixed-size
  hexagon anchored to the box corner; it does not scale with the card. At
  rest it is tucked into the corner as a wedge (the 80px hexagon rotated
  30°, mostly clipped by the card's radius) with a reduced arrow centred in
  the visible part; on hover it walks into the card at half size (~40px),
  upright, the arrow full size at its centre, and the card flips to the
  dark surface (blog cutover, 2026-09). Any card may take it regardless of
  content, with a minimum host box of 240×140px.
- **Footer**: the dark-band footer ships on every route. The giant-wordmark
  band is retired (blog cutover D4) — there is no variant that renders it;
  every route gets the tagline + link columns + legal row.
- **The floating nav sits on the content column** (blog cutover): the pill
  hangs off the same centered container as every section, so the logo's left
  edge lines up with the page's headings and the signup pill's right edge
  with the container's right edge; the pill's border and fill extend past
  the column by exactly its own inner padding. Below the `lg` breakpoint the
  pill stays flush inside the gutter.
- **Input shells split by context**: labelled form fields are 10px-radius
  rectangles; inline single-field captures (newsletter, waitlist) are pills.
- Interactive targets are at least 44px on mobile, using invisible hit-slop
  where the visual design is smaller.
- **Absence collapses**: templates never expose boolean presence props
  (`hasImage`, `showEyebrow`, `variant="no-cta"`). Omitting the content
  collapses its slot. A prop that exists only to hide something is a design
  smell caught in review.
- Clickable elements always get `cursor-pointer` — browsers do not default
  `<button>` to it.

- **Interior-page header band** (blog cutover; the default for every
  family that follows, ruled 2026-09-10): every blog route — the
  index, each hub and the post masthead — opens on the short shader band
  (`LabsBand` size `short`: the grain backdrop at roughly 40% of the
  viewport, nav clearance built in). The band ends in a 1px `--color-border`
  hairline and the first content element starts 64px below it on desktop,
  40px on mobile; nothing overlaps the band. A Kitaru post's band, and the
  Kitaru category and tag hubs, run a slower, quieter cut of the Kitaru product
  page's grain palette instead of the Labs one (the band's `grain` axis); every other hub and the
  index stay on the Labs grain. The landing
  size stays the full-height opener of `/` and the product pages. As the
  remaining families move onto the Labs shell (the research databases,
  integrations and features, company pages, the product one-offs) their
  index, detail and hub pages open on this same band by default — the
  band's slot carries the page's breadcrumb, eyebrow, heading and deck,
  exactly as the blog hubs do — and reuse the blog's components (the
  accordion facet rail, the entry cards, the term-hub templates, the
  sentence-case UI text) rather than restyling their own. A page departs
  from this shape only by an explicit ruling.
- **Sticky breadcrumb row on long-form detail pages** (blog cutover): the
  breadcrumb is the first element under the band, in the article lane on
  the page's own ground — no bar, no rule. From the `lg` breakpoint up it
  sticks flush under the floating nav (nav bottom 108px) while the body is
  on screen and releases when the body ends; it never rides through the
  tags, author, prev/next or related blocks. A short eased fade under the
  row, spanning the prose column only, dissolves copy passing beneath it;
  the table-of-contents rail beside it is never washed. Below `lg` the row
  is static and there is no fade. The offsets move together: nav 108px,
  row 44px + 8px, so the table of contents and every heading's anchor
  offset sit at 160px on desktop and 108px (nav only) below `lg`. There is
  one implementation of this row, `labs.sticky-breadcrumb`, mounted by the
  post layout and by the database entry template — never copied markup.
- **Closing band on every blog route**: the index, every post and every hub
  end on the dark sage close band (one headline, one pill, the newsletter
  card) with the same `client:idle` grain backdrop as the homepage close —
  the header band is the page's one always-on ambient island, the close
  only needs to be present. Families that move to the Labs shell after the
  blog end on this same close band by default (the research databases pass
  their own newsletter-card copy and list; nothing else changes).
- **Entry rows, not cards** (databases cutover, 2026-09): a research-database
  entry has no image, so an index or hub result is a row — title, one meta
  line (company · year · industry), a two-line summary and up to three
  hexagon chips with a "+N" pill — separated from its neighbours by a
  `--color-border` hairline. Hover and focus-within paint a very light
  `--color-sage-50` wash across the row, reveal a chevron centered on the
  row's right edge, and
  draw a 1px underline under the title that sweeps each line left to right in
  reading order; there are no borders that appear on hover and no coloured
  strips. The row root is not a link: the title link is stretched over the
  row and the chips stay real controls above it.
- **Summary box**: an entry's abstract is a callout on `--color-sage-50`
  with a `--color-border` hairline, 12px radius and body text in the
  foreground colour, labelled "Summary" in sentence case. The databases
  carry no third colour; sage and cream only.
- **Tag chips on an entry**: the first nine render, the rest sit inside a
  native `<details>` whose summary is the "+N more" chip, so every chip is
  reachable without JavaScript.
- **Hub pagination keeps pages small**: a term hub renders its first page
  (24 rows) in HTML and loads later pages from the collection's JSON index
  on demand, under one canonical URL with `?page=N`. No hub page may exceed
  2 MB of HTML (`pnpm smoke:dist` enforces it for the two largest).
- **Zero results name the constraints**: the labs empty state counts and
  names every active filter and offers each one back as a chip carrying the
  real number of entries that dropping it returns (plus "Match any" when two
  or more tags are ANDed), on a block of reserved height so the results
  column does not jump.
- **Kitaru posts carry the Kitaru accent**: a post whose category or tags
  include `kitaru` sets `data-product="kitaru"` and re-points the
  `--blog-accent*` custom properties (default sage) to the orange ramp —
  links, chips, the table-of-contents marker, card hover border — and shows
  a "Kitaru" pill in its meta row and on its cards (the pill stands in for
  the category link when the category is itself Kitaru). The accent
  travels through those variables only; no component hard-codes orange for
  a post. The "Continue reading" block is exempt: its band, halos and
  hexagons stay sage on every post.

- **FAQ rows**: a FAQ is a stack of native `<details>` rows on the prose column width, separated by `--color-border` hairlines — question in Rethink Sans sentence case, a chevron that turns when the row opens, the answer in body type. One heading per FAQ; eyebrows and sub-decks are not rendered. There is one implementation, `labs.faq`; the pricing page mounts one per workspace panel.
- **The highlighted plan card**: the recommended pricing plan is marked by a 1px `--color-sage-400` border and a sentence-case "Recommended" pill on the card's top edge — never a shadow, never a coloured strip. On the Kitaru workspace panel the same card turns `--color-orange-300` with the pill on `--color-orange-600`; that pill and border are the panel's one bounded orange moment, every pill on the panel stays ink.
- **Hub rows with marks**: a comparison-hub row is an entry row (see "Entry rows, not cards") with a 24px competitor mark leading the title; the mark is `object-contain` and takes no border or tile. The Kitaru block of the hub sits under `data-product="kitaru"` so the row's accent variables carry the orange ramp; there is no orange band behind it.
- **Comparison tables on the Labs shell**: every pricing or feature comparison renders through `data-display.spec-table`'s labs skin — 20px radius frame, hairline rows, sticky first column, sage check / cream cross icons, `LabsButton` pills in the action row, section headers in sentence case on the light sage tint. No alternating row tint; the hairline carries the rhythm. (These four rules date from the product one-offs cutover, 2026-09.)

## Responsive contract

Every section is one of two width modes — there is no third option:

- **Centered.** Content caps at the content-width token (1524px) with the
  fluid gutter token (`clamp(16px, 3vw, 48px)`) on each side. The box tops
  out at 1620px, is auto-centered, and is fully fluid below that. No
  breakpoint participates in the container itself — width and gutter are
  continuous functions of viewport, not a step function.
- **Full-bleed.** Spans the entire viewport. The canonical breakout is
  `width: 100vw` with `margin-inline: calc(50% - 50vw)`. On desktop
  platforms with a classic (space-taking) scrollbar, `100vw` includes the
  scrollbar gutter, which overshoots the visual viewport and creates
  page-level horizontal overflow — so every full-bleed section pairs with
  `overflow-x: clip` on the page root as the named guard. Full-bleed
  sections still center their inner content per the centered mode above
  unless the design is intentionally edge-to-edge.

This supersedes the earlier 1440px content-width convention. Breakpoints
stay as defined in code (stock Tailwind plus the one 2xl override); the
container itself is breakpoint-independent — it never steps. The contract
binds everything built from here on; existing sections migrate to it wave
by wave, not in one sweep.

**Artboard mapping**: design artboards are authored at 375 and 1440. A 1440
artboard reflows into the wider built container — the layout grows, gutters
and columns absorb the extra width — it is never scaled up.

**Every cutover builds from the approved design as reusable, registered,
content-prop components** — never a one-off page-local restyle. A cutover
extends the shared template families (`page-header.*`, `term-hub.*`,
`data-display.*`, …) with new arrangements/skins where the approved design
calls for one, rather than hand-rolling page markup that duplicates what a
registered component already owns.

**Reading measure** (blog cutover): the article body is a 768px prose
column, 20px/32px body copy, with a 224px sticky table-of-contents rail
(40px gap between them) — this is the site's one long-form reading lane.
Code panes are the one block allowed to run past the column edge, to the
lane's outer boundary, per the code-pane rule above. Fenced code renders in
the dark sage Shiki theme on every Markdown surface, not only the blog
(2026-09-09 ruling); the code-pane chrome (language bar, copy button) is
blog-only until the other surfaces are cut over.

One named default per content shape, chosen so nobody has to invent a menu
of options at build time:

- **Wide tables**: horizontal scroll inside the section, an explicit
  `min-width` (never below 600px), a sticky first column, and a visible
  scroll affordance (edge fade or inset shadow) — silent truncation is a
  defect. Card-collapse is never used for comparison matrices; pricing-tier
  cards are the sole sanctioned card-collapse.
- **Diagrams**: a re-authored narrow variant below the medium breakpoint —
  fewer nodes, shorter labels, vertical flow that preserves causal order —
  never a scaled-down wide SVG. A diagram without its narrow variant does
  not ship.
- **Grids**: explicit column steps per grid (e.g. 1 → 2 → 3), stated where
  the grid is defined. `auto-fit`/`minmax` column counts are banned for
  marketing grids — column count is a design decision, not a viewport
  accident. Grids inside the 1524 container state their top step
  explicitly.
- **Code panes**: never wrap, never reflow, never step type below 13px —
  the pane scrolls horizontally inside its own container with the same
  visible affordance as tables. The copy control is pinned outside the
  scroll region and copies the full source, never the visible slice. On
  the smallest screens a code pane may go full-bleed while the surrounding
  prose stays centered.
- **Heroes/headlines**: step down in size, never truncate.
- **Cards and panels keep their air on small viewports.** Inner padding
  never drops below 32px when columns stack, and a panel that loses its
  fixed height gains an explicit gap between its icon row and its text
  instead of collapsing onto it.
- **Section width is the centered container** (`max-w-content` +
  `px-gutter`), never a fixed pixel cap — a narrower cap must be named in
  the design.

The page body never scrolls horizontally; anything wider than its
container scrolls inside its own region.

## Motion and atmosphere

- **Budget: at most 3 motion moments per page.** A moment is any animation
  a visitor would notice as animation. The house scroll-reveal on section
  entry is the baseline and does not count toward it.
- **Every button and pill has a hover transition** — colour only,
  200ms, ease-out, from the shared button component rather than restated at
  the call site. Hover feedback is interaction, not a motion moment, and does
  not count toward the budget.
- **Every card has a hover state** — at minimum the border turns sage
  (`--color-sage-400`, 200ms, ease-out) on every card; Kitaru cards, which
  usually carry orange, turn orange (`--color-orange-300`) instead. Cards
  with a background wash or an image also move it
  (the wash grows from its origin, the image zooms a few percent, 500ms,
  ease-out, compositor properties only, honouring reduced motion). A card
  that does nothing on hover is a defect. Like buttons, this is interaction
  feedback and does not count toward the motion budget.
- **At most one ambient/atmospheric section per page** — shader backdrop,
  grain field, or glow wash. A second ambient section on the same page is a
  review blocker, not a taste call. Enforced by `pnpm check:motion` against
  the built output.
- **Hydrated-island budget: at most 3 islands per page at `client:load` /
  `client:visible`**, not counting the site-wide consent banner. Anything
  beyond hydrates via `client:idle` or `client:media` and carries a written
  justification at its mount site. Enforced by `pnpm check:motion` against
  the built output.
- Every new section adopts the site scroll-reveal pattern: revealed section,
  staggered children.
- **Reduced motion must reveal, never hide.** The server-rendered state is
  visible; scripts add animation on top, they never gate visibility —
  content that needs JS to become visible is a defect. Ambient/WebGL
  treatments must not allocate or draw under `prefers-reduced-motion`;
  frozen-but-still-running does not comply.
- **No simulated typing animations, ever.** A static blinking caret is
  permitted and counts as a motion moment. Count-up numerals are permitted
  only where the final value is server-rendered, so the number is correct
  with JS off and under reduced motion.

- **Nav dropdowns open on hover** (desktop pointers only, with a short
  grace delay so a diagonal move into the panel does not close it); click
  and keyboard open them too and `aria-expanded` always tells the truth.
  Rows reveal as a short stagger — the panel fades and lifts in over
  ~180ms, each row follows ~45ms after the previous — and close at once.
  Under reduced motion the panel appears instantly. On the ZenML Labs nav
  (`LabsNavigation`), Products, Docs, and Case studies all share this one
  behaviour, and opening one closes any other that's open. Nav items hover
  with a `sage-200` fill (also held while a menu is open); menu rows hover
  with a `sage-100` fill plus the existing border/current-row treatment.

## Content and data conventions

- **Exact counts, never rounded**: "5,482", not "5,000+". If the exact figure
  can't be sourced, the stat doesn't ship.
- Multipliers use the "×" glyph, never the letter "x".
- Compliance claims are limited to what is real and citable: SOC 2 Type II,
  ISO 27001, SSO. **GDPR is never rendered as a badge** — it is a legal
  regime, not a certification.
- **Never ship fabricated evidence**: no invented screenshots, terminal
  output, logs, customer quotes, or figures. Real captures or nothing; a
  pending real asset is represented by an honest placeholder, not a
  plausible fake.

## Data visualization

- Charts are single-hue sage. Two series maximum, with direct labels instead
  of legends. Anything beyond two series becomes a table.

## Accessibility floors

- Text contrast ≥ 4.5:1 against the surface it actually sits on — including
  tint bands (`pnpm check:registry` enforces this for registered tokens).
- Non-text UI (borders, icons, focus rings) ≥ 3:1.

## The styleguide

- `/styleguide` is generated from `global.css`, the template registry, and
  the component files — never hand-authored (#93).
- It is **public but unlisted** (#95): a static route with `noindex`, linked
  from no nav, footer, or sitemap. No auth gating.
