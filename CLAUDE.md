# numana-coaching.de

Website der Coaching-Praxis numana, Corinna Krämer, Münster.

## Ziel der Seite
Ein kostenloses Erstgespräch, gebucht oder angefragt. Jede Änderung wird daran gemessen.

## Zielgruppe
Frauen in analytischen Berufen (Finance, Controlling, Steuerberatung, Engineering,
IT, Versicherung), 35 bis 55, vor einem beruflichen Wechsel oder einer Führungsrolle.
Sie erkennen Werbesprache sofort und reagieren allergisch darauf.

## Marke
Farben (nur als CSS-Variablen aus src/styles/marke.css verwenden):
  --gruen-dunkel: #1D5B58   Überschriften
  --gruen-akzent:  #228483   Links, Buttons
  --gruen-hell:    #229BA8   Flächen
  --hintergrund:   #FDFCFA
  --text:          #333333
  --text-sekundaer:#555555
Schrift: Plus Jakarta Sans, lokal aus public/fonts. Überschriften Regular oder Medium,
nie Bold. Weißraum großzügig.

## Sprache
Kurze Sätze. Sie-Ansprache. Keine Ausrufezeichen, keine Superlative, keine Emojis,
keine Em-Dashes. Kein Coaching-Jargon (keine „Reise", kein „Potenzial", nichts
„Ganzheitliches", kein „Mindset"). Höchstens eine „kein X, sondern Y"-Formulierung
pro Seite.

## Harte Regeln
- Keine Testimonials, keine Fallbeispiele, keine Klientinnenzitate. Nie erfinden.
- Keine Heilversprechen. Coaching ist keine Therapie.
- Schriften lokal, nie über ein Fremd-CDN.
- Kein Tracking, das einen Cookie-Banner erzwingt.
- Mobile zuerst. Bilder als WebP. Ladezeit unter zwei Sekunden.
- Ein Handlungsaufruf pro Seite, überall gleich beschriftet: „Erstgespräch vereinbaren".

## Technik
Astro, statisch. Inhalte als Markdown in src/content. Deployment per Git-Push.
Vor jedem Abschluss: npm run build muss ohne Fehler durchlaufen.
