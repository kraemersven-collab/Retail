import { test, expect } from '@playwright/test';
import { findeSeiten, dateiname } from './helpers/seiten';

/**
 * Macht von jeder Seite auf jedem Geräteprofil einen Screenshot in voller Länge
 * und prüft dabei den häufigsten Layoutfehler: horizontales Überlaufen
 * (Inhalt breiter als der Bildschirm, seitliches Wackeln auf dem Handy).
 *
 * Ergebnis: screenshots/<gerät>/<seite>.png
 * Diese Bilder sind die Grundlage für die KI-Sichtprüfung.
 */
test('Screenshots und Layoutbreite aller Seiten', async ({ page, baseURL }, testInfo) => {
  const seiten = await findeSeiten(page, baseURL!);
  expect(seiten.length, 'Es wurden keine Seiten gefunden').toBeGreaterThan(0);

  const fehler: string[] = [];

  for (const pfad of seiten) {
    await page.goto(pfad, { waitUntil: 'networkidle' });

    // Screenshot in voller Seitenlänge
    await page.screenshot({
      path: `screenshots/${testInfo.project.name}/${dateiname(pfad)}.png`,
      fullPage: true,
    });

    // Horizontaler Überlauf?
    const ueberlauf = await page.evaluate(() => {
      const b = document.documentElement;
      return b.scrollWidth > b.clientWidth + 1
        ? `${b.scrollWidth}px Inhalt bei ${b.clientWidth}px Breite`
        : null;
    });
    if (ueberlauf) fehler.push(`${pfad}: horizontaler Überlauf (${ueberlauf})`);
  }

  expect(fehler, `Layoutprobleme auf ${testInfo.project.name}:\n` + fehler.join('\n')).toEqual([]);
});
