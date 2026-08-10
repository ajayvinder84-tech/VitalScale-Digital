import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckSquare, Search, Star } from "lucide-react";

import { StaggerGroup } from "@/components/site/Motion";
import { Container } from "@/components/site/Section";
import { insights } from "@/lib/insights";

const motifBySlug: Record<string, React.ElementType> = {
  "why-ndis-providers-are-invisible-on-google": Search,
  "the-google-review-problem": Star,
  "what-makes-an-ndis-website-actually-convert": CheckSquare,
};

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights — VitalScale Digital" },
      {
        name: "description",
        content:
          "Practical, sector-specific thinking on websites, visibility and online presence for NDIS providers.",
      },
      { property: "og:title", content: "Insights — VitalScale Digital" },
      {
        property: "og:description",
        content:
          "Practical, sector-specific thinking on websites, visibility and online presence for NDIS providers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vitalscaledigital.com.au/insights" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://vitalscaledigital.com.au/insights" }],
  }),
  component: InsightsIndex,
});

function InsightsIndex() {
  return (
    <>
      <div className="border-b border-border bg-surface py-20 md:py-28">
        <Container>
          <h1 className="display-1 text-ink">Insights.</h1>
          <p className="lead mt-7 max-w-2xl">
            Practical, sector-specific thinking on websites, visibility and online presence for NDIS
            providers.
          </p>
        </Container>
      </div>

      <div className="py-20 md:py-28">
        <Container>
          <StaggerGroup>
            <ul className="grid gap-14 md:gap-16">
              {insights.map((item) => {
                const Motif = motifBySlug[item.slug] ?? Search;
                return (
                  <li
                    key={item.slug}
                    data-reveal-item
                    className="max-w-3xl border-b border-border pb-12 opacity-0 last:border-0"
                  >
                    <span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-pale text-deep">
                      <Motif className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <p className="eyebrow">{item.category}</p>
                    <h2 className="display-3 mt-4 text-ink">
                      <Link to={item.to} className="transition-colors hover:text-deep">
                        {item.listTitle}
                      </Link>
                    </h2>
                    <p className="mt-5 text-[1.0625rem] leading-relaxed text-charcoal">
                      {item.standfirst}
                    </p>
                    <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                      <span>{item.readTime}</span>
                      <Link
                        to={item.to}
                        className="font-medium text-vital underline-offset-4 transition-colors hover:text-deep hover:underline"
                      >
                        Read article →
                      </Link>
                    </p>
                  </li>
                );
              })}
            </ul>
          </StaggerGroup>
        </Container>
      </div>
    </>
  );
}
