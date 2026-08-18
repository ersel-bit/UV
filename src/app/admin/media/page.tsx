'use client'
import { useState, useEffect } from 'react'
import AdminNav from '@/components/admin/AdminNav'
import type { ProductImage } from '@/types'

const BASE_URL = 'https://raw.githubusercontent.com/ersel-bit/UV/main/'
const SECTIONS = ['PE','SM','SS','PP','DS','DS_DETAIL','DM','DC','DCAIR','WU','HU','AU','DU','CU','RDU']

const SECTION_LABELS: Record<string,string> = {
  PE:'PE Series (HDPE)', SM:'SM Series (SS316)', SS:'SS Series (304)', PP:'PP Series',
  DS:'DS Dip Suspension', DS_DETAIL:'DS Detail Photos', DM:'DM Dip Mount',
  DC:'DC Dip Cassette', DCAIR:'DC-AIR HVAC Cassette', WU:'WU Wall Unit',
  HU:'HU Hand Unit', AU:'AU Air Unit', DU:'DU Duct Unit', CU:'CU Conveyor', RDU:'RDU-1 Room Unit'
}

const SEED: ProductImage[] = [
  {id:'1',product_section:'PE',image_url:BASE_URL+'No.1.PE-15%20PE-20%20Before%20Packing%20Sample%20Picture%201.webp',alt_text:'PE units before packing',caption:'',sort_order:1,is_active:true},
  {id:'2',product_section:'SM',image_url:BASE_URL+'No.49.%20SM-300%20Auto%20Wiper%20Testing%20Sample%20Picture%205.webp',alt_text:'SM auto wiper testing',caption:'',sort_order:1,is_active:true},
  {id:'3',product_section:'DS',image_url:BASE_URL+'No.13.DS%20Sample%20Picture%201.webp',alt_text:'DS Series',caption:'',sort_order:1,is_active:true},
  {id:'4',product_section:'DS_DETAIL',image_url:BASE_URL+'No.37.%20DSC%20Detail%20Picture%201%20(%20End%20of%20the%20lamp).webp',alt_text:'Lamp end detail',caption:'Lamp End Detail',sort_order:1,is_active:true},
  {id:'5',product_section:'DS_DETAIL',image_url:BASE_URL+'No.38.DSC%20Detail%20Picture%202%20(%20Cable%20connection%20316%20SS%20Part).webp',alt_text:'SS316 cable connection',caption:'SS316 Cable Connection',sort_order:2,is_active:true},
  {id:'6',product_section:'DM',image_url:BASE_URL+'No.53.DM-C%20Sample%20Picture%201.webp',alt_text:'DM Series',caption:'',sort_order:1,is_active:true},
  {id:'7',product_section:'DCAIR',image_url:BASE_URL+'No.18.HVAC%20Unit%20Application%20Sample%20Picture%201.webp',alt_text:'HVAC application',caption:'',sort_order:1,is_active:true},
  {id:'8',product_section:'DCAIR',image_url:BASE_URL+'No.54.%20DC-AIR%206%20Pcs%20Lamp%20Sample%20Picture%201.webp',alt_text:'DC-AIR 6 lamps',caption:'',sort_order:2,is_active:true},
  {id:'9',product_section:'WU',image_url:BASE_URL+'No.11.WU%20Application%20Sample%20Picture%201.webp',alt_text:'WU application',caption:'',sort_order:1,is_active:true},
  {id:'10',product_section:'HU',image_url:BASE_URL+'No.17.HU-C1%20Sample%20Picture%201.webp',alt_text:'HU-C/1',caption:'',sort_order:1,is_active:true},
  {id:'11',product_section:'AU',image_url:BASE_URL+'No.33.AU%20C1%20Sample%20Picture%201.webp',alt_text:'AU-C/1',caption:'',sort_order:1,is_active:true},
  {id:'12',product_section:'DU',image_url:BASE_URL+'No.40.%20DU%20S600%2012%20Lamps%20Sample%20Picture%201.webp',alt_text:'DU-S600',caption:'',sort_order:1,is_active:true},
  {id:'13',product_section:'CU',image_url:BASE_URL+'No.10.Conveyor%20Application%20Sample%20Picture%201.webp',alt_text:'Conveyor application',caption:'',sort_order:1,is_active:true},
  {id:'14',product_section:'RDU',image_url:BASE_URL+'No.2.RDU-1%20Application%20Sample%20Picture%201.webp',alt_text:'RDU-1 in use',caption:'',sort_order:1,is_active:true},
  {id:'15',product_section:'RDU',image_url:BASE_URL+'No.3.RDU-1%20Application%20Sample%20Picture%202..webp',alt_text:'RDU-1 application',caption:'',sort_order:2,is_active:true},
]

const inp: React.CSSProperties = {
  background:'rgba(5,15,26,.8)', border:'1px solid rgba(0,204,238,.18)',
  color:'#eaf4ff', fontSize:13, padding:'8px 11px', borderRadius:2,
  width:'100%', outline:'none', fontFamily:'inherit'
}
const lbl: React.CSSProperties = {
  fontSize:10, letterSpacing:1.5, textTransform:'uppercase',
  color:'#6a8aaa', fontWeight:600, display:'block', marginBottom:4
}

