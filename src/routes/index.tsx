import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/site/Button";
import { DotField } from "@/components/site/DotField";
import { HeroVisual } from "@/components/site/HeroVisual";
import { Container, Eyebrow, Reveal, Section, SectionHead } from "@/components/site/Section";
import { Spotlight } from "@/components/site/Spotlight";
import { LineReveal } from "@/components/site/TextReveal";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NDIS Website Design and Redesign | VitalScale Digital" },
      {
        name: "description",
        content:
          "VitalScale Digital designs and redesigns websites for NDIS providers who want to be easier to understand and easier to trust.",
      },
      { property: "og:title", content: "NDIS Website Design and Redesign | VitalScale Digital" },
      {
        property: "og:description",
        content:
          "VitalScale Digital designs and redesigns websites for NDIS providers who want to be easier to understand and easier to trust.",
      },
      { property: "og:url", content: "https://vitalscaledigital.com.au/" },
      { property: "og:site_name", content: "VitalScale Digital" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NDIS Website Design and Redesign | VitalScale Digital" },
      {
        name: "twitter:description",
        content:
          "VitalScale Digital designs and redesigns websites for NDIS providers who want to be easier to understand and easier to trust.",
      },
    ],
    links: [{ rel: "canonical", href: "https://vitalscaledigital.com.au/" }],
  }),
  component: Home,
});

const problems = [
  "Difficult to update",
  "Unclear about your services",
  "Too generic to communicate your difference",
  "Missing important trust information",
  "Hard to use on mobile",
  "Inconsistent with your Google or social media information",
  "Producing questions your website should already answer",
  "Failing to reflect the quality of your organisation",
];

