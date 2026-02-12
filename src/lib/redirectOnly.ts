/**
 * Redirect-only route registry — single source of truth for pages that
 * exist solely to redirect visitors to an external URL.
 *
 * Phase 3H-7: rendered as thin .astro pages with noindex + JS redirect.
 * Phase 4: converted to Cloudflare Pages _redirects 301 rules (and pages removed).
 */

export interface RedirectOnlyRoute {
  /** Local path (must start with /) */
  path: `/${string}`;
  /** Absolute destination URL */
  destination: string;
  /** Implementation priority */
  priority: "p0" | "p1" | "p2";
  /** Optional label for the fallback link */
  label?: string;
}

export const REDIRECT_ONLY_ROUTES: RedirectOnlyRoute[] = [
  // P0 — referenced in navigation.ts / footer.ts
  {
    path: "/slack",
    destination:
      "https://join.slack.com/t/zenml/shared_invite/zt-3j68xwsxy-C_GyybZPDPxKG0OwSJgwFg",
    priority: "p0",
    label: "Join ZenML on Slack",
  },
  {
    path: "/roadmap",
    destination: "https://github.com/orgs/zenml-io/projects/1",
    priority: "p0",
    label: "ZenML Roadmap on GitHub",
  },

  // P1
  {
    path: "/slack-invite",
    destination:
      "https://join.slack.com/t/zenml/shared_invite/zt-3j68xwsxy-C_GyybZPDPxKG0OwSJgwFg",
    priority: "p1",
    label: "Join ZenML on Slack",
  },
  {
    path: "/discussion",
    destination: "https://github.com/zenml-io/zenml/discussions",
    priority: "p1",
    label: "ZenML GitHub Discussions",
  },

  // P2
  {
    path: "/meet",
    destination:
      "https://www.eventbrite.de/e/zenml-meet-the-community-tickets-354426688767",
    priority: "p2",
    label: "ZenML Community Meetup",
  },
  {
    path: "/zenml-meet",
    destination:
      "https://www.eventbrite.de/e/zenml-meet-the-community-tickets-354426688767",
    priority: "p2",
    label: "ZenML Community Meetup",
  },
  {
    path: "/components",
    destination: "https://zenml-io.github.io/react-component-library",
    priority: "p2",
    label: "ZenML Component Library",
  },
];
