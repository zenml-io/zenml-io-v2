/**
 * Form type constants for Kitaru-origin form submissions.
 *
 * Ported as-is from `kitaru/site/src/lib/formTypes.ts` per MERGE_PLAN D5.
 * Kept separate from `formValidation.ts`'s `FormType` (which handles
 * ZenML-side forms like whitepaper/startup-academic via `/api/forms/:type`).
 */

export const FORM_TYPES = {
  DEMO_REQUEST: "demo-request",
  WAITLIST: "waitlist",
  NEWSLETTER: "newsletter",
} as const;

export type KitaruFormType = (typeof FORM_TYPES)[keyof typeof FORM_TYPES];
