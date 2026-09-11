/**
 * Wires the copy button on every `.code-pane` (see `rehypeCodePane.ts`).
 * The button sits outside the scroll region and always copies the pane's
 * full source, never the visible slice. Idempotent + guarded so importing
 * this from `BlogLayout` on every post is safe even with hot-reload re-runs.
 */

const COPIED_LABEL = "Copied";
const COPIED_TIMEOUT_MS = 1500;

export function initCodeCopy(): void {
  if (typeof document === "undefined") return;
  document.querySelectorAll<HTMLElement>(".code-pane").forEach((pane) => {
    const button = pane.querySelector<HTMLButtonElement>(".code-pane__copy");
    const pre = pane.querySelector<HTMLElement>(".code-pane__scroll pre");
    if (!button || !pre || button.dataset.codeCopyWired === "true") return;
    button.dataset.codeCopyWired = "true";

    const defaultLabel = button.textContent ?? "Copy";
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    button.addEventListener("click", async () => {
      const code = pre.textContent ?? "";
      try {
        await navigator.clipboard.writeText(code);
      } catch {
        return;
      }
      button.textContent = COPIED_LABEL;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        button.textContent = defaultLabel;
      }, COPIED_TIMEOUT_MS);
    });
  });
}
