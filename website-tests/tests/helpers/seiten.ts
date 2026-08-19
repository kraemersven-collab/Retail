import type { Page } from '@playwright/test';

/**
 * Ermittelt alle Seiten der Website automatisch.
 * 1. Versucht die Sitemap (Astro erzeugt sitemap-index.xml, wenn @astrojs/sitemap installiert ist).
 * 2. Fallback: sammelt alle internen Links von der Startseite.
 * Neue Seiten werden dadurch automatisch mitgetestet, ohne dass hier etwas gepflegt werden muss.
 */
export async function findeSeiten(page: Page, baseURL: string): Promise<string[]> {
  // 1. Sitemap
  for (const sm of ['/sitemap-index.xml', '/sitemap-0.xml', '/sitemap.xml']) {
    try {
      const res = await fetch(new URL(sm, baseURL));
      if (!res.ok) continue;
      let xml = await res.text();

      // Sitemap-Index: Untersitemaps nachladen
      const subs = [...xml.matchAll(/<loc>([^<]*sitemap[^<]*\.xml)<\/loc>/g)].map(m => m[1]);
      for (const sub of subs) {
        try {
          const r = await fetch(sub);
          if (r.ok) xml += await r.text();
        } catch { /* Untersitemap nicht erreichbar, weiter */ }
      }

      const pfade = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map(m => m[1])
        .filter(u => !u.endsWith('.xml'))
        .map(u => new URL(u).pathname);

      if (pfade.length) return [...new Set(pfade)].sort();
    } catch { /* Sitemap nicht vorhanden, weiter */ }
  }

  // 2. Fallback: Links auf der Startseite
  await page.goto('/');
  const hrefs = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href') ?? ''));
  const pfade = hrefs
    .filter(h => h.startsWith('/') && !h.startsWith('//'))
    .map(h => h.split('#')[0].split('?')[0])
    .filter(Boolean);
  return [...new Set(['/', ...pfade])].sort();
}

/** Macht aus einem Pfad einen Dateinamen: "/ueber-mich/" -> "ueber-mich" */
export function dateiname(pfad: string): string {
  const s = pfad.replace(/^\/|\/$/g, '').replace(/\//g, '_');
  return s === '' ? 'startseite' : s;
}
