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

## Production Worker

`wrangler.jsonc` deploys the application as the `vitalscale-digital-rebuild` Worker. The Worker
continues to provide a `workers.dev` test URL and is configured as the origin for
`vitalscaledigital.com.au` and `www.vitalscaledigital.com.au`.

```sh
bun run deploy:rebuild
```

Every push to `main` deploys automatically through `.github/workflows/deploy.yml`, which lints,
typechecks, builds and runs `bun run deploy:rebuild`. It can also be re-run by hand from the
repository's **Actions** tab. The workflow needs two repository secrets under **Settings > Secrets
and variables > Actions**:

- `CLOUDFLARE_API_TOKEN`: an API token created from the **Edit Cloudflare Workers** template, with
  the `vitalscaledigital.com.au` zone included and **Zone > DNS > Edit** added so the custom
  domains can be attached.
- `CLOUDFLARE_ACCOUNT_ID`: the account ID shown on the Cloudflare dashboard overview.

After the first deployment, add `WEB3FORMS_ACCESS_KEY` as an encrypted Worker secret before testing
the contact form. Worker secrets persist across deployments.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
