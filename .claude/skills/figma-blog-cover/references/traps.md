# Traps

Everything here bit a previous run or was measured in the 2026-09-07 Spike. Read before the first `use_figma` call.

## Ops budget and chunking

- The loaded `figma:figma-use` skill says, verbatim: "**At most 10 logical operations per `use_figma` call.** A "logical operation" is creating a node, setting its properties, and parenting it. If you need to create 20 nodes, split across 2-3 calls." It does not exempt loops: **a loop over N nodes is N operations.** Read-only tree walks over hundreds of nodes ran without complaint — the rule is guidance, not an enforced quota — but writes respect it.
- S2 runs every time (it is idempotent and writes nothing when the column is right); it is the only step that moves the sections below a grown one, so S4 resizing a section is always followed by S2 → S5. S2: at most 10 ops per call — the create (if any) plus section moves; whatever does not fit comes back in `pending`; re-run S2 until it is `[]` (the 2026 column has 8 sections today, so a new-month insert is create + 8 moves = one call). S4: same shape — a section resize (if any) plus child moves, `pending` for the rest (max 20 covers per section → two or three calls).
- S3 cover: create + setProperties + Background.setProperties + appendChild + name/x/y fits one call. S3-vs: 1 create + 2 texts + N swaps, and the script swaps only `P.vs.tileRange` (≤7). For `Count >= 8` find-slot emits `vs.tileBatches = [[0,7],[7,N]]`: run S3-vs with the batch-0 `P`, then re-run find-slot with `--tile-batch 1` and run S3-vs again with that `P`. Never edit `P` by hand.
- M1 (`scripts/figma/m1-create-mark.js`, `references/add-mark.md`) has one deliberate exception to "writes respect it": the per-descendant `constraints = {horizontal:'SCALE', vertical:'SCALE'}` loop before `createComponentFromNode` is uncapped, not `BUDGET`/`pending`-chunked like S2/S4. Rationale (also inline above the loop in the script): componentization needs every descendant constrained first, and the imported-but-not-yet-componentized node has no id the caller can resume from across a second call. A normalized 24x24 mark can still import with well over 10 vector leaves, so this one call's op count can legitimately exceed 10 — reviewed and intentional, not an oversight.
- Re-runs must converge: S1's `siblings` include the target's own live cover, so find-slot excludes `P.slug` from the used-photo set (and from the adjacency neighbours). Before that fix (E2E 2026-09-07) every re-run rotated the background to the next free `Photo 0N` and S3 rewrote the cover each time.
- `P` gets into a script through `scripts/figma/paste.mjs` (`node … paste.mjs <s*.js> P.json out.js`), which replaces the single `const P = __PARAMS__;` line and refuses a `P` with open `questions`. Both E2E runs hand-wrote this helper before it shipped; do not write another one, and never edit the pasted object.
- A year with no column: S1 returns `columnMissing: true`; S2 throws unless `P.allowNewColumn` (find-slot `--allow-new-column`, only after asking).
- Batch independent awaits with `Promise.all` (font loads, `importComponentByKeyAsync`) — the loaded skill asks for this inside loops too.

## Pages and coordinates

- One `await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('174:1785'))` per call, never inside a loop. `174:1785` (Blog Covers) is a PAGE — `0:1` is the Social Media page and holds none of the covers; a script that sets `0:1` and then reads `174:1785` only works because the desktop app already had the page loaded.
- Children of a SECTION use **section-relative** x/y. `child.y - section.y` cannot detect a misplacement; only `absoluteBoundingBox` can. S5 verifies with `absoluteBoundingBox` and nothing else.
- `appendChild` into another section keeps the node's x/y **numbers**, which now mean a different place. Set x/y after reparenting, always.
- A previous batch misplaced 275 covers. The S1 snapshot plus S5 on every touched section guard against a repeat; every position comes from `references/grid.md`, section-relative.

## Fonts

