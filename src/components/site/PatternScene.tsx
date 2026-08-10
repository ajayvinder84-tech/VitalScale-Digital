import { useRef } from "react";

import { useAlternatingReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Point = { num: string; title: string; body: string };

/**
 * Problem scene: four observations beside one concept website mock.
 * Every observation is always fully readable and equally weighted — the only
 * motion is a single gentle reveal as the section enters the viewport.
 */
export function PatternScene({ points }: { points: Point[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useAlternatingReveal(ref, { distance: 24 });

  return (
    <div ref={ref} className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
      {/* Concept mock */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div
          aria-hidden="true"
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift"
        >
          <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
            <span className="flex shrink-0 gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/35" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            </span>
            <span className="min-w-0 flex-1 truncate rounded-full border border-border bg-card px-3 py-1 text-center text-xs text-muted-foreground">
              yourorganisation.com.au
            </span>
          </div>

          <div className="space-y-5 p-6 md:p-8">
            <div className="flex items-center gap-2 p-2">
              <span className="h-6 w-6 rounded-md bg-muted-foreground/20" />
              <span className="h-2 w-16 rounded-full bg-muted-foreground/25" />
              <span className="ml-auto h-2 w-10 rounded-full bg-muted-foreground/20" />
              <span className="h-2 w-10 rounded-full bg-muted-foreground/20" />
            </div>

            <div className="space-y-2.5 p-2">
              <span className="block h-3.5 w-3/4 rounded-full bg-muted-foreground/30" />
              <span className="block h-2 w-full rounded-full bg-muted-foreground/20" />
              <span className="block h-2 w-5/6 rounded-full bg-muted-foreground/20" />
            </div>

            <div className="grid grid-cols-3 gap-3 p-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="flex h-16 flex-col justify-end rounded-lg border border-border p-2"
                >
                  <span className="block h-2 w-4/5 rounded-full bg-muted-foreground/25" />
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 p-2">
              <span className="h-2 w-20 rounded-full bg-muted-foreground/20" />
              <span className="h-2 w-14 rounded-full bg-muted-foreground/15" />
              <span className="ml-auto h-2 w-12 rounded-full bg-muted-foreground/15" />
            </div>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Illustrative concept. Not a VitalScale client or real provider.
        </p>
      </div>

      {/* Observations */}
      <ol className="space-y-10 lg:space-y-14">
        {points.map((point) => (
          <li key={point.num} data-reveal-item className={cn("flex gap-5")}>
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-extrabold text-deep"
            >
              {Number(point.num)}
            </span>
            <div>
              <h3 className="font-extrabold text-ink">{point.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal">{point.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
