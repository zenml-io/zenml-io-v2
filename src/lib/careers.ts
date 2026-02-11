/**
 * Careers page data — centralized marketing copy.
 *
 * Used by src/pages/careers.astro.
 * Content extracted from Webflow HTML snapshot.
 *
 * Open positions are imported from company.ts (single source of truth).
 */
import type { CtaLink } from "./marketingPageTypes";

const WEBFLOW_CDN = "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const CAREERS_SEO = {
  title: "Careers - ZenML",
  description:
    "Join the ZenML team. We are quickly growing and looking for motivated team members to join and grow our open-source base.",
  ogTitle: "Careers - ZenML",
  ogDescription:
    "Join the ZenML team. We are quickly growing and looking for motivated team members.",
  ogImage: `${WEBFLOW_CDN}/64b9920cd04b7c4c0340ce50_og-img-0625.jpg`,
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const CAREERS_HERO = {
  eyebrow: "Careers",
  headline: "Join our team",
  deck: "We are quickly growing and looking for motivated team members to join and grow our open-source base, and build a community around our framework.",
  primaryCta: { label: "Open Positions", href: "#open-positions" } as CtaLink,
  secondaryCta: { label: "Meet the team", href: "/company" } as CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Mission
// ---------------------------------------------------------------------------
export const CAREERS_MISSION = {
  headline: "Our mission",
  body: "<strong>ZenML's mission is to accelerate worldwide problem solving by making machine learning simple.</strong><br><br>Our open-source framework allows data scientists to write their code as automated pipelines from day 1. Our extensible framework also provides a path to an automated, production-ready software base that can be deployed on any cloud or backend service.",
  image: {
    url: `${WEBFLOW_CDN}/652ea57525920a782529bb0e_zenml_team_jul23.webp`,
    alt: "Group of people posing in front of a historic statue and building under a blue sky.",
  },
  primaryCta: {
    label: "GitHub",
    href: "https://github.com/zenml-io/zenml",
    external: true,
  } as CtaLink,
  secondaryCta: { label: "Learn More", href: "#why-here" } as CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Why work here
// ---------------------------------------------------------------------------
export const CAREERS_WHY = {
  headline: "Why work here",
  items: [
    {
      title: "Grow with us until IPO",
      body: "We are very ambitious and see big potential in the industry - so do our investors from UK and Silicon Valley. Let's build something big!",
    },
    {
      title: "Open-source is eating the world",
      body: "We love what we do and want to share it with the world. Open-source is the best way to build software.",
    },
    {
      title: "Set industry standards in MLOps",
      body: "MLOps is still at the beginning and ZenML will be covering the whole ML Lifecycle. Make a difference!",
    },
    {
      title: "Become part of the core team",
      body: "ZenML is young and we have no hierarchies. Together with us you will set the foundation of a great company culture to work in.",
    },
    {
      title: "Freedom and full ownership",
      body: "Pursuing your own projects with full ownership - nobody likes micromanagement.",
    },
    {
      title: "Enjoy being part of the ZenML family",
      body: "Even though we are working a lot, we take care of ourselves with a healthy life-life-balance and a joyful working culture.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Hiring process
// ---------------------------------------------------------------------------
export const CAREERS_HIRING_PROCESS = {
  headline: "Our hiring process",
  intro: "We understand the hiring process can be super tough for candidates. Therefore, we are working hard to make it as transparent and lean as possible for anyone who applies at ZenML. So, if you are hesitating due to the overhead, don't! We will treat your application with the utmost respect and priority.",
  afterIntro: "Once you apply our team will carefully review your CV and application in an initial screening. After that your journey with us will follow this outline:",
  steps: [
    {
      number: 1,
      title: "Phone Interview",
      duration: "30 minutes",
      body: "In a short phone call, we will give you the gist of the position, give you the chance to ask initial questions and allow us to get a feeling for you as a person. We strongly believe in our culture and want to get to know you. What motivates you, where do you come from - WHO are you?",
    },
    {
      number: 2,
      title: "Challenge",
      duration: "2 hours",
      body: "No LeetCode. No weekend killers. Just a thoughtful case to explore your problem-solving skills. We'll give you a 2-hour challenge that will test the basics of your technical skills for the role you applied for. This will be a fun and time-efficient way to showcase your technical skills to our team!",
    },
    {
      number: 3,
      title: "Tech Interview",
      duration: "3 hours",
      body: "We'll start with 30 mins of reviewing your previous challenge submission, and then introduce a new task that builds upon your previous work. You will have 1.5 hours to work on this task. Then, you will come back and we'll chat more about what you did in the last hour.",
    },
    {
      number: 4,
      title: "(On-site) Experience Day",
      duration: "",
      body: "Every journey has its finale \u2013 and we want it to feel real. You'll spend 2 hours collaborating on a meaningful topic (on-site in Munich or online), followed by 30-minute meetings with two team members. This is an opportunity to assess mutual fit and get to know each other.",
    },
  ],
} as const;
