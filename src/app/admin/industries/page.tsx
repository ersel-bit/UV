'use client'
import { useState, useEffect } from 'react'
import AdminNav from '@/components/admin/AdminNav'
import type { Industry } from '@/types'

const FALLBACK: Industry[] = [
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

const inp: React.CSSProperties = { background:'rgba(5,15,26,.8)', border:'1px solid rgba(0,204,238,.18)', color:'#eaf4ff', fontSize:13, padding:'7px 10px', borderRadius:2, outline:'none', fontFamily:'inherit' }
const lbl: React.CSSProperties = { fontSize:10, letterSpacing:1.5, textTransform:'uppercase', color:'#6a8aaa', fontWeight:600, display:'block', marginBottom:3 }

export default function IndustriesAdmin() {
  const [items, setItems] = useState<Industry[]>(FALLBACK)
  const [msg, setMsg] = useState('')
  const [saving, setSaving] = useState<string|null>(null)
  const configured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url')

  useEffect(() => {
    if (!configured) { setMsg('⚠ Supabase not configured — showing default data.'); return }
    import('@/lib/data').then(({ getIndustries }) => getIndustries().then(setItems).catch(e => setMsg(e.message)))
  }, [])

  const update = (id: string, field: keyof Industry, value: string | boolean | number) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i))

  const save = async (item: Industry) => {
    if (!configured) { setMsg('⚠ Cannot save — Supabase not configured.'); return }
    setSaving(item.id)
    try {
      const { supabase } = await import('@/lib/supabase')
      await supabase.from('industries').update({ icon: item.icon, name: item.name, description: item.description, sort_order: item.sort_order, is_active: item.is_active }).eq('id', item.id)
      setMsg('✓ Saved.')
    } catch(e: any) { setMsg('Error: ' + e.message) }
    setSaving(null)
  }

  const add = async () => {
    const newItem: Industry = { id: Date.now().toString(), icon: '💧', name: 'New Industry', description: '', sort_order: items.length + 1, is_active: true }
    if (configured) {
      const { supabase } = await import('@/lib/supabase')
      const { data } = await supabase.from('industries').insert([{ icon: newItem.icon, name: newItem.name, description: '', sort_order: newItem.sort_order, is_active: true }]).select().single()
      if (data) newItem.id = data.id
    }
    setItems(prev => [...prev, newItem])
  }

  const del = async (id: string) => {
    if (!confirm('Delete this industry?')) return
    if (configured) {
      const { supabase } = await import('@/lib/supabase')
      await supabase.from('industries').delete().eq('id', id)
    }
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div style={{ display:'flex' }}>
      <AdminNav />
      <main style={{ flex:1, padding:'40px 48px', maxWidth:900 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <h1 style={{ fontFamily:'Rajdhani,sans-serif', fontSize:36, fontWeight:700 }}>Industries</h1>
          <button onClick={add} style={{ background:'#00ccee', color:'#050f1a', fontFamily:'Rajdhani,sans-serif', fontWeight:700, fontSize:13, letterSpacing:1, padding:'10px 22px', borderRadius:2, border:'none', cursor:'pointer' }}>+ Add Industry</button>
        </div>
        {msg && <div style={{ padding:'10px 16px', background:'rgba(0,204,238,.06)', border:'1px solid rgba(0,204,238,.2)', borderRadius:2, fontSize:13, color:'#00ccee', marginBottom:20 }}>{msg}</div>}
        <p style={{ fontSize:12.5, color:'#6a8aaa', marginBottom:24 }}>These appear on the homepage industry grid. Edit and save each row individually.</p>

        <div style={{ background:'#091828', border:'1px solid rgba(0,204,238,.1)', borderRadius:2, overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
            <thead>
              <tr style={{ background:'rgba(0,204,238,.05)' }}>
                {['Icon','Name','Description','Order','Active',''].map(h => (
                  <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:10, letterSpacing:1.5, textTransform:'uppercase', color:'#00ccee', fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} style={{ borderTop: i>0 ? '1px solid rgba(0,204,238,.05)' : 'none' }}>
                  <td style={{ padding:'8px 14px' }}>
                    <input value={item.icon} onChange={e => update(item.id,'icon',e.target.value)} style={{ ...inp, width:50, textAlign:'center', fontSize:20 }}/>
                  </td>
                  <td style={{ padding:'8px 14px' }}>
                    <input value={item.name} onChange={e => update(item.id,'name',e.target.value)} style={{ ...inp, width:140 }}/>
                  </td>
                  <td style={{ padding:'8px 14px' }}>
                    <input value={item.description} onChange={e => update(item.id,'description',e.target.value)} style={{ ...inp, width:220 }}/>
                  </td>
                  <td style={{ padding:'8px 14px' }}>
                    <input type="number" value={item.sort_order} onChange={e => update(item.id,'sort_order',+e.target.value)} style={{ ...inp, width:60 }}/>
                  </td>
                  <td style={{ padding:'8px 14px' }}>
                    <input type="checkbox" checked={item.is_active} onChange={e => update(item.id,'is_active',e.target.checked)} style={{ accentColor:'#00ccee', width:16, height:16 }}/>
                  </td>
                  <td style={{ padding:'8px 14px' }}>
                    <button onClick={() => save(item)} disabled={saving===item.id} style={{ background:'rgba(0,204,238,.1)', border:'1px solid rgba(0,204,238,.25)', color:'#00ccee', fontSize:11, padding:'4px 10px', borderRadius:2, cursor:'pointer', fontFamily:'inherit', marginRight:6 }}>{saving===item.id?'...':'Save'}</button>
                    <button onClick={() => del(item.id)} style={{ background:'rgba(248,113,113,.08)', border:'1px solid rgba(248,113,113,.2)', color:'#f87171', fontSize:11, padding:'4px 10px', borderRadius:2, cursor:'pointer', fontFamily:'inherit' }}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
