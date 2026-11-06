import { useEffect, useRef, useState } from "preact/hooks";

/**
 * Reveals an element once it scrolls into view.
 * Returns a ref and the props to spread on the element.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return {
    ref,
    props: {
      "data-shown": shown ? "true" : "false",
      style: { "--reveal-delay": `${delay}ms` } as Record<string, string>,
    },
  };
}
