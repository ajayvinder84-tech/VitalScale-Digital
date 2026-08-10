import { createFileRoute } from "@tanstack/react-router";

import { ButtonLink } from "@/components/site/Button";
import { StaggerGroup } from "@/components/site/Motion";
import { Card, Container, Eyebrow, FeatureList, Reveal, Section } from "@/components/site/Section";

export const Route = createFileRoute("/how-we-help")({
  head: () => ({
    meta: [
      { title: "How We Help NDIS Providers | VitalScale Digital" },
      {
        name: "description",
        content:
          "How VitalScale Digital helps NDIS providers with clearer messaging, stronger credibility, easier next steps and a more consistent digital presence.",
      },
      { property: "og:title", content: "How We Help NDIS Providers | VitalScale Digital" },
      {
        property: "og:description",
        content:
          "Clearer messaging, stronger credibility and easier next steps for NDIS providers.",
      },
      { property: "og:url", content: "https://vitalscaledigital.com.au/how-we-help" },
      { property: "og:site_name", content: "VitalScale Digital" },
      { name: "twitter:title", content: "How We Help NDIS Providers | VitalScale Digital" },
      {
        name: "twitter:description",
        content:
          "Clearer messaging, stronger credibility and easier next steps for NDIS providers.",
      },
    ],
    links: [{ rel: "canonical", href: "https://vitalscaledigital.com.au/how-we-help" }],
  }),
  component: HowWeHelp,
});

const capabilities = [
  {
    title: "Clearer messaging",
    body: "Explain your services in plain English so visitors can quickly understand what you offer, who you support and where you operate.",
  },
  {
    title: "Stronger credibility",
    body: "Present your organisation, team, services and contact information in a way that feels genuine, professional and trustworthy.",
  },
  {
    title: "Easier next steps",
    body: "Make it simpler for people to ask a question, contact your team or begin an enquiry.",
  },
  {
    title: "Better representation",
    body: "Ensure your website reflects the maturity, experience and quality of your organisation.",
  },
  {
    title: "More consistent information",
    body: "Help your website and wider digital touchpoints communicate the same clear and credible message.",
  },
];

const reviewItems = [
  "Google Business Profile information",
  "Social profile and messaging consistency",
  "Reviews and trust-signal presentation",
  "Service and location information",
  "Enquiry and contact pathways",
  "Website and profile consistency",
  "Mobile usability",
  "Appropriate accessibility considerations",
];

const fit = [
  "Your website looks older than your organisation",
  "Your services are difficult to explain clearly",
  "Your team has expanded since the website was created",
  "You operate across multiple locations",
  "Your website feels too generic",
  "Visitors ask questions your website should already answer",
  "Your Google profile or social media information is outdated",
  "You want a more professional first impression",
  "Your website does not reflect the quality of your organisation",
  "You are ready to improve your digital presence but do not know where to begin",
];

function HowWeHelp() {
  return (
    <>
      <section className="bg-surface py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>How we help</Eyebrow>
              <h1 className="mt-5 text-[2.25rem] leading-[1.08] font-extrabold text-ink sm:text-5xl">
                A clearer website creates a more confident first impression.
              </h1>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-charcoal">
                Your website should make the answers people are looking for easier to find—not make
                them work for them.
              </p>
              <div className="mt-9">
                <ButtonLink to="/contact" size="lg">
                  Free Website Review
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section>
        <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" distance={22}>
          {capabilities.map((cap, i) => (
            <div key={cap.title} data-reveal-item className="opacity-0">
              <Card interactive className="h-full">
                <span className="text-sm font-semibold text-sage">0{i + 1}</span>
                <h2 className="mt-4 font-display text-xl font-bold text-ink">{cap.title}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-charcoal">{cap.body}</p>
              </Card>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      <Section tone="surface">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <Eyebrow>The wider digital experience</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold text-ink sm:text-4xl">
              Your website doesn’t exist in isolation.
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-charcoal">
              Someone may discover your organisation through Google, visit your website, check your
              social media, read your reviews and compare what they find before deciding whether to
              contact you.
            </p>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted-foreground">
              We do not position ourselves as a daily social media management or advertising agency.
              Our focus is your website first, with the important digital touchpoints around it
              considered as part of the wider trust experience.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-2xl border border-border bg-card p-7 md:p-8">
              <p className="text-sm font-semibold tracking-wide text-charcoal">We can review:</p>
              <div className="mt-6">
                <FeatureList items={reviewItems} />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-24">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              For NDIS providers who know their online presence could be clearer.
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-muted-foreground">
              You do not need to start with a complete digital marketing program. You may simply
              need a clearer website that reflects where your organisation is now.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <FeatureList items={fit} columns={2} />
          </Reveal>
        </div>
      </Section>

      <Section tone="deep">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Let’s look at what actually needs improving.
            </h2>
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
