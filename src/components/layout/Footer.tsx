import type { SiteSettings, Certification } from '@/types'

interface Props { settings:SiteSettings; certs:Certification[]; onNav:(p:string)=>void }

export default function Footer({ settings:s, certs, onNav }: Props) {
  return (
    <footer style={{background:'#091828',borderTop:'1px solid rgba(0,204,238,.1)',padding:'42px 32px 20px'}}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:32,maxWidth:1200,margin:'0 auto 32px'}}>
        <div>
          <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:22,fontWeight:700,letterSpacing:2,marginBottom:10}}>UV<b style={{color:'#00ccee'}}>TECHNIC</b></div>
          <div style={{fontSize:13,color:'#6a8aaa',lineHeight:1.7,maxWidth:250}}>UVC disinfection systems manufactured in {s.city}, {s.country}. Water, air, and surface disinfection for industrial, agricultural, healthcare, and municipal applications.</div>
        </div>
        <div>
          <div style={{fontSize:10,letterSpacing:2,textTransform:'uppercase',color:'#00ccee',fontWeight:600,marginBottom:11}}>Products</div>
          {['Water Systems','Air Systems','Surface Systems','Spare Parts'].map(l=><span key={l} onClick={()=>onNav('products')} style={{display:'block',fontSize:12.5,color:'#6a8aaa',cursor:'pointer',marginBottom:5}}>{l}</span>)}
        </div>
        <div>
          <div style={{fontSize:10,letterSpacing:2,textTransform:'uppercase',color:'#00ccee',fontWeight:600,marginBottom:11}}>Company</div>
          {[['About','about'],['Technology','technology'],['References','references'],['Careers','career'],['Events','events'],['Contact','contact']].map(([l,p])=><span key={l} onClick={()=>onNav(p)} style={{display:'block',fontSize:12.5,color:'#6a8aaa',cursor:'pointer',marginBottom:5}}>{l}</span>)}
        </div>
        <div>
          <div style={{fontSize:10,letterSpacing:2,textTransform:'uppercase',color:'#00ccee',fontWeight:600,marginBottom:11}}>Contact</div>
          <div style={{fontSize:12.5,color:'#6a8aaa',lineHeight:1.9}}>{s.address}<br/>{s.phone}<br/>{s.email}</div>
        </div>
      </div>
      <div style={{borderTop:'1px solid rgba(0,204,238,.07)',paddingTop:16,maxWidth:1200,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:11,color:'rgba(106,138,170,.4)'}}>© {new Date().getFullYear()} {s.company_name}. All rights reserved.</div>
        <div style={{display:'flex',gap:5}}>
          {certs.map(c=><div key={c.id} style={{fontSize:10.5,color:'rgba(106,138,170,.4)',border:'1px solid rgba(106,138,170,.15)',padding:'2px 6px',borderRadius:2}}>{c.name}</div>)}
        </div>
      </div>
    </footer>
  )
}
