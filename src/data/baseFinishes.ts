/** Illustrative finish profiles; complexion comes from the client's own source image. */
export type BaseFinishProfile={coverage:number;blur:number;matte:number;radiance:number;shine:number};
const profiles:Record<string,BaseFinishProfile>={
 'Natural glow':{coverage:.88,blur:.55,matte:0,radiance:.22,shine:.58},
 'Luminous':{coverage:.9,blur:.6,matte:0,radiance:.42,shine:1},
 'Soft matte':{coverage:.92,blur:.9,matte:.78,radiance:0,shine:.04},
 'Soft coverage':{coverage:1,blur:1.2,matte:.3,radiance:.05,shine:.12},
 'Satin coverage':{coverage:.96,blur:1,matte:.18,radiance:.12,shine:.35}
};
export const baseFinish=(finish:string):BaseFinishProfile=>profiles[finish]||profiles['Natural glow'];
