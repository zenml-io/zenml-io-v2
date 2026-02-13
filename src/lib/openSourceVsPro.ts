/**
 * Open Source vs Pro page data — centralized marketing copy.
 *
 * Used by src/pages/open-source-vs-pro.astro.
 * Content extracted from Webflow HTML snapshot + SEO baseline.
 */
import type {
  HeroData,
  FeatureGridItem,
  SubwayMapCard,
  ComparisonTableData,
  CtaLink,
} from "./marketingPageTypes";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_SEO = {
  title: "ZenML Open Source vs Cloud",
  description:
    "Transform your ML workflows from single-player experiments to multiplayer production systems. Compare ZenML Open Source and ZenML Pro features.",
  ogTitle: "ZenML Open Source vs Cloud",
  ogDescription:
    "Transform your ML workflows from single-player experiments to multiplayer production systems. Compare ZenML Open Source and ZenML Pro features.",
  ogImage: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/3ae53e01/64b9920cd04b7c4c0340ce50_og-img-0625.jpg`,
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_HERO: HeroData = {
  eyebrow: "From Solo Science to Team Engineering",
  headline: "ZenML Open Source vs Pro",
  deck: "Transform your ML workflows from single-player experiments to multiplayer production systems. ZenML Pro builds on the same open-source foundation you trust: no code rewrites, no metadata migrations required.",
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "/get-started" },
};

// ---------------------------------------------------------------------------
// Feature grid: "ZenML Pro is Open Source and More"
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_FEATURE_GRID = {
  eyebrow: "ZenML Open Source vs Pro",
  headline: "ZenML Pro is Open Source and More",
  body: "ZenML Pro extends the beloved open-source foundation with enterprise features designed for collaboration, governance, and scale. Start with OSS, upgrade when ready: your pipelines keep running exactly as they are.",
  items: [
    {
      title: "Managed control plane",
      body: "ZenML Pro offers multi-tenant, fully-managed ZenML deployments. Separate your team into workspaces, and deploy dev, staging, and production servers separately.",
    },
    {
      title: "Roles and Permissions",
      body: "ZenML Pro tenants have built-in roles and permissions, as an extension to the open-source product. We connect ZenML with your OIDC provider and offer SSO.",
    },
    {
      title: "Control and configurability",
      body: "ZenML Pro control plane allows you to run ZenML pipelines directly from the server, and features enhanced configurability for your pipeline builds.",
    },
    {
      title: "Enhanced observability",
      body: "ZenML Pro tenants have an enhanced dashboard with more features including a model control plane to view all your ML models, and the ability to trigger pipelines, do CI/CD and lots more.",
    },
  ] satisfies FeatureGridItem[],
  primaryCta: { label: "Use Open Source", href: "/get-started" } as CtaLink,
  secondaryCta: { label: "Compare Plans", href: "/pricing" } as CtaLink,
  image: {
    url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/e88e687c/65324d0f452d2d170268090d_opensource-cloud.svg`,
    alt: "ZenML Cloud toolbox emerging from a box, representing MLOps solutions and model deployment.",
  },
} as const;

