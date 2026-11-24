# Deploy log

What went live on vitalscaledigital.com.au, newest first. (The older log is on Ajay's PC:
D:\Claude Code\VitalScale\NDIS News\deploy_log.md.)

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
