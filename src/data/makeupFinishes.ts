/** Artistic profiles informed by official on-skin imagery; not calibrated shade/efficacy data. */
export function lipFinish(finish:string){
 if(finish==='High shine')return {pigment:.34,depth:.06,reflection:1.35};
 if(finish==='Juicy')return {pigment:.46,depth:.09,reflection:1};
 if(finish==='Glossy')return {pigment:.4,depth:.07,reflection:1.15};
 if(finish==='Blurred')return {pigment:.5,depth:.12,reflection:0};
 return {pigment:.62,depth:.2,reflection:0};
}
export function cheekFinish(finish:string){return finish==='Fresh liquid'?{pigment:.82,radiance:.12}:{pigment:1,radiance:0}}
