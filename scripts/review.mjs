import { chromium } from 'playwright';
const b = await chromium.launch();
const wait = (ms) => new Promise((r)=>setTimeout(r, ms));
const errs=[], failed=[];
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
p.on('console', m=>m.type()==='error'&&errs.push(m.text()));
p.on('requestfailed', r=>failed.push(r.url()));
p.on('response', r=>r.status()>=400&&failed.push(r.status()+' '+r.url()));
await p.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(1000);

const ids = await p.evaluate(()=>{
  const o={};
  for (const s of document.querySelectorAll('main > section')) o[s.id||'marquee']=s.offsetTop;
  o.__docH=document.body.scrollHeight; o.__vh=window.innerHeight;
  return o;
});
console.log('LAYOUT', JSON.stringify(ids));

async function shot(name, y){ await p.evaluate(yy=>window.scrollTo(0,Math.max(0,yy)), y); await wait(900); await p.screenshot({path:`screenshots/rv-${name}.png`}); }

await shot('1-hero', 0);
await shot('2-marquee', ids.top + ids.__vh - 130);
await shot('3-about', ids.about - 60);
await shot('4-experience', ids.experience - 60);
await shot('5-projects', ids.projects + 300);
// projects -> skills scroll space (last card should sit before skills)
await shot('6-gap', ids.skills - ids.__vh*0.9);
await shot('7-gap2', ids.skills - ids.__vh*0.4);
await shot('8-skills', ids.skills - 60);
await shot('9-publication', ids.publication - 60);
await shot('10-contact', ids.contact - 60);
await ctx.close();

// md navbar check (6 links)
const ctx2 = await b.newContext({ viewport: { width: 820, height: 700 } });
const p2 = await ctx2.newPage();
await p2.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await p2.evaluate(()=>document.fonts.ready); await wait(700);
await p2.screenshot({ path:'screenshots/rv-nav-md.png', clip:{x:0,y:0,width:820,height:90} });
await ctx2.close();

await b.close();
console.log('ERRORS', errs.length, errs.slice(0,8));
console.log('FAILED', [...new Set(failed)].length, [...new Set(failed)].slice(0,10));
console.log('done');
