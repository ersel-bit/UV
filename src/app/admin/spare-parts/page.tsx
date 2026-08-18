'use client'
import { useState, useEffect } from 'react'
import AdminNav from '@/components/admin/AdminNav'
import type { SparePart } from '@/types'

const FALLBACK: SparePart[] = [
  {id:'1',title:'UVC Lamps',description:'Standard germicidal lamps. Multiple lengths and outputs. 4-pin fitting. Contact us — do not specify OEM brand.',icon:'💡',sort_order:1,is_active:true},
  {id:'2',title:'Coated Lamps',description:'PTFE-coated germicidal lamps. Food, pharma, conveyor use. Glass containment safe.',icon:'🛡️',sort_order:2,is_active:true},
  {id:'3',title:'Quartz Sleeves',description:'Precision quartz glass. Round straight · square profile · hollow · solid rod. Contact for size.',icon:'🔭',sort_order:3,is_active:true},
  {id:'4',title:'Ballasts / Drivers',description:'CE-certified electronic ballasts. Contact us with lamp type — we supply the correct matching ballast.',icon:'⚡',sort_order:4,is_active:true},
  {id:'5',title:'Ceramic Sockets',description:'4-pin ceramic. High-temperature rated. All standard UVC lamp types.',icon:'🔌',sort_order:5,is_active:true},
  {id:'6',title:'Plastic Sockets',description:'4-pin plastic. Standard and 90° cable-exit versions.',icon:'🔗',sort_order:6,is_active:true},
]

const inp: React.CSSProperties = { background:'rgba(5,15,26,.8)', border:'1px solid rgba(0,204,238,.18)', color:'#eaf4ff', fontSize:13, padding:'8px 11px', borderRadius:2, width:'100%', outline:'none', fontFamily:'inherit' }
const lbl: React.CSSProperties = { fontSize:10, letterSpacing:1.5, textTransform:'uppercase', color:'#6a8aaa', fontWeight:600, display:'block', marginBottom:4 }

