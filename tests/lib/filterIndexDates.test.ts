import { describe, expect, it } from "vitest";
import { formatUtcDate } from "../../src/components/islands/filter-index/dates";

// Post dates are midnight-UTC instants. West of UTC, local-timezone
// formatting would shift them a day earlier (Apr 17 renders as Apr 16 in
// the Americas) — formatUtcDate must pin the calendar date to UTC.
describe("formatUtcDate", () => {
  it("formats a midnight-UTC instant as its UTC calendar date under a timezone west of UTC", () => {
    const previousTz = process.env.TZ;
    process.env.TZ = "America/New_York";
    try {
      // Precondition: the runtime honors the TZ switch — local formatting
      // of this instant really lands on the previous day. Without this,
      // the assertion below would pass vacuously in a UTC environment.
      const local = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
      }).format(new Date("2024-04-17T00:00:00.000Z"));
      expect(local).toBe("16");

      expect(formatUtcDate("2024-04-17T00:00:00.000Z")).toBe("Apr 17, 2024");
    } finally {
      process.env.TZ = previousTz;
    }
  });

  it("formats plainly under UTC as well", () => {
    const previousTz = process.env.TZ;
    process.env.TZ = "UTC";
    try {
      expect(formatUtcDate("2024-12-31T00:00:00.000Z")).toBe("Dec 31, 2024");
    } finally {
      process.env.TZ = previousTz;
    }
  });
});
