# ZenML Website Forms Audit

**Date:** 2026-02-10
**Purpose:** Comprehensive inventory of all forms on zenml.io for migration from Webflow to Astro
**Site ID:** `64a817a2e7e2208272d1ce30`

---

## Summary

The ZenML website has **8 distinct form types** across multiple pages. The forms
fall into four categories:

1. **Webflow-native forms** (contact/demo request/application) -- 4 forms
2. **Brevo (Sendinblue) embedded newsletter forms** -- 2 instances (same form ID
   on homepage + newsletter page; different form ID on LLMOps Database page)
3. **Cal.com embedded scheduling widgets** -- 2 instances
4. **Interactive client-side widgets** (ROI calculator, cookie consent) -- 2
   instances

There are also several **redirect pages** and **success/thank-you pages** that
are part of form flows but do not contain forms themselves.

---

## Forms Inventory

### 1. Demo Request Form (Webflow Native)

| Property | Value |
|----------|-------|
| **Pages** | `/book-a-demo`, `/signup-for-demo` (identical forms) |
| **Purpose** | Capture demo request leads; first step before Cal.com booking |
| **Implementation** | Webflow native form |
| **Fields** | Full name (required), Work Email (required), Job Title (optional dropdown), Privacy policy checkbox |
| **Job Title Options** | CEO/CTO, MLOps Platform Engineer, Data Scientist, Product Manager, ML Engineer, Business Analyst, Other |
| **Submit Button** | "Send Request" (waiting text: "Please wait...") |
| **Success Action** | Shows thank-you message + link to `/success-calendar` for Cal.com booking |
| **Error Message** | "Oops! Something went wrong while submitting the form." |
| **Downstream** | Webflow form submissions (likely forwarded to Attio CRM) |

**Notes:**
- `/book-a-demo` and `/signup-for-demo` are two pages with the exact same form
  structure (same node IDs even). One is labeled "old" in the Webflow CMS.
- After form submission, user sees a CTA to "select a calendar slot right now"
  linking to `/success-calendar` which has an embedded Cal.com widget.
- There are also pages `/book-a-demo-old-version` (draft) and
  `/book-a-demo-success` that are part of this flow.

### 2. Whitepaper Download Gate (Webflow Native)

| Property | Value |
|----------|-------|
| **Page** | `/whitepaper-architecting-an-enterprise-grade-mlops-platform` |
| **Purpose** | Gate whitepaper PDF download behind email capture |
| **Implementation** | Webflow native form |
| **Fields** | Full name (required), Work Email (required), Job Title (optional dropdown), Company (optional text) |
| **Job Title Options** | Same as demo form: CEO/CTO, MLOps Platform Engineer, Data Scientist, Product Manager, ML Engineer, Business Analyst, Other |
| **Privacy** | Privacy policy agreement checkbox |
| **Success Action** | Shows confirmation + CTA to schedule a ZenML Cloud demo via zcal.co (`https://zcal.co/i/wf5_QqYV`) |
| **Downstream** | Webflow form submissions (likely forwarded to CRM) |

**Notes:**
- This is a gated content pattern: fill form to get whitepaper, then upsell to
  demo.
- The zcal.co link in the success state is a different scheduling link from the
  main Cal.com widget.

### 3. Startups & Academics Application Form (Webflow Native)

| Property | Value |
|----------|-------|
| **Page** | `/startups-and-academics` |
| **Purpose** | Application for ZenML Pro startup/academic program |
| **Implementation** | Webflow native form |
| **Fields** | Full name (required), Company/Organization Email (required), LinkedIn Profile (required), Company/Organization (required), Role dropdown (required) |
| **Role Options** | Founder / Co-founder, Researcher / Scientist, Professor / Faculty, Student / PhD, Technical Lead / Engineer, Other |
| **Submit Button** | "Apply" (waiting text: "Please wait...") |
| **Success Action** | "We will review your application and contact you as soon as possible." + Back to Home link |
| **Error Message** | "Oops! Something went wrong while submitting the form." |
| **Privacy** | "By sending this form you agree to our privacy policy." with link |
| **Downstream** | Webflow form submissions (likely forwarded to CRM) |

