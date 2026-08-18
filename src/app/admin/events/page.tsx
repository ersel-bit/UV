'use client'
import { useState, useEffect } from 'react'
import AdminNav from '@/components/admin/AdminNav'
import type { TradeEvent, EventImage } from '@/types'

const FALLBACK: TradeEvent[] = [{
  id:'1', title:'GROWTECH Eurasia 2024', location:'Antalya, Turkey',
  event_date:'November 2024', description:'[Caption placeholder]',
  sort_order:1, is_active:true,
  images:[
    {id:'1',event_id:'1',image_url:'https://raw.githubusercontent.com/ersel-bit/UV/main/No.6.%20Fair%20Sample%20Picture%201%20.webp',caption:'[Caption placeholder]',sort_order:1},
    {id:'2',event_id:'1',image_url:'https://raw.githubusercontent.com/ersel-bit/UV/main/No.7.Fair%20Sample%20Picture%202.webp',caption:'[Caption placeholder]',sort_order:2},
    {id:'3',event_id:'1',image_url:'https://raw.githubusercontent.com/ersel-bit/UV/main/No.8.%20Fair%20Sample%20Picture%203%20.webp',caption:'[Caption placeholder]',sort_order:3},
  ]
}]

const inp = (extra?: React.CSSProperties): React.CSSProperties => ({
  background:'rgba(5,15,26,.8)', border:'1px solid rgba(0,204,238,.18)',
  color:'#eaf4ff', fontSize:13.5, padding:'9px 12px', borderRadius:2,
  width:'100%', outline:'none', fontFamily:'inherit', ...extra
})

const lbl: React.CSSProperties = {
  fontSize:10, letterSpacing:1.5, textTransform:'uppercase',
  color:'#6a8aaa', fontWeight:600, display:'block', marginBottom:4
}

