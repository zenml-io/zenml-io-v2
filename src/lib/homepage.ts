/**
 * Homepage static data — all copy, links, stats, and logo URLs
 * centralized here so marketing can update without touching components.
 */

/* ------------------------------------------------------------------ */
/*  Announcement Banner                                               */
/* ------------------------------------------------------------------ */
export const ANNOUNCEMENT_BANNER = {
  text: "The demo era is over. Real LLM production insights from 1,200 cases.",
  linkText: "Explore the findings →",
  href: "/blog/the-experimentation-phase-is-over-key-findings-from-1-200-production-deployments",
};

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */
export const HERO = {
  headline: "The AI Control Plane",
  subheadline:
    "One layer for orchestration, versioning, and governance — from training pipelines to agent evals, local to Kubernetes.",
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "/get-started" },
  githubUrl: "https://github.com/zenml-io/zenml",
  /** Lottie JSON for hero animation (autoplay, no loop, 6.4s, SVG renderer).
   *  Served from public/ for same-origin access (avoids R2 CORS issues). */
  lottieUrl: "/lottie/hero-0925.json",
};

/* ------------------------------------------------------------------ */
/*  Logo Cloud (trust bar)                                            */
/* ------------------------------------------------------------------ */
export interface LogoItem {
  name: string;
  src: string;
  width?: number;
  height?: number;
}

const R2 = "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30";

export const LOGO_CLOUD = {
  label: "Trusted by 1,000s of top companies to standardize their AI workflows",
  /** Tier 1 — featured logos (larger, top row) */
  tier1: [
    { name: "Airbus", src: `${R2}/6a2ae7e3/670e2f23d254a9be9e02e50f_airbus.svg` },
    { name: "AXA", src: `${R2}/5f1b0e8a/670e2f23b0b89bea22ecee3c_axa-min.svg` },
    { name: "Bundeswehr", src: `${R2}/e8e86576/670e2f2398fcad5e2e8f2775_bundeswehr.svg` },
    { name: "Enel", src: `${R2}/4f6e5fe1/670e2f2349aab64d5e4eeeb3_enel-min.svg` },
    { name: "JetBrains", src: `${R2}/60b5e34d/670e2f23ee3f2feee5e7e7e2_jetbrains-min.svg` },
    { name: "Koble", src: `${R2}/db4b0c5a/670e2f2331d7f8f62e12458e_koble.svg` },
    { name: "Leroy Merlin", src: `${R2}/d28fbdf4/670e2f23e2b3ba3756fae38e_leroy_merlin_logo-min.svg` },
    { name: "Rivian", src: `${R2}/e3f9dafd/670e2f233c0e2ef03c2dc810_rivian-min.svg` },
  ] satisfies LogoItem[],
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
  eyebrow: "The ZenML Advantage",
  headline: "Unified AI platform",
  subheadline: "Bridging ML and GenAI",
};

export const FEATURE_TABS: FeatureTab[] = [
  {
    title: "Unified Workflow Orchestration",
    description:
      "Stop glue-coding your stack. Orchestrate Scikit-learn training jobs and complex LangGraph loops in one unified DAG. ZenML handles the state management, data passing, and termination control needed to keep your predictive models and agents reliable.",
    image: `${R2}/70e94eb1/68d1536e3bb1899a400a8dec_tab01.avif`,
    imageAlt: "ZenML unified workflow orchestration dashboard",
  },
  {
    title: "Artifact & Environment Versioning",
    description:
      '"It worked on my machine" is not a strategy. ZenML snapshots the exact code, Pydantic versions, and container state for every step. When a library update breaks your Agent or Model, inspect the diff and roll back to a working artifact instantly.',
    image: `${R2}/6a1e96df/68d273e1d31e42957153098b_tab02.avif`,
    imageAlt: "ZenML artifact and environment versioning",
  },
  {
    title: "Infrastructure Abstraction",
    description:
      "Standardize on Kubernetes and Slurm without the YAML headaches. Define your hardware needs in Python, and let ZenML handle the dockerization, GPU provisioning, and pod scaling for your massive batch training or agent swarm jobs.",
    image: `${R2}/ba122f13/68d122c72dcdb1f17db0ea87_tab03.avif`,
    imageAlt: "ZenML infrastructure abstraction",
  },
  {
    title: "Smart Caching & Deduplication",
    description:
      "Don't pay for the same compute twice. ZenML's native caching skips redundant training epochs and expensive LLM tool calls. Drastically lower the latency and API costs of your evaluation pipelines and batch jobs.",
    image: `${R2}/7d0c3d45/694a97d1ae458c9398b52aef_tab04.avif`,
    imageAlt: "ZenML smart caching and deduplication",
  },
  {
    title: "Governance & Security",
    description:
      "Turn black-box agents into visible pipelines. Centralize the management of API keys and tool credentials so they never leak. Enforce RBAC, visualize execution traces, and audit the full lineage of every run — from raw data to final agent response.",
    image: `${R2}/2e5d2f96/68d15caa8322157742ada8fd_tab05.avif`,
    imageAlt: "ZenML governance and security dashboard",
  },
];

