/**
 * CookieConsent — Preact island for GDPR-compliant cookie consent.
 *
 * Renders a bottom banner with "Accept all" / "Reject all" / "Manage".
 * Preferences modal allows per-category toggles.
 * Stores consent in localStorage and dynamically injects scripts.
 */
import { useState, useEffect, useCallback } from "preact/hooks";
import {
  CONSENT_CATEGORIES,
  TRACKING_SCRIPTS,
  type ConsentCategory,
  type ScriptDefinition,
} from "../../lib/consentConfig";
import { isProdHostname } from "../../lib/constants";

const STORAGE_KEY = "cookie_consent";

type ConsentState = Record<ConsentCategory, boolean>;

const DEFAULT_CONSENT: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  personalization: false,
};

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function writeConsent(consent: ConsentState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  // Expose globally so other scripts can check consent
  (window as any).__cookieConsent = consent;
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
  if (typeof window !== "undefined" && !isProdHostname(window.location.hostname)) {
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
      (window as any).__cookieConsent = saved;
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

  const toggleCategory = useCallback(
    (cat: ConsentCategory) => {
      setConsent((prev) => ({ ...prev, [cat]: !prev[cat] }));
    },
    [],
  );

  if (!visible) return null;

  return (
    <>
      {/* Backdrop for preferences modal */}
      {showPrefs && (
        <div
          class="fixed inset-0 z-[9998] bg-black/40"
          onClick={() => setShowPrefs(false)}
        />
      )}

      {/* Preferences modal */}
      {showPrefs && (
        <div class="fixed inset-x-4 bottom-4 top-auto z-[9999] mx-auto max-w-lg rounded-md border border-gray-200 bg-white p-6 shadow-large sm:inset-x-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
          <h2 class="text-lg font-bold text-gray-900">Cookie Preferences</h2>
          <p class="mt-1 text-sm text-gray-500">
            Choose which categories of cookies you'd like to allow.
          </p>

          <div class="mt-4 space-y-3">
            {CONSENT_CATEGORIES.map((cat) => (
              <label
                key={cat.id}
                class="flex items-start gap-3 rounded-lg border border-gray-200 p-3"
              >
                <input
                  type="checkbox"
                  checked={consent[cat.id]}
                  disabled={cat.required}
                  onChange={() => toggleCategory(cat.id)}
                  class="mt-0.5 rounded border-gray-300 text-zenml-500 focus:ring-zenml-500 disabled:opacity-50"
                />
                <div>
                  <span class="text-sm font-medium text-gray-900">
                    {cat.label}
                    {cat.required && (
                      <span class="ml-1 text-xs text-gray-400">(always on)</span>
                    )}
                  </span>
                  <p class="text-xs text-gray-500">{cat.description}</p>
                </div>
              </label>
            ))}
          </div>

          <div class="mt-5 flex gap-3">
            <button
              onClick={savePreferences}
              class="flex-1 rounded-lg bg-zenml-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zenml-600 transition-colors"
            >
              Save preferences
            </button>
            <button
              onClick={() => setShowPrefs(false)}
              class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Bottom banner */}
      {!showPrefs && (
        <div class="fixed inset-x-0 bottom-0 z-[9998] border-t border-gray-200 bg-white px-4 py-4 shadow-large sm:px-6">
          <div class="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row">
            <p class="flex-1 text-sm text-gray-600">
              We use cookies to improve your experience and analyze site traffic.
              See our{" "}
              <a href="/privacy-policy" class="text-zenml-500 underline">
                privacy policy
              </a>
              .
            </p>
            <div class="flex gap-3">
              <button
                onClick={() => setShowPrefs(true)}
                class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Manage
              </button>
              <button
                onClick={rejectAll}
                class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reject all
              </button>
              <button
                onClick={acceptAll}
                class="rounded-lg bg-zenml-500 px-4 py-2 text-sm font-semibold text-white hover:bg-zenml-600 transition-colors"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
