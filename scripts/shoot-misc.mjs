import { chromium } from 'playwright';
const b = await chromium.launch();
const wait = (ms) => new Promise((r)=>setTimeout(r, ms));
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(1000);
// Experience date
await p.evaluate(()=>document.querySelector('#experience').scrollIntoView());
await wait(800); await p.screenshot({ path:'screenshots/misc-exp.png' });
// Contact: open email dropdown
await p.evaluate(()=>window.scrollTo(0, document.body.scrollHeight));
await wait(900);
const btn = await p.$('button[aria-haspopup="menu"]');
if (btn) { await btn.click(); await wait(500); }
await p.screenshot({ path:'screenshots/misc-email.png' });
await ctx.close(); await b.close(); console.log('done');
