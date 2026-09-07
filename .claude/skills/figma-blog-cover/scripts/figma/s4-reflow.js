// s4-reflow.js — put every cover in the month section on its computed slot.
// Paste find-slot.ts output over the `const P = ...` placeholder (P.positions is the section-relative x/y per slug).
// Safety: if the section holds a child whose name is not in P.positions, NOTHING is written —
// the unknown names come back in `unknown` for the agent to resolve (questions), then re-run.
// Ops budget (A6: a loop counts per node): at most 10 writes per call — a section height fix (if
// any) plus up to 10 child moves; the rest come back in `pending`. A section holds ≤20 covers,
// so at most two calls. Idempotent: only x/y that differ are written; re-run until `pending` is [].
const P = __PARAMS__;
const BUDGET = 10;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(P.ids.pageId));
const container = await figma.getNodeByIdAsync(P.ids.containerId);
if (!container) throw new Error('container ' + P.ids.containerId + ' not found');
const section = container.children.find(n => n.type === 'SECTION' && n.name === P.sectionName);
if (!section) throw new Error('section "' + P.sectionName + '" not found — run S2 first');

const unknown = section.children.filter(c => !P.positions[c.name]).map(c => ({ id: c.id, name: c.name, type: c.type }));
const present = new Set(section.children.map(c => c.name));
const missing = Object.keys(P.positions).filter(s => !present.has(s));
if (unknown.length) return { wrote: false, unknown, missing, mutatedNodeIds: [] };

let ops = 0;
const mutatedNodeIds = [];
if (Math.abs(section.width - P.grid.sectionWidth) >= 1 || Math.abs(section.height - P.sectionHeight) >= 1) {
  section.resizeWithoutConstraints(P.grid.sectionWidth, P.sectionHeight);
  mutatedNodeIds.push(section.id);
  ops += 1;
}
const pending = [];
const moved = [];
for (const c of section.children) {
  const t = P.positions[c.name];
  if (Math.abs(c.x - t.x) < 1 && Math.abs(c.y - t.y) < 1) continue;
  if (ops >= BUDGET) { pending.push({ id: c.id, name: c.name, from: { x: c.x, y: c.y }, to: t }); continue; }
  c.x = t.x; c.y = t.y;
  moved.push({ id: c.id, name: c.name, x: c.x, y: c.y });
  mutatedNodeIds.push(c.id);
  ops += 1;
}
return { wrote: true, sectionId: section.id, ops, moved, pending, missing, mutatedNodeIds, unknown: [] };
