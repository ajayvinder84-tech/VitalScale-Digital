"""Builds the printable PDF of the NDIS policy checklist from content.py, plus the 1200x630 share image.
Usage: python3 build_pdf.py <repo> <out>
"""
import html, sys, base64
from pathlib import Path
import content as C
from playwright.sync_api import sync_playwright

REPO = Path(sys.argv[1]); OUT = Path(sys.argv[2])
HERE = Path(__file__).parent
(OUT / "site" / "downloads").mkdir(parents=True, exist_ok=True)
(OUT / "site" / "og").mkdir(parents=True, exist_ok=True)

def e(s): return html.escape(s, quote=False)
def a(s): return html.escape(s, quote=True)

def font_faces():
    css = []
    for w in (400, 500, 600):
        b64 = base64.b64encode((HERE / "fonts" / f"dm-sans-latin-{w}-normal.woff2").read_bytes()).decode()
        css.append(f'@font-face{{font-family:"DM Sans";font-weight:{w};src:url(data:font/woff2;base64,{b64}) format("woff2")}}')
    return "\n".join(css)

def svg_data(name):
    return "data:image/svg+xml;base64," + base64.b64encode((REPO / "site" / name).read_bytes()).decode()

LOGO = svg_data("logo-primary.svg")
LOGO_REV = svg_data("logo-reversed.svg")

TAG_CLASS = {"all": "t-all", "reg": "t-reg", "ver": "t-ver", "enc": "t-enc", "must": "t-must"}
def tag(t):
    if t.startswith("only:"):
        return f'<span class="tag t-only">{e(t[5:])}</span>'
    return f'<span class="tag {TAG_CLASS[t]}">{e(C.TAG_TEXT[t])}</span>'

n = 0
parts = []
for p in C.PARTS:
    rows = []
    for it in p["items"]:
        n += 1
        nurse = f'<div class="nurse"><b>Nurse\'s note</b> {e(it["nurse"])}</div>' if it.get("nurse") else ""
        proof = "".join(f"<li>{e(x)}</li>" for x in it["proof"])
        rows.append(f"""<div class="row">
<div class="box"></div>
<div class="left"><div class="num">{n:02d}</div><h3>{e(it["title"])}</h3><div class="tags">{"".join(tag(t) for t in it["tags"])}</div>
<div class="lbl">Policy you need</div><p class="policy">{e(it["policy"])}</p></div>
<div class="right"><div class="lbl">What an auditor wants to see</div><ul>{proof}</ul>{nurse}</div>
</div>""")
    parts.append(f"""<section class="part">
<div class="part-head"><div class="eyebrow">{e(p["num"])} · {len(p["items"])} items</div><h2>{e(p["title"])}</h2><p>{e(p["intro"])}</p></div>
{"".join(rows)}
</section>""")

steps = "".join(f'<li><b>{e(t)}.</b> {e(d)}</li>' for t, d in C.HOW_TO)
who = "".join(f'<li><b>{e(t)}:</b> {e(d)}</li>' for t, d in C.WHO)
sources = "".join(f'<li>{e(C.SOURCES[k][0])}<br><span class="url">{e(C.SOURCES[k][1])}</span></li>' for k in C.SOURCE_ORDER)

