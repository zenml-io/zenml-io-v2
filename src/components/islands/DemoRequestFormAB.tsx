/**
 * DemoRequestFormAB — Preact island for /book-your-demo with A/B variant split.
 *
 * Webflow parity: 50/50 split stored in sessionStorage.
 * - Variant A: full form (all fields visible at once)
 * - Variant B: two-step flow (email first, then remaining fields)
 *
 * Plausible events (consent-safe — only fires if window.plausible exists):
 * - "Demo Form Viewed" { variant: "A" | "B" } — on mount
 * - "Demo Email Captured" { variant: "B", email_domain } — variant B step 1 advance
 */
import { useState, useCallback, useEffect, useRef } from "preact/hooks";
import type { PlaceholderField } from "../../lib/formTypes";
import type { CtaLink } from "../../lib/marketingPageTypes";
import { validateForm } from "../../lib/formValidation";

type Variant = "A" | "B";
type FormState = "idle" | "submitting" | "success" | "error";

interface Props {
  endpoint: string;
  fields: PlaceholderField[];
  submitLabel: string;
  loadingLabel: string;
  successMessage: string;
  successCta?: CtaLink;
  turnstileSiteKey?: string;
}

/** Pick or restore variant from sessionStorage (50/50 split).
 *  Wrapped in try-catch: Safari private browsing and strict enterprise
 *  environments can throw on sessionStorage access. */
function getVariant(): Variant {
  try {
    const stored = sessionStorage.getItem("demo_form_variant");
    if (stored === "A" || stored === "B") return stored;
    const v: Variant = Math.random() < 0.5 ? "A" : "B";
    sessionStorage.setItem("demo_form_variant", v);
    return v;
  } catch {
    return Math.random() < 0.5 ? "A" : "B";
  }
}

