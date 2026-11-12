// Draws the cover and three small line drawings for the blog post "NDIS referrals in 2026: how to
// get support coordinators to refer to you" in the site's colours, and saves them into the post's folder.
// The drawings inside the article sit beside the writing rather than repeating it, so they carry
// almost no words. The cover is on the site's dark ink, with the headline.
// To change one, edit it below and run:
//   node tools/blog-graphics/ndis-referrals.cjs
// (needs Playwright with Chromium, which the cloud sessions already have).
const { chromium } = require("playwright");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const ROOT = join(__dirname, "..", "..");
const OUT = join(ROOT, "content", "blog", "ndis-referrals");
const font = (w) => readFileSync(join(__dirname, "fonts", `dm-sans-latin-${w}-normal.woff2`)).toString("base64");
const FONTS = [400, 500, 600].map((w) => `@font-face{font-family:"DM Sans";font-weight:${w};src:url(data:font/woff2;base64,${font(w)}) format("woff2")}`).join("");

const INK = "#1F2B28", GOLD = "#E0A526", TEAL = "#1F5B5A", PAPER = "#F6F5F1", GREY = "#9AA19F", WHITE = "#FFFFFF";


const icons = {
  who: (cx, cy) => `<g fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linecap="round"><circle cx="${cx}" cy="${cy-9}" r="9"/><path d="M${cx-16} ${cy+18}c2-12 8-17 16-17s14 5 16 17"/></g>`,
  where: (cx, cy) => `<g fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linejoin="round"><path d="M${cx} ${cy+20}c-10-12-16-20-16-29a16 16 0 0 1 32 0c0 9-6 17-16 29z"/><circle cx="${cx}" cy="${cy-9}" r="5" stroke="${GOLD}"/></g>`,
  when: (cx, cy) => `<g fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linecap="round"><circle cx="${cx}" cy="${cy}" r="17"/><path d="M${cx} ${cy-10}v10l7 5" stroke="${GOLD}"/></g>`,
  safe: (cx, cy) => `<g fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M${cx-16} ${cy-12}l16-7 16 7v12c0 12-8 19-16 22-8-3-16-10-16-22z" stroke="${TEAL}" stroke-width="2.5"/><path d="M${cx-7} ${cy+1}l5 5 10-10" stroke="${GOLD}" stroke-width="3"/></g>`,
  report: (cx, cy) => `<g fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="${cx-15}" y="${cy-19}" width="30" height="38" rx="4"/><path d="M${cx-8} ${cy-8}h16M${cx-8} ${cy}h16M${cx-8} ${cy+8}h9" /><circle cx="${cx+14}" cy="${cy+16}" r="6" fill="${GOLD}" stroke="${GOLD}"/></g>`,
};

// 1. Five cards in a row, one for each check a coordinator makes (for "The 5 things")
function fiveChecks() {
  const keys = ["who", "where", "when", "safe", "report"];
  const cards = keys.map((k, i) => { const x = 30 + i * 110; return `<g><rect x="${x}" y="70" width="90" height="120" rx="12" fill="${WHITE}" stroke="${INK}" stroke-width="2"/>
    <text x="${x+45}" y="96" text-anchor="middle" font-size="14" font-weight="600" fill="${GREY}">${i+1}</text>${icons[k](x+45, 142)}</g>`; }).join("");
  return svg(600, 260, `
    <circle cx="300" cy="130" r="104" fill="${TEAL}" opacity=".07"/>
    <path d="M75 222h450" stroke="${GREY}" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round"/>
    ${cards}`);
}

// 2. One referral page on a phone: a few lines of text, form fields and a gold send button (for "one referral page")
function referralPage() {
  const field = (y) => `<rect x="236" y="${y}" width="128" height="16" rx="4" fill="${WHITE}" stroke="${GREY}" stroke-width="1.5"/>`;
  return svg(600, 260, `
    <circle cx="300" cy="130" r="108" fill="${TEAL}" opacity=".07"/>
    <rect x="220" y="18" width="160" height="226" rx="22" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
    <path d="M282 32h36" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M236 56h96M236 68h120M236 80h70" stroke="${TEAL}" stroke-width="3" stroke-linecap="round"/>
    ${field(98)}${field(122)}${field(146)}
    <rect x="236" y="176" width="128" height="26" rx="13" fill="${GOLD}"/>
    <path d="M292 189h16m-6-6 6 6-6 6" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M118 104c0 30 24 54 54 54l8-12-14-8-6 6c-10-4-18-12-22-22l6-6-8-14z"/></g>
    <g fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M430 90h40l12 12v52h-52z"/><path d="M442 116h28M442 128h28M442 140h18"/><path d="M470 90v12h12"/></g>`);
}

