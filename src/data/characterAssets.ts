import type {ClientId,Category} from './clients';
export type CharacterAssets={neutral:string;complexion?:string;width:number;height:number;overlays:Partial<Record<Category,string>>;happy?:string;curious?:string;excited?:string;talking?:string};
const path=(id:ClientId,file:string)=>`/characters/v2/${id}/${file}`;
export const characterAssets:Record<ClientId,CharacterAssets>={
 chloe:{neutral:'/characters/v3/chloe-bare.png',complexion:'/characters/v3/chloe-complexion.png',width:1199,height:1312,overlays:{cushion:path('chloe','overlays/01-base.png'),blush:path('chloe','overlays/02-blush.png'),lip:path('chloe','overlays/03-lip.png')}},
 rin:{neutral:'/characters/v3/rin-bare.png',complexion:'/characters/v3/rin-complexion.png',width:1199,height:1312,overlays:{cushion:path('rin','overlays/01-base.png'),eyeshadow:path('rin','overlays/02-eyeshadow.png'),lip:path('rin','overlays/03-lip.png')}},
 jisoo:{neutral:'/characters/v3/jisoo-bare.png',width:1086,height:1448,overlays:{toner:path('jisoo','overlays/01-toner.png'),serum:path('jisoo','overlays/02-serum.png'),cream:path('jisoo','overlays/03-cream.png')}},
 alex:{neutral:'/characters/v3/alex-bare.png',width:1086,height:1448,overlays:{toner:path('alex','overlays/01-toner.png'),serum:path('alex','overlays/02-serum.png'),cream:path('alex','overlays/03-cream.png')}}
};
export type FaceLandmarks={eyes:[number,number][];cheeks:[number,number][];lip:[number,number];face:[number,number];eyeWidth:number;cheekRx:number;cheekRy:number;lipWidth:number;lipHeight:number};
// A 543×724 effect coordinate space is projected with the whole effect group onto each
// native image canvas. This never changes image proportions or moves image/layers separately.
export const portraitCanvas={width:543,height:724} as const;
export const faceLandmarks:Record<ClientId,FaceLandmarks>={
 chloe:{eyes:[[245,262],[347,259]],cheeks:[[224,316],[376,313]],lip:[300,398],face:[297,331],eyeWidth:51,cheekRx:33,cheekRy:25,lipWidth:77,lipHeight:40},
 rin:{eyes:[[232,237],[333,235]],cheeks:[[209,298],[361,295]],lip:[285,373],face:[283,312],eyeWidth:50,cheekRx:34,cheekRy:26,lipWidth:73,lipHeight:40},
 jisoo:{eyes:[[210,281],[336,280]],cheeks:[[182,345],[370,344]],lip:[275,413],face:[275,337],eyeWidth:55,cheekRx:35,cheekRy:23,lipWidth:92,lipHeight:39},
 alex:{eyes:[[221,256],[339,255]],cheeks:[[190,325],[375,323]],lip:[284,389],face:[280,325],eyeWidth:55,cheekRx:35,cheekRy:23,lipWidth:94,lipHeight:36}
};

/** Common 4:5 headshot: eyes at 37% height and 28% horizontal separation.
 * Crop the complete composited SVG, preserving original image and mask geometry. */
export function clientFrame(id:ClientId){const asset=characterAssets[id],f=faceLandmarks[id];const eyes=f.eyes.map(([x,y])=>[x/portraitCanvas.width*asset.width,y/portraitCanvas.height*asset.height]);const width=(eyes[1][0]-eyes[0][0])/.28,height=width*1.25;return {x:(eyes[0][0]+eyes[1][0])/2-width/2,y:(eyes[0][1]+eyes[1][1])/2-height*.37,width,height}}
