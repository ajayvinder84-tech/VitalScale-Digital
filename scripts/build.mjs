// Builds the site into dist/: copies site/, builds the blog from content/blog (see blog.mjs),
// then fills the NDIS news panel ({{NDIS_NEWS}}) and every "last checked" date
// ({{NDIS_LAST_CHECKED}}) from src/data/ndis-news.json, and the homepage "Latest from the blog"
// strip ({{LATEST_POSTS}}) from the newest blog posts.
// The data file is validated first, so a bad file fails the build and nothing is deployed.
// Uses only Node built-ins so it runs anywhere Node 18+ (or Bun) is installed.

import { cpSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { breadcrumbs, buildBlog, changePosts, fill, graph, jsonLd, latestStrip, reformsList } from "./blog.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const siteDir = join(root, "site");
const distDir = join(root, "dist");
const dataFile = join(root, "src", "data", "ndis-news.json");

const NEWS_TOKEN = "{{NDIS_NEWS}}";
const DATE_TOKEN = "{{NDIS_LAST_CHECKED}}";
const LATEST_TOKEN = "{{LATEST_POSTS}}";
const NEWS_PAGES = ["index.html", "ndis-policies-and-procedures.html"];
const FILE_FIELDS = ["last_checked", "approved_by", "approved_on", "items"];
const ITEM_FIELDS = ["headline", "whats_changing", "who_it_affects", "when", "what_to_do", "status", "source_url", "source_published"];
const TEXT_FIELDS = ["headline", "whats_changing", "who_it_affects", "when", "what_to_do"];
const STATUSES = ["VERIFIED", "EXPECTED"];
// Who signed off this week's news: Ajay, or the Monday automatic check he set up on 4 Nov 2026
const APPROVERS = ["Ajay", "Automatic weekly check"];
const OFFICIAL_HOSTS = ["ndiscommission.gov.au", "ndis.gov.au", "health.gov.au", "legislation.gov.au"];
const MAX_ITEMS = 4;
const MAX_WORDS = 80;
// Text still waiting for Ajay (such as the [TURNAROUND] time). A Cloudflare build (only main is
// built, and every main build goes live) stops while any page still has it; other builds just warn.
const TODO_PATTERN = /\[TURNAROUND\]|<mark class="todo">/;
const STRICT_TODO = (process.env.WORKERS_CI && process.env.WORKERS_CI !== "0") || process.argv.includes("--production");
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const news = loadNews();
const todoPages = [];

rmSync(distDir, { recursive: true, force: true });
cpSync(siteDir, distDir, { recursive: true });
const blog = buildBlog({ root, distDir, fail });
writeFileSync(join(distDir, "ndis-changes.html"), renderChangesPage(readFileSync(join(root, "templates", "page.html"), "utf8"), news, blog.posts));
for (const name of htmlFiles(distDir)) {
  const path = join(distDir, name);
  let html = readFileSync(path, "utf8");
  if (NEWS_PAGES.includes(name) && !html.includes(NEWS_TOKEN)) fail(`site/${name} is missing ${NEWS_TOKEN}`);
  if (name === "index.html" && !html.includes(LATEST_TOKEN)) fail(`site/index.html is missing ${LATEST_TOKEN}`);
  html = html.replaceAll(NEWS_TOKEN, renderPanel(news)).replaceAll(DATE_TOKEN, formatDate(news.last_checked))
    .replaceAll(LATEST_TOKEN, latestStrip(blog.posts));
  if (/\{\{[A-Z_]+\}\}/.test(html)) fail(`${name} has an unknown {{PLACEHOLDER}}`);
  checkStructuredData(name, html);
  if (TODO_PATTERN.test(html)) todoPages.push(name);
  writeFileSync(path, html);
}
if (todoPages.length) {
  const message = `${todoPages.join(", ")} still ${todoPages.length === 1 ? "has" : "have"} text waiting for Ajay ([TURNAROUND] or <mark class="todo">)`;
  if (STRICT_TODO) fail(`${message}. Fill it in before publishing.`);
  console.warn(`Warning: ${message}. A production build (Cloudflare, or --production) will stop until it's filled in.`);
}
const sitemapFile = join(distDir, "sitemap.xml");
writeFileSync(sitemapFile, readFileSync(sitemapFile, "utf8").replaceAll("{{NDIS_LAST_CHECKED_ISO}}", news.last_checked));
for (const name of ["sitemap.xml", "llms.txt"]) {
  if (/\{\{[A-Z_]+\}\}|<!-- [A-Z_]+ -->/.test(readFileSync(join(distDir, name), "utf8"))) fail(`${name} has an unfilled placeholder`);
}
console.log(`Built dist/: ${blog.summary}; ${news.items.length} NDIS news item(s), last checked ${formatDate(news.last_checked)}.`);

// Each page's structured data must be valid JSON, and every question and answer in it must be
// shown on the page word for word (search engines ignore, or penalise, FAQ data that isn't visible).
function checkStructuredData(name, html) {
  const shown = new Set([...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => plainText(m[1])));
  const pageText = flatText(html.replace(/<script[\s\S]*?<\/script>/g, " "));
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(json);
    } catch (error) {
      fail(`${name} has broken structured data (application/ld+json): ${error.message}`);
    }
    for (const node of data["@graph"] ?? [data]) {
      for (const question of node.mainEntity ?? []) {
        if (question["@type"] !== "Question") continue;
        if (!shown.has(plainText(question.name))) fail(`${name}: the FAQ question "${question.name}" isn't shown on the page`);
        if (!pageText.includes(flatText(question.acceptedAnswer?.text ?? ""))) {
          fail(`${name}: the answer to "${question.name}" doesn't match the page word for word`);
        }
      }
    }
  }
}