doc = f"""<!doctype html><html lang="en-AU"><head><meta charset="utf-8">
<title>NDIS policy checklist 2026 · VitalScale Digital</title>
<style>
{font_faces()}
@page {{ size: A4; margin: 14mm 13mm 16mm; }}
:root {{ --ink:#1F2B28; --deep:#0E1C1B; --grey:#5E6664; --line:#E3E2DC; --paper:#F6F5F1; --green:#4B7C57; --teal:#1F5B5A; --gold:#E0A526; }}
* {{ box-sizing: border-box; }}
html {{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
body {{ margin:0; font-family:"DM Sans", Arial, sans-serif; color:var(--ink); font-size:8.6pt; line-height:1.42; }}
h1,h2,h3 {{ margin:0; font-weight:500; letter-spacing:-0.02em; }}
p {{ margin:0; }}
.top {{ display:flex; justify-content:space-between; align-items:center; padding-bottom:9pt; border-bottom:1px solid var(--line); }}
.top img {{ height:30pt; }}
.top span {{ font-size:7.5pt; color:var(--grey); }}
.title {{ padding:16pt 0 12pt; }}
.eyebrow {{ font-size:6.8pt; font-weight:500; letter-spacing:0.16em; text-transform:uppercase; color:var(--teal); }}
.title h1 {{ font-size:28pt; line-height:1.16; margin:6pt 0 8pt; letter-spacing:-0.035em; }}
.title h1 em {{ font-style:normal; border:1.6pt solid var(--gold); border-radius:5pt; padding:0 3pt; }}
.title .lede {{ font-size:10.5pt; color:var(--grey); max-width:150mm; line-height:1.45; }}
.meta {{ display:flex; flex-wrap:wrap; gap:5pt; margin-top:10pt; }}
.meta span {{ font-size:7.4pt; border:1px solid var(--line); border-radius:99pt; padding:2.5pt 8pt; }}
.meta span.hl {{ background:var(--deep); color:#fff; border-color:var(--deep); }}
.intro {{ display:grid; grid-template-columns:1fr 1fr; gap:10pt; margin-top:4pt; }}
.card {{ background:var(--paper); border-radius:8pt; padding:10pt 12pt; }}
.card h2 {{ font-size:10.5pt; margin-bottom:5pt; }}
.card ol, .card ul {{ margin:0; padding-left:12pt; display:grid; gap:4pt; }}
.legend {{ display:flex; flex-wrap:wrap; align-items:center; gap:5pt; margin-top:10pt; font-size:7.4pt; color:var(--grey); }}
.disc {{ margin-top:10pt; border-left:3pt solid var(--gold); padding:6pt 10pt; background:#fff; border:1px solid var(--line); border-left-width:3pt; border-radius:6pt; font-size:7.8pt; }}
.disc b {{ font-size:6.6pt; letter-spacing:0.14em; text-transform:uppercase; display:block; margin-bottom:2pt; }}
.tag {{ display:inline-block; font-size:5.9pt; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; padding:1.5pt 5.5pt; border-radius:99pt; border:0.8pt solid var(--ink); white-space:nowrap; }}
.t-all {{ background:var(--ink); color:#fff; }}
.t-reg {{ border-color:var(--teal); color:var(--teal); }}
.t-ver {{ border-color:var(--grey); color:var(--grey); border-style:dashed; }}
.t-enc {{ border-color:var(--grey); color:var(--grey); }}
.t-must {{ background:var(--teal); border-color:var(--teal); color:#fff; }}
.t-only {{ border-color:#9C6B05; color:#7A5300; white-space:normal; }}
.part {{ margin-top:14pt; }}
.part-head {{ padding:8pt 0 6pt; border-bottom:1.4pt solid var(--ink); break-after:avoid; }}
.part-head h2 {{ font-size:15pt; margin:3pt 0 4pt; }}
.part-head p {{ color:var(--grey); font-size:8.2pt; max-width:170mm; }}
.row {{ display:grid; grid-template-columns:14pt 62mm 1fr; gap:10pt; padding:9pt 0; border-bottom:0.6pt solid var(--line); break-inside:avoid; }}
.box {{ width:12pt; height:12pt; border:1.2pt solid var(--ink); border-radius:2.5pt; margin-top:1pt; }}
.num {{ font-size:7pt; color:var(--grey); letter-spacing:0.06em; }}
.left h3 {{ font-size:10.6pt; line-height:1.22; margin:1pt 0 4pt; }}
.tags {{ display:flex; flex-wrap:wrap; gap:3pt; margin-bottom:6pt; }}
.lbl {{ font-size:5.9pt; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; color:var(--grey); margin-bottom:2pt; }}
.policy {{ font-weight:500; }}
.right ul {{ margin:0; padding-left:10pt; display:grid; gap:2.5pt; }}
.right li::marker {{ color:var(--green); }}
.nurse {{ margin-top:5pt; background:#F1F5F1; border-left:2pt solid var(--green); border-radius:4pt; padding:4pt 7pt; font-size:8pt; }}
.nurse b {{ font-size:6pt; letter-spacing:0.14em; text-transform:uppercase; color:#2F5A3A; margin-right:3pt; }}
.end {{ break-before:page; }}
.end h2 {{ font-size:15pt; margin-bottom:6pt; }}
.end ol {{ margin:0; padding-left:14pt; display:grid; gap:4.5pt; font-size:7.8pt; }}
.end .url {{ color:var(--grey); font-size:7pt; word-break:break-all; }}
.cta {{ margin-top:16pt; background:var(--deep); color:#fff; border-radius:10pt; padding:16pt 18pt; display:grid; grid-template-columns:1fr auto; gap:12pt; align-items:center; }}
.cta h2 {{ color:#fff; font-size:16pt; margin-bottom:5pt; }}
.cta p {{ color:#C9D3D0; font-size:8.6pt; }}
.cta p b {{ color:#fff; font-weight:500; }}
.cta img {{ height:30pt; }}
.author {{ margin-top:12pt; font-size:8pt; color:var(--grey); }}
</style></head><body>
<div class="top"><img src="{LOGO}" alt="VitalScale Digital"><span>Free guide · vitalscaledigital.com.au/ndis-policy-checklist</span></div>
<div class="title">
<div class="eyebrow">Free checklist · 2026</div>
<h1>NDIS policy <em>checklist</em><br>for registered and unregistered providers</h1>
<p class="lede">Every policy an NDIS provider needs, what an auditor wants to see for each one, and who it applies to. Built from the NDIS Commission's Practice Standards and Code of Conduct.</p>
<div class="meta"><span class="hl">Last checked {C.LAST_CHECKED}</span><span>{C.TOTAL} items in 3 parts</span><span>Written by Ajay Singh, Registered Nurse</span></div>
</div>
<div class="intro">
<div class="card"><h2>How to use it</h2><ol>{steps}</ol></div>
<div class="card"><h2>Which parts apply to you?</h2><ul>{who}</ul></div>
</div>
<div class="legend">Tags: {tag("all")} {tag("reg")} {tag("ver")} {tag("must")} {tag("only:If you deliver a support")}</div>
<div class="disc"><b>Please note</b>{e(C.DISCLAIMER)} Check the latest version at vitalscaledigital.com.au/ndis-policy-checklist.</div>
{"".join(parts)}
<section class="end">
<h2>Official sources</h2>
<ol>{sources}</ol>
<p class="author">Written by Ajay Singh, Registered Nurse and founder of VitalScale Digital. Checked against these sources on {C.LAST_CHECKED}. Rules change: always check the official source for your situation.</p>
<div class="cta"><div><h2>Found a gap? Get a free policy review.</h2>
<p>Send Ajay one policy you're unsure about. He'll check it against how your business actually runs and the current rules, and tell you plainly whether it needs work.</p>
<p style="margin-top:6pt"><b>vitalscaledigital.com.au/ndis-policies-and-procedures</b> · Call or WhatsApp <b>0406 970 615</b></p>
<p style="margin-top:4pt">Updates when the rules change: <b>vitalscaledigital.com.au/ndis-policy-checklist</b></p></div>
<img src="{LOGO_REV}" alt="VitalScale Digital"></div>
</section>
</body></html>"""

