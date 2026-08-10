import { useEffect, useRef } from "react";

import { BrowserFrame, DesktopSiteMock, MobileSiteMock } from "@/components/site/SiteMock";

/**
 * Layered website composition with a cursor-responsive perspective tilt.
 * Motion is disabled for prefers-reduced-motion and on touch/small screens.
 */
export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    let target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      target = {
        x: (e.clientX - (rect.left + rect.width / 2)) / rect.width,
        y: (e.clientY - (rect.top + rect.height / 2)) / rect.height,
      };
    };
    const onLeave = () => {
      target = { x: 0, y: 0 };
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      stage.style.transform = `rotateX(${(-current.y * 7).toFixed(3)}deg) rotateY(${(current.x * 9).toFixed(3)}deg) translate3d(${(current.x * 10).toFixed(2)}px, ${(current.y * 8).toFixed(2)}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="relative select-none [perspective:1500px]">
      <div className="absolute -inset-10 -z-10 rounded-[48px] bg-[radial-gradient(58%_58%_at_62%_32%,var(--pale),transparent_72%)]" />

      <div ref={stageRef} className="relative will-change-transform [transform-style:preserve-3d]">
        <BrowserFrame className="[transform:translateZ(40px)]" label="yourndisorganisation.com.au">
          <DesktopSiteMock />
        </BrowserFrame>

        <MobileSiteMock className="absolute -bottom-12 -left-5 w-[132px] [transform:translateZ(100px)] sm:-left-10 sm:w-[156px]" />

        <div className="absolute -top-6 right-2 rounded-[14px] border border-border bg-card px-4 py-3 shadow-soft [transform:translateZ(130px)] sm:right-6">
          <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-vital uppercase">
            Clarity
          </p>
          <p className="mt-1 text-xs font-medium text-charcoal">Easier to understand</p>
        </div>

        <div className="absolute right-4 -bottom-8 hidden rounded-[14px] border border-border bg-card px-4 py-3 shadow-soft [transform:translateZ(115px)] sm:block">
          <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-vital uppercase">
            Trust
          </p>
          <p className="mt-1 text-xs font-medium text-charcoal">Easier to act on</p>
        </div>
      </div>
    </div>
  );
}
