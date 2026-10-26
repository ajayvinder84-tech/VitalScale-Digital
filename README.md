# VitalScale Digital

The website for [vitalscaledigital.com.au](https://vitalscaledigital.com.au): plain HTML and CSS
in `site/`, served by a small Cloudflare Worker (`src/worker.js`) that also sends the enquiry
forms.

## Layout

- `site/`: every page, image, stylesheet and script, published as-is. Pages are served without
  the `.html` extension (`/policies` serves `policies.html`).
- `site/_redirects`: sends addresses from the previous site to the closest page on this one.
- `site/404.html`: shown for any address that doesn't exist.
- `src/worker.js`: handles `POST /api/enquiry` and passes every other request to `site/`.
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

The "NDIS changes" panel on the home page and the policies page says it is checked every Monday.
When it is updated, change the panel in both `site/index.html` and `site/policies.html`, and the
"last checked" date in those panels and in the footer of every page.
