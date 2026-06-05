import {
  PRICING_FAQ,
  PRICING_FINAL_CTA,
  PRICING_HERO,
  PRICING_PLANS,
  PRICING_SEO,
} from "./pricing";
import { absoluteUrl } from "./seo";
import { htmlToPlainText } from "./text";

function reliablePriceFields(
  plan: (typeof PRICING_PLANS)[number],
): Record<string, unknown> {
  if (plan.price.toLowerCase() === "free") {
    return { price: 0, priceCurrency: "USD" };
  }

  return {};
}

function planDescription(plan: (typeof PRICING_PLANS)[number]): string {
  const limits = plan.limitsLine ? ` ${plan.limitsLine}.` : "";
  const slider = plan.slider
    ? ` ${plan.slider.caption}: ${plan.slider.tiers
        .map(
          (tier) =>
            `${tier.executions} executions for ${tier.price}/month (${tier.projects} projects, ${tier.snapshots} snapshots)`,
        )
        .join("; ")}.`
    : "";

  return `${plan.subtitle}.${limits}${slider}`.trim();
}

export function buildPricingJsonLd(): Record<string, unknown> {
  const pricingUrl = absoluteUrl("/pricing");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pricingUrl}#webpage`,
        url: pricingUrl,
        name: PRICING_SEO.title,
        description: PRICING_SEO.description,
        inLanguage: "en",
        mainEntity: { "@id": `${pricingUrl}#software` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pricingUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Pricing",
            item: pricingUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pricingUrl}#faq`,
        mainEntity: PRICING_FAQ.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: htmlToPlainText(item.answer),
          },
        })),
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${pricingUrl}#software`,
        name: "ZenML",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Python, Kubernetes, AWS, GCP, Azure",
        url: absoluteUrl("/product/zenml"),
        description: PRICING_HERO.deck,
        featureList: PRICING_PLANS.flatMap((plan) => plan.features),
        offers: {
          "@type": "OfferCatalog",
          name: "ZenML pricing plans",
          itemListElement: PRICING_PLANS.map((plan) => ({
            "@type": "Offer",
            name: plan.eyebrow,
            url: absoluteUrl(plan.cta.href),
            ...reliablePriceFields(plan),
            description: planDescription(plan),
            itemOffered: {
              "@type": "SoftwareApplication",
              name: `ZenML ${plan.eyebrow}`,
              applicationCategory: "DeveloperApplication",
              featureList: plan.features,
            },
          })),
        },
        potentialAction: {
          "@type": "ViewAction",
          name: PRICING_FINAL_CTA.primaryCta.label,
          target: absoluteUrl(PRICING_FINAL_CTA.primaryCta.href),
        },
      },
    ],
  };
}
