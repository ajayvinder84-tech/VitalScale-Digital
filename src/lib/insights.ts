export interface InsightMeta {
  slug: string;
  /** Path used by the router. */
  to: string;
  /** Preserved <title> from the existing VitalScale Digital website. */
  title: string;
  /** Preserved meta description from the existing VitalScale Digital website. */
  description: string;
  /** On-page article heading, preserved verbatim. */
  heading: string;
  /** Short heading used in listings, as supplied. */
  listTitle: string;
  category: string;
  readTime: string;
  standfirst: string;
}

export const insights: InsightMeta[] = [
  {
    slug: "what-makes-an-ndis-website-actually-convert",
    to: "/insights/what-makes-an-ndis-website-actually-convert",
    title: "What Makes an NDIS Website Actually Convert — VitalScale Digital",
    description:
      "Most NDIS provider websites look reasonable but quietly lose enquiries. Here are the specific elements that separate websites that convert from those that don't.",
    heading: "What Makes an NDIS Website Actually Convert — And What Kills It",
    listTitle: "What Makes an NDIS Website Actually Convert",
    category: "Website",
    readTime: "7 min read",
    standfirst:
      "Most NDIS provider websites look reasonable on the surface but quietly lose enquiries. Here are the elements that make the difference between a visit and a contact.",
  },
  {
    slug: "why-ndis-providers-are-invisible-on-google",
    to: "/insights/why-ndis-providers-are-invisible-on-google",
    title: "Why NDIS Providers Are Invisible on Google — VitalScale Digital",
    description:
      "Most NDIS providers are invisible on Google not because of bad content, but due to fixable gaps. This article explains exactly what to fix and why it matters.",
    heading: "Why NDIS Providers Are Invisible on Google — And How to Fix It",
    listTitle: "Why NDIS Providers Are Invisible on Google",
    category: "Online Visibility",
    readTime: "8 min read",
    standfirst:
      "Most NDIS providers don't appear in local searches not because their service isn't good enough, but because of simple, fixable gaps in their Google presence that nobody has ever pointed out to them. This article walks through the five most common issues — and what to actually do about them.",
  },
  {
    slug: "the-google-review-problem",
    to: "/insights/the-google-review-problem",
    title: "The Google Review Problem Every NDIS Provider Needs to Know About — VitalScale Digital",
    description:
      "A single outdated or unanswered negative review can quietly override years of positive service. Here's how NDIS providers can manage their online reputation deliberately.",
    heading: "The Google Review Problem Every NDIS Provider Needs to Know About",
    listTitle: "The Google Review Problem Every NDIS Provider Needs to Know About",
    category: "Reputation",
    readTime: "6 min read",
    standfirst:
      "A single outdated or unanswered negative review can quietly override years of positive service. Here's how to manage your online reputation deliberately and consistently.",
  },
];

export function insightsExcept(slug: string): InsightMeta[] {
  return insights.filter((item) => item.slug !== slug);
}
