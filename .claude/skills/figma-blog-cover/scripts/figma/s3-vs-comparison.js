// s3-vs-comparison.js — find-or-create the Template — VS Comparison (113:300) instance for P.slug.
// Paste find-slot.ts output (run with --comparison) over the `const P = ...` placeholder; uses P.vs and P.positions.
// Recipe = the live read of 232:3744 (trigger-dev-alternatives). A broken instance is removed and
// retried; if createInstance or swapComponent fails, take the Blog Cover + Panel Bottom fallback
// and report it (SKILL.md, Fallback rule).
//
// Ops budget: 1 create/reuse + 2 texts + N logo swaps ≤ 10 → at most 7 swaps per call. find-slot
// emits P.vs.tileBatches ([[0,7],[7,N]] for N > 7, else [[0,N]]) and P.vs.tileRange = the batch
// selected with --tile-batch <n> (default 0). This script swaps only P.vs.tileRange (end exclusive).
// For Count ≥ 8: re-run find-slot with --tile-batch 1 and run this script again with that P — the
// second run finds the instance by name, leaves the variant/texts as they are, and only swaps the
// second batch. Every P.vs.tiles[i].key must be a 40-hex ServiceLogo key
// (references/service-logo-keys.md); a null key in the batch aborts before any write.
const P = __PARAMS__;
const V = P.vs;
if (!V) throw new Error('P.vs is null — run find-slot.ts with --comparison');
const count = Number(V.count);
if (!(count >= 1 && count <= 10)) throw new Error('Count must be 1..10, got ' + V.count);
if (V.tiles.length !== count) throw new Error('P.vs.tiles has ' + V.tiles.length + ' entries, Count is ' + count);
const range = V.tileRange;
if (!Array.isArray(range) || range.length !== 2) throw new Error('P.vs.tileRange missing — re-run find-slot.ts (it emits tileBatches/tileRange; select with --tile-batch)');
const tilesNow = V.tiles.filter(t => t.index >= range[0] && t.index < range[1]);
if (tilesNow.length > 7) throw new Error('at most 7 swaps per call — P.vs.tileRange ' + JSON.stringify(range) + ' is too wide');
const nullKeys = tilesNow.filter(t => !t.key || !/^[0-9a-f]{40}$/.test(t.key)).map(t => t.slug);
if (nullKeys.length) throw new Error('no ServiceLogo key for: ' + nullKeys.join(', ') + ' — supply keys or take the Panel Bottom fallback');
const pos = P.positions[V.name];
if (!pos) throw new Error('no position for ' + V.name);

await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(P.ids.pageId));
const container = await figma.getNodeByIdAsync(P.ids.containerId);
const set = await figma.getNodeByIdAsync(P.ids.vsSetId);
if (!container) throw new Error('container ' + P.ids.containerId + ' not found');
if (!set || set.type !== 'COMPONENT_SET') throw new Error('VS set ' + P.ids.vsSetId + ' not found or not a COMPONENT_SET');
const section = container.children.find(n => n.type === 'SECTION' && n.name === V.sectionName);
if (!section) throw new Error('section "' + V.sectionName + '" not found — run S2 first');

// 1. fonts BEFORE any text write, createInstance or appendChild (loaded figma-use skill rule 8).
//    The Spike measured three TEXT nodes only (headline, sub-line, VS separators: Borna Medium,
//    Borna SemiBold — no space — and Rethink Sans Medium); the template may hold other TEXT (under
//    "Master Logo", tile labels), so the known pairs are a floor: the variant's (or the existing
//    instance's) actual text fonts are read with getStyledTextSegments and loaded on top.
const available = await figma.listAvailableFontsAsync();
const loaded = new Set();
// identical copy in s3-upsert-cover.js — change both
async function loadFonts(pairs) {
  const todo = [];
  for (const f of pairs) {
    const k = f.family + '/' + f.style;
    if (loaded.has(k) || todo.some(t => t.family === f.family && t.style === f.style)) continue;
    if (!available.some(a => a.fontName.family === f.family && a.fontName.style === f.style)) {
      throw new Error('font not installed: ' + f.family + ' ' + f.style + ' — stop and ask, do not substitute');
    }
    todo.push({ family: f.family, style: f.style });
  }
  await Promise.all(todo.map(f => figma.loadFontAsync(f)));
  todo.forEach(f => loaded.add(f.family + '/' + f.style));
}
function fontsOf(node) {
  const pairs = [];
  for (const t of node.findAll(n => n.type === 'TEXT')) {
    for (const seg of t.getStyledTextSegments(['fontName'])) pairs.push({ family: seg.fontName.family, style: seg.fontName.style });
  }
  return pairs;
}
await loadFonts([
  { family: 'Borna', style: 'Medium' },
  { family: 'Borna', style: 'SemiBold' },
  { family: 'Rethink Sans', style: 'Medium' },
]);

