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
        comparisonDisplayHeading(
          `${product} vs ${competitor}: ${headline}`,
          product,
          competitor,
        ),
      ).toBe(headline);
    },
  );

  it.each([
    "Kitaru vs Langfuse",
    "Kitaru vs Langfuse:",
    "Kitaru vs Langfuse:   ",
  ])("keeps a title with no meaningful remainder: %s", (heading) => {
    expect(comparisonDisplayHeading(heading, "Kitaru", "Langfuse")).toBe(
      heading,
    );
  });

  it("does not strip an unrelated or already meaningful title", () => {
    const heading = "Stop Building MLOps on Top of a Workflow Engine";
    expect(comparisonDisplayHeading(heading, "ZenML", "Argo Workflows")).toBe(
      heading,
    );
    expect(
      comparisonDisplayHeading(
        "ZenML vs Airflow: a comparison",
        "ZenML",
        "DBOS",
      ),
    ).toBe("ZenML vs Airflow: a comparison");
  });
});
