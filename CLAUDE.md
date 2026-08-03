# numana-coaching.de

Website der Coaching-Praxis numana coaching & consulting, Corinna Krämer, Münster.
numana wird immer klein geschrieben.

## Ziel der Seite
Ein kostenloses Erstgespräch, gebucht oder angefragt. Jede Änderung wird daran gemessen.

## Zielgruppe
Frauen in analytischen Berufen (Finance, Controlling, Steuerberatung, Engineering,
IT, Versicherung), 35 bis 55, vor einer beruflichen Entscheidung: Wechsel,
Führungsrolle oder der Schritt in die Selbständigkeit.
Sie erkennen Werbesprache sofort und reagieren allergisch darauf.

## Marke
Farben ausschließlich als CSS-Variablen aus src/styles/marke.css (:root),
keine neuen Hexwerte. Kernwerte:
  --teal:        #1E5A58   Grundfarbe, Nav, Buttons
  --teal-bright: #229BA8   Akzent
  --teal-dark:   #0F4845   CTA-Band
  --sand:        #F7F4EF   Seitenhintergrund
  --paper:       #FBFBF8   Karten, Flächen
  --ink:         #23292B   Text, Footer
Schriften: Plus Jakarta Sans (Überschriften, --serif) und Inter (Fließtext, --sans),
lokal aus public/fonts, nie über ein Fremd-CDN. Schriftgewichte nur 400 und 500,
Bold (700) ist ausgeschlossen; Betonung über Größe, Farbe, Laufweite.

## Gestaltung
- Flächen flach: keine Gradienten (Ausnahme: radialer Schimmer im CTA-Band),
  kein Blur, keine Glassmorphism
- Keine Emoji, keine Icons, keine Illustrationen, keine Muster
- Motion: 180 ms, cubic-bezier(0.2, 0.7, 0.2, 1). Keine Bounces, kein Parallax
- Neue CSS-Klassen nur, wenn unvermeidbar, dann im bestehenden Benennungsschema
  (bento-, step-, tier-, assure-, next-, fit-)

## Sprache
Kurze Sätze. Sie-Ansprache durchgehend, Ich-Stimme für Corinna. Keine
Ausrufezeichen, keine Superlative, keine Emojis. Kein Coaching-Jargon: keine
„Reise", kein „Potenzial entfalten", nichts „Ganzheitliches", kein „Mindset",
kein „Loslassen", kein „Bauchgefühl".

## Harte Regeln
- Keine Testimonials, keine Fallbeispiele, keine Klientinnenzitate. Nie erfinden.
- Keine Heilversprechen. Coaching ist keine Psychotherapie, die Abgrenzung steht
  auf der Kontaktseite und bleibt.
- Master Coach, Inner Change und MINDFUCK beginnen erst im Oktober 2026 und
  dürfen nirgends als abgeschlossen erscheinen.
- Kein Tracking, das einen Cookie-Banner erzwingt.
- Mobile zuerst. Bilder als WebP oder JPG, klein. Ladezeit unter zwei Sekunden.
- Rechtstexte (Impressum, Datenschutz) unverändert lassen.

## Technik
Astro, statisch erzeugt. Seiten in src/pages, Layout in src/layouts/Basis.astro,
Design-System in src/styles/marke.css. Deployment per Git-Push.
Vor jedem Abschluss: npm run build muss ohne Fehler durchlaufen.
