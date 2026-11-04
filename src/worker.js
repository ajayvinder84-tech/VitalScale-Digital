// Serves the static site in ./site and handles the enquiry forms at /api/enquiry.
// Enquiries are forwarded to Web3Forms with the WEB3FORMS_ACCESS_KEY Worker secret.
// When someone asks for the free policy checklist, Brevo also emails them the link to it, but only
// once the BREVO_API_KEY secret and the CHECKLIST_FROM_EMAIL variable are both set in Cloudflare.
// The start-offer forms (free week of posts, free website demo, Gap Check) send extra details, and
// the two free offers can include a logo. Web3Forms can't take files on our plan, so Brevo emails the
// logo to Ajay (at the CHECKLIST_FROM_EMAIL address, the one people reply to) as an attachment.

const FIELD_LIMITS = { name: 100, email: 255, business: 150, message: 600 };
// For each start-offer form: the name used in the email, and its extra fields as
// [label in the email, longest allowed, required, name in error messages].
const BUSINESS_FIELDS = {
  services: ["Services they offer", 300, true, "services"],
  area: ["Area they cover", 150, true, "area"],
  referrals: ["How people refer to or contact them", 300, true, "how people contact you"],
  social: ["Instagram or Facebook", 300, false, "Instagram or Facebook"],
  colours: ["Brand colours", 150, false, "brand colours"],
};
const START_FORMS = {
  "free-week": { offer: "Free week of posts", fields: BUSINESS_FIELDS, logo: true },
  "free-demo": { offer: "Free website demo", fields: { ...BUSINESS_FIELDS, website: ["Current website", 300, false, "website"] }, logo: true },
  "policy-check": { offer: "Policy vs Practice Gap Check", fields: { policies: ["Policies they'll send", 2, true, "number of policies"] }, logo: false },
};
const LOGO_MAX_BYTES = 3 * 1024 * 1024;
const LOGO_TYPES = { "image/png": "png", "image/jpeg": "jpg", "application/pdf": "pdf" };
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

  const page = String(form.get("page") ?? "").trim().slice(0, 30) || "unknown";
  const start = START_FORMS[page];
  const data = {};
  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    const value = String(form.get(field) ?? "").trim();
    // On the start-offer forms the message box is optional.
    if ((!value && !(start && field === "message")) || value.length > limit) {
      return json({ success: false, error: `Please check the ${field} field.` }, 400);
    }
    data[field] = value;
  }
  if (!EMAIL_PATTERN.test(data.email)) {
    return json({ success: false, error: "Please enter a valid email address." }, 400);
  }
  const extra = {};
  for (const [field, [label, limit, required, friendly]] of Object.entries(start?.fields ?? {})) {
    const value = String(form.get(field) ?? "").trim();
    if ((required && !value) || value.length > limit) {
      return json({ success: false, error: `Please check the ${friendly} field.` }, 400);
    }
    if (value) extra[label] = value;
  }
  if (page === "policy-check" && !/^[1-5]$/.test(extra["Policies they'll send"])) {
    return json({ success: false, error: "Please choose how many policies you'll send (1 to 5)." }, 400);
  }
  const logo = start?.logo ? form.get("logo") : null;
  const hasLogo = logo && typeof logo === "object" && logo.size > 0;
  if (hasLogo && (logo.size > LOGO_MAX_BYTES || !LOGO_TYPES[logo.type])) {
    return json({ success: false, error: "Please choose a PNG, JPG or PDF logo under 3 MB, or leave it out." }, 400);
  }
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

  // The logo goes first, so the enquiry email can say whether it arrived.
  let logoNote = "None sent";
  if (hasLogo) {
    logoNote = "Uploaded, but it couldn't be forwarded. Please ask them to email it.";
    if (env.BREVO_API_KEY && env.CHECKLIST_FROM_EMAIL) {
      const sent = await sendLogo(env, start.offer, data, logo).catch((error) => {
        console.error("Logo email failed", error);
        return false;
      });
      if (sent) logoNote = `Emailed to you separately (${logo.name || "logo"})`;
    }
  }
  const subject = start
    ? `${start.offer} sign-up: ${data.business} (marketing ${consent ? "YES" : "NO"})`
    : `New website enquiry (${page} page): marketing ${consent ? "YES" : "NO"} — VitalScale Digital`;

  let response;
  try {
    response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: env.WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: "VitalScale Digital Website",
        name: data.name,
        email: data.email,
        "Business name": data.business,
        ...(start ? { Offer: start.offer } : {}),
        ...extra,
        ...(start?.logo ? { Logo: logoNote } : {}),
        Enquiry: data.message || "(none)",
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
  if (start) console.log(`Sign-up: ${start.offer}`);
  // The checklist email goes out in the background, so the page's download never waits for it.
  if (page === CHECKLIST_PAGE && env.BREVO_API_KEY && env.CHECKLIST_FROM_EMAIL) {
    ctx.waitUntil(sendChecklistEmail(env, data).catch((error) => console.error("Checklist email failed", error)));
  }
  return json({ success: true });
}

