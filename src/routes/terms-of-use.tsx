import { createFileRoute } from "@tanstack/react-router";

import { Container, Eyebrow, Reveal, Section } from "@/components/site/Section";

const SITE_URL = "https://vitalscaledigital.com.au";

export const Route = createFileRoute("/terms-of-use")({
  head: () => ({
    meta: [
      { title: "Terms of Use | VitalScale Digital" },
      {
        name: "description",
        content:
          "Website Terms of Use for VitalScale Digital. Paid projects are governed by a separate proposal, scope of work or service agreement.",
      },
      { property: "og:title", content: "Terms of Use | VitalScale Digital" },
      {
        property: "og:description",
        content:
          "Website Terms of Use for VitalScale Digital. Paid projects are governed by a separate proposal, scope of work or service agreement.",
      },
      { property: "og:url", content: `${SITE_URL}/terms-of-use` },
      { property: "og:site_name", content: "VitalScale Digital" },
      { name: "twitter:title", content: "Terms of Use | VitalScale Digital" },
      {
        name: "twitter:description",
        content:
          "Website Terms of Use for VitalScale Digital. Paid projects are governed by a separate proposal, scope of work or service agreement.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms-of-use` }],
  }),
  component: TermsOfUse,
});

function H2({ children }: { children: string }) {
  return <h2 className="display-3 mt-14 text-ink first:mt-0">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-[0.9375rem] leading-relaxed text-charcoal">{children}</p>;
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="mt-5 space-y-3">{children}</ul>;
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[0.9375rem] leading-relaxed text-charcoal">
      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vital" />
      <span>{children}</span>
    </li>
  );
}

function TermsOfUse() {
  return (
    <>
      <section className="bg-surface py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Legal</Eyebrow>
              <h1 className="mt-5 text-[2.25rem] leading-[1.08] font-extrabold text-ink sm:text-5xl">
                Website Terms of Use
              </h1>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-charcoal">
                These terms govern the use of the VitalScale Digital website. Paid projects are
                governed by the separate proposal, scope of work or service agreement accepted for
                that engagement.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section>
        <div className="max-w-3xl">
          <H2>About these terms</H2>
          <P>
            These Website Terms of Use apply when you access or use www.vitalscaledigital.com.au. If
            you engage VitalScale Digital for paid work, the scope, fees, timelines, payment terms,
            intellectual-property arrangements and other project conditions will be governed by the
            written proposal or service agreement accepted for that engagement. If there is an
            inconsistency, the accepted project agreement will apply to the paid engagement.
          </P>
          <P>
            VitalScale Digital (ABN: 28 337 767 445, "we", "us", "our") is a Melbourne-based website
            and online-presence specialist working primarily with NDIS providers.
          </P>

          <H2>Our services</H2>
          <P>
            VitalScale Digital provides website and online-presence services for NDIS providers and,
            selectively, healthcare and care-focused businesses. This is general information only
            and is not a commitment to provide every listed service in every engagement. The
            specific scope, deliverables, fees, and timelines for any engagement will be set out in
            a separate written agreement or proposal provided to you before any work commences.
          </P>

          <H2>Free Website Review</H2>
          <P>
            We offer a complimentary Free Website Review for eligible NDIS providers and,
            selectively, care-focused businesses. This review is:
          </P>
          <List>
            <Item>Provided at no cost and with no obligation to engage our services</Item>
            <Item>
              Based on the information reasonably available at the time, including information you
              provide and publicly available information
            </Item>
            <Item>Not professional legal, compliance or clinical advice</Item>
            <Item>Limited to one per organisation unless we agree otherwise</Item>
          </List>
          <P>
            We may decline or limit a request, including where a submission is a duplicate,
            incomplete, irrelevant to our services, or inappropriate.
          </P>

          <H2>Intellectual property</H2>
          <P>
            Unless otherwise stated, website content created by VitalScale Digital is owned by
            VitalScale Digital. Certain fonts, software, images, trademarks and other materials may
            be owned or licensed by third parties and remain subject to their respective terms.
          </P>
          <P>
            You may not reproduce, distribute, or create derivative works from content on this
            website without our express written permission, other than as permitted by law.
          </P>
          <P>
            Intellectual property relating to paid client projects is governed by the accepted
            project agreement for that engagement, not by these Website Terms of Use.
          </P>

          <H2>Website use</H2>
          <P>
            You agree to use our website only for lawful purposes and in a manner that does not
            infringe the rights of others. You must not:
          </P>
          <List>
            <Item>Use the website in a way that could damage, disable, or impair it</Item>
            <Item>
              Attempt to gain unauthorised access to any part of the website or its related systems
            </Item>
            <Item>
              Submit false, misleading, or harmful information through any form on the website
            </Item>
            <Item>Use automated tools to scrape or extract content from the website</Item>
          </List>

          <H2>Accuracy of information</H2>
          <P>
            We take reasonable care to keep the information on this website accurate and current.
            However, this content is provided for general informational purposes only and should not
            be relied upon as professional, legal, financial, compliance or clinical advice for your
            specific circumstances.
          </P>
          <P>
            Outcomes from website, messaging, or visibility work (such as search rankings, enquiry
            volume, or website traffic) are influenced by many factors outside our control. We do
            not guarantee specific results, and any estimates we provide are based on professional
            judgement, not guarantees.
          </P>

          <H2>Third-party links</H2>
          <P>
            Our website may contain links to third-party websites. These links are provided for
            convenience only and do not constitute an endorsement. We are not responsible for the
            content, privacy practices, or terms of any third-party website. Details of the specific
            third-party services used to operate this website are set out in our Privacy Policy.
          </P>

          <H2>Liability</H2>
          <P>
            To the extent permitted by law, VitalScale Digital is not responsible for indirect or
            consequential loss arising solely from use of the general information on this website or
            from events outside our reasonable control.
          </P>
          <P>
            Nothing in these terms excludes, restricts or modifies any right, remedy, consumer
            guarantee or liability that cannot lawfully be excluded under the Australian Consumer
            Law or other applicable law.
          </P>
          <P>
            These Website Terms of Use do not establish liability limits for paid projects.
            Liability terms for a paid engagement are set out in the accepted project agreement for
            that engagement.
          </P>

          <H2>Governing law</H2>
          <P>
            These Terms are governed by the laws of Victoria, Australia, subject to the jurisdiction
            of the courts and tribunals of Victoria and any other jurisdiction that applicable law
            requires.
          </P>

          <H2>Contact</H2>
          <P>
            VitalScale Digital
            <br />
            Email:{" "}
            <a
              href="mailto:info@vitalscaledigital.com.au"
              className="text-vital underline underline-offset-4"
            >
              info@vitalscaledigital.com.au
            </a>
            <br />
            Phone: 0406 970 615
            <br />
            ABN: 28 337 767 445
            <br />
            Melbourne, Victoria, Australia
          </P>

          <div className="hairline mt-12" />
          <p className="mt-6 text-sm text-muted-foreground">
            Effective date / Last updated: 10 August 2026
          </p>
        </div>
      </Section>
    </>
  );
}
