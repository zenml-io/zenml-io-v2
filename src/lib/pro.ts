/**
 * ZenML Pro page data — centralized marketing copy.
 *
 * Used by src/pages/pro.astro. ZenML Pro is the paid product of the ZenML
 * Labs brand: it hosts the two open-source products (ZenML and Kitaru) and
 * adds the AI engineer across agents and ML pipelines. Prices come from
 * productKitaru.ts so they match /pricing.
 */
import { ASSET_BASE_URL, cloudSignupUrl } from "./constants";
import { LOGO_CLOUD } from "./homepage";
import type {
  LabsBandContent,
  LabsProductBandContent,
  LogoGridContent,
  ProductDoorsContent,
  StoryCardsContent,
} from "./labs-home";
import type { ValuePropsContent } from "./labs-product-zenml";
import type { CtaLink, FaqData, FeatureGridItem } from "./marketingPageTypes";
import { PRICING_PRO_INCLUSIONS_DOORS } from "./pricing";
import { KITARU_CLOUD_PRICE, KITARU_TRIAL_DAYS } from "./productKitaru";
import { defaultOgUrl } from "./seo";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const PRO_SEO = {
  title: "ZenML Pro: AI engineers for your agents and ML pipelines",
  description:
    "ZenML Pro hosts Kitaru and ZenML for your team and adds a team of AI engineers that watch every agent trace and pipeline run, find what your evals miss and draft the fix.",
  ogTitle: "ZenML Pro: AI engineers for your agents and ML pipelines",
  ogDescription:
    "Hosted Kitaru and ZenML, plus a team of AI engineers that work around the clock.",
  ogImage: defaultOgUrl("pages", "pro"),
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
/**
 * Not typed `HeroData`: `deck` and `secondaryCta` are optional on that
 * shared shape, but `PRO_HERO_BAND` below always reads them, so the plain
 * literal (both fields present) lets the compiler prove that instead of
 * widening them to `| undefined`.
 */
export const PRO_HERO = {
  headline: "AI engineers for your agents and your ML",
  deck: `ZenML Pro is our paid platform. It hosts Kitaru and ZenML for your team and adds a team of AI engineers that watch every agent trace and pipeline run, find what your evals miss and draft the fix. From ${KITARU_CLOUD_PRICE} a month, ${KITARU_TRIAL_DAYS} days free.`,
  primaryCta: {
    label: "Start free",
    href: cloudSignupUrl("pro"),
  },
  secondaryCta: { label: "See pricing", href: "/pricing" },
  image: {
    url: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/b6cd9240/652d14664e7b1ba97d692b8a_cloud_main-1.webp`,
    alt: "Dashboard displaying iris_logistic_regression model versioning with deployment status, highlighting machine learning and model monitoring.",
  },
};

// ---------------------------------------------------------------------------
// Logo trust bar
// ---------------------------------------------------------------------------
export const PRO_TRUST_HEADLINE =
  "Trusted by 1,000s of top companies to standardize their AI workflows";

// ---------------------------------------------------------------------------
// Featured testimonial (Hema.to)
// ---------------------------------------------------------------------------
export const PRO_FEATURED_TESTIMONIAL = {
  quote:
    '"ZenML cuts out a lot of the infrastructure busywork so I can focus more on the tasks relevant to me. ZenML Pro helps us to keep an overview, as all components we need for MLOps, including documentation and metrics are available in one place!"',
  name: "Florian Pfisterer",
  title: "ML Engineer, Hema.to",
  avatar: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e2d8f6b9/652e39c2b024082004f60f7f_florian_hemato.webp`,
  companyLogo: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/a3d63b45/652d3ecc31a704eb20dc3fe0_hemato.png`,
} as const;

// ---------------------------------------------------------------------------
// Compliance: "Your VPC, your data"
// ---------------------------------------------------------------------------
export const PRO_COMPLIANCE = {
  eyebrow: "No compliance headaches",
  headline: "Your VPC, your data",
  body: "ZenML is a metadata layer on top of your existing infrastructure, meaning all data and compute stays on your side.",
  image: {
    desktop: {
      url: `${ASSET_BASE_URL}/content/uploads/c0365c4a/zenml-pro-vpc-architecture.avif`,
      alt: "ZenML only has access to metadata; your data remains in your VPC",
    },
    mobile: {
      url: `${ASSET_BASE_URL}/content/uploads/2368dffc/zenml-pro-vpc-architecture-mobile.avif`,
      alt: "ZenML Pro architecture: local environments with the zenml client connect to the ZenML Server, which holds configuration, events and metadata. Traffic is encrypted at rest into the customer VPC, where container registries, artifact storage, code repositories, data warehouses, orchestrators and secrets feed GCP, AWS and Azure stacks running a finetuning pipeline for Gemini 1.5, LLaMa 3.1 and Mistral 7B.",
    },
  },
  badges: [
    {
      url: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/37007174/soc2type2_zenml.png`,
      alt: "SOC 2 Type II Badge",
    },
    {
      url: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/959bbffc/66e9546d3b19094bf950273a_iso_certified.webp`,
      alt: "ISO/IEC 27001:2022 certification badge",
    },
  ],
  bannerHeadline: "We Take Security Seriously",
  bannerEyebrow: "SOC 2 Type II and ISO 27001",
  bannerBody:
    "ZenML is SOC 2 Type II and ISO 27001 audited, validating our adherence to industry-leading standards for data security, availability, and confidentiality in our ongoing commitment to protecting your AI workflows and data.",
} as const;

// ---------------------------------------------------------------------------
// Feature grid ("ZenML Pro is Open Source and More")
// ---------------------------------------------------------------------------
export const PRO_OSS_GRID = {
  eyebrow: "Open Source vs Pro",
  headline: "Open source underneath",
  body: "ZenML Pro runs the same ZenML and Kitaru you can install for free. Moving to Pro takes no rewrite.",
  items: [
    {
      title: "Runs on its own",
      body: "Open source runs when you or your coding agent drive it. Pro runs your AI engineers, schedules and triggers around the clock.",
    },
    {
      title: "Roles and Permissions",
      body: "ZenML Pro tenants have built-in roles and permissions, as an extension to the open-source product. We connect ZenML with your OIDC provider and offer SSO.",
    },
    {
      title: "One workspace for both",
      body: "ZenML and Kitaru workspaces under one organization, with the same roles and billing, and dev, staging and production kept apart.",
    },
    {
      title: "A richer dashboard",
      body: "Start runs from the UI, see every model in one place, and review findings in Slack.",
    },
  ] satisfies FeatureGridItem[],
  primaryCta: {
    label: "Compare plans",
    href: "/open-source-vs-pro",
  } as CtaLink,
  secondaryCta: {
    label: "Compare OSS vs Pro",
    href: "/open-source-vs-pro",
  } as CtaLink,
  image: {
    url: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e88e687c/65324d0f452d2d170268090d_opensource-cloud.svg`,
    alt: "ZenML Cloud toolbox emerging from a box.",
  },
} as const;

// ---------------------------------------------------------------------------
// Prominent testimonial (HashiCorp)
// ---------------------------------------------------------------------------
export const PRO_HASHICORP_TESTIMONIAL = {
  quote:
    '"ZenML offers the capability to build end-to-end ML workflows that seamlessly integrate with various components of the ML stack, such as different providers, data stores, and orchestrators."',
  name: "Harold Gim\u00e9nez",
  title: "SVP R&D at HashiCorp",
  avatar: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/31a5f8ee/653297b0b924af52998661bf_harold.webp`,
  companyLogo: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/a1791919/6536227667a9adb0f62aab6b_hashicorp_white.webp`,
} as const;

// ---------------------------------------------------------------------------
// Testimonial carousel items
// ---------------------------------------------------------------------------
export const PRO_TESTIMONIALS = [
  {
    quote:
      '"ZenML allows you to quickly and responsibly go from POC to production ML systems while enabling reproducibility, flexibility, and above all, sanity."',
    name: "Goku Mohandas",
    title: "Founder of MadeWithML",
    avatar: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8f1455a9/6532516584492916c998a6f1_goku.webp`,
    companyLogo: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/2c79ff75/6532516ecede3c4a7cbaa1bb_madewithml.webp`,
  },
  {
    quote:
      '"ZenML allows orchestrating ML pipelines independent of any infrastructure or tooling choices. ML teams can free their minds of tooling FOMO from the fast-moving MLOps space, with the simple and extensible ZenML interface."',
    name: "Richard Socher",
    title: "Former Chief Scientist Salesforce and Founder of You.com",
    avatar: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/85cb011a/653251e92cb29c000a769f50_richard.webp`,
    companyLogo: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8b24f1c8/65325223500e83c79114d877_salesforce.webp`,
  },
  {
    quote:
      "A lot of our teams struggle to bring sanity to their model training processes. ZenML is built in a way that encourages good, maintainable pipelines.",
    name: "Matt Squire",
    title: "CTO at Fuzzy Labs",
    avatar: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/f135a881/6532529c769b1188056c3a64_matt.webp`,
    companyLogo: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/43fb3e08/653252cf48491f2f0b6ec650_fuzzylabs.svg`,
  },
  {
    quote:
      "ZenML allows you to keep your ML pipeline code cloud-agnostic, enabling faster future migrations to another technology stack.",
    name: "Gabriel Martin",
    title: "Machine Learning Engineer at Frontiers",
    avatar: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/54e7018e/65325388f530bbad5c385f8a_gabriel.webp`,
    companyLogo: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/6ea19d6f/6532545fe5afb00b2fd8b3fe_frontiers_small.webp`,
  },
  {
    quote:
      "Thanks to ZenML we\u2019ve set up a pipeline where before we had only jupyter notebooks. It helped us tremendously with data and model versioning!",
    name: "Francesco Pudda",
    title: "Machine Learning Engineer at WiseTech Global",
    avatar: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/2d0a68a8/65327258ba7596c721021f2d_pudda.webp`,
    companyLogo: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/bd49d62d/65327219e5955b1960af1e97_wisetech-global-logo.svg`,
  },
] as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const PRO_FAQ: FaqData = {
  eyebrow: "Support",
  headline: "Frequently asked questions",
  subheadline: "Everything you need to know about ZenML Pro",
  items: [
    {
      question: "What is ZenML Pro?",
      answer: `ZenML Pro is the paid product from ZenML Labs. It hosts our two open-source products, Kitaru for AI agents and ZenML for ML pipelines, and adds a team of AI engineers that watch both around the clock. One account, one bill, unlimited seats. It starts at ${KITARU_CLOUD_PRICE} a month with a ${KITARU_TRIAL_DAYS}-day free trial; see <a href="/pricing">pricing</a>.`,
    },
    {
      question: "What about data security and compliance?",
      answer:
        'ZenML is designed architecturally in a way that <strong>no data</strong> flows through the actual ZenML Pro side, but remains inside your own cloud infrastructure behind your VPC. Only metadata is transferred to our servers (names of pipelines, models, statuses, metrics, etc), which we store encrypted at transit and at rest.<br><br>We are <strong>SOC 2 Type II</strong> and <strong>ISO 27001</strong> audited (see our <a href="https://security.zenml.io" target="_blank" rel="noopener noreferrer">trust center</a>), validating our adherence to industry-leading standards for data security, availability, and confidentiality in our ongoing commitment to protecting your AI workflows and data.<br><br>Please refer to our <a href="/terms-of-service">terms of service and privacy policy</a> for more details.',
    },
    {
      question: "How does ZenML Pro interface with my internal services?",
      answer:
        'As no data enters ZenML servers, clients can run most actions with local authentication that interfaces with any internal services and the ZenML server is really only a metadata storage for your pipelines, models, runs etc. ZenML also offers a secure way of communicating with external services using service connectors, which are a really cool way of generating short lived tokens to talk to external services like Kubernetes, Docker registries, Blob storage etc. Read more <a href="https://docs.zenml.io/how-to/infrastructure-deployment/auth-management" target="_blank" rel="noopener noreferrer">here</a>.',
    },
    {
      question: "What are the various deployment scenarios for ZenML Pro?",
      answer:
        'ZenML Pro deploys the OSS server <a href="https://docs.zenml.io/pro" target="_blank" rel="noopener noreferrer">as a service</a>, which centrally tracks everything related to pipelines, stacks, models, artifacts, etc. This page goes through <a href="/deployments">various deployment scenarios</a> for this deployment.',
    },
    {
      question:
        "I am an open source user. Can I transition to the Pro version? What about my data!",
      answer:
        'Yes! Once you <a href="/book-your-demo">request a demo</a>, we offer a migration service that helps transition your legacy database into your Pro account.',
    },
    {
      question:
        "What is the difference between the open-source and Pro product?",
      answer:
        'ZenML is and always will be open-source at its heart. The core framework is freely available on <a href="https://github.com/zenml-io/zenml" target="_blank" rel="noopener noreferrer">GitHub</a> and you can run and manage it in-house without using the Pro product. On the other hand, the Pro product offers one of the best experiences to use ZenML, and includes a managed version of the OSS product, including some Pro-only features that create the best collaborative experience for many companies that are scaling their ML efforts.<br><br>You can see a more detailed comparison <a href="/open-source-vs-pro">here</a>.',
    },
  ],
  slackCta: {
    label: "Still not clear? Book a demo",
    href: "/book-your-demo",
  },
};

// ---------------------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------------------
export const PRO_FINAL_CTA = {
  headline: "Start with one agent or one pipeline",
  bullets: [
    `${KITARU_TRIAL_DAYS} days free`,
    "No credit card",
    `${KITARU_CLOUD_PRICE} a month after`,
  ],
  primaryCta: {
    label: "Start free",
    href: cloudSignupUrl("pro"),
  } as CtaLink,
  secondaryCta: { label: "Read Docs", href: "/docs" } as CtaLink,
  image: {
    url: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/339bb62b/66e9556fd34d2791885b0c5f_model_control_plane_01.png`,
    alt: "Dashboard displaying machine learning models, including versions, authors, and tags.",
  },
} as const;

// ---------------------------------------------------------------------------
// Labs shell shapes — reshaped onto the shared Labs components, derived from
// the constants above; nothing here is retyped. Used by src/pages/pro.astro.
// ---------------------------------------------------------------------------

/** `PRO_HERO` reshaped onto `LabsHero`'s "landing" band. The hero image
 * leaves the page (CONVENTIONS liberty; the band has no image slot). */
export const PRO_HERO_BAND: LabsProductBandContent = {
  headlineLines: ["ZenML Pro: AI engineers", "for your agents and your ML"],
  deck: PRO_HERO.deck,
  cta: { ...PRO_HERO.primaryCta, analytics: "Pro-Hero-Signup" },
  secondaryCta: {
    ...PRO_HERO.secondaryCta,
    analytics: "Pro-Hero-Pricing",
  },
};

/** What Pro adds on each product: the /pricing inclusion cards under a
 * /pro headline. Derived, never retyped. */
export const PRO_DOORS: ProductDoorsContent = {
  ...PRICING_PRO_INCLUSIONS_DOORS,
  headline: "What's in ZenML Pro",
};

/** Logo trust bar, reshaped onto `LogoMarquee`. */
export const PRO_LOGO_GRID: LogoGridContent = {
  headline: PRO_TRUST_HEADLINE,
  logos: LOGO_CLOUD.logos,
};

/** The featured, HashiCorp and carousel testimonials, reshaped onto
 * `CustomerStoryCards`' quote arrangement. No headline, no allLink (both
 * collapse — CONVENTIONS liberty 3). */
export const PRO_QUOTES: StoryCardsContent = {
  cards: [
    {
      quote: PRO_FEATURED_TESTIMONIAL.quote,
      name: PRO_FEATURED_TESTIMONIAL.name,
      title: PRO_FEATURED_TESTIMONIAL.title,
      avatar: PRO_FEATURED_TESTIMONIAL.avatar,
      logo: { url: PRO_FEATURED_TESTIMONIAL.companyLogo, alt: "Hema.to" },
      wide: true,
    },
    {
      quote: PRO_HASHICORP_TESTIMONIAL.quote,
      name: PRO_HASHICORP_TESTIMONIAL.name,
      title: PRO_HASHICORP_TESTIMONIAL.title,
      avatar: PRO_HASHICORP_TESTIMONIAL.avatar,
      logo: { url: PRO_HASHICORP_TESTIMONIAL.companyLogo, alt: "HashiCorp" },
      wide: true,
    },
    ...PRO_TESTIMONIALS.map((t) => ({
      quote: t.quote,
      name: t.name,
      title: t.title,
      avatar: t.avatar,
      logo: { url: t.companyLogo, alt: t.title },
    })),
  ],
};

/** "ZenML Pro is Open Source and More" grid, reshaped onto `LabsValueProps`.
 * The illustration image and "Compare OSS vs Pro" secondary leave the page
 * (CONVENTIONS liberty; `LabsValueProps` has one CTA). */
export const PRO_OSS_PROPS: ValuePropsContent = {
  headline: PRO_OSS_GRID.headline,
  deck: PRO_OSS_GRID.body,
  items: PRO_OSS_GRID.items.map((item, i) => ({
    index: `0${i + 1}.`,
    title: item.title,
    body: item.body,
  })),
  cta: { ...PRO_OSS_GRID.primaryCta, analytics: "Pro-OSS-Grid-Compare" },
};

/** Final CTA, reshaped onto `LabsCloseCta`. The image and "Read Docs"
 * secondary leave the page (CONVENTIONS liberty; the band has one pill). */
export const PRO_CLOSE: LabsBandContent = {
  headlineLines: ["Start with one agent", "or one pipeline"],
  deck: PRO_FINAL_CTA.bullets.join(" · "),
  cta: { ...PRO_FINAL_CTA.primaryCta, analytics: "Pro-Close-Signup" },
};