### 4. Newsletter Signup Form (Brevo Embedded)

| Property | Value |
|----------|-------|
| **Pages** | Homepage (`/`), `/newsletter-signup`, Blog listing (`/blog`), LLMOps Database page (`/llmops-database`) |
| **Purpose** | Email newsletter subscription |
| **Implementation** | Brevo (formerly Sendinblue) embedded form via custom JavaScript |
| **Fields** | Email address (required) |
| **Submit Button** | Shows "Subscribing..." loading state |
| **Success Action** | Thank-you message displayed inline |
| **Form IDs** | `ap3w-embeddable-form-65fd9132331e6d39b81aef11` (homepage, newsletter-signup); `ap3w-embeddable-form-67d01f2bed4adbf1ecf4e6cc` (LLMOps Database page) |
| **Submission Method** | `fetch()` POST with `mode: 'no-cors'` to Brevo endpoint |
| **Downstream** | Brevo email marketing platform |

**Notes:**
- Two different Brevo form IDs are in use -- possibly different lists (main
  newsletter vs. LLMOps-specific list).
- The newsletter success page is at `/newsletter-success`.
- The blog listing page also has a search input field (using Finsweet CMS
  Filter: `fs-cmsfilter-field="*"`) which is not a form submission but a
  client-side filter.

### 5. Cal.com Discovery Call Widget (Embedded)

| Property | Value |
|----------|-------|
| **Pages** | `/book-your-demo` (primary), `/success-calendar` (post-form-submission), `/schedule-a-demo` |
| **Purpose** | Schedule a 30-min discovery call / demo |
| **Implementation** | Cal.com inline embed |
| **Cal Links** | `zenml/discovery-call` (on `/book-your-demo`), `zenml/discovery-call-reschedule` (on `/schedule-a-demo`) |
| **Target Element** | `#my-cal-inline-discovery-call` / `#my-cal-inline-discovery-call-reschedule` |
| **Layout** | Month view |
| **Origin** | `https://app.cal.com` |
| **Init Code** | `Cal("init", "discovery-call", {origin:"https://app.cal.com"})` |

**Notes:**
- `/book-your-demo` is the **current primary demo booking page** -- pure
  Cal.com, no Webflow form.
- `/schedule-a-demo` uses a slightly different Cal link (reschedule variant).
- `/success-calendar` is the page users land on after submitting the
  `/book-a-demo` form (Webflow native) and choosing to book a time.
- There is also a zcal.co link (`https://zcal.co/i/wf5_QqYV`) referenced on
  the whitepaper page's success state -- this appears to be an older/alternate
  scheduling tool.

### 6. ROI Calculator (Client-Side Interactive Widget)

| Property | Value |
|----------|-------|
| **Page** | `/roi-calculator` |
| **Purpose** | Calculate estimated ROI of adopting ZenML |
| **Implementation** | Custom JavaScript with range sliders |
| **Inputs** | Models in production (1-500, default 15), Team size (1-100, default 8), Monthly cloud spend ($200-$100k, default $25k) |
| **Outputs** | Infrastructure optimization savings, Team productivity gains, Model performance impact, Monthly ZenML cost, ROI percentage |
| **Submission** | No form submission -- pure client-side calculation |

**Notes:**
- This is entirely client-side; no data is sent to a server.
- Disclaimer: "This is a rough estimate based on industry averages."

### 7. Cookie Consent / Privacy Preference Center

| Property | Value |
|----------|-------|
| **Pages** | All pages (global) |
| **Purpose** | GDPR-compliant cookie consent management |
| **Implementation** | Cookie consent banner (appears to be custom or a Webflow-compatible tool) |
| **Fields** | Toggle categories: Essential (always on), Marketing, Personalization, Analytics |
| **Actions** | "Reject all cookies", "Allow all cookies", "Confirm my preferences and close" |

