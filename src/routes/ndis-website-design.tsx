import { createFileRoute } from "@tanstack/react-router";

import { ButtonLink } from "@/components/site/Button";
import { Container, Eyebrow, FeatureList, Reveal, Section } from "@/components/site/Section";

export const Route = createFileRoute("/ndis-website-design")({
  head: () => ({
    meta: [
      { title: "NDIS Website Design & Redesign | VitalScale Digital" },
      {
        name: "description",
        content:
          "Website design and redesign for NDIS providers: clearer messaging, stronger credibility and easier next steps for the people contacting you.",
      },
      { property: "og:title", content: "NDIS Website Design & Redesign | VitalScale Digital" },
      {
        property: "og:description",
        content:
          "Website design and redesign for NDIS providers who need their online presence to reflect the organisation they have built.",
      },
      { property: "og:url", content: "https://vitalscaledigital.com.au/ndis-website-design" },
      { property: "og:site_name", content: "VitalScale Digital" },
      { name: "twitter:title", content: "NDIS Website Design & Redesign | VitalScale Digital" },
      {
        name: "twitter:description",
        content:
          "Website design and redesign for NDIS providers who need their online presence to reflect the organisation they have built.",
      },
    ],
    links: [{ rel: "canonical", href: "https://vitalscaledigital.com.au/ndis-website-design" }],
  }),
  component: NdisWebsiteDesign,
});

const includes = [
  "New NDIS websites",
  "Website redesigns",
  "Homepage structure",
  "Service and location pages",
  "Website messaging",
  "Content organisation",
  "Mobile-friendly design",
  "Appropriate accessibility improvements",
  "Enquiry and contact pathways",
  "Trust-building information",
  "Google Business Profile alignment",
  "Social profile consistency",
];

const process = [
  {
    step: "Understand",
    body: "We learn about your organisation, services, locations, audience and current website.",
  },
  {
    step: "Review",
    body: "We identify what may be unclear, outdated, inconsistent or difficult to act on.",
  },
  {
    step: "Clarify",
    body: "We organise your content around the questions visitors need answered.",
  },
  {
    step: "Design",
    body: "We create a professional, mobile-friendly website that reflects your organisation.",
  },
  {
    step: "Refine",
    body: "We review the experience to ensure the information is clear, accessible and easy to use.",
  },
  {
    step: "Equip",
    body: "We provide practical guidance so your team can maintain important information over time.",
  },
];

function NdisWebsiteDesign() {
  return (
    <>
      <section className="bg-surface py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Our core service</Eyebrow>
              <h1 className="mt-5 text-[2.25rem] leading-[1.08] font-extrabold text-ink sm:text-5xl">
                NDIS website design and redesign.
              </h1>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-charcoal">
                For providers who need their online presence to better reflect the organisation they
                have built. This is more than making a website look modern. It is about making your
                organisation easier to understand, easier to trust and easier to contact.
              </p>
              <p className="mt-6 font-display text-lg font-semibold text-deep">
                We begin with clarity before moving into design.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink to="/contact" size="lg">
                  Free Website Review
                </ButtonLink>
                <ButtonLink to="/how-we-help" variant="outline" size="lg">
                  See How We Help
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">What this includes</h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-charcoal">
              Your organisation may have expanded its services, hired more staff or grown beyond the
              website you started with. We help you create or improve a website that keeps pace.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <FeatureList items={includes} columns={2} />
          </Reveal>
        </div>
      </Section>

      <Section tone="surface">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-extrabold text-ink sm:text-4xl">
            A considered process for creating a clearer website.
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {process.map((item, i) => (
            <Reveal key={item.step} delay={i * 50}>
              <li className="border-t border-border pt-6">
                <span className="font-display text-sm font-bold text-sage">Step {i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-ink">{item.step}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-charcoal">{item.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="deep">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Tell us what has changed in your organisation.
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-deep-foreground/85">
              If your NDIS website feels outdated, unclear or disconnected from the quality of your
              service, VitalScale Digital can help.
            </p>
            <div className="mt-9 flex justify-center">
              <ButtonLink to="/contact" variant="onDark" size="lg">
                Free Website Review
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
