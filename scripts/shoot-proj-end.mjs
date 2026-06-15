import { chromium } from 'playwright';
const b = await chromium.launch();
const wait = (ms) => new Promise((r)=>setTimeout(r, ms));
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(1000);
const m = await p.evaluate(()=>{
  const proj=document.querySelector('#projects'), sk=document.querySelector('#skills');
  return { projTop:proj.offsetTop, projH:proj.offsetHeight, skTop:sk.offsetTop, vh:window.innerHeight, docH:document.body.scrollHeight };
});
console.log('METRICS', JSON.stringify(m));
// frames approaching the projects->skills boundary
const skTop = m.skTop;
const offsets = [skTop - m.vh*1.6, skTop - m.vh*1.2, skTop - m.vh*0.9, skTop - m.vh*0.6, skTop - m.vh*0.3];
for (let i=0;i<offsets.length;i++){
  await p.evaluate((y)=>window.scrollTo(0, Math.max(0,y)), offsets[i]);
  await wait(800);
  await p.screenshot({ path:`screenshots/end-${i}.png` });
}
await ctx.close(); await b.close(); console.log('done');
