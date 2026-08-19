import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { findeSeiten } from './helpers/seiten';

/**
 * Barrierefreiheit nach WCAG 2.1 AA mit axe-core.
 * Läuft auf einem Handy- und einem Desktop-Profil, das deckt beide Layouts ab.
 * Schweregrade "serious" und "critical" lassen den Test fehlschlagen,
 * leichtere Funde werden nur berichtet.
 */
test.describe('Barrierefreiheit (WCAG 2.1 AA)', () => {
  test.beforeEach(() => {
    test.skip(!['mobil-iphone', 'desktop-gross'].includes(test.info().project.name),
      'Barrierefreiheit läuft auf mobil-iphone und desktop-gross');
  });

  test('axe-Prüfung aller Seiten', async ({ page, baseURL }, testInfo) => {
    const seiten = await findeSeiten(page, baseURL!);
    const schwer: string[] = [];
    const leicht: string[] = [];

    for (const pfad of seiten) {
      await page.goto(pfad, { waitUntil: 'networkidle' });
      // Die großen Schmuckziffern (01–05) sind reine Dekoration im Sinne von
      // WCAG 1.4.3 („pure decoration"): bewusst blass, aria-hidden, ohne
      // Informationsgehalt. Sie sind deshalb von der Kontrastprüfung
      // ausgenommen. Alles andere wird vollständig geprüft.
      const ergebnis = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .exclude('.bento-n')
        .exclude('.outcome-n')
        .exclude('.step-n')
        .analyze();

      for (const v of ergebnis.violations) {
        const zeile = `${pfad}: [${v.impact}] ${v.id} – ${v.help} (${v.nodes.length} Stelle(n))`;
        if (v.impact === 'serious' || v.impact === 'critical') schwer.push(zeile);
        else leicht.push(zeile);
      }
    }

    if (leicht.length) {
      testInfo.annotations.push({ type: 'hinweise', description: leicht.join('\n') });
      console.log(`Leichtere Funde (${testInfo.project.name}):\n` + leicht.join('\n'));
    }
    expect(schwer, 'Schwere Barrierefreiheitsprobleme:\n' + schwer.join('\n')).toEqual([]);
  });
});
