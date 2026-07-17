import { describe, expect, it } from "vitest";
import {
  absoluteUrl,
  buildCanonical,
  compareOgUrl,
  resolveSeo,
} from "../../src/lib/seo";

describe("seo helpers", () => {
  it("leaves absolute URLs unchanged", () => {
    expect(absoluteUrl("https://example.com/path")).toBe(
      "https://example.com/path",
    );
    expect(absoluteUrl("http://example.com/path")).toBe(
      "http://example.com/path",
    );
  });

  it("expands root-relative and bare paths to site URLs", () => {
    expect(absoluteUrl("/product/kitaru")).toBe(
      "https://www.zenml.io/product/kitaru",
    );
    expect(absoluteUrl("product/zenml")).toBe(
      "https://www.zenml.io/product/zenml",
    );
  });

  it("builds clean canonical URLs", () => {
    expect(buildCanonical("/")).toBe("https://www.zenml.io");
    expect(buildCanonical("/index.html")).toBe("https://www.zenml.io");
    expect(buildCanonical("/product/kitaru.html")).toBe(
      "https://www.zenml.io/product/kitaru",
    );
    expect(buildCanonical("/blog/")).toBe("https://www.zenml.io/blog");
  });

  it("returns canonical overrides unchanged", () => {
    expect(buildCanonical("/ignored", "https://canonical.example/post")).toBe(
      "https://canonical.example/post",
    );
  });

  it("builds compare OG URLs from the slug", () => {
    const url = compareOgUrl("kitaru-vs-langgraph");

    expect(url).toContain("kitaru-vs-langgraph");
    expect(url).toMatch(/\.jpg$/);
  });

  it("fills default SEO values", () => {
    expect(resolveSeo({ title: "Demo" }, "/demo")).toEqual({
      title: "Demo",
      description: "ZenML — Build portable, production-ready MLOps pipelines.",
      canonical: "https://www.zenml.io/demo",
      ogTitle: "Demo",
      ogDescription:
        "ZenML — Build portable, production-ready MLOps pipelines.",
      ogImage: "https://www.zenml.io/images/og-default.jpg",
      twitterCard: "summary_large_image",
      noindex: false,
    });
  });

  it("expands root-relative OG images and respects explicit Twitter/noindex values", () => {
    expect(
      resolveSeo(
        {
          title: "Custom",
          description: "Custom description",
          ogImage: "/images/custom.jpg",
          twitterCard: "summary",
          noindex: true,
        },
        "/custom.html",
      ),
    ).toMatchObject({
      canonical: "https://www.zenml.io/custom",
      description: "Custom description",
      ogDescription: "Custom description",
      ogImage: "https://www.zenml.io/images/custom.jpg",
      twitterCard: "summary",
      noindex: true,
    });
  });
});
