// Builds the site into dist/: copies site/, builds the blog from content/blog (see blog.mjs),
// then fills the NDIS news panel ({{NDIS_NEWS}}) and every "last checked" date
// ({{NDIS_LAST_CHECKED}}) from src/data/ndis-news.json.
// The data file is validated first, so a bad file fails the build and nothing is deployed.
// Uses only Node built-ins so it runs anywhere Node 18+ (or Bun) is installed.

import { cpSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildBlog } from "./blog.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const siteDir = join(root, "site");
const distDir = join(root, "dist");
const dataFile = join(root, "src", "data", "ndis-news.json");

const NEWS_TOKEN = "{{NDIS_NEWS}}";
const DATE_TOKEN = "{{NDIS_LAST_CHECKED}}";
const NEWS_PAGES = ["index.html", "policies.html"];
const FILE_FIELDS = ["last_checked", "approved_by", "approved_on", "items"];
const ITEM_FIELDS = ["headline", "whats_changing", "who_it_affects", "when", "what_to_do", "status", "source_url", "source_published"];
const TEXT_FIELDS = ["headline", "whats_changing", "who_it_affects", "when", "what_to_do"];
const STATUSES = ["VERIFIED", "EXPECTED"];
const OFFICIAL_HOSTS = ["ndiscommission.gov.au", "ndis.gov.au", "health.gov.au", "legislation.gov.au"];
const MAX_ITEMS = 4;
const MAX_WORDS = 80;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const news = loadNews();

rmSync(distDir, { recursive: true, force: true });
cpSync(siteDir, distDir, { recursive: true });
const blogSummary = buildBlog({ root, distDir, fail });
for (const name of htmlFiles(distDir)) {
  const path = join(distDir, name);
  let html = readFileSync(path, "utf8");
  if (NEWS_PAGES.includes(name) && !html.includes(NEWS_TOKEN)) fail(`site/${name} is missing ${NEWS_TOKEN}`);
  html = html.replaceAll(NEWS_TOKEN, renderPanel(news)).replaceAll(DATE_TOKEN, formatDate(news.last_checked));
  if (/\{\{[A-Z_]+\}\}/.test(html)) fail(`${name} has an unknown {{PLACEHOLDER}}`);
  writeFileSync(path, html);
}
for (const name of ["sitemap.xml", "llms.txt"]) {
  if (/\{\{[A-Z_]+\}\}|<!-- [A-Z_]+ -->/.test(readFileSync(join(distDir, name), "utf8"))) fail(`${name} has an unfilled placeholder`);
}
console.log(`Built dist/: ${blogSummary}; ${news.items.length} NDIS news item(s), last checked ${formatDate(news.last_checked)}.`);

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
  if (news.approved_by !== "Ajay") fail('approved_by must be "Ajay"');
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
  return `${body}\n    ${stamp}`;
}

// Each item is one short line (when + headline) with a "Learn more" link to the official page.
// The other fields stay in the data file for the researcher's records but aren't shown.
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
