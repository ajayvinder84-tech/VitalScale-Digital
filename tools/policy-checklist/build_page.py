"""Builds the NDIS policy checklist page for the VitalScale site from content.py.

Reads the live policies page for the shared header, footer and organisation data, so the new page
matches the rest of the site exactly. Writes:
  out/site/ndis-policy-checklist.html
  out/site/checklist.js
"""
import html, json, re, sys
from pathlib import Path
import content as C

REPO = Path(sys.argv[1])          # path to the VitalScale-Digital repo
OUT = Path(sys.argv[2])           # output folder
SITE = REPO / "site"
(OUT / "site").mkdir(parents=True, exist_ok=True)

def e(s):  # text
    return html.escape(s, quote=False)

def a(s):  # attribute
    return html.escape(s, quote=True)

policies = (SITE / "ndis-policies-and-procedures.html").read_text(encoding="utf-8")
header = re.search(r'<header class="site-header">.*?</header>', policies, re.S).group(0)
header = header.replace(' aria-current="page"', "")
footer = re.search(r'<footer class="site-footer">.*?</footer>', policies, re.S).group(0)
wa_float = re.search(r'<a class="whatsapp-float".*?</a>', policies, re.S).group(0)
ld = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', policies, re.S).group(1))
shared_nodes = [n for n in ld["@graph"] if n.get("@type") in ("Organization", "Person", "WebSite")]

TITLE = "NDIS Policy Checklist 2026 (Free PDF) | VitalScale"
DESC = ("Free NDIS policy checklist for registered and unregistered providers: every policy you need, "
        "what an auditor wants to see, and the official source.")
assert len(TITLE) <= 60, len(TITLE)
assert len(DESC) <= 155, len(DESC)
URL = C.PAGE_URL
OG_IMAGE = "https://vitalscaledigital.com.au/og/policy-checklist.jpg"

# ---------- structured data ----------
page_node = {
    "@type": ["WebPage", "FAQPage"],
    "@id": URL + "#webpage",
    "url": URL,
    "name": TITLE,
    "description": DESC,
    "isPartOf": {"@id": "https://vitalscaledigital.com.au/#website"},
    "inLanguage": "en-AU",
    "author": {"@id": "https://vitalscaledigital.com.au/#ajay"},
    "publisher": {"@id": "https://vitalscaledigital.com.au/#organization"},
    "dateModified": C.LAST_CHECKED_ISO,
    "breadcrumb": {"@id": URL + "#breadcrumb"},
    "primaryImageOfPage": {"@type": "ImageObject", "url": OG_IMAGE},
    "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": ans}}
        for q, ans in C.FAQ
    ],
}
crumbs = {
    "@type": "BreadcrumbList",
    "@id": URL + "#breadcrumb",
    "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://vitalscaledigital.com.au/"},
        {"@type": "ListItem", "position": 2, "name": "Policies", "item": "https://vitalscaledigital.com.au/ndis-policies-and-procedures"},
        {"@type": "ListItem", "position": 3, "name": "NDIS policy checklist", "item": URL},
    ],
}
json_ld = json.dumps({"@context": "https://schema.org", "@graph": shared_nodes + [page_node, crumbs]}, ensure_ascii=False)

# ---------- pieces ----------
def tag_html(t):
    if t.startswith("only:"):
        return f'<span class="tag tag-only">{e(t[5:])}</span>'
    return f'<span class="tag tag-{t}">{e(C.TAG_TEXT[t])}</span>'

def source_links(keys):
    links = []
    for k in keys:
        _, href = C.SOURCES[k]
        links.append(f'<a href="{a(href)}" target="_blank" rel="noopener">{e(C.SOURCE_SHORT[k])}<span class="visually-hidden"> (opens in a new tab)</span></a>')
    return " · ".join(links)

n = 0
parts_html = []
for part in C.PARTS:
    items = []
    for it in part["items"]:
        n += 1
        num = f"{n:02d}"
        proof = "".join(f"<li>{e(p)}</li>" for p in it["proof"])
        nurse = f'<p class="cl-nurse"><strong>Nurse\'s note</strong>{e(it["nurse"])}</p>' if it.get("nurse") else ""
        more = ""
        if it.get("more"):
            more = f'<p class="cl-more"><a href="{a(it["more"][1])}">{e(it["more"][0])}</a></p>'
        items.append(f"""<li class="cl-item" id="item-{num}">
<input class="cl-box" type="checkbox" id="cl-{num}">
<div class="cl-body">
<div class="cl-head"><h4><label for="cl-{num}"><span class="cl-n">{num}</span>{e(it["title"])}</label></h4><div class="cl-tags">{"".join(tag_html(t) for t in it["tags"])}</div></div>
<div class="cl-cols">
<div class="cl-policy"><span class="cl-label">Policy you need</span><p>{e(it["policy"])}</p></div>
<div class="cl-proof"><span class="cl-label">What an auditor wants to see</span><ul>{proof}</ul></div>
</div>
{nurse}{more}<p class="cl-source">Source: {source_links(it["sources"])}</p>
</div>
</li>""")
    parts_html.append(f"""<div class="cl-part" id="{part["id"]}">
<div class="cl-part-head"><span class="eyebrow">{e(part["num"])} · {len(part["items"])} items</span><h3>{e(part["title"])}</h3><p class="muted">{e(part["intro"])}</p></div>
<ol class="cl-list">
{chr(10).join(items)}
</ol>
</div>""")

