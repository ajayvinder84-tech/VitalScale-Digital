import { useEffect, useRef, useState, type ReactNode } from "react";

import { LineReveal } from "@/components/site/TextReveal";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("container-page", className)}>{children}</div>;
}

export function Section({
  className,
  tone = "default",
  children,
  id,
  ariaLabel,
}: {
  className?: string;
  tone?: "default" | "surface" | "neutral" | "deep";
  children: ReactNode;
  id?: string;
  ariaLabel?: string;
}) {
  const tones = {
    default: "bg-background",
    surface: "bg-surface",
    neutral: "bg-neutral-surface",
    deep: "bg-deep text-deep-foreground",
  } as const;

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("py-24 md:py-32 lg:py-40", tones[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, onDark }: { children: ReactNode; onDark?: boolean }) {
  return <p className={cn("eyebrow", onDark && "text-sage")}>{children}</p>;
}

/** Editorial section opener: eyebrow + headline + optional intro, typography-led. */
export function SectionHead({
  eyebrow,
  title,
  intro,
  onDark,
  align = "left",
  className,
  staticHeading = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
  /** Opt out of the shared masked-line heading reveal. */
  staticHeading?: boolean;
}) {
  const headingClass = cn("display-2 mt-5", onDark ? "text-deep-foreground" : "text-ink");
  return (
    <div
      className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}
    >
      {eyebrow ? <Eyebrow onDark={onDark ?? false}>{eyebrow}</Eyebrow> : null}
      {staticHeading ? (
        <h2 className={headingClass}>{title}</h2>
      ) : (
        <LineReveal as="h2" className={headingClass}>
          {title}
        </LineReveal>
      )}
      {intro ? (
        <div className={cn("lead mt-7", onDark && "text-deep-foreground/85")}>{intro}</div>
      ) : null}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);

          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Card({
  className,
  children,
  interactive = false,
}: {
  className?: string;
  children: ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-7 md:p-8",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-sage/70 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FeatureList({
  items,
  onDark,
  columns = 1,
}: {
  items: string[];
  onDark?: boolean;
  columns?: 1 | 2;
}) {
  return (
    <ul
      className={cn(
        "grid gap-x-10 gap-y-3.5",
        columns === 2 && "sm:grid-cols-2",
        onDark ? "text-deep-foreground/85" : "text-charcoal",
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
          <span
            aria-hidden="true"
            className={cn(
              "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
              onDark ? "bg-sage" : "bg-vital",
            )}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
