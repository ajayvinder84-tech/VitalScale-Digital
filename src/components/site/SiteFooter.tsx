import { Link } from "@tanstack/react-router";

import { Logo, NAV_LINKS } from "@/components/site/SiteHeader";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-neutral-surface">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="max-w-md">
            <Logo placement="footer" />
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-charcoal">
              VitalScale Digital designs and redesigns websites for NDIS providers who want to be
              easier to understand and easier to trust.
            </p>
            <p className="mt-5 font-display text-lg font-semibold text-deep">
              Real work, plainly shown.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/privacy-policy"
                className="text-sm text-muted-foreground transition-colors hover:text-ink"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-use"
                className="text-sm text-muted-foreground transition-colors hover:text-ink"
              >
                Terms of Use
              </Link>
            </nav>

            <address className="not-italic">
              <h2 className="font-display text-sm font-semibold tracking-wide text-ink uppercase">
                Business details
              </h2>
              <ul className="mt-4 min-w-0 space-y-2 text-sm text-charcoal">
                <li>ABN: 28 337 767 445</li>
                <li>
                  Phone:{" "}
                  <a
                    href="tel:+61406970615"
                    className="break-words text-deep underline decoration-border underline-offset-4 transition-colors hover:text-vital"
                  >
                    0406 970 615
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info@vitalscaledigital.com.au"
                    className="break-words text-deep underline decoration-border underline-offset-4 transition-colors hover:text-vital"
                  >
                    info@vitalscaledigital.com.au
                  </a>
                </li>
                <li>
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/61406970615"
                    className="break-words text-deep underline decoration-border underline-offset-4 transition-colors hover:text-vital"
                  >
                    0406 970 615
                  </a>
                </li>
                <li>Melbourne, Victoria, Australia</li>
              </ul>
            </address>
          </div>
        </div>

        <div className="hairline mt-14" />

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          VitalScale Digital provides website design and digital communication services. We do not
          provide NDIS registration, audit, legal, clinical or compliance advice.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Copyright © {year} VitalScale Digital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
