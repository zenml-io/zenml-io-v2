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

import { R2_WEBFLOW_BASE } from "./constants";
const R2 = R2_WEBFLOW_BASE;

export const LOGO_CLOUD = {
  label: "Trusted by 1,000s of top companies to standardize their AI workflows",
  logos: [
    { name: "Airbus", src: `${R2}/6a2ae7e3/670e2f23d254a9be9e02e50f_airbus.svg` },
    { name: "AXA", src: `${R2}/5f1b0e8a/670e2f23b0b89bea22ecee3c_axa-min.svg` },
    { name: "Bundeswehr", src: `${R2}/e8e86576/670e2f2398fcad5e2e8f2775_bundeswehr.svg` },
    { name: "Enel", src: `${R2}/4f6e5fe1/670e2f2349aab64d5e4eeeb3_enel-min.svg` },
    { name: "JetBrains", src: `${R2}/60b5e34d/670e2f23ee3f2feee5e7e7e2_jetbrains-min.svg` },
    { name: "Koble", src: `${R2}/db4b0c5a/670e2f2331d7f8f62e12458e_koble.svg` },
    { name: "Leroy Merlin", src: `${R2}/d28fbdf4/670e2f23e2b3ba3756fae38e_leroy_merlin_logo-min.svg` },
    { name: "Rivian", src: `${R2}/e3f9dafd/670e2f233c0e2ef03c2dc810_rivian-min.svg` },
    { name: "ADEO", src: "/images/logos/adeo.png" },
    { name: "Devoteam", src: "/images/logos/devoteam.svg" },
    { name: "Frontiers", src: "/images/logos/frontiers.webp" },
    { name: "Mann+Hummel", src: "/images/logos/mann-hummel.svg" },
    { name: "Nielsen IQ", src: "/images/logos/nielsen-iq.svg" },
    { name: "Playtika", src: "/images/logos/playtika.svg" },
    { name: "Wisetech Global", src: "/images/logos/wisetech.svg" },
    { name: "AISBACH", src: "/images/logos/aisbach.svg" },
    { name: "Aisera", src: "/images/logos/aisera.svg" },
    { name: "ALKi", src: "/images/logos/alki.webp" },
    { name: "Altenar", src: "/images/logos/altenar.svg" },
    { name: "Brevo", src: "/images/logos/brevo.webp" },
    { name: "Digital Diagnostics", src: "/images/logos/digital-diagnostics.svg" },
    { name: "EarthDaily Agro", src: "/images/logos/earthdaily-agro.png" },
    { name: "Eikon Therapeutics", src: "/images/logos/eikon-therapeutics.svg" },
    { name: "Hemato", src: "/images/logos/hemato.png" },
    { name: "Infoplaza", src: "/images/logos/infoplaza.svg" },
    { name: "Instabase", src: "/images/logos/instabase.webp" },
    { name: "IT4IPM", src: "/images/logos/it4ipm.webp" },
    { name: "Multitel", src: "/images/logos/multitel.webp" },
    { name: "RiverBank", src: "/images/logos/riverbank.webp" },
    { name: "Standard Bots", src: "/images/logos/standard-bots.svg" },
    { name: "Two", src: "/images/logos/two.svg" },
    { name: "Wayflyer", src: "/images/logos/wayflyer.webp" },
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
  /** Pastel background for the icon square */
  iconBg: string;
  /** Stroke/fill color for the icon SVG */
  iconColor: string;
  /** "stroke" or "fill" — how the SVG path is colored */
  iconMode: "stroke" | "fill";
  /** SVG path(s) — rendered inside a 24×24 viewBox */
  iconPaths: string[];
}

export const VALUE_PROPS: ValueProp[] = [
  {
    title: "The Glue for Your Fragmented Stack",
    description:
      "Stop writing fragile scripts to connect your tools. ZenML provides a standardized protocol to bind your data retrieval (LlamaIndex), reasoning (LangChain), and training (PyTorch) steps into a single, cohesive system.",
    iconBg: "#fff6ea",
    iconColor: "#FA9E33",
    iconMode: "stroke",
    iconPaths: [
      "M13 2L4.09344 12.6879C3.74463 13.1064 3.57023 13.3157 3.56756 13.4925C3.56524 13.6461 3.63372 13.7923 3.75324 13.8889C3.89073 14 4.16316 14 4.70802 14H12L11 22L19.9065 11.3121C20.2553 10.8936 20.4297 10.6843 20.4324 10.5075C20.4347 10.3539 20.3663 10.2077 20.2467 10.1111C20.1092 10 19.8368 10 19.292 10H12L13 2Z",
    ],
  },
  {
    title: "Break the Prototype Wall",
    description:
      "Teams lose velocity rewriting notebook code for the cloud. ZenML allows the exact same @step to run locally for debugging, in batch for massive evaluations, and then deploy seamlessly to your production serving infrastructure.",
    iconBg: "#cfe7fc",
    iconColor: "#0E85F2",
    iconMode: "stroke",
    iconPaths: [
      "M9.5 2h5M7 22h10M12 2v2M12 18v4M7.8 18h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 001.311-1.311C21 15.72 21 14.88 21 13.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 00-1.311-1.311C18.72 4 17.88 4 16.2 4H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 00-1.311 1.311C3 6.28 3 7.12 3 8.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 001.311 1.311C5.28 18 6.12 18 7.8 18z",
    ],
  },
  {
    title: 'The "Missing Layer" for AI Engineering',
    description:
      "Your current orchestrator runs the job, but it doesn't track the data. ZenML adds a metadata layer to tools like Airflow or Kubeflow, giving you the artifact lineage and reproducibility that raw orchestrators lack.",
    iconBg: "#d6ebf0",
    iconColor: "#309DB2",
    iconMode: "stroke",
    iconPaths: [
      "M12 14.9998L9 11.9998M12 14.9998C13.3968 14.4685 14.7369 13.7985 16 12.9998M12 14.9998V19.9998C12 19.9998 15.03 19.4498 16 17.9998C17.08 16.3798 16 12.9998 16 12.9998M9 11.9998C9.53214 10.6192 10.2022 9.29582 11 8.04976C12.1652 6.18675 13.7876 4.65281 15.713 3.59385C17.6384 2.53489 19.8027 1.98613 22 1.99976C22 4.71976 21.22 9.49976 16 12.9998M9 11.9998H4C4 11.9998 4.55 8.96976 6 7.99976C7.62 6.91976 11 7.99976 11 7.99976M4.5 16.4998C3 17.7598 2.5 21.4998 2.5 21.4998C2.5 21.4998 6.24 20.9998 7.5 19.4998C8.21 18.6598 8.2 17.3698 7.41 16.5898C7.02131 16.2188 6.50929 16.0044 5.97223 15.9878C5.43516 15.9712 4.91088 16.1535 4.5 16.4998Z",
    ],
  },
  {
    title: "Open Source, Enterprise Control",
    description:
      "Built on Apache 2.0 for flexibility, hardened for the enterprise. Deploy ZenML inside your own VPC. Keep full sovereignty over your data, models, and API secrets while meeting SOC2 and ISO 27001 standards.",
    iconBg: "#ffedf4",
    iconColor: "#F53D81",
    iconMode: "stroke",
    iconPaths: [
      "M9 11.4999L11 13.4999L15.5 8.99987M20 11.9999C20 16.9083 14.646 20.4783 12.698 21.6147C12.4766 21.7439 12.3659 21.8085 12.2097 21.842C12.0884 21.868 11.9116 21.868 11.7903 21.842C11.6341 21.8085 11.5234 21.7439 11.302 21.6147C9.35396 20.4783 4 16.9083 4 11.9999V7.21747C4 6.41796 4 6.0182 4.13076 5.67457C4.24627 5.37101 4.43398 5.10015 4.67766 4.8854C4.9535 4.64231 5.3278 4.50195 6.0764 4.22122L11.4382 2.21054C11.6461 2.13258 11.75 2.0936 11.857 2.07815C11.9518 2.06444 12.0482 2.06444 12.143 2.07815C12.25 2.0936 12.3539 2.13258 12.5618 2.21054L17.9236 4.22122C18.6722 4.50195 19.0465 4.64231 19.3223 4.8854C19.566 5.10015 19.7537 5.37101 19.8692 5.67457C20 6.0182 20 6.41796 20 7.21747V11.9999Z",
    ],
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
    companyName: "HashiCorp",
  },
  {
    name: "Richard Socher",
    position: "Former Chief Scientist Salesforce and Founder of You.com",
    text: "ZenML allows orchestrating ML pipelines independent of any infrastructure or tooling choices. ML teams can free their minds of tooling FOMO from the fast-moving MLOps space, with the simple and extensible ZenML interface.",
    avatarUrl: `${R2}/3725b9aa/66702f264ab301a2a95b1213_richard.webp`,
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
    companyName: "Stanford University",
  },
  {
    name: "Francesco Pudda",
    position: "Machine Learning Engineer at WiseTech Global",
    text: "Thanks to ZenML we've set up a pipeline where before we had only Jupyter notebooks. It helped us tremendously with data and model versioning.",
    companyLogoUrl: "/images/logos/wisetech.svg",
    companyName: "WiseTech Global",
  },
  {
    name: "Goku Mohandas",
    position: "Founder of MadeWithML",
    text: "ZenML allows you to quickly and responsibly go from POC to production ML systems while enabling reproducibility, flexibility, and above all, sanity.",
    avatarUrl: `${R2}/c9fd250b/667bd428a30ba8fd817731c0_goku_quote.jpeg`,
    companyName: "MadeWithML",
  },
];

/** Purple LLMOps banner between case study cards and testimonials */
export const LLMOPS_BANNER = {
  headline: "ZenML tracks production AI deployments across the industry",
  subtext: "See the LLMOps database here",
  href: "/llmops-database",
};

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
