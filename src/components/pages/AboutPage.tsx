'use client'
import { useState, useEffect } from 'react'
import { PageHero, SectionTag } from '@/components/ui'
import type { SiteSettings, Certification } from '@/types'

const FB_CERTS: Certification[] = [
  {id:'1',name:'CE Certified',sort_order:1,is_active:true},
  {id:'2',name:'ISO 9001:2015',sort_order:2,is_active:true},
  {id:'3',name:'ISO 14001:2015',sort_order:3,is_active:true},
  {id:'4',name:'ISO 45001:2018',sort_order:4,is_active:true},
  {id:'5',name:'Domestic Manufacturer',sort_order:5,is_active:true},
]

export default function AboutPage({ settings:s }: { settings:SiteSettings }) {
  const [certs, setCerts] = useState<Certification[]>(FB_CERTS)
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!url || url==='your-project-url') return
    import('@/lib/data').then(({getCertifications})=>getCertifications().then(setCerts).catch(console.error))
  }, [])

  return (
    <div style={{marginTop:58}}>
      <PageHero tag="About" title="Turkey's UVC Manufacturer"/>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'80px 32px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:52,alignItems:'start'}}>
          <div>
            <h2 style={{fontFamily:'Rajdhani,sans-serif',fontSize:36,fontWeight:700,marginBottom:18}}>Who We Are</h2>
            {[`${s.company_name} is an ${s.city}-based manufacturer of UVC disinfection systems with over eight years of engineering and production experience.`,
              `Our ${s.facility_size} facility covers SS and HDPE vessel fabrication, electrical panel assembly, PLC programming, and UV performance testing. Every system is tested before shipment.`,
              'We serve aquaculture, food & beverage, healthcare, municipal water, industrial processes, and hospitality — throughout Turkey and across the region.'].map((t,i)=>(
              <p key={i} style={{color:'#6a8aaa',fontSize:14.5,lineHeight:1.8,marginBottom:14}}>{t}</p>
            ))}
            <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:13,fontWeight:600,color:'#00ccee',letterSpacing:1,marginBottom:8}}>CERTIFICATIONS</div>
            <div>{certs.map(c=><span key={c.id} style={{background:'rgba(0,204,238,.07)',border:'1px solid rgba(0,204,238,.18)',color:'#00ccee',fontSize:11.5,padding:'4px 11px',borderRadius:100,display:'inline-block',margin:3}}>{c.name}</span>)}</div>
          </div>
          <div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:24}}>
              {[['8+','Years experience'],['300+','Systems installed'],['40+','Projects'],['12+','Industries'],['2,500 m²','Production facility'],['5','Export countries']].map(([n,l])=>(
                <div key={l} style={{background:'#091828',padding:18,borderRadius:2,borderTop:'2px solid #00ccee'}}>
                  <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:44,fontWeight:700,color:'#00ccee',lineHeight:1}}>{n}</div>
                  <div style={{fontSize:10.5,color:'#6a8aaa',letterSpacing:1,textTransform:'uppercase',marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:14,background:'#091828',padding:20,borderRadius:2}}>
              <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:13,fontWeight:700,color:'#00ccee',marginBottom:10,letterSpacing:1}}>CAPABILITIES</div>
              {['SS304/316 & HDPE vessel fabrication','Electrical panel design & assembly','UV performance laboratory','PLC/HMI programming & commissioning','OEM system engineering','On-site installation & training'].map(c=>(
                <div key={c} style={{fontSize:12.5,color:'#6a8aaa',padding:'5px 0',borderBottom:'1px solid rgba(0,204,238,.06)',display:'flex',gap:8}}><span style={{color:'#00ccee'}}>→</span>{c}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{marginTop:56}}>
          <SectionTag>Production & Manufacturing</SectionTag>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
            {[['SM Series — Wiper Machining','N44mSWUCo9M','56.25%'],['SM Series — Wiper in Operation','akFBo-HTqA0','56.25%'],['SS316 Vessel Welding','EdZHfB5KEBU','177.78%']].map(([title,vid,ratio])=>(
              <div key={vid}>
                <div style={{fontSize:12,color:'#00ccee',letterSpacing:1,textTransform:'uppercase',fontWeight:600,marginBottom:8}}>{title}</div>
                <div style={{position:'relative',paddingBottom:ratio,height:0,overflow:'hidden',borderRadius:2,border:'1px solid rgba(0,204,238,.12)'}}>
                  <iframe src={`https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1`} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none'}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
