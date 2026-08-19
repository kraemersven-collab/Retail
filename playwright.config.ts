import { defineConfig, devices } from '@playwright/test';

// Gegen welche URL getestet wird:
//   BASE_URL=https://numana-coaching.de npx playwright test   -> Live-Seite
//   npx playwright test                                        -> baut und startet die Seite lokal
const BASE_URL = process.env.BASE_URL || 'http://localhost:4321';

// In Umgebungen ohne "npx playwright install" (z. B. Claude Code Remote)
// kann ein vorinstallierter Chromium angegeben werden:
//   CHROMIUM_PFAD=/opt/pw-browsers/chromium npx playwright test --project=desktop-gross
// Wirkt nur auf die Chromium-Profile; ohne die Variable ändert sich nichts.
const chromiumLokal = process.env.CHROMIUM_PFAD
  ? { launchOptions: { executablePath: process.env.CHROMIUM_PFAD } }
  : {};

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
  },
  // Ohne BASE_URL wird die Seite lokal gebaut und getestet
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run build && npm run preview',
        url: 'http://localhost:4321',
        reuseExistingServer: true,
        timeout: 180_000,
      },

  // Gerätematrix: Handys, Tablets, Desktops in mehreren Auflösungen und Browsern.
  // Ein Gerät ergänzen = eine Zeile ergänzen.
  projects: [
    { name: 'mobil-klein',     use: { ...devices['iPhone SE'] } },
    { name: 'mobil-iphone',    use: { ...devices['iPhone 15 Pro'] } },
    { name: 'mobil-android',   use: { ...devices['Pixel 7'], ...chromiumLokal } },
    { name: 'tablet-hoch',     use: { ...devices['iPad Mini'] } },
    { name: 'tablet-quer',     use: { ...devices['iPad Pro 11 landscape'] } },
    { name: 'desktop-klein',   use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 }, ...chromiumLokal } },
    { name: 'desktop-gross',   use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 }, ...chromiumLokal } },
    { name: 'desktop-firefox', use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } } },
    { name: 'desktop-safari',  use: { ...devices['Desktop Safari'] } },
  ],
});
