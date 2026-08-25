import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildBreadcrumbJsonLd } from "../../src/lib/breadcrumb";

describe("buildBreadcrumbJsonLd", () => {
  it("sets @context and @type", () => {
    const jsonLd = buildBreadcrumbJsonLd([{ label: "Home", href: "/" }]);

    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("BreadcrumbList");
  });

  it("numbers positions 1..n in order", () => {
    const jsonLd = buildBreadcrumbJsonLd([
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "Post title" },
    ]);

    expect(jsonLd.itemListElement.map((item) => item.position)).toEqual([
      1, 2, 3,
    ]);
  });

  it("matches item names to labels", () => {
    const jsonLd = buildBreadcrumbJsonLd([
      { label: "Home", href: "/" },
      { label: "Post title" },
    ]);

    expect(jsonLd.itemListElement.map((item) => item.name)).toEqual([
      "Home",
      "Post title",
    ]);
  });

  it("resolves intermediate items with an href to absolute URLs", () => {
    const jsonLd = buildBreadcrumbJsonLd([
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "Post title" },
    ]);

    expect(jsonLd.itemListElement[0].item).toBe("https://www.zenml.io/");
    expect(jsonLd.itemListElement[1].item).toBe("https://www.zenml.io/blog");
  });

  it("omits the item key on the last item even when it has an href", () => {
    const jsonLd = buildBreadcrumbJsonLd([
      { label: "Home", href: "/" },
      { label: "Current page", href: "/current" },
    ]);

    expect(jsonLd.itemListElement[1]).not.toHaveProperty("item");
  });

  it("omits the item key on an intermediate item without an href", () => {
    const jsonLd = buildBreadcrumbJsonLd([
      { label: "Home", href: "/" },
      { label: "No link here" },
      { label: "Current page" },
    ]);

    expect(jsonLd.itemListElement[1]).not.toHaveProperty("item");
  });

  it("handles a single-item list", () => {
    const jsonLd = buildBreadcrumbJsonLd([{ label: "Home" }]);

    expect(jsonLd.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home" },
    ]);
  });
});

describe("Breadcrumb.astro wiring", () => {
  it("renders its JSON-LD from buildBreadcrumbJsonLd", () => {
    const source = readFileSync(
      join(__dirname, "../../src/components/system/Breadcrumb.astro"),
      "utf-8",
    );

    expect(source).toContain("buildBreadcrumbJsonLd");
    expect(source).toMatch(/<JsonLd\s+data=\{buildBreadcrumbJsonLd\(items\)\}/);
  });
});
