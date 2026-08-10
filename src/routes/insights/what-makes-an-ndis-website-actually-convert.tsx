import { createFileRoute } from "@tanstack/react-router";

import { ArticleShell, Bullet, Bullets, H2, H3, P } from "@/components/site/Article";
import { insights } from "@/lib/insights";

const meta = insights.find((i) => i.slug === "what-makes-an-ndis-website-actually-convert")!;
const url = `https://vitalscaledigital.com.au${meta.to}`;

export const Route = createFileRoute("/insights/what-makes-an-ndis-website-actually-convert")({
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
        An NDIS provider's website can look perfectly respectable and still quietly fail at its main
        job: turning visitors into enquiries. After auditing dozens of NDIS provider websites, the
        same patterns keep appearing — not obvious disasters, but subtle issues that compound into a
        meaningful loss of potential contact.
      </P>
      <P>
        This article outlines the elements that make the real difference — and the ones that
        consistently undermine conversion without providers realising it.
      </P>

      <H2>What a family needs from your website in the first 10 seconds</H2>
      <P>
        Most visitors to an NDIS provider website make a preliminary judgement within the first 10
        seconds. During that time, they're looking for answers to three unspoken questions:
      </P>
      <Bullets>
        <Bullet>
          <em>Do you serve my area and the type of support I need?</em>
        </Bullet>
        <Bullet>
          <em>Do you look established and trustworthy?</em>
        </Bullet>
        <Bullet>
          <em>Is it easy to get in touch?</em>
        </Bullet>
      </Bullets>
      <P>
        If the answer to any of these is unclear or negative, they leave. Not because your service
        is poor — but because your website didn't give them what they needed in the moment they
        needed it.
      </P>

      <H2>What works: the elements that convert</H2>

      <H3>1. A clear, specific headline</H3>
      <P>
        Generic headlines like "Empowering lives through disability support" or "Committed to
        quality care" tell a visitor almost nothing specific. They don't confirm what services you
        offer, where you operate, or who you serve. A better headline is specific: "NDIS Support
        Services in Melbourne's South-East — SIL, Daily Living, and Plan Management." It's less
        poetic and more useful — which is what converts.
      </P>

      <H3>2. Your service areas stated clearly</H3>
      <P>
        Many NDIS providers serve specific suburbs or regions but don't state this clearly on their
        homepage or contact page. A family searching for providers in Frankston doesn't want to fill
        out a contact form to find out if you cover their area. Listing your service areas
        prominently — on the homepage, in the footer, and on service pages — removes a reason to
        leave.
      </P>

      <H3>3. A contact method that works on mobile</H3>
      <P>
        The majority of people visiting an NDIS provider's website are on a phone. If your contact
        form requires significant effort, your email address is text (not a clickable mailto link),
        or the contact button is small and hard to tap, you're losing enquiries. A simple,
        single-step contact method — a large, prominent button or a short form — is the most
        important conversion element on the page.
      </P>

      <H3>4. Evidence of real service quality</H3>
      <P>
        Trust signals on an NDIS website matter more than on most other websites, because families
        are making a sensitive, high-stakes decision. What builds confidence: Google reviews
        displayed visibly, NDIS registration number shown, named staff members with photos, specific
        participant outcomes described (appropriately, without identifying details), and any
        relevant accreditations or awards. What doesn't build confidence: stock photography of
        generic smiling people, vague mission statements, and self-description as "leading" or
        "premier" with no evidence.
      </P>

      <H3>5. A fast, mobile-optimised experience</H3>
      <P>
        A website that loads slowly on mobile — or renders poorly, with tiny text and small tap
        targets — creates frustration at exactly the moment you need to make a good impression.
        Google also uses mobile performance as a ranking factor, meaning a poor mobile experience
        affects both your conversion rate and your visibility.
      </P>

      <H2>What kills conversion: the common mistakes</H2>

      <H3>Unclear or buried contact options</H3>
      <P>
        If a visitor has to scroll to the bottom of the page to find your contact details, or click
        through multiple pages to reach a contact form, you're creating friction where there should
        be none. Contact options — ideally a button that opens a short form or a clearly visible
        email link — should be present in the navigation, in the hero section, and at the bottom of
        every page.
      </P>

      <H3>Long, dense text on service pages</H3>
      <P>
        NDIS provider websites often have service pages that read like policy documents — long
        paragraphs, technical language, and no clear hierarchy. Families don't read these; they
        scan. Short paragraphs, clear headings, and bullet points for key information are far more
        effective than dense prose.
      </P>

      <H3>A contact form with too many fields</H3>
      <P>
        Every additional required field on a contact form reduces completion rate. The minimum
        viable form is name, email, and message. Requiring phone number, date of birth, NDIS number,
        or a five-paragraph description of support needs before you've even made initial contact
        creates a barrier that loses enquiries — you can gather that information later.
      </P>

      <H3>No clear statement of who you serve</H3>
      <P>
        Some NDIS provider websites describe themselves in terms so broad ("supporting individuals
        with disability to live independently") that a visitor can't immediately tell if they serve
        people with their specific disability type, age group, or location. Specificity is not a
        limitation — it's a conversion tool. Stating clearly "We support adults with intellectual
        and physical disabilities in Melbourne's northern suburbs" helps the right people
        self-identify and reach out.
      </P>

      <H3>Outdated or thin content</H3>
      <P>
        A website with a blog that hasn't been updated since 2022, a team page with no photos, or
        service descriptions that are clearly placeholder text signals to visitors — and to Google —
        that the website isn't being maintained. It raises a reasonable question: if the website
        isn't being looked after, what does that say about the service?
      </P>

      <H2>The underlying principle</H2>
      <P>
        A high-converting NDIS website isn't about design sophistication or technical complexity.
        It's about making it easy for the right families and coordinators to quickly understand what
        you offer, feel confident in what they see, and take the next step without friction.
      </P>
      <P>
        Most of the improvements that make the biggest difference aren't expensive or technically
        difficult. They're about clarity, specificity, and making sure every page on your site is
        earning its place in the visitor's journey toward contact.
      </P>

      <H3>Want to know how your website is actually performing?</H3>
      <P>
        We include a website conversion check in every free online presence review — looking
        specifically at clarity, contact flow, mobile experience, and the elements that are costing
        you enquiries.
      </P>
    </ArticleShell>
  );
}
