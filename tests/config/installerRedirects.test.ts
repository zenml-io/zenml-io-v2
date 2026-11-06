import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const redirects = readFileSync("public/_redirects", "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => {
    const [from, to, status] = line.split(/\s+/);
    return { from, to, status: Number(status) };
  });

describe("installer redirects", () => {
  it.each([
    [
      "install",
      "https://raw.githubusercontent.com/zenml-io/zenml/main/install.sh",
    ],
    [
      "install-zenml",
      "https://raw.githubusercontent.com/zenml-io/zenml/main/install-zenml.sh",
    ],
    ["install-kitaru", "https://kitaru.ai/install"],
  ])("keeps every %s alias on its maintained script", (slug, target) => {
    for (const suffix of ["", "/", ".sh", ".sh/"]) {
      expect(
        redirects.filter(({ from }) => from === `/${slug}${suffix}`),
      ).toEqual([{ from: `/${slug}${suffix}`, to: target, status: 302 }]);
    }
  });

  it("uses only exact installer paths, leaving other website routes alone", () => {
    const installerPaths = redirects
      .filter(({ from }) => from.startsWith("/install"))
      .map(({ from }) => from);
    expect(installerPaths).toHaveLength(12);
    for (const pathname of installerPaths) {
      expect(pathname).toMatch(/^\/install(?:-zenml|-kitaru)?(?:\.sh)?\/?$/);
    }
  });
});