- Load fonts **before** `createInstance`, before `setProperties` on text properties and before `appendChild`/`insertChild` of a subtree that contains them; otherwise `Cannot write to node with unloaded font "<family> <style>"`. Cover: Borna Medium, Nudica Mono Regular, Nudica Mono Medium. VS: plus Borna SemiBold and Rethink Sans Medium. These lists are the Spike's measurement of three Kitaru covers and three VS text nodes — a floor, not a complete list.
- Style strings are exact: `SemiBold`, not `Semi Bold`.
- Creating a new instance: find the exact variant by name and read **its** fonts (`variant.findAll(TEXT)` + `getStyledTextSegments(['fontName'])`) before `createInstance()`; never create from `set.defaultVariant` and switch afterwards — the default variant (`Brand=ZenML, Layout=Text`) was never measured. Then read the fresh instance's fonts back before `appendChild` and any text write. Mutating an existing instance: read its fonts the same way and load those, not a hardcoded list.
- Mixed-weight text (the VS sub-line) is set with `characters` first, then `setRangeFontName`.
- A family/style missing from `listAvailableFontsAsync` → stop and ask. Never substitute.

## Component properties

- Property keys carry the `#id` suffix verbatim: `Title#162:31`, `Subtitle#162:32`, `Eyebrow#162:30`, `Site#162:34`, `Show subtitle#162:33`. `Brand` and `Layout` take the bare variant option.
- The cover's `Background` is an **exposed nested instance**, not an instance-swap property — there is no swap prop to set. `inst.findOne(n => n.type === 'INSTANCE' && n.name === 'Background').setProperties({ Brand, Style })`. (A variant `INSTANCE_SWAP` collapsed to one default when the set was built; that is why.)
- Read `componentPropertyDefinitions` off the COMPONENT_SET (`162:1845`, `150:1697`, `113:300`), never off a variant COMPONENT.
- Layer names are not property names: the cover's eyebrow TEXT layer is named `BLOG`; the VS card's text layers keep template defaults (not `Title`/`Subtitle`) — address them by tree position (`vs-template.md`).
- The VS tiles have no swap prop either; swap the nested `ServiceLogo/<slug>` instance (`isExposedInstance: false`) with `logo.swapComponent(imported)` after `figma.importComponentByKeyAsync(key)`.

## Stale API surface inside `use_figma`

- `figma.currentUser` → `in get_currentUser: "currentUser" is not a supported API`. The account gate is the MCP `whoami` only.
- `figma.teamLibrary.*` is not implemented (only variable-collection methods exist in the d.ts). Library keys cannot be discovered from `use_figma`; they are supplied from `references/service-logo-keys.md`, read off an existing instance's `mainComponent.key`, or found with `get_libraries` / `search_design_system` on an **exact** `ServiceLogo/<slug>` name. `search_design_system` is fuzzy — a prior run matched CrewAI to tekton. Exact match or miss.
- `figma.root.name` returns `"Document"`, not the file title; do not gate on it.

## Export

- `get_screenshot` is **not** an export path: `maxDimension` only caps the longer edge and never upscales past the node's natural 1920 px, so it returns 1920x1080. Use it for the eyeball check only. On a small node the "never upscales" half bites the eyeball check itself — a 24x24 `ServiceLogo/*` component returns a literal 24px PNG, useless for judging (verified 2026-09-07). Use a `use_figma` call returning `await node.screenshot({ scale: 8 })` for those instead (`references/add-mark.md`, "Visual acceptance").
- `download_assets({ fileKey, nodeId, defaultFormat: 'png', defaultScale: 2 })` returns `export.url` (3840x2160, chrome-free, RGBA, ~2.3 MB) plus `rawImages` and `svgAssets` for the subtree — ignore those. The URL is short-lived: `curl -sL -o` it in the same step.
- On a VS card the same call also reports `svgAssetsTruncated` with a "select a smaller node" message, because the subtree holds more than 20 vectors (the hexagon tiles and logos). It is not an error and `export.url` is complete (E2E 2026-09-07: 478974 bytes, 3840x2160). Do not pick a smaller node.
- `publish-cover.ts` asserts exactly 3840x2160; `--allow-1x` accepts 1920x1080 with a printed warning and nothing else. `--allow-any-source` (any 16:9 image ≥1200 px wide) is for blog-post-contributor's hand-provided cover, never for a Figma export.

## Copy and layout

- The image layouts set the title in an **800 px** measure — less than half of `Text` / `Full Bleed` (1680) and `Panel Bottom` (1760). The first E2E cover (`braintrust-pricing`, `Image Right`) set a 24-character headline as `Braintrust Pricing / Guide` and the orphan was only seen at S6. find-slot now predicts it (`P.titleLines`) and names the wider legal layout; an orphan word on the last line is an export-blocking defect like a fourth line (SKILL.md S6).
- S3 updates an existing instance in place (copy, variant, background) — a copy fix never needs a delete or a new node.
- A `--comparison` run gets no cover-template headline question and no `titleLines` orphan suggestion: the VS card has no 800 px measure, and its budgets are the 34-character `vs.title` / `for` line. The first VS run (2026-09-07) received an `Image Right` orphan suggestion for a card that was never going to use that layout; find-slot now gates those checks on the VS path. Its VS headline is derived as `<N> <Competitor> Alternatives` (N from the tiles, `Best` and `We Tested …` dropped) — that run had to override with `--title` to get the documented pattern.

