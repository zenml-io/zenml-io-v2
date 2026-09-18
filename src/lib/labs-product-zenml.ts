/**
 * labs-product-zenml.ts — every visible string, link and analytics event of
 * the ZenML product landing (`/product/zenml`) in the Labs shell.
 *
 * Copy rules: ZenML tier of the house voice; the product's hook is its lead
 * line ("AI orchestration, on the infra you choose"); registered company
 * assets are quoted verbatim or not at all; Kitaru is named as an entity
 * only; one headline, one deck, at most two pills per band, no helper lines.
 * Facts (install command, links, customer logos, case studies) are imported
 * from their canonical constants, never retyped; the feature tabs name their
 * highlight figure by id and carry a descriptive alt for it.
 * CTA model (2026-09-08 rulings): "Start free" is the one signup label and
 * on this page it leads to the ZenML cloud app; the hero's secondary is a
 * ghost pill to the docs; no "Book a demo".
 */

import type { HighlightFigureId } from "../components/labs/highlights/ids";
import type { Surface } from "./analytics";
import { CASE_STUDY_CARDS, type FeatureTab, LOGO_CLOUD } from "./homepage";
import type {
  LabsCta,
  LabsProductBandContent,
  LogoGridContent,
  StoryCardsContent,
} from "./labs-home";
import { LABS_SIGNUP } from "./labs-home";
import {
  PRODUCT_ZENML_SEO,
  ZENML_INSTALL_CMD,
  ZENML_LINKS,
} from "./productZenml";

export const ZENML_DOCS_URL =
  "https://docs.zenml.io/getting-started/introduction";

export const LABS_PRODUCT_ZENML_SEO = {
  ...PRODUCT_ZENML_SEO,
  surface: "ml" satisfies Surface,
} as const;

/* ---------------------------------------------------------------------- */
/* CTAs + analytics (`data-analytics` IS the Plausible event name)          */
/* ---------------------------------------------------------------------- */

/** The one signup action on this page: same label as the homepage, ZenML's own app. */
const ZENML_SIGNUP = {
  label: LABS_SIGNUP.label,
  href: ZENML_LINKS.signup.href,
} as const;

export const ZENML_HERO_SIGNUP: LabsCta = {
  ...ZENML_SIGNUP,
  analytics: "Hero-Signup-ZenML",
};
export const ZENML_HERO_SECONDARY: LabsCta = {
  label: "Read the docs",
  href: ZENML_DOCS_URL,
  analytics: "Hero-Secondary-ZenML",
};
export const ZENML_FINAL_SIGNUP: LabsCta = {
  ...ZENML_SIGNUP,
  analytics: "Final-Signup-ZenML",
};
export const ZENML_VALUE_PROPS_CTA: LabsCta = {
  ...ZENML_SIGNUP,
  analytics: "ValueProps-CTA-ZenML",
};
export const ZENML_INTEGRATIONS_CTA: LabsCta = {
  label: "See all integrations",
  href: "/integrations",
  analytics: "Integrations-All-ZenML",
};
export const ZENML_STORIES_ALL: LabsCta = {
  label: "All case studies",
  href: "/case-studies",
  analytics: "Stories-All-ZenML",
};

/* ---------------------------------------------------------------------- */
/* 01 Hero                                                                 */
/* ---------------------------------------------------------------------- */

export const ZENML_HERO: LabsProductBandContent = {
  headlineLines: ["AI orchestration,", "on the infra you choose"],
  deck: "Write pipelines and agents in Python. Run them on Kubernetes, Vertex AI, SageMaker, or your laptop, without rewriting the code.",
  cta: ZENML_HERO_SIGNUP,
  secondaryCta: ZENML_HERO_SECONDARY,
  install: { cmd: ZENML_INSTALL_CMD, analytics: "Hero-Install-ZenML" },
};

/* ---------------------------------------------------------------------- */
/* 02 Logo strip                                                           */
/* ---------------------------------------------------------------------- */

export const ZENML_LOGO_GRID: LogoGridContent = {
  headline: "Running ZenML in production",
  logos: LOGO_CLOUD.logos,
};

/* ---------------------------------------------------------------------- */
/* 03 Feature tabs                                                         */
/* ---------------------------------------------------------------------- */

/** A feature tab either draws an inline highlight figure or falls back to a
 * raster image — never both, and never neither, so a tab that names neither
 * is a compile error rather than a silently blank pane. */
export type LabsFeatureTab = Omit<FeatureTab, "image"> &
  (
    | { figure: HighlightFigureId; image?: never }
    | { figure?: never; image: string }
  );

export interface FeatureTabsContent {
  /** Absence collapses the whole headline block (the tabs start the section). */
  headline?: string;
  deck?: string;
  /** Rendered by the FeatureTabsSlider island; a tab draws its `figure`, or
   * its raster `image` when it has no figure. */
  tabs: readonly LabsFeatureTab[];
}

/** Tab copy is ZenML's own (the shared homepage tabs carried cross-product
 * claims). All five tabs now draw an inline highlight figure instead of a
 * screenshot. */