export default function MediaAdmin() {
  const [section, setSection] = useState('PE')
  const [images, setImages] = useState<ProductImage[]>(SEED)
  const [msg, setMsg] = useState('')
  const configured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url')

  useEffect(() => {
    if (!configured) { setMsg('⚠ Supabase not configured — showing seed data.'); return }
    import('@/lib/data').then(({ getProductImages }) =>
      Promise.all(SECTIONS.map(s => getProductImages(s))).then(results => setImages(results.flat())).catch(e => setMsg(e.message))
    )
  }, [])

  const sectionImages = images.filter(i => i.product_section === section)

  const update = (id: string, field: keyof ProductImage, value: string | boolean) => {
    setImages(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i))
  }

  const saveImage = async (img: ProductImage) => {
    if (!configured) { setMsg('⚠ Cannot save — Supabase not configured.'); return }
    try {
      const { supabase } = await import('@/lib/supabase')
      await supabase.from('product_images').update({ image_url: img.image_url, alt_text: img.alt_text, caption: img.caption, is_active: img.is_active }).eq('id', img.id)
      setMsg('✓ Image saved.')
    } catch(e: any) { setMsg('Error: ' + e.message) }
  }

  const addImage = async () => {
    const newImg: ProductImage = { id: Date.now().toString(), product_section: section, image_url: '', alt_text: '', caption: '', sort_order: sectionImages.length + 1, is_active: true }
    if (configured) {
      const { supabase } = await import('@/lib/supabase')
      const { data } = await supabase.from('product_images').insert([{ product_section: section, image_url: '', alt_text: '', caption: '', sort_order: newImg.sort_order, is_active: true }]).select().single()
      if (data) newImg.id = data.id
    }
    setImages(prev => [...prev, newImg])
  }

  const deleteImage = async (id: string) => {
    if (!confirm('Remove this image?')) return
    if (configured) {
      const { supabase } = await import('@/lib/supabase')
      await supabase.from('product_images').delete().eq('id', id)
    }
    setImages(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div style={{ display:'flex' }}>
      <AdminNav />
      <main style={{ flex:1, padding:'40px 48px' }}>
        <h1 style={{ fontFamily:'Rajdhani,sans-serif', fontSize:36, fontWeight:700, marginBottom:8 }}>Media / Images</h1>
        <p style={{ fontSize:13, color:'#6a8aaa', marginBottom:24 }}>Update product image URLs by section. Changes take effect immediately when Supabase is connected.</p>
        {msg && <div style={{ padding:'10px 16px', background:'rgba(0,204,238,.06)', border:'1px solid rgba(0,204,238,.2)', borderRadius:2, fontSize:13, color:'#00ccee', marginBottom:20 }}>{msg}</div>}

        {/* Section tabs */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:28 }}>
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setSection(s)} style={{
              background: section===s ? 'rgba(0,204,238,.12)' : '#091828',
              border:`1px solid ${section===s?'rgba(0,204,238,.4)':'rgba(0,204,238,.1)'}`,
              color: section===s ? '#00ccee' : '#6a8aaa',
              padding:'5px 12px', borderRadius:2, fontSize:11.5, cursor:'pointer', fontFamily:'Rajdhani,sans-serif', fontWeight:600
            }}>{s}</button>
          ))}
        </div>

        <div style={{ fontFamily:'Rajdhani,sans-serif', fontSize:20, fontWeight:700, color:'#00ccee', marginBottom:20 }}>
          {SECTION_LABELS[section]} <span style={{ fontSize:13, color:'#6a8aaa', fontWeight:400 }}>— {sectionImages.length} image{sectionImages.length !== 1 ? 's' : ''}</span>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
          {sectionImages.map(img => (
            <div key={img.id} style={{ background:'#091828', border:'1px solid rgba(0,204,238,.1)', borderRadius:2, padding:20 }}>
              {img.image_url && (
                <img src={img.image_url} alt={img.alt_text} style={{ width:'100%', height:180, objectFit:'cover', borderRadius:2, marginBottom:14, border:'1px solid rgba(0,204,238,.1)' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}/>
              )}
              {!img.image_url && <div style={{ width:'100%', height:180, background:'rgba(0,204,238,.04)', border:'1px dashed rgba(0,204,238,.15)', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center', color:'#6a8aaa', fontSize:12, marginBottom:14 }}>No image URL set</div>}

              <div style={{ marginBottom:10 }}>
                <label style={lbl}>Image URL (GitHub raw or any public URL)</label>
                <input value={img.image_url} onChange={e => update(img.id,'image_url',e.target.value)} style={inp} placeholder="https://raw.githubusercontent.com/..."/>
              </div>
              <div style={{ marginBottom:10 }}>
                <label style={lbl}>Alt Text</label>
                <input value={img.alt_text} onChange={e => update(img.id,'alt_text',e.target.value)} style={inp}/>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={lbl}>Caption (optional)</label>
                <input value={img.caption} onChange={e => update(img.id,'caption',e.target.value)} style={inp} placeholder="Shown below image if set"/>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                <input type="checkbox" checked={img.is_active} onChange={e => update(img.id,'is_active',e.target.checked)} style={{ accentColor:'#00ccee', width:15, height:15 }}/>
                <span style={{ fontSize:12, color:'#6a8aaa' }}>Active (show on site)</span>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={() => saveImage(img)} style={{ flex:1, background:'#00ccee', color:'#050f1a', fontFamily:'Rajdhani,sans-serif', fontWeight:700, fontSize:12, padding:'8px', borderRadius:2, border:'none', cursor:'pointer' }}>Save</button>
                <button onClick={() => deleteImage(img.id)} style={{ background:'rgba(248,113,113,.08)', border:'1px solid rgba(248,113,113,.2)', color:'#f87171', fontSize:12, padding:'8px 12px', borderRadius:2, cursor:'pointer', fontFamily:'inherit' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={addImage} style={{ background:'rgba(0,204,238,.06)', border:'1px dashed rgba(0,204,238,.25)', color:'#00ccee', fontSize:13, padding:'14px', borderRadius:2, cursor:'pointer', fontFamily:'inherit', width:'100%' }}>
          + Add Image to {SECTION_LABELS[section]}
        </button>
      </main>
    </div>
  )
}
