import { test, expect } from '@playwright/test';
import { findeSeiten } from './helpers/seiten';

/**
 * Funktionsprüfung. Läuft nur auf einem Profil (desktop-gross),
 * weil Links und Skriptfehler nicht vom Gerät abhängen.
 */
test.describe('Funktion', () => {
  test.beforeEach(() => {
    test.skip(test.info().project.name !== 'desktop-gross',
      'Funktionstests laufen nur einmal, auf desktop-gross');
  });

  test('Keine kaputten internen Links', async ({ page, request, baseURL }) => {
    const seiten = await findeSeiten(page, baseURL!);
    const geprueft = new Set<string>();
    const kaputt: string[] = [];

    for (const pfad of seiten) {
      await page.goto(pfad);
      const hrefs = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href') ?? ''));
      for (const href of hrefs) {
        if (!href.startsWith('/') || href.startsWith('//')) continue;
        const ziel = href.split('#')[0];
        if (!ziel || geprueft.has(ziel)) continue;
        geprueft.add(ziel);
        const res = await request.get(new URL(ziel, baseURL!).toString());
        if (res.status() >= 400) kaputt.push(`${pfad} -> ${ziel} (Status ${res.status()})`);
      }
    }
    expect(kaputt, 'Kaputte Links:\n' + kaputt.join('\n')).toEqual([]);
  });

  test('Keine Fehler in der Browser-Konsole', async ({ page, baseURL }) => {
    const seiten = await findeSeiten(page, baseURL!);
    const fehler: string[] = [];

    page.on('pageerror', e => fehler.push(`Skriptfehler: ${e.message}`));
    page.on('console', msg => {
      if (msg.type() === 'error') fehler.push(`Konsole: ${msg.text()}`);
    });

    for (const pfad of seiten) {
      await page.goto(pfad, { waitUntil: 'networkidle' });
    }
    expect(fehler, 'Konsolenfehler:\n' + fehler.join('\n')).toEqual([]);
  });

  test('Kontaktweg vorhanden: Formular oder verlinkte E-Mail', async ({ page, baseURL }) => {
    const seiten = await findeSeiten(page, baseURL!);
    let gefunden = false;

    for (const pfad of seiten) {
      await page.goto(pfad);
      const hatFormular = (await page.locator('form').count()) > 0;
      const hatMail = (await page.locator('a[href^="mailto:"]').count()) > 0;
      const hatBuchung = (await page.locator('a[href*="termin"], a[href*="buchen"], a[href*="erstgespraech"]').count()) > 0;
      if (hatFormular || hatMail || hatBuchung) { gefunden = true; break; }
    }
    expect(gefunden, 'Auf keiner Seite wurde ein Formular, ein mailto-Link oder ein Buchungslink gefunden').toBe(true);
  });
});
