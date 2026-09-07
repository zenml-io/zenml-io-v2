# Blog Covers grid

Canvas geometry of the Blog Covers page (`174:1785`). Every number below is verified against the live 2026 column (see `figma-ids.md`). All child coordinates are **section-relative**; verification reads `absoluteBoundingBox` only.

## Constants

| Name | Value | Meaning |
|---|---|---|
| `COLS` | 5 | covers per row |
| `X0` | 160 | x of column 0 inside the section |
| `DX` | 2120 | column pitch (1920 wide + 200 gap) |
| `Y0` | 240 | y of row 0 inside the section |
| `DY` | 1280 | row pitch (1080 high + 200 gap) |
| section width | 10720 | `X0 + 4*DX + 1920 + 160` |
| section height | `1480 + (rows - 1) * 1280` | `rows = ceil(n / 5)`, minimum 1480 |
| section gap | 400 | vertical gap between sections in a column |
| column x | `11620 * (2026 - year)` | one column per year, newest year at x 0 |

## Slot → position

Slot `s` (0-based) inside a month section: `col = s % 5`, `row = floor(s / 5)`, `x = X0 + col * DX`, `y = Y0 + row * DY`.
Slots 0–4 → x 160, 2280, 4400, 6520, 8640 at y 240; slots 5–9 at y 1520; and so on.

## Ordering

- Within a section: covers ordered by post `date` **descending** — slot 0 is the newest post; ties break on slug ascending (find-slot). The order comes from every post of that month in `src/content/blog/` (drafts included); S1's live siblings are only cross-checked against it, never used as the order.
  Example (August 2026 after `braintrust-alternatives`, dated 2026-08-31): `[braintrust-alternatives, introducing-the-new-kitaru, trigger-dev-alternatives, inngest-alternatives]`, `rows = 1`; the three existing covers each shift one slot right.
- Sections filled by the 2026-08-27/28 batch do not all follow this order (`figma-ids.md` lists the known ones); S5 only reports them when run with a `--month` `P` for that section, and only a deliberate `find-slot.ts --month` reflow rewrites them. A new post's own month is always reflowed to this order by S4.
- Within a column: sections ordered by name **descending** (newest month at y 0). Section name = `YYYY-MM · <Month name> YYYY`, e.g. `2026-09 · September 2026`.

## Reflow algorithm (find-slot computes, S2/S4 write)

1. Build the ordered slug list for the month from S1's siblings plus the new slug (dedupe by name).
2. Assign slot `i` to list index `i`; compute every x/y from the constants.
3. `rows = ceil(n / 5)`; section height = `1480 + (rows - 1) * 1280`.
4. Column pass: walk the year's sections in name-descending order; `y[0] = 0`, `y[k] = y[k-1] + height[k-1] + 400`. A new section for the newest month sits at y 0 and pushes every later section down by `1480 + 400 = 1880`; a section that grew by a row pushes later sections down by 1280.
5. Emit: the section moves (id, new y, new height) and the child positions (id or name, x, y). Re-running with the same inputs emits the same numbers — nothing depends on the current canvas positions.

## Write chunking

Both outputs are written at most **10 ops per `use_figma` call**, one op per node touched: S2 writes the section create (if any) plus section moves until the budget is spent and returns the rest in `pending` — re-run S2 while `pending` is non-empty (only y-values that differ are written). S4 writes a section resize (if any) plus child moves the same way (max 20 covers per section → two or three calls). S5 then verifies every touched section in one read-only pass. A month whose section must be reflowed without a target post (a post moved out of it) uses `find-slot.ts --month YYYY-MM`, which emits the same geometry with `slug: null`.
