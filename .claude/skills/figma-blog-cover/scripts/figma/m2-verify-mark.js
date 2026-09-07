// m2-verify-mark.js — READ-ONLY. Re-measure one ServiceLogo/<slug> component after M1 (or to
// audit an existing mark) against the contract: 24x24 root, ~20px dominant ink, centred ~(12,12).
//
// P = { id }
//
// This is a sanity re-check in Figma's own renderer, not a re-run of the contract check —
// normalize-service-logo.mjs already verified dominant=20±0.1 / centre=(12,12)±0.1 with resvg
// before this SVG ever reached Figma. Figma's geometry engine and resvg's raster measurement can
// disagree by a bit more than that tolerance on the same artwork, so expect "close to 20 / close
// to (12,12)", not an exact match — a value that is wildly off (e.g. dominant < 10 or > 24, or a
// centre nowhere near (12,12)) means something went wrong in M1 (a clipped import, a leaf missed
// by the SCALE-constraint loop), not that the earlier contract check was wrong.
// The number here can never replace looking at the mark — get_screenshot the id separately and
// LOOK (references/add-mark.md, Visual acceptance): a blank, flattened, or wrong-brand mark can
// still measure "correctly" by this geometry alone.
const P = __PARAMS__;
const page = await figma.getNodeByIdAsync('731:2');
if (!page || page.type !== 'PAGE') {
  throw new Error('page 731:2 not found or not a PAGE — wrong file open? ask the user to open the Hashi Design System file');
}
await figma.setCurrentPageAsync(page);
if (page.name !== 'Service Logos') {
  throw new Error('page 731:2 is named "' + page.name + '", expected "Service Logos" — wrong file open, ask the user to open Hashi Design System');
}

const component = await figma.getNodeByIdAsync(P.id);
if (!component) throw new Error('node ' + P.id + ' not found');
if (component.type !== 'COMPONENT') {
  throw new Error('node ' + P.id + ' is a ' + component.type + ', not a COMPONENT');
}

// identical copy in m1-create-mark.js — change both
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
const dominant = leafBounds ? Math.max(leafBounds.width, leafBounds.height) : null;
const centre = leafBounds
  ? { x: leafBounds.x + leafBounds.width / 2, y: leafBounds.y + leafBounds.height / 2 }
  : null;

return {
  id: component.id,
  name: component.name,
  key: component.key,
  size: { width: component.width, height: component.height },
  leafCount: leaves.length,
  leafBounds,
  dominant,
  centre,
};
