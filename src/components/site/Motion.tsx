import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useAlternatingReveal, useScrollDrift } from "@/lib/motion";

/**
 * Wraps a grid of items and reveals them once with a restrained alternating
 * directional stagger. Children opt in with `data-reveal-item`.
 */
export function StaggerGroup({
  children,
  className,
  distance = 34,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useAlternatingReveal(ref, { distance });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Decorative visual wrapper with a gentle scroll-scrubbed drift. */
export function Drift({
  children,
  className,
  distance = 28,
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollDrift(ref, { distance, rotate });
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
