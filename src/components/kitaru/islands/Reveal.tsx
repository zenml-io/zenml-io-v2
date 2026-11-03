import type { ComponentChildren } from "preact";
import { useReveal } from "../../../hooks/use-reveal";
import { cn } from "../../../lib/utils";

type RevealProps = {
  children: ComponentChildren;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right";
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: RevealProps) {
  const { ref, props } = useReveal<HTMLDivElement>(delay);
  const base =
    variant === "left"
      ? "reveal-left"
      : variant === "right"
        ? "reveal-right"
        : "reveal";

  return (
    <div ref={ref} className={cn(base, className)} {...props}>
      {children}
    </div>
  );
}