// 3. Left: cash and a gift card, crossed out. Right: a page with a tick. (for "Don't pay for referrals")
function dontPay() {
  return svg(600, 260, `
    <circle cx="300" cy="130" r="104" fill="${TEAL}" opacity=".07"/>
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="70" y="92" width="120" height="70" rx="8" fill="${WHITE}" stroke="${TEAL}" stroke-width="2.5"/>
      <circle cx="130" cy="127" r="16" stroke="${TEAL}" stroke-width="2.5"/>
      <text x="130" y="134" text-anchor="middle" font-size="20" font-weight="600" fill="${TEAL}" stroke="none">$</text>
      <rect x="110" y="140" width="110" height="64" rx="8" fill="${WHITE}" stroke="${TEAL}" stroke-width="2.5"/>
      <path d="M110 160h110" stroke="${GOLD}" stroke-width="3"/>
      <path d="M58 220L238 74" stroke="${INK}" stroke-width="3"/>
    </g>
    <path d="M272 130h56m-12-12 12 12-12 12" stroke="${GREY}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="380" y="62" width="130" height="150" rx="12" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/>
      <path d="M400 92h90M400 108h90M400 124h60" stroke="${TEAL}" stroke-width="3"/>
      <circle cx="445" cy="172" r="22" stroke="${GOLD}" stroke-width="3"/>
      <path d="M434 172l8 8 14-15" stroke="${GOLD}" stroke-width="3.5"/>
    </g>`);
}

// The cover, 1600 x 900, on the site's dark ink. Everything important sits inside the middle 1200 x 700.
function cover() {
  const DARK = "#0E1C1B";
  const logo = readFileSync(join(ROOT, "site", "logo-reversed.svg")).toString("base64");
  const dots = [[60,90],[40,200],[70,310],[150,380],[140,40]].map(([x,y])=>`<path d="M${x} ${y}L360 214" stroke="#fff" stroke-opacity=".3" stroke-width="3" stroke-dasharray="3 12"/><circle cx="${x}" cy="${y}" r="16" stroke="${GOLD}" stroke-width="5"/>`).join("");
  return `<div class="cover">
<style>
.cover{width:1600px;height:900px;background:${DARK};position:relative;overflow:hidden;color:#fff}
.cover:before{content:"";position:absolute;inset:0;background:radial-gradient(60% 80% at 85% 20%,rgba(31,91,90,.75) 0%,transparent 65%),radial-gradient(50% 60% at 10% 100%,rgba(224,165,38,.12) 0%,transparent 60%)}
.copy{position:absolute;left:230px;top:235px;width:760px;display:grid;gap:24px}
.e{font-size:24px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:${GOLD};display:flex;align-items:center;gap:14px}
.e:before{content:"";width:12px;height:12px;border-radius:50%;background:${GOLD}}
.h{font-size:80px;font-weight:500;letter-spacing:-.04em;line-height:1.04}
.h span{border:4px solid ${GOLD};border-radius:16px;padding:0 10px;display:inline-block;line-height:1}
.s{font-size:32px;color:#C9D3D0}
.logo{position:absolute;left:230px;bottom:118px;height:46px;opacity:.9}
.art{position:absolute;right:190px;top:240px;width:440px;height:430px}
</style>
<div class="copy"><div class="e">Getting referrals</div><div class="h">How to get NDIS <span>referrals</span></div><div class="s">The 5 things support coordinators check first</div></div>
<img class="logo" src="data:image/svg+xml;base64,${logo}" alt="">
<svg class="art" width="440" height="430" viewBox="0 0 440 430" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  ${dots}
  <circle cx="360" cy="214" r="44" fill="${GOLD}"/>
  <path d="M342 214l12 12 22-24" stroke="${DARK}" stroke-width="7"/>
</svg>
</div>`;
}

function svg(w, h, body, bg = PAPER) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="DM Sans"><rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>`;
}


(async () => {
  const browser = await chromium.launch();
  const shoot = async (markup, file, w, h, scale, selector = "svg") => {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}*{margin:0;box-sizing:border-box}body{width:${w}px;height:${h}px;font-family:"DM Sans",sans-serif;-webkit-font-smoothing:antialiased}svg{display:block}</style></head><body>${markup}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    const jpg = file.endsWith(".jpg");
    await page.locator(selector).first().screenshot({ path: join(OUT, file), type: jpg ? "jpeg" : "png", ...(jpg ? { quality: 88 } : {}) });
    await page.close();
    console.log("saved", file);
  };
  await shoot(cover(), "cover.jpg", 1600, 900, 1, ".cover");
  await shoot(fiveChecks(), "five-checks.png", 600, 260, 2);
  await shoot(referralPage(), "referral-page.png", 600, 260, 2);
  await shoot(dontPay(), "dont-pay.png", 600, 260, 2);
  await browser.close();
})();
