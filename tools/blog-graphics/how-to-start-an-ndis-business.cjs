// Draws the cover and three small line drawings for the blog post "How to start an NDIS business
// in Australia in 2026-27" in the site's colours, and saves them into the post's folder.
// The drawings inside the article sit beside the writing rather than repeating it, so they carry
// almost no words. The cover is on the site's dark ink, with the headline.
// To change one, edit it below and run:
//   node tools/blog-graphics/how-to-start-an-ndis-business.cjs
// (needs Playwright with Chromium, which the cloud sessions already have).
const { chromium } = require("playwright");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const ROOT = join(__dirname, "..", "..");
const OUT = join(ROOT, "content", "blog", "how-to-start-an-ndis-business");
const font = (w) => readFileSync(join(__dirname, "fonts", `dm-sans-latin-${w}-normal.woff2`)).toString("base64");
const FONTS = [400, 500, 600].map((w) => `@font-face{font-family:"DM Sans";font-weight:${w};src:url(data:font/woff2;base64,${font(w)}) format("woff2")}`).join("");

const INK = "#1F2B28", GOLD = "#E0A526", TEAL = "#1F5B5A", PAPER = "#F6F5F1", GREY = "#9AA19F", WHITE = "#FFFFFF";

// A wrapped gift drawn in thin lines: box, lid, ribbon and bow. (x, y) is the top-left of the lid.
function gift(x, y, w, h, stroke = 2.5) {
  const lid = Math.round(h * 0.24), mid = x + w / 2, bow = w * 0.28;
  return `<g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <rect x="${x + w * 0.06}" y="${y + lid}" width="${w * 0.88}" height="${h - lid}" rx="${w * 0.05}" fill="${WHITE}" stroke="${TEAL}" stroke-width="${stroke}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${lid}" rx="${w * 0.05}" fill="${WHITE}" stroke="${TEAL}" stroke-width="${stroke}"/>
    <path d="M${mid} ${y}V${y + h}" stroke="${GOLD}" stroke-width="${stroke * 1.2}"/>
    <path d="M${mid} ${y}c${-bow * 0.6} ${-bow * 0.9} ${-bow * 1.5} ${-bow * 0.9} ${-bow * 1.4} ${-bow * 0.25}c${bow * 0.05} ${bow * 0.3} ${bow * 0.7} ${bow * 0.3} ${bow * 1.4} ${bow * 0.25}z
             M${mid} ${y}c${bow * 0.6} ${-bow * 0.9} ${bow * 1.5} ${-bow * 0.9} ${bow * 1.4} ${-bow * 0.25}c${-bow * 0.05} ${bow * 0.3} ${-bow * 0.7} ${bow * 0.3} ${-bow * 1.4} ${bow * 0.25}z" stroke="${GOLD}" stroke-width="${stroke * 1.2}"/>
  </g>`;
}


