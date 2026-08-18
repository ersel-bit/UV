'use client'
import { useState, useEffect } from 'react'
import AdminNav from '@/components/admin/AdminNav'
import type { ClosedVesselModel } from '@/types'

const SERIES = ['PE','PP','SS','SM'] as const
const SERIES_LABELS: Record<string,string> = { PE:'PE — HDPE (4 bar)', PP:'PP — Polypropylene (4 bar)', SS:'SS — Stainless 304 (6 bar)', SM:'SM — SS316 Marine (6 bar)' }

const FALLBACK: ClosedVesselModel[] = [
  {id:'1',series:'PE',model_name:'PE-05',flow_rate:'5',body_dn:'DN160',inner_length:'780',total_length:'920',connection:'DN32 (1¼")',lamps:'1 pcs',system_power:'~26W',is_hp:false,sort_order:1,is_active:true},
  {id:'2',series:'PE',model_name:'PE-10',flow_rate:'10',body_dn:'DN200',inner_length:'780',total_length:'920',connection:'DN40 (1½")',lamps:'2 pcs',system_power:'~52W',is_hp:false,sort_order:2,is_active:true},
  {id:'3',series:'PE',model_name:'PE-15',flow_rate:'15',body_dn:'DN200',inner_length:'780',total_length:'920',connection:'DN50 (2")',lamps:'2 pcs',system_power:'~88W',is_hp:false,sort_order:3,is_active:true},
  {id:'4',series:'PE',model_name:'PE-20',flow_rate:'20',body_dn:'DN250',inner_length:'780',total_length:'920',connection:'DN65 (2½")',lamps:'4 pcs',system_power:'~288W',is_hp:false,sort_order:4,is_active:true},
  {id:'5',series:'PE',model_name:'PE-25',flow_rate:'25',body_dn:'DN200',inner_length:'1452',total_length:'1592',connection:'DN65 (2½")',lamps:'1 pcs HP',system_power:'~340W',is_hp:true,sort_order:5,is_active:true},
  {id:'6',series:'PE',model_name:'PE-30',flow_rate:'30',body_dn:'DN250',inner_length:'780',total_length:'920',connection:'DN80 (3")',lamps:'4 pcs',system_power:'~288W',is_hp:false,sort_order:6,is_active:true},
  {id:'7',series:'PE',model_name:'PE-45',flow_rate:'45',body_dn:'DN250',inner_length:'780',total_length:'920',connection:'DN80 (3")',lamps:'4 pcs',system_power:'~352W',is_hp:false,sort_order:7,is_active:true},
  {id:'8',series:'PE',model_name:'PE-60',flow_rate:'60',body_dn:'DN225',inner_length:'1452',total_length:'1592',connection:'DN100 (4")',lamps:'2 pcs HP',system_power:'~700W',is_hp:true,sort_order:8,is_active:true},
  {id:'9',series:'PE',model_name:'PE-80',flow_rate:'80',body_dn:'DN250',inner_length:'1452',total_length:'1592',connection:'DN125 (5")',lamps:'3 pcs HP',system_power:'~1050W',is_hp:true,sort_order:9,is_active:true},
  {id:'10',series:'PE',model_name:'PE-100',flow_rate:'100',body_dn:'DN280',inner_length:'1452',total_length:'1592',connection:'DN125 (5")',lamps:'3 pcs HP',system_power:'~1050W',is_hp:true,sort_order:10,is_active:true},
  {id:'11',series:'PE',model_name:'PE-125',flow_rate:'125',body_dn:'DN280',inner_length:'1452',total_length:'1592',connection:'DN150 (6")',lamps:'4 pcs HP',system_power:'~1400W',is_hp:true,sort_order:11,is_active:true},
  {id:'12',series:'PE',model_name:'PE-150',flow_rate:'150',body_dn:'DN280',inner_length:'1452',total_length:'1592',connection:'DN150 (6")',lamps:'5 pcs HP',system_power:'~1750W',is_hp:true,sort_order:12,is_active:true},
  {id:'13',series:'PE',model_name:'PE-200',flow_rate:'200',body_dn:'DN315',inner_length:'1452',total_length:'1592',connection:'DN200 (8")',lamps:'6 pcs HP',system_power:'~2100W',is_hp:true,sort_order:13,is_active:true},
  {id:'14',series:'PE',model_name:'PE-300',flow_rate:'300',body_dn:'DN355',inner_length:'1452',total_length:'1592',connection:'DN250 (10")',lamps:'7 pcs HP',system_power:'~2450W',is_hp:true,sort_order:14,is_active:true},
  {id:'15',series:'PE',model_name:'PE-400',flow_rate:'400',body_dn:'DN400',inner_length:'1452',total_length:'1592',connection:'DN250 (10")',lamps:'8 pcs HP',system_power:'~2800W',is_hp:true,sort_order:15,is_active:true},
]

