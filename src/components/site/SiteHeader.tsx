import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

export function Logo({
  className,
  placement = "header",
}: {
  className?: string;
  placement?: "header" | "footer";
}) {
  return (
    <Link
      to="/"
      className={cn("flex min-w-0 items-center", className)}
      aria-label="VitalScale Digital — home"
    >
      <img
        src="/images/vitalscale-digital-logo.png"
        alt=""
        aria-hidden="true"
        className={cn("w-auto shrink-0", placement === "footer" ? "h-24" : "h-[52px]")}
      />
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(72);
  const headerRef = useRef<HTMLElement>(null);
  const scrollPositionRef = useRef({ x: 0, y: 0 });
  const restoreScrollOnCloseRef = useRef(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeight = () =>
      setMobileHeaderHeight(Math.ceil(header.getBoundingClientRect().height));
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    const lockedPosition = scrollPositionRef.current;

    root.style.scrollBehavior = "auto";
    window.scrollTo(lockedPosition.x, lockedPosition.y);

    const preventBackgroundScroll = (event: TouchEvent | WheelEvent) => {
      const menu = document.getElementById("mobile-nav");
      const target = event.target;
      const menuCanScroll = menu ? menu.scrollHeight > menu.clientHeight : false;

      if (menuCanScroll && target instanceof Node && menu?.contains(target)) return;
      event.preventDefault();
    };

    const preventBackgroundKeys = (event: KeyboardEvent) => {
      const scrollKeys = ["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "];
      if (!scrollKeys.includes(event.key)) return;

      const menu = document.getElementById("mobile-nav");
      const target = event.target;
      const menuCanScroll = menu ? menu.scrollHeight > menu.clientHeight : false;

      if (menuCanScroll && target instanceof Node && menu?.contains(target)) return;
      event.preventDefault();
    };

    document.addEventListener("touchmove", preventBackgroundScroll, { passive: false });
    document.addEventListener("wheel", preventBackgroundScroll, { passive: false });
    document.addEventListener("keydown", preventBackgroundKeys);

    return () => {
      document.removeEventListener("touchmove", preventBackgroundScroll);
      document.removeEventListener("wheel", preventBackgroundScroll);
      document.removeEventListener("keydown", preventBackgroundKeys);

      if (restoreScrollOnCloseRef.current) {
        window.scrollTo(lockedPosition.x, lockedPosition.y);
        requestAnimationFrame(() => {
          root.style.scrollBehavior = previousScrollBehavior;
        });
      } else {
        root.style.scrollBehavior = previousScrollBehavior;
      }
    };
  }, [open]);

  const toggleMenu = () => {
    if (!open) {
      restoreScrollOnCloseRef.current = true;
      scrollPositionRef.current = { x: window.scrollX, y: window.scrollY };
      const height = headerRef.current?.getBoundingClientRect().height;
      if (height) setMobileHeaderHeight(Math.ceil(height));
    }
    setOpen((value) => !value);
  };

  const closeMenuForNavigation = () => {
    restoreScrollOnCloseRef.current = false;
    setOpen(false);
  };

  const mobileMenu =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            id="mobile-nav"
            className="fixed right-0 bottom-0 left-0 z-40 max-w-full overflow-y-auto overscroll-contain border-t border-border bg-background lg:hidden"
            style={{
              top: mobileHeaderHeight,
              maxHeight: `calc(100dvh - ${mobileHeaderHeight}px)`,
            }}
          >
            <nav aria-label="Mobile" className="container-page flex flex-col py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenuForNavigation}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-ink" }}
                  className="min-h-12 border-b border-border/60 py-3 text-base font-medium text-charcoal last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <ButtonLink to="/contact" size="lg" className="mt-5" onClick={closeMenuForNavigation}>
                Free Website Review
              </ButtonLink>
            </nav>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        ref={headerRef}
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
              onClick={toggleMenu}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] border border-border bg-card text-charcoal transition-colors hover:bg-surface lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
