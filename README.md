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

1. **Bilddateien.** `numana-logo-nav.png`, `corinna-portrait.jpg` und
   `corinna-about-real.jpg` nach `public/` legen (Reserve: `numana-logo.png`,
   `numana-logo-transparent.png`). Bis dahin blendet die Seite fehlende Bilder
   aus; die Navigation zeigt dann den Schriftzug numana.
2. **Kontaktformular.** Der Formspree-Endpoint in `src/pages/kontakt.astro`
   ist ein Platzhalter (`mwvgrlvl`) und muss vor Livegang ersetzt werden,
   alternativ PHP-Versand beim Hoster.
3. **Buchungs-URLs.** Für Standortbestimmung und Kennenlerngespräch fehlen die
   Links, alle Handlungsaufrufe zeigen auf `/kontakt`.
4. **llms.txt** fehlt.
5. **numana-Prinzip.** Auskommentierter Platzhalter in
   `src/pages/index.astro` wartet auf den freigegebenen Text.
6. **Domain** numana-coaching.de noch nicht live geschaltet. Hosting laut
   Datenschutzerklärung: IONOS; Deployment dorthin einrichten (z. B. GitHub
   Action per FTP/SFTP) oder Datenschutztext an den tatsächlichen Hoster
   anpassen.