export default function SparePartsAdmin() {
  const [parts, setParts] = useState<SparePart[]>(FALLBACK)
  const [editing, setEditing] = useState<SparePart|null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const configured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url')

  useEffect(() => {
    if (!configured) { setMsg('⚠ Supabase not configured — showing default data.'); return }
    import('@/lib/data').then(({ getSpareParts }) => getSpareParts().then(setParts).catch(e => setMsg(e.message)))
  }, [])

  const startNew = () => {
    setEditing({ id: Date.now().toString(), title: '', description: '', icon: '🔧', sort_order: parts.length + 1, is_active: true })
    setIsNew(true)
  }

  const save = async () => {
    if (!editing) return
    setSaving(true)
    if (!configured) { setMsg('⚠ Cannot save — Supabase not configured.'); setSaving(false); return }
    try {
      const { supabase } = await import('@/lib/supabase')
      if (isNew) {
        const { data, error } = await supabase.from('spare_parts').insert([{ title: editing.title, description: editing.description, icon: editing.icon, sort_order: editing.sort_order, is_active: editing.is_active }]).select().single()
        if (error) throw error
        setParts(prev => [...prev, data])
      } else {
        const { error } = await supabase.from('spare_parts').update({ title: editing.title, description: editing.description, icon: editing.icon, sort_order: editing.sort_order, is_active: editing.is_active }).eq('id', editing.id)
        if (error) throw error
        setParts(prev => prev.map(p => p.id === editing.id ? { ...p, ...editing } : p))
      }
      setMsg('✓ Saved.'); setEditing(null); setIsNew(false)
    } catch(e: any) { setMsg('Error: ' + e.message) }
    setSaving(false)
  }

  const del = async (id: string) => {
    if (!confirm('Delete this spare part entry?')) return
    if (configured) {
      const { supabase } = await import('@/lib/supabase')
      await supabase.from('spare_parts').delete().eq('id', id)
    }
    setParts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div style={{ display:'flex' }}>
      <AdminNav />
      <main style={{ flex:1, padding:'40px 48px', maxWidth:900 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <h1 style={{ fontFamily:'Rajdhani,sans-serif', fontSize:36, fontWeight:700 }}>Spare Parts</h1>
          <button onClick={startNew} style={{ background:'#00ccee', color:'#050f1a', fontFamily:'Rajdhani,sans-serif', fontWeight:700, fontSize:13, letterSpacing:1, padding:'10px 22px', borderRadius:2, border:'none', cursor:'pointer' }}>+ Add Category</button>
        </div>
        {msg && <div style={{ padding:'10px 16px', background:'rgba(0,204,238,.06)', border:'1px solid rgba(0,204,238,.2)', borderRadius:2, fontSize:13, color:'#00ccee', marginBottom:20 }}>{msg}</div>}
        <p style={{ fontSize:12.5, color:'#6a8aaa', marginBottom:24 }}>These appear on the Spare Parts page. Each entry has an icon, title, and description. Never disclose wattage in descriptions.</p>

        {editing && (
          <div style={{ background:'#091828', border:'1px solid rgba(0,204,238,.2)', borderRadius:2, padding:'24px 28px', marginBottom:24 }}>
            <div style={{ fontFamily:'Rajdhani,sans-serif', fontSize:18, fontWeight:700, color:'#00ccee', marginBottom:20 }}>{isNew ? 'New Spare Part Category' : 'Edit'}</div>
            <div style={{ display:'grid', gridTemplateColumns:'80px 1fr 1fr', gap:16, marginBottom:16 }}>
              <div>
                <label style={lbl}>Icon</label>
                <input value={editing.icon} onChange={e => setEditing(p => p?{...p,icon:e.target.value}:p)} style={{ ...inp, fontSize:24, textAlign:'center', padding:'6px' }}/>
              </div>
              <div>
                <label style={lbl}>Title</label>
                <input value={editing.title} onChange={e => setEditing(p => p?{...p,title:e.target.value}:p)} style={inp}/>
              </div>
              <div>
                <label style={lbl}>Sort Order</label>
                <input type="number" value={editing.sort_order} onChange={e => setEditing(p => p?{...p,sort_order:+e.target.value}:p)} style={inp}/>
              </div>
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={lbl}>Description</label>
              <textarea value={editing.description} onChange={e => setEditing(p => p?{...p,description:e.target.value}:p)} rows={3} style={{ ...inp, resize:'vertical' }}/>
              <div style={{ fontSize:11, color:'#f59e0b', marginTop:4 }}>⚠ Never mention lamp wattage — use "Contact us with lamp type" instead.</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
              <input type="checkbox" checked={editing.is_active} onChange={e => setEditing(p => p?{...p,is_active:e.target.checked}:p)} style={{ accentColor:'#00ccee', width:16, height:16 }}/>
              <label style={{ fontSize:13, color:'#6a8aaa' }}>Active (visible on site)</label>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={save} disabled={saving} style={{ background:'#00ccee', color:'#050f1a', fontFamily:'Rajdhani,sans-serif', fontWeight:700, fontSize:13, padding:'9px 24px', borderRadius:2, border:'none', cursor:'pointer' }}>{saving?'Saving...':'Save'}</button>
              <button onClick={() => setEditing(null)} style={{ background:'none', border:'1px solid rgba(106,138,170,.3)', color:'#6a8aaa', fontSize:13, padding:'9px 24px', borderRadius:2, cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          {parts.map(p => (
            <div key={p.id} style={{ background:'#091828', border:'1px solid rgba(0,204,238,.08)', borderRadius:2, overflow:'hidden' }}>
              <div style={{ height:72, background:'#0d2236', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>{p.icon}</div>
              <div style={{ padding:'16px 18px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                  <div style={{ fontFamily:'Rajdhani,sans-serif', fontSize:17, fontWeight:700, color:'#00ccee' }}>{p.title}</div>
                  <span style={{ background: p.is_active?'rgba(34,197,94,.1)':'rgba(106,138,170,.1)', color: p.is_active?'#22c55e':'#6a8aaa', fontSize:10, padding:'2px 7px', borderRadius:100, whiteSpace:'nowrap', marginLeft:8 }}>{p.is_active?'Active':'Hidden'}</span>
                </div>
                <div style={{ fontSize:12.5, color:'#6a8aaa', lineHeight:1.6, marginBottom:14 }}>{p.description}</div>
                <div style={{ display:'flex', gap:8 }}>
                  <button onClick={() => { setEditing({...p}); setIsNew(false) }} style={{ flex:1, background:'rgba(0,204,238,.08)', border:'1px solid rgba(0,204,238,.2)', color:'#00ccee', fontSize:12, padding:'7px', borderRadius:2, cursor:'pointer', fontFamily:'inherit' }}>Edit</button>
                  <button onClick={() => del(p.id)} style={{ background:'rgba(248,113,113,.08)', border:'1px solid rgba(248,113,113,.2)', color:'#f87171', fontSize:12, padding:'7px 12px', borderRadius:2, cursor:'pointer', fontFamily:'inherit' }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
