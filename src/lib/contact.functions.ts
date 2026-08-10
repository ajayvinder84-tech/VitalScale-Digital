import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const websiteReviewSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  business: z.string().trim().min(1, "Business or provider name is required").max(150),
  website: z.string().trim().min(1, "Website URL is required").max(300),
  review: z.string().trim().max(2000).optional().default(""),
  // Honeypot — must stay empty for real submissions.
  botcheck: z.string().max(0).optional().default(""),
});

export const submitWebsiteReview = createServerFn({ method: "POST" })
  .validator((input: unknown) => websiteReviewSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.botcheck) return { ok: true as const };

    const accessKey = process.env["WEB3FORMS_ACCESS_KEY"];
    if (!accessKey) {
      return { ok: false as const, error: "Form is not configured yet. Please email us instead." };
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "Free Website Review request — VitalScale Digital",
        from_name: "VitalScale Digital Website",
        name: data.name,
        email: data.email,
        "Business/provider name": data.business,
        "Website URL": data.website,
        "What would you like us to review?": data.review || "—",
      }),
    });

    const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
    if (!response.ok || result?.success !== true) {
      console.error("Web3Forms submission failed", response.status);
      return { ok: false as const, error: "We couldn't send your request. Please try again." };
    }

    return { ok: true as const };
  });
