import { createFileRoute } from "@tanstack/react-router";

import { ArticleShell, Bullet, Bullets, H2, H3, H4, P, Quote } from "@/components/site/Article";
import { insights } from "@/lib/insights";

const meta = insights.find((i) => i.slug === "the-google-review-problem")!;
const url = `https://vitalscaledigital.com.au${meta.to}`;

export const Route = createFileRoute("/insights/the-google-review-problem")({
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
        When a family types the name of an NDIS provider into Google, what happens next usually
        takes less than 10 seconds. They see your rating. They read two or three reviews. They form
        an impression. And then they either reach out — or they go back and choose someone else.
      </P>
      <P>
        For most NDIS providers, this moment is completely unmanaged. Reviews have accumulated (or
        haven't) without any deliberate approach. Some are unanswered. Some are outdated. The
        overall impression doesn't reflect the actual quality of the service being provided.
      </P>
      <P>
        This article explains the specific problems that arise from an unmanaged review presence —
        and what to do about them.
      </P>

      <H2>Problem 1: No reviews at all</H2>
      <P>
        An NDIS provider with zero Google reviews doesn't look established — it looks unproven.
        Families searching for support for a loved one are making a high-stakes decision, often
        under stress. A provider with no reviews signals uncertainty, even if the service has been
        operating for years.
      </P>
      <P>
        The instinct many providers have is to avoid asking for reviews because it feels
        uncomfortable, or because they assume participants don't use Google. Both assumptions are
        worth challenging. Many participants' families and carers are active Google users, and most
        people are willing to leave a positive review if asked clearly and at the right moment —
        they simply never get asked.
      </P>
      <Quote>
        Providers with 10+ genuine reviews typically generate significantly more Google profile
        actions (calls, website visits, direction requests) than those with zero — regardless of
        service quality.
      </Quote>

      <H2>Problem 2: A low or stagnant rating</H2>
      <P>
        A 3.2 or 3.6 star rating creates a problem that's harder to fix than no reviews at all. It
        tells the family that some people have tried this provider and been disappointed. Even if
        the negative reviews are outdated, misleading, or unrepresentative, the rating sits there —
        visible, prominent, and credible-looking.
      </P>
      <P>
        The only sustainable fix is a systematic approach to generating more positive reviews over
        time. A provider with 4 poor reviews and 30 positive ones has a 4.5 rating. A provider with
        4 poor reviews and 3 positive ones has a 3.2 rating. The maths is straightforward — the gap
        is in process.
      </P>

      <H2>Problem 3: Unanswered reviews</H2>
      <P>
        Failing to respond to reviews — especially negative ones — sends a signal to prospective
        families that you don't pay attention, or that you don't take feedback seriously. Responding
        to reviews (positive and negative) is one of the most visible and impactful things a
        provider can do, because it's public and it demonstrates how you operate.
      </P>
      <P>
        A thoughtful, professional response to a negative review can actually improve a family's
        impression of a provider — it shows they take concerns seriously and handle difficult
        situations with dignity. An unanswered negative review sitting on a profile for 14 months
        does the opposite.
      </P>
      <P>
        <strong className="font-semibold text-ink">What a good response looks like:</strong>{" "}
        Acknowledge the experience described. Don't be defensive. Offer to take the conversation
        offline if appropriate. Keep it brief, professional, and human. Never name or reference
        specific participant information in a public response.
      </P>

      <H2>Problem 4: Reviews in the wrong places</H2>
      <P>
        Some providers have strong Trustpilot, Facebook, or word-of-mouth reputations — but few or
        no Google reviews. The issue is that Google is where most searches begin, and Google reviews
        appear directly in search results. Reputation on other platforms, while valuable, doesn't
        show up where families are looking.
      </P>
      <P>
        The goal is a strong Google review presence first, then supporting presence on Clickability,
        relevant NDIS directories, and Facebook as a secondary priority.
      </P>

      <H2>How to build a genuine review presence</H2>
      <P>
        The most common objection we hear is that asking for reviews feels awkward. It shouldn't —
        and here's why. If a participant or their family has had a good experience with your
        service, they often want to share that. They simply don't think to do it unless they're
        asked, and they often don't know where or how.
      </P>
      <P>A practical approach for NDIS providers:</P>
      <Bullets>
        <Bullet>
          <strong className="font-semibold text-ink">
            Start with coordinators and partner organisations
          </strong>{" "}
          who can review your service from a professional perspective. This bypasses participant
          privacy concerns entirely and builds a foundation of credible reviews quickly.
        </Bullet>
        <Bullet>
          <strong className="font-semibold text-ink">For participants and families</strong>, only
          seek reviews where it's genuinely comfortable and consensual. The right moment is after a
          positive interaction — after a successful plan review, after someone starts with a new
          support worker they're happy with, after a milestone. Never pressure or incentivise.
        </Bullet>
        <Bullet>
          <strong className="font-semibold text-ink">Make it easy.</strong> Send a direct link to
          your Google review page rather than expecting people to navigate there themselves. A
          short, warm message explaining that reviews help other families find them is usually well
          received.
        </Bullet>
        <Bullet>
          <strong className="font-semibold text-ink">Be consistent.</strong> One review a month,
          maintained consistently, is more valuable than a burst of ten followed by silence. Recency
          matters to Google.
        </Bullet>
      </Bullets>

      <H2>Responding to negative reviews</H2>
      <P>
        Negative reviews require care — particularly in the NDIS context, where participant privacy
        must be protected even in public responses. The principles are simple: acknowledge without
        detail, offer to resolve offline, stay professional, and don't leave it unanswered.
      </P>
      <P>
        If a review is genuinely false or defamatory, Google does have a process for flagging
        reviews for removal — but this is a high bar to meet and shouldn't be relied on as a primary
        strategy.
      </P>

      <H2>The underlying point</H2>
      <P>
        Online reputation for NDIS providers isn't a nice-to-have — it's a live part of your
        business development. Families and coordinators are checking it constantly, and what they
        find either opens or closes the door to an enquiry. Managing it deliberately isn't
        manipulative — it's ensuring your digital presence actually reflects the quality of the work
        you're doing.
      </P>

      <H3>Want to see how your review presence currently looks?</H3>
      <P>
        We include a reputation snapshot in every free online presence review — showing your current
        rating, review volume, response rate, and how you compare to nearby providers.
      </P>
    </ArticleShell>
  );
}