/* ------------------------------------------------------------------ */
/*  Value Propositions (4-card grid)                                  */
/* ------------------------------------------------------------------ */
export interface ValueProp {
  title: string;
  description: string;
}

export const VALUE_PROPS: ValueProp[] = [
  {
    title: "The Glue for Your Fragmented Stack",
    description:
      "Stop writing fragile scripts to connect your tools. ZenML provides a standardized protocol to bind your data retrieval (LlamaIndex), reasoning (LangChain), and training (PyTorch) steps into a single, cohesive system.",
  },
  {
    title: "Break the Prototype Wall",
    description:
      "Teams lose velocity rewriting notebook code for the cloud. ZenML allows the exact same @step to run locally for debugging, in batch for massive evaluations, and then deploy seamlessly to your production serving infrastructure.",
  },
  {
    title: 'The "Missing Layer" for AI Engineering',
    description:
      "Your current orchestrator runs the job, but it doesn't track the data. ZenML adds a metadata layer to tools like Airflow or Kubeflow, giving you the artifact lineage and reproducibility that raw orchestrators lack.",
  },
  {
    title: "Open Source, Enterprise Control",
    description:
      "Built on Apache 2.0 for flexibility, hardened for the enterprise. Deploy ZenML inside your own VPC. Keep full sovereignty over your data, models, and API secrets while meeting SOC2 and ISO 27001 standards.",
  },
];

export const VALUE_PROPS_CTA = {
  headline: "Ready to Unify Your AI Platform?",
  subtext:
    "Join thousands of teams using ZenML to eliminate chaos and accelerate AI delivery",
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "/get-started" },
};

/* ------------------------------------------------------------------ */
/*  Integrations Marquee                                              */
/* ------------------------------------------------------------------ */
export const INTEGRATIONS_MARQUEE = {
  headline: "Use ZenML with any framework",
  subheadline:
    "60+ integrations across the AI ecosystem. From sklearn to LangGraph.",
  primaryCta: { label: "Use Open Source", href: "/get-started" },
  secondaryCta: { label: "See All Integrations", href: "/integrations" },
};

