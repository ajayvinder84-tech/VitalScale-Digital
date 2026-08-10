import { useEffect, useRef } from "react";
import { Globe, MessageSquare, Search, Star, Monitor } from "lucide-react";

import { prefersReducedMotion } from "@/lib/motion";

const layers = [
  { icon: Monitor, label: "Website", note: "The centre of your digital presence" },
  { icon: Search, label: "Google profile", note: "Where most people find you first" },
  { icon: Globe, label: "Social profiles", note: "Checked before contact" },
  { icon: Star, label: "Reviews", note: "Read alongside your website" },
  { icon: MessageSquare, label: "Enquiry & referral", note: "The next step made simple" },
];

/**
 * Trust touchpoints as a restrained stack that fans apart once the section
 * enters view — editorial, not a deck of cards.
 */
export function TrustStack() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    const cards = Array.from(wrap.querySelectorAll<HTMLElement>("[data-stack-card]"));
    if (cards.length === 0) return;

    if (prefersReducedMotion()) {
      cards.forEach((card, i) => {
        card.style.transform = `translateY(${i * 76}px)`;
        card.style.opacity = "1";
      });
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      const tween = gsap.fromTo(
        cards,
        {
          y: (i: number) => i * 12,
          x: (i: number) => i * 6,
          rotate: (i: number) => i * 1.2,
          opacity: 0.35,
        },
        {
          y: (i: number) => i * 76,
          x: 0,
          rotate: (i: number) => (i - 2) * 0.9,
          opacity: 1,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: wrap, start: "top 82%", once: true },
        },
      );

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="relative select-none">
      <div className="absolute inset-x-0 -inset-y-8 -z-10 rounded-[40px] sm:-inset-8 bg-[radial-gradient(60%_60%_at_50%_30%,var(--pale),transparent_74%)]" />
      <div className="relative h-[24rem] sm:h-[26rem]">
        {layers.map(({ icon: Icon, label, note }, i) => (
          <div
            key={label}
            data-stack-card
            className="absolute inset-x-0 top-0 flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 opacity-0 shadow-soft transition-shadow duration-300 will-change-transform hover:shadow-lift"
            style={{ zIndex: layers.length - i }}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pale text-deep">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.9375rem] font-semibold text-ink">
                {label}
              </span>
              <span className="block truncate text-[0.8125rem] text-muted-foreground">{note}</span>
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[0.8125rem] text-muted-foreground">
        Every touchpoint pointing to the same clear message.
      </p>
    </div>
  );
}