jump = "".join(f'<a href="#{p["id"]}">{e(p["num"])}<span> · {e(p["short"])}</span></a>' for p in C.PARTS)
steps = "".join(f'<li><strong>{e(t)}</strong><span class="muted">{e(d)}</span></li>' for t, d in C.HOW_TO)
who = "".join(f'<div class="who-card"><h4>{e(t)}</h4><p class="muted">{e(d)}</p></div>' for t, d in C.WHO)
faq = "".join(f'<div class="faq-item"><h3>{e(q)}</h3><p class="muted">{e(ans)}</p></div>' for q, ans in C.FAQ)
sources = "".join(
    f'<li><a href="{a(C.SOURCES[k][1])}" target="_blank" rel="noopener">{e(C.SOURCES[k][0])}<span class="visually-hidden"> (opens in a new tab)</span></a></li>'
    for k in C.SOURCE_ORDER)

CONSENT = "Yes, add me to Ajay's list for NDIS tips, updates and occasional offers by email. (About once a month by email; until I unsubscribe.)"

def consent_block(sfx):
    return f"""<div class="consent">
<label><input type="checkbox" name="marketing_consent" value="yes" aria-describedby="consent-terms-{sfx}"><span>Yes, add me to Ajay's list for NDIS tips, updates and occasional offers by email.</span></label>
<details id="consent-terms-{sfx}">
<summary>See details</summary>
<ul>
<li><strong>Who:</strong> VitalScale Digital (Ajay Singh).</li>
<li><strong>What:</strong> NDIS tips, updates and occasional offers about our services.</li>
<li><strong>How often:</strong> about once a month by email.</li>
<li><strong>How long:</strong> until you unsubscribe.</li>
<li><strong>How to stop:</strong> click "unsubscribe" in any email.</li>
</ul>
</details>
</div>"""

PDF_SUCCESS = ("Thanks! Your checklist is downloading now. We've also emailed you a copy. "
               "If it isn't in your inbox, check the Updates or Promotions tab.")

pdf_link = f'href="{C.PDF_PATH}" download="{C.PDF_NAME}"'
get_pdf = 'href="#updates"'   # the PDF is given out after the email form is sent

