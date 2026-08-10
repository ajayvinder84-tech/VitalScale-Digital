import { createFileRoute } from "@tanstack/react-router";

import { ArticleShell, H2, H3, P, Quote } from "@/components/site/Article";
import { insights } from "@/lib/insights";

const meta = insights.find((i) => i.slug === "why-ndis-providers-are-invisible-on-google")!;
const url = `https://vitalscaledigital.com.au${meta.to}`;

export const Route = createFileRoute("/insights/why-ndis-providers-are-invisible-on-google")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: meta.heading,
          description: meta.description,
          author: { "@type": "Organization", name: "VitalScale Digital" },
          publisher: { "@type": "Organization", name: "VitalScale Digital" },
          mainEntityOfPage: url,
        }),
      },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  return (
    <ArticleShell meta={meta}>
      <P>
        When a family or support coordinator searches for NDIS providers in your area, what do they
        find? Probably not you — even if you've been operating for years and delivering excellent
        support.
      </P>
      <P>
        This isn't unusual. After reviewing dozens of NDIS provider online presences across
        Australia, the same pattern keeps appearing: providers doing genuinely good work who are
        nearly invisible in local search, not because they've done anything wrong, but because
        nobody has ever shown them what's missing.
      </P>
      <P>
        Here are the five most common reasons NDIS providers don't show up in Google — and what to
        do about each one.
      </P>

      <H2>1. An unclaimed or incomplete Google Business Profile</H2>
      <P>
        Your Google Business Profile (GBP) is the single most important piece of digital real estate
        for a local NDIS provider. It's what shows up in Google Maps, in the local results pack, and
        on the right-hand side of search results when someone searches your name.
      </P>
      <P>
        The problem is that many providers either haven't claimed their listing, or have claimed it
        but filled it in so minimally that Google doesn't rank it. An incomplete profile — missing
        hours, services, photos, and a description — tells Google you're not a reliable result to
        show.
      </P>
      <Quote>
        A fully optimised Google Business Profile typically generates 5–7 times more profile views
        than an incomplete one, and significantly more direct enquiry actions like calls and website
        visits.
      </Quote>
      <P>
        <strong className="font-semibold text-ink">What to do:</strong> Claim your GBP if you
        haven't already (search your business name on Google and look for the "Claim this business"
        prompt). Fill out every section — business category, description, hours, services, and
        photos. This alone can move you from invisible to visible within weeks.
      </P>

      <H2>2. No photos — or only old, low-quality ones</H2>
      <P>
        Photos are one of the highest-impact things on a Google profile. Listings with photos
        receive significantly more clicks and direction requests than those without. For an NDIS
        provider, photos also provide something even more important than SEO: reassurance.
      </P>
      <P>
        Families choosing a disability support provider are making a trust-sensitive decision. A
        photo of your office, your team, or your day programs shows them that you're real,
        established, and professional — before they've read a single word about your services.
      </P>
      <P>
        <strong className="font-semibold text-ink">What to do:</strong> Add at least 8–10 genuine
        photos to your Google profile. Include your office or facility, your team (with permission),
        and examples of programs or activities where appropriate. Aim for clear, well-lit images —
        they don't need to be professional photography, but they should look considered.
      </P>

      <H2>3. Few or no Google reviews</H2>
      <P>
        Reviews are the first thing most families look at. A provider with no reviews looks
        unproven, regardless of how long they've been operating. A provider with a 3.2 rating
        creates concern. A provider with 15+ recent reviews averaging 4.5 stars creates immediate
        confidence.
      </P>
      <P>
        The challenge for NDIS providers is that requesting reviews requires care — you need to
        consider participant consent, dignity, and privacy when thinking about who and how to
        approach. But it is absolutely possible to build a genuine review base without compromising
        these principles.
      </P>
      <P>
        <strong className="font-semibold text-ink">What to do:</strong> Start with staff, partner
        organisations, and support coordinators who've worked with you. Ask them to leave a review
        based on their professional experience. For participants, only seek reviews where it's
        clearly appropriate, consensual, and comfortable for the individual — never pressure or
        incentivise. Build a simple, consistent process for asking rather than doing it ad hoc.
      </P>

      <H2>4. Your website doesn't match what Google expects</H2>
      <P>
        Google uses your website to understand what you do, where you operate, and whether you're a
        legitimate, established provider. If your website is missing suburb-specific content,
        doesn't load quickly on mobile, or doesn't clearly state the services you provide, you'll
        rank lower than providers whose websites do these things well.
      </P>
      <P>
        <strong className="font-semibold text-ink">What to do:</strong> Make sure your website
        clearly lists every service you offer, the suburbs and regions you cover, and your contact
        details (particularly your address if you have a physical location). Ensure your site loads
        quickly on mobile — over 60% of searches for disability services happen on phones. Add
        schema markup if you're technically inclined, or work with someone who can.
      </P>

      <H2>5. No consistent content or activity</H2>
      <P>
        Google rewards businesses that stay active. Posting updates to your Google profile,
        publishing occasional articles or news, and maintaining fresh content signals to Google that
        you're an active, relevant business worth showing.
      </P>
      <P>
        For NDIS providers, content also serves a dual purpose: it helps families understand your
        approach, your values, and what it would be like to work with you. A short article about how
        you support participants with a specific disability type, or an update about a new program
        you're running, can be both an SEO asset and a trust signal for potential participants and
        their families.
      </P>
      <P>
        <strong className="font-semibold text-ink">What to do:</strong> Post a Google Business
        update at least once a fortnight — it could be a news update, a program highlight, or a
        seasonal message. Aim to publish one piece of website content per month. Consistency matters
        more than volume.
      </P>

      <H2>The underlying pattern</H2>
      <P>
        These five issues share something in common: none of them require significant budget or
        technical expertise to fix. They require time, attention, and a clear understanding of what
        Google (and the families using it) actually needs to see.
      </P>
      <P>
        The providers who tend to rank well locally aren't necessarily the ones with the biggest
        organisations or the most sophisticated websites. They're the ones who've been deliberate
        about their digital presence — and consistent about maintaining it.
      </P>
      <P>
        If you're not sure where to stand right now, the best first step is to Google yourself the
        way a family would. Search "NDIS provider [your suburb]" and see whether you appear — and if
        you do, look honestly at what shows up. That first impression is what families are seeing.
      </P>

      <H3>Not sure how visible you actually are?</H3>
      <P>
        We offer a free, honest online presence review — specific to your provider, not a generic
        software scan. You'll know exactly where you stand and what to fix first.
      </P>
    </ArticleShell>
  );
}
