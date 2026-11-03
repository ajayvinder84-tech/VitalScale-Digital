// Draws the cover and three small line drawings for the blog post "NDIS inducements ban: can
// providers still give gifts?" in the site's colours, and saves them into the post's folder.
// The drawings sit beside the writing rather than repeating it, so they carry almost no words.
// To change one, edit it below and run:
//   node tools/blog-graphics/ndis-inducements-gifts.cjs
// (needs Playwright with Chromium, which the cloud sessions already have).
const { chromium } = require("playwright");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const ROOT = join(__dirname, "..", "..");
const OUT = join(ROOT, "content", "blog", "ndis-inducements-gifts");
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

// 1. A November 2026 calendar with the 20th circled, beside a gift (for "What changes on 20 November")
function calendar() {
  const cells = [];
  const left = 172, top = 130, cw = 30, rh = 21;
  "MTWTFSS".split("").forEach((d, i) => cells.push(`<text x="${left + i * cw}" y="104" fill="${GREY}" font-size="11" font-weight="600" text-anchor="middle">${d}</text>`));
  // 1 November 2026 is a Sunday; weeks start on Monday
  for (let day = 1; day <= 30; day++) {
    const slot = day + 5, col = slot % 7, row = Math.floor(slot / 7);
    const x = left + col * cw, y = top + row * rh;
    if (day === 20) cells.push(`<rect x="${x - 14}" y="${y - 15}" width="28" height="21" rx="6" fill="none" stroke="${GOLD}" stroke-width="2.5"/>`);
    cells.push(`<text x="${x}" y="${y}" fill="${day === 20 ? INK : "#5E6664"}" font-size="12" font-weight="${day === 20 ? 600 : 400}" text-anchor="middle">${day}</text>`);
  }
  return svg(600, 260, `
    <circle cx="470" cy="150" r="92" fill="${TEAL}" opacity=".07"/>
    <rect x="140" y="34" width="244" height="208" rx="14" fill="${WHITE}" stroke="${INK}" stroke-width="2"/>
    <path d="M140 84h244" stroke="#E3E2DC" stroke-width="1.5"/>
    <rect x="186" y="24" width="10" height="22" rx="5" fill="${PAPER}" stroke="${INK}" stroke-width="2"/>
    <rect x="328" y="24" width="10" height="22" rx="5" fill="${PAPER}" stroke="${INK}" stroke-width="2"/>
    <text x="160" y="69" fill="${TEAL}" font-size="15" font-weight="600" letter-spacing=".04em">November 2026</text>
    ${cells.join("")}
    <path d="M308 181C360 196 392 176 418 150" fill="none" stroke="${GOLD}" stroke-width="2" stroke-dasharray="2 6" stroke-linecap="round"/>
    ${gift(424, 112, 96, 96)}
    <circle cx="548" cy="96" r="4" fill="${GOLD}" opacity=".7"/><circle cx="408" cy="96" r="3" fill="${TEAL}" opacity=".5"/><circle cx="560" cy="200" r="3" fill="${TEAL}" opacity=".5"/>`);
}

// 2. A provider passing a gift to three different people (for "it does not matter whether the person is the participant")
function who() {
  const person = (cx, cy, fill) => `<g stroke="${INK}" stroke-width="2" fill="${fill}"><circle cx="${cx}" cy="${cy - 12}" r="11"/><path d="M${cx - 20} ${cy + 22}c0-14 9-22 20-22s20 8 20 22z" stroke-linejoin="round"/></g>`;
  const dash = `fill="none" stroke="${GREY}" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round"`;
  return svg(600, 260, `
    <circle cx="300" cy="135" r="96" fill="${TEAL}" opacity=".07"/>
    <g stroke="${INK}" stroke-width="2" stroke-linejoin="round" fill="${WHITE}">
      <rect x="68" y="118" width="92" height="76" rx="4"/>
      <path d="M60 118l10-26h104l10 26z" fill="${PAPER}"/>
      <path d="M60 118c0 9 13 9 15 0c2 9 13 9 15 0c2 9 13 9 15 0c2 9 13 9 15 0c2 9 13 9 15 0c2 9 13 9 15 0c2 9 13 9 15 0" fill="none" transform="translate(4 0) scale(.97 1)"/>
      <rect x="99" y="152" width="30" height="42" rx="3" fill="${PAPER}"/>
    </g>
    <path d="M176 150h66" ${dash}/>
    ${gift(254, 98, 92, 92)}
    <path d="M360 142C400 142 410 76 452 74" ${dash}/><path d="M360 150h92" ${dash}/><path d="M360 158C400 158 410 222 452 222" ${dash}/>
    ${person(486, 76, WHITE)}${person(486, 152, `${GOLD}33`)}${person(486, 226, WHITE)}`);
}

