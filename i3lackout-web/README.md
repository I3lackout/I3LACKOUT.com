# i3lackout-web — Artist & Developer Universe (V1.2)

Offizielle Artist- und Developer-Website für **I3LACKOUT** (`i3lackout.com`) im **I3 Hybrid** Designsystem:
- **Purple (`#8B5CF6`)** für das **Music Universe** (`/`)
- **Cyan (`#00E5FF`)** für das **Developer Universe** (`/developer`, `/projects`, `/certifications`, `/tech-stack`)

## Tech Stack

- React 19 + TypeScript (Strict Mode) + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Motion (`motion/react` mit `LazyMotion` & `MotionConfig reducedMotion="user"`)
- Lucide React Icons
- React Router (`react-router-dom`)
- Vitest + React Testing Library + ESLint

## Routen & Bereiche

- `/` — Landingpage (Hero, Music, About, Live, Social Hub, Press Kit + Developer-Universe-Einstieg)
- `/developer` — Developer Profile (`Software Developer & Creative Technologist`, `Music × Code × Technology`)
- `/projects` — Filterbare Projektgalerie (`musicchaini3`, `i3lackout-web`)
- `/certifications` — Datengetriebene Zertifikatsgalerie (Vorläufige Einträge im Status `pending_document`)
- `/tech-stack` — Einordnung in Praxis, Ausbildung / Weiterbildung und Experimentelle Technologien
- `/impressum` & `/datenschutz` — Vorbereitete Platzhalter-Seiten

## Lokale Installation & Entwicklung

```bash
cd i3lackout-web
npm install
cp .env.example .env
npm run dev
```

## Qualitätsprüfung & Build

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Public Artist API & Sicherheit

- `src/integrations/musicchaini3/usePublicArtistData.ts` bindet `fetchPublicArtistData` dynamisch in `App.tsx` ein (Standardmäßig deaktiviert über `VITE_MUSICCHAIN_ENABLED=false` mit sofortigem Fallback auf `MUSICCHAIN_FALLBACK_DATA`).
- `src/integrations/musicchaini3/client.ts` prüft eine Origin-Allowlist (`VITE_MUSICCHAIN_ALLOWED_ORIGINS`), sendet keine Cookies oder Tokens (`credentials: 'omit'`), bereinigt alle URLs/Felder strikt über `src/utils/links.ts` und cached gültige Antworten über `VITE_MUSICCHAIN_CACHE_TTL_MS`.
- Zertifikate tragen bis zur Prüfung der Original-PDFs den Status `pending_document`; persönliche Dokumente werden nicht eingebunden.
