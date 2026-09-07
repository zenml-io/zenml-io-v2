# Adding a missing ServiceLogo mark

Sub-flow for when a VS card needs a competitor whose `ServiceLogo/<slug>` is not in
`references/service-logo-keys.md` and not found by the two lookups the Fallback rule already tries
(an existing instance's `mainComponent.key`, or an **exact** `search_design_system` /
`get_libraries` hit on `ServiceLogo/<slug>`). Read `references/traps.md` first (Hashi-active-file
trap, republish gate) if this is the first Figma write of the session.

Contract every mark must satisfy (`shared/hashi/scripts/normalize-service-logo.mjs` in the
monorepo): 24x24 viewBox, one dominant ink shape ~20px on its longer edge, centred at (12,12),
tolerance 0.1. `DOMINANT_SIZE = 20`, `CENTER = 12` in that script.

## Sourcing order

Icon **mark** only — never the wordmark. Full color. Reject: a monochrome recolor of a color
brand mark, an `<image>` raster embed, a stale/aggregator mark that doesn't match the brand's
current identity. Stop at the first source that yields a real candidate; still look at every
candidate a step returns before picking (some steps return more than one).

**Domain given for the brand isn't proof it's live.** If a slug/brief names a domain for the
product, load it first — a name-matching domain can be a parking page for a since-renamed or
since-acquired product (verified 2026-09-07: `tracely.ai` was a parking page; the real product
lived at `tracely-ai.com`). When the named domain is dead, find the product's real site (search the
product name + a distinguishing phrase from the brief, e.g. its tagline or category) before falling
back to step 5's GitHub-org search. Record whichever URL the mark actually came from in the
component description (M1 does this automatically from `P.sourceUrl`) — a sourced-from-a-different-
domain-than-briefed mark is not wrong, but it is a judgement call a human should confirm before the
republish (list it explicitly in the end-of-run follow-ups, not just in the description).

1. **Iconify `logos`** — `https://api.iconify.design/logos/<slug>.svg` and the icon-only variant
   `https://api.iconify.design/logos/<slug>-icon.svg`. Try both; `-icon` is the common "mark
   without wordmark" convention in this set.
2. **Iconify `devicon` / `selfhst`** — `https://api.iconify.design/devicon/<slug>.svg` and
   `https://api.iconify.design/selfhst/<slug>.svg`.
3. **SVGL search** — `https://api.svgl.app?search=<display name>`. Response is a JSON array of
   `{title, route, wordmark?, ...}`. Filter to entries whose `title` plausibly matches the slug
   (normalize both to `a-z0-9` + hyphens and compare); take `.route` (a string, or `{light, dark}`
   — either works), **never `.wordmark`**. `{"error": "..."}` or an empty array means no hit.
4. **LobeHub `-color`** — `https://unpkg.com/@lobehub/icons-static-svg@latest/icons/<slug>-color.svg`.
   If the slug has hyphens, **also** try the hyphen-stripped form:
   `https://unpkg.com/@lobehub/icons-static-svg@latest/icons/<slugnohyphens>-color.svg` — LobeHub's
   own naming often drops them (verified 2026-09-07: `pydantic-ai-color.svg` 404s,
   `pydanticai-color.svg` is the real hit). `source-mark.sh` tries both automatically.
