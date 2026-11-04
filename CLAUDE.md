# VitalScale Digital website

Plain HTML site in `site/`, built into `dist/` by `scripts/build.mjs` and served by the Cloudflare
Worker in `src/worker.js`. The "NDIS changes" panel on the home and policies pages, the full
`/ndis-changes` page, and the "last checked" date in every footer, all come from
`src/data/ndis-news.json`.
Blog posts live in `content/blog/<slug>/post.md` (with an optional `cover.jpg`); `scripts/blog.mjs`
turns them into the pages at `/blog` and `/blog/<slug>`.

Every push to `main` is built and deployed to https://vitalscaledigital.com.au by Cloudflare Workers
Builds within a few minutes. Treat a push to `main` as publishing.

## Working with Ajay

Ajay isn't technical. Keep messages short and in plain English, and explain any technical word in a
few simple words. Check with Ajay before anything goes live. Put every question for Ajay at the very
bottom of the message, in simple words, so it isn't missed. (The two weekly routines below are the
exceptions: Ajay asked on 4 Nov 2026 for them to publish what his NDIS News Researcher and blog
writer hand over, without asking him.)

## Routine: update NDIS news

Run this when the Monday 12:17pm scheduled task "NDIS news, weekly automatic update" starts in the
cloud, or when Ajay types "update NDIS news". Ajay's NDIS News Researcher (on Ajay's computer) does
the research and writes the news each Monday morning; this routine only checks its file and
publishes it. Ajay asked (4 Nov 2026) for it to go live without asking him, so don't ask for
approval. Never research, write or reword the news yourself.

- Hand-over file: Google Drive > VitalScale Digital shared workplace > VitalScale NDIS News >
  `ndis-news.json` (folder ID `1VFYQsSOaGg5Op4xktVRjyVHaMwKEtkco`).
- Use the Google Drive connector: `search_files` with `parentId = '<folder ID>'` to find the file
  (and its `modifiedTime`), and `download_file_content` to get it exactly as written.
- "Today" always means today's date in Melbourne (`TZ=Australia/Melbourne date`).

1. **Update.** `git checkout main` and `git pull origin main`. If the working tree has uncommitted
   changes, stop and report "Uncommitted changes in the repo, nothing changed".
2. **Get the file.** If `ndis-news.json` isn't in the folder, or it wasn't saved today (its
   `modifiedTime` in Melbourne time), stop and report "No new NDIS news from the researcher this
   week, nothing changed".
3. **Check it.** If any check fails, change nothing, report the reason and stop:
   - valid JSON with exactly the fields `last_checked`, `approved_by`, `approved_on`, `items`, and
     each item exactly `headline`, `whats_changing`, `who_it_affects`, `when`, `what_to_do`,
     `status`, `source_url`, `source_published`
   - `approved_by` is "Automatic weekly check" or "Ajay"
   - `last_checked` is a real `YYYY-MM-DD` date within the last 7 days, and not in the future
   - at most 4 items; every `status` is `VERIFIED` or `EXPECTED` (never `REPORTED`)
   - every `source_url` starts with `https://` and is on ndiscommission.gov.au, ndis.gov.au,
     health.gov.au, a ministers.\*.gov.au site or legislation.gov.au
   - no empty fields; each item's text (headline, what's changing, who it affects, when, what to
     do) is under 80 words
4. **Already live?** If the file has the same content as `src/data/ndis-news.json`, report
   "Already live, nothing changed" and stop.
5. **Copy it.** Save it over `src/data/ndis-news.json` exactly as it is. Change nothing else. Run
   `git diff --stat` and confirm `src/data/ndis-news.json` is the only changed file.
6. **Build.** Run `node scripts/build.mjs`. It re-checks the file and builds the pages. If it fails,
   `git checkout -- src/data/ndis-news.json`, stop without publishing and report the error.
7. **Publish.** Commit with the message `NDIS news YYYY-MM-DD` (today) and `git push origin main`.
   Cloudflare deploys it within a few minutes.