/* ------------------------------------------------------------------ */
/*  Whitepaper CTA                                                    */
/* ------------------------------------------------------------------ */
export const WHITEPAPER_CTA = {
  eyebrow: "Whitepaper",
  headline: "ZenML as your Enterprise-Grade AI Platform",
  body: "We have put down our expertise around building production-ready, scalable AI platforms, building on insights from our top customers.",
  cta: {
    label: "Get The Whitepaper",
    href: "/whitepaper-architecting-an-enterprise-grade-mlops-platform",
  },
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
    "Learn how teams are using ZenML to save time and simplify their MLOps.",
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
    secondaryLogo: `${R2}/d28fbdf4/670e2f23e2b3ba3756fae38e_leroy_merlin_logo-min.svg`,
    secondaryLogoAlt: "Leroy Merlin",
    title:
      "How ADEO Leroy Merlin decreased their time-to-market from 2 months to 2 weeks",
    href: "/case-study/adeo-leroy-merlin",
  },
  {
    companyLogo: `${R2}/a0f2ee23/652d3e5d29d36f927c2bb623_brevo.webp`,
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

/** Testimonials not in the CMS quotes collection — hardcoded from Webflow */
export interface Testimonial {
  name: string;
  position: string;
  text: string;
  avatarUrl?: string;
  companyLogoUrl?: string;
}

export const EXTRA_TESTIMONIALS: Testimonial[] = [
  {
    name: "Harold Gimenez",
    position: "SVP R&D at HashiCorp",
    text: "ZenML offers the capability to build end-to-end ML workflows that seamlessly integrate with various components of the ML stack.",
  },
  {
    name: "Chris Manning",
    position: "Professor of Linguistics and CS at Stanford",
    text: "Many teams still struggle with managing models, datasets, code, and monitoring. ZenML brings needed structure and reproducibility.",
  },
  {
    name: "Maximillian Baluff",
    position: "Lead AI Engineer at IT4IPM",
    text: "ZenML's approach to standardization and reusability has been a game-changer for our ML teams.",
  },
  {
    name: "Liza Bykhanova",
    position: "Data Scientist at Competera",
    text: "ZenML's automatic logging and containerization have transformed our MLOps pipeline.",
  },
  {
    name: "Francesco Pudda",
    position: "Machine Learning Engineer at WiseTech Global",
    text: "Thanks to ZenML we've set up a pipeline where before we had only Jupyter notebooks.",
  },
  {
    name: "Christian Versloot",
    position: "Data Technologist at Infoplaza",
    text: "ZenML has transformed how we manage our GPU resources.",
  },
  {
    name: "Dragos Ciupureanu",
    position: "VP of Engineering at Koble",
    text: "With ZenML, we're no longer tied to a single cloud provider.",
  },
];

/* ------------------------------------------------------------------ */
/*  Compliance / Security                                             */
/* ------------------------------------------------------------------ */
export const COMPLIANCE = {
  eyebrow: "No compliance headaches",
  headline: "Your VPC, your data",
  body: "ZenML is a metadata layer on top of your existing infrastructure, meaning all data and compute stays on your side.",
  badgeHeadline: "ZenML is SOC2 and ISO 27001 Compliant",
  badgeSubheadline: "We Take Security Seriously",
  badgeBody:
    "ZenML is SOC2 and ISO 27001 compliant, validating our adherence to industry-leading standards for data security, availability, and confidentiality in our ongoing commitment to protecting your ML workflows and data.",
  architectureImage: `${R2}/68b844a2/66c7398e738654118d4024fb_why-zenml-min.png`,
  architectureImageMobile: `${R2}/8978f34c/66c73e7cfd15ae9889f59705_why-zenml-mobile-min.webp`,
  soc2Badge: `${R2}/f7e1dfa3/67ae0f84d539a001cc441a43_soc2type2_zenml.png`,
  iso27001Badge: `${R2}/f62e5def/66e9546d3b19094bf950273a_iso_certified.webp`,
};

/* ------------------------------------------------------------------ */
/*  Newsletter Signup                                                 */
/* ------------------------------------------------------------------ */
export const NEWSLETTER = {
  headline: "Looking to Get Ahead in MLOps & LLMOps?",
  body: "Subscribe to the ZenML newsletter and receive regular product updates, tutorials, examples, and more.",
  privacyNote: "We care about your data in our",
  privacyLink: { label: "privacy policy", href: "/privacy-policy" },
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
    href: "https://zenml.io/slack",
  },
  items: [
    {
      question:
        "What is the difference between ZenML and other machine learning orchestrators?",
      answer:
        'ZenML doesn\'t take an opinion on the orchestration layer. Start writing locally, deploy on any orchestrator. We support <a href="https://docs.zenml.io/stacks/orchestrators" class="text-zenml-500 underline">many orchestrators</a> natively and can be extended to work with <a href="https://docs.zenml.io/stacks/orchestrators/custom" class="text-zenml-500 underline">custom orchestrators</a>. Read more about how ZenML <a href="/vs/zenml-vs-orchestrators" class="text-zenml-500 underline">compares to orchestrators</a>.',
    },
    {
      question: "Does ZenML integrate with my MLOps stack?",
      answer:
        'Yes! ZenML supports <a href="/integrations/kubernetes" class="text-zenml-500 underline">Kubernetes</a>, <a href="/integrations/aws" class="text-zenml-500 underline">AWS</a>, <a href="/integrations/gcp-vertexai" class="text-zenml-500 underline">GCP Vertex AI</a>, <a href="/integrations/kubeflow" class="text-zenml-500 underline">Kubeflow</a>, <a href="/integrations/airflow" class="text-zenml-500 underline">Apache Airflow</a>, and many more. Artifact, secrets, and container storage for all major cloud providers.',
    },
    {
      question: "Does ZenML help in GenAI / LLMOps use-cases?",
      answer:
        'Yes, ZenML is fully compatible and intended for productionalizing LLM applications. We have examples with <a href="https://www.llamaindex.ai/" class="text-zenml-500 underline" target="_blank" rel="noopener noreferrer">LlamaIndex</a>, <a href="https://openai.com/" class="text-zenml-500 underline" target="_blank" rel="noopener noreferrer">OpenAI</a>, <a href="https://www.langchain.com/" class="text-zenml-500 underline" target="_blank" rel="noopener noreferrer">LangChain</a>, and more. Check out our <a href="/projects" class="text-zenml-500 underline">projects</a> for real-world examples.',
    },
    {
      question:
        "How can I build my MLOps/LLMOps platform using ZenML?",
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
  headline: "Unify Your ML and LLM Workflows",
  bullets: [
    "Free, powerful MLOps open source foundation",
    "Works with any infrastructure",
    "Upgrade to managed Pro features",
  ],
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "/get-started" },
  image: `${R2}/4ab5ef16/66e9556fd34d2791885b0c5f_model_control_plane_01.png`,
  imageAlt:
    "Dashboard displaying machine learning models with version tracking",
};
