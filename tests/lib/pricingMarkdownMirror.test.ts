import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { GET } from "../../src/pages/pricing.md";

/**
 * The /pricing.md agent mirror is rendered from the same `src/lib/pricing.ts`
 * module as the page. This pins its full output to `tests/snapshots/mirrors/
 * pricing.md` (captured from a production build) so a page restyle cannot
 * drift the copy the mirror publishes. `pnpm smoke:dist` asserts the same
 * file — and `/compare.md`, which needs the content collections — against
 * the built `dist/`. Regenerate the fixture only for a deliberate copy change:
 *
 *   pnpm build && cp dist/client/pricing.md tests/snapshots/mirrors/pricing.md
 */
describe("/pricing.md mirror", () => {
  it("renders byte-identical to the checked-in fixture", async () => {
    const fixture = readFileSync(
      new URL("../snapshots/mirrors/pricing.md", import.meta.url),
      "utf8",
    );
    const response = GET();
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(await response.text()).toBe(fixture);
  });
});
