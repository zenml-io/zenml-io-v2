/**
 * Date formatting for FilterIndex cards. Post dates are midnight-UTC
 * instants (`2024-04-17T00:00:00.000Z`) — formatting them in the visitor's
 * local timezone would shift the displayed day west of UTC (Apr 17 renders
 * as Apr 16 across the Americas), so the calendar date is always read in
 * UTC.
 */
export function formatUtcDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
