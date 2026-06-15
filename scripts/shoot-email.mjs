import { chromium } from 'playwright';
const b = await chromium.launch();
const wait = (ms) => new Promise((r)=>setTimeout(r, ms));
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await p.evaluate(()=>document.fonts.ready); await wait(1000);
// position the email button around mid-screen
const y = await p.evaluate(()=>{
  const el=[...document.querySelectorAll('button[aria-haspopup="menu"]')][0];
  const r=el.getBoundingClientRect(); return window.scrollY + r.top - 450;
});
await p.evaluate((yy)=>window.scrollTo(0,yy), y);
await wait(700);
const btn = await p.$('button[aria-haspopup="menu"]');
await btn.click(); await wait(500);
await p.screenshot({ path:'screenshots/email-open.png' });
await ctx.close(); await b.close(); console.log('done');