// ---------------------------------------------------------------------------
// Subway map section: "Is Your ML Team Ready for the Next Station?"
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_SUBWAY_MAP = {
  image: {
    url: `https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/7cca5359/zenml_metro-min.svg`,
    alt: "A metro line map showing Collaboration, Governance, Automation and Reliability stations in the ZenML OSS line",
  },
  headline: "Is Your ML Team Ready for the Next Station?",
  body: "Our subway map framework helps you identify pain signals that indicate it\u2019s time to upgrade your ML infrastructure.",
  cards: [
    {
      title: "Collaboration",
      painQuote: '"Who just overwrote my training stack?"',
      body: "Multiple teams sharing buckets, databases, or GPU quotas without clear boundaries.",
    },
    {
      title: "Governance",
      painQuote: '"Who just overwrote my training stack?"',
      body: "Security teams requiring proof of who changed what, when\u2014especially before production deployments.",
    },
    {
      title: "Automation",
      painQuote: '"Can we refresh the model for tomorrow\u2019s demo?"',
      body: "Non-engineers needing to trigger retrains without CLI knowledge or developer intervention.",
    },
    {
      title: "Reliability",
      painQuote: '"The server DB is down again"',
      body: "Operations teams spending hours on cluster maintenance, upgrades, and backup procedures.",
    },
  ] satisfies SubwayMapCard[],
  cta: {
    label: "Learn more",
    href: "/blog/which-zenml-path-fits-your-team-today-a-subway-map-guide-to-oss-and-pro",
  } as CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Comparison table
// ---------------------------------------------------------------------------
/* Row icons — 24×24 outline SVGs from Webflow original (stroke="currentColor") */
const ICON_PIPELINES = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V15.2C12 16.8802 12 17.7202 12.327 18.362C12.6146 18.9265 13.0735 19.3854 13.638 19.673C14.2798 20 15.1198 20 16.8 20H17M17 20C17 21.1046 17.8954 22 19 22C20.1046 22 21 21.1046 21 20C21 18.8954 20.1046 18 19 18C17.8954 18 17 18.8954 17 20ZM7 4L17 4M7 4C7 5.10457 6.10457 6 5 6C3.89543 6 3 5.10457 3 4C3 2.89543 3.89543 2 5 2C6.10457 2 7 2.89543 7 4ZM17 4C17 5.10457 17.8954 6 19 6C20.1046 6 21 5.10457 21 4C21 2.89543 20.1046 2 19 2C17.8954 2 17 2.89543 17 4ZM12 12H17M17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_CLOCK = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_LIGHTNING = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L4.09344 12.6879C3.74463 13.1064 3.57023 13.3157 3.56756 13.4925C3.56524 13.6461 3.63372 13.7923 3.75324 13.8889C3.89073 14 4.16316 14 4.70802 14H12L11 22L19.9065 11.3121C20.2553 10.8936 20.4297 10.6843 20.4324 10.5075C20.4347 10.3539 20.3663 10.2077 20.2467 10.1111C20.1092 10 19.8368 10 19.292 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_REFRESH = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 14C2 14 2.12132 14.8492 5.63604 18.364C9.15076 21.8787 14.8492 21.8787 18.364 18.364C19.6092 17.1187 20.4133 15.5993 20.7762 14M2 14V20M2 14H8M22 10C22 10 21.8787 9.15076 18.364 5.63604C14.8492 2.12132 9.15076 2.12132 5.63604 5.63604C4.39076 6.88131 3.58669 8.40072 3.22383 10M22 10V4M22 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_CUBE = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001M21 16.0586V7.94153C21 7.59889 21 7.42757 20.9495 7.27477C20.9049 7.13959 20.8318 7.01551 20.7354 6.91082C20.6263 6.79248 20.4766 6.70928 20.177 6.54288L12.777 2.43177C12.4934 2.27421 12.3516 2.19543 12.2015 2.16454C12.0685 2.13721 11.9315 2.13721 11.7986 2.16454C11.6484 2.19543 11.5066 2.27421 11.223 2.43177L3.82297 6.54288C3.52345 6.70928 3.37369 6.79248 3.26463 6.91082C3.16816 7.01551 3.09515 7.13959 3.05048 7.27477C3 7.42757 3 7.59889 3 7.94153V16.0586C3 16.4013 3 16.5726 3.05048 16.7254C3.09515 16.8606 3.16816 16.9847 3.26463 17.0893C3.37369 17.2077 3.52345 17.2909 3.82297 17.4573L11.223 21.5684C11.5066 21.726 11.6484 21.8047 11.7986 21.8356C11.9315 21.863 12.0685 21.863 12.2015 21.8356C12.3516 21.8047 12.4934 21.726 12.777 21.5684L20.177 17.4573C20.4766 17.2909 20.6263 17.2077 20.7354 17.0893C20.8318 16.9847 20.9049 16.8606 20.9495 16.7254C21 16.5726 21 16.4013 21 16.0586Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.5 9.5L7.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_TOGGLE = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0505 9H5.5C4.11929 9 3 7.88071 3 6.5C3 5.11929 4.11929 4 5.5 4H15.0505M8.94949 20H18.5C19.8807 20 21 18.8807 21 17.5C21 16.1193 19.8807 15 18.5 15H8.94949M3 17.5C3 19.433 4.567 21 6.5 21C8.433 21 10 19.433 10 17.5C10 15.567 8.433 14 6.5 14C4.567 14 3 15.567 3 17.5ZM21 6.5C21 8.433 19.433 10 17.5 10C15.567 10 14 8.433 14 6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_USERS = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_SERVER = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20M14 20C14 18.8954 13.1046 18 12 18M14 20H21M10 20C10 18.8954 10.8954 18 12 18M10 20H3M12 18V14M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V11C21 12.66 17 14 12 14M3 5V11C3 12.66 7 14 12 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_CONNECTORS = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 4.5H18.3C19.4201 4.5 19.9802 4.5 20.408 4.71799C20.7843 4.90973 21.0903 5.21569 21.282 5.59202C21.5 6.01984 21.5 6.57989 21.5 7.7V9C21.5 9.93188 21.5 10.3978 21.3478 10.7654C21.1448 11.2554 20.7554 11.6448 20.2654 11.8478C19.8978 12 19.4319 12 18.5 12M13 19.5H5.7C4.5799 19.5 4.01984 19.5 3.59202 19.282C3.21569 19.0903 2.90973 18.7843 2.71799 18.408C2.5 17.9802 2.5 17.4201 2.5 16.3V15C2.5 14.0681 2.5 13.6022 2.65224 13.2346C2.85523 12.7446 3.24458 12.3552 3.73463 12.1522C4.10218 12 4.56812 12 5.5 12M10.3 14.5H13.7C13.98 14.5 14.12 14.5 14.227 14.4455C14.3211 14.3976 14.3976 14.3211 14.4455 14.227C14.5 14.12 14.5 13.98 14.5 13.7V10.3C14.5 10.02 14.5 9.87996 14.4455 9.773C14.3976 9.67892 14.3211 9.60243 14.227 9.5545C14.12 9.5 13.98 9.5 13.7 9.5H10.3C10.02 9.5 9.87996 9.5 9.773 9.5545C9.67892 9.60243 9.60243 9.67892 9.5545 9.773C9.5 9.87996 9.5 10.02 9.5 10.3V13.7C9.5 13.98 9.5 14.12 9.5545 14.227C9.60243 14.3211 9.67892 14.3976 9.773 14.4455C9.87996 14.5 10.02 14.5 10.3 14.5ZM17.8 22H21.2C21.48 22 21.62 22 21.727 21.9455C21.8211 21.8976 21.8976 21.8211 21.9455 21.727C22 21.62 22 21.48 22 21.2V17.8C22 17.52 22 17.38 21.9455 17.273C21.8976 17.1789 21.8211 17.1024 21.727 17.0545C21.62 17 21.48 17 21.2 17H17.8C17.52 17 17.38 17 17.273 17.0545C17.1789 17.1024 17.1024 17.1789 17.0545 17.273C17 17.38 17 17.52 17 17.8V21.2C17 21.48 17 21.62 17.0545 21.727C17.1024 21.8211 17.1789 21.8976 17.273 21.9455C17.38 22 17.52 22 17.8 22ZM2.8 7H6.2C6.48003 7 6.62004 7 6.727 6.9455C6.82108 6.89757 6.89757 6.82108 6.9455 6.727C7 6.62004 7 6.48003 7 6.2V2.8C7 2.51997 7 2.37996 6.9455 2.273C6.89757 2.17892 6.82108 2.10243 6.727 2.0545C6.62004 2 6.48003 2 6.2 2H2.8C2.51997 2 2.37996 2 2.273 2.0545C2.17892 2.10243 2.10243 2.17892 2.0545 2.273C2 2.37996 2 2.51997 2 2.8V6.2C2 6.48003 2 6.62004 2.0545 6.727C2.10243 6.82108 2.17892 6.89757 2.273 6.9455C2.37996 7 2.51997 7 2.8 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_TOOLS = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6L10.5 10.5M6 6H3L2 3L3 2L6 3V6ZM19.259 2.74101L16.6314 5.36863C16.2354 5.76465 16.0373 5.96265 15.9632 6.19098C15.8979 6.39183 15.8979 6.60817 15.9632 6.80902C16.0373 7.03735 16.2354 7.23535 16.6314 7.63137L16.8686 7.86863C17.2646 8.26465 17.4627 8.46265 17.691 8.53684C17.8918 8.6021 18.1082 8.6021 18.309 8.53684C18.5373 8.46265 18.7354 8.26465 19.1314 7.86863L21.5893 5.41072C21.854 6.05488 22 6.76039 22 7.5C22 10.5376 19.5376 13 16.5 13C16.1338 13 15.7759 12.9642 15.4298 12.8959C14.9436 12.8001 14.7005 12.7521 14.5532 12.7668C14.3965 12.7824 14.3193 12.8059 14.1805 12.8802C14.0499 12.9501 13.919 13.081 13.657 13.343L6.5 20.5C5.67157 21.3284 4.32843 21.3284 3.5 20.5C2.67157 19.6716 2.67157 18.3284 3.5 17.5L10.657 10.343C10.919 10.081 11.0499 9.95005 11.1198 9.81949C11.1941 9.68068 11.2176 9.60347 11.2332 9.44681C11.2479 9.29945 11.1999 9.05638 11.1041 8.57024C11.0358 8.22406 11 7.86621 11 7.5C11 4.46243 13.4624 2 16.5 2C17.5055 2 18.448 2.26982 19.259 2.74101ZM12.0001 14.9999L17.5 20.4999C18.3284 21.3283 19.6716 21.3283 20.5 20.4999C21.3284 19.6715 21.3284 18.3283 20.5 17.4999L15.9753 12.9753C15.655 12.945 15.3427 12.8872 15.0408 12.8043C14.6517 12.6975 14.2249 12.7751 13.9397 13.0603L12.0001 14.9999Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_SUPPORT = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.4996 9.00224C10.6758 8.50136 11.0236 8.079 11.4814 7.80998C11.9391 7.54095 12.4773 7.4426 13.0006 7.53237C13.524 7.62213 13.9986 7.89421 14.3406 8.30041C14.6825 8.70661 14.8697 9.22072 14.8689 9.75168C14.8689 11.2506 12.6205 12 12.6205 12M12.6495 15H12.6595M12.4996 20C17.194 20 20.9996 16.1944 20.9996 11.5C20.9996 6.80558 17.194 3 12.4996 3C7.8052 3 3.99962 6.80558 3.99962 11.5C3.99962 12.45 4.15547 13.3636 4.443 14.2166C4.55119 14.5376 4.60529 14.6981 4.61505 14.8214C4.62469 14.9432 4.6174 15.0286 4.58728 15.1469C4.55677 15.2668 4.48942 15.3915 4.35472 15.6408L2.71906 18.6684C2.48575 19.1002 2.36909 19.3161 2.3952 19.4828C2.41794 19.6279 2.50337 19.7557 2.6288 19.8322C2.7728 19.9201 3.01692 19.8948 3.50517 19.8444L8.62619 19.315C8.78127 19.299 8.85881 19.291 8.92949 19.2937C8.999 19.2963 9.04807 19.3029 9.11586 19.3185C9.18478 19.3344 9.27145 19.3678 9.44478 19.4345C10.3928 19.7998 11.4228 20 12.4996 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_SETTINGS = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export const OSS_VS_PRO_COMPARISON: ComparisonTableData = {
  eyebrow: "Differences",
  headline: "ZenML Open Source vs Pro Feature Breakdown",
  subheadline:
    "A feature by feature comparison between ZenML Open Source vs ZenML Pro",
  columnHeaders: ["OSS", "ZenML Pro"],
  headerColors: ["text-zenml-500", "text-zenml-700"],
  rows: [
    {
      feature: "Pipelines",
      description: "ML pipelines are Python workflows that execute a machine learning task",
      icon: ICON_PIPELINES,
      columns: ["Basic Controls with legacy dashboard", "Advanced Controls and modern dashboard"],
    },
    {
      feature: "Artifact and Model Control Plane",
      description: "See all your models and artifacts in one place",
      icon: ICON_CLOCK,
      columns: ["Not available", "Accessible in UI"],
    },
    {
      feature: "Event Triggers",
      description: "External sources",
      icon: ICON_LIGHTNING,
      columns: [
        "Client can trigger the pipeline only",
        "Webhooks to trigger actions (pipeline run, model promote) etc.",
      ],
    },
    {
      feature: "Run Templates",
      description: "Create repeatable workflows triggered with one click",
      icon: ICON_REFRESH,
      columns: [
        "Not available",
        "Create run templates with one-click and run templates directly via the dashboard",
      ],
    },
    {
      feature: "Container management",
      description: "If executed remotely, pipelines run in containers",
      icon: ICON_CUBE,
      columns: [
        "Basic management",
        "Advanced management with container re-use and optimization",
      ],
    },
    {
      feature: "Role Based Access Control",
      description: "Roles dictate who has permissions to do what",
      icon: ICON_TOGGLE,
      columns: ["Not available", "Fine-grained permissions"],
    },
    {
      feature: "User Management",
      description: "A user account in one ZenML server",
      icon: ICON_USERS,
      columns: ["Basic", "Advanced with SSO"],
    },
    {
      feature: "Infrastructure",
      description: "The infrastructure that supports the central ZenML server",
      icon: ICON_SERVER,
      columns: [
        "Self-managed",
        "Managed, multi-tenant deployment with database backups, security, compliance, rollbacks, upgrades etc",
      ],
    },
    {
      feature: "Service Connectors",
      description:
        "Credentials, authorization, and access control for your ML stack components",
      icon: ICON_CONNECTORS,
      columns: ["CLI only", "Modern dashboard"],
    },
    {
      feature: "Integrations",
      description:
        "External tools for experiment tracking, model deployment, drift detection, etc.",
      icon: ICON_TOOLS,
      columns: ["Community", "Purpose-built"],
    },
    {
      feature: "Support",
      description: "Seeking help when stuck",
      icon: ICON_SUPPORT,
      columns: ["Community", "Dedicated 24/7"],
    },
    {
      feature: "Setup of MLOps workflow",
      description:
        "Setting up of the codebase and infrastructure required to build a successful MLOps platform",
      icon: ICON_SETTINGS,
      columns: ["Self managed", "Specialized onboarding"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_FINAL_CTA = {
  headline: "Start deploying reproducible AI workflows today",
  body: "Enterprise-grade MLOps platform trusted by thousands of companies in production.",
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "https://cloud.zenml.io" },
} as const;