const ZENML_TABS: readonly LabsFeatureTab[] = [
  {
    title: "Unified workflow orchestration",
    description:
      "Orchestrate a scikit-learn training job and a LangGraph agent loop in the same execution model. State, data passing, and termination control work the same way across pipelines and agents.",
    figure: "zenml/orchestration",
    imageAlt:
      "Run graph of research_pipeline: a train_model step and an agent_loop step, each fed by its own artifact, merge into a shared evaluate step",
  },
  {
    title: "Artifact versioning",
    description:
      "ZenML versions every step result: trained models, evaluation datasets, and the artifacts in between. When a library update or a prompt change breaks a run, compare it against the last good one and re-execute the pipeline from any step.",
    figure: "zenml/versioning",
    imageAlt:
      "Artifacts table listing three model versions and three system_prompt versions with their data type and created-at time, one prompt version marked as the compare target",
  },
  {
    title: "Infrastructure abstraction",
    description:
      "Define your compute needs in Python. ZenML handles dockerization, GPU provisioning, and pod scaling, whether the run is a distributed training job or an autonomous agent on Kubernetes. Same code, any cloud.",
    figure: "zenml/infrastructure",
    imageAlt:
      "The k8s-prod stack listing its orchestrator, artifact store, deployer, and sandbox components, with a completed training_pipeline run and an agent_pipeline run still in progress on the same stack",
  },
  {
    title: "Caching and deduplication",
    description:
      "Don't pay for the same compute twice. ZenML caches every step result and reuses it when the code and inputs haven't changed, so an iteration on the last step doesn't re-run the whole pipeline.",
    figure: "zenml/caching",
    imageAlt:
      "Run graph of training_pipeline: train_model and agent_loop are cached, only publish_report re-ran and produced a new report artifact",
  },
  {
    title: "Governance and security",
    description:
      "Turn black-box runs into auditable ones. Centralize API keys and tool credentials instead of scattering them across notebooks and CI. Enforce RBAC, inspect execution traces, and audit the lineage of every run, from the input data to the final agent response.",
    figure: "zenml/governance",
    imageAlt:
      "A Secrets panel listing cloud credentials and a model-provider API key beside an agent_pipeline execution trace: documents in, agent_loop completed, answer out",
  },
];

export const ZENML_FEATURE_TABS: FeatureTabsContent = {
  headline: "One foundation for pipelines and agents",
  tabs: ZENML_TABS,
};

/* ---------------------------------------------------------------------- */
/* 04 Value props                                                          */
/* ---------------------------------------------------------------------- */

export interface ValuePropItem {
  /** Numbered label in place of an icon until the icon set lands ("01." …). */
  index: string;
  title: string;
  body: string;
}

export interface ValuePropsContent {
  headline: string;
  /** Absence collapses the deck line under the headline. */
  deck?: string;
  items: readonly ValuePropItem[];
  cta: LabsCta;
}

export const ZENML_VALUE_PROPS: ValuePropsContent = {
  headline: "Own every layer, swap any of them",
  items: [
    {
      index: "01.",
      title: "Your stack, not ours",
      body: "Run in your VPC, point at your object store, train on your clusters. ZenML holds the metadata. Your artifacts and code stay inside your infrastructure.",
    },
    {
      index: "02.",
      title: "Composable stack, not a monolith",
      body: "Pick your orchestrator, artifact store, experiment tracker, and model registry. Replace any one of them later without rewriting your pipeline.",
    },
    {
      index: "03.",
      title: "Open source, no lock-in",
      body: "Apache 2.0 from day one. Self-host it forever, or add the managed control plane when you need governance, SSO, and an SLA.",
    },
  ],
  cta: ZENML_VALUE_PROPS_CTA,
};

/* ---------------------------------------------------------------------- */
/* 05 Integrations                                                         */
/* ---------------------------------------------------------------------- */

export interface IntegrationsContent {
  headline: string;
  /** Logos come from the `integrations` content collection at build time; the
   * component may state the exact count, never a rounded one. */
  deck?: string;
  cta: LabsCta;
}

export const ZENML_INTEGRATIONS: IntegrationsContent = {
  headline: "Works with the tools you already use",
  deck: "From scikit-learn to LangGraph, PyTorch to the OpenAI Agents SDK.",
  cta: ZENML_INTEGRATIONS_CTA,
};

/* ---------------------------------------------------------------------- */
/* 06 Customer stories                                                     */
/* ---------------------------------------------------------------------- */

export const ZENML_STORIES: StoryCardsContent = {
  headline: "Customer stories",
  allLink: ZENML_STORIES_ALL,
  readLabel: "Read the story",
  cards: CASE_STUDY_CARDS,
};

/* ---------------------------------------------------------------------- */
/* 07 Close                                                                */
/* ---------------------------------------------------------------------- */

export const ZENML_CLOSE: LabsProductBandContent = {
  headlineLines: ["Start on your laptop,", "scale to your cluster"],
  /** The company value proposition, verbatim. */
  deck: "Own your infrastructure, build it the way you want, and keep pace as your organization evolves.",
  cta: ZENML_FINAL_SIGNUP,
  install: { cmd: ZENML_INSTALL_CMD, analytics: "Final-Install-ZenML" },
};
