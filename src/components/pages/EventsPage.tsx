'use client'
import { useState, useEffect } from 'react'
import { PageHero } from '@/components/ui'
import type { TradeEvent } from '@/types'

const BASE_URL = 'https://raw.githubusercontent.com/ersel-bit/UV/main/'
const FALLBACK: TradeEvent[] = [{
  id:'1',title:'GROWTECH Eurasia 2024',location:'Antalya, Turkey',event_date:'November 2024',
  description:'[Caption placeholder — describe your stand, products shown, key visitors]',
  sort_order:1,is_active:true,
  images:[
    {id:'1',event_id:'1',image_url:BASE_URL+'No.6.%20Fair%20Sample%20Picture%201%20.webp',caption:'[Caption placeholder]',sort_order:1},
    {id:'2',event_id:'1',image_url:BASE_URL+'No.7.Fair%20Sample%20Picture%202.webp',caption:'[Caption placeholder]',sort_order:2},
    {id:'3',event_id:'1',image_url:BASE_URL+'No.8.%20Fair%20Sample%20Picture%203%20.webp',caption:'[Caption placeholder]',sort_order:3},
  ]
}]

export default function EventsPage() {
  const [events,setEvents]=useState<TradeEvent[]>(FALLBACK)
  useEffect(()=>{
    const url=process.env.NEXT_PUBLIC_SUPABASE_URL
    if(!url||url==='your-project-url') return
    import('@/lib/data').then(({getTradeEvents})=>getTradeEvents().then(setEvents).catch(console.error))
  },[])
  return (
    <div style={{marginTop:58}}>
      <PageHero tag="Events" title="UVTechnic at Trade Fairs" subtitle="Meeting customers, partners and industry professionals across Turkey and the region."/>
      <div style={{maxWidth:1000,margin:'0 auto',padding:'80px 32px'}}>
        {events.map(ev=>(
          <div key={ev.id} style={{marginBottom:56}}>
            <div style={{display:'flex',gap:16,alignItems:'baseline',marginBottom:6,flexWrap:'wrap'}}>
              <h2 style={{fontFamily:'Rajdhani,sans-serif',fontSize:28,fontWeight:700}}>{ev.title}</h2>
              <span style={{fontSize:12,color:'#00ccee',letterSpacing:1}}>📍 {ev.location}</span>
              <span style={{fontSize:12,color:'#6a8aaa'}}>{ev.event_date}</span>
            </div>
            <p style={{fontSize:13.5,color:'#6a8aaa',lineHeight:1.8,marginBottom:20,maxWidth:680}}>{ev.description}</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
              {ev.images.map((img,i)=>(
                <div key={img.id} style={{borderRadius:2,overflow:'hidden',border:'1px solid rgba(0,204,238,.12)'}}>
                  <img src={img.image_url} alt={`${ev.title} ${i+1}`} style={{width:'100%',display:'block',objectFit:'cover',height:220}}/>
                  {img.caption&&img.caption!=='[Caption placeholder]'&&<div style={{padding:'8px 10px',fontSize:12,color:'#6a8aaa',background:'#091828'}}>{img.caption}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{background:'rgba(0,204,238,.04)',border:'1px dashed rgba(0,204,238,.2)',borderRadius:2,padding:'24px 28px'}}>
          <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:15,fontWeight:600,color:'#00ccee',marginBottom:6}}>More events coming — stay tuned.</div>
          <div style={{fontSize:13,color:'#6a8aaa'}}>UVTechnic participates in agricultural, food processing, and water treatment trade fairs throughout Turkey and the Middle East.</div>
        </div>
      </div>
    </div>
  )
}
