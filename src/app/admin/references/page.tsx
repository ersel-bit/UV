'use client'
import { useState, useEffect } from 'react'
import AdminNav from '@/components/admin/AdminNav'
import type { Reference } from '@/types'

const FALLBACK: Reference[] = [
  {id:'1',company_name:'AQUARENA',sector:'Aquaculture',description:'RAS Recirculation System',sort_order:1,is_active:true},
  {id:'2',company_name:'PINAR SÜT',sector:'Food & Bev',description:'Dairy Process Water',sort_order:2,is_active:true},
  {id:'3',company_name:'MEMORIAL',sector:'Healthcare',description:'Hospital Air & Water',sort_order:3,is_active:true},
]
const SECTORS = ['Aquaculture','Food & Bev','Healthcare','Industrial','Water','Hotel & Pool','Other']

function Row({ ref: r, onEdit, onDelete }: { ref: Reference; onEdit: (r: Reference) => void; onDelete: (id: string) => void }) {
  return (
    <tr>
      <td style={{ padding: '10px 14px', color: '#eaf4ff', fontWeight: 600 }}>{r.company_name}</td>
      <td style={{ padding: '10px 14px', color: '#6a8aaa' }}>{r.sector}</td>
      <td style={{ padding: '10px 14px', color: '#6a8aaa' }}>{r.description}</td>
      <td style={{ padding: '10px 14px' }}>
        <span style={{ background: r.is_active ? 'rgba(34,197,94,.1)' : 'rgba(106,138,170,.1)', color: r.is_active ? '#22c55e' : '#6a8aaa', fontSize: 11, padding: '2px 8px', borderRadius: 100 }}>{r.is_active ? 'Active' : 'Hidden'}</span>
      </td>
      <td style={{ padding: '10px 14px' }}>
        <button onClick={() => onEdit(r)} style={{ background: 'rgba(0,204,238,.1)', border: '1px solid rgba(0,204,238,.25)', color: '#00ccee', fontSize: 11, padding: '4px 10px', borderRadius: 2, cursor: 'pointer', fontFamily: 'inherit', marginRight: 6 }}>Edit</button>
        <button onClick={() => onDelete(r.id)} style={{ background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.2)', color: '#f87171', fontSize: 11, padding: '4px 10px', borderRadius: 2, cursor: 'pointer', fontFamily: 'inherit' }}>Delete</button>
      </td>
    </tr>
  )
}

export default function RefsAdmin() {
  const [refs, setRefs] = useState<Reference[]>(FALLBACK)
  const [editing, setEditing] = useState<Reference|null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const configured = typeof process !== 'undefined' && !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url'

  useEffect(() => {
    if (!configured) { setMsg('⚠ Supabase not configured — showing sample data.'); return }
    import('@/lib/data').then(({ getReferences }) => getReferences().then(setRefs).catch(e => setMsg(e.message)))
  }, [])

  const startNew = () => { setEditing({ id: '', company_name: '', sector: 'Aquaculture', description: '', sort_order: refs.length + 1, is_active: true }); setIsNew(true) }
  const startEdit = (r: Reference) => { setEditing({ ...r }); setIsNew(false) }

  const save = async () => {
    if (!editing) return
    setSaving(true)
    if (!configured) { setMsg('⚠ Cannot save — Supabase not configured.'); setSaving(false); return }
    try {
      const { supabase } = await import('@/lib/supabase')
      if (isNew) {
        const { data, error } = await supabase.from('references_table').insert([{ company_name: editing.company_name, sector: editing.sector, description: editing.description, sort_order: editing.sort_order, is_active: editing.is_active }]).select().single()
        if (error) throw error
        setRefs(prev => [...prev, data])
      } else {
        const { error } = await supabase.from('references_table').update({ company_name: editing.company_name, sector: editing.sector, description: editing.description, sort_order: editing.sort_order, is_active: editing.is_active }).eq('id', editing.id)
        if (error) throw error
        setRefs(prev => prev.map(r => r.id === editing.id ? { ...r, ...editing } : r))
      }
      setMsg('✓ Saved.'); setEditing(null)
    } catch (e: any) { setMsg('Error: ' + e.message) }
    setSaving(false)
  }

  const del = async (id: string) => {
    if (!confirm('Delete this reference?')) return
    if (!configured) { setRefs(prev => prev.filter(r => r.id !== id)); return }
    const { supabase } = await import('@/lib/supabase')
    await supabase.from('references_table').delete().eq('id', id)
    setRefs(prev => prev.filter(r => r.id !== id))
  }

  const inp = (style?: React.CSSProperties) => ({ style: { background: 'rgba(5,15,26,.8)', border: '1px solid rgba(0,204,238,.18)', color: '#eaf4ff', fontSize: 13.5, padding: '9px 12px', borderRadius: 2, width: '100%', outline: 'none', fontFamily: 'inherit', ...style } })

  return (
    <div style={{ display: 'flex' }}>
      <AdminNav />
      <main style={{ flex: 1, padding: '40px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 36, fontWeight: 700 }}>References</h1>
          <button onClick={startNew} style={{ background: '#00ccee', color: '#050f1a', fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: 1, padding: '10px 22px', borderRadius: 2, border: 'none', cursor: 'pointer' }}>+ Add Reference</button>
        </div>
        {msg && <div style={{ padding: '10px 16px', background: 'rgba(0,204,238,.06)', border: '1px solid rgba(0,204,238,.2)', borderRadius: 2, fontSize: 13, color: '#00ccee', marginBottom: 20 }}>{msg}</div>}

        {editing && (
          <div style={{ background: '#091828', border: '1px solid rgba(0,204,238,.2)', borderRadius: 2, padding: '24px 28px', marginBottom: 24 }}>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 18, fontWeight: 700, color: '#00ccee', marginBottom: 20 }}>{isNew ? 'New Reference' : 'Edit Reference'}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: '#6a8aaa', fontWeight: 600, display: 'block', marginBottom: 4 }}>Company Name</label>
                <input value={editing.company_name} onChange={e => setEditing(p => p ? {...p, company_name: e.target.value} : p)} {...inp()}/>
              </div>
              <div>
                <label style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: '#6a8aaa', fontWeight: 600, display: 'block', marginBottom: 4 }}>Sector</label>
                <select value={editing.sector} onChange={e => setEditing(p => p ? {...p, sector: e.target.value} : p)} {...inp()}>
                  {SECTORS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: '#6a8aaa', fontWeight: 600, display: 'block', marginBottom: 4 }}>Description</label>
                <input value={editing.description} onChange={e => setEditing(p => p ? {...p, description: e.target.value} : p)} {...inp()}/>
              </div>
              <div>
                <label style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: '#6a8aaa', fontWeight: 600, display: 'block', marginBottom: 4 }}>Sort Order</label>
                <input type="number" value={editing.sort_order} onChange={e => setEditing(p => p ? {...p, sort_order: +e.target.value} : p)} {...inp()}/>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                <input type="checkbox" id="active" checked={editing.is_active} onChange={e => setEditing(p => p ? {...p, is_active: e.target.checked} : p)} style={{ accentColor: '#00ccee', width: 16, height: 16 }}/>
                <label htmlFor="active" style={{ fontSize: 13, color: '#6a8aaa', cursor: 'pointer' }}>Active (visible on site)</label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={save} disabled={saving} style={{ background: '#00ccee', color: '#050f1a', fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 13, padding: '9px 24px', borderRadius: 2, border: 'none', cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save'}</button>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: '1px solid rgba(106,138,170,.3)', color: '#6a8aaa', fontSize: 13, padding: '9px 24px', borderRadius: 2, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ background: '#091828', border: '1px solid rgba(0,204,238,.1)', borderRadius: 2, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'rgba(0,204,238,.05)' }}>
                {['Company', 'Sector', 'Description', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: '#00ccee', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {refs.map((r, i) => (
                <tr key={r.id} style={{ borderTop: i > 0 ? '1px solid rgba(0,204,238,.05)' : 'none' }}>
                  <td style={{ padding: '10px 14px', color: '#eaf4ff', fontWeight: 600 }}>{r.company_name}</td>
                  <td style={{ padding: '10px 14px', color: '#6a8aaa' }}>{r.sector}</td>
                  <td style={{ padding: '10px 14px', color: '#6a8aaa' }}>{r.description}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ background: r.is_active ? 'rgba(34,197,94,.1)' : 'rgba(106,138,170,.1)', color: r.is_active ? '#22c55e' : '#6a8aaa', fontSize: 11, padding: '2px 8px', borderRadius: 100 }}>{r.is_active ? 'Active' : 'Hidden'}</span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <button onClick={() => startEdit(r)} style={{ background: 'rgba(0,204,238,.1)', border: '1px solid rgba(0,204,238,.25)', color: '#00ccee', fontSize: 11, padding: '4px 10px', borderRadius: 2, cursor: 'pointer', fontFamily: 'inherit', marginRight: 6 }}>Edit</button>
                    <button onClick={() => del(r.id)} style={{ background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.2)', color: '#f87171', fontSize: 11, padding: '4px 10px', borderRadius: 2, cursor: 'pointer', fontFamily: 'inherit' }}>Delete</button>
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
