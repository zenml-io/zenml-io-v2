/**
 * Cookie consent category → script mapping.
 *
 * Single source of truth for all third-party scripts gated behind
 * cookie consent. Used by both the CookieConsent island (to know
 * which scripts to inject) and TrackingScripts (for SSR list).
 */

export type ConsentCategory = "essential" | "analytics" | "marketing" | "personalization";

export interface ScriptDefinition {
  /** Unique identifier for deduplication */
  id: string;
  /** Consent category this script belongs to */
  category: ConsentCategory;
  /** External script URL (mutually exclusive with `inline`) */
  src?: string;
  /** Inline script content (mutually exclusive with `src`) */
  inline?: string;
  /** Additional attributes (async, defer, data-*, etc.) */
  attrs?: Record<string, string>;
}

/** All third-party scripts organized by consent category. */
export const TRACKING_SCRIPTS: ScriptDefinition[] = [
  // ── Analytics ────────────────────────────────────────────────
  {
    id: "ga4",
    category: "analytics",
    src: "https://www.googletagmanager.com/gtag/js?id=G-T3T6F795FY",
    attrs: { async: "" },
  },
  {
    id: "ga4-config",
    category: "analytics",
    inline: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-T3T6F795FY');`,
  },
  {
    id: "segment",
    category: "analytics",
    inline: `!function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/"+key+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="Q9Gsmet5Uo67D8HIEk4pj5vUOalWu4iT";analytics.SNIPPET_VERSION="5.2.0";analytics.load("Q9Gsmet5Uo67D8HIEk4pj5vUOalWu4iT");analytics.page()}}();`,
  },
  {
    id: "hotjar",
    category: "analytics",
    inline: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:2973500,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
  },

  // ── Marketing ────────────────────────────────────────────────
  {
    id: "hubspot",
    category: "marketing",
    src: "https://js-eu1.hs-scripts.com/144099597.js",
    attrs: { async: "", defer: "", id: "hs-script-loader" },
  },
  {
    id: "rb2b",
    category: "marketing",
    inline: `!function(){var reb2b=window.reb2b=window.reb2b||[];if(reb2b.invoked)return;reb2b.invoked=true;reb2b.methods=["identify","collect"];reb2b.factory=function(method){return function(){var args=Array.prototype.slice.call(arguments);args.unshift(method);reb2b.push(args);return reb2b}};for(var i=0;i<reb2b.methods.length;i++){var key=reb2b.methods[i];reb2b[key]=reb2b.factory(key)}reb2b.load=function(key){var script=document.createElement("script");script.type="text/javascript";script.async=true;script.src="https://s3-us-west-2.amazonaws.com/b2bjsstore/b/"+key+"/Z6PVLHP07Q6R.js.gz";var first=document.getElementsByTagName("script")[0];first.parentNode.insertBefore(script,first)};reb2b.SNIPPET_VERSION="1.0.1";reb2b.load("Z6PVLHP07Q6R")}();`,
  },
  {
    id: "reo",
    category: "marketing",
    inline: `!function(){var e,t,n;e="d696528d7eed7f5",t=function(){Reo.init({clientID:"d696528d7eed7f5"})},(n=document.createElement("script")).src="https://static.reo.dev/"+e+"/reo.js",n.async=!0,n.onload=t,document.head.appendChild(n)}();`,
  },
  {
    id: "ortto",
    category: "marketing",
    inline: `window.ap3c=window.ap3c||{};var ap3c=window.ap3c;ap3c.cmd=ap3c.cmd||[];ap3c.cmd.push(function(){ap3c.init('ZLL3D-tdcsJ2LnXAemVubWw','https://capture-api-eu.ortto.app/');ap3c.track({v:0})});ap3c.activity=function(act){ap3c.act=(ap3c.act||[]);ap3c.act.push(act)};var s,t;s=document.createElement('script');s.type='text/javascript';s.async=true;s.src='https://cdn.ap3c.com/core/v4/appcues.js';t=document.getElementsByTagName('script')[0];t.parentNode.insertBefore(s,t);`,
  },
  {
    id: "apollo",
    category: "marketing",
    inline: `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"691f4e111003f200159c6363"})},document.head.appendChild(o)}initApollo();`,
  },
];

/** Categories with human-friendly labels and descriptions. */
export const CONSENT_CATEGORIES: {
  id: ConsentCategory;
  label: string;
  description: string;
  required: boolean;
}[] = [
  {
    id: "essential",
    label: "Essential",
    description: "Required for the website to function. Cannot be disabled.",
    required: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Help us understand how visitors use our site (GA4, Segment, Hotjar).",
    required: false,
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Enable targeted advertising and lead identification (HubSpot, RB2B, Reo, Apollo).",
    required: false,
  },
  {
    id: "personalization",
    label: "Personalization",
    description: "Customize content and chat experiences (HubSpot chat).",
    required: false,
  },
];

/** Get all scripts for consented categories. */
export function getConsentedScripts(
  consent: Record<ConsentCategory, boolean>,
): ScriptDefinition[] {
  return TRACKING_SCRIPTS.filter((s) => consent[s.category]);
}
