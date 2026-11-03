// Serves the static site in ./site and handles the enquiry forms at /api/enquiry.
// Enquiries are forwarded to Web3Forms with the WEB3FORMS_ACCESS_KEY Worker secret.
// When someone asks for the free policy checklist, Brevo also emails them the link to it, but only
// once the BREVO_API_KEY secret and the CHECKLIST_FROM_EMAIL variable are both set in Cloudflare.

const FIELD_LIMITS = { name: 100, email: 255, business: 150, message: 600 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FILL_MS = 3000;
const CHECKLIST_PAGE = "policy-checklist-pdf";
const CHECKLIST_PDF = "https://vitalscaledigital.com.au/downloads/ndis-policy-checklist.pdf";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/enquiry") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
      }
      return handleEnquiry(request, env, ctx);
    }
    return env.ASSETS.fetch(request);
  },
};

async function handleEnquiry(request, env, ctx) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ success: false, error: "Invalid form submission." }, 400);
  }

  // Bot checks. People never see the botcheck field, so only bots fill it in. And site.js
  // records how long the form was open: nobody fills it in under 3 seconds. Bots are told
  // it worked, so they don't retry. Spam bots that post the form without running site.js
  // send no time at all, so those are turned away too.
  if (form.get("botcheck")) return json({ success: true });
  const elapsed = Number(form.get("elapsed"));
  if (!form.get("elapsed") || !Number.isFinite(elapsed)) {
    return json({ success: false, error: "Please turn on JavaScript to send this form." }, 400);
  }
  if (elapsed < MIN_FILL_MS) return json({ success: true });

  const data = {};
  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    const value = String(form.get(field) ?? "").trim();
    if (!value || value.length > limit) {
      return json({ success: false, error: `Please check the ${field} field.` }, 400);
    }
    data[field] = value;
  }
  if (!EMAIL_PATTERN.test(data.email)) {
    return json({ success: false, error: "Please enter a valid email address." }, 400);
  }
  const page = String(form.get("page") ?? "").trim().slice(0, 30) || "unknown";
  const consent = form.get("marketing_consent") === "yes";
  const consentText = String(form.get("consent_text") ?? "").trim().slice(0, 400);
  const received = new Date().toLocaleString("en-AU", {
    timeZone: "Australia/Melbourne",
    dateStyle: "full",
    timeStyle: "short",
  });

  if (!env.WEB3FORMS_ACCESS_KEY) {
    console.error("WEB3FORMS_ACCESS_KEY is not set");
    return json({ success: false, error: "The form isn't set up yet. Please email us instead." }, 503);
  }

  let response;
  try {
    response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: env.WEB3FORMS_ACCESS_KEY,
        subject: `New website enquiry (${page} page): marketing ${consent ? "YES" : "NO"} — VitalScale Digital`,
        from_name: "VitalScale Digital Website",
        name: data.name,
        email: data.email,
        "Business name": data.business,
        Enquiry: data.message,
        "Marketing consent": consent ? "YES" : "NO",
        "Consent wording": consent ? consentText : "Box not ticked",
        Received: `${received} (Melbourne time)`,
        "Sent from page": page,
      }),
    });
  } catch (error) {
    console.error("Web3Forms request failed", error);
    return sendFailed();
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true) {
    console.error("Web3Forms submission failed", response.status);
    return sendFailed();
  }
  // The checklist email goes out in the background, so the page's download never waits for it.
  if (page === CHECKLIST_PAGE && env.BREVO_API_KEY && env.CHECKLIST_FROM_EMAIL) {
    ctx.waitUntil(sendChecklistEmail(env, data).catch((error) => console.error("Checklist email failed", error)));
  }
  return json({ success: true });
}

async function sendChecklistEmail(env, { name, email }) {
  const first = name.split(/\s+/)[0];
  const lines = [
    `Hi ${first},`,
    "Thanks for asking for the NDIS policy checklist. Here's your copy:",
    CHECKLIST_PDF,
    "It covers every policy an NDIS provider needs, what an auditor wants to see for each one, and the official source. When the rules change, we'll email you the updated version.",
    "If you'd like a second opinion on one of your policies, just reply to this email.",
    "Ajay Singh, Registered Nurse\nVitalScale Digital",
    "Don't want checklist updates? Reply with \"unsubscribe\" and we'll take you off the list.",
  ];
  const html = lines.map((line) => line === CHECKLIST_PDF
    ? `<p><a href="${CHECKLIST_PDF}">Download the NDIS policy checklist (PDF)</a></p>`
    : `<p>${escapeHtml(line).replace(/\n/g, "<br>")}</p>`).join("");
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      sender: { name: "Ajay at VitalScale Digital", email: env.CHECKLIST_FROM_EMAIL },
      replyTo: { name: "Ajay Singh", email: env.CHECKLIST_FROM_EMAIL },
      to: [{ email, name }],
      subject: "Your free NDIS policy checklist",
      textContent: lines.join("\n\n"),
      htmlContent: `<div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#1F2B28">${html}</div>`,
      tags: ["policy-checklist"],
    }),
  });
  if (!response.ok) console.error("Brevo didn't send the checklist email", response.status, await response.text().catch(() => ""));
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function sendFailed() {
  return json({ success: false, error: "We couldn't send your enquiry. Please try again." }, 502);
}

function json(body, status = 200) {
  return Response.json(body, { status });
}
