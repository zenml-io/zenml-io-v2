/**
 * openSource.ts — the open-source product pages' own sections: the
 * open-source band on each (`labs.open-source-band`: what the free,
 * self-run product is, how to install it, where its code and community
 * live) and Kitaru's eval import band (`labs.eval-import-band`). Facts (install
 * commands, licence, repo URLs, docs URLs) come from their canonical
 * constants, never retyped here.
 */
import { GITHUB_REPO_URL, KITARU_GITHUB_REPO_URL } from "./githubStars";
import type { LabsInstallChip } from "./labs-home";
import { ZENML_DOCS_URL } from "./labs-product-zenml";
import {
  KITARU_DOCS_URL,
  KITARU_INSTALL_CMD,
  KITARU_LICENSE,
} from "./productKitaru";
import { ZENML_INSTALL_CMD } from "./productZenml";

export interface OpenSourceFact {
  title: string;
  body: string;
}

export interface OpenSourceBandContent {
  eyebrow: string;
  headline: string;
  deck: string;
  install: LabsInstallChip;
  github: {
    href: string;
    label: string;
    /** The `/api/github-stars` repo key; absent means zenml. */
    starsRepo?: "kitaru";
    analytics: string;
  };
  facts: readonly [
    OpenSourceFact,
    OpenSourceFact,
    OpenSourceFact,
    OpenSourceFact,
  ];
  links: readonly { label: string; href: string; external?: true }[];
}

const COMMUNITY_SLACK = { label: "Community Slack", href: "/slack" } as const;

export const KITARU_OPEN_SOURCE: OpenSourceBandContent = {
  eyebrow: "Open source",
  headline: "Free to run, yours to keep",
  deck: `Kitaru is ${KITARU_LICENSE}. Install it in one line and run it on your own machine, with your own model keys. No account needed.`,
  install: { cmd: KITARU_INSTALL_CMD, analytics: "Kitaru-OSS-Install" },
  github: {
    href: KITARU_GITHUB_REPO_URL,
    label: "Star on GitHub",
    starsRepo: "kitaru",
    analytics: "Kitaru-OSS-GitHub",
  },
  facts: [
    {
      title: KITARU_LICENSE,
      body: "Read the code, fork it, and run it inside your own product.",
    },
    {
      title: "Runs locally",
      body: "Sessions, reviews and replays live on your machine until you choose to share them.",
    },
    {
      title: "Your model keys",
      body: "Replays call the providers you pick, with your keys and your rate limits.",
    },
    {
      title: "Bring your traces and evals",
      body: "Import traces and scores from Langfuse, LangSmith, Braintrust, MLflow or Phoenix, or wrap your agent in one line.",
    },
  ],
  links: [
    { label: "Docs", href: KITARU_DOCS_URL, external: true },
    {
      label: "Issues",
      href: `${KITARU_GITHUB_REPO_URL}/issues`,
      external: true,
    },
    COMMUNITY_SLACK,
  ],
};

export const ZENML_OPEN_SOURCE: OpenSourceBandContent = {
  eyebrow: "Open source",
  headline: "Open source from day one",
  deck: "ZenML is Apache 2.0. Start on your laptop, then run the same code on your own cluster, without an account.",
  install: { cmd: ZENML_INSTALL_CMD, analytics: "ZenML-OSS-Install" },
  github: {
    href: GITHUB_REPO_URL,
    label: "Star on GitHub",
    analytics: "ZenML-OSS-GitHub",
  },
  facts: [
    {
      title: "Apache 2.0",
      body: "Read the code, fork it, and self-host it for as long as you like.",
    },
    {
      title: "Your infrastructure",
      body: "Pipelines run on your orchestrator, with artifacts in your own store.",
    },
    {
      title: "Bring your stack",
      body: "Plug in the orchestrator, artifact store, tracker and registry you already use.",
    },
    {
      title: "Built in the open",
      body: "Issues, pull requests and every release live on GitHub.",
    },
  ],
  links: [
    { label: "Docs", href: ZENML_DOCS_URL, external: true },
    { label: "Issues", href: `${GITHUB_REPO_URL}/issues`, external: true },
    COMMUNITY_SLACK,
  ],
};

export interface EvalImportStep {
  title: string;
  body: string;
}

export interface EvalImportBandContent {
  eyebrow: string;
  headline: string;
  deck: string;
  sourcesLabel: string;
  sources: readonly string[];
  steps: readonly [EvalImportStep, EvalImportStep, EvalImportStep];
}

/** /product/kitaru: bring the evals a team already runs, next to its traces. */
export const KITARU_EVAL_IMPORT: EvalImportBandContent = {
  eyebrow: "Bring your evals",
  headline: "Import the evals you already run",
  deck: "Your judges, scores and test suites come in with your traces. Kitaru puts each score on the session it judged, so you can see where your evals and your own reviews disagree.",
  sourcesLabel: "Scores and evals from",
  sources: [
    "Langfuse scores",
    "LangSmith feedback",
    "Braintrust scorers",
    "Phoenix annotations",
    "MLflow",
    "promptfoo",
    "Inspect",
    "DeepEval",
    "pytest judges",
  ],
  steps: [
    {
      title: "Scores land on sessions",
      body: "Each imported score sits on the session or step it judged, with the judge prompt that produced it.",
    },
    {
      title: "See where they disagree",
      body: "Review a few sessions. Kitaru shows which judges pass what you would fail, and what no eval checks at all.",
    },
    {
      title: "Fix it and replay",
      body: "Recalibrate the judge, add the missing check, and replay your cohorts to prove the change.",
    },
  ],
};
