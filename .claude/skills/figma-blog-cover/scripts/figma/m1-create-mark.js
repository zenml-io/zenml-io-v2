// m1-create-mark.js — create (or, with P.force, replace) one ServiceLogo/<slug> component on the
// Hashi Design System "Service Logos" page (731:2, a plain canvas — no sections) from an
// already-normalized SVG. Paste the pieces below over the `__PARAMS__` placeholder
// with scripts/figma/paste.mjs, the same as every other s*.js in this skill (references/add-mark.md).
//
// P = { slug, svg, sourceUrl, date, force? }
//   slug      — matches ^[a-z0-9][a-z0-9-]*$ (normalize-mark.sh's own gate).
//   svg       — the NORMALIZED svg string: read .cache/marks/<slug>/<slug>.svg (normalize-mark.sh's
//               output) verbatim. Never a raw candidate — the 24x24 / dominant-20 / centre-(12,12)
//               contract is only guaranteed once normalize-service-logo.mjs has self-verified it.
//   sourceUrl — the candidate URL actually used (the row picked from source-mark.sh's table), for
//               the component description.
//   date      — ISO date string (today), for the component description.
//   force     — optional. false/absent (default): an existing ServiceLogo/<slug> is left untouched
//               and its id/key are returned instead of creating a duplicate (`existed: true,
//               created: false`). true: the existing component is removed and a fresh one is put
//               back at the SAME grid slot (never re-appended at a new index — that would shift
//               nothing else, but would also leave the old slot empty and duplicate the mark
//               conceptually at two places in the row-major order).
//
// File/page gate: figma.root.name is always the literal string "Document" no matter which file is
// open (references/traps.md, "Stale API surface inside use_figma") — it is NOT the file title, so
// it cannot gate on "Hashi Design System" by name. The reliable check, matching this skill's own
// blog-cover flow (SKILL.md precondition 2: gate on a known PAGE id, not figma.root.name), is
// navigating to page 731:2 and reading its name back as "Service Logos".
const P = __PARAMS__;
if (!/^[a-z0-9][a-z0-9-]*$/.test(P.slug)) {
  throw new Error('P.slug "' + P.slug + '" fails ^[a-z0-9][a-z0-9-]*$');
}
const page = await figma.getNodeByIdAsync('731:2');
if (!page || page.type !== 'PAGE') {
  throw new Error('page 731:2 not found or not a PAGE — wrong file open? ask the user to open the Hashi Design System file');
}
await figma.setCurrentPageAsync(page);
if (page.name !== 'Service Logos') {
  throw new Error('page 731:2 is named "' + page.name + '", expected "Service Logos" — wrong file open, ask the user to open Hashi Design System');
}

const compName = 'ServiceLogo/' + P.slug;
const existing = page.children.find((n) => n.type === 'COMPONENT' && n.name === compName);
if (existing && !P.force) {
  return { id: existing.id, key: existing.key, index: null, x: existing.x, y: existing.y, existed: true, created: false };
}

// Index = count of ServiceLogo/* components in document order (page.children is document/z order,
// same convention as every other section/child scan in this skill). A --force replace keeps the
// removed node's own slot; a fresh mark appends at the end (i = count before this write).
const marks = page.children.filter((n) => n.type === 'COMPONENT' && n.name.startsWith('ServiceLogo/'));
let index, x, y;
if (existing) {
  index = marks.indexOf(existing);
  x = existing.x;
  y = existing.y;
  existing.remove();
} else {
  index = marks.length;
  x = 40 + 72 * (index % 10);
  y = 110 + 72 * Math.floor(index / 10);
}

// 1. import — figma.createNodeFromSvg parents the new node to the CURRENT page itself.
const imported = figma.createNodeFromSvg(P.svg);

// 2. constraints — every descendant (including the imported root), before componentization.
// INTENTIONAL EXCEPTION to the S2/S4 BUDGET=10-with-pending chunking convention
// (references/traps.md "Ops budget and chunking", SKILL.md precondition 4): this loop is not
// capped and has no `pending` re-run path. Two reasons, both reviewed here rather than assumed:
//   - componentize (step 3) needs every descendant already constrained — a normalized 24x24
//     mark has one dominant shape but can still import with well over 10 vector leaves, so
//     capping this loop would mean createComponentFromNode runs over a partially-constrained
//     tree, and a resumable second pass would need to re-find the still-unparented `imported`
//     node by id across calls, which nothing in this script's return shape supports today.
//   - `constraints` writes are cheap, single-property sets on an already-created node (no new
//     node, no reparent) — a different write shape than the create/move ops S2/S4 chunk.
// If a normalized mark ever needs so many leaves that this becomes slow or actually hits a
// Figma-side limit, split M1 the way S2/S4 do (return `pending` node ids, re-run) rather than
// silently truncating constraints coverage.
const scaleTargets = [imported, ...imported.findAll(() => true)];
for (const n of scaleTargets) {
  if ('constraints' in n) n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
}

// 3. componentize, name, describe, position.
const component = figma.createComponentFromNode(imported);
component.name = compName;
component.description = 'source: ' + P.sourceUrl + ' · added ' + P.date + ' via figma-blog-cover';
component.x = x;
component.y = y;

// 4. leaf-vector bounds, relative to the component's own origin — for the M2-style sanity number
// only (the real contract was already verified by normalize-service-logo.mjs before this ever
// reached Figma). Never read the component's own absoluteRenderBounds here: on a clipsContent
// frame that returns the frame's rect, not the ink (references/traps.md) — a leaf-node union is
// the only measurement that cannot be fooled by an empty-looking-full box.
// identical copy in m2-verify-mark.js — change both
function isLeaf(n) {
  return !('children' in n) || n.children.length === 0;
}
const leaves = component.findAll(isLeaf);
let bx0 = Infinity, by0 = Infinity, bx1 = -Infinity, by1 = -Infinity;
for (const n of leaves) {
  const b = n.absoluteRenderBounds || n.absoluteBoundingBox;
  if (!b) continue;
  bx0 = Math.min(bx0, b.x);
  by0 = Math.min(by0, b.y);
  bx1 = Math.max(bx1, b.x + b.width);
  by1 = Math.max(by1, b.y + b.height);
}
const leafBounds =
  bx1 > bx0
    ? { x: bx0 - component.x, y: by0 - component.y, width: bx1 - bx0, height: by1 - by0 }
    : null;

return {
  id: component.id,
  key: component.key,
  index,
  x: component.x,
  y: component.y,
  leafBounds,
  existed: !!existing,
  created: true,
};
