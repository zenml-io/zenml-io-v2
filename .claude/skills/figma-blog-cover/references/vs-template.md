# Template — VS Comparison (`113:300`)

Live tree and tile-swap recipe, read off `232:3744` (`trigger-dev-alternatives`) on 2026-09-07. **The recipe was executed for the first time on 2026-09-07** (`braintrust-alternatives`, `390:15531`, `Count=7, Include ZenML=True, Brand=Kitaru`): `variant.createInstance()` on a `113:300` child and `swapComponent` on the non-exposed nested `ServiceLogo` instance both worked in one `s3-vs-comparison.js` call (7 swaps); the fresh instance keeps the `Frame 11` / `vs-hexagon` layer names and the `Count=7` variant carries exactly 7 tiles (4 top row, 3 bottom). If either step fails on a later run, remove the broken instance, take the `Panel Bottom` fallback and report it (SKILL.md, Fallback rule).

## Set and variant

- Axes: `Count` `"10"`…`"1"` (default `"10"`), `Include ZenML` `"True"`/`"False"` (default `"True"`), `Brand` `ZenML`/`Kitaru` (default `ZenML`). 40 variants, named literally `Count=${count}, Include ZenML=${inc}, Brand=${brand}`.
- `Count` = number of competitor tiles (`vs-hexagon`), i.e. the length of `--comparison a,b,c`. `Include ZenML=True` adds the brand tile (`kitaru-hexagon` for Kitaru, `zenml-hexagon` for ZenML). The live card: 7 alternatives in the title = `Count=6` + the brand tile.
- No TEXT / INSTANCE_SWAP properties on the set; `inst.exposedInstances` is `[]`. Text and logos are edited on nested nodes.

## Live tree (`232:3744`, `Count=6, Include ZenML=True, Brand=Kitaru`, main component `193:2371`)

```
Polygon
Frame 16 > Frame 11 > [TEXT headline, TEXT sub-line]
         > INSTANCE "Master Logo"
Frame 15 > INSTANCE "kitaru-hexagon"            (brand tile, no props)
         > Frame 14 > Frame 12 (top row: VS, vs-hexagon x3)
                    > Frame 13 (bottom row: VS, vs-hexagon x3)
```

- Text layers keep the template's default names (not `Title`/`Subtitle`); address them as the two TEXT children of `Frame 11` in document order.
  - `I232:3744;193:2375` `"7 Trigger.dev Alternatives"` — Borna Medium, `textAutoResize` HEIGHT, width 1336.
  - `I232:3744;193:2376` `"for Durable Python Agents"` — `"for "` Borna Medium `[0,4)` + rest Borna SemiBold `[4,25)`.
  - `VS` separators (`…;203:2925`) — Rethink Sans Medium (variable wght 500).
- Tiles in document order = tile index 0..5: `I232:3744;193:2383`, `;193:2385`, `;193:2387` (Frame 12), `;193:2390`, `;193:2392`, `;193:2394` (Frame 13). Each is `vs-hexagon` set `111:224` variant `Size=md, Brand=Kitaru` (`203:2899`, key `480e4a0036d7be985e2acd5ee60dcc869e831087`, `remote:false`); properties `{ Size:"md", Brand:"Kitaru" }` only — **no swap prop**.
- Inside each tile, at nested id `<tile>;203:2901`, sits one INSTANCE named `ServiceLogo/<slug>` (`isExposedInstance:false`) whose main component is `remote:true` with a library key. Keys on this card: inngest, hatchet, temporal, restate, langgraph, cloudflare-workflows — all in `service-logo-keys.md`.
- The ZenML-brand `Count=6` variant ships zapier, make, power-automate, temporal, airflow, pipedream at a different nested id (`…;113:940`) — do not hardcode nested ids; find by name.

## Keys

Supplied, never discovered from `use_figma` (`figma.teamLibrary.*` is not implemented there). Order of lookup for a slug: `service-logo-keys.md` → `mainComponent.key` off an existing `ServiceLogo/<slug>` instance in the file → `get_libraries` / `search_design_system` exact name `ServiceLogo/<slug>` (fuzzy hit = miss). Append new keys to the table. Any slug still unknown → fallback.

## Recipe (every `tiles[i].key` must already be known)

find-slot emits the card under `P.vs` (`name`, `sectionName`, `brand`, `count`, `includeZenml`, `title`, `subtitleLead`, `subtitleRest`, `tiles[{index, slug, key}]`, `tileBatches`, `tileBatch`, `tileRange`) — it carries `sectionName`, not `sectionId`, and no coordinates: the section id comes from S1 and the slot position from `P.positions[P.vs.name]`. `scripts/figma/s3-vs-comparison.js` is the runnable form and its header is the contract for `P`. What it does, in order:

1. Loads Borna Medium, Borna SemiBold and Rethink Sans Medium plus every font the variant / existing instance actually uses (`getStyledTextSegments`) before any text write or `appendChild`.
2. Finds the exact variant `Count=${count}, Include ZenML=${includeZenml}, Brand=${brand}` on the VS set (`P.ids.vsSetId`, i.e. `113:300`); reuses an instance named `P.vs.name` in the section (refusing one from the other component set, updating its variant props) or creates one, names it, sets section-relative x/y from `P.positions`.
3. Writes the two TEXT children of `Frame 11` in document order — the headline, then the sub-line as `subtitleLead + subtitleRest` with `setRangeFontName` (Medium for the lead, SemiBold for the rest).
4. Imports each tile's key in `P.vs.tileRange` with `importComponentByKeyAsync` and calls `swapComponent` on the nested `ServiceLogo/*` instance inside `vs-hexagon` tile `index` — the tile itself has no swap prop.
5. Returns the instance (`nodeId`, `created`, `sectionId`, `x`/`y`/`width`/`height`), `createdNodeIds` / `mutatedNodeIds` / `tileIds` / `swapped`, `variant`, and `remainingTiles` — the tile indexes outside this call's `tileRange`, which the batch-1 run below still has to swap.

Ops: 1 create + 2 texts + N swaps ≤ 10, so the runnable script swaps only `P.vs.tileRange` (≤7 tiles). For `Count >= 8` find-slot emits `vs.tileBatches = [[0,7],[7,N]]` and `vs.tileRange = tileBatches[--tile-batch]` (default 0): run `s3-vs-comparison.js` with the batch-0 `P` (create + texts + first 7 swaps), then re-run find-slot with the same flags plus `--tile-batch 1` and run the script again with that `P` — it re-finds `inst` by name, skips the variant switch when it already matches, rewrites the two texts with the same values, and swaps the remaining tiles. This is the single procedure; SKILL.md S3 and traps.md say the same.
