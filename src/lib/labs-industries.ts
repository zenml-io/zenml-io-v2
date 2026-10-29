/**
 * labs-industries.ts — the industry landing pages (`/insurance`,
 * `/financial-services`): the homepage's story told to one industry, plus a
 * security band and a data-privacy FAQ. They are pages to send to a buyer,
 * linked from the footer and the sitemap, not from the nav.
 *
 * Every page reuses the homepage sections (hero with the gap card, problem,
 * eval therapy steps, logos, close) with its own copy. Security facts
 * (certifications, deployment options, governance) are the ones /pro and
 * /pricing already publish; the badges come from PRO_COMPLIANCE.
 */
import type { Surface } from "./analytics";
import {
  type GapReportVisualContent,
  LABS_ONBOARDING,
  type LabsCta,
  type LabsProductBandContent,
  type OnboardingStepsContent,
  type ProblemBandContent,
} from "./labs-home";
import type { FaqData } from "./marketingPageTypes";
import { PRO_COMPLIANCE } from "./pro";

/* ---------------------------------------------------------------------- */
/* Shared parts                                                            */
/* ---------------------------------------------------------------------- */

export interface BenchmarkBandContent {
  eyebrow: string;
  headline: string;
  deck: string;
  /** Report slugs, in card order. */
  slugs: readonly string[];
  link: LabsCta;
}

export interface TrustPoint {
  title: string;
  body: string;
}

export interface TrustBandContent {
  eyebrow: string;
  headline: string;
  deck: string;
  badges: readonly { url: string; alt: string }[];
  points: readonly TrustPoint[];
}

export interface IndustryPageContent {
  /** The route, without a trailing slash. */
  path: string;
  /** Prefix for every Plausible event on the page. */
  analytics: string;
  seo: { title: string; description: string; surface: Surface };
  hero: LabsProductBandContent;
  gapReport: GapReportVisualContent;
  problem: ProblemBandContent;
  onboarding: OnboardingStepsContent;
  trust: TrustBandContent;
  /** Absent when no published benchmark fits the industry. */
  benchmarks?: BenchmarkBandContent;
  faq: FaqData;
  close: LabsProductBandContent;
}

const DEMO = { label: "Request demo", href: "/book-your-demo" } as const;

function demo(analytics: string): LabsCta {
  return { ...DEMO, analytics };
}

const KIND_LABELS = { wrong: "Wrong", missing: "Missing" } as const;

const TRUST_POINTS: readonly TrustPoint[] = [
  {
    title: "Runs in your cloud",
    body: "Kitaru is open source and self-hosts in one command. ZenML Pro runs single-tenant in your own cloud, and air-gapped where you need it.",
  },
  {
    title: "Your models, your keys",
    body: "Judges and replays call the providers you choose with your own keys, including models you host yourself.",
  },
  {
    title: "SOC 2 Type II and ISO 27001",
    body: "Independently audited for security, availability and confidentiality.",
  },
  {
    title: "SSO, roles and audit logs",
    body: "SAML or OIDC single sign-on, SCIM provisioning, custom roles and org-wide audit logs.",
  },
  {
    title: "Your encryption keys",
    body: "Bring your own keys for encryption, and choose the region your data lives in.",
  },
  {
    title: "A record of every change",
    body: "Reviewed sessions, verdicts and replays are kept, so you can show how each change was tested before it shipped.",
  },
];

function trust(deck: string): TrustBandContent {
  return {
    eyebrow: "Security",
    headline: "Built for regulated data",
    deck,
    badges: PRO_COMPLIANCE.badges,
    points: TRUST_POINTS,
  };
}

function faq(extra: FaqData["items"]): FaqData {
  return {
    headline: "Questions from security and risk",
    items: [
      {
        question: "Where do our traces go?",
        answer:
          "They stay where they are. Kitaru reads them from the tracing tool you already use. Self-hosted, nothing leaves your infrastructure; on ZenML Pro, your workspace is a single-tenant deployment that can run in your own cloud.",
      },
      {
        question: "Can we use our own models?",
        answer:
          "Yes. Judges and replays call the providers you pick with your keys, and you can point them at models you host yourself.",
      },
      {
        question: "Which certifications do you hold?",
        answer:
          'ZenML is SOC 2 Type II and ISO 27001 certified. <a href="/contact">Ask us</a> for the reports and our security documentation.',
      },
      {
        question: "Can it run air-gapped?",
        answer:
          'Yes. ZenML Pro supports multi-region and air-gapped deployments. See <a href="/deployments">deployment options</a>.',
      },
      ...extra,
    ],
  };
}

/* ---------------------------------------------------------------------- */
/* Insurance                                                               */
/* ---------------------------------------------------------------------- */