// 1. A winding path with 7 stepping stones, ending at a small flag (for "Step 1")
function roadmap() {
  const pts = [[70,200],[150,160],[220,196],[300,150],[370,186],[440,132],[500,150]];
  const stones = pts.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="17" fill="${i===0?GOLD:WHITE}" stroke="${i===0?GOLD:INK}" stroke-width="2"/><text x="${x}" y="${y+5}" text-anchor="middle" font-size="14" font-weight="600" fill="${i===0?INK:TEAL}">${i+1}</text>`).join("");
  return svg(600, 260, `
    <circle cx="300" cy="150" r="104" fill="${TEAL}" opacity=".07"/>
    <path d="M70 200C110 150 120 150 150 160S190 210 220 196S270 140 300 150S340 196 370 186S410 120 440 132S480 160 500 150" fill="none" stroke="${GREY}" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round"/>
    ${stones}
    <path d="M532 150V72" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M532 74h40l-10 14 10 14h-40z" fill="${GOLD}" stroke="${GOLD}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="532" cy="152" r="4" fill="${INK}"/>`);
}

// 2. A fork in the road: one way to a shield with a tick (registered), one open way (for "Step 3")
function fork() {
  const sign = (x, y, label) => `<g><rect x="${x}" y="${y}" width="150" height="40" rx="8" fill="${WHITE}" stroke="${INK}" stroke-width="2"/><text x="${x+75}" y="${y+26}" text-anchor="middle" font-size="15" font-weight="600" fill="${INK}">${label}</text></g>`;
  return svg(600, 260, `
    <circle cx="300" cy="150" r="100" fill="${TEAL}" opacity=".07"/>
    <path d="M300 250V170" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M300 172C300 140 250 128 190 118M300 172C300 140 350 128 410 118" fill="none" stroke="${GREY}" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round"/>
    ${sign(60, 70, "Registered")}${sign(390, 70, "Unregistered")}
    <path d="M110 150l25-10 25 10v20c0 16-12 26-25 30-13-4-25-14-25-30z" fill="${WHITE}" stroke="${TEAL}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M124 168l8 8 15-16" fill="none" stroke="${GOLD}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <g stroke="${TEAL}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="440" y="140" width="50" height="58" rx="6" fill="${WHITE}"/><path d="M450 158h30M450 170h30M450 182h18"/></g>
    <circle cx="300" cy="172" r="6" fill="${GOLD}"/>`);
}

// 3. Three date cards: records kept (27 Aug), no gifts (20 Nov), claim within 90 days (1 Dec) (for "Step 6")
function dates() {
  const card = (x, day, mon, icon) => `<g><rect x="${x}" y="52" width="140" height="170" rx="14" fill="${WHITE}" stroke="${INK}" stroke-width="2"/>
    <path d="M${x} 92h140" stroke="#E3E2DC" stroke-width="1.5"/>
    <text x="${x+70}" y="80" text-anchor="middle" font-size="15" font-weight="600" fill="${TEAL}" letter-spacing=".06em">${mon}</text>
    <text x="${x+70}" y="140" text-anchor="middle" font-size="44" font-weight="500" fill="${INK}" letter-spacing="-.03em">${day}</text>${icon(x+70)}</g>`;
  const folder = (cx) => `<g fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linejoin="round"><path d="M${cx-22} 168h14l5 6h25v24h-44z"/></g>`;
  const gift2 = (cx) => `${gift(cx-18, 166, 36, 32, 2)}<path d="M${cx-24} 204l48-42" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`;
  const clock = (cx) => `<g fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linecap="round"><circle cx="${cx}" cy="184" r="17"/><path d="M${cx} 174v10l7 5" stroke="${GOLD}"/></g>`;
  return svg(600, 260, `
    <circle cx="300" cy="140" r="104" fill="${TEAL}" opacity=".07"/>
    <path d="M120 238h360" stroke="${GREY}" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round"/>
    ${card(50, "27", "AUG", folder)}${card(230, "20", "NOV", gift2)}${card(410, "1", "DEC", clock)}`);
}

// The cover, 1600 x 900, on the site's dark ink. The blog crops it to a wide strip on computers
// and to 4:3 on phones, so everything important sits inside the middle 1200 x 700.
function cover() {
  const DARK = "#0E1C1B";
  const logo = readFileSync(join(ROOT, "site", "logo-reversed.svg")).toString("base64");
  const stones = [[40,330],[120,290],[190,320],[260,262],[320,290],[380,226],[420,236]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="16" fill="${i===6?GOLD:"none"}" stroke="${GOLD}" stroke-width="5"/>`).join("");
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
.art{position:absolute;right:190px;top:250px;width:480px;height:420px}
</style>
<div class="copy"><div class="e">Starting out</div><div class="h">How to <span>start</span> an NDIS business</div><div class="s">7 steps, in plain English, for 2026–27</div></div>
<img class="logo" src="data:image/svg+xml;base64,${logo}" alt="">
<svg class="art" width="480" height="420" viewBox="0 0 480 420" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M40 330C80 300 100 290 120 290S170 330 190 320S240 262 260 262S300 296 320 290S360 228 380 226S410 236 420 236" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-dasharray="3 12"/>
  ${stones}
  <path d="M420 220V110" stroke="#fff" stroke-opacity=".85" stroke-width="5"/>
  <path d="M420 112h56l-14 20 14 20h-56z" stroke="${GOLD}" stroke-width="5"/>
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
  await shoot(roadmap(), "roadmap.png", 600, 260, 2);
  await shoot(fork(), "register-or-not.png", 600, 260, 2);
  await shoot(dates(), "three-dates.png", 600, 260, 2);
  await browser.close();
})();
