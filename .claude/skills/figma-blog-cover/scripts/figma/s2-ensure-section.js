// s2-ensure-section.js — create the month section if absent, then reflow the year column.
// Paste find-slot.ts output over the `const P = ...` placeholder. Idempotent: re-run until `pending` is [].
//
// Ops budget (loaded figma-use skill: ≤10 logical ops per call; A6: a loop counts per node):
//   create+name+x+resize of the new section = 1 op; each section y-move = 1 op.
//   This call writes at most 10 ops: (1 if created) + up to (10 - created) moves.
//   Sections still needing a move are returned in `pending` — run S2 again; the sections
//   already placed are skipped on the re-run (only y-values that differ are written).
// Column rule: sections at x === P.columnX sorted by name desc; y cumulative from 0 with gap P.grid.gap.
// A year with no column (no section at P.columnX) is NOT started silently: S1 reports `columnMissing`,
// the agent asks, and only a P from `find-slot.ts ... --allow-new-column` (P.allowNewColumn true) may
// create the first section of a column. Works with a slug P or a --month P.
// Coordinates are container-relative (174:1785 is the parent); S5 verifies via absoluteBoundingBox.
const P = __PARAMS__;
const BUDGET = 10;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(P.ids.pageId));
const container = await figma.getNodeByIdAsync(P.ids.containerId);
if (!container) throw new Error('container ' + P.ids.containerId + ' not found');

const columnBefore = container.children.filter(n => n.type === 'SECTION' && Math.abs(n.x - P.columnX) < 1);
if (columnBefore.length === 0 && !P.allowNewColumn) {
  throw new Error('no existing sections at x ' + P.columnX + ' — year column ' + P.year + ' missing, ask before creating (re-run find-slot with --allow-new-column once confirmed)');
}

let ops = 0;
const createdNodeIds = [];
const mutatedNodeIds = [];
let section = container.children.find(n => n.type === 'SECTION' && n.name === P.sectionName);
if (!section) {
  section = figma.createSection();
  container.appendChild(section);
  section.name = P.sectionName;
  section.x = P.columnX;
  section.y = 0; // provisional; the reflow below sets the real y
  section.resizeWithoutConstraints(P.grid.sectionWidth, P.sectionHeight);
  createdNodeIds.push(section.id);
  ops += 1;
} else if (Math.abs(section.width - P.grid.sectionWidth) >= 1 || Math.abs(section.height - P.sectionHeight) >= 1) {
  section.resizeWithoutConstraints(P.grid.sectionWidth, P.sectionHeight);
  mutatedNodeIds.push(section.id);
  ops += 1;
}

// Reflow the column: name desc (YYYY-MM prefix sorts chronologically), y cumulative.
const column = container.children
  .filter(n => n.type === 'SECTION' && Math.abs(n.x - P.columnX) < 1)
  // identical section-sort comparator in s1-preflight.js, s5-verify.js — change all
  .sort((a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0));
const targets = [];
let y = 0;
for (const s of column) {
  targets.push({ id: s.id, name: s.name, node: s, y, height: s.height });
  y += s.height + P.grid.gap;
}
const pending = [];
for (const t of targets) {
  if (Math.abs(t.node.y - t.y) < 1) continue;
  if (ops >= BUDGET) { pending.push({ id: t.id, name: t.name, from: t.node.y, to: t.y }); continue; }
  t.node.y = t.y;
  mutatedNodeIds.push(t.id);
  ops += 1;
}
return {
  createdNodeIds,
  mutatedNodeIds,
  sectionId: section.id,
  created: createdNodeIds.length > 0,
  ops,
  pending, // re-run S2 while non-empty
  column: targets.map(t => ({ id: t.id, name: t.name, y: t.y, height: t.height })),
  columnBottom: y - P.grid.gap,
  container: { type: container.type, height: container.height },
};