const INSURANCE_GAPS: GapReportVisualContent = {
  label:
    "An example of what your AI engineer tells you about an insurance underwriting agent, Oct 21 to 27. The team's evals pass 91% of last week's sessions; by the team's own underwriting manual, 74% should pass. A completeness judge passed 41 quotes without the flood exclusion, 58 quotes were priced on loss runs older than 90 days, and 37 took a sprinkler credit with no inspection report. No eval checks the last two.",
  eyebrow: "What your evals missed this week",
  agent: "underwriting-agent",
  window: "Oct 21 to 27 · 1,482 sessions",
  scores: [
    { label: "Your evals pass", value: 91 },
    { label: "Your manual passes", value: 74 },
  ],
  kindLabels: KIND_LABELS,
  items: [
    {
      kind: "wrong",
      title: "Passes quotes without the flood exclusion",
      source: "quote_completeness",
      count: "41",
    },
    {
      kind: "missing",
      title: "Quotes priced on loss runs older than 90 days",
      source: "UW 4.2",
      count: "58",
    },
    {
      kind: "missing",
      title: "Sprinkler credit with no inspection report",
      source: "UW 5.1",
      count: "37",
    },
  ],
  note: "From your AI engineer",
};

export const INSURANCE_PAGE: IndustryPageContent = {
  path: "/insurance",
  analytics: "Insurance",
  seo: {
    title: "ZenML Labs for insurance: evals your underwriters trust",
    description:
      "Our AI engineer reads your underwriting, claims or appeals agent's traces next to your evals and your guidelines, and shows you what the evals miss. SOC 2 Type II and ISO 27001, and it runs in your cloud.",
    surface: "unified",
  },
  hero: {
    headlineLines: ["Evals your underwriters", "would sign off on"],
    deck: "Our AI engineer reads your agent's traces next to your evals and your underwriting guidelines, and shows you what the evals miss.",
    cta: demo("Insurance-Hero-Demo"),
    secondaryCta: {
      label: "See benchmarks",
      href: "/benchmarks#insurance",
      analytics: "Insurance-Hero-Benchmarks",
    },
  },
  gapReport: INSURANCE_GAPS,
  problem: {
    eyebrow: "The problem",
    headlineLines: [
      "The dashboard says 91%.",
      "Underwriters still redo the quotes.",
    ],
    deck: "Your agent quotes, triages claims or drafts appeals, and its traces already land in your tracing tool. The evals say it's fine. Your underwriters keep finding the same mistakes.",
    points: [
      {
        title: "The manual moves, the judges don't",
        body: "Guidelines change every quarter. The judges were written against last year's.",
      },
      {
        title: "Someone will ask how you tested it",
        body: "A pass rate is not an answer when a regulator or a broker asks why a quote was priced the way it was.",
      },
      {
        title: "Nobody wants the job",
        body: "Every hour an underwriter spends grading an agent is an hour not spent underwriting.",
      },
    ],
  },
  onboarding: LABS_ONBOARDING,
  trust: trust(
    "Policyholder data, loss runs and inspection reports stay inside your walls. You choose where it runs and which models it calls.",
  ),
  benchmarks: {
    eyebrow: "Benchmarks",
    headline: "Tested on insurance work",
    deck: "We run real underwriting and appeals tasks through open and frontier models, and publish the method, the noise and the limits.",
    slugs: ["underwriting", "decision-agents"],
    link: {
      label: "All insurance benchmarks",
      href: "/benchmarks#insurance",
      analytics: "Insurance-Benchmarks-All",
    },
  },
  faq: faq([
    {
      question: "Which agents does it work with?",
      answer:
        "Any agent whose traces you already collect: quoting, underwriting triage, claims intake, appeals and customer service. It reads traces from Langfuse, LangSmith, Braintrust, MLflow or Phoenix.",
    },
  ]),
  close: {
    headlineLines: ["Bring one agent", "and a week of traces"],
    deck: "We'll show you what your evals miss on your own data, and which checks your underwriters would actually sign off on.",
    cta: demo("Insurance-Final-Demo"),
  },
};

/* ---------------------------------------------------------------------- */
/* Financial services                                                      */
/* ---------------------------------------------------------------------- */

