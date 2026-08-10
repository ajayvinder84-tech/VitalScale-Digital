import { useEffect, type RefObject } from "react";

/** Shared motion helpers. All GSAP is loaded lazily, after hydration. */

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export function isSmallScreen() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(max-width: 1023px)").matches;
}

async function loadGsap() {
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

/**
 * Alternating directional stagger reveal, triggered once per section.
 * Falls back to a static, fully visible state when motion is reduced.
 */
export function useAlternatingReveal(
  ref: RefObject<HTMLElement | null>,
  options?: { selector?: string; distance?: number },
) {
  const selector = options?.selector ?? "[data-reveal-item]";
  const distance = options?.distance ?? 34;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (items.length === 0) return;

    const show = () => items.forEach((item) => item.classList.remove("opacity-0"));

    if (prefersReducedMotion()) {
      show();
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void loadGsap()
      .then(({ gsap }) => {
        if (cancelled) return;
        const small = isSmallScreen();
        show();
        const tween = gsap.fromTo(
          items,
          {
            opacity: 0,
            x: small ? 0 : (i: number) => (i % 2 === 0 ? -distance : distance),
            y: small ? 18 : 10,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
        cleanup = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      })
      .catch(() => {
        // Motion is an enhancement only — never let a failed load hide content.
        show();
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [ref, selector, distance]);
}

/**
 * Gentle scroll-scrubbed vertical drift for a decorative visual.
 * Never applied to copy, buttons or navigation.
 */
export function useScrollDrift(
  ref: RefObject<HTMLElement | null>,
  options?: { distance?: number; rotate?: number },
) {
  const distance = options?.distance ?? 28;
  const rotate = options?.rotate ?? 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || isSmallScreen()) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const tween = gsap.fromTo(
        el,
        { y: distance / 2, rotate: rotate / 2 },
        {
          y: -distance / 2,
          rotate: -rotate / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [ref, distance, rotate]);
}

/**
 * Masked line reveal (GSAP SplitText). Lines slide up from behind their own
 * mask once, on scroll or immediately. Reduced motion = fully static text.
 */
export function useLineReveal(
  ref: RefObject<HTMLElement | null>,
  options?: { onScroll?: boolean; delay?: number; stagger?: number },
) {
  const onScroll = options?.onScroll ?? true;
  const delay = options?.delay ?? 0;
  const stagger = options?.stagger ?? 0.09;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const { gsap, ScrollTrigger } = await loadGsap();
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(SplitText);
      if (typeof document !== "undefined" && document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (cancelled) return;

      const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "line" });
      const tween = gsap.from(split.lines, {
        yPercent: 108,
        duration: 0.7,
        ease: "power3.out",
        stagger,
        delay,
        ...(onScroll ? { scrollTrigger: { trigger: el, start: "top 88%", once: true } } : {}),
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
        ScrollTrigger.refresh();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [ref, onScroll, delay, stagger]);
}

/**
 * "Before -> after" transformation beat: the before state settles back while the
 * after state rises and lifts. Runs once. Reduced motion = static.
 */
export function useTransformReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const before = el.querySelector<HTMLElement>("[data-transform-before]");
    const arrow = el.querySelector<HTMLElement>("[data-transform-arrow]");
    const after = el.querySelector<HTMLElement>("[data-transform-after]");
    if (!before || !after) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const small = isSmallScreen();
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.6 },
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });
      tl.from(before, { opacity: 0, y: 20 })
        .from(before, { scale: small ? 1 : 1.015, duration: 0.5 }, "<")
        .from(arrow ?? {}, { opacity: 0, x: -10, duration: 0.4 }, "-=0.25")
        .from(after, { opacity: 0, y: small ? 22 : 34, duration: 0.7 }, "-=0.2");

      cleanup = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [ref]);
}

/**
 * Scroll-led scene progression. Marks one step "active" at a time as the user
 * scrolls through the scene, without pinning or scroll-jacking. Reduced motion
 * (or no JS) leaves every step in its default, fully readable state.
 */
export function useSceneSteps(
  ref: RefObject<HTMLElement | null>,
  count: number,
  onChange: (index: number) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || count < 2) return;
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void loadGsap().then(({ ScrollTrigger }) => {
      if (cancelled) return;
      const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-scene-step]"));
      const triggers = steps.map((step, index) =>
        ScrollTrigger.create({
          trigger: step,
          start: "top 65%",
          end: "bottom 35%",
          onToggle: (self) => {
            if (self.isActive) onChange(index);
          },
        }),
      );
      cleanup = () => triggers.forEach((trigger) => trigger.kill());
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [ref, count, onChange]);
}
