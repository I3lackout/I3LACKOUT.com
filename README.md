# I3LACKOUT.com

**NO SOFT MODE. JUST SOUND. PRESSURE. IMPACT.**

Official artist and developer website for **I3LACKOUT** — combining electronic music, live-session culture, and creative software engineering inside the **iThree** ecosystem.

[![Live Website](https://img.shields.io/badge/Live-i3lackout.com-FF2020?style=flat-square)](https://i3lackout.com)
[![Ecosystem](https://img.shields.io/badge/Ecosystem-iThreeLab-8B5CF6?style=flat-square)](https://ithreelab.com)
[![Platform](https://img.shields.io/badge/Music-musicchaini3.com-00E5FF?style=flat-square)](https://musicchaini3.com)
[![Stack](https://img.shields.io/badge/React_19-TypeScript_·_Vite_·_Tailwind_v4-151520?style=flat-square)](#tech-stack)

---

## Overview

`I3LACKOUT.com` bridges two worlds in one unified dark-mode interface:

- **Music Universe (`/`)** — Hero, Music & Preview Queue, About, Live, Social Hub, and Press Kit, connected to [musicchaini3.com](https://musicchaini3.com) (`musicchain-proof` verified).
- **Developer Universe** — Creative technology profile, project gallery, verified certifications, and engineering stack:
  - `/developer` — Software Developer & Creative Technologist (`Music × Code × Technology`)
  - `/projects` — Filterable project showcase (`musicchaini3`, `i3lackout-web`)
  - `/certifications` — Certificate gallery (including verified W3Schools & CodingX credentials)
  - `/tech-stack` — Practice, education, and experimental technologies
  - `/impressum` & `/datenschutz` — Legal pages

## Tech Stack

- **Framework:** React 19 + TypeScript (Strict Mode) + Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Motion & Icons:** Motion (`motion/react` with `LazyMotion` & `reducedMotion="user"`) + Lucide React
- **Routing:** React Router (`react-router-dom`)
- **Quality & Testing:** Vitest, React Testing Library, ESLint

## Repository Structure

```text
.
├── .github/workflows/   # Source verification CI (typecheck, test, build)
└── i3lackout-web/       # Frontend application source
    ├── deploy/          # Caddy static-site configuration example
    ├── public/          # Static assets (OG image, icons, fonts, certificates, sitemap)
    ├── src/             # Components, routes, integrations, and styles
    └── tests/           # Unit and component tests
```

## Development

Use **Node.js 22**, then run inside `i3lackout-web/`:

```sh
cd i3lackout-web
npm ci
cp .env.example .env
npm run dev
```

## Verification & Build

```sh
cd i3lackout-web
npm run lint
npm run typecheck
npm test
npm run build
```

The production build outputs static files to `i3lackout-web/dist/`, served via Caddy (`i3lackout-web/deploy/`).

## Public Artist API & Security

- `fetchPublicArtistData` is loaded dynamically and defaults to `VITE_MUSICCHAIN_ENABLED=false` with immediate fallback data.
- Requests validate against `VITE_MUSICCHAIN_ALLOWED_ORIGINS`, omit credentials/tokens (`credentials: 'omit'`), sanitize all URLs/fields, and respect `VITE_MUSICCHAIN_CACHE_TTL_MS`.

---

© I3LACKOUT. All rights reserved for brand assets, audio previews, and certificates unless stated otherwise.
