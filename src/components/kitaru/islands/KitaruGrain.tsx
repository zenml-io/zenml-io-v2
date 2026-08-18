// KitaruGrain — shared GrainGradient shader backdrop for Kitaru landing
// surfaces (hero, dark sections, hover-revealed cards).
//
// Renders a panel color + two radial-gradient blobs underneath a
// `GrainGradient` shader, per variant palette in
// `src/lib/kitaru-grain-palettes.ts` (ported from the design-prototype
// monorepo's `SIGNUP_SHOWCASE`).
//
// Deferred variants (`variant="card"`, and any variant driven by the
// controlled `active` prop) mount the shader (WebGL) only while revealed,
// unmount it again once the fade-out finishes — releasing the GL context —
// and never mount on touch-only devices. This keeps the number of live
// WebGL contexts far below the browser's ~16-per-page cap even though the
// landing composes many grain cards. Uncontrolled `hero`/`dark` mount
// immediately and stay mounted.
import { GrainGradient } from "@paper-design/shaders-react";
import { Component, type ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import {
  KITARU_GRAIN,
  type KitaruGrainVariant,
} from "../../../lib/kitaru-grain-palettes";

// ShaderMount throws synchronously when canvas.getContext("webgl2") returns
// null (GPU process reset, tab restore, blocklisted GPU, context-cap
// pressure). Catch that here and render nothing — the wrapper div's static
// gradient backdrop remains as the fallback — instead of letting the
// exception blank the surrounding landing section.
class ShaderErrorBoundary extends Component<
  { children: ComponentChildren },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

type KitaruGrainProps = {
  variant: KitaruGrainVariant;
  class?: string;
  className?: string;
  /** Controlled reveal: when set, the grain fades with `active` instead of
   *  the parent's CSS `group-hover`, so state shared across elements can
   *  drive it. */
  active?: boolean;
  /** Override the palette's blend flag. Pass `false` when text renders above
   *  the grain — Safari mis-stacks mix-blend layers over z-indexed siblings,
   *  swallowing the text. */
  blend?: boolean;
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
  active,
  blend,
}: KitaruGrainProps) {
  const cfg = KITARU_GRAIN[variant];
  const effectiveBlend = blend ?? cfg.blend;
  const reducedMotion = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isCard = variant === "card";
  const controlled = typeof active === "boolean";
  const isDeferred = isCard || controlled;
  // Deferred variants mount only while revealed; everything else mounts
  // immediately and stays mounted.
  const [mounted, setMounted] = useState(!isDeferred);
  // Uncontrolled cards track their `.group` parent's hover state here.
  const [hovered, setHovered] = useState(false);
  const unmountTimer = useRef<number | undefined>(undefined);

  const shown = controlled ? active === true : hovered;

  // Uncontrolled card: follow hover/focus on the same `.group` card the CSS
  // reveal (group-hover) uses — closest() also traverses the display:contents
  // <astro-island> wrapper that sits between when mounted as its own island
  // from a static section.
  useEffect(() => {
    if (!isCard || controlled) return;
    if (!window.matchMedia(HOVER_CAPABLE_QUERY).matches) return;

    const parent = wrapperRef.current?.closest(".group");
    if (!parent) return;

    const show = () => setHovered(true);
    const hide = () => setHovered(false);
    parent.addEventListener("mouseenter", show);
    parent.addEventListener("mouseleave", hide);
    parent.addEventListener("focusin", show);
    parent.addEventListener("focusout", hide);

    return () => {
      parent.removeEventListener("mouseenter", show);
      parent.removeEventListener("mouseleave", hide);
      parent.removeEventListener("focusin", show);
      parent.removeEventListener("focusout", hide);
    };
  }, [isCard, controlled]);

  // Deferred mount / delayed unmount. The grace period outlasts the longest
  // fade (1000ms) so the shader keeps drawing until it is invisible, then
  // unmounts to release its WebGL context.
  useEffect(() => {
    if (!isDeferred) return;

    if (shown) {
      // Touch-only devices get the static gradient backdrop only — mouseenter
      // fired by a tap must not mount WebGL on the device class the deferral
      // exists to protect.
      if (!window.matchMedia(HOVER_CAPABLE_QUERY).matches) return;
      window.clearTimeout(unmountTimer.current);
      setMounted(true);
      return;
    }

    window.clearTimeout(unmountTimer.current);
    unmountTimer.current = window.setTimeout(() => setMounted(false), 1200);
    return () => window.clearTimeout(unmountTimer.current);
  }, [isDeferred, shown]);

  const passthroughClass = [classProp, className].filter(Boolean).join(" ");
  const wrapperClass = [
    "pointer-events-none absolute inset-0",
    controlled
      ? `transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? "opacity-100" : "opacity-0"}`
      : isCard
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
        <ShaderErrorBoundary>
          <GrainGradient
            className={
              effectiveBlend
                ? "absolute inset-0 size-full opacity-90 mix-blend-darken"
                : "absolute inset-0 size-full"
            }
            shape="dots"
            colors={cfg.shaderColors}
            // Deferred variants unmount shortly after fading out, so a shader
            // that exists is either visible or mid-fade — no need to zero the
            // speed while hidden any more. reduced-motion still freezes it.
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
        </ShaderErrorBoundary>
      )}
    </div>
  );
}
