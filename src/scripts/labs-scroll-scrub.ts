/**
 * Opt-in, per page: turns the house reveal (`.reveal-child`, normally a
 * one-shot fade from labs-scroll-reveal.ts) into the scroll-linked
 * `.scroll-scrub` from global.css, so every block fades in as it scrolls up
 * and back out as it scrolls down. Siblings cascade: each later
 * `.reveal-child` under the same parent starts a little lower. Call it
 * instead of initScrollReveal and before initScrollProgress, which then
 * drives `--p`. Components keep the house markup, so pages that don't opt in
 * keep the one-shot reveal. Without JS or with reduced motion nothing is
 * converted and everything is shown.
 */

const STEP = 0.03;
const MAX_INDEX = 6;

export function initScrollScrub(): void {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (const el of document.querySelectorAll<HTMLElement>(".reveal-child")) {
    const siblings = [...(el.parentElement?.children ?? [])].filter((c) =>
      c.classList.contains("reveal-child"),
    );
    const i = Math.min(siblings.indexOf(el), MAX_INDEX);
    el.classList.remove("stagger-1", "stagger-2", "stagger-3", "stagger-4");
    el.classList.add("scroll-scrub");
    el.setAttribute("data-scroll-progress", "");
    el.setAttribute("data-progress", "");
    if (i > 0) {
      el.style.setProperty("--scroll-start", String(0.98 - i * STEP));
      el.style.setProperty("--scroll-end", String(0.84 - i * STEP));
    }
  }
  // Removed last, so the sibling lookups above still see the whole set.
  for (const el of document.querySelectorAll(".scroll-scrub.reveal-child")) {
    el.classList.remove("reveal-child");
  }
}