// Page text with tags turned into spaces, so an answer split over paragraphs or links still matches.
// Screen-reader-only extras such as "(opens in a new tab)" are left out.
function flatText(text) {
  const visible = text.replace(/<span class="visually-hidden">[\s\S]*?<\/span>/g, "");
  return plainText(visible.replace(/<[^>]+>/g, " ")).replace(/\s+([.,!?;:])/g, "$1");
}

function plainText(text) {
  return text.replace(/<[^>]+>/g, "").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

// Every .html file under dir, as paths relative to it with forward slashes (blog/post.html).
function htmlFiles(dir, prefix = "") {
  return readdirSync(join(dir, prefix), { withFileTypes: true }).flatMap((entry) => {
    const name = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return htmlFiles(dir, name);
    return entry.name.endsWith(".html") ? [name] : [];
  });
}

function loadNews() {
  let news;
  try {
    news = JSON.parse(readFileSync(dataFile, "utf8"));
  } catch (error) {
    fail(`src/data/ndis-news.json is not valid JSON: ${error.message}`);
  }
  expectFields(news, FILE_FIELDS, "The file");
  if (!isDate(news.last_checked)) fail("last_checked must be a real date written YYYY-MM-DD");
  if (!isDate(news.approved_on)) fail("approved_on must be a real date written YYYY-MM-DD");
  if (!APPROVERS.includes(news.approved_by)) fail(`approved_by must be one of: ${APPROVERS.join(", ")}`);
  if (!Array.isArray(news.items) || news.items.length > MAX_ITEMS) fail(`items must be a list of at most ${MAX_ITEMS}`);
  news.items.forEach((item, index) => {
    const label = `Item ${index + 1}`;
    expectFields(item, ITEM_FIELDS, label);
    for (const field of ITEM_FIELDS) {
      if (typeof item[field] !== "string" || !item[field].trim()) fail(`${label}: ${field} is empty`);
    }
    if (!STATUSES.includes(item.status)) fail(`${label}: status must be VERIFIED or EXPECTED`);
    if (!isOfficialSource(item.source_url)) fail(`${label}: source_url must be an https:// link on an official NDIS source`);
    if (!isDate(item.source_published)) fail(`${label}: source_published must be a real date written YYYY-MM-DD`);
    const words = TEXT_FIELDS.map((field) => item[field]).join(" ").split(/\s+/).filter(Boolean).length;
    if (words >= MAX_WORDS) fail(`${label}: ${words} words, must be under ${MAX_WORDS}`);
  });
  return news;
}

function expectFields(value, fields, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail(`${label} must be a JSON object`);
  if (Object.keys(value).sort().join() !== [...fields].sort().join()) {
    fail(`${label} must have exactly these fields: ${fields.join(", ")}`);
  }
}

function isDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isOfficialSource(value) {
  if (!value.startsWith("https://")) return false;
  let host;
  try {
    host = new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return false;
  }
  return OFFICIAL_HOSTS.includes(host) || /^ministers\.[a-z0-9-]+\.gov\.au$/.test(host);
}

function formatDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

function renderPanel({ items, last_checked }) {
  const body = items.length
    ? `<dl class="record-body">\n${items.map(renderItem).join("\n")}\n    </dl>`
    : `<p class="news-empty">No major NDIS changes this week.</p>`;
  const stamp = `<p class="update-stamp"><span class="dot" aria-hidden="true"></span><span>Updated every Monday</span><span aria-hidden="true">·</span><span>Last checked: <strong>${formatDate(last_checked)}</strong></span></p>`;
  const more = `<p class="news-more"><a href="/ndis-changes.html">See the full details of each change</a></p>`;
  return `${body}\n    ${stamp}\n    ${more}`;
}

// Each item is one short line (when + headline) with a "Learn more" link to the official page.
// The other fields stay in the data file for the researcher's records but aren't shown.
// The /ndis-changes page: every item in full (what's changing, who it affects, when, what to
// do and the official source), rebuilt from the same approved file as the panel, then the
// "NDIS reforms 2026" list of every blog post about an NDIS change, newest first.
function renderChangesPage(template, { items, last_checked }, posts) {
  const url = "https://vitalscaledigital.com.au/ndis-changes";
  const title = "NDIS Changes 2026: What Providers Need to Know | VitalScale";
  const description = "The NDIS changes and reforms that affect providers, in plain English, checked against official NDIS sources every Monday.";
  const cards = items.map((item) => {
    const host = new URL(item.source_url).hostname.replace(/^www\./, "");
    const tag = item.status === "EXPECTED" ? `<span class="tag tag-signal">Expected, not final</span>` : "";
    return `<article class="change">
    <div class="change-head"><span class="change-when">${escape(item.when)}</span>${tag}</div>
    <h2>${escape(item.headline)}</h2>
    <dl class="change-facts">
      <div><dt>What's changing</dt><dd>${escape(item.whats_changing)}</dd></div>
      <div><dt>Who it affects</dt><dd>${escape(item.who_it_affects)}</dd></div>
      <div><dt>What to do</dt><dd>${escape(item.what_to_do)}</dd></div>
    </dl>
    <p class="change-source"><a href="${escape(item.source_url)}" target="_blank" rel="noopener">Read it on ${escape(host)}<span class="visually-hidden"> (opens in a new tab)</span></a><span aria-hidden="true">·</span>Published ${formatDate(item.source_published)}</p>
  </article>`;
  }).join("\n  ");
  const main = `<section class="hero"><div class="wrap">
  <div class="hero-copy">
    <span class="eyebrow">Updated every Monday</span>
    <h1>NDIS changes 2026: what providers need to know.</h1>
    <p class="lede">The NDIS changes and reforms that affect providers, in plain English. Each one is checked against official NDIS sources every Monday. Last checked: <strong>${formatDate(last_checked)}</strong>.</p>
  </div>
</div></section>
<section class="band"><div class="wrap">
  <div class="changes">
  ${items.length ? cards : `<p class="news-empty">No major NDIS changes this week.</p>`}
  </div>
  <p class="muted small changes-note">This is general information, not legal advice. Always check the official source before you act.</p>
</div></section>
<section id="reforms"><div class="wrap">
  <div class="section-head">
    <span class="eyebrow">Our guides</span>
    <h2>NDIS reforms 2026</h2>
    <p class="muted">Plain-English guides to the 2026 NDIS changes, newest first. Each one lists the official sources it relies on.</p>
  </div>
  ${reformsList(posts)}
</div></section>`;
  const guides = changePosts(posts);
  const ld = graph([
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, dateModified: last_checked, inLanguage: "en-AU",
      isPartOf: { "@id": "https://vitalscaledigital.com.au/#website" }, breadcrumb: { "@id": `${url}#breadcrumb` },
      ...(guides.length ? { hasPart: guides.map((post) => ({ "@type": "BlogPosting", headline: post.title, url: `https://vitalscaledigital.com.au/blog/${post.slug}`, datePublished: post.date })) } : {}) },
    breadcrumbs(url, ["NDIS changes", url]),
  ]);
  return fill(template, {
    TITLE: title, DESCRIPTION: description, URL: url, OG_TYPE: "website", OG_IMAGE: "https://vitalscaledigital.com.au/og/ndis-changes.jpg",
    OG_IMAGE_ALT: "VitalScale Digital: NDIS changes 2026, what providers need to know", JSON_LD: jsonLd(ld), MAIN: main, FORM_PAGE: "ndis-changes",
    FORM_HEADING: "Not sure what these changes mean for you?",
    FORM_TEXT: "Tell us about your business. Ajay will tell you plainly which changes matter for you and what to do first.",
  }).replace('<a href="/blog.html" aria-current="page">Blog</a>', '<a href="/blog.html">Blog</a>')
    .replace('<a href="/ndis-changes.html">NDIS changes</a>', '<a href="/ndis-changes.html" aria-current="page">NDIS changes</a>');
}

function renderItem(item) {
  const tag = item.status === "EXPECTED" ? ` <span class="tag tag-signal">Expected, not final</span>` : "";
  const host = new URL(item.source_url).hostname.replace(/^www\./, "");
  return `      <div class="record-row news-item"><dt>${escape(item.when)}</dt><dd>
        <h3 class="news-headline">${escape(item.headline)}${tag}</h3>
        <a class="news-link" href="${escape(item.source_url)}" target="_blank" rel="noopener">Learn more<span class="visually-hidden"> on ${escape(host)} (opens in a new tab)</span></a>
      </dd></div>`;
}

function escape(text) {
  return text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function fail(message) {
  console.error(`Build stopped: ${message}`);
  process.exit(1);
}
