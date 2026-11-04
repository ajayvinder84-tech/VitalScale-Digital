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
bottom of the message, in simple words, so it isn't missed. (The Monday NDIS news routine below is
the one exception: Ajay asked on 4 Nov 2026 for it to research and publish by itself ## Routine: update NDIS news

Run this when the Monday scheduled task "NDIS news, weekly automatic update" starts in the cloud,
or when Ajay types "update NDIS news". It researches, writes and publishes the news by itself:
Ajay asked for it to run without him (4 Nov 2026), so don't ask for approval. Accuracy is the
approval: publish only what an official page says.

- "Today" always means today's date in Melbourne (`TZ=Australia/Melbourne date`).
- "This Monday" means the most recent Monday on or before today, in Melbourne.

1. **Update.** `git checkout main` and `git pull origin main`. If the working tree has uncommitted
   changes, stop and report "Uncommitted changes in the repo, nothing changed".
2. **Research.** Read `src/data/ndis-news.json` (what's live) and the newest files in `research/`.
   Then search the web for NDIS changes that affect providers: new or upcoming rules, deadlines,
   registration, claiming, pricing, the NDIS Commission's and the NDIA's latest news, and
   ministers' announcements. Use only official sources: ndis.gov.au, ndiscommission.gov.au,
   health.gov.au, ministers.\*.gov.au and legislation.gov.au. News sites and social media can point
   you to something, but never use them as the source.
3. **Choose up to 4 items.** Pick the changes that matter most to small providers right now,
   soonest first. Keep a current item if it's still true and still upcoming or new; drop one once
   it's well past. For each item:
   - every fact must be stated on the official page in `source_url` (check the page itself, or its
     official search result if the page won't open). If you can't confirm a fact, leave it out.
   - `status` is `VERIFIED` for a law, rule or confirmed date, and `EXPECTED` for something
     announced but not final. Never `REPORTED`, and never anything rumoured.
   - `when` reads like "From 20 Nov 2026", "Since 1 Jul 2026" or "Law passed Aug 2026".
   - plain Australian English, calm, no fear or hype; no promises about registration or audits;
     no legal advice. The text fields together stay under 80 words.
   - `source_published` is the date the official page was published or last updated.
4. **Write the file.** Save `src/data/ndis-news.json` with exactly the fields `last_checked`,
   `approved_by`, `approved_on`, `items`, and each item exactly `headline`, `whats_changing`,
   `who_it_affects`, `when`, `what_to_do`, `status`, `source_url`, `source_published`. Set
   `last_checked` to this Monday, `approved_by` to "Automatic weekly check" and `approved_on` to
   today. Even if nothing changed, update `last_checked`: the facts were checked again.
5. **Note what you checked.** Save `research/YYYY-MM-DD NDIS news check.md` (today's date): each
   item with its sources, anything you dropped or couldn't confirm and why, in under 300 words.
6. **Build.** Run `node scripts/build.mjs`. It re-checks the news file and builds the pages. If it
   fails, fix the news file (never the build script) and try again; if it still fails, stop
   without publishing and report the error. Run `git diff --stat` and confirm only
   `src/data/ndis-news.json` and the new research note changed.
7. **Publish.** Commit with the message `NDIS news checked YYYY-MM-DD` (today) and
   `git push origin main`. Cloudflare deploys it within a few minutes.
8. **Report.** Finish with a short message in simple English, 6 lines or fewer (it becomes Ajay's
   phone notification): the Last checked date, each item's headline in one line, and what changed
   since last week. If anything failed, say what and that nothing went live.

Never:

- use a source that isn't an official one listed in step 2
- change any other page, style, script or file during this routine
- add tracking, cookies or new dependencies

ing, cookies or new dependencies

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
