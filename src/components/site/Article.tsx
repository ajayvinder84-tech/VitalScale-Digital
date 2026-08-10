import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Container } from "@/components/site/Section";
import { insightsExcept, type InsightMeta } from "@/lib/insights";
import { cn } from "@/lib/utils";

export function ArticleShell({ meta, children }: { meta: InsightMeta; children: ReactNode }) {
  const more = insightsExcept(meta.slug);

  return (
    <article>
      <div className="border-b border-border bg-surface py-16 md:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true" className="px-2">
              /
            </span>
            <Link to="/insights" className="transition-colors hover:text-ink">
              Insights
            </Link>
          </nav>

          <p className="eyebrow mt-8">{meta.category}</p>
          <h1 className="display-2 mt-5 max-w-4xl text-ink">{meta.heading}</h1>
          <p className="mt-7 text-sm text-muted-foreground">VitalScale Digital · {meta.readTime}</p>
        </Container>
      </div>

      <div className="py-16 md:py-20">
        <Container>
          <div className="max-w-[46rem]">{children}</div>
        </Container>
      </div>

      {more.length > 0 && (
        <div className="border-t border-border bg-neutral-surface py-16 md:py-20">
          <Container>
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              More NDIS Digital Insights
            </h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {more.map((item) => (
                <li key={item.slug}>
                  <p className="eyebrow">{item.category}</p>
                  <h3 className="mt-3 font-display text-xl font-bold text-ink">{item.listTitle}</h3>
                  <Link
                    to={item.to}
                    className="mt-4 inline-flex text-[0.9375rem] font-medium text-vital underline-offset-4 transition-colors hover:text-deep hover:underline"
                  >
                    Read article →
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </article>
  );
}

export function P({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-6 text-[1.0625rem] leading-[1.75] text-charcoal first:mt-0", className)}>
      {children}
    </p>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="display-3 mt-14 text-ink">{children}</h2>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-11 font-display text-xl font-bold text-ink">{children}</h3>;
}

export function H4({ children }: { children: ReactNode }) {
  return (
    <h4 className="mt-10 font-display text-base font-bold tracking-wide text-ink uppercase">
      {children}
    </h4>
  );
}

export function Bullets({ children }: { children: ReactNode }) {
  return <ul className="mt-6 grid gap-4">{children}</ul>;
}

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-[1.0625rem] leading-[1.75] text-charcoal">
      <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-vital" />
      <span>{children}</span>
    </li>
  );
}

export function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mt-10 border-l-2 border-sage pl-6 font-display text-lg leading-relaxed text-deep">
      {children}
    </blockquote>
  );
}
