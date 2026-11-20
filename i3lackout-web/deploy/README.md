# Deployment-Vorbereitung (Phase 3 — noch nicht aktiv)

Dieses Verzeichnis enthält ausschließlich lokale Konfigurationsvorlagen und Runbooks. **Es wird nichts automatisch deployed.**

- [Caddyfile.i3lackout.example](./Caddyfile.i3lackout.example) — Statischer Caddy-Site-Block mit SPA-Fallback (`try_files {path} /index.html`), Security-Headern und Asset-Caching.
- [DEPLOYMENT_PLAN_V1_5.md](./DEPLOYMENT_PLAN_V1_5.md) — Vollständige V1.5 Launch-Checkliste mit Build-Time-`VITE_*`-Verifikation, Backup, `caddy validate`, Post-Deploy-Checks und Rollback-Plan.
