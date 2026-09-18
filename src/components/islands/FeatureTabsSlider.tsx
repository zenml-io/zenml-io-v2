/**
 * FeatureTabsSlider — Preact island for the "ZenML Advantage" auto-cycling tabs.
 *
 * Matches Webflow's "tabs-slider" behavior:
 * - Vertical left menu (40%) with progress bar + expanding description
 * - Right image panel (60%) with gradient background
 * - Auto-cycles through tabs (default 9s) with WAAPI progress animation
 * - Click on a tab resets the timer and progress animation
 * - Respects prefers-reduced-motion
 */
import type { ComponentChildren } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

export interface FeatureTab {
  title: string;
  description: string;
  /** Only read on the no-children path (see `children` below) — a tab whose
   * pane is a slotted figure carries no raster image at all. */
  image?: string;
  imageAlt?: string;
}

export interface FeatureTabsSliderProps {
  tabs: FeatureTab[];
  defaultIndex?: number;
  autoDurationMs?: number;
  /**
   * Server-rendered panes (one `[data-figure-index]` element per tab, in
   * tab order). When present the island shows them by index instead of
   * rendering `<img>` panes, so figures can be inline SVG drawn by the page.
   */
  children?: ComponentChildren;
}

export default function FeatureTabsSlider({
  tabs,
  defaultIndex = 3,
  autoDurationMs = 9000,
  children,
}: FeatureTabsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const timeoutRef = useRef<number | null>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useRef(false);
  const hasFigurePanes = children != null;

  // Slotted panes are static HTML the island never re-renders, so the active
  // one is toggled in place. `data-highlight-active` restarts the figure's
  // play-once animation each time its tab becomes current.
  useEffect(() => {
    if (!hasFigurePanes || !contentRef.current) return;
    contentRef.current
      .querySelectorAll<HTMLElement>("[data-figure-index]")
      .forEach((pane) => {
        const active = Number(pane.dataset.figureIndex) === activeIndex;
        pane.classList.toggle("w--tab-active", active);
        pane.toggleAttribute("data-highlight-active", active);
      });
  }, [activeIndex, hasFigurePanes]);

  // Check reduced-motion preference once on mount
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // Clear timeout helper
  const clearAutoplay = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Start autoplay + progress animation for the given index
  const startCycle = useCallback(
    (index: number) => {
      clearAutoplay();

      // Reset all progress bars
      barRefs.current.forEach((bar) => {
        if (!bar) return;
        bar.getAnimations().forEach((a) => {
          a.cancel();
        });
        bar.style.width = "0%";
      });

      // Animate active bar (skip if reduced motion)
      const activeBar = barRefs.current[index];
      if (activeBar && !prefersReducedMotion.current) {
        activeBar.animate([{ width: "0%" }, { width: "100%" }], {
          duration: autoDurationMs,
          fill: "forwards",
        });
      }

      // Schedule next tab (skip if reduced motion)
      if (!prefersReducedMotion.current) {
        timeoutRef.current = window.setTimeout(() => {
          const next = (index + 1) % tabs.length;
          setActiveIndex(next);
        }, autoDurationMs);
      }
    },
    [autoDurationMs, clearAutoplay, tabs.length],
  );

  // Restart cycle whenever activeIndex changes
  useEffect(() => {
    startCycle(activeIndex);
    return clearAutoplay;
  }, [activeIndex, startCycle, clearAutoplay]);

  // Click handler — switch tab and restart cycle
  const selectTab = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div class="tab-slider">
      {/* Left: vertical tab menu */}
      <div
        class="tab-slider-menu"
        role="tablist"
        aria-label="The ZenML Advantage"
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-controls={`adv-panel-${i}`}
            id={`adv-tab-${i}`}
            class={`tab-slider-tab${i === activeIndex ? " w--current" : ""}`}
            onClick={() => selectTab(i)}
          >
            <div class="tab-slider-title">{tab.title}</div>
            <div class="tab-slider-nav-desc">
              <div>{tab.description}</div>
            </div>
            <div
              class="tab-slider-progress"
              ref={(el) => {
                barRefs.current[i] = el;
              }}
            />
          </button>
        ))}
      </div>

      {/* Right: figure or image panel */}
      <div class="tab-slider-content" ref={contentRef}>
        {hasFigurePanes
          ? children
          : tabs.map((tab, i) => (
              <div
                key={i}
                role="tabpanel"
                id={`adv-panel-${i}`}
                aria-labelledby={`adv-tab-${i}`}
                class={`tab-slider-pane${i === activeIndex ? " w--tab-active" : ""}`}
              >
                <img
                  src={tab.image}
                  alt={tab.imageAlt}
                  class="tab-slider-image"
                  width={720}
                  height={460}
                  loading={i === defaultIndex ? "eager" : "lazy"}
                />
              </div>
            ))}
      </div>
    </div>
  );
}