export default function DemoRequestFormAB({
  endpoint,
  fields,
  submitLabel,
  loadingLabel,
  successMessage,
  successCta,
  turnstileSiteKey,
}: Props) {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [capturedEmail, setCapturedEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  // Resolve variant + fire "Demo Form Viewed"
  useEffect(() => {
    const v = getVariant();
    setVariant(v);
    // Variant A shows all fields at once — start at "step 2" (single step)
    if (v === "A") setStep(2);
    // Fire Plausible event
    const w = window as unknown as { plausible?: (name: string, opts?: { props?: Record<string, string> }) => void };
    if (w.plausible) w.plausible("Demo Form Viewed", { props: { variant: v } });
  }, []);

  // Load the Turnstile script once (stable effect — runs only on mount)
  useEffect(() => {
    if (!turnstileSiteKey) return;
    const SCRIPT_ID = "cf-turnstile-script";
    if (document.getElementById(SCRIPT_ID)) return;
    const scriptUrl = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad";
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = scriptUrl;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, [turnstileSiteKey]);

  // Render the Turnstile widget once the container div is in the DOM.
  // Re-runs when `step` changes (Variant B: step 1→2 makes the div appear).
  useEffect(() => {
    if (!turnstileSiteKey) return;
    if (!turnstileRef.current || turnstileWidgetId.current != null) return;

    function renderWidget() {
      if (!turnstileRef.current || turnstileWidgetId.current != null) return;
      const w = window as unknown as { turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string } };
      if (!w.turnstile) return;
      turnstileWidgetId.current = w.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        theme: "light",
        size: "flexible",
      });
    }

    // If the Turnstile API is already loaded, render immediately
    const w = window as unknown as { turnstile?: unknown };
    if (w.turnstile) {
      renderWidget();
    } else {
      // Register/replace the global callback so the script load triggers rendering
      (window as unknown as Record<string, unknown>).onTurnstileLoad = renderWidget;
    }
  }, [turnstileSiteKey, step]);

  const resetTurnstile = useCallback(() => {
    if (turnstileWidgetId.current == null) return;
    const w = window as unknown as { turnstile?: { reset: (id: string) => void } };
    w.turnstile?.reset(turnstileWidgetId.current);
  }, []);

  // Variant B step 1: validate email and advance
  const handleStep1Advance = useCallback(() => {
    const emailInput = document.querySelector<HTMLInputElement>('input[name="email"]');
    const email = emailInput?.value?.trim() ?? "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: "Valid work email is required" });
      return;
    }
    setErrors({});
    setCapturedEmail(email);
    // Fire "Demo Email Captured" Plausible event
    const w = window as unknown as { plausible?: (name: string, opts?: { props?: Record<string, string> }) => void };
    if (w.plausible) {
      w.plausible("Demo Email Captured", {
        props: { variant: "B", email_domain: email.split("@")[1] || "" },
      });
    }
    setStep(2);
  }, []);

  // Final form submission (both variants)
  const handleSubmit = useCallback(
    async (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const data: Record<string, string> = {};
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") data[key] = value;
      }
      // Handle unchecked checkboxes
      for (const field of fields) {
        if (field.type === "checkbox" && !(field.name in data)) data[field.name] = "";
      }

      const result = validateForm("demo-request", data);
      for (const field of fields) {
        if (field.type === "checkbox" && field.required && !data[field.name]) {
          result.valid = false;
          result.errors[field.name] = "This field is required";
        }
      }

      if (!result.valid) {
        setErrors(result.errors);
        return;
      }

      setErrors({});
      setServerError("");
      setState("submitting");

      try {
        const res = await fetch(endpoint, { method: "POST", body: formData });
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as {
            error?: string;
            errors?: Record<string, string>;
          };
          if (body.errors && Object.keys(body.errors).length > 0) {
            setErrors(body.errors);
            resetTurnstile();
            setState("idle");
            return;
          }
          setServerError(body.error || "Something went wrong. Please try again.");
          resetTurnstile();
          setState("error");
          return;
        }
        setState("success");
      } catch {
        setServerError("Network error. Please check your connection and try again.");
        resetTurnstile();
        setState("error");
      }
    },
    [endpoint, fields, resetTurnstile],
  );

  // Don't render until variant is resolved (avoids flash)
  if (!variant) return null;

  // Success state
  if (state === "success") {
    return (
      <div class="rounded-md border border-green-200 bg-green-50 p-6 text-center sm:p-8">
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900">{successMessage}</p>
        {successCta && (
          <div class="mt-5">
            <a
              href={successCta.href}
              class="inline-flex items-center gap-2 rounded-lg bg-zenml-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zenml-600 transition-colors"
            >
              {successCta.label}
            </a>
          </div>
        )}
      </div>
    );
  }

  // Separate email field from the rest for variant B two-step flow
  const emailField = fields.find((f) => f.name === "email");
  const otherFields = fields.filter((f) => f.name !== "email");

  return (
    <div class="rounded-md border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      {state === "error" && serverError && (
        <div class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <form method="POST" action={endpoint} class="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Step 1 (variant B only): email capture */}
        {variant === "B" && step === 1 && emailField && (
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">
              {emailField.label}
              {emailField.required && <span class="text-red-500"> *</span>}
            </label>
            <input
              type="email"
              name="email"
              required={emailField.required}
              placeholder={emailField.placeholder}
              class={`w-full rounded-md border px-4 py-2.5 text-sm focus:border-zenml-500 focus:ring-1 focus:ring-zenml-500 outline-none transition-colors ${
                errors.email ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
              }`}
            />
            {errors.email && <p class="mt-1 text-xs text-red-600">{errors.email}</p>}
            <button
              type="button"
              onClick={handleStep1Advance}
              class="mt-4 w-full rounded-lg bg-zenml-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zenml-600"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2 (both variants): remaining fields + submit */}
        {step === 2 && (
          <>
            {/* In variant B step 2, show email as hidden (already captured) + read-only display */}
            {variant === "B" && emailField && (
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">
                  {emailField.label}
                  {emailField.required && <span class="text-red-500"> *</span>}
                </label>
                <input
                  type="email"
                  name="email"
                  value={capturedEmail}
                  required={emailField.required}
                  placeholder={emailField.placeholder}
                  class="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-600 outline-none"
                  readOnly
                />
              </div>
            )}

            {/* Variant A: show email normally in field order */}
            {variant === "A" &&
              fields.map((field) => (
                <FieldRenderer key={field.name} field={field} errors={errors} disabled={state === "submitting"} />
              ))}

            {/* Variant B step 2: remaining non-email fields */}
            {variant === "B" &&
              otherFields.map((field) => (
                <FieldRenderer key={field.name} field={field} errors={errors} disabled={state === "submitting"} />
              ))}

            {turnstileSiteKey && <div ref={turnstileRef} class="flex justify-center" />}

            <button
              type="submit"
              disabled={state === "submitting"}
              class="w-full rounded-lg bg-zenml-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zenml-600 focus:outline-none focus:ring-2 focus:ring-zenml-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === "submitting" ? (
                <span class="inline-flex items-center gap-2">
                  <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {loadingLabel}
                </span>
              ) : (
                submitLabel
              )}
            </button>
          </>
        )}
      </form>

      <noscript>
        <div class="mt-4 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
          JavaScript is required to submit this form.{" "}
          <a href="/book-your-demo" class="text-zenml-500 underline">
            Book a demo directly
          </a>{" "}
          instead.
        </div>
      </noscript>
    </div>
  );
}

/** Reusable field renderer — matches ContactForm styling exactly. */
function FieldRenderer({
  field,
  errors,
  disabled,
}: {
  field: PlaceholderField;
  errors: Record<string, string>;
  disabled: boolean;
}) {
  return (
    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span class="text-red-500"> *</span>}
      </label>
      {field.type === "select" && field.options ? (
        <select
          name={field.name}
          required={field.required}
          class={`w-full rounded-md border px-4 py-2.5 text-sm focus:border-zenml-500 focus:ring-1 focus:ring-zenml-500 outline-none transition-colors ${
            errors[field.name] ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
          }`}
          disabled={disabled}
        >
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : field.type === "checkbox" ? (
        <label class="flex items-start gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name={field.name}
            value="on"
            required={field.required}
            class="mt-0.5 rounded border-gray-300 text-zenml-500 focus:ring-zenml-500"
            disabled={disabled}
          />
          <span dangerouslySetInnerHTML={{ __html: field.placeholder ?? field.label }} />
        </label>
      ) : (
        <input
          type={field.type}
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
          class={`w-full rounded-md border px-4 py-2.5 text-sm focus:border-zenml-500 focus:ring-1 focus:ring-zenml-500 outline-none transition-colors ${
            errors[field.name] ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
          }`}
          disabled={disabled}
        />
      )}
      {errors[field.name] && <p class="mt-1 text-xs text-red-600">{errors[field.name]}</p>}
    </div>
  );
}
