import {lipFinish,cheekFinish} from '../data/makeupFinishes';
import {lipRegions,blushRegions} from '../data/makeupRegions';
import {eyeRegions} from '../data/eyeRegions';
import {baseFinish} from '../data/baseFinishes';
import {blendFor,type Appearance} from '../data/appearance';
import {useId} from 'react';
import {clients,type ClientId,type Category} from '../data/clients';
import {byId} from '../data/products';
import {characterAssets,faceLandmarks,portraitCanvas,clientFrame} from '../data/characterAssets';
export type Look=Partial<Record<Category,string>>;
export function lipShape(width:number,height:number){const w=width,h=height;return `M ${-w/2} 0 C ${-w*.32} ${-h*.12} ${-w*.22} ${-h*.55} ${-w*.1} ${-h*.39} Q 0 ${-h*.22} ${w*.1} ${-h*.39} C ${w*.22} ${-h*.55} ${w*.33} ${-h*.12} ${w/2} 0 C ${w*.31} ${h*.14} ${w*.29} ${h*.53} 0 ${h*.53} C ${-w*.3} ${h*.53} ${-w*.35} ${h*.12} ${-w/2} 0 Z`}
/** Image and effects share a single intrinsic coordinate system and one SVG transform.
 * imageHref is used for embedded, portable image exports. No expression artwork is fabricated. */
