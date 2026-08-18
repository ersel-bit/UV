'use client'
import { useState } from 'react'
import { PageHero } from '@/components/ui'
import type { SiteSettings } from '@/types'

const TABS = [['sales','💼 Sales / Quote'],['support','🛠 Technical Support'],['procurement','📦 Procurement / Spare Parts']]

export default function ContactPage({ settings:s }: { settings:SiteSettings }) {
  const [topic, setTopic] = useState('sales')
  const fi: React.CSSProperties = {background:'rgba(5,15,26,.8)',border:'1px solid rgba(0,204,238,.18)',color:'#eaf4ff',fontSize:13.5,padding:'10px 12px',borderRadius:2,width:'100%',outline:'none',fontFamily:'inherit'}
  const fl: React.CSSProperties = {fontSize:10,letterSpacing:1.5,textTransform:'uppercase',color:'#6a8aaa',fontWeight:600,display:'block',marginBottom:4}
  return (
    <div style={{marginTop:58}}>
      <PageHero tag="Contact" title="Request Engineering Review" subtitle="Describe your application — we will size the right system and send a proposal."/>
      <div style={{maxWidth:760,margin:'0 auto',padding:'56px 32px'}}>
        <div style={{display:'flex',gap:8,marginBottom:28,flexWrap:'wrap'}}>
          {TABS.map(([v,l])=><button key={v} onClick={()=>setTopic(v)} style={{background:topic===v?'rgba(0,204,238,.1)':'rgba(9,24,40,.8)',border:`1px solid ${topic===v?'rgba(0,204,238,.4)':'rgba(0,204,238,.1)'}`,color:topic===v?'#00ccee':'#6a8aaa',padding:'6px 14px',borderRadius:100,fontSize:12,cursor:'pointer',fontFamily:'inherit'}}>{l}</button>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:13}}>
          {[['First Name',''],['Last Name',''],['Company',''],['Email','email@company.com'],['Phone','+90'],['Country','']].map(([l,p])=>(
            <div key={l}><label style={fl}>{l}</label><input placeholder={p||l} style={fi}/></div>
          ))}
          <div style={{gridColumn:'1/-1'}}><label style={fl}>Industry</label><select style={{...fi}}><option value="">Select...</option>{['Aquaculture','Drinking Water','Food & Beverage','Dairy','Pharmaceutical','Healthcare','Pool & Spa','Agriculture','Livestock','Industrial','Hospitality','Wastewater','Other'].map(i=><option key={i}>{i}</option>)}</select></div>
          <div style={{gridColumn:'1/-1'}}><label style={fl}>Details</label><textarea rows={5} placeholder="Flow rate, pressure, belt speed, room size — any detail helps..." style={{...fi,resize:'vertical'}}/></div>
        </div>
        <div style={{display:'flex',gap:16,marginTop:8,alignItems:'center',flexWrap:'wrap'}}>
          <button style={{background:'#00ccee',color:'#050f1a',fontFamily:'Rajdhani,sans-serif',fontWeight:700,fontSize:14,letterSpacing:1.5,textTransform:'uppercase',padding:'13px 30px',borderRadius:2,border:'none',cursor:'pointer'}}>Send Request →</button>
          <div style={{fontSize:12,color:'#6a8aaa'}}>📍 {s.address} &nbsp;|&nbsp; 📞 {s.phone} &nbsp;|&nbsp; ✉️ {s.email}</div>
        </div>
      </div>
    </div>
  )
}