page = f"""<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script>document.documentElement.classList.add("js")</script>
<title>{e(TITLE)}</title>
<meta name="description" content="{a(DESC)}">
<link rel="canonical" href="{URL}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="VitalScale Digital">
<meta property="og:locale" content="en_AU">
<meta property="og:title" content="{a(TITLE)}">
<meta property="og:description" content="{a(DESC)}">
<meta property="og:url" content="{URL}">
<meta property="og:image" content="{OG_IMAGE}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Free NDIS policy checklist for registered and unregistered providers, by VitalScale Digital">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{json_ld}</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap">
<link rel="stylesheet" href="styles.css">
<link rel="icon" href="/icon-vs.png" type="image/png" sizes="96x96">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
<body class="page-checklist">
{header}
<main>
<section class="hero"><div class="wrap">
  <div class="hero-copy">
    <span class="eyebrow">Free checklist · Last checked {C.LAST_CHECKED}</span>
    <h1>NDIS policy <span class="hl">checklist</span> for registered and unregistered providers.</h1>
    <p class="lede">Every policy an NDIS provider needs, what an auditor wants to see for each one, and who it applies to. Built from the NDIS Commission's Practice Standards and Code of Conduct. Written by a Registered Nurse.</p>
    <ul class="hero-points">
      <li>{C.TOTAL} items in three parts: every provider, registered, and specific supports</li>
      <li>What an auditor wants to see, not just the policy name</li>
      <li>Free. Enter your email and the PDF downloads straight away.</li>
    </ul>
    <div class="btn-row">
      <a class="btn btn-primary" {get_pdf}>Get the free PDF</a>
      <a class="btn btn-ghost" href="#checklist">Start the checklist</a>
    </div>
    <p class="hero-meta">By Ajay Singh, Registered Nurse · Checked against official sources on {C.LAST_CHECKED}</p>
  </div>
  <figure class="photo photo-hero"><img src="photos/policies.jpg" alt="Torn strips of lined paper" width="1600" height="1067" fetchpriority="high"></figure>
</div></section>

<section class="band" id="how"><div class="wrap">
  <div class="section-head">
    <span class="eyebrow">How to use it</span>
    <h2>A policy only counts if your records prove it.</h2>
    <p class="muted">A missing policy is easy to spot. The harder gap is a policy your records don't back up. So for every item, this checklist shows what an auditor wants to see.</p>
  </div>
  <ol class="steps steps-3">{steps}</ol>
  <h3 class="who-title">Which parts apply to you?</h3>
  <div class="who-grid">{who}</div>
</div></section>

<section id="checklist"><div class="wrap">
  <div class="section-head">
    <span class="eyebrow">The checklist</span>
    <h2>{C.TOTAL} policies, and the proof behind each one.</h2>
    <p class="muted">Tick an item only when you have the policy and the records to show it's happening.</p>
  </div>
  <div class="cl-bar">
    <nav class="cl-jump" aria-label="Checklist parts">{jump}</nav>
    <p class="cl-progress" aria-live="polite"><span><strong data-cl-count>0</strong> of {C.TOTAL} ticked</span><button type="button" class="cl-clear">Clear ticks</button></p>
  </div>
  <p class="cl-note small muted">Your ticks aren't saved on this page. <a {get_pdf}>Get the free PDF</a> to keep a copy you can tick and file.</p>
{chr(10).join(parts_html)}
</div></section>

<section id="updates"><div class="wrap"><div class="cta cta-form">
<div class="cta-copy">
<span class="cta-eyebrow">Free PDF</span>
<h2>Get the PDF checklist, and the new version when the rules change.</h2>
<p>Enter your details and the PDF downloads straight away. The Practice Standards are under review, so this checklist will change. We'll email you the updated version when the rules move.</p>
</div>
<form class="enquiry" action="/api/enquiry" method="post" data-success="{a(PDF_SUCCESS)}">
<input type="hidden" name="page" value="policy-checklist-pdf">
<div class="trap" aria-hidden="true"><label for="botcheck-checklist-pdf">Leave this empty</label><input type="text" id="botcheck-checklist-pdf" name="botcheck" tabindex="-1" autocomplete="off"></div>
<input type="hidden" name="elapsed" value="">
<input type="hidden" name="consent_text" value="{a(CONSENT)}">
<div class="field"><label for="name-checklist-pdf">Your name</label><input id="name-checklist-pdf" name="name" type="text" autocomplete="name" required></div>
<div class="field"><label for="email-checklist-pdf">Email</label><input id="email-checklist-pdf" name="email" type="email" autocomplete="email" required></div>
<div class="field"><label for="biz-checklist-pdf">Business name</label><input id="biz-checklist-pdf" name="business" type="text" autocomplete="organization" required></div>
<div class="field"><label for="type-checklist-pdf">Which best describes you?</label><select id="type-checklist-pdf" name="message" required>
<option value="" disabled selected>Choose one</option>
<option value="Checklist request: registered NDIS provider">Registered NDIS provider</option>
<option value="Checklist request: unregistered NDIS provider">Unregistered NDIS provider</option>
<option value="Checklist request: starting an NDIS business">Starting an NDIS business</option>
<option value="Checklist request: support coordinator or plan manager">Support coordinator or plan manager</option>
<option value="Checklist request: other">Other</option>
</select></div>
{consent_block("checklist-pdf")}
<button class="btn btn-light" type="submit">Get the checklist</button>
<p class="form-note">We'll use your details to email you when the checklist is updated. We only add you to the monthly list if you tick the box. See our <a href="privacy.html">privacy policy</a>.</p>
<p class="form-status" role="status" aria-live="polite"></p>
<div class="cl-unlock" id="cl-unlock" hidden><a class="btn btn-primary" {pdf_link}>Download the PDF</a><p class="small">Didn't start? Tap the button.</p></div>
</form>
</div></div></section>

<section class="band" id="questions"><div class="wrap">
  <div class="section-head">
    <span class="eyebrow">Common questions</span>
    <h2>Questions about NDIS policies and audits.</h2>
  </div>
  <div class="faq">{faq}</div>
</div></section>

<section id="sources"><div class="wrap grid-2">
  <div class="stack">
    <span class="eyebrow">Where this comes from</span>
    <h2>Official sources only.</h2>
    <p class="muted prose">Every item is based on the NDIS Practice Standards, the NDIS Code of Conduct, the NDIS rules and the 2026 changes to the NDIS Act. Each item links to its source. Last checked {C.LAST_CHECKED}.</p>
    <div class="cl-disclaimer"><strong>Please note</strong><p>{e(C.DISCLAIMER)}</p></div>
    <div class="author-card"><img src="photos/ajay.jpg" alt="Ajay Singh" width="64" height="64" loading="lazy"><p class="author-line">Written by <strong>Ajay Singh</strong>, Registered Nurse and founder of VitalScale Digital.</p></div>
    <!-- REVIEWED BY: once a registered provider has checked this checklist and agreed to be named, add a line here, e.g.
    <p class="small muted">Reviewed by [Name], [role] at [provider], a registered NDIS provider.</p> -->
  </div>
  <ol class="source-list">{sources}</ol>
</div></section>

<section id="book"><div class="wrap"><div class="cta cta-form">
<div class="cta-copy">
<h2>Found a gap? Get a free policy review.</h2>
<p>Send us one policy you're unsure about. Ajay will review it against how your business actually runs and the current rules, and tell you plainly whether it needs work.</p>
<p class="small">Ajay will reply to you personally.</p>
<p class="cta-chat">Prefer to chat? <a href="https://wa.me/61406970615?text=Hi%20VitalScale%20Digital%2C%20I%20found%20you%20on%20your%20website%20and%20have%20a%20question." target="_blank" rel="noopener">Message us on WhatsApp</a> or call <a href="tel:+61406970615">0406 970 615</a>.</p>
</div>
<form class="enquiry" action="/api/enquiry" method="post">
<input type="hidden" name="page" value="policy-checklist">
<div class="trap" aria-hidden="true"><label for="botcheck-checklist">Leave this empty</label><input type="text" id="botcheck-checklist" name="botcheck" tabindex="-1" autocomplete="off"></div>
<input type="hidden" name="elapsed" value="">
<input type="hidden" name="consent_text" value="{a(CONSENT)}">
<div class="field"><label for="name-checklist">Full name</label><input id="name-checklist" name="name" type="text" autocomplete="name" required></div>
<div class="field"><label for="email-checklist">Email</label><input id="email-checklist" name="email" type="email" autocomplete="email" required></div>
<div class="field"><label for="biz-checklist">Business name</label><input id="biz-checklist" name="business" type="text" autocomplete="organization" required></div>
<div class="field"><label for="msg-checklist">Your enquiry</label><textarea id="msg-checklist" name="message" rows="3" maxlength="600" placeholder="Which policy would you like reviewed?" required></textarea></div>
{consent_block("checklist")}
<button class="btn btn-light" type="submit">Send enquiry</button>
<p class="form-note">We use your details to reply to you, and only add you to our list if you tick the box. See our <a href="privacy.html">privacy policy</a>.</p>
<p class="form-status" role="status" aria-live="polite"></p>
</form>
</div></div></section>

</main>
{footer}
<script src="site.js"></script>
<script src="checklist.js"></script>
{wa_float}
</body>
</html>
"""

