---
description: Kompletten Website-Test ausführen, jeden Screenshot sichten und einen Prüfbericht schreiben
---

Führe den Tiefentest der numana-Website aus. Nennt der Auftrag eine URL
(z. B. „gegen https://numana-coaching.de testen"), teste die Live-Seite,
sonst den lokalen Build.

$ARGUMENTS

## Ablauf

1. **Testsuite ausführen.** `npm run test:website` (bei Live-Test mit
   vorangestelltem `BASE_URL=<url>`). Wenn in dieser Umgebung nur Chromium
   verfügbar ist, die Chromium-Profile ausführen
   (`--project=mobil-android --project=desktop-klein --project=desktop-gross`)
   und im Bericht vermerken, dass Firefox/Safari nur in der CI laufen.
2. **Jeden Screenshot einzeln ansehen.** Alle Dateien unter
   `screenshots/<gerät>/<seite>.png` mit dem Read-Werkzeug öffnen und prüfen:
   - Überlappender oder abgeschnittener Text, gebrochene Raster
   - Zu enge Abstände, verrutschte Buttons, unlesbare Kontraste
   - Bildausschnitte (Porträts: Kopf sichtbar? Nichts Unglückliches beschnitten?)
   - Konsistenz zwischen Geräten: fehlt auf einem Profil etwas?
3. **Lighthouse bewerten.** Lokal per `npx @lhci/cli autorun --config=lighthouserc.json`
   nach einem Build, sonst die Werte aus dem letzten CI-Lauf verwenden.
   Zielwerte stehen in `lighthouserc.json`.
4. **Prüfbericht schreiben.** `PRUEFBERICHT.md` im Projektordner anlegen:
   - Funde nach Schwere sortiert (Blocker / Wichtig / Kosmetik)
   - Je Fund: Seite, Geräteprofil, Beschreibung, konkreter Behebungsvorschlag
   - Am Ende: Was geprüft wurde und was grün ist
5. **Nichts eigenmächtig ändern.** Der Bericht ist das Ergebnis; Korrekturen
   erst nach Freigabe umsetzen.

## Regeln

- Marken- und Sprachregeln aus CLAUDE.md gelten auch für die Bewertung
  (keine Vorschläge, die Testimonials, Icons oder neue Farben einführen).
- Screenshots wirklich einzeln öffnen, nicht nur die Testausgabe lesen —
  die Sichtprüfung ist der Kern dieses Befehls.
- Fehlschläge der Suite zuerst reproduzieren, dann bewerten (Flakes von
  echten Fehlern trennen).
