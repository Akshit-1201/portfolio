import { chromium } from 'playwright';
const b = await chromium.launch();
const wait = (ms) => new Promise((r)=>setTimeout(r, ms));

// 1) reduced-motion: page should still show all content (text not stuck dim)
const rc = await b.newContext({ viewport:{width:1440,height:900}, reducedMotion:'reduce' });
const rp = await rc.newPage();
await rp.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await rp.evaluate(()=>document.fonts.ready); await wait(800);
await rp.evaluate(()=>document.querySelector('#about').scrollIntoView());
await wait(900);
await rp.screenshot({ path:'screenshots/a11y-reduced-about.png' }); // AnimatedText should be fully lit
await rc.close();

// 2) focus ring: tab through and capture a focused nav link + a button
const fc = await b.newContext({ viewport:{width:1440,height:900} });
const fp = await fc.newPage();
await fp.goto('http://localhost:5173/', { waitUntil:'networkidle', timeout:60000 }).catch(()=>{});
await fp.evaluate(()=>document.fonts.ready); await wait(800);
// tab to first interactive (wordmark), then a few more to reach a nav link
for (let i=0;i<3;i++){ await fp.keyboard.press('Tab'); await wait(120); }
await fp.screenshot({ path:'screenshots/a11y-focus-nav.png', clip:{x:0,y:0,width:1440,height:90} });
// focus the Contact CTA in hero
const cta = await fp.$('a[href="#contact"]');
await cta.focus(); await wait(200);
await fp.screenshot({ path:'screenshots/a11y-focus-cta.png' });
await fc.close();
await b.close();
console.log('done');
