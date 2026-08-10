import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { Button } from "@/components/site/Button";
import { Container, Eyebrow, Reveal, Section } from "@/components/site/Section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitWebsiteReview } from "@/lib/contact.functions";

const SITE_URL = "https://vitalscaledigital.com.au";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Free Website Review | VitalScale Digital" },
      {
        name: "description",
        content:
          "Request a Free Website Review for your NDIS organisation. Tell us where your current website is falling behind and we'll review what actually needs improving.",
      },
      { property: "og:title", content: "Free Website Review | VitalScale Digital" },
      {
        property: "og:description",
        content:
          "Tell us what has changed in your organisation and where your current website is falling behind.",
      },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { property: "og:site_name", content: "VitalScale Digital" },
      { name: "twitter:title", content: "Free Website Review | VitalScale Digital" },
      {
        name: "twitter:description",
        content:
          "Tell us what has changed in your organisation and where your current website is falling behind.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: Contact,
});

function Contact() {
  const submit = useServerFn(submitWebsiteReview);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <section className="bg-surface py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
              <h1 className="mt-5 text-[2.25rem] leading-[1.08] font-extrabold text-ink sm:text-5xl">
                Request a Free Website Review.
              </h1>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-charcoal">
                Tell us what has changed in your organisation and where your current website is
                falling behind. No obligation—we’ll look at what actually needs improving.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          {/* Form column is intentionally static — never animate form fields, labels or submit. */}
          <div className="min-w-0">
            {sent ? (
              <div
                className="mx-auto w-full min-w-0 max-w-full rounded-2xl border border-border bg-card p-7 md:p-9"
                role="status"
                aria-live="polite"
              >
                <h2 className="font-display text-2xl font-bold text-ink">
                  Thanks — we’ve received your request.
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-charcoal">
                  We’ll review your details and get back to you within 2 business days.
                </p>
              </div>
            ) : (
              <form
                className="mx-auto w-full min-w-0 max-w-full rounded-2xl border border-border bg-card p-7 md:p-9"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  const fd = new FormData(form);
                  setSubmitting(true);
                  setError(null);
                  try {
                    const result = await submit({
                      data: {
                        name: String(fd.get("name") ?? ""),
                        email: String(fd.get("email") ?? ""),
                        business: String(fd.get("business") ?? ""),
                        website: String(fd.get("website") ?? ""),
                        review: String(fd.get("review") ?? ""),
                        botcheck: String(fd.get("botcheck") ?? ""),
                      },
                    });
                    if (result.ok) {
                      form.reset();
                      setSent(true);
                    } else {
                      setError(result.error);
                    }
                  } catch {
                    setError("We couldn't send your request. Please try again.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <div className="grid min-w-0 gap-5 sm:grid-cols-2 [&>*]:min-w-0">
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required maxLength={100} autoComplete="name" />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={255}
                      autoComplete="email"
                    />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="business">Business/provider name</Label>
                    <Input
                      id="business"
                      name="business"
                      required
                      maxLength={150}
                      autoComplete="organization"
                    />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      name="website"
                      required
                      maxLength={300}
                      placeholder="https://"
                    />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="review">What would you like us to review? (optional)</Label>
                    <Textarea id="review" name="review" rows={5} maxLength={2000} />
                  </div>
                </div>

                {/* Honeypot — hidden from people, visible to bots */}
                <input
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {error ? (
                  <p className="mt-6 text-sm text-destructive" role="alert">
                    {error}
                  </p>
                ) : null}

                <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
                  Your details are only used to prepare your review and get in touch with you. See
                  our{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-deep underline decoration-border underline-offset-4 transition-colors hover:text-vital"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for how we handle your information.
                </p>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-6 w-full px-4 text-center whitespace-normal sm:w-auto sm:px-7 sm:whitespace-nowrap"
                  disabled={submitting}
                >
                  {submitting ? "Sending…" : "Request my Free Website Review"}
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  We’ll respond with the next practical step, not a sales pitch.
                </p>
              </form>
            )}
          </div>

          <Reveal delay={80} className="min-w-0 max-w-full">
            <div className="min-w-0 max-w-full space-y-8">
              <div className="min-w-0 max-w-full">
                <h2 className="font-display text-xl font-bold text-ink">Prefer to ask first?</h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-charcoal">
                  You’re welcome to reach out directly before requesting a review.
                </p>
                <p className="mt-4 flex min-w-0 max-w-full flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem] leading-relaxed text-charcoal">
                  <a
                    href="tel:+61406970615"
                    className="whitespace-nowrap text-deep underline decoration-border underline-offset-4 transition-colors hover:text-vital"
                  >
                    0406 970 615
                  </a>
                  <span className="hidden text-muted-foreground sm:inline">·</span>
                  <a
                    href="mailto:info@vitalscaledigital.com.au"
                    className="max-w-full [overflow-wrap:anywhere] text-deep underline decoration-border underline-offset-4 transition-colors hover:text-vital"
                  >
                    info@vitalscaledigital.com.au
                  </a>
                  <span className="hidden text-muted-foreground sm:inline">·</span>
                  <a
                    href="https://wa.me/61406970615"
                    className="whitespace-nowrap text-deep underline decoration-border underline-offset-4 transition-colors hover:text-vital"
                  >
                    WhatsApp
                  </a>
                </p>
              </div>
              <div className="hairline" />
              <div className="min-w-0 max-w-full">
                <h2 className="font-display text-xl font-bold text-ink">What to expect</h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-charcoal">
                  We’ll talk through your services, locations, audience and current website, then
                  recommend an appropriate scope and provide a clear proposal.
                </p>
              </div>
              <div className="hairline" />

              <div className="min-w-0 max-w-full">
                <h2 className="font-display text-xl font-bold text-ink">Pricing</h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-charcoal">
                  Website pricing depends on the size of the website, the amount of content
                  required, the number of services and locations, and the level of strategy and
                  design support involved.
                </p>
              </div>
              <div className="hairline" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                VitalScale Digital provides website design and digital communication services. We do
                not provide NDIS registration, audit, legal, clinical or compliance advice.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
