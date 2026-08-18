import React from 'react'

export function SectionTag({ children }: { children: React.ReactNode }) {
  return <div style={{fontSize:10,letterSpacing:3,textTransform:'uppercase' as const,color:'#00ccee',fontWeight:600,marginBottom:10}}>{children}</div>
}

export function PageHero({ tag, title, subtitle }: { tag:string; title:string; subtitle?:string }) {
  return (
    <div style={{background:'linear-gradient(160deg,#091828,#050f1a)',borderBottom:'1px solid rgba(0,204,238,.1)',padding:'50px 32px 34px',marginTop:58}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <SectionTag>{tag}</SectionTag>
        <h1 style={{fontFamily:'Rajdhani,sans-serif',fontSize:50,fontWeight:700}}>{title}</h1>
        {subtitle && <p style={{color:'#6a8aaa',fontSize:16,marginTop:10,fontWeight:300}}>{subtitle}</p>}
      </div>
    </div>
  )
}

export function DataTable({ headers, rows }: { headers:string[]; rows:(string|React.ReactNode)[][] }) {
  return (
    <div style={{overflowX:'auto'}}>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:12.5,marginTop:14}}>
        <thead>
          <tr>{headers.map(h=><th key={h} style={{background:'rgba(0,204,238,.07)',padding:'9px 13px',textAlign:'left',fontSize:10,letterSpacing:1.5,textTransform:'uppercase',color:'#00ccee',fontWeight:600,whiteSpace:'nowrap'}}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row,i)=>(
            <tr key={i}>{row.map((cell,j)=>(
              <td key={j} style={{padding:'9px 13px',borderBottom:'1px solid rgba(0,204,238,.05)',color:j===0?'#eaf4ff':'#6a8aaa',fontFamily:j===0?'Rajdhani,sans-serif':'inherit',fontSize:j===0?15:undefined,fontWeight:j===0?600:undefined}}>{cell}</td>
            ))}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function OptionBox({ title, items }: { title:string; items:string[] }) {
  return (
    <div style={{background:'rgba(0,204,238,.03)',border:'1px solid rgba(0,204,238,.14)',borderRadius:2,padding:'18px 22px',marginTop:20}}>
      <div style={{fontSize:10,letterSpacing:2,textTransform:'uppercase',color:'#00ccee',fontWeight:600,marginBottom:10}}>{title}</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
        {items.map(item=>(
          <div key={item} style={{fontSize:12.5,color:'#6a8aaa',display:'flex',gap:7,alignItems:'flex-start',lineHeight:1.5}}>
            <span style={{color:'#00ccee',flexShrink:0,fontSize:10,marginTop:2}}>o</span>{item}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProductImageGrid({ images, height=180 }: { images:Array<{image_url:string;alt_text:string;caption?:string}>; height?:number }) {
  if (!images.length) return null
  if (images.length===1) return <img src={images[0].image_url} alt={images[0].alt_text} style={{width:'100%',maxWidth:560,borderRadius:2,border:'1px solid rgba(0,204,238,.12)',objectFit:'cover',height,display:'block',marginBottom:16}}/>
  const cols = images.length<=2 ? images.length : images.length<=4 ? 2 : 3
  return (
    <div style={{display:'grid',gridTemplateColumns:`repeat(${cols},1fr)`,gap:10,marginBottom:16}}>
      {images.map((img,i)=>(
        <div key={i} style={{borderRadius:2,overflow:'hidden',border:'1px solid rgba(0,204,238,.12)'}}>
          <img src={img.image_url} alt={img.alt_text} style={{width:'100%',display:'block',objectFit:'cover',height}}/>
          {img.caption && <div style={{padding:'6px 8px',fontSize:11,color:'#6a8aaa',background:'#091828'}}>{img.caption}</div>}
        </div>
      ))}
    </div>
  )
}

export function TierTable({ units }: { units:Array<{model_name:string;description:string;rows:Array<{air_flow:string;velocity:string;lamps_standard:string;lamps_professional:string;lamps_premium:string}>}> }) {
  return <>{units.map(du=>(
    <div key={du.model_name} style={{marginBottom:24}}>
      <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:15,fontWeight:700,marginBottom:8}}>
        {du.model_name} <span style={{color:'#6a8aaa',fontWeight:400,fontSize:12}}>— {du.description}</span>
      </div>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:12.5}}>
          <thead><tr>
            {[{l:'Air Flow',bg:'rgba(0,204,238,.05)',c:'#6a8aaa'},{l:'Velocity',bg:'rgba(0,204,238,.05)',c:'#6a8aaa'},
              {l:'Standard ≥100 J/m²',bg:'rgba(96,160,224,.1)',c:'#60a0e0'},
              {l:'Professional ≥250 J/m²',bg:'rgba(160,96,255,.1)',c:'#a060ff'},
              {l:'Premium ≥400 J/m²',bg:'rgba(0,204,238,.1)',c:'#00ccee'}].map(h=>(
              <th key={h.l} style={{padding:'9px 12px',background:h.bg,color:h.c,fontSize:10,letterSpacing:1.5,textTransform:'uppercase',fontWeight:600,whiteSpace:'nowrap',textAlign:'left'}}>{h.l}</th>
            ))}
          </tr></thead>
          <tbody>{du.rows.map((r,i)=>(
            <tr key={i}>
              <td style={{padding:'8px 12px',borderBottom:'1px solid rgba(0,204,238,.05)',color:'#eaf4ff',fontWeight:500}}>{r.air_flow}</td>
              <td style={{padding:'8px 12px',borderBottom:'1px solid rgba(0,204,238,.05)',color:'#6a8aaa',fontSize:11.5}}>{r.velocity}</td>
              <td style={{padding:'8px 12px',borderBottom:'1px solid rgba(0,204,238,.05)',color:'#60a0e0',textAlign:'center'}}>{r.lamps_standard}</td>
              <td style={{padding:'8px 12px',borderBottom:'1px solid rgba(0,204,238,.05)',color:'#a060ff',textAlign:'center'}}>{r.lamps_professional}</td>
              <td style={{padding:'8px 12px',borderBottom:'1px solid rgba(0,204,238,.05)',color:'#00ccee',textAlign:'center'}}>{r.lamps_premium}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  ))}</>
}
