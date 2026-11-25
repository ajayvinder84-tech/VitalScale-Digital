// Keeps the "Earlier NDIS changes" list on /ndis-changes. When the weekly news file drops an item,
// this moves that item, word for word, into src/data/ndis-news-archive.json with the date it was
// last checked. Nothing is written or reworded here: every word comes from the researcher's files.
//
//   node scripts/news-archive.mjs          compare the last published news file (git HEAD) with the
//                                          one on disk, and archive whatever dropped off
//   node scripts/news-archive.mjs --all    rebuild the archive from every published news file
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const newsPath = join(root, "src", "data", "ndis-news.json");
const archivePath = join(root, "src", "data", "ndis-news-archive.json");
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" });
// The same news item, week to week, keeps its headline. The same topic keeps its official page and date.
const key = (item) => item.headline;
const topic = (item) => `${item.source_url}|${item.when}`;

const current = JSON.parse(readFileSync(newsPath, "utf8"));
const saved = existsSync(archivePath) ? JSON.parse(readFileSync(archivePath, "utf8")) : { hidden: [], items: [] };
// "hidden" lists headlines that never show, because a newer item already covers the same change.
const archive = { hidden: saved.hidden ?? [], items: process.argv.includes("--all") ? [] : saved.items };

const older = [];
if (process.argv.includes("--all")) {
  const commits = git("log", "--reverse", "--format=%H", "--", "src/data/ndis-news.json").trim().split("\n");
  for (const commit of commits) older.push(JSON.parse(git("show", `${commit}:src/data/ndis-news.json`)));
} else {
  older.push(JSON.parse(git("show", "HEAD:src/data/ndis-news.json")));
}

for (const file of older) {
  for (const item of file.items) {
    archive.items = archive.items.filter((kept) => key(kept) !== key(item));
    archive.items.push({ ...item, last_checked: file.last_checked });
  }
}
// One entry per topic (the newest wording wins), and nothing that is in this week's list.
const live = new Set(current.items.flatMap((item) => [key(item), topic(item), item.source_url]));
const newest = new Map();
for (const item of archive.items) {
  if (archive.hidden.includes(key(item)) || live.has(key(item)) || live.has(topic(item)) || live.has(item.source_url)) continue;
  const kept = newest.get(topic(item));
  if (!kept || kept.last_checked <= item.last_checked) newest.set(topic(item), item);
}
archive.items = [...newest.values()].sort((a, b) => b.last_checked.localeCompare(a.last_checked));
writeFileSync(archivePath, JSON.stringify(archive, null, 2) + "\n");
console.log(`Earlier NDIS changes: ${archive.items.length} item(s) in src/data/ndis-news-archive.json`);
