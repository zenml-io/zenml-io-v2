import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildPricingJsonLd } from "../../src/lib/pricingJsonLd";

/**
 * Pins the /pricing structured data (WebPage + BreadcrumbList + FAQPage +
 * two SoftwareApplication offer catalogs) to the checked-in fixture. The
 * pricing page restyle must not change what crawlers read; regenerate the
 * fixture only for a deliberate pricing-fact change:
 *
 *   pnpm exec tsx -e 'import { buildPricingJsonLd } from "./src/lib/pricingJsonLd"; import { writeFileSync } from "node:fs"; writeFileSync("tests/snapshots/pricing-jsonld.json", JSON.stringify(buildPricingJsonLd(), null, 2) + "\n")'
 */
describe("buildPricingJsonLd", () => {
  it("matches the checked-in fixture", () => {
    const fixture = JSON.parse(
      readFileSync(
        new URL("../snapshots/pricing-jsonld.json", import.meta.url),
        "utf8",
      ),
    );
    expect(buildPricingJsonLd()).toEqual(fixture);
  });

  it("emits one Offer per plan in each catalog with the plan's CTA as its url", () => {
    const graph = buildPricingJsonLd()["@graph"] as Record<string, unknown>[];
    const apps = graph.filter(
      (node) => node["@type"] === "SoftwareApplication",
    );
    expect(apps.map((app) => app.name)).toEqual(["Kitaru", "ZenML"]);
    for (const app of apps) {
      const offers = (
        app.offers as { itemListElement: { name: string; url: string }[] }
      ).itemListElement;
      expect(offers).toHaveLength(3);
      for (const offer of offers) {
        expect(offer.url).toMatch(/^https:\/\//);
      }
    }
  });
});
