# numana-coaching.de

Website von numana coaching & consulting, Corinna Krämer, Münster.
Astro, statisch erzeugt, Deployment per Git-Push.
Gestaltung und Inhalte nach dem Umsetzungspaket aus Claude Design
(Stand 3. August 2026). Regelwerk für Änderungen: `CLAUDE.md`.

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm install` | Abhängigkeiten installieren |
| `npm run dev` | Lokale Vorschau unter `localhost:4321` |
| `npm run build` | Seite nach `dist/` bauen, muss vor jedem Abschluss fehlerfrei laufen |

## Seiten

`/` Startseite · `/ueber-mich` · `/angebot` · `/kontakt` · `/impressum` · `/datenschutz`

Die Seite nutzt verzeichnisbasierte URLs ohne `.html`-Endung. Titel,
Beschreibungen und strukturierte Daten (JSON-LD) je Seite stammen aus dem
Umsetzungspaket; die Sitemap erzeugt `@astrojs/sitemap` beim Build.

## Offene Punkte vor Livegang

1. **Bilddateien.** `numana-logo-nav.png`, `corinna-portrait.jpg`,
   `corinna-about-real.jpg` und `linc-personality-profiler.png` (Logo bei der
   LINC-Qualifikation auf der Über-mich-Seite) nach `public/` legen
   (Reserve: `numana-logo.png`, `numana-logo-transparent.png`). Bis dahin
   blendet die Seite fehlende Bilder aus; die Navigation zeigt dann den
   Schriftzug numana.
2. **Zeeg-Buchung aktiv.** `ZEEG_URL` in `src/pages/kontakt.astro` ist auf
   https://zeeg.me/kraemer/erstgespraech gesetzt; der Buchungs-Button ist
   live auf der Kontaktseite.
3. **numana-Prinzip.** Auskommentierter Platzhalter in
   `src/pages/index.astro` wartet auf den freigegebenen Text.
4. **Deployment.** GitHub Action `.github/workflows/deploy.yml` lädt bei
   Push auf `main` per SFTP zu IONOS. Vorher die vier Secrets eintragen:
   `SFTP_HOST`, `SFTP_USERNAME`, `SFTP_PASSWORD`, `SFTP_DIR`
   (Settings → Secrets and variables → Actions). Erst Merge in `main`
   plus Secrets lösen das erste Deployment aus.
5. **Search Console.** Google-Verifizierungsdatei (`google….html`) nach
   Erhalt unverändert in `public/` legen. Sitemap-Adresse zum Einreichen:
   `https://numana-coaching.de/sitemap-index.xml`.
6. **Rechtliche Prüfung.** Die Datenschutz-Änderungen (Formular raus,
   E-Mail-Kontakt und Zeeg rein) sind im Code mit
   `ZUR RECHTLICHEN PRÜFUNG` markiert.
