/**
 * Scroll-linked progress for Labs sections, the scrubbed half of the motion
 * system (the one-shot half is `labs-scroll-reveal.ts`). Each
 * `[data-scroll-progress]` root gets a progress `p` from 0 to 1 as it moves
 * through the viewport, written as `--p` onto the root (when it carries
 * `data-progress`) and onto every `[data-progress]` element inside it. `--p`
 * is a registered, non-inherited property (global.css), so a write restyles
 * only the elements that read it.
 *
 * Position and range are measured once, and again whenever the page
 * resizes, so a frame does no layout reads. The range comes from three
 * custom properties on the root, so a breakpoint can change them:
 *   --scroll-start  viewport fraction where the root's top sits at p = 0
 *   --scroll-end    viewport fraction where the root's edge sits at p = 1
 *   --scroll-edge   which edge `--scroll-end` measures: 0 top, 1 bottom
 *
 * A root with `data-scroll-steps="n"` also gets a step, the last stop the
 * progress has reached; each `[data-stop]` inside (with `data-i`) is set to
 * `data-state` done, active, or future. The server renders the finished
 * state, and reduced motion returns before arming, so nothing depends on
 * this script to be visible.
 *
 * A root with `data-scroll-play="ms"` is not scrubbed: once its top crosses
 * `--scroll-start`, `p` plays from 0 to 1 over that many milliseconds, once,
 * so the pace no longer depends on how fast or how far the reader scrolls.
 */

interface Root {
  el: HTMLElement;
  targets: HTMLElement[];
  stops: HTMLElement[];
  steps: number;
  start: number;
  end: number;
  edge: number;
  /** Layout position, ignoring transforms (a reveal's rise must not count). */
  top: number;
  height: number;
  p: number;
  step: number;
  /** Play duration in ms (`data-scroll-play`); 0 scrubs with the scroll. */
  play: number;
  played: boolean;
}

const readNumber = (
  style: CSSStyleDeclaration,
  name: string,
  fallback: number,
) => {
  const value = parseFloat(style.getPropertyValue(name));
  return Number.isFinite(value) ? value : fallback;
};

function measure(root: Root): void {
  const style = getComputedStyle(root.el);
  root.start = readNumber(style, "--scroll-start", 0.9);
  root.end = readNumber(style, "--scroll-end", 0.5);
  root.edge = readNumber(style, "--scroll-edge", 0);
  let top = 0;
  for (
    let node: HTMLElement | null = root.el;
    node;
    node = node.offsetParent as HTMLElement | null
  ) {
    top += node.offsetTop;
  }
  root.top = top;
  root.height = root.el.offsetHeight;
}

function progressOf(root: Root, viewport: number): number {
  const top = root.top - window.scrollY;
  const startY = viewport * root.start;
  const travel = startY - viewport * root.end + root.height * root.edge;
  if (travel <= 0) return 1;
  return Math.min(1, Math.max(0, (startY - top) / travel));
}

function write(root: Root, p: number): void {
  if (p !== root.p) {
    root.p = p;
    const value = p.toFixed(4);
    for (const target of root.targets) target.style.setProperty("--p", value);
  }
  if (!root.steps) return;
  const step = Math.min(
    root.steps - 1,
    Math.floor(p * (root.steps - 1) + 1e-3),
  );
  if (step === root.step) return;
  root.step = step;
  for (const stop of root.stops) {
    const i = Number(stop.dataset.i);
    stop.dataset.state = i < step ? "done" : i === step ? "active" : "future";
  }
}

export function initScrollProgress(): void {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const roots: Root[] = [
    ...document.querySelectorAll<HTMLElement>("[data-scroll-progress]"),
  ].map((el) => ({
    el,
    targets: [
      ...(el.hasAttribute("data-progress") ? [el] : []),
      // A nested root writes its own subtree.
      ...[...el.querySelectorAll<HTMLElement>("[data-progress]")].filter(
        (target) =>
          target.parentElement?.closest("[data-scroll-progress]") === el &&
          !target.hasAttribute("data-scroll-progress"),
      ),
    ],
    stops: [...el.querySelectorAll<HTMLElement>("[data-stop]")],
    steps: Number(el.dataset.scrollSteps) || 0,
    start: 0.9,
    end: 0.5,
    edge: 0,
    top: 0,
    height: 0,
    p: -1,
    step: -1,
    play: Number(el.dataset.scrollPlay) || 0,
    played: false,
  }));
  if (!roots.length) return;

  const visible = new Set<Root>();
  let frame = 0;
  const startPlay = (root: Root) => {
    root.played = true;
    const begin = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - begin) / root.play);
      write(root, t);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  // Scrubbed roots follow the scroll; a play root starts once it is reached.
  const advance = (root: Root, viewport: number) => {
    if (!root.play) write(root, progressOf(root, viewport));
    else if (!root.played && progressOf(root, viewport) > 0) startPlay(root);
  };
  const update = () => {
    frame = 0;
    const viewport = window.innerHeight;
    for (const root of visible) advance(root, viewport);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const root = roots.find((r) => r.el === entry.target);
      if (!root) continue;
      // Settle a root as it leaves, so a fast scroll never strands it mid-way.
      advance(root, window.innerHeight);
      if (entry.isIntersecting) visible.add(root);
      else visible.delete(root);
    }
  });

  const remeasure = () => {
    for (const root of roots) measure(root);
    for (const root of roots) {
      if (!root.play) write(root, progressOf(root, window.innerHeight));
      else if (!root.played) write(root, 0);
    }
  };
  remeasure();
  for (const root of roots) observer.observe(root.el);
  window.addEventListener("scroll", schedule, { passive: true });
  // Late images and fonts move everything below them; a page-size change
  // (window resize included) remeasures.
  new ResizeObserver(remeasure).observe(document.documentElement);
}
