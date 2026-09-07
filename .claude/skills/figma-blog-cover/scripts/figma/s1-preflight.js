// s1-preflight.js — READ-ONLY. Paste find-slot.ts output over the `const P = ...` placeholder.
// Returns the live state the agent needs before any write:
//   file        {rootName, pageName}   — the "file is open" check (A1: figma.currentUser is
//                                        not readable inside use_figma; the account gate is the MCP whoami)
//   container   {id, name, type, x, y, width, height, childCount}
//   column      sections whose x === P.columnX (container-relative), sorted by name desc
//   columnMissing  true when `column` is empty — the year has no column yet; stop and ask before
//                  any write (S2 refuses to create the first section unless P.allowNewColumn)
//   section     the month section named P.sectionName, or null
//   rowsGrew    true when that section is shorter than P.sectionHeight (a new row) — S2 runs regardless
//   siblings    [{slug, id, layout, bgStyle, x, y, width, height}] — every INSTANCE child of that section
//   existing    an INSTANCE named P.slug anywhere under the container (any section), or null;
//               `existing.sectionName !== P.sectionName` means the post's month changed — S3 reparents
//               it and the OLD section must be reflowed too (SKILL.md, Idempotency: find-slot --month)
//   fontsMissing family/style pairs the cover + VS templates need that listAvailableFontsAsync lacks
// Feed `siblings` back into find-slot.ts --siblings before S3. Zero logical ops (no writes).
// Accepts a --month P as well (P.slug null → `existing` is null).
const P = __PARAMS__;
const out = { file: { rootName: figma.root.name } };
const page = await figma.getNodeByIdAsync(P.ids.pageId);
if (!page) throw new Error('page ' + P.ids.pageId + ' not found');
await figma.setCurrentPageAsync(page);
out.file.pageName = page.name;

const container = await figma.getNodeByIdAsync(P.ids.containerId);
if (!container) throw new Error('container ' + P.ids.containerId + ' not found');
out.container = { id: container.id, name: container.name, type: container.type, x: container.x, y: container.y, width: container.width, height: container.height, childCount: container.children.length };

const sections = container.children.filter(n => n.type === 'SECTION');
out.column = sections
  .filter(s => Math.abs(s.x - P.columnX) < 1)
  // identical section-sort comparator in s2-ensure-section.js, s5-verify.js — change all
  .sort((a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0))
  .map(s => ({ id: s.id, name: s.name, x: s.x, y: s.y, width: s.width, height: s.height, childCount: s.children.length }));
out.columnMissing = out.column.length === 0;

const section = sections.find(s => s.name === P.sectionName) || null;
out.section = section ? { id: section.id, name: section.name, x: section.x, y: section.y, width: section.width, height: section.height } : null;
out.rowsGrew = section ? P.sectionHeight - section.height >= 1 : false;

out.siblings = [];
if (section) {
  for (const c of section.children) {
    const row = { slug: c.name, id: c.id, type: c.type, x: c.x, y: c.y, width: c.width, height: c.height, layout: null, bgStyle: null };
    if (c.type === 'INSTANCE') {
      const props = c.componentProperties || {};
      row.layout = props.Layout ? props.Layout.value : null;
      row.brand = props.Brand ? props.Brand.value : null;
      // Cover BG / 16:9 is the exposed nested instance named "Background" (never a swap prop).
      const bg = c.findOne(n => n.type === 'INSTANCE' && n.name === 'Background');
      row.bgStyle = bg && bg.componentProperties && bg.componentProperties.Style ? bg.componentProperties.Style.value : null;
      const mc = await c.getMainComponentAsync();
      row.setId = mc && mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent.id : null;
    }
    out.siblings.push(row);
  }
}

// Existing cover for this slug — direct children of every section (covers are never nested deeper).
let existing = null;
for (const s of P.slug ? sections : []) {
  const hit = s.children.find(n => n.type === 'INSTANCE' && n.name === P.slug);
  if (hit) { existing = { id: hit.id, sectionId: s.id, sectionName: s.name, x: hit.x, y: hit.y }; break; }
}
if (!existing && P.slug) {
  const hit = container.children.find(n => n.type === 'INSTANCE' && n.name === P.slug);
  if (hit) existing = { id: hit.id, sectionId: null, sectionName: null, x: hit.x, y: hit.y };
}
out.existing = existing;

// Fonts the writers will load (Spike fontNotes). Missing pair → stop and ask, never substitute.
const needed = [
  { family: 'Borna', style: 'Medium' },
  { family: 'Nudica Mono', style: 'Regular' },
  { family: 'Nudica Mono', style: 'Medium' },
];
if (P.vs) needed.push({ family: 'Borna', style: 'SemiBold' }, { family: 'Rethink Sans', style: 'Medium' });
const fonts = await figma.listAvailableFontsAsync();
out.fontsMissing = needed.filter(f => !fonts.some(a => a.fontName.family === f.family && a.fontName.style === f.style));
return out;
