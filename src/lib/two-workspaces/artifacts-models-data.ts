/**
 * Artifacts & Models tab data — TwoWorkspaces v2 · ZenML · artboard A3L-0.
 *
 * This is a MERGED tab (replaces the old separate Artifacts + Models tabs).
 * All copy is transcribed verbatim from the Paper artboard.
 *
 * STATIC — no row-switching. One selected item (churn_predictor) is always
 * shown in the detail pane.
 */

// ─── List types ───────────────────────────────────────────────────────────────

export type ArtifactOrModelType = "artifact" | "model";

export type ListRow = {
  /** Unique id */
  id: string;
  /** snake_case display name */
  name: string;
  /** "artifact" → database icon (ndarray/json/…); "model" → star/sparkle icon */
  kind: ArtifactOrModelType;
  /** Sub-meta line: e.g. "sklearn · v18 · PROD" or "ndarray · 12.4 MB" */
  meta: string;
  /** Relative age shown at the far right, e.g. "2h" */
  age: string;
  /** When true, this is the selected/active row */
  selected?: boolean;
};

// ─── Detail header ─────────────────────────────────────────────────────────--

export type DetailHeader = {
  /** Icon kind — drives icon shown in the 36×36 purple tile */
  kind: ArtifactOrModelType;
  name: string;
  /** e.g. "v18 of 18" — rendered in zenml-600 mono */
  version: string;
  /** sha · framework · size meta line, e.g. "6c5e0a14 · sklearn 1.4 · 2.4 MB" */
  meta: string;
};

// ─── Version-evolution chart ───────────────────────────────────────────────--

export type VersionAxisStop = {
  /** e.g. "v1", "v8 · DEV", "v18 · PROD" */
  label: string;
  /** When true, render in zenml-700 (the current / PROD stop) */
  accent?: boolean;
};

export type VersionEvolutionChart = {
  /** Eyebrow, e.g. "Version Evolution" */
  title: string;
  /** e.g. "18 versions · +4.2pt since v1" */
  subtitle: string;
  /** 4-stop axis row under the chart line */
  axis: [VersionAxisStop, VersionAxisStop, VersionAxisStop, VersionAxisStop];
};

// ─── Metadata rail ────────────────────────────────────────────────────────--

export type MetaField = {
  label: string;
  value: string;
  /** When true, value renders in zenml-600 color */
  accent?: boolean;
};

export type MetadataRail = {
  fieldCount: string;
  fields: ReadonlyArray<MetaField>;
};

// ─── Lineage strip ────────────────────────────────────────────────────────--

export type LineageCrumb = {
  /** Full sentence, e.g. "Produced by step predict_on_endpoint · used by model churn_predictor·v18 · deployed to kubernetes-prod" */
  text: string;
};

// ─── Env strip ────────────────────────────────────────────────────────────--

export type EnvBadge = {
  label: "SHADOW" | "CANARY" | string;
  /** Tailwind bg token for the badge background, e.g. "bg-amber-100" */
  bg: string;
  /** Tailwind text token for badge text, e.g. "text-amber-800" */
  textColor: string;
};

export type EnvCard = {
  /** Environment label, e.g. "PROD" */
  env: "PROD" | "STAGE" | "DEV" | "CANARY";
  /** dot color: "green" | "amber" | "blue" */
  dotColor: "green" | "amber" | "blue";
  /** e.g. "v18" or "v18·rc2" — large mono display */
  version: string;
  /** e.g. "vertex · 2 endpoints" */
  meta: string;
  /** e.g. "99.97% uptime" / "promoted 3h ago" / "accuracy +0.4pt vs v18" */
  detail: string;
  /** When true, card renders dark (PROD card style) */
  dark?: boolean;
  badge?: EnvBadge;
};

export type EnvStrip = {
  /** e.g. "3 envs · 4 endpoints" */
  summary: string;
  cards: ReadonlyArray<EnvCard>;
};

// ─── Footer strip ─────────────────────────────────────────────────────────--

export type FooterStrip = {
  label: string;
  counts: string;
  /** e.g. "last promoted 3h ago" */
  lastActivity: string;
};

