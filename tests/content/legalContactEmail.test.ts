import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CONTACT_EMAIL } from "../../src/lib/constants";

// Markdown bodies cannot interpolate TS constants, so the legal content
// carries the contact email as a literal. This test is the drift guard the
// constant's doc comment points at: if CONTACT_EMAIL changes, the legal
// content must be updated in the same change.
describe("legal content contact email", () => {
  it("terms-of-service.md carries the canonical CONTACT_EMAIL literal", () => {
    const body = readFileSync("src/content/legal/terms-of-service.md", "utf8");
    expect(body).toContain(`mailto:${CONTACT_EMAIL}`);
  });
});
