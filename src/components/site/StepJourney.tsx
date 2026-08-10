import { Check, ClipboardList, FileText, Layers } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { useSceneSteps } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type JourneyStep = {
  step: string;
  title: string;
  meta: string;
  body: string;
  includes?: string[];
};

const stepIcons = [FileText, ClipboardList, Layers];

/**
 * Three-step progression with a scroll-linked 1 / 2 / 3 indicator.
 * No pinning and no scroll-jacking: every step, price and inclusion is always
 * rendered and readable — the indicator only tracks where the reader is.
 */
export function StepJourney({ steps }: { steps: JourneyStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const onChange = useCallback((index: number) => setActive(index), []);
  useSceneSteps(ref, steps.length, onChange);

  return (
    <div ref={ref} className="mt-16 grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14">
      {/* Progress indicator (desktop) */}
      <div aria-hidden="true" className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
        <ol className="space-y-5">
          {steps.map((item, index) => (
            <li key={item.title} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold transition-colors duration-500",
                  active === index
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground",
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "h-px w-8 transition-colors duration-500",
                  active === index ? "bg-sage" : "bg-border",
                )}
              />
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-10">
        {steps.map((item, index) => {
          const Icon = stepIcons[index] ?? FileText;
          const isFinal = Boolean(item.includes);
          return (
            <div key={item.title} data-scene-step className="relative">
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-full left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-sage/60 to-sage/0"
                />
              ) : null}
              <div
                className={cn(
                  "rounded-3xl p-8 transition-[box-shadow,border-color] duration-500 md:p-12",
                  isFinal
                    ? "bg-deep text-deep-foreground"
                    : "border border-border bg-card/60 lg:border-transparent",
                  !isFinal && active === index && "lg:border-sage/60 lg:shadow-lift",
                )}
              >
                <div className="grid gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
                  <div>
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-deep"
                      >
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <p
                        className={cn(
                          isFinal
                            ? "text-[0.6875rem] font-semibold tracking-[0.16em] text-sage uppercase"
                            : "eyebrow",
                        )}
                      >
                        {item.step}
                      </p>
                    </div>
                    {isFinal ? (
                      <p className="mt-6 text-[0.6875rem] font-semibold tracking-[0.16em] text-sage uppercase">
                        Optional next step
                      </p>
                    ) : null}
                    <h3
                      className={cn(
                        isFinal
                          ? "mt-4 text-3xl leading-tight font-extrabold text-deep-foreground sm:text-4xl"
                          : "mt-5 text-2xl font-extrabold text-ink",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-sm",
                        isFinal ? "text-deep-foreground/70" : "text-muted-foreground",
                      )}
                    >
                      {item.meta}
                    </p>
                  </div>
                  <div>
                    <p
                      className={cn(
                        "text-[1.0625rem] leading-relaxed",
                        isFinal ? "text-deep-foreground/85" : "text-charcoal",
                      )}
                    >
                      {item.body}
                    </p>
                    {item.includes ? (
                      <div className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                        {item.includes.map((inc) => (
                          <p
                            key={inc}
                            className="flex gap-3 text-[0.9375rem] leading-relaxed text-deep-foreground/85"
                          >
                            <Check
                              aria-hidden="true"
                              size={16}
                              strokeWidth={2}
                              className="mt-1 shrink-0 text-sage"
                            />
                            <span>{inc}</span>
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
