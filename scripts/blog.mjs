// Builds the blog from content/blog/<slug>/post.md into dist/: one page per post at
// /blog/<slug>, the /blog list page, and the blog entries in sitemap.xml and llms.txt.
// Each post.md starts with a front-matter block (see REQUIRED below) followed by the article
// in plain Markdown. A post appears only once its `date` has arrived in Melbourne, and any
// post that fails a check stops the build, so nothing half-finished is ever published.

import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = "https://vitalscaledigital.com.au";
const REQUIRED = ["title", "description", "keyword", "category", "checked", "date"];
const OPTIONAL = ["slug", "photo_alt", "photo_credit", "photo_credit_url"];
const COVER_NAMES = ["cover.jpg", "cover.jpeg", "cover.png", "cover.webp"];
const MAX_COVER_BYTES = 1024 * 1024;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function buildBlog({ root, distDir, fail }) {
  const template = readFileSync(join(root, "templates", "page.html"), "utf8");
  const today = melbourneToday();
  const all = loadPosts(join(root, "content", "blog"), fail);
  const posts = all.filter((post) => post.date <= today).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

  mkdirSync(join(distDir, "blog", "covers"), { recursive: true });
  for (const post of posts) {
    if (post.coverFile) copyFileSync(post.coverFile, join(distDir, "blog", "covers", post.coverName));
    const more = posts.filter((other) => other !== post).slice(0, 3);
    writeFileSync(join(distDir, "blog", `${post.slug}.html`), renderPostPage(template, post, more));
  }
  writeFileSync(join(distDir, "blog.html"), renderListPage(template, posts));

  replaceToken(join(distDir, "sitemap.xml"), "<!-- BLOG_POSTS -->", posts.map((post) =>
    `<url><loc>${BASE}/blog/${post.slug}</loc><lastmod>${post.checked > post.date ? post.checked : post.date}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n  "), fail);
  replaceToken(join(distDir, "llms.txt"), "{{BLOG_GUIDES}}", posts.length
    ? posts.map((post) => `- [${post.title}](${BASE}/blog/${post.slug}): ${post.description}`).join("\n")
    : "- The first guide is coming soon.", fail);

  const waiting = all.length - posts.length;
  return `${posts.length} blog post(s)${waiting ? `, ${waiting} waiting for their date` : ""}`;
}

function loadPosts(dir, fail) {
  if (!existsSync(dir)) return [];
  const posts = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const folder = join(dir, entry.name);
    const file = join(folder, "post.md");
    if (!existsSync(file)) fail(`content/blog/${entry.name} has no post.md`);
    posts.push(loadPost(folder, entry.name, readFileSync(file, "utf8"), fail));
  }
  const slugs = new Set();
  for (const post of posts) {
    if (slugs.has(post.slug)) fail(`Two blog posts use the address /blog/${post.slug}`);
    slugs.add(post.slug);
  }
  return posts;
}

function loadPost(folder, folderName, text, fail) {
  const where = `content/blog/${folderName}/post.md`;
  const match = text.replace(/\r\n?/g, "\n").match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) fail(`${where} must start with a --- block of details, then the article`);
  const meta = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim()) continue;
    const at = line.indexOf(":");
    if (at < 1) fail(`${where}: can't read the line "${line}" (use "name: value")`);
    const key = line.slice(0, at).trim();
    if (!REQUIRED.includes(key) && !OPTIONAL.includes(key)) fail(`${where}: unknown detail "${key}"`);
    meta[key] = line.slice(at + 1).trim();
  }
  for (const key of REQUIRED) if (!meta[key]) fail(`${where}: "${key}" is missing or empty`);
  if (meta.title.length > 120) fail(`${where}: the title is over 120 characters`);
  if (meta.description.length > 170) fail(`${where}: the description is over 170 characters (aim for under 155)`);
  for (const key of ["checked", "date"]) if (!isDate(meta[key])) fail(`${where}: "${key}" must be a real date written YYYY-MM-DD`);
  const slug = meta.slug || folderName;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail(`${where}: the address "${slug}" may only use lowercase letters, numbers and hyphens`);

  const coverName = COVER_NAMES.find((name) => existsSync(join(folder, name)));
  let coverFile = null;
  if (coverName) {
    coverFile = join(folder, coverName);
    if (statSync(coverFile).size > MAX_COVER_BYTES) fail(`content/blog/${folderName}/${coverName} is over 1 MB: resize it to about 1600px wide`);
    if (!meta.photo_alt) fail(`${where}: add "photo_alt" (a short description of the cover photo)`);
  }

  const { html, toc, words } = renderMarkdown(match[2], fail, where);
  if (!toc.some((item) => /^sources\b/i.test(item.text))) fail(`${where}: add a "## Sources" section listing the official pages used`);
  return {
    ...meta,
    slug,
    coverFile,
    coverName: coverName ? `${slug}${coverName.slice(coverName.indexOf("."))}` : null,
    html,
    toc: toc.filter((item) => !/^sources\b/i.test(item.text)),
    minutes: Math.max(1, Math.round(words / 220)),
  };
}

// --- Markdown: headings, paragraphs, lists, quotes, tables, bold, italic, links and code ---

function renderMarkdown(markdown, fail, where) {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const out = [];
  const toc = [];
  const used = new Set();
  let words = 0;
  let i = 0;
  const startsBlock = (line) => /^(#{1,6}\s|>|\s*([-*+]|\d+[.)])\s+|\|)/.test(line) || /^(-{3,}|\*{3,})\s*$/.test(line);

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    let m;
    if ((m = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/))) {
      i++;
      if (m[1].length === 1) continue; // the page already shows the title
      const level = Math.min(m[1].length, 3);
      const id = uniqueId(m[2], used);
      if (level === 2) toc.push({ id, text: plain(m[2]) });
      words += countWords(m[2]);
      out.push(`<h${level} id="${id}">${inline(m[2])}</h${level}>`);
      continue;
    }
    if (/^(-{3,}|\*{3,})\s*$/.test(line)) { out.push("<hr>"); i++; continue; }
    if (line.startsWith(">")) {
      const quote = [];
      while (i < lines.length && lines[i].startsWith(">")) quote.push(lines[i++].replace(/^>\s?/, ""));
      words += countWords(quote.join(" "));
      out.push(`<blockquote class="callout">${paragraphs(quote)}</blockquote>`);
      continue;
    }
    if ((m = line.match(/^\s*([-*+]|\d+[.)])\s+/))) {
      const ordered = /\d/.test(m[1]);
      const items = [];
      while (i < lines.length) {
        const item = lines[i].match(/^\s*([-*+]|\d+[.)])\s+(.*)$/);
        if (item && /\d/.test(item[1]) === ordered) { items.push(item[2]); i++; continue; }
        if (item) break;
        if (lines[i].trim() && /^\s+/.test(lines[i]) && items.length) { items[items.length - 1] += " " + lines[i].trim(); i++; continue; }
        if (!lines[i].trim() && i + 1 < lines.length && /^\s*([-*+]|\d+[.)])\s+/.test(lines[i + 1])) { i++; continue; }
        break;
      }
      words += countWords(items.join(" "));
      const tag = ordered ? "ol" : "ul";
      out.push(`<${tag}>${items.map((item) => `<li>${inline(item)}</li>`).join("")}</${tag}>`);
      continue;
    }
    if (line.trim().startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(lines[i++].trim());
      const cells = (row) => row.replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
      if (rows.length < 2 || !/^\|?\s*:?-{2,}/.test(rows[1])) fail(`${where}: a table needs a header row and a --- row under it`);
      const head = cells(rows[0]);
      const body = rows.slice(2).map(cells);
      words += countWords(rows.join(" "));
      out.push(`<div class="table-wrap"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    if (/^\s*!\[/.test(line)) { i++; continue; } // images inside the article aren't supported; the cover photo is shown above it
    const para = [];
    while (i < lines.length && lines[i].trim() && (para.length === 0 || !startsBlock(lines[i]))) para.push(lines[i++].trim());
    words += countWords(para.join(" "));
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  return { html: out.join("\n"), toc, words };
}

function paragraphs(lines) {
  return lines.join("\n").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((p) => `<p>${inline(p.replace(/\n/g, " "))}</p>`).join("");
}

function inline(text) {
  const codes = [];
  let html = escape(text).replace(/`([^`]+)`/g, (_, code) => `\u0000${codes.push(code) - 1}\u0000`);
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (whole, label, url) => {
    if (/^https?:\/\//.test(url)) return `<a href="${url}" target="_blank" rel="noopener">${label}<span class="visually-hidden"> (opens in a new tab)</span></a>`;
    if (/^\/[^/]|^#/.test(url)) return `<a href="${url}">${label}</a>`;
    return label;
  });
  html = html.replace(/\*\*(?=\S)(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(^|[^*\w])\*(?=\S)(.+?)\*(?!\*)/g, "$1<em>$2</em>");
  html = html.replace(/(^|[^\w])_(?=\S)(.+?)_(?!\w)/g, "$1<em>$2</em>");
  return html.replace(/\u0000(\d+)\u0000/g, (_, n) => `<code>${codes[Number(n)]}</code>`);
}

const plain = (text) => text.replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
const countWords = (text) => plain(text).split(/\s+/).filter(Boolean).length;

function uniqueId(text, used) {
  const base = plain(text).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
  let id = base;
  for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
  used.add(id);
  return id;
}

// --- Pages ---

function renderPostPage(template, post, more) {
  const url = `${BASE}/blog/${post.slug}`;
  const cover = post.coverName ? `/blog/covers/${post.coverName}` : null;
  const credit = post.photo_credit
    ? `<figcaption>${post.photo_credit_url && /^https:\/\//.test(post.photo_credit_url)
      ? `<a href="${escape(post.photo_credit_url)}" target="_blank" rel="noopener">${escape(post.photo_credit)}</a>`
      : escape(post.photo_credit)}</figcaption>`
    : "";
  const toc = post.toc.length > 1
    ? `<aside class="toc" aria-label="In this guide"><details open><summary>In this guide</summary><ol>${post.toc.map((item) => `<li><a href="#${item.id}">${escape(item.text)}</a></li>`).join("")}</ol></details></aside>`
    : "";
  const main = `<article class="post">
<section class="post-hero"><div class="wrap">
  <p class="crumbs"><a href="/blog">Blog</a><span aria-hidden="true">/</span><span>${escape(post.category)}</span></p>
  <h1>${escape(post.title)}</h1>
  <p class="lede">${escape(post.description)}</p>
  <div class="post-meta">
    <img class="avatar" src="/photos/ajay.jpg" alt="" width="48" height="48">
    <p><strong>Ajay Singh</strong>, Registered Nurse<br><span>${formatDate(post.date)} · ${post.minutes} min read · Facts checked ${formatDate(post.checked)}</span></p>
  </div>
</div></section>
<div class="wrap"><figure class="post-cover">${cover
    ? `<img src="${cover}" alt="${escape(post.photo_alt)}" width="1600" height="900">`
    : designCover(post)}${credit}</figure></div>
<section class="post-body"><div class="wrap${toc ? " post-layout" : ""}">
  ${toc}
  <div class="article">
${post.html}
  </div>
</div></section>
<section class="band"><div class="wrap">
  <div class="author-card">
    <img src="/photos/ajay.jpg" alt="Ajay Singh, Registered Nurse" width="120" height="150" loading="lazy">
    <div class="stack">
      <span class="eyebrow">About the author</span>
      <h2>Ajay Singh, Registered Nurse</h2>
      <p class="muted">Ajay founded VitalScale Digital to help good NDIS providers spend less time on paperwork and be found by the people looking for them. Every guide is checked against official NDIS sources.</p>
      <a class="link-arrow" href="#book">Ask Ajay a question</a>
    </div>
  </div>
  ${more.length ? `<div class="more-guides"><h2>More guides</h2><div class="post-grid">${more.map(card).join("")}</div></div>` : ""}
</div></section>
</article>`;
  const ld = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description,
    datePublished: post.date, dateModified: post.checked > post.date ? post.checked : post.date, inLanguage: "en-AU",
    image: cover ? BASE + cover : `${BASE}/og-image.png`, mainEntityOfPage: url, keywords: post.keyword,
    author: { "@type": "Person", name: "Ajay Singh", jobTitle: "Registered Nurse", url: `${BASE}/` },
    publisher: { "@type": "Organization", name: "VitalScale Digital", logo: { "@type": "ImageObject", url: `${BASE}/logo-primary.svg` } },
  };
  return fill(template, {
    TITLE: pageTitle(post.title), DESCRIPTION: post.description, URL: url, OG_TYPE: "article",
    OG_IMAGE: cover ? BASE + cover : `${BASE}/og-image.png`, OG_IMAGE_ALT: post.photo_alt || "VitalScale Digital: calm, nurse-led help for NDIS providers",
    JSON_LD: jsonLd(ld), MAIN: main, FORM_PAGE: `blog-${post.slug}`.slice(0, 30).replace(/-$/, ""),
    FORM_HEADING: "Got a question about your NDIS business?",
    FORM_TEXT: "Tell us where you're up to. Ajay reads every message and replies personally. No obligation and no sales pressure.",
  });
}

function renderListPage(template, posts) {
  const [latest, ...rest] = posts;
  const main = `<section class="hero blog-hero"><div class="wrap">
  <div class="hero-copy">
    <span class="eyebrow">Blog · New guide every Friday</span>
    <h1>Plain-English guides for NDIS providers.</h1>
    <p class="lede">Honest answers to the questions providers ask us most, written by a Registered Nurse and checked against official NDIS sources.</p>
  </div>
</div></section>
<section class="band"><div class="wrap">
  ${latest ? `<a class="post-feature" href="/blog/${latest.slug}">
    <div class="post-feature-cover">${latest.coverName ? `<img src="/blog/covers/${latest.coverName}" alt="${escape(latest.photo_alt)}" width="1600" height="900">` : designCover(latest)}</div>
    <div class="post-feature-body">
      <span class="eyebrow">Latest · ${escape(latest.category)} · ${latest.minutes} min read</span>
      <h2>${escape(latest.title)}</h2>
      <p class="muted">${escape(latest.description)}</p>
      <span class="link-arrow">Read the guide</span>
    </div>
  </a>` : `<p class="muted">The first guide is on its way. Check back on Friday.</p>`}
  ${rest.length ? `<div class="post-grid">${rest.map(card).join("")}</div>` : ""}
</div></section>`;
  const ld = { "@context": "https://schema.org", "@type": "Blog", name: "VitalScale Digital blog", url: `${BASE}/blog`,
    publisher: { "@type": "Organization", name: "VitalScale Digital" },
    blogPost: posts.map((post) => ({ "@type": "BlogPosting", headline: post.title, url: `${BASE}/blog/${post.slug}`, datePublished: post.date })) };
  return fill(template, {
    TITLE: "NDIS provider guides and blog | VitalScale Digital",
    DESCRIPTION: "Plain-English guides for NDIS providers from a Registered Nurse, checked against official NDIS sources. A new guide every Friday.",
    URL: `${BASE}/blog`, OG_TYPE: "website", OG_IMAGE: `${BASE}/og-image.png`,
    OG_IMAGE_ALT: "VitalScale Digital: calm, nurse-led help for NDIS providers", JSON_LD: jsonLd(ld), MAIN: main, FORM_PAGE: "blog",
    FORM_HEADING: "Got a question we should answer?",
    FORM_TEXT: "Tell us what you're stuck on. Ajay reads every message and replies personally, and the most common questions become our next guides.",
  });
}

function card(post) {
  return `<article class="post-card"><a href="/blog/${post.slug}">
    <div class="post-card-cover">${post.coverName ? `<img src="/blog/covers/${post.coverName}" alt="" width="1600" height="900" loading="lazy">` : designCover(post)}</div>
    <div class="post-card-body">
      <span class="eyebrow">${escape(post.category)} · ${post.minutes} min read</span>
      <h3>${escape(post.title)}</h3>
      <p class="muted">${escape(post.description)}</p>
      <span class="post-card-date">${formatDate(post.date)}</span>
    </div>
  </a></article>`;
}

// Shown when a post has no photo: a branded panel with the category and title.
function designCover(post) {
  return `<div class="design-cover" role="img" aria-label="${escape(post.title)}"><span class="design-cover-cat">${escape(post.category)}</span><span class="design-cover-title">${escape(post.title)}</span><img src="/logo-reversed.svg" alt="" width="120" height="37"></div>`;
}

// --- Helpers ---

function fill(template, values) {
  return template.replace(/\{\{([A-Z_]+)\}\}/g, (whole, key) => {
    if (!(key in values)) return whole; // left for the main build (e.g. NDIS_LAST_CHECKED)
    return ["MAIN", "JSON_LD"].includes(key) ? values[key] : escape(values[key]);
  });
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

function pageTitle(title) {
  const full = `${title} | VitalScale Digital`;
  return full.length <= 65 ? full : title;
}

function replaceToken(path, token, value, fail) {
  const text = readFileSync(path, "utf8");
  if (!text.includes(token)) fail(`${path.split("/").slice(-1)[0]} is missing ${token}`);
  writeFileSync(path, text.replace(token, value));
}

function melbourneToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Melbourne", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

function isDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function formatDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

function escape(text) {
  return String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
