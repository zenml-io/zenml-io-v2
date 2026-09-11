/**
 * Temporary bridge: the `quotes` content collection still stores the
 * Webflow-era white PNG company logos (see `companyLogo.url` in
 * `src/content/quotes/*.md`). Those render invisible on light bands, so this
 * map swaps the known white PNGs for local colour SVGs at render time.
 *
 * Remove this once the quotes collection is updated to point `companyLogo`
 * at the colour SVGs directly (and this map can be deleted along with it).
 */
type LogoOverride = { src: string; alt: string };

const QUOTE_LOGO_OVERRIDES: Record<string, LogoOverride> = {
  "667bd89e8858ebeb4fc5891d_brevo_white.png": {
    src: "/images/logos/brevo.svg",
    alt: "Brevo logo",
  },
  "667bd618ee6049af44ceb6e8_adeo_logo_white.png": {
    src: "/images/logos/adeo.svg",
    alt: "ADEO logo",
  },
  "66702f51c21dcf773594cc98_salesforce_white.png": {
    src: "/images/logos/salesforce.svg",
    alt: "Salesforce logo",
  },
};

/** Resolve a quote's companyLogo.url to a local colour SVG, if a bridge entry exists. */
export function resolveQuoteLogo(
  url: string | undefined,
): LogoOverride | undefined {
  if (!url) return undefined;
  const filename = url.split("/").pop();
  return filename ? QUOTE_LOGO_OVERRIDES[filename] : undefined;
}
