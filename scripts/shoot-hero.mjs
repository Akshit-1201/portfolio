import { chromium } from 'playwright';
const b = await chromium.launch();
const wait = (ms) => new Promise((r)=>setTimeout(r, ms));
// desktop
let ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let p = await ctx.newPage();
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(900);
await p.screenshot({ path: 'screenshots/1-hero.png' });
await ctx.close();
// mobile
ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
p = await ctx.newPage();
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(900);
await p.screenshot({ path: 'screenshots/m-1-hero.png' });
await ctx.close();
await b.close();
console.log('done');
