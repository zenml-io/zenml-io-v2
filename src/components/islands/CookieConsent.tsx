/**
 * CookieConsent — Preact island for GDPR-compliant cookie consent.
 *
 * Renders a bottom banner with "Accept all" / "Reject all" / "Manage".
 * Preferences modal allows per-category toggles.
 * Stores consent in localStorage and dynamically injects scripts.
 */
import { useCallback, useEffect, useState } from "preact/hooks";
import {
  CONSENT_CATEGORIES,
  type ConsentCategory,
  type ScriptDefinition,
  TRACKING_SCRIPTS,
} from "../../lib/consentConfig";
import { isProdHostname } from "../../lib/constants";
import {
  LABS_BUTTON_BASE,
  LABS_BUTTON_TONE_CLASSES,
} from "../labs/labsButtonStyles";

/** Primary action (accept all / save preferences) — the LabsButton "dark" tone. */
const PRIMARY_BUTTON = `${LABS_BUTTON_BASE} ${LABS_BUTTON_TONE_CLASSES.dark}`;
/** Secondary action (reject all / manage / cancel) — the LabsButton "ghost" tone. */
const SECONDARY_BUTTON = `${LABS_BUTTON_BASE} ${LABS_BUTTON_TONE_CLASSES.ghost}`;

const STORAGE_KEY = "cookie_consent";

type ConsentState = Record<ConsentCategory, boolean>;
type CookieConsentWindow = Window &
  typeof globalThis & { __cookieConsent?: ConsentState };

const DEFAULT_CONSENT: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  personalization: false,
};

