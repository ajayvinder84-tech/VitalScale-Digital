# VitalScale Digital

## Development

Prefer working locally? You need Node.js and Bun.

```sh
git clone <this-repository-url>
cd <repository-name>
bun install --frozen-lockfile
bun run dev
```

## Production

The production build is a TanStack Start server-rendered application built by Vite and Nitro for
the Cloudflare Workers module runtime.

```sh
bun run lint
bun run typecheck
bun run build
bun run preview
```

Configure `WEB3FORMS_ACCESS_KEY` as a server-side secret; it must not use the public `VITE_`
prefix and must never be committed.

- Local Vite development: copy `.env.example` to `.env` and add the key there.
- Local Cloudflare Worker preview: copy `.dev.vars.example` to `.dev.vars` and add the key there.
- Production Cloudflare Worker: add an encrypted secret named exactly `WEB3FORMS_ACCESS_KEY` in
  the Worker dashboard under **Settings > Variables and Secrets**, or run
  `bunx wrangler secret put WEB3FORMS_ACCESS_KEY` after the Worker has been created. The Wrangler
  command deploys a new Worker version, so do not run it until a deployment is approved.

The production host must run the generated Cloudflare Worker and serve the static assets in
`.output/public`. Do not deploy only the static directory: the contact form and server-rendered
routes require the Worker runtime.

## Rebuild test Worker

`wrangler.jsonc` intentionally deploys this branch as the separate
`vitalscale-digital-rebuild` Worker on `workers.dev`. It contains no custom-domain routes and does
not modify the existing Cloudflare Pages project.

```sh
bun run deploy:rebuild
```

After the first deployment, add `WEB3FORMS_ACCESS_KEY` as an encrypted Worker secret before testing
the contact form. Do not attach the production domain until the rebuild has been approved.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
