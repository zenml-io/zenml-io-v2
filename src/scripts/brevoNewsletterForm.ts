/**
 * Wires every `[data-brevo-form]` root's newsletter form to submit via
 * fetch (mode: "no-cors") against the Brevo (Sendinblue) form action and
 * show an inline success/error message instead of navigating away.
 *
 * Progressive enhancement: without this script (or with JS disabled) the
 * form still POSTs directly to Brevo's hosted endpoint via its own
 * method/action and the visitor lands on Brevo's confirmation page.
 *
 * Extracted from BrevoNewsletterForm.astro's former inline script so a
 * second markup (BlogNewsletterCta.astro's pill-shaped form) can share the
 * exact same submit behaviour instead of forking the fetch logic. Idempotent
 * + guarded via `data-brevo-enhanced`, so calling this once per page is safe
 * even with more than one Brevo form instance, and safe to call again on
 * hot-reload.
 *
 * The submit button's loading-state label swap targets a
 * `[data-brevo-label]` child when the root markup provides one (for an
 * icon-only button, where overwriting the whole button's textContent would
 * destroy the icon) and falls back to the button's own textContent
 * otherwise — the original, plain-text-button behaviour.
 */
export function initBrevoNewsletterForms(): void {
  if (typeof document === "undefined") return;

  document
    .querySelectorAll<HTMLElement>("[data-brevo-form]")
    .forEach((root) => {
      const form = root.querySelector("[data-brevo-newsletter]");
      if (!(form instanceof HTMLFormElement)) return;
      if (form.dataset.brevoEnhanced === "true") return;
      form.dataset.brevoEnhanced = "true";

      const loadingLabel = root.dataset.loadingLabel || "Subscribing...";
      const successMsg = root.querySelector("[data-brevo-success]");
      const errorMsg = root.querySelector("[data-brevo-error]");

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = form.querySelector("button[type=submit]");
        const labelTarget =
          (btn instanceof HTMLElement
            ? btn.querySelector<HTMLElement>("[data-brevo-label]")
            : null) ?? (btn instanceof HTMLElement ? btn : null);
        const originalText = labelTarget?.textContent ?? null;

        if (btn instanceof HTMLButtonElement) {
          btn.disabled = true;
        }
        if (labelTarget) {
          labelTarget.textContent = loadingLabel;
        }

        const formData = new FormData(form);

        fetch(form.action, {
          method: "POST",
          body: formData,
          mode: "no-cors",
        })
          .then(() => {
            form.classList.add("hidden");
            successMsg?.classList.remove("hidden");
          })
          .catch((err) => {
            console.error("Brevo submit error:", err);
            if (errorMsg instanceof HTMLElement) {
              errorMsg.textContent = "Subscription failed. Please try again.";
              errorMsg.classList.remove("hidden");
            }
            if (labelTarget) {
              labelTarget.textContent = originalText ?? "";
            }
            if (btn instanceof HTMLButtonElement) {
              btn.disabled = false;
            }
          });
      });
    });
}
