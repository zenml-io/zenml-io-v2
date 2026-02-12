/**
 * ContactForm — Preact island that replaces FormPlaceholder.
 *
 * Renders a real form with client-side validation, loading/success/error
 * states, and POSTs to the Cloudflare Pages Function.
 */
import { useState, useCallback } from "preact/hooks";
import type { PlaceholderField } from "../../lib/formTypes";
import type { CtaLink } from "../../lib/marketingPageTypes";
import { validateForm, type FormType } from "../../lib/formValidation";

interface Props {
  formType: FormType;
  endpoint: string;
  fields: PlaceholderField[];
  submitLabel: string;
  loadingLabel: string;
  successMessage: string;
  successCta?: CtaLink;
  successDownloadUrl?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  formType,
  endpoint,
  fields,
  submitLabel,
  loadingLabel,
  successMessage,
  successCta,
  successDownloadUrl,
}: Props) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const handleSubmit = useCallback(
    async (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      // Build data object for validation
      const data: Record<string, string> = {};
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") data[key] = value;
      }

      // Handle checkbox — FormData only includes checked checkboxes
      for (const field of fields) {
        if (field.type === "checkbox" && !(field.name in data)) {
          data[field.name] = "";
        }
      }

      // Client-side validation
      const result = validateForm(formType, data);
      // Also check required checkboxes (privacy)
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
        const res = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          const msg =
            (body as { error?: string }).error ||
            "Something went wrong. Please try again.";
          setServerError(msg);
          setState("error");
          return;
        }

        setState("success");
      } catch {
        setServerError("Network error. Please check your connection and try again.");
        setState("error");
      }
    },
    [formType, endpoint, fields],
  );

  // Success state
  if (state === "success") {
    return (
      <div class="rounded-xl border border-green-200 bg-green-50 p-6 text-center sm:p-8">
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900">{successMessage}</p>
        {successDownloadUrl && (
          <a
            href={successDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex items-center gap-2 rounded-lg bg-zenml-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zenml-600 transition-colors"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Whitepaper
          </a>
        )}
        {successCta && (
          <a
            href={successCta.href}
            class="mt-4 inline-block rounded-lg bg-zenml-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zenml-600 transition-colors"
          >
            {successCta.label}
          </a>
        )}
      </div>
    );
  }

  return (
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Error banner */}
      {state === "error" && serverError && (
        <div class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <form
        method="POST"
        action={endpoint}
        class="space-y-4"
        onSubmit={handleSubmit}
        noValidate
      >
        {fields.map((field) => (
          <div key={field.name}>
            <label class="mb-1 block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span class="text-red-500"> *</span>}
            </label>

            {field.type === "select" && field.options ? (
              <select
                name={field.name}
                required={field.required}
                class={`w-full rounded-md border px-4 py-2.5 text-sm focus:border-zenml-500 focus:ring-1 focus:ring-zenml-500 outline-none transition-colors ${
                  errors[field.name]
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
                disabled={state === "submitting"}
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
                  disabled={state === "submitting"}
                />
                <span
                  dangerouslySetInnerHTML={{
                    __html: field.placeholder ?? field.label,
                  }}
                />
              </label>
            ) : (
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                class={`w-full rounded-md border px-4 py-2.5 text-sm focus:border-zenml-500 focus:ring-1 focus:ring-zenml-500 outline-none transition-colors ${
                  errors[field.name]
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
                disabled={state === "submitting"}
              />
            )}

            {errors[field.name] && (
              <p class="mt-1 text-xs text-red-600">{errors[field.name]}</p>
            )}
          </div>
        ))}

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