**Notes:**
- Need to identify exactly which cookie consent tool is used (could be
  CookieYes, Osano, or a custom implementation).
- This needs to be replicated in Astro with the same categories.

### 8. Blog Search / CMS Filter (Client-Side)

| Property | Value |
|----------|-------|
| **Pages** | `/blog`, `/compare` |
| **Purpose** | Filter/search blog posts and comparison tool entries |
| **Implementation** | Finsweet CMS Filter (`fs-cmsfilter`) |
| **Fields** | Search text input, category radio/checkboxes |
| **Submission** | No form submission -- client-side filtering only |

**Notes:**
- Uses Finsweet Attributes library for Webflow CMS filtering.
- In Astro, this would be replaced with native filtering (Preact island or
  static generation with client-side JS).

---

## Redirect Pages (No Forms)

These pages exist as part of form flows or external redirects:

| Page | Slug | Destination |
|------|------|-------------|
| Discussion | `/discussion` | Redirects to `github.com/zenml-io/zenml/discussions` |
| Slack | `/slack` | Redirects to Slack community invite |
| Slack Invite | `/slack-invite` | Redirects to Slack invite link |
| Meet | `/meet` | Redirect page |
| ZenML Meet | `/zenml-meet` | Redirect page |
| Roadmap | `/roadmap` | Redirects to `zenml.featureos.app/roadmap` |
| CLA | `/cla` | Contributor License Agreement page |
| Live Demo | `/live-demo` | Interactive demo page |
| Live Demo - Cloud | `/interactive-demo-mcp` | Interactive demo page |

## Success / Thank-You Pages (No Forms)

| Page | Slug | Purpose |
|------|------|---------|
| Newsletter Success | `/newsletter-success` | Shown after Brevo newsletter signup |
| Success - Request a call | `/success-calendar` | Cal.com embed for booking after form submission |
| Signup for Demo - Success | `/book-success` | Thank you page after demo signup |
| Book a Demo Success | `/book-a-demo-success` | Thank you page for demo booking |
| Thank you for booking! | `/booked` | Shown after Cal.com booking completes |

---

## Third-Party Services Involved

| Service | Purpose | Integration Type |
|---------|---------|-----------------|
| **Brevo (Sendinblue)** | Newsletter email marketing | Embedded form via JS + fetch POST |
| **Cal.com** | Demo scheduling | Inline embed widget (`app.cal.com`) |
| **zcal.co** | Alternate scheduling | External link (`zcal.co/i/wf5_QqYV`) |
| **Attio** | CRM | Likely receives Webflow form data via webhook/Zapier |
| **Segment** | Analytics/tracking | JS snippet on all pages |
| **Apollo.io** | B2B sales intelligence | Website tracking script |
| **Reb2b** | B2B visitor identification | Tracking script |
| **Reo.dev** | Developer intelligence | Client tracking |
| **Ortto (Cloudortto)** | CDP/marketing automation | Tracking via `cloudortto.zenml.io` |
| **Google Analytics** | Web analytics | GA4 (`G-T3T6F795FY`) |
| **Plausible** | Privacy-friendly analytics | (Referenced in project docs) |
| **Notion** | Job postings | External links to `zenml.notion.site` |

---

## Migration Recommendations

### Form-by-Form Replacement Strategy

