'use client'
import { useState, useRef, useEffect } from 'react'
import type { SiteSettings, ProductCategory } from '@/types'

function Logo({ size=28 }: { size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" stroke="#00ccee" strokeWidth="1" opacity=".25"/>
      <path d="M7 18 Q10 10 13 18 Q16 26 19 10 Q22 4 29 18" stroke="#00ccee" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="18" cy="18" r="2.5" fill="#00ccee"/>
    </svg>
  )
}

interface Props { settings:SiteSettings; cats:ProductCategory[]; page:string; onNav:(p:string)=>void }

export default function Header({ settings, cats, page, onNav }: Props) {
  const [dd, setDd] = useState(false)
  const [lang, setLang] = useState('EN')
  const ddRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e:MouseEvent) => { if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDd(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const nav = (p:string) => { onNav(p); setDd(false); window.scrollTo(0,0) }
  const wCats = cats.filter(c=>c.section==='W')
  const aCats = cats.filter(c=>c.section==='A')
  const sCats = cats.filter(c=>c.section==='S')

  const nb = (p:string, label:string) => (
    <button key={p} onClick={()=>nav(p)} style={{background:page===p?'rgba(0,204,238,.07)':'none',color:page===p?'#00ccee':'#6a8aaa',fontSize:12.5,fontWeight:500,letterSpacing:.4,padding:'6px 11px',borderRadius:3,border:'none',cursor:'pointer',whiteSpace:'nowrap',fontFamily:'inherit'}}>{label}</button>
  )

  return (
    <header style={{position:'fixed',top:0,left:0,right:0,zIndex:500,height:58,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 28px',background:'rgba(5,15,26,.96)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(0,204,238,.12)'}}>
      <div onClick={()=>nav('home')} style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer',userSelect:'none'}}>
        <Logo/>
        <span style={{fontFamily:'Rajdhani,sans-serif',fontSize:24,fontWeight:700,letterSpacing:3}}>UV<b style={{color:'#00ccee'}}>TECHNIC</b></span>
      </div>
      <nav style={{display:'flex',alignItems:'center',gap:1}}>
        {[['home','Home'],['applications','Applications'],['technology','Technology'],['consulting','Consulting'],['references','References'],['about','About'],['career','Careers'],['events','Events']].map(([p,l])=>nb(p,l))}
        <div style={{position:'relative'}} ref={ddRef}>
          <button onClick={()=>{nav('products');setDd(v=>!v)}} style={{background:page==='products'?'rgba(0,204,238,.07)':'none',color:page==='products'?'#00ccee':'#6a8aaa',fontSize:12.5,fontWeight:500,padding:'6px 11px',borderRadius:3,border:'none',cursor:'pointer',fontFamily:'inherit'}}>Products ▾</button>
          {dd && (
            <div style={{position:'absolute',top:'calc(100% + 4px)',left:0,background:'#091828',border:'1px solid rgba(0,204,238,.15)',borderRadius:4,minWidth:230,padding:'8px 0',boxShadow:'0 24px 60px rgba(0,0,0,.7)',zIndex:600}}>
              {[['💧 Water',wCats],['💨 Air',aCats],['🧱 Surface',sCats]].map(([lbl,group])=>(
                <div key={lbl as string}>
                  <div style={{padding:'5px 16px',fontSize:10,letterSpacing:2,textTransform:'uppercase',color:'rgba(106,138,170,.45)',fontWeight:600,marginTop:4}}>{lbl as string}</div>
                  {(group as ProductCategory[]).map(c=>(
                    <div key={c.id} onClick={()=>nav('products')} style={{padding:'8px 16px',fontSize:12.5,color:'#6a8aaa',cursor:'pointer',display:'flex',alignItems:'center',gap:8}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.color='#eaf4ff'}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.color='#6a8aaa'}}>
                      <span style={{width:4,height:4,borderRadius:'50%',background:'#00ccee',flexShrink:0,display:'inline-block'}}/>
                      {c.label}
                    </div>
                  ))}
                  <div style={{height:1,background:'rgba(0,204,238,.08)',margin:'5px 0'}}/>
                </div>
              ))}
              <div onClick={()=>nav('products')} style={{padding:'8px 16px',fontSize:12.5,color:'#6a8aaa',cursor:'pointer',display:'flex',alignItems:'center',gap:8}}>
                <span style={{width:4,height:4,borderRadius:'50%',background:'#00ccee',flexShrink:0,display:'inline-block'}}/>Spare Parts
              </div>
            </div>
          )}
        </div>
        {nb('contact','Contact')}
        <div style={{width:1,height:18,background:'rgba(0,204,238,.15)',margin:'0 6px'}}/>
        {['EN','TR','AR'].map(l=>(
          <button key={l} onClick={()=>setLang(l)} style={{background:'none',border:'1px solid',borderColor:lang===l?'#00ccee':'rgba(0,204,238,.2)',color:lang===l?'#00ccee':'#6a8aaa',fontSize:11,letterSpacing:1,padding:'4px 8px',borderRadius:2,cursor:'pointer',fontFamily:'inherit'}}>{l}</button>
        ))}
        <button onClick={()=>nav('partners')} style={{color:'#00ccee',border:'1px solid rgba(0,204,238,.25)',borderRadius:2,padding:'5px 10px',fontSize:11,letterSpacing:1,fontFamily:'Rajdhani,sans-serif',fontWeight:700,background:'none',cursor:'pointer',marginLeft:4}}>PARTNERS</button>
        <button onClick={()=>nav('contact')} style={{background:'#00ccee',color:'#050f1a',fontFamily:'Rajdhani,sans-serif',fontWeight:700,fontSize:13,letterSpacing:1.5,padding:'8px 18px',borderRadius:2,marginLeft:10,border:'none',cursor:'pointer'}}>REQUEST QUOTE</button>
      </nav>
    </header>
  )
}
