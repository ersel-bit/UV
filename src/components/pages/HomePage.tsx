'use client'
import { useState, useEffect } from 'react'
import type { SiteSettings, Industry, WhyCard } from '@/types'
import { SectionTag } from '@/components/ui'

interface Props { settings: SiteSettings; onNav: (p:string)=>void }

const FB_WHY: WhyCard[] = [
  {id:'1',number:'01',heading:'Manufactured in İzmir',body:'2,500 m² facility — full fabrication, electrical assembly, and UV performance testing. Every system tested before dispatch.',sort_order:1,is_active:true},
  {id:'2',number:'02',heading:'Real Technical Support',body:'Same timezone. Same language. On-site within hours. Full warranty and lifetime after-sales as standard.',sort_order:2,is_active:true},
  {id:'3',number:'03',heading:'Ready for Turkish Tenders',body:'CE, ISO 9001, 14001, 45001 certified domestic manufacturer. Qualifies for public procurement.',sort_order:3,is_active:true},
  {id:'4',number:'04',heading:'European Component Standards',body:'European UVC lamps, precision quartz, certified ballasts — same specs as manufacturers in Germany or Denmark.',sort_order:4,is_active:true},
]
const FB_IND: Industry[] = [
  {id:'1',icon:'🐟',name:'Aquaculture',description:'RAS, fish, mussel, shrimp',sort_order:1,is_active:true},
  {id:'2',icon:'💧',name:'Drinking Water',description:'Municipal, wells, bottling',sort_order:2,is_active:true},
  {id:'3',icon:'🏊',name:'Pool & Spa',description:'Hotels, thermal, hot tubs',sort_order:3,is_active:true},
  {id:'4',icon:'🏥',name:'Healthcare',description:'Air, surface, rooms',sort_order:4,is_active:true},
  {id:'5',icon:'🥛',name:'Dairy & Food',description:'Milk, cheese, meat',sort_order:5,is_active:true},
  {id:'6',icon:'🍺',name:'Beverage',description:'Beer, juice, process water',sort_order:6,is_active:true},
  {id:'7',icon:'💊',name:'Pharmaceutical',description:'Ultra-pure water, HVAC',sort_order:7,is_active:true},
  {id:'8',icon:'🌱',name:'Agriculture',description:'Irrigation, greenhouses',sort_order:8,is_active:true},
  {id:'9',icon:'🐄',name:'Livestock',description:'Water and air treatment',sort_order:9,is_active:true},
  {id:'10',icon:'🏭',name:'Industrial',description:'Cooling towers, process',sort_order:10,is_active:true},
  {id:'11',icon:'🏨',name:'Hospitality',description:'Pools, legionella, HVAC',sort_order:11,is_active:true},
  {id:'12',icon:'♻️',name:'Wastewater',description:'Tertiary, reuse, effluent',sort_order:12,is_active:true},
]

