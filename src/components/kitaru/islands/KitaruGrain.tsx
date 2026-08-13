// KitaruGrain — shared GrainGradient shader backdrop for Kitaru landing
// surfaces (hero, dark sections, hover-revealed cards).
//
// Renders a panel color + two radial-gradient blobs underneath a
// `GrainGradient` shader, per variant palette in
// `src/lib/kitaru-grain-palettes.ts` (ported from the design-prototype
// monorepo's `SIGNUP_SHOWCASE`).
//
// `variant="card"` defers mounting the shader (WebGL) until the parent
// card is first hovered/focused, and never mounts on touch-only devices —
// this keeps the WebGL context budget bounded on pages with many cards.
// `variant="hero"` and `variant="dark"` mount immediately.
import { GrainGradient } from "@paper-design/shaders-react";
import { useEffect, useRef, useState } from "preact/hooks";
import {
  KITARU_GRAIN,
  type KitaruGrainVariant,
} from "../../../lib/kitaru-grain-palettes";

type KitaruGrainProps = {
  variant: KitaruGrainVariant;
  class?: string;
  className?: string;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const HOVER_CAPABLE_QUERY = "(hover: hover)";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function KitaruGrain({
  variant,
  class: classProp,
  className,
}: KitaruGrainProps) {
  const cfg = KITARU_GRAIN[variant];
  const reducedMotion = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isCard = variant === "card";
  const [mounted, setMounted] = useState(!isCard);

  useEffect(() => {
    if (!isCard || mounted) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia(HOVER_CAPABLE_QUERY).matches) return;

    const parent = wrapperRef.current?.parentElement;
    if (!parent) return;

    const mount = () => setMounted(true);
    parent.addEventListener("mouseenter", mount, { once: true });
    parent.addEventListener("focusin", mount, { once: true });

    return () => {
      parent.removeEventListener("mouseenter", mount);
      parent.removeEventListener("focusin", mount);
    };
  }, [isCard, mounted]);

  const passthroughClass = [classProp, className].filter(Boolean).join(" ");
  const wrapperClass = [
    "pointer-events-none absolute inset-0",
    isCard
      ? "opacity-0 transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
      : "",
    passthroughClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      class={wrapperClass}
      style={{
        backgroundColor: cfg.panel,
        backgroundImage: `radial-gradient(circle farthest-corner at 20% 15%, ${cfg.blobA} 0%, transparent 60%), radial-gradient(circle farthest-corner at 85% 85%, ${cfg.blobB} 0%, transparent 60%)`,
      }}
    >
      {mounted && (
        <GrainGradient
          className={
            cfg.blend
              ? "absolute inset-0 size-full opacity-90 mix-blend-darken"
              : "absolute inset-0 size-full"
          }
          shape="dots"
          colors={cfg.shaderColors}
          speed={reducedMotion ? 0 : cfg.speed}
          scale={cfg.scale}
          rotation={cfg.rotation}
          noise={cfg.noise}
          offsetX={-0.55}
          offsetY={-0.85}
          softness={1}
          intensity={1}
          colorBack="#00000000"
        />
      )}
    </div>
  );
}
