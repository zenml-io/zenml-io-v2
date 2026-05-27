/**
 * Data for the Deployments subtab — TwoWorkspaces v2 · Kitaru · artboard A3R-0.
 *
 * Shape:
 *   - `DEPLOYMENTS_LIST`  — 5 left-pane rows (letter badge, name, version/env,
 *     status pill). First row is selected (support_agent).
 *   - `ENV_CARDS`         — 3 right-pane cards (PROD / CANARY / DEV) with
 *     traffic label, version, deployer, timestamp, action button, and history.
 *   - `RIGHT_HEADER`      — static eyebrow + title + context chip for the right pane.
 *   - `CAPABILITY_PILLS`  — runtime-capability pill row beneath the title.
 *   - `FOOTER_META`       — bottom strip text (left) + status dot (right).
 *
 * All copy is verbatim from artboard A3R-0. No values are invented.
 */

export type DeploymentStatus = "PROD" | "CANARY" | "DEV" | "ROLLED BACK";

export type DeploymentRow = {
  /** Single uppercase letter for the letter badge. */
  letter: string;
  /** Snake-case deployment / flow name. */
  name: string;
  /** Subtitle shown beneath name: version · env. */
  subtitle: string;
  /** Status pill label. */
  status: DeploymentStatus;
  /** Whether this is the pre-selected row. */
  selected: boolean;
};

export type EnvCardAction = {
  label: string;
  /** "outline" = white bg, border-only button. "primary" = orange fill. */
  variant: "outline" | "primary";
  /** Icon key. */
  icon: "rollback" | "promote" | "shadow";
};

export type EnvCardHistoryEntry = {
  version: string;
  age: string;
};

export type EnvCard = {
  /** Environment label rendered in ALL CAPS. */
  env: "PROD" | "CANARY" | "DEV";
  /** Traffic label shown top-right, e.g. "100% traffic" | "5% shadow" | "dev only". */
  trafficLabel: string;
  /** Big version number. */
  version: string;
  /** Deployer · timestamp, e.g. "Hamza · deployed 3h ago". */
  deployerMeta: string;
  action: EnvCardAction;
  history: ReadonlyArray<EnvCardHistoryEntry>;
};

/* ------------------------------------------------------------------ */
/* Left-pane deployment list                                            */
/* ------------------------------------------------------------------ */

export const DEPLOYMENTS_LIST: ReadonlyArray<DeploymentRow> = [
  {
    letter: "S",
    name: "support_agent",
    subtitle: "v3.2.1 · prod",
    status: "PROD",
    selected: true,
  },
  {
    letter: "R",
    name: "report_agent",
    subtitle: "v3.2.2-rc · canary",
    status: "CANARY",
    selected: false,
  },
  {
    letter: "L",
    name: "lead_qualifier",
    subtitle: "v1.4.0 · prod",
    status: "PROD",
    selected: false,
  },
  {
    letter: "D",
    name: "doc_summarizer",
    subtitle: "v2.0.0-rc · dev",
    status: "DEV",
    selected: false,
  },
  {
    letter: "I",
    name: "invoice_router",
    subtitle: "v0.9.4 · rolled back",
    status: "ROLLED BACK",
    selected: false,
  },
] as const;

/* ------------------------------------------------------------------ */
/* Right-pane header                                                    */
/* ------------------------------------------------------------------ */

export const RIGHT_HEADER = {
  eyebrow: "DURABLE BY DEFAULT",
  title: "Versioned deployments. Promote, shadow, or roll back.",
  /** Top-right context chip. */
  contextChip: "support_agent · v3.2.1",
} as const;

/* ------------------------------------------------------------------ */
/* Runtime-capability pills                                             */
/* ------------------------------------------------------------------ */

export const CAPABILITY_PILLS: ReadonlyArray<string> = [
  "checkpoint",
  "replay",
  "wait / resume",
  "fan-out",
] as const;

/* ------------------------------------------------------------------ */
/* Environment cards                                                    */
/* ------------------------------------------------------------------ */

export const ENV_CARDS: ReadonlyArray<EnvCard> = [
  {
    env: "PROD",
    trafficLabel: "100% traffic",
    version: "v3.2.1",
    deployerMeta: "Hamza · deployed 3h ago",
    action: {
      label: "Roll back to v3.2.0",
      variant: "outline",
      icon: "rollback",
    },
    history: [
      { version: "v3.2.0", age: "2d" },
      { version: "v3.1.5", age: "5d" },
    ],
  },
  {
    env: "CANARY",
    trafficLabel: "5% shadow",
    version: "v3.2.2-rc",
    deployerMeta: "Priya · deployed 32m ago",
    action: {
      label: "Promote to prod",
      variant: "primary",
      icon: "promote",
    },
    history: [
      { version: "v3.2.1-rc", age: "6h" },
      { version: "v3.2.0-rc", age: "3d" },
    ],
  },
  {
    env: "DEV",
    trafficLabel: "dev only",
    version: "v3.3.0-dev",
    deployerMeta: "Adam · deployed 8m ago",
    action: {
      label: "Shadow on canary",
      variant: "outline",
      icon: "shadow",
    },
    history: [
      { version: "v3.2.9-dev", age: "1h" },
      { version: "v3.2.8-dev", age: "5h" },
    ],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Footer meta strip                                                    */
/* ------------------------------------------------------------------ */

export const FOOTER_META = {
  left: "5 deployments · 3 envs · last promotion 3h ago",
  rightLabel: "healthy",
} as const;
