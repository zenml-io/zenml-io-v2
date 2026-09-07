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

## Recipe (as written in the Spike; every `tiles[i].key` must already be known)

find-slot emits this object under `P.vs` (`name`, `sectionName`, `x`, `y`, `brand`, `count`, `includeZenml`, `title`, `subtitleLead`, `subtitleRest`, `tiles[{index, slug, key}]`, `tileBatches`, `tileBatch`, `tileRange`) — it carries `sectionName`, not `sectionId`; the section id comes from S1. `scripts/figma/s3-vs-comparison.js` is the runnable form; where its `P` keys differ from the comment below, the script's header wins. The runnable script also loads the variant's / instance's actual text fonts (read with `getStyledTextSegments`) on top of the three pairs below before `createInstance` and `appendChild` — the sketch below shows the three measured pairs only.

```js
const P = __PARAMS__; // { name, sectionId, x, y, brand:'ZenML'|'Kitaru', count:'6', includeZenml:'True'|'False', title, subtitleLead:'for ', subtitleRest, tiles:[{index:0,key:'…'}, …] }
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('174:1785'));
// 1. fonts BEFORE any text write or appendChild of a subtree containing these fonts
await Promise.all([
  figma.loadFontAsync({ family: 'Borna', style: 'Medium' }),
  figma.loadFontAsync({ family: 'Borna', style: 'SemiBold' }),
  figma.loadFontAsync({ family: 'Rethink Sans', style: 'Medium' }),
]);
// 2. instance from the exact variant (setProperties on Brand/Count/Include ZenML is equivalent; variant lookup avoids a
//    second render pass). Existing instance named P.name in the section is reused, never duplicated.
const set = await figma.getNodeByIdAsync('113:300');
const variantName = `Count=${P.count}, Include ZenML=${P.includeZenml}, Brand=${P.brand}`;
const variant = set.children.find(c => c.name === variantName);
if (!variant) throw new Error('no variant ' + variantName);
const section = await figma.getNodeByIdAsync(P.sectionId);
let inst = section.children.find(c => c.type === 'INSTANCE' && c.name === P.name);
if (!inst) { inst = variant.createInstance(); section.appendChild(inst); }
else { inst.setProperties({ Brand: P.brand, Count: P.count, 'Include ZenML': P.includeZenml }); }
inst.name = P.name;
inst.x = P.x; inst.y = P.y; // SECTION-relative; verify with absoluteBoundingBox afterwards
// 3. texts — the two TEXT children of "Frame 11", document order: headline then sub-line
const frame11 = inst.findOne(n => n.type === 'FRAME' && n.name === 'Frame 11');
const [headline, subline] = frame11.children.filter(n => n.type === 'TEXT');
headline.characters = P.title;                                   // e.g. "7 Trigger.dev Alternatives"
subline.characters = P.subtitleLead + P.subtitleRest;             // e.g. "for " + "Durable Python Agents"
subline.setRangeFontName(0, subline.characters.length, { family: 'Borna', style: 'Medium' });
subline.setRangeFontName(P.subtitleLead.length, subline.characters.length, { family: 'Borna', style: 'SemiBold' });
// 4. tile swaps — tiles in document order (top row then bottom row); swap the nested ServiceLogo, not the tile
const tiles = inst.findAll(n => n.type === 'INSTANCE' && n.name === 'vs-hexagon');
if (tiles.length !== Number(P.count)) throw new Error(`expected ${P.count} vs-hexagon tiles, found ${tiles.length}`);
const imported = await Promise.all(P.tiles.map(t => figma.importComponentByKeyAsync(t.key)));
const swapped = [];
P.tiles.forEach((t, i) => {
  const logo = tiles[t.index].findOne(n => n.type === 'INSTANCE' && n.name.startsWith('ServiceLogo/'));
  if (!logo) throw new Error('no ServiceLogo in tile ' + t.index);
  logo.swapComponent(imported[i]);   // InstanceNode.swapComponent(componentNode) — d.ts L9707
  swapped.push(logo.id);
});
return { createdNodeIds: [inst.id], mutatedNodeIds: [headline.id, subline.id, ...swapped], tileIds: tiles.map(t => t.id), variant: variantName };
```

Ops: 1 create + 2 texts + N swaps ≤ 10, so the runnable script swaps only `P.vs.tileRange` (≤7 tiles). For `Count >= 8` find-slot emits `vs.tileBatches = [[0,7],[7,N]]` and `vs.tileRange = tileBatches[--tile-batch]` (default 0): run `s3-vs-comparison.js` with the batch-0 `P` (create + texts + first 7 swaps), then re-run find-slot with the same flags plus `--tile-batch 1` and run the script again with that `P` — it re-finds `inst` by name, skips the variant switch when it already matches, rewrites the two texts with the same values, and swaps the remaining tiles. This is the single procedure; SKILL.md S3 and traps.md say the same.
