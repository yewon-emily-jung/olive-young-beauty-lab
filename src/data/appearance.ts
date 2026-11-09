import type {Category} from './clients';
export type BlendSettings={opacity:number;softness:number;shine:number};
export type Appearance=Partial<Record<Category,BlendSettings>>;
export const defaultBlend:BlendSettings={opacity:.7,softness:.75,shine:.6};
export function blendFor(appearance:Appearance,category:Category):BlendSettings{const value={...defaultBlend,...(category==='cushion'?{opacity:.85,softness:.7,shine:.65}:category==='blush'?{opacity:.8,softness:.9}:category==='lip'?{opacity:.65,softness:.7}:['toner','serum','cream'].includes(category)?{opacity:.8,softness:.85,shine:.75}:{}),...appearance[category]};return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,Number.isFinite(v)?Math.max(0,Math.min(1,v)):defaultBlend[k as keyof BlendSettings]])) as BlendSettings}
