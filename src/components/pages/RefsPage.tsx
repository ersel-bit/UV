'use client'
import { useState, useEffect } from 'react'
import { PageHero } from '@/components/ui'
import type { Reference } from '@/types'

const FALLBACK: Reference[] = [
  {id:'1',company_name:'AQUARENA',sector:'Aquaculture',description:'RAS Recirculation System',sort_order:1,is_active:true},
  {id:'2',company_name:'MIDYE A.Ş.',sector:'Aquaculture',description:'Mussel Farming Water',sort_order:2,is_active:true},
  {id:'3',company_name:'PINAR SÜT',sector:'Food & Bev',description:'Dairy Process Water',sort_order:3,is_active:true},
  {id:'4',company_name:'TÜRK TUBORG',sector:'Food & Bev',description:'Brewery Process Water',sort_order:4,is_active:true},
  {id:'5',company_name:'EFE MADEN SUYU',sector:'Water',description:'Mineral Water Plant',sort_order:5,is_active:true},
  {id:'6',company_name:'LEVENT BAKLAVA',sector:'Food & Bev',description:'Food Production',sort_order:6,is_active:true},
  {id:'7',company_name:'MEMORIAL',sector:'Healthcare',description:'Hospital Air & Water',sort_order:7,is_active:true},
  {id:'8',company_name:'ECZACIBAŞI',sector:'Industrial',description:'Process Water System',sort_order:8,is_active:true},
  {id:'9',company_name:'ARÇELIK',sector:'Industrial',description:'Cooling Tower',sort_order:9,is_active:true},
  {id:'10',company_name:'KOZA ALTIN',sector:'Industrial',description:'Mine Process Water',sort_order:10,is_active:true},
  {id:'11',company_name:'ÇEŞME RESORT',sector:'Hotel & Pool',description:'Hotel Pool System',sort_order:11,is_active:true},
  {id:'12',company_name:'TURYAĞ',sector:'Food & Bev',description:'Oil Production Water',sort_order:12,is_active:true},
  {id:'13',company_name:'KARKİMYA',sector:'Industrial',description:'Chemical Plant Water',sort_order:13,is_active:true},
  {id:'14',company_name:'BÜYÜK KÖY TATİL',sector:'Hotel & Pool',description:'Resort Pool UV',sort_order:14,is_active:true},
]
const SECTORS = ['All','Aquaculture','Food & Bev','Healthcare','Industrial','Water','Hotel & Pool']

export default function RefsPage() {
  const [refs, setRefs] = useState<Reference[]>(FALLBACK)
  const [filter, setFilter] = useState('All')
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!url||url==='your-project-url') return
    import('@/lib/data').then(({getReferences})=>getReferences().then(setRefs).catch(console.error))
  }, [])
  const shown = filter==='All' ? refs : refs.filter(r=>r.sector===filter)
  return (
    <div style={{marginTop:58}}>
      <PageHero tag="References" title="Trusted by Leading Organizations"/>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'80px 32px'}}>
        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:24}}>
          {SECTORS.map(s=><button key={s} onClick={()=>setFilter(s)} style={{background:filter===s?'rgba(0,204,238,.1)':'rgba(9,24,40,.8)',border:`1px solid ${filter===s?'rgba(0,204,238,.4)':'rgba(0,204,238,.1)'}`,color:filter===s?'#00ccee':'#6a8aaa',padding:'6px 13px',borderRadius:100,fontSize:11.5,cursor:'pointer',fontFamily:'Rajdhani,sans-serif',fontWeight:500}}>{s}</button>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
          {shown.map(r=>(
            <div key={r.id} style={{background:'#091828',border:'1px solid rgba(0,204,238,.07)',padding:'20px 16px',borderRadius:2,textAlign:'center'}}>
              <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:16,fontWeight:700,color:'rgba(234,244,255,.42)',marginBottom:5}}>{r.company_name}</div>
              <div style={{fontSize:10,color:'#00ccee',letterSpacing:1,textTransform:'uppercase'}}>{r.sector}</div>
              <div style={{fontSize:11.5,color:'#6a8aaa',marginTop:3}}>{r.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
