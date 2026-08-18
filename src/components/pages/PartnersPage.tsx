'use client'
import { useState } from 'react'
import { PageHero } from '@/components/ui'

export default function PartnersPage() {
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  const [status,setStatus]=useState<'idle'|'loading'|'error'>('idle')
  const handleLogin=async(e:React.FormEvent)=>{
    e.preventDefault();setStatus('loading')
    await new Promise(r=>setTimeout(r,1200));setStatus('error')
  }
  return (
    <div style={{marginTop:58}}>
      <PageHero tag="Partner Portal" title="Secure Partner Access"/>
      <div style={{maxWidth:420,margin:'80px auto',padding:'0 32px'}}>
        <div style={{background:'#091828',border:'1px solid rgba(0,204,238,.15)',borderRadius:4,padding:36}}>
          <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:22,fontWeight:700,marginBottom:6}}>Partner Login</div>
          <div style={{fontSize:13,color:'#6a8aaa',marginBottom:28}}>Access restricted to authorised distributors and OEM partners.</div>
          <form onSubmit={handleLogin}>
            {[['Email','email',email,setEmail],['Password','password',pass,setPass]].map(([l,t,v,sv])=>(
              <div key={l as string} style={{marginBottom:16}}>
                <label style={{fontSize:10,letterSpacing:1.5,textTransform:'uppercase',color:'#6a8aaa',fontWeight:600,display:'block',marginBottom:4}}>{l as string}</label>
                <input type={t as string} value={v as string} onChange={e=>(sv as (s:string)=>void)(e.target.value)} style={{background:'rgba(5,15,26,.8)',border:'1px solid rgba(0,204,238,.18)',color:'#eaf4ff',fontSize:13.5,padding:'10px 12px',borderRadius:2,width:'100%',outline:'none',fontFamily:'inherit'}}/>
              </div>
            ))}
            {status==='error'&&<div style={{color:'#f87171',fontSize:12.5,marginBottom:14}}>Invalid credentials. Please contact partners@uvtechnic.com</div>}
            <button type="submit" disabled={status==='loading'} style={{width:'100%',background:'#00ccee',color:'#050f1a',fontFamily:'Rajdhani,sans-serif',fontWeight:700,fontSize:14,letterSpacing:1.5,padding:12,borderRadius:2,border:'none',cursor:'pointer'}}>{status==='loading'?'Verifying...':'ACCESS PORTAL →'}</button>
          </form>
          <div style={{marginTop:20,fontSize:12,color:'rgba(106,138,170,.5)',textAlign:'center'}}>Need access? <span style={{color:'#00ccee',cursor:'pointer'}}>partners@uvtechnic.com</span></div>
        </div>
      </div>
    </div>
  )
}
