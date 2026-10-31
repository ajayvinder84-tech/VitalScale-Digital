# VitalScale Digital

The website for [vitalscaledigital.com.au](https://vitalscaledigital.com.au): plain HTML and CSS
in `site/`, built into `dist/` and served by a small Cloudflare Worker (`src/worker.js`) that also
sends the enquiry forms.

## Layout

- `site/`: every page, image, stylesheet and script. The build copies it to `dist/`, which is what
  gets published. Pages are served without the `.html` extension (`/policies` serves
  `policies.html`).
- `src/data/ndis-news.json`: the NDIS news panel's content (see below).
- `scripts/build.mjs`: validates the news file and builds `dist/`.
- `site/_redirects`: sends addresses from the previous site to the closest page on this one.
- `site/404.html`: shown for any address that doesn't exist.
- `src/worker.js`: handles `POST /api/enquiry` and passes every other request to `dist/`.
- `wrangler.jsonc`: the `vitalscale-digital-rebuild` Worker, attached to `vitalscaledigital.com.au`
  and `www.vitalscaledigital.com.au`.

## Local preview

```sh
bun install --frozen-lockfile
cp .dev.vars.example .dev.vars   # add the Web3Forms key to test real sends
bun run dev
```

## Deploying

Cloudflare Workers Builds is connected to this repository (Worker **Settings > Build**). Every push
to `main` is deployed to the live site automatically, so make changes on a branch and merge them
when they're ready. Earlier versions can be restored from the Worker's **Deployments** tab.

## Enquiry forms

Each page's form posts to `/api/enquiry`, which validates the fields and forwards them to
[Web3Forms](https://web3forms.com). The access key is the encrypted Worker secret
`WEB3FORMS_ACCESS_KEY` (**Settings > Variables and Secrets**). It must never be committed.

## NDIS changes panel

The "NDIS changes" panel on the home and policies pages, and the "last checked" date in every
footer, are built from `src/data/ndis-news.json`. `bun run build` (or `node scripts/build.mjs`)
validates that file, copies `site/` to `dist/`, and fills the `{{NDIS_NEWS}}` and
`{{NDIS_LAST_CHECKED}}` placeholders. A file that fails validation fails the build, so Cloudflare
keeps the current version live.

Weekly updates only change the data file. The steps are in `CLAUDE.md` under "Routine: update
NDIS news".

## Blog

Each post is a folder in `content/blog/`: `post.md` (a `---` block with `title`, `description`,
`keyword`, `category`, `checked` and `date`, then the article in Markdown) and an optional
`cover.jpg` with `photo_alt` (and `photo_credit`). `scripts/blog.mjs` builds each post's page at
`/blog/<slug>`, the `/blog` list, and the blog entries in `sitemap.xml` and `llms.txt`. A post
appears once its `date` arrives, and the build stops if a post is missing details or a
`## Sources` section. Weekly publishing is "Routine: publish the weekly blog" in `CLAUDE.md`.
