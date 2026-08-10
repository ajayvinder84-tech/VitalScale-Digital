import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

import { BentoStory } from "@/components/site/BentoStory";
import { ButtonLink } from "@/components/site/Button";
import { Drift, StaggerGroup } from "@/components/site/Motion";
import { PatternScene } from "@/components/site/PatternScene";
import { Container, Eyebrow, Reveal, Section, SectionHead } from "@/components/site/Section";
import { StepJourney } from "@/components/site/StepJourney";
import { LineReveal } from "@/components/site/TextReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTransformReveal } from "@/lib/motion";

/** Before → after transformation beat wrapper (single, once-only reveal). */
function TransformBeat({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useTransformReveal(ref);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

const SITE_URL = "https://vitalscaledigital.com.au";

export const Route = createFileRoute("/new-providers")({
  head: () => ({
    meta: [
      { title: "Professional Websites for New NDIS Providers | VitalScale" },
      {
        name: "description",
        content:
          "Websites for new and early-stage NDIS providers that clearly explain who you support, what you offer and how people can contact you. RN-led, plain English.",
      },
      { property: "og:title", content: "Professional websites for new NDIS providers" },
      {
        property: "og:description",
        content:
          "Build a website that makes your new NDIS business feel clear, credible and easier to trust.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/new-providers` },
      { property: "og:site_name", content: "VitalScale Digital" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Professional websites for new NDIS providers" },
      {
        name: "twitter:description",
        content:
          "Build a website that makes your new NDIS business feel clear, credible and easier to trust.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/new-providers` }],
  }),
  component: NewProviders,
});

const CTA = "Get Your Free Website Review";

const statBlocks = [
  { label: "Free website review", value: "15 min" },
  { label: "Typical website delivery", value: "4–6 weeks" },
  { label: "Healthcare-informed approach", value: "RN-led" },
];

/** Four concise visual points, replacing the long "disconnected" bullet list. */
const problemPoints = [
  {
    num: "01",
    title: "Profiles don’t match",
    body: "Your Facebook Page, Google Business Profile and website don’t reinforce each other.",
  },
  {
    num: "02",
    title: "Services stay vague",
    body: "Supports are named, but not who they’re for or what they look like day to day.",
  },
  {
    num: "03",
    title: "Key details are buried",
    body: "Service areas, funding information and how to get started are hard to find.",
  },
  {
    num: "04",
    title: "Visitors leave unsure",
    body: "A family member or referral partner looks you up and is left with questions.",
  },
];

/** Four strongest RN-informed considerations. */
const rnConsiderations = [
  "What participants and families need to understand quickly",
  "What makes an unfamiliar provider feel credible online",
  "How referral partners look for services, locations and contact details",
  "How to explain supports in plain, reassuring language",
];

/** Annotations around the provider concept mock-up. */
const annotations = [
  {
    num: "01",
    title: "Clear messaging above the fold",
    body: "Who you support and where you operate, explained plainly.",
  },
  {
    num: "02",
    title: "Honest service information",
    body: "A focused set of services described in everyday language.",
  },
  {
    num: "03",
    title: "Quiet trust cues",
    body: "Registration status, service area and who’s behind the business — without overclaiming.",
  },
  {
    num: "04",
    title: "An easy contact path",
    body: "One obvious next step that works properly on mobile.",
  },
];

const beforePoints = [
  "A long welcome paragraph that says very little",
  "Too many navigation choices",
  "Services listed as terminology",
  "Contact details buried at the bottom",
];

const afterPoints = [
  "One clear line: audience and service area",
  "A short, readable service structure",
  "Trust information where people expect it",
  "One clear way to enquire",
];

const steps = [
  {
    step: "Step one",
    title: "Free Website Review",
    meta: "15 minutes · No cost",
    body: "We review your current website or draft, and where relevant your Facebook Page and Google Business Profile. You’ll receive 2–3 specific observations. No obligation.",
  },
  {
    step: "Step two",
    title: "NDIS Website Plan",
    meta: "$397 · 45–60 minutes",
    body: "A structured planning session covering your audience, services, page structure, trust information and contact pathways — followed by a concise written website plan.",
  },
  {
    step: "Step three",
    title: "New NDIS Provider Website",
    meta: "$2,800–$3,800 · typically 4–6 weeks",
    body: "A professionally designed website and online foundation tailored to your new NDIS business.",
    includes: [
      "Strategy and page structure",
      "Copy for Home, About, Services and Contact",
      "Design, build and mobile-responsive implementation",
      "Clear service, location and contact pathways",
      "Alignment with your Google and social profiles",
      "Visual direction and launch support",
    ],
  },
];

const faqs = [
  {
    q: "“I’m not ready yet.”",
    a: "You don’t need every part of the business finalised. Planning early helps you understand what information you’ll need — and your website should only communicate what is accurate at the time it goes live.",
  },
  {
    q: "“Can’t I build it myself?”",
    a: "You can. The platform is rarely the biggest issue. The harder part is deciding what the website needs to say and how to structure it so people understand your business quickly.",
  },
  {
    q: "“I need participants more than a website.”",
    a: "A website does not guarantee participants or referrals. It is one of the places people use to understand and assess your business, and a clear one makes your services, locations and contact pathway easier to follow.",
  },
  {
    q: "“Do I need a website before I’m registered?”",
    a: "Not necessarily. If you build one while applying for registration or operating as an unregistered provider, the website should accurately describe your current status. VitalScale does not provide registration or compliance advice.",
  },
  {
    q: "“What if I’m on a tight budget?”",
    a: "Start with the free review. If a full website is not the right next step, we would rather tell you that than push you into a larger project unnecessarily.",
  },
];

function ConceptSite({
  name,
  domain,
  headline,
  services,
}: {
  name: string;
  domain: string;
  headline: string;
  services: string;
}) {
  return (
    <div className="mx-auto w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
      {/* Browser chrome */}
      <div className="border-b border-border bg-surface px-4 py-3">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/35" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-full border border-border bg-card px-3 py-1 text-center text-xs text-muted-foreground">
            {domain}
          </span>
          <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-[0.6875rem] tracking-wide text-muted-foreground uppercase">
            Concept only
          </span>
        </div>
      </div>
      <div className="px-6 py-8 md:px-8 md:py-10">
        <p className="text-sm font-semibold text-ink">{name}</p>
        <p className="mt-4 text-xl leading-snug font-extrabold text-ink sm:text-2xl">{headline}</p>
        <p className="mt-4 text-sm text-charcoal">{services}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <span className="inline-flex min-h-10 items-center rounded-[13px] bg-primary px-4 text-sm font-medium text-primary-foreground">
            Make an enquiry
          </span>
          <span className="inline-flex min-h-10 items-center rounded-[13px] border border-border px-4 text-sm font-medium text-charcoal">
            Our services
          </span>
        </div>
      </div>
    </div>
  );
}

function NumberedPoint({
  num,
  title,
  body,
  onDark,
  badge,
}: {
  num: string;
  title: string;
  body: string;
  onDark?: boolean;
  /** Circular primary-light badge behind the number. */
  badge?: boolean;
}) {
  return (
    <div className={badge ? "flex gap-5" : undefined}>
      {badge ? (
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-extrabold text-deep"
        >
          {Number(num)}
        </span>
      ) : null}
      <div>
        {badge ? null : (
          <span
            className={
              onDark
                ? "text-[0.6875rem] font-semibold tracking-[0.16em] text-sage uppercase"
                : "text-[0.6875rem] font-semibold tracking-[0.16em] text-vital uppercase"
            }
          >
            {num}
          </span>
        )}
        <h3
          className={
            onDark ? "mt-2 font-extrabold text-deep-foreground" : "mt-2 font-extrabold text-ink"
          }
        >
          {title}
        </h3>
        {body ? (
          <p
            className={
              onDark
                ? "mt-2 text-[0.9375rem] leading-relaxed text-deep-foreground/80"
                : "mt-2 text-[0.9375rem] leading-relaxed text-charcoal"
            }
          >
            {body}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function MiniList({ items, tone }: { items: string[]; tone: "muted" | "vital" }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-charcoal">
          <span
            aria-hidden="true"
            className={
              tone === "vital"
                ? "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vital"
                : "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50"
            }
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NewProviders() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-24">
            <Reveal>
              <Eyebrow>For new and early-stage NDIS providers</Eyebrow>
              <h1 className="mt-6 text-[2.4rem] leading-[1.05] font-extrabold text-ink sm:text-[3.25rem]">
                Professional websites for new NDIS providers.
              </h1>
              <p className="mt-7 text-xl leading-relaxed text-charcoal">
                Build a website that makes your new NDIS business feel clear, credible and easier to
                trust.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <ButtonLink to="/contact" size="lg">
                  {CTA}
                </ButtonLink>
                <a
                  href="#how-it-works"
                  className="text-[0.9375rem] font-semibold text-vital underline-offset-4 hover:text-deep hover:underline"
                >
                  How it works →
                </a>
              </div>

              <dl className="mt-14 grid gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-3">
                {statBlocks.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                    <dd className="mt-1 text-lg font-extrabold text-ink">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={80} className="min-w-0 w-full max-w-full">
              <ConceptSite
                name="Havenbridge Care"
                domain="havenbridgecare.com.au"
                headline="Everyday support for people in Sydney’s inner west."
                services="Daily living · Community access · Respite care"
              />
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Illustrative concept. Not a VitalScale client or real provider.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The pattern — scroll-led scene, copy always readable */}
      <Section>
        <div className="max-w-3xl">
          <Eyebrow>The pattern we keep seeing</Eyebrow>
          <LineReveal as="h2" className="display-2 mt-5 text-ink">
            Starting an NDIS business is complicated enough. Your website shouldn’t be.
          </LineReveal>
          <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-charcoal">
            <p>
              At some point between policies, services and consultants, you realise you also need a
              website.
            </p>
            <p className="font-semibold text-ink">
              A website doesn’t need to be complicated to feel professional. It needs to make the
              right things clear.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <PatternScene points={problemPoints} />
        </div>
      </Section>

      {/* The approach */}
      <Section tone="deep">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <Eyebrow onDark>The approach</Eyebrow>
            <h2 className="display-2 mt-5 text-deep-foreground">
              We specialise in websites for NDIS providers.
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-deep-foreground/85">
              For new and early-stage providers, we get the online foundations right from the
              beginning — clear messaging, thoughtful structure and a better experience for the
              people trying to understand your business.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-sm font-semibold tracking-wide text-deep-foreground">
              Founded by a Registered Nurse, so our approach considers:
            </p>
            <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {rnConsiderations.map((item, index) => (
                <NumberedPoint key={item} onDark num={`0${index + 1}`} title={item} body="" />
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        Registration status safeguard — COMPLIANCE-CRITICAL.
        Permanently static: no animation, reveal, transition, icon, badge or
        graphic of any kind, now or in any future change.
      */}
      <Section>
        <div className="mx-auto max-w-3xl py-6 md:py-10">
          <Eyebrow>Your registration status</Eyebrow>
          <h2 className="display-2 mt-6 text-ink">
            Your website should say exactly what’s true right now.
          </h2>
          <p className="mt-8 text-[1.0625rem] leading-relaxed text-charcoal">
            If you are applying for registration, newly registered or operating as an unregistered
            provider, your website should describe your current status accurately. Businesses should
            not describe themselves as registered or officially affiliated with the NDIS unless that
            is factually true.
          </p>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-charcoal">
            VitalScale does not provide registration, legal or compliance advice. We help present
            the registration status and service information supplied by the provider clearly and
            consistently. The provider remains responsible for confirming that all public claims are
            accurate and current.
          </p>
        </div>
      </Section>

      {/* Website example — major visual proof */}
      <Section tone="surface">
        <SectionHead
          eyebrow="A closer look"
          title={<>What a clear NDIS website can look like.</>}
          intro="Just a few important things done properly, so someone can understand your business without searching the whole site."
          align="center"
        />
        <div className="mt-16">
          <BentoStory />
        </div>
        <StaggerGroup className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {annotations.map((item) => (
            <div key={item.num} data-reveal-item className="opacity-0">
              <NumberedPoint badge {...item} />
            </div>
          ))}
        </StaggerGroup>
        <p className="mt-12 text-sm leading-relaxed text-muted-foreground">
          Illustrative concept, not a VitalScale client or real provider case study.
        </p>
      </Section>

      {/* Before and after */}
      <Section>
        <SectionHead
          eyebrow="Before and after"
          title={<>The same provider, explained two different ways.</>}
          align="center"
        />
        <TransformBeat className="mt-16 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8">
          <div data-transform-before>
            <div className="rounded-2xl bg-neutral-surface p-8">
              <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                Before
              </p>
              <p className="mt-5 text-xl font-extrabold text-muted-foreground">
                Welcome to our website!!!
              </p>
              <MiniList items={beforePoints} tone="muted" />
            </div>
          </div>
          <div
            aria-hidden="true"
            data-transform-arrow
            className="hidden self-center text-2xl font-extrabold text-sage lg:block"
          >
            →
          </div>
          <div data-transform-after>
            <div className="relative rounded-2xl border border-sage/50 bg-card p-8 shadow-lift">
              <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-vital uppercase">
                After
              </p>
              <p className="mt-5 text-xl leading-snug font-extrabold text-ink">
                Support you can plan around, in Melbourne’s north.
              </p>
              <p className="mt-3 text-sm text-charcoal">
                Daily living · Community access · Support coordination
              </p>
              <MiniList items={afterPoints} tone="vital" />
            </div>
          </div>
        </TransformBeat>
        <p className="mt-12 text-sm leading-relaxed text-muted-foreground">
          Illustrative comparison only. It does not represent measured results from a client
          project.
        </p>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" tone="neutral">
        <SectionHead
          eyebrow="How it works"
          title={<>Three steps from unclear to credible.</>}
          intro="Staged so you can understand what you need before committing to a larger build."
        />
        <StepJourney steps={steps} />

        <div className="mt-16">
          <ButtonLink to="/contact" size="lg">
            {CTA}
          </ButtonLink>
          <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-charcoal">
            No lock-in marketing retainer. Just a clear website and digital foundation that can grow
            as your business grows.
          </p>
        </div>
      </Section>

      {/* Honest answers */}
      <Section id="faq">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <Eyebrow>Honest answers</Eyebrow>
            <h2 className="display-2 mt-5 text-ink">What you’re probably thinking.</h2>
          </Reveal>
          <Reveal delay={80}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`item-${index}`}>
                  <AccordionTrigger className="py-6 text-left text-lg font-extrabold text-ink">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[1.0625rem] leading-relaxed text-charcoal">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      {/* Founder */}
      <Section id="founder" tone="surface">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-20">
          <Reveal>
            <img
              src="/images/founder.png"
              alt="Ajay Singh, Registered Nurse and founder of VitalScale Digital"
              loading="lazy"
              className="w-full max-w-sm rounded-2xl border border-border object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={80}>
            <Eyebrow>The founder</Eyebrow>
            <h2 className="display-2 mt-5 text-ink">
              Founded by a Registered Nurse who understands healthcare communication.
            </h2>
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-charcoal">
              <p>
                I’m Ajay Singh, a Registered Nurse with experience in community and healthcare
                nursing.
              </p>
              <p>
                That background taught me how important clear information becomes when people are
                uncertain, comparing options or deciding what to do next.
              </p>
              <p>
                VitalScale grew from seeing the same pattern repeatedly: new providers invest
                heavily in setting up their business, then the website becomes an afterthought.
              </p>
              <p className="text-xl font-extrabold text-ink">
                We don’t sell websites. We build trust.
              </p>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Ajay Singh, RN · Founder, VitalScale Digital
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Next step */}
      <Section tone="deep">
        <div className="mx-auto max-w-3xl py-8 text-center md:py-14">
          <Reveal>
            <Eyebrow onDark>Next step</Eyebrow>
            <h2 className="display-2 mt-6 text-deep-foreground">
              Ready for a website that feels clear and credible?
            </h2>
            <p className="mt-8 text-[1.0625rem] leading-relaxed text-deep-foreground/85">
              Start with a free review and find out what your website really needs.
            </p>
            <div className="mt-10 flex justify-center">
              <ButtonLink to="/contact" variant="onDark" size="lg">
                {CTA}
              </ButtonLink>
            </div>
            <p className="mt-8 text-sm leading-relaxed text-deep-foreground/70">
              We review a small number of websites each week so each one can be looked at properly.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
