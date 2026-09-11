/**
 * Homepage static data — all copy, links, stats, and logo URLs
 * centralized here so marketing can update without touching components.
 */

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */
export const HERO = {
  headline: "Ship AI you can trust.",
  subheadline:
    "Orchestrate ML and Agent workloads on your infrastructure. Modular, flexible, and open-source, always.",
  primaryCta: {
    label: "Book a demo",
    href: "/book-your-demo",
  },
  secondaryCta: { label: "Read Docs", href: "/docs" },
  githubUrl: "https://github.com/zenml-io/zenml",
};

/* ------------------------------------------------------------------ */
/*  Logo Cloud (trust bar)                                            */
/* ------------------------------------------------------------------ */
export interface LogoItem {
  name: string;
  src: string;
  width?: number;
  height?: number;
  maxWidth?: string;
  /** Render a name-only stub when the real asset is pending. */
  placeholder?: boolean;
}

import { R2_WEBFLOW_BASE } from "./constants";

const R2 = R2_WEBFLOW_BASE;

export const LOGO_CLOUD: { label: string; logos: LogoItem[] } = {
  label: "Trusted by teams shipping AI workflows and agents",
  logos: [
    { name: "AXA", src: `${R2}/5f1b0e8a/670e2f23b0b89bea22ecee3c_axa-min.svg` },
    {
      name: "JetBrains",
      src: `${R2}/60b5e34d/670e2f23ee3f2feee5e7e7e2_jetbrains-min.svg`,
    },
    { name: "ADEO", src: "/images/logos/adeo.png" },
    {
      name: "Leroy Merlin",
      src: "/images/logos/leroy-merlin.svg",
    },
    { name: "Brevo", src: "/images/logos/brevo.svg", maxWidth: "80px" },
    { name: "Safran", src: "/images/logos/safran.png" },
    { name: "AECOM", src: "/images/logos/aecom.svg" },
    {
      name: "Airbus Defence & Space",
      src: `${R2}/6a2ae7e3/670e2f23d254a9be9e02e50f_airbus.svg`,
    },
    { name: "Rohlik", src: "/images/logos/rohlik.svg" },
    { name: "Knuspr", src: "/images/logos/knuspr.svg" },
    { name: "Maven Robotics", src: "/images/logos/maven.svg" },
    { name: "CrossScreen Media", src: "/images/logos/cross-screen-media.png" },
    { name: "GEMA", src: "/images/logos/gema.svg" },
    { name: "Homa Games", src: "/images/logos/homa.svg" },
    { name: "Koble", src: `${R2}/db4b0c5a/670e2f2331d7f8f62e12458e_koble.svg` },
    { name: "IKEA", src: "/images/logos/ikea.svg" },
    { name: "Sciemo", src: "/images/logos/sciemo.png" },
    { name: "Vodafone", src: "/images/logos/vodafone.svg" },
    { name: "Stepstone", src: "/images/logos/stepstone.svg" },
    { name: "Neara", src: "/images/logos/neara.svg" },
    { name: "Rivian", src: "/images/logos/rivian.svg" },
    { name: "Happening XYZ", src: "/images/logos/happeningxyz.png" },
    { name: "Veridas", src: "/images/logos/veridas.svg" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Stats                                                             */
/* ------------------------------------------------------------------ */
export const STATS = [
  { value: "78%", label: "faster time‑to‑market" },
  { value: "65%", label: "reduced engineering overhead" },
  { value: "3x", label: "more workflows in production" },
  { value: "5x", label: "faster time to production" },
];

/* ------------------------------------------------------------------ */
/*  Feature Tabs                                                      */
/* ------------------------------------------------------------------ */
export interface FeatureTab {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const FEATURE_TABS_HEADER = {
  eyebrow: "The platform advantage",
  headline: "One foundation.",
  subheadline: "AI workflows and agents.",
};

export const FEATURE_TABS: FeatureTab[] = [
  {
    title: "Unified Workflow Orchestration",
    description:
      "Stop glue-coding your stack. Orchestrate scikit-learn training jobs and long-running LangGraph agent loops in the same unified execution model. State management, data passing, and termination control across training pipelines and agent flows.",
    image: `${R2}/70e94eb1/68d1536e3bb1899a400a8dec_tab01.avif`,
    imageAlt:
      "Unified workflow orchestration dashboard showing ML and agent runs",
  },
  {
    title: "Artifact & Checkpoint Versioning",
    description:
      '"It worked on my machine" is not a strategy. Every step result is versioned: trained models, evaluation datasets, and recorded agent executions alike. When a library update or prompt change breaks a run, inspect the diff, replay the recorded execution, and roll back to a working state instantly.',
    image: `${R2}/6a1e96df/68d273e1d31e42957153098b_tab02.avif`,
    imageAlt: "Artifact and checkpoint versioning view",
  },
  {
    title: "Infrastructure Abstraction",
    description:
      "Define your compute needs in Python. The platform handles dockerization, GPU provisioning, and pod scaling, whether you're running a distributed training job or deploying an agent swarm on Kubernetes. Same code, any cloud.",
    image: `${R2}/ba122f13/68d122c72dcdb1f17db0ea87_tab03.avif`,
    imageAlt: "Infrastructure abstraction across clouds",
  },
  {
    title: "Smart Caching & Deduplication",
    description:
      "Don't pay for the same compute twice. Native caching skips redundant training epochs, and replay reuses recorded tool calls instead of paying for them again. Drastically lower the latency and API cost of your evaluation pipelines and replayed executions.",
    image: `${R2}/7d0c3d45/694a97d1ae458c9398b52aef_tab04.avif`,
    imageAlt: "Smart caching and deduplication across runs",
  },
  {
    title: "Governance & Security",
    description:
      "Turn black-box runs into visible, auditable systems. Centralize API keys and tool credentials so they never leak. Enforce RBAC, visualize execution traces, and audit the full lineage of every run — from raw data input to final agent response.",
    image: `${R2}/2e5d2f96/68d15caa8322157742ada8fd_tab05.avif`,
    imageAlt: "Governance and security dashboard",
  },
];

/* ------------------------------------------------------------------ */
/*  Integrations Marquee                                              */
/* ------------------------------------------------------------------ */
export const INTEGRATIONS_MARQUEE = {
  headline: "Works with the tools you already use",
  subheadline:
    "60+ integrations across the AI ecosystem, from scikit-learn to LangGraph, PyTorch to OpenAI Agents SDK.",
  primaryCta: { label: "Book a demo", href: "/book-your-demo" },
  secondaryCta: { label: "See all integrations", href: "/integrations" },
};

/* ------------------------------------------------------------------ */
/*  Customer Stories                                                  */
/* ------------------------------------------------------------------ */
export interface CaseStudyCard {
  companyLogo: string;
  companyLogoAlt: string;
  secondaryLogo?: string;
  secondaryLogoAlt?: string;
  title: string;
  href: string;
}

export const CUSTOMER_STORIES_HEADER = {
  headline: "Customer Stories",
  subheadline:
    "How engineering teams cut time-to-production and simplify their AI infrastructure.",
};

export const CASE_STUDY_CARDS: CaseStudyCard[] = [
  {
    companyLogo: `${R2}/60b5e34d/670e2f23ee3f2feee5e7e7e2_jetbrains-min.svg`,
    companyLogoAlt: "JetBrains",
    title:
      "Creating a Unified AI Platform: How JetBrains Centralizes ML on Kubernetes with ZenML",
    href: "/case-study/jetbrains",
  },
  {
    companyLogo: `${R2}/c110367c/65c498032806e2ff7daec2bf_ADEO.svg`,
    companyLogoAlt: "ADEO",
    secondaryLogo: "/images/logos/leroy-merlin.svg",
    secondaryLogoAlt: "Leroy Merlin",
    title:
      "How ADEO Leroy Merlin decreased their time-to-market from 2 months to 2 weeks",
    href: "/case-study/adeo-leroy-merlin",
  },
  {
    companyLogo: "/images/logos/brevo.svg",
    companyLogoAlt: "Brevo",
    title: "How Brevo accelerated model development by 80% using ZenML",
    href: "/case-study/brevo",
  },
  {
    companyLogo: `${R2}/9f8b5324/68d6a84a1761cbf9538efefa_cross-screen-media.png`,
    companyLogoAlt: "Cross Screen Media",
    title:
      "How Cross Screen Media Trains Models for 210 Markets in Hours, Not Weeks, with ZenML",
    href: "/case-study/cross-screen-media",
  },
];

/** Testimonial shape for the homepage curated grid */
export interface Testimonial {
  name: string;
  position: string;
  text: string;
  avatarUrl?: string;
  companyLogoUrl?: string;
  /** Fallback when no logo image is available */
  companyName?: string;
}

/**
 * Curated 6-item testimonial grid matching the Webflow homepage.
 * Order: HashiCorp, Salesforce, ADEO, Stanford, WiseTech, MadeWithML.
 * Company logos use colored/dark versions suitable for white backgrounds.
 */
export const HOMEPAGE_TESTIMONIALS: Testimonial[] = [
  {
    name: "Harold Gimenez",
    position: "SVP R&D at HashiCorp",
    text: "ZenML offers the capability to build end-to-end ML workflows that seamlessly integrate with various components of the ML stack. This enables teams to accelerate their time to market by bridging the gap between data scientists and engineers.",
    avatarUrl: `${R2}/31a5f8ee/653297b0b924af52998661bf_harold.webp`,
    companyLogoUrl: `${R2}/8d7e77c8/hashicorp-min.svg`,
    companyName: "HashiCorp",
  },
  {
    name: "Richard Socher",
    position: "Former Chief Scientist Salesforce and Founder of You.com",
    text: "ZenML allows orchestrating ML pipelines independent of any infrastructure or tooling choices. ML teams can free their minds of tooling FOMO from the fast-moving MLOps space, with the simple and extensible ZenML interface.",
    avatarUrl: `${R2}/3725b9aa/66702f264ab301a2a95b1213_richard.webp`,
    companyLogoUrl: `${R2}/4383273c/salesforce.webp`,
    companyName: "Salesforce",
  },
  {
    name: "François Serra",
    position: "ML Engineer / ML Ops / ML Solution architect at ADEO Services",
    text: "ZenML allowed us a fast transition between dev to prod. It's no longer the big fish eating the small fish – it's the fast fish eating the slow fish.",
    avatarUrl: `${R2}/56aef1bf/667bd578695e19dfb6293814_francois.png`,
    companyLogoUrl: `${R2}/c110367c/65c498032806e2ff7daec2bf_ADEO.svg`,
    companyName: "ADEO",
  },
  {
    name: "Chris Manning",
    position: "Professor of Linguistics and CS at Stanford",
    text: "Many teams still struggle with managing models, datasets, code, and monitoring as they deploy ML models into production. ZenML provides a solid toolkit for making that easy in the Python ML world.",
    avatarUrl: `${R2}/39ef3f55/christopher_stanford.avif`,
    companyLogoUrl: `${R2}/e0877660/stanford_logo.webp`,
    companyName: "Stanford University",
  },
  {
    name: "Francesco Pudda",
    position: "Machine Learning Engineer at WiseTech Global",
    text: "Thanks to ZenML we've set up a pipeline where before we had only Jupyter notebooks. It helped us tremendously with data and model versioning.",
    avatarUrl: `${R2}/2d0a68a8/65327258ba7596c721021f2d_pudda.webp`,
    companyLogoUrl: "/images/logos/wisetech.svg",
    companyName: "WiseTech Global",
  },
  {
    name: "Goku Mohandas",
    position: "Founder of MadeWithML",
    text: "ZenML allows you to quickly and responsibly go from POC to production ML systems while enabling reproducibility, flexibility, and above all, sanity.",
    avatarUrl: `${R2}/c9fd250b/667bd428a30ba8fd817731c0_goku_quote.jpeg`,
    companyLogoUrl: `${R2}/2f3c4ecd/madewithml.webp`,
    companyName: "MadeWithML",
  },
];

/** Purple LLMOps banner between case study cards and testimonials */
export const LLMOPS_BANNER = {
  headline: "Track production AI deployments across the industry",
  subtext: "See the LLMOps database →",
  href: "/llmops-database",
};

/* ------------------------------------------------------------------ */
/*  FAQ                                                               */
/* ------------------------------------------------------------------ */
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ = {
  eyebrow: "Support",
  headline: "Frequently asked questions",
  subheadline: "Everything you need to know about the product.",
  slackCta: {
    label: "Still not clear? Ask us on Slack",
    href: "/slack",
  },
  items: [
    {
      question:
        "What is the difference between ZenML and other workflow orchestrators?",
      answer:
        'ZenML doesn\'t take an opinion on the orchestration layer. Start writing locally, deploy on any orchestrator. We support <a href="https://docs.zenml.io/stacks/orchestrators" class="text-zenml-500 underline">many orchestrators</a> natively and can be extended to work with <a href="https://docs.zenml.io/stacks/orchestrators/custom" class="text-zenml-500 underline">custom orchestrators</a>. Read more about how ZenML <a href="/vs/zenml-vs-orchestrators" class="text-zenml-500 underline">compares to orchestrators</a>.',
    },
    {
      question: "Does ZenML integrate with my existing stack?",
      answer:
        'Yes! ZenML supports <a href="/integrations/kubernetes" class="text-zenml-500 underline">Kubernetes</a>, <a href="/integrations/aws" class="text-zenml-500 underline">AWS</a>, <a href="/integrations/gcp-vertexai" class="text-zenml-500 underline">GCP Vertex AI</a>, <a href="/integrations/kubeflow" class="text-zenml-500 underline">Kubeflow</a>, <a href="/integrations/airflow" class="text-zenml-500 underline">Apache Airflow</a>, and many more. Artifact, secrets, and container storage for all major cloud providers.',
    },
    {
      question: "Does ZenML help in GenAI / LLMOps use-cases?",
      answer:
        'Yes, ZenML is fully compatible and intended for productionalizing LLM applications, and Kitaru extends this to evaluating and regression-testing live agents. We have examples with <a href="https://www.llamaindex.ai/" class="text-zenml-500 underline" target="_blank" rel="noopener noreferrer">LlamaIndex</a>, <a href="https://openai.com/" class="text-zenml-500 underline" target="_blank" rel="noopener noreferrer">OpenAI</a>, <a href="https://www.langchain.com/" class="text-zenml-500 underline" target="_blank" rel="noopener noreferrer">LangChain</a>, and more. Check out our <a href="/projects" class="text-zenml-500 underline">projects</a> for real-world examples.',
    },
    {
      question: "What is Kitaru?",
      answer:
        'Kitaru is ZenML\'s agent experimentation platform. It records your agents\' real production runs as replayable executions. You can score a recording without ever running the agent again, or replay your real code against the recorded world, with one thing changed like a model, tool, or prompt, to see what would have happened. Re-run a replay in CI and it becomes a regression test. Read more in the <a href="https://docs.zenml.io/kitaru" class="text-zenml-500 underline" target="_blank" rel="noopener noreferrer">Kitaru docs</a>.',
    },
    {
      question: "How can I build my AI platform using ZenML?",
      answer:
        'Start simple with our <a href="https://docs.zenml.io/user-guides" class="text-zenml-500 underline" target="_blank" rel="noopener noreferrer">user guides</a>, then extend with experiment trackers, model deployers, model registries and more from the <a href="https://docs.zenml.io/stacks" class="text-zenml-500 underline" target="_blank" rel="noopener noreferrer">stack components</a> library.',
    },
    {
      question:
        "What is the difference between the open source and Pro product?",
      answer:
        'The core framework is <a href="https://github.com/zenml-io/zenml" class="text-zenml-500 underline" target="_blank" rel="noopener noreferrer">Apache 2.0 on GitHub</a>. Pro offers a managed version plus Pro-only features for scaling teams. Learn more on the <a href="/open-source-vs-pro" class="text-zenml-500 underline">comparison page</a>.',
    },
  ] satisfies FAQItem[],
};

/* ------------------------------------------------------------------ */
/*  Final CTA                                                         */
/* ------------------------------------------------------------------ */
export const FINAL_CTA = {
  headline: "Ship agents you can prove, and pipelines you can trust.",
  bullets: [
    "Open-source foundation, no vendor lock-in",
    "Works with any infrastructure",
    "Upgrade to managed Pro features",
  ],
  primaryCta: {
    label: "Book a demo",
    href: "/book-your-demo",
  },
  secondaryCta: { label: "Read Docs", href: "/docs" },
  image: `${R2}/4ab5ef16/66e9556fd34d2791885b0c5f_model_control_plane_01.png`,
  imageAlt:
    "Dashboard displaying machine learning models with version tracking",
};
