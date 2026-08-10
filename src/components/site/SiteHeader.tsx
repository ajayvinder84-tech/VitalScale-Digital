import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/site/Button";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/ndis-website-design", label: "NDIS Website Design" },
  { to: "/how-we-help", label: "How We Help" },
  { to: "/work", label: "Work" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
  { to: "/new-providers", label: "New Providers" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("flex min-w-0 items-center gap-2.5", className)}
      aria-label="VitalScale Digital — home"
    >
      <img src="/favicon.png" alt="" aria-hidden="true" className="h-8 w-8 shrink-0" />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-extrabold tracking-tight text-ink">
          VitalScale
        </span>
        <span className="text-[0.6875rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Digital
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/85 backdrop-blur-md transition-shadow duration-300",
        scrolled ? "border-b border-border shadow-soft" : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-ink bg-surface" }}
              className="rounded-[10px] px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-surface hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink to="/contact" size="sm" className="hidden sm:inline-flex">
            Free Website Review
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] border border-border bg-card text-charcoal transition-colors hover:bg-surface lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile" className="container-page flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-ink" }}
                className="min-h-12 border-b border-border/60 py-3 text-base font-medium text-charcoal last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink to="/contact" size="lg" className="mt-5" onClick={() => setOpen(false)}>
              Free Website Review
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
