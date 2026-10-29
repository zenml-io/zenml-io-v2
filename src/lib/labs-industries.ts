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
  link: LabsCta;
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
    title: "Runs where you need it",
    body: "Your AI engineer runs in our cloud by default, or on-prem in your own cloud, air-gapped if you need it. Kitaru is open source and runs on your machine.",
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
    link: {
      label: "Visit the trust center",
      href: "https://security.zenml.io",
      analytics: "Industry-Trust-Center",
    },
  };
}

function faq(extra: FaqData["items"]): FaqData {
  return {
    headline: "Questions from security and risk",
    items: [
      {
        question: "Where do our traces go?",
        answer:
          "Your traces stay in the tracing tool you already use. By default, your AI engineer runs in our cloud and reads them through keys you can revoke. Deploy it on-prem and it runs inside your own cloud, so nothing leaves your infrastructure.",
      },
      {
        question: "Can we use our own models?",
        answer:
          "Yes. Judges and replays call the providers you pick with your keys, and you can point them at models you host yourself.",
      },
      {
        question: "Which certifications do you hold?",
        answer:
          'ZenML holds a SOC 2 Type II report and ISO 27001 certification. Reports and policies are in our <a href="https://security.zenml.io">trust center</a>.',
      },
      {
        question: "Can it run air-gapped?",
        answer:
          'Yes. ZenML Pro supports multi-region and air-gapped deployments. See <a href="/deployments">deployment options</a>.',
      },
      {
        question: "Can we show model risk how it was tested?",
        answer:
          "Yes. Every reviewed session, verdict, check and replay is kept with who decided and when. Export it as evidence for model validation, your model risk committee or an audit.",
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
  eyebrow: "Missed this week",
  agent: "underwriting-agent",
  window: "1,482 sessions",
  scores: [
    { label: "Your evals", value: 91 },
    { label: "Your manual", value: 74 },
  ],
  kindLabels: KIND_LABELS,
  items: [
    {
      kind: "wrong",
      title: "No flood exclusion",
      count: "41",
    },
    {
      kind: "missing",
      title: "Stale loss runs",
      count: "58",
    },
    {
      kind: "missing",
      title: "Uninspected sprinkler credit",
      count: "37",
    },
  ],
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
  onboarding: { ...LABS_ONBOARDING, eyebrow: "How it works" },
  trust: trust(
    "Run it on-prem and policyholder data, loss runs and inspection reports never leave your walls. You choose where it runs and which models it calls.",
  ),
  benchmarks: {
    eyebrow: "Benchmarks",
    headline: "Tested on insurance work",
    deck: "We run real claims, appeals and underwriting work through open and frontier models, and let our AI engineer improve the agent batch after batch. Every result publishes its method, its noise and its limits.",
    slugs: ["claims-over-time", "underwriting"],
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
        "Any agent whose traces you already collect: quoting, underwriting triage, claims intake, appeals and customer service. It reads traces from Langfuse, LangSmith, Braintrust, Logfire or Phoenix.",
    },
    {
      question: "Does it help with state AI rules?",
      answer:
        "It gives you the testing records that AI governance rules ask for, such as the NAIC model bulletin many states have adopted. It doesn't make you compliant on its own; it gives your compliance team the evidence.",
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
  eyebrow: "Missed this week",
  agent: "kyc-review-agent",
  window: "2,106 cases",
  scores: [
    { label: "Your evals", value: 93 },
    { label: "Your procedures", value: 71 },
  ],
  kindLabels: KIND_LABELS,
  items: [
    {
      kind: "wrong",
      title: "No source-of-funds check",
      count: "33",
    },
    {
      kind: "missing",
      title: "Stale adverse media",
      count: "46",
    },
    {
      kind: "missing",
      title: "PEP closed by one reviewer",
      count: "21",
    },
  ],
};

const FINANCE_ONBOARDING: OnboardingStepsContent = {
  ...LABS_ONBOARDING,
  eyebrow: "How it works",
  steps: [
    {
      title: "Connect your repos",
      body: "Install the GitHub app and add your tracing keys. It finds your agent, the evals you already run and the procedures they should follow.",
      widget: {
        kind: "connect",
        repos: [
          {
            name: "kyc-review-agent",
            role: "Agent",
            detail: "LangGraph · 7 tools",
          },
          { name: "kyc-evals", role: "Evals", detail: "9 judges · pytest" },
          {
            name: "kyc-procedures",
            role: "Manual",
            detail: "KYC procedures · 31 rules",
          },
        ],
      },
    },
    {
      title: "A short interview",
      body: "Your AI engineer asks you a few questions about what it found, in the browser or in Slack. Tap to answer.",
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
      body: "Right after, it tells you what your evals missed last week, in the order you said you care about. More follows in Slack.",
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
    "Run it on-prem and customer records, transactions and case files never leave your walls. You choose where it runs and which models it calls.",
  ),
  faq: faq([
    {
      question: "Which agents does it work with?",
      answer:
        "Any agent whose traces you already collect: KYC and onboarding review, credit memos, fraud triage and client service. It reads traces from Langfuse, LangSmith, Braintrust, Logfire or Phoenix.",
    },
    {
      question: "Where is our data hosted?",
      answer:
        "On hosted plans you choose an EU or US region, and we process data under GDPR with a data processing agreement. On-prem, everything stays in your own cloud.",
    },
    {
      question: "What about DORA?",
      answer:
        "Your AI engineer keeps the testing records and audit trail that DORA and model risk reviews ask for, and on-prem it runs inside your own ICT estate. It doesn't make you compliant on its own; it gives your second line the evidence.",
    },
  ]),
  close: {
    headlineLines: ["Bring one agent", "and a week of traces"],
    deck: "We'll show you what your evals miss on your own data, and which checks your risk team would actually stand behind.",
    cta: demo("Finance-Final-Demo"),
  },
};
