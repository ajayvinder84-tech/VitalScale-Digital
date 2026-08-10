import { createFileRoute } from "@tanstack/react-router";

import { Container, Eyebrow, Reveal, Section } from "@/components/site/Section";

const SITE_URL = "https://vitalscaledigital.com.au";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | VitalScale Digital" },
      {
        name: "description",
        content:
          "How VitalScale Digital collects, uses, and protects your personal information, including information submitted through a Free Website Review request.",
      },
      { property: "og:title", content: "Privacy Policy | VitalScale Digital" },
      {
        property: "og:description",
        content: "How VitalScale Digital collects, uses, and protects your personal information.",
      },
      { property: "og:url", content: `${SITE_URL}/privacy-policy` },
      { property: "og:site_name", content: "VitalScale Digital" },
      { name: "twitter:title", content: "Privacy Policy | VitalScale Digital" },
      {
        name: "twitter:description",
        content: "How VitalScale Digital collects, uses, and protects your personal information.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy-policy` }],
  }),
  component: PrivacyPolicy,
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

function PrivacyPolicy() {
  return (
    <>
      <section className="bg-surface py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Privacy</Eyebrow>
              <h1 className="mt-5 text-[2.25rem] leading-[1.08] font-extrabold text-ink sm:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-charcoal">
                How VitalScale Digital collects, uses, and protects your personal information.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section>
        <div className="max-w-3xl">
          <H2>About this policy</H2>
          <P>
            VitalScale Digital (ABN: 28 337 767 445, “we”, “us”, “our”) is a Melbourne-based website
            and online-presence specialist working primarily with NDIS providers. This policy
            explains how we handle personal information collected through our website, services and
            business outreach activities.
          </P>

          <H2>What information we collect</H2>
          <P>We may collect the following:</P>
          <List>
            <Item>
              Contact information — your name, email address, and your business or organisation name
            </Item>
            <Item>
              Enquiry details — the content of any message or request you submit through our
              website, including Free Website Review requests
            </Item>
            <Item>
              Website information — including the website address or URL submitted through a Free
              Website Review request
            </Item>
            <Item>
              Communication records — records of email or other correspondence if you contact us
              directly
            </Item>
            <Item>
              Business contact information — such as a person’s name, role, business name,
              professional profile and publicly available business contact details
            </Item>
          </List>
          <P>We do not currently use website analytics or visitor-tracking tools.</P>
          <P>
            Our website is not intended for the submission of sensitive personal information,
            including participant or health information. Please do not include sensitive or
            confidential information in the optional message field. If such information is submitted
            voluntarily, we will handle it only as reasonably necessary to respond and take
            appropriate steps regarding its retention or deletion.
          </P>

          <H2>How we collect information</H2>
          <P>We collect personal information through:</P>
          <List>
            <Item>
              The Free Website Review form or contact form on our website, when you voluntarily
              submit a request
            </Item>
            <Item>Direct email or other communications you initiate with us</Item>
            <Item>
              Professional platforms, freelance marketplaces, networking platforms, public business
              directories and other publicly available sources — for example, through normal use of
              platforms such as LinkedIn or Upwork, viewing project listings or professional
              profiles, or accessing publicly available business contact details
            </Item>
          </List>
          <P>
            We obtain business contact information through ordinary use of these platforms and
            public sources. We do not obtain private information directly from any platform, and
            nothing in this policy should be read as claiming that any platform shares private user
            data with us.
          </P>

          <H2>How we use your information</H2>
          <P>We use the personal information we collect to:</P>
          <List>
            <Item>
              Respond to your enquiry and, where relevant, provide the services you’ve requested
            </Item>
            <Item>Carry out the Free Website Review you’ve asked for</Item>
            <Item>
              Where a business contact appears reasonably relevant to our work, introduce VitalScale
              Digital’s services or respond to project opportunities
            </Item>
            <Item>Comply with our legal obligations</Item>
          </List>
          <P>
            We may send service-related communications and relevant follow-up about an enquiry.
            Business outreach and marketing communications will only be sent where permitted by
            applicable law and platform rules, and recipients may ask us not to contact them again.
          </P>
          <P>
            Any business outreach we conduct is carried out subject to applicable Australian
            privacy, spam and electronic messaging laws, and the terms of use of the relevant
            platform. Being publicly visible on a platform or directory does not, by itself, give us
            unrestricted permission to contact you, and we aim to make outreach relevant and
            reasonable.
          </P>

          <H2>Your outreach choice</H2>
          <P>
            If we contact you about our services and you’d prefer we didn’t, you may ask us not to
            contact you again at any time. We will take reasonable steps to record and respect that
            request.
          </P>

          <H2>Free Website Review — limits</H2>
          <P>
            The Free Website Review is offered at our discretion and is limited to one per
            organisation, unless we agree otherwise. We may decline or limit a request, including
            where a submission is a duplicate, incomplete, irrelevant to our services, or
            inappropriate.
          </P>

          <H2>Disclosure of your information</H2>
          <P>
            We do not sell, rent, or trade your personal information. We may share it only in these
            circumstances:
          </P>
          <List>
            <Item>
              Service providers — we use third-party providers to operate this website and process
              enquiries, currently including:
              <ul className="mt-3 space-y-2 pl-4">
                <li className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-border"
                  />
                  <span>Cloudflare — for website hosting, content delivery, and security</span>
                </li>
                <li className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-border"
                  />
                  <span>
                    Web3Forms — for processing Free Website Review and contact-form submissions
                  </span>
                </li>
              </ul>
              <span className="mt-3 block">
                These providers handle information under their own terms and privacy policies. Their
                services may involve processing or storing information outside Australia.
              </span>
            </Item>
            <Item>
              Legal requirements — where we are required to disclose information by law, regulation,
              or legal process.
            </Item>
          </List>

          <H2>Data storage and security</H2>
          <P>
            Enquiries submitted through our website are transmitted to us via our form-submission
            provider and stored in our email inbox. We take reasonable steps to protect the
            information we hold, but no method of transmission or storage over the internet is
            completely secure, and we cannot guarantee absolute security.
          </P>

          <H2>Retention of information</H2>
          <P>
            We retain personal information for as long as reasonably necessary for the purpose it
            was collected — typically for the duration of any engagement with you, and for a
            reasonable period afterward — and delete or de-identify it when it’s no longer needed.
          </P>

          <H2>Cookies and analytics</H2>
          <P>
            We do not use analytics or advertising cookies on this website. If this changes in
            future, we will update this policy before introducing any such tool.
          </P>

          <H2>Your rights and choices</H2>
          <P>
            You may contact us to request access to, correction of, or deletion of personal
            information we hold about you. We will consider and respond to requests in accordance
            with applicable law and legitimate retention obligations.
          </P>
          <P>
            You may opt out of receiving marketing or business-outreach communications from us at
            any time by contacting us or using any available unsubscribe method.
          </P>
          <P>
            To make a request, contact us at{" "}
            <a
              href="mailto:info@vitalscaledigital.com.au"
              className="text-vital underline underline-offset-4"
            >
              info@vitalscaledigital.com.au
            </a>
            . We will respond within a reasonable timeframe.
          </P>

          <H2>Links to other websites</H2>
          <P>
            Our website may contain links to third-party websites. We are not responsible for their
            privacy practices and encourage you to review their policies separately.
          </P>

          <H2>Changes to this policy</H2>
          <P>
            We may update this Privacy Policy to reflect changes in our practices or in the law.
            Updates will be posted on this page with a revised effective date.
          </P>

          <H2>Contact us</H2>
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
          <P>
            If the Privacy Act 1988 applies to VitalScale Digital and you remain dissatisfied after
            contacting us, you may be able to lodge a complaint with the Office of the Australian
            Information Commissioner.
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