// The email is sent as plain text, like a personal reply: Brevo can't add its tracking picture to a
// plain-text email, and it leaves the link to the PDF as it is. If Brevo ever refuses an email
// without an HTML version, it's sent again with one.
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
  const message = {
    sender: { name: "Ajay at VitalScale Digital", email: env.CHECKLIST_FROM_EMAIL },
    replyTo: { name: "Ajay Singh", email: env.CHECKLIST_FROM_EMAIL },
    to: [{ email, name }],
    subject: "Your NDIS policy checklist",
    textContent: lines.join("\n\n"),
    tags: ["policy-checklist"],
  };
  let response = await sendWithBrevo(env, message);
  let kind = "plain text";
  if (response.status === 400) {
    console.log("Brevo wouldn't send plain text only, so sending with an HTML version", await response.text().catch(() => ""));
    const html = lines.map((line) => line === CHECKLIST_PDF
      ? `<p><a href="${CHECKLIST_PDF}">Download the NDIS policy checklist (PDF)</a></p>`
      : `<p>${escapeHtml(line).replace(/\n/g, "<br>")}</p>`).join("");
    response = await sendWithBrevo(env, { ...message, htmlContent: `<div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#1F2B28">${html}</div>` });
    kind = "HTML";
  }
  if (!response.ok) {
    console.error("Brevo didn't send the checklist email", response.status, await response.text().catch(() => ""));
    return;
  }
  const sent = await response.json().catch(() => ({}));
  console.log(`Checklist email sent by Brevo (${kind})`, sent.messageId || "");
}

// Emails Ajay the logo someone uploaded with a free-offer sign-up. Replying goes to them.
async function sendLogo(env, offer, { name, email, business }, logo) {
  const extension = LOGO_TYPES[logo.type];
  const base = (logo.name || "logo").replace(/\.[^.]*$/, "").replace(/[^\w-]+/g, "-").slice(0, 60) || "logo";
  const response = await sendWithBrevo(env, {
    sender: { name: "VitalScale Digital Website", email: env.CHECKLIST_FROM_EMAIL },
    replyTo: { name, email },
    to: [{ email: env.CHECKLIST_FROM_EMAIL, name: "Ajay Singh" }],
    subject: `Logo for ${offer}: ${business}`,
    textContent: `${name} from ${business} (${email}) uploaded this logo with their ${offer} sign-up.\n\nThe rest of their details are in the website enquiry email.`,
    attachment: [{ name: `${base}.${extension}`, content: toBase64(await logo.arrayBuffer()) }],
    tags: ["start-offer-logo"],
  });
  if (!response.ok) {
    console.error("Brevo didn't send the logo email", response.status, await response.text().catch(() => ""));
    return false;
  }
  return true;
}

function toBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

function sendWithBrevo(env, body) {
  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
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
