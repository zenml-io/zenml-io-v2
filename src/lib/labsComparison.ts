export const LABS_COMPARE_LANGS = ["python", "typescript", "bash"] as const;
export type LabsCompareLang = (typeof LABS_COMPARE_LANGS)[number];

/** The comparison pair already appears in the wordmark/switcher row. */
/**
 * The band already shows "<product> vs <competitor>" as the wordmark and the
 * switcher, so a heading that opens on that label repeats it. Strip the label
 * whatever competitor spelling it uses; keep a heading that would be left empty.
 */
export function comparisonDisplayHeading(
  heading: string,
  product: "ZenML" | "Kitaru",
): string {
  const remainder = heading
    .replace(new RegExp(`^${product} vs [^:]+:\\s*`), "")
    .trim();
  return remainder || heading;
}

export interface CompareSwitcherOption {
  href: string;
  label: string;
  mark?: { url: string; alt: string };
}

export interface CompareSwitcherGroup {
  label: string;
  options: readonly CompareSwitcherOption[];
}
