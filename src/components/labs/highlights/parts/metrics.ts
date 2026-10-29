/**
 * Shared geometry for the highlight-figure parts. JetBrains Mono advances
 * 0.6em per glyph, so mono labels have an exact width and the pills and chips
 * that wrap them can be sized without measuring the DOM. Widths round to
 * whole pixels so their borders land on the pixel grid.
 */
export const monoWidth = (text: string, size: number): number =>
  text.length * size * 0.6;

/** Artifact pill: 4px lead, 20px type circle, 6px gap, mono 12 name, 10px tail. */
export const pillWidth = (name: string): number =>
  Math.round(4 + 20 + 6 + monoWidth(name, 12) + 10);

/** Type / flavor chip: 6px lead, 14px mark, 4px gap, mono 12 text, 6px tail. */
export const chipWidth = (text: string): number =>
  Math.round(6 + 14 + 4 + monoWidth(text, 12) + 6);

/** Version chip: mono 12 text padded 6px each side. */
export const tagWidth = (text: string): number =>
  Math.round(6 + monoWidth(text, 12) + 6);
