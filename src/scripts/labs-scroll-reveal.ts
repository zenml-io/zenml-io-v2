/**
 * The house scroll-reveal observer, shared by every Labs-shell route that
 * carries `.scroll-reveal-section` blocks (the blog post layout, the blog
 * index, and the database routes). One copy of the behaviour; the 20-line
 * `.reveal-child` `<style>` block stays per layout/component, because Astro
 * scopes component styles and a moved markup block has to carry its own.
 *
 * One-shot IntersectionObserver per section: any visible pixel reveals, so a
 * tall section never waits for a fraction of itself to scroll in. The hidden
 * start state applies only once the script has armed the section
 * (`reveal-armed`), so a server-rendered page with no JS — or a script that
 * failed — is fully visible. Reduced motion returns before arming anything.
 */

export function initScrollReveal(): void {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document
    .querySelectorAll<HTMLElement>(".scroll-reveal-section")
    .forEach((section) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            section.classList.add("in-view");
            observer.disconnect();
          }
        },
        // Any visible pixel reveals: a tall section must never wait for a
        // fraction of itself to scroll in.
        { threshold: 0, rootMargin: "0px 0px -10% 0px" },
      );
      // Arm only once the observer exists, so a script failure leaves the
      // server-rendered page visible.
      section.classList.add("reveal-armed");
      observer.observe(section);
    });
}