// 2. instance from the exact variant; an existing instance named V.name is reused, never duplicated.
const variantName = 'Count=' + V.count + ', Include ZenML=' + V.includeZenml + ', Brand=' + V.brand;
const variant = set.children.find(c => c.name === variantName);
if (!variant) throw new Error('no variant ' + variantName);
let inst = null;
for (const s of container.children.filter(n => n.type === 'SECTION')) {
  inst = s.children.find(n => n.type === 'INSTANCE' && n.name === V.name) || null;
  if (inst) break;
}
if (!inst) inst = container.children.find(n => n.type === 'INSTANCE' && n.name === V.name) || null;
if (inst) {
  // Refuse an instance from the other template (Blog Cover) — it has no Count / Include ZenML properties.
  const mc = await inst.getMainComponentAsync();
  if (!mc || !mc.parent || mc.parent.id !== P.expectedSetId) throw new Error('instance "' + P.slug + '" (' + inst.id + ') is from set ' + (mc && mc.parent ? mc.parent.id : null) + ', expected ' + P.expectedSetId + ' — remove it (or re-run without/with --comparison) before S3');
}
const created = !inst;
if (inst) {
  // existing (a retry, or the second tile batch): load its current fonts before mutating it; only
  // switch the variant when an axis differs — a same-value switch would still re-render the tiles.
  await loadFonts(fontsOf(inst));
  const cur = inst.componentProperties || {};
  const differs = ['Brand', 'Count', 'Include ZenML'].some(k => !cur[k] || String(cur[k].value) !== String({ Brand: V.brand, Count: V.count, 'Include ZenML': V.includeZenml }[k]));
  if (differs) inst.setProperties({ Brand: V.brand, Count: V.count, 'Include ZenML': V.includeZenml });
} else {
  // new: the variant's own text fonts BEFORE createInstance (rule 8 applies to the create too).
  await loadFonts(fontsOf(variant));
  inst = variant.createInstance();
}
// read back the instance's real fonts before appendChild / any text write.
await loadFonts(fontsOf(inst));
if (inst.parent !== section) section.appendChild(inst);
inst.name = V.name;
inst.x = pos.x; inst.y = pos.y; // section-relative; S5 verifies with absoluteBoundingBox

// 3. texts — the two TEXT children of "Frame 11", document order: headline then sub-line.
const frame11 = inst.findOne(n => n.type === 'FRAME' && n.name === 'Frame 11');
if (!frame11) throw new Error('no "Frame 11" in the VS instance — tree differs from the Spike read');
const textNodes = frame11.children.filter(n => n.type === 'TEXT');
if (textNodes.length < 2) throw new Error('expected 2 TEXT children in Frame 11, found ' + textNodes.length);
const [headline, subline] = textNodes;
headline.characters = V.title;
subline.characters = V.subtitleLead + V.subtitleRest;
subline.setRangeFontName(0, subline.characters.length, { family: 'Borna', style: 'Medium' });
if (V.subtitleRest.length > 0) {
  subline.setRangeFontName(V.subtitleLead.length, subline.characters.length, { family: 'Borna', style: 'SemiBold' });
}

// 4. tile swaps — tiles in document order (top row then bottom row); swap the nested ServiceLogo, not the tile.
const tiles = inst.findAll(n => n.type === 'INSTANCE' && n.name === 'vs-hexagon');
if (tiles.length !== count) throw new Error('expected ' + count + ' vs-hexagon tiles, found ' + tiles.length);
const imported = await Promise.all(tilesNow.map(t => figma.importComponentByKeyAsync(t.key)));
const swapped = [];
tilesNow.forEach((t, i) => {
  const logo = tiles[t.index].findOne(n => n.type === 'INSTANCE' && n.name.startsWith('ServiceLogo/'));
  if (!logo) throw new Error('no ServiceLogo in tile ' + t.index);
  logo.swapComponent(imported[i]); // InstanceNode.swapComponent(componentNode)
  swapped.push({ index: t.index, slug: t.slug, logoId: logo.id, logoName: logo.name });
});

return {
  createdNodeIds: created ? [inst.id] : [],
  mutatedNodeIds: [headline.id, subline.id].concat(swapped.map(s => s.logoId)).concat(created ? [] : [inst.id]),
  nodeId: inst.id,
  created,
  sectionId: section.id,
  variant: variantName,
  tileIds: tiles.map(t => t.id),
  swapped,
  remainingTiles: V.tiles.filter(t => !(t.index >= range[0] && t.index < range[1])).map(t => t.index),
  x: inst.x, y: inst.y, width: inst.width, height: inst.height,
};
