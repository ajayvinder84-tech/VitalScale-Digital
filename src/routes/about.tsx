import { createFileRoute } from "@tanstack/react-router";

import { ButtonLink } from "@/components/site/Button";
import { Container, Eyebrow, FeatureList, Reveal, Section } from "@/components/site/Section";
import { LineReveal } from "@/components/site/TextReveal";

const SITE_URL = "https://vitalscaledigital.com.au";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VitalScale Digital | Healthcare-Informed Website Design" },
      {
        name: "description",
        content:
          "VitalScale Digital is founded by a Registered Nurse with healthcare and community nursing experience, helping NDIS providers communicate with clarity.",
      },
      { property: "og:title", content: "About VitalScale Digital" },
      {
        property: "og:description",
        content:
          "Led by someone who has worked in care, not just in marketing. Healthcare-informed website design for NDIS providers.",
      },
      { property: "og:url", content: "https://vitalscaledigital.com.au/about" },
      { property: "og:site_name", content: "VitalScale Digital" },
      { property: "og:image", content: `${SITE_URL}/images/vitalscale-digital-logo.png` },
      { name: "twitter:image", content: `${SITE_URL}/images/vitalscale-digital-logo.png` },
      { name: "twitter:title", content: "About VitalScale Digital" },
      {
        name: "twitter:description",
        content:
          "Led by someone who has worked in care, not just in marketing. Healthcare-informed website design for NDIS providers.",
      },
    ],
    links: [{ rel: "canonical", href: "https://vitalscaledigital.com.au/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="bg-surface py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>About VitalScale Digital</Eyebrow>
              <h1 className="mt-5 text-[2.25rem] leading-[1.08] font-extrabold text-ink sm:text-5xl">
                Clear communication matters.
              </h1>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-charcoal">
                Good services can be difficult to choose when the information online is unclear.
                VitalScale Digital was created to help providers communicate their value with
                greater clarity and confidence.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-border bg-pale">
              <img
                src="/images/founder.png"
                alt="Portrait of the founder of VitalScale Digital, a Registered Nurse with healthcare and community nursing experience"
                width={1129}
                height={1442}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={80} className="order-1 lg:order-2">
            <Eyebrow>The VitalScale perspective</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold text-ink sm:text-4xl">
              Led by someone who’s worked in care, not just in marketing.
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-charcoal">
              VitalScale Digital is founded by a Registered Nurse with healthcare and community
              nursing experience. That background shapes how we approach website structure, clarity,
              accessibility and the questions people may have before taking the next step.
            </p>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-charcoal">
              We understand that healthcare and disability-related information needs to be
              communicated carefully. It should be clear without being cold, professional without
              being full of jargon and approachable without making exaggerated promises.
            </p>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-charcoal">
              We combine website strategy, plain-language messaging and healthcare-informed thinking
              to create online experiences that are easier for people to understand and use.
            </p>
            <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
              VitalScale Digital provides website design and digital communication services. We do
              not provide NDIS registration, audit, legal, clinical or compliance advice.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Eyebrow>How that shapes the work</Eyebrow>
            <LineReveal as="h2" className="mt-5 text-3xl font-extrabold text-ink sm:text-4xl">
              Practical thinking from a care background.
            </LineReveal>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-charcoal">
              That healthcare background means we start by thinking about what a visitor actually
              needs to understand before they feel confident taking the next step. We consider
              accessibility, clarity under stress, and the way real people navigate care-related
              information.
            </p>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-charcoal">
              This keeps the work grounded in practical outcomes rather than marketing trends or
              unnecessary complexity.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="mt-12 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Principles
            </h3>
            <div className="mt-5">
              <FeatureList
                items={[
                  "Plain language over jargon",
                  "Real work over exaggerated claims",
                  "Clear scope and expectations",
                  "Focused experience in NDIS and care businesses",
                  "Quality over unnecessary complexity",
                ]}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="neutral">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              Real work, plainly shown.
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-charcoal">
              We believe credibility should come from real work and clear communication—not inflated
              claims. As VitalScale grows, this section will include genuine project examples,
              client feedback and documented outcomes where permission has been provided.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
              <img
                src="/images/elite-iv-site.jpg"
                alt="Homepage of the Elite IV Infusions website built by VitalScale Digital"
                width={1280}
                height={900}
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-deep p-2">
                <img
                  src="/images/elite-iv-logo.png"
                  alt="Elite IV Infusions logo"
                  width={544}
                  height={612}
                  loading="lazy"
                  className="h-full w-auto object-contain"
                />
              </span>
              <h3 className="text-2xl font-extrabold text-ink">Elite IV Infusions</h3>
            </div>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-charcoal">
              VitalScale Digital completed the website for Elite IV Infusions, a healthcare
              business.
            </p>
            <p className="mt-4">
              <a
                href="https://eliteivinfusion.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-vital underline underline-offset-4 hover:text-deep"
              >
                Visit the live website
              </a>
            </p>
            <div className="mt-9 flex justify-center">
              <ButtonLink to="/contact" size="lg">
                Free Website Review
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
