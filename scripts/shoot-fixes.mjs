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
const m = await p.evaluate(()=>{
  const proj=document.querySelector('#projects'), sk=document.querySelector('#skills');
  return { projTop:proj.offsetTop, skTop:sk.offsetTop, vh:window.innerHeight, docH:document.body.scrollHeight };
});
console.log('METRICS', JSON.stringify(m));
// Walk through the last-card -> skills transition
const base = m.skTop; // skills offsetTop (overlapped)
const pts = [base - m.vh*1.0, base - m.vh*0.6, base - m.vh*0.25, base + m.vh*0.1, base + m.vh*0.45];
for (let i=0;i<pts.length;i++){
  await p.evaluate((y)=>window.scrollTo(0, Math.max(0,y)), pts[i]);
  await wait(800);
  await p.screenshot({ path:`screenshots/fix-${i}.png` });
}
// Experience period check
await p.evaluate((y)=>window.scrollTo(0,y), 2056);
await wait(800);
await p.screenshot({ path:'screenshots/fix-exp.png' });
// Contact: open email dropdown
await p.evaluate(()=>window.scrollTo(0, document.body.scrollHeight));
await wait(800);
const btn = await p.$('button[aria-haspopup="menu"]');
if (btn) { await btn.click(); await wait(500); }
await p.screenshot({ path:'screenshots/fix-email.png' });
await ctx.close(); await b.close();
console.log('ERRORS', errs.length, errs.slice(0,5));
console.log('FAILED', [...new Set(failed)].length);
console.log('done');
