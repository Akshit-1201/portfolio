import { chromium } from 'playwright';
const b = await chromium.launch();
const wait = (ms) => new Promise((r)=>setTimeout(r, ms));
const ctx = await b.newContext({ viewport: { width: 1440, height: 500 } });
const p = await ctx.newPage();
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(1200);
// scroll so the marquee (just below hero) is in view
await p.evaluate(()=>window.scrollTo(0, window.innerHeight - 120));
await wait(1000);
await p.screenshot({ path: 'screenshots/d-marquee.png' });
await ctx.close(); await b.close(); console.log('done');
