import { useRef, type ElementType, type ReactNode } from "react";

import { useLineReveal } from "@/lib/motion";

/**
 * Masked line reveal for a single block of text (headline or eyebrow).
 * Text renders fully visible by default, so users with prefers-reduced-motion
 * (or without JS) see a completely static, readable heading.
 */
export function LineReveal({
  as = "span",
  children,
  className,
  onScroll = true,
  delay,
  stagger,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  onScroll?: boolean;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useLineReveal(ref, {
    onScroll,
    ...(delay === undefined ? {} : { delay }),
    ...(stagger === undefined ? {} : { stagger }),
  });
  const Tag = as as ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
