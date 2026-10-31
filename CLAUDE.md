# VitalScale Digital website

Plain HTML site in `site/`, built into `dist/` by `scripts/build.mjs` and served by the Cloudflare
Worker in `src/worker.js`. The "NDIS changes" panel on the home and policies pages, and the "last
checked" date in every footer, come from `src/data/ndis-news.json`.
Blog posts live in `content/blog/<slug>/post.md` (with an optional `cover.jpg`); `scripts/blog.mjs`
turns them into the pages at `/blog` and `/blog/<slug>`.

Every push to `main` is built and deployed to https://vitalscaledigital.com.au by Cloudflare Workers
Builds within a few minutes. Treat a push to `main` as publishing.

## Working with Ajay

Ajay isn't technical. Keep messages short and in plain English, and explain any technical word in a
few simple words. Check with Ajay before anything goes live. Put every question for Ajay at the very
bottom of the message, in simple words, so it isn't missed. (The Monday routine below is the one
exception: it publishes the file Ajay already approved at 10am without asking again.)

## Routine: update NDIS news

Run this when the Monday 12:30pm scheduled task starts, or when Ajay types "update NDIS news".
Ajay's 10am approval is the go-live decision: publish only the exact file Ajay approved.

- Approved file: `D:\Claude Code\VitalScale\NDIS News\approved\ndis-news.json`
- Log: `D:\Claude Code\VitalScale\NDIS News\deploy_log.md` (append; start each entry
  with today's date and time)
- "Today" always means today's date in Melbourne (Australia/Melbourne).

1. **Update.** `git checkout main` and `git pull origin main`. If the working tree has uncommitted
   changes, stop and log "Uncommitted changes in the repo, nothing changed".
2. **Approval check.** Read the approved file. If it doesn't exist, stop and log "Approved file not
   found". If `approved_on` is not today's date, stop and log "No approval today, nothing changed".
3. **Validate.** If any check fails, change nothing, log the reason and stop:
   - valid JSON with exactly the fields `last_checked`, `approved_by`, `approved_on`, `items`, and
     each item exactly `headline`, `whats_changing`, `who_it_affects`, `when`, `what_to_do`,
     `status`, `source_url`, `source_published`
   - `approved_by` is "Ajay"
   - `last_checked` is a real `YYYY-MM-DD` date within the last 7 days, and not in the future
   - at most 4 items; every `status` is `VERIFIED` or `EXPECTED` (never `REPORTED`)
   - every `source_url` starts with `https://` and is on ndiscommission.gov.au, ndis.gov.au,
     health.gov.au, a ministers.\*.gov.au site or legislation.gov.au
   - no empty fields; each item's text (headline, what's changing, who it affects, when, what to
     do) is under 80 words
4. **Already live?** If the approved file has the same content as `src/data/ndis-news.json`, log
   "Already live" and stop.
