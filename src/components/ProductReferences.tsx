import {useState} from 'react';
import type {Product} from '../data/products';

/** Keep official examples separate from the illustrative avatar. Never imply a shade match. */
export function ProductReferences({product}:{product:Product}) {
 const [index,setIndex]=useState(0),[failed,setFailed]=useState(false);
 const references=product.skinReferences||[];
 if(!references.length)return null;
 const reference=references[Math.min(index,references.length-1)];
 return <section className="skin-reference" aria-label="Official on-skin references">
  <div className="reference-heading"><span className="eyebrow">THE REAL-LIFE REFERENCE</span><h3>See the shade. Feel the finish.</h3></div>
  {references.length>1&&<div className="reference-options" aria-label="Choose a reference">{references.map((r,i)=><button key={r.image} aria-pressed={index===i} onClick={()=>{setIndex(i);setFailed(false)}}>{r.label}</button>)}</div>}
  {reference.kind==='finish-guide'&&<p className="reference-scroll-cue">Scroll inside the image to explore the complete brand guide ↕</p>}
  <figure>
   <div className="reference-image-scroll" tabIndex={0} aria-label={`${reference.label}. Scroll to explore the full official image.`} key={reference.image}>
    {failed?<p>The reference image couldn’t load. Open the official source below.</p>:<img src={reference.image} alt={reference.caption} loading="lazy" onLoad={e=>{const parent=e.currentTarget.parentElement;if(parent)parent.scrollTop=e.currentTarget.clientHeight*(reference.scrollStart||0)}} onError={()=>setFailed(true)}/>}
   </div>
   <figcaption><strong>{reference.label}</strong><p>{reference.caption}</p><small>{reference.credit}</small></figcaption>
  </figure>
  <div className="reference-links"><a href={reference.image} target="_blank" rel="noopener noreferrer">Open full-size image ↗</a><a href={reference.pageUrl} target="_blank" rel="noopener noreferrer">Official source ↗</a></div>
  <p className="reference-context">Real photos show a reference, not a prediction. Skin tone, natural lip color, lighting and application can change the result.</p>
 </section>;
}
