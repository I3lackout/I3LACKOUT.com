# V1.5 — Kontrollierter Deployment- & Rollback-Plan (`i3lackout.com`)

> **Status:** Produktive Freigabe gesperrt. Dieses Runbook dient der Vorbereitung und darf erst nach vollständiger Inhalt-/Rechtsprüfung sowie separater Freigabe des Maintainers ausgeführt werden.

## 1. Vorbedingungen (Launch-Gates)

Vor jedem Deployment auf den VPS müssen alle folgenden Punkte erfüllt sein:

1. **Inhalte & Medien:** Finale Artist-Texte (`src/data/artist.ts`), verifizierte Social-URLs, Pressefotos (`public/images/`), Logo-Assets (`public/icons/`) und geprüfte Zertifikats-PDFs (`src/data/certifications.ts`).
2. **Rechtliches:** Verbindliche Inhalte für `/impressum` und `/datenschutz` in `src/app/routes.tsx` ergänzt.
3. **Backend-Freigabe (`musicchaini3.com`):** Falls Live-Releases aktiviert werden sollen, muss `routes/api/public_artist_routes.py` (registriert über `routes/__init__.py`) mit `PUBLIC_ARTIST_ALLOWLIST=i3lackout` und `PUBLIC_ARTIST_CORS_ORIGINS=https://i3lackout.com,https://www.i3lackout.com` separat für Produktion freigegeben sein.
4. **Tests grün:** `npm run lint`, `npm run typecheck`, `npm run test` und `npm run build` in `i3lackout-web/` erfolgreich.

## 2. Build-Time `VITE_*`-Prüfung (Wichtig!)

Vite ersetzt alle `VITE_*`-Variablen **zur Build-Zeit** in `dist/`. Eine spätere Änderung einer `.env`-Datei auf dem VPS hat auf ein bereits gebautes Bundle **keine** Auswirkung.

Für den Produktionsbuild mit aktiver Public Artist API:

```bash
cd i3lackout-web
VITE_MUSICCHAIN_ENABLED=true \
VITE_MUSICCHAIN_API_BASE_URL=https://musicchaini3.com \
VITE_MUSICCHAIN_PUBLIC_PATH=/api/public/artists/i3lackout \
VITE_MUSICCHAIN_CREATOR_SLUG=i3lackout \
VITE_MUSICCHAIN_TIMEOUT_MS=5000 \
VITE_MUSICCHAIN_CACHE_TTL_MS=60000 \
VITE_MUSICCHAIN_ALLOWED_ORIGINS=https://musicchaini3.com,https://www.musicchaini3.com \
npm run build
```

*(Soll `i3lackout.com` zunächst bewusst ohne Live-API starten, mit `VITE_MUSICCHAIN_ENABLED=false` bauen.)*

Nach dem Build prüfen, ob die gewünschte URL/Konfiguration im erzeugten JS-Bundle steckt:

```bash
grep -o "api/public/artists/i3lackout" dist/assets/*.js
```

## 3. Backup auf dem VPS (vor Änderungen)

Vor jeder Änderung am Webserver oder Zielverzeichnis ein zeitgestempeltes Backup anlegen:

```bash
TS=$(date +%Y%m%d_%H%M%S)
sudo cp <CADDYFILE_PATH> "<CADDYFILE_PATH>.bak.${TS}"
if [ -d <WEB_ROOT> ]; then
  sudo tar -czf "<BACKUP_DIR>/i3lackout-web-backup-${TS}.tar.gz" -C <WEB_PARENT_DIR> i3lackout-web
fi
```

## 4. Deployment & `caddy validate`

1. Neues statisches Bundle in ein Staging-Verzeichnis übertragen und atomar aktivieren (ohne Node.js-Prozess auf dem VPS):
   - Zielpfad: `<WEB_ROOT>/dist`
   - Berechtigungen prüfen (`caddy` benötigt Leserechte auf Verzeichnisse/Dateien).
2. Site-Block aus `deploy/Caddyfile.i3lackout.example` einbinden (eigenständiger Block neben `musicchaini3.com`, sodass Waitress/Flask unberührt bleiben).
3. Caddy-Konfiguration zwingend validieren, bevor neu geladen wird:
   ```bash
   sudo caddy validate --config <CADDYFILE_PATH>
   sudo systemctl reload caddy
   ```
4. Erst wenn Caddy ohne Fehler läuft, die vorbereiteten DNS-Einträge (`@ A <VPS_IP>`, `www CNAME i3lackout.com`, alten `www`-Parking-Eintrag ersetzen) aktivieren.

## 5. Abnahme-Checkliste nach Livegang

- `curl -I https://www.i3lackout.com` → `301`/`308` Redirect auf `https://i3lackout.com`.
- `curl -I https://i3lackout.com/` → `200`, `Cache-Control: no-cache, must-revalidate`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`.
- `curl -I https://i3lackout.com/developer` → `200` (SPA-Fallback auf `index.html`).
- `curl -I https://i3lackout.com/assets/<main>.js` → `200`, `Cache-Control: public, max-age=31536000, immutable`.
- Falls API aktiv: `curl -i -H "Origin: https://i3lackout.com" https://musicchaini3.com/api/public/artists/i3lackout` → `200`, `Access-Control-Allow-Origin: https://i3lackout.com`, `Cache-Control: public, max-age=30, must-revalidate`, keine sensiblen Daten.
- `systemctl status caddy` und `systemctl status musicchaini3.service` prüfen.

## 6. Rollback-Plan

Bei Fehlern nach dem Deployment:

1. **Caddy-Konfiguration zurücksetzen:**
   ```bash
   sudo cp "<CADDYFILE_PATH>.bak.${TS}" <CADDYFILE_PATH>
   sudo caddy validate --config <CADDYFILE_PATH>
   sudo systemctl reload caddy
   ```
2. **Vorherigen `dist/`-Stand wiederherstellen** (falls ein Vorab-Backup existiert):
   ```bash
   sudo rm -rf <WEB_ROOT>
   sudo tar -xzf "<BACKUP_DIR>/i3lackout-web-backup-${TS}.tar.gz" -C <WEB_PARENT_DIR>
   ```
3. **API-Notfall-Deaktivierung:** Falls nur die Public Artist API Probleme macht, bleibt die Website dank lokalem Fallback weiter nutzbar; für dauerhafte Entkopplung mit `VITE_MUSICCHAIN_ENABLED=false` neu bauen und `dist/` austauschen.
