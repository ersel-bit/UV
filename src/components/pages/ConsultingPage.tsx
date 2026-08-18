'use client'
import { PageHero } from '@/components/ui'
import type { SiteSettings } from '@/types'

export default function ConsultingPage({ settings:s }: { settings:SiteSettings }) {
  const fi: React.CSSProperties = {background:'rgba(5,15,26,.8)',border:'1px solid rgba(0,204,238,.18)',color:'#eaf4ff',fontSize:13.5,padding:'10px 12px',borderRadius:2,width:'100%',outline:'none',fontFamily:'inherit'}
  const fl: React.CSSProperties = {fontSize:10,letterSpacing:1.5,textTransform:'uppercase',color:'#6a8aaa',fontWeight:600,display:'block',marginBottom:4}
  return (
    <div style={{marginTop:58}}>
      <PageHero tag="Consulting" title="We Size It. You Run It." subtitle={`Free on-site assessment for facilities in the ${s.city} region and beyond.`}/>
      <div style={{maxWidth:900,margin:'0 auto',padding:'80px 32px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:52}}>
          {[['01','Tell Us','Describe your water source, process, volumes, and problem. No technical knowledge needed.'],
            ['02','We Analyse','Our engineers review your parameters and select the right UV dose, reactor size, and material spec.'],
            ['03','On-Site Visit',`We visit your facility, verify the installation conditions, and confirm the final specification. Free for ${s.city} region.`]].map(([n,h,d])=>(
            <div key={n} style={{background:'#091828',padding:28,borderRadius:2,borderTop:'2px solid #00ccee'}}>
              <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:44,fontWeight:700,color:'rgba(0,204,238,.12)',lineHeight:1,marginBottom:8}}>{n}</div>
              <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:20,fontWeight:600,marginBottom:10}}>{h}</div>
              <div style={{fontSize:13.5,color:'#6a8aaa',lineHeight:1.7}}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:13}}>
          {[['Name',''],['Company',''],['Phone','+90'],['City','']].map(([l,p])=>(
            <div key={l}><label style={fl}>{l}</label><input placeholder={p||l} style={fi}/></div>
          ))}
          <div style={{gridColumn:'1/-1'}}><label style={fl}>Describe Your Application</label><textarea rows={5} placeholder="Water source, flow rate, current treatment, problem you are trying to solve..." style={{...fi,resize:'vertical'}}/></div>
        </div>
        <button style={{marginTop:14,background:'#00ccee',color:'#050f1a',fontFamily:'Rajdhani,sans-serif',fontWeight:700,fontSize:14,letterSpacing:1.5,textTransform:'uppercase',padding:'13px 30px',borderRadius:2,border:'none',cursor:'pointer'}}>Request Free Assessment →</button>
      </div>
    </div>
  )
}
