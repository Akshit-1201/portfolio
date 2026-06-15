import { chromium } from 'playwright';
const b = await chromium.launch();
const wait = (ms) => new Promise((r)=>setTimeout(r, ms));
const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
const p = await ctx.newPage();
await p.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(900);
await p.screenshot({ path:'screenshots/hm-top.png' });           // first viewport
const h = await p.evaluate(()=>document.querySelector('#top').offsetHeight);
console.log('hero height', h, 'vh 844');
await p.evaluate(()=>window.scrollTo(0, 520));
await wait(500);
await p.screenshot({ path:'screenshots/hm-scroll.png' });        // lower part of hero
await ctx.close(); await b.close(); console.log('done');
