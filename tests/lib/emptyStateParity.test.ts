/**
 * EmptyState twin contract parity (#248).
 *
 * `EmptyState.astro` and `EmptyState.tsx` are documented as "same contract,
 * same markup, same classes" — the Preact twin exists only because islands
 * can't import `.astro` components. The contract itself is enforced at
 * compile time: both twins take the single shared `EmptyStateRendererProps`
 * from `emptyStateStyles.ts` and declare no Props of their own (they did
 * once, and `.astro` grew `id` while `.tsx` silently didn't). This test
 * guards that structure two ways:
 *
 * 1. Source-level: each twin must reference the shared renderer type and
 *    must NOT declare a local `interface Props` — the shape that made the
 *    drift possible.
 * 2. Rendered-output: importing the real `EmptyState.tsx` component and
 *    calling it directly (no JSX in this file — it stays a plain `.ts`)
 *    proves the props actually reach the DOM, not just the type.
 *
 * Note: `preact-render-to-string` is a transitive dependency of
 * `@astrojs/preact` only (not hoisted under this repo's strict pnpm
 * install), so it isn't importable from a test file. The component function
 * is called directly instead — it's a plain stateless function, so calling
 * it IS rendering it; the returned Preact vnode tree is asserted on directly
 * rather than serialized to an HTML string.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import EmptyState from "../../src/components/system/EmptyState";
import {
  EMPTY_STATE_ACTION_WRAP,
  EMPTY_STATE_DESCRIPTION,
  EMPTY_STATE_HEADING,
  EMPTY_STATE_INNER,
  emptyStateActionClasses,
  emptyStateContainerClasses,
} from "../../src/components/system/emptyStateStyles";

const here = dirname(fileURLToPath(import.meta.url));
const astroPath = resolve(here, "../../src/components/system/EmptyState.astro");
const tsxPath = resolve(here, "../../src/components/system/EmptyState.tsx");

// biome-ignore lint/suspicious/noExplicitAny: EmptyState's return type isn't exported; treated as an opaque Preact vnode for the structural assertions below.
type PreactVnode = any;

/** Calls the real EmptyState function — a plain stateless component, so calling it IS rendering it. */
function render(props: Parameters<typeof EmptyState>[0]): PreactVnode {
  return EmptyState(props);
}

describe("EmptyState twin contract parity", () => {
  const twins = [
    ["EmptyState.astro", readFileSync(astroPath, "utf-8")],
    ["EmptyState.tsx", readFileSync(tsxPath, "utf-8")],
  ] as const;

  it("derives both twins' Props from the shared EmptyStateRendererProps", () => {
    for (const [label, source] of twins) {
      expect(
        source.includes("EmptyStateRendererProps"),
        `${label} must use the shared renderer contract from emptyStateStyles.ts`,
      ).toBe(true);
    }
  });

  it("declares no local Props on either twin", () => {
    // A local `interface Props` is the shape that let the twins drift apart
    // (`.astro` grew `id`, `.tsx` silently didn't) — the contract lives in
    // emptyStateStyles.ts and nowhere else.
    for (const [label, source] of twins) {
      expect(
        /interface\s+Props/.test(source),
        `${label} must not declare its own Props on top of the shared contract`,
      ).toBe(false);
    }
  });
});

describe("EmptyState.tsx rendered output", () => {
  it("forwards id onto the outer div when passed", () => {
    const vnode = render({ heading: "Nothing here", id: "my-empty-state" });

    expect(vnode.type).toBe("div");
    expect(vnode.props.id).toBe("my-empty-state");
  });

  it("omits id on the outer div when not passed", () => {
    const vnode = render({ heading: "Nothing here" });

    expect(vnode.props.id).toBeUndefined();
  });

  it("defaults role to status", () => {
    const vnode = render({ heading: "Nothing here" });

    expect(vnode.props.role).toBe("status");
  });

  it("renders no role attribute when role is explicitly null", () => {
    const vnode = render({ heading: "Nothing here", role: null });

    expect(vnode.props.role).toBeUndefined();
  });

  it("uses the shared container/inner classes for the default (non-override) shape", () => {
    const vnode = render({ heading: "Nothing here" });
    const expectedContainerClass = emptyStateContainerClasses(
      true,
      undefined,
      undefined,
    );

    expect(vnode.props.class).toBe(expectedContainerClass);

    const innerVnode = vnode.props.children;
    expect(innerVnode.type).toBe("div");
    expect(innerVnode.props.class).toBe(EMPTY_STATE_INNER);
  });

  it("renders the heading and, when present, the description", () => {
    const withDescription = render({
      heading: "No entries tagged this yet",
      description: "0 of 2,026 database entries match.",
    });
    const [headingNode, descriptionNode] =
      withDescription.props.children.props.children;

    expect(headingNode.type).toBe("p");
    expect(headingNode.props.class).toBe(EMPTY_STATE_HEADING);
    expect(headingNode.props.children).toBe("No entries tagged this yet");

    expect(descriptionNode.type).toBe("p");
    expect(descriptionNode.props.class).toBe(EMPTY_STATE_DESCRIPTION);
    expect(descriptionNode.props.children).toBe(
      "0 of 2,026 database entries match.",
    );

    const withoutDescription = render({ heading: "No entries" });
    const [, missingDescriptionNode] =
      withoutDescription.props.children.props.children;

    expect(missingDescriptionNode).toBeFalsy();
  });

  it("renders at most one action as a styled link", () => {
    const withAction = render({
      heading: "No entries",
      action: {
        href: "/llmops-database",
        label: "Browse all entries",
        weight: "solid",
        analytics: "empty-state-browse-all",
        external: true,
      },
    });
    const [, , actionWrapNode] = withAction.props.children.props.children;

    expect(actionWrapNode.type).toBe("div");
    expect(actionWrapNode.props.class).toBe(EMPTY_STATE_ACTION_WRAP);

    const linkNode = actionWrapNode.props.children;
    expect(linkNode.type).toBe("a");
    expect(linkNode.props.href).toBe("/llmops-database");
    expect(linkNode.props.class).toBe(emptyStateActionClasses("solid"));
    expect(linkNode.props["data-analytics"]).toBe("empty-state-browse-all");
    expect(linkNode.props.target).toBe("_blank");
    expect(linkNode.props.rel).toBe("noopener noreferrer");
    expect(linkNode.props.children).toBe("Browse all entries");

    const withoutAction = render({ heading: "No entries" });
    const [, , missingActionWrapNode] =
      withoutAction.props.children.props.children;

    expect(missingActionWrapNode).toBeFalsy();
  });
});
