import { createFileRoute } from "@tanstack/react-router";

import { Container, Reveal } from "@/components/site/Section";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — VitalScale Digital" },
      {
        name: "description",
        content: "A look at completed VitalScale Digital projects.",
      },
      { property: "og:title", content: "Work — VitalScale Digital" },
      { property: "og:description", content: "A look at completed VitalScale Digital projects." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vitalscaledigital.com.au/work" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://vitalscaledigital.com.au/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <>
      <div className="border-b border-border bg-surface py-20 md:py-28">
        <Container>
          <h1 className="display-1 text-ink">Work.</h1>
          <p className="lead mt-7 max-w-2xl">A look at completed VitalScale Digital projects.</p>
        </Container>
      </div>

      <div className="py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div>
              <img
                src="/images/elite-iv-logo.png"
                alt="Elite IV Infusions logo"
                className="h-12 w-auto"
                loading="lazy"
              />
              <h2 className="display-3 mt-8 text-ink">Elite IV Infusions</h2>
              <p className="mt-3 text-sm font-medium tracking-wide text-muted-foreground uppercase">
                Healthcare website project
              </p>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-charcoal">
                VitalScale Digital completed the website for Elite IV Infusions, a healthcare
                business.
              </p>
              <a
                href="https://eliteivinfusion.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-vital underline-offset-4 transition-colors hover:text-deep hover:underline"
              >
                Visit the live website
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>

            <Reveal delay={80}>
              <figure className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <img
                  src="/images/elite-iv-site.jpg"
                  alt="The Elite IV Infusions website homepage"
                  className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </figure>
            </Reveal>
          </div>
        </Container>
      </div>
    </>
  );
}
