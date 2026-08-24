import { COMPANY_ADDRESS, CONTACT_EMAIL, SITE_URL } from "./constants";
import { FAQ } from "./homepage";
import {
  HOMEPAGE_UNIFIED_SEO,
  HOMEPAGE_UNIFIED_VALUES,
  HOMEPAGE_UNIFIED_WORKSPACES,
} from "./homepage-unified";
import { absoluteUrl } from "./seo";
import { htmlToPlainText } from "./text";

function homepageFeatureList(): string[] {
  return [
    ...HOMEPAGE_UNIFIED_WORKSPACES.items.flatMap((workspace) => [
      `${workspace.name}: ${workspace.tagline}`,
      ...workspace.bullets,
    ]),
    ...HOMEPAGE_UNIFIED_VALUES.items.map(
      (item) => `${item.name}: ${item.body}`,
    ),
  ];
}

export function buildHomepageJsonLd(): Record<string, unknown> {
  const organizationId = `${SITE_URL}/#organization`;
  const webPageId = `${SITE_URL}/#webpage`;
  const softwareId = `${SITE_URL}/#software`;
  const breadcrumbId = `${SITE_URL}/#breadcrumb`;
  const faqId = `${SITE_URL}/#faq`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "ZenML",
        legalName: "ZenML GmbH",
        url: SITE_URL,
        logo: absoluteUrl("/images/zenml-logo.svg"),
        sameAs: [
          "https://github.com/zenml-io/zenml",
          "https://twitter.com/zenml_io",
          "https://www.linkedin.com/company/zenml",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY_ADDRESS.street,
          postalCode: COMPANY_ADDRESS.postalCode,
          addressLocality: COMPANY_ADDRESS.city,
          addressCountry: COMPANY_ADDRESS.countryCode,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            url: absoluteUrl("/book-your-demo"),
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: CONTACT_EMAIL,
            url: absoluteUrl("/contact"),
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": webPageId,
        url: SITE_URL,
        name: HOMEPAGE_UNIFIED_SEO.title,
        description: HOMEPAGE_UNIFIED_SEO.description,
        publisher: { "@id": organizationId },
        mainEntity: { "@id": softwareId },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": softwareId,
        name: "ZenML",
        applicationCategory: "DeveloperApplication",
        url: SITE_URL,
        description: HOMEPAGE_UNIFIED_SEO.description,
        publisher: { "@id": organizationId },
        featureList: homepageFeatureList(),
        potentialAction: [
          {
            "@type": "ContactAction",
            name: "Book a demo",
            target: absoluteUrl("/book-your-demo"),
          },
          {
            "@type": "ReadAction",
            name: "Read Docs",
            target: absoluteUrl("/docs"),
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: FAQ.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: htmlToPlainText(item.answer),
          },
        })),
      },
    ],
  };
}
