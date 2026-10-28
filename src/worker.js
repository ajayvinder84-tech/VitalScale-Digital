// Serves the static site in ./site and handles the enquiry forms at /api/enquiry.
// Enquiries are forwarded to Web3Forms with the WEB3FORMS_ACCESS_KEY Worker secret.

const FIELD_LIMITS = { name: 100, email: 255, business: 150, message: 600 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FILL_MS = 3000;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/enquiry") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
      }
      return handleEnquiry(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

async function handleEnquiry(request, env) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ success: false, error: "Invalid form submission." }, 400);
  }

  // Bot checks. People never see the botcheck field, so only bots fill it in. And site.js
  // records how long the form was open: nobody fills it in under 3 seconds. Bots are told
  // it worked, so they don't retry.
  if (form.get("botcheck")) return json({ success: true });
  const elapsed = Number(form.get("elapsed"));
  if (form.get("elapsed") && elapsed >= 0 && elapsed < MIN_FILL_MS) return json({ success: true });

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
  return json({ success: true });
}

function sendFailed() {
  return json({ success: false, error: "We couldn't send your enquiry. Please try again." }, 502);
}

function json(body, status = 200) {
  return Response.json(body, { status });
}
