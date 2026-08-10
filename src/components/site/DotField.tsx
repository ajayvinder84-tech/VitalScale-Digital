import { useEffect, useRef } from "react";

import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

const COLS = 14;
const ROWS = 8;

/**
 * Sparse, very low-contrast dot field behind the hero. Dots ease away from the
 * cursor by a few pixels — texture, not an attraction. Static on touch devices
 * and for reduced motion.
 */
export function DotField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    if (prefersReducedMotion() || !hasFinePointer()) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      const dots = Array.from(wrap.querySelectorAll<HTMLElement>("span"));

      const onMove = (e: PointerEvent) => {
        const radius = 110;
        for (const dot of dots) {
          const rect = dot.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = cx - e.clientX;
          const dy = cy - e.clientY;
          const dist = Math.hypot(dx, dy);
          if (dist < radius) {
            const force = (radius - dist) / radius;
            gsap.to(dot, {
              x: (dx / (dist || 1)) * force * 7,
              y: (dy / (dist || 1)) * force * 7,
              opacity: 0.55 + force * 0.35,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true,
            });
          } else {
            gsap.to(dot, {
              x: 0,
              y: 0,
              opacity: 0.55,
              duration: 0.8,
              ease: "sine.out",
              overwrite: true,
            });
          }
        }
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      cleanup = () => window.removeEventListener("pointermove", onMove);
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden select-none md:block [mask-image:radial-gradient(70%_65%_at_50%_40%,black,transparent_75%)]"
    >
      <div
        className="grid h-full w-full place-items-center gap-0"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: COLS * ROWS }).map((_, i) => (
          <span
            key={i}
            className="h-[3px] w-[3px] rounded-full bg-sage/45 opacity-55 will-change-transform"
          />
        ))}
      </div>
    </div>
  );
}