// ─── Top-level data shape ─────────────────────────────────────────────────--

export type ArtifactsModelsData = {
  /** Left-pane header */
  listTitle: string;
  listSubtitle: string;
  listCountLabel: string;
  /** Combined artifacts + models list */
  rows: ReadonlyArray<ListRow>;
  /** Right-pane content for the selected item (churn_predictor) */
  detail: {
    header: DetailHeader;
    chart: VersionEvolutionChart;
    metadata: MetadataRail;
    lineage: LineageCrumb;
    envStrip: EnvStrip;
  };
  footer: FooterStrip;
};

// ─── Data ─────────────────────────────────────────────────────────────────--

export const ARTIFACTS_MODELS_DATA: ArtifactsModelsData = {
  listTitle: "Artifacts · Models",
  listSubtitle: "12 tracked · last 24h",
  listCountLabel: "12 total",

  rows: [
    {
      id: "churn_predictor",
      name: "churn_predictor",
      kind: "model",
      meta: "sklearn · v18 · PROD",
      age: "2h",
      selected: true,
    },
    {
      id: "features",
      name: "features",
      kind: "artifact",
      meta: "ndarray · 12.4 MB",
      age: "2h",
    },
    {
      id: "labels",
      name: "labels",
      kind: "artifact",
      meta: "ndarray · 2.1 MB",
      age: "2h",
    },
    {
      id: "fraud_scorer",
      name: "fraud_scorer",
      kind: "model",
      meta: "xgboost · v32 · STAGE",
      age: "5h",
    },
    {
      id: "predictions",
      name: "predictions",
      kind: "artifact",
      meta: "ndarray · 384 KB",
      age: "3h",
    },
    {
      id: "sentiment_v2",
      name: "sentiment_v2",
      kind: "model",
      meta: "transformers · v07 · STAGE",
      age: "6h",
    },
    {
      id: "feature_stats",
      name: "feature_stats",
      kind: "artifact",
      meta: "json · 8.2 KB",
      age: "9h",
    },
    {
      id: "recsys_recall",
      name: "recsys_recall",
      kind: "model",
      meta: "lightgbm · v44 · DEV",
      age: "11h",
    },
  ],

  detail: {
    header: {
      kind: "model",
      name: "churn_predictor",
      version: "v18 of 18",
      meta: "6c5e0a14 · sklearn 1.4 · 2.4 MB",
    },

    chart: {
      title: "Version Evolution",
      subtitle: "18 versions · +4.2pt since v1",
      axis: [
        { label: "v1" },
        { label: "v8 · DEV" },
        { label: "v12 · STAGE" },
        { label: "v18 · PROD", accent: true },
      ],
    },

    metadata: {
      fieldCount: "4 fields",
      fields: [
        { label: "accuracy", value: "0.926", accent: true },
        { label: "f1 score", value: "0.911" },
        { label: "train rows", value: "47,392" },
        { label: "promoted", value: "v18 → PROD" },
      ],
    },

    lineage: {
      text: "Produced by step predict_on_endpoint · used by model churn_predictor·v18 · deployed to kubernetes-prod",
    },

    envStrip: {
      summary: "3 envs · 4 endpoints",
      cards: [
        {
          env: "PROD",
          dotColor: "green",
          version: "v18",
          meta: "vertex · 2 endpoints",
          detail: "99.97% uptime",
          dark: true,
        },
        {
          env: "STAGE",
          dotColor: "amber",
          version: "v18",
          meta: "k8s · shadow traffic",
          detail: "promoted 3h ago",
          badge: {
            label: "SHADOW",
            bg: "bg-amber-100",
            textColor: "text-amber-800",
          },
        },
        {
          env: "CANARY",
          dotColor: "blue",
          version: "v18·rc2",
          meta: "vertex · 5% rollout",
          detail: "accuracy +0.4pt vs v18",
        },
      ],
    },
  },

  footer: {
    label: "Registry",
    counts: "42 models · 248 artifacts",
    lastActivity: "last promoted 3h ago",
  },
};