export default function HomePage({ settings:s, onNav }: Props) {
  const [why, setWhy] = useState<WhyCard[]>(FB_WHY)
  const [inds, setInds] = useState<Industry[]>(FB_IND)

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!url || url==='your-project-url') return
    import('@/lib/data').then(({getWhyCards,getIndustries}) => {
      getWhyCards().then(setWhy).catch(console.error)
      getIndustries().then(setInds).catch(console.error)
    })
  }, [])

  const stats = [[s.years_experience,'Years Experience'],[s.systems_installed,'Systems Installed'],[s.projects,'Projects'],[s.industries,'Industries'],[s.countries,'Countries']]

  return (
    <div>
      {/* Hero */}
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',position:'relative',overflow:'hidden',paddingTop:58}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 60% at 70% 40%,rgba(16,80,160,.2),transparent 70%),radial-gradient(ellipse 40% 50% at 20% 70%,rgba(0,204,238,.06),transparent 60%),linear-gradient(160deg,#050f1a 0%,#091828 100%)'}}/>
        <div style={{position:'absolute',inset:0,opacity:.035,backgroundImage:'linear-gradient(rgba(0,204,238,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,204,238,1) 1px,transparent 1px)',backgroundSize:'48px 48px'}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:1200,margin:'0 auto',padding:'0 32px',width:'100%'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(0,204,238,.08)',border:'1px solid rgba(0,204,238,.25)',borderRadius:100,padding:'5px 14px',fontSize:11,letterSpacing:2,textTransform:'uppercase',color:'#00ccee',fontWeight:600,marginBottom:28}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'#00ccee',display:'inline-block'}} className="animate-blink"/>
            🇹🇷 Manufactured in {s.city}, {s.country}
          </div>
          <h1 style={{fontFamily:'Rajdhani,sans-serif',fontSize:76,fontWeight:700,lineHeight:.9,letterSpacing:-1,marginBottom:24}}>
            <span style={{display:'block',color:'#eaf4ff'}}>{s.hero_headline_1}</span>
            <span style={{display:'block',color:'#00ccee'}}>{s.hero_headline_2}</span>
            <span style={{display:'block',color:'rgba(234,244,255,.35)',fontWeight:400,fontSize:40}}>{s.hero_headline_3}</span>
          </h1>
          <p style={{fontSize:17,color:'#6a8aaa',maxWidth:520,lineHeight:1.7,marginBottom:36,fontWeight:300}}>{s.hero_subtext}</p>
          <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
            <button onClick={()=>onNav('products')} style={{background:'#00ccee',color:'#050f1a',fontFamily:'Rajdhani,sans-serif',fontWeight:700,fontSize:14,letterSpacing:1.5,textTransform:'uppercase',padding:'13px 30px',borderRadius:2,border:'none',cursor:'pointer'}}>View All Systems</button>
            <button onClick={()=>onNav('contact')} style={{background:'transparent',border:'1px solid rgba(234,244,255,.18)',color:'#eaf4ff',fontFamily:'Rajdhani,sans-serif',fontWeight:600,fontSize:14,letterSpacing:1.5,textTransform:'uppercase',padding:'13px 30px',borderRadius:2,cursor:'pointer'}}>Request a Quote</button>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div style={{display:'flex',justifyContent:'center',background:'#091828',borderTop:'1px solid rgba(0,204,238,.1)',borderBottom:'1px solid rgba(0,204,238,.1)',padding:20,flexWrap:'wrap'}}>
        {stats.map(([n,l])=>(
          <div key={l} style={{textAlign:'center',padding:'0 36px',borderRight:'1px solid rgba(0,204,238,.12)'}}>
            <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:38,fontWeight:700,color:'#00ccee',lineHeight:1}}>{n}</div>
            <div style={{fontSize:10,letterSpacing:1.5,textTransform:'uppercase',color:'#6a8aaa',marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Why */}
      <div style={{background:'#091828'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'80px 32px'}}>
          <SectionTag>Why UVTechnic</SectionTag>
          <h2 style={{fontFamily:'Rajdhani,sans-serif',fontSize:40,fontWeight:700,marginBottom:0}}>{s.tagline}</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginTop:44}}>
            {why.map(w=>(
              <div key={w.id} style={{background:'#091828',padding:26,borderRadius:2,borderLeft:'2px solid #00ccee'}}>
                <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:44,fontWeight:700,color:'rgba(0,204,238,.12)',lineHeight:1,marginBottom:2}}>{w.number}</div>
                <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:21,fontWeight:600,marginBottom:7}}>{w.heading}</div>
                <div style={{fontSize:13.5,color:'#6a8aaa',lineHeight:1.7}}>{w.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industries */}
      <div style={{background:'#050f1a'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'80px 32px'}}>
          <SectionTag>Industries We Serve</SectionTag>
          <h2 style={{fontFamily:'Rajdhani,sans-serif',fontSize:40,fontWeight:700,marginBottom:0}}>Where UVTechnic Systems Operate</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginTop:32}}>
            {inds.map(ind=>(
              <div key={ind.id} style={{background:'#091828',border:'1px solid rgba(0,204,238,.07)',padding:'18px 14px',borderRadius:2}}>
                <div style={{fontSize:22,marginBottom:7}}>{ind.icon}</div>
                <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:15,fontWeight:600,marginBottom:3}}>{ind.name}</div>
                <div style={{fontSize:11.5,color:'#6a8aaa',lineHeight:1.5}}>{ind.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{background:'linear-gradient(135deg,#091828,#0d2236)',borderTop:'1px solid rgba(0,204,238,.12)',padding:'72px 32px',textAlign:'center'}}>
        <SectionTag>Engineering Review</SectionTag>
        <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:50,fontWeight:700,marginBottom:12}}>Tell Us About Your Application</div>
        <div style={{fontSize:16,color:'#6a8aaa',maxWidth:540,margin:'0 auto 40px',fontWeight:300}}>Answer a few questions — our engineers will size the right system for your process.</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,maxWidth:700,margin:'0 auto 26px'}}>
          {[{l:'Application',o:['Water Treatment','Air Disinfection','Surface / Conveyor','Not sure']},
            {l:'Flow / Capacity',o:['Under 10 m³/h','10–100 m³/h','100–400 m³/h','Air or surface']},
            {l:'Material',o:['HDPE / Plastic','Stainless 304','Stainless 316','Let manufacturer decide']}].map(step=>(
            <div key={step.l} style={{background:'rgba(5,15,26,.6)',border:'1px solid rgba(0,204,238,.12)',borderRadius:2,padding:14}}>
              <div style={{fontSize:10,letterSpacing:2,textTransform:'uppercase',color:'#00ccee',fontWeight:600,marginBottom:8}}>{step.l}</div>
              {step.o.map(o=><label key={o} style={{display:'flex',alignItems:'center',gap:7,fontSize:12,color:'#6a8aaa',cursor:'pointer',padding:'2px 0'}}><input type="radio" name={step.l} style={{accentColor:'#00ccee'}}/>{o}</label>)}
            </div>
          ))}
        </div>
        <button onClick={()=>onNav('contact')} style={{background:'#00ccee',color:'#050f1a',fontFamily:'Rajdhani,sans-serif',fontWeight:700,fontSize:14,letterSpacing:1.5,textTransform:'uppercase',padding:'13px 30px',borderRadius:2,border:'none',cursor:'pointer'}}>
          REQUEST ENGINEERING REVIEW →
        </button>
      </div>
    </div>
  )
}