const cellStyle: React.CSSProperties = { padding:'8px 10px', fontSize:12.5 }
const inp = (w?: number): React.CSSProperties => ({ background:'rgba(5,15,26,.8)', border:'1px solid rgba(0,204,238,.15)', color:'#eaf4ff', fontSize:12, padding:'5px 8px', borderRadius:2, outline:'none', fontFamily:'inherit', width: w || '100%' })

export default function ProductsAdmin() {
  const [series, setSeries] = useState<typeof SERIES[number]>('PE')
  const [models, setModels] = useState<ClosedVesselModel[]>(FALLBACK)
  const [saving, setSaving] = useState<string|null>(null)
  const [msg, setMsg] = useState('')
  const configured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url')

  useEffect(() => {
    if (!configured) { setMsg('⚠ Supabase not configured — showing seed data.'); return }
    import('@/lib/data').then(({ getClosedVesselModels }) =>
      Promise.all(SERIES.map(s => getClosedVesselModels(s))).then(results => setModels(results.flat())).catch(e => setMsg(e.message))
    )
  }, [])

  const shown = models.filter(m => m.series === series)

  const update = (id: string, field: keyof ClosedVesselModel, value: string | boolean) =>
    setModels(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m))

  const save = async (model: ClosedVesselModel) => {
    if (!configured) { setMsg('⚠ Cannot save — Supabase not configured.'); return }
    setSaving(model.id)
    try {
      const { supabase } = await import('@/lib/supabase')
      const { error } = await supabase.from('closed_vessel_models').update({
        model_name: model.model_name, flow_rate: model.flow_rate, body_dn: model.body_dn,
        inner_length: model.inner_length, total_length: model.total_length,
        connection: model.connection, lamps: model.lamps, system_power: model.system_power,
        is_hp: model.is_hp, sort_order: model.sort_order, is_active: model.is_active
      }).eq('id', model.id)
      if (error) throw error
      setMsg(`✓ ${model.model_name} saved.`)
    } catch(e: any) { setMsg('Error: ' + e.message) }
    setSaving(null)
  }

  const add = async () => {
    const prefix = series
    const count = shown.length
    const newModel: ClosedVesselModel = {
      id: Date.now().toString(), series, model_name: `${prefix}-NEW`,
      flow_rate: '0', body_dn: 'DN160', inner_length: '780', total_length: '920',
      connection: 'DN32', lamps: '1 pcs', system_power: '~26W',
      is_hp: false, sort_order: count + 1, is_active: true
    }
    if (configured) {
      const { supabase } = await import('@/lib/supabase')
      const { data } = await supabase.from('closed_vessel_models').insert([{
        series, model_name: newModel.model_name, flow_rate: '0', body_dn: 'DN160',
        inner_length: '780', total_length: '920', connection: 'DN32',
        lamps: '1 pcs', system_power: '~26W', is_hp: false, sort_order: count + 1, is_active: true
      }]).select().single()
      if (data) newModel.id = data.id
    }
    setModels(prev => [...prev, newModel])
  }

  const del = async (id: string) => {
    if (!confirm('Delete this model?')) return
    if (configured) {
      const { supabase } = await import('@/lib/supabase')
      await supabase.from('closed_vessel_models').delete().eq('id', id)
    }
    setModels(prev => prev.filter(m => m.id !== id))
  }

  return (
    <div style={{ display:'flex' }}>
      <AdminNav />
      <main style={{ flex:1, padding:'40px 48px', overflowX:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <h1 style={{ fontFamily:'Rajdhani,sans-serif', fontSize:36, fontWeight:700 }}>Products</h1>
          <button onClick={add} style={{ background:'#00ccee', color:'#050f1a', fontFamily:'Rajdhani,sans-serif', fontWeight:700, fontSize:13, letterSpacing:1, padding:'10px 22px', borderRadius:2, border:'none', cursor:'pointer' }}>+ Add Model</button>
        </div>
        {msg && <div style={{ padding:'10px 16px', background:'rgba(0,204,238,.06)', border:'1px solid rgba(0,204,238,.2)', borderRadius:2, fontSize:13, color:'#00ccee', marginBottom:20 }}>{msg}</div>}
        <p style={{ fontSize:12.5, color:'#6a8aaa', marginBottom:20 }}>Edit closed vessel models inline. Each row saves individually. PP/SS/SM share PE's configuration with a different prefix.</p>

        {/* Series tabs */}
        <div style={{ display:'flex', gap:8, marginBottom:24 }}>
          {SERIES.map(s => (
            <button key={s} onClick={() => setSeries(s)} style={{
              background: series===s ? 'rgba(0,204,238,.12)' : '#091828',
              border: `1px solid ${series===s?'rgba(0,204,238,.4)':'rgba(0,204,238,.1)'}`,
              color: series===s ? '#00ccee' : '#6a8aaa',
              padding:'7px 18px', borderRadius:2, fontSize:13, cursor:'pointer',
              fontFamily:'Rajdhani,sans-serif', fontWeight:700
            }}>{s}</button>
          ))}
        </div>
        <div style={{ fontFamily:'Rajdhani,sans-serif', fontSize:18, fontWeight:700, color:'#00ccee', marginBottom:16 }}>{SERIES_LABELS[series]}</div>

        <div style={{ background:'#091828', border:'1px solid rgba(0,204,238,.1)', borderRadius:2, overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12.5, minWidth:900 }}>
            <thead>
              <tr style={{ background:'rgba(0,204,238,.05)' }}>
                {['Model','Flow (m³/h)','Body DN','Inner L','Total L','Connection','Lamps','Sys Power','HP','Active',''].map(h => (
                  <th key={h} style={{ padding:'9px 10px', textAlign:'left', fontSize:10, letterSpacing:1.2, textTransform:'uppercase', color:'#00ccee', fontWeight:600, whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((m, i) => (
                <tr key={m.id} style={{ borderTop: i>0 ? '1px solid rgba(0,204,238,.05)' : 'none' }}>
                  <td style={cellStyle}><input value={m.model_name} onChange={e => update(m.id,'model_name',e.target.value)} style={inp(90)}/></td>
                  <td style={cellStyle}><input value={m.flow_rate} onChange={e => update(m.id,'flow_rate',e.target.value)} style={inp(55)}/></td>
                  <td style={cellStyle}><input value={m.body_dn} onChange={e => update(m.id,'body_dn',e.target.value)} style={inp(70)}/></td>
                  <td style={cellStyle}><input value={m.inner_length} onChange={e => update(m.id,'inner_length',e.target.value)} style={inp(55)}/></td>
                  <td style={cellStyle}><input value={m.total_length} onChange={e => update(m.id,'total_length',e.target.value)} style={inp(55)}/></td>
                  <td style={cellStyle}><input value={m.connection} onChange={e => update(m.id,'connection',e.target.value)} style={inp(100)}/></td>
                  <td style={cellStyle}><input value={m.lamps} onChange={e => update(m.id,'lamps',e.target.value)} style={inp(80)}/></td>
                  <td style={cellStyle}><input value={m.system_power} onChange={e => update(m.id,'system_power',e.target.value)} style={inp(75)}/></td>
                  <td style={{ ...cellStyle, textAlign:'center' }}><input type="checkbox" checked={m.is_hp} onChange={e => update(m.id,'is_hp',e.target.checked)} style={{ accentColor:'#f59e0b', width:15, height:15 }}/></td>
                  <td style={{ ...cellStyle, textAlign:'center' }}><input type="checkbox" checked={m.is_active} onChange={e => update(m.id,'is_active',e.target.checked)} style={{ accentColor:'#00ccee', width:15, height:15 }}/></td>
                  <td style={cellStyle}>
                    <button onClick={() => save(m)} disabled={saving===m.id} style={{ background:'rgba(0,204,238,.1)', border:'1px solid rgba(0,204,238,.25)', color:'#00ccee', fontSize:10, padding:'4px 8px', borderRadius:2, cursor:'pointer', fontFamily:'inherit', marginRight:4, whiteSpace:'nowrap' }}>{saving===m.id?'...':'Save'}</button>
                    <button onClick={() => del(m.id)} style={{ background:'rgba(248,113,113,.08)', border:'1px solid rgba(248,113,113,.2)', color:'#f87171', fontSize:10, padding:'4px 8px', borderRadius:2, cursor:'pointer', fontFamily:'inherit' }}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize:12, color:'#6a8aaa', marginTop:16 }}>
          ⚠ Lamp wattage is never disclosed — use "1 pcs", "2 pcs HP" format only. Never write watt values in lamp count fields.
        </p>
      </main>
    </div>
  )
}
