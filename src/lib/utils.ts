/**
 * Utility to combine class names conditionally.
 * Handles strings, arrays, and objects.
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
