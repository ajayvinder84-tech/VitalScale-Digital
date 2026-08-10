import { Reveal } from "@/components/site/Section";

/**
 * Static bento composition. Six tiles from one illustrative provider concept
 * carry the idea of "a clearer website" visually instead of by a long bullet
 * list. Layout is fixed — no scroll-driven rearrangement.
 *
 * The registration-status tile is deliberately the quietest tile: plain text
 * only, no badge, shield, tick or certification-style iconography, and no
 * scale/emphasis treatment.
 */
export function BentoStory() {
  return (
    <Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {/* 1 — hero message */}
        <article className="rounded-2xl border border-border bg-card p-7 shadow-lift sm:col-span-2 lg:col-span-3 lg:row-span-2 lg:p-9">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex shrink-0 gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/35" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            </span>
            <span className="min-w-0 flex-1 truncate rounded-full border border-border bg-surface px-3 py-1 text-center text-xs text-muted-foreground">
              brightpathsupports.com.au
            </span>
          </div>
          <p className="mt-8 text-sm font-semibold text-ink">Brightpath Supports</p>
          <h3 className="mt-4 text-2xl leading-snug font-extrabold text-ink sm:text-3xl">
            Support you can plan around, in Melbourne’s north.
          </h3>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-charcoal">
            Who you support and where you operate, said plainly — before anyone has to scroll.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex min-h-10 items-center rounded-[13px] bg-primary px-4 text-sm font-medium text-primary-foreground">
              Make an enquiry
            </span>
            <span className="inline-flex min-h-10 items-center rounded-[13px] border border-border px-4 text-sm font-medium text-charcoal">
              Our services
            </span>
          </div>
        </article>

        {/* 2 — service clarity */}
        <article className="rounded-2xl border border-border bg-card p-7 lg:col-span-3">
          <p className="eyebrow">Service clarity</p>
          <ul className="mt-5 space-y-3 text-[0.9375rem] leading-relaxed text-charcoal">
            <li>Daily living support</li>
            <li>Community access</li>
            <li>Support coordination</li>
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Named in everyday language, with who each support is for.
          </p>
        </article>

        {/* 3 — service area */}
        <article className="rounded-2xl bg-deep p-7 text-deep-foreground lg:col-span-3">
          <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-sage uppercase">
            Service area
          </p>
          <p className="mt-5 text-xl leading-snug font-extrabold">
            Melbourne’s northern suburbs and surrounds.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-deep-foreground/80">
            Stated on the homepage, not buried in a footer.
          </p>
        </article>

        {/* 4 — registration status: plain text only, quietest tile, no iconography */}
        {/* Registration status: excluded from the Flip set entirely — plain text,
          fixed position, no animation or repositioning, ever. */}
        <article className="rounded-2xl border border-border bg-surface p-7 lg:col-span-3">
          <p className="eyebrow">Registration status</p>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-charcoal">
            Currently registering. Supporting self-managed and plan-managed clients.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Written exactly as it is at the time of launch.
          </p>
        </article>

        {/* 5 — founder / trust cue */}
        <article className="rounded-2xl border border-border bg-card p-7 lg:col-span-3">
          <p className="eyebrow">Who’s behind it</p>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-charcoal">
            A short, human introduction to the person families will actually speak to.
          </p>
          <div aria-hidden="true" className="mt-6 flex items-center gap-3">
            <span className="h-10 w-10 rounded-full bg-primary-light" />
            <span className="space-y-2">
              <span className="block h-2 w-24 rounded-full bg-muted-foreground/25" />
              <span className="block h-2 w-16 rounded-full bg-muted-foreground/20" />
            </span>
          </div>
        </article>

        {/* 6 — mobile contact pathway */}
        <article className="rounded-2xl border border-border bg-card p-7 lg:col-span-6">
          <p className="eyebrow">Contact pathway</p>
          <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-ink">Ready to ask a question?</p>
            <span className="mt-4 flex min-h-10 items-center justify-center rounded-[13px] bg-primary px-4 text-sm font-medium text-primary-foreground">
              Make an enquiry
            </span>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              One tap to call · One form to send
            </p>
          </div>
        </article>
      </div>
    </Reveal>
  );
}
