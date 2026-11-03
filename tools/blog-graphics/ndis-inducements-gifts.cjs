// Draws the cover and the three diagrams for the blog post "NDIS inducements ban: can providers
// still give gifts?" in the site's colours and font, and saves them into the post's folder.
// Every word on them comes from the article. To change one, edit the text below and run:
//   node tools/blog-graphics/ndis-inducements-gifts.cjs
// (needs Playwright with Chromium, which the cloud sessions already have).
const { chromium } = require("playwright");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const ROOT = join(__dirname, "..", "..");
const OUT = join(ROOT, "content", "blog", "ndis-inducements-gifts");
const font = (w) => readFileSync(join(__dirname, "fonts", `dm-sans-latin-${w}-normal.woff2`)).toString("base64");
const FONTS = [400, 500, 600].map((w) => `@font-face{font-family:"DM Sans";font-weight:${w};src:url(data:font/woff2;base64,${font(w)}) format("woff2")}`).join("");

const INK = "#0E1C1B", GOLD = "#E0A526", TEAL = "#1F5B5A", PAPER = "#F6F5F1", LINE = "#E3E2DC", GREY = "#5E6664";

const BASE_CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"DM Sans",sans-serif;color:${INK};-webkit-font-smoothing:antialiased}
.card{width:640px;background:${PAPER};padding:40px 40px 30px;display:grid;gap:24px}
.eyebrow{font-size:15px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:${TEAL};display:flex;align-items:center;gap:10px}
.eyebrow:before{content:"";width:9px;height:9px;border-radius:50%;background:${GOLD}}
h2{font-size:34px;font-weight:500;letter-spacing:-.025em;line-height:1.12;margin-top:-10px}
.foot{display:flex;justify-content:space-between;align-items:center;font-size:14px;color:${GREY};border-top:1px solid ${LINE};padding-top:16px}
.foot b{font-weight:600;color:${INK}}`;

// Simple line icons, drawn on a 32 x 32 grid
const ICON = {
  cash: '<rect x="3" y="8" width="26" height="16" rx="2"/><circle cx="16" cy="16" r="4"/><path d="M7 12v0M25 20v0"/>',
  card: '<rect x="3" y="7" width="26" height="18" rx="3"/><path d="M3 13h26M8 20h6"/>',
  alcohol: '<path d="M10 4h12l-1 9a5 5 0 0 1-10 0z"/><path d="M16 18v8M11 28h10"/>',
  tobacco: '<rect x="3" y="15" width="22" height="6" rx="1"/><path d="M20 15v6M28 14c0-3-2-3-2-6M24.5 13c0-2-1.5-2-1.5-4"/>',
  device: '<rect x="9" y="3" width="14" height="26" rx="3"/><path d="M14 25h4"/>',
  pill: '<rect x="4" y="11" width="24" height="10" rx="5" transform="rotate(-35 16 16)"/><path d="M12.2 10.6l7.6 10.8"/>',
  tag: '<path d="M4 16V5a1 1 0 0 1 1-1h11l12 12-12 12z"/><circle cx="10" cy="10" r="2"/><path d="M13 21l6-8"/>',
  bag: '<path d="M6 11h20l-2 17H8z"/><path d="M11 11V9a5 5 0 0 1 10 0v2"/>',
  doc: '<path d="M8 3h11l6 6v20H8z"/><path d="M19 3v6h6M12 16h9M12 21h9"/>',
};
const icon = (name, color) => `<svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;