export function Portrait({id,look={},expression='neutral',className='',imageHref,overlayHrefs,appearance={},ariaLabel,complexionHref}:{id:ClientId;look?:Look;expression?:'neutral'|'happy'|'curious'|'excited';className?:string;imageHref?:string;overlayHrefs?:Partial<Record<Category,string>>;appearance?:Appearance;ariaLabel?:string;complexionHref?:string}){
 const c=clients[id],u=`portrait-${useId().replace(/[^a-zA-Z0-9_-]/g,'')}`;const fill=(s:string)=>`url(#${u}-${s})`;const f=faceLandmarks[id];
 const get=(cat:Category)=>look[cat]?byId(look[cat]!):undefined;
 // Skincare appointments never receive makeup overlays, even with a malformed saved look.
 const makeup=c.type==='makeup';const blush=makeup?get('blush'):undefined,lip=makeup?get('lip'):undefined,eye=makeup?get('eyeshadow'):undefined,base=makeup?get('cushion'):undefined;
 const skincare=makeup?0:['toner','serum','cream'].filter(k=>look[k as Category]).length;
 const skinStages=makeup?[]:(['toner','serum','cream'] as Category[]).filter(cat=>get(cat));
 const skinStrength=(cat:Category)=>{const p=get(cat);if(!p)return 0;const b=blendFor(appearance,cat);return b.opacity*(.85+(p.metrics.hydration-75)/100)};
 const radiance=Math.min(.7,skinStages.reduce((sum,cat)=>sum+skinStrength(cat)*(cat==='toner'?.2:cat==='serum'?.28:.36),0));
 const finish=baseFinish(base?.finish||'Natural glow');
 const lipProfile=lipFinish(lip?.finish||''),cheekProfile=cheekFinish(blush?.finish||'');
 const glossy=lip&&['Juicy','Glossy','High shine'].includes(lip.finish),blurred=lip?.finish==='Blurred';
 const bs=blendFor(appearance,'blush'),ls=blendFor(appearance,'lip'),es=blendFor(appearance,'eyeshadow'),cs=blendFor(appearance,'cushion');
 const lr=lipRegions[id];const [lx,ly]=f.lip,[fx,fy]=f.face,lipPath=lr.path;
 const frame=clientFrame(id);const asset=characterAssets[id];const href=imageHref||asset[expression]||asset.neutral;const complexion=complexionHref||asset.complexion||href;const overlay=(cat:Category)=>overlayHrefs?.[cat]||asset.overlays[cat];
 return <svg className={`portrait portrait-photo ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox={`${frame.x} ${frame.y} ${frame.width} ${frame.height}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={ariaLabel||`${c.name}, ${Object.keys(look).length?'with your selected beauty look':'before beauty application'}`} data-client={id} data-expression={asset[expression]?expression:'neutral'}>
 <defs>
 <filter id={`${u}-base-even`} colorInterpolationFilters="sRGB" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation={finish.blur*(.55+cs.softness)}/><feColorMatrix type="saturate" values=".96"/></filter>
 <filter id={`${u}-base-matte`} colorInterpolationFilters="sRGB"><feComponentTransfer><feFuncR type="table" tableValues="0 .25 .5 .7 .87"/><feFuncG type="table" tableValues="0 .25 .5 .7 .87"/><feFuncB type="table" tableValues="0 .25 .5 .7 .87"/></feComponentTransfer></filter>
 <filter id={`${u}-base-radiance`} colorInterpolationFilters="sRGB"><feComponentTransfer><feFuncR type="gamma" amplitude="1" exponent=".84"/><feFuncG type="gamma" amplitude="1" exponent=".84"/><feFuncB type="gamma" amplitude="1" exponent=".84"/></feComponentTransfer></filter>
 <linearGradient id={`${u}-eyelid-color`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={eye?.color} stopOpacity=".12"/><stop offset=".5" stopColor={eye?.color} stopOpacity=".8"/><stop offset="1" stopColor={eye?.color} stopOpacity=".45"/></linearGradient>
 <filter id={`${u}-lid-soft`} x="-20%" y="-70%" width="140%" height="240%"><feGaussianBlur stdDeviation={1+es.softness*2.5}/></filter>
 <filter id={`${u}-lid-feather`} x="-20%" y="-70%" width="140%" height="240%"><feGaussianBlur stdDeviation="1.2"/></filter>
 {(eyeRegions[id]||[]).map(region=><mask key={region.id} id={`${u}-lid-${region.id}`} maskUnits="userSpaceOnUse" x="0" y="0" width={asset.width} height={asset.height}><path d={region.path} fill="white" filter={fill('lid-feather')}/></mask>)}
 <radialGradient id={`${u}-cheek`}><stop stopColor={blush?.color||'#d18e81'} stopOpacity=".7"/><stop offset=".5" stopColor={blush?.color||'#d18e81'} stopOpacity=".28"/><stop offset="1" stopColor={blush?.color||'#d18e81'} stopOpacity="0"/></radialGradient>
 <radialGradient id={`${u}-glow`}><stop stopColor="#fffbea" stopOpacity=".65"/><stop offset="1" stopColor="#fffbea" stopOpacity="0"/></radialGradient>
 <radialGradient id={`${u}-water-light`}><stop stopColor="#fff9ed" stopOpacity=".65"/><stop offset=".38" stopColor="#fff9ed" stopOpacity=".24"/><stop offset="1" stopColor="#fff9ed" stopOpacity="0"/></radialGradient>
 <filter id={`${u}-skin-radiance`} colorInterpolationFilters="sRGB"><feComponentTransfer><feFuncR type="gamma" amplitude="1" exponent=".78" offset="0"/><feFuncG type="gamma" amplitude="1" exponent=".78" offset="0"/><feFuncB type="gamma" amplitude="1" exponent=".78" offset="0"/></feComponentTransfer></filter>
 <linearGradient id={`${u}-lip`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={lip?.color}/><stop offset=".65" stopColor={lip?.color} stopOpacity=".85"/><stop offset="1" stopColor={lip?.color} stopOpacity=".6"/></linearGradient>
 {(['cushion','eyeshadow','toner','serum','cream'] as Category[]).map(cat=><filter key={cat} id={`${u}-${cat}-edge`} x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation={.4+blendFor(appearance,cat).softness*3}/></filter>)}
 <filter id={`${u}-soft`} x="-50%" y="-80%" width="200%" height="260%"><feGaussianBlur stdDeviation="3"/></filter>
 <filter id={`${u}-cheek-soft`} x="-60%" y="-100%" width="220%" height="300%"><feGaussianBlur stdDeviation={(3+bs.softness*7)*characterAssets[id].width/portraitCanvas.width}/></filter>
 <filter id={`${u}-jelly-soft`}><feGaussianBlur stdDeviation="1.2"/></filter>
 <radialGradient id={`${u}-jelly`}><stop stopColor="#fff5ed" stopOpacity=".28"/><stop offset=".45" stopColor="#fff5ed" stopOpacity=".09"/><stop offset="1" stopColor="#fff5ed" stopOpacity="0"/></radialGradient>
 <filter id={`${u}-lip-soft`} x="-15%" y="-30%" width="130%" height="160%"><feGaussianBlur stdDeviation={(.6+ls.softness*(blurred?2.1:1.1))*characterAssets[id].height/portraitCanvas.height}/></filter>
 <clipPath id={`${u}-lip-clip`}><path d={lipPath}/></clipPath>
 <filter id={`${u}-face-feather`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter>
 <filter id={`${u}-feature-feather`} x="-60%" y="-100%" width="220%" height="300%"><feGaussianBlur stdDeviation="4.5"/></filter>
 <mask id={`${u}-skin-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="543" height="724"><rect width="543" height="724" fill="black"/><ellipse cx={fx} cy={fy-4} rx="108" ry="141" fill="white" filter={fill('face-feather')}/>{f.eyes.map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="34" ry="13" fill="black" filter={fill('feature-feather')}/>)}<g filter={fill('feature-feather')}><path d={lipPath} transform={`scale(${portraitCanvas.width/asset.width} ${portraitCanvas.height/asset.height})`} fill="black"/></g></mask>
 </defs>
 <image href={href} width={asset.width} height={asset.height} preserveAspectRatio="xMidYMid meet"/>
 <g transform={`scale(${asset.width/portraitCanvas.width} ${asset.height/portraitCanvas.height})`}>

 {!makeup&&(['toner','serum','cream'] as Category[]).map(cat=>{const p=get(cat);return p&&overlay(cat)?<image key={cat} data-effect={`${cat}-layer`} filter={fill(`${cat}-edge`)} data-variant={p.variantId} href={overlay(cat)} width="543" height="724" mask={fill('skin-mask')} opacity={(.1+(p.metrics.hydration-75)/250)*blendFor(appearance,cat).opacity}/>:null})}
 {base&&<g data-effect="cushion" data-finish={base.finish} data-variant={base.variantId} mask={fill('skin-mask')}>
 <image data-base-effect="complexion" href={complexion} width="543" height="724" preserveAspectRatio="none" filter={fill('base-even')} opacity={finish.coverage*cs.opacity}/>
 {finish.matte>0&&<image data-base-effect="matte" href={complexion} width="543" height="724" preserveAspectRatio="none" filter={fill('base-matte')} opacity={finish.matte*cs.opacity} style={{mixBlendMode:'luminosity'}}/>}
 {finish.radiance>0&&<image data-base-effect="radiance" href={complexion} width="543" height="724" preserveAspectRatio="none" filter={fill('base-radiance')} opacity={finish.radiance*cs.opacity*(.35+.65*cs.shine)} style={{mixBlendMode:'luminosity'}}/>}
 <g data-base-effect="finish-highlights" opacity={finish.shine*cs.opacity*cs.shine} filter={fill('cushion-edge')}>
 {f.cheeks.map(([x,y],i)=><ellipse key={i} cx={x+(i?-8:8)} cy={y-16} rx={base.finish==='Luminous'?32:39} ry={base.finish==='Luminous'?15:23} fill={fill('water-light')} opacity=".9"/>)}
 <ellipse cx={fx-1} cy={fy+8} rx="8" ry="29" fill={fill('water-light')} opacity=".6"/>
 <ellipse cx={fx} cy={fy-99} rx="35" ry="28" fill={fill('water-light')} opacity=".45"/>
 </g>
 </g>}
 {blush&&<g data-effect="blush" data-variant={blush.variantId} data-finish={blush.finish} opacity={bs.opacity*cheekProfile.pigment} mask={fill('skin-mask')} style={{mixBlendMode:'multiply'}}><g transform={`scale(${portraitCanvas.width/asset.width} ${portraitCanvas.height/asset.height})`}>{(blushRegions[id]||[]).map((r,i)=><ellipse key={i} data-cheek-region={i===0?'left':'right'} cx={r.cx} cy={r.cy} rx={r.rx*(.95+bs.softness*.1)} ry={r.ry} transform={`rotate(${r.angle} ${r.cx} ${r.cy})`} fill={fill('cheek')} filter={fill('cheek-soft')}/>)}</g></g>}
 {blush&&cheekProfile.radiance>0&&<g data-effect="blush-radiance" mask={fill('skin-mask')} opacity={bs.opacity*bs.shine*cheekProfile.radiance}>{f.cheeks.map(([x,y],i)=><ellipse key={i} cx={x+(i?-6:6)} cy={y-14} rx="35" ry="18" fill={fill('water-light')} filter={fill('soft')}/>)}</g>}
 {eye&&<g data-effect="eyeshadow" data-variant={eye.variantId} opacity={es.opacity} transform={`scale(${portraitCanvas.width/asset.width} ${portraitCanvas.height/asset.height})`}>
 {(eyeRegions[id]||[]).map(region=><g key={region.id} data-eye-region={region.id} mask={fill(`lid-${region.id}`)}><path d={region.path} fill={fill('eyelid-color')} opacity=".85" filter={fill('lid-soft')} style={{mixBlendMode:'multiply'}}/>{eye.finish.toLowerCase().includes('shimmer')&&region.shimmer.map(([x,y],n)=><ellipse key={n} cx={x} cy={y} rx={n===1?1.6:1} ry={n===1?1.1:.8} fill="#fff0d5" opacity=".65"/>)}</g>)}
 </g>}
 {lip&&<g data-effect="lip" data-variant={lip.variantId} data-finish={lip.finish} transform={`scale(${portraitCanvas.width/asset.width} ${portraitCanvas.height/asset.height})`}>
 <path d={lipPath} fill={fill('lip')} opacity={lipProfile.pigment*ls.opacity} filter={fill('lip-soft')} style={{mixBlendMode:glossy?'normal':'soft-light'}}/>
 <path d={lipPath} fill={lip.color} opacity={lipProfile.depth*ls.opacity} filter={fill('lip-soft')}/>
 {glossy&&<g data-lip-reflection={lip.finish} clipPath={fill('lip-clip')} opacity={Math.min(1,ls.shine*ls.opacity*lipProfile.reflection)}>
 <ellipse cx={lr.center[0]} cy={lr.center[1]+lr.height*.26} rx={lr.width*.37} ry={lr.height*.24} fill={fill('jelly')} filter={fill('jelly-soft')}/>
 <ellipse cx={lr.center[0]-lr.width*.16} cy={lr.center[1]+lr.height*.28} rx={lr.width*.055} ry={lr.height*.035} fill="#fff3e9" opacity=".45" filter={fill('jelly-soft')}/>
 <ellipse cx={lr.center[0]+lr.width*.07} cy={lr.center[1]+lr.height*.31} rx={lr.width*.09} ry={lr.height*.03} fill="#fff6ef" opacity=".38" filter={fill('jelly-soft')}/>
 <ellipse cx={lr.center[0]+lr.width*.16} cy={lr.center[1]-lr.height*.24} rx={lr.width*.06} ry={lr.height*.035} fill="#fff3e9" opacity=".25" filter={fill('jelly-soft')}/>
 </g>}
 </g>}
 {skincare>0&&<g data-effect="skincare" data-layers={skincare} mask={fill('skin-mask')}>
 <image data-skin-effect="radiance" href={href} width="543" height="724" preserveAspectRatio="none" filter={fill('skin-radiance')} opacity={radiance} style={{mixBlendMode:'luminosity'}}/>
 {skinStages.map(cat=>{const b=blendFor(appearance,cat),strength=skinStrength(cat)*b.shine;return <g key={cat} data-skin-effect={cat} data-variant={get(cat)!.variantId} opacity={strength} filter={fill(`${cat}-edge`)}>
 {cat==='toner'&&f.cheeks.map(([x,y],i)=><ellipse key={i} cx={x+(i?-7:7)} cy={y-12} rx="40" ry="27" fill={fill('water-light')} opacity=".6"/>)}
 {cat==='serum'&&<>{f.cheeks.map(([x,y],i)=><ellipse key={i} cx={x+(i?-10:10)} cy={y-17} rx="29" ry="14" fill={fill('water-light')} opacity=".95"/>)}<ellipse cx={fx-2} cy={fy+5} rx="9" ry="30" fill={fill('water-light')} opacity=".65"/><ellipse cx={fx} cy={fy-99} rx="39" ry="27" fill={fill('water-light')} opacity=".55"/></>}
 {cat==='cream'&&<>{f.cheeks.map(([x,y],i)=><ellipse key={i} cx={x+(i?-5:5)} cy={y-7} rx="46" ry="30" fill={fill('water-light')} opacity=".75"/>)}<ellipse cx={fx} cy={ly+34} rx="26" ry="13" fill={fill('water-light')} opacity=".3"/></>}
 </g>})}
 </g>}

 </g>
 </svg>
}
