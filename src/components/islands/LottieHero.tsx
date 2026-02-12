/**
 * LottieHero — Preact island that loads and plays the hero Lottie animation.
 *
 * Uses lottie-web's SVG renderer. Plays once (no loop) to match the original
 * Webflow behavior. The animation is 960×330 at 60fps for 6.4 seconds.
 */
import lottie, { type AnimationItem } from "lottie-web";
import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
  src: string;
}

export default function LottieHero({ src }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const anim: AnimationItem = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: src,
    });

    anim.addEventListener("DOMLoaded", () => setLoaded(true));

    return () => anim.destroy();
  }, [src]);

  return (
    <div
      ref={containerRef}
      class="lottie-hero-container"
      style={{
        width: "100%",
        aspectRatio: "960 / 330",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.3s ease-in",
      }}
    />
  );
}
