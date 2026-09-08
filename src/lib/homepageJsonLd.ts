import { COMPANY_ADDRESS, CONTACT_EMAIL, SITE_URL } from "./constants";
import {
  LABS_CLOSE,
  LABS_DOORS,
  LABS_FEATURE_PANELS,
  LABS_HOME_SEO,
} from "./labs-home";
import { absoluteUrl } from "./seo";

/**
 * JSON-LD for the ZenML Labs homepage (`/`). Every string comes from
 * `labs-home.ts`, so the structured data describes what the page shows:
 * the company, the page, and the two products as one software offering.
 * There is no FAQ node (the page has no FAQ) and no demo action (the page
 * has no demo button).
 */
function homepageFeatureList(): string[] {
  return [
    ...LABS_DOORS.doors.map((door) => `${door.name}: ${door.leadLine}`),
    ...LABS_FEATURE_PANELS.map((panel) => `${panel.title}: ${panel.body}`),
  ];
}

export interface HomepageJsonLdOptions {
  /** Organization + SoftwareApplication display name. Defaults to "ZenML Labs". */
  organizationName?: string;
  /** Organization logo path (root-relative). Defaults to the Labs lockup. */
  logoPath?: string;
}

export function buildHomepageJsonLd(
  options: HomepageJsonLdOptions = {},
): Record<string, unknown> {
  const {
    organizationName = "ZenML Labs",
    logoPath = "/images/zenml-labs-lockup.svg",
  } = options;
  const organizationId = `${SITE_URL}/#organization`;
  const webPageId = `${SITE_URL}/#webpage`;
  const softwareId = `${SITE_URL}/#software`;
  const breadcrumbId = `${SITE_URL}/#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: organizationName,
        legalName: "ZenML GmbH",
        url: SITE_URL,
        logo: absoluteUrl(logoPath),
        sameAs: [
          "https://github.com/zenml-io/zenml",
          "https://github.com/zenml-io/kitaru",
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
        name: LABS_HOME_SEO.title,
        description: LABS_HOME_SEO.description,
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
        name: organizationName,
        applicationCategory: "DeveloperApplication",
        url: SITE_URL,
        description: LABS_HOME_SEO.description,
        publisher: { "@id": organizationId },
        featureList: homepageFeatureList(),
        potentialAction: [
          {
            "@type": "RegisterAction",
            name: LABS_CLOSE.cta.label,
            target: LABS_CLOSE.cta.href,
          },
          ...LABS_DOORS.doors.map((door) => ({
            "@type": "ViewAction",
            name: door.cta.label,
            target: absoluteUrl(door.cta.href),
          })),
        ],
      },
    ],
  };
}
