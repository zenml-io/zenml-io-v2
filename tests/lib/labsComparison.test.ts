import { describe, expect, it } from "vitest";
import { comparisonDisplayHeading } from "../../src/lib/labsComparison";

describe("comparisonDisplayHeading", () => {
  it.each([
    ["Kitaru", "Langfuse", "replay the traces you already store"],
    ["ZenML", "CrewAI", "build the crew, orchestrate it as a pipeline"],
    [
      "ZenML",
      "LangGraph & Deep Agents",
      "self-hosted orchestration vs a packaged platform",
    ],
  ] as const)(
    "removes the duplicated %s versus %s label",
    (product, competitor, headline) => {
      expect(
        comparisonDisplayHeading(`${product} vs ${competitor}: ${headline}`, product),
      ).toBe(headline);
    },
  );

  it("removes the label whatever spelling the competitor uses", () => {
    expect(
      comparisonDisplayHeading("ZenML vs Airflow: Effortlessly Expand Your ML Initiatives", "ZenML"),
    ).toBe("Effortlessly Expand Your ML Initiatives");
    expect(
      comparisonDisplayHeading("ZenML vs AWS SageMaker: Supercharge Your ML Workflows", "ZenML"),
    ).toBe("Supercharge Your ML Workflows");
  });

  it.each([
    "Kitaru vs Langfuse",
    "Kitaru vs Langfuse:",
    "Kitaru vs Langfuse:   ",
  ])("keeps a title with no meaningful remainder: %s", (heading) => {
    expect(comparisonDisplayHeading(heading, "Kitaru")).toBe(heading);
  });

  it("keeps a heading that does not open on this product's label", () => {
    const heading = "Stop Building MLOps on Top of a Workflow Engine";
    expect(comparisonDisplayHeading(heading, "ZenML")).toBe(heading);
    expect(comparisonDisplayHeading("Kitaru vs Langfuse: replay", "ZenML")).toBe(
      "Kitaru vs Langfuse: replay",
    );
    expect(
      comparisonDisplayHeading("DVC versions your data. ZenML runs your pipelines anywhere.", "ZenML"),
    ).toBe("DVC versions your data. ZenML runs your pipelines anywhere.");
  });
});
