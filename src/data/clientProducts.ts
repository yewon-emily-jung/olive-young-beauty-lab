import {products} from './products';
import {clients,type ClientId,type Category} from './clients';
/** Warm/cool suggestions guide the fictional brief; every shade remains available. */
export function clientProducts(id:ClientId,category:Category){
 const options=products.filter(p=>p.category===category);
 if(clients[id].type!=='makeup'||category==='cushion')return options;
 const preferred=id==='chloe'?'warm':'cool';
 const starter=id==='chloe'?(category==='blush'?'us-UA58610827-8':category==='lip'?'us-UA66355696-4':''):(category==='eyeshadow'?'us-UA50161155-8':category==='lip'?'us-UA66355696-2':'');
 return options.sort((a,b)=>Number(b.id===starter)-Number(a.id===starter)||Number(b.tone===preferred)-Number(a.tone===preferred));
}
export function clientFamilies(id:ClientId,category:Category){return clientProducts(id,category).filter((p,i,all)=>all.findIndex(other=>other.familyId===p.familyId)===i)}