const FINANCE_GAPS: GapReportVisualContent = {
  label:
    "An example of what your AI engineer tells you about a KYC review agent, Oct 21 to 27. The team's evals pass 93% of last week's cases; by the team's own procedures, 71% should pass. A completeness judge passed 33 cases with no source-of-funds check, 46 cases treated adverse-media hits older than 12 months as clear, and 21 closed a PEP match without a second reviewer. No eval checks the last two.",
  eyebrow: "What your evals missed this week",
  agent: "kyc-review-agent",
  window: "Oct 21 to 27 · 2,106 cases",
  scores: [
    { label: "Your evals pass", value: 93 },
    { label: "Your procedures pass", value: 71 },
  ],
  kindLabels: KIND_LABELS,
  items: [
    {
      kind: "wrong",
      title: "Passes cases with no source-of-funds check",
      source: "case_completeness",
      count: "33",
    },
    {
      kind: "missing",
      title: "Adverse media older than 12 months treated as clear",
      source: "KYC 3.4",
      count: "46",
    },
    {
      kind: "missing",
      title: "PEP matches closed without a second reviewer",
      source: "KYC 6.2",
      count: "21",
    },
  ],
  note: "From your AI engineer",
};

const FINANCE_ONBOARDING: OnboardingStepsContent = {
  ...LABS_ONBOARDING,
  steps: [
    {
      title: "Connect your repo and your traces",
      body: "Install the GitHub app, pick your tracing provider and paste two keys. It finds your agent, your eval code and the scores you already track.",
      widget: {
        kind: "connect",
        repos: [
          { name: "kyc-review-agent", role: "Agent" },
          { name: "kyc-evals", role: "Evals" },
        ],
        providers: ["Langfuse", "LangSmith", "Braintrust", "MLflow", "Phoenix"],
        picked: "LangSmith",
      },
    },
    {
      title: "A short eval therapy call",
      body: "Your AI engineer calls you, on your phone or in the browser, and asks at most three questions about what it found. Tap to answer.",
      widget: {
        kind: "call",
        context: "case_completeness has passed every case for 30 days.",
        question: "Do you trust it?",
        options: ["Yes", "Not really", "Never checked"],
        picked: "Not really",
      },
    },
    {
      title: "Hear what your evals miss",
      body: "Seconds after you hang up, it tells you what your evals missed last week, in the order you said you care about. More follows in Slack.",
      widget: {
        kind: "report",
        items: FINANCE_GAPS.items.slice(0, 2),
        kindLabels: KIND_LABELS,
      },
    },
    {
      title: "Fifteen minutes a week",
      body: "Three real cases and about ten quick questions. Your answers become a calibrated check and a frozen set of cases.",
      widget: {
        kind: "review",
        session: "Case #8812 · onboarding",
        excerpt:
          "Business account · UK Ltd · Turnover £2.4M. Source of funds: not provided.",
        question: "Should this case have passed?",
        options: ["Pass", "Fail"],
      },
    },
  ],
};

export const FINANCIAL_SERVICES_PAGE: IndustryPageContent = {
  path: "/financial-services",
  analytics: "Finance",
  seo: {
    title: "ZenML Labs for financial services: evals your risk team trusts",
    description:
      "Our AI engineer reads your KYC, credit or client-service agent's traces next to your evals and your procedures, and shows you what the evals miss. SOC 2 Type II and ISO 27001, and it runs in your cloud.",
    surface: "unified",
  },
  hero: {
    headlineLines: ["Evals your risk team", "can stand behind"],
    deck: "Our AI engineer reads your agent's traces next to your evals and your procedures, and shows you what the evals miss.",
    cta: demo("Finance-Hero-Demo"),
  },
  gapReport: FINANCE_GAPS,
  problem: {
    eyebrow: "The problem",
    headlineLines: [
      "The dashboard says 93%.",
      "Analysts still check every case.",
    ],
    deck: "Your agent reviews KYC cases, drafts credit memos or answers clients, and its traces already land in your tracing tool. Nobody can say which of its evals to trust.",
    points: [
      {
        title: "Procedures move, judges don't",
        body: "Policies change with every audit finding. The judges were written against the old ones.",
      },
      {
        title: "Second line asks for proof",
        body: "Risk and compliance want to see how a change was tested before it ships. A pass rate is not an answer.",
      },
      {
        title: "Nobody wants the job",
        body: "Every hour an analyst spends grading an agent is an hour not spent on cases.",
      },
    ],
  },
  onboarding: FINANCE_ONBOARDING,
  trust: trust(
    "Customer records, transactions and case files stay inside your walls. You choose where it runs and which models it calls.",
  ),
  faq: faq([
    {
      question: "Which agents does it work with?",
      answer:
        "Any agent whose traces you already collect: KYC and onboarding review, credit memos, fraud triage and client service. It reads traces from Langfuse, LangSmith, Braintrust, MLflow or Phoenix.",
    },
  ]),
  close: {
    headlineLines: ["Bring one agent", "and a week of traces"],
    deck: "We'll show you what your evals miss on your own data, and which checks your risk team would actually stand behind.",
    cta: demo("Finance-Final-Demo"),
  },
};
