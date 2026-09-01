'use client'
import { useState } from 'react'
import { PageHero } from '@/components/ui'

export default function CareerPage() {
  const [file, setFile] = useState('')
  const fi: React.CSSProperties = {background:'rgba(5,15,26,.8)',border:'1px solid rgba(0,204,238,.18)',color:'#eaf4ff',fontSize:13.5,padding:'10px 12px',borderRadius:2,width:'100%',outline:'none',fontFamily:'inherit'}
  const fl: React.CSSProperties = {fontSize:10,letterSpacing:1.5,textTransform:'uppercase',color:'#6a8aaa',fontWeight:600,display:'block',marginBottom:4}
  return (
    <div style={{marginTop:58}}>
      <PageHero tag="Careers" title="Join UVTechnic"/>
      <div style={{maxWidth:1000,margin:'0 auto',padding:'80px 32px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1.1fr .9fr',gap:40,alignItems:'start',marginBottom:56}}>
          <div>
            <div style={{fontSize:10,letterSpacing:3,textTransform:'uppercase',color:'#00ccee',fontWeight:600,marginBottom:10}}>Our Story</div>
            <h2 style={{fontFamily:'Rajdhani,sans-serif',fontSize:30,fontWeight:700,marginBottom:14}}>Built in İzmir. Built to Compete with Europe.</h2>
            <p style={{color:'#6a8aaa',fontSize:14,lineHeight:1.85,marginBottom:14}}>UVTechnic started with a simple conviction: Turkey didn't need to import European technology — it could build it. Eight years and 300+ installed systems later, our 2,500 m² İzmir facility now fabricates, tests, and ships UVC disinfection systems that meet the same standards as manufacturers in Germany or Denmark.</p>
            <p style={{color:'#6a8aaa',fontSize:14,lineHeight:1.85}}>The next chapter is bigger: deeper certification, expansion into MENA and the Gulf, and continued investment in the people who actually build the systems.</p>
          </div>
          <div style={{height:300,borderRadius:2,overflow:'hidden',border:'1px solid rgba(0,204,238,.18)',background:'#050f1a'}}>
            <img src="/career-application.jpeg" alt="UVTechnic Career Application" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
          </div>
        </div>
        <div style={{fontSize:10,letterSpacing:3,textTransform:'uppercase',color:'#00ccee',fontWeight:600,marginBottom:10}}>Open Application</div>
        <h2 style={{fontFamily:'Rajdhani,sans-serif',fontSize:30,fontWeight:700,marginBottom:10}}>Tell Us About Yourself</h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:13,maxWidth:680,marginTop:24}}>
          {[['First Name',''],['Last Name',''],['Email','email@company.com'],['Phone','+90']].map(([l,p])=>(
            <div key={l}><label style={fl}>{l}</label><input placeholder={p||l} style={fi}/></div>
          ))}
          <div style={{gridColumn:'1/-1'}}><label style={fl}>Area of Interest</label><select style={{...fi}}>{['Electrical / Electronics Engineering','Mechanical / Fabrication / Welding','Technical Sales','Production / Quality','Other'].map(o=><option key={o}>{o}</option>)}</select></div>
          <div style={{gridColumn:'1/-1'}}>
            <label style={fl}>Upload CV</label>
            <label style={{display:'flex',alignItems:'center',gap:10,background:'rgba(5,15,26,.8)',border:'1px dashed rgba(0,204,238,.3)',borderRadius:2,padding:'12px 14px',cursor:'pointer',fontSize:13}}>
              <span style={{color:'#00ccee',fontFamily:'Rajdhani,sans-serif',fontWeight:600}}>📎 Choose File</span>
              <span style={{color:'#6a8aaa',fontSize:12.5}}>{file||'PDF or Word — max 5MB'}</span>
              <input type="file" accept=".pdf,.doc,.docx" style={{display:'none'}} onChange={e=>setFile(e.target.files?.[0]?.name||'')}/>
            </label>
          </div>
          <div style={{gridColumn:'1/-1'}}><label style={fl}>Or CV / Portfolio Link</label><input placeholder="Google Drive, LinkedIn, or other link" style={fi}/></div>
          <div style={{gridColumn:'1/-1'}}><label style={fl}>Cover Letter</label><textarea rows={4} placeholder="Why UVTechnic, why this role..." style={{...fi,resize:'vertical'}}/></div>
          <div style={{gridColumn:'1/-1'}}><label style={fl}>About You</label><textarea rows={4} placeholder="Experience, background, relevant skills..." style={{...fi,resize:'vertical'}}/></div>
        </div>
        <button style={{marginTop:8,background:'#00ccee',color:'#050f1a',fontFamily:'Rajdhani,sans-serif',fontWeight:700,fontSize:14,letterSpacing:1.5,textTransform:'uppercase',padding:'13px 30px',borderRadius:2,border:'none',cursor:'pointer'}}>Submit Application →</button>
      </div>
    </div>
  )
}