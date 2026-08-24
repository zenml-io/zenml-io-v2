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

- `letter-spacing: 0` binds to hero display sizes **only**; every other size
  keeps its ladder tracking.
- List/bullet marker slots are sized to optically center the marker on the
  first line of body text — whenever body size changes, the marker slot moves
  with it.

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

- **The hex corner is a treatment, not a card** (#91). It is a fixed 80px
  hexagon anchored to the box corner; it does not scale with the card. Any
  card may take it regardless of content, with a minimum host box of
  240×140px.
- **Footer**: the dark-band footer ships on every route. The giant-wordmark
  footer is an opt-in variant for home/landing pages only (#57) — never the
  site default.
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

## Motion and atmosphere

- **At most one ambient/atmospheric section per page** — shader backdrop,
  grain field, or glow wash. A second ambient section on the same page is a
  review blocker, not a taste call.
- Every new section adopts the site scroll-reveal pattern: revealed section,
  staggered children.
- All motion honors `prefers-reduced-motion`.

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
