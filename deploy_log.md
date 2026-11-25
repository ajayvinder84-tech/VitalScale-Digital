# Deploy log

What went live on vitalscaledigital.com.au, newest first. (The older log is on Ajay's PC:
D:\Claude Code\VitalScale\NDIS News\deploy_log.md.)

## 26 Nov 2026: realistic Google card and NDIS news section

- **Homepage card:** the "found on Google" card is redrawn like a real phone search result (search bar,
  small map, listing with rating, hours, Call / Directions / Website buttons). The rating is invented,
  so the card is marked "Example only".
- **NDIS news section on /ndis-changes:** "Earlier NDIS changes in 2026" keeps the items that dropped
  off the weekly list, word for word from the researcher's earlier files, each with its official link
  and "last checked" date. Each change has its own link (`/ndis-changes#its-headline`) and there is a
  row of quick links at the top.
- **Keeps itself up to date:** `scripts/news-archive.mjs` runs in the Monday news routine (CLAUDE.md
  step 5) and writes `src/data/ndis-news-archive.json`. Headlines in its `hidden` list never show.
- **Checked before publishing:** build x3, structured-data audit, every internal link, every page at
  1366px and 390px. The 4-sentence intro to the news section scored 61.6 on the humaniser (pass mark
  75); Ajay read and approved the wording. Ajay: "yes, publish".
- **Not checked:** the live site (not reachable from the cloud computer).

## 25 Nov 2026: "No promised outcomes" label removed

- **What:** the "No promised outcomes" item is gone from the trust strip (home, checks, pricing, start)
  and from the "Why VitalScale" lists (free demo, free week, policy check, visibility check). Ajay asked,
  "remove and publish". The rule itself hasn't changed: the site still never promises outcomes, and the
  FAQ "Do you promise NDIS registration or audit results?" stays.
- **Checked before publishing:** build x3, structured-data audit, links, 20 pages at 1366px and 390px.

## 25 Nov 2026: navy and yellow rebrand

- **What:** Ajay's rebrand (option B). Navy #0F2A44 and yellow #F5B700 on every page, light top
  sections, new wordmark logo with a small "v" and a capital yellow "S", new homepage top (the line
  "Two things that help an NDIS business grow...", main button "Free Google visibility check", two
  cards with the star rating kept). Applied from `2026-11-25 navy-yellow-rebrand.patch` with `git am`,
  then changed in chat with Ajay.
- **Premium layer:** gradient glow behind the homepage cards (`glow-hero.svg`), border trail on the
  Google card, counting "from" prices, staggered fade-ins, spotlight on card hover. All off for
  reduced motion. No library added.
- **Icons:** new browser-tab and home-screen icon ("vS" with a dot above the v and a line under each
  letter) and a new `og-image.png`. The 12 page-specific sharing pictures in `site/og/` are still in
  the old style.
- **Changed from the patch:** the homepage card label "Audit ready" became "Policy check" (site rule).
- **EV pages:** take the new colours and logo, and stay separate from the NDIS pages.
- **Not changed:** prices, offers, free-week mentions.
- **Checked before publishing:** build x3, structured-data audit, 54 internal links, 20 pages at
  1366px and 390px, each effect tested, reduced motion tested. Ajay approved the preview ("yes, publish").
- **Not checked:** the live site and Lighthouse speed (not reachable from the cloud computer).

## 24 Nov 2026: privacy policy tidy-up

- **What:** in "Who can see it", the sentence now ends "We never sell your details." and the repeated
  "We never sell or rent your information." is removed, so it no longer clashes with "We don't share
  your details with anyone else unless the law requires it." (Ajay, 24 Nov.) Date stays 24 November 2026.
- **Checked before publishing:** build x3, structured-data audit, links, privacy page at 1366px and 390px.

## 24 Nov 2026: privacy policy wording

- **What:** in "Who can see it", "Ajay is the only person who reads your enquiry." became "Your enquiry
  is seen only by Ajay and the tools he uses to manage and reply to enquiries. We never sell or share
  your details." (Ajay's wording, approved 24 Nov.) Date stays 24 November 2026.
- **Checked before publishing:** build x3, structured-data audit, links, privacy page at 1366px and
  390px. Ajay had already done both live form tests for the leads webhook.

## 24 Nov 2026: leads webhook

- **What:** `sendToLeads()` in `src/worker.js`. After a website enquiry, start-offer sign-up or Auditor
  Test result has gone to Web3Forms, the lead is also sent in the background to the Activepieces lead
  automation. Applied from Ajay's patch `2026-11-24 leads-webhook.patch` with `git am`.
- **Switch:** only runs when the Cloudflare secret `LEADS_WEBHOOK_URL` is set. Not set at deploy time,
  so the code does nothing until Ajay adds it.
- **Sent:** name, email, business, enquiry text, page, marketing consent, time. Auditor Test also sends
  score, band, audit timing, provider type, help wanted and worry.
- **Privacy policy:** one line added ("We also use automation tools to record your enquiry and help us
  follow up."), date updated to 24 November 2026.
- **Checked before publishing:** `node --check src/worker.js`; a test with pretend entries showed no
  webhook call without the secret, the right data with it, and the form still succeeding when the
  webhook is down; build x3, structured-data audit, links, privacy page at 1366px and 390px.
- **Not checked:** the live site (the cloud computer can't open it). Ajay to send one test enquiry.
