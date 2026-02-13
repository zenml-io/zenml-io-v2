/**
 * Features hub page data — centralized marketing copy.
 * Used by src/pages/features/index.astro.
 * Follows the same pattern as src/lib/homepage.ts.
 */

export const FEATURES_HUB_HERO = {
  headline: "ZenML Features: Your MLOps Framework Solution",
  body: "Tired of setting up new MLOps tools, doing manual deployments, or having non-reproducible experiments? Use ZenML MLOps Framework to transform your ML workflows into production-ready solutions.",
  primaryCta: { label: "Book a demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "/get-started" },
};

export const FEATURES_HUB_CTA = {
  headline: "Start deploying reproducible AI workflows today",
  body: "Enterprise-grade MLOps platform trusted by thousands of companies in production.",
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "https://cloud.zenml.io" },
};

/** Category display order for the hub grid */
export const CATEGORY_ORDER = [
  "Speed",
  "Scale",
  "Observability",
  "Flexibility",
  "Reusability",
  "Optimization",
  "Governance",
] as const;

export interface HubCard {
  category: string;
  title: string;
  summary: string;
  slug: string;
  iconSvg: string;
}

/** The 7 hub cards shown on /features — data from Webflow export */
export const HUB_CARDS: HubCard[] = [
  {
    category: "Speed",
    title: "Iterate at warp speed",
    summary:
      "Accelerate your ML workflow with seamless local-to-cloud transitions and smart caching.",
    slug: "iterate-at-warp-speed",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L4.09346 12.6879C3.74465 13.1064 3.57024 13.3157 3.56758 13.4925C3.56526 13.6461 3.63373 13.7923 3.75326 13.8889C3.89075 14 4.16318 14 4.70803 14H12L11 22L19.9065 11.3121C20.2554 10.8936 20.4298 10.6843 20.4324 10.5075C20.4347 10.3539 20.3663 10.2077 20.2467 10.1111C20.1093 10 19.8368 10 19.292 10H12L13 2Z" stroke="#7A3EF4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    category: "Scale",
    title: "Limitless scaling",
    summary:
      "Effortlessly deploy across clouds and infrastructures with unified resource management.",
    slug: "limitless-scaling",
    iconSvg: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 22.9H6.8M6.8 22.9C5.11984 22.9 4.27976 22.9 3.63803 22.573C3.07354 22.2854 2.6146 21.8265 2.32698 21.262C2 20.6203 2 19.7802 2 18.1M6.8 22.9H7.2C8.88016 22.9 9.72024 22.9 10.362 22.573C10.9265 22.2854 11.3854 21.8265 11.673 21.262C12 20.6203 12 19.7802 12 18.1V17.7C12 16.0199 12 15.1798 11.673 14.5381C11.3854 13.9736 10.9265 13.5146 10.362 13.227C9.72024 12.9 8.88016 12.9 7.2 12.9H6.8C5.11984 12.9 4.27976 12.9 3.63803 13.227C3.07354 13.5146 2.6146 13.9736 2.32698 14.5381C2 15.1798 2 16.0199 2 17.7V18.1M2 18.1V10.9M10 2.90002H14M22 10.9V14.9M18 22.9C18.93 22.9 19.395 22.9 19.7765 22.7978C20.8117 22.5204 21.6204 21.7118 21.8978 20.6765C22 20.295 22 19.83 22 18.9M22 6.90002C22 5.97005 22 5.50507 21.8978 5.12357C21.6204 4.08829 20.8117 3.27965 19.7765 3.00225C19.395 2.90002 18.93 2.90002 18 2.90002M6 2.90002C5.07003 2.90002 4.60504 2.90002 4.22354 3.00225C3.18827 3.27965 2.37962 4.08829 2.10222 5.12357C2 5.50507 2 5.97005 2 6.90002" stroke="#7A3EF4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    category: "Observability",
    title: "Auto-track everything",
    summary:
      "Automatic logging and versioning for truly reproducible ML workflows",
    slug: "auto-track-everything",
    iconSvg: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 22.9H6.8M6.8 22.9C5.11984 22.9 4.27976 22.9 3.63803 22.573C3.07354 22.2854 2.6146 21.8265 2.32698 21.262C2 20.6203 2 19.7802 2 18.1M6.8 22.9H7.2C8.88016 22.9 9.72024 22.9 10.362 22.573C10.9265 22.2854 11.3854 21.8265 11.673 21.262C12 20.6203 12 19.7802 12 18.1V17.7C12 16.0199 12 15.1798 11.673 14.5381C11.3854 13.9736 10.9265 13.5146 10.362 13.227C9.72024 12.9 8.88016 12.9 7.2 12.9H6.8C5.11984 12.9 4.27976 12.9 3.63803 13.227C3.07354 13.5146 2.6146 13.9736 2.32698 14.5381C2 15.1798 2 16.0199 2 17.7V18.1M2 18.1V10.9M10 2.90002H14M22 10.9V14.9M18 22.9C18.93 22.9 19.395 22.9 19.7765 22.7978C20.8117 22.5204 21.6204 21.7118 21.8978 20.6765C22 20.295 22 19.83 22 18.9M22 6.90002C22 5.97005 22 5.50507 21.8978 5.12357C21.6204 4.08829 20.8117 3.27965 19.7765 3.00225C19.395 2.90002 18.93 2.90002 18 2.90002M6 2.90002C5.07003 2.90002 4.60504 2.90002 4.22354 3.00225C3.18827 3.27965 2.37962 4.08829 2.10222 5.12357C2 5.50507 2 5.97005 2 6.90002" stroke="#7A3EF4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    category: "Flexibility",
    title: "Backend flexibility, zero lock-in",
    summary:
      "One framework for all your MLOps and LLMOps needs, with the flexibility to change as you grow.",
    slug: "backend-flexibility-zero-lock-in",
    iconSvg: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.1525 11.8094L12.1369 20.825C10.0866 22.8752 6.7625 22.8752 4.71225 20.825C2.662 18.7747 2.662 15.4506 4.71225 13.4004L13.7279 4.38475C15.0947 3.01791 17.3108 3.01791 18.6776 4.38475C20.0444 5.75158 20.0444 7.96766 18.6776 9.33449L10.0156 17.9966C9.33213 18.68 8.22409 18.68 7.54068 17.9966C6.85726 17.3131 6.85726 16.2051 7.54068 15.5217L15.1421 7.92028" stroke="#7A3EF4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    category: "Reusability",
    title: "Shared ML building blocks",
    summary:
      "Boost team productivity with reusable components and standardized configurations.",
    slug: "shared-ml-building-blocks",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 2L14 5M14 5L11 8M14 5H6.8C5.11984 5 4.27976 5 3.63803 5.32698C3.07354 5.6146 2.6146 6.07354 2.32698 6.63803C2 7.27976 2 8.11984 2 9.8V15.5C2 15.9644 2 16.1966 2.02567 16.3916C2.2029 17.7378 3.26222 18.7971 4.60842 18.9743C4.80337 19 5.03558 19 5.5 19M10 19H17.2C18.8802 19 19.7202 19 20.362 18.673C20.9265 18.3854 21.3854 17.9265 21.673 17.362C22 16.7202 22 15.8802 22 14.2V8.5C22 8.03558 22 7.80337 21.9743 7.60842C21.7971 6.26222 20.7378 5.2029 19.3916 5.02567C19.1966 5 18.9644 5 18.5 5M10 19L13 22M10 19L13 16" stroke="#7A3EF4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    category: "Optimization",
    title: "Streamline cloud expenses",
    summary:
      "Gain clarity on resource usage and costs across your entire ML infrastructure.",
    slug: "streamline-cloud-expenses",
    iconSvg: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 7.80762L12 12.5298M12 12.5298L3.49997 7.80762M12 12.5298L12 22.0299M14 21.4188L12.777 22.0982C12.4934 22.2557 12.3516 22.3345 12.2015 22.3654C12.0685 22.3927 11.9315 22.3927 11.7986 22.3654C11.6484 22.3345 11.5066 22.2557 11.223 22.0982L3.82297 17.9871C3.52346 17.8207 3.37368 17.7375 3.26463 17.6191C3.16816 17.5144 3.09515 17.3904 3.05048 17.2552C3 17.1024 3 16.9311 3 16.5884V8.47132C3 8.12867 3 7.95735 3.05048 7.80455C3.09515 7.66938 3.16816 7.5453 3.26463 7.44061C3.37368 7.32227 3.52345 7.23907 3.82297 7.07267L11.223 2.96155C11.5066 2.804 11.6484 2.72521 11.7986 2.69433C11.9315 2.66699 12.0685 2.66699 12.2015 2.69433C12.3516 2.72521 12.4934 2.80399 12.777 2.96155L20.177 7.07266C20.4766 7.23907 20.6263 7.32227 20.7354 7.4406C20.8318 7.54529 20.9049 7.66938 20.9495 7.80455C21 7.95735 21 8.12867 21 8.47132L21 13.0299M7.5 5.02987L16.5 10.0299M16 18.5299L18 20.5299L22 16.5299" stroke="#7A3EF4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    category: "Governance",
    title: "Security guardrails, always",
    summary:
      "Robust ML security with effortless implementation and management.",
    slug: "security-guardrails-always",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V9.15032C18.2826 9.21225 18.5539 9.30243 18.816 9.43597C19.5686 9.81947 20.1805 10.4314 20.564 11.184C20.8113 11.6694 20.9099 12.1861 20.9558 12.7482C21 13.2894 21 13.9537 21 14.7587V16.2413C21 17.0463 21 17.7106 20.9558 18.2518C20.9099 18.8139 20.8113 19.3306 20.564 19.816C20.1805 20.5686 19.5686 21.1805 18.816 21.564C18.3306 21.8113 17.8139 21.9099 17.2518 21.9558C16.7106 22 16.0463 22 15.2413 22H8.75868C7.95372 22 7.28936 22 6.74817 21.9558C6.18608 21.9099 5.66937 21.8113 5.18404 21.564C4.43139 21.1805 3.81947 20.5686 3.43597 19.816C3.18868 19.3306 3.09012 18.8139 3.04419 18.2518C2.99998 17.7106 2.99999 17.0463 3 16.2413V14.7587C2.99999 13.9537 2.99998 13.2894 3.04419 12.7482C3.09012 12.1861 3.18868 11.6694 3.43597 11.184C3.81947 10.4314 4.43139 9.81947 5.18404 9.43597C5.44614 9.30243 5.71739 9.21225 6 9.15032V8ZM8 9.00163C8.23771 8.99999 8.4904 9 8.7587 9H15.2413C15.5096 9 15.7623 8.99999 16 9.00163V8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9.00163ZM6.91104 11.0376C6.47262 11.0734 6.24842 11.1383 6.09202 11.218C5.7157 11.4097 5.40973 11.7157 5.21799 12.092C5.1383 12.2484 5.07337 12.4726 5.03755 12.911C5.00078 13.3611 5 13.9434 5 14.8V16.2C5 17.0566 5.00078 17.6389 5.03755 18.089C5.07337 18.5274 5.1383 18.7516 5.21799 18.908C5.40973 19.2843 5.7157 19.5903 6.09202 19.782C6.24842 19.8617 6.47262 19.9266 6.91104 19.9624C7.36113 19.9992 7.94342 20 8.8 20H15.2C16.0566 20 16.6389 19.9992 17.089 19.9624C17.5274 19.9266 17.7516 19.8617 17.908 19.782C18.2843 19.5903 18.5903 19.2843 18.782 18.908C18.8617 18.7516 18.9266 18.5274 18.9624 18.089C18.9992 17.6389 19 17.0566 19 16.2V14.8C19 13.9434 18.9992 13.3611 18.9624 12.911C18.9266 12.4726 18.8617 12.2484 18.782 12.092C18.5903 11.7157 18.2843 11.4097 17.908 11.218C17.7516 11.1383 17.5274 11.0734 17.089 11.0376C16.6389 11.0008 16.0566 11 15.2 11H8.8C7.94342 11 7.36113 11.0008 6.91104 11.0376ZM12 13.5C12.5523 13.5 13 13.9477 13 14.5V16.5C13 17.0523 12.5523 17.5 12 17.5C11.4477 17.5 11 17.0523 11 16.5V14.5C11 13.9477 11.4477 13.5 12 13.5Z" fill="#7A3EF4"/></svg>`,
  },
];
