// Intersection Observer for scroll-triggered reveals on the statically
// rendered Kitaru sections (Features, Faq, Cta). Matches the
// `.reveal` / `.reveal-left` / `.reveal-right` utility classes defined in
// global.css and the `data-shown` contract used by the Preact islands'
// `Reveal` component (src/components/kitaru/islands/Reveal.tsx) so both
// the static and hydrated sections animate the same way.
//
// `export {}` makes this an isolated module so its top-level `const`s don't
// collide with scroll-reveal.ts's identically named globals under `astro check`.
export {};

const revealElements = document.querySelectorAll<HTMLElement>(
  ".reveal, .reveal-left, .reveal-right",
);

// Skip animations for users who prefer reduced motion
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealElements.forEach((el) => {
    el.setAttribute("data-shown", "true");
  });
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-shown", "true");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  revealElements.forEach((el) => {
    observer.observe(el);
  });
}