const coreServiceItems = [
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

const faqs = [
  {
    q: "Do you only work with registered NDIS providers?",
    a: "We work with NDIS providers at different stages, including established providers, growing organisations and selected early-stage businesses. New and early-stage providers can visit our dedicated new-provider pathway for more relevant information.",
  },
  {
    q: "Do you only build new websites?",
    a: "No. We can help with a complete new website, a strategic redesign or improvements to an existing website.",
  },
  {
    q: "Do you provide website copy?",
    a: "Yes. Clear messaging is an important part of the website process. We can help structure and refine information about your services, organisation, locations and next steps.",
  },
  {
    q: "Do you provide social media management?",
    a: "Our primary service is NDIS website design and redesign. We can review social media profiles and public-facing information for consistency, but we do not position ourselves as a daily social media management agency.",
  },
  {
    q: "Can you help with Google Business Profile information?",
    a: "We can review whether your Google Business Profile supports the same clear and credible impression as your website. This may include checking service descriptions, contact details, locations and consistency.",
  },
  {
    q: "Do you provide NDIS registration or compliance advice?",
    a: "No. VitalScale Digital provides website design and digital communication services. We do not provide NDIS registration, audit, legal, clinical or compliance advice.",
  },
  {
    q: "Can you guarantee more leads or referrals?",
    a: "No website can guarantee participant enquiries or referrals. Our focus is to help you create a clearer, more credible and easier-to-use digital experience that supports better-informed decisions.",
  },
  {
    q: "How much does a website cost?",
    a: "Website pricing depends on the size of the website, the amount of content required, the number of services and locations, and the level of strategy and design support involved. After an initial conversation, we can recommend an appropriate scope and provide a clear proposal.",
  },
];

/** Light, borderless inline list — replaces box-heavy card grids. */
function QuietList({ items, onDark = false }: { items: string[]; onDark?: boolean }) {
  return (
    <ul
      className={
        onDark
          ? "grid gap-x-10 gap-y-2.5 text-[0.9375rem] text-deep-foreground/80 sm:grid-cols-2"
          : "grid gap-x-10 gap-y-2.5 text-[0.9375rem] text-charcoal sm:grid-cols-2"
      }
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <span
            aria-hidden="true"
            className={
              onDark
                ? "mt-2 h-1 w-1 shrink-0 rounded-full bg-sage"
                : "mt-2 h-1 w-1 shrink-0 rounded-full bg-sage"
            }
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Home() {
  return (
    <>
      {/* Hero — larger visual, generous air */}
      <section className="relative overflow-hidden pt-16 pb-32 md:pt-24 md:pb-40 lg:pt-28 lg:pb-48">
        <DotField />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-32 -z-10 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(closest-side,var(--pale),transparent_78%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-24 -z-10 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,var(--surface),transparent_80%)]"
        />
        <Container>
          <div className="grid items-center gap-16 md:gap-20 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:gap-20 xl:gap-28">
            <div>
              <Reveal>
                <Eyebrow>NDIS website design and redesign</Eyebrow>
                <LineReveal
                  as="h1"
                  className="display-1 mt-7 max-w-[24ch] text-ink"
                  onScroll={false}
                  delay={0.15}
                >
                  Make your NDIS business easier to understand – and easier to trust.
                </LineReveal>
              </Reveal>
              <Reveal delay={80}>
                <p className="lead mt-9 max-w-[38rem]">
                  VitalScale designs and redesigns websites for NDIS providers, combining clear
                  messaging and healthcare-informed thinking. We help your website communicate what
                  you do, who you support and how people can take the next step.
                </p>
              </Reveal>
              <Reveal delay={150}>
                <div className="mt-11 flex flex-wrap items-center gap-3">
                  <ButtonLink to="/contact" size="lg">
                    Free Website Review
                  </ButtonLink>
                  <ButtonLink to="/how-we-help" variant="outline" size="lg">
                    See How We Help
                  </ButtonLink>
                </div>
                <p className="mt-8 text-sm text-muted-foreground">
                  For established, growing and early-stage NDIS providers.
                </p>
              </Reveal>
            </div>

            <Reveal
              delay={120}
              className="mx-auto w-full max-w-[18.5rem] sm:max-w-[25rem] lg:mr-0 lg:ml-auto lg:max-w-none"
            >
              <Spotlight className="overflow-visible rounded-[40px]">
                <HeroVisual />
              </Spotlight>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Problem — editorial, light list */}
      <Section tone="surface">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-28">
          <Reveal>
            <SectionHead
              eyebrow="When your website falls behind"
              title="Good care doesn’t always look good online."
            />
            <div className="lead measure mt-8 space-y-6">
              <p>
                Your organisation may be experienced, capable and trusted in the community—but your
                website may still appear unclear, outdated or too generic.
              </p>
              <p>
                Your services, team and focus may have all evolved, but your website may still
                describe an earlier version of your business.
              </p>
            </div>
            <p className="display-3 mt-9 text-deep">VitalScale helps close that gap.</p>
          </Reveal>

          <Reveal delay={80} className="lg:pt-20">
            <p className="text-sm font-semibold tracking-wide text-muted-foreground">
              Your website may be:
            </p>
            <div className="mt-6">
              <QuietList items={problems} />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Elite IV proof — compact link to /work */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Reveal>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-deep p-2.5">
              <img
                src="/images/elite-iv-logo.png"
                alt="Elite IV Infusions logo"
                width={544}
                height={612}
                loading="lazy"
                className="h-full w-auto object-contain"
              />
            </span>
          </Reveal>
          <Reveal delay={60}>
            <Eyebrow>Healthcare project experience</Eyebrow>
            <LineReveal as="h2" className="display-3 mt-4 text-ink">
              Elite IV Infusions
            </LineReveal>
            <p className="measure mt-4 text-base leading-relaxed text-charcoal">
              VitalScale Digital completed the website for Elite IV Infusions, a healthcare
              business.
            </p>
            <p className="mt-4">
              <ButtonLink to="/work" variant="quiet">
                View the project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Core service */}
      <Section tone="deep">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-24">
          <Reveal>
            <SectionHead
              onDark
              eyebrow="Our core service"
              title="NDIS website design and redesign."
              intro={
                <p>
                  For providers who need their online presence to better reflect the organisation
                  they have built.
                </p>
              }
            />
            <div className="lead measure mt-7 space-y-6 text-deep-foreground/85">
              <p>
                Your organisation may have expanded its services, hired more staff or grown beyond
                the website you started with. VitalScale Digital helps NDIS providers create or
                improve their websites so their online presence better reflects the organisation
                they have built.
              </p>
              <p>
                This is more than making a website look modern. It is about making your organisation
                easier to understand, easier to trust and easier to contact.
              </p>
            </div>
            <p className="display-3 mt-9 text-sage">
              We begin with clarity before moving into design.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink to="/contact" variant="onDark" size="lg">
                Free Website Review
              </ButtonLink>
              <ButtonLink to="/ndis-website-design" variant="ghostDark" size="lg">
                Discuss Your Website
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:pt-4">
            <h3 className="text-sm font-semibold tracking-[0.12em] text-sage uppercase">
              VitalScale Digital can help with
            </h3>
            <div className="mt-7 border-t border-sage/25 pt-7">
              <QuietList items={coreServiceItems} onDark />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* How We Help — single link to the dedicated page */}
      <Section tone="surface" className="py-20 md:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="How we help"
              title="Clearer websites, stronger credibility, easier next steps."
            />
            <p className="lead measure mt-7 text-charcoal">
              We help NDIS providers answer the questions visitors are already asking — what you
              provide, who you support, where you operate and how to take the next step — through
              Website Strategy & Design, Messaging & Digital Clarity, and Visibility & Reputation.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <ButtonLink to="/how-we-help" variant="outline" size="lg" className="shrink-0">
              See how we help
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* Founder — brief, with link to full bio */}
      <Section tone="neutral">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-24">
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-5 -z-10 rounded-[36px] bg-[radial-gradient(70%_70%_at_50%_30%,var(--pale),transparent_76%)]"
              />
              <div className="overflow-hidden rounded-2xl bg-pale">
                <img
                  src="/images/founder.png"
                  alt="Portrait of the founder of VitalScale Digital, a Registered Nurse with healthcare and community nursing experience"
                  width={1129}
                  height={1442}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="order-1 lg:order-2">
            <SectionHead
              eyebrow="The VitalScale perspective"
              title="Led by someone who’s worked in care, not just in marketing."
            />
            <p className="lead measure mt-8 text-charcoal">
              Led by a Registered Nurse with healthcare and community nursing experience — not just
              a marketing background.
            </p>
            <div className="mt-8">
              <ButtonLink to="/about" variant="outline">
                Learn more about VitalScale
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* New provider pathway — compact branch */}
      <Section className="py-14 md:py-16 lg:py-20">
        <Reveal>
          <div className="grid gap-8 border-y border-border py-10 md:grid-cols-[minmax(0,1.3fr)_auto] md:items-center md:gap-12">
            <div className="min-w-0">
              <Eyebrow>For new and early-stage providers</Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">
                Are you a new or early-stage NDIS provider?
              </h2>
              <p className="measure mt-4 text-base leading-relaxed text-charcoal">
                Explore our dedicated pathway for building your first credible online presence.
              </p>
            </div>
            <ButtonLink to="/new-providers" variant="outline" size="lg" className="shrink-0">
              Explore the New-Provider Pathway
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-24">
          <Reveal>
            <h2 className="display-2 text-ink">Frequently asked questions.</h2>
          </Reveal>
          <Reveal delay={60}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="py-6 text-left font-display text-[1.0625rem] font-semibold text-ink hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="measure pb-7 text-base leading-relaxed text-charcoal">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="deep" className="py-28 md:py-36 lg:py-44">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="display-2 text-deep-foreground">
              Your website should reflect the organisation you have built.
            </h2>
            <p className="lead mt-8 text-deep-foreground/85">
              If your NDIS website feels outdated, unclear or disconnected from the quality of your
              service, VitalScale Digital can help. Tell us what has changed in your organisation
              and where your current website is falling behind.
            </p>
            <div className="mt-10 flex justify-center">
              <ButtonLink to="/contact" variant="onDark" size="lg">
                Free Website Review
              </ButtonLink>
            </div>
            <p className="mt-7 text-sm leading-relaxed text-deep-foreground/70">
              No obligation. We’ll look at where your current website is falling behind and what
              actually needs improving.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
