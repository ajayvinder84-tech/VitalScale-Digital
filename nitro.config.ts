import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  // Pin to the newest compatibility date supported by the bundled Cloudflare runtime.
  compatibilityDate: "2026-08-08",
  routeRules: {
    "/services": { redirect: { to: "/ndis-website-design", status: 301 } },
    "/services/": { redirect: { to: "/ndis-website-design", status: 301 } },
    "/new-ndis-providers": { redirect: { to: "/new-providers", status: 301 } },
    "/new-ndis-providers/": { redirect: { to: "/new-providers", status: 301 } },
    "/privacy": { redirect: { to: "/privacy-policy", status: 301 } },
    "/privacy/": { redirect: { to: "/privacy-policy", status: 301 } },
    "/terms": { redirect: { to: "/terms-of-use", status: 301 } },
    "/terms/": { redirect: { to: "/terms-of-use", status: 301 } },
  },
});
