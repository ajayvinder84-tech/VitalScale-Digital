import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://vitalscaledigital.com.au";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/ndis-website-design", changefreq: "monthly", priority: "0.9" },
  { path: "/how-we-help", changefreq: "monthly", priority: "0.8" },
  { path: "/work", changefreq: "monthly", priority: "0.8" },
  { path: "/insights", changefreq: "monthly", priority: "0.8" },
  {
    path: "/insights/what-makes-an-ndis-website-actually-convert",
    changefreq: "yearly",
    priority: "0.6",
  },
  {
    path: "/insights/why-ndis-providers-are-invisible-on-google",
    changefreq: "yearly",
    priority: "0.6",
  },
  { path: "/insights/the-google-review-problem", changefreq: "yearly", priority: "0.6" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/new-providers", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-of-use", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
