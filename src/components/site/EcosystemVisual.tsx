import { Globe, MessageSquare, Search, Star } from "lucide-react";

import { MobileSiteMock } from "@/components/site/SiteMock";

const nodes = [
  { icon: Search, label: "Google profile" },
  { icon: Globe, label: "Social profiles" },
  { icon: Star, label: "Reviews" },
  { icon: MessageSquare, label: "Enquiry & referral" },
];

/**
 * Trust-touchpoint composition: the website at the centre, with the surrounding
 * digital touchpoints connected to it. Deliberately not a dashboard.
 */
export function EcosystemVisual() {
  return (
    <div aria-hidden="true" className="relative select-none">
      <div className="absolute -inset-6 -z-10 rounded-[36px] bg-[radial-gradient(65%_65%_at_50%_35%,var(--pale),transparent_72%)]" />

      <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,auto)_minmax(0,1fr)]">
        <div className="relative mx-auto w-[150px] sm:w-[168px]">
          <MobileSiteMock />
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-card px-3 py-1 text-[0.625rem] font-semibold tracking-[0.14em] text-vital uppercase shadow-soft">
            Website
          </span>
        </div>

        <ul className="space-y-3">
          {nodes.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3.5 rounded-xl border border-border bg-card px-4 py-3.5"
            >
              <span aria-hidden="true" className="hidden h-px w-6 shrink-0 bg-border sm:block" />
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] bg-pale text-deep">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 truncate text-[0.9375rem] font-medium text-charcoal">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-center text-[0.8125rem] text-muted-foreground sm:text-left">
        Every touchpoint pointing to the same clear message.
      </p>
    </div>
  );
}
