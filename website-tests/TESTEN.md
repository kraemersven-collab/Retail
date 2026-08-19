# Website automatisch testen

Dieses Paket testet die numana-Website vollständig: Layout auf 9 Geräteprofilen (3 Handys, 2 Tablets, 4 Desktops in Chrome, Firefox und Safari), Links, Skriptfehler, Barrierefreiheit nach WCAG 2.1 AA und Ladezeit per Lighthouse. Die Seitenliste wird automatisch aus der Sitemap ermittelt, neue Seiten werden also ohne Pflegeaufwand mitgetestet.

## Einmalige Einrichtung (5 Minuten)

Alle Dateien aus diesem Paket in das Website-Repository kopieren (Ordnerstruktur beibehalten), dann im Projektordner:

```bash
npm install -D @playwright/test @axe-core/playwright
npx playwright install
```

In der `package.json` unter `scripts` ergänzen:

```json
"test:website": "playwright test",
"test:bericht": "playwright show-report"
```

Falls noch nicht vorhanden, die Astro-Sitemap aktivieren (`npx astro add sitemap`), damit die Seitenermittlung über die Sitemap läuft. Ohne Sitemap greift der Fallback über die Startseiten-Links.

## Der Tiefentest jetzt (KI-Sichtprüfung)

In Claude Code im Projektordner:

```
/website-test
```

Claude führt die komplette Suite aus, sieht sich danach jeden einzelnen Screenshot an (jede Seite auf jedem Gerät), prüft Lighthouse und schreibt einen `PRUEFBERICHT.md` mit Funden nach Schwere sortiert, inklusive Behebungsvorschlägen. Gegen die Live-Seite statt des lokalen Builds: im Prompt die URL nennen, etwa "gegen https://... testen".

## Der Dauerbetrieb (vollautomatisch)

Der Workflow `.github/workflows/website-test.yml` läuft ohne weiteres Zutun:

- bei jedem Push auf `main` (also bei jedem Netlify-Deploy)
- bei jedem Pull Request
- jeden Montagmorgen als Routinelauf
- auf Knopfdruck im Actions-Tab

Schlägt etwas fehl, kommt eine E-Mail von GitHub. Screenshots und Testbericht liegen bei jedem Lauf als Artefakt zum Download bereit (Actions-Tab, unten auf der Lauf-Seite). Optional kann unter Settings, Secrets and variables, Variables eine `TEST_URL` gesetzt werden, dann testet der Workflow die Live-Seite statt des Repo-Builds.

## Was wo geändert wird

| Was | Wo |
|---|---|
| Gerät ergänzen oder entfernen | `playwright.config.ts`, eine Zeile in `projects` |
| Strengere oder mildere Lighthouse-Ziele | `lighthouserc.json`, Werte bei `minScore` |
| Zeitplan des Routinelaufs | `website-test.yml`, Zeile `cron` |
| Prüfkriterien der KI-Sichtprüfung | `.claude/commands/website-test.md` |

## Lokal auf Zuruf

```bash
npm run test:website                                  # gegen den lokalen Build
BASE_URL=https://numana-coaching.de npm run test:website   # gegen die Live-Seite
npm run test:bericht                                  # HTML-Bericht öffnen
```
