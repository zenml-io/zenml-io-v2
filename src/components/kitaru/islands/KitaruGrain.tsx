// KitaruGrain — Kitaru landing's GrainGradient shader backdrop (hero, dark
// sections, hover-revealed cards). A thin wrapper over the generic
// GrainBackdrop island: it only maps `variant` to the Kitaru palette
// (`src/lib/kitaru-grain-palettes.ts`, ported from the design-prototype
// monorepo's `SIGNUP_SHOWCASE`) and turns the card variant into hover reveal.
//
// The reveal gating, WebGL error boundary, SSR guard and reduced-motion
// handling live in GrainBackdrop — see that file. Mount sites and hydration
// directives are unchanged (`pnpm check:islands` guards them).
import {
  KITARU_GRAIN,
  type KitaruGrainVariant,
} from "../../../lib/kitaru-grain-palettes";
import { GrainBackdrop } from "../../islands/GrainBackdrop";

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

export function KitaruGrain({ variant, ...rest }: KitaruGrainProps) {
  return (
    <GrainBackdrop
      config={KITARU_GRAIN[variant]}
      hoverReveal={variant === "card"}
      {...rest}
    />
  );
}
