# numana-coaching.de

Website der Coaching-Praxis numana, Corinna Krämer, Münster.
Astro, statisch erzeugt, Inhalte als Markdown, Deployment per Git-Push.
Regelwerk für Änderungen: `CLAUDE.md`.

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm install` | Abhängigkeiten installieren |
| `npm run dev` | Lokale Vorschau unter `localhost:4321` |
| `npm run build` | Seite nach `dist/` bauen, muss vor jedem Abschluss fehlerfrei laufen |

## Texte ändern ohne Rechner

Seitentexte liegen in `src/pages/`, Beiträge als Markdown in
`src/content/beitraege/`. Ein neuer Beitrag ist eine neue Datei mit
Frontmatter (`titel`, `beschreibung`, `datum`) und erscheint nach dem
Speichern automatisch unter `/beitraege`.

## Offene Punkte vor Veröffentlichung

Diese Angaben sind im Code als Platzhalter oder Kommentar markiert und
müssen vor dem Livegang bestätigt oder ergänzt werden:

1. **Preise.** Eingesetzt sind 160 Euro je Sitzung (60 Minuten) und 750 Euro
   für das Fünferpaket, dazu die Ausfallregel (kostenfrei verschieben bis
   24 Stunden vorher). Zu bestätigen oder anzupassen in `src/pages/index.astro`,
   `wechsel.astro`, `fuehrung.astro`, `ablauf.astro`.
2. **Sitzungszahl und Takt.** Eingesetzt: vier bis sechs Sitzungen, Abstand
   zwei bis drei Wochen.
3. **Vita.** Stationen mit Zeitraum und Rolle sowie Institut und Jahr der
   Coaching-Ausbildung in `src/pages/ueber.astro` präzisieren.
4. **Fotos.** Zwei Fotos (Startseite, Über-Seite) als WebP unter
   `public/bilder/` ablegen, Kommentarstellen im Code markieren die Position.
5. **Anschrift und Telefonnummer.** In `impressum.astro`, `datenschutz.astro`
   und im `LocalBusiness`-Eintrag in `src/layouts/Basis.astro` ergänzen,
   zeichengenau identisch mit dem Google-Unternehmensprofil.
6. **Hosting.** Vorschlag Netlify oder Vercel (Deployment per Git-Push).
   Das Kontaktformular ist für Netlify Forms vorbereitet (`data-netlify`);
   bei einem anderen Hoster einen Formular-Dienst wählen und das
   `form`-Element in `kontakt.astro` anpassen. Ort der Verarbeitung und
   Auftragsverarbeitungsvertrag vor der Auswahl klären.
7. **Terminbuchung.** Anbieter mit Verarbeitung im europäischen Raum wählen,
   dann in `kontakt.astro` als direkten Buchungsweg ergänzen (Kommentarstelle
   vorhanden) und die Datenschutzerklärung erweitern.
8. **Arbeitsprobe.** Ein Beispiel-Reflexionsblatt als PDF (Skill
   `numana-dokumente`) unter `public/` ablegen und in `ablauf.astro`
   verlinken, ohne E-Mail-Zwang.
9. **Rechtstexte.** Impressum und Datenschutzerklärung sind Entwürfe mit
   Platzhaltern und vor Veröffentlichung durch eine fachkundige Stelle zu
   prüfen. Die Entwurfshinweise auf beiden Seiten danach entfernen.
10. **E-Mail-Adresse.** Eingesetzt ist kontakt@numana-coaching.de; Postfach
    einrichten oder Adresse ersetzen.
