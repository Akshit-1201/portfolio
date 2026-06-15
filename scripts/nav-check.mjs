import { chromium } from 'playwright';
const b = await chromium.launch();
const wait = (ms) => new Promise((r)=>setTimeout(r, ms));
for (const w of [820, 1024, 1280]){
  const ctx = await b.newContext({ viewport: { width: w, height: 200 } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
  await p.evaluate(()=>document.fonts.ready); await wait(700);
  await p.screenshot({ path:`screenshots/nav-${w}.png`, clip:{x:0,y:0,width:w,height:80} });
  await ctx.close();
}
await b.close(); console.log('done');
