/**
 * labs-industries.ts — the industry landing pages (`/insurance`,
 * `/financial-services`): the homepage's story told to one industry, plus a
 * security band and a data-privacy FAQ. They are pages to send to a buyer,
 * linked from the footer and the sitemap, not from the nav.
 *
 * Every page reuses the homepage sections (hero with the AI engineer's work
 * feed, problem, benchmarks, logos, close) with its own copy. Security facts
 * (certifications, deployment options, governance) are the ones /pro and
 * /pricing already publish; the badges come from PRO_COMPLIANCE.
 */
import type { Surface } from "./analytics";
import type {
  LabsCta,
  LabsProductBandContent,
  ProblemBandContent,
  ProductDemoContent,
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
  demo: ProductDemoContent;
  problem: ProblemBandContent;
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

const TRUST_POINTS: readonly TrustPoint[] = [
  {
    title: "Runs where you need it",
    body: "Your AI engineers run in our cloud by default, or on-prem in your own cloud, air-gapped if you need it. Kitaru is open source and runs on your machine.",
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
          "Your traces stay in the tracing tool you already use. By default, your AI engineers run in our cloud and read them through keys you can revoke. Deploy them on-prem and they run inside your own cloud, so nothing leaves your infrastructure.",
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

const INSURANCE_DEMO: ProductDemoContent = {
  label:
    "An AI engineer at work on an insurance underwriting agent. It imports 1,482 quotes' traces from Langfuse, LangSmith and Braintrust where they already live. It reads the agent's code on GitHub and finds the prompt, 12 evals and the underwriting manual. It finds a gap in the evals: quote_completeness passed 41 quotes that left out the flood exclusion for properties in a flood zone, so it drafts a flood_exclusion check. It tests a fix as an experiment on 1,482 past quotes against what runs today: required exclusions go from 97% to 100%, agreement with underwriters from 88.4% to 93.1%, and none of 60 good quotes change. Coming next: it fine-tunes an open model on 36,900 of your quotes that passes 12 of 12 evals at $0.11 a quote instead of $0.41.",
  agent: "underwriting-agent",
  items: [
    {
      kind: "sources",
      text: "Imports your agent traces from where they already live.",
      sources: [
        { name: "Langfuse", logo: "/compare/langfuse.svg" },
        { name: "LangSmith", logo: "/compare/langsmith.svg" },
        { name: "Braintrust", logo: "/compare/braintrust.svg" },
      ],
      count: "1,482 quotes",
    },
    {
      kind: "repo",
      text: "Reads your agent’s code and your manual on GitHub.",
      repo: "acme/underwriting-agent",
      files: ["prompt.py", "evals/ · 12 evals", "uw_manual.md"],
    },
    {
      kind: "gap",
      text: "Finds a gap in your evals.",
      title: "41 quotes left out the flood exclusion",
      body: "All for properties in FEMA flood zones. quote_completeness passed every one.",
      check: "+ flood_exclusion check",
    },
    {
      kind: "experiment",
      text: "Tests a fix against what runs today.",
      title: "Experiment · 1,482 past quotes, 3 runs each",
      columns: ["", "Today", "With the fix"],
      rows: [
        { label: "Required exclusions", current: "97%", candidate: "100%" },
        {
          label: "Agrees with underwriters",
          current: "88.4%",
          candidate: "93.1%",
        },
        { label: "Good quotes changed", current: "", candidate: "0 of 60" },
      ],
      result: "39 of 41 quotes fixed · 2 flagged for an underwriter",
    },
    {
      kind: "finetune",
      text: "Trains a cheaper model on your quotes.",
      tag: "Coming next",
      model: "uw-8b, fine-tuned on 36,900 quotes",
      rows: [
        { label: "Evals passed", value: "12 of 12" },
        { label: "Cost a quote", value: "$0.41 → $0.11", hot: true },
      ],
    },
  ],
  link: {
    label: "See the underwriting benchmark",
    href: "/benchmarks/underwriting",
    analytics: "Insurance-Hero-Benchmark",
  },
};

export const INSURANCE_PAGE: IndustryPageContent = {
  path: "/insurance",
  analytics: "Insurance",
  seo: {
    title: "ZenML Labs for insurance: evals your underwriters trust",
    description:
      "Our AI engineers read your underwriting, claims or appeals agent's traces next to your evals and your guidelines, and show you what the evals miss. SOC 2 Type II and ISO 27001, and it runs in your cloud.",
    surface: "unified",
  },
  hero: {
    headlineLines: ["Evals your underwriters", "would sign off on"],
    deck: "An always-on AI engineering team that checks your agents against your underwriting guidelines, finds what’s broken, and proves the fix works.",
    cta: demo("Insurance-Hero-Demo"),
    secondaryCta: {
      label: "See benchmarks",
      href: "/benchmarks#insurance",
      analytics: "Insurance-Hero-Benchmarks",
    },
  },
  demo: INSURANCE_DEMO,
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
        "Any agent whose traces you already collect: quoting, underwriting triage, claims intake, appeals and customer service. It reads traces from Langfuse, LangSmith, Braintrust, Logfire, MLflow or Phoenix.",
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

const FINANCE_DEMO: ProductDemoContent = {
  label:
    "An AI engineer at work on a KYC review agent. It imports 940 cases' traces from Langfuse, LangSmith and Braintrust where they already live. It reads the agent's code on GitHub and finds the prompt, 10 evals and the KYC procedures. It finds a gap in the evals: case_summary_quality passed 29 high-risk cases that closed without a source-of-funds check, so it drafts a source_of_funds check. It tests a fix as an experiment on 940 past cases against what runs today: source of funds checked goes from 81% to 100%, agreement with analysts from 90.2% to 94.0%, and none of 50 good cases change. Coming next: it fine-tunes an open model on 28,400 of your cases that passes 10 of 10 evals at $0.13 a case instead of $0.52.",
  agent: "kyc-agent",
  items: [
    {
      kind: "sources",
      text: "Imports your agent traces from where they already live.",
      sources: [
        { name: "Langfuse", logo: "/compare/langfuse.svg" },
        { name: "LangSmith", logo: "/compare/langsmith.svg" },
        { name: "Braintrust", logo: "/compare/braintrust.svg" },
      ],
      count: "940 cases",
    },
    {
      kind: "repo",
      text: "Reads your agent’s code and your procedures on GitHub.",
      repo: "acme/kyc-agent",
      files: ["prompt.py", "evals/ · 10 evals", "kyc_procedures.md"],
    },
    {
      kind: "gap",
      text: "Finds a gap in your evals.",
      title: "29 high-risk cases closed without a source-of-funds check",
      body: "Every one an enhanced due diligence case. case_summary_quality passed them all.",
      check: "+ source_of_funds check",
    },
    {
      kind: "experiment",
      text: "Tests a fix against what runs today.",
      title: "Experiment · 940 past cases, 3 runs each",
      columns: ["", "Today", "With the fix"],
      rows: [
        { label: "Source of funds checked", current: "81%", candidate: "100%" },
        { label: "Agrees with analysts", current: "90.2%", candidate: "94.0%" },
        { label: "Good cases changed", current: "", candidate: "0 of 50" },
      ],
      result: "28 of 29 cases fixed · 1 flagged for an analyst",
    },
    {
      kind: "finetune",
      text: "Trains a cheaper model on your cases.",
      tag: "Coming next",
      model: "kyc-8b, fine-tuned on 28,400 cases",
      rows: [
        { label: "Evals passed", value: "10 of 10" },
        { label: "Cost a case", value: "$0.52 → $0.13", hot: true },
      ],
    },
  ],
  link: {
    label: "See all benchmarks",
    href: "/benchmarks",
    analytics: "Finance-Hero-Benchmark",
  },
};

export const FINANCIAL_SERVICES_PAGE: IndustryPageContent = {
  path: "/financial-services",
  analytics: "Finance",
  seo: {
    title: "ZenML Labs for financial services: evals your risk team trusts",
    description:
      "Our AI engineers read your KYC, credit or client-service agent's traces next to your evals and your procedures, and show you what the evals miss. SOC 2 Type II and ISO 27001, and it runs in your cloud.",
    surface: "unified",
  },
  hero: {
    headlineLines: ["Evals your risk team", "can stand behind"],
    deck: "An always-on AI engineering team that checks your agents against your procedures, finds what’s broken, and proves the fix works.",
    cta: demo("Finance-Hero-Demo"),
  },
  demo: FINANCE_DEMO,
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
  trust: trust(
    "Run it on-prem and customer records, transactions and case files never leave your walls. You choose where it runs and which models it calls.",
  ),
  faq: faq([
    {
      question: "Which agents does it work with?",
      answer:
        "Any agent whose traces you already collect: KYC and onboarding review, credit memos, fraud triage and client service. It reads traces from Langfuse, LangSmith, Braintrust, Logfire, MLflow or Phoenix.",
    },
    {
      question: "Where is our data hosted?",
      answer:
        "On hosted plans you choose an EU or US region, and we process data under GDPR with a data processing agreement. On-prem, everything stays in your own cloud.",
    },
    {
      question: "What about DORA?",
      answer:
        "Your AI engineers keep the testing records and audit trail that DORA and model risk reviews ask for, and on-prem they run inside your own ICT estate. They don't make you compliant on their own; they give your second line the evidence.",
    },
  ]),
  close: {
    headlineLines: ["Bring one agent", "and a week of traces"],
    deck: "We'll show you what your evals miss on your own data, and which checks your risk team would actually stand behind.",
    cta: demo("Finance-Final-Demo"),
  },
};
