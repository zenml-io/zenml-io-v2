/**
 * DemoRequestForm — Preact island for /book-your-demo.
 *
 * Single form flow (no A/B split): collects name, email, company,
 * then on success seamlessly transitions to an inline Cal.com calendar embed.
 * No green checkmark, no "Thank you!" — just a smooth continuation.
 *
 * Plausible events (consent-safe — only fires if window.plausible exists):
 * - "Demo Form Viewed" — on mount
 * - "Cal: Embed Loaded" — when Cal.com widget is ready
 * - "Cal: Embed Failed" — if Cal.com widget fails to load
 * - "Cal: Booking Confirmed" { date, duration } — on successful booking
 */
import { useState, useCallback, useEffect, useRef } from "preact/hooks";
import type { PlaceholderField, CalEmbedConfig } from "../../lib/formTypes";
import { validateForm } from "../../lib/formValidation";

type FormState = "idle" | "submitting" | "success" | "error";

type PlausibleFn = (name: string, opts?: { props?: Record<string, string> }) => void;
const getPlausible = () => (window as unknown as { plausible?: PlausibleFn }).plausible;

interface Props {
  endpoint: string;
  fields: PlaceholderField[];
  submitLabel: string;
  loadingLabel: string;
  calConfig: CalEmbedConfig;
  calOrigin: string;
  calEmbedScript: string;
  turnstileSiteKey?: string;
}

export default function DemoRequestForm({
  endpoint,
  fields,
  submitLabel,
  loadingLabel,
  calConfig,
  calOrigin,
  calEmbedScript,
  turnstileSiteKey,
}: Props) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const submittedDataRef = useRef<{ name: string; email: string } | null>(null);
  // Fire "Demo Form Viewed" on mount
  useEffect(() => {
    getPlausible()?.("Demo Form Viewed");
  }, []);

  // Load the Turnstile script once
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

  // Render the Turnstile widget when the form is visible
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

    const w = window as unknown as { turnstile?: unknown };
    if (w.turnstile) {
      renderWidget();
    } else {
      (window as unknown as Record<string, unknown>).onTurnstileLoad = renderWidget;
    }
  }, [turnstileSiteKey]);

  // Load Cal.com embed when form succeeds
  useEffect(() => {
    if (state !== "success") return;

    // Bootstrap Cal.com's queuing API (same IIFE pattern as CalEmbed.astro).
    // Cal.com's embed uses a command-queue pattern: we define a lightweight
    // Cal() function that queues commands, then the real embed.js replays them.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    if (!win.Cal) {
      const calFn = function (...args: unknown[]) {
        const cal = win.Cal;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const script = document.createElement("script");
          script.src = calEmbedScript;
          script.async = true;
          document.head.appendChild(script);
          cal.loaded = true;
        }
        if (args[0] === "init") {
          const ns = args[1] as string;
          const api = function (...innerArgs: unknown[]) {
            api.q = api.q || [];
            api.q.push(innerArgs);
          };
          api.q = [] as unknown[][];
          if (typeof ns === "string") {
            cal.ns[ns] = cal.ns[ns] || api;
            cal.ns[ns].q = cal.ns[ns].q || [];
            cal.ns[ns].q.push(args);
            cal.q.push(["initNamespace", ns]);
          }
          return;
        }
        cal.q.push(args);
      };
      calFn.loaded = false;
      calFn.ns = {};
      calFn.q = [] as unknown[];
      win.Cal = calFn;
    }

    const { namespace, elementId, calLink, layout } = calConfig;
    const calLayout = layout ?? "month_view";

    win.Cal("init", namespace, { origin: calOrigin });
    const prefill = submittedDataRef.current;
    win.Cal.ns[namespace]("inline", {
      elementOrSelector: `#${elementId}`,
      config: {
        layout: calLayout,
        ...(prefill && { name: prefill.name, email: prefill.email }),
      },
      calLink,
    });
    win.Cal.ns[namespace]("ui", { hideEventTypeDetails: false, layout: calLayout });

    // Plausible tracking callbacks
    win.Cal.ns[namespace]("on", {
      action: "bookingSuccessful",
      callback: (e: unknown) => {
        const detail = (e as { detail?: { data?: { date?: string; duration?: string } } })?.detail?.data;
        getPlausible()?.("Cal: Booking Confirmed", {
          props: { date: detail?.date || "", duration: detail?.duration || "" },
        });
      },
    });
    win.Cal.ns[namespace]("on", {
      action: "linkReady",
      callback: () => { getPlausible()?.("Cal: Embed Loaded"); },
    });
    win.Cal.ns[namespace]("on", {
      action: "linkFailed",
      callback: () => { getPlausible()?.("Cal: Embed Failed"); },
    });
  }, [state, calConfig, calOrigin, calEmbedScript]);

  const resetTurnstile = useCallback(() => {
    if (turnstileWidgetId.current == null) return;
    const w = window as unknown as { turnstile?: { reset: (id: string) => void } };
    w.turnstile?.reset(turnstileWidgetId.current);
  }, []);

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
        submittedDataRef.current = {
          name: data.fullName || "",
          email: data.email || "",
        };
        setState("success");
      } catch {
        setServerError("Network error. Please check your connection and try again.");
        resetTurnstile();
        setState("error");
      }
    },
    [endpoint, fields, resetTurnstile],
  );

  // ── Success state: seamless Cal.com transition ──
  if (state === "success") {
    return (
      <div class="demo-form-calendar-transition" style={{ animation: "demoFormSlideUp 0.5s ease both" }}>
        <div
          id={calConfig.elementId}

          class="min-h-[600px] w-full overflow-auto"
        />
        <p class="mt-4 text-center text-sm text-gray-500">
          Can't see the calendar?{" "}
          <a
            href={`${calOrigin}/${calConfig.calLink}`}
            target="_blank"
            rel="noopener noreferrer"
            class="text-zenml-500 underline"
          >
            Open directly &rarr;
          </a>
        </p>
      </div>
    );
  }

  // ── Form state (idle / submitting / error) ──
  return (
    <div class="rounded-md border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      {state === "error" && serverError && (
        <div class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <form method="POST" action={endpoint} class="space-y-4" onSubmit={handleSubmit} noValidate>
        {fields.map((field) => (
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