8. **Report.** Finish with a short message in simple English, 6 lines or fewer: the Last checked
   date, each item's headline in one line, and what changed since last week. If anything failed,
   say what and that nothing went live.

Never:

- research, edit, reword or add news content (the researcher's file is final)
- publish a file that fails a check
- change any other page, style or file during this routine
- add tracking, cookies or new dependencies

## Routine: publish the weekly blog

Run this when the Friday scheduled task "Blog, weekly automatic publish" starts in the cloud, or
when Ajay types "publish the blog". Ajay chose the topic with the blog writer, so publish without
asking again: the checks below are the safety net.

- Ready folder: Google Drive > VitalScale Digital shared workplace > VitalScale Blog > ready
  (folder ID `1ATbkyOhXofVMhrC7u5k9s1UvbdVrsrB8`). One `YYYY-MM-DD-short-name.md` per post, dated
  the Friday it's for, with an optional photo of the same name (`.jpg` or `.png`).
- Published folder: VitalScale Blog > published (folder ID `15L0vqcHNiDaK0G2vjr2hjtb0UlAX9sxL`).
- Use the Google Drive connector: `search_files` with `parentId = '<folder ID>'` to list a folder,
  `download_file_content` to get a file exactly as written, and `update_file` with `parentId` to
  move it. If the post was saved as a Google Doc instead of a `.md` file, export it as plain text.
- "Today" always means today's date in Melbourne (`TZ=Australia/Melbourne date`).

1. **Update.** `git checkout main` and `git pull origin main`. If the working tree has uncommitted
   changes, stop and report "Uncommitted changes in the repo, nothing changed".
2. **Pick one post.** Take the post in the ready folder with the earliest date in its name that is
   today or earlier. If there is none, report "No blog post ready this week" and stop. Never
   publish more than one post in a run.
3. **Check it.** If any check fails, change nothing, report the reason and stop:
   - it starts with the `---` details block: `title`, `description` (under 155 characters),
     `keyword`, `category` and `checked` (a `YYYY-MM-DD` date within the last 30 days)
   - it has a `## Sources` section linking the official pages it relies on
   - it promises no registration or audit results
   - its title isn't already published (compare with `content/blog/*/post.md`)
4. **Photo.** If the ready folder has a photo with the same name, download it, make it about 1600px
   wide as a JPG under 500 KB (Pillow is installed), and add `photo_alt:` (what the photo shows, in
   one short sentence) to the details block. Otherwise leave the photo out: the page shows a
   branded cover. Any photo must be respectful: no stereotyped or pity images of disability, no
   identifiable participants or children, no medical emergencies, no visible brands, nothing that
   suggests a real client.
5. **Add it.** The slug is the file name without the date and `.md` (for example
   `registered-vs-unregistered`): lowercase letters, numbers and hyphens only. Create
   `content/blog/<slug>/post.md` with the writer's file exactly as written, plus `date: <today>` and
   any photo line added to the details block, and save the photo as `content/blog/<slug>/cover.jpg`.
   Never reword the article. If the build shows something didn't display properly (raw HTML, a
   broken table), fix only the formatting, never the words.
6. **Build.** Run `node scripts/build.mjs`. It must pass and count one more blog post than before.
   If it fails, remove the new folder and stop without publishing; report the error.
7. **Publish.** Commit with the message `Blog post: <title>` and `git push origin main`. Cloudflare
   deploys it within a few minutes.
8. **Tidy up.** Move the post (and its photo) from the ready folder to the published folder.
9. **Report.** Finish with a short message in simple English, 6 lines or fewer: the title, the
   address (`https://vitalscaledigital.com.au/blog/<slug>`), and whether it has a photo. If
   anything failed, say what and that nothing went live.

Never:

- reword the article, or publish more than one post in a run
- publish a post that fails a check
- change any other page, style or file during this routine
- add tracking, cookies or new dependencies