5. **The brand's own site / GitHub org** — not automated, needs judgement. List the repo tree:
   `https://api.github.com/repos/<org>/<repo>/git/trees/<branch>?recursive=1` and filter paths
   containing `logo|icon|brand|mark|assets/`. Pull the SVG with a raw GitHub URL
   (`https://raw.githubusercontent.com/<org>/<repo>/<branch>/<path>`), or from the brand's site
   `/favicon.svg` / a linked brand-assets page if the repo has nothing. If the org/repo tree comes
   up empty (the mark lives somewhere else, or under a name that doesn't match the slug), try a
   `gh api` code search by filename before giving up: `gh api -X GET search/code -f
   q='filename:<slug> extension:svg'` and again with the hyphens stripped
   (`filename:<slugnohyphens> extension:svg`) — prefer a hit that lives inside the brand's own
   GitHub org over a third-party copy (verified 2026-09-07: this is what actually found the
   Semantic Kernel mark, inside Microsoft's own PowerToys repo, after the plain tree listing on
   `microsoft/semantic-kernel` came up empty). This step is manual either way: decide which file is
   the icon mark, download it, then continue at Pre-fix below.

`scripts/source-mark.sh <slug> [<display name>]` automates steps 1-4: it fetches every URL, keeps
only real SVG bodies (a non-200 or a body that doesn't start with `<svg` is dropped), renders each
to a PNG (`render-svg.ts`, 256px wide) next to the SVG under
`.cache/marks/<slug>/candidates/<source-tag>.{svg,png}`, and prints a table. It always exits 0 —
an empty table means "no automatic candidate", not an error; fall back to step 5 by hand. **Open
the PNGs and look before picking** — a URL matching by name is not proof the content is right (a
same-named but wrong-brand mark, a wordmark that slipped past the icon-only endpoints, a blank
render). Never normalize a candidate you have not looked at.

## Pre-fix checklist for a raw candidate SVG

The normalizer does **not** fix these — resolve them by hand in the raw SVG before running
`normalize-mark.sh`, or it will fail or silently misnormalize:

- **CSS-class fills** (`<style>.a{fill:#123}</style>` + `class="a"` on paths) — inline the fill as
  a `fill="#123"` attribute on each path and drop the `<style>` block.
- **Empty `fill=""` attributes** — either delete the attribute (falls back to the element's
  default/inherited fill, usually black) or set it explicitly from the source design.
- **Missing `xmlns`** — add `xmlns="http://www.w3.org/2000/svg"` on the root `<svg>` if absent;
  some raw exports (GitHub raw fetches especially) omit it and Figma's `createNodeFromSvg` can
  reject the import.
- **`currentColor`** — Figma imports `fill="currentColor"` as solid black, silently losing the
  brand color. Replace every `currentColor` with the actual hex from the brand's own palette
  before normalizing.

## Normalize

```
scripts/normalize-mark.sh <raw-or-fixed.svg> <slug> [--no-monorepo] [--force]
```

Resolves the monorepo checkout from `$ZENML_FRONTEND_MONOREPO` (env var, else read from this
repo's `.env`), falling back to `<repo>/../zenml-frontend-monorepo`. Set
`ZENML_FRONTEND_MONOREPO` in `.env` if the checkout lives somewhere else.

Runs the monorepo's `normalize-service-logo.mjs`, which rewrites the viewBox to `0 0 24 24`,
wraps the art in one `translate`+`scale` `<g>`, and self-verifies dominant/centre before it will
print success. Prints the normalizer's JSON (`sourceBox`, `ink`, `transform`, `verified: {dominant,
cx, cy}`) — read it; `verified.dominant` should read ~20 and `cx`/`cy` ~12/12 (exact, since this is
the normalizer's own check, not Figma's looser re-measurement in M2). A non-zero exit means the
contract could not be met by transform alone (art not centred in its own bounds, wildly
non-square ink, etc.) — fix the raw SVG's geometry, don't fight the normalizer.

Writes `.cache/marks/<slug>/<slug>.svg` (normalized) and `.cache/marks/<slug>/<slug>.preview.png`
(what the normalizer itself renders — a second look, independent of `source-mark.sh`'s candidate
PNG). Unless `--no-monorepo`, also copies the normalized SVG to
`shared/hashi/assets/service-logos/<slug>.svg` in the monorepo — refuses to overwrite an existing
file there unless this script's own `--force` is passed (distinct from the normalizer's internal
`--force`, which only ever touches the scratch cache dir and is always on).

## Visual acceptance

Look at `.cache/marks/<slug>/<slug>.preview.png` (and, once M1 has created the component, the mark
itself in Figma). **Do not use `get_screenshot` for this** — on a 24x24 component it returns a
literal 24px PNG (`maxDimension` caps the longer edge and never upscales, `references/traps.md`
"Export"), too small to judge anything. Instead run a separate read-only `use_figma` call that
returns `await node.screenshot({ scale: 8 })` for the component id M1 returned (192x192,
verified 2026-09-07) and look at the resulting image. Geometry passing is **necessary, not
sufficient**: a flattened/blank mark, a wrong-brand recolor, or clipped art can still measure
"correct" by dominant/centre alone (`references/traps.md`). Reject and re-source if the mark
doesn't actually look like the brand's icon.

## Figma creation (M1 / M2)

Same paste convention as every other script in this skill
(`scripts/figma/paste.mjs <m*.js> P.json out.js`, SKILL.md Steps) — never hand-edit `P`, never
paste by hand. Both gate on page `731:2` reading back as `"Service Logos"` (see
`references/traps.md`, Hashi-active-file trap) before touching anything.

**M1** `scripts/figma/m1-create-mark.js` — `P = {slug, svg, sourceUrl, date, force?}`. `svg` is
the **normalized** string (`.cache/marks/<slug>/<slug>.svg`), never a raw candidate. Refuses to
duplicate an existing `ServiceLogo/<slug>` unless `P.force`: without it, returns the existing
`{id, key}` and stops (this is the common case — a mark added in an earlier aborted attempt).
With `force: true`, removes the existing component and recreates it **at the same grid slot**
(never re-appended, which would leave a hole). A fresh mark goes at the next free index — `40 +
72*(i%10), 110 + 72*floor(i/10)`, `i` = count of existing `ServiceLogo/*` at call time (read live,
never assumed — read it fresh, the count is not cached anywhere in this skill). Steps inside:
`createNodeFromSvg` → `constraints = {horizontal:'SCALE', vertical:'SCALE'}` on the imported root
and every descendant → `createComponentFromNode` → name `ServiceLogo/<slug>`, description
`source: <sourceUrl> · added <date> via figma-blog-cover` → position. Everything but the
constraints loop is ≤10 ops and fits one call as usual. **The constraints loop itself is a
deliberate, documented exception** to the S2/S4 `BUDGET`-with-`pending` chunking convention (see
`references/traps.md`): it is uncapped because componentization needs every descendant
constrained first and there is no resumable handle on the still-unparented imported node across
calls. A normalized 24x24 mark with one dominant shape can still import with well over 10 vector
leaves, so this single call's write-op count can exceed 10 by design — rationale is inline in
`m1-create-mark.js` above that loop. Returns `{id, key, index, x, y, leafBounds, existed, created}`.

**M2** `scripts/figma/m2-verify-mark.js` — read-only, `P = {id}`. Re-measures the union of leaf
vector bounds relative to the component's own origin (never `absoluteRenderBounds` on the
component itself — on a `clipsContent` frame that returns the frame's rect, not the ink; see
traps.md). Returns `size`, `leafCount`, `leafBounds`, `dominant`, `centre`. Expect "close to 20 /
close to (12,12)", not an exact match — Figma's geometry engine and resvg's raster measurement
(what the normalizer used) can disagree by more than the normalizer's own 0.1 tolerance on
identical artwork. A value wildly off (dominant < 10 or > 24, centre nowhere near (12,12)) means
something went wrong in M1 — a clipped import, a leaf the SCALE-constraint loop missed — not that
the normalizer's earlier check was wrong. This is a sanity re-check, never a substitute for
looking at the mark (Visual acceptance above).

## Record the key

```
pnpm exec tsx scripts/append-key.ts <slug> <key>
```

`<key>` is M1's (or the pre-existing lookup's) `component.key`. Idempotent: same slug + same key
is a no-op; same slug + a different key updates in place with a printed warning (unusual, worth
noticing); a new slug is inserted keeping the table sorted. Do this every time a key is found,
whether from M1, from an existing instance's `mainComponent.key`, or from an exact
`search_design_system` hit — an unrecorded key does not exist for `find-slot.ts` next time
(traps.md, "Process").

## Republish gate

A new or replaced component is **not usable from the templates file** (or any other file that
imports Hashi as a library) until a library editor republishes Hashi through the Figma UI — no
API path does this. `use_figma` cannot trigger or detect a republish. After M1/M2 pass and the
key is recorded, this sub-flow is done on the automation side; it does not wait for or attempt the
republish itself.

## Follow-ups to list at the end of every run

1. **Marks awaiting republish** — every `ServiceLogo/<slug>` created or replaced this run, by name,
   with a one-line "ask a Hashi library editor to republish before using these in a VS card."
2. **Monorepo commit** — the normalized SVG(s) written to
   `shared/hashi/assets/service-logos/<slug>.svg` are new untracked files in the monorepo working
   tree; committing them is a separate, deliberate step (never run git in the monorepo
   automatically — 804 uncommitted files live there already; adding an SVG is allowed, running git
   is not).
3. **FIGMA-PARITY.md counts** — if that doc tracks a total mark count or an inventory list, it is
   now stale by the number of marks added; flag it, don't edit it silently.
4. **Sourced-from-a-different-domain marks** — any mark whose actual source URL doesn't match a
   domain the brief/slug implied (the "Domain given for the brand isn't proof it's live" case
   above): name the slug, the URL actually used, and why (dead/parked domain), and ask for a human
   confirm before republish — a wrong-brand mark reaching the templates file is worse than a slow
   one.
