// s5-verify.js — READ-ONLY placement check. Paste find-slot.ts output over the `const P = ...` placeholder.
// Uses absoluteBoundingBox only (section-relative x/y are not trusted after reparenting):
//   every child of the month section: (child.abs - section.abs) === P.positions[name], 1920x1080,
//   name === slug, mainComponent's parent set === P.expectedSetId for P.slug (162:1845 for other covers);
//   the section itself: 10720 x P.sectionHeight, at P.columnX relative to the container;
//   the year column: sections at P.columnX, name desc, y cumulative with gap P.grid.gap.
// Returns { mismatches: [...], nodeId } — mismatches must be [] before exporting.
// Accepts a --month P (P.slug null): every child is checked against P.positions and the cover/VS
// sets; the "instance named P.slug" check is skipped and nodeId is null.
const P = __PARAMS__;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(P.ids.pageId));
const container = await figma.getNodeByIdAsync(P.ids.containerId);
if (!container) throw new Error('container ' + P.ids.containerId + ' not found');
const section = container.children.find(n => n.type === 'SECTION' && n.name === P.sectionName);
const mismatches = [];
if (!section) return { mismatches: ['section "' + P.sectionName + '" not found'], nodeId: null };
// 174:1785 is a PAGE (no absoluteBoundingBox): its children's absolute coords are already page coords.
const cAbs = container.type === 'PAGE' ? { x: 0, y: 0 } : container.absoluteBoundingBox;
const sAbs = section.absoluteBoundingBox;
const near = (a, b) => Math.abs(a - b) < 1;

// section geometry (relative to the container)
if (!near(sAbs.x - cAbs.x, P.columnX)) mismatches.push('section x ' + (sAbs.x - cAbs.x) + ' != ' + P.columnX);
if (!near(sAbs.width, P.grid.sectionWidth)) mismatches.push('section width ' + sAbs.width + ' != ' + P.grid.sectionWidth);
if (!near(sAbs.height, P.sectionHeight)) mismatches.push('section height ' + sAbs.height + ' != ' + P.sectionHeight);

// children
let nodeId = null;
const seen = new Set();
const children = [];
for (const c of section.children) {
  const abs = c.absoluteBoundingBox;
  const rel = { x: abs.x - sAbs.x, y: abs.y - sAbs.y };
  const row = { id: c.id, name: c.name, type: c.type, x: rel.x, y: rel.y, width: abs.width, height: abs.height };
  children.push(row);
  seen.add(c.name);
  const want = P.positions[c.name];
  if (!want) { mismatches.push('unknown child "' + c.name + '" (' + c.id + ')'); continue; }
  if (c.type !== 'INSTANCE') mismatches.push(c.name + ': type ' + c.type + ' != INSTANCE');
  if (!near(rel.x, want.x) || !near(rel.y, want.y)) mismatches.push(c.name + ': at ' + rel.x + ',' + rel.y + ' expected ' + want.x + ',' + want.y);
  if (!near(abs.width, P.grid.coverWidth) || !near(abs.height, P.grid.coverHeight)) mismatches.push(c.name + ': size ' + abs.width + 'x' + abs.height);
  if (c.type === 'INSTANCE') {
    const mc = await c.getMainComponentAsync();
    const setId = mc && mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent.id : null;
    row.setId = setId;
    const expectedSet = c.name === P.slug ? P.expectedSetId : null;
    if (expectedSet && setId !== expectedSet) mismatches.push(c.name + ': main component set ' + setId + ' != ' + expectedSet);
    if (!expectedSet && setId !== P.ids.coverSetId && setId !== P.ids.vsSetId) mismatches.push(c.name + ': main component set ' + setId + ' is neither cover nor VS set');
  }
  if (c.name === P.slug) nodeId = c.id;
}
for (const s of Object.keys(P.positions)) if (!seen.has(s)) mismatches.push('missing cover "' + s + '"');
if (P.slug && !nodeId) mismatches.push('no instance named "' + P.slug + '" in the section');

// year column
const column = container.children
  .filter(n => n.type === 'SECTION' && near(n.absoluteBoundingBox.x - cAbs.x, P.columnX))
  // identical section-sort comparator in s1-preflight.js, s2-ensure-section.js — change all
  .sort((a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0));
let y = 0;
const columnRows = [];
for (const s of column) {
  const rel = s.absoluteBoundingBox.y - cAbs.y;
  columnRows.push({ id: s.id, name: s.name, y: rel, height: s.absoluteBoundingBox.height, expectedY: y });
  if (!near(rel, y)) mismatches.push('column: ' + s.name + ' at y ' + rel + ' expected ' + y);
  y += s.absoluteBoundingBox.height + P.grid.gap;
}
return { mismatches, nodeId, sectionId: section.id, children, column: columnRows };