(OUT / "site" / "ndis-policy-checklist.html").write_text(page, encoding="utf-8")

js = """// NDIS policy checklist page: counts the ticks and clears them (nothing is saved or sent anywhere),
// and starts the PDF download once the "Get the checklist" form has been sent.
(function () {
  var boxes = document.querySelectorAll(".cl-box");
  var count = document.querySelector("[data-cl-count]");
  var clear = document.querySelector(".cl-clear");
  if (!boxes.length || !count) return;
  function update() {
    var n = 0;
    for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) n++;
    count.textContent = String(n);
  }
  document.addEventListener("change", function (e) {
    if (e.target.classList && e.target.classList.contains("cl-box")) update();
  });
  if (clear) clear.addEventListener("click", function () {
    for (var i = 0; i < boxes.length; i++) boxes[i].checked = false;
    update();
  });
  update();
})();
(function () {
  var unlock = document.getElementById("cl-unlock");
  if (!unlock) return;
  document.addEventListener("enquiry:sent", function (e) {
    if (!e.target.closest || !e.target.closest("#updates")) return;
    unlock.hidden = false;
    var link = unlock.querySelector("a[download]");
    if (link) link.click();
  });
})();
"""
(OUT / "site" / "checklist.js").write_text(js, encoding="utf-8")
print("page written:", C.TOTAL, "items;", "verification items:", C.VER_COUNT, "; title", len(TITLE), "desc", len(DESC))
