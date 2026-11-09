import {JSDOM} from 'jsdom';
import assert from 'node:assert/strict';
const dom=new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:'https://beauty-lab.test'});
const w=dom.window;
Object.assign(globalThis,{window:w,document:w.document,localStorage:w.localStorage,sessionStorage:w.sessionStorage,HTMLElement:w.HTMLElement,HTMLDialogElement:w.HTMLDialogElement,IS_REACT_ACT_ENVIRONMENT:true});
w.scrollTo=()=>{};
Object.defineProperty(globalThis,'navigator',{value:w.navigator,configurable:true});
Object.defineProperty(w.navigator,'clipboard',{value:{writeText:async(s:string)=>{(globalThis as any).copied=s}},configurable:true});
w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')};
const React=await import('react');
const {act}=React;
const {createRoot}=await import('react-dom/client');
const {default:App}=await import('../src/App');
const {clientFamilies}=await import('../src/data/clientProducts');
const {clients}=await import('../src/data/clients');
let root=createRoot(document.getElementById('root')!);
async function render(){await act(async()=>{root.render(<App/>)})}
async function click(label:string){const b=Array.from((document.querySelector('dialog[open]')||document).querySelectorAll('button')).find(b=>b.textContent?.includes(label));assert.ok(b,`Button exists: ${label}`);assert.ok(!b.disabled,`Button enabled: ${label}`);await act(async()=>{b.click()})}
const saved=()=>JSON.parse(localStorage.getItem('beauty-lab-state-v1')!);
const events=()=>JSON.parse(localStorage.getItem('beauty-lab-events-v1')!);
await render();assert.match(document.body.textContent!,/Welcome to/);
await click('START MY SHIFT');assert.equal(document.querySelectorAll('.appointment-copy .appointment-type-label').length,2);assert.equal(document.querySelectorAll('.appointment-portrait .appointment-type-label').length,0);assert.ok(document.querySelector('.type-makeup'));assert.ok(document.querySelector('.type-skincare'));assert.equal(document.querySelectorAll('.appointment-portrait [data-effect]').length,0);assert.equal(saved().shift.pair.length,2);const pair=saved().shift.pair;
await act(async()=>{root.unmount()});root=createRoot(document.getElementById('root')!);await render();assert.deepEqual(saved().shift.pair,pair);
// Finish skincare first to exercise the flexible appointment order.
for(const name of [pair[1],pair[0]]){
 const button=Array.from(document.querySelectorAll('.appointment-card')).find(el=>el.textContent?.includes(name[0].toUpperCase()+name.slice(1)))!.querySelector('button')!;
 await act(async()=>button.click());await click('LET’S GET STARTED');
 for(let stage=0;stage<3;stage++){
 assert.equal(document.querySelectorAll('.product-card').length,clientFamilies(name,clients[name].stages[stage]).length);
 assert.equal(document.querySelectorAll('.product-card img.product-photo').length,clientFamilies(name,clients[name].stages[stage]).length,'All selectable options use real product photos');assert.ok(document.querySelector('.award-information'),'Selected US product explains its award scope');
 const firstPhoto=document.querySelector<HTMLImageElement>('.product-card img.product-photo')!;if(clients[name].stages[stage]==='cushion'){await act(async()=>firstPhoto.dispatchEvent(new w.Event('error')));assert.match(document.querySelector<HTMLImageElement>('.product-card img.product-photo')!.src,/\.png$/,'Cushion load errors retry a real PNG photo instead of an icon')}
 const referenceButton=document.querySelector<HTMLButtonElement>('.reference-trigger');
 if(referenceButton){await act(async()=>referenceButton.click());assert.ok(document.querySelector('.skin-reference img'));assert.ok(document.querySelector('.reference-links a[href^="https://"]'));const tabs=document.querySelectorAll<HTMLButtonElement>('.reference-options button');if(tabs.length>1){await act(async()=>tabs[1].click());assert.equal(tabs[1].getAttribute('aria-pressed'),'true')}await act(async()=>document.querySelector<HTMLButtonElement>('button[aria-label="Close dialog"]')!.click());assert.ok(document.querySelector('.product-tray'),'Reference viewer returns to the active station')}

 const shades=document.querySelectorAll<HTMLButtonElement>('.shade-picker button');if(shades.length>1){const oldCount=Object.keys(saved().shift.appointments[name].selections).length;await act(async()=>shades[1].click());assert.equal(Object.keys(saved().shift.appointments[name].selections).length,oldCount,'Changing a shade does not confirm the product');assert.equal(document.querySelectorAll('.shade-picker button[aria-pressed="true"]').length,1)}
 const next=document.querySelector('.next-button') as HTMLButtonElement;assert.ok(next.disabled,'Cannot advance before confirming');
 await click('TRY ON');assert.equal(Object.keys(saved().shift.appointments[name].selections).length,stage,'Try on does not confirm');await click('RESET BLENDING');const currentCategory=Object.keys(saved().shift.appointments[name].appearance)[stage];assert.ok(saved().shift.appointments[name].appearance[currentCategory].opacity>0,'Blend settings are stored with the appointment');assert.ok(document.querySelector('.application-effect'),'Application effect exists');
 const prevVariant=saved().shift.appointments[name].tried.at(-1);
 const productCard=document.querySelectorAll<HTMLButtonElement>('.product-card')[1];await act(async()=>productCard.click());await click('TRY ON');await click('SELECT THIS PRODUCT');
 assert.notEqual(Object.values(saved().shift.appointments[name].selections).at(-1),prevVariant);
 if(stage===0){await act(async()=>document.querySelectorAll<HTMLButtonElement>('.product-card')[2].click());await click('SELECT THIS PRODUCT');assert.ok(events().some((e:any)=>e.name==='product_replace'))}
 await click(stage===2?'FINISH THIS LOOK':'NEXT STEP');
 }
 assert.match(document.body.textContent!,/MATCH SCORE/);assert.equal(document.querySelectorAll('.comparison .portrait').length,2);assert.ok(document.querySelector('input[aria-label="Before and after comparison"]'));assert.equal(document.querySelectorAll('.result-product-image').length,3);await act(async()=>document.querySelector<HTMLButtonElement>('.result-product-image')!.click());assert.ok(document.querySelector('.enlarged-product-art .product-art'));await act(async()=>document.querySelector<HTMLButtonElement>('button[aria-label="Close dialog"]')!.click());const resultScore=saved().shift.appointments[name].score;await click('REFINE FINISH');await click('RESET BLENDING');await click('SAVE THIS FINISH');assert.equal(saved().shift.appointments[name].score,resultScore);await click('VIEW SIDE BY SIDE');assert.equal(document.querySelectorAll('.comparison .portrait').length,2);await click('USE COMPARISON SLIDER');
 await click(name===pair[1]?'MEET YOUR NEXT CLIENT':'TO GLOW CHECKOUT');
}
assert.equal(saved().shift.completed,true);assert.equal(events().filter((e:any)=>e.name==='shift_complete').length,1);
await click('REDEEM MY GLOW REWARD');assert.equal(events().filter((e:any)=>e.name==='coupon_claim').length,0,'Reveal is not a claim');
await click('CLAIM DEMO COUPON');await click('COPY CODE');assert.equal((globalThis as any).copied,'NICETRYGLOW');
let close=document.querySelector('button[aria-label="Close dialog"]') as HTMLButtonElement;await act(async()=>close.click());
await click('VIEW MY GLOW REWARD');assert.equal(events().filter((e:any)=>e.name==='coupon_claim').length,1);close=document.querySelector('button[aria-label="Close dialog"]') as HTMLButtonElement;await act(async()=>close.click());
await click('SAVE MY BEAUTY PICKS');assert.ok(document.querySelectorAll('input[type="checkbox"]').length>6,'Tried but unselected products available');await click('ADD SELECTED TO MY LIST');assert.equal(JSON.parse(localStorage.getItem('beauty-lab-wishlist-v1')!).length,6);
await click('COPY LIST');assert.match((globalThis as any).copied,/MY BEAUTY SHOPPING LIST/);
await act(async()=>document.querySelector<HTMLButtonElement>('button[aria-label^="Remove "]')!.click());assert.equal(JSON.parse(localStorage.getItem('beauty-lab-wishlist-v1')!).length,5);
close=document.querySelector('button[aria-label="Close dialog"]') as HTMLButtonElement;await act(async()=>close.click());
await click('ANALYST VIEW');assert.match(document.body.textContent!,/LOCAL BROWSER DATA/);assert.equal(document.querySelectorAll('table tbody tr').length>0,true);
await act(async()=>root.unmount());root=createRoot(document.getElementById('root')!);await render();assert.equal(saved().shift.couponClaimed,true);assert.equal(JSON.parse(localStorage.getItem('beauty-lab-wishlist-v1')!).length,5);
await click('Back to the studio');await click('TO GLOW CHECKOUT');await click('PLAY AGAIN — MEET TWO NEW CLIENTS');
assert.equal(saved().shift.round,2);assert.equal(saved().shift.cash,0);assert.equal(saved().shift.couponClaimed,false);assert.equal(new Set([...pair,...saved().shift.pair]).size,4);assert.equal(saved().shift.previousShift.completed,true);assert.equal(JSON.parse(localStorage.getItem('beauty-lab-wishlist-v1')!).length,5);assert.equal(events().filter((e:any)=>e.name==='coupon_claim').length,1,'Historical events survive the second game');
const secondPair=saved().shift.pair;
await act(async()=>root.unmount());root=createRoot(document.getElementById('root')!);await render();assert.deepEqual(saved().shift.pair,secondPair);
for(let i=0;i<2;i++){
 await click('START APPOINTMENT');await click('LET’S GET STARTED');
 for(let stage=0;stage<3;stage++){await click('SELECT THIS PRODUCT');await click(stage===2?'FINISH THIS LOOK':'NEXT STEP')}
 await click(i===0?'MEET YOUR NEXT CLIENT':'TO GLOW CHECKOUT');
}
assert.match(document.body.textContent!,/ALL FOUR CLIENTS STYLED/);assert.match(document.body.textContent!,/There are no more appointments/);assert.equal(document.querySelectorAll('.campaign-clients>span').length,4);assert.ok(!Array.from(document.querySelectorAll('button')).some(b=>b.textContent?.includes('PLAY AGAIN')));
await act(async()=>root.unmount());root=createRoot(document.getElementById('root')!);await render();assert.equal(saved().shift.round,2);assert.match(document.body.textContent!,/ALL FOUR CLIENTS STYLED/);assert.equal(events().filter((e:any)=>e.name==='shift_start').length,2);
await act(async()=>document.querySelector<HTMLButtonElement>('button[aria-label="Restart game"]')!.click());await click('KEEP PLAYING');assert.equal(saved().shift.round,2);assert.equal(saved().shift.completed,true);
await act(async()=>document.querySelector<HTMLButtonElement>('button[aria-label="Restart game"]')!.click());await click('RESTART FROM BEGINNING');assert.equal(saved().shift,null);assert.match(document.body.textContent!,/Welcome to/);assert.equal(JSON.parse(localStorage.getItem('beauty-lab-wishlist-v1')!).length,5);
await click('START MY SHIFT');await click('START APPOINTMENT');await click('LET’S GET STARTED');await click('TRY ON');assert.ok(saved().shift);await act(async()=>document.querySelector<HTMLButtonElement>('button[aria-label="Restart game"]')!.click());await click('RESTART FROM BEGINNING');assert.equal(saved().shift,null);
await act(async()=>root.unmount());root=createRoot(document.getElementById('root')!);await render();assert.equal(saved().shift,null);assert.match(document.body.textContent!,/Welcome to/);assert.equal(events().filter((e:any)=>e.reason==='manual_restart').length,2);assert.equal(JSON.parse(localStorage.getItem('beauty-lab-wishlist-v1')!).length,5);await act(async()=>root.unmount());
console.log('PASS: full four-client journey; one replay assigns both unseen clients; terminal ending persists on refresh; rewards, wishlist and historical events remain intact.');
