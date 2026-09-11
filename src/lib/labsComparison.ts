export const LABS_COMPARE_LANGS = ["python", "typescript", "bash"] as const;
export type LabsCompareLang = (typeof LABS_COMPARE_LANGS)[number];

/** The comparison pair already appears in the wordmark/switcher row. */
export function comparisonDisplayHeading(
  heading: string,
  product: "ZenML" | "Kitaru",
  competitor: string,
): string {
  const prefix = `${product} vs ${competitor}:`;
  if (!heading.startsWith(prefix)) return heading;
  return heading.slice(prefix.length).trim() || heading;
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
