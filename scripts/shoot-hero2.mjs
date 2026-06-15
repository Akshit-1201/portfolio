import { chromium } from 'playwright';
const b = await chromium.launch();
const wait = (ms) => new Promise((r)=>setTimeout(r, ms));
const errs=[],failed=[];
// desktop
let ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let p = await ctx.newPage();
p.on('console', m=>m.type()==='error'&&errs.push(m.text()));
p.on('requestfailed', r=>failed.push(r.url()));
await p.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(1000);
await p.screenshot({ path:'screenshots/hero2-desktop.png' });
await ctx.close();
// laptop 1280
ctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
p = await ctx.newPage();
await p.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(900);
await p.screenshot({ path:'screenshots/hero2-laptop.png' });
await ctx.close();
// mobile
ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
p = await ctx.newPage();
await p.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(900);
await p.screenshot({ path:'screenshots/hero2-mobile.png', fullPage:true });
await ctx.close();
await b.close();
console.log('ERRORS', errs.length, errs.slice(0,5));
console.log('FAILED', [...new Set(failed)].length);
console.log('done');