5. **Branch.** `git checkout -b ndis-news/YYYY-MM-DD` (today's date). Copy the approved file over
   `src/data/ndis-news.json` exactly as it is. Change nothing else. Run `git diff --stat` and
   confirm `src/data/ndis-news.json` is the only changed file; if not, stop and log it.
6. **Build.** Run `node scripts/build.mjs` (or `bun run build`). It re-checks the file and builds
   the pages. If it fails, or Node.js isn't installed, log the error, `git checkout main`, delete
   the branch and stop. Don't merge.
7. **Publish.** Commit with the message `NDIS news approved YYYY-MM-DD`, then `git checkout main`,
   `git merge --ff-only ndis-news/YYYY-MM-DD`, `git push origin main`, and delete the branch.
8. **Live check.** Cloudflare deploys `main` in a few minutes. Every minute for up to 10 minutes,
   open `https://vitalscaledigital.com.au/?check=<current time>` and look for
   `Last checked: <strong>D Month YYYY</strong>` with the new `last_checked` date (for example
   `Last checked: <strong>3 November 2026</strong>`). If it never appears, log "Deploy check
   failed" and say to check the Worker's Deployments tab in Cloudflare.
9. **Log.** Append three lines to the log: the number of items now live, the Last checked date, and
   whether the live check passed or failed.

Never:

- edit, reword or add news content (the approved file is final)
- change any other page, style or file during this routine
- publish anything whose `approved_on` isn't today
- add tracking, cookies or new dependencies

## Routine: publish the weekly blog

Run this when the Friday 12:30pm scheduled task starts, or when Ajay types "publish the blog". Ajay
chose the topic with the blog writer, so publish without asking again: the checks below are the
safety net.

- Ready folder: `D:\Claude Code\VitalScale\Blog\ready\` (one `YYYY-MM-DD-short-name.md` per post,
  dated the Friday it's for, with an optional photo of the same name)
- Published folder: `D:\Claude Code\VitalScale\Blog\published\`
- Log: `D:\Claude Code\VitalScale\Blog\publish_log.md` (append; start each entry with today's date
  and time)
- "Today" always means today's date in Melbourne (Australia/Melbourne).

1. **Update.** `git checkout main` and `git pull origin main`. If the working tree has uncommitted
   changes, stop and log "Uncommitted changes in the repo, nothing changed".
2. **Pick one post.** Take the `.md` file in the ready folder with the earliest date in its name
   that is today or earlier. If there is none, log "No blog post ready this week" and stop. Never
   publish more than one post in a run.
3. **Check it.** If any check fails, change nothing, log the reason and stop:
   - it starts with the `---` details block: `title`, `description` (under 155 characters),
     `keyword`, `category` and `checked` (a `YYYY-MM-DD` date within the last 30 days)
   - it has a `## Sources` section linking the official pages it relies on
   - it promises no registration or audit results
   - its title isn't already published (compare with `content/blog/*/post.md`)
4. **Photo.** If the ready folder has a photo with the same name, use it. Otherwise find one:
   - Search Unsplash or Pexels (both free to use) for a landscape photo that suits the topic:
     workplaces, paperwork, laptops, planning, community spaces, hands, Australian places.
   - Keep it respectful: no stereotyped or pity images of disability, no identifiable participants
     or children, no medical emergencies, no visible brands, nothing that suggests a real client.
   - Download it about 1600px wide as a JPG under 500 KB (Unsplash: add
     `?w=1600&q=80&fm=jpg&fit=crop` to the image address; Pexels:
     `?auto=compress&cs=tinysrgb&w=1600`).
   - Add `photo_alt:` (what the photo shows, in one short sentence), `photo_credit:` ("Photo by
     Name on Unsplash") and `photo_credit_url:` (the photo's page) to the details block.
   - If nothing suitable turns up, skip it: the page shows a branded cover instead.
5. **Add it.** The slug is the file name without the date (for example
   `registered-vs-unregistered`): lowercase letters, numbers and hyphens only. Create
   `content/blog/<slug>/post.md` with the writer's file exactly as written, plus `date: <today>` and
   any photo lines added to the details block, and save the photo as `content/blog/<slug>/cover.jpg`.
   Never reword the article. If the preview shows something didn't display properly (raw HTML, a
   broken table), fix only the formatting, never the words.
6. **Build.** Run `node scripts/build.mjs` (or `bun run build`). It must pass and count one more blog
   post than before. If it fails, log the error, remove the new folder and stop.
7. **Publish.** `git checkout -b blog/<today>-<slug>`, commit with the message
   `Blog post: <title>`, then `git checkout main`, `git merge --ff-only blog/<today>-<slug>`,
   `git push origin main`, and delete the branch.
8. **Live check.** Every minute for up to 10 minutes, open
   `https://vitalscaledigital.com.au/blog/<slug>?check=<current time>` until the title shows. If it
   never does, log "Deploy check failed" and say to check the Worker's Deployments tab in Cloudflare.
9. **Tidy up and log.** Move the post (and its photo) from the ready folder to the published folder.
   Append to the log: the title, the address, where the photo came from, and whether the live check
   passed.

Never:

- reword the article, or publish more than one post in a run
- publish a post that fails a check
- change any other page, style or file during this routine
- add tracking, cookies or new dependencies