(OUT / "print.html").write_text(doc, encoding="utf-8")

FOOTER = f"""<div style="font-family:Arial,sans-serif;font-size:7px;color:#5E6664;width:100%;padding:0 13mm;display:flex;justify-content:space-between;">
<span>NDIS policy checklist · VitalScale Digital · Last checked {C.LAST_CHECKED} · General guide, not legal advice</span>
<span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>"""

og = f"""<!doctype html><html><head><meta charset="utf-8"><style>{font_faces()}
body{{margin:0;width:1200px;height:630px;font-family:"DM Sans";background:#0E1C1B;color:#fff;position:relative;overflow:hidden}}
.g{{position:absolute;inset:0;background:radial-gradient(70% 90% at 100% 0%,rgba(75,124,87,.55) 0%,transparent 60%),radial-gradient(60% 70% at 0% 100%,rgba(156,199,166,.18) 0%,transparent 60%)}}
.w{{position:absolute;inset:64px 72px;display:flex;flex-direction:column;justify-content:space-between}}
.e{{font-size:22px;letter-spacing:.16em;text-transform:uppercase;color:#E0A526;font-weight:500;display:flex;align-items:center;gap:14px}}
.e:before{{content:"";width:12px;height:12px;border-radius:50%;background:#E0A526}}
h1{{font-size:78px;line-height:1.02;letter-spacing:-.035em;font-weight:500;margin:22px 0 0;max-width:900px}}
h1 span{{border:4px solid #E0A526;border-radius:12px;padding:0 8px;line-height:.9;display:inline-block}}
.s{{font-size:28px;color:#C9D3D0;margin-top:22px}}
.f{{display:flex;justify-content:space-between;align-items:flex-end}}
.f img{{height:58px}}
.p{{font-size:22px;color:#C9D3D0}}
.list{{position:absolute;right:72px;top:150px;width:300px;display:grid;gap:14px}}
.list div{{display:flex;gap:14px;align-items:center;font-size:21px;color:#E3E9E7;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:12px 16px}}
.list i{{width:22px;height:22px;border:2px solid #9CC7A6;border-radius:5px;flex:none;position:relative}}
.list i.c:after{{content:"";position:absolute;left:6px;top:1px;width:6px;height:12px;border:solid #9CC7A6;border-width:0 3px 3px 0;transform:rotate(45deg)}}
</style></head><body><div class="g"></div>
<div class="list"><div><i class="c"></i>Code of Conduct</div><div><i class="c"></i>Complaints</div><div><i></i>Incident management</div><div><i></i>Medication</div><div><i></i>Worker screening</div></div>
<div class="w"><div><div class="e">Free checklist · 2026</div>
<h1>NDIS policy <span>checklist</span></h1>
<div class="s">For registered and unregistered providers</div></div>
<div class="f"><img src="{LOGO_REV}"><div class="p">Written by a Registered Nurse</div></div></div></body></html>"""
(OUT / "og.html").write_text(og, encoding="utf-8")

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto((OUT / "print.html").resolve().as_uri())
    pg.evaluate("document.fonts.ready")
    pg.pdf(path=str(OUT / "site" / "downloads" / "ndis-policy-checklist.pdf"), format="A4",
           print_background=True, prefer_css_page_size=True, display_header_footer=True,
           header_template="<div></div>", footer_template=FOOTER,
           margin={"top": "14mm", "bottom": "16mm", "left": "13mm", "right": "13mm"})
    og_pg = b.new_page(viewport={"width": 1200, "height": 630})
    og_pg.goto((OUT / "og.html").resolve().as_uri())
    og_pg.evaluate("document.fonts.ready")
    og_pg.screenshot(path=str(OUT / "site" / "og" / "policy-checklist.jpg"), type="jpeg", quality=85)
    b.close()
print("pdf + og written")