| Form | Current | Recommended Replacement |
|------|---------|------------------------|
| **Demo Request** (Webflow native) | Webflow forms | Cloudflare Worker endpoint + Astro form component. POST to a Worker that forwards to Attio CRM via API. |
| **Whitepaper Gate** (Webflow native) | Webflow forms | Same Cloudflare Worker pattern. Deliver PDF download link in success response. |
| **Startups Application** (Webflow native) | Webflow forms | Same Cloudflare Worker pattern. Consider sending to a dedicated Attio pipeline. |
| **Newsletter Signup** (Brevo) | Brevo embedded JS | Keep Brevo integration. Replicate the `fetch()` POST in a Preact island or vanilla JS. No backend needed. |
| **Cal.com Booking** | Cal.com inline embed | Keep Cal.com embed. Use `@calcom/embed-react` or plain JS embed in an Astro island. Zero migration work. |
| **ROI Calculator** | Custom JS | Rebuild as a Preact island. Pure client-side, no backend. |
| **Cookie Consent** | Unknown tool | Use a lightweight GDPR tool like `cookie-consent-banner` or build a custom Preact component. Must replicate same 4 categories. |
| **Blog/CMS Filters** | Finsweet CMS Filter | Replace with Preact island for client-side filtering of statically-generated content, or use Pagefind for search. |

### Cloudflare Worker Form Handler Architecture

For the three Webflow-native forms, build a single reusable Cloudflare Worker:

```
POST /api/forms/{form-type}
Content-Type: application/json

{
  "formType": "demo-request" | "whitepaper" | "startup-application",
  "fields": { ... }
}
```

The Worker should:
1. Validate required fields
2. Rate-limit by IP (prevent spam)
3. Forward to Attio CRM API
4. (Optional) Send confirmation email via Brevo transactional API
5. Return success/error JSON

### Shared Astro Form Component

Create a reusable `<ContactForm>` Preact component that:
- Accepts field configuration as props
- Handles validation client-side
- Shows loading/success/error states
- POSTs to the Cloudflare Worker

This covers demo request, whitepaper gate, and startup application forms with
different field configs.

---

## Open Questions / Further Investigation Needed

1. **Where do Webflow form submissions currently go?** Need to verify whether
   they go to Webflow's built-in form handler, or if there's a Zapier/webhook
   integration forwarding to Attio. Check Webflow project settings > Forms tab.

2. **Cookie consent tool identification.** Need to identify the exact tool used
   for cookie consent so we can replicate the same categories and behavior.

3. **zcal.co vs Cal.com.** Two different scheduling tools are referenced. Is
   zcal.co still in use or is it a legacy link? The whitepaper page references
   `zcal.co/i/wf5_QqYV` while the main booking pages use `app.cal.com`. Need to
   consolidate.

4. **Two Brevo form IDs.** The homepage/newsletter page uses form ID
   `65fd9132331e6d39b81aef11` while the LLMOps Database page uses
   `67d01f2bed4adbf1ecf4e6cc`. Are these different mailing lists? Need to check
   Brevo account.

5. **Blog post newsletter forms.** Individual blog posts likely also have a
   newsletter CTA (either the same Brevo form or a Webflow-native form that
   shows success/error messages). Could not confirm on individual blog posts due
   to URL 404s. The blog *listing* page has one.

6. **Tracking scripts.** Multiple analytics/tracking services (Segment, Apollo,
   Reb2b, Reo.dev, Ortto, GA4) are loaded site-wide. These are not forms per se,
   but they need to be replicated in the Astro site. Some may fire on form
   submissions. Need to audit which tracking events are tied to form conversions.

7. **LLMOps Database submission.** The LLMOps Database page references a
   "Submit your use case" link that goes to a Google Form. Need to get that
   Google Form URL and determine if it should be kept as-is or replaced.

8. **Careers job applications.** Job listings link to Notion pages
   (`zenml.notion.site`). No forms on the careers page itself -- applications
   happen externally. This is a no-migration-needed situation for forms, but the
   Notion links need to be preserved.

9. **Draft pages with forms.** Several draft pages exist (e.g., `/pricing-2025`,
   `/llmops-waitlist`, `/ai-accelerator-program`). The LLMOps Waitlist page
   likely has a form. Need to check if any draft pages will be published before
   migration.