const TIMELINE = `<div class="card">
<style>
.steps{display:grid;gap:0;position:relative;padding-left:44px}
.steps:before{content:"";position:absolute;left:13px;top:16px;bottom:30px;width:2px;background:${LINE}}
.step{position:relative;padding-bottom:26px}
.step:before{content:"";position:absolute;left:-44px;top:4px;width:28px;height:28px;border-radius:50%;background:${PAPER};border:2px solid ${TEAL}}
.step.now:before{background:${GOLD};border-color:${GOLD}}
.step.next:before{border-style:dashed;border-color:${GREY}}
.date{font-size:15px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${TEAL}}
.step.next .date{color:${GREY}}
.what{font-size:25px;font-weight:500;letter-spacing:-.015em;line-height:1.25;margin-top:4px}
.step.now .what span{border:2px solid ${GOLD};border-radius:8px;padding:0 6px}
.note{font-size:18px;color:${GREY};line-height:1.45;margin-top:4px}
</style>
<span class="eyebrow">Key dates</span>
<h2>When the inducements ban starts</h2>
<div class="steps">
  <div class="step"><div class="date">20 August 2026</div><div class="what">The Act becomes law</div><div class="note">The NDIS Amendment (Securing the NDIS for Future Generations) Act 2026 receives Royal Assent.</div></div>
  <div class="step now"><div class="date">20 November 2026</div><div class="what"><span>The ban starts</span></div><div class="note">Section 73VA applies to every NDIS provider, registered or unregistered.</div></div>
  <div class="step next"><div class="date">Still to come</div><div class="what">NDIS rules on pricing and merchandise</div><div class="note">Not published when we checked on 3 November 2026.</div></div>
</div>
<div class="foot"><span>Source: NDIS Act, section 73VA</span><b>VitalScale Digital</b></div>
</div>`;

const TEST = `<div class="card">
<style>
.q{display:grid;gap:12px}
.box{background:#fff;border:1px solid ${LINE};border-radius:14px;padding:18px 20px;display:grid;grid-template-columns:44px 1fr;gap:16px;align-items:center}
.n{width:44px;height:44px;border-radius:50%;background:${TEAL};color:#fff;font-size:21px;font-weight:600;display:grid;place-items:center}
.t{font-size:23px;font-weight:500;line-height:1.3;letter-spacing:-.01em}
.and{font-size:15px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${GREY};padding-left:24px}
.result{background:${INK};color:#fff;border-radius:14px;padding:22px 24px;font-size:24px;font-weight:500;line-height:1.3;letter-spacing:-.01em}
.result span{color:${GOLD}}
</style>
<span class="eyebrow">The section 73VA test</span>
<h2>Is it an NDIS inducement?</h2>
<div class="q">
  <div class="box"><div class="n">1</div><div class="t">You give, offer or agree to give a gift, benefit or other thing</div></div>
  <div class="and">and</div>
  <div class="box"><div class="n">2</div><div class="t">It's something other than the support or service itself</div></div>
  <div class="and">and</div>
  <div class="box"><div class="n">3</div><div class="t">It's reasonably likely to get someone to start, keep or increase using your services</div></div>
</div>
<div class="result">All three? <span>It's banned from 20 November 2026,</span> whether it goes to the participant, their family or someone who refers to you.</div>
<div class="foot"><span>General information, not legal advice</span><b>VitalScale Digital</b></div>
</div>`;

const item = (name, text, color) => `<li>${icon(name, color)}<span>${text}</span></li>`;
const BANNED = `<div class="card">
<style>
.panel{border-radius:14px;padding:22px 24px;display:grid;gap:16px}
.panel h3{font-size:16px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;display:flex;align-items:center;gap:10px}
.panel ul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:16px 20px}
.panel li{display:grid;grid-template-columns:30px 1fr;gap:12px;align-items:center;font-size:20px;line-height:1.3}
.no{background:${INK};color:#fff}
.no h3{color:${GOLD}}
.yes{background:#fff;border:1px solid ${LINE}}
.yes h3{color:${TEAL}}
.yes ul{grid-template-columns:1fr}
.mark{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:17px;line-height:1}
.no .mark{background:${GOLD};color:${INK}}
.yes .mark{background:${TEAL};color:#fff}
</style>
<span class="eyebrow">From 20 November 2026</span>
<h2>What's banned, what's allowed</h2>
<div class="panel no"><h3><span class="mark">&#x2715;</span>Banned in all cases</h3><ul>
${item("cash", "Cash", GOLD)}${item("card", "Gift cards, vouchers and store cards", GOLD)}
${item("alcohol", "Alcohol", GOLD)}${item("tobacco", "Cigarettes, tobacco and vapes", GOLD)}
${item("device", "Electronic devices, like phones and tablets", GOLD)}${item("pill", "Illegal drugs", GOLD)}
</ul></div>
<div class="panel yes"><h3><span class="mark">&#x2713;</span>Still allowed</h3><ul>
${item("tag", "Genuine discounts that are part of your normal pricing", TEAL)}
${item("bag", "Your own merchandise, like a cap or tote bag", TEAL)}
${item("doc", "Anything future NDIS rules specifically permit", TEAL)}
</ul></div>
<div class="foot"><span>Source: NDIS Act, section 73VA</span><b>VitalScale Digital</b></div>
</div>`;