export default function EventsAdmin() {
  const [events, setEvents] = useState<TradeEvent[]>(FALLBACK)
  const [selected, setSelected] = useState<TradeEvent|null>(FALLBACK[0])
  const [editing, setEditing] = useState<TradeEvent|null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const configured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url')

  useEffect(() => {
    if (!configured) { setMsg('⚠ Supabase not configured — showing sample data.'); return }
    import('@/lib/data').then(({ getTradeEvents }) =>
      getTradeEvents().then(data => { setEvents(data); if(data[0]) setSelected(data[0]) }).catch(e => setMsg(e.message))
    )
  }, [])

  const startEdit = (ev: TradeEvent) => setEditing({ ...ev, images: [...ev.images] })

  const saveEvent = async () => {
    if (!editing) return
    setSaving(true)
    if (!configured) { setMsg('⚠ Cannot save — Supabase not configured.'); setSaving(false); return }
    try {
      const { supabase } = await import('@/lib/supabase')
      await supabase.from('trade_events').update({
        title: editing.title, location: editing.location,
        event_date: editing.event_date, description: editing.description,
        is_active: editing.is_active
      }).eq('id', editing.id)
      // update image captions
      for (const img of editing.images) {
        await supabase.from('event_images').update({ image_url: img.image_url, caption: img.caption }).eq('id', img.id)
      }
      setEvents(prev => prev.map(e => e.id === editing.id ? editing : e))
      setSelected(editing); setMsg('✓ Saved.'); setEditing(null)
    } catch(e: any) { setMsg('Error: ' + e.message) }
    setSaving(false)
  }

  const addImage = async () => {
    if (!editing) return
    const newImg: EventImage = { id: Date.now().toString(), event_id: editing.id, image_url: '', caption: '', sort_order: editing.images.length + 1 }
    if (configured) {
      const { supabase } = await import('@/lib/supabase')
      const { data } = await supabase.from('event_images').insert([{ event_id: editing.id, image_url: '', caption: '', sort_order: newImg.sort_order }]).select().single()
      if (data) newImg.id = data.id
    }
    setEditing(prev => prev ? { ...prev, images: [...prev.images, newImg] } : prev)
  }

  const removeImage = async (imgId: string) => {
    if (!editing) return
    if (configured) {
      const { supabase } = await import('@/lib/supabase')
      await supabase.from('event_images').delete().eq('id', imgId)
    }
    setEditing(prev => prev ? { ...prev, images: prev.images.filter(i => i.id !== imgId) } : prev)
  }

  const updateImage = (imgId: string, field: 'image_url'|'caption', value: string) => {
    setEditing(prev => prev ? { ...prev, images: prev.images.map(i => i.id === imgId ? { ...i, [field]: value } : i) } : prev)
  }

  const addEvent = async () => {
    const newEv: TradeEvent = { id: Date.now().toString(), title: 'New Event', location: '', event_date: '', description: '', sort_order: events.length + 1, is_active: true, images: [] }
    if (configured) {
      const { supabase } = await import('@/lib/supabase')
      const { data } = await supabase.from('trade_events').insert([{ title: newEv.title, location: '', event_date: '', description: '', sort_order: newEv.sort_order, is_active: true }]).select().single()
      if (data) newEv.id = data.id
    }
    setEvents(prev => [...prev, newEv])
    setEditing(newEv)
  }

  const ev = editing || selected

  return (
    <div style={{ display:'flex' }}>
      <AdminNav />
      <main style={{ flex:1, padding:'40px 48px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <h1 style={{ fontFamily:'Rajdhani,sans-serif', fontSize:36, fontWeight:700 }}>Events</h1>
          <button onClick={addEvent} style={{ background:'#00ccee', color:'#050f1a', fontFamily:'Rajdhani,sans-serif', fontWeight:700, fontSize:13, letterSpacing:1, padding:'10px 22px', borderRadius:2, border:'none', cursor:'pointer' }}>+ Add Event</button>
        </div>
        {msg && <div style={{ padding:'10px 16px', background:'rgba(0,204,238,.06)', border:'1px solid rgba(0,204,238,.2)', borderRadius:2, fontSize:13, color:'#00ccee', marginBottom:20 }}>{msg}</div>}

        <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:20 }}>
          {/* Event list */}
          <div>
            {events.map(e => (
              <div key={e.id} onClick={() => { setSelected(e); setEditing(null) }} style={{ padding:'12px 14px', background: selected?.id === e.id ? 'rgba(0,204,238,.08)' : '#091828', border:`1px solid ${selected?.id===e.id?'rgba(0,204,238,.3)':'rgba(0,204,238,.08)'}`, borderRadius:2, cursor:'pointer', marginBottom:8 }}>
                <div style={{ fontFamily:'Rajdhani,sans-serif', fontSize:15, fontWeight:600, color: selected?.id===e.id?'#00ccee':'#eaf4ff' }}>{e.title}</div>
                <div style={{ fontSize:11.5, color:'#6a8aaa', marginTop:2 }}>{e.location} · {e.event_date}</div>
                <div style={{ fontSize:11, color: e.is_active?'#22c55e':'#6a8aaa', marginTop:4 }}>{e.is_active?'● Active':'○ Hidden'}</div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {ev && (
            <div style={{ background:'#091828', border:'1px solid rgba(0,204,238,.1)', borderRadius:2, padding:'24px 28px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <div style={{ fontFamily:'Rajdhani,sans-serif', fontSize:18, fontWeight:700, color:'#00ccee' }}>
                  {editing ? 'Editing: ' : ''}{ev.title}
                </div>
                {!editing
                  ? <button onClick={() => startEdit(ev)} style={{ background:'rgba(0,204,238,.1)', border:'1px solid rgba(0,204,238,.25)', color:'#00ccee', fontSize:12, padding:'7px 18px', borderRadius:2, cursor:'pointer', fontFamily:'inherit' }}>Edit</button>
                  : <div style={{ display:'flex', gap:8 }}>
                      <button onClick={saveEvent} disabled={saving} style={{ background:'#00ccee', color:'#050f1a', fontFamily:'Rajdhani,sans-serif', fontWeight:700, fontSize:12, padding:'7px 18px', borderRadius:2, border:'none', cursor:'pointer' }}>{saving?'Saving...':'Save'}</button>
                      <button onClick={() => setEditing(null)} style={{ background:'none', border:'1px solid rgba(106,138,170,.3)', color:'#6a8aaa', fontSize:12, padding:'7px 18px', borderRadius:2, cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
                    </div>
                }
              </div>

              {editing ? (
                <>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
                    {[['title','Event Title'],['location','Location'],['event_date','Date (e.g. November 2024)']].map(([k,l]) => (
                      <div key={k}>
                        <label style={lbl}>{l}</label>
                        <input value={(editing as any)[k]} onChange={e => setEditing(p => p ? {...p,[k]:e.target.value}:p)} style={inp()}/>
                      </div>
                    ))}
                    <div style={{ display:'flex', alignItems:'center', gap:10, paddingTop:22 }}>
                      <input type="checkbox" checked={editing.is_active} onChange={e => setEditing(p => p?{...p,is_active:e.target.checked}:p)} style={{ accentColor:'#00ccee', width:16, height:16 }}/>
                      <label style={{ fontSize:13, color:'#6a8aaa' }}>Active</label>
                    </div>
                  </div>
                  <div style={{ marginBottom:20 }}>
                    <label style={lbl}>Event Description</label>
                    <textarea value={editing.description} onChange={e => setEditing(p => p?{...p,description:e.target.value}:p)} rows={3} style={inp({resize:'vertical'})}/>
                  </div>

                  {/* Images */}
                  <div style={{ fontFamily:'Rajdhani,sans-serif', fontSize:15, fontWeight:600, color:'#00ccee', marginBottom:14 }}>Photos</div>
                  {editing.images.map(img => (
                    <div key={img.id} style={{ background:'rgba(5,15,26,.5)', border:'1px solid rgba(0,204,238,.08)', borderRadius:2, padding:14, marginBottom:10 }}>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:10, alignItems:'start' }}>
                        <div>
                          <label style={lbl}>Image URL</label>
                          <input value={img.image_url} onChange={e => updateImage(img.id,'image_url',e.target.value)} style={inp({marginBottom:8})}/>
                          <label style={lbl}>Caption</label>
                          <input value={img.caption} onChange={e => updateImage(img.id,'caption',e.target.value)} placeholder="Caption for this photo" style={inp()}/>
                        </div>
                        <button onClick={() => removeImage(img.id)} style={{ background:'rgba(248,113,113,.08)', border:'1px solid rgba(248,113,113,.2)', color:'#f87171', fontSize:12, padding:'6px 10px', borderRadius:2, cursor:'pointer', fontFamily:'inherit', marginTop:18 }}>✕</button>
                      </div>
                      {img.image_url && <img src={img.image_url} alt="preview" style={{ width:'100%', maxHeight:160, objectFit:'cover', borderRadius:2, marginTop:10, border:'1px solid rgba(0,204,238,.1)' }}/>}
                    </div>
                  ))}
                  <button onClick={addImage} style={{ background:'rgba(0,204,238,.06)', border:'1px dashed rgba(0,204,238,.25)', color:'#00ccee', fontSize:12, padding:'10px 20px', borderRadius:2, cursor:'pointer', fontFamily:'inherit', width:'100%' }}>+ Add Photo</button>
                </>
              ) : (
                <>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16, fontSize:13 }}>
                    {[['Location', ev.location],['Date', ev.event_date],['Status', ev.is_active?'Active':'Hidden'],['Photos', ev.images.length + ' images']].map(([k,v]) => (
                      <div key={k} style={{ background:'rgba(5,15,26,.4)', padding:'10px 14px', borderRadius:2 }}>
                        <div style={{ fontSize:10, letterSpacing:1, textTransform:'uppercase', color:'#6a8aaa', marginBottom:3 }}>{k}</div>
                        <div style={{ color:'#eaf4ff' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize:13, color:'#6a8aaa', marginBottom:16 }}>{ev.description}</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                    {ev.images.map(img => (
                      <div key={img.id} style={{ borderRadius:2, overflow:'hidden', border:'1px solid rgba(0,204,238,.1)' }}>
                        {img.image_url && <img src={img.image_url} alt="event" style={{ width:'100%', height:120, objectFit:'cover', display:'block' }}/>}
                        {img.caption && <div style={{ padding:'6px 8px', fontSize:11, color:'#6a8aaa', background:'rgba(9,24,40,.8)' }}>{img.caption}</div>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
