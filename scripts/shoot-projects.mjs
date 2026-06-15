import { chromium } from 'playwright';
const b = await chromium.launch();
const wait = (ms) => new Promise((r)=>setTimeout(r, ms));
const errs=[], failed=[];
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
p.on('console', m=>m.type()==='error'&&errs.push(m.text()));
p.on('requestfailed', r=>failed.push(r.url()));
await p.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(1000);
const top = await p.evaluate(()=>document.querySelector('#projects').offsetTop);
console.log('projects top', top);
// 5 frames stepping through the stack
for (let i=0;i<5;i++){
  await p.evaluate((y)=>window.scrollTo(0,y), top + 200 + i*820);
  await wait(900);
  await p.screenshot({ path:`screenshots/p-${i}.png` });
}
await ctx.close(); await b.close();
console.log('ERRORS', errs.length, errs.slice(0,5));
console.log('FAILED', [...new Set(failed)].length);
console.log('done');
