import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Reusable, illustrative website mockups.
 * These are design compositions, not screenshots of real client sites,
 * and are always aria-hidden so screen readers skip decorative detail.
 */

export function BrowserFrame({
  children,
  className,
  label,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  label?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-lift",
        tone === "dark" ? "border-sage/25 bg-deep" : "border-border bg-card",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b px-4 py-3",
          tone === "dark" ? "border-sage/20 bg-white/5" : "border-border bg-neutral-surface",
        )}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-border/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-border/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-border/80" />
        <div
          className={cn(
            "ml-3 flex h-6 min-w-0 flex-1 items-center rounded-md border px-2.5",
            tone === "dark" ? "border-sage/20 bg-white/5" : "border-border bg-card",
          )}
        >
          {label ? (
            <span
              className={cn(
                "truncate text-[0.625rem] tracking-wide",
                tone === "dark" ? "text-deep-foreground/60" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
}

/** A clear, well-structured provider homepage. */
export function DesktopSiteMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("bg-card", compact ? "p-5" : "p-6 sm:p-8")}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-md bg-vital" />
          <span className="h-2.5 w-16 rounded-full bg-charcoal/70" />
        </div>
        <div className="hidden gap-4 sm:flex">
          <span className="h-2 w-11 rounded-full bg-border" />
          <span className="h-2 w-14 rounded-full bg-border" />
          <span className="h-2 w-10 rounded-full bg-border" />
        </div>
        <div className="h-7 w-24 rounded-[10px] bg-vital" />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:items-center">
        <div>
          <div className="h-2 w-24 rounded-full bg-vital/45" />
          <div className="mt-4 space-y-2.5">
            <div className="h-4 w-[92%] rounded-full bg-charcoal/85" />
            <div className="h-4 w-[64%] rounded-full bg-charcoal/85" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-1.5 w-[80%] rounded-full bg-border" />
            <div className="h-1.5 w-[66%] rounded-full bg-border" />
          </div>
          <div className="mt-5 flex gap-2">
            <div className="h-6 w-20 rounded-[9px] bg-deep" />
            <div className="h-6 w-20 rounded-[9px] border border-border" />
          </div>
        </div>
        <div className="rounded-xl bg-[radial-gradient(80%_80%_at_30%_20%,var(--pale),var(--surface))] p-4">
          <div className="rounded-lg border border-border/70 bg-card p-3">
            <div className="h-1.5 w-12 rounded-full bg-sage" />
            <div className="mt-2.5 h-1.5 w-full rounded-full bg-border" />
            <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-border" />
          </div>
          <div className="mt-3 rounded-lg border border-border/70 bg-card p-3">
            <div className="h-1.5 w-16 rounded-full bg-sage" />
            <div className="mt-2.5 h-1.5 w-5/6 rounded-full bg-border" />
          </div>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-3 gap-3">
        {["services", "who", "where"].map((k) => (
          <div key={k} className="rounded-xl border border-border bg-surface p-3.5">
            <div className="h-2 w-2/3 rounded-full bg-sage/70" />
            <div className="mt-2.5 h-1.5 w-full rounded-full bg-border" />
            <div className="mt-1.5 h-1.5 w-4/5 rounded-full bg-border" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** An older, cramped website — used only as the "before" half of a transformation. */
export function DatedSiteMock() {
  return (
    <div className="bg-neutral-surface p-5">
      <div className="flex items-center justify-between">
        <span className="h-3 w-20 rounded-sm bg-muted-foreground/45" />
        <div className="flex gap-1.5">
          <span className="h-1.5 w-8 rounded-sm bg-muted-foreground/25" />
          <span className="h-1.5 w-8 rounded-sm bg-muted-foreground/25" />
          <span className="h-1.5 w-8 rounded-sm bg-muted-foreground/25" />
          <span className="h-1.5 w-8 rounded-sm bg-muted-foreground/25" />
          <span className="h-1.5 w-8 rounded-sm bg-muted-foreground/25" />
        </div>
      </div>
      <div className="mt-4 h-14 rounded-sm bg-muted-foreground/12" />
      <div className="mt-4 space-y-1.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-sm bg-muted-foreground/20"
            style={{ width: `${94 - i * 3}%` }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 rounded-sm bg-muted-foreground/12" />
        ))}
      </div>
    </div>
  );
}

export function MobileSiteMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[26px] border border-border bg-card p-2.5 shadow-lift",
        className,
      )}
    >
      <div className="rounded-[20px] bg-surface p-3.5">
        <div className="mx-auto h-1 w-8 rounded-full bg-border" />
        <div className="mt-4 flex items-center justify-between">
          <span className="h-4 w-4 rounded-md bg-vital" />
          <span className="h-1.5 w-10 rounded-full bg-border" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2.5 w-full rounded-full bg-charcoal/80" />
          <div className="h-2.5 w-3/4 rounded-full bg-charcoal/80" />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-border" />
          <div className="h-1.5 w-5/6 rounded-full bg-border" />
        </div>
        <div className="mt-4 h-8 w-full rounded-[10px] bg-vital" />
        <div className="mt-3 space-y-2">
          {["a", "b"].map((k) => (
            <div key={k} className="rounded-lg border border-border bg-card p-2.5">
              <div className="h-1.5 w-1/2 rounded-full bg-sage/70" />
              <div className="mt-2 h-1.5 w-full rounded-full bg-border" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Before / after website composition. */
export function TransformVisual() {
  return (
    <div aria-hidden="true" className="relative select-none">
      <div className="grid gap-5 sm:grid-cols-2 sm:items-center">
        <div className="relative">
          <BrowserFrame className="opacity-80 shadow-soft" label="current website">
            <DatedSiteMock />
          </BrowserFrame>
          <span className="mt-3 block text-[0.6875rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Before
          </span>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[28px] bg-[radial-gradient(70%_70%_at_50%_40%,var(--pale),transparent_75%)]" />
          <BrowserFrame label="redesigned website">
            <DesktopSiteMock compact />
          </BrowserFrame>
          <span className="mt-3 block text-[0.6875rem] font-semibold tracking-[0.16em] text-vital uppercase">
            After
          </span>
        </div>
      </div>
    </div>
  );
}