// 3. A website and a phone showing gift offers, with a magnifying glass over them (for "Where inducements hide")
function marketing() {
  const line = (x, y, w, c = "#E3E2DC") => `<rect x="${x}" y="${y}" width="${w}" height="7" rx="3.5" fill="${c}"/>`;
  return svg(600, 260, `
    <circle cx="330" cy="140" r="100" fill="${TEAL}" opacity=".07"/>
    <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
      <rect x="96" y="38" width="250" height="180" rx="12" fill="${WHITE}"/>
      <path d="M96 64h250" fill="none" stroke="#E3E2DC" stroke-width="1.5"/>
    </g>
    <circle cx="114" cy="51" r="4" fill="#E3E2DC"/><circle cx="128" cy="51" r="4" fill="#E3E2DC"/><circle cx="142" cy="51" r="4" fill="#E3E2DC"/>
    <rect x="116" y="80" width="210" height="62" rx="8" fill="${PAPER}"/>
    ${gift(132, 92, 38, 38, 2)}
    ${line(186, 98, 110, "#CFD3D1")}${line(186, 114, 76)}
    ${line(116, 160, 180)}${line(116, 176, 140)}${line(116, 192, 160)}
    <rect x="318" y="70" width="104" height="176" rx="16" fill="${WHITE}" stroke="${INK}" stroke-width="2"/>
    <circle cx="340" cy="94" r="8" fill="#E3E2DC"/>${line(354, 90, 50)}
    <rect x="330" y="112" width="80" height="66" rx="8" fill="${PAPER}"/>
    ${gift(352, 124, 36, 36, 2)}
    <path d="M336 200c-4-6 3-11 7-6c4-5 11 0 7 6l-7 7z" fill="none" stroke="${GOLD}" stroke-width="2" stroke-linejoin="round"/>
    ${line(358, 198, 44)}${line(332, 216, 72)}
    <g stroke-linecap="round"><circle cx="398" cy="140" r="36" fill="${WHITE}" fill-opacity=".35" stroke="${GOLD}" stroke-width="4"/>
    <path d="M424 166l34 34" stroke="${INK}" stroke-width="7"/></g>`);
}

// The cover, 1600 x 900. The blog crops it to a wide strip on computers and to 4:3 on phones,
// so the drawing sits in the middle.
function cover() {
  return svg(1600, 900, `
    <circle cx="800" cy="470" r="330" fill="${TEAL}" opacity=".07"/>
    <circle cx="1040" cy="250" r="12" fill="${GOLD}" opacity=".6"/><circle cx="540" cy="300" r="8" fill="${TEAL}" opacity=".35"/>
    <circle cx="1110" cy="640" r="7" fill="${TEAL}" opacity=".35"/><circle cx="500" cy="660" r="10" fill="${GOLD}" opacity=".45"/>
    ${gift(630, 330, 340, 330, 7)}
    <path d="M800 330C870 300 960 320 1010 380" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="3 10" stroke-linecap="round"/>
    <g transform="translate(990 372) rotate(10)">
      <path d="M0 22L22 0h118a12 12 0 0 1 12 12v44a12 12 0 0 1-12 12H22z" fill="${WHITE}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="24" cy="34" r="6" fill="none" stroke="${INK}" stroke-width="3"/>
      <text x="86" y="45" fill="${TEAL}" font-size="28" font-weight="600" text-anchor="middle">20 Nov</text>
    </g>`, PAPER);
}

function svg(w, h, body, bg = PAPER) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="DM Sans"><rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>`;
}

(async () => {
  const browser = await chromium.launch();
  const shoot = async (markup, file, w, h, scale) => {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}*{margin:0}body{width:${w}px;height:${h}px}svg{display:block}</style></head><body>${markup}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    const jpg = file.endsWith(".jpg");
    await page.locator("svg").screenshot({ path: join(OUT, file), type: jpg ? "jpeg" : "png", ...(jpg ? { quality: 88 } : {}) });
    await page.close();
    console.log("saved", file);
  };
  await shoot(cover(), "cover.jpg", 1600, 900, 1);
  await shoot(calendar(), "calendar.png", 600, 260, 2);
  await shoot(who(), "who-it-covers.png", 600, 260, 2);
  await shoot(marketing(), "marketing-check.png", 600, 260, 2);
  await browser.close();
})();
