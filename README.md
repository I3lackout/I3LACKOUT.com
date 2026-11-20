# I3LACKOUT.com

Artist and developer website. Source lives in `i3lackout-web/`.

## Development

Use Node.js 22, then run inside `i3lackout-web/`:

```sh
npm ci
npm run dev
```

## Verification

```sh
npm run typecheck
npm test
npm run build
```

The static build is `i3lackout-web/dist/`. Caddy configuration is provided in `i3lackout-web/deploy/`. GitHub Actions verifies the source only; deployment is separate.

This repository contains the public website source. All rights reserved for brand assets, audio previews, and certificates unless stated otherwise.

Do not include environment files, credentials, dependencies or generated builds in Git.