// The cover is 1600 x 900. The blog crops it to a wide strip on computers and to 4:3 on phones,
// so everything important sits inside the middle 1200 x 700.
const logo = readFileSync(join(ROOT, "site", "logo-reversed.svg")).toString("base64");
const COVER = `<div class="cover">
<style>
.cover{width:1600px;height:900px;background:${INK};position:relative;overflow:hidden;color:#fff}
.cover:before{content:"";position:absolute;inset:0;background:radial-gradient(60% 80% at 85% 20%,rgba(31,91,90,.75) 0%,transparent 65%),radial-gradient(50% 60% at 10% 100%,rgba(224,165,38,.12) 0%,transparent 60%)}
.copy{position:absolute;left:230px;top:235px;width:800px;display:grid;gap:24px}
.e{font-size:24px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:${GOLD};display:flex;align-items:center;gap:14px}
.e:before{content:"";width:12px;height:12px;border-radius:50%;background:${GOLD}}
.h{font-size:84px;font-weight:500;letter-spacing:-.04em;line-height:1.02}
.h span{border:4px solid ${GOLD};border-radius:16px;padding:0 10px;display:inline-block;line-height:1}
.s{font-size:32px;color:#C9D3D0}
.logo{position:absolute;left:230px;bottom:118px;height:46px;opacity:.9}
.gift{position:absolute;right:215px;top:235px;width:340px;height:389px}
</style>
<div class="copy"><div class="e">NDIS changes · Policies</div><div class="h">NDIS <span>inducements</span> ban</div><div class="s">What providers can still give, from 20 November 2026</div></div>
<img class="logo" src="data:image/svg+xml;base64,${logo}" alt="">
<svg class="gift" width="420" height="480" viewBox="0 0 420 480" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="40" y="212" width="340" height="238" rx="18" stroke="${GOLD}" stroke-width="6"/>
  <rect x="20" y="140" width="380" height="70" rx="14" stroke="${GOLD}" stroke-width="6"/>
  <path d="M210 212v238" stroke="${GOLD}" stroke-width="6"/>
  <path d="M210 140c-40-70-130-80-130-25 0 30 60 25 130 25zM210 140c40-70 130-80 130-25 0 30-60 25-130 25z" stroke="${GOLD}" stroke-width="6"/>
  <g transform="translate(250 300) rotate(-8)"><rect x="0" y="0" width="150" height="64" rx="10" fill="${INK}" stroke="#fff" stroke-opacity=".8" stroke-width="3"/>
  <text x="75" y="42" text-anchor="middle" font-family="DM Sans" font-size="26" font-weight="600" fill="#fff" stroke="none">20.11.26</text></g>
</svg>
</div>`;

(async () => {
  const browser = await chromium.launch();
  const shoot = async (html, file, opts) => {
    const page = await browser.newPage({ viewport: { width: opts.width, height: opts.height || 600 }, deviceScaleFactor: opts.scale || 1 });
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}</style></head><body>${html}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    const el = await page.$("body > div");
    await el.screenshot({ path: join(OUT, file), type: file.endsWith(".jpg") ? "jpeg" : "png", ...(file.endsWith(".jpg") ? { quality: 86 } : {}) });
    await page.close();
    console.log("saved", file);
  };
  await shoot(COVER, "cover.jpg", { width: 1600, height: 900 });
  await shoot(TIMELINE, "timeline.png", { width: 640, scale: 2 });
  await shoot(TEST, "three-part-test.png", { width: 640, scale: 2 });
  await shoot(BANNED, "banned-and-allowed.png", { width: 640, scale: 2 });
  await browser.close();
})();
