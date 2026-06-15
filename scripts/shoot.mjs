import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const URL = 'http://localhost:5173/';
const OUT = 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const consoleErrors = [];
const failed = [];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function newPage(width, height) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
  page.on('requestfailed', (r) => failed.push(`${r.url()} :: ${r.failure()?.errorText}`));
  page.on('response', (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url()}`));
  return { ctx, page };
}

// ---------- Desktop ----------
const { ctx, page } = await newPage(1440, 900);
await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
await page.evaluate(() => document.fonts.ready);
await wait(1000);

const sections = await page.evaluate(() =>
  [...document.querySelectorAll('main > section')].map((s) => ({ id: s.id || 'hero', top: s.offsetTop })),
);
console.log('SECTIONS', JSON.stringify(sections));
console.log('PAGE_HEIGHT', await page.evaluate(() => document.body.scrollHeight));

// Hero
await page.evaluate(() => window.scrollTo(0, 0));
await wait(900);
await page.screenshot({ path: `${OUT}/d-1-hero.png` });

// Each named section by id (scroll a touch past the fixed nav)
for (const s of sections) {
  if (s.id === 'hero') continue;
  await page.evaluate((y) => window.scrollTo(0, y - 70), s.top);
  await wait(1000);
  await page.screenshot({ path: `${OUT}/d-${s.id}.png` });
}

// Projects stacking frames
const proj = sections.find((s) => s.id === 'projects');
if (proj) {
  for (let f = 0; f < 3; f++) {
    await page.evaluate((y) => window.scrollTo(0, y), proj.top + 300 + f * 900);
    await wait(900);
    await page.screenshot({ path: `${OUT}/d-projects-stack-${f}.png` });
  }
}
await ctx.close();

// ---------- Mobile ----------
const { ctx: mctx, page: mpage } = await newPage(390, 844);
await mpage.goto(URL, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
await mpage.evaluate(() => document.fonts.ready);
await wait(900);
await mpage.screenshot({ path: `${OUT}/m-hero.png` });
await mpage.evaluate(() => window.scrollTo(0, document.querySelector('#skills').offsetTop - 70));
await wait(900);
await mpage.screenshot({ path: `${OUT}/m-skills.png` });
await mctx.close();

await browser.close();
console.log('CONSOLE_ERRORS', consoleErrors.length);
consoleErrors.slice(0, 20).forEach((e) => console.log('  ERR:', e));
const uniq = [...new Set(failed)];
console.log('FAILED_REQUESTS', uniq.length);
uniq.slice(0, 40).forEach((e) => console.log('  REQ:', e));
console.log('DONE');