## Process

- Only one lane touches Figma at a time; `use_figma` runs in the desktop app against the open file.
- `references/service-logo-keys.md` in the skill dir is the only key table find-slot reads; a key recorded anywhere else does not exist for S0. The first VS run found the skill copy seven keys behind a scratch copy of the same table — without the sync S0 exits 3 with unknown keys and forces the Panel Bottom fallback for a card whose marks were all in the library. Append new keys to the skill file in the same run that finds them (`.agents/skills/figma-blog-cover` is a symlink to this directory, so there is no mirror to copy).
- The VS recipe (`createInstance` from a `113:300` variant, `swapComponent` on a non-exposed nested instance) was written from live reads and **first executed on 2026-09-07** (`braintrust-alternatives`, `Count=7`, one call, no fallback). Retries reuse the instance by name; a broken instance is removed before retrying; a failure takes the `Panel Bottom` fallback and is reported — via a fresh `find-slot.ts <slug> --fallback "<reason>"` `P` (no `--comparison`), never by running the cover script with the VS `P` (its `expectedSetId` is `113:300` and S5 would reject the cover).
- Finding the month section and the `<slug>` instance already on the canvas (an aborted earlier attempt) is the normal idempotent case: S2 and S4 return `ops: 0, pending: []`, S3 rewrites the instance in place. The 2026-09-07 E2E's second run converged on exactly that state.
- S5 with the target `P` checks the whole year column, so it already proves an S2 shift. S5 with a `--month` `P` on a section this run did not touch reports the batch's legacy within-section order (see `figma-ids.md` for the known ones, including two covers on one slot in `2026-03`) — pre-existing, listed in the report, never reflowed without being asked.
- A post whose `date` moved it to another month: S3 reparents the instance, but the OLD section is not touched by the new month's S2/S4/S5. Reflow it in three steps (SKILL.md, Idempotency): `find-slot.ts --month <old YYYY-MM>` without `--siblings` → S1 with that `P` to read the old section's siblings after the reparent (a list captured before S3 still holds the moved slug and fails find-slot's cross-check) → `find-slot.ts --month <old> --siblings '<that array>'` → S2 + S4 + S5. Otherwise the old month keeps a hole and S5 reports `[]` for a wrong canvas.

## Adding marks (Hashi Design System) — `references/add-mark.md`

- **Hashi-active-file trap.** The mark sub-flow writes to a **different Figma file** than the rest of this skill (Hashi Design System, `IZhfgAOIPjDObsCtpFKhRY`, not the Blog Covers file `tDusxGZ3wyvc08u3GiUpy4`) — but `use_figma` always runs against whatever file is open in the desktop app, and `figma.root.name` is always the literal string `"Document"` no matter which file that is (see "Stale API surface" above), so it can never gate on the file by name. M1 and M2 both gate the only way that works: navigate to page `731:2` and read its name back as `"Service Logos"`. If a script gets a page-not-found or a wrong-name error, the desktop app has the wrong file open — stop and ask the user to switch to Hashi Design System, exactly as SKILL.md precondition 2 does for the Blog Covers file. Never assume the right file is open just because a previous call in the same session succeeded — a human can switch files between calls.
- **svgAssetsTruncated applies here too**, if a mark is ever exported for inspection via `download_assets` rather than `get_screenshot` — same as the VS-card note above (Export section): harmless, `export.url` is still complete, ignore the truncation notice.
- **Republish gate.** A `ServiceLogo/<slug>` component created or replaced by M1 is invisible to every file that imports Hashi as a library (including the templates file the VS cards actually pull from) until a human library editor republishes Hashi through the Figma UI. No `use_figma` call can trigger or detect a republish — do not poll for one, do not claim a mark is "ready to use" once M1/M2 pass. The sub-flow's job ends at recording the key (`append-key.ts`) and listing the mark as awaiting republish; using it in a live VS card is a separate follow-up after a human confirms the republish happened.
