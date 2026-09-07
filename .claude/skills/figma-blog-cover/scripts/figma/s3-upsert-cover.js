// s3-upsert-cover.js — find-or-create the Blog Cover / 16:9 instance for P.slug.
// Paste find-slot.ts output over the `const P = ...` placeholder (P.chosenLayout / P.chosenBg / P.headline / P.subtitle
// are the agent-approved values; P.coverProps carries the verbatim #id property keys).
// Copy rule (A8): `Show subtitle#162:33` is written from P.showSubtitle (false by default — the
// subtitle is omitted unless --subtitle gave one), and when it is false the Subtitle text is
// written as "" so a hidden layer never carries stale copy. P.titleSource / P.subtitleSource are
// inputs for the agent, never written to the cover. Never run with a --month P (P.slug null).
// Requires the month section to exist (run S2 first). ≤10 ops: create(1) + variant props(1)
// + text props(1) + Background props(1) + reparent/name/position(1).
// Font rule (Spike fontNotes + loaded figma-use skill rule 8): load fonts BEFORE createInstance /
// setProperties on the text props and BEFORE appendChild of a subtree containing them. Only the
// three Kitaru pairs were measured by the Spike, so nothing is hardcoded as complete: a NEW cover
// is created from the exact variant `Brand=<brand>, Layout=<layout>` after reading and loading that
// variant's own text fonts; an EXISTING cover has its current fonts read and loaded before the
// variant switch; in both cases the instance's fonts are read back again before any text write, so a
// ZenML/Text variant with a face the Spike never saw cannot throw "Cannot write to node with unloaded font".
const P = __PARAMS__;
if (!P.slug) throw new Error('P.slug is null (--month P) — S3 is not run for a month reflow');
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(P.ids.pageId));
const container = await figma.getNodeByIdAsync(P.ids.containerId);
const set = await figma.getNodeByIdAsync(P.ids.coverSetId);
if (!container) throw new Error('container ' + P.ids.containerId + ' not found');
if (!set || set.type !== 'COMPONENT_SET') throw new Error('cover set ' + P.ids.coverSetId + ' not found or not a COMPONENT_SET');
const section = container.children.find(n => n.type === 'SECTION' && n.name === P.sectionName);
if (!section) throw new Error('section "' + P.sectionName + '" not found — run S2 first');
const pos = P.positions[P.slug];
if (!pos) throw new Error('no position for ' + P.slug);

const available = await figma.listAvailableFontsAsync();
const loaded = new Set();
// identical copy in s3-vs-comparison.js — change both
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
  { family: 'Nudica Mono', style: 'Regular' },
  { family: 'Nudica Mono', style: 'Medium' },
]);

// Find an existing instance named P.slug (direct child of any section, or of the container).
let inst = null;
for (const s of container.children.filter(n => n.type === 'SECTION')) {
  inst = s.children.find(n => n.type === 'INSTANCE' && n.name === P.slug) || null;
  if (inst) break;
}
if (!inst) inst = container.children.find(n => n.type === 'INSTANCE' && n.name === P.slug) || null;
if (inst) {
  // Refuse an instance from the other template (VS card) — its property set differs and setProperties would fail obscurely.
  const mc = await inst.getMainComponentAsync();
  if (!mc || !mc.parent || mc.parent.id !== P.expectedSetId) throw new Error('instance "' + P.slug + '" (' + inst.id + ') is from set ' + (mc && mc.parent ? mc.parent.id : null) + ', expected ' + P.expectedSetId + ' — remove it (or re-run without/with --comparison) before S3');
}
const created = !inst;
if (inst) {
  // 1a. existing: current fonts before touching the node, then the variant switch.
  await loadFonts(fontsOf(inst));
  inst.setProperties({ Brand: P.brand, Layout: P.chosenLayout });
} else {
  // 1b. new: the exact variant by name (figma-ids.md), its fonts loaded BEFORE createInstance —
  //     never set.defaultVariant + setProperties (that variant's fonts were never measured).
  const variantName = 'Brand=' + P.brand + ', Layout=' + P.chosenLayout;
  const variant = set.children.find(c => c.name === variantName);
  if (!variant) throw new Error('no variant "' + variantName + '" in ' + P.ids.coverSetId);
  await loadFonts(fontsOf(variant));
  inst = variant.createInstance();
}

// 2. read back the instance's real fonts, then 3. text/boolean props.
await loadFonts(fontsOf(inst));
const showSubtitle = P.showSubtitle === true;
const textProps = {};
textProps[P.coverProps.title] = P.headline;
textProps[P.coverProps.subtitle] = showSubtitle ? P.subtitle : '';
textProps[P.coverProps.eyebrow] = P.eyebrow;
textProps[P.coverProps.showSubtitle] = showSubtitle;
// Site#162:34 is left at the component default on purpose.
inst.setProperties(textProps);

// 4. Background = exposed nested instance of Cover BG / 16:9 (never a swap prop).
const bg = inst.findOne(n => n.type === 'INSTANCE' && n.name === 'Background');
if (!bg) throw new Error('no nested INSTANCE named "Background" in ' + inst.id);
bg.setProperties({ Brand: P.brand, Style: P.chosenBg });

// 5. parent (reparenting keeps the old x/y — always reset after appendChild), name, position.
if (inst.parent !== section) section.appendChild(inst);
inst.name = P.slug;
inst.x = pos.x;
inst.y = pos.y;

const bgMc = await bg.getMainComponentAsync();
return {
  createdNodeIds: created ? [inst.id] : [],
  mutatedNodeIds: created ? [] : [inst.id],
  nodeId: inst.id,
  created,
  sectionId: section.id,
  props: { Brand: inst.componentProperties.Brand.value, Layout: inst.componentProperties.Layout.value, Title: inst.componentProperties[P.coverProps.title].value, Subtitle: inst.componentProperties[P.coverProps.subtitle].value, ShowSubtitle: inst.componentProperties[P.coverProps.showSubtitle].value, Eyebrow: inst.componentProperties[P.coverProps.eyebrow].value },
  background: { id: bg.id, Brand: bg.componentProperties.Brand.value, Style: bg.componentProperties.Style.value, setId: bgMc && bgMc.parent ? bgMc.parent.id : null },
  x: inst.x, y: inst.y, width: inst.width, height: inst.height,
};
