/**
 * Shared constants for form / conversion pages.
 *
 * Cal.com configuration, Brevo endpoints, and
 * reusable option lists for demo & whitepaper forms.
 */

import type { BrevoFormConfig } from "./formTypes";

// ---------------------------------------------------------------------------
// Cal.com
// ---------------------------------------------------------------------------

export const CAL_ORIGIN = "https://app.cal.com";
export const CAL_EMBED_SCRIPT = "https://app.cal.com/embed/embed.js";

// ---------------------------------------------------------------------------
// Brevo newsletter
// ---------------------------------------------------------------------------

export const BREVO_MAIN_CONFIG: BrevoFormConfig = {
  action:
    "https://63e37fdf.sibforms.com/serve/MUIFAMvaYti4TAClgi0Pk5WouDUpgolccC7_T_KiE_vICE_qZHKI9bAryb89OZDj-UVTi8li8XCdpENY1IbHpro-OdH97V-eFffsW_rLz3yt0XPsbrPT2xh7JRlslMwMEtabMpmfA4yC3N75Ovd5Cviia74yCU7lP7sC0S5ryQ1rR-mP-YnsAG9j_PFcrMy-LrTHHOUXmlOPlb5-",
  formId: "65fd9132331e6d39b81aef11",
  submitLabel: "Subscribe",
  loadingLabel: "Subscribing…",
};

// ---------------------------------------------------------------------------
// Shared option lists
// ---------------------------------------------------------------------------

export const JOB_TITLE_OPTIONS = [
  { value: "", label: "Job title…" },
  { value: "CEO/CTO", label: "CEO/CTO" },
  { value: "MLOps Platform Engineer", label: "MLOps Platform Engineer" },
  { value: "Data Scientist", label: "Data Scientist" },
  { value: "Product Manager", label: "Product Manager" },
  { value: "ML Engineer", label: "ML Engineer" },
  { value: "Business Analyst", label: "Business Analyst" },
  { value: "Other", label: "Other" },
];

export const STARTUP_ROLE_OPTIONS = [
  { value: "", label: "Select a role…" },
  { value: "founder-co-founder", label: "Founder / Co-founder" },
  { value: "researcher-scientist", label: "Researcher / Scientist" },
  { value: "professor-faculty", label: "Professor / Faculty" },
  { value: "student-phd", label: "Student / PhD" },
  { value: "technical-lead-engineer", label: "Technical Lead / Engineer" },
  { value: "other", label: "Other" },
];
