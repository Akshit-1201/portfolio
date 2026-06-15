import { chromium } from 'playwright';
const b = await chromium.launch();
const wait = (ms) => new Promise((r)=>setTimeout(r, ms));
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(1000);
const skTop = await p.evaluate(()=>document.querySelector('#skills').offsetTop);
const vh = await p.evaluate(()=>window.innerHeight);
console.log('skTop', skTop, 'vh', vh);
const steps = [-1.0,-0.8,-0.6,-0.4,-0.2,0.0];
for (let i=0;i<steps.length;i++){
  await p.evaluate((y)=>window.scrollTo(0,Math.max(0,y)), skTop + steps[i]*vh);
  await wait(700);
  await p.screenshot({ path:`screenshots/scan-${i}.png` });
}
await ctx.close(); await b.close(); console.log('done');
