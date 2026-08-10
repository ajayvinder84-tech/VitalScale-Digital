import { useEffect, useRef, type ReactNode } from "react";

import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A very soft sage glow that trails the cursor inside the component bounds.
 * Used once on the page. Disabled for reduced motion and non-fine pointers.
 */
export function Spotlight({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const light = lightRef.current;
    if (!wrap || !light) return;
    if (prefersReducedMotion() || !hasFinePointer()) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;

      const onMove = (e: PointerEvent) => {
        const rect = wrap.getBoundingClientRect();
        gsap.to(light, {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: true,
        });
      };
      const onLeave = () => {
        gsap.to(light, { opacity: 0, duration: 0.6, ease: "power2.out", overwrite: true });
      };

      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
      cleanup = () => {
        wrap.removeEventListener("pointermove", onMove);
        wrap.removeEventListener("pointerleave", onLeave);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <div
        ref={lightRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 left-0 -z-0 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl",
          tone === "dark"
            ? "bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--sage)_22%,transparent),transparent_75%)]"
            : "bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--sage)_28%,transparent),transparent_75%)]",
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