function isValidConsent(x: unknown): x is ConsentState {
  if (!x || typeof x !== "object") return false;
  const obj = x as Record<string, unknown>;
  return (
    typeof obj.essential === "boolean" &&
    typeof obj.analytics === "boolean" &&
    typeof obj.marketing === "boolean" &&
    typeof obj.personalization === "boolean"
  );
}

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isValidConsent(parsed)) {
      // Malformed or legacy value — clear it so the banner re-shows
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function exposeConsent(consent: ConsentState): void {
  (window as CookieConsentWindow).__cookieConsent = consent;
}

function writeConsent(consent: ConsentState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  // Expose globally so other scripts can check consent
  exposeConsent(consent);
}

/** Inject a script tag if it hasn't been injected yet. */
function injectScript(script: ScriptDefinition): void {
  const domId = `cc-${script.id}`;
  if (document.getElementById(domId)) return;

  const el = document.createElement("script");
  el.id = domId;

  if (script.src) {
    el.src = script.src;
  }
  if (script.inline) {
    el.textContent = script.inline;
  }
  if (script.attrs) {
    for (const [k, v] of Object.entries(script.attrs)) {
      // Never let attrs.id override our dedup id
      if (k === "id") continue;
      el.setAttribute(k, v);
    }
  }

  document.head.appendChild(el);
}

/** Inject all scripts for consented categories. */
function applyConsent(consent: ConsentState): void {
  // Only inject on production domain (www.zenml.io or apex zenml.io)
  if (
    typeof window !== "undefined" &&
    !isProdHostname(window.location.hostname)
  ) {
    return;
  }

  for (const script of TRACKING_SCRIPTS) {
    if (consent[script.category]) {
      injectScript(script);
    }
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      setConsent(saved);
      // Expose saved consent globally so other scripts can read it
      exposeConsent(saved);
      applyConsent(saved);
      // Don't show banner — already consented
    } else {
      setVisible(true);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const all: ConsentState = {
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
    };
    setConsent(all);
    writeConsent(all);
    applyConsent(all);
    setVisible(false);
    setShowPrefs(false);
  }, []);

  const rejectAll = useCallback(() => {
    const minimal: ConsentState = { ...DEFAULT_CONSENT };
    setConsent(minimal);
    writeConsent(minimal);
    setVisible(false);
    setShowPrefs(false);
  }, []);

  const savePreferences = useCallback(() => {
    writeConsent(consent);
    applyConsent(consent);
    setVisible(false);
    setShowPrefs(false);
  }, [consent]);

  const toggleCategory = useCallback((cat: ConsentCategory) => {
    setConsent((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }, []);

  if (!visible) return null;

  return (
    // Scoped override (same pattern as /product/kitaru and /styleguide): this
    // island mounts on every page regardless of the host page's data-app, but
    // it must always read as the Labs shell — sage/cream, Rethink Sans body,
    // Borna titles. Each top-level element carries its own data-app="labs"
    // rather than sharing one wrapping <div>: this island's root is a
    // Fragment (matching the original three-sibling shape exactly, since
    // the SSR output is empty and Astro/Preact hydrate against it), so
    // there is no extra DOM nesting for the [data-app="labs"] scope to
    // ride along on.
    <>
      {/* Backdrop for preferences modal */}
      {showPrefs && (
        <div
          data-app="labs"
          class="fixed inset-0 z-[9998] bg-(--color-sage-900)/40"
          onClick={() => setShowPrefs(false)}
          aria-hidden="true"
        />
      )}

      {/* Preferences modal */}
      {showPrefs && (
        <div
          data-app="labs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          class="fixed inset-x-4 bottom-4 top-auto z-[9999] mx-auto max-w-lg rounded-[20px] border border-(--color-border) bg-card p-6 sm:inset-x-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
        >
          <h2
            id="cookie-preferences-title"
            class="font-display text-[length:var(--text-card-title)] leading-[var(--leading-card-title)] text-foreground"
          >
            Cookie preferences
          </h2>
          <p class="mt-1 font-sans text-[length:var(--text-caption)] leading-[var(--leading-caption)] text-muted-foreground">
            Choose which categories of cookies you'd like to allow.
          </p>

          <div class="mt-4 space-y-3">
            {CONSENT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                class="flex items-start justify-between gap-3 rounded-[14px] border border-(--color-border) p-3"
              >
                <div>
                  <span class="font-sans text-[length:var(--text-caption)] font-medium leading-[var(--leading-caption)] text-foreground">
                    {cat.label}
                    {cat.required && (
                      <span class="ml-1 text-xs text-muted-foreground">
                        (always on)
                      </span>
                    )}
                  </span>
                  <p class="mt-0.5 text-xs text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
                <label
                  class={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-out focus-within:ring-2 focus-within:ring-(--color-sage-600) focus-within:ring-offset-2 ${
                    consent[cat.id]
                      ? "bg-(--color-sage-600)"
                      : "bg-(--color-cream-200)"
                  } ${cat.required ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                >
                  <span class="sr-only">{cat.label}</span>
                  <input
                    type="checkbox"
                    checked={consent[cat.id]}
                    disabled={cat.required}
                    onChange={() => toggleCategory(cat.id)}
                    class="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    class={`pointer-events-none inline-block h-5 w-5 rounded-full bg-(--color-cream-50) transition-transform duration-200 ease-out ${
                      consent[cat.id] ? "translate-x-[22px]" : "translate-x-0.5"
                    }`}
                  />
                </label>
              </div>
            ))}
          </div>

          <div class="mt-5 flex gap-3">
            <button
              type="button"
              onClick={savePreferences}
              class={`flex-1 ${PRIMARY_BUTTON}`}
            >
              Save preferences
            </button>
            <button
              type="button"
              onClick={() => setShowPrefs(false)}
              class={SECONDARY_BUTTON}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Bottom banner */}
      {!showPrefs && (
        <div
          data-app="labs"
          class="fixed inset-x-0 bottom-0 z-[9998] border-t border-(--color-border) bg-card px-4 py-4 sm:px-6"
        >
          <div class="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row">
            <p class="flex-1 font-sans text-[length:var(--text-caption)] leading-[var(--leading-caption)] text-muted-foreground">
              We use cookies to improve your experience and analyze site
              traffic. See our{" "}
              <a
                href="/privacy-policy"
                class="text-(--color-sage-800) underline underline-offset-2 transition-colors hover:text-(--color-sage-900)"
              >
                privacy policy
              </a>
              .
            </p>
            <div class="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowPrefs(true)}
                class={SECONDARY_BUTTON}
              >
                Manage
              </button>
              <button
                type="button"
                onClick={rejectAll}
                class={SECONDARY_BUTTON}
              >
                Reject all
              </button>
              <button type="button" onClick={acceptAll} class={PRIMARY_BUTTON}>
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
