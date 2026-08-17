import type { PricingPlan } from "./marketingPageTypes";
import {
  PRICING_FAQ_KITARU,
  PRICING_FAQ_ZENML,
  PRICING_FINAL_CTA,
  PRICING_HERO,
  PRICING_PLANS,
  PRICING_PLANS_KITARU,
  PRICING_SEO,
} from "./pricing";
import { absoluteUrl } from "./seo";
import { htmlToPlainText } from "./text";

function reliablePriceFields(plan: PricingPlan): Record<string, unknown> {
  if (plan.price.toLowerCase() === "free") {
    return { price: 0, priceCurrency: "USD" };
  }

  // A slider plan's headline price is only one tier of a range — publishing
  // it as THE price would misstate the plan, so emit nothing for those.
  const flatDollars = plan.slider ? null : plan.price.match(/^\$(\d+)$/);
  if (flatDollars) {
    const price = Number(flatDollars[1]);
    const fields: Record<string, unknown> = { price, priceCurrency: "USD" };
    if (plan.priceSuffix === "/month") {
      fields.priceSpecification = {
        "@type": "UnitPriceSpecification",
        price,
        priceCurrency: "USD",
        billingIncrement: 1,
        unitCode: "MON",
      };
    }
    return fields;
  }

  return {};
}

function planDescription(plan: PricingPlan): string {
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
        mainEntity: [
          { "@id": `${pricingUrl}#software-kitaru` },
          { "@id": `${pricingUrl}#software` },
        ],
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
        mainEntity: [
          ...PRICING_FAQ_KITARU.items,
          ...PRICING_FAQ_ZENML.items,
        ].map((item) => ({
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
        "@id": `${pricingUrl}#software-kitaru`,
        name: "Kitaru",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Python, Kubernetes, AWS, GCP, Azure",
        url: absoluteUrl("/product/kitaru"),
        description:
          "Kitaru is an open-source platform for replay-based agent evals: import your production traces, run evaluators over them, and replay real sessions against your next change before it ships.",
        featureList: PRICING_PLANS_KITARU.flatMap((plan) => plan.features),
        offers: {
          "@type": "OfferCatalog",
          name: "Kitaru pricing plans",
          itemListElement: PRICING_PLANS_KITARU.map((plan) => ({
            "@type": "Offer",
            name: plan.eyebrow,
            url: absoluteUrl(plan.cta.href),
            ...reliablePriceFields(plan),
            description: planDescription(plan),
            itemOffered: {
              "@type": "SoftwareApplication",
              name: `Kitaru ${plan.eyebrow}`,
              applicationCategory: "DeveloperApplication",
              featureList: plan.features,
            },
          })),
        },
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
